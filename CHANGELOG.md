# What changed

Two passes, both on top of Raymond's build at GitHub HEAD 2026-08-11 (byte-identical to
`Jerry updated.zip`). Every number below was measured, not estimated.

---

## Pass 2: the redesign, the geography and the new pages

Driven by the approved homepage redesign artifact plus Anne's direction: widen off California
City, drive home that Jerry is on every job within a 100 mile radius, and add the pages that
answer what people actually search for.

### Design

The redesign was a homepage-only artifact. It has been extracted into a design system and
applied to **all 12 pages** through one stylesheet, so nothing looks like the old build.

| | before | after |
|---|---|---|
| Palette | mixed blues, Facebook blue | navy `#0d2133` / `#18324a`, sand `#d8c3a5`, bronze `#9b6025` |
| Pages on the new design | 0 | 12 |
| `styles/main.css` | inherited, ad hoc | rewritten as one tokenised system |
| Header | text nav | sticky, brand lockup with "California Contractor", bronze call button |
| Mobile nav | broken class name (`is-open` vs `open`) | working |
| Hero | flat 480px stock-ish photo, single scrim | graded twilight plate, three-pass overlay, slow drift, sand hairline |
| Interior page heads | plain band | matched treatment across all 11 |
| Service cards | copy running inline as one string | stacked, numbered, bronze rule above the link |
| Featured work | broken grid, caption collision | 5-frame gallery, one large plate |
| Walkthrough videos | forced 16:9 on portrait sources | 9:16, correctly framed |

**The hero.** A new derivative was built from `custom_home_twilight_exterior.jpg`: cropped to
a cinematic band, saturation and contrast lifted slightly, unsharp masked, exported as webp at
1400 / 1000 / 700 (84 KB / 58 KB / 32 KB). Over it sit a bronze wash low in the frame, a
two-axis reading scrim weighted to the left where the type sits, a corner vignette, a sand
hairline along the base, and a 26 second scale drift that is disabled under
`prefers-reduced-motion`. Under 760px the diagonal scrim is dropped and the photo pans right
so the lit house still reads behind the headline.

### Geography

| | before | after |
|---|---|---|
| H1s naming California City | 9 of 9 | 0 of 12 |
| "California City" mentions per page | 5 to 8 | 0 to 5 |
| Schema `areaServed` entries | 9 | 24 |
| Counties in schema | Kern, LA, **Inyo** | Kern, LA, **San Bernardino** |
| `GeoCircle` service radius | absent | 160,934 m from California City |
| Named towns on the site | 19, unverified | 27, distance-checked |

The town list was computed by haversine from California City rather than guessed. Inyo County
was dropped because the nearest Inyo town is 156 miles out, past the radius. San Bernardino
County replaced it because Victorville, Apple Valley, Hesperia, Adelanto and Barstow are all
inside 65 miles.

New homepage section, "A hundred miles in every direction", with the full town list.
New proof-bar entries: **100 miles, Bakersfield to Victorville** and **Owner on site,
Jerry is on every job**.

### Message

The homepage intro was rewritten from generic experience copy into the actual argument:
most builds get handed down a chain and that is where the quality goes; here the owner is on
site and the trades are in house. The same point now runs through the hero, the proof bar,
the About page value cards, the FAQ, the footer and `llms.txt`.

The About page value cards were renamed from "Clear Communication / Careful Planning /
Quality Workmanship" to "One person to ask / Every trade in house / Quality Workmanship",
with the copy rewritten to say why rather than assert it.

### New pages

- **`faq.html`**, 12 questions across three sections, with `FAQPage` structured data so
  Google and ChatGPT can quote individual answers. Covers financing, land, and how the job
  is run.
- **`cost-to-build-on-a-lot.html`**, ~1,100 words with `Article` schema. The land angle from
  the original review, finally written: is it a legal lot, how does water get there, how does
  power get there, will the ground take septic, what else the site needs, then permits. This
  is the page nobody local has written, aimed at people who own decades-old desert parcels.

### Financing

Construction financing now appears on 6 pages instead of 4, and the explanation goes further
than "available": construction loans pay out in draws, borrowers usually pay interest only
during the build, and most owner-occupied construction loans are construction-to-permanent,
converting into an ordinary mortgage when the house is finished rather than coming due.

Written throughout as how these loans generally work, not as a claim about Jerry's specific
lender, because that has not been verified. No rates, APRs or terms anywhere. See the
financing rule in `CLAUDE.md`.

### Removed

- The "Website created by APEX CODE WORKS" footer credit, on Anne's instruction.
- `<meta name="author" content="Raymond Amande">` from every page.

### Plumbing

`sitemap.xml` rebuilt to 12 URLs. `llms.txt` rewritten to 514 words with the radius, the
owner-on-site point, the financing explanation and the land summary. All 11 JSON-LD blocks
validate. All internal links and image paths resolve. Every page returns 200 at 1440px and
390px with zero broken images, zero JavaScript errors and zero horizontal overflow.

---

## Pass 1: the audit fixes

| Check | Before | After |
|---|---|---|
| Tap-to-call links | 0 | 30 |
| Pages with social sharing tags | 3 of 9 | 12 of 12 |
| Pages with a favicon | 0 of 9 | 12 of 12 |
| Service pages cross-linked | 0 | 12 of 12 |
| Facebook page in schema `sameAs` | no | yes |
| Site's own URL wrongly in `sameAs` | yes | removed |
| City and state in schema | absent | present |
| Opening hours and financing offer in schema | absent | present |
| Live JavaScript clock (`setInterval`) | 1 | 0 |
| Form data written to browser storage | yes | none |
| Images folder | 15.9 MB | 12 MB |
| Images over 300 KB | 16 | 0 |
| Flyer graphics in photo galleries | 5 | 0 |
| `llms.txt` | absent | present |
| Invalid JSON-LD blocks | n/a | 0 |

