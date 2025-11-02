# Text-Zusammenfassung Prompt Template
#
# Dieses Template erstellt prägnante Zusammenfassungen von Texten
#
# Verwendung:
#   from genai_lib.utilities import load_chat_prompt_template
#   template = load_chat_prompt_template("05_prompt/text_zusammenfassung.py")
#   prompt = template.format_messages(text="Dein Text hier...")

messages = [
    (
        "system",
        "Du bist ein Experte für die Erstellung prägnanter und informativer Textzusammenfassungen. "
        "Deine Zusammenfassungen sind klar strukturiert, objektiv und erfassen die Kernaussagen des Originaltexts."
    ),
    (
        "human",
        "Bitte fasse den folgenden Text zusammen:\n\n{text}\n\n"
        "Erstelle eine Zusammenfassung, die:\n"
        "- Die Hauptaussagen des Textes erfasst\n"
        "- Maximal 3 Sätze umfasst\n"
        "- Klar und verständlich formuliert ist"
    )
]
