# Correctness review: exercises and problems, Chapters 1–10

Date: 2026-10-18. Source revision: `a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93`. **Review findings only; textbook files have not been corrected by this review.** This complements [the earlier teaching-content review](content-review-ch01-10.md), which excluded these question sets.

## Scope and method

Screened the question statements and available answer text across all **73 chapter/section files** in the first ten numbered chapters of `SUMMARY.md`, including conceptual questions and check-your-understanding questions. The inventory contains **791 question blocks**: 541 explicitly tagged problems/exercises plus one untyped numerical problem, 226 explicitly tagged conceptual questions plus one untyped conceptual question, and 22 checks for understanding. Multi-part questions count as one block; ordinals below are local to each section and question category, not book-wide exercise numbers.

The review checked the mathematical model, required assumptions, units, signs, reference frames, supplied data, physical conclusions, and consistency between statements and solutions. Suspected numerical errors were independently recalculated, and referenced graphs/diagrams were inspected directly when verifying figure-dependent findings. Routine rounding differences and the usual explicitly stated introductory idealizations were not treated as substantive errors. Worked teaching examples were consulted where exercises depend on them, but a separate audit of all worked examples is outside this report.

This is a substantive screening and targeted verification, **not a claim that every intermediate step in all 791 blocks has been independently re-derived**. An unlisted exercise is not a certified error-free solution. Historical and external factual checks were limited to the linked findings; the numerical inputs in hypothetical or explicitly historical questions were otherwise accepted as given.

## Result

Found **51 substantive findings: 12 P1 and 39 P2**. Some findings cover multiple related exercises. P1 marks a materially incorrect physical rule/model or a large error that undermines the exercise; P2 marks an incorrect result, inconsistent data/direction, missing premise needed for a unique answer, or a necessary qualification. Presentation/rounding items are recorded separately below.

| Chapter | Question blocks | Substantive findings |
| ------- | --------------: | -------------------: |
| 1       |              55 |                    1 |
| 2       |             104 |                    9 |
| 3       |              91 |                   10 |
| 4       |              82 |                    4 |
| 5       |              60 |                    7 |
| 6       |              73 |                    1 |
| 7       |              95 |                    4 |
| 8       |              86 |                    3 |
| 9       |              59 |                    5 |
| 10      |              86 |                    7 |

Prioritize the rebound/compression model, the incompatible graph answers, ground-versus-quarterback frames, failed-launch explanation, weak-force ratios, bending/shear distinction, galactic-orbit arithmetic, roller-coaster energy question, component momentum conservation, astronaut mass accounting, and the angular-acceleration check. Correct associated discussions along with final numbers; several discussions rationalize the incorrect results.

## Chapter 1

### E01 · P2 · The stopwatch answer rejects a useful training instrument

[ch1AccuracyPrecisionAndSignificantFigures.md:192](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch1AccuracyPrecisionAndSignificantFigures.md#L192) (check your understanding 1)

The answer says the stopwatch will not be helpful because its uncertainty is too large to distinguish sprint times. An uncertainty of ±0.05 s cannot reliably resolve the cited 12.04 s versus 12.07 s finish, but it can distinguish much of the stated 11.49–15.01 s training range. Answer both uses separately: useful for ordinary training measurements, insufficient to decide this close finish. Alternatively, narrow the question to deciding the race winner.

## Chapter 2

### E02 · P2 · Path C ends at 10 m, not 11 m

[ch2Displacement.md:363](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2Displacement.md#L363) (problem 3)

Figure 5 shows the path 2 → 10 → 8 → 10 m. The solution invents an endpoint at 11 m. The distance is 8 + 2 + 2 = **12 m**, and both the displacement magnitude and signed displacement are **8 m** and **+8 m**, respectively. Replace the supplied 13 m, 9 m, and +9 m throughout the solution.

### E03 · P2 · The axon-diameter dependence is reversed

[ch2TimeVelocityAndSpeed.md:723](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2TimeVelocityAndSpeed.md#L723) (problem 8)

The introductory sentence says nerve-impulse propagation speed depends inversely on axon diameter. Larger axons generally conduct faster, with the relation also depending on myelination. The numerical answer 1.1/18 = 0.061 s is correct. Remove “inversely” or replace the sentence with a qualified statement. This direction of dependence is supported by the original modeling paper [Action potential propagation and synchronisation in myelinated axons](https://pmc.ncbi.nlm.nih.gov/articles/PMC6818808/).

### E04 · P2 · The bicycle-race solution reverses the other racer’s head start

[ch2MotionEquationsForConstantAccelerationInOneDimension.md:2342](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L2342) (problem 19)

The other racer starts 5.00 m ahead and therefore has **295 m**, not 305 m, remaining. The winner finishes in 7 + (300 − 92.75)/15 = 20.8167 s; the other racer finishes in 295/11.8 = 25.0000 s. The margins are **4.18 s** and **49.4 m** at the winner’s finish, rather than 5.0 s and 60 m. Parts (a) and (b) are otherwise consistent with the stated model.

### E05 · P1 · Two rebound solutions confuse net displacement with maximum compression

[ch2FallingObjects.md:1815](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2FallingObjects.md#L1815) (problem 16); [ch2FallingObjects.md:2112](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2FallingObjects.md#L2112) (problem 18)

Both part (d) solutions evaluate displacement over the entire contact interval, including compression and rebound, and call its magnitude the maximum compression. Maximum compression occurs when the downward velocity first reaches zero. The given endpoint velocities and total contact time determine average acceleration, but do not determine the acceleration history or deformation by themselves. If the intended extra model is constant upward acceleration, the stopping distance is u²/(2a): **0.109 mm** for the steel ball and **5.11 mm** for the tennis ball, rather than 4.0 μm and 1.4 mm. Explicitly state the deformation/constant-acceleration approximation, or remove part (d); average acceleration alone cannot supply it.

### E06 · P2 · The hiker solution silently omits the sound-travel delay

[ch2FallingObjects.md:1305](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2FallingObjects.md#L1305) (problem 11)

The 1.50 s interval starts when the hiker hears the rock break loose, whereas the solution starts that interval at release. The sound has already taken roughly 0.31 s to travel 105 m. Either explicitly instruct students to neglect sound travel, preserving the supplied 94.0 m and 3.13 s, or supply a sound speed and include the delay. For example, at 343 m/s the answers are **89.0 m** above the hiker and **2.82 s** remaining after the rock becomes visible. This qualification also makes the contrast with the subsequent Half Dome problem, which explicitly includes sound travel, clear.

### E07 · P1 · A graph solution changes meters into kilometers

[ch2GraphicalAnalysisOfOneDimensionalMotion.md:584](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L584) (problem 3)

Figure 16 labels position in **meters**. The solution turns its readings near 6.95 and 11.7 m into kilometers and obtains 238 m/s, then alleges that the question intended km/s. The slope is approximately (11.7 − 6.95)/20 = **0.238 m/s**, consistent with the requested 0.24 m/s. Correct the calculation, final answer, and discussion; the spacecraft/high-speed interpretation is unsupported by the figure.

### E08 · P2 · The subway position graph and its solution describe different motion

[ch2GraphicalAnalysisOfOneDimensionalMotion.md:683](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L683) (problem 5)

The printed Figure 18 starts at **4.70 km**, reaches **4.72 km at 10 s**, and reaches **4.80 km at 20 s**. The solution instead starts at zero, assumes 5.0 m/s for 10 s followed by 1.3 m/s², and ends at 0.165 km. Those are different trajectories, even after shifting the origin: the figure shows a total displacement of 0.100 km. The linked acceleration section does not supply the claimed 5.0 m/s/1.3 m/s² two-phase history. Supply a specific velocity/acceleration history and reconcile the answer figure with it. Also remove the instruction to draw a position-graph “kink” where velocity remains continuous; an acceleration change alone changes curvature, not slope discontinuously.

### E09 · P2 · The sprinter has covered only 96 m at 10 s

[ch2GraphicalAnalysisOfOneDimensionalMotion.md:820](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L820) (problem 7)

Figure 22 gives 24 m in the first four seconds and another 72 m from 4 to 10 s. Thus the 100 m finish is at **10.33 s**, if the 12 m/s plateau continues. The answer “approximately 10 s” is too coarse to reveal that the plotted motion stops short of the stated finish. Extend the plateau beyond 10.33 s and show the area calculation. Parts (a)–(c) agree with the figure.

### E10 · P1 · The particle’s velocity answer uses a different position graph

[ch2GraphicalAnalysisOfOneDimensionalMotion.md:915](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L915) (problem 8)

Figure 23 passes through (0,0), (2,2), (3,−3), (5,−3), and (6,−2), in SI units. The corresponding velocities are **+1 m/s on 0–2 s, −5 m/s on 2–3 s, 0 on 3–5 s, and +1 m/s on 5–6 s**. The solution instead gives +2 on 0–1, −4 on 1–2, 0 on 2–4, and +1 on 4–5. Correct the interval boundaries and slopes. Reconcile the question’s “for 5 s” with the figure’s six-second extent. On the idealized straight segments acceleration is zero; it is undefined at the velocity jumps, which can be represented by impulses only if that idealization is explained.

## Chapter 3

### E11 · P2 · City path B is misread

[ch3VectorAdditionAndSubtractionGraphicalMethods.md:552](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L552) (problem 2)

Counting the 120 m blocks in Figure 20 gives four blocks east, three north, and three west: **1200 m** traveled, with displacement (120 m east, 360 m north). Its magnitude is **379 m**, at **18.4° east of north**. The supplied 960 m and 612 m at 11.3° south of east do not describe the printed path.

### E12 · P2 · City path D is misread

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md:556](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L556) (problem 2)

The cyan path in Figure 11 goes two blocks south, six east, four north, and one west. It covers **13 × 120 = 1560 m** and ends five blocks east and two blocks north of its start. The displacement is **646 m at 21.8° north of east**. Replace the supplied 1600 m and 949 m at 18.4° south of east.

### E13 · P2 · The subtraction exercise contains an unrelated vector identity

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md:896](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L896) (problem 7)

Part (b) correctly describes taking B − A, but then calls that equivalent to A = B + C, even though C is not defined in the question. Replace this with **R″ = B − A = −R′** and ask students to confirm equal magnitudes and opposite directions. The numerical displacements supplied for the two walks are otherwise consistent.

### E14 · P2 · The triangular field’s closing side is wrong

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md:993](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L993) (problem 8)

Figure 14 gives A = 80.0 m at 21° south of east and B = 105 m at 11° west of north. Their components sum to (54.65, 74.40) m. Thus C = −(A + B) has magnitude **92.3 m**, directed **53.7° south of west**. The supplied 121 m at 38.1° south of west does not close the illustrated triangle. Rebuild the component calculation from the printed angles.

### E15 · P2 · The quadrilateral solution reverses vector A

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md:1153](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L1153) (problem 10)

In Figure 15, A points **east**, 7.5° below horizontal. Both its alt text and solution call it south of west and assign a negative east component. With the illustrated direction, A + B + C = (1.121, 2.754) km and **D = (−1.121, −2.754) km**, or **2.97 km at 67.9° south of west**. Replace the supplied 8.65 km at 18.5° south of east and correct the alt text.

### E16 · P2 · The archer solution omits a valid launch angle

[ch3ProjectileMotion.md:993](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3ProjectileMotion.md#L993) (problem 5)

For a 75.0 m level-height shot at 35.0 m/s, sin(2θ) = 0.600 gives **18.4° and 71.6°**. The question does not restrict the answer to the smaller angle. Both trajectories pass over the branch at the midpoint; the low trajectory reaches about **6.25 m above release height**, and the high trajectory about **56.3 m above release height**. The supplied solution gives only the low angle and calls its height “above the ground,” although release height above ground was not specified. Give both roots and use the release point as the height reference.

### E17 · P1 · The quarterback solution subtracts the quarterback’s velocity twice

[ch3ProjectileMotion.md:1820](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3ProjectileMotion.md#L1820) (problem 14)

The question specifies launch speed and angle relative to the **ground**. After naming v₀ the ground-frame speed, the solution writes v₀ₓ = v₀ cos25° − 2.00, mixing frames. Directly using R = v₀² sin50°/g gives **v₀ = 15.2 m/s**, **flight time 1.31 s**, and **maximum height 2.10 m above release**. Replace 16.3 m/s, 1.41 s, and 2.42 m. The quarterback’s backward motion matters when subsequently asking for the velocity relative to the quarterback, not in the ground-frame range equation.

### E18 · P2 · The shot-put record attribution is incorrect

[ch3ProjectileMotion.md:2533](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3ProjectileMotion.md#L2533) (problem 21)

The exercise identifies a 24.77 m throw by Michael Carter in 2007 as a world record. This is not Carter’s senior shot-put record: [World Athletics lists his senior personal best as 21.76 m in 1984](https://worldathletics.org/athletes/united-states/mike-carter-14358208). Preserve the exercise’s calculation by calling the 24.77 m throw hypothetical, or replace the historical attribution and inputs with a verified performance and recompute the solution.

### E19 · P2 · A lower release angle does not automatically give a longer shot-put range

[ch3ProjectileMotion.md:2533](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3ProjectileMotion.md#L2533) (problem 21)

The parenthesis concludes that 38° gives a longer range than 45° because release is above ground. A positive release height does lower the optimal angle, but that does not establish that this particular smaller angle outperforms 45°. For the exercise’s speed of about 15.0 m/s and 2.10 m release height, the optimum is about **42.6°**; 45° gives roughly **25.0 m**, slightly farther than 38°. Replace the specific 38° versus 45° claim with the qualified statement about the optimum.

### E20 · P2 · The airplane discussion confuses ground speed with Mach number

[ch3AdditionOfVelocities.md:2110](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch3AdditionOfVelocities.md#L2110) (problem 18)

The computed ground speed and required wind are approximately 556 m/s and 278 m/s. The discussion calls the former supersonic and therefore impossible for commercial aircraft. Aerodynamic Mach number uses speed relative to the air; the question’s airspeed is **280 m/s**, irrespective of the tailwind. The unrealistic premise here is the required extreme tailwind for the stated distance/time, not a rule prohibiting ground speed above the local speed of sound. Retain the vector calculation and replace that explanation.

## Chapter 4

### E21 · P2 · The decelerating sled’s seat-and-belt force points above the backward horizontal

[ch4NewtonsSecondLawOfMotion.md:1221](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch4NewtonsSecondLawOfMotion.md#L1221) (problem 12)

The calculation correctly gives an upward support component of 735 N and a backward horizontal component of about 15075 N. Their resultant is **2.79° above the backward horizontal**, not below it. Correct the strategy, direction label, final answer, and discussion. The discussion also calls the stopping force “forward” while simultaneously calling it opposite to the sled’s motion; use a single explicit forward/backward convention.

### E22 · P2 · The vector-decomposition solution changes the printed angle

[ch4ProblemSolvingStrategies.md:677](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch4ProblemSolvingStrategies.md#L677) (problem 8)

Figure 4 labels the 20 N resultant at **35°**, not the guessed 30° used in the solution. Its perpendicular components are **F₁ = 16.4 N** and **F₂ = 11.5 N**, rather than 17.3 N and 10.0 N. All component sums and the discussion of alternative pairs must use the corrected resultant. For part (c), give an actual second vector, rather than leaving an “appropriate second force” unspecified.

### E23 · P1 · The failed-launch explanation says upward thrust makes a rocket fall faster

[ch4ProblemSolvingStrategies.md:1288](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch4ProblemSolvingStrategies.md#L1288) (problem 17)

The discussion says the calculated −8.47 m/s² is faster than free fall because the thrust points the wrong way. Here the thrust is upward and **8.47 < 9.80**: it reduces the downward acceleration of a freely unsupported rocket. On a launch pad with these forces, the rocket remains supported and its actual initial acceleration is **zero**, since thrust is below its weight. Present −8.47 m/s² as the formal answer after omitting the supporting force, showing why the assumed lift-off cannot occur; do not describe it as the actual motion through the pad.

### E24 · P1 · The weak-force ratio answer abandons its own table data

[ch4ExtendedTopics.md:291](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch4ExtendedTopics.md#L291) (problem 1)

The solution starts with relative strengths strong = 1, electromagnetic = 10⁻², and weak = 10⁻⁶, correctly deriving weak/strong = **10⁻⁶** and weak/electromagnetic = **10⁻⁴**. It then replaces those by **10⁻¹³** and **10⁻¹¹** with an unsupported reference to a “specific comparison.” Use the stated table’s ratios consistently. The subsequent gravitational/weak exercise also uses 10⁻⁶, making the answer key internally inconsistent by seven orders of magnitude. Real scale dependence does not justify silently changing the supplied comparison.

## Chapter 5

### E25 · P2 · The climbing solution measures the leg angle from the wrong axis

[ch5Friction.md:1605](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Friction.md#L1605) (problem 17)

Figure 8 shows the legs **15° above horizontal**, with the rope 31° from vertical. The solution interchanges sine and cosine for the leg-force components and reports μₛ = 3.73. With horizontal force balance F_leg cos15° = T sin31° and vertical balance T cos31° + F_leg sin15° = 52g, the answers are **T = 512 N**, **F_leg = 273 N**, and **μₛ,min = tan15° = 0.268**. Correct both parts and the discussion.

### E26 · P2 · The squirrel’s terminal-speed solution changes the prescribed coefficient

[ch5DragForces.md:548](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5DragForces.md#L548) (problem 3)

The question specifies the coefficient for a horizontal skydiver. Using its table value C = 1.0, the supplied mass, area, and air density give **9.88 m/s**, approximately 10 m/s. The solution initially obtains this, then invents a different C = 0.4 and an unsupported 10–25 m/s range to accommodate an unexplained 25 m/s answer. Keep the prescribed calculation. The person’s 9.9 m/s impact speed is correct. Also remove the absolute claim that the squirrel can “safely survive any fall”; the terminal-speed calculation alone does not establish that.

### E27 · P2 · The vehicle drag calculation uses “drag area” as frontal area

[ch5DragForces.md:603](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5DragForces.md#L603) (problem 4)

The stated areas are called **drag areas**, meaning the product C_d A. Multiplying them by C_d again double-counts the coefficient. With the solution’s air density 1.21 kg/m³, use F = ½ρ(C_d A)v²: the Camry values are **160 N and 327 N**, and the Hummer values **558 N and 1139 N**, at 70 and 100 km/h respectively. Alternatively, if frontal areas were intended, rename them and provide appropriate inputs. The distinction follows from the drag equation’s coefficient/area pairing; see [NASA’s explanation of reference areas](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/size-effects-on-drag/).

### E28 · P2 · The bacterium prompt omits the buoyant force used in its solution

[ch5DragForces.md:818](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5DragForces.md#L818) (problem 8)

The prompt explicitly tells students that drag equals the bacterium’s weight at terminal velocity, but the solution correctly balances drag against **weight minus buoyancy**. At density 1100 kg/m³ in water, neglecting buoyancy changes the predicted settling speed by about a factor of eleven. Rewrite the hint as 6πηrv_t = (ρ_bacterium − ρ_water)Vg. With the solution’s viscosity, the supplied answer **2.18 × 10⁻⁷ m/s** is consistent with this corrected balance.

### E29 · P2 · The wrestler’s compressed bone uses the tension modulus

[ch5Elasticity.md:805](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Elasticity.md#L805) (problem 2)

Table 1 distinguishes bone’s Young’s modulus in **compression, 9 × 10⁹ Pa**, from its tension value, 16 × 10⁹ Pa. The solution uses the tension value even though the bone shortens. Using the stated rod geometry and the compression value gives **4.48 × 10⁻⁵ m = 0.0448 mm**, rather than 0.0252 mm. The subsequent bone-shear exercise uses the separate shear-modulus column and should not be changed on this account.

### E30 · P1 · Four flexure problems apply a uniform-shear formula to bending

[ch5Elasticity.md:998](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Elasticity.md#L998) (problem 6); [ch5Elasticity.md:1211](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Elasticity.md#L1211) (problem 11); [ch5Elasticity.md:1268](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Elasticity.md#L1268) (problem 12); [ch5Elasticity.md:1467](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Elasticity.md#L1467) (problem 16)

These problems ask how a flagpole, pencil, traffic-light pole, and power-line pole bend, but their solutions substitute the full member length into **FL/(SA)**, the uniform-shear displacement formula. A long member fixed at one end and loaded transversely bends; its deflection depends on flexural rigidity and cross-sectional second moment, not just area and shear modulus. A solid circular cantilever in the small-deflection limit has bending deflection **FL³/(3EI_area)** with I_area = πr⁴/4. This is a different model, not a rounding correction. To stay within this algebra-based chapter, recast these as short blocks undergoing approximately uniform shear, or explicitly supply a bending model and its applicability limits. Retain valid axial-compression calculations separately.

### E31 · P2 · The juice-pressure solution does not answer in force per square centimeter

[ch5Elasticity.md:1328](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch5Elasticity.md#L1328) (problem 13)

The calculation obtains 3.6 × 10⁶ Pa but finishes in N/m², whereas the question explicitly asks for the force per cm². Since 1 cm² = 10⁻⁴ m², the requested result is **360 N per cm²**, or approximately **4 × 10² N/cm²** at the input precision. Include that conversion and distinguish the prevented expansion from an actual increase in volume in the bulk-modulus sign convention.

## Chapter 6

### E32 · P1 · The galactic-orbit exercise has factor-of-ten errors

[ch6SatellitesAndKeplersLaws.md:579](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch6SatellitesAndKeplersLaws.md#L579) (problem 5)

For r = 6.0 × 10⁴ light years and M = 8.0 × 10¹¹ solar masses, T = 2π√(r³/GM) gives **2.6 × 10⁸ years**, not 8.3 × 10⁷ years. For the stipulated alternative period 6.0 × 10⁷ years, M = 4π²r³/(GT²) gives **1.5 × 10¹³ solar masses**, not 1.5 × 10¹². Recompute both parts and their interpretation using consistent SI conversions. These values use the problem’s intended circular-orbit/enclosed-mass approximation.

## Chapter 7

### E33 · P1 · A roller-coaster conceptual question asserts a false final speed

[ch7GravitationalPotentialEnergy.md:319](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch7GravitationalPotentialEnergy.md#L319) (conceptual question 1)

The question says that after starting at 5 m/s uphill, turning around, and finishing 20 m below its start, the coaster’s final speed equals its **initial** speed. With negligible losses it is √(5² + 2g × 20) = **20.4 m/s**. It equals the final speed for a 5 m/s **downhill** start from the original example. Replace “the same as its initial speed” with that comparison; otherwise students are asked to explain a violation of energy conservation.

### E34 · P2 · The treadmill solution contradicts its own arithmetic

[ch7WorkEnergyAndPowerInHumans.md:550](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch7WorkEnergyAndPowerInHumans.md#L550) (problem 7)

Using the stated approximate 20 kJ per liter of oxygen gives metabolic input **666.7 W** and efficiency **100/666.7 = 0.150 = 15.0%**. The solution obtains 15.0%, then repeats the same division and declares it 0.143 = 14.3%. The latter could instead be obtained using the table’s rounded 700 W at 2.00 L/min, but cannot follow from 666.7 W. Choose and identify one consistent data source; explain the approximation if both answers are retained.

### E35 · P2 · Two landing-force solutions change a minus sign without justification

[ch7WorkEnergyAndPowerInHumans.md:664](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch7WorkEnergyAndPowerInHumans.md#L664) (problem 9); [ch7WorkEnergyAndPowerInHumans.md:749](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch7WorkEnergyAndPowerInHumans.md#L749) (problem 10)

The person-landing solution writes F_stop − mg = −KE/d, then solves as F_stop = mg + KE/d. The jogger solution similarly writes F = mg − KE/d, then substitutes a plus sign. With upward stopping-force magnitude N and downward stopping distance d, the consistent energy equation is **(mg − N)d = −KE**, hence **N = mg + KE/d**. The final positive force magnitudes are consistent with that corrected equation. Repair the derivations so students can reproduce the right answers.

### E36 · P2 · The swimmer’s drag-law inference is unsupported and internally contradictory

[ch7WorldEnergyUse.md:368](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch7WorldEnergyUse.md#L368) (problem 3)

Part (c) compares an initial resistance of 45 N with a **time-average** resistance of 62.5 N and says resistance “increased by more than double.” It did not: 62.5 < 90 N, and an average is not the final resistance. If “top velocity” means terminal speed under an 80 N thrust, the final drag would be 80 N; that also does not support the claimed greater-than-linear increase from 45 N when speed doubles. Keep the correct 0.500 m/s² initial acceleration and 62.5 N time average, and explain that these alone do not establish a drag-versus-speed law.

## Chapter 8

### E37 · P1 · The icy-intersection prompt tells students not to conserve momentum components

[ch8CollisionsOfPointMassesInTwoDimensions.md:778](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch8CollisionsOfPointMassesInTwoDimensions.md#L778) (problem 6)

The final sentence says that because both cars initially move, the equations for conservation of momentum along x and y cannot be used. Those component equations **are exactly the appropriate method**, with both initial momenta included. The supplied solution itself uses them to obtain 8.46 m/s at 33.6° south of west. Replace the prohibition with a direction to use the full component sums rather than a special case in which one object starts at rest.

### E38 · P2 · The squid solution mixes initial, final, and “average” mass

[ch8IntroductionToRocketPropulsion.md:703](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch8IntroductionToRocketPropulsion.md#L703) (problem 9)

A squid initially totaling 5.00 kg and ejecting 0.250 kg finishes at **4.75 kg**. The solution first divides fluid momentum by 5.00 kg, then divides the friction impulse by 4.75 kg while calling that an average mass. It also leaves the reference frame of the 10.0 m/s exhaust speed unspecified. For a definite simple model in which the total ejected water ends at −10.0 m/s in the initial rest frame, momentum including the 0.500 N·s external impulse gives **v = (2.50 − 0.500)/4.75 = 0.421 m/s**. If a constant speed relative to the squid is intended, use the variable-mass equation and an explicit ejection-rate history. The frictional work additionally needs a displacement/history model; do not infer it from average acceleration without stating that assumption.

### E39 · P1 · The astronaut sample solution discards part of the astronaut’s body mass

[ch8IntroductionToRocketPropulsion.md:836](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch8IntroductionToRocketPropulsion.md#L836) (problem 11)

The constructed example defines an **80 kg astronaut plus three 5 kg packages**, but its successive-throw calculation uses 80, 75, and 70 kg as the recoiling masses. The astronaut remains 80 kg; including the packages still held, the total masses are initially **95 kg**, then **90, 85, and 80 kg**. It also alternates between package speeds in an inertial frame and speeds relative to the astronaut. Define one speed convention and conserve the momentum of astronaut plus retained packages at each throw. For example, with each package/bundle leaving at 8.0 m/s relative to the astronaut immediately after the throw and negligible throwing time, simultaneous release gives **1.263 m/s** and sequential release **1.336 m/s**; the corresponding 15 m coast times are **11.9 s** and **11.2 s**. The published 10 s and 9.4 s do not follow from that sample.

## Chapter 9

### E40 · P2 · The drawbridge solution relocates its center of gravity

[ch9Stability.md:514](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch9Stability.md#L514) (problem 8)

The question links Figure 11, a braced wall; it should link **Figure 13**, the drawbridge. That figure places the bridge’s CG **1.5 m** from the hinge and cable attachment **7.5 m** from it. The car is 3.75 m from the hinge. The solution instead puts both bridge and car at L/2. With the given 2500 kg bridge and 900 kg car, the **combined cable tension is 14.5 kN**. The hinge components are **11.1 kN rightward and 24.0 kN upward**, for **26.4 kN at 65.2° above horizontal**. Replace the supplied 25.9 kN tension and 40° hinge-force direction. If individual tensions in multiple cables are wanted, state their number and load sharing.

### E41 · P2 · The nail-puller problem imports unspecified forces

[ch9SimpleMachines.md:542](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch9SimpleMachines.md#L542) (problem 5)

Figure 1 contains force and lever-arm symbols, but no numerical input or nail force. The solution silently imports **50 N and 1250 N from Problem 1**, even though this question only identifies the figure and a 2.10 kg mass. Add “Use the forces from Problem 1.” With that added premise, the supplied supporting-force calculation, 50 + 1250 + 2.10g ≈ **1321 N downward**, is valid. Without the added premise the numerical question is underdetermined.

### E42 · P2 · The kneecap direction is described with the wrong vertical sense

[ch9ForcesAndTorquesInMusclesAndJoints.md:768](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L768) (problem 3)

The stated **190° counterclockwise from +x** means **10° below −x**, whereas the answer calls it 10° above −x. From Figure 6, the tendon-force sum is approximately (−1040, −183) N, so the below-horizontal description agrees with the diagram and the 190° angle. Keep the approximately 1.1 kN magnitude and correct the verbal direction.

### E43 · P2 · The biceps solution invents an unsupported tendon angle

[ch9ForcesAndTorquesInMusclesAndJoints.md:981](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L981) (problem 6)

The solution takes the forearm to be 30° below horizontal, then assumes the tendon is 30° to the forearm and uses F_B sin30° × 0.040 m. That tendon angle is not supplied, and 0.040 m is simultaneously called a perpendicular lever arm, creating a second inconsistency. If the intended idealization retains a vertical biceps force as in Figure 1, all three moment arms acquire the same cos30° factor and **F_B remains 470 N**, not 815 N. If a changing tendon direction is intended, specify its geometry before asking for a numerical answer.

### E44 · P2 · The father-and-child solution changes a labeled lever arm

[ch9ForcesAndTorquesInMusclesAndJoints.md:1203](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L1203) (problem 9)

Figure 11 labels the quadriceps’ effective perpendicular lever arm **2.0 cm**. The solution substitutes 2.5 cm. Using the printed dimensions gives F_Q = [98(0.38) + 39.2(0.20)]/0.020 = **2254 N**, approximately **2.3 kN**, instead of 1800 N. Correct the substituted lever arm and the resulting answer.

## Chapter 10

### E45 · P1 · The angular-acceleration check confuses acceleration with angular momentum

[ch10AngularAcceleration.md:278](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10AngularAcceleration.md#L278) (check your understanding 1)

Its gymnast example says the magnitude of angular acceleration is proportional to angular velocity and moment of inertia. **L = Iω** defines angular momentum, not angular acceleration. A gymnast can have nonzero ω and zero α. Replace the example with a specified change in angular velocity over time, or state α = τ_net/I for a fixed axis and constant I, and use the chosen axis/sign convention to describe direction.

### E46 · P2 · The kinetic-energy check incorrectly restricts translation to a straight path

[ch10RotationalKineticEnergy.md:516](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10RotationalKineticEnergy.md#L516) (check your understanding 1)

The answer calls straight-line motion the only distinction between translational and rotational kinetic energy. Center-of-mass kinetic energy **½Mv_CM²** applies whether that path is straight or curved. Explain the distinction using motion of the center of mass versus rotation about it; a rolling bicycle wheel can have both. The example of a stationary bicycle with its lifted wheel spinning remains suitable.

### E47 · P2 · The rolling-versus-sliding question makes both ramps frictionless

[ch10DynamicsOfRotationalMotion.md:392](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10DynamicsOfRotationalMotion.md#L392) (conceptual question 5)

A ball initially rolling onto a frictionless incline receives no torque about its center from gravity or the normal force. Its spin remains unchanged, its translation slows, and rolling without slipping is not maintained. As written, the frictionless sliding and initially spinning cases reach the same height for the same initial translational speed. If the intended comparison converts rotational energy into height, make the **second incline rough enough for rolling without slipping**, with negligible rolling resistance; then it reaches a greater height. Distinguish negligible dissipation from zero static friction.

### E48 · P2 · Two muscle-work solutions report net work as work done by the person

[ch10RotationalKineticEnergy.md:1105](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10RotationalKineticEnergy.md#L1105) (problem 9); [ch10RotationalKineticEnergy.md:1185](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10RotationalKineticEnergy.md#L1185) (problem 10)

The lower-leg solution uses net torque times angle to report 6.11 J as muscle work; the biceps solution similarly reports 10.8 J. For the stated constant muscle torques, muscle work is **45.0 × (20π/180) = 15.7 J** and **15.0 × (60π/180) = 15.7 J**, respectively. Net work is the kinetic-energy change and excludes the energy transferred against gravity, so it cannot simultaneously be described as paying for both lifting and acceleration. The acceleration parts also need a starting orientation or a stated constant opposing-torque approximation: the gravitational moment changes as the limb rotates, and the lower leg/forearm’s own gravitational torque is unspecified. In the biceps question, clarify whether 750 N is an applied muscle force or an already net effective force before subtracting any load torque.

### E49 · P2 · The flywheel “unreasonable results” conclusion is not established

[ch10DynamicsOfRotationalMotion.md:1088](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10DynamicsOfRotationalMotion.md#L1088) (problem 12)

The required speed, approximately **1.84 × 10³ rad/s (17,500 rpm)**, follows from the energy calculation. But neither that rpm nor the large centripetal acceleration proves that the flywheel must fail. No material strength or stress limit is supplied. [NASA describes an energy-storage flywheel tested at 60,000 rpm](https://ntrs.nasa.gov/api/citations/20010048403/downloads/20010048403.pdf), illustrating why rpm alone is not a failure criterion; it does not establish the suitability of this particular disk. Either supply a material/rim-speed constraint that makes this exercise inconsistent or ask students to discuss engineering requirements rather than declare the premise physically impossible.

### E50 · P2 · The softball problem cannot determine muscle force from the supplied data

[ch10RotationalKineticEnergy.md:1454](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10RotationalKineticEnergy.md#L1454) (problem 14)

Part (a)’s arm energy, about **1.49 kJ**, is consistent with the given speed and inertia. Part (b) lacks the acceleration time or angular displacement/history needed to determine torque and force. The solution invents a π-radian acceleration interval, arm mass, center-of-mass location, and mean orientation, obtains roughly 12,000 N, then jumps to **25,200 N** without a derivation. Add the required motion data and a gravity approximation, or identify part (b) as underdetermined. If an angle is supplied, include the ball’s kinetic energy separately from the arm’s energy when finding total muscle work.

### E51 · P2 · The freely moving disk-and-stick solution has the wrong angular velocity

[ch10CollisionsOfExtendedBodiesInTwoDimensions.md:621](https://github.com/veillette/physics-book/blob/a71ed2c3ae5b31d0e8f0da57404286c23a4dcc93/contents/ch10CollisionsOfExtendedBodiesInTwoDimensions.md#L621) (problem 4)

For M_stick = 2.00 kg, length 1.20 m, disk mass 0.0500 kg, speed 30.0 m/s, and impact at the end, the combined CG is **0.614634 m** from the original nail. Treating the small disk as a point mass gives **I_CM = 0.257561 kg·m²** and **L_CM = 0.878049 kg·m²/s**, hence **ω = 3.41 rad/s**, not 1.70 rad/s. The reported translation speed 0.732 m/s and final energy 2.04 J agree with the corrected 3.41 rad/s result, so preserve those and replace the angular-velocity assertion and its comparison to the nailed-stick example.

## Additional presentation, precision, and modeling notes

These are separate from the substantive finding count.

- **Escaped subscript notation:** the question blocks contain **267 instances of `\_` inside display-math delimiters, across 97 blocks in 27 files**. For example, `v\_f` and `F\_{avg}` produce literal underscores instead of the intended subscripts in TeX. Correct the math tokens in context; do not globally replace escaped underscores in ordinary prose, URLs, or code. This inventory is a source-level count, not a browser-rendering test.
- **Uncertainty rounding:** [Accuracy, Precision, and Significant Figures](../contents/ch1AccuracyPrecisionAndSignificantFigures.md), problems 14, 15, and 18, coarsen uncertainty bounds or offer coarser intervals as if they were equivalent precision. For the box in problem 15, the unrounded conservative propagation gives V = 11.07 cm³ and δV = **0.5385 cm³**; retain guard digits and then report an explicitly chosen rounding convention, such as approximately 11.1 ± 0.5 cm³ (or round the uncertainty upward if that is the book’s convention). The piston problem’s **143.6 ± 0.1 cm³** and **144 ± 1 cm³** are different uncertainty intervals, not interchangeable three/four-significant-figure forms of the same bound. The marathon-speed alternatives similarly inflate the uncertainty from 0.003 to 0.01 m/s. State when precision is deliberately discarded.
- **Repeated/mislabeled items:** the significant-figure check lists two items as “(d)” although the solution calls the last one “(e).” In [Dynamics of Rotational Motion](../contents/ch10DynamicsOfRotationalMotion.md), problems 9 and 10 repeat the same rod-inertia proof. Several local links, including `#problem` and `#exercise`, fail to identify the intended earlier question clearly; give repeated-use questions stable specific anchors.
- **Arms beginning at the axis versus at the torso:** the skater-inertia and ball-catching models in [Dynamics of Rotational Motion](../contents/ch10DynamicsOfRotationalMotion.md), problem 2, and [Collisions of Extended Bodies](../contents/ch10CollisionsOfExtendedBodiesInTwoDimensions.md), the untyped “0.250-kg ball” problem, use arm rods rotated about their ends as though those ends lie on the body axis. That is a recognizable simplified model, but the wording also says the arms extend from a cylinder of nonzero radius. Explicitly say whether torso-radius offsets are neglected. Including the 0.110 m offset in the skater model changes the extended-arm inertia from 2.34 to **3.18 kg·m²**. Do not mix those two geometries within a solution.
- **Useful power versus engine power:** in [Power](../contents/ch7Power.md), problem 12, E/900 s = **24.8 MW** is the rate of increase of the plane’s mechanical energy. Calling it the actual engine output does not follow when drag is present. State whether part (b) asks for useful power, and whether part (c) intentionally uses a new engine output of 24.8 MW or retains the original 100 MW. The supplied 50 kN resistance follows only from the former interpretation.
- **Reduction factor wording:** in [Power](../contents/ch7Power.md), problem 1, present the pulsar’s output as **2 × 10⁻¹⁰ of the peak**, or a **decrease by a factor of 5 × 10⁹**. The current wording “declined by a factor of 2 × 10⁻¹⁰” reverses the usual reduction-factor convention.

## Verification notes

Independent calculations used g = 9.80 m/s² unless the question specified otherwise. In particular:

- Graph readings used the actual image axes and plotted vertices, not the image alt text. The city-map counts used the stated 120 m block size. The bridge calculation used its labeled 1.5 m CG and 7.5 m cable lever arms.
- Projectile calculations used ground-frame horizontal/vertical components, retained both inverse-trigonometric roots where applicable, and retained the specified height origin.
- Rebound compression estimates are explicitly conditional on the added constant-acceleration model; they are not claimed as uniquely inferable from the original contact-time data.
- Orbital calculations converted light years and years to SI before applying Kepler’s circular-orbit relation. The exercise’s fixed enclosed galactic mass was accepted as its intended approximation.
- The free-stick calculation conserved linear momentum and angular momentum about the combined center of mass, then cross-checked the final translational plus rotational energy.

This review did not modify application code or textbook content. A site build or link-linter pass would not validate the physics in these exercises and was not used as evidence of correctness.
