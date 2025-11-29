"""
CREATE Prompt-Template für strukturierte Content-Erstellung

Das CREATE-Template folgt einem systematischen Ansatz:
- C: Context (Hintergrundinformationen)
- R: Role (Rollendefinition)
- E: Evaluation (Qualitätskriterien)
- A: Action Plan (Arbeitsweise)
- T: Tone (Tonalität/Stil)
- E: Expectation (Aufgabenstellung)

Verwendung:
    from langchain_core.prompts import ChatPromptTemplate
    from create_prompt import prompt

    template = ChatPromptTemplate.from_messages(prompt)
    chain = template | llm
"""

prompt = [
    ("system", """role}.

Deine Arbeitsweise:
{action_plan}

Qualitätskriterien:
{evaluation}"""),

    ("human", """Kontext:
{context}

Aufgabe:
{expectation}

Tonalität/Stil: {tone}""")
]

# Alias für load_chat_prompt_template() Kompatibilität
messages = prompt
