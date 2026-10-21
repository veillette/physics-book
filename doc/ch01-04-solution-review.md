# Chapters 1–4 exercise-solution review

Reviewed 2026-10-21 against commit `5b481da5` and the clean working-tree content at the start of this review.

All **332 exercise solutions** were read against their questions: **226 end-of-section problems** and **106 conceptual/check-your-understanding exercises** across **24 sections**. This review records **30 grouped findings** (16 P2, 14 P3) affecting **54 distinct exercises**. The remaining **278** have no issue identified in this review. All exercises have a solution block; presence does not establish correctness.

## Resolution pass — 2026-10-21

All **30 findings have been addressed**, with corrections to **54 exercises across 18 source files**. There are **no open findings** in this review. The other 278 exercises retain their original `no_issue_identified` status.

The corrections follow the author’s instruction to keep this an introductory textbook. Standard idealizations remain, with brief assumptions where needed. Useful approximations such as the roughly 3.2 m/s² graph estimate, the 91.4 m football-field conversion, and the −6.1 m/s formal braking result were retained with appropriate explanations. No advanced treatment of orbital mechanics, cosmology, or biomechanics was added.

The table below records the disposition of each finding. The detailed findings later in this document describe the **original reviewed text**, retained as review history; they are not a list of remaining defects.

| Finding | Status   | Resolution                                                                                                                                                                                       |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R01     | Resolved | Stated the constant-force approximation used to estimate the sprinter’s distance.                                                                                                                |
| R02     | Resolved | Kept the approximately 3.2 m/s² estimate, using a centered interval and explaining the graph’s piecewise-linear approximation.                                                                   |
| R03     | Resolved | Stated that the wagon is moving toward the stronger push, so the friction direction is explicit.                                                                                                 |
| R04     | Resolved | Distinguished being above the release point from moving upward.                                                                                                                                  |
| R05     | Resolved | Kept the wind velocity fixed when the bird turns and stated the signed return velocity.                                                                                                          |
| R06     | Resolved | Corrected vertical displacement and velocity signs; used velocity magnitude for the impact angle.                                                                                                |
| R07     | Resolved | Explained the trip average through total displacement and time without the incorrect comparison.                                                                                                 |
| R08     | Resolved | Removed the claim that a balancing pole reduces tightrope tension.                                                                                                                               |
| R09     | Resolved | Converted the figure’s Hubble constant consistently and described the result as an illustrative extrapolation.                                                                                   |
| R10     | Resolved | Explicitly neglected Earth’s rotation and used a common nonrotating reference frame.                                                                                                             |
| R11     | Resolved | Kept airspeed distinct from ground speed and tied the unreasonable result to the required wind.                                                                                                  |
| R12     | Resolved | Kept the stopping-distance physics and removed unsupported injury, survival, and treatment-safety conclusions.                                                                                   |
| R13     | Resolved | Removed the obsolete spacecraft-speed superlative and limited radar/laser ranging to Solar System examples.                                                                                      |
| R14     | Resolved | Replaced “only inside nuclei” with a short-range explanation and the example of free-neutron decay.                                                                                              |
| R15     | Resolved | Limited the fission explanation to suitable very heavy nuclei and deferred binding-energy detail to later chapters.                                                                              |
| R16     | Resolved | Restricted the gravity approximation to interactions among nuclear constituents.                                                                                                                 |
| R17     | Resolved | Added “on average” to descriptions of the cheetah’s and missile’s speed changes.                                                                                                                 |
| R18     | Resolved | Recalculated the flagged results with guard digits. Retained −6.1 m/s as adequate rounding; used 27 m and 36 m for the arrow heights. Also corrected the mortar acceleration to 2.40 × 10³ m/s². |
| R19     | Resolved | Carried unrounded conversion factors, times, and tensions through the final step; simplified repetitive calculations.                                                                            |
| R20     | Resolved | Corrected the instructions for obtaining each closing vector by negating the component sum.                                                                                                      |
| R21     | Resolved | Corrected the cyclist’s position, the three-block westward path, and the wind’s “from” direction.                                                                                                |
| R22     | Resolved | Corrected the launch-speed unit from seconds to meters per second.                                                                                                                               |
| R23     | Resolved | Aligned the vector-figure alt text with its 20° west-of-north direction.                                                                                                                         |
| R24     | Resolved | Explained cubic meters, liters, and milliliters through powers of ten.                                                                                                                           |
| R25     | Resolved | Retained 91.4 m as a useful approximation and removed the incorrect significant-figure justification.                                                                                            |
| R26     | Resolved | Described the long-jump comparison as an estimate of scale, rather than validation of the launch assumptions.                                                                                    |
| R27     | Resolved | Clarified which object or system each force sum refers to and distinguished contact force from net force.                                                                                        |
| R28     | Resolved | Kept the constant-friction explanation without the unsupported claim about power at higher speeds.                                                                                               |
| R29     | Resolved | Added sources and context to the eyeglass research answer; removed the universal elevator-cable safety-factor claim.                                                                             |
| R30     | Resolved | Specified that the calibration mass hangs at rest.                                                                                                                                               |

## Scope and method

Each exercise was checked for whether the solution answers the question and its parts, uses a suitable physical model, handles units and signs consistently, and supports its final answer with the stated reasoning. Numerical work was checked by direct substitution and targeted independent recalculation. Selected figures were inspected where their geometry or slopes determined the answer, including the Chapter 2 motion graphs, Chapter 3 vector diagrams, and Chapter 4 force diagrams. This was a source review, not an exhaustive rendered-page or empirical-literature audit.

`P1`, `P2`, etc. identify end-of-section problems in order **within each source file**. `C1`, `C2`, etc. independently identify the other exercise blocks in that file. Thus exercise P2 is different from the **P2 priority** used below. Source links and the ledger’s `source_line` identify the exercise openings after the corrections. The ledger’s `reviewed_source_line` preserves the original review location.

Priority **P2** means a physical misconception, incorrect reasoning, unsupported substantive conclusion, or missing assumption affecting interpretation. **P3** means a smaller numerical, notation, wording, precision, or sourcing correction. No P1 finding was assigned. Multiple related occurrences share one finding ID; the count of findings is not a count of erroneous final answers.

The [exercise ledger](ch01-04-solution-review.csv) contains one row per exercise, current and original source lines, question excerpt, review status, finding IDs, review notes, and resolution. The 54 corrected exercises are marked `resolved`. `no_issue_identified` records the result of this review, not a proof that every sentence is error-free.

| Chapter   | Sections with exercises | Problems | Other exercises | Total reviewed | Exercises with findings |
| --------- | ----------------------: | -------: | --------------: | -------------: | ----------------------: |
| 1         |                       4 |       36 |              19 |             55 |                       4 |
| 2         |                       8 |       66 |              38 |            104 |                      14 |
| 3         |                       4 |       70 |              21 |             91 |                      19 |
| 4         |                       8 |       54 |              28 |             82 |                      17 |
| **Total** |                  **24** |  **226** |         **106** |        **332** |                  **54** |

## Original substantive findings

### R01 [P2] Average force does not determine the sprinter’s distance

