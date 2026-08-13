# High Desert Development website: project context

Read this first. Everything below is established fact from prior work, not guesswork.

## Who is who

- **Jerry Heller**, owner of High Desert Development. General contractor, based in California City CA.
  Underground utilities, custom homes, ADUs, concrete foundations, wood framing, remodeling,
  commercial, sports courts, deep wells. Several trades in house. In business since 1999.
  License #771814. Offers a 10% veterans discount and construction financing.
  Works roughly a **100 mile radius** from California City.
- **Raymond**, the developer who built the original site (Apex Code Works). Built it well.
  He is not the enemy. He handed the growth work to Anne. His credit line has been removed
  from the footer at Anne's instruction; do not put it back.
- **Anne**, Hive-Rise App & Web Development, Surprise AZ. Owns this work now. Quoted Jerry
  **$500 for everything** (down from $750 because Raymond covered part of the list for free).

## The site

Static HTML/CSS/JS. No framework, no build step, no package.json. **12 pages.**
Destination is GoDaddy cPanel hosting on `highdesertdevelopment.com`.
`site/README-GODADDY-UPLOAD.txt` is Raymond's upload guide and is still accurate.

Run it with `cd site && python3 -m http.server 8000`. That is the whole toolchain.

The real bottleneck is not code: **Raymond told Jerry to upload the files to GoDaddy himself,
and a contractor is not going to do that.** Getting the site live is part of the $500.

## The three things the site is built to say

Everything on this site is in service of these. If a change weakens one of them, it is the
wrong change.

1. **Jerry is on every job himself.** Not a salesman, not a project manager, not a rotating
   cast of subs. This is the differentiator and it appears in the hero, the proof bar, the
   intro section, the About page, the FAQ, `llms.txt` and the footer.
2. **A hundred miles in every direction.** Kern, Los Angeles and San Bernardino counties.
   California City is the home base, not the identity. See the geography rule below.
3. **Quality control follows from 1 and 2.** Every trade in house means the same crew carries
   a job from trench to finish, so nobody works around a stranger's mistakes.

## Geography rule

Anne's instruction: do not let the site read as a California City company. The reach is
roughly 100 miles from California City, which is Bakersfield to Victorville and Ridgecrest
to Santa Clarita.

- Region words to use: **Antelope Valley**, **High Desert**, and the three counties.
- California City appears as the home base (contact page, footer, schema address) and in the
  town lists. It is not in the H1 of any page any more.
- Mention counts were pulled from 5 to 8 per page down to 0 to 5. Keep them there.
- The town list used across the site was computed from real distances, not guessed. It is in
  `index.html` (`.area-list`), `contact.html` (`.service-areas`), `llms.txt` and the homepage
  `areaServed` schema. **If one changes they all change.**

## Standing rules for anything written for Jerry or as Anne

These are Anne's, they are non-negotiable, and they apply to code comments, page copy,
emails and reports alike.

1. **No em-dashes.** Anywhere. Ever.
2. **No exclamation points** in anything written as Anne.
3. **Verify before asserting.** Fetch the actual source. A summary of a page is not a check
   of a page. If two sources disagree, cut the claim. Never write something Anne could not
   have known first-hand.
4. **Never question Jerry's license, credentials, classifications or trades** in anything
   he will see. (Specifically: eHardHat lists license 840970 as Active while BuildZoom lists
   it cancelled. That conflict was checked, could not be resolved, and was removed from every
   deliverable. Do not reintroduce it.)
5. **Do not tell a client to go verify their own facts.**
6. **Do not recommend a street address.** High Desert Development is a service-area business.
   Google Business Profile should be set up as service-area, not address-based.
7. **Name the actor.** Say "Google", "ChatGPT", "somebody searching". Never "machines",
   never "AI systems", never "algorithms".
8. Client-facing writing is **second person**, plain, no marketing-deck furniture,
   no big-number stat tiles.
9. Every finding gets a one-line **"Why this matters"** and a one-line **"The fix."**
10. **Do not compare the new site to Jerry's old GoDaddy site** in any report.
11. Emails to prospects go out as **branded HTML through Resend with no attachments**.
    `.html` attachments get quarantined as phishing.

## The financing rule

