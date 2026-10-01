const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// A small DOM stand-in checks the event behavior without a browser dependency.
const listeners = new Map();
let selection = '';
let scheduled;
let active;
const dialog = {
  open: false, clientLeft: 1, clientTop: 1, clientWidth: 198, clientHeight: 298,
  isConnected: true,
  getBoundingClientRect: () => ({ left: 100, top: 100, right: 310, bottom: 410 }),
  addEventListener: (name, callback) => listeners.set(`dialog:${name}`, callback),
  closest(selector) { return selector.startsWith('dialog') && this.open ? this : null; },
  showModal() { this.open = true; active = this; },
  close() { this.open = false; listeners.get('dialog:close')(); },
};
const trigger = {
  dataset: { reveal: 'project' }, isConnected: true,
  focus() { active = this; },
  closest: (selector) => selector === '[data-reveal]' ? trigger : null,
};
function content(kind = 'text') {
  return {
    closest(selector) {
      if (selector.startsWith('dialog')) return dialog.open ? dialog : null;
      if (selector === '[data-close]') return kind === 'close' ? this : null;
      if (selector.includes('input')) return ['link', 'input', 'close'].includes(kind) ? this : null;
      return null;
    },
  };
}
const document = {
  addEventListener: (name, callback) => listeners.set(name, callback),
  querySelectorAll: () => [dialog],
  getElementById: (id) => id === 'project' ? dialog : null,
};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/site.js'), 'utf8'), {
  document, window: { getSelection: () => selection },
  setTimeout: (callback) => { scheduled = callback; return 1; },
  clearTimeout: () => { scheduled = undefined; },
});
function send(type, target, x = 180, y = 180, detail = 1) {
  listeners.get(type)({ target, clientX: x, clientY: y, detail });
}
function click(target, x = 180, y = 180) {
  send('pointerdown', target, x, y);
  send('click', target, x, y);
}
function flush() { const callback = scheduled; scheduled = undefined; callback?.(); }
function open() { send('click', trigger, 0, 0, 0); assert.equal(dialog.open, true); }

open();
click(content('link')); flush();
assert.equal(dialog.open, true, 'Source links keep the dialog open');
click(content('input')); flush();
assert.equal(dialog.open, true, 'Controls keep the dialog open');
selection = 'paper title';
click(content()); selection = ''; flush();
assert.equal(dialog.open, true, 'Collapsing an existing selection does not close');
send('pointerdown', content()); selection = 'selected text'; send('click', content()); flush();
assert.equal(dialog.open, true, 'Selecting text does not close');
selection = '';
send('pointerdown', dialog, 50, 50); send('click', content(), 180, 180); flush();
assert.equal(dialog.open, true, 'A click crossing the dialog edge does not close');
send('pointerdown', content(), 180, 180); send('click', content(), 210, 180); flush();
assert.equal(dialog.open, true, 'A drag does not close');
click(dialog, 304, 180); flush();
assert.equal(dialog.open, true, 'Scrollbar interactions do not close');
click(content());
send('pointerdown', content()); selection = 'word'; send('click', content(), 180, 180, 2); flush();
assert.equal(dialog.open, true, 'A second click can select a word');
selection = '';
click(content()); flush();
assert.equal(dialog.open, false, 'A non-interactive surface closes');
assert.equal(active, trigger, 'Closing returns focus to the tile');
open(); click(dialog, 50, 50);
assert.equal(dialog.open, false, 'A backdrop click closes');
open(); send('click', content('close'), 0, 0, 0);
assert.equal(dialog.open, false, 'The Close button works without a pointer');
open(); dialog.close();
assert.equal(active, trigger, 'A native close, including Escape, restores focus');
send('click', { closest: (selector) => selector === '[data-reveal]' ? { dataset: { reveal: 'missing' } } : null });
assert.equal(dialog.open, false, 'An unknown dialog does not open');
console.log('Dialog interaction checks passed.');
