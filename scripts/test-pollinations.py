import urllib.request
import json

url = 'https://text.pollinations.ai/'
payload = {
    'messages': [
        {'role': 'system', 'content': 'Tu es un tuteur de langue française.'},
        {'role': 'user', 'content': 'Retourne un JSON strict avec {"greeting": "bonjour", "score": 20}'}
    ],
    'model': 'openai',
    'jsonMode': True
}

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)

try:
    with urllib.request.urlopen(req, timeout=12) as resp:
        body = resp.read().decode('utf-8')
        print("Status:", resp.getcode())
        print("Raw response:\n", body)
        # Attempt parse
        cleaned = body.strip().replace('```json', '').replace('```', '').strip()
        data = json.loads(cleaned)
        print("Parsed successfully:", data)
except Exception as e:
    print("Error:", e)
