# Corrections made from the solution review

The paced Codex review only reads the book; it never edits a problem, a solution, or a figure. This page records the second step: a maintainer (here Claude Opus 5.5, working with the book's author) read the Codex findings for a range of chapters, checked each one against the source, the figures, and an independent calculation, and fixed the ones that held up. It is a log of what changed and why, so a later reader can tell a corrected solution from one that was simply re-reviewed.

See the [review ledger](README.md) for the current verdicts and the [paced loop](paced-loop.md) for how the Codex reviews are produced.

## Workflow

Each round covers a range of chapters and follows the same steps.

1. **Triage.** Read the `concern` and `ambiguous` rows in `chapter-NN.md`, and rank them. Wrong final answers, wrong equations, and missing parts come first. Overstated or unsupported discussion claims come next. Pure style comes last.
2. **Verify.** Re-derive the result, read the referenced figure or table, and render any SVG figure involved. A finding is fixed only if it survives this check. Codex is sometimes wrong, and those findings are left alone (see [Findings not acted on](#findings-not-acted-on)).
3. **Fix.** Edit the Markdown source, and when a figure is wrong, edit its generator in `scripts/figures/` or `scripts/sketch/` and regenerate it. Keep the problem's Strategy/Solution/Discussion/Answer structure.
4. **Re-record.** Record a new review for every edited item right away, so the paced loop does not pick up the stale items first. Use `python3 -B scripts/review_solutions.py --record batch.json`. The new review states what was fixed and anything that remains, with its own verdict and confidence.
5. **Carry over.** A review is keyed to both the item's source hash and its file's hash, so editing one problem makes every review in that file stale. For each unchanged item in an edited file, record the same verdict, confidence, and notes against the new file hash. Mark the reviewer as `<original reviewer> (carried over by Claude Opus 5.5: block unchanged, file edited elsewhere)`. This keeps a judgment only where the item's own text is byte-for-byte unchanged.
6. **Check.** Run `npm run check:math`, `npm run check:physics` (all source-bound cases must pass, and the flag count must not rise), `npm run build`, and `npm run test:unit`.
7. **Commit** in two commits: the content fix, then the refreshed ledger.

Post-fix reviews carry the reviewer label `Claude Opus 5.5 (post-fix review, <date>, <chapters>)` in [reviews.json](reviews.json). A post-fix verdict is still an AI assessment. Where the fix addressed only part of a finding, the review stays `concern` and its notes say what is left.

## Rounds

The table counts items with a new post-fix review. It excludes carried-over reviews.

| Chapters | Items re-reviewed | Content commit | Ledger commit |
| --- | ---: | --- | --- |
| 1–10 | 16 | `81f63e0c` | `4c8f2640` |
| 11–15 | 19 | `f7c54045` | `cb5d2ef1` |
| 15–20 | 25 | `af2316b9` | `f3941318` |
| 21–23 | 19 | `e636f406` | `cef332e8` |
| 24–27 | 21 | `726c12f6` | `41a4bc80` |
| 28–29 | 17 | `d96cf74b` | `30693092` |
| 30–31 | 11 | `695eb7fc` | the commit that adds this page |

The per-chapter reports (`chapter-NN.md`) show the post-fix review for every corrected item, except Ch 28 Relativistic Addition of Velocities p4, which Codex re-reviewed after the fix and still flags for its discussion. The [automatic-flag review](automatic-flag-review.md) was refreshed too: two flags disappeared with the corrections and none were added.

Of the post-fix reviews, all but four are now `appropriate`. The four still marked `concern` had their error fixed, but a discussion claim remains that goes beyond the calculation:

- Ch 6 Satellites p5: calls the given mass the "visible" mass, which the problem does not state.
- Ch 11 Cohesion CQ8: does not separate alveolar pressure from the pressure that drives airflow.
- Ch 11 Pressures in the Body p20: the clinical claims go beyond the calculation.
- Ch 24 Spectrum p24: draws a warming inference the comparison does not establish.

### Chapters 1–10

- Ch 3: corrected the alt text of Figure 9 and Figure 12 (angle reference, B's direction). Removed a mismatched Figure 5 reference in Addition of Velocities p9.
- Ch 6: race-track path labels now match Figure 4. Removed duplicated units on G. Added the m²/s² and km³/y² units in the ratios. Gave the rivet's relative-velocity direction.
- Ch 7: compare |ΔPE| with KEᵢ for descents. Friction work is −fd. ½mv₀², not ½(mv₀)².
- Ch 8: the equal-mass collision identity no longer squares the mass. The 90° result now notes the zero-speed exception.
- Ch 9: the offset seesaw (Torque p5) shows the problem-solving steps, with a new free-body diagram, `sketch_09_02_p05`.

### Chapters 11–15

- Wrong answers:
  - Viscosity p18(c): 38 more users, not 9.
  - Archimedes p13(b): 0.72, not 0.68.
  - Convection example 2: 2.96 g/min, using the 37 °C latent heat.
  - Entropy p3: 681 kJ.
  - Phase Change p7 and p10: steam is heated with c_p (149 kcal; 9.35 L), and the p7 graph is regenerated.
- Alveoli (Pressures in the Body p20, Cohesion CQ8): one liquid surface, so P = 2γ/r.
- Missing parts:
  - Humidity p19: both buoyancy fractions are now given.
  - Phase Changes check-understanding 2: the orange-tree question is now answered.
  - Onset of Turbulence p8: answered in terms of the reader's measured Q.
- Dam figure `Figure_11_04_02`: the resultant force acts at a depth of 2h/3.
- Discussion and typo fixes:
  - Thermal Expansion p2: the tower bends away from the sun.
  - Radiation p23(c): the meltwater sign.
  - Flow Rate example 3: the continuity equation.

### Chapters 15–20

- Wrong results and equations:
  - Power example 2: $7.45.
  - Nerve Conduction p2: 0.30 s lag.
  - Capacitors example 2: C_S + C₃.
  - Pendulum example 1: 4π², not (4π)².
  - Damped Oscillator example 1: rewrite.
  - Energy in Waves example 2: 4X², not (4X)².
  - Sound Intensity example 1: I = (Δp)²/(2ρv_w).
  - UCM p1: both energies are now given.
- Discussion numbers and signs in chapters 15–20, for example:
  - Ch 15: about 14,000 steps.
  - Ch 18: 861 N/C.
  - Ch 20: 64× circuit capacity, and the 30 mA pain threshold.
- `Figure_18_05_08`: a taller frame, so 14 of 28 field lines visibly end on the sphere.

### Chapters 21–23

- Kirchhoff p2: the loop equation.
- Kirchhoff p9: names the loop.
- EMF p9: 1.13 Ω crossover.
- Torque on a Loop example 1: A = 0.0100 m².
- More Applications p6, p11, p16:
  - p6: the paired wires' field.
  - p11: current directions from Figure 6.
  - p16: acceleration at the bottom is v²/L.
- Motional EMF p11: 6.41 N.
- Inductance: energy is ½LI², fixed in 6 places.
- Generators p9: cos ωt.
- RLC p12 and p13: state the source voltage.

### Chapters 24–27

- Vision Correction p14 and p18: 26.8 cm and 29.7 cm, for the same prescription worn in glasses.
- Refraction p11: 0.837 mm.
- Mirrors example 2: 1.02 kW and a 146 °C rise, from the trough's opening area.
- Thin Film p7: fluorite gives 366 nm.
- Single Slit p14: 44.9°.
- Spectrum p24(a): 350 W.
- Discussion fixes on field strengths, reflection of violet light, grating spread, and small-angle approximations.

### Chapters 28–29

- Relativistic Momentum p6: 0.667c.
- Relativistic Energy p21: 6.6 × 10⁻⁸ kg.
- Wave Nature of Matter example 1: 8.66 × 10⁻¹⁸ J.
- Probability p8: 0.165 fs.
- Photon Momentum p1: 2.0 × 10²⁶ photons/s.
- Physics statements:
  - Pair-creation thresholds and the need for a nearby nucleus.
  - The nuclear-to-chemical energy ratio.
  - Photon efficiency claims, which were reversed.
  - de Broglie wavelength versus mass.
  - 420 nm is violet.

### Chapters 30–31

- Bohr's Theory p4: the prefactor is 2π², not (2π)². Corrected the intermediate values and the sign in Eₙ = −E₀/n². The 13.6 eV answer was already right.
- Bohr's Theory p11: Z² scales every wavelength in a series by the same factor, so heavier ions cannot make the Balmer and Lyman series overlap. Replaced this with the real Brackett/Paschen overlap.
- Discovery of the Parts of the Atom p1: the 6 × 10²⁰ kg/m³ result is about 3000 times the real nuclear density, because the problem assumes a 1-fm nucleus while gold's is about 14 fm across.
- Quantum Numbers example 1: "the maximum value of m_l, namely m_l = l".
- Quantum Numbers p4: 3p and 3d are degenerate in hydrogen's simple model.
- Pauli Exclusion p28: added the requested photon energies, 1.80, 2.43, and 2.72 eV.
- X-Rays p3: dose is energy per unit mass.
- Binding Energy p3: Bi-209 decays, with a half-life of about 2 × 10¹⁹ y, so it is only effectively stable.
- Binding Energy p5: carbon-14 decays because the ¹⁴C atom is heavier than ¹⁴N (Q ≈ 0.156 MeV). N-14 is actually less tightly bound per nucleon.
- Binding Energy p7: answered part (d).
- Substructure of the Nucleus example 1: the fm-to-m conversion is now cubed.

## Findings not acted on

These Codex findings were checked and the source was left as written:

- Ch 3: the claim that a figure's angle should be 36.6° did not hold up. Only the figure's alt text was corrected.
- Ch 9: the gymnast problem.
- Ch 15: First Law example 1, the "same state" wording.
- Ch 17: the trombone remark, and the notation for ultrasound units.
- The jet field premise, the RC flash-lamp averaging, and the length-contraction wording.

Most remaining `concern` rows in later chapters are discussion overstatements, not wrong answers. Chapters 32–34 had not yet been reviewed by Codex when this page was written.
