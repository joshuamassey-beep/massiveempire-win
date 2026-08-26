// Vercel serverless function: receives the invitation-request form
// and (if RESEND_API_KEY is configured) sends two emails via Resend:
//   1. A "denied" joke email to the applicant.
//   2. A heads-up notification email to the site owner.
//
// Required environment variables (set in Vercel project settings):
//   RESEND_API_KEY   - API key from https://resend.com
//   FROM_EMAIL        - verified sender address, e.g. empire@yourdomain.com
//                        (falls back to onboarding@resend.dev, which can
//                        only deliver to the Resend account owner's own
//                        email until a sending domain is verified)
//   OWNER_EMAIL        - where heads-up notifications are sent
//                        (falls back to joshuamassey@me.com)

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'joshuamassey@me.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// "Galactic" dispatch script used to give the rejection email an
// intercepted-transmission feel. This is Elder Futhark (a real, public-domain
// historical writing system already part of the Unicode standard) rather
// than an actual Star Wars "Aurebesh" font/asset, both to avoid any
// trademark/licensing issue and because plain Unicode text renders reliably
// in email clients, unlike a custom @font-face most clients would strip.
const GALACTIC_MAP = {
  a: 'ᚨ', b: 'ᛒ', c: 'ᚲ', d: 'ᛞ', e: 'ᛖ', f: 'ᚠ', g: 'ᚷ', h: 'ᚺ', i: 'ᛁ', j: 'ᛃ',
  k: 'ᚲ', l: 'ᛚ', m: 'ᛗ', n: 'ᚾ', o: 'ᛟ', p: 'ᛈ', q: 'ᚲ', r: 'ᚱ', s: 'ᛊ', t: 'ᛏ',
  u: 'ᚢ', v: 'ᚡ', w: 'ᚹ', x: 'ᛊ', y: 'ᚤ', z: 'ᛉ',
};

function toGalactic(str) {
  return String(str)
    .split('')
    .map((ch) => {
      const lo = ch.toLowerCase();
      if (GALACTIC_MAP[lo]) return GALACTIC_MAP[lo];
      if (ch === ' ') return ' ᛫ ';
      return ch;
    })
    .join('');
}

function rejectionEmailHtml({ legalName, leagueName, teamName, platform }) {
  const name = escapeHtml(legalName).split(' ')[0] || 'Applicant';
  const team = escapeHtml(teamName) || 'your team';
  const dispatchEnglish = `Greetings, ${name}. This transmission comes by order of Darth Jos.`;
  const dispatchGalactic = toGalactic(dispatchEnglish.toUpperCase());
  return `
  <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; background:#0b0d12; color:#e8eaf0; padding:32px;">
    <div style="max-width:520px; margin:0 auto; background:#161a22; border:1px solid #262c38; border-radius:14px; padding:30px;">
      <p style="color:#5a6272; text-transform:uppercase; letter-spacing:0.08em; font-size:12px; margin:0 0 20px;">Imperial Correspondence &mdash; Case File Opened</p>

      <div style="border:1px solid #262c38; border-radius:8px; padding:16px 18px; margin:0 0 24px; background:#0f1218;">
        <p style="color:#5a6272; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; margin:0 0 10px;">Imperial Transmission &mdash; Intercepted &amp; Transcribed</p>
        <p style="font-size:16px; letter-spacing:0.05em; color:#8fd6ff; margin:0 0 12px; line-height:1.6; word-break:break-word;">${dispatchGalactic}</p>
        <p style="color:#5a6272; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 4px;">Translation</p>
        <p style="color:#c7cbd6; font-size:14px; margin:0; line-height:1.5;">${escapeHtml(dispatchEnglish)}</p>
      </div>

      <p style="color:#c7cbd6; line-height:1.6;">
        Every cycle, thousands of teams like <strong>${team}</strong> petition for entry into the
        Massive Empire Fantasy Football Tool. Each application is logged, stamped, and left to
        circulate through the lower administrative outposts. Yours was not one of them.
      </p>
      <p style="color:#c7cbd6; line-height:1.6;">
        Darth Jos moved <strong>${team}</strong> to the front of the line personally, bypassing the
        Circumlocution Offices himself &mdash; something almost no petitioner lives to mention twice.
      </p>
      <p style="color:#c7cbd6; line-height:1.6;">
        He studied your <strong>${escapeHtml(platform)}</strong> history: past records, roster, trades,
        waiver-wire timing. He searched his feelings &mdash; and possibly yours.
      </p>
      <p style="color:#c7cbd6; line-height:1.6;">
        Then he filed his findings with the Imperial Council.
      </p>
      <p style="color:#c7cbd6; line-height:1.6;">
        The Council convened. They reviewed the record and Darth&rsquo;s point of view. They weighed
        all of it against the high standard expected of anyone granted access to the Empire&rsquo;s
        galactic data and league operations.
      </p>

      <p style="color:#5a6272; text-transform:uppercase; letter-spacing:0.1em; font-size:12px; margin:26px 0 10px;">Their verdict:</p>
      <div style="display:inline-block; border:3px solid #c0392b; color:#e05f4f; font-weight:800; font-size:20px; letter-spacing:0.12em; text-transform:uppercase; padding:6px 18px; border-radius:4px; margin:0 0 20px; transform:rotate(-8deg);">Denied</div>

      <p style="color:#c7cbd6; line-height:1.6;">
        Your application on behalf of <strong>${team}</strong> to the Massive Empire Fantasy Football
        Tool has been denied.
      </p>
      <p style="color:#c7cbd6; line-height:1.6;">
        ${name}, perhaps when you have proven yourself worthy &mdash; or at the very least stopped
        starting a kicker on bye week &mdash; the Empire will reconsider your application.
      </p>
      <p style="color:#c7cbd6; line-height:1.6; margin-top:24px;">
        Until then, enjoy losing.
      </p>
      <p style="color:#9aa3b2; margin-top:28px; font-size:13px;">&mdash; The Imperial Fantasy Football Council</p>
    </div>
  </div>`;
}

