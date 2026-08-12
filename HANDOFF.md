# Handoff

## State

`site/` is finished and upload-ready. Nothing in it is half-done.
Everything still open is either off the website entirely, or blocked on Jerry sending
something only he has.

## Still to do, on the site

1. **Get it live.** Upload `site/` to GoDaddy cPanel on `highdesertdevelopment.com`.
   `site/README-GODADDY-UPLOAD.txt` has the steps. Jerry is not going to do this himself,
   which is why the site has sat finished and offline. This is the single highest-value
   action in the whole engagement.
2. **Analytics.** Nothing is measuring traffic. Add a lightweight tag once the domain is live.
3. **Submit the sitemap** to Google Search Console after the domain switches over.

## Still to do, off the site

These are worth more than the code work and none of them need a developer.

1. **Google Business Profile.** There is no listing. Set it up as a **service-area business**
   showing Kern, San Bernardino and Los Angeles counties, not a street address. Free.
   This decides whether Jerry appears at all when somebody local searches.
2. **Directory cleanup.** He is currently listed under four different phone numbers and
   three different addresses across BuildZoom, Manta and others. Make every listing say
   760-384-3415 and the same service area.
3. **First reviews.** 34 permits and 26 years of work, four reviews online. Once the Google
   listing exists this is a text message to past customers.

## Blocked on Jerry

Do not invent content for any of these. Ask him.

1. **A photo of him.** The About page slot currently holds a photo of his jobsite sign.
   The single biggest trust change available and it costs nothing.
2. **Real job photos for commercial construction.** That gallery has exactly one real photo.
   A flyer graphic was deliberately left in place rather than leaving the section empty.
   He has hundreds of photos.
3. **Testimonials.** A few lines from past customers, if there are any he is comfortable
   asking.

## Anne's own steps

1. `git push` commit `4e14f11` in the Hive-Rise repo. This is the published review page at
   `hive-rise.com/high-desert-development/` plus its robots.txt line. Committed, not pushed.
2. Send `reference/followup-email-500.html` to Jerry through Resend. No attachment.
3. Optional: the DMARC `rua` change discussed for deliverability. Do not touch SPF.
   The include chain resolves correctly through `secureserver.net` to
   `spf.protection.outlook.com` and authentication is healthy. An earlier read of only the
   top-level record suggested otherwise and was wrong.
4. Get permission from Jerry before publishing any of this. The framing already sent him is
   that it is his site and his call, Raymond built something good, and the goal is to leave
   it better than she found it.

## Notes worth keeping

- The spam problem on the first email was content and reputation, not authentication:
  an attachment, an emoji in the subject line, an image-based header, and a cold Yahoo
  mailbox. The fix was publishing the review as a link and sending plain branded HTML with
  no attachment. Keep doing that.
- There is another concrete company called High Desert Development in St. George, Utah,
  started two years earlier. Naming California City throughout the site is part of why that
  matters.
- The California City angle is the strongest growth idea and is not on the website yet:
  most of the city is decades-old vacant lots, every owner eventually asks what it costs to
  get water, power and septic to the lot, and right now only national cost-guide sites
  answer that. A local page answering it properly would reach people at the moment they
  decide to build.
