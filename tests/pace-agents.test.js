import { describe, expect, it } from 'vitest';
import {
  allowedChange,
  chapterFiles,
  nextJob,
  parseVerdict,
  rasterNamesIn,
  reconcileState,
  solutionsPrompt,
  improvePrompt,
  svgPrompt,
  textbookChapters,
  unexpectedPaths,
  waitMs,
} from '../scripts/pace-agents.js';

function state(chapters) {
  return { chapters };
}

describe('pace-agents', () => {
  it('reads raster figure names out of markdown', () => {
    const markdown = [
      '![Alt](../resources/Figure_03_02_01.jpg "caption")',
      '![Other](/resources/Figure_03_02_02.png)',
      '![Done](../resources/Figure_03_02_03.svg)',
      '<img src="../resources/concept_03_02_q01.jpeg">',
    ].join('\n');
    expect(rasterNamesIn(markdown)).toEqual([
      'Figure_03_02_01.jpg',
      'Figure_03_02_02.png',
      'concept_03_02_q01.jpeg',
    ]);
  });

  it('keeps solution work behind unfinished figure passes', () => {
    const open = state({
      1: { svg: 'pending', solutions: 'pending' },
      2: { svg: 'skipped', solutions: 'pending' },
    });
    expect(nextJob(open)).toEqual({ chapter: 1, phase: 'svg', status: 'pending' });

    open.chapters[1].svg = 'committed';
    open.chapters[2].svg = 'rejected';
    expect(nextJob(open)).toEqual({ chapter: 1, phase: 'solutions', status: 'pending' });
    expect(nextJob(open, { phase: 'svg' })).toBeNull();
    expect(nextJob(open, { phase: 'solutions', chapter: 2 })).toEqual({
      chapter: 2,
      phase: 'solutions',
      status: 'pending',
    });
  });

  it('lets an explicit solutions phase start early', () => {
    const open = state({
      4: { svg: 'pending', solutions: 'in-progress' },
    });
    expect(nextJob(open, { phase: 'solutions' })).toEqual({
      chapter: 4,
      phase: 'solutions',
      status: 'in-progress',
    });
  });

  it('measures the hour from the previous request', () => {
    expect(waitMs(null, 60_000, 5_000)).toBe(0);
    expect(waitMs(1_000, 60_000, 1_000)).toBe(60_000);
    expect(waitMs(1_000, 60_000, 70_000)).toBe(0);
    expect(waitMs('2020-01-01T00:00:00.000Z', 60_000, Date.parse('2020-01-01T00:00:30.000Z'))).toBe(
      30_000
    );
  });

  it('accepts only a verdict object from Codex', () => {
    expect(parseVerdict('{"verdict":"accept","summary":"Looks right.","findings":[]}')).toEqual({
      verdict: 'accept',
      summary: 'Looks right.',
      findings: [],
    });
    expect(parseVerdict('no json here').verdict).toBe('reject');
    expect(parseVerdict('').verdict).toBe('reject');
  });

  it('refuses commits outside the chapter content and figure scripts', () => {
    expect(allowedChange('contents/ch2Displacement.md')).toBe(true);
    expect(allowedChange('resources/Figure_02_01_01.svg')).toBe(true);
    expect(allowedChange('scripts/figures/ch02.js')).toBe(true);
    expect(allowedChange('scripts/generate-figures.js')).toBe(true);
    expect(allowedChange('package.json')).toBe(false);
    expect(
      unexpectedPaths([
        ' M contents/ch2Displacement.md',
        '?? resources/Figure_02_01_01.svg',
        ' M package.json',
      ])
    ).toEqual(['package.json']);
  });

  it('builds chapter file lists from the summary and describes both jobs', () => {
    const summary = [
      {
        chapterNumber: 0,
        chapterTitle: 'Preface',
        chapterFile: 'contents/preface.md',
        sections: [],
      },
      {
        chapterNumber: 2,
        chapterTitle: 'Kinematics',
        chapterFile: 'contents/ch2Kinematics.md',
        sections: [{ sectionFile: 'contents/ch2Displacement.md' }],
      },
    ];
    expect(textbookChapters(summary).map(chapter => chapter.chapterNumber)).toEqual([2]);
    expect(chapterFiles(summary, 2)).toEqual([
      'contents/ch2Kinematics.md',
      'contents/ch2Displacement.md',
    ]);
    const reconciled = reconcileState({ chapters: {} }, summary);
    expect(reconciled.chapters[2]).toEqual({ svg: 'pending', solutions: 'pending' });
    expect(svgPrompt(2, 'Kinematics', chapterFiles(summary, 2), ['Figure_02_01_01.jpg'])).toContain(
      'PACE_RESULT: done'
    );
    expect(improvePrompt(2)).toContain('Do not reject this work');
    expect(solutionsPrompt(2, 'Kinematics', chapterFiles(summary, 2))).toContain('**Discussion**');
  });
});
