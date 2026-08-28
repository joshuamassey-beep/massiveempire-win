// Shared background-music widget: lives in the top nav on every page.
// Reads its default volume from the <audio data-default-volume="..."> it
// finds on the current page, and persists the visitor's chosen volume and
// play/pause preference in localStorage so it carries across page
// navigations on the site (each page has its own <audio> element, but this
// keeps the experience consistent as someone clicks between pages).
(function () {
  var iconBtn = document.getElementById('audio-icon-btn');
  var popover = document.getElementById('audio-popover');
  var playBtn = document.getElementById('audio-play-btn');
  var slider = document.getElementById('volume-slider');
  var audio = document.getElementById('bg-music');
  if (!iconBtn || !audio) return;

  var STORAGE_VOLUME = 'me_audio_volume';
  var STORAGE_PLAYING = 'me_audio_playing';

  function getDefaultVolume() {
    var attr = parseFloat(audio.getAttribute('data-default-volume'));
    return isNaN(attr) ? 1 : attr;
  }
  function readStoredVolume() {
    try {
      var v = localStorage.getItem(STORAGE_VOLUME);
      return v === null ? null : parseFloat(v);
    } catch (e) { return null; }
  }
  function storeVolume(v) {
    try { localStorage.setItem(STORAGE_VOLUME, String(v)); } catch (e) {}
  }
  function readStoredPlayingPref() {
    try { return localStorage.getItem(STORAGE_PLAYING); } catch (e) { return null; }
  }
  function storePlayingPref(isPlaying) {
    try { localStorage.setItem(STORAGE_PLAYING, isPlaying ? '1' : '0'); } catch (e) {}
  }

  var storedVol = readStoredVolume();
  var initialVolume = storedVol === null ? getDefaultVolume() : storedVol;
  audio.volume = initialVolume;
  if (slider) slider.value = Math.round(initialVolume * 100);

  // Default (never toggled before) is "should play" — matches the site's
  // original on-by-default behavior. Once a visitor explicitly pauses, that
  // choice is respected on every page until they turn it back on.
  var storedPlayingPref = readStoredPlayingPref();
  var shouldAutoStart = storedPlayingPref !== '0';

  function setIconState(isPlaying) {
    iconBtn.classList.toggle('is-playing', isPlaying);
    if (playBtn) playBtn.textContent = isPlaying ? 'Pause Theme' : 'Play Theme';
  }

  function tryPlay() {
    var p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () { setIconState(true); storePlayingPref(true); })
       .catch(function () { setIconState(false); });
    }
  }
  function pause() {
    audio.pause();
    setIconState(false);
    storePlayingPref(false);
  }

  iconBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = popover.classList.toggle('show');
    iconBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (popover && popover.classList.contains('show') && !popover.contains(e.target) && e.target !== iconBtn) {
      popover.classList.remove('show');
      iconBtn.setAttribute('aria-expanded', 'false');
    }
  });
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      if (audio.paused) tryPlay(); else pause();
    });
  }
  if (slider) {
    slider.addEventListener('input', function () {
      var v = parseInt(slider.value, 10) / 100;
      audio.volume = v;
      storeVolume(v);
    });
  }

  // Browsers block unmuted autoplay until the visitor has interacted with
  // the page (or the site has enough "media engagement" history), so this
  // silently no-ops on a cold load — the fallback below catches the
  // visitor's first interaction anywhere on the page and starts the music
  // then, unless they'd previously turned it off.
  if (shouldAutoStart) tryPlay();

  var unlockEvents = ['pointerdown', 'keydown', 'touchstart'];
  function unlockOnFirstInteraction() {
    if (shouldAutoStart && audio.paused) tryPlay();
    unlockEvents.forEach(function (evt) {
      document.removeEventListener(evt, unlockOnFirstInteraction);
    });
  }
  unlockEvents.forEach(function (evt) {
    document.addEventListener(evt, unlockOnFirstInteraction, { once: true, passive: true });
  });
})();
