/**
 * The only server-side code on this site.
 *
 * Everything else is a static asset. Cloudflare tries the asset layer first, so
 * all 14 pages, the extensionless URLs and _headers behave exactly as they did
 * before this file existed. Only a path with no matching asset reaches here.
 *
 * This handler exists for one job: take a project inquiry from /contact and
 * email it to Jerry, without a third party in the middle.
 *
 * Secrets it needs (set with: npx wrangler secret put NAME):
 *   RESEND_API_KEY        the Resend key that sends the mail
 *   TURNSTILE_SECRET_KEY  the server half of the spam check
 * Neither value belongs in this repo.
 */

// Where inquiries land. Jerry first, because he is the one who calls back.
const TO = ['highdesertdevelopment@yahoo.com', 'jerry@highdesertdevelopment.com'];
const CC = ['anne@hive-rise.com'];

// Resend will only send as a domain it has verified. Once
// highdesertdevelopment.com is verified this is the From address; until then
// FROM_FALLBACK is what works, and the reply-to is the customer either way.
const FROM = 'High Desert Development <website@highdesertdevelopment.com>';
const FROM_FALLBACK = 'High Desert Development <onboarding@resend.dev>';

const SERVICES = {
  utilities: 'Underground utilities',
  septic: 'Sewer or septic',
  concrete: 'Concrete or masonry',
  commercial: 'Commercial construction',
  residential: 'Custom residential',
  adu: 'Custom ADU',
  remodeling: 'Remodeling',
  courts: 'Sports courts',
  other: 'Other or not sure',
};

const LIMITS = { name: 120, email: 160, phone: 40, location: 120, details: 4000 };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/inquiry') return handleInquiry(request, env, url);
    // Not the API and not an asset: hand it back to the asset layer, which
    // answers 404 the same way it did before this Worker was added.
    return env.ASSETS.fetch(request);
  },
};

async function handleInquiry(request, env, url) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  // A browser sends Origin on a form POST. If it is present and not ours, the
  // post came from somewhere else and we are not interested.
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return new Response('Forbidden', { status: 403 });

  const wantsJson = (request.headers.get('content-type') || '').includes('application/json');
  let body;
  try {
    body = wantsJson ? await request.json() : formToObject(await request.formData());
  } catch (err) {
    return reply(wantsJson, 400, 'That form did not arrive in one piece. Please try again.', url);
  }

  // The honeypot. A person never fills this in, so a filled one is a bot.
  // Answer as though it worked: a bot that gets an error retries.
  if (text(body._honey)) return reply(wantsJson, 200, null, url);

  const passed = await verifyTurnstile(body['cf-turnstile-response'], env, request);
  if (!passed) {
    return reply(wantsJson, 400, 'The spam check did not pass. Reload the page and try once more.', url);
  }

  const fields = {
    name: clamp(body.name, LIMITS.name),
    email: clamp(body.email, LIMITS.email),
    phone: clamp(body.phone, LIMITS.phone),
    service: text(body.service),
    location: clamp(body.location, LIMITS.location),
    details: clamp(body.details, LIMITS.details),
  };

  const missing = ['name', 'email', 'service', 'details'].filter((key) => !fields[key]);
  if (missing.length) {
    return reply(wantsJson, 400, 'Please fill in every field marked with an asterisk.', url);
  }
  if (!looksLikeEmail(fields.email)) {
    return reply(wantsJson, 400, 'That email address does not look right.', url);
  }

  const serviceLabel = SERVICES[fields.service] || 'Not specified';
  const sent = await sendWithResend(fields, serviceLabel, env);
  if (!sent) {
    return reply(
      wantsJson,
      502,
      'The message could not be sent just now. Please call 760-382-2658 and Jerry will pick up where this left off.',
      url
    );
  }

  return reply(wantsJson, 200, null, url);
}

