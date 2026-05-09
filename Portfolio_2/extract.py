import json

with open(r'C:\Users\CTS\.gemini\antigravity\brain\8801864b-87ff-4a0f-807a-48eb8a0bc3f2\.system_generated\logs\overview.txt', 'r', encoding='utf-8') as f:
    for line in f:
        if '"step_index":25' in line:
            try:
                data = json.loads(line)
                print(data['tool_calls'][0]['args']['CommandLine'])
            except Exception as e:
                print(e)
