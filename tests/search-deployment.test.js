import { afterEach, describe, expect, it, vi } from 'vitest';
import MiniSearch from '../assets/js/minisearch.js';

// Exercise the serialized index with the same self-hosted library used by the browser.
describe('search deployments', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it.each(['', '/physics-book', '/physics-book/'])(
    'loads and resolves search results under root %j',
    async rootUrl => {
      const index = new MiniSearch({
        fields: ['title', 'content'],
        storeFields: ['title', 'url', 'preview'],
      });
      const documents = [
        {
          id: 1,
          title: 'Velocity',
          content: 'Velocity and motion',
          url: 'contents/ch2Velocity.html',
          preview: 'Velocity and motion',
        },
      ];
      index.addAll(documents);
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ index: index.toJSON(), documents }),
      });
      vi.stubGlobal('window', { Book: { rootUrl } });
      vi.stubGlobal('document', { readyState: 'loading', addEventListener: vi.fn() });
      vi.stubGlobal('fetch', fetchMock);
      const { default: search } = await import('../assets/js/search.js');
      expect(await search.init()).toBe(true);
      const prefix = rootUrl.replace(/\/+$/, '');
      expect(fetchMock).toHaveBeenCalledWith(`${prefix}/search_index.json`);
      expect(search.search('velocity')[0].url).toBe(`${prefix}/contents/ch2Velocity.html`);
    }
  );
});
