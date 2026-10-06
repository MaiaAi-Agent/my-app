(() => {
  const KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_placement',
    'fbclid',
  ];
  const STORAGE_KEY = 'masc_utm_attribution';

  function readStored() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  const stored = readStored();
  const current = new URLSearchParams(window.location.search);
  for (const key of KEYS) {
    const value = current.get(key);
    if (value) stored[key] = value;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Attribution still works for the current page through the URL params.
  }

  window.MASC_UTM = {
    keys: KEYS,
    get() {
      const result = {};
      for (const key of KEYS) {
        if (stored[key]) result[key] = stored[key];
      }
      return result;
    },
    append(url) {
      const target = new URL(url, window.location.href);
      for (const [key, value] of Object.entries(this.get())) {
        if (!target.searchParams.has(key)) target.searchParams.set(key, value);
      }
      return target.href;
    },
  };
})();
