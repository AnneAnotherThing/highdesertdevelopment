# High Desert Development

Jerry Heller's website, plus everything Hive-Rise knows about the job.

**Start with `CLAUDE.md`.** It has the people, the three things the site is built to say,
the geography rule, the financing rule, the design tokens and the code conventions.
Then `HANDOFF.md` for what is left and the six questions to ask Jerry.

```
CLAUDE.md      context, rules, design system, conventions
HANDOFF.md     what is left, what is blocked on Jerry, what was left out on purpose
CHANGELOG.md   both passes, with before and after numbers
site/          the website, 12 pages, upload-ready
reference/     the review Jerry read, the $500 email, the redesign artifact
```

## Running it

No build step, no dependencies. It is static HTML.

```
cd site && python3 -m http.server 8000
```

## Working on it

There is no templating, so the header and footer are duplicated across all 12 pages.
Change one, change all twelve. `CLAUDE.md` has the pattern.

Before committing anything:

```
# every JSON-LD block parses
python3 -c "
import re,json,glob,pathlib
for f in sorted(glob.glob('site/*.html')):
    for m in re.finditer(r'<script type=\"application/ld\+json\">(.*?)</script>', pathlib.Path(f).read_text(), re.S):
        try: json.loads(m.group(1))
        except Exception as e: print('INVALID', f, e)
print('done')"

# no em-dashes anywhere, house rule
grep -rn '—' site/ *.md && echo FAIL || echo clean
```

## Deploying it

GoDaddy cPanel, `highdesertdevelopment.com`. Steps are in `site/README-GODADDY-UPLOAD.txt`.
Getting it live is the highest-value thing left to do.
