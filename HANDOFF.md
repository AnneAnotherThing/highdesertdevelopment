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
4. **Real job photos for commercial construction.** That gallery has one real photo. A flyer
   graphic was left in deliberately rather than leaving a hole. He has hundreds.
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
