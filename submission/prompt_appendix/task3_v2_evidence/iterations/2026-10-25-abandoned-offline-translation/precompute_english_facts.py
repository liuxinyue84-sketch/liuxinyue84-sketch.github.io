#!/usr/bin/env python3
"""Precompute English evidence for the static V2 corpus with an offline model.

The deployed page never loads a translation model or sends notes to a service.
Translations are cached by a hash of the original paragraph and emitted as a
browser-ready map keyed by the existing knowledge-record id.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

TECHNICAL_GLOSSARY = {
    "检索增强生成": "retrieval-augmented generation",
    "多智能体强化学习": "multi-agent reinforcement learning",
    "强化学习": "reinforcement learning",
    "反向传播": "backpropagation",
    "梯度下降": "gradient descent",
    "卷积神经网络": "convolutional neural network",
    "卷积": "convolution",
    "因果注意力": "causal attention",
    "双向注意力": "bidirectional attention",
    "交叉注意力": "cross-attention",
    "注意力机制": "attention mechanism",
    "大语言模型": "large language model",
    "神经网络": "neural network",
    "监督学习": "supervised learning",
    "无监督学习": "unsupervised learning",
    "过拟合": "overfitting",
    "欠拟合": "underfitting",
    "聚类": "clustering",
    "智能体": "agent",
}


def read_records(path: Path):
    source = path.read_text(encoding="utf-8")
    payload = source[source.index("=") + 1 :].strip().removesuffix(";")
    return json.loads(payload)


def clean_for_translation(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"\$[^$\n]{1,500}\$", " ", text)
    text = re.sub(r"\\\([^\n]{1,500}?\\\)|\\\[[\s\S]{1,500}?\\\]", " ", text)
    text = re.sub(r"^\s*\|?[\s:|-]{3,}\|?\s*$", " ", text, flags=re.MULTILINE)
    text = re.sub(r"[*_`#>]", "", text)
    text = re.sub(r"^\s*[-+]\s+", "", text, flags=re.MULTILINE)
    text = text.replace("|", ". ").replace("<br>", ". ").replace("<br/>", ". ")
    text = re.sub(r"\\([.()\-])", r"\1", text)
    text = re.sub(r"\\[A-Za-z]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip(" .")
    return text[:1800]


def needs_translation(text: str) -> bool:
    chinese = len(re.findall(r"[\u4e00-\u9fff]", text))
    return chinese >= 8


def apply_glossary(text: str) -> str:
    for chinese, english in sorted(TECHNICAL_GLOSSARY.items(), key=lambda item: -len(item[0])):
        text = text.replace(chinese, english)
    return text


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--knowledge", type=Path, required=True)
    parser.add_argument("--cache", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--model", default="Helsinki-NLP/opus-mt-zh-en")
    parser.add_argument("--ct2-model", type=Path, required=True)
    args = parser.parse_args()

    import ctranslate2
    from transformers import AutoTokenizer

    records = read_records(args.knowledge)
    cache = json.loads(args.cache.read_text(encoding="utf-8")) if args.cache.exists() else {}
    facts = {}
    translated = reused = skipped = 0
    pending = []
    for index, record in enumerate(records, start=1):
        prepared = apply_glossary(clean_for_translation(record["originalParagraph"]))
        if not needs_translation(prepared):
            skipped += 1
            continue
        key = hashlib.sha256(prepared.encode("utf-8")).hexdigest()
        if key in cache:
            english = cache[key]
            reused += 1
        else:
            pending.append((record["id"], key, prepared))
            continue
        if len(re.findall(r"[A-Za-z]", english)) >= 20:
            facts[record["id"]] = english

    if pending:
        tokenizer = AutoTokenizer.from_pretrained(args.model)
        translator = ctranslate2.Translator(str(args.ct2_model), device="cpu", inter_threads=2, intra_threads=4)
        batch_size = 64
        for start in range(0, len(pending), batch_size):
            batch = pending[start:start + batch_size]
            sources = [tokenizer.convert_ids_to_tokens(tokenizer.encode(item[2], truncation=True, max_length=512)) for item in batch]
            results = translator.translate_batch(sources, beam_size=1, max_decoding_length=420)
            translations = [tokenizer.decode(tokenizer.convert_tokens_to_ids(result.hypotheses[0]), skip_special_tokens=True) for result in results]
            for (record_id, key, _), english in zip(batch, translations):
                english = english.strip()
                cache[key] = english
                translated += 1
                if len(re.findall(r"[A-Za-z]", english)) >= 20:
                    facts[record_id] = english
            if start % 640 == 0:
                print(json.dumps({"processedTranslations": min(start + len(batch), len(pending)), "pending": len(pending), "translated": translated, "reused": reused, "facts": len(facts)}), flush=True)

    args.cache.parent.mkdir(parents=True, exist_ok=True)
    args.cache.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    output = "/* Offline-precomputed English evidence; no visitor-side model or API. */\nwindow.V2_RAG_ENGLISH_FACTS = " + json.dumps(facts, ensure_ascii=False, separators=(",", ":")) + ";\n"
    args.output.write_text(output, encoding="utf-8")
    print(json.dumps({"records": len(records), "facts": len(facts), "translated": translated, "reused": reused, "skipped": skipped, "outputBytes": len(output.encode())}), flush=True)


if __name__ == "__main__":
    main()
