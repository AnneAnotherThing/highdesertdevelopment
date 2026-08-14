document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#primary-navigation');
const serviceCards = document.querySelectorAll('.service-card');
const projectForm = document.querySelector('#project-form');
const videoDialog = document.querySelector('.video-dialog');
const videoDialogPlayer = document.querySelector('.video-dialog-player');
const videoDialogTitle = document.querySelector('#expanded-video-title');
const videoDialogClose = document.querySelector('.video-dialog-close');
const videoExpandButtons = document.querySelectorAll('.video-expand');

function setMenuState(isOpen) {
  navigation.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', `${isOpen}`);
  menuButton.querySelector('.menu-label').textContent = `${isOpen ? 'Close' : 'Menu'}`;
}

function toggleMenu() {
  setMenuState(!navigation.classList.contains('open'));
}

function closeMenu() {
  setMenuState(false);
}

function rememberService(category) {
  const visit = {
    category,
    viewedAt: new Date().toISOString()
  };
  localStorage.setItem('hddLastService', JSON.stringify(visit));
}


if (menuButton && navigation) {
  menuButton.addEventListener('click', toggleMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    rememberService(card.dataset.category);
  });
});

function closeExpandedVideo() {
  if (!videoDialog?.open) return;
  videoDialog.close();
}

if (videoDialog && videoDialogPlayer && videoDialogTitle && videoDialogClose) {
  videoExpandButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = button.dataset.videoSrc;
      iframe.title = button.dataset.videoTitle;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      videoDialogTitle.textContent = button.dataset.videoTitle;
      videoDialogPlayer.replaceChildren(iframe);
      videoDialog.showModal();
    });
  });

  videoDialogClose.addEventListener('click', closeExpandedVideo);

  videoDialog.addEventListener('click', (event) => {
    if (event.target === videoDialog) closeExpandedVideo();
  });

  videoDialog.addEventListener('close', () => {
    videoDialogPlayer.replaceChildren();
  });
}

/* The hero opens on the finished house, walks back through the two stages that
   built it, and comes to rest on the finished house again. It runs once, never
   loops, and never starts at all if the visitor has asked for reduced motion.
   The stage frames carry no src until the page has loaded, so they cannot
   compete with the opening plate for bandwidth. */
const heroFrames = [...document.querySelectorAll('.hero .hero-media')];
const heroCaption = document.querySelector('[data-hero-caption]');

if (heroFrames.length > 1 && heroCaption) {
  const stillFirst = window.matchMedia('(prefers-reduced-motion: reduce)');
  /* The dissolve itself stays long, it is the part worth watching. What is
     short is the waiting: the opening hold before the sequence starts, and
     the rest between stages. HOLD_STAGE must stay above FADE or the next
     photograph starts arriving before the last one has finished. */
  const FADE = 2600;
  const HOLD_OPEN = 1100;
  const HOLD_STAGE = 3300;
  const CAPTION_REST = 2400;
  const order = [1, 2, 0];
  const hero = document.querySelector('.hero');

  /* The incoming photograph is lifted above the one already showing and
     dissolves in over the top of it, while the outgoing frame is left fully
     opaque underneath. Fading one out while fading the other in would let the
     background show through the middle of the cross and read as a dip. */
  const showFrame = (index) => {
    const incoming = heroFrames[index];

    incoming.classList.remove('is-active');
    incoming.style.transition = 'none';
    incoming.style.opacity = '0';
    /* Only ever 0 or 1. Climbing z-index values would ride up over the
       overlay and the headline, which both sit above the photographs. */
    heroFrames.forEach((frame) => { frame.style.zIndex = '0'; });
    incoming.style.zIndex = '1';
    void incoming.offsetWidth;
    incoming.style.transition = '';
    incoming.style.opacity = '';
    incoming.classList.add('is-active');

    if (hero) hero.classList.toggle('is-staging', index !== 0);

    heroCaption.textContent = incoming.dataset.caption || '';
    heroCaption.classList.add('is-visible');

    window.setTimeout(() => {
      heroFrames.forEach((frame, n) => {
        if (n !== index) frame.classList.remove('is-active');
      });
    }, FADE);
  };

  const runSequence = () => {
    let step = 0;
    const next = () => {
      showFrame(order[step]);
      step += 1;
      if (step < order.length) {
        window.setTimeout(next, HOLD_STAGE);
      } else {
        window.setTimeout(() => heroCaption.classList.remove('is-visible'), CAPTION_REST);
      }
    };
    next();
  };

  /* Decoding is nice to have, not something to wait on. A browser that is not
     painting the page, which is any tab opened in the background, can leave
     decode() pending forever. Racing it against a timer means the sequence
     always gets to run. */
  const readyOrTimeout = (promise, ms) => new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    promise.then(finish, finish);
    window.setTimeout(finish, ms);
  });

  const loadStages = () => {
    if (stillFirst.matches) return;
    const pending = heroFrames.filter((frame) => frame.dataset.src);
    if (!pending.length) return;
    Promise.all(pending.map((frame) => {
      frame.srcset = frame.dataset.srcset;
      frame.src = frame.dataset.src;
      return readyOrTimeout(frame.decode(), 1500);
    })).then(startWhenSeen);
  };

  /* Only walk through the stages while somebody is actually looking. A hidden
     tab freezes CSS transitions at their start but keeps running timers, so
     the sequence would otherwise step through its frames unseen and the
     visitor would arrive to a hero part way through a dissolve. */
  const startWhenSeen = () => {
    if (document.visibilityState === 'visible') {
      window.setTimeout(runSequence, HOLD_OPEN);
      return;
    }
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      window.setTimeout(runSequence, HOLD_OPEN);
    };
    document.addEventListener('visibilitychange', onVisible);
  };

  /* Gate on the opening plate finishing, not on window load. The page carries
     two Vimeo iframes, and waiting for those would hold the sequence back for
     seconds after the hero is already sitting there ready. */
  const opening = heroFrames[0];
  const openingReady = opening.complete
    ? Promise.resolve()
    : readyOrTimeout(opening.decode(), 2000);
  openingReady.then(() => window.setTimeout(loadStages, 250));
}

if (projectForm) {
  const savedService = JSON.parse(localStorage.getItem('hddLastService'))?.category;
  const serviceSelect = projectForm.querySelector('#service');
  const formMessage = projectForm.querySelector('#form-message');
  const submissionSent = new URLSearchParams(window.location.search).get('sent') === 'true';

  if (submissionSent) {
    formMessage.textContent = `Thank you. Your project inquiry has been emailed to High Desert Development.`;
  }

  if (savedService && [...serviceSelect.options].some((option) => option.value === savedService)) {
    serviceSelect.value = savedService;
  }

  projectForm.addEventListener('submit', (event) => {
    formMessage.textContent = `Sending your project inquiry to High Desert Development…`;
  });
}

