# Missing solutions in chapters 1–10: audit and completion plan

**Completion update, 2026-10-20:** all 83 remaining missing solutions have been supplied and the reviewed findings corrected; see the [completion record](ch01-10-solution-completion.md). The [exercise tracker](ch01-10-solution-audit.csv) now contains current source locations and follow-up statuses. The audit counts and plan below preserve the historical baseline; the tracker's absent-solution filter now returns no rows.

## Historical audit and plan

Snapshot: **2026-10-20, 15:43 EDT**, source commit `b9bc22cd` plus the working tree. Another agent is actively preparing diagrams and answers, so these counts describe this snapshot, not their eventual result. This audit changes documentation only.

**169 exercises have no supplied solution. All are conceptual questions.** Every one of the **541 end-of-section problems** and **22 checks for understanding** has a solution block. A block's presence does not establish that every requested part, calculation, or drawing is supplied.

The [complete inventory](ch01-10-solution-audit.csv) records all **790 exercises**, with source locations, question text, availability, follow-up work, assignment, and status. Filter `solution_availability=absent` for the missing answers, then `owner=unassigned` for the **82 gaps outside the other agent's assignment**. The [earlier technical review](ch01-10-exercise-review.md) and its coverage CSV are historical; their missing-solution totals no longer describe the current source. This report supersedes their availability counts without revalidating all their physics findings.

## Coverage and ownership

| Chapter   | Problems | Checks for understanding | Conceptual questions | Missing answers | Missing assigned to other agent | Missing unassigned |
| --------- | -------: | -----------------------: | -------------------: | --------------: | ------------------------------: | -----------------: |
| 1         |       36 |                        7 |                   12 |               3 |                               0 |                  3 |
| 2         |       66 |                        7 |                   31 |              17 |                               0 |                 17 |
| 3         |       70 |                        0 |                   21 |              21 |                               0 |                 21 |
| 4         |       54 |                        1 |                   27 |              12 |                               0 |                 12 |
| 5         |       44 |                        0 |                   16 |              16 |                              16 |                  0 |
| 6         |       50 |                        0 |                   23 |              23 |                              23 |                  0 |
| 7         |       69 |                        0 |                   26 |              26 |                              26 |                  0 |
| 8         |       64 |                        0 |                   22 |              22 |                              22 |                  0 |
| 9         |       40 |                        0 |                   19 |               0 |                               0 |                  0 |
| 10        |       48 |                        7 |                   30 |              29 |                               0 |                 29 |
| **Total** |  **541** |                   **22** |              **227** |         **169** |                          **87** |             **82** |

The user reports that the other agent owns unanswered conceptual questions in chapters 5–8 and revisions to all 19 existing chapter 9 conceptual answers. Those tasks are marked `in_progress_by_user_report`, not complete. Their stated count of 94 unanswered questions in chapters 5–8 differs from the **87 found here: 16 + 23 + 26 + 22**. Reconcile against the exact exercise IDs below before allocating the additional seven; do not invent seven additional gaps. Chapter 9's 19 revisions are separate from the missing-answer total.

The other agent also owns the associated diagram work. Avoid concurrent edits to their chapter 5–9 conceptual answers and shared figure-generator files. Allocate remaining work by section and coordinate any shared generator edits before starting them.

## Method and limits

Scanned all **73 chapter 1–10 Markdown files**, including the 62 containing exercises. Independently counted **790 exercise wrappers and 790 problem containers**, matching the inventory. Examined each exercise for Markdown or legacy HTML solution blocks, checked the existing problem-completeness flags, and inspected short answers and solutions that explicitly request drawings. The untyped conceptual question in section 6.2 is included from its heading; singular/plural problem types and capitalized `Check-Understanding` are included.

The existing command `python3 -B find_incomplete_solutions.py --range 1-10 --summary` reports **541 problems, zero absent solution blocks, and 22 completeness flags**. It deliberately skips conceptual questions and checks for understanding, so it cannot certify the absence of missing solutions across all exercise types.

This is an availability audit with targeted follow-up findings, not a new line-by-line correctness review of all 621 supplied solutions. `present` and `presence_checked_only` in the CSV must not be read as approval of physics, units, figures, or every subpart. Source line numbers are snapshot locations; match by file, local ID, and question text after edits.

For a repeatable availability count using the existing parser, run this from the repository root:

```bash
python3 -B - <<'PY'
from collections import Counter
import find_incomplete_solutions as audit

for chapter, files in audit.chapter_files(
    audit.DEFAULT_CONTENTS_DIR, set(range(1, 11))
).items():
    counts = Counter()
    for path in files:
        lines = path.read_text().splitlines()
        for start, body, is_problem in audit.iter_exercises(lines):
            raw = audit.ELEMENT_TYPE_RE.search(lines[start])
            raw_type = raw.group(1).lower() if raw else ''
            kind = ('problem' if is_problem else
                    'check' if 'check' in raw_type else 'conceptual')
            blocks, unclosed = audit.extract_blocks(body)
            counts[kind] += 1
            if not '\n'.join(blocks['solution']).strip():
                counts['missing_' + kind] += 1
            if unclosed:
                print('MARKUP:', path, start + 1, unclosed)
    print(chapter, dict(counts))
PY
```

## Existing solutions needing follow-up

The 22 automatic problem flags break down into **two markup defects, two solutions with an unworked numerical subpart, and 18 solutions using alternate or abbreviated headings**. Two of those 18 also lack requested drawings. An additional check for understanding needs calculation steps, and an otherwise fully labeled problem lacks requested graphs. These are separate from the 169 absent answers.

| Priority    | Exercise                                                                                                      | Finding and concrete action                                                                                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First       | [1.2 P5, soccer-field conversion](../contents/ch1PhysicalQuantitiesAndUnits.md#L648)                          | Remove the stray closing `</div>` after the guard-digit paragraph. It ends the exercise before its Discussion, Answer, and solution fence. Keep the existing calculations; turn the final dimension list into a sentence. |
| First       | [3.4 P23, football and wind gust](../contents/ch3ProjectileMotion.md#L2800)                                   | Remove the stray closing `</div>` after the equivalent range calculation so Discussion and Answer remain inside the solution.                                                                                             |
| Next        | [1.3 C3, significant-figure calculation check](../contents/ch1AccuracyPrecisionAndSignificantFigures.md#L359) | Show the bag-weight addition with units and the force substitution with kg and m/s²; explain the rounding and give a sentence for each result. Answers and rounding comments already exist.                               |
| Next        | [2.7 P5(c), dolphin flight time](../contents/ch2FallingObjects.md#L822)                                       | Derive the nonzero return time from the vertical-motion equation, substitute values with units, and end with a sentence. The height calculation is already worked.                                                        |
| Next        | [9.2 P1(a), door torque](../contents/ch9TheSecondConditionForEquilibrium.md#L459)                             | Add the torque equation, unit-bearing substitution, and final-answer sentence; retain the existing explanation for part (b). This numerical problem is outside the other agent's chapter 9 conceptual-answer assignment.  |
| Next        | [2.8 P8, position graph](../contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L920)                      | Supply the requested velocity and acceleration SVG plots. Existing text describes them but does not draw them. Label time, velocity, and acceleration units and explain the idealized transitions.                        |
| Next        | [4.6 P8(b,c), force addition](../contents/ch4ProblemSolvingStrategies.md#L696)                                | Supply the requested scale drawings for both addition orders and the alternative pair. Show axes, vector labels, and the force scale. Instructions for drawing are already supplied.                                      |
| Next        | [4.6 P14, elevator construction](../contents/ch4ProblemSolvingStrategies.md#L1167)                            | Add the requested SVG free-body diagram with the elevator-plus-load system, origin, upward positive direction, tension, and weight. A worked sample already exists.                                                       |
| Other agent | [9.1 C1, dynamic equilibrium](../contents/ch9TheFirstConditionForEquilibrium.md#L92)                          | The solution describes the requested sketch without drawing it. Include its SVG in the already assigned set of 19 chapter 9 conceptual revisions.                                                                         |

The remaining **16 heading-only flags** are 1.2 P3; 3.4 P25; 4.6 P1–P4, P10–P13, P16–P17; 7.9 P8–P9; 9.4 P4; and 9.2 P5. Their working should be retained. Review whether adding consistent Strategy/Solution/Discussion labels would help; do not count them as missing solutions. The CSV records the exact missing labels for all 22 problem flags, including the two drawing tasks above.

## Completion order

1. **Repair the two solution-container defects.** Recheck parsing before using automated heading counts to guide edits.
2. **Fill the 82 unassigned gaps in prerequisite order:** chapter 1 (3), chapter 2 (17), chapter 3 (21), chapter 4 (12), then chapter 10 (29). Complete one section at a time, including its required figures and review, before moving on. These chapters form five concrete batches; their exercise IDs are listed below.
3. **Coordinate the other agent's delivery:** chapters 5–8 supply 87 missing answers at this baseline, and chapter 9 supplies 19 revised existing answers. Recount after their text lands; newly created SVGs alone do not close a missing-solution task. Resolve the 94-versus-87 discrepancy using the inventory.
4. **Expand the three identified calculations and supply the three unassigned requested drawings.** The chapter 9 dynamic-equilibrium drawing stays with the other agent. Handle the remaining 16 heading-only items as presentation work after substantive gaps.
5. **Validate each section and update the tracker.** Recompute availability from the current source, then record content review and figure review separately. Keep a task pending until every requested subpart and drawing is present and checked.

Section 1.3's prescription/diopter research question needs cited, current sources when its solution is written. Distinguish measurement uncertainty, prescription increments, and manufacturing tolerances rather than inventing a universal uncertainty. Open-ended questions need a clearly labeled sample answer with explicit assumptions, not a claim of a unique answer.

Chapters 10.6 C4 and 10.7 C2 repeat the motorcycle-turning question. Use consistent reasoning in both solutions and verify the stated viewpoint and directions; do not count one supplied answer as covering the other exercise automatically.

## Required solution standard

Write each solution immediately after its problem, inside that exercise's existing `::: solution` container. Preserve the file's fence depth and close equation divs, solution containers, and exercise wrappers in order. Use the notation and MathJax macros already used in the surrounding section.

For each numerical or symbolic calculation:

1. State the givens with units, requested quantities, assumptions, and system of interest. Specify origin, positive axes, and a torque sign convention when needed.
2. Explain the physical principle and why the selected equation applies. Rearrange symbolically before substituting numbers where useful.
3. Show each substantive calculation step. Carry units in every numerical substitution and intermediate dimensional result; show conversion factors as ratios so canceled units are visible. For symbolic derivations, state the dimensions of the symbols and check the resulting dimensions.
4. Keep guard digits until the final result, then apply the stated precision. Check dimensions, signs, directions, limiting behavior, and physical plausibility.
5. End with a **complete sentence** answering the requested question, including units and direction or reference frame when applicable. For multipart questions, close each part with its own sentence. A bare equation or list of numbers is insufficient.

For example, a calculation of speed should retain units as `v = (12 m)/(3.0 s) = 4.0 m/s`, followed by “The object's speed is 4.0 m/s.” This is an illustration of the writing standard, not an answer to a listed exercise.

For conceptual questions, identify the principle, explain its application, address every part, and finish with a direct answer sentence. Use a small worked numerical example with units when it clarifies the reasoning; identify invented values as illustrative assumptions. Purely qualitative questions do not need artificial numbers or units.

## SVG figure requirements

Add an SVG whenever the question explicitly requests a sketch, graph, scale drawing, or free-body diagram, or when geometry, directions, forces, or reference frames would otherwise be difficult to follow. Reuse a suitable existing SVG when it actually answers the question. Prefer the existing SVG generator conventions for new figures; coordinate access to shared generators with the other agent.

| Topic                               | Figure to supply when needed                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One-dimensional motion and graphs   | Mark the origin and positive direction. Label graph axes with quantity and unit, identify intervals and endpoints, and distinguish discontinuities from finite accelerations. |
| Vector addition and relative motion | Draw labeled arrows to a consistent scale with x/y axes, direction angles, and the reference frame. For a scale-drawing request, state the scale.                             |
| Projectile motion                   | Use the launch or specified reference point as origin; label x/y axes, initial components, gravity direction, and relevant heights or distances.                              |
| Forces and equilibrium              | Identify the isolated body/system. Draw all external forces on it, label axes and directions, and keep motion/acceleration arrows visually distinct from force arrows.        |
| Rotation and angular momentum       | Mark the pivot/axis, lever arms, force directions, positive rotation, and any out-of-plane vector convention. Use the same signs in the drawing and equations.                |

Save figures in `resources/`, with descriptive filenames consistent with existing chapter/section/question naming. Give them a `viewBox`, readable labels, and accessible titles/descriptions; include meaningful Markdown alt text. Include units on numeric lengths, forces, and graph axes. A drawing must agree with the equations and final sentence. Do not add coordinate axes to a purely qualitative illustration when they convey no useful information.

## Validation and completion criteria

For each changed section, independently recompute numerical results with unrounded inputs; check every equation's dimensions and the consistency of diagrams, signs, and reference frames. Inspect the rendered solution for legible SVG labels, correct math, and properly nested containers. This human review is needed even when the heading checker passes.

After each batch, rerun the all-exercise availability count above and `python3 -B find_incomplete_solutions.py --range 1-10 --summary`. Use `python3 -B check_math.py --range 1-10`, `npm run check:math`, `npm run check:figures:missing`, `npm run check:accessibility`, and `npm run build` as appropriate to the changed content, separating existing unrelated findings from regressions. These are planned implementation checks; this documentation-only audit has not run or claimed that full validation suite.

Complete the work when all **790** baseline exercises remain accounted for, the missing-solution count is **zero across all exercise types**, all requested parts and drawings are supplied, and each new or revised solution passes the explanation, units, and final-sentence standard. Close markup defects. Resolve or explicitly triage heading-only flags without treating headings as evidence of correct physics. Update the CSV from the then-current sources and record reviewed tasks as complete only after those checks.

## Exact backlog by section

These are all 169 absent answers at the snapshot. C identifiers count every non-problem exercise in a file, including checks for understanding; consequently, the first conceptual question can be C2, C3, or C4. Use the question text in the CSV to confirm identity after source lines move.

| Section | Source                                                                                                                   | Missing local IDs | Count | Assignment  |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------- | ----: | ----------- |
| 1.2     | [ch1PhysicalQuantitiesAndUnits](../contents/ch1PhysicalQuantitiesAndUnits.md#L483)                                       | C3                |     1 | Unassigned  |
| 1.3     | [ch1AccuracyPrecisionAndSignificantFigures](../contents/ch1AccuracyPrecisionAndSignificantFigures.md#L425)               | C4, C5            |     2 | Unassigned  |
| 2.3     | [ch2TimeVelocityAndSpeed](../contents/ch2TimeVelocityAndSpeed.md#L254)                                                   | C2–C6             |     5 | Unassigned  |
| 2.7     | [ch2FallingObjects](../contents/ch2FallingObjects.md#L444)                                                               | C2–C7             |     6 | Unassigned  |
| 2.8     | [ch2GraphicalAnalysisOfOneDimensionalMotion](../contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L372)             | C2–C7             |     6 | Unassigned  |
| 3.2     | [ch3VectorAdditionAndSubtractionGraphicalMethods](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L378)   | C1–C8             |     8 | Unassigned  |
| 3.3     | [ch3VectorAdditionAndSubtractionAnalyticalMethods](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L436) | C1–C4             |     4 | Unassigned  |
| 3.4     | [ch3ProjectileMotion](../contents/ch3ProjectileMotion.md#L654)                                                           | C1–C4             |     4 | Unassigned  |
| 3.5     | [ch3AdditionOfVelocities](../contents/ch3AdditionOfVelocities.md#L505)                                                   | C1–C5             |     5 | Unassigned  |
| 4.3     | [ch4NewtonsSecondLawOfMotion](../contents/ch4NewtonsSecondLawOfMotion.md#L456)                                           | C1–C10            |    10 | Unassigned  |
| 4.7     | [ch4FurtherApplicationsOfNewtonsLawsOfMotion](../contents/ch4FurtherApplicationsOfNewtonsLawsOfMotion.md#L501)           | C1, C2            |     2 | Unassigned  |
| 5.1     | [ch5Friction](../contents/ch5Friction.md#L420)                                                                           | C1–C4             |     4 | Other agent |
| 5.2     | [ch5DragForces](../contents/ch5DragForces.md#L371)                                                                       | C1–C4             |     4 | Other agent |
| 5.3     | [ch5Elasticity](../contents/ch5Elasticity.md#L666)                                                                       | C1–C8             |     8 | Other agent |
| 6.1     | [ch6RotationAngleAndAngularVelocity](../contents/ch6RotationAngleAndAngularVelocity.md#L263)                             | C1                |     1 | Other agent |
| 6.2     | [ch6CentripetalAcceleration](../contents/ch6CentripetalAcceleration.md#L231)                                             | C1                |     1 | Other agent |
| 6.3     | [ch6CentripetalForce](../contents/ch6CentripetalForce.md#L307)                                                           | C1–C10            |    10 | Other agent |
| 6.4     | [ch6FictitiousForcesAndNonInertialFrames](../contents/ch6FictitiousForcesAndNonInertialFrames.md#L142)                   | C1–C6             |     6 | Other agent |
| 6.5     | [ch6NewtonsUniversalLawOfGravitation](../contents/ch6NewtonsUniversalLawOfGravitation.md#L448)                           | C1–C4             |     4 | Other agent |
| 6.6     | [ch6SatellitesAndKeplersLaws](../contents/ch6SatellitesAndKeplersLaws.md#L393)                                           | C1                |     1 | Other agent |
| 7.1     | [ch7WorkTheScientificDefinition](../contents/ch7WorkTheScientificDefinition.md#L179)                                     | C1–C3             |     3 | Other agent |
| 7.2     | [ch7KineticEnergyAndTheWorkEnergyTheorem](../contents/ch7KineticEnergyAndTheWorkEnergyTheorem.md#L406)                   | C1–C3             |     3 | Other agent |
| 7.3     | [ch7GravitationalPotentialEnergy](../contents/ch7GravitationalPotentialEnergy.md#L319)                                   | C1, C2            |     2 | Other agent |
| 7.4     | [ch7ConservativeForcesAndPotentialEnergy](../contents/ch7ConservativeForcesAndPotentialEnergy.md#L312)                   | C1–C4             |     4 | Other agent |
| 7.6     | [ch7ConservationOfEnergy](../contents/ch7ConservationOfEnergy.md#L277)                                                   | C1–C5             |     5 | Other agent |
| 7.7     | [ch7Power](../contents/ch7Power.md#L253)                                                                                 | C1–C3             |     3 | Other agent |
| 7.8     | [ch7WorkEnergyAndPowerInHumans](../contents/ch7WorkEnergyAndPowerInHumans.md#L174)                                       | C1–C4             |     4 | Other agent |
| 7.9     | [ch7WorldEnergyUse](../contents/ch7WorldEnergyUse.md#L162)                                                               | C1, C2            |     2 | Other agent |
| 8.1     | [ch8LinearMomentumAndForce](../contents/ch8LinearMomentumAndForce.md#L275)                                               | C1–C4             |     4 | Other agent |
| 8.2     | [ch8Impulse](../contents/ch8Impulse.md#L231)                                                                             | C1–C3             |     3 | Other agent |
| 8.3     | [ch8ConservationOfMomentum](../contents/ch8ConservationOfMomentum.md#L268)                                               | C1–C7             |     7 | Other agent |
| 8.4     | [ch8ElasticCollisionsInOneDimension](../contents/ch8ElasticCollisionsInOneDimension.md#L223)                             | C1                |     1 | Other agent |
| 8.5     | [ch8InelasticCollisionsInOneDimension](../contents/ch8InelasticCollisionsInOneDimension.md#L302)                         | C1–C3             |     3 | Other agent |
| 8.6     | [ch8CollisionsOfPointMassesInTwoDimensions](../contents/ch8CollisionsOfPointMassesInTwoDimensions.md#L305)               | C1                |     1 | Other agent |
| 8.7     | [ch8IntroductionToRocketPropulsion](../contents/ch8IntroductionToRocketPropulsion.md#L238)                               | C1–C3             |     3 | Other agent |
| 10.1    | [ch10AngularAcceleration](../contents/ch10AngularAcceleration.md#L360)                                                   | C2–C5             |     4 | Unassigned  |
| 10.3    | [ch10DynamicsOfRotationalMotion](../contents/ch10DynamicsOfRotationalMotion.md#L341)                                     | C2–C5             |     4 | Unassigned  |
| 10.4    | [ch10RotationalKineticEnergy](../contents/ch10RotationalKineticEnergy.md#L565)                                           | C2–C4             |     3 | Unassigned  |
| 10.5    | [ch10AngularMomentumAndItsConservation](../contents/ch10AngularMomentumAndItsConservation.md#L516)                       | C2–C14            |    13 | Unassigned  |
| 10.6    | [ch10CollisionsOfExtendedBodiesInTwoDimensions](../contents/ch10CollisionsOfExtendedBodiesInTwoDimensions.md#L262)       | C2–C4             |     3 | Unassigned  |
| 10.7    | [ch10GyroscopicEffects](../contents/ch10GyroscopicEffects.md#L118)                                                       | C2, C3            |     2 | Unassigned  |
