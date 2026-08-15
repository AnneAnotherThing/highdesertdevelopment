# Handoff

`site/` is finished and upload-ready at 12 pages. Everything below is either off the website,
blocked on Jerry, or a judgement call worth making deliberately rather than inheriting.

## Ask Jerry these six things

Each one unblocks something specific that is currently written around.

1. **The exact radius.** The site says a hundred miles and the town list was computed from
   that. If his real number is 75 or 150, the list in `index.html`, `contact.html`,
   `llms.txt` and the homepage `areaServed` schema all change together.
2. **Who is the construction-financing lender, and is it single-close or two-close?**
   Right now the site explains how construction-to-permanent loans work generally and tells
   people to ask before signing. With the lender named it can say what his actually does,
   which is a much stronger page. Do not tighten this without the answer.
3. **A photo of him.** The About page slot still holds a photo of his jobsite sign. The whole
   site now argues that the owner is the one on your job, and the owner has no face on it.
   This is the single highest-value thing he can hand over and it costs nothing.
4. **Real job photos for commercial construction.** That gallery has one real photo, and the
   every-trade sheet now sits in its own band below rather than padding out the grid. He has
   hundreds of pictures. Any three or four good ones fill it.
   While asking: **the print files for six of the seven sheets.** Only the commercial
   concrete and stamped concrete sheets survive at a size worth reading. The rest came over
   as thumbnails between 182 and 210px wide, so they are drawn small and cannot be enlarged.
   Whatever he sent to the printer would let all of them open full size. The stamped concrete
   sheet also needs a re-export: the file is clipped on the right edge, and its contact strip
   prints 760-382-3948, which is why the strip is cropped off on the site.
5. **Testimonials.** A few lines from past customers, if there are any he is comfortable
   asking. There is no social proof on the site at all.
6. **Is he a veteran himself?** He offers a 10% veterans discount. If he is one, there are
   California certifications that carry real weight on public bid work. This was deliberately
   kept out of writing because it is a question, not a finding.

## Still to do, on the site

1. **Get it live.** This moved to **Cloudflare deployed from GitHub**, not the GoDaddy
   cPanel upload Raymond described. The source is pushed to
   `AnneAnotherThing/highdesertdevelopment` on `main`, and `site/wrangler.jsonc` is in
   place, so a build should now clone and deploy. What is left is pointing
   `highdesertdevelopment.com` at Cloudflare and confirming the deploy serves the site.
   Still the highest-value action in the engagement.
2. **Test the contact form with Jerry, after launch.** The form posts to FormSubmit at
   his Yahoo address, and FormSubmit delivers nothing until the address is activated by
   clicking a link in an email it sends on the first submission. Raymond built this and
   nobody knows whether he ever activated it. Do not send a test submission before launch:
   the redirect lands on the live domain, and the activation email would hit Jerry's inbox
   with no context. Post launch, send one labelled test, have Jerry look for the FormSubmit
   activation email (spam folder included), click it, then send a second test to confirm
   delivery. The client side is verified: validation, honeypot, redirect and the thank-you
   message all work.
3. **Analytics.** Nothing is measuring traffic. Add a lightweight tag once the domain is live.
4. **Submit the sitemap** to Google Search Console after the switch.
4. **Retina hero.** The hero source is only 1400px wide, so on a 2x display at full width it
   is soft. The grading and scrim hide most of it. If Jerry can find the original camera file
   of that twilight shot, regenerate the derivatives at 2400px.

## Fire rebuild work, and the one boundary Jerry set

Jerry is open to rebuild work after the January 2025 fires, with one exclusion he
stated himself: **the Pacific Palisades area is off limits. Altadena is fine.**

Both of the things that would make him findable there are now built.

1. **Altadena is in the service area.** Homepage town list, `contact.html` aside,
   `llms.txt` and the homepage `areaServed` schema. It sits inside the stated
   hundred-mile radius, and that radius is still one of the unconfirmed items above.
2. **`rebuilding-after-a-fire.html`**, written the way `cost-to-build-on-a-lot.html`
   is written. Roughly 1,050 words on the foundation question, site clearance, the
   faster permit route for rebuilding close to what was there, the wildfire exterior
   standards, what an adjuster's scope expects, the four contract rules, and how to
   check a licence at CSLB. Linked from the footer of all 13 pages, from the new
   construction page in context, and carried in `sitemap.xml` and `llms.txt`.
   Palisades appears nowhere on the site, which is checked.

**Still open, and it decides how far this page can be pushed:** how far into Los
Angeles County will Jerry actually drive. The page names Altadena and the foothill
communities because those he approved. Anything wider waits on his answer.

Two facts on that page will need re-checking over time, because both moved once
already. The wildfire exterior provisions left Chapter 7A of the building code and
now sit in the California Wildland-Urban Interface Code, and the page says so
deliberately, because a homeowner reading an older guide will meet the discrepancy.
The Los Angeles County rebuild programme is linked rather than described, so that
its details can change without the page going stale.

Do not write outreach into the fire areas. California restricts contractor
solicitation in declared disaster zones, and beyond the law it would undercut
everything the rest of the site says about how he works. Be findable, not present.

## Still to do, off the site

Worth more than the code work, and none of it needs a developer.

1. **Google Business Profile.** There is no listing. Set it up as a **service-area business**
   covering Kern, Los Angeles and San Bernardino counties, not a street address. Free, and it
   decides whether he appears at all when somebody local searches.
2. **Directory cleanup.** He is listed under four different phone numbers and three different
   addresses across BuildZoom, Manta and others. Make every listing say 760-382-2658 and the
   same service area.
3. **First reviews.** 34 permits and 26 years of work, four reviews online. Once the Google
   listing exists this is a text message to past customers.

## Deliberately not done

- **No blog.** It was on the table and was left off on purpose. A blog only works if somebody
  keeps feeding it, and an abandoned one reads worse than none. The FAQ and the vacant-lot
  page do the same job for search without needing maintenance. If a blog does get added later,
  the honest question is who writes post number four.
- **No testimonials section scaffolding.** Empty placeholder quotes look worse than no
  section. Add it when there are real quotes.
- **Financing not stated as Jerry's specific product.** See question 2 above.

## Anne's own steps

1. `git push` commit `4e14f11` in the Hive-Rise repo. That is the published review page at
   `hive-rise.com/high-desert-development/` plus its robots.txt line. Committed, not pushed.
2. Send `reference/followup-email-500.html` to Jerry through Resend. No attachment.
3. Get his sign-off before publishing. The framing already sent him is that it is his site
   and his call.
4. Optional: the DMARC `rua` change. **Do not touch SPF.** The include chain resolves
   correctly through `secureserver.net` to `spf.protection.outlook.com` and authentication is
   healthy. An earlier read of only the top-level record suggested otherwise and was wrong.

## Notes worth keeping

- The spam problem on the first email was content and reputation, not authentication:
  an attachment, an emoji subject line, an image header, and a cold Yahoo mailbox. The fix
  was publishing the review as a link and sending plain branded HTML with no attachment.
- There is another concrete company called High Desert Development in St. George, Utah,
  started two years earlier. Naming the region consistently is part of why that matters.
- The redesign artifact this design came from is in `reference/homepage-redesign-source.html`.
  It is a bundled Claude artifact: the markup and assets live in two `<script>` tags at the
  bottom, base64 and gzip, and it needs React from unpkg to self-render. To read it without
  network, parse the `__bundler/template` and `__bundler/manifest` script tags directly.
