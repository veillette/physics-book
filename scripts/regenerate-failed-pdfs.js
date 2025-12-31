#!/usr/bin/env node
/**
 * Regenerate the 5 failed combined chapter PDFs
 */

import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = path.resolve(__dirname, '..');
const outputDir = path.join(baseDir, 'pdf-output');
const baseUrl = 'http://localhost:4000/physics-book';

const failedChapters = [
  {
    num: 9,
    title: 'Statics and Torque',
    file: 'ch9StaticsAndTorque',
    sections: [
      'ch9TheFirstConditionForEquilibrium',
      'ch9TheSecondConditionForEquilibrium',
      'ch9StabilityApplicationsOfStatics',
      'ch9SimpleMachines',
      'ch9ForcesAndTorquesInMusclesAndJoints',
      'ch9ProblemSolvingStrategiesForStatics',
    ],
  },
  {
    num: 16,
    title: 'Oscillatory Motion and Waves',
    file: 'ch16OscillatoryMotionAndWaves',
    sections: [
      'ch16HookesLaw',
      'ch16PeriodAndFrequencyInOscillations',
      'ch16SimpleHarmonicMotionASpecialPeriodicMotion',
      'ch16TheSimplePendulum',
      'ch16Energy',
      'ch16UniformCircularMotionAndSimpleHarmonicMotion',
      'ch16DampedHarmonicMotion',
      'ch16ForcedOscillationsAndResonance',
      'ch16WavesEnergyAndPower',
      'ch16Superposition',
    ],
  },
  {
    num: 23,
    title: 'Electromagnetic Induction, AC Circuits, and Electrical Technologies',
    file: 'ch23ElectromagneticInductionACCircuitsAndElectricalTechnologies',
    sections: [
      'ch23InducedEmfAndMagneticFlux',
      'ch23FaradaysLawOfInductionLenzsLaw',
      'ch23MotionalEmf',
      'ch23EddyCurrentsAndMagneticDamping',
      'ch23ElectricGenerators',
      'ch23BackEmf',
      'ch23Transformers',
      'ch23ElectricalSafety',
      'ch23InductanceRLCircuits',
      'ch23ReactiveInductiveAndCapacitiveResonance',
      'ch23RLCSeriesACCircuits',
    ],
  },
  {
    num: 24,
    title: 'Electromagnetic Waves',
    file: 'ch24ElectromagneticWaves',
    sections: [
      'ch24MaxwellsEquations',
      'ch24ProductionOfElectromagneticWaves',
      'ch24TheElectromagneticSpectrum',
      'ch24EnergyInElectromagneticWaves',
    ],
  },
  {
    num: 29,
    title: 'Introduction to Quantum Physics',
    file: 'ch29QuantumPhysics',
    sections: [
      'ch29Quantization',
      'ch29ThePhotoelectricEffect',
      'ch29PhotonEnergies',
      'ch29PhotonMomentum',
      'ch29TheParticleWaveDuality',
      'ch29TheWaveNatureOfMatter',
      'ch29ProbabilityTheHeisenbergUncertaintyPrinciple',
      'ch29TheParticleWaveDualityReviewed',
    ],
  },
];

async function generateCombinedPdf(browser, chapter) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });

  const chapterNum = String(chapter.num).padStart(2, '0');
  const outputPath = path.join(outputDir, `chapter-${chapterNum}-complete.pdf`);

  console.log(`\nGenerating Chapter ${chapter.num}: ${chapter.title}`);

  try {
    const urls = [`${baseUrl}/contents/${chapter.file}.html`];
    for (const section of chapter.sections) {
      urls.push(`${baseUrl}/contents/${section}.html`);
    }

    let combinedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Chapter ${chapter.num}: ${chapter.title}</title>
        <style>
          body { font-family: serif; }
          .chapter-break { page-break-before: always; }
          h1 { font-size: 24pt; }
          h2 { font-size: 18pt; }
        </style>
      </head>
      <body>
    `;

    for (let i = 0; i < urls.length; i++) {
      try {
        console.log(`  Loading (${i + 1}/${urls.length}): ${urls[i].split('/').pop()}`);
        await page.goto(urls[i], { waitUntil: 'networkidle', timeout: 120000 });

        // Wait for MathJax
        await page
          .waitForFunction(
            () => {
              if (typeof MathJax !== 'undefined' && MathJax.startup) {
                return MathJax.startup.promise !== undefined;
              }
              return true;
            },
            { timeout: 10000 }
          )
          .catch(() => {});

        await page.waitForTimeout(2000);

        const content = await page.evaluate(() => {
          const main =
            document.querySelector('.markdown-section') ||
            document.querySelector('main') ||
            document.querySelector('article') ||
            document.body;
          return main.innerHTML;
        });

        combinedHtml += `<div class="${i > 0 ? 'chapter-break' : ''}">${content}</div>`;
        console.log(`    ✓ Loaded ${(content.length / 1024).toFixed(1)}KB`);
      } catch (e) {
        console.error(`    ✗ Failed to load: ${e.message}`);
      }
    }

    combinedHtml += '</body></html>';

    console.log(`  Setting content (${(combinedHtml.length / 1024).toFixed(1)}KB)...`);
    await page.setContent(combinedHtml, { waitUntil: 'networkidle', timeout: 180000 });
    await page.waitForTimeout(3000);

    console.log('  Generating PDF...');
    await page.pdf({
      path: outputPath,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.75in',
        bottom: '0.75in',
        left: '0.75in',
        right: '0.75in',
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          <span class="title"></span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    const stats = fs.statSync(outputPath);
    console.log(`  ✓ Success! Generated ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
    return { success: true, chapter: chapter.num };
  } catch (e) {
    console.error(`  ✗ Failed: ${e.message}`);
    return { success: false, chapter: chapter.num, error: e.message };
  } finally {
    await context.close();
  }
}

async function run() {
  console.log('Regenerating 5 failed combined chapter PDFs\n');

  const browser = await chromium.launch({ headless: true });

  const results = [];
  for (const chapter of failedChapters) {
    const result = await generateCombinedPdf(browser, chapter);
    results.push(result);
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('RESULTS');
  console.log('='.repeat(60));
  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`Succeeded: ${succeeded}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    console.log('\nFailed chapters:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`  Chapter ${r.chapter}: ${r.error}`);
      });
  }

  return failed === 0;
}

run().then(success => {
  process.exit(success ? 0 : 1);
});
