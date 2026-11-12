const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const app = fs.readFileSync(path.join(root, 'public/masc-am-testdrive-purple-1-assets/app.js'), 'utf8');
const tracker = fs.readFileSync(path.join(root, 'public/masc-ss-deeplink.js'), 'utf8');
const config = fs.readFileSync(path.join(root, 'public/masc-am-testdrive-purple-1-assets/config.js'), 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));

function setup() {
  const handlers = [];
  const navigations = [];
  let finishStore;
  const storeResult = new Promise(resolve => { finishStore = resolve; });
  const buttons = Array.from({ length: 4 }, () => ({
    addEventListener(name, handler) { if (name === 'click') handlers.push(handler); }
  }));
  const document = {
    cookie: '_fbp=fb.1.test; _fbc=fb.1.test',
    body: { style: {} },
    querySelectorAll(selector) { return selector === 'button.button' ? buttons : []; },
    querySelector() { return null; },
    addEventListener() {}
  };
  const location = { search: '?utm_source=meta&utm_campaign=purple' };
  Object.defineProperty(location, 'href', { set(value) { navigations.push(String(value)); } });
  const window = { location, addEventListener() {} };
  const context = vm.createContext({
    window, document, navigator: { userAgent: 'regression-test' },
    URLSearchParams, AbortController, console, setTimeout, clearTimeout,
    btoa: value => Buffer.from(value, 'binary').toString('base64'),
    atob: value => Buffer.from(value, 'base64').toString('binary'),
    fetch: async url => url.includes('ipify')
      ? { json: async () => ({ ip: '192.0.2.1' }) }
      : storeResult
  });
  vm.runInContext(config, context);
  vm.runInContext(tracker, context);
  vm.runInContext(app, context);
  return { handlers, navigations, finishStore };
}

test('every registration CTA waits for attribution then navigates to the bot', async () => {
  for (let i = 0; i < 4; i++) {
    const h = setup();
    h.handlers[i]({ preventDefault() {} });
    assert.deepEqual(h.navigations, [], 'must not navigate to [object Promise]');
    h.finishStore({ ok: true, json: async () => ({ id: 12345 }) });
    await tick();
    assert.equal(h.navigations.length, 1);
    const destination = new URL(h.navigations[0]);
    assert.equal(destination.hostname, 'telegram.me');
    assert.equal(destination.pathname, '/aiautomator_masc_bot');
    assert.equal(Buffer.from(destination.searchParams.get('start'), 'base64').toString(), 'dl:347351|12345');
  }
});
