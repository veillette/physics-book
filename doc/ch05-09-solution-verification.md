# Independent verification of chapter 5–9 conceptual solutions

**Resolution update, 2026-10-20:** the [completion record](ch01-10-solution-completion.md) documents the added 83 solutions and corrections to V01–V11 below. Chapters 1–10 now have no missing solutions. The rest of this report preserves the independent review as it stood before those corrections.

Reviewed 2026-10-20 against commit `b9bc22cd` and the current uncommitted chapter 5–9 changes. **The completion report is partly correct, but the answers are not ready for approval.** One question remains unanswered, and several supplied answers need corrections to their physics, assumptions, or examples.

I read all **106 conceptual questions and 105 supplied answers**, comparing statements with solutions, recalculating examples, and checking the 15 new SVGs visually and against their generator code. I compared exercise contents with a `git archive HEAD contents` snapshot: **86 answers were added, 19 were rewritten, and no chapter 5–9 question statements or end-of-section problem solutions changed**. The biceps-geometry problem below was already present in the older answer and survives the rewrite; it is not a newly introduced error. Unrelated working-tree changes in chapters 11–15 were left alone.

## Coverage and reported claims

| Chapter   | Conceptual questions | Supplied answers | Change against HEAD        | Still missing |
| --------- | -------------------: | ---------------: | -------------------------- | ------------: |
| 5         |                   16 |               16 | 16 added                   |             0 |
| 6         |                   23 |               22 | 22 added                   |             1 |
| 7         |                   26 |               26 | 26 added                   |             0 |
| 8         |                   22 |               22 | 22 added                   |             0 |
| 9         |                   19 |               19 | 19 rewritten               |             0 |
| **Total** |              **106** |          **105** | **86 added, 19 rewritten** |         **1** |

The discrepancy has an identifiable cause: chapter 6's unanswered centripetal-acceleration question has an exercise wrapper without `data-element-type`. Counting only explicitly typed conceptual questions gives 86 in chapters 5–8; counting the conceptual question under the section 6.2 heading gives **87**. No question has been deleted to reconcile the counts.

| Reported claim                                                                                                 | Independent result                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All 86 conceptual questions in chapters 5–8 answered                                                           | **Incomplete.** Exactly 86 were answered, but there are 87. See V01.                                                                                                                                                                                                                                          |
| All 19 existing chapter 9 answers rewritten                                                                    | **Confirmed.** All 19 solution texts differ from HEAD.                                                                                                                                                                                                                                                        |
| Strategy, Solution, and a closing answer sentence                                                              | **Confirmed for all 105 supplied answers.** This establishes format, not correctness.                                                                                                                                                                                                                         |
| Every answer has worked numerical calculations with units                                                      | **Overstated.** Most do; section 5.2 C2 lists example sizes/speeds but evaluates neither drag law numerically. Some other calculations need clearer assumptions or guard digits.                                                                                                                              |
| 15 new diagrams, plus two reused diagrams                                                                      | **Confirmed:** nine new conceptual SVGs, six new free-body SVGs, and references to the existing `fbd_05_01_q01.svg` and `concept_05_01_q04.svg`. The new visible cube-reflection geometry is consistent, but its accessible description is stale (V08).                                                       |
| Every new diagram was previously viewed and corrected                                                          | The other agent's past viewing activity cannot be established from the files. I independently rendered and inspected all 15 current SVGs.                                                                                                                                                                     |
| Math delimiters, missing figures, cross-references, structure, accessibility, ESLint, Prettier, and build pass | **Confirmed for the repository commands below.** They do not check the conceptual physics or whether accessible descriptions agree with a drawing. The formatting command does not include chapter Markdown files in its glob.                                                                                |
| Regeneration preserves existing SVG bytes                                                                      | **Confirmed.** Evaluated all three generators in memory and compared their output with disk: 130 conceptual/general figures, 77 free-body diagrams, and 103 sketches, **310 identical outputs**, including 295 tracked existing SVGs and 15 new ones. No resource files were overwritten during verification. |
| Orphans dropped from 39 to 22                                                                                  | **Reproducible as a work-stage comparison:** HEAD chapter text leaves 24 tracked images unreferenced, plus the 15 new images before their references are added, giving 39. Current text leaves 22.                                                                                                            |
| All 22 remaining orphans belong to chapters 3–4                                                                | **Incorrect.** There are **1 in chapter 1, 6 in chapter 2, 12 in chapter 3, and 3 in chapter 4**. There are none in chapters 5–9.                                                                                                                                                                             |
| Chapter 4 still has 12 unanswered conceptual questions and chapter 3 has gaps                                  | **Confirmed:** chapter 4 has 10 in section 4.3 and 2 in section 4.7; chapter 3 has 21.                                                                                                                                                                                                                        |
| Changes are uncommitted on top of `b9bc22cd`                                                                   | **Confirmed for the present working tree.**                                                                                                                                                                                                                                                                   |

