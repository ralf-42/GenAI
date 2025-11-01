import requests

def read_prompt_from_github(repo_url, file_path):
    raw_url = repo_url.replace("github.com", "raw.githubusercontent.com").replace("/blob", "") + "/main/" + file_path
    response = requests.get(raw_url)
    if response.status_code == 200:
        return response.text
    else:
        return None

repo_url = "https://github.com/DEIN_BENUTZERNAME/DEIN_REPO"
file_path = "pfad/zur/prompt_datei.txt"

prompt = read_prompt_from_github(repo_url, file_path)

if prompt:
    print(prompt)
    # Hier kannst du den Prompt weiterverarbeiten
else:
    print("Prompt konnte nicht gelesen werden.")