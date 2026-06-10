import os, re, sys, json
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

vault = Path(".")
results = []

for md_file in sorted(vault.rglob("*.md")):
    rel = md_file.as_posix()
    if rel.startswith("./"):
        rel = rel[2:]
    if any(p in rel for p in [".obsidian", "Templates/", "lernplattform/"]):
        continue
    try:
        content = md_file.read_text(encoding="utf-8", errors="ignore")
    except:
        continue

    fm = {}
    if content.startswith("---"):
        end = content.find("\n---", 3)
        if end != -1:
            fm_text = content[3:end]
            for line in fm_text.split("\n"):
                if ":" in line:
                    k, _, v = line.partition(":")
                    fm[k.strip()] = v.strip().strip('"')

    links = re.findall(r'\[\[([^\]|#]+)', content)
    links = [l.strip() for l in links]

    results.append({
        "path": rel,
        "name": md_file.stem,
        "status": fm.get("status", "MISSING"),
        "publish": fm.get("publish", "MISSING"),
        "created": fm.get("created", "MISSING"),
        "todo": fm.get("todo", "MISSING"),
        "has_fm": bool(fm),
        "links": links,
        "has_schlüsselbegriffe": "Schlüsselbegriffe" in content,
        "has_überblick": "Überblick" in content,
    })

print(json.dumps(results, ensure_ascii=False))
