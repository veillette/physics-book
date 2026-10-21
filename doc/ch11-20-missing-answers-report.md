# Missing answers completed: Chapters 11–20

Completed all **183** targets from A01 and the coverage ledger in `doc/ch11-20-answer-review.md`: **15 problems and 168 conceptual questions**, across **45 Markdown sources**. Work followed the requested chapter order: 18, 19, 15, 20, 14, 16, 12. The older review line links were resolved against the reviewed revision and matched to current question text before editing. Numbers below are the book’s local exercise numbers, excluding Check Your Understanding boxes.

Every new answer has **Strategy**, **Solution**, and **Discussion**, with a concluding answer sentence. All eight constructed problems have chosen givens, a worked example, and a reasonableness check. No Check Your Understanding answer was added. The gasoline-expansion and pool-heating legacy solutions were recognized as existing answers. Changes remain in the working tree; no branch, commit, or push was created.

| Chapter   | Problems answered | Conceptual questions answered |
| --------- | ----------------: | ----------------------------: |
| 18        |                 7 |                            32 |
| 19        |                 0 |                            23 |
| 15        |                 2 |                            37 |
| 20        |                 2 |                            32 |
| 14        |                 2 |                            26 |
| 16        |                 0 |                            18 |
| 12        |                 2 |                             0 |
| **Total** |            **15** |                       **168** |

## Premise corrections and material qualifications

These corrections appear in the answers; the question wording was retained.

| Exercise         | Correction or qualification                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 18.5 P2          | Figure 4 has no panels (a) and (b). Answered both the likely intended Figure 5 panels and the literal Figure 4 reference; the neutral pair has a dipole far field.                                 |
| 18.6 C1          | Zero exterior field requires the thin-membrane approximation with equal and opposite total charges. Exactly opposite densities on unequal finite spherical areas do not exactly cancel externally. |
| 18.7 C3          | The dimensionless small parameter is separation divided by lateral plate size, not separation divided by area.                                                                                     |
| 18.7 C4          | Positive lattice ions do not ordinarily leave solid metal; point discharge involves electrons and ions in the surrounding air.                                                                     |
| 18.7 C5, C7, C8  | Lightning protection depends on an appropriate shelter or grounded current path, rather than tires or an ungrounded pointed rod.                                                                   |
| 18.7 C11         | Used the already corrected relation between the two positive right-hand charges, equal to one another.                                                                                             |
| 18.7 C12         | Central equilibrium is not a stable three-dimensional electrostatic trap; restoring behavior can depend on direction and charge signs.                                                             |
| 19.3 C1, C2      | Distinguished a solid insulating sphere, conducting sphere or shell, and radially nonuniform but spherically symmetric charge.                                                                     |
| 19.4 C3          | Different-valued equipotentials cannot cross; branches of the same equipotential may meet at a zero-field saddle.                                                                                  |
| 19.5 C3          | Large dielectric constant and high dielectric strength are separate properties.                                                                                                                    |
| 19.5 C5          | Humidity does not universally lower clean-air-gap breakdown voltage. Distinguished wet-surface leakage from gas breakdown, with primary-source references.                                         |
| 19.6 C1          | Parallel-bank energy comparison assumes the same applied voltage; series connection can instead serve a voltage-rating requirement.                                                                |
| 15.1 C1          | The boiling kettle is an open system: constant boiling temperature does not imply constant total internal energy as steam escapes.                                                                 |
| 15.2 C1          | Indefinite ideal motion without useful work is different from indefinite work production without an energy source.                                                                                 |
| 15.2 C2          | Heating and expansion work can occur simultaneously; an isobaric process need not be a separate heat-then-work sequence.                                                                           |
| 15.2 C4          | Isothermal implies constant internal energy for a fixed ideal gas, not for arbitrary substances or phase changes.                                                                                  |
| 15.2 C5          | Rapid expansion cools an ideal gas when it does work with negligible heat input; ideal-gas free expansion is a counterexample to unconditional cooling.                                            |
| 15.4 C1          | A real drinking bird is not a reversible Carnot engine or perpetual-motion machine; continuing ambient heat and evaporation drive it.                                                              |
| 15.5 C4          | A lower store temperature does not alone prove lower total energy use; refrigeration and building cooling must be assessed together.                                                               |
| 15.6 C1          | The second law does not specify visible household deterioration, and the cottage is not isolated.                                                                                                  |
| 15.6 C7          | Adiabatic does not imply reversible or constant entropy; internal entropy production may be positive.                                                                                              |
| 15.6 C8          | Radiation exports entropy, but nuclear reactions, transport, and structural evolution also affect a real star’s total entropy.                                                                     |
| 15.6 C9, 15.7 C1 | Brick arrangements illustrate coarse-grained configurational entropy, not a full calculation of thermal entropy.                                                                                   |
| 20.1 C3          | Better conductivity does not alone determine drift speed: carrier density and mobility both matter.                                                                                                |
| 20.5 C2          | Simultaneous twice-per-cycle voltage, current, and power zeros assume a sinusoidal resistive load.                                                                                                 |
| 20.6 C3          | A real short circuit can present shock, burn, and fire hazards; only the ideal zero-resistance endpoints have zero voltage difference.                                                             |
| 20.6 C9          | Rejected testing power lines with the back of a hand. Explained the historical grip argument and cited equipment-based verification requirements.                                                  |
| 20.6 C11         | A peripheral IV does not automatically provide the direct cardiac path associated with microshock.                                                                                                 |
| 20.6 P10         | The chosen current target is an illustrative model assumption, not a universal safety threshold or insulation design certification.                                                                |
| 14.3 C6          | The stated temperature is not a strict climatic limit; water availability supports evaporation, while high humidity itself suppresses it.                                                          |
| 14.3 C10         | Condensation buffers cooling; the initial dew point is not an absolute temperature floor.                                                                                                          |
| 14.3 C11         | Identified oxygen-rich liquid and distinguished constituent partial pressures; noted that the supplied table does not list carbon dioxide.                                                         |
| 14.5 C1          | Ceramic near an element is not guaranteed safe to touch.                                                                                                                                           |
| 14.7 C5          | The illustrative no-greenhouse comparison assumes a comparable solar budget; an actual airless Earth would also have different albedo and heat transport.                                          |
| 14.7 P26         | A calculated brake temperature does not establish universal ignition behavior.                                                                                                                     |
| 16.3 C2          | Amplitude-dependent pendulum motion is nonlinear and only approximately simple harmonic at small amplitude.                                                                                        |

## Added figures

All five SVGs are generated by functions in `scripts/figures/answers11to20.js`, using the repository’s `Svg` tooling. Point-charge curves use exact superposed Coulomb fields and numerical tracing. Ran `node scripts/generate-figures.js concept_1`; existing figures regenerated by this filter remained unchanged. Each new Markdown alt text matches its SVG `desc` exactly. Rendered previews were inspected, including field-line arrow direction and line-count ratios.

| Exercise | Figure                                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 18.5 P1  | [concept_18_05_p01.svg](../resources/concept_18_05_p01.svg): radial fields, eight outgoing versus twenty-four incoming lines.                          |
| 18.5 P2  | [concept_18_05_p02.svg](../resources/concept_18_05_p02.svg): like-charge far fields and neutral dipole, covering both figure references.               |
| 18.5 P3  | [concept_18_05_p03.svg](../resources/concept_18_05_p03.svg): inward far field of the net negative charge.                                              |
| 18.5 P4  | [concept_18_05_p04.svg](../resources/concept_18_05_p04.svg): six connecting lines and twelve additional incoming lines for positive q and negative 3q. |
| 18.6 C1  | [concept_18_06_q01.svg](../resources/concept_18_06_q01.svg): membrane charge layers and inward field, with the thin-membrane assumption stated.        |

## Validation and remaining work

| Check                                                             | Result                                                                                                                                                                                                   |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node scripts/check-math.js`                                      | Pass: 282 content files; no errors or warnings.                                                                                                                                                          |
| `python3 -B check_math.py --range 11-20`                          | Pass: 86 files and 69 existing worked-example checks; no flags. This checker is not a complete verification of the new calculations.                                                                     |
| `python3 -B find_incomplete_solutions.py --range 11-20 --summary` | Zero absent problem solutions in every chapter. The 112 pre-existing supplied answers lacking recognized write-up labels remain outside this task.                                                       |
| Independent exercise audit                                        | All 183 targets contain all three answer parts with balanced containers. All 1,080 exercise wrappers across chapters 11–20, including 44 existing Check Your Understanding boxes, have nonempty answers. |
| Local MathJax compilation                                         | All 477 math expressions in the final answers compiled without a math error. Numerical examples were also recomputed during review.                                                                      |
| `npm run -s check:figures`                                        | Pass, including all five new references.                                                                                                                                                                 |
| `npm run -s check:accessibility`                                  | Pass.                                                                                                                                                                                                    |
| `npm run -s check:orphans`                                        | Pass; no orphan assets or images.                                                                                                                                                                        |
| `npx eslint scripts/figures/answers11to20.js`                     | Pass.                                                                                                                                                                                                    |
| `npx prettier --write` on changed Markdown and JS                 | Pass. Explicitly bypassed the content-wide Markdown ignore rule when formatting the edited sources; verified that formatting changed no double-dollar math expressions.                                  |

**Uncompleted requested items: none.**

## Exercise inventory

Each link targets the current exercise opening line in the formatted source. C denotes a Conceptual Question and P a Problem; numbering excludes Check Your Understanding boxes.

| Section | Book exercise | Source file:line                                                                                                                                     |
| ------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 18.1    | C1            | [contents/ch18StaticElectricityAndCharge.md:260](../contents/ch18StaticElectricityAndCharge.md#L260)                                                 |
| 18.1    | C2            | [contents/ch18StaticElectricityAndCharge.md:286](../contents/ch18StaticElectricityAndCharge.md#L286)                                                 |
| 18.2    | C1            | [contents/ch18ConductorsAndInsulators.md:177](../contents/ch18ConductorsAndInsulators.md#L177)                                                       |
| 18.2    | C2            | [contents/ch18ConductorsAndInsulators.md:203](../contents/ch18ConductorsAndInsulators.md#L203)                                                       |
| 18.2    | C3            | [contents/ch18ConductorsAndInsulators.md:229](../contents/ch18ConductorsAndInsulators.md#L229)                                                       |
| 18.2    | C4            | [contents/ch18ConductorsAndInsulators.md:255](../contents/ch18ConductorsAndInsulators.md#L255)                                                       |
| 18.2    | C5            | [contents/ch18ConductorsAndInsulators.md:281](../contents/ch18ConductorsAndInsulators.md#L281)                                                       |
| 18.2    | C6            | [contents/ch18ConductorsAndInsulators.md:307](../contents/ch18ConductorsAndInsulators.md#L307)                                                       |
| 18.3    | C1            | [contents/ch18CoulombsLaw.md:155](../contents/ch18CoulombsLaw.md#L155)                                                                               |
| 18.3    | C2            | [contents/ch18CoulombsLaw.md:184](../contents/ch18CoulombsLaw.md#L184)                                                                               |
| 18.3    | C3            | [contents/ch18CoulombsLaw.md:210](../contents/ch18CoulombsLaw.md#L210)                                                                               |
| 18.4    | C1            | [contents/ch18ElectricField.md:191](../contents/ch18ElectricField.md#L191)                                                                           |
| 18.4    | C2            | [contents/ch18ElectricField.md:218](../contents/ch18ElectricField.md#L218)                                                                           |
| 18.4    | P1            | [contents/ch18ElectricField.md:246](../contents/ch18ElectricField.md#L246)                                                                           |
| 18.4    | P3            | [contents/ch18ElectricField.md:307](../contents/ch18ElectricField.md#L307)                                                                           |
| 18.4    | P5            | [contents/ch18ElectricField.md:352](../contents/ch18ElectricField.md#L352)                                                                           |
| 18.5    | C1            | [contents/ch18ElectricFieldLines.md:202](../contents/ch18ElectricFieldLines.md#L202)                                                                 |
| 18.5    | C2            | [contents/ch18ElectricFieldLines.md:232](../contents/ch18ElectricFieldLines.md#L232)                                                                 |
| 18.5    | P1            | [contents/ch18ElectricFieldLines.md:263](../contents/ch18ElectricFieldLines.md#L263)                                                                 |
| 18.5    | P2            | [contents/ch18ElectricFieldLines.md:292](../contents/ch18ElectricFieldLines.md#L292)                                                                 |
| 18.5    | P3            | [contents/ch18ElectricFieldLines.md:320](../contents/ch18ElectricFieldLines.md#L320)                                                                 |
| 18.5    | P4            | [contents/ch18ElectricFieldLines.md:353](../contents/ch18ElectricFieldLines.md#L353)                                                                 |
| 18.6    | C1            | [contents/ch18ElectricForcesInBiology.md:99](../contents/ch18ElectricForcesInBiology.md#L99)                                                         |
| 18.7    | C1            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:189](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L189)         |
| 18.7    | C2            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:218](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L218)         |
| 18.7    | C3            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:244](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L244)         |
| 18.7    | C4            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:270](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L270)         |
| 18.7    | C5            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:296](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L296)         |
| 18.7    | C6            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:322](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L322)         |
| 18.7    | C7            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:348](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L348)         |
| 18.7    | C8            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:374](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L374)         |
| 18.7    | C9            | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:400](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L400)         |
| 18.7    | C10           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:429](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L429)         |
| 18.7    | C11           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:456](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L456)         |
| 18.7    | C12           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:486](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L486)         |
| 18.7    | C13           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:514](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L514)         |
| 18.7    | C14           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:541](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L541)         |
| 18.7    | C15           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:567](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L567)         |
| 18.7    | C16           | [contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:593](../contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L593)         |
| 19.1    | C1            | [contents/ch19ElectricPotentialEnergy.md:445](../contents/ch19ElectricPotentialEnergy.md#L445)                                                       |
| 19.1    | C2            | [contents/ch19ElectricPotentialEnergy.md:471](../contents/ch19ElectricPotentialEnergy.md#L471)                                                       |
| 19.1    | C3            | [contents/ch19ElectricPotentialEnergy.md:497](../contents/ch19ElectricPotentialEnergy.md#L497)                                                       |
| 19.1    | C4            | [contents/ch19ElectricPotentialEnergy.md:523](../contents/ch19ElectricPotentialEnergy.md#L523)                                                       |
| 19.1    | C5            | [contents/ch19ElectricPotentialEnergy.md:549](../contents/ch19ElectricPotentialEnergy.md#L549)                                                       |
| 19.2    | C1            | [contents/ch19ElectricPotentialInAUniformElectricField.md:284](../contents/ch19ElectricPotentialInAUniformElectricField.md#L284)                     |
| 19.2    | C2            | [contents/ch19ElectricPotentialInAUniformElectricField.md:310](../contents/ch19ElectricPotentialInAUniformElectricField.md#L310)                     |
| 19.2    | C3            | [contents/ch19ElectricPotentialInAUniformElectricField.md:336](../contents/ch19ElectricPotentialInAUniformElectricField.md#L336)                     |
| 19.3    | C1            | [contents/ch19ElectricPotentialDueToAPointCharge.md:154](../contents/ch19ElectricPotentialDueToAPointCharge.md#L154)                                 |
| 19.3    | C2            | [contents/ch19ElectricPotentialDueToAPointCharge.md:180](../contents/ch19ElectricPotentialDueToAPointCharge.md#L180)                                 |
| 19.4    | C1            | [contents/ch19EquipotentialLines.md:143](../contents/ch19EquipotentialLines.md#L143)                                                                 |
| 19.4    | C2            | [contents/ch19EquipotentialLines.md:169](../contents/ch19EquipotentialLines.md#L169)                                                                 |
| 19.4    | C3            | [contents/ch19EquipotentialLines.md:195](../contents/ch19EquipotentialLines.md#L195)                                                                 |
| 19.5    | C1            | [contents/ch19CapacitorsAndDielectrics.md:536](../contents/ch19CapacitorsAndDielectrics.md#L536)                                                     |
| 19.5    | C2            | [contents/ch19CapacitorsAndDielectrics.md:562](../contents/ch19CapacitorsAndDielectrics.md#L562)                                                     |
| 19.5    | C3            | [contents/ch19CapacitorsAndDielectrics.md:588](../contents/ch19CapacitorsAndDielectrics.md#L588)                                                     |
| 19.5    | C4            | [contents/ch19CapacitorsAndDielectrics.md:614](../contents/ch19CapacitorsAndDielectrics.md#L614)                                                     |
| 19.5    | C5            | [contents/ch19CapacitorsAndDielectrics.md:640](../contents/ch19CapacitorsAndDielectrics.md#L640)                                                     |
| 19.5    | C6            | [contents/ch19CapacitorsAndDielectrics.md:666](../contents/ch19CapacitorsAndDielectrics.md#L666)                                                     |
| 19.5    | C7            | [contents/ch19CapacitorsAndDielectrics.md:692](../contents/ch19CapacitorsAndDielectrics.md#L692)                                                     |
| 19.6    | C1            | [contents/ch19CapacitorsInSeriesAndInParallel.md:258](../contents/ch19CapacitorsInSeriesAndInParallel.md#L258)                                       |
| 19.7    | C1            | [contents/ch19EnergyStoredInCapacitors.md:124](../contents/ch19EnergyStoredInCapacitors.md#L124)                                                     |
| 19.7    | C2            | [contents/ch19EnergyStoredInCapacitors.md:150](../contents/ch19EnergyStoredInCapacitors.md#L150)                                                     |
| 15.1    | C1            | [contents/ch15TheFirstLawOfThermodynamics.md:331](../contents/ch15TheFirstLawOfThermodynamics.md#L331)                                               |
| 15.1    | C2            | [contents/ch15TheFirstLawOfThermodynamics.md:357](../contents/ch15TheFirstLawOfThermodynamics.md#L357)                                               |
| 15.1    | C3            | [contents/ch15TheFirstLawOfThermodynamics.md:384](../contents/ch15TheFirstLawOfThermodynamics.md#L384)                                               |
| 15.1    | C4            | [contents/ch15TheFirstLawOfThermodynamics.md:412](../contents/ch15TheFirstLawOfThermodynamics.md#L412)                                               |
| 15.1    | C5            | [contents/ch15TheFirstLawOfThermodynamics.md:438](../contents/ch15TheFirstLawOfThermodynamics.md#L438)                                               |
| 15.1    | C6            | [contents/ch15TheFirstLawOfThermodynamics.md:464](../contents/ch15TheFirstLawOfThermodynamics.md#L464)                                               |
| 15.1    | C7            | [contents/ch15TheFirstLawOfThermodynamics.md:490](../contents/ch15TheFirstLawOfThermodynamics.md#L490)                                               |
| 15.2    | C1            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:329](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L329)   |
| 15.2    | C2            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:355](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L355)   |
| 15.2    | C3            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:384](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L384)   |
| 15.2    | C4            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:410](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L410)   |
| 15.2    | C5            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:437](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L437)   |
| 15.2    | C6            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:463](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L463)   |
| 15.2    | C7            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:493](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L493)   |
| 15.2    | C8            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:519](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L519)   |
| 15.2    | P9            | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:971](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L971)   |
| 15.2    | P10           | [contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:1006](../contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L1006) |
| 15.3    | C1            | [contents/ch15IntroductionToTheSecondLawOfThermodynamics.md:333](../contents/ch15IntroductionToTheSecondLawOfThermodynamics.md#L333)                 |
| 15.3    | C2            | [contents/ch15IntroductionToTheSecondLawOfThermodynamics.md:359](../contents/ch15IntroductionToTheSecondLawOfThermodynamics.md#L359)                 |
| 15.3    | C3            | [contents/ch15IntroductionToTheSecondLawOfThermodynamics.md:385](../contents/ch15IntroductionToTheSecondLawOfThermodynamics.md#L385)                 |
| 15.3    | C4            | [contents/ch15IntroductionToTheSecondLawOfThermodynamics.md:411](../contents/ch15IntroductionToTheSecondLawOfThermodynamics.md#L411)                 |
| 15.4    | C1            | [contents/ch15CarnotsPerfectHeatEngine.md:174](../contents/ch15CarnotsPerfectHeatEngine.md#L174)                                                     |
| 15.4    | C2            | [contents/ch15CarnotsPerfectHeatEngine.md:200](../contents/ch15CarnotsPerfectHeatEngine.md#L200)                                                     |
| 15.4    | C3            | [contents/ch15CarnotsPerfectHeatEngine.md:226](../contents/ch15CarnotsPerfectHeatEngine.md#L226)                                                     |
| 15.5    | C1            | [contents/ch15ApplicationsOfThermodynamics.md:265](../contents/ch15ApplicationsOfThermodynamics.md#L265)                                             |
| 15.5    | C2            | [contents/ch15ApplicationsOfThermodynamics.md:291](../contents/ch15ApplicationsOfThermodynamics.md#L291)                                             |
| 15.5    | C3            | [contents/ch15ApplicationsOfThermodynamics.md:317](../contents/ch15ApplicationsOfThermodynamics.md#L317)                                             |
| 15.5    | C4            | [contents/ch15ApplicationsOfThermodynamics.md:345](../contents/ch15ApplicationsOfThermodynamics.md#L345)                                             |
| 15.5    | C5            | [contents/ch15ApplicationsOfThermodynamics.md:371](../contents/ch15ApplicationsOfThermodynamics.md#L371)                                             |
| 15.6    | C1            | [contents/ch15EntropyAndTheSecondLaw.md:496](../contents/ch15EntropyAndTheSecondLaw.md#L496)                                                         |
| 15.6    | C2            | [contents/ch15EntropyAndTheSecondLaw.md:522](../contents/ch15EntropyAndTheSecondLaw.md#L522)                                                         |
| 15.6    | C3            | [contents/ch15EntropyAndTheSecondLaw.md:548](../contents/ch15EntropyAndTheSecondLaw.md#L548)                                                         |
| 15.6    | C4            | [contents/ch15EntropyAndTheSecondLaw.md:574](../contents/ch15EntropyAndTheSecondLaw.md#L574)                                                         |
| 15.6    | C5            | [contents/ch15EntropyAndTheSecondLaw.md:600](../contents/ch15EntropyAndTheSecondLaw.md#L600)                                                         |
| 15.6    | C6            | [contents/ch15EntropyAndTheSecondLaw.md:626](../contents/ch15EntropyAndTheSecondLaw.md#L626)                                                         |
| 15.6    | C7            | [contents/ch15EntropyAndTheSecondLaw.md:652](../contents/ch15EntropyAndTheSecondLaw.md#L652)                                                         |
| 15.6    | C8            | [contents/ch15EntropyAndTheSecondLaw.md:678](../contents/ch15EntropyAndTheSecondLaw.md#L678)                                                         |
| 15.6    | C9            | [contents/ch15EntropyAndTheSecondLaw.md:704](../contents/ch15EntropyAndTheSecondLaw.md#L704)                                                         |
| 15.7    | C1            | [contents/ch15StatisticalInterpretationOfEntropy.md:387](../contents/ch15StatisticalInterpretationOfEntropy.md#L387)                                 |
| 20.1    | C1            | [contents/ch20Current.md:395](../contents/ch20Current.md#L395)                                                                                       |
| 20.1    | C2            | [contents/ch20Current.md:421](../contents/ch20Current.md#L421)                                                                                       |
| 20.1    | C3            | [contents/ch20Current.md:448](../contents/ch20Current.md#L448)                                                                                       |
| 20.1    | C4            | [contents/ch20Current.md:476](../contents/ch20Current.md#L476)                                                                                       |
| 20.1    | C5            | [contents/ch20Current.md:502](../contents/ch20Current.md#L502)                                                                                       |
| 20.1    | C6            | [contents/ch20Current.md:528](../contents/ch20Current.md#L528)                                                                                       |
| 20.2    | C1            | [contents/ch20OhmsLaw.md:190](../contents/ch20OhmsLaw.md#L190)                                                                                       |
| 20.2    | C2            | [contents/ch20OhmsLaw.md:217](../contents/ch20OhmsLaw.md#L217)                                                                                       |
| 20.3    | C1            | [contents/ch20ResistanceAndResistivity.md:477](../contents/ch20ResistanceAndResistivity.md#L477)                                                     |
| 20.3    | C2            | [contents/ch20ResistanceAndResistivity.md:503](../contents/ch20ResistanceAndResistivity.md#L503)                                                     |
| 20.3    | C3            | [contents/ch20ResistanceAndResistivity.md:532](../contents/ch20ResistanceAndResistivity.md#L532)                                                     |
| 20.3    | C4            | [contents/ch20ResistanceAndResistivity.md:562](../contents/ch20ResistanceAndResistivity.md#L562)                                                     |
| 20.4    | C1            | [contents/ch20ElectricPowerAndEnergy.md:284](../contents/ch20ElectricPowerAndEnergy.md#L284)                                                         |
| 20.4    | C2            | [contents/ch20ElectricPowerAndEnergy.md:310](../contents/ch20ElectricPowerAndEnergy.md#L310)                                                         |
| 20.4    | P32           | [contents/ch20ElectricPowerAndEnergy.md:1649](../contents/ch20ElectricPowerAndEnergy.md#L1649)                                                       |
| 20.5    | C1            | [contents/ch20AlternatingCurrentVersusDirectCurrent.md:317](../contents/ch20AlternatingCurrentVersusDirectCurrent.md#L317)                           |
| 20.5    | C2            | [contents/ch20AlternatingCurrentVersusDirectCurrent.md:343](../contents/ch20AlternatingCurrentVersusDirectCurrent.md#L343)                           |
| 20.5    | C3            | [contents/ch20AlternatingCurrentVersusDirectCurrent.md:369](../contents/ch20AlternatingCurrentVersusDirectCurrent.md#L369)                           |
| 20.6    | C1            | [contents/ch20ElectricHazardsAndTheHumanBody.md:243](../contents/ch20ElectricHazardsAndTheHumanBody.md#L243)                                         |
| 20.6    | C2            | [contents/ch20ElectricHazardsAndTheHumanBody.md:269](../contents/ch20ElectricHazardsAndTheHumanBody.md#L269)                                         |
| 20.6    | C3            | [contents/ch20ElectricHazardsAndTheHumanBody.md:295](../contents/ch20ElectricHazardsAndTheHumanBody.md#L295)                                         |
| 20.6    | C4            | [contents/ch20ElectricHazardsAndTheHumanBody.md:321](../contents/ch20ElectricHazardsAndTheHumanBody.md#L321)                                         |
| 20.6    | C5            | [contents/ch20ElectricHazardsAndTheHumanBody.md:347](../contents/ch20ElectricHazardsAndTheHumanBody.md#L347)                                         |
| 20.6    | C6            | [contents/ch20ElectricHazardsAndTheHumanBody.md:373](../contents/ch20ElectricHazardsAndTheHumanBody.md#L373)                                         |
| 20.6    | C7            | [contents/ch20ElectricHazardsAndTheHumanBody.md:399](../contents/ch20ElectricHazardsAndTheHumanBody.md#L399)                                         |
| 20.6    | C8            | [contents/ch20ElectricHazardsAndTheHumanBody.md:425](../contents/ch20ElectricHazardsAndTheHumanBody.md#L425)                                         |
| 20.6    | C9            | [contents/ch20ElectricHazardsAndTheHumanBody.md:451](../contents/ch20ElectricHazardsAndTheHumanBody.md#L451)                                         |
| 20.6    | C10           | [contents/ch20ElectricHazardsAndTheHumanBody.md:477](../contents/ch20ElectricHazardsAndTheHumanBody.md#L477)                                         |
| 20.6    | C11           | [contents/ch20ElectricHazardsAndTheHumanBody.md:503](../contents/ch20ElectricHazardsAndTheHumanBody.md#L503)                                         |
| 20.6    | C12           | [contents/ch20ElectricHazardsAndTheHumanBody.md:529](../contents/ch20ElectricHazardsAndTheHumanBody.md#L529)                                         |
| 20.6    | P10           | [contents/ch20ElectricHazardsAndTheHumanBody.md:953](../contents/ch20ElectricHazardsAndTheHumanBody.md#L953)                                         |
| 20.7    | C1            | [contents/ch20NerveConductionElectrocardiograms.md:246](../contents/ch20NerveConductionElectrocardiograms.md#L246)                                   |
| 20.7    | C2            | [contents/ch20NerveConductionElectrocardiograms.md:273](../contents/ch20NerveConductionElectrocardiograms.md#L273)                                   |
| 20.7    | C3            | [contents/ch20NerveConductionElectrocardiograms.md:299](../contents/ch20NerveConductionElectrocardiograms.md#L299)                                   |
| 14.1    | C1            | [contents/ch14Heat.md:121](../contents/ch14Heat.md#L121)                                                                                             |
| 14.1    | C2            | [contents/ch14Heat.md:147](../contents/ch14Heat.md#L147)                                                                                             |
| 14.1    | C3            | [contents/ch14Heat.md:173](../contents/ch14Heat.md#L173)                                                                                             |
| 14.2    | C1            | [contents/ch14TemperatureChangeAndHeatCapacity.md:451](../contents/ch14TemperatureChangeAndHeatCapacity.md#L451)                                     |
| 14.2    | C2            | [contents/ch14TemperatureChangeAndHeatCapacity.md:477](../contents/ch14TemperatureChangeAndHeatCapacity.md#L477)                                     |
| 14.3    | C1            | [contents/ch14PhaseChangeAndLatentHeat.md:474](../contents/ch14PhaseChangeAndLatentHeat.md#L474)                                                     |
| 14.3    | C2            | [contents/ch14PhaseChangeAndLatentHeat.md:500](../contents/ch14PhaseChangeAndLatentHeat.md#L500)                                                     |
| 14.3    | C3            | [contents/ch14PhaseChangeAndLatentHeat.md:527](../contents/ch14PhaseChangeAndLatentHeat.md#L527)                                                     |
| 14.3    | C4            | [contents/ch14PhaseChangeAndLatentHeat.md:553](../contents/ch14PhaseChangeAndLatentHeat.md#L553)                                                     |
| 14.3    | C5            | [contents/ch14PhaseChangeAndLatentHeat.md:581](../contents/ch14PhaseChangeAndLatentHeat.md#L581)                                                     |
| 14.3    | C6            | [contents/ch14PhaseChangeAndLatentHeat.md:607](../contents/ch14PhaseChangeAndLatentHeat.md#L607)                                                     |
| 14.3    | C7            | [contents/ch14PhaseChangeAndLatentHeat.md:634](../contents/ch14PhaseChangeAndLatentHeat.md#L634)                                                     |
| 14.3    | C8            | [contents/ch14PhaseChangeAndLatentHeat.md:660](../contents/ch14PhaseChangeAndLatentHeat.md#L660)                                                     |
| 14.3    | C9            | [contents/ch14PhaseChangeAndLatentHeat.md:686](../contents/ch14PhaseChangeAndLatentHeat.md#L686)                                                     |
| 14.3    | C10           | [contents/ch14PhaseChangeAndLatentHeat.md:712](../contents/ch14PhaseChangeAndLatentHeat.md#L712)                                                     |
| 14.3    | C11           | [contents/ch14PhaseChangeAndLatentHeat.md:738](../contents/ch14PhaseChangeAndLatentHeat.md#L738)                                                     |
| 14.4    | C1            | [contents/ch14HeatTransferMethods.md:77](../contents/ch14HeatTransferMethods.md#L77)                                                                 |
| 14.5    | C1            | [contents/ch14Conduction.md:334](../contents/ch14Conduction.md#L334)                                                                                 |
| 14.5    | C2            | [contents/ch14Conduction.md:360](../contents/ch14Conduction.md#L360)                                                                                 |
| 14.6    | C1            | [contents/ch14Convection.md:405](../contents/ch14Convection.md#L405)                                                                                 |
| 14.6    | C2            | [contents/ch14Convection.md:431](../contents/ch14Convection.md#L431)                                                                                 |
| 14.7    | C1            | [contents/ch14Radiation.md:331](../contents/ch14Radiation.md#L331)                                                                                   |
| 14.7    | C2            | [contents/ch14Radiation.md:357](../contents/ch14Radiation.md#L357)                                                                                   |
| 14.7    | C3            | [contents/ch14Radiation.md:383](../contents/ch14Radiation.md#L383)                                                                                   |
| 14.7    | C4            | [contents/ch14Radiation.md:409](../contents/ch14Radiation.md#L409)                                                                                   |
| 14.7    | C5            | [contents/ch14Radiation.md:435](../contents/ch14Radiation.md#L435)                                                                                   |
| 14.7    | P26           | [contents/ch14Radiation.md:1799](../contents/ch14Radiation.md#L1799)                                                                                 |
| 14.7    | P27           | [contents/ch14Radiation.md:1843](../contents/ch14Radiation.md#L1843)                                                                                 |
| 16.1    | C1            | [contents/ch16HookesLaw.md:264](../contents/ch16HookesLaw.md#L264)                                                                                   |
| 16.3    | C1            | [contents/ch16SimpleHarmonicMotion.md:269](../contents/ch16SimpleHarmonicMotion.md#L269)                                                             |
| 16.3    | C2            | [contents/ch16SimpleHarmonicMotion.md:295](../contents/ch16SimpleHarmonicMotion.md#L295)                                                             |
| 16.3    | C3            | [contents/ch16SimpleHarmonicMotion.md:324](../contents/ch16SimpleHarmonicMotion.md#L324)                                                             |
| 16.3    | C4            | [contents/ch16SimpleHarmonicMotion.md:350](../contents/ch16SimpleHarmonicMotion.md#L350)                                                             |
| 16.3    | C5            | [contents/ch16SimpleHarmonicMotion.md:376](../contents/ch16SimpleHarmonicMotion.md#L376)                                                             |
| 16.3    | C6            | [contents/ch16SimpleHarmonicMotion.md:402](../contents/ch16SimpleHarmonicMotion.md#L402)                                                             |
| 16.4    | C1            | [contents/ch16TheSimplePendulum.md:218](../contents/ch16TheSimplePendulum.md#L218)                                                                   |
| 16.5    | C1            | [contents/ch16EnergyAndTheSimpleHarmonicOscillator.md:239](../contents/ch16EnergyAndTheSimpleHarmonicOscillator.md#L239)                             |
| 16.7    | C1            | [contents/ch16DampedHarmonicOscillator.md:251](../contents/ch16DampedHarmonicOscillator.md#L251)                                                     |
| 16.7    | C2            | [contents/ch16DampedHarmonicOscillator.md:277](../contents/ch16DampedHarmonicOscillator.md#L277)                                                     |
| 16.7    | C3            | [contents/ch16DampedHarmonicOscillator.md:307](../contents/ch16DampedHarmonicOscillator.md#L307)                                                     |
| 16.8    | C1            | [contents/ch16ForcedOscillationsAndResonance.md:130](../contents/ch16ForcedOscillationsAndResonance.md#L130)                                         |
| 16.9    | C1            | [contents/ch16Waves.md:208](../contents/ch16Waves.md#L208)                                                                                           |
| 16.9    | C2            | [contents/ch16Waves.md:234](../contents/ch16Waves.md#L234)                                                                                           |
| 16.10   | C1            | [contents/ch16SuperpositionAndResonance.md:307](../contents/ch16SuperpositionAndResonance.md#L307)                                                   |
| 16.11   | C1            | [contents/ch16EnergyInWaves.md:247](../contents/ch16EnergyInWaves.md#L247)                                                                           |
| 16.11   | C2            | [contents/ch16EnergyInWaves.md:273](../contents/ch16EnergyInWaves.md#L273)                                                                           |
| 12.4    | P21           | [contents/ch12ViscosityAndLaminarFlow.md:1588](../contents/ch12ViscosityAndLaminarFlow.md#L1588)                                                     |
| 12.4    | P22           | [contents/ch12ViscosityAndLaminarFlow.md:1626](../contents/ch12ViscosityAndLaminarFlow.md#L1626)                                                     |

## Corrections after review

- **18.5 P3:** the first draft read Figure 7 with the signs reversed. The arrowheads point away from the small red charge, so it is the positive charge, with twice the magnitude of the negative sphere; the far field points outward (net +Q). The answer and `concept_18_05_p03` were corrected.
- **18.5 P2:** the question's reference to "Figure 4 (a) and (b)" was changed to Figure 5, which has those panels; the answer no longer needs to hedge between the two figures.
