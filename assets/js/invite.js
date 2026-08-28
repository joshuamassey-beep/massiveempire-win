const form = document.getElementById('invite-form');
const statusEl = document.getElementById('status');
const btn = document.getElementById('submit-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalText = document.getElementById('modal-text');
const modalCloseBtn = document.getElementById('modal-close-btn');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showRejectionModal(legalName) {
  const firstName = escapeHtml((legalName || '').trim().split(/\s+/)[0] || 'Applicant');
  modalText.innerHTML =
    `<p>You cannot hide from the dark side, <strong>${firstName}</strong>.</p>` +
    `<p>Your presence &mdash; and your pathetic fantasy roster &mdash; are unmistakable. I knew it was you from the moment you arrived.</p>` +
    `<p>Deserved or not, your application has been burst-transmitted to the Imperial Council.</p>` +
    `<p>Their decision will either create a dynasty or crush your season entirely.</p>` +
    `<p>Check your email in a few minutes, where your fate will be revealed.</p>`;
  modalOverlay.classList.add('show');
}

modalCloseBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('show');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('show');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Hard gate: the confidentiality agreement must be accepted before the
  // form can be submitted. The submit button is disabled until then as the
  // primary guard, but this check guarantees the agreement always appears
  // before the "processing" modal below, even if something else re-enabled
  // the button (e.g. dev tools, a stray unlock call).
  const agreementCheckbox = document.getElementById('agreement-checkbox');
  if (agreementCheckbox && !agreementCheckbox.checked) {
    const agreementOverlay = document.getElementById('agreement-overlay');
    if (agreementOverlay) agreementOverlay.classList.add('show');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Transmitting...';
  statusEl.className = 'status show ok';
  statusEl.textContent = '';

  const legalName = document.getElementById('legalName').value;
  const payload = {
    platform: document.getElementById('platform').value,
    leagueName: document.getElementById('leagueName').value,
    teamName: document.getElementById('teamName').value,
    legalName: legalName,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
  };

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('bad response');

    form.reset();
    btn.textContent = 'Request Invitation';
    statusEl.className = 'status show ok';
    statusEl.textContent = 'Your application has been received and is under review. You will hear back by email.';
    showRejectionModal(legalName);
  } catch (err) {
    btn.textContent = 'Request Invitation';
    statusEl.className = 'status show err';
    statusEl.textContent = 'Something went wrong submitting your application. Please try again.';
  } finally {
    btn.disabled = false;
  }
});
