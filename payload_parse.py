import json

with open('payload.json', 'r') as f:
    data = json.load(f)

# print(json.dumps(data, indent=4))

fields = data["form_response"]["definition"]["fields"]
# print(json.dumps(fields[0], indent=2))

field_map = [(f['id'], f['title']) for f in fields]
for field_id, title in field_map:
    print(f"{title}: {field_id}")