# High Desert Development

Jerry Heller's website, plus everything Hive-Rise knows about the job.

**Start with `CLAUDE.md`.** It has the people, the standing rules for anything written for
Jerry, and the conventions in the code. Then `HANDOFF.md` for what is left.

```
CLAUDE.md      who is who, the rules, the conventions
HANDOFF.md     what is done, what is left, what is blocked on Jerry
CHANGELOG.md   every change with before/after numbers
site/          the website, upload-ready
reference/     the review Jerry read, the follow-up email, baseline notes
```

## Running it

No build step. It is static HTML.

```
cd site && python3 -m http.server 8000
```

## Deploying it

GoDaddy cPanel, `highdesertdevelopment.com`. Steps are in `site/README-GODADDY-UPLOAD.txt`.
Getting it live is the single highest-value thing left to do.
