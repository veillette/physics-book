# Missing solutions added: chapters 27–34

Added on 2026-10-24, on branch `feat/add-missing-solutions`.

All **269 previously unanswered exercises** now have solutions. Additions by
chapter: 27: 32; 28: 24; 29: 28; 30: 27; 31: 68; 32: 29; 33: 33; 34: 28.
Every addition includes Strategy, Solution, Discussion, and Answer. Original
questions and previously supplied solutions were preserved byte for byte.
The separate formatting-completeness check still identifies older answers
without the full editorial labels; those were not rewritten in this pass.

## Interpretation and remaining editorial work

The new solutions explicitly address questionable or underdetermined premises
instead of silently changing the questions. In particular:

- Chapter 27 thin-film coating question: a negligible-thickness coating does
  not generically cancel the reflection of a glass substrate at every wavelength.
- Chapter 31 Binding Energy p6: the binding-curve peak does not measure a
  nuclear force range equal to the nucleus's diameter.
- Chapter 31 Half-Life p24: an incomplete cross-reference requires an explicit
  interpretation; a mass-independent decay factor is also supplied.
- Chapter 31 Nuclear Decay p16: the printed beta-minus equation violates charge
  and lepton-number conservation; its solution gives the corrected equation.
- Chapter 31 Detectors p3: absolute temperature rise requires initial temperature
  and heat capacity; the solution gives a formula and a labeled monatomic-gas example.
- Chapter 33 questions: historical Higgs wording, malformed heavy-quark notation,
  massless-charge assertions, and the eta lifetime premise are qualified.
- Chapter 33 Quarks p2: a new accessible SVG shows constituent quark flow, and
  the lifetime estimate distinguishes lab-energy width from invariant width.
- Chapter 34 questions: the foreground lens is distinguished from the background
  images; neutrino oscillations use mass-dependent phases; Planck time is not
  claimed as a proven minimum tick; gravitational-wave observations are current.

Medical and selected modern-physics answers link authoritative sources where
the question's premise needs qualification. Numerical work uses the book's
appendix conventions, with additional assumptions identified in the solutions.

## Review status

These are authored solutions, **not independently reviewed verdicts**. The
refreshed ledger leaves them pending. Its existing file-hash rule conservatively
marks prior reviews in edited files stale even where the older exercise itself
is unchanged; their original judgments remain retained in `reviews.json`.
No substantive verdicts were invented or transferred automatically.

## Validation

The source preservation check found no modifications to original questions or
old solutions. The missing-solution inventory is zero. The math delimiter
check, JavaScript unit suite (222 tests), Python checker/review suite (78 tests),
and Eleventy build pass. All 39 existing source-bound physics cases pass
(76 assertions). The 108 pre-existing arithmetic flags match the original
flagged expressions and reasons; no new arithmetic flag remains.

A headless Chromium check opened the new solution controls and verified all
269 rendered solution blocks across 51 pages, including their four required
labels. A representative nuclear calculation and the new quark diagram were
also inspected visually.

The full `npm run audit` passes, including links, orphans, figures, YAML,
accessibility, math delimiters, content, structure, cross-references, and
equations. The five copied relative links in chapter-review previews were fixed
by resolving them relative to their original textbook files; the report
generator now preserves those targets on regeneration. Its nine unit tests pass.
These checks do not substitute for an independent physics review of every
newly authored solution.

## Follow-up review

On 2026-10-24 all 269 added solutions were read against their questions.
Numerical results were recomputed (binding energies, activities, half-lives,
decay energies, resonance widths, constructed-problem examples) and the
appendix constants they cite were confirmed. No physics or arithmetic errors
were found. One answer was revised for clarity: the Chapter 32 Fission
question about rain entering the Chernobyl enclosure now states the intended
explanation (water moderates neutrons and raises the fission rate in the
subcritical fuel) instead of leaving it as one possibility among several.