Construction financing is a live selling point and it is also the easiest place to write
something false.

- What is **verified and safe to say**: construction loans pay out in stages (draws) as work
  is completed; during the build borrowers typically pay interest only on the amount drawn;
  most owner-occupied construction loans are construction-to-permanent (single-close,
  one-time-close) and convert into an ordinary mortgage when the house is finished; the
  alternative is a two-close arrangement requiring a separate refinance. Source:
  Fannie Mae Selling Guide B5-3.1-02 and standard lender documentation.
- What is **not verified**: whether Jerry's own lender writes single-close or two-close.
  Every mention on the site is therefore written as how these loans generally work, followed
  by "ask before you sign". **Do not rewrite it as his specific product** until Jerry names
  the lender.
- **Never publish rates, APRs, payment amounts or terms.** Stating credit terms in an
  advertisement pulls in Regulation Z disclosure requirements, and Jerry is a contractor,
  not a lender.

## Design system

Extracted from the approved homepage redesign and applied to all 12 pages through one
stylesheet, `site/styles/main.css`. Tokens are CSS custom properties at the top of that file.

```
--ink        #0d2133   header, hero, footer
--navy       #18324a   headings, dark bands
--sand       #d8c3a5   financing band, accents, hairlines
--sand-soft  #f7f4ee   warm section background
--bronze     #9b6025   primary action
--bronze-lit #b06e2b   action hover
--bronze-txt #d49a5b   bronze on dark
--shell      min(calc(100% - 3rem), 1200px)
```

Montserrat 600/700/800 for headings and UI, Open Sans for body. Square corners everywhere,
no border radius, no drop shadows except the one on the hero CTA. Sections are `padding-block`
based, never margin based.

The hero deserves a note because it took the most work. `.hero-media` is a graded webp
derivative built from `custom_home_twilight_exterior.jpg` (crop, slight saturation and
contrast lift, unsharp mask), sitting under a three-pass overlay: a bronze wash low in the
frame, a two-axis reading scrim weighted left where the type sits, and a corner vignette,
plus a sand hairline at the base and a 26 second scale drift. On screens under 760px the
diagonal scrim is dropped and the photo is panned right so the house still reads.
`.interior-hero` is the drawn version of the same idea for the other 11 pages.

## Conventions in the codebase

- Phone links: `<a class="tel-link" href="tel:+17603822658">760-382-2658</a>`.
  Jerry's number is **760-382-2658** and it is the only number anywhere in `site/`.
  The 442 number that used to be in the footer was Raymond's own text line, removed.
- Header and footer markup is **duplicated across all 12 pages** because there is no build
  step. If you change one, change all twelve. The script that generated them is the pattern
  to copy: read each file, regex-replace between `<header class="site-header">` and
  `</header>`, write back.
- Structured data is one `<script type="application/ld+json">` per page. The homepage carries
  the `GeneralContractor` entity, service pages carry `Service`, `about.html` carries `Person`,
  `faq.html` carries `FAQPage`, `cost-to-build-on-a-lot.html` carries `Article`.
  **Never run a regex over the whole file that could touch JSON-LD.** A tel: link rewrite did
  exactly that once and injected `<a>` tags into six schema blocks.
- `scripts/main.js` toggles the mobile nav with the class `open` (not `is-open`), handles the
  video dialog, and stores the last-viewed service category in localStorage to preselect the
  contact form dropdown. That one localStorage write is deliberate and useful. The live clock
  and the form-data write were both removed and should stay removed.
- `llms.txt` at the root is the plain-language summary answer engines read. If services,
  counties, the phone number or the financing wording change, update it in the same commit.
- `sitemap.xml` lists all 12 pages. Adding a page means adding it there and to both navs.

## Where things live

- `site/` the website, upload-ready. Current source of truth.
- `reference/full-review.html` the audit Jerry has already read, published (noindexed) at
  `hive-rise.com/high-desert-development/`.
- `reference/followup-email-500.html` the $500 follow-up email, ready to send via Resend.
- `reference/homepage-redesign-source.html` the bundled redesign artifact this design came
  from
- `HANDOFF.md` what is left, what is blocked on Jerry, and the questions to ask him.
- `CHANGELOG.md` every change with before and after numbers.
