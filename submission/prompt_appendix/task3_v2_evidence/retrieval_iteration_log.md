# Retrieval Iteration Log

These implementation trials are retained as development evidence. Retrieval scores are internal BM25 scores, not rubric scores.

1. **Initial unfiltered ranking:** Q02 (“How does MapReduce divide and combine work?”) ranked a `Tips:`-only fragment first (13.2068), ahead of a useful MapReduce passage. The indexer was changed to skip very short and image-only records during ranking while retaining every original record in the corpus. The final top result is a MapReduce pipeline passage (17.0853).
2. **Vague-query boundary:** Q05 (“Tell me about that thing from class.”) initially matched generic `class` fragments. Query normalization now removes generic terms after normalization/stemming. Q05 now has no meaningful query tokens and returns the exact abstention sentence. This is a lexical safeguard, not semantic intent detection.
3. **RAG definition ranking:** Q01 initially ranked an example passage (“National Day holiday weekend”) under a prompt-construction heading above the definition. Phrase-aware expansion adds the course acronym `RAG` for the explicit term “retrieval-augmented generation” and weights that expanded concept. The final top result is the note titled “RAG Definition” (25.1334), and the example remains visible as a lower-ranked reference (18.4772 in the final expanded-query run).
4. **Display cleanup:** Source Markdown remains verbatim in retrieved-reference cards; the answer display removes Markdown escape punctuation for legibility. The visible answer cites `[R1]`.

Known residual: keyword retrieval can still return adjacent examples or table rows that match terms but do not fully answer a natural-language question. The static extractive answer does not reason over multiple sources.