function notificationEmailHtml({ platform, leagueName, teamName, legalName, phone, email }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:6px 12px 6px 0; color:#9aa3b2; font-size:13px; white-space:nowrap;">${label}</td>
      <td style="padding:6px 0; color:#e8eaf0; font-size:14px;">${escapeHtml(value)}</td>
    </tr>`;
  return `
  <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; background:#0b0d12; color:#e8eaf0; padding:32px;">
    <div style="max-width:520px; margin:0 auto; background:#161a22; border:1px solid #262c38; border-radius:14px; padding:30px;">
      <h1 style="font-size:18px; margin:0 0 16px;">New Empire application received</h1>
      <table cellpadding="0" cellspacing="0">
        ${row('Legal name', legalName)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Platform', platform)}
        ${row('League name', leagueName)}
        ${row('Proposed team name', teamName)}
      </table>
      <p style="color:#9aa3b2; font-size:12px; margin-top:24px;">Auto-reject email has been sent to the applicant.</p>
    </div>
  </div>`;
}

// A hard cap on how long we'll wait on Resend, so a slow/unresponsive API
// can't stall this function up to (or past) Vercel's own execution limit.
const SEND_TIMEOUT_MS = 8000;

async function sendEmail({ to, subject, html }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Resend error ${res.status}: ${body}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let data = req.body;
  if (!data || typeof data === 'string') {
    try {
      data = JSON.parse(data || '{}');
    } catch {
      data = {};
    }
  }

  const { platform, leagueName, teamName, legalName, phone } = data || {};
  const email = (data && data.email || '').trim();

  if (!platform || !leagueName || !teamName || !legalName || !phone || !email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  // IMPORTANT: both sends are awaited BEFORE responding. Vercel's
  // serverless runtime can freeze/terminate the function as soon as the
  // response is sent — code left running "in the background" after
  // res.json() is not guaranteed to finish. Responding first and emailing
  // "after" (the previous approach here) meant these Resend calls were
  // getting cut off before they completed, so nothing ever actually sent,
  // with no error either, since the function was frozen, not failing.
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email send for submission:', {
      platform, leagueName, teamName, legalName, phone, email,
    });
    res.status(200).json({ received: true });
    return;
  }

  try {
    await sendEmail({
      to: email,
      subject: 'Your Application to Darth Jos’s Fantasy Football Empire',
      html: rejectionEmailHtml({ legalName, leagueName, teamName, platform }),
    });
  } catch (err) {
    console.error('Failed to send rejection email:', err);
  }

  try {
    await sendEmail({
      to: OWNER_EMAIL,
      subject: `New Empire Applicant: ${legalName}`,
      html: notificationEmailHtml({ platform, leagueName, teamName, legalName, phone, email }),
    });
  } catch (err) {
    console.error('Failed to send owner notification email:', err);
  }

  // Always tell the browser it worked so the ruse stays intact,
  // regardless of whether either send above succeeded.
  res.status(200).json({ received: true });
};