New in pass 1: `sports-courts.html` (448 words, own `Service` schema), `llms.txt`,
`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`.

Removed in pass 1: the footer clock, the `hddProjectInquiry` localStorage write, and
Raymond's stray `fix_lowercase_url.py` from the web root (kept in `reference/`).

---

## Pass 3: the printed sheets

Pass 1 pulled the flyers out of the photo galleries because a portrait poster landed in a
300px column beside landscape job photographs and got stretched past its own resolution.
Jerry is proud of them, so they are back, in a band of their own rather than mixed in with
the pictures of work.

| | before | after |
|---|---|---|
| Flyers on the site | 1, inside a photo grid | 7, out of the photo grids, on 6 pages |
| Widest a flyer is ever drawn | 300px+, upscaled | 210px, capped, never past its own resolution |
| Flyers you can read at full size | 0 | 4, in a dialog |
| Flyers printing a phone number that is not 760-382-2658 | 1 | 0 |

**Where they sit.** Five service pages carry a "Printed sheets" band below the gallery:
`underground-utilities` (utilities), `concrete-work` (commercial concrete, stamped concrete,
block walls), `commercial-construction` (every trade), `new-construction-residential`
(new homes), `sports-courts` (pickleball courts).

The seventh is the home extension sheet, and it does not sit in a band. It is the Kyle
Gordon Group's piece, not Jerry's, so it rides in the walkthroughs band on the homepage
next to the realtor-filmed videos rather than in the remodeling gallery. On the ink ground
its white mat does the job the plate does for the badge: without it a dark poster on a dark
band reads as a hole.

**The 3948 problem, closed.** `beautiful_concrete_flyer.jpg` prints 760-382-3948, which is
why pass 1 held it back. Its contact strip has been cropped off at the band's own edge, at
y=995, measured rather than guessed. What survives is the headline, both photographs, the
service list and the six feature icons, and the page around it already carries the right
number. Reissued as `stamped_concrete_flyer` at 480 and 768 (55 KB / 123 KB). The uncropped
original stays in `images/` as the source and is referenced by nothing.

`underground_utilities-optimized.png` was a 222 KB PNG and is now
`underground_utilities_flyer` at 480 and 768 webp (75 KB / 156 KB).

**Four of the seven exist only as thumbnails**, between 182 and 210px wide, with no larger
original in the handoff zip or the image manifest. Those are drawn at their own size and
carry no enlarge link, which is why the rack caps at 210px rather than filling the row.

Note on the stamped concrete sheet: the source Jerry supplied is itself clipped on the right
edge, so the last icon column reads "proudly serving Californ". That is in the original, not
the crop, and only a new export from Jerry fixes it.

---

## Pass 4: the fire rebuild page

`rebuilding-after-a-fire.html`, the thirteenth page, built the way
`cost-to-build-on-a-lot.html` is built: an `Article` page that answers the question
rather than pitching against it. Roughly 1,050 words. Jerry's stated boundary holds,
Altadena is named and Palisades appears nowhere on the site, which is checked on every
page rather than assumed.

| | before | after |
|---|---|---|
| Pages | 12 | 13 |
| Pages answering a search rather than listing a service | 1 | 2 |
| Sitemap entries | 12 | 13 |
| Footer navigation links | 4 | 5, on all 13 pages |

Sections: whether the foundation survived, which is an engineer's call and not a site
walk; clearance before design; the faster permit route for rebuilding close to what was
lost; the wildfire exterior standards; what an adjuster's scope expects an estimate to
look like; the four contract rules; and checking a licence at CSLB.

**Every legal claim on the page was verified against a primary source**, not a summary.
The deposit cap of $1,000 or 10 percent whichever is less, and the seven business day
right to cancel where an emergency was declared, are CSLB's own wording. The reason time
and materials and cost plus do not work is that a home improvement contract has to state
a fixed total and a payment schedule in dollars, and rebuilding a home counts as home
improvement.

One claim was caught mid-move. The wildfire exterior provisions are widely written up as
Chapter 7A of the California Building Code, and Chapter 7A now reads only "Provisions for
Materials and Construction Methods for Exterior Wildfire Exposure are now located in Part
7, California Wildland-Urban Interface Code." The page states the requirement, names both,
and explains the discrepancy rather than repeating the stale name. No permit counts or
approval timelines are printed anywhere, and the Los Angeles County rebuild programme is
linked rather than described, so the page does not go stale as that programme changes.

No financing band on this page. It sits on every other long page and it reads wrong
against a total loss.

---

## Verification

All 12 pages, both viewports: status 200, 0 broken images, 0 JavaScript errors,
0 horizontal overflow. 11 JSON-LD blocks, 0 invalid. 0 missing link or image targets.
30 `tel:` links, all on 760-382-2658, which is the only number in the codebase.

The only console message in the sandbox is Google Fonts failing to resolve offline, which
will not happen on a real host.

Checks that looked like defects and were not: all images do load (lazy-loaded), the skip link
is correct focus-only behaviour, the contact map is a real Google iframe, and the walkthrough
videos are real Vimeo iframes that render empty only because the sandbox has no network.
