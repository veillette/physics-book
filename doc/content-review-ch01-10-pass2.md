# Content review, second pass: Chapters 1–10

Date: 2026-10-18. This pass reviews the teaching content after the corrections in `a71ed2c3`. It covers explanations, definitions, tables, figure captions, summaries, glossaries, worked examples, and in-text notes in all 73 Chapter 1–10 files. End-of-section Conceptual Questions and Problems & Exercises were skipped. Findings already recorded in [`content-review-ch01-10.md`](./content-review-ch01-10.md) are not repeated unless a corrected passage still has a leftover instance elsewhere. Line numbers refer to `a71ed2c3`.

**Priorities.** P1: wrong physics in the main text that students will learn. P2: factual errors, misleading generalizations, internal contradictions, wrong cross-references, or data that is out of date. P3: smaller inaccuracies, imprecise wording, and history worth tightening.

**Totals.** 2 P1, 58 P2, and 40 P3 content findings (several P3 entries group related small items), plus 8 groups of markup and presentation problems.

## Corrections applied

All findings below were corrected on 2026-10-18 except the following, which were left as they are:

- C6-13: the IAU planet definition remains under "The Case for Simplicity."
- C6-13: the centripetal-force label drawn inside the Figure 2 image is unchanged. The text now explains that centripetal force is a role played by real forces.
- M-08: Estimation has no production HTML5 build, so its embed still points to the development build. Non-PhET simulations keep the "PhET Exploration" label.

Some corrections changed values used in problem solutions. These solutions were updated to match:

- C2-04: two lunar-gravity solutions in §4.3.
- C5-01: the vertebra and disc shear problems in §5.3.
- C7-13: the Crab pulsar problem in §7.7.

C7-09 replaced the world-energy pie chart (`resources/Figure_07_09_01.svg`) with a 2020 chart drawn from BP Statistical Review 2021, the source Table 1 already cites. C8-04 now embeds the HTML5 OpenLyceum Lunar Lander (`https://openlyceum.github.io/LunarLander/`).

## Fix first

1. **C5-01 (P1).** The bone shear modulus is impossible, and the text builds an explanation on it.
2. **C10-01 (P1).** The helicopter-rotor energy explanation is a misconception, repeated in the body, a caption, and the summary.
3. **M-01.** About 50 figure captions show raw LaTeX such as `( 1.67 \\mss )` instead of rendered math.
4. **C2-04, C4-04, C6-01, C6-02.** These are short, high-visibility errors: lunar _g_, a caption that swaps w⊥ and w∥, the claim that banking reduces the normal force, and an "ideal angle" glossary entry that says the angle is proportional to speed.
5. **C7-07 to C7-09.** Several world-energy statistics are out of date, and some contradict the chapter's own 2020 table.

---

## Chapter 1

### C1-01 · P2 · Newton's Mint role and "invention" of reeded coin edges are wrong

