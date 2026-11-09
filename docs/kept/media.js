(() => {
  const video = document.querySelector('.kept-video video');
  const playButton = document.querySelector('.kept-video-play');

  playButton.hidden = false;
  playButton.addEventListener('click', () => {
    video.play().catch(() => video.focus());
  });
  video.addEventListener('play', () => {
    if (document.activeElement === playButton) video.focus();
    playButton.hidden = true;
  }, { once: true });

  const gallery = document.querySelector('#kept-screenshots');
  const screenshots = gallery.querySelectorAll('.kept-screenshot');
  const controls = document.querySelector('.kept-gallery-controls');
  const position = controls.querySelector('.kept-gallery-position');
  const [previous, next] = controls.querySelectorAll('button');
  const lastIndex = screenshots.length - 1;
  const currentIndex = () => Math.max(0, Math.min(lastIndex, Math.round(gallery.scrollLeft / gallery.clientWidth)));

  function updateGalleryPosition() {
    const index = currentIndex();
    const label = `Screenshot ${index + 1} of ${screenshots.length}`;
    if (position.textContent !== label) position.textContent = label;
    previous.setAttribute('aria-disabled', String(index === 0));
    next.setAttribute('aria-disabled', String(index === lastIndex));
  }

  for (const button of [previous, next]) {
    button.addEventListener('click', () => {
      const index = currentIndex() + Number(button.dataset.galleryStep);
      if (index >= 0 && index <= lastIndex) gallery.scrollTo({ left: index * gallery.clientWidth });
    });
  }
  gallery.addEventListener('scroll', updateGalleryPosition, { passive: true });
  window.addEventListener('resize', updateGalleryPosition);
  updateGalleryPosition();
  controls.hidden = false;

  const dialog = document.querySelector('.screenshot-dialog');
  if (typeof dialog.showModal !== 'function') return;

  const enlarged = dialog.querySelector('img');
  screenshots.forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      enlarged.src = link.href;
      enlarged.alt = link.querySelector('img').alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
