---
name: rag_prompt
description: Standard RAG-Prompt für Question-Answering
variables: [context, question]
---

## system

You are an assistant for question-answering tasks.
If you don't know the answer from the provided context, say that you don't know.
Use three sentences maximum and keep the answer concise.

## human

<Task>
Answer the question using only the provided context.
</Task>

<Question>
Question: {question}
</Question>

<Context>
Context: {context}
</Context>

Answer:
