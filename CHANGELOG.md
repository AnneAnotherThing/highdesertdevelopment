# What changed

Baseline is Raymond's build at GitHub HEAD (2026-08-11), which is byte-identical to
`Jerry updated.zip`. Every number below was measured, not estimated.

| Check | Before | After |
|---|---|---|
| Tap-to-call links | 0 | 11 |
| Pages with social sharing tags (Open Graph / Twitter) | 3 of 9 | 10 of 10 |
| Pages with a favicon | 0 of 9 | 10 of 10 |
| Service pages cross-linked to each other | 0 | 10 of 10 |
| Facebook page in schema `sameAs` | no | yes |
| Site's own URL wrongly in `sameAs` | yes | removed |
| City and state in schema | absent | California City, CA |
| Opening hours and financing offer in schema | absent | present |
| Live JavaScript clock (`setInterval`) | 1 | 0 |
| Form data written to browser storage | yes | none |
| Images folder | 15.9 MB | 11.0 MB |
| Images over 300 KB | 16 | 0 |
| Flyer graphics sitting in photo galleries | 5 | 1 |
| Financing mentioned on the site | 0 pages | 4 pages |
| `llms.txt` | absent | present |
| Mobile homepage height | 17,058 px | 9,089 px |
| Invalid JSON-LD blocks | n/a | 0 |

## New files

- `sports-courts.html`, a real page for pickleball and tennis courts, 448 words, its own
  `Service` schema. This was buried in one paragraph before, and no other contractor in the
  area advertises it.
- `llms.txt`, 293 words. Plain-language company summary for ChatGPT and similar.
- `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`.

## Page-level changes

**index.html**
- Proof bar under the hero: since 1999, license #771814, three counties, financing,
  10% veterans discount. Plain facts, no stat-tile styling.
- Financing band. The construction financing offer was previously trapped inside a JPEG of
  Jerry's jobsite sign, which nothing can read.
- Long services list collapsed into `<details>` so the mobile page is not a mile long.
- Seventh service card added for sports courts.
- JSON-LD rewritten: `GeneralContractor`, `areaServed` for the three counties,
  `makesOffer`, `openingHoursSpecification`, `hasCredential`, Facebook in `sameAs`.

**about.html**
- `Person` schema for Jerry Heller.
- The photo slot still holds a picture of his jobsite sign. See HANDOFF.md.

**styles/main.css**
- Appended `/* ---- Hive-Rise additions ---- */`: `.tel-link`, `.proof-bar`,
  `.service-list-details`, `.financing-band`, `.footer-services`, `.plain-list`.
- Facebook blue `#1877f2` replaced with the site palette.
- Footer grid was `1fr auto` and the new services nav became an unwanted third item.
  Fixed with `grid-column: 1 / -1; order: -1`.

**scripts/main.js**
- Live clock removed.
- `hddProjectInquiry` localStorage write removed. Form entries were being kept in the
  visitor's browser with no reason to be there.

**sitemap.xml**: `sports-courts.html` added.

## Verification

All 10 pages load with status 200, 0 broken images, 0 JavaScript errors.
The only console message is Google Fonts failing to resolve in the offline sandbox,
which will not happen on a real host.
Checks that looked like defects and turned out not to be: all 16 images do load (they are
lazy-loaded), the skip link is correct focus-only behaviour, the contact map is a genuine
Google iframe, and the videos are genuine Vimeo iframes.
