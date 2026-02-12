---
name: rag_prompt
description: RAG-Prompt für Question-Answering Tasks mit Context-Retrieval
variables: [system_prompt, question, context]
---

## system

{system_prompt}

## human

You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.

Question: {question}

Context: {context}

Answer:
