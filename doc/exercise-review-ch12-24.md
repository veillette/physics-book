# Correctness review: exercises and problems, Chapters 12–24

Date: 2026-10-18. Source revision: `01ac650390ef32414f5a595c90d268ba846e22bf`. **Review findings only; textbook files have not been corrected by this review.** This continues [the Chapter 1–10 exercise review](https://github.com/veillette/physics-book/blob/dfbf8a973992a56a4922c51763d218298fbda7c3/doc/exercise-review-ch01-10.md) with the same conventions.

## Scope and method

Screened the question statements and available answer text across all **113 chapter/section files** in Chapters 12–24 of `SUMMARY.md`, including conceptual questions and check-your-understanding questions. The inventory contains **1,410 question blocks**: 996 explicitly tagged problems/exercises, plus 4 more tagged with the misspelled type `problem-exercises`; 358 tagged conceptual questions; 49 checks for understanding; and 3 untyped blocks. Multi-part questions count as one block. Ordinals below are local to each section and question category; they are not book-wide exercise numbers. Line links point to the `::: problem` fence of the question.

The review checked the mathematical model, required assumptions, units, signs, directions, supplied data, physical conclusions, and consistency between statements and solutions. Each suspected numerical error was recalculated independently. Every direction finding was checked against the referenced figure image itself, not its alt text. Any circuit or wire-array result was recomputed from the values printed in the figure. The review also ran the repository's `check_math.py --range 12-24`. It flagged three items, which appear below as E28. Routine rounding differences and the usual stated introductory idealizations were not counted as substantive errors.

This is a substantive screening with targeted verification. **It does not claim that every intermediate step in all 1,410 blocks was re-derived.** An exercise that is not listed is not certified error-free. External facts were checked only where a finding depends on them. Numerical inputs in hypothetical questions were otherwise accepted as given.

## Result

The review found **73 substantive findings: 7 P1 and 66 P2**. Some findings cover several related exercises.

- **P1:** a materially incorrect physical rule or model, or a large error that undermines the exercise.
- **P2:** an incorrect result, inconsistent data or direction, a missing premise needed for a unique answer, or a necessary qualification.

Presentation and rounding items are listed separately at the end.

| Chapter | Question blocks | Substantive findings |
| ------- | --------------: | -------------------: |
| 12      |              99 |                    6 |
| 13      |             103 |                    8 |
| 14      |             114 |                    6 |
| 15      |             101 |                   10 |
| 16      |             106 |                    6 |
| 17      |             109 |                    6 |
| 18      |             101 |                    4 |
| 19      |              93 |                    2 |
| 20      |             128 |                    6 |
| 21      |             123 |                    3 |
| 22      |             123 |                   10 |
| 23      |             136 |                    4 |
| 24      |              74 |                    2 |

Three recurring patterns account for many of the findings:

1. **Forcing to the answer key.** A solution computes a correct value, then writes "≈" an answer-key value that does not follow (E01, E08, E31, E40, E59, E64, E67). In each case, fix the data or the key; do not keep both numbers.
2. **Wrong right-hand-rule or Lenz's-law directions.** These occur in chapters 22–23 (E58, E60, E61, E63, E65, E68, E69). Several of these answers are simply the opposite-charge answers.
3. **Giving up on figure data.** A solution says a numerical answer is impossible "without values from the figure", although the figure prints every value (E57, E62, E64).

Prioritize these:

- the seven P1 items;
- the Kirchhoff and wire-array non-answers;
- the Lenz's-law reversals;
- the lightning-induction arithmetic (E70);
- the entropy arithmetic in Chapter 15.

Correct the related discussions along with the final numbers. Several discussions explain away the incorrect results.

## Chapter 12

### E01 · P1 · The oil-gusher solution replaces its own pressure with an answer-key value

[ch12ViscosityAndLaminarFlow.md:1520](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12ViscosityAndLaminarFlow.md#L1520) (problem 19)

The solution computes the viscous pressure drop as 3.53 × 10⁶ Pa. It then writes "(2.95 − 0.44) × 10⁶ Pa" and adds a note that "the actual value that gives the correct answer is 2.51 × 10⁶ Pa." The oil's kinetic energy is the same at entrance and exit. With the stated data, the required gauge pressure is therefore ρgh + 8ηLQ/(πr⁴) = 4.41 × 10⁵ + 3.54 × 10⁶ ≈ **3.98 × 10⁶ Pa**.

Report that value and delete the reverse-engineered note. If 2.95 MPa is the intended answer, change the problem data instead.

### E02 · P1 · A helium balloon in a braking car moves toward the back

[ch12MotionOfAnObjectInAViscousFluid.md:146](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12MotionOfAnObjectInAViscousFluid.md#L146) (conceptual question 1)

The answer says the balloon moves toward the front. While the car slows, the air inside it surges forward. This sets up a higher pressure at the front of the cabin. The buoyant balloon is pushed down that pressure gradient, toward the **back**, which is opposite to how loose dense objects move.

The solution reaches this conclusion itself ("but wait, that would be toward the back") and then argues it away. Replace the answer and remove the self-contradicting paragraph.

### E03 · P2 · The left ventricle supplies most of the heart's mechanical power

[ch12TheMostGeneralApplicationsOfBernouillisEquation.md:432](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12TheMostGeneralApplicationsOfBernouillisEquation.md#L432) (problem 3)

The 1.26 W result is fine. The discussion, however, calls it "about 1/5 of total heart power." The right ventricle moves the same flow at roughly one-sixth of the pressure. The left ventricle therefore supplies about **5/6** of the mechanical output.

### E04 · P2 · The turbulence discussion repeats an impossible 35 m/s aortic critical speed

[ch12OnsetOfTurbulence.md:553](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12OnsetOfTurbulence.md#L553) (problem 7)

The discussion cites "the critical velocity of 35 m/s mentioned in the text for the aorta." The section's own aorta problem gives a critical speed of **0.244 m/s** at N_R = 3000. Peak aortic speeds are of order 1 m/s.

The source sentence is in the main text at [line 54](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12OnsetOfTurbulence.md#L54), outside the question sets. It probably intends 35 cm/s. Correct both places.

### E05 · P2 · Part (b) of the molecular-transport problem cannot be answered

[ch12MolecularTransportPhenomena.md:473](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12MolecularTransportPhenomena.md#L473) (problem 4)

The problem supplies no oxygen concentration or flux. The solution concedes that part (b) cannot be answered. Supply the missing concentration, or remove part (b).

### E06 · P2 · 5 km/s does not exceed escape velocity

[ch12FlowRateAndItsRelationsToVelocity.md:1003](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12FlowRateAndItsRelationsToVelocity.md#L1003) (problem 16)

The unreasonable-results discussion says the computed 5 km/s stream "exceeds Earth's escape velocity of 11.2 km/s by nearly half." 5 km/s is less than half of 11.2 km/s. The claim that the water would vaporize from friction is also unsupported.

The result is unreasonable because the speed is supersonic and the required pressure is absurd. Say that instead.

## Chapter 13

### E07 · P1 · Ocean thermal expansion uses the unconfined linear coefficient

[ch13ThermalExpansionOfSolidsAndLiquids.md:960](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13ThermalExpansionOfSolidsAndLiquids.md#L960) (problem 6)

The solution uses ΔL = (β/3)LΔT and obtains 7 cm. Ocean water is laterally confined, so all of its volume expansion goes into height: Δh = βhΔT ≈ **0.21 m**. The discussion's whole-ocean figure of 26 cm scales the same error. The consistent value is about **78 cm**.

### E08 · P2 · Three thermal-expansion answers are forced toward answer-key values

- [ch13ThermalExpansionOfSolidsAndLiquids.md:783](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13ThermalExpansionOfSolidsAndLiquids.md#L783) (problem 1)
- [ch13ThermalExpansionOfSolidsAndLiquids.md:1059](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13ThermalExpansionOfSolidsAndLiquids.md#L1059) (problem 9)
- [ch13ThermalExpansionOfSolidsAndLiquids.md:1162](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13ThermalExpansionOfSolidsAndLiquids.md#L1162) (problem 11)

In each problem, the solution's computed value is replaced by an answer-key value:

| Problem                    | Computed                | Written as   | Report       |
| -------------------------- | ----------------------- | ------------ | ------------ |
| Washington Monument height | 170 − 0.053 = 169.947 m | "≈ 169.98 m" | **169.95 m** |
| Beaker overflow            | 9.12 mL                 | "≈ 9.35 mL"  | **9.12 mL**  |
| Beaker difference          | 9.12 − 1.56 = 7.56 mL   | 7.79 mL      | **7.56 mL**  |
| Coffee level change        | 0.955 mm                | "≈ 0.832 mm" | **0.955 mm** |

The monument discussion also asserts expansion joints that the problem does not support.

### E09 · P2 · The mercury-column strategy misstates when β/3 applies

[ch13ThermalExpansionOfSolidsAndLiquids.md:849](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13ThermalExpansionOfSolidsAndLiquids.md#L849) (problem 3)

The strategy says β/3 applies "for a column with constant cross-section." That is the confined case, where ΔL = βLΔT. The discussion then links the result to thermometers, which are also confined. State plainly which assumption the answer uses, and keep it through the discussion.

### E10 · P2 · The CO₂ "flame" speed implies 2 × 10⁷ K

[ch13KineticTheory.md:688](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13KineticTheory.md#L688) (problem 7)

An rms speed of 1.05 × 10⁵ m/s gives T = 1.95 × 10⁷ K, which no flame reaches. The solution speculates about nuclear explosions. The data almost certainly intend **1.05 × 10³ m/s**, which gives about **1950 K**, a real flame temperature. Correct the speed, or label the problem as an unreasonable-results exercise.

### E11 · P2 · The UF₆ temperature in part (b) is 768 K, not 672 K

[ch13KineticTheory.md:786](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13KineticTheory.md#L786) (problem 10)

The solution rounds an intermediate 1/√m difference from 5.6 to 6 before solving for temperature. Carrying the digits gives **768 K** (about 495 °C), not 672 K.

### E12 · P2 · The gas-versus-vapor criterion is wrong

[ch13PhaseChanges.md:569](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13PhaseChanges.md#L569) (conceptual question 6)

The answer says a substance above its boiling point is a gas that "cannot be liquefied merely by increasing pressure." The criterion is the **critical temperature**: below it, compression alone can liquefy the substance. The answer also contradicts the section's CO₂-at-20 °C answer.

### E13 · P2 · The breath water-loss product is off by a factor of two

[ch13HumidityEvaporationAndBoiling.md:821](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13HumidityEvaporationAndBoiling.md#L821) (problem 11)

The discussion multiplies 20,000 breaths by 0.088 g and reports 880 g. The product is **1760 g**.

### E14 · P2 · The Everest drying explanation contradicts the section

[ch13HumidityEvaporationAndBoiling.md:938](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13HumidityEvaporationAndBoiling.md#L938) (problem 14)

Part (c) says low total pressure limits water vapor "even at 100% relative humidity." Saturation vapor density depends only on temperature, as the section's own [conceptual question 1](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13HumidityEvaporationAndBoiling.md#L450) states. Climbers dry out because the air is cold and they breathe a lot of it.

## Chapter 14

### E15 · P2 · The storm's latent heat equals 17 kilotons of TNT

[ch14PhaseChangeAndLatentHeat.md:1108](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14PhaseChangeAndLatentHeat.md#L1108) (problem 11)

The discussion converts 7.08 × 10¹³ J to "about 17 tons of TNT." At 4.2 × 10⁹ J per ton, that is 1.7 × 10⁴ tons, or **17 kilotons**.

### E16 · P2 · The firewalker conduction calculation is off by a factor of ten

[ch14Conduction.md:651](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Conduction.md#L651) (problem 6)

The product (0.08)(0.00250)(663) is 0.1326, not 1.326. The corrected values are **Q = 44.2 J** and a skin temperature rise of **1.68 °C**, not 442 J and 16.8 °C. The part (c) discussion builds on the inflated temperature and should be revised with it.

### E17 · P2 · The payback period uses the wrong time unit

[ch14Conduction.md:1316](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Conduction.md#L1316) (problem 14)

The ratio $600/$2270 = 0.264 is a fraction of one **120-day heating season**, about **32 days**. The solution converts it to "0.264 years = 3.2 months."

### E18 · P2 · Three air-heating solutions use c_v where c_p applies

- [ch14Convection.md:879](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Convection.md#L879) (problem 9)
- [ch14Radiation.md:1252](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L1252) (problem 15)
- [ch14Radiation.md:1627](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L1627) (problem 21)

All three heat open-air flows at constant pressure but use c_v = 721 J/kg·°C. They should use c_p ≈ 1000 J/kg·°C, as the section's own classroom problem does:

| Problem                | Current result  | With c_p                          |
| ---------------------- | --------------- | --------------------------------- |
| Breathing, part (c)    | 9.49 W          | about **13 W** (total about 42 W) |
| Cooling-tower air flow | 3.44 × 10⁵ m³/s | about **2.5 × 10⁵ m³/s**          |
| Hot air, part (b)      | 2.79 × 10⁴ J    | about **3.9 × 10⁴ J**             |

### E19 · P2 · Cool roofs have high emissivity

[ch14Radiation.md:384](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L384) (problem 1)

The discussion says cool roofs "have low emissivity." Cool roofs combine high solar reflectance with **high** thermal emittance, so that they shed heat. The same solution also reports 21.8 kW and then "−21.7 kW."

### E20 · P2 · 200 hp is about 149 kW

[ch14Radiation.md:564](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L564) (problem 4)

The problem statement reads "200 hp (1.5 kW)." The solution silently uses 150 kW. Correct the statement to **149 kW**, or about 150 kW.

## Chapter 15

### E21 · P2 · The yogurt's energy would climb about 170 flights, not 15–20

[ch15TheFirstLawOfThermodynamics.md:866](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15TheFirstLawOfThermodynamics.md#L866) (problem 8)

150 W for 1960 s is 2.94 × 10⁵ J. That raises a 60-kg person about 500 m, which is roughly **170 flights** of 3 m.

### E22 · P2 · The balloon discussion misquotes the tire problem

[ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:472](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L472) (problem 2)

The comparison cites the car tire as "6,770 J" at "about 1.2 atm gauge." The preceding problem gives **2.09 × 10⁴ J** at **2.17 atm gauge**.

### E23 · P2 · The triangular path ABDA encloses 2.4 kJ

[ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md:708](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L708) (problem 6)

The vertices are A(1 L, 2.6 MPa), B(4 L, 2.0 MPa), and D(1 L, 1.0 MPa). The enclosed area is ½ × 1.6 × 10⁶ Pa × 3 × 10⁻³ m³ = **2.4 kJ**, not 1.5 kJ. The "exactly one-third" and "half the base" remarks follow from the wrong height.

The companion [problem 5](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15TheFirstLawOfThermodynamicsAndSomeSimpleProcesses.md#L654) reaches the correct 4.5 kJ. Its derivation, however, mislabels the figure as a parallelogram and mixes 1.4 and 1.5 MPa heights.

### E24 · P2 · The reactor-efficiency ratio uses an invented Example 1 value

[ch15CarnotsPerfectHeatEngine.md:255](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15CarnotsPerfectHeatEngine.md#L255) (problem 2)

Part (b) assumes Example 1 shows about 41.5%. Example 1 gives **47.6%**, so the ratio is 69.2/47.6 = **1.45**, not 1.67.

### E25 · P2 · The locomotive discussion contradicts its premise

[ch15CarnotsPerfectHeatEngine.md:329](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15CarnotsPerfectHeatEngine.md#L329) (problem 4)

The problem states an actual efficiency of 17%. The discussion argues that a 100 °C exhaust explains why the actual efficiency "was far below 17%," and that real locomotives reached only 5–10%. A cooler exhaust would _raise_ the Carnot limit, and the 17% is the given actual value.

### E26 · P2 · "Improvement of 3.32%" is ambiguous

[ch15IntroductionToTheSecondLawOfThermodynamics.md:622](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15IntroductionToTheSecondLawOfThermodynamics.md#L622) (problem 7)

The solution reads 3.32% as percentage points, giving 8.30 × 10¹² J. A relative improvement gives 2.99 × 10¹² J. Say which one is meant.

### E27 · P2 · The Sun-entropy arithmetic is internally inconsistent

[ch15EntropyAndTheSecondLaw.md:724](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15EntropyAndTheSecondLaw.md#L724) (problem 5)

The solution writes 1.09 × 10³¹ − 0.0568 × 10³¹. The second term is 5.68 × 10²⁷ J/K, which is 0.000568 × 10³¹. The result is **ΔS = 1.09 × 10³¹ J/K**, not 1.03 × 10³¹ or 1.04 × 10³¹. The solution also gives two different values for the unavailable energy (3.12 × 10³¹ J and 3.28 × 10³¹ J). Keep the one that follows from the corrected ΔS.

### E28 · P2 · Three entropy-change answers carry arithmetic errors

| Problem                                                                                                                                                           | Reported                     | Correct                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------- |
| [Water mixing, problem 6](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15EntropyAndTheSecondLaw.md#L829)    | 5 J/K and 1465 J             | **4.57 J/K** and **1.34 kJ**                                        |
| [Liquid nitrogen, problem 8](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15EntropyAndTheSecondLaw.md#L891) | 1340 J/K                     | **1390 J/K** (total about **3.99 × 10³ J/K**)                       |
| [Mixing, problem 10](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15EntropyAndTheSecondLaw.md#L1047)        | 1250 J/K; 3.54 × 10⁵ J (48%) | **1.29 × 10³ J/K**; **3.66 × 10⁵ J** (about 50% of the Carnot work) |

- **Water mixing.** −136 + 141 subtracts two nearly equal rounded numbers. Carrying the digits gives the corrected values.
- **Liquid nitrogen.** 1040 ln(293/77) is 1390 J/K.
- **Mixing.** ΔS_h = −9775 J/K and ΔS_c = +11,070 J/K.

`check_math.py` flags the nitrogen and mixing logarithms.

### E29 · P2 · The betting-odds argument compares the wrong outcomes

[ch15StatisticalInterpretationOfEntropy.md:564](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15StatisticalInterpretationOfEntropy.md#L564) (problem 5)

Part (c) says odds of 252 to 45 let you break even. But 252:45 compares the 2H8T outcome with 5H5T only. Fair odds against 2H8T are **979:45**, so 252:45 is a losing bet. The conclusion is right but the reasoning is not.

### E30 · P2 · The air-conditioner discussion misstates the second law

[ch15StatisticalInterpretationOfEntropy.md:738](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15StatisticalInterpretationOfEntropy.md#L738) (problem 8)

The discussion says the "electrical energy input is greater than heat removed due to the second law." Refrigerators routinely remove more heat than the work they consume.

It also says "perhaps 12.6 MJ (assuming COP around 3)." A COP of 3 gives 4.2 MJ, and the assumed 3.5 kW unit implies a COP near 1.

## Chapter 16

### E31 · P2 · The climbing-rope answers contradict the solution's own model

[ch16EnergyAndTheSimpleHarmonicOscillator.md:252](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16EnergyAndTheSimpleHarmonicOscillator.md#L252) (problem 1)

The solution solves mg(h + x) = ½kx² and gets x = 0.569 m. It then writes "≈ 0.502 m," the answer-key value from ½kx² = mgh, which ignores the extra drop. Part (c) does the same thing (0.847 m "≈ 0.710 m"). Choose one model and report its numbers.

### E32 · P2 · The friction oscillator stops after one half-swing

[ch16ForcedOscillationsAndResonance.md:295](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16ForcedOscillationsAndResonance.md#L295) (problem 4)

The energy method assumes the block stops at x = 0. With Coulomb friction, the equilibrium shifts by μ_k mg/k = 4.17 mm. The block makes **one half-swing** to x = −1.47 mm and stops there, because the spring force of 0.22 N is less than the 0.735 N static-friction limit. The total distance is **11.3 mm**. "Slightly more than one complete oscillation" is wrong.

### E33 · P2 · The Tacoma Narrows collapse was flutter, not forced resonance

[ch16ForcedOscillationsAndResonance.md:365](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16ForcedOscillationsAndResonance.md#L365) (problem 5)

The discussion cites the bridge as resonance driven by periodic forcing. The collapse was aeroelastic flutter, a self-excited instability. Use another example, or describe the bridge correctly.

### E34 · P2 · The piano-tuning beat logic is reversed

[ch16SuperpositionAndResonance.md:358](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16SuperpositionAndResonance.md#L358) (problem 2)

The discussion says that if the beats speed up when the string is tightened, the string is below the target frequency (258.50 Hz). Tightening raises the frequency. Faster beats therefore mean the string was already **above** the target, at 261.50 Hz.

### E35 · P2 · A 0.5 Hz beat is one beat every 2 s

[ch16SuperpositionAndResonance.md:466](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16SuperpositionAndResonance.md#L466) (problem 4)

The discussion says the intensity fluctuates "twice per second (two complete beats per second)." A 0.5 Hz beat is one beat every two seconds. The "4100 Hz upper range of hearing" remark is also wrong.

### E36 · P2 · 2.00 × 10⁻⁵ W/m² is 73 dB

[ch16EnergyInWaves.md:646](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16EnergyInWaves.md#L646) (problem 8)

The discussion calls the microphone intensity "about 43 dB." 10 log(2.00 × 10⁻⁵/10⁻¹²) = **73 dB**.

## Chapter 17

### E37 · P2 · The pressure-amplitude intensity mixes two air densities

[ch17SoundIntensityAndSoundLevel.md:547](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundIntensityAndSoundLevel.md#L547) (problem 3)

The arithmetic computes 0.25/885.14 = 2.82 × 10⁻⁴ W/m², using ρ = 1.29 kg/m³. It then states 3.04 × 10⁻⁴ W/m², which is the value for ρ = 1.20 kg/m³. Use ρ = 1.20 kg/m³ (20 °C air) consistently, and fix the arithmetic line.

### E38 · P2 · The helium-voice frequency mixes two scaling factors

[ch17SoundInterferenceAndResonance.md:1311](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundInterferenceAndResonance.md#L1311) (problem 15)

The solution writes "368 Hz ≈ 367 Hz." In part (b) it then computes 2.96 × 353 = 1089 Hz before switching to "2.96 × 367 = 1086 ≈ 1.07 kHz."

There are two consistent options:

- The solution's own factor of 2.96 gives **1.09 kHz**.
- The answer key's 1.07 kHz follows from helium's sound speed scaled to 37 °C.

Pick one model and use it throughout.

### E39 · P2 · Only harmonics 1–209 of the 1.80-m open tube are audible

[ch17SoundInterferenceAndResonance.md:1494](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundInterferenceAndResonance.md#L1494) (problem 17)

The 210th harmonic is 20,013 Hz, which is above 20 kHz. The audible harmonics are n = 1 to **209**. The solution rounds "209.9 ≈ 210" in the wrong direction, so its claim that the open and closed tubes have equal counts fails.

### E40 · P2 · Two hearing-curve answers are forced to the key

- [ch17Hearing.md:869](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17Hearing.md#L869) (problem 13)
- [ch17Hearing.md:1017](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17Hearing.md#L1017) (problem 15)

Problem 13 reads 20 dB as 1 × 10⁻¹⁰ W/m², then "rounds to one significant figure" as 2 × 10⁻¹⁰. Problem 15 computes 10^0.5 = 3.16, then "rounds to two significant figures" as 2.5.

Neither is a rounding. Either re-read the graph to support the key's values, or report the solution's own **1 × 10⁻¹⁰ W/m²** and **3.2**.

### E41 · P2 · A 50-dB loss is the hearing-aid range, not cochlear-implant candidacy

[ch17Hearing.md:762](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17Hearing.md#L762) (problem 11)

The discussion says the moderate loss "would likely qualify for cochlear implant consideration" and that conventional hearing aids "may provide limited benefit." Cochlear-implant candidacy concerns severe-to-profound loss.

### E42 · P2 · The ultrasound discussions misstate intensity ratios and levels

- [ch17Ultrasound.md:574](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17Ultrasound.md#L574) (problem 1)
- [ch17Ultrasound.md:673](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17Ultrasound.md#L673) (problem 3)

Three statements are wrong:

- 10⁵ W/m² is 10⁷ times the 10⁻² W/m² diagnostic level, not "about 10¹⁰ times."
- 10⁻² W/m² is **100 dB**, not 103 dB.
- Diagnostic levels are about **10⁵** times weaker than the diathermy intensity, not "about 100 times."

## Chapter 18

### E43 · P1 · The attractive-charge case does not satisfy its own sum constraint

[ch18CoulombsLaw.md:1141](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18CoulombsLaw.md#L1141) (problem 15)

Part (b) claims "same quadratic, same magnitudes" and answers +7.44 µC and −0.56 µC. These sum to 6.88 µC, not the required 8.00 µC.

With q₁ + q₂ = 8.00 µC and q₁q₂ = −4.17 × 10⁻¹² C², solve q² − 8.00 × 10⁻⁶ q − 4.17 × 10⁻¹² = 0. The charges are **+8.49 µC** and **−0.49 µC**. The discussion repeats the error.

### E44 · P2 · The zero-field point to the right of the charges is at 30.6 cm

[ch18ConductorsAndElectricFieldsInStaticEquilibrium.md:764](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L764) (problem 7)

Part (e) gives x ≈ 16.0 cm, but the net field there is not zero. Solving the stated three-charge configuration gives **x = 30.6 cm**.

Part (c) also says both positive-charge fields point right in the region 0 < x < 3 cm. They point left.

### E45 · P2 · Electron speed in hydrogen is not relativistic

[ch18ApplicationOfElectrostatics.md:769](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ApplicationOfElectrostatics.md#L769) (problem 7)

The discussion says the electron's speed, 2.18 × 10⁶ m/s, shows that atomic electrons move at relativistic speeds, "which is why quantum mechanics is necessary." That speed is 0.7% of c, so it is not relativistic. The need for quantum mechanics has nothing to do with it.

### E46 · P2 · The levitated-charge result is twice too large, and the stability claim is wrong

[ch18ApplicationOfElectrostatics.md:1276](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ApplicationOfElectrostatics.md#L1276) (problem 13)

**Part (a).** The algebra simplifies 8√2/(3√3) to "8/(3√6)"; it equals 8√6/9 ≈ 2.18. The resulting q is twice too large. The correct result is q = 3√3 mgd²/(8√2 kQ) ≈ **0.459 mgd²/(kQ)**.

**Part (b).** The solution calls vertical motion unstable, while describing a restoring force for an upward displacement. At h = d the upward force decreases with height, so the vertical equilibrium is **stable**. The instability is lateral, as Earnshaw's theorem predicts.

## Chapter 19

### E47 · P1 · The defibrillator charge question links to the wrong example

[ch19CapacitorsAndDielectrics.md:692](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19CapacitorsAndDielectrics.md#L692) (problem 3)

"[Example 1](#Example1)" resolves to the parallel-plate example in the same section, which already computes 26.6 µC. The solution meanders and finally gives "80.0 mC (as stated, though this requires ~9 MV...)."

The intended source is the defibrillator Example 1 in [ch19EnergyStoredInCapacitors.md](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19EnergyStoredInCapacitors.md): 8.00 µF at 1.00 × 10⁴ V, so Q = **80.0 mC**. Fix the link and rewrite the solution from that example.

### E48 · P2 · The ion's energy in part (c) is 132 MeV

[ch19ElectricPotentialDueToAPointCharge.md:463](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19ElectricPotentialDueToAPointCharge.md#L463) (problem 8)

The problem says the O³⁺ ion is released near the Van de Graaff and asks for its energy at the 1.00-MV distance. That energy is 3e × (45.0 − 1.00) MV = **132 MeV**. The solution computes this value, then reports "3.00 MeV relative to ground" as the final answer.

## Chapter 20

### E49 · P1 · The 2600 °C bulb resistance misapplies the temperature coefficient

[ch20AlternatingCurrentVersusDirectCurrent.md:348](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20AlternatingCurrentVersusDirectCurrent.md#L348) (problem 1)

Part (b) applies R = R₀(1 + αΔT) with R₀ taken at 2700 °C and ΔT = −100 °C. This gives 317 Ω, "a 45% decrease for 100 °C." But α is referenced to 20 °C. The correct ratio is R₂₆₀₀/R₂₇₀₀ = (1 + 2580α)/(1 + 2680α) = 0.966, so R = **556 Ω**. The discussion builds on the error.

### E50 · P2 · The tungsten filament is 2.81 cm long, not 2.81 m

[ch20ResistanceAndResistivity.md:600](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ResistanceAndResistivity.md#L600) (problem 3)

L = (0.200 Ω)(7.85 × 10⁻⁹ m²)/(5.6 × 10⁻⁸ Ω·m) = 0.0281 m. The discussion ("2.81 m seems long... coiled") rests on the 100× error.

### E51 · P2 · The thermal-expansion redo links the wrong exercise and invents its data

[ch20ResistanceAndResistivity.md:1206](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ResistanceAndResistivity.md#L1206) (problem 15)

"Redo [Exercise 2](#Exercise2)" links to the 0-gauge copper-wire problem. The intended target is the hot-filament example: 0.350 Ω cold, and 4.8 Ω at 2850 °C with ΔT = 2830 °C. The solution instead invents "4.84 Ω (hypothetical reference value)" and ΔT ≈ 2500 °C.

With ΔT = 2830 °C, the expansion correction is a factor of 1.034, giving about **4.68 Ω** and a **3.3%** change. The discussion also says expansion makes the wire "longer and thinner," while the math uses the increase in area.

### E52 · P2 · The thermistor discussion reverses where the linear model fails

[ch20ResistanceAndResistivity.md:1146](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ResistanceAndResistivity.md#L1146) (problem 14)

Part (b) finds zero resistance at 53.7 °C, then says resistance goes negative "below that temperature (going to even higher temperatures)." With α < 0, the linear model fails at **high** temperatures, above 53.7 °C. The problem's own "very low temperatures" wording is backward too.

### E53 · P2 · The CFL break-even price has three different answers

[ch20ElectricPowerAndEnergy.md:745](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ElectricPowerAndEnergy.md#L745) (problem 13)

The solution gives $4.75, then $47.50, then a final $6.25. The section's worked example amortizes the CFL's cost over its ten-times-longer life. Following it gives **$47.50**. Report one answer with that model.

### E54 · P2 · A problem statement ends with text pasted from the next problem

[ch20ElectricPowerAndEnergy.md:1405](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ElectricPowerAndEnergy.md#L1405) (problem 27)

The aluminum/copper transmission-line problem ends with "A lower resistance would shorten the heating time. Discuss the practical limits...". That text belongs to the immersion-heater problem. Remove it.

## Chapter 21

### E55 · P1 · The P₃ and total-power solution invents a current

[ch21ResistorsInSeriesAndInParallel.md:1203](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch21ResistorsInSeriesAndInParallel.md#L1203) (problem 8)

**Part (a).** The solution says P₃ = 7.16 W "matches the value found in earlier examples (≈7.2 W)." The earlier examples give 4.68 W (series) and 11.1 W (parallel); 7.16 W lies between them.

**Part (b).** The solution uses an invented I = 1.31 A and reports 1.76 + 6.79 + 7.16 = 15.7 W. The actual circuit carries **I = 2.35 A**, and the source supplies **28.2 W** = 5.52 + 15.6 + 7.16 W.

### E56 · P2 · The radio-battery discussion reverses the role of internal resistance

[ch21ElectromotiveForce.md:779](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch21ElectromotiveForce.md#L779) (problem 9)

**Unstated assumption.** The solution assumes two cells, which the problem does not state; the one-cell answers are 0.476 W and 0.691 W. State the assumption.

**Reversed reasoning in part (d).** The answer says lowering the radio's resistance makes the internal resistance "a smaller fraction of the total." It becomes a **larger** fraction. That is why alkaline cells, with five times the internal resistance, lose their advantage at high volume; below about 1.4 Ω, NiCad cells deliver more power. The conclusion that the advantage shrinks is right, but for the opposite reason.

### E57 · P2 · Two Kirchhoff solutions decline to use the printed circuit values

- [ch21KirchhoffsRules.md:575](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch21KirchhoffsRules.md#L575) (problem 8)
- [ch21KirchhoffsRules.md:647](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch21KirchhoffsRules.md#L647) (problem 10)

Both solutions say numerical answers are impossible "without specific values from Figure 8/7." Both figures print every emf and resistance:

| Figure                | I₁           | I₂          | I₃                         |
| --------------------- | ------------ | ----------- | -------------------------- |
| Figure 8 (problem 8)  | **−0.345 A** | **0.379 A** | **0.034 A** (I₃ = I₁ + I₂) |
| Figure 7 (problem 10) | **0.134 A**  | **−2.46 A** | **2.60 A** (I₁ = I₂ + I₃)  |

Signs follow each figure's labeled directions.

The loop equation for abcdefghija in problem 8 is also copied from [problem 6](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch21KirchhoffsRules.md#L515). It reverses the signs of emf₃ and emf₄; the correct sum is +emf₁ − emf₄ + emf₃ around that loop. It also includes an R₄ that does not appear in Figure 8.

## Chapter 22

### E58 · P2 · The charged jet is pushed north, not south

[ch22MagneticFieldStrength.md:430](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MagneticFieldStrength.md#L430) (problem 8)

For a positive charge, v (west) × B (up) points **north**. The solution says south.

### E59 · P2 · The copper-wire Hall voltage is 1.47 µV

[ch22TheHallEffect.md:406](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22TheHallEffect.md#L406) (problem 7)

The solution computes 1.47 µV, then concludes "approximately 1.16 µV (or about 1.5 µV with slightly different values)." The stated data give **1.47 µV**.

### E60 · P2 · Two current directions are the negative-charge answers

[ch22MagneticForceOnACurrentCarryingConductor.md:210](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MagneticForceOnACurrentCarryingConductor.md#L210) (problem 2)

I × B must point along F. In Figure 6(a), F is up and B is out of the page, so I points **west** (left), not east. In Figure 6(c), F is left and B is into the page, so I points **north** (up), not south. These agree with the section's positive-charge problem with the same F and B. Part (b) is correct.

### E61 · P2 · The force on the loop in the field points down

[ch22MagneticForceOnACurrentCarryingConductor.md:583](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MagneticForceOnACurrentCarryingConductor.md#L583) (problem 10)

In Figure 8, the bottom segment carries current to the right through a field pointing out of the page. I × B therefore points **down**, out of the field region. The solution says the net force is upward. The force-per-tesla value, 1.00 N/T, is correct.

### E62 · P2 · The four-wire force problem has no numbers and the wrong directions

[ch22MagneticForceBetweenTwoParallelConductors.md:555](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MagneticForceBetweenTwoParallelConductors.md#L555) (problem 8)

The solution stops at "the exact magnitudes require vector addition" and calls every force "outward." Figure 5(b) gives the following results:

- Each top wire feels **1.06 × 10⁻⁴ N/m at 45°, up and toward the other top wire**. Its horizontal component points inward, not outward.
- Each bottom wire feels **7.50 × 10⁻⁵ N/m straight down**.

### E63 · P2 · The straight-wire current must oppose the loop current at the tangent point

[ch22MoreApplicationsOfMagnetism.md:745](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L745) (problem 11)

In Figure 6, I₁ circulates counterclockwise, so its field at the center points out of the page. To cancel it, I₂ must flow from **upper right to lower left**, opposite to the loop current at the tangent point. The solution says it flows in the same direction, from lower left to upper right; that would double the field.

### E64 · P2 · The wire-array field problems use the wrong geometry or give no answer

[ch22MoreApplicationsOfMagnetism.md:800](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L800) (problem 12); [ch22MoreApplicationsOfMagnetism.md:844](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L844) (problem 13)

**Problem 12.** The final 7.55 × 10⁻⁵ T at 23.4° is correct, but the working does not produce it. It uses r = 0.100 m instead of the centroid distance, 0.0577 m, and only two of the three wires.

**Problem 13.** The solution only describes a method. The point equidistant from the four wires in Figure 5(b) has **B = 3.00 × 10⁻⁵ T**, directed parallel to the top and bottom sides, toward the right.

### E65 · P2 · The top wire must carry 10.0 A into the page

[ch22MoreApplicationsOfMagnetism.md:888](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L888) (problem 14)

Three equal currents in the **same** direction at the corners of an equilateral triangle give zero field at the centroid, by symmetry. The top wire must carry 10.0 A **into** the page. The solution says "out of the page," which doubles the field instead.

### E66 · P2 · The levitated-wire problem undervalues Earth's field and misjudges stability

[ch22MoreApplicationsOfMagnetism.md:1596](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L1596) (problem 27)

**Part (b).** Earth's field adds B_E·I₂ = 3.0 × 10⁻⁵ I₂ to the wire-wire term of 2.67 × 10⁻⁴ I₂ per meter. That lowers the required current to **1.56 × 10³ A**, about 10% less than 1.73 × 10³ A. The solution calls this "negligible."

**Part (c).** The solution's own reasoning describes a restoring force for vertical displacement, which makes the vertical equilibrium **stable**. It then labels it unstable. The horizontal instability is correct.

### E67 · P2 · The levitating-wire diameter is forced toward the key

[ch22MoreApplicationsOfMagnetism.md:1530](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L1530) (problem 26)

With ρ = 8960 kg/m³, the solution computes d = 93.3 µm. It then writes "≈ 94.1 µm," which needs ρ = 8.80 × 10³ kg/m³, and carries 94.1 µm into part (d). Use one density throughout. With 8960 kg/m³, the answers are **93.3 µm**, **2.52 Ω/m**, and **50.3 V/m**.

## Chapter 23

### E68 · P2 · Coil 2 sees the return field of coil 1, so both Lenz answers are reversed

[ch23FaradaysLawOfInduction.md:260](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L260) (problem 1)

In Figure 4(a), the coils are coplanar and coil 1 circulates counterclockwise. Coil 2 lies outside coil 1, where coil 1's field points **into** the page. The solution says it points out.

The answers are: (a) **counterclockwise**, (b) **clockwise**, and (c) no current.

### E69 · P2 · Three problems link a photograph instead of the wire-and-coil figure

[ch23FaradaysLawOfInduction.md:327](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L327) (problem 2); also [line 880](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L880) (problem 11) and [line 946](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L946) (problem 12)

"[Figure 3](#Figure3)(b)" resolves to the photograph of a hearing implant on a baby's head. The intended figure is Figure 4(b): a wire carrying current upward, in the plane of a coil to its right.

The problem 2 solution invents a horizontal coil around the wire. With the actual geometry, the wire's field at the coil points into the page, and the answers are:

- (a) **counterclockwise**;
- (b) **clockwise**;
- (c) **clockwise** throughout the reversal.

The solution gives clockwise; counterclockwise; and counterclockwise, then clockwise.

### E70 · P2 · The lightning-induced voltage is 251 V, not 80 V

[ch23FaradaysLawOfInduction.md:946](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L946) (problem 12)

The field step writes the numerator 4π × 10⁻⁷ × 2.00 × 10⁶ as 0.800; it is 2.51. The correct values are:

- B = µ₀I/(2πr) = 2 × 10⁻⁷ × 2.00 × 10⁶/50.0 = **8.00 × 10⁻³ T**;
- Φ = **6.28 × 10⁻³ Wb**;
- emf = **251 V**.

Revise part (b) with the larger value.

### E71 · P2 · The RL time-constant range is 10⁻¹⁵ s to 100 s

[ch23RLCircuits.md:286](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23RLCircuits.md#L286) (problem 5)

The answer, 1.00 × 10⁻¹⁸ s to 0.100 s, does not follow from the stated ranges. The shortest time constant is 1.00 nH/1.00 MΩ = **1.00 × 10⁻¹⁵ s**. The longest is 10.0 H/0.100 Ω = **100 s**.

## Chapter 24

### E72 · P2 · 150 kV/m is well below the breakdown field of air

[ch24ProductionOfElectromagneticWaves.md:346](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24ProductionOfElectromagneticWaves.md#L346) (problem 1)

The discussion calls 150 kV/m "about 15 times stronger than the breakdown threshold for air (approximately 10 kV/m)." Air breaks down near **3 MV/m**, the value other Chapter 24 solutions use, so 150 kV/m is about 1/20 of breakdown.

### E73 · P2 · The AM-transmitter intensity ignores the problem's hint

[ch24EnergyInElectromagneticWaves.md:369](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24EnergyInElectromagneticWaves.md#L369) (problem 4)

The hint says half the power spreads over a hemisphere. The intensity is therefore (P/2)/(2πr²) = **4.42 × 10⁻⁶ W/m²**, and E₀ = **5.77 × 10⁻² V/m**.

The strategy even writes I = P/(4πr²). The arithmetic then uses P/(2πr²) and reports 8.84 × 10⁻⁶ W/m² and 81.6 mV/m.

## Additional presentation, precision, and modeling notes

These are separate from the substantive finding count.

- **Answer text that does not match its own arithmetic.** Each item lists the computed value first.
  - [Viscosity](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12ViscosityAndLaminarFlow.md#L1230), problem 14: 18.55% "≈ 19.0%".
  - [Radiation](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L465), problem 2: (1123/291)⁴ ≈ 222, written 230.
  - [Radiation](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L1016), problem 12: uses 17.3 g/m³, where the ch13 table gives 17.2.
  - [Hooke's Law](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16HookesLaw.md#L277), problem 1: 6.91 "rounded to" 6.88 kg.
  - [Simple Harmonic Motion](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16SimpleHarmonicMotion.md#L623), problem 6: 94.6 vs 94.7 kg.
  - [The Simple Pendulum](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16TheSimplePendulum.md#L818), problem 12: 52.9 min, written 52.8.
  - [Coulomb's Law](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18CoulombsLaw.md#L243), problem 2: 0.2622 "≈ 0.263" N.
  - [Conductors in equilibrium](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L1113), problems 10 and [14](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ConductorsAndElectricFieldsInStaticEquilibrium.md#L1462): 2.03 vs 2.04 × 10⁷, and 4.33 vs 4.36 × 10³ N/C.
  - [Magnetic Field Strength](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MagneticFieldStrength.md#L485), problem 9: 3.00 vs 3.01 × 10⁻⁵ T.
  - [Force on a Moving Charge](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22ForceOnAMovingChargeInAMagneticField.md#L473), problem 5: 4.38 vs 4.36 × 10⁻⁴ m.
  - [Torque on a Current Loop](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22TorqueOnACurrentLoop.md#L434), problem 7: 3.49 vs 3.48 × 10⁻²⁶ N·m.
  - [RLC Series AC Circuits](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23RLCSeriesACircuits.md#L944), problem 11: Z = 12,771 Ω, written 12,738 Ω (I = 31.9 mA). [Problem 14](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23RLCSeriesACircuits.md#L1157): C = 18.8 nF, written 18.9 nF.
- **Statement typos, links, and leftover text.**
  - [Kinetic Theory](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13KineticTheory.md#L587), problem 4, gives 11.2 km/s and then 11.1 km/s in the same statement.
  - [Conduction](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Conduction.md#L300), check your understanding 1, writes Boltzmann's k_B for thermal conductivity.
  - [Electric Power and Energy](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ElectricPowerAndEnergy.md#L1504), problem 29, has broken `$$` delimiters in the hot-tub statement.
  - [Electric Hazards](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ElectricHazardsAndTheHumanBody.md#L613), problem 7, leaks "the answer 1.00 Ω suggests the peak interpretation is correct."
  - [Nerve Conduction](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20NerveConductionElectrocardiograms.md#L280), problem 1, gives two period readings (0.8 s and 0.75 s).
  - [More Applications of Magnetism](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L699), problem 10, links `../contents/ch23MagneticForceOnACurrentCarryingConductor#Figure8`. That file does not exist; the target is in ch22.
  - [More Applications of Magnetism](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L614), problem 8, alternates between "Exercise 1," "Exercise 7," and "a typical turn density" for the same solenoid.
  - [More Applications of Magnetism](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L1041), problem 17, states the electron speed as 6.00 × 10⁻⁷ m/s; the solution assumes 10⁷.
  - [The Electromagnetic Spectrum](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24TheElectromagneticSpectrum.md#L1992), problem 17, writes "±1.00" with no unit (MHz).
  - [The Electromagnetic Spectrum](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24TheElectromagneticSpectrum.md#L2450), problem 24, keeps "(The negative sign in the original answer indicates heat loss from Earth.)"
  - Four exercise blocks in [Static Electricity and Charge](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18StaticElectricityAndCharge.md) use `data-element-type="problem-exercises"` instead of `problems-exercises`.
  - [Viscosity](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12ViscosityAndLaminarFlow.md#L1130), problem 12, has `\text{}` outside math delimiters in its discussion.
- **Correct answers with wrong right-hand-rule or Lenz reasoning.**
  - [More Applications of Magnetism](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L386), problem 3, swaps the B directions in Figures 5(b) and 5(c) and misapplies the rule twice.
  - [Torque on a Current Loop](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22TorqueOnACurrentLoop.md#L475), problem 8, writes "west × north = upward ... downward"; the torque is downward.
  - [Eddy Currents](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23EddyCurrentsAndMagneticDamping.md#L147), problems 1 and [2](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23EddyCurrentsAndMagneticDamping.md#L191), mislabel which edge is in the field, or its current sense.
  - [Induced Emf](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23InducedEmfAndMagneticFlux.md#L182), problem 2, says the coil's plane "contains the wire," while the caption says the wire is perpendicular to that plane.
  - [Application of Electrostatics](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ApplicationOfElectrostatics.md#L377), problem 2, says in its strategy that the field points up, while the (correct) answer says down.
- **Side-remark factual slips in discussions.** These items do not change answers. Fix them where the text is touched.
  - **Fluids (ch12).**
    - [Bernoulli](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12BernoullisEquation.md#L598), conceptual question 9: the tornado pressure drop of "10–20%" is overstated.
    - [Bernoulli applications](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12TheMostGeneralApplicationsOfBernouillisEquation.md#L349), problem 1: a "70% typical" hydroelectric efficiency is too low.
    - [Viscosity](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12ViscosityAndLaminarFlow.md#L783), problem 4: the pressure force is called the "net force."
    - [Turbulence](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch12OnsetOfTurbulence.md#L781), problem 11: 442 m/s is called "approaching" water's sound speed.
  - **Thermal physics (ch13–ch15).**
    - [Thermal expansion](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13ThermalExpansionOfSolidsAndLiquids.md#L1200), problem 12: 2.2 × 10⁹ Pa is the bulk modulus of liquid water, not ice.
    - [Ideal gas](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13TheIdealGasLaws.md#L920), problem 7: 0.0784 mol of air is 2.3 g, not 1.9 g.
    - [Ideal gas](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13TheIdealGasLaws.md#L1044), problem 11: the thermosphere explanation is confused.
    - [Humidity](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13HumidityEvaporationAndBoiling.md#L554), problem 2: the claim that water "doesn't spontaneously evaporate" is false.
    - [Humidity](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch13HumidityEvaporationAndBoiling.md#L1156), problem 20: 4.7 atm is not "typical" of pressure cookers.
    - [Temperature change](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14TemperatureChangeAndHeatCapacity.md#L915), problem 9: the sweat mass is about 0.46 kg, not 0.25 kg.
    - [Radiation](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch14Radiation.md#L1802), problem 25: the meteorite radiates about 200–550 W, and tungsten melts at 3422 °C.
    - [Second law](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15IntroductionToTheSecondLawOfThermodynamics.md#L531), problem 5: marine diesels are about 50% efficient, not 5%.
    - [Carnot](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15CarnotsPerfectHeatEngine.md#L207), problem 1: a "400–600 °C" combustion temperature is far too low.
    - [Applications](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15ApplicationsOfThermodynamics.md#L363), problems 2 and [3](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15ApplicationsOfThermodynamics.md#L407): a household refrigerator COP of "4–6" is too high.
    - [Entropy](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch15EntropyAndTheSecondLaw.md#L922), problem 9: the heated volume is 380 million L, not 1.9 million L.
  - **Oscillations, waves, and sound (ch16–ch17).**
    - [Period](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch16PeriodAndFrequencyInOscillations.md#L250), problem 4: 12.5 kHz does not exceed the limit of hearing.
    - [Speed of sound](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SpeedOfSoundFrequencyAndWavelength.md#L435), problem 3: the temperature is about 1 °C, not 3 °C.
    - [Sound intensity](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundIntensityAndSoundLevel.md#L1420), problem 15: the paperclip comparison is wrong.
    - [Doppler](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17DopplerEffectAndSonicBooms.md#L501), problem 3: the shift is about 1.4 semitones, not 4.
    - [Doppler](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17DopplerEffectAndSonicBooms.md#L537), problem 4: 11 km/h is not a marching pace.
    - [Interference](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundInterferenceAndResonance.md#L537), problem 3: "stretch tuning" is misused.
    - [Interference](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundInterferenceAndResonance.md#L586), problem 4: the discussion contradicts itself on C4.
    - [Interference](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17SoundInterferenceAndResonance.md#L881), problem 9: the oboe is not a closed tube.
    - [Ultrasound](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch17Ultrasound.md#L917), problem 8: 7.69 MHz is not an abdominal imaging frequency.
  - **Electrostatics and potential (ch18–ch19).**
    - [Conductors and insulators](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ConductorsAndInsulators.md#L460), problem 5: the imbalance is 1.5 × 10³ C, not 10⁶ C.
    - [Applications](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ApplicationOfElectrostatics.md#L502), problem 4: 2.45 × 10⁻¹⁸ kg is about 8 × 10⁷ water molecules, not "a few thousand."
    - [Applications](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch18ApplicationOfElectrostatics.md#L1413), problem 15: the "microsecond" timescales are wrong.
    - [Potential energy](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19ElectricPotentialEnergy.md#L1050), problem 10: the nuclear force range is about 1 fm, not 1 pm.
    - [Point charge](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19ElectricPotentialDueToAPointCharge.md#L659), problem 12: the speed is 0.9998c, not 0.9999c.
    - [Dielectrics](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19CapacitorsAndDielectrics.md#L1055), problem 11: "1000 times" should be 100.
    - [Energy stored](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch19EnergyStoredInCapacitors.md#L514), problem 8: supercapacitor engine starters are now commercial products.
  - **Circuits (ch20–ch21).**
    - [Ohm's law](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20OhmsLaw.md#L285), problem 3: the starter-versus-headlight charge claim is false.
    - [Power](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20ElectricPowerAndEnergy.md#L1025), problem 19: ρ_Cu should be 1.72 × 10⁻⁸ Ω·m, not 1.68 × 10⁻⁸.
    - [AC vs DC](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20AlternatingCurrentVersusDirectCurrent.md#L588), problem 9: breakers are rated on rms current, not peak.
    - [AC vs DC](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20AlternatingCurrentVersusDirectCurrent.md#L646), problem 11: the inrush behavior is not "opposite" to a bulb's.
    - [AC vs DC](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch20AlternatingCurrentVersusDirectCurrent.md#L731), problem 13: the voltage spends equal time above and below V_rms.
    - [Emf](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch21ElectromotiveForce.md#L947), problem 13(e): 1 mA through 1 Ω is 1 µW, not 1 mW.
  - **Magnetism and induction (ch22–ch23).**
    - [Hall effect](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22TheHallEffect.md#L328), problem 5: 11.3 mV is larger than the 1-mV QRS signal.
    - [Parallel conductors](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MagneticForceBetweenTwoParallelConductors.md#L377), problem 5: lamp cord weighs about 0.3–0.5 N/m, not 30–50 N/m.
    - [Applications](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L1473), problem 25: the gap is about 8 orders of magnitude, not 17.
    - [Applications](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch22MoreApplicationsOfMagnetism.md#L1662), problem 28: a kilogram holds about 3 × 10²⁶ electrons, far more than 3.6 × 10²¹.
    - [Faraday](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L703), problem 8: the ratio is about 10⁵, not 10⁴.
    - [Faraday](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23FaradaysLawOfInduction.md#L761), problem 9: a quarter turn in 10 ms is 25 rev/s, not 100.
    - [Motional emf](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23MotionalEmf.md#L395), problem 6: 198 T exceeds every continuous magnet.
    - [Generators](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch23ElectricGenerators.md#L836), problem 11: 4.8 × 10⁵ m/s is below c/600 and nowhere near c.
  - **Electromagnetic waves (ch24).**
    - [EM spectrum](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24TheElectromagneticSpectrum.md#L2309), problem 22: the Venus distance sentence is muddled.
    - [EM energy](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24EnergyInElectromagneticWaves.md#L565), problem 7: the intensity is about 10¹⁶ times sunlight, not "10 trillion" times.
    - [EM energy](https://github.com/veillette/physics-book/blob/01ac650390ef32414f5a595c90d268ba846e22bf/contents/ch24EnergyInElectromagneticWaves.md#L910), problem 12: X-band is about 10.5 GHz, not 1.5 GHz.

## Verification notes

Independent calculations used g = 9.80 m/s², c = 3.00 × 10⁸ m/s, and ε₀ = 8.85 × 10⁻¹² C²/(N·m²), unless the question specified otherwise. In particular:

- **Circuits.** Both Kirchhoff circuits were solved from the emf and resistance values printed in Figures 21_03_07 and 21_03_08. The cell orientations were read from the plate lengths in the images, and each solution was checked against all three loop equations.
- **Directions.** Every right-hand-rule and Lenz's-law direction finding was checked against the image itself (Figures 22_07_06, 22_07_08, 22_11_04 through 22_11_06, and 23_02_04), using an explicit x–y–z cross product.
- **Wire arrays.** Fields and forces were computed by vector superposition, with the actual side lengths and centroid distances.
- **Thermodynamics.** Entropy changes were recomputed with unrounded logarithms. The c_p findings use c_p ≈ 1000 J/kg·°C for air.
- **Answer-key forcing.** These were identified only when the solution's own displayed arithmetic gives a different value from the one it reports. Where the key's value can be reached under a different model, the finding says which model.

This review did not modify application code or textbook content. A site build or link-linter pass would not validate the physics in these exercises and was not used as evidence of correctness.
