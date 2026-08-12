from pathlib import Path
files = list(Path('.').glob('*.html'))
repls = [
    ('Visit Our Old Website', 'visit highdesertdevelopment.com'),
    ('Visit the old High Desert Development website (opens in a new tab)', 'Visit highdesertdevelopment.com (opens in a new tab)'),
    ('This is the same High Desert Development company—visit our old website and Facebook page for more information and project photos.', 'Visit highdesertdevelopment.com and our Facebook page for more information and project photos.'),
    ('This is the same High Desert Development company—visit our old website and Facebook page for additional information and project photos.', 'Visit highdesertdevelopment.com and our Facebook page for more information and project photos.'),
]
changed = []
for p in files:
    text = p.read_text(encoding='utf-8')
    new = text
    for old, new_text in repls:
        new = new.replace(old, new_text)
    if new != text:
        p.write_text(new, encoding='utf-8')
        changed.append(p.name)
print('Updated:', ', '.join(changed))
