import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';
import { describe, expect, it, vi } from 'vitest';
import { assembleBook, bookFiles } from '../scripts/lib/pdf-book.js';
import { PDFGenerator } from '../scripts/generate-pdf.js';

describe('complete book PDF', () => {
  it('includes the preface, every chapter and section, and both appendices', async () => {
    const summary = await fs.readFile(new URL('../SUMMARY.md', import.meta.url), 'utf8');
    const files = bookFiles(summary);
    expect(files[0]).toBe('contents/preface.md');
    expect(files.slice(-2)).toEqual(['contents/appendixA.md', 'contents/appendixB.md']);
    const links = [...summary.matchAll(/\]\((contents\/[^)]+\.md)\)/g)].map(match => match[1]);
    expect(files).toEqual(links);
    expect(new Set(files).size).toBe(files.length);
  });

  it('includes every source in order and records its page range', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-book-'));
    try {
      const output = path.join(directory, 'book.pdf');
      const result = await assembleBook(
        ['preface', 'chapter', 'section'],
        async (url, index) => {
          const pdf = await PDFDocument.create();
          for (let i = 0; i <= index; i++) pdf.addPage([400 + index, 600]);
          return { bytes: await pdf.save(), title: url };
        },
        output
      );
      expect(result.sourceCount).toBe(3);
      expect(result.pageCount).toBe(6);
      expect(result.sections.map(({ firstPage, pageCount }) => [firstPage, pageCount])).toEqual([
        [1, 1],
        [2, 2],
        [4, 3],
      ]);
      const pdf = await PDFDocument.load(await fs.readFile(output));
      expect(pdf.getPages().map(page => page.getWidth())).toEqual([400, 401, 401, 402, 402, 402]);
      expect(pdf.getTitle()).toBe('General Physics - Complete Book');
    } finally {
      await fs.rm(directory, { recursive: true, force: true });
    }
  });

  it('fails on a missing source without replacing the previous book', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-book-'));
    try {
      const output = path.join(directory, 'book.pdf');
      await fs.writeFile(output, 'previous book');
      const render = vi.fn(async url => {
        if (url === 'missing') throw new Error('HTTP 404');
        const pdf = await PDFDocument.create();
        pdf.addPage();
        return { bytes: await pdf.save() };
      });
      await expect(assembleBook(['first', 'missing', 'last'], render, output)).rejects.toThrow(
        'HTTP 404'
      );
      expect(render).toHaveBeenCalledTimes(2);
      expect(await fs.readFile(output, 'utf8')).toBe('previous book');
      expect(await fs.readdir(directory)).toEqual(['book.pdf']);
    } finally {
      await fs.rm(directory, { recursive: true, force: true });
    }
  });

  it('rejects an empty book', async () => {
    await expect(assembleBook([], vi.fn(), 'unused.pdf')).rejects.toThrow('No book sections');
  });

  it('waits for MathJax startup and the final typeset pass', async () => {
    const calls = [];
    const previousWindow = global.window;
    const previousDocument = global.document;
    global.window = {
      requestAnimationFrame: callback => callback(),
      MathJax: {
        startup: { promise: Promise.resolve().then(() => calls.push('startup')) },
        typesetPromise: async () => calls.push('typeset'),
      },
    };
    global.document = { fonts: { ready: Promise.resolve() } };
    try {
      await new PDFGenerator().waitForMathJax({
        waitForFunction: vi.fn(),
        evaluate: callback => callback(),
      });
      expect(calls).toEqual(['startup', 'typeset']);
    } finally {
      global.window = previousWindow;
      global.document = previousDocument;
    }
  });
});
