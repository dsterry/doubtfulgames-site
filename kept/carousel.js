(() => {
  const carousel = document.querySelector('.game-carousel');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const thumbnails = [...carousel.querySelectorAll('.carousel-thumbnail')];
  const dialog = document.querySelector('.screenshot-dialog');
  let current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    carousel.querySelector('.carousel-status').textContent = `Screenshot ${current + 1} of ${slides.length}`;
  }

  carousel.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => show(current + Number(button.dataset.direction)));
  });
  thumbnails.forEach((button, i) => button.addEventListener('click', () => show(i)));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(current + (event.key === 'ArrowRight' ? 1 : -1));
    if (slides.some(slide => slide.contains(document.activeElement))) slides[current].focus();
  });

  let touchStart;
  const images = carousel.querySelector('.carousel-images');
  images.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    touchStart = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
  }, { passive: true });
  images.addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  images.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });

  slides.forEach(slide => slide.addEventListener('click', event => {
    event.preventDefault();
    const source = slide.querySelector('img');
    const enlarged = dialog.querySelector('img');
    enlarged.src = source.src;
    enlarged.alt = source.alt;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