The current all-exercise count for chapters 1–10 is **83 missing solutions**: chapter 1 (3), chapter 2 (17), chapter 3 (21), chapter 4 (12), chapter 6 (1), and chapter 10 (29). All are conceptual questions. The earlier audit's 169 gaps fell by the 86 newly supplied answers; its CSV remains a baseline snapshot, not a current completion certificate.

## Corrections required

Identifiers C1, C2, and so on are local to each file and count non-problem exercises, as in the earlier inventory. The headings below distinguish substantive errors from issues that can be fixed by specifying an idealization.

### V01 — Missing answer: centripetal acceleration

[Section 6.2 C1](../contents/ch6CentripetalAcceleration.md#L231) still asks whether centripetal acceleration can change speed and has **no solution**. The source has not changed from HEAD. It is missed by relying on `data-element-type="conceptual-questions"` rather than also inspecting section headings.

Add the solution in this exercise, explaining that centripetal acceleration is perpendicular to instantaneous velocity and changes its direction; a tangential component is needed to change speed. If using numerical values or a sketch, show velocity tangent to the circle and acceleration toward its center, and close with a direct answer sentence.

### V02 — Biceps attachment: distance to the wrist is not the moment arm

[Section 9.6 C6, especially the mechanical-advantage calculation](../contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L527), uses `35.0 cm / 38.0 cm = 0.921`, predicts a 42.6 N muscle force, and predicts only 1.09 cm of hand motion per centimeter of contraction. This assumes the muscle force remains perpendicular to the forearm. The question explicitly places the other attachment on the **upper arm close to the elbow**; the tendon would instead pull nearly along the forearm.

For a horizontal forearm, put the elbow at the origin, the upper attachment at `(0,a)`, and the forearm attachment at `(b,0)`. The perpendicular muscle moment arm is

```text
r_perp = ab / sqrt(a² + b²), not b.
```

As a counterexample, **assuming** `a = 0.0400 m`, `b = 0.350 m`, and a hand distance of `0.380 m` gives `r_perp = 0.03974 m`, a mechanical advantage of `0.1046`, and a muscle force of approximately **375 N** for a 39.2 N load, rather than 42.6 N. These illustrative attachment coordinates are not anatomical measurements. The moment arm is bounded by `a`; moving the distal attachment out does not automatically make it 0.350 m.

The motion ratio must use the same actual moment arm through the derivative of tendon length. Rework the geometry, force, motion-ratio, and joint-force claims together and add an appropriately labeled sketch. This error was carried over from the preexisting answer.

### V03 — Braking: a higher static-friction limit does not imply the plotted force spike

[Section 5.1 C3](../contents/ch5Friction.md#L519) takes `μs/μk = 1.3` and concludes that the car's braking force jumps from 3600 N to about 4700 N as the pads stop sliding. The [new graph](../resources/concept_05_01_q03.svg) and its [generator](../scripts/figures/concepts.js#L1142) present this spike as the explanation of the jerk.

Static friction obeys **an inequality**, `|fs| ≤ μs N`; it adjusts to the force required to prevent relative slip and does not automatically jump to its maximum. On a level road, once the car is at rest, it needs no continuing longitudinal net force. The coefficient ratio alone cannot justify the asserted 4700 N spike or 3.9 m/s² deceleration. Also distinguish pad/disc friction, which supplies braking torque, from the road's external longitudinal force on the car.

The sudden change from a nonzero deceleration to zero already explains a stop jerk; easing the pedal reduces that change. If a velocity-dependent pad-friction or compliance model is used to explain an additional near-stop increase, state it explicitly and derive its force history. Revise the answer, plot, alt text, and SVG description consistently rather than equating the static limit with the actual force.

### V04 — The total-energy question is answered as a kinetic-energy question

[Section 8.3 C7](../contents/ch8ConservationOfMomentum.md#L468) asks whether **total energy of a system** must be conserved whenever momentum is conserved. The answer correctly calculates an inelastic collision, but that example conserves total energy and only loses kinetic energy; it does not answer the general implication asked about.

Zero net external force does not establish energetic isolation. A stationary, rigid container can receive **100 J of heat** with balanced external forces: its momentum remains zero while its internal and total energy increase by 100 J. The answer should explicitly distinguish that counterexample from a system isolated from energy transfer. Keep the collision example as an additional explanation of kinetic versus total energy, rather than treating it as a substitute for the requested answer.

### V05 — Tile/carpet example confuses floor force with net force and understates stopping distance

[Section 8.2 C1](../contents/ch8Impulse.md#L251) calculates `Δp = 9.0 kg·m/s` for a 3.0 kg head stopping from 3.0 m/s. It then labels `Δp/Δt` as the **floor force** and depicts equal-area floor-force pulses in [the SVG](../resources/concept_08_02_q01.svg).

With upward positive, the equation is

```text
(N_average − mg) Δt = Δp,
N_average = Δp/Δt + mg.
```

Thus the floor forces are approximately **4529 N for 0.0020 s** and **479 N for 0.020 s**, rather than net forces of 4500 N and 450 N. The floor impulses are **9.059 N·s** and **9.588 N·s**; the **net-force** impulses are the equal 9.0 N·s quantities. Either include gravity or explicitly neglect its impulse and label that approximation in both text and figure. At the longer contact time the correction is about 6.5% of the quoted 450 N.

The same example says the carpet compresses only a few millimeters. The symmetric half-sine net-force pulse actually drawn, or constant deceleration, stopping 3.0 m/s motion over 0.020 s gives a stopping distance of `(3.0 m/s)(0.020 s)/2 = 0.030 m`, **3 cm**, not a few millimeters. Distinguish carpet compression from total head/body stopping displacement or choose mutually consistent example values. The qualitative conclusion that padding lowers peak/average collision forces remains valid.

### V06 — Diving-board energy: the massless-spring idealization is unstated

[Section 7.4 C2](../contents/ch7ConservativeForcesAndPotentialEnergy.md#L365) says that all stored energy is returned to the swimmer when friction is negligible, that the board is necessarily undeformed at detachment, and that it then vibrates. The [new graph](../resources/concept_07_04_q02.svg) holds its potential energy at zero after the feet leave.

Negligible internal friction does not make the board massless. A massive board can retain kinetic energy at detachment, and its subsequent vibration exchanges that energy with elastic potential energy. The detachment configuration also depends on the diver/board contact model. Returning to zero potential energy and staying there is a specific massless-spring launch idealization, not a consequence of conservative force alone.

Either state and consistently use a massless board/spring with an explicit contact model, removing the contradictory vibration assertion, or allow residual board energy and illustrate the subsequent oscillation. Do not infer complete energy transfer to the swimmer from the absence of damping.

### V07 — The block-start numbers are not realistic

[Section 9.6 C4](../contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L468) uses a constant/average **horizontal** reaction of 1400 N for 0.40 s on a 70 kg sprinter, giving **8.0 m/s at block exit**. The arithmetic is correct, but this is not a realistic worked example of a sprint start.

For comparison, a force-platform study of senior and junior sprinters reports horizontal block-exit velocities around **3.36 m/s and 3.16 m/s**, respectively. [Graham-Smith, Colyer, and Salo, primary study and data table](https://journals.sagepub.com/doi/pdf/10.1177/1747954120917537).

Choose plausible average horizontal force and time together. For example, **assuming** 600 N over 0.40 s gives an impulse of 240 N·s and `Δv = (240 kg·m/s)/(70 kg) = 3.43 m/s`. Do not substitute a peak or resultant ground-reaction force for an average horizontal force. Update the closing answer's 560 N·s and 8.0 m/s references too.

### V08 — Cube-scattering SVG description contradicts the corrected drawing

[The SVG's accessible description](../resources/concept_08_06_q01.svg) and [its generator description](../scripts/figures/concepts.js#L1520) describe a face tilted **20° from vertical** and scattering at **40°**. The actual drawing, visible annotation, generator geometry, and answer instead use a face **25° from the incoming horizontal path** and scattering at **50°**.

The visible reflection geometry is consistent with the latter values. Correct the accessible description in the generator and regenerate the SVG. The accessibility command checks the presence of descriptions; its pass does not detect this factual mismatch.

### V09 — Zigzag hiking: the metabolic conclusion is only conditional

[Section 7.8 C1](../contents/ch7WorkEnergyAndPowerInHumans.md#L203) correctly finds equal gravitational potential-energy gain and lower required power at the same walking speed on the gentler path. It then states that total energy consumption is generally greater on the zigzag because it takes longer.

That conclusion follows from an explicitly simplified model with the **same climbing efficiency** on both routes plus a fixed time-dependent overhead. It does not follow from path length alone for real walking: metabolic cost and efficiency depend on slope, speed, and terrain. Experimental work identifies an energetically favorable range of mountain-path gradients. [Minetti et al., primary measurements](https://www.softrun.fr/J%20Appl%20Physiol-2002-Minetti-1039-46.pdf).

Keep the numerical mechanical comparison, but label the greater-consumption conclusion as conditional on its assumptions; the general answer is that the metabolic energy need not be equal and cannot be ordered without a physiological model. The identical `mgh` result is independent of this qualification.

### V10 — Rutherford did not infer nuclear shape by hard-sphere reflection

[Section 8.6 C1](../contents/ch8CollisionsOfPointMassesInTwoDimensions.md#L351) adds a claim that Rutherford used this reasoning to deduce the nucleus's shape and size. The surrounding calculation treats an impenetrable sphere with specular reflection and `θ = π − 2 asin(b/R)`.

Rutherford's analysis instead used the inverse-square **electric field** of a concentrated charge, with hyperbolic trajectories. His [1911 paper](https://www.lnl.infn.it/wp-content/uploads/Articolo_Rutherford_1911.pdf) explicitly derives that model. The hard-sphere formula is appropriate to the idealized question; it should not be presented as the model used to determine nuclear shape and size. Delete the historical claim or replace it with a qualified statement that scattering can reveal interaction/target structure, while identifying Rutherford's different force law.

### V11 — Two moving hands: clarify the relative sliding distance

[Section 7.8 C2](../contents/ch7WorkEnergyAndPowerInHumans.md#L228) says **each hand** slides 0.10 m under a 5.0 N friction force, but assigns only 0.50 J of total frictional heating to the stroke. If the hands move oppositely by 0.10 m each, the relative sliding distance is 0.20 m, so the dissipated energy is `(5.0 N)(0.20 m) = 1.0 J`.

If the intended 0.10 m is the relative displacement between the hands, say so; then 0.50 J is correct. The conclusion about zero efficiency for external mechanical work does not change. This is a wording/model ambiguity with a factor-of-two numerical consequence.

## Smaller presentation follow-ups

[Section 5.2 C1](../contents/ch5DragForces.md#L394) writes `(27 N)(12 m/s) = 330 W`. Using the displayed rounded force gives 324 W; using the unrounded drag force, 27.4428 N, gives 329.3136 W, which rounds to 330 W. The physical result is reasonable. Say that guard digits were retained, or display the unrounded intermediate, so the worked equality agrees with the arithmetic. This is also the sole numeric comparison flagged by `check_math.py --range 5-9`.

[Section 5.2 C2](../contents/ch5DragForces.md#L416) explains the two drag regimes but does not actually carry out a numerical drag or Reynolds-number calculation. This is a direct exception to the report's claim that every answer has worked numbers. A qualitative answer can be appropriate, but if enforcing the stated numerical-example standard, supply one and explain that Stokes drag requires creeping flow (`Re ≪ 1`), rather than merely any laminar flow. Comparing two arbitrarily chosen curves alone does not establish a physical regime boundary.

## Checks rerun and their limits

| Check                                                     | Result                                                                                                                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check:math`                                      | Pass: balanced delimiters in 282 content files.                                                                                                                          |
| `npm run check:figures:missing`                           | Pass: no missing figures.                                                                                                                                                |
| `npm run check:cross-refs`                                | Pass.                                                                                                                                                                    |
| `npm run check:structure`                                 | Pass.                                                                                                                                                                    |
| `npm run check:accessibility`                             | Pass, including 295 Markdown files; does not assess the truth of alt text/descriptions.                                                                                  |
| `npm run lint`                                            | Pass.                                                                                                                                                                    |
| `npm run format:check`                                    | Pass for its configured JavaScript, root Markdown/JSON, and workflow globs; chapter Markdown is not included.                                                            |
| `npm run build`                                           | Pass: Eleventy wrote 288 files.                                                                                                                                          |
| `npm run test:unit -- tests/figure-physics.test.js`       | Pass: 14 existing tests. This is not proof of the new solutions' physics.                                                                                                |
| `python3 -B check_math.py --range 5-9`                    | 36 files, 69 existing worked-example checks, zero likely numeric errors, one small comparison flag described above. It does not fully check all new conceptual examples. |
| `npm run check:orphans`                                   | Reports 22 orphan images and exits nonzero; this is an outstanding repository finding, not a passing check.                                                              |
| In-memory regeneration of all three figure collections    | 310 outputs identical to disk; 295 tracked and 15 new.                                                                                                                   |
| Independent all-exercise availability scan, chapters 1–10 | 790 exercises accounted for; 83 missing solutions, all conceptual.                                                                                                       |

The unit-bearing calculations and closing answer sentences are substantially improved, but those presentation improvements do not resolve the issues above. Correct the missing answer and substantive findings, update affected figures and descriptions together, then rerun checks and review the revised reasoning before marking these sections complete. This verification adds review documentation only; it does not silently repair the textbook sources or commit any changes.