[ch1PhysicsAnIntroduction.md:137](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicsAnIntroduction.md#L137) (Figure 7 caption)

Newton became Warden (1696) and then Master (1699) of the Royal Mint. "Exchequer" is a different office. Milled, reeded edges were introduced at the Mint in the 1660s, before Newton joined. What he did was enforce anti-clipping measures during the Great Recoinage. Suggested text: "became Warden and later Master of the Royal Mint, where he pursued counterfeiters and oversaw the recoinage."

### C1-02 · P2 · Atom diameter is given as 10⁻⁹ m, ten times too large

[ch1PhysicalQuantitiesAndUnits.md:172](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicalQuantitiesAndUnits.md#L172)

"The diameter of an atom is on the order of 10⁻⁹ m" contradicts Table 3 on the same page (hydrogen atom: 10⁻¹⁰ m). Atomic diameters are about 0.1–0.5 nm. Change it to 10⁻¹⁰ m. The same 10⁻⁹ m figure for "most molecules" appears in [ch4Dynamics.md:57–58](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4Dynamics.md#L57). Small molecules are about 10⁻¹⁰–10⁻⁹ m, so state that as a range.

### C1-03 · P2 · The FY2019 U.S. deficit was below $1 trillion

[ch1Approximation.md:67](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1Approximation.md#L67)

CBO reports a FY2019 deficit of $984 billion. Either use the national debt (well over $20 trillion), or say "close to $1 trillion" and cite the year.

### C1-04 · P3 · A black radiator does not help much with engine cooling

[ch1PhysicsAnIntroduction.md:80](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicsAnIntroduction.md#L80)

Car radiators shed heat mainly by forced convection. Their color matters little at engine-coolant temperatures. Replace this with a correct example, such as "why a radiator needs airflow" or "why a white roof stays cooler."

### C1-05 · P3 · GPS passage overstates and mislabels what GPS does

[ch1PhysicsAnIntroduction.md:67–69](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicsAnIntroduction.md#L67)

GPS determines position. Driving time comes from routing software, but the Figure 2 caption says "GPS uses physics equations to determine the driving time." "Most of these calculations are founded on algorithms developed by Gladys West" also overstates her contribution. Her geodetic Earth-shape models are essential to GPS accuracy. Rephrase to credit that work specifically.

### C1-06 · P3 · Not every SI defining constant is "a constant of nature"

[ch1PhysicalQuantitiesAndUnits.md:194–195](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicalQuantitiesAndUnits.md#L194)

The candela is fixed by the luminous efficacy K_cd, a technical constant, and the second by a property of the cesium atom. Use "defined by fixing the exact numerical value of a defining constant."

### C1-07 · P3 · The SI glossary lists the liter as an SI unit

[ch1PhysicalQuantitiesAndUnits.md:933–935](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicalQuantitiesAndUnits.md#L933)

The liter is a non-SI unit accepted for use with the SI. Replace "meters, liters, and grams" with "meters, kilograms, and seconds."

### C1-08 · P3 · Uncertainty written without its unit

[ch1AccuracyPrecisionAndSignificantFigures.md:79](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1AccuracyPrecisionAndSignificantFigures.md#L79)

`11 in. ± 0.2` should be `11.0 in. ± 0.2 in.`, which also models the significant-figure rule taught on the same page.

### C1-09 · P3 · The trillion-dollar estimate rounds 1.5 down to 1

[ch1Approximation.md:135–149](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1Approximation.md#L135)

The method gives 150 in. (12.5 ft) but reports "≈ 100 in. ≈ 8 ft". It then calls the 10 ft guess "roughly correct". Keep 150 in. ≈ 12 ft. That supports the 10 ft guess more cleanly and avoids teaching a rounding error.

## Chapter 2

### C2-01 · P2 · The deceleration glossary contradicts the misconception alert

[ch2Acceleration.md:806–807](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2Acceleration.md#L806)

"Acceleration that results in a decrease in velocity" is the very misconception the section corrects at lines 78–83. A car moving left that slows down has its velocity _increase_ algebraically. Use "acceleration opposite to the velocity; it decreases the speed."

### C2-02 · P2 · v is written where v̄ is meant

[ch2MotionEquationsForConstantAccelerationInOneDimension.md:101–103](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L101)

"When acceleration is constant, _v_ is just the simple average of the initial and final velocities." Here _v_ is the final velocity in the section's own notation. It should be v̄.

### C2-03 · P2 · Jet-car location and land-speed record are inconsistent and inaccurate

[ch2GraphicalAnalysisOfOneDimensionalMotion.md:48, 50, 139](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L48)

The text places the car on "a dry lake bed in Nevada", but the Figure 2 caption says Bonneville Salt Flats, which are in Utah. Pick one. The 1997 ThrustSSC record is 763 mi/h (1228 km/h, 341 m/s), not "343 m/s (1234 km/h or 766 mi/h)".

### C2-04 · P2 · Lunar _g_ is 1.62 m/s², not 1.67

[ch2FallingObjects.md:30](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2FallingObjects.md#L30); [ch4NewtonsSecondLawOfMotion.md:218, 260](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NewtonsSecondLawOfMotion.md#L218)

The surface gravity of the Moon is 1.62 m/s². This also changes "only about 1.7 N on the Moon" to 1.6 N. Two Chapter 4 problem solutions (lines 1314 and 1371) use the same value and need the same change.

### C2-05 · P2 · Captions confuse position with displacement and drop a sign

[ch2Displacement.md:71, 75](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2Displacement.md#L71); [ch2Acceleration.md:168](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2Acceleration.md#L168)

Figure 2 says "Her _position_ … is given by Δx", and Figure 3 says "His _location_ … is given by x_f − x₀". Both expressions are displacement. The subway-train caption gives "Δx′ = 1.5 km" for leftward motion. It should be −1.5 km, matching Example 2.

### C2-06 · P3 · "Correlations imply physical relationships"

[ch2GraphicalAnalysisOfOneDimensionalMotion.md:260](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L260)

Use "suggest", which fits the next sentence's call for further experiments.

### C2-07 · P3 · "An unknown squared always gives two solutions"

[ch2MotionEquationsForConstantAccelerationInOneDimension.md:700](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L700)

A quadratic can have a repeated root or no real root. Use "can have two solutions."

## Chapter 3

### C3-01 · P2 · Leftover from C12: resolving into components is attributed to independence

[ch3KinematicsInTwoDimensionsAnIntroduction.md:128–129](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3KinematicsInTwoDimensionsAnIntroduction.md#L128)

"Resolving two-dimensional motion into perpendicular components is possible because the components are independent." Any vector can be resolved. Independence is what lets the component motions be _solved separately_, and only for suitable force laws. The boxed note and summary were fixed, but this sentence was missed.

### C3-02 · P2 · The component formulas never state where θ is measured from

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md:60–74](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L60); [ch3AdditionOfVelocities.md:263–269](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3AdditionOfVelocities.md#L263)

A_x = A cos θ gives correctly signed components only when θ is measured counterclockwise from +x. The chapter's examples use "68° south of east" and similar. Add one sentence stating the convention. The wind example then shows the problem: tan⁻¹(−9.29/−13.0) is reported as "θ = 35.6°" with no direction. Both components are negative, so the wind blows 35.6° south of west (215.6°), which the new quadrant warning in §3.3 requires.

### C3-03 · P2 · Wrong cross-reference for falling objects

[ch3ProjectileMotion.md:20](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L20)

The link points to _Problem-Solving Basics for One-Dimensional Kinematics_. Falling objects are covered in [Falling Objects](../contents/ch2FallingObjects.md).

### C3-04 · P2 · Eruption style depends on the magma, not on how active the volcano is

[ch3ProjectileMotion.md:345–346](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L345)

"Very active volcanoes characteristically eject red-hot rocks and lava rather than smoke and ash" is false. Low-viscosity basaltic magma such as Kīlauea's erupts effusively, while silica-rich magma erupts explosively, whatever the eruption frequency. Also qualify "the world's most continuously active volcano."

### C3-05 · P2 · Galilean relativity needs constant velocity, not just negligible air resistance

[ch3AdditionOfVelocities.md:310–314, 420–424](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3AdditionOfVelocities.md#L310)

The binoculars land at the base of the mast only if the ship moves at constant velocity during the fall. The coin falls straight down in the plane only if the plane is unaccelerated, not merely "flying horizontally." Add "moving at constant velocity" in both places.

### C3-06 · P2 · Leftover from C04: classical relativity still has a hard 1%-of-c cutoff

[ch3AdditionOfVelocities.md:304–307](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3AdditionOfVelocities.md#L304); summary at 494–495; glossary at 2267–2269

Chapter 1 now presents 1% of c as a rough guideline. This section, its summary, and its glossary still say classical relativity "is limited to" speeds below 3000 km/s. Use the Chapter 1 wording.

### C3-07 · P2 · Alan Shepard's name, and the golf-ball distance

[ch3ProjectileMotion.md:517–518](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L517)

The name is spelled Shepard. Image analysis published in 2021 puts his two drives at roughly 24 and 40 yards, not "a great distance." Keep the physics point (lower _g_ increases range) and drop the exaggeration.

### C3-08 · P3 · Projectile notation: the text promises s_x and s_y, then uses x and y

[ch3ProjectileMotion.md:44–45](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L44)

The text says "we will simply represent the component vectors as s_x and s_y", but Step 1 and every equation use _x_ and _y_.

### C3-09 · P3 · Initial speed is labeled v₀y

[ch3ProjectileMotion.md:214](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L214)

"where v₀y is the initial velocity of 70.0 m/s" should be v₀. Line 420 likewise calls the impact angle θ₀ instead of θ_v.

### C3-10 · P3 · Figure 1 caption repeats a garbled fragment

[ch3ProjectileMotion.md:85](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L85)

"…along the horizontal and vertical axes. Its magnitude ( x ) and ( y ) along the horizontal and vertical axes. Its magnitude is…". Delete the duplicated fragment.

### C3-11 · P3 · Range is defined two ways

[ch3ProjectileMotion.md:492–493](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3ProjectileMotion.md#L492) vs. summary at 643 and glossary at 3183

The body defines range as the horizontal distance on level ground. The summary and glossary call it "the _maximum_ horizontal distance," which students confuse with the 45° maximum range.

### C3-12 · P3 · "Energy is stored as increased mass"

[ch3AdditionOfVelocities.md:447](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3AdditionOfVelocities.md#L447)

This relies on the deprecated relativistic-mass idea. Use "mass and energy are equivalent (E = mc²)."

### C3-13 · P3 · The "Ladybug Motion 2D" embeds load a different simulation

[ch3KinematicsInTwoDimensionsAnIntroduction.md:150](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3KinematicsInTwoDimensionsAnIntroduction.md#L150); [ch6CentripetalAcceleration.md:209](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalAcceleration.md#L209)

Both use `?simulation=motion-2d`, which is _Motion in 2D_. That is the simulation §3.5 embeds and describes as the older version. Use `simulation=ladybug-motion-2d`, or retitle the notes.

### C3-14 · P3 · Vector-addition alt text disagrees with the figure

[ch3VectorAdditionAndSubtractionGraphicalMethods.md:142, 152, 168](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L142)

The images and text show R = 50.8 m at 5.47°. The alt text still says "fifty point zero meters … seven degrees," which misleads screen-reader users.

## Chapter 4

### C4-01 · P2 · "Forces cause objects to move" is the Aristotelian view

[ch4DevelopmentOfForceConcept.md:13](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4DevelopmentOfForceConcept.md#L13)

"Dynamics is the study of the forces that cause objects and systems to move" contradicts the first law taught two pages later. A conceptual question in §4.3 also asks students to reject "net force causes motion." Use "…that cause changes in motion," which matches the summary at line 72.

### C4-02 · P2 · Mass is no longer measured against a standard kilogram artifact

[ch4NewtonsFirstLawOfMotion.md:84–85](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NewtonsFirstLawOfMotion.md#L84)

This contradicts §1.2, which explains the 2019 redefinition through Planck's constant. Use "by comparison with standards traceable to the SI definition of the kilogram."

### C4-03 · P2 · The friction glossary entry is garbled

[ch4NewtonsSecondLawOfMotion.md:1437–1439](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NewtonsSecondLawOfMotion.md#L1437)

"A force past each other of objects that are touching; examples include rough surfaces and air resistance." The verb is missing, and a rough surface is not a force. Suggested: "a force that opposes the relative motion, or attempted motion, of surfaces in contact."

### C4-04 · P2 · The skier caption swaps w⊥ and w∥

[ch4NormalTensionAndOtherExamplesOfForces.md:81](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NormalTensionAndOtherExamplesOfForces.md#L81)

"N is equal in magnitude to w∥ so that there is no motion perpendicular to the slope" should say w⊥. The matching caption in §5.1 is correct.

### C4-05 · P2 · The LHC passage is out of date and mixes tenses

[ch4ExtendedTopics.md:186–191, 197](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4ExtendedTopics.md#L186)

"As of this writing, scientists … in Switzerland are starting to test these theories … An energy of 14 trillion electron volts will be available," followed by the 2012 Higgs discovery. CERN straddles the France–Switzerland border. Run 3 operates at 13.6 TeV, and 14 TeV has not yet been reached. The caption's "detectors will analyze … began preliminary operation in 2008" is also out of date. Rewrite in the present tense.

### C4-06 · P2 · Sagittarius A* is 4 million solar _masses_, not "times the size of our Sun"

[ch4ExtendedTopics.md:236](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4ExtendedTopics.md#L236)

Change "size" to "mass".

### C4-07 · P2 · The carrier-particle glossary defines the wrong thing

[ch4ExtendedTopics.md:485–487](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4ExtendedTopics.md#L485)

"A fundamental particle … that is surrounded by a characteristic force field" describes a source of a field. A carrier particle is the one _exchanged_ to transmit an interaction (photon, gluon, W/Z), as the section explains.

### C4-08 · P3 · The first law is presented as frame-independent

[ch4NewtonsFirstLawOfMotion.md:55–58](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NewtonsFirstLawOfMotion.md#L55)

"Completely general" needs "in an inertial frame of reference." §4.5 and §6.4 build on that distinction.

### C4-09 · P3 · Historical caricatures

[ch4Dynamics.md:50–52](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4Dynamics.md#L50); [ch4NewtonsFirstLawOfMotion.md:63–67](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NewtonsFirstLawOfMotion.md#L63)

Newton did not work "alone, without the benefit of the usual interactions." He corresponded with Hooke, Halley, Flamsteed, and others, and the _Principia_ was prompted by Halley. The "nature of the beast" line misrepresents Aristotle, whose physics was built on causes. Soften both.

### C4-10 · P3 · Gravitational-wave wording is out of date

[ch4ExtendedTopics.md:202–217](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4ExtendedTopics.md#L202)

"The search … has been going on" and "Almost 100 years ago" read as pre-2015. "Gravity waves" is a different, fluid-dynamics phenomenon, so use "gravitational waves." TAMA300 has been superseded by KAGRA, which the next paragraph already names.

### C4-11 · P3 · Suspension-bridge cables are not loaded like a free chain

[ch4NormalTensionAndOtherExamplesOfForces.md:472](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NormalTensionAndOtherExamplesOfForces.md#L472)

A chain under its own weight hangs as a catenary. A suspension cable carries a deck load spread uniformly _horizontally_, so it takes a near-parabolic shape. The caption treats the two cases as one.

## Chapter 5

### C5-01 · P1 · Bone's shear modulus is listed as 80 × 10⁹ N/m², and the text explains rigidity with it

[ch5Elasticity.md:142, 412–415](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Elasticity.md#L142)

For an isotropic material, S = Y / 2(1 + ν), which is less than Y. A shear modulus five times Young's modulus is impossible. Measured shear moduli for cortical bone are a few GPa. The text then concludes: "Its shear modulus is not only greater than its Young's modulus, but it is as large as that of steel. This is why bones are so rigid." That contradicts lines 216–218, which say bones usually fail by shearing or bending. Replace the table entry with an approximate value (about 3–5 × 10⁹ N/m²) and delete the "remarkable exception" paragraph.

### C5-02 · P2 · "The direction of friction is always opposite that of motion"

[ch5Friction.md:175](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Friction.md#L175)

Static friction on a walker's foot or a car's drive wheels points _forward_, the direction of motion. The section's own opening says friction "allows us to move." Use "opposite to the relative motion, or attempted relative motion, of the surfaces." The kinetic- and static-friction glossary entries (lines 1923–1929) need "relative" too.

### C5-03 · P2 · Concrete and brick have substantial shear _moduli_; their shear _strength_ is low

[ch5Elasticity.md:431–432](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Elasticity.md#L431)

The shear modulus of concrete is roughly 8–12 × 10⁹ N/m². The point being made is about failure strength, not stiffness. Rephrase it as "low shear strength."

### C5-04 · P2 · Skydiver posture and the drag–speed relation are inconsistent

[ch5DragForces.md:139, 168–169, 244](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5DragForces.md#L139)

The calculation describes a skydiver "descending head first" with C = 0.70, which is Table 1's _feet-first_ value. The Discussion then says "the 75-kg skydiver going feet first." Line 139 says "Since F_D is proportional to the speed…" just after establishing F_D ∝ v². Use "increases with speed (as v²)."

### C5-05 · P2 · V-formation flight does not work by streamlining the flock

[ch5DragForces.md:306–309, 313](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5DragForces.md#L306)

"Flocks of birds fly in the shape of a spear head as the flock forms a streamlined pattern." The benefit comes from each bird riding the upwash of the wingtip vortex ahead of it, which reduces induced drag. The caption's "better way to communicate" is speculative. "Migratory species … often have … long necks" is unsupported.

### C5-06 · P2 · Wrong figure reference

[ch5Elasticity.md:177](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Elasticity.md#L177)

"The strings in Figure 3 are being pulled down by a force of magnitude w": the hanging guitar strings are Figure 2. Figure 3 shows a rod.

### C5-07 · P3 · Haldane's essay was published in 1926

[ch5DragForces.md:253](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5DragForces.md#L253)

"On Being the Right Size" appeared in _Harper's Magazine_ in 1926.

### C5-08 · P3 · Sperm swim in the Stokes regime, where streamlining does little

[ch5DragForces.md:309–311](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5DragForces.md#L309)

The example sits just after the low-speed (Stokes) drag discussion, where shape matters far less than at high speed. Use a fish or a falcon instead.

### C5-09 · P3 · Spread-eagle terminal speed: 200 km/h in the text, 160 km/h in the example

[ch5DragForces.md:182–183](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5DragForces.md#L182)

The example gives 44 m/s, which is 158 km/h. Either quote about 160 km/h or explain the difference.

### C5-10 · P3 · Dated or imprecise biological statements

[ch5Friction.md:212, 215–217](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Friction.md#L212); [ch5Elasticity.md:259–262](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Elasticity.md#L259)

Knee replacement has been performed for more than 50 years, not "more than 20." The lubricant between the heart, lungs, and surrounding membranes is serous fluid, not mucus. "A young person can go from 100 kg to 60 kg with no visible sag" is not supported, since loose skin after large weight loss is common at any age. Cut that sentence or soften it.

### C5-11 · P3 · The picture-nail example models bending as shear

[ch5Elasticity.md:442–491](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Elasticity.md#L442)

This is the same issue as finding C21 in the first review, which fixed the pencil explanation. A nail loaded at its tip deflects mainly by bending. Either note that the model is a deliberate simplification, or present it as shear across a short pin.

## Chapter 6

### C6-01 · P2 · Banking _increases_ the normal force

[ch6CentripetalForce.md:134–135](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalForce.md#L134)

"If the surface of the road were banked, the normal force would be less as will be discussed below." The derivation below gives N cos θ = mg, so N = mg / cos θ > mg.

### C6-02 · P2 · The "ideal angle" glossary says θ is proportional to speed

[ch6CentripetalForce.md:1020–1022](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalForce.md#L1020)

The section derives tan θ = v²/(rg). Define the ideal angle as "the bank angle at which a vehicle at a given speed needs no friction; tan θ = v²/rg."

### C6-03 · P2 · The turning driver does not "move in a straight line"

[ch6FictitiousForcesAndNonInertialFrames.md:27–28, 31](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6FictitiousForcesAndNonInertialFrames.md#L27)

The driver turns with the car, pushed right by the seat, belt, or door. The correct point is that she _would_ continue straight if nothing pushed her, and no real leftward force acts. As written, the caption contradicts what students see.

### C6-04 · P2 · Cavendish's large spheres were about 158 kg each

[ch6NewtonsUniversalLawOfGravitation.md:356–357](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6NewtonsUniversalLawOfGravitation.md#L356)

Each large lead sphere weighed about 158 kg (350 lb), not "tens of kilograms at most." Cavendish also measured Earth's density, from which G follows, so "determination" is a better word than "definition" at line 351.

### C6-05 · P2 · The blood-distribution sentence is wrong

[ch6NewtonsUniversalLawOfGravitation.md:322–324](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6NewtonsUniversalLawOfGravitation.md#L322)

"When standing, 70% of your blood is below the level of the heart, while in a horizontal position, just the opposite occurs." Lying down does not put 70% of the blood above the heart. Lying flat removes most of the vertical pressure gradient. Rewrite to say that.

### C6-06 · P2 · Black-hole statements are out of date and contradict Chapter 4

[ch6NewtonsUniversalLawOfGravitation.md:289–292](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6NewtonsUniversalLawOfGravitation.md#L289)

"A few likely candidates … have diameters only a few kilometers" conflicts with §4.8, which discusses Sagittarius A* and the Event Horizon Telescope image. Stellar-mass black holes have horizon diameters of tens of kilometers; a 10-solar-mass hole is about 60 km. Dozens are now confirmed in X-ray binaries, and gravitational waves have revealed many more.

### C6-07 · P2 · "Hundreds of artificial satellites" is far out of date

[ch6SatellitesAndKeplersLaws.md:15–16](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6SatellitesAndKeplersLaws.md#L15)

More than 10,000 active satellites now orbit Earth, and tens of thousands of debris objects are tracked.

### C6-08 · P2 · Table 1 of planetary orbits leaves out Uranus

[ch6SatellitesAndKeplersLaws.md:270–284](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6SatellitesAndKeplersLaws.md#L270)

The table lists Saturn, then Neptune and Pluto. Add Uranus (r = 2.871 × 10⁹ km, T = 84.0 y).

### C6-09 · P2 · Centrifuge caption is missing its symbols

[ch6CentripetalAcceleration.md:132](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalAcceleration.md#L132)

"A particle of mass in a centrifuge is rotating at constant angular velocity ." The _m_ and ω were lost.

### C6-10 · P3 · In the legend, Newton's apple prompts the thought that gravity reaches the Moon

[ch6NewtonsUniversalLawOfGravitation.md:32](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6NewtonsUniversalLawOfGravitation.md#L32)

The caption says "it might also reach the Sun." The legend is about the Moon, as is the section's own worked example.

### C6-11 · P3 · The Copernican model is credited with Newtonian dynamics

[ch6SatellitesAndKeplersLaws.md:301–305, 307](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6SatellitesAndKeplersLaws.md#L301)

Copernicus' heliocentric model still used circles and epicycles and gave no force law. The "single underlying force" belongs to Newton. Use "the heliocentric model as explained by Newton's laws." Lines 294–299 also call Ptolemy "the Greek philosopher" whose model had "no cause and effect explanation." He was an Alexandrian astronomer, so tone that down.

### C6-12 · P3 · Microgravity-biology claims contradict each other or are overstated

[ch6NewtonsUniversalLawOfGravitation.md:335–346](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6NewtonsUniversalLawOfGravitation.md#L335)

"Roots grow downward" (gravitropism) is followed by "plant growth and development are not affected by gravity." Space-grown protein crystals are sometimes better, but not "much higher quality than any grown on Earth."

### C6-13 · P3 · Smaller wording and accuracy points

- "meteors" orbit the Sun: use meteoroids ([ch6SatellitesAndKeplersLaws.md:18](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6SatellitesAndKeplersLaws.md#L18)).
- Pure rotation is about an _axis_, not "centered on one point" ([ch6UniformCircularMotionAndGravitation.md:22–23](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6UniformCircularMotionAndGravitation.md#L22)).
- Say once that "centripetal force" is a role filled by real forces, not an extra force for the free-body diagram. Figure 2's free-body diagram labels the friction arrow "centripetal force" ([ch6CentripetalForce.md:20, 139](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalForce.md#L20)).
- The IAU planet definition and Pluto note sit oddly under "The Case for Simplicity" ([ch6SatellitesAndKeplersLaws.md:254–266](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6SatellitesAndKeplersLaws.md#L254)).

## Chapter 7

### C7-01 · P2 · Du Châtelet, 's Gravesande, and ½mv² are misattributed

[ch7WorkEnergyAndEnergyResources.md:24–26](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorkEnergyAndEnergyResources.md#L24)

's Gravesande performed the clay-drop experiments (around 1722). Du Châtelet analyzed and championed them in _Institutions de physique_ (1740), arguing that "vis viva" goes as mv². She did not write E = ½mv², and the factor ½ came a century later (Coriolis, 1829). Use "…led her to argue that the energy of motion is proportional to mv²."

### C7-02 · P2 · Conservation of mechanical energy needs "only conservative forces _do work_"

[ch7ConservativeForcesAndPotentialEnergy.md:137–138, 155–156](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7ConservativeForcesAndPotentialEnergy.md#L137); summary at 295; glossary at 499–500

The condition is stated as "only conservative forces act." The roller-coaster and toy-car examples involve a normal force, which is not conservative but does no work. The strategy box in §7.6 (line 114) already uses "only conservative forces do work." Align the definition, summary, and glossary with it.

### C7-03 · P2 · The marble-and-cup investigation hides an inelastic collision

[ch7NonconservativeForces.md:264–271](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7NonconservativeForces.md#L264)

Students are told to find μ_k by setting the marble's initial kinetic energy equal to friction × the cup's sliding distance. The marble–cup collision is perfectly inelastic, so most of that energy is lost in the collision. Only momentum carries through it. Either have students use momentum conservation for the capture and energy for the slide, or present the method as a rough upper estimate.

### C7-04 · P2 · Peak sunlight at Earth's _surface_ is about 1.0 kW/m²

[ch7Power.md:122–123](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7Power.md#L122)

About 1.36 kW/m² arrives at the top of the atmosphere. At the surface, the clear-sky maximum is about 1.0 kW/m².

### C7-05 · P2 · Aerobic and anaerobic metabolism are described backwards

[ch7Power.md:99–104](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7Power.md#L99)

Short bursts above about 1 hp rely mainly on _anaerobic_ pathways (phosphocreatine and glycolysis), not "rapidly converting … blood sugar and oxygen." The hard breathing afterward is recovery from oxygen debt (EPOC), not "the aerobic stage." Line 114, "don't expect … more than about 0.5 hp," also sits awkwardly next to an example worked out at 0.72 hp.

### C7-06 · P2 · Oxygen use tracks cellular respiration, not digestion

[ch7WorkEnergyAndPowerInHumans.md:54–55, 168](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorkEnergyAndPowerInHumans.md#L54)

"The digestive process is basically one of oxidizing food" appears in the body and the summary. Digestion breaks food down in the gut. Oxidation happens in cellular respiration, which is why O₂ consumption measures metabolic rate. Also at line 58, "Table 1 shows energy and oxygen consumption rates … for a variety of activities" should point to Table 2.

### C7-07 · P2 · Energy-growth claims are far outside actual trends and projections

[ch7WorldEnergyUse.md:44–45](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorldEnergyUse.md#L44)

"Tripled in the past 50 years and might triple again in the next 30" is wrong on both counts. Global primary energy rose about 2.4-fold from the mid-1970s to the 2020s, and mainstream projections (EIA, IEA) show tens of percent growth by 2050, not threefold. Figure 2's own projection to 2035 is roughly +30%.

### C7-08 · P2 · China and India statistics are out of date, and one contradicts Table 1

[ch7WorldEnergyUse.md:53–59](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorldEnergyUse.md#L53)

- "Over 1/3 of [China's oil] is imported." Since the late 2010s, China has imported about 70% of its oil.
- "Coal … accounting for 2/3 of its energy consumption." The chapter's own 2020 table gives 82.3 of 145.5 EJ, about 57%.
- "In 2009 China surpassed the United States" in CO₂ emissions. This happened around 2006–2007.
- "Half of India's oil is imported." The figure is about 85%.
- "Main energy resources are biomass … and coal." The 2020 table shows coal at about 55%. Biomass is not in that table.

Date-stamp these figures or align them with the BP 2021 source already cited.

### C7-09 · P2 · Figure 1 pie chart does not match its "2018 BP" caption

[ch7WorldEnergyUse.md:37](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorldEnergyUse.md#L37)

The alt text gives 0.86% for "geothermal, wind, solar, biomass." Non-hydro renewables were about 4% of primary energy in 2018. The coal and oil shares also look like mid-2000s data. Regenerate the chart from the cited source, or correct the caption year.

### C7-10 · P2 · Renewable-energy advocacy is stated as fact without support

[ch7WorldEnergyUse.md:110](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorldEnergyUse.md#L110)

"One of the most sustainable and secure fields to enter" and "brings power grids … back online much more quickly" are unsupported generalizations. During the 2021 Texas outage, every generation type failed. Either cite evidence for specific claims, such as distributed generation and microgrid resilience, or reduce them to a neutral statement.

### C7-11 · P2 · Wrong figure reference in the roller-coaster example

[ch7GravitationalPotentialEnergy.md:184](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7GravitationalPotentialEnergy.md#L184)

"The roller coaster shown in Figure 3" points to the kangaroo photo. The roller coaster is Figure 4.

### C7-12 · P3 · Efficiency and lighting data are out of date

[ch7ConservationOfEnergy.md:228–231](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7ConservationOfEnergy.md#L228); [ch7Power.md:229–231](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7Power.md#L229); [ch7WorldEnergyUse.md:130](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorldEnergyUse.md#L130)

Commercial solar panels are now about 20–23% efficient, not 10%. "Electric motor 98%" holds only for the largest industrial machines; 85–95% is typical. CFLs have been displaced by LEDs, roughly twice as efficient again, so update the CFL references.

### C7-13 · P3 · Table values to correct

- Hiroshima's yield was about 15 kt, not "10 kiloton" ([ch7ConservationOfEnergy.md:181](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7ConservationOfEnergy.md#L181)).
- The Crab pulsar's spin-down power is about 5 × 10³¹ W, not 10²⁸ W ([ch7Power.md:146](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7Power.md#L146)).
- "500 times more than the person's weight": 3.53 × 10⁵ N / 588 N ≈ 600 ([ch7GravitationalPotentialEnergy.md:164](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7GravitationalPotentialEnergy.md#L164)).

### C7-14 · P3 · Imprecise statements

- "Light, which is a very pure form of energy" has no physical meaning ([ch7ConservationOfEnergy.md:82–83](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7ConservationOfEnergy.md#L82)).
- "If W_nc is zero … nonconservative forces are balanced": zero net work is not the same as balanced forces ([ch7NonconservativeForces.md:106–109](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7NonconservativeForces.md#L106)).
- Energy conservation "cannot be proven from basic principles". It follows from time-translation symmetry (Noether's theorem), and a one-clause mention would be accurate ([ch7WorldEnergyUse.md:120–122](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7WorldEnergyUse.md#L120)).

## Chapter 8

### C8-01 · P2 · The quark-scattering account is physically misleading

[ch8ConservationOfMomentum.md:228–235, 239](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8ConservationOfMomentum.md#L228)

The text says electrons "occasionally scattered straight backward in a manner that implied a very small and very dense particle," calling this "nearly direct evidence of quarks." Backscattering off a _massive_ target is the Rutherford (nucleus) argument. Quarks are light. The SLAC evidence was an excess of large-angle, large-momentum-transfer inelastic scattering (scaling), showing point-like constituents. Rephrase so the nucleus discovery and the quark discovery are not conflated.

### C8-02 · P2 · Crumple zones are engineered structures, not a property of plastic parts

[ch8Impulse.md:56–59](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8Impulse.md#L56)

"Another advantage [of plastics] is that a car will crumple in a collision" misattributes the effect. Crumple zones are designed steel and aluminum structures. Separate the mass-saving point from the impulse point.

### C8-03 · P2 · "In a collision, it is momentum and not force that is important"

[ch8InelasticCollisionsInOneDimension.md:171–176](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8InelasticCollisionsInOneDimension.md#L171)

The opening sentence sets momentum against force, which Newton's second law links. The conclusion that a heavier racquet is better ignores swing speed, which drops as mass rises. Rephrase as a trade-off between racquet mass and swing speed. The same "heaviest racquet they can handle" claim is in [ch9ForcesAndTorquesInMusclesAndJoints.md:129–131](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L129).

### C8-04 · P2 · The Lunar Lander embed is a Flash simulation

[ch8IntroductionToRocketPropulsion.md:218](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8IntroductionToRocketPropulsion.md#L218)

The URL returns a 2008 Flash page ("Lunar Lander 2.04", Flash 8 required), which no current browser runs. Remove it or replace it.

### C8-05 · P3 · A new tennis ball's coefficient of restitution is about 0.75, not 0.85

[ch8InelasticCollisionsInOneDimension.md:200](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8InelasticCollisionsInOneDimension.md#L200)

ITF rules require a 53–58 in. rebound from a 100 in. drop, which gives c = √(h/H) ≈ 0.73–0.76. The same note defines c as "the ratio of the speeds after and before." For two moving bodies it is the ratio of relative speeds.

### C8-06 · P3 · Vector notation contradicts the book's convention

[ch8LinearMomentumAndForce.md:59–61](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8LinearMomentumAndForce.md#L59)

"One that is italicized, boldfaced, and has an arrow is a vector": the book uses boldface without arrows (see §3.2).

### C8-07 · P3 · Out-of-date or slightly inconsistent figures

- Venus Williams' 2007 serve was the women's record _at the time_. Faster serves have been recorded since ([ch8LinearMomentumAndForce.md:188–189](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8LinearMomentumAndForce.md#L188)).
- 1/88 is 1.14%, not 1.10% ([ch8IntroductionToRocketPropulsion.md:182–183](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8IntroductionToRocketPropulsion.md#L182)).
- The Space Shuttle discussion presents reusability as a historical failure. Routine booster recovery since 2015 deserves a sentence ([ch8IntroductionToRocketPropulsion.md:191–200](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8IntroductionToRocketPropulsion.md#L191)).
- The glossary defines "change in momentum" as "mass times change in velocity," which holds only for constant mass. That contradicts the rocket section ([ch8Impulse.md:1178–1180](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch8Impulse.md#L1178)).

## Chapter 9

### C9-01 · P2 · The pole-vaulter paragraph keeps a stray caption label and a wrong figure reference

[ch9ApplicationsOfStaticsIncludingProblemSolvingStrategies.md:59–66](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9ApplicationsOfStaticsIncludingProblemSolvingStrategies.md#L59)

Lines 59–66 repeat the earlier paragraph. They include a leftover "(b)" and describe the off-center grip (Figure 3) while linking to Figure 1. Delete the duplicate and point to Figure 3. Figure 1's alt text also says the cg is "near the right hand", which is the Figure 2 situation.

### C9-02 · P3 · Young children's center of gravity is not "between their shoulders"

[ch9Stability.md:86–87](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9Stability.md#L86)

Young children's center of gravity is relatively higher than adults', near the lower chest or upper abdomen, but not at shoulder level.

### C9-03 · P3 · The stability figures are introduced as unstable examples

[ch9Stability.md:47–51](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9Stability.md#L47)

"See the next several figures for examples of unstable equilibrium" is followed by Figure 3, which shows a _restoring_ torque on the pencil standing on its flat end. Lines 92–106 also repeat the chicken explanation twice.

### C9-04 · P3 · Muscle and exercise statements are oversimplified

- The force a muscle can exert peaks near its resting length and falls both when shortened and when overstretched. As written, it is "smaller when it is shorter than when it is stretched" ([ch9ForcesAndTorquesInMusclesAndJoints.md:114–116](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L114)).
- Aquatic therapy is used mainly because buoyancy _reduces_ joint load. It does not simply "require greater forces" (lines 146–148).
- "Discs crushed by mere exertion are very common" overstates it. Disc herniation is common, but crushing is not (line 157).

### C9-05 · P3 · The etymology of "machine" is doubtful

[ch9SimpleMachines.md:16–17](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9SimpleMachines.md#L16)

Greek _mēkhanē_ means "device" or "contrivance," not "to help make things easier."

## Chapter 10

### C10-01 · P1 · The helicopter-rotor energy explanation is wrong

[ch10RotationalKineticEnergy.md:244–258, 381](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10RotationalKineticEnergy.md#L244); summary at 576–579

The text says the rotor's kinetic energy is "put into them before takeoff and must not be allowed to drop," and that engines "are too small to supply both the energy needed for lift and to replenish the rotational kinetic energy." Engines drive the rotor continuously throughout flight. The example's 5.3 × 10⁵ J is about one second of output for a 500 kW turboshaft. The real danger is low rotor speed causing blade stall and loss of lift. Autorotation works because upward airflow through the descending rotor keeps it turning, not by "aligning the blades so that the helicopter is spun up." The example's numbers are fine. The narrative, Figure 5 caption, and summary bullet should be rewritten.

### C10-02 · P2 · Angular acceleration is inversely proportional to moment of inertia, not mass

[ch10DynamicsOfRotationalMotion.md:20–22](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10DynamicsOfRotationalMotion.md#L20); summary at 288–289

The section later stresses that _distribution_ matters (the merry-go-round with children at the edge versus the center). Opening and summarizing with "inversely proportional to mass" contradicts that.

### C10-03 · P2 · The father would be running at about 72 km/h, not 50

[ch10DynamicsOfRotationalMotion.md:261](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10DynamicsOfRotationalMotion.md#L261)

v = rω = (1.50 m)(13.3 rad/s) ≈ 20 m/s ≈ 72 km/h.

### C10-04 · P2 · Torque points along the _change_ in angular momentum

[ch10GyroscopicEffects.md:105–108, 56](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10GyroscopicEffects.md#L105)

The summary says "the direction of the torque is thus the same as that of the angular momentum it produces." In the gyroscope that follows, τ is _perpendicular_ to L. The body (line 36) correctly says ΔL. Use ΔL in the summary and in the Figure 2 caption.

### C10-05 · P2 · The Earth angular-momentum example has no problem statement

[ch10AngularMomentumAndItsConservation.md:49–54](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10AngularMomentumAndItsConservation.md#L49)

The example goes from its title straight to "No information is given in the statement of the problem." The statement ("Calculate the angular momentum of Earth's rotation") is missing. At lines 69–70, Earth turns once per _sidereal_ day (86 164 s), not exactly once per solar day. The difference is small, but the text says "exactly."

### C10-06 · P2 · Wrong cross-reference for translational kinetic energy

[ch10RotationalKineticEnergy.md:335–336](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10RotationalKineticEnergy.md#L335)

The text says it was "defined in _Uniform Circular Motion and Gravitation_." It was defined in [§7.2 Kinetic Energy and the Work-Energy Theorem](../contents/ch7KineticEnergyAndTheWorkEnergyTheorem.md).

### C10-07 · P2 · The in-text Check Your Understanding answer confuses angular acceleration with angular momentum

[ch10AngularAcceleration.md:295–298](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10AngularAcceleration.md#L295)

Asked how angular acceleration is denoted, the answer describes the gymnast's _angular momentum_ direction. It then says the _angular acceleration_ is "proportional to her angular velocity … and her moment of inertia." That describes L = Iω, not α.

### C10-08 · P3 · Galileo rolled spheres, and static friction is present

[ch10RotationalKineticEnergy.md:418, 509–510](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10RotationalKineticEnergy.md#L418)

Galileo used bronze balls in grooved channels, not cylinders. "Only one force doing work—gravity" is right, but say that static friction acts, makes the rolling possible, and does no work. Otherwise students conclude that there is no friction.

### C10-09 · P3 · Smaller issues

- "L = I′ω′" in the definition should be L = Iω ([ch10GyroscopicEffects.md:23](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10GyroscopicEffects.md#L23)).
- The §10.6 summary covers angular-momentum basics and does not mention collisions or the percussion point ([ch10CollisionsOfExtendedBodiesInTwoDimensions.md:246–251](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10CollisionsOfExtendedBodiesInTwoDimensions.md#L246)).
- The rotational-inertia glossary says "the harder it is to rotate." Use "the harder it is to change its rotation" ([ch10DynamicsOfRotationalMotion.md:1180–1181](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10DynamicsOfRotationalMotion.md#L1180)).
- The tornado "straw through tree trunks" story is folklore. Drop it or mark it as anecdotal ([ch10RotationalMotionAndAngularMomentum.md:7](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10RotationalMotionAndAngularMomentum.md#L7)).
- The child's moment of inertia is written "I_c = MR²" against the section's own m, r convention for point masses, and the summary repeats "sum of MR²" ([ch10DynamicsOfRotationalMotion.md:235, 319](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10DynamicsOfRotationalMotion.md#L235)).

---

## Markup and presentation

### M-01 · Figure-caption math renders as raw LaTeX (about 50 captions in 31 files)

Captions written as `( 1.67 \\mss )`, `( \\Delta x )`, `( \\vb{N} )`, and similar lost their `\(`…`\)` delimiters and carry doubled backslashes. The built HTML (`_site/contents/ch2FallingObjects.html`) contains the literal text `( 1.67 \\mss )`, so MathJax never typesets it. The worst files are ch3VectorAdditionAndSubtractionGraphicalMethods, ch4ExtendedTopics, ch9TheSecondConditionForEquilibrium, ch10GyroscopicEffects, ch4NormalTension…, ch6CentripetalAcceleration, and ch6RotationAngle…. A scripted fix is feasible. Convert `( X )` to `\( X \)` and `\\` to `\` inside image titles, then check the result visually.

### M-02 · Escaped HTML displayed as text

`&lt;/div&gt;` appears in running text at [ch6CentripetalAcceleration.md:159](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalAcceleration.md#L159) and [ch6CentripetalForce.md:102](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6CentripetalForce.md#L102). These are the same class as M04 in the first review.

### M-03 · Broken or misplaced math delimiters

- [ch2MotionEquations…:575](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md#L575): the opening `$$` is missing.
- [ch6NewtonsUniversalLawOfGravitation.md:175](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6NewtonsUniversalLawOfGravitation.md#L175): reads `3.84 \times 10^{8}\m $$. $$`.
- [ch10RotationalKineticEnergy.md:117](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch10RotationalKineticEnergy.md#L117): `\( \KE_{\text{rot}} /)` appears twice.
- [ch7ConservationOfEnergy.md:194](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7ConservationOfEnergy.md#L194): `\text{ m}/s` sits outside the math.
- `\vb{F}*{…}` with an asterisk for an underscore at [ch4NewtonsThirdLawOfMotion.md:95](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NewtonsThirdLawOfMotion.md#L95) and [ch4NormalTension…:469](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch4NormalTensionAndOtherExamplesOfForces.md#L469).
- `\theta_{tau}` should be τ_R at [ch9Applications…:121](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9ApplicationsOfStaticsIncludingProblemSolvingStrategies.md#L121).
- Stray en dashes in `F_{\text{B}}–` at [ch9ForcesAndTorques…:219–220](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L219).

### M-04 · Escaped underscores remain in worked examples

There are 43 instances of `\_{` in 21 Chapter 2–10 content files, such as `x\_{0}` and `v\_{1}`. The first review fixed teaching text only. These still typeset as literal underscores in examples. Run `grep -n '\\_{' contents/ch[1-9]*.md contents/ch10*.md` to list them.

### M-05 · Table anchors attached to the following heading

`{: #Table2}` is on the heading after the table at [ch1PhysicalQuantitiesAndUnits.md:221](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1PhysicalQuantitiesAndUnits.md#L221). The same happens with `{: #Table1}` at [ch7ConservationOfEnergy.md:198](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7ConservationOfEnergy.md#L198) and [ch7Power.md:161](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch7Power.md#L161). Links to those tables land on the wrong element. There is a stray `{ Figure9}` at [ch5Elasticity.md:615](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch5Elasticity.md#L615).

### M-06 · Two list items merged into one line

[ch2TimeVelocityAndSpeed.md:65](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2TimeVelocityAndSpeed.md#L65): the two "for simplicity's sake" conventions render as a single bullet.

### M-07 · Stray characters and labels

- `13.0\*\* m/s` at [ch2FallingObjects.md:163](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2FallingObjects.md#L163).
- The duplicate "(d)" label for the fifth part at [ch1AccuracyPrecision…:268](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1AccuracyPrecisionAndSignificantFigures.md#L268).
- "**Solution for Velocity**" runs into the preceding Discussion paragraph at [ch2FallingObjects.md:147](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch2FallingObjects.md#L147).
- "º" (ordinal indicator) is used for degrees in [ch6RotationAngle…:72–77](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch6RotationAngleAndAngularVelocity.md#L72).
- "Endeavor" should be "Endeavour" at ch2MotionEquations…:258 and ch7Power.md:21.
- "”Weightlessness”" opens with a closing quote at ch6NewtonsUniversalLawOfGravitation.md:297.

### M-08 · Simulation embeds

- Lunar Lander is Flash (C8-04), and the "Ladybug Motion 2D" embeds load the wrong simulation (C3-13).
- The Estimation embed points to a `phet-dev` development build (`1.0.0-dev.3`) at [ch1AccuracyPrecision…:401](https://github.com/veillette/physics-book/blob/a71ed2c3/contents/ch1AccuracyPrecisionAndSignificantFigures.md#L401). It loads today, but dev builds are not stable URLs.
- Several notes labeled "PhET Exploration" embed non-PhET simulations (CCNY elevator at ch2FallingObjects; veillette.github.io Moving Man, Maze Game, and My Solar System).
- Some embeds are off-topic for their section: Masses & Springs in §5.2 Drag, My Solar System in §10.4 Rotational KE, and Graphing Quadratics in §1.1.

---

## Method and limits

- Each file was read with its Conceptual Questions and Problems & Exercises sections removed. Everything else was read in full, including in-text Check Your Understanding items.
- Worked-example arithmetic was spot-checked. All the numbers checked agreed except C10-03, C7-13, C1-09, and C8-07.
- Figure images were opened for two findings. Figure 3.2.11 confirmed that the image matches the text (so only its alt text is wrong). Figure 9.3.1 confirmed that its CG labels are present, so no finding was raised there.
- Simulation URLs were checked with HTTP requests. The Lunar Lander page source was inspected and requires Flash 8.
- The Haldane date, Cavendish masses, ThrustSSC record, lunar _g_, solar irradiance, ITF rebound rule, Crab pulsar luminosity, FY2019 deficit, and China/India import shares come from standard references known to the reviewer. They were not re-fetched in this session.
- Problem sets and their generated solutions were outside this review. Problem solutions in §4.3 reuse the 1.67 m/s² lunar value (C2-04) and need the same correction.
