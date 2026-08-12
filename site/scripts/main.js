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