Affected: [ch4FurtherApplicationsOfNewtonsLawsOfMotion P5 (line 844)](../contents/ch4FurtherApplicationsOfNewtonsLawsOfMotion.md#L844).

The given **average** force of 650 N over 0.800 s determines the final speed, 7.43 m/s, through impulse. It does not determine distance. The solution substitutes the average acceleration into `x = ½at²` without stating a constant-force assumption, then presents 2.97 m as uniquely determined.

Add the assumption that the horizontal net force is constant, or label 2.97 m as an estimate under that model. A concrete counterexample: a force rising linearly from 0 to 1300 N gives the same average force and final speed but a displacement of 1.98 m; the reversed force history gives 3.96 m. This is a missing physical assumption, not a rounding issue.

### R02 [P2] A corner in a velocity graph has no unique instantaneous acceleration

Affected: [ch2GraphicalAnalysisOfOneDimensionalMotion P4 (line 767)](../contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L767).

At `t = 10 s`, Figure 17 is a polyline with velocity 165 m/s at 0 s, 210 m/s at 10 s, and 228 m/s at 20 s. Its left and right slopes are respectively **4.5 and 1.8 m/s²**. The solution acknowledges the corner but calls their average a tangent slope and reports **3.2 m/s²** as the instantaneous acceleration.

For the literal graph, the derivative is undefined at the corner. The value 3.15 m/s² is the centered secant slope over 0–20 s. Either identify it explicitly as an estimate based on an assumed smooth underlying curve, or supply a smooth curve and an actual tangent. The SVG geometry was checked directly in `resources/Figure_02_08_17.svg`.

### R03 [P2] The net push does not establish the wagon’s direction of motion

Affected: [ch4NewtonsSecondLawOfMotion P9 (line 1222)](../contents/ch4NewtonsSecondLawOfMotion.md#L1222).

The free-body-diagram explanation says motion is along +x **because** the net push is rightward, then places friction along −x. Force determines acceleration, not the current direction of velocity. The problem gives no initial velocity.

State the intended assumption: the wagon is moving toward the 90-N push, or friction resists impending motion in that direction. The printed 0.130 m/s² and zero acceleration then follow. If it is already sliding the other way, kinetic friction points right and the respective accelerations would instead be `(90 − 75 + 12)/23 = 1.17 m/s²` and `(90 − 75 + 15)/23 = 1.30 m/s²`.

### R04 [P2] The arrow is above its launch point but moving downward

Affected: [ch3ProjectileMotion P10 (line 1565)](../contents/ch3ProjectileMotion.md#L1565).

The discussion correctly identifies a negative impact vertical velocity, then explains the lower impact speed by saying the arrow is “still moving upward relative to its launch point.” These statements conflict. At 4.0 s, `v_y = 30 sin(60°) − 9.80(4.0) = −13.219 m/s`.

Replace that phrase with **“still above its launch point.”** The reduced speed follows from the higher elevation; it does not imply upward motion. The cliff-height rounding issue is separately recorded in R18.

### R05 [P2] The wind does not reverse when the bird turns around

Affected: [ch3AdditionOfVelocities P2 (line 759)](../contents/ch3AdditionOfVelocities.md#L759).

The solution fixes +x along the outbound trip, then says that every velocity reverses sign on the return. The wind remains **−4 m/s** in that coordinate system. The bird’s velocity relative to the air changes from +9 to −9 m/s, making the return ground velocity −13 m/s. The final travel-time calculation uses the intended magnitudes, but the stated sign rule would produce a different result. Correct the explanation and retain the fixed wind vector.

### R06 [P2] Two falling-object derivations violate their stated positive direction

Affected: [ch3ProjectileMotion P16 (line 2121)](../contents/ch3ProjectileMotion.md#L2121); [ch3AdditionOfVelocities P4 (line 924)](../contents/ch3AdditionOfVelocities.md#L924).

In the projectile exercise, +y is upward but the impact component is written as `v_y = +√(2gh) = 9.90 m/s`, accompanied by “downward”; the final vector later uses −9.90 m/s. Write `v_y = −√(2gh)`, or label the positive value `|v_y|`.

In the walking-and-dropping-a-ball exercise, +y is upward but the fall is calculated with `y = +½gt²` and `y = +1.50 m`. Use `Δy = −1.50 m = −½gt²`, or introduce a separate positive drop distance `h`. The time and horizontal-distance magnitudes can remain.

### R07 [P2] The comparison of weighted and unweighted velocities is reversed

Affected: [ch2TimeVelocityAndSpeed P10 (line 938)](../contents/ch2TimeVelocityAndSpeed.md#L938).

The final average velocity **3.49 m/s** is correct, but the discussion says it is less than the average of the three interval velocities. Their arithmetic mean is `(6.00 − 3/1.75 + 21/5.20)/3 = 2.7747 m/s`, which is smaller.

Explain that total displacement divided by total time is the **time-weighted** mean. The longest interval’s velocity, 4.04 m/s, is above the unweighted mean, so greater weight on it raises the average here.

### R08 [P2] A balancing pole does not justify reduced tightrope tension

Affected: [ch4NormalTensionAndOtherExamplesOfForces P5 (line 930)](../contents/ch4NormalTensionAndOtherExamplesOfForces.md#L930).

The discussion says tightrope walkers use long poles to increase the sag angle and reduce cable tension. That conclusion does not follow from `T = W/(2 sin θ)`: adding a pole also adds load, and the resulting sag depends on the cable and supports. At fixed angle, a heavier load **increases** tension.

Remove the claimed tension-reduction explanation. Keep the conclusion actually established by the exercise: for a fixed supported weight, smaller sag angles require larger tension. Any discussion of a pole’s balancing function should be treated separately.

### R09 [P2] The Hubble-constant discussion conflates different input values with different units

Affected: [ch3AdditionOfVelocities P13 (line 1776)](../contents/ch3AdditionOfVelocities.md#L1776).

The figure’s data give about **14.9 km/s/Mly** and a constant-velocity extrapolation of about **20.2 billion years**. These are consistent with each other. Using the solution’s own conversion, `1 Mpc ≈ 3.26 Mly`, that Hubble constant is **48.6 km/s/Mpc**, not 70.

The discussion must distinguish the toy data from the separately quoted observational value. Changing from Mly to Mpc does not change the physical estimate. Also explain that `1/H` is an extrapolation timescale; attributing the entire numerical difference from a quoted cosmological age to a nonconstant expansion history overlooks the different value of H used here.

### R10 [P2] The orbital rendezvous comparison mixes reference frames

Affected: [ch3AdditionOfVelocities P17 (line 2150)](../contents/ch3AdditionOfVelocities.md#L2150).

Part (c) calls the supplies stationary relative to Earth’s surface at maximum height, then compares this with the astronaut’s **3.08 km/s inertial orbital speed**. A frame rotating with Earth’s surface is not the frame used by `√(GM/r)`, particularly near the geosynchronous altitude chosen in this question.

State that Earth’s rotation is neglected and perform both velocity comparisons in an Earth-centered inertial frame. Under that idealization the intended roughly 3 km/s mismatch is valid. If rotation is retained, account for the supplies’ tangential launch velocity and angular momentum; zero radial velocity at the apex is not zero total velocity. The existing warning against constant g at this height is correct.

### R11 [P2] The aircraft discussion reintroduces the airspeed/ground-speed confusion

Affected: [ch3AdditionOfVelocities P18 (line 2268)](../contents/ch3AdditionOfVelocities.md#L2268).

Part (c) now correctly says aerodynamic effects depend on airspeed. Part (d) still calls the given 280 m/s **airspeed** possible “in a strong tailwind scenario,” and describes the computed ground speed as intrinsically impossible for a commercial airplane. A tailwind changes ground speed at a given airspeed; it does not justify the airspeed itself.

Keep the argument tied to this scenario: reconciling the given airspeed, distance, direction, and time requires an extraordinary approximately 278 m/s wind. Remove the contradictory tailwind qualification and the blanket ground-speed prohibition. The vector subtraction and its numerical results are consistent to the stated precision.

### R12 [P2] Injury and treatment-safety conclusions are not established by the calculations

Affected: [ch2Acceleration P2 (line 711)](../contents/ch2Acceleration.md#L711); [ch2MotionEquationsForConstantAccelerationInOneDimension P4 (line 986)](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L986); [ch2MotionEquationsForConstantAccelerationInOneDimension P13 (line 1800)](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L1800); [ch2MotionEquationsForConstantAccelerationInOneDimension P14 (line 1924)](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L1924); [ch2MotionEquationsForConstantAccelerationInOneDimension P15 (line 1999)](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L1999); [ch4ProblemSolvingStrategies P11 (line 999)](../contents/ch4ProblemSolvingStrategies.md#L999).

Several discussions move from a calculated average acceleration or force to unsupported biological conclusions: Stapp’s average deceleration is called the limit of human tolerance; the train accelerations are said to ensure comfort and safety; the woodpecker example predicts severe injury in most animals; the padded football stop is described as survivable; the falling airman’s stopping time is called long enough for survival; and the orthodontic force is described as gentle enough to avoid damage.

These statements are not results of the kinematics or force balance. Remove them or supply appropriate evidence and the conditions under which they apply. Keep the demonstrated physics, such as a larger stopping distance reducing the acceleration in the adopted model. This finding concerns unsupported conclusions, not replacement injury thresholds or clinical advice.

### R13 [P2] Two astronomy embellishments are factually incorrect

Affected: [ch2TimeVelocityAndSpeed P1 (line 410)](../contents/ch2TimeVelocityAndSpeed.md#L410); [ch2TimeVelocityAndSpeed P9 (line 878)](../contents/ch2TimeVelocityAndSpeed.md#L878).

The Earth-orbit solution says 30 km/s is faster than any human-made vehicle. NASA reported Parker Solar Probe reaching about **430,000 mph** on December 24, 2024, well above 30 km/s. Delete the superlative or use a properly qualified comparison. [NASA’s dated report](https://science.nasa.gov/blogs/parker-solar-probe/2024/12/27/nasas-parker-solar-probe-reports-successful-closest-approach-to-sun/).

The lunar-echo solution extends radar/laser ranging to nearby stars. Nearby stellar distances are instead a standard application of **trigonometric parallax**; keep the ranging example limited to appropriate Solar System targets and introduce parallax separately if wanted. [NASA’s stellar-parallax explanation](https://science.nasa.gov/asset/hubble/stellar-parallax/). The two exercises’ calculated answers remain correct.

### R14 [P2] Short interaction range does not mean the weak force acts only inside nuclei

Affected: [ch4ExtendedTopics C1 (line 257)](../contents/ch4ExtendedTopics.md#L257); [ch4ExtendedTopics P1 (line 341)](../contents/ch4ExtendedTopics.md#L341).

Both solutions say the weak force acts only inside nuclei. Short range describes the scale of an interaction; it does not restrict it to a nuclear location. **Free neutron beta decay** is a direct counterexample outside a bound nucleus. Replace “only inside nuclei” with a statement about short range and retain beta decay as an example. The force-strength ratios calculated from the chapter’s table are correct. [NIST research on free-neutron decay](https://www.nist.gov/publications/observation-radiative-decay-mode-free-neutron).

### R15 [P2] Being heavier than iron does not guarantee energy-releasing fission

Affected: [ch4ExtendedTopics P3 (line 457)](../contents/ch4ExtendedTopics.md#L457).

The discussion claims that elements heavier than iron release energy when split. That is too broad: whether a specified split releases energy depends on the masses of its actual products, not simply on crossing iron in the periodic table.

A quantitative counterexample is `⁵⁸Ni → ²⁹Si + ²⁹Si`. Using NIST atomic masses, `m_initial − m_final = 57.93534241 − 2(28.97649466490) = −0.0176469198 u`. The negative mass difference means this split **requires** energy. This is a deduction from the tabulated masses, not a quoted reaction claim. [NIST nickel data](https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Ni), [NIST silicon data](https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Si).

Restrict the explanation to suitable heavy nuclei and binding-energy differences. The requested table-based ratio of 100 remains correct.

### R16 [P2] Do not extend the nuclear-force comparison to all quantum mechanics

Affected: [ch4ExtendedTopics P2 (line 393)](../contents/ch4ExtendedTopics.md#L393).

The requested ratios are correct, but the discussion says gravity can be completely ignored in quantum mechanics. That is a much broader conclusion than the ratios support. Gravitational effects in neutron interference provide a direct experimental counterexample. [Colella, Overhauser, and Werner’s 1975 experiment](https://www.osti.gov/biblio/4210045).

Restrict the conclusion to the question actually asked: mutual gravitational interactions among the constituents of ordinary atomic nuclei are negligible compared with nuclear and electromagnetic interactions. Do not turn that approximation into a universal statement about all quantum systems.

## Original numerical and editorial findings

### R17 [P3] Average acceleration is described as a uniform change every second

Affected: [ch2Acceleration P1 (line 664)](../contents/ch2Acceleration.md#L664); [ch2Acceleration P4 (line 850)](../contents/ch2Acceleration.md#L850).

The cheetah and missile solutions interpret their calculated average accelerations as fixed speed increases “every second.” The endpoint data establish only `Δv/Δt`. Add **“on average”** to those statements, or explicitly assume uniform acceleration. No change to the computed average accelerations is needed.

### R18 [P3] Recalculate final digits using unrounded intermediate values

Affected: [ch2FallingObjects P12 (line 1589)](../contents/ch2FallingObjects.md#L1589); [ch2FallingObjects P18 (line 2303)](../contents/ch2FallingObjects.md#L2303); [ch3VectorAdditionAndSubtractionGraphicalMethods P10 (line 1346)](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L1346); [ch3ProjectileMotion P3 (line 947)](../contents/ch3ProjectileMotion.md#L947); [ch3ProjectileMotion P6 (line 1220)](../contents/ch3ProjectileMotion.md#L1220); [ch3ProjectileMotion P10 (line 1565)](../contents/ch3ProjectileMotion.md#L1565); [ch3ProjectileMotion P20 (line 2474)](../contents/ch3ProjectileMotion.md#L2474); [ch4FurtherApplicationsOfNewtonsLawsOfMotion P8 (line 1085)](../contents/ch4FurtherApplicationsOfNewtonsLawsOfMotion.md#L1085); [ch4FurtherApplicationsOfNewtonsLawsOfMotion P11 (line 1394)](../contents/ch4FurtherApplicationsOfNewtonsLawsOfMotion.md#L1394).

These small numerical errors do not change the main method, but the printed answers do not follow at the precision claimed. Carry guard digits through the calculation, then round once. The equations below use the exercise inputs and `g = 9.80 m/s²`.

| Exercise                          | Printed result                                   | Recalculation and correction                                                                                                                                                                                                                             |
| --------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ch. 2, Falling Objects P12        | Last-second fall: 33.5 m                         | `√(2g·75.0) − g/2 = 33.440579… m` → **33.4 m**.                                                                                                                                                                                                          |
| Ch. 2, Falling Objects P18(c)     | Contact acceleration: 2.87 × 10³ m/s²            | `(√(2g·1.50) + √(2g·1.10))/0.00350 = 2875.843… m/s²` → **2.88 × 10³ m/s²**. The stated 5.11 mm compression is consistent with unrounded inputs; preserve that precision in its derivation too.                                                           |
| Ch. 3, Graphical Vectors P10      | 3.47 and 3.96 m/s                                | `6.72 sin(23°)/sin(130.5°) = 3.453041…` and `6.72 sin(26.5°)/sin(130.5°) = 3.943222…` → **3.45 and 3.94 m/s**. The printed `sin(130.5°) = 0.757` is incorrect. A graphical estimate may be coarser, but the analytic calculation must still be accurate. |
| Ch. 3, Projectile Motion P3(c)    | Impact speed: 44.7 m/s                           | `√[100²/(120/g) + 2g·60] = 44.639295… m/s` → **44.6 m/s**.                                                                                                                                                                                               |
| Ch. 3, Projectile Motion P6       | Flight time: 0.600 s                             | `θ = ½asin(7.00g/12.0²)`; `t = 2(12.0)sin θ/g = 0.6017849… s` → **0.602 s**.                                                                                                                                                                             |
| Ch. 3, Projectile Motion P10(a,b) | Cliff: 27.1 m; maximum: 36.0 m                   | `1.5 + 30 sin(60°)·4 − g·4²/2 = 27.023048… m`; maximum `1.5 + (30 sin60°)²/(2g) = 35.938775… m`. Use **27.0 and 35.9 m** if retaining one decimal, or preferably **27 and 36 m** at the input precision.                                                 |
| Ch. 3, Projectile Motion P20      | Lower launch angle: 30.3°                        | Solve with `B = gx²/(2v₀²)` and `B tan²θ − x tanθ + B + Δy = 0`, retaining `x = 4.57`, `v₀ = 8.15`, `Δy = 0.61`. Roots: **30.396954…° and 67.205902…°** → **30.4° and 67.2°**.                                                                           |
| Ch. 4, Further Applications P8(c) | Gas force: 6.00 × 10³ N                          | `2.50[(2g·110)/(2·0.450) + g] = 6013.3889… N` → **6.01 × 10³ N** if retaining three significant figures, or **6.0 × 10³ N** if treating 110 m as two.                                                                                                    |
| Ch. 4, Further Applications P11   | Stopping time: 34.8 s; formal velocity: −6.1 m/s | `(50.0/3.6)/0.400 = 34.72222… s` → **34.7 s**. The formal signed result is `50.0/3.6 − 0.400·50.0 = −6.11111… m/s` → **−6.11 m/s** at three significant figures. The conclusion that braking ceases at rest is correct.                                  |

### R19 [P3] Correct answers are sometimes reached through incompatible rounded equalities

Affected: [ch1PhysicalQuantitiesAndUnits P5 (line 675)](../contents/ch1PhysicalQuantitiesAndUnits.md#L675); [ch2MotionEquationsForConstantAccelerationInOneDimension P4 (line 986)](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L986); [ch3AdditionOfVelocities P3 (line 826)](../contents/ch3AdditionOfVelocities.md#L826); [ch4FurtherApplicationsOfNewtonsLawsOfMotion P3 (line 705)](../contents/ch4FurtherApplicationsOfNewtonsLawsOfMotion.md#L705).

The following final answers can be retained, but their derivations should display guard digits rather than an equality or approximation that the shown numbers do not support:

| Exercise                           | Problem in the displayed chain                                               | Consistent calculation                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Units P5                           | `377 ft × 12 = 4.53 × 10³ in`                                                | Use **377.315 ft**, giving 4527.78 in → 4.53 × 10³ in. Using 377 literally would give 4524 → 4.52 × 10³. The width already preserves guard digits. |
| Constant-acceleration equations P4 | `16.4 ≈ 16.5` and `−2.67 ≈ −2.68`                                            | Retain `80.0/3.6 m/s` rather than 22.2 m/s in the intermediate substitutions; the intended final values are consistent with the unrounded speed.   |
| Addition of Velocities P3          | A first subtraction gives a 4.0 m margin; the later calculation gives 4.17 m | Use `250 − 3.50(295/4.20) = 4.166666… m` throughout.                                                                                               |
| Further Applications P3            | `T₂ = 193 N ≈ 194 N`                                                         | The full equilibrium solution gives `T₁ = 736.286607… N` and `T₂ = 193.504769… N` → **194 N**. Show 193.505 before rounding.                       |

### R20 [P3] Two vector strategies negate the closing side twice in their instructions

Affected: [ch3VectorAdditionAndSubtractionAnalyticalMethods P8 (line 1119)](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L1119); [ch3VectorAdditionAndSubtractionAnalyticalMethods P10 (line 1291)](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L1291).

The strategies correctly define `C = −(A + B)` and `D = −(A + B + C)`, then tell the reader to find **−C** or **−D**. That reverses the requested closing side. Say “negate the component sum to obtain C [or D], then calculate its magnitude and direction.” The subsequent southwest-directed closing vectors and their numerical magnitudes are consistent with the intended calculation.

### R21 [P3] Correct three misleading directional descriptions

Affected: [ch2MotionEquationsForConstantAccelerationInOneDimension P19 (line 2436)](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L2436); [ch3VectorAdditionAndSubtractionGraphicalMethods P2 (line 708)](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L708); [ch3AdditionOfVelocities P9 (line 1362)](../contents/ch3AdditionOfVelocities.md#L1362).

| Exercise                            | Current description                                                          | Correction                                                                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constant-acceleration equations P19 | Rival is “5.00 m behind the finish line” at the start of the sprint          | The rival is **5.00 m ahead of the other cyclist**, hence **295 m from the finish**. This is what the calculation uses.                                 |
| Graphical Vectors P2                | The route “backtracks one block west”                                        | The illustrated route travels **three blocks west** after four east and three north. The net displacement of one block east and three north is correct. |
| Addition of Velocities P9           | A wind directed 20° south of east is described as coming from west-southwest | It comes from **20° north of west**, approximately west-northwest. Keep “toward” and “from” directions distinct.                                        |

### R22 [P3] A velocity substitution uses seconds as its unit

Affected: [ch3ProjectileMotion P5 (line 1110)](../contents/ch3ProjectileMotion.md#L1110).

The high-angle calculation writes `v₀x = 35.0 \s cos(71.6°)`. Replace `\s` with `\ms`. The quantity is an initial speed component, not a time. The resulting range and height calculations use the intended speed.

### R23 [P3] Vector-figure alt text describes the wrong angle

Affected: [ch3VectorAdditionAndSubtractionGraphicalMethods P5 (line 909)](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L909).

The alt text for `Figure_03_02_22.svg` says A makes 20° with the **positive x-axis**. The image and solution instead show A **20° west of north**, or **110° counterclockwise from +x**. Update the alt text so a reader using it receives the same geometry as a sighted reader. The displayed SVG and the solution’s sketch agree with the latter interpretation.

### R24 [P3] Distinguish the SI volume unit from the liter

Affected: [ch1PhysicalQuantitiesAndUnits C2 (line 443)](../contents/ch1PhysicalQuantitiesAndUnits.md#L443).

The answer calls the liter the derived volume unit without distinguishing it from the SI derived unit **cubic meter**. Replace the tentative wording with: volume is derived from length; `1 cm³ = 1 mL` and `1 L = 1 dm³ = 10⁻³ m³`. The liter is a non-SI unit accepted for use with SI. [NIST on volume](https://www.nist.gov/pml/owm/si-units-volume), [NIST’s accepted non-SI units](https://www.nist.gov/pml/special-publication-330/sp-330-section-4).

### R25 [P3] Exact field length does not justify a three-significant-figure limit

Affected: [ch1PhysicalQuantitiesAndUnits P4 (line 637)](../contents/ch1PhysicalQuantitiesAndUnits.md#L637).

The discussion says 91.4 m has three significant figures **because** the 100-yard length is exact. Exact inputs do not impose a significant-figure limit. With the exercise’s four-significant-figure conversion, `300/3.281 = 91.435538… m` would be reported as **91.44 m**. Either use four figures under the stated exact-length interpretation or describe 91.4 m as a deliberately coarser approximation; do not attribute the limit to exactness.

### R26 [P3] Agreement with a long-jump record does not validate the assumed launch conditions

Affected: [ch3ProjectileMotion P12 (line 1711)](../contents/ch3ProjectileMotion.md#L1711).

The ideal range estimate uses an assumed 45° launch and the supplied speed, then the discussion says its proximity to the record validates the assumptions. The comparison alone does not establish the actual takeoff angle, takeoff speed, or equality of launch and landing heights. Say the ideal calculation gives a comparable scale; reserve validation for comparison with the relevant measured conditions.

### R27 [P3] Qualify system and force descriptions

Affected: [ch4NewtonsThirdLawOfMotion C5 (line 371)](../contents/ch4NewtonsThirdLawOfMotion.md#L371); [ch4NewtonsSecondLawOfMotion P11 (line 1366)](../contents/ch4NewtonsSecondLawOfMotion.md#L1366); [ch4NewtonsSecondLawOfMotion P12 (line 1458)](../contents/ch4NewtonsSecondLawOfMotion.md#L1458).

In Third Law C5, “never cancel each other” needs **“in the force sum for either individual object.”** A third-law pair does cancel as internal forces when both objects are included in one system, as the next conceptual answer correctly explains.

In Second Law P11, Earth is listed among objects that “touch” the object because it supplies weight. Gravity is a noncontact interaction; list **interacting bodies**, separating contact and gravitational forces. In P12, the final discussion calls the upward-and-backward seat/belt force the “total force” on the passenger. It is the **contact force**; including gravity makes the net force horizontal in the stated model.

### R28 [P3] Constant friction alone does not imply a disproportionate power increase

Affected: [ch4NewtonsSecondLawOfMotion P7 (line 1090)](../contents/ch4NewtonsSecondLawOfMotion.md#L1090).

The discussion uses the constant resistance in the exercise to explain a disproportionate power requirement at higher speed. For a constant resisting force and steady motion, `P = Fv`, which is linear in speed. Increasing aerodynamic resistance can change that scaling, but it is not part of the constant-force model calculated here. Remove the claim or explicitly introduce the different drag model.

### R29 [P3] Research and engineering assertions need sources or narrower wording

Affected: [ch1AccuracyPrecisionAndSignificantFigures C5 (line 474)](../contents/ch1AccuracyPrecisionAndSignificantFigures.md#L474); [ch4ProblemSolvingStrategies P14 (line 1225)](../contents/ch4ProblemSolvingStrategies.md#L1225).

The eyeglass-prescription research answer gives numerical claims about prescription increments, lens accuracy, and distinguishing powers without identifying a source or the measurement context. Cite the research used and distinguish manufacturing tolerance, measurement repeatability, and clinical prescription increments.

The constructed elevator problem appends an uncited universal-looking cable safety factor of 10–12 and a corresponding cable rating. That number is not derived from the chosen mass and acceleration. Remove the design assertion or identify the applicable engineering reference and conditions. The idealized cable-tension calculation can stand on its own.

### R30 [P3] A hanging calibration mass supplies mg only when its acceleration is zero

Affected: [ch4DevelopmentOfForceConcept C1 (line 80)](../contents/ch4DevelopmentOfForceConcept.md#L80).

The proposed standard force uses a hanging 1-kg mass, then describes a frictionless pulley as allowing that force to be applied in any direction. Make the equilibrium condition explicit. A pulley preserves tension along an ideal massless rope, but if the hanging mass accelerates downward with acceleration a, its tension is `T = m(g − a)`, not mg. The proposed calibration is valid while the mass remains at rest or otherwise has zero acceleration.

## Section coverage

Every exercise in the following files was included. Consult the CSV for the individual row and any associated finding; this table is a coverage inventory, not a second list of issues.

| Source section                                                                                                                    | Problems | Other exercises | Total | Exercises with findings |
| --------------------------------------------------------------------------------------------------------------------------------- | -------: | --------------: | ----: | ----------------------: |
| [ch1AccuracyPrecisionAndSignificantFigures](../contents/ch1AccuracyPrecisionAndSignificantFigures.md)                             |       18 |               5 |    23 |                       1 |
| [ch1Approximation](../contents/ch1Approximation.md)                                                                               |        8 |               1 |     9 |                       0 |
| [ch1PhysicalQuantitiesAndUnits](../contents/ch1PhysicalQuantitiesAndUnits.md)                                                     |       10 |               3 |    13 |                       3 |
| [ch1PhysicsAnIntroduction](../contents/ch1PhysicsAnIntroduction.md)                                                               |        0 |              10 |    10 |                       0 |
| [ch2Acceleration](../contents/ch2Acceleration.md)                                                                                 |        4 |               6 |    10 |                       3 |
| [ch2Displacement](../contents/ch2Displacement.md)                                                                                 |        4 |               4 |     8 |                       0 |
| [ch2FallingObjects](../contents/ch2FallingObjects.md)                                                                             |       18 |               7 |    25 |                       2 |
| [ch2GraphicalAnalysisOfOneDimensionalMotion](../contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md)                           |        8 |               7 |    15 |                       1 |
| [ch2MotionEquationsForConstantAccelerationInOneDimension](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md) |       21 |               1 |    22 |                       5 |
| [ch2ProblemSolvingBasicsForOneDimensionalKinematics](../contents/ch2ProblemSolvingBasicsForOneDimensionalKinematics.md)           |        0 |               2 |     2 |                       0 |
| [ch2TimeVelocityAndSpeed](../contents/ch2TimeVelocityAndSpeed.md)                                                                 |       11 |               6 |    17 |                       3 |
| [ch2VectorsScalarsAndCoordinateSystems](../contents/ch2VectorsScalarsAndCoordinateSystems.md)                                     |        0 |               5 |     5 |                       0 |
| [ch3AdditionOfVelocities](../contents/ch3AdditionOfVelocities.md)                                                                 |       19 |               5 |    24 |                       7 |
| [ch3ProjectileMotion](../contents/ch3ProjectileMotion.md)                                                                         |       27 |               4 |    31 |                       7 |
| [ch3VectorAdditionAndSubtractionAnalyticalMethods](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md)               |       12 |               4 |    16 |                       2 |
| [ch3VectorAdditionAndSubtractionGraphicalMethods](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md)                 |       12 |               8 |    20 |                       3 |
| [ch4DevelopmentOfForceConcept](../contents/ch4DevelopmentOfForceConcept.md)                                                       |        0 |               2 |     2 |                       1 |
| [ch4ExtendedTopics](../contents/ch4ExtendedTopics.md)                                                                             |        3 |               3 |     6 |                       4 |
| [ch4FurtherApplicationsOfNewtonsLawsOfMotion](../contents/ch4FurtherApplicationsOfNewtonsLawsOfMotion.md)                         |       12 |               2 |    14 |                       4 |
| [ch4NewtonsFirstLawOfMotion](../contents/ch4NewtonsFirstLawOfMotion.md)                                                           |        0 |               3 |     3 |                       0 |
| [ch4NewtonsSecondLawOfMotion](../contents/ch4NewtonsSecondLawOfMotion.md)                                                         |       14 |              10 |    24 |                       4 |
| [ch4NewtonsThirdLawOfMotion](../contents/ch4NewtonsThirdLawOfMotion.md)                                                           |        2 |               6 |     8 |                       1 |
| [ch4NormalTensionAndOtherExamplesOfForces](../contents/ch4NormalTensionAndOtherExamplesOfForces.md)                               |        6 |               2 |     8 |                       1 |
| [ch4ProblemSolvingStrategies](../contents/ch4ProblemSolvingStrategies.md)                                                         |       17 |               0 |    17 |                       2 |

## Validation from the original review

`python3 -B find_incomplete_solutions.py --range 1-4` reports **226 problems, zero incomplete, zero without a solution**. The manual inventory additionally includes the 106 other exercise blocks. Every extracted exercise has a nonempty, closed solution block.

`python3 -B check_math.py --range 1-4` scans **29 source files** and performs **69 worked-example checks**, finding zero discrepancies at or above its 10% threshold. Its one lower-level flag is the order-of-magnitude generation estimate `70 years / 3 ≈ 25 years` in Chapter 1, outside this exercise-solution review. That checker’s worked-example coverage does not validate the 332 exercise solutions or their explanations.

The earlier [Chapters 1–10 review](ch01-10-exercise-review.md) and [solution-completion record](ch01-10-solution-completion.md) were consulted for history, then findings were evaluated against the current text. Previously corrected train-passage times, the Half Dome sound timeline, the unequal-height projectile minimum-speed derivation, astronaut recoil accounting, and the rocket’s launch-pad support explanation were not re-reported as open defects. Current diagrams and newly supplied solutions were included in the review.

The original review made no textbook changes. The resolution pass described above changes only the 54 flagged exercises and these two review artifacts; concurrent changes elsewhere were left untouched.

## Validation of the corrections

- All 332 exercise blocks retain nonempty, closed solutions. The strict completeness checker reports all 226 end-of-section problems complete.
- Independent recalculation confirms the corrected free-fall, vector, projectile, tension, and force results. Changes are confined to the 54 exercises identified by the original ledger.
- Math-delimiter validation passes for all 282 content files. The Eleventy site build succeeds.
- The full audit was attempted. Its link stage reports 142 errors and 29 warnings, including existing historical-review links to unavailable GitHub revisions. The orphan check separately flags the existing unused `assets/js/minisearch.js`; no image files are orphaned. These unrelated issues were left untouched.
- All remaining audit stages pass: figures, YAML, accessibility, content, structure, cross-references, and equations. The content and equation checks retain repository-wide warnings (8 and 229 respectively), with no errors. The arithmetic checker reports no likely worked-example errors and retains its original Chapter 1 approximation warning.
- The ledger’s 332 unique rows, all 30 finding IDs, current source locations, local report links, and whitespace were checked.
