/** Static-view support for original animations in chapters 1–16.
 * Their .motion overlays and optional .still replacements predate the newer
 * animated insets. Keep those original drawings and timelines intact.
 */
export const nativeAnimationNames = [
  'Figure_02_03_04',
  'Figure_02_07_03',
  'Figure_02_08_05',
  'Figure_03_01_05',
  'Figure_03_04_02',
  'Figure_03_04_05',
  'Figure_03_04_06',
  'Figure_06_02_01',
  'Figure_06_06_02',
  'Figure_07_03_04',
  'Figure_07_04_01',
  'Figure_08_04_01',
  'Figure_08_05_01',
  'Figure_08_05_03',
  'Figure_08_06_01',
  'Figure_09_02_01',
  'Figure_09_05_04',
  'Figure_12_01_02',
  'Figure_12_04_03',
  'Figure_12_04_05',
  'Figure_12_07_01',
  'Figure_13_01_01',
  'Figure_13_02_02',
  'Figure_13_04_01',
  'Figure_13_04_03',
  'Figure_13_04_05',
  'Figure_14_06_01',
  'Figure_14_06_02',
  'Figure_14_06_03',
  'Figure_15_02_10',
  'Figure_15_02_11',
  'Figure_15_03_04',
  'Figure_15_03_05',
  'Figure_15_04_02',
  'Figure_15_05_02',
  'Figure_15_07_02',
  'Figure_16_03_01',
  'Figure_16_03_03',
  'Figure_16_04_01',
  'Figure_16_05_01',
  'Figure_16_06_03',
  'Figure_16_07_04',
  'Figure_16_09_02',
  'Figure_16_10_05',
  'Figure_16_10_06',
  'Figure_16_10_07',
  'Figure_16_10_08',
  'Figure_16_11_02',
];
const names = new Set(nativeAnimationNames);
const style = `<style data-native-animation-controls="">
#animation-paused:target ~ .motion,
#animation-paused:target ~ * .motion {display:none!important;opacity:0!important}
#animation-paused:target ~ .still,
#animation-paused:target ~ * .still {opacity:1!important}
</style>`;

export function enableNativeStaticView(name, svg) {
  if (!names.has(name) || svg.includes('data-native-animation-controls=')) return svg;
  if (!svg.includes('class="motion"') || svg.includes('id="animation-paused"')) {
    throw new Error(`Unexpected motion structure for ${name}`);
  }
  // Put the target before every drawing group, including nested overlays.
  return svg
    .replace(/(<svg\b[^>]*>)/, '$1\n<g id="animation-paused"/>')
    .replace('</svg>', `${style}\n</svg>`);
}