async function sendWithResend(fields, serviceLabel, env) {
  if (!env.RESEND_API_KEY) return false;

  const stamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const payload = {
    from: env.RESEND_FROM || FROM,
    to: TO,
    cc: CC,
    reply_to: fields.email,
    subject: 'New project inquiry: ' + serviceLabel + (fields.location ? ', ' + fields.location : ''),
    html: inquiryHtml(fields, serviceLabel, stamp),
    text: inquiryText(fields, serviceLabel, stamp),
  };

  let response = await postToResend(payload, env);

  // An unverified From is the one failure worth retrying, because it is the
  // only one the visitor cannot be blamed for and the fallback always sends.
  if (!response.ok && payload.from !== FROM_FALLBACK) {
    payload.from = FROM_FALLBACK;
    response = await postToResend(payload, env);
  }

  return response.ok;
}

function postToResend(payload, env) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).catch(() => ({ ok: false }));
}

async function verifyTurnstile(token, env, request) {
  // With no secret configured there is nothing to check against. Rather than
  // reject every inquiry, fall through to the honeypot and let mail move.
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!text(token)) return false;

  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET_KEY);
  form.append('response', text(token));
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) form.append('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    return false;
  }
}

function inquiryHtml(fields, serviceLabel, stamp) {
  const row = (label, value) =>
    value
      ? '<tr><td style="padding:10px 16px 10px 0;color:#61666b;font:600 13px/1.4 Arial,sans-serif;vertical-align:top;white-space:nowrap">' +
        esc(label) +
        '</td><td style="padding:10px 0;color:#0d2133;font:400 15px/1.5 Arial,sans-serif">' +
        esc(value) +
        '</td></tr>'
      : '';

  return [
    '<div style="background:#f7f4ee;padding:24px">',
    '<div style="max-width:620px;margin:0 auto;background:#fff;border-top:5px solid #9b6025">',
    '<div style="padding:26px 28px 6px">',
    '<p style="margin:0 0 6px;color:#9b6025;font:700 11px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase">New project inquiry</p>',
    '<h1 style="margin:0;color:#0d2133;font:700 23px/1.25 Arial,sans-serif">' + esc(serviceLabel) + '</h1>',
    '<p style="margin:8px 0 0;color:#61666b;font:400 13px/1.5 Arial,sans-serif">From the website contact form, ' +
      esc(stamp) +
      '</p>',
    '</div>',
    '<div style="padding:10px 28px 22px">',
    '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">',
    row('Name', fields.name),
    row('Phone', fields.phone),
    row('Email', fields.email),
    row('Project area', fields.location),
    '</table>',
    '<p style="margin:20px 0 6px;color:#61666b;font:600 13px/1.4 Arial,sans-serif">The project</p>',
    '<div style="padding:14px 16px;background:#f7f4ee;border-left:3px solid #d8c3a5;color:#0d2133;font:400 15px/1.6 Arial,sans-serif;white-space:pre-wrap">' +
      esc(fields.details) +
      '</div>',
    '<p style="margin:22px 0 0;color:#0d2133;font:400 14px/1.6 Arial,sans-serif">Reply to this email and it goes straight back to ' +
      esc(fields.name) +
      '.' +
      (fields.phone ? ' Or call ' + esc(fields.phone) + '.' : '') +
      '</p>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');
}

function inquiryText(fields, serviceLabel, stamp) {
  return [
    'New project inquiry: ' + serviceLabel,
    'From the website contact form, ' + stamp,
    '',
    'Name: ' + fields.name,
    fields.phone ? 'Phone: ' + fields.phone : null,
    'Email: ' + fields.email,
    fields.location ? 'Project area: ' + fields.location : null,
    '',
    'The project:',
    fields.details,
    '',
    'Reply to this email and it goes straight back to them.',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

function reply(wantsJson, status, error, url) {
  if (wantsJson) {
    return new Response(JSON.stringify(error ? { ok: false, error: error } : { ok: true }), {
      status: status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
  // No JavaScript on the page: send the visitor back to /contact, which reads
  // these parameters and shows the same confirmation or the same error.
  const back = new URL('/contact', url.origin);
  if (error) back.searchParams.set('error', error);
  else back.searchParams.set('sent', 'true');
  return Response.redirect(back.toString(), 303);
}

function formToObject(formData) {
  const out = {};
  for (const entry of formData.entries()) out[entry[0]] = entry[1];
  return out;
}

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const clamp = (value, max) => text(value).slice(0, max);
const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
