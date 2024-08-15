const headersInteractives = () => {
  const headerEls = document.querySelectorAll('.by-category__item');
  headerEls.forEach((el) => {
    el.addEventListener('click', (event) => {
      // remove active class elements
      const activeEls = document.querySelectorAll('.active');
      activeEls.forEach((activeEl) => {
        activeEl.classList.remove('active');
      });
      // get the target id and add active classes
      const targetId = event.target.id;
      const targetEls = document.querySelectorAll('#' + targetId);
      targetEls.forEach((targetEl) => {
        targetEl.classList.add('active');
      });
    });
  });
};
headersInteractives();