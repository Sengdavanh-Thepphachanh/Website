(() => {
  const controls = 'a, button, input, textarea, select, summary, [contenteditable], [role="button"]';
  const triggers = new WeakMap();
  let start;
  let pendingClose;
  const hasSelection = () => Boolean(String(window.getSelection() || '').trim());
  const outside = (event, dialog) => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX >= rect.right ||
      event.clientY < rect.top || event.clientY >= rect.bottom;
  };
  const cancelPendingClose = () => {
    clearTimeout(pendingClose);
    pendingClose = undefined;
  };

  document.addEventListener('pointerdown', (event) => {
    cancelPendingClose();
    const dialog = event.target.closest('dialog.reveal[open]');
    start = { dialog, x: event.clientX, y: event.clientY, selected: hasSelection() };
    if (!dialog) return;
    start.outside = outside(event, dialog);
    start.control = Boolean(event.target.closest(controls));
    const rect = dialog.getBoundingClientRect();
    start.scrollbar = !start.outside && event.target === dialog &&
      (event.clientX >= rect.left + dialog.clientLeft + dialog.clientWidth ||
       event.clientY >= rect.top + dialog.clientTop + dialog.clientHeight);
  });

  document.querySelectorAll('dialog.reveal').forEach((dialog) => {
    dialog.addEventListener('close', () => {
      cancelPendingClose();
      const trigger = triggers.get(dialog);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      triggers.delete(dialog);
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    const dialog = target.closest('dialog.reveal[open]');
    if (dialog) {
      if (target.closest('[data-close]')) {
        dialog.close();
        return;
      }
      if (target.closest(controls) || hasSelection() || !start ||
          start.dialog !== dialog || start.selected || start.control || start.scrollbar ||
          Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5 ||
          start.outside !== outside(event, dialog) || event.detail > 1) return;
      if (start.outside) {
        dialog.close();
      } else {
        // Give a second click time to select text before closing the surface.
        pendingClose = setTimeout(() => {
          if (dialog.open && !hasSelection()) dialog.close();
        }, 400);
      }
      return;
    }

    const trigger = target.closest('[data-reveal]');
    const reveal = trigger && document.getElementById(trigger.dataset.reveal);
    if (!reveal || reveal.open || typeof reveal.showModal !== 'function') return;
    triggers.set(reveal, trigger);
    reveal.showModal();
  });
})();
