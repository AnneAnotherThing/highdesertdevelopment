# High Desert Development website: project context

Read this first. Everything below is established fact from prior work, not guesswork.

## Who is who

- **Jerry Heller**, owner of High Desert Development. General contractor, California City CA.
  Underground utilities, custom homes, ADUs, concrete foundations, wood framing, remodeling,
  commercial, sports courts. Several trades in house. In business since 1999.
  License #771814. Offers a 10% veterans discount and construction financing.
  Serves 19 cities across Kern, San Bernardino and Los Angeles counties.
- **Raymond**, the developer who built the current site (Apex Code Works). Built it well.
  He is not the enemy. Credit him where relevant. He handed the growth work to Anne.
- **Anne**, Hive-Rise App & Web Development, Surprise AZ. Owns this work now. Quoted Jerry
  **$500 for everything** (down from $750 because Raymond covered part of the list for free).

## The site

Static HTML/CSS/JS. No framework, no build step, no package.json. 10 pages.
Destination is GoDaddy cPanel hosting on `highdesertdevelopment.com`.
`site/README-GODADDY-UPLOAD.txt` is Raymond's upload instructions and is accurate.

The real bottleneck is not code: **Raymond told Jerry to upload the files to GoDaddy himself,
and a contractor is not going to do that.** Getting the site actually live is part of the $500.

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
10. **Do not compare the new site to Jerry's old GoDaddy site** in any report. That comparison
    lives only as a couple of credit lines in an email, and the old site is coming down anyway.
11. Emails to prospects go out as **branded HTML through Resend with no attachments**.
    `.html` attachments get quarantined as phishing, and any attachment from a new sender
    raises the spam score.

## Hive-Rise email house style

Pattern file: `reference/followup-email-500.html`. 600px table layout, text-only brand bar
`#17431e` with the gold `#e6b43c` wordmark, `#c4a65a` hairline under it, Georgia italic
pull-quotes in `#f4f6f1` boxes with a gold left rule, gold bullet tables, the badge at
`https://hive-rise.com/hive-rise-badge-2x.png`, and a P.S. block on `#f8f7f3`.

Brand colors: GREEN `#17431E`, FOREST `#2F6036`, DARK `#0A2F14`, GOLD `#E6B43C`,
gold hairline `#C4A65A`, fill `#EDF1EA`.

## Where things live

- `site/`, the rebuilt, upload-ready website. This is the current source of truth.
- `reference/full-review.html`, the audit Jerry has already read. Published (noindexed) at
  `hive-rise.com/high-desert-development/`.
- `reference/followup-email-500.html`, the $500 follow-up email, ready to send via Resend.
- `reference/raymond-fix_lowercase_url.py`, a stray script that was sitting in Raymond's
  web root. Pulled out of `site/` so it does not ship. Kept only for reference.
- `HANDOFF.md`, what is done, what is left, what is blocked on Jerry.
- `CHANGELOG.md`, every change made, with before/after numbers.

## Conventions in the codebase

- Phone links: `<a class="tel-link" href="tel:+17603822658">760-382-2658</a>`.
  Jerry's number is **760-382-2658** and it is the only number anywhere in `site/`
  (21 display instances, 11 `tel:` hrefs, all matching). The 442 number that used to appear
  in the footer was Raymond's own text line and has been removed.
- All Hive-Rise CSS additions are appended at the bottom of `styles/main.css` under a
  `/* ---- Hive-Rise additions ---- */` banner. Keep new rules there so they stay separable
  from Raymond's stylesheet.
- Structured data is one `<script type="application/ld+json">` per page. The homepage carries
  the `GeneralContractor` entity, service pages carry `Service`, `about.html` carries `Person`
  for Jerry. **Never run a regex over the whole file that could touch JSON-LD.** A tel: link
  rewrite did exactly that once and injected `<a>` tags into six schema blocks.
- `llms.txt` at the root is a plain-language summary for answer engines. If services, counties
  or the phone number change, update it too.
