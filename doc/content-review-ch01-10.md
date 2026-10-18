# Content review: Chapters 1–10

Date: 2026-10-17. Reviewed the teaching content across the 73 chapter and section files identified by the table of contents: explanations, definitions, equations, tables, figure captions, summaries, and glossaries. Exercises, conceptual questions, check-your-understanding problems, worked examples, and their solutions are outside this review. The findings below record the original review; their line numbers refer to the source before the corrections.

## Corrections applied

The content, notation, and editorial findings have been addressed with introductory teaching in mind. The changes preserve the book’s algebra-based approach and familiar idealizations. Brief explanations of assumptions replace unnecessary generalizations; they do not introduce calculus, Reynolds-number calculations, or three-dimensional rotational mechanics.

- Energy accounting now uses “initial energy + net energy transferred in = final energy,” with a sliding-block explanation of how to count friction once.
- Rocket motion is explained by considering the rocket and its exhaust together. The rotational second-law discussion states the fixed-axis, constant-inertia assumptions and points ahead to the skater example.
- The positive volume-decrease convention is explicit, preserving the existing bulk-compression formula.
- The simplified rotational-kinematics table keeps its familiar form, with the starting position, angle, and time explicitly chosen as zero. Average-rate explanations retain the existing symbols.
- The historical 2020 energy table has been reconciled with BP’s 2021 report and its source identified; its summary uses the same accounting. Germany’s 2030 electricity target has been updated separately.
- Escaped subscript markers and misplaced math delimiters have been corrected in teaching material. Exercises, worked examples, solutions, and investigations remain outside the edits.

Found **42 substantive content issues**: **7 high-priority corrections (P1)** and **35 corrections or necessary qualifications (P2)**. Four additional mathematical-presentation findings and nine prose/cross-reference corrections follow. P1 identifies incorrect core rules or statements likely to cause incorrect reasoning; P2 includes incorrect applications, misleading generalizations, and inconsistent reference material.

## Corrections to prioritize

Correct vector subtraction, the second-law glossary, the Coriolis direction, energy accounting with friction, the variable-mass momentum claim, the unrestricted rotational second law, and the closed-system mechanical-energy rule before publication. Then reconcile the chapter summaries and glossaries with the corrected explanations.

## Chapter 1

### C01 · P2 · Andromeda is the nearest major galaxy, rather than the nearest galaxy

[ch1IntroductionTheNatureOfScienceAndPhysics.md : 22](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch1IntroductionTheNatureOfScienceAndPhysics.md#L22)

The introduction calls Andromeda the nearest galaxy to the Milky Way. Nearby dwarf galaxies are closer. Insert “major” or “large” before “galaxy.” [NASA’s description](https://science.nasa.gov/photojournal/our-neighbor-andromeda/) supports this qualification.

### C02 · P2 · The units summary contradicts the seven-base-unit explanation

[ch1PhysicalQuantitiesAndUnits.md : 465](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch1PhysicalQuantitiesAndUnits.md#L465)

The summary says all units can be expressed using four fundamental units. Temperature, amount of substance, and luminous intensity require the other SI base quantities. Change this to “The SI has seven base units; four used frequently in this text are listed here.” The opening explanation at line 29 and the parenthesis at line 61 already recognize seven. [BIPM lists all seven](https://www.bipm.org/en/measurement-units/si-base-units).

### C03 · P2 · The glossary conflates uncertainty with measurement error

[ch1AccuracyPrecisionAndSignificantFigures.md : 1378](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch1AccuracyPrecisionAndSignificantFigures.md#L1378)

The glossary defines uncertainty as deviation from a standard or expected value. That describes error or discrepancy, which the main text distinguishes at lines 67–70. Define uncertainty as an estimate characterizing the plausible range of values attributable to the measured quantity. It need not be known by comparison with a true value. [NIST distinguishes uncertainty from error](https://pml.nist.gov/cuu/Uncertainty/glossary.html). Also carry the main text’s “conservative, worst-case” qualification into the glossary entry for the method of adding percents at line 1363.

### C04 · P2 · Classical-physics limits are presented as absolute thresholds

[ch1PhysicsAnIntroduction.md : 281](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch1PhysicsAnIntroduction.md#L281)

The body, boxed statement, and glossary use microscope visibility and 1% of light speed as boundaries at which quantum mechanics or relativity must replace classical physics. Accuracy requirements and the physical regime determine the approximation; instrument visibility cannot define it. At 0.01c, for example, the Lorentz factor differs from 1 by only about 0.005%, rather than crossing a sharp physical threshold. Present these as rough introductory guidelines, and explain that corrections matter when they exceed the required precision. Avoid describing the Sun’s exterior as an example of a strong gravitational field. Revise lines 303, 324–328, and 518–523 together.

## Chapter 2

### C05 · P2 · The graph-reading paragraph drops the leading 5 from 525 m

[ch2GraphicalAnalysisOfOneDimensionalMotion.md : 90](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch2GraphicalAnalysisOfOneDimensionalMotion.md#L90)

The text gives 25 m at 0.50 s. Direct inspection of Figure 2 shows 525 m at 0.50 s, consistent with its intercept of 400 m and slope of 250 m/s. Change 25 to 525. The image alt text also misdescribes the plotted interval and should be reconciled with the figure.

### C06 · P2 · Free fall is incorrectly made synonymous with constant acceleration

[ch2FallingObjects.md : 43](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch2FallingObjects.md#L43)

The text says gravitational acceleration is constant and therefore the constant-acceleration equations apply to any falling object with negligible drag. Free fall specifies the force acting, not a uniform gravitational field. Orbits and long falls provide counterexamples. Introduce the local, near-surface approximation: the height change must be small compared with Earth’s radius so that g can be treated as constant. Repeat that qualification in the summary at line 424.

### C07 · P2 · Road-trip duration requires average speed and route length

[ch2TimeVelocityAndSpeed.md : 125](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch2TimeVelocityAndSpeed.md#L125)

The parenthetical tells readers to use average velocity to calculate road-trip duration. For a route length, use average speed; a round trip can have zero average velocity and a finite travel time. Change “average velocity” to “average speed” in this practical example. Keep displacement divided by elapsed time as the definition of average velocity.

## Chapter 3

### C08 · P1 · Vector subtraction is incorrectly described as independent of order

[ch3VectorAdditionAndSubtractionGraphicalMethods.md : 199](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L199)

The text makes this claim twice, at lines 200–201 and 207–208. In general A − B = −(B − A), so reversing the order reverses the result. The scalar example also demonstrates this: 5 − 2 = 3, while 2 − 5 = −3. Replace both statements with “Subtraction is not commutative; specify which vector is subtracted from which.” Addition of A and the already-negated vector −B is commutative, which is a different statement.

### C09 · P2 · Division by a scalar needs its reciprocal, with its sign retained

[ch3VectorAdditionAndSubtractionGraphicalMethods.md : 297](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L297)

The instruction to treat a divisor as a scalar between 0 and 1 is not generally valid. A/0.5 = 2A, and A/(−2) reverses direction. Replace it with “For nonzero c, dividing by c is multiplying by 1/c.”

### C10 · P2 · Signed components are repeatedly called magnitudes

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md : 193](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L193); also [ch3ProjectileMotion.md : 90](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3ProjectileMotion.md#L90)

The Figure 7 caption says the magnitudes Ax and Bx add to give the magnitude Rx. This fails for opposing components: Ax = 3 and Bx = −2 give Rx = 1, rather than a magnitude sum of 5. Introduce signed scalar components Ax and Ay alongside component vectors, and use “components” in the addition rules. The same distinction is needed in the projectile-motion steps, where vx and vy can be negative.

### C11 · P2 · The vector-addition summary uses the same angle for two different vectors

[ch3VectorAdditionAndSubtractionAnalyticalMethods.md : 389](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md#L389)

The summary writes Ax = A cos θ and Bx = B cos θ, and similarly for the y-components. This only works when the vectors have the same direction. Use θA and θB, as the main explanation already does at lines 173–174.

### C12 · P2 · Geometric components are confused with dynamically independent motions

[ch3KinematicsInTwoDimensionsAnIntroduction.md : 94](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3KinematicsInTwoDimensionsAnIntroduction.md#L94)

The boxed statement says horizontal motion never affects vertical motion, and vice versa. This is true for the ideal projectile model used here, but not for arbitrary forces. With drag, for example, a vertical drag component can depend on the total speed, including horizontal speed. Explain that any vector can be resolved into perpendicular components, while solving those components independently requires appropriate force laws. Qualify the summary at lines 159–161 and the corresponding generalization in the analytical-methods section.

### C13 · P2 · The maximum-height formula needs an origin and launch-direction condition

[ch3ProjectileMotion.md : 301](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3ProjectileMotion.md#L301)

The text calls h = v0y²/(2g) valid for any projectile motion without drag. It is the rise above the launch point for an initially upward-moving projectile in uniform gravity. For an arbitrary initial coordinate, ymax = y0 + v0y²/(2g), provided v0y > 0 and the apex is reached before impact. A downward launch does not reach that algebraic apex after release. State these conditions before the displayed formula.

## Chapter 4

### C14 · P1 · Newton’s second-law glossary assigns inverse mass dependence to force

[ch4NewtonsSecondLawOfMotion.md : 1444](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4NewtonsSecondLawOfMotion.md#L1444)

The glossary says the net force is inversely proportional to mass. For fixed acceleration, Fnet = ma is directly proportional to mass; acceleration is inversely proportional to mass for fixed force. Rewrite the entry around Fnet = ma or a = Fnet/m, keeping the dependent quantity explicit. The main derivation is already correct.

### C15 · P1 · The northbound satellite’s Coriolis deflection is reversed

[ch4NormalTensionAndOtherExamplesOfForces.md : 483](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4NormalTensionAndOtherExamplesOfForces.md#L483)

The example says a satellite moving north over the Northern Hemisphere experiences an apparent westward force. Its northward motion gives an eastward Coriolis component: −2m Ω × v points to the right of north. Change west to east and replace the explanation based simply on Earth moving underneath it. Chapter 6’s rightward-deflection discussion already points to the correct result. [NOAA explains rightward deflection of northward motion](https://oceanservice.noaa.gov/education/tutorial_currents/04currents1.html).

### C16 · P2 · Internal forces can change a system’s internal motion

[ch4NewtonsSecondLawOfMotion.md : 36](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4NewtonsSecondLawOfMotion.md#L36); also [ch4DevelopmentOfForceConcept.md : 32](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4DevelopmentOfForceConcept.md#L32), [ch7KineticEnergyAndTheWorkEnergyTheorem.md : 48](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7KineticEnergyAndTheWorkEnergyTheorem.md#L48)

The claim that only external forces affect “the motion of a system” needs “center-of-mass motion.” Internal forces can make parts move relative to one another, change shape, and redistribute kinetic energy even when total momentum is fixed. Apply the same qualification in §4.1. In §7.2, restrict the external-net-force work derivation to a particle or an object modeled by its center-of-mass translation; external work alone is not generally the change in the total kinetic energy of an arbitrary deformable system.

## Chapter 5

### C17 · P2 · The elasticity figure caption gives the reciprocal slope

[ch5Elasticity.md : 72](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch5Elasticity.md#L72)

Figure 1 plots deformation ΔL vertically against applied force F horizontally. From ΔL = F/k, the linear slope is 1/k, with units m/N. The caption says k. Change the caption to 1/k; direct inspection confirms the axes in the image.

### C18 · P2 · Tensile strength is conflated with yielding

[ch5Elasticity.md : 48](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch5Elasticity.md#L48)

The definition treats permanent deformation and fracture as the same strength threshold. Yield strength marks the onset of specified permanent deformation; ultimate tensile strength is the maximum tensile stress reached in a tensile test, and fracture may occur later. Distinguish these terms rather than saying tensile strength causes either permanent deformation or fracture. Correct “fraction” to “fracture” in the glossary at line 1560 as well.

### C19 · P2 · Stokes’ law needs a low-Reynolds-number and spherical-particle qualification

[ch5DragForces.md : 266](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch5DragForces.md#L266)

The paragraph implies that a denser fluid by itself switches drag from quadratic to linear, and defines r as the radius of an unspecified object. Density alone does not establish the regime. State that F = 6πηrv applies to a sphere in slow, creeping flow, with Reynolds number 2ρrv/η much less than 1; v is speed relative to the surrounding fluid. Increasing density at fixed size, viscosity, and speed actually increases this Reynolds number. [MIT’s derivation states the creeping-flow restriction](https://ocw.mit.edu/courses/3-185-transport-phenomena-in-materials-engineering-fall-2003/a55c74dc21def01fc0054de35574d1e5_3_21.pdf).

### C20 · P2 · The bulk-compression formula leaves the sign of volume change inconsistent

[ch5Elasticity.md : 511](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch5Elasticity.md#L511)

The text calls ΔV a change in volume, but ΔV = +(F/A)V0/B predicts an increase for a positive inward pressure. Either define ΔV explicitly as the positive magnitude of the decrease, or use the signed relation ΔV = −V0 Δp/B with ΔV = Vf − Vi. Carry the convention into the summary at line 654.

### C21 · P2 · A bending pencil is used to explain a uniform-shear equation

[ch5Elasticity.md : 385](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch5Elasticity.md#L385)

The long-pencil example is bending, whose deflection depends on flexural rigidity and cross-sectional geometry, rather than only the shear deformation FL0/(SA) just introduced. Replace it with a block undergoing approximately uniform shear, or explicitly distinguish bending from shear. Otherwise readers are led to apply the shear formula to beam deflection.

## Chapter 6

### C22 · P2 · Wheel-rim speed needs a reference frame and a no-slip condition

[ch6RotationAngleAndAngularVelocity.md : 137](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch6RotationAngleAndAngularVelocity.md#L137)

The prose says a point on a rolling tire’s rim has the same speed as the car. Relative to the axle, its rotational speed is R|ω|; relative to the road, rim-point speeds range from zero at the contact point to 2v at the top for rolling without slipping. The caption is more careful about the reference frame than the prose. State the frame and the no-slip condition explicitly before using vcar = R|ω|.

### C23 · P2 · Ideal banked-curve speed is not a maximum frictionless speed

[ch6CentripetalForce.md : 1016](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch6CentripetalForce.md#L1016)

The glossary calls ideal speed the maximum safe speed without friction. For a specified radius and bank angle, it is the particular speed v = √(rg tan θ) at which no friction is required. Both higher and lower steady speeds generally require friction. Replace “maximum safe speed” with “speed for which the normal force and gravity alone provide the required centripetal acceleration.”

### C24 · P2 · The center-of-mass substitution needs conditions for extended bodies

[ch6NewtonsUniversalLawOfGravitation.md : 56](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch6NewtonsUniversalLawOfGravitation.md#L56)

The section assumes large bodies act like point masses at their centers without explaining when that approximation works. The inverse-square expression is exact for point masses and for nonoverlapping spherically symmetric bodies; it approximates general bodies when their sizes are small compared with their separation. Add that qualification so the formula is not applied unchanged to nearby irregular bodies or objects inside Earth.

## Chapter 7

### C25 · P1 · The general energy balance can count frictional losses twice

[ch7ConservationOfEnergy.md : 34](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7ConservationOfEnergy.md#L34)

Wnc retains the preceding section’s definition as work by all nonconservative forces, while OE now includes thermal and chemical energy. Counting friction as negative Wnc and its heating as increased OE double-counts one conversion. For example, a sliding block plus rough surface can lose 10 J of mechanical energy and gain 10 J of thermal energy with zero external work; inserting both −10 J of frictional work and +10 J of heating into this formula fails the balance. Define the system first. For a fixed collection of matter, use Δ(K + U + Eint) = Wext + Q, with other boundary transfers added when needed. Alternatively retain Wnc = Δ(K + U) as the mechanical-energy accounting rule and do not add the same internal conversion a second time. The existing claim of a fully general balance also needs explicit treatment of heat transfer.

### C26 · P2 · Energy conversion is incorrectly said always to require a thermal loss

[ch7Power.md : 126](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7Power.md#L126); also [ch7WorldEnergyUse.md : 145](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7WorldEnergyUse.md#L145)

The text says it is never possible to convert one energy form completely into another without losing some as thermal energy. This is too broad: the ideal conservative models taught in the chapter permit complete potential-to-kinetic conversion, and electrical energy can be converted entirely into thermal energy in a resistor. Discuss dissipative losses in real devices, and reserve the thermodynamic restriction for converting heat from a single reservoir entirely into work in a cycle. The same overstatement appears in the world-energy summary.

### C27 · P2 · Pulse oximetry is confused with measurement of oxygen consumption

[ch7WorkEnergyAndPowerInHumans.md : 113](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7WorkEnergyAndPowerInHumans.md#L113)

The caption says an “oxymeter” determines metabolic rate. A pulse oximeter estimates arterial oxygen saturation and pulse rate; that does not determine the rate of oxygen use in liters per minute. Replace the caption or use an illustration of indirect calorimetry with measurement of respiratory gas exchange. Correct the device spelling to “pulse oximeter.” [FDA describes what pulse oximeters measure](https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics).

### C28 · P2 · Quadratic elastic potential energy is extended beyond Hookean behavior

[ch7ConservativeForcesAndPotentialEnergy.md : 84](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7ConservativeForcesAndPotentialEnergy.md#L84)

The paragraph extends PE = ½kx² to deformation of any elastic medium. Reversible elasticity need not be linear; Chapter 5 itself discusses nonlinear elastic behavior. Keep this expression for a linear force–deformation relationship with constant k. For a nonlinear elastic element, stored energy is the area under the applied-force-versus-deformation curve.

### C29 · P2 · Renewable resources are defined as impossible to exhaust

[ch7WorldEnergyUse.md : 28](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7WorldEnergyUse.md#L28)

The body and glossary say renewable sources “cannot be used up,” including biomass. A forest or another biomass stock can be depleted if consumption exceeds replenishment. Define renewable energy in terms of natural replenishment on relevant human timescales, with sustainable use requiring an appropriate consumption rate. Update the glossary at line 992 with the same definition.

### C30 · P2 · Energy statistics and policy targets need consistent dates and sources

[ch7WorldEnergyUse.md : 48](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7WorldEnergyUse.md#L48)

The prose gives Germany a 65% renewable-electricity target for 2030. Its stated target is now at least 80% of gross electricity consumption. Retain 65% only as a dated historical target, or update it with a citation. Separately, the 2020 U.S. table gives hydro plus other renewables as 8.8 EJ out of 87.8 EJ, about 10%, while the summary at line 140 says 12%. Reconcile the table and summary using one source and accounting method, and provide the table’s provenance. Distinguish primary energy from electricity throughout. A [September 2026 German government statement](https://www.bundesregierung.de/breg-de/suche/bmwe-ausbau-eeg-bt-2454130) confirms the 80% target remains in place.

### C31 · P2 · The climate statement conflicts with the stronger statement later in the chapter

[ch7Power.md : 234](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch7Power.md#L234)

The phrase “likelihood of a link” understates the established attribution of warming to human activity, while §7.9 already states the causal role of greenhouse-gas emissions. Use consistent wording identifying human greenhouse-gas emissions, chiefly from fossil fuels, as a cause of current global warming. [IPCC’s assessment](https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-3/) establishes human influence on atmospheric, oceanic, and land warming.

## Chapter 8

### C32 · P1 · The momentum law is incorrectly extended directly to a variable-mass rocket

[ch8LinearMomentumAndForce.md : 173](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch8LinearMomentumAndForce.md#L173)

The text says Fext = Δp/Δt can be applied directly to systems whose mass changes, such as rockets. For the rocket alone, material crosses the system boundary and carries momentum; a momentum-flux term is required. Apply the ordinary total-momentum law to a fixed collection consisting of rocket and exhaust, or introduce the open-system balance explicitly. Otherwise students can incorrectly expand d(mv)/dt = Fext for the rocket and obtain a frame-dependent thrust law. §8.7’s rocket-plus-expelled-gas reasoning provides a suitable model. [MIT derives the required variable-mass balance](https://ocw.mit.edu/courses/16-07-dynamics-fall-2009/98d19cb2b9983c14c6907052499e7a98_MIT16_07F09_Lec14.pdf).

### C33 · P2 · Finite-interval rates need to be labeled as averages

[ch8LinearMomentumAndForce.md : 111](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch8LinearMomentumAndForce.md#L111); also [ch6RotationAngleAndAngularVelocity.md : 100](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch6RotationAngleAndAngularVelocity.md#L100), [ch10AngularAcceleration.md : 51](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10AngularAcceleration.md#L51), [ch10AngularMomentumAndItsConservation.md : 108](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10AngularMomentumAndItsConservation.md#L108)

Fnet = Δp/Δt over a finite interval gives the average net force, unless force is constant. §8.2 discusses averages but uses the same unmarked symbol, while §§6.1 and 10.1 similarly define ω and α with finite changes. Label these quantities as interval averages, and explain instantaneous values through the small-interval limit or local graph slope. The constant-acceleration formulas can then retain unbarred symbols under their stated assumptions.

### C34 · P2 · Elasticity is treated as implying momentum conservation

[ch8CollisionsOfPointMassesInTwoDimensions.md : 267](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch8CollisionsOfPointMassesInTwoDimensions.md#L267)

The statement that assuming an elastic collision also implies momentum conservation reverses the logical relationship. Conservation of the two-ball system’s momentum follows from negligible external impulse; elasticity means its kinetic energy is conserved. State the assumptions separately. This distinction matters in collisions involving walls, pivots, or external constraints.

## Chapter 9

### C35 · P2 · Torque independence of the origin also requires zero net force

[ch9TheSecondConditionForEquilibrium.md : 105](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch9TheSecondConditionForEquilibrium.md#L105); also [ch10CollisionsOfExtendedBodiesInTwoDimensions.md : 25](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10CollisionsOfExtendedBodiesInTwoDimensions.md#L25)

The passage says zero net torque about one point implies zero net torque about every point in an inertial frame. An inertial frame alone is insufficient. Changing the reference point changes torque by a term involving the displacement of the origin crossed with the net force. For example, one force has zero torque about its application point but nonzero torque about an offset point. Add “provided the first equilibrium condition, ΣF = 0, is also satisfied.” In §10.6, specify that the nailed-stick collision conserves angular momentum about the nail, rather than about every possible point.

### C36 · P2 · Static equilibrium is defined without requiring the body to be at rest

[ch9ApplicationsOfStaticsIncludingProblemSolvingStrategies.md : 28](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch9ApplicationsOfStaticsIncludingProblemSolvingStrategies.md#L28); also [ch9TheFirstConditionForEquilibrium.md : 173](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch9TheFirstConditionForEquilibrium.md#L173)

Zero linear and angular acceleration permit steady translation or rotation; they do not establish static equilibrium. Require the body to remain at rest in the chosen frame, in addition to balanced forces and torques. Correct the glossary at lines 528–530 and the static-equilibrium glossary in §9.1, which similarly omits the rest condition.

### C37 · P2 · Lever mechanical advantage requires perpendicular moment arms

[ch9SimpleMachines.md : 52](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch9SimpleMachines.md#L52)

The prose defines li and lo as distances from the pivot and then generalizes MA = li/lo to all levers. For oblique forces the relevant lengths are perpendicular distances to their lines of action, or ri sin θi and ro sin θo. Use that definition consistently in the body and the later wheelbarrow/shovel explanation; the initial caption already uses the correct “perpendicular lever arms.”

## Chapter 10

### C38 · P1 · The unrestricted claim for τ = Iα is false

[ch10DynamicsOfRotationalMotion.md : 109](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10DynamicsOfRotationalMotion.md#L109)

The section says the equation works for any torque, any object, and any axis. Its scalar form requires appropriate rotation about a fixed axis with constant I. The chapter’s own skater example provides a counterexample to the unrestricted statement: as I decreases, ω increases with zero external torque, so Iα need not vanish. In that case the axial relation is τ = d(Iω)/dt = Iα + ω dI/dt. General three-dimensional motion also needs vector angular momentum rather than an unrestricted scalar analogy. State the rigid-body/fixed-axis conditions and use τext = dL/dt as the general starting point.

### C39 · P1 · Closed systems do not necessarily conserve mechanical energy

[ch10RotationalKineticEnergy.md : 269](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10RotationalKineticEnergy.md#L269)

The strategy states “For closed systems, mechanical energy is conserved.” A closed system can exchange energy as work or heat, and even an isolated system can convert mechanical energy to internal energy through friction or an inelastic collision. Replace the criterion with the relevant physical assumptions: no net energy transfer into the mechanical degrees of freedom and no dissipative conversion out of them. For the ideal rolling examples, state that mechanical energy is conserved because dissipative losses are neglected and the no-slip contact does no work on the rigid rolling body.

### C40 · P2 · Total linear acceleration is identified with its tangential component

[ch10AngularAcceleration.md : 145](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10AngularAcceleration.md#L145); also [ch10DynamicsOfRotationalMotion.md : 30](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10DynamicsOfRotationalMotion.md#L30)

The prose says linear acceleration in circular motion is tangent to the circle, and the table uses α = a/r without labeling a as tangential. Total acceleration generally has both tangential and radial components: at = rα and ac = v²/r, with magnitude √(at² + ac²). Uniform circular motion has at = 0 and nonzero total acceleration. Use “tangential component of linear acceleration” consistently, including the caption, table, summary, and the opening derivation in §10.3.

### C41 · P2 · The rotational-kinematics table silently discards initial positions

[ch10KinematicsOfRotationalMotion.md : 79](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10KinematicsOfRotationalMotion.md#L79)

The table uses x = v̄t and θ = ω̄t and omits x0 and θ0 from the other equations, while the following paragraph explicitly introduces these initial values. Either state before the table that x and θ denote displacements with x0 = θ0 = t0 = 0, or retain initial coordinates: θ − θ0 = ω̄Δt and ω² = ω0² + 2α(θ − θ0), with corresponding translational expressions. Also keep the constant-acceleration condition attached to the endpoint-average formulas at line 93.

### C42 · P2 · The solar-system caption gives all planets the same spin direction

[ch10AngularMomentumAndItsConservation.md : 471](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10AngularMomentumAndItsConservation.md#L471)

The caption says planetary orbital motions and spins are all in the original cloud’s direction. Venus is a clear counterexample for spin. Explain that the system’s total angular momentum is conserved and that individual spin axes and senses can differ; orbital motion and spin should be distinguished. [NASA describes Venus’s retrograde rotation](https://science.nasa.gov/venus/venus-facts/).

## Mathematical presentation

These affect students’ reading of the teaching material even though the existing syntax checks pass.

### M01 · Escaped underscores are being typeset literally.

[ch10AngularAcceleration.md : 148](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10AngularAcceleration.md#L148)

For example, a\_{\text{t}} produces a literal underscore followed by t, rather than a subscript. The Markdown pipeline preserves TeX verbatim, so these old Markdown escapes must be removed inside mathematics. The scoped extraction contained 82 affected math spans across 29 files; representative cases include x\_{f}, F\_{\text{net}}, and a\_{\text{t}}. A direct MathJax comparison confirmed the malformed form contains an underscore token while a_{\text{t}} produces an msub element. Review occurrences in teaching text only.

### M02 · The commutativity equation has its delimiters after the expression.

[ch3VectorAdditionAndSubtractionGraphicalMethods.md : 363](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L363)

The source is `\vb{A}+\vb{B}=\vb{B}+\vb{A}$$.$$`; wrap the whole expression in a matched pair of math delimiters. The current delimiters enclose only the period.

### M03 · Misplaced delimiters enclose normal-force prose as mathematics.

[ch4NormalTensionAndOtherExamplesOfForces.md : 65](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4NormalTensionAndOtherExamplesOfForces.md#L65)

Close the first math span immediately after `\vb{N}`, then delimit the separate equation `\vb{N}=100 \N`. The current sequence encloses prose and splits the equation across separate math/text spans.

### M04 · Encoded HTML tags appear between equations.

[ch4NormalTensionAndOtherExamplesOfForces.md : 216](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4NormalTensionAndOtherExamplesOfForces.md#L216)

Replace literal `&lt;/div&gt; &lt;div class="equation"&gt;` with the intended markup, or remove the redundant wrappers. The spring-energy definition in §7.4 also contains an encoded opening div at line 70.

## Prose and cross-references

| Location                                                                                                                                                                                                           | Correction                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ch1AccuracyPrecisionAndSignificantFigures.md : 32](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch1AccuracyPrecisionAndSignificantFigures.md#L32)             | “is refers to” → “refers to”; remove the stranded opening parenthesis in the following line.                                                                                                      |
| [ch4DevelopmentOfForceConcept.md : 49](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4DevelopmentOfForceConcept.md#L49)                                       | Restore the broken sentence “standard forces. is the magnetic force … current.)”. It currently lacks its beginning and has an unmatched closing parenthesis.                                      |
| [ch3VectorAdditionAndSubtractionGraphicalMethods.md : 33](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md#L33) | “can also represented” → “can also be represented”; “We will used” → “We will use”.                                                                                                               |
| [ch4NewtonsThirdLawOfMotion.md : 83](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch4NewtonsThirdLawOfMotion.md#L83)                                           | “In a situation similar to Sancho’s” has no introduced referent in the revised baseball opening; remove or replace the reference.                                                                 |
| [ch9ForcesAndTorquesInMusclesAndJoints.md : 155](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch9ForcesAndTorquesInMusclesAndJoints.md#L155)                   | “all having mechanical advantages one” is missing “much less than” before “one”.                                                                                                                  |
| [ch9SimpleMachines.md : 132](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch9SimpleMachines.md#L132)                                                           | “Inclined lanes” → “inclined planes”.                                                                                                                                                             |
| [ch10RotationalKineticEnergy.md : 26](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10RotationalKineticEnergy.md#L26)                                         | Work is introduced in Chapter 7, rather than the linked Chapter 6. The same incorrect Chapter 6 destination appears at lines 80 and 391. Link the relevant work, energy, or conservation section. |
| [ch10AngularMomentumAndItsConservation.md : 42](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch10AngularMomentumAndItsConservation.md#L42)                     | Linear momentum is introduced in Chapter 8, rather than the linked Chapter 6.                                                                                                                     |
| [ch8ElasticCollisionsInOneDimension.md : 207](https://github.com/veillette/physics-book/blob/f3e820fcc52dbe3f2de08935b3a25f460ab09120/contents/ch8ElasticCollisionsInOneDimension.md#L207)                         | The collision-lab simulation caption says “Masses and Springs”; change it to “Collision Lab”.                                                                                                     |

## Validation after corrections

- The site builds successfully.
- The math-delimiter and equation checks pass on the teaching text in all 73 files. All 2,028 extracted math spans compile with the configured MathJax macros, and no escaped subscript markers remain in these spans.
- The repaired commutativity and normal-force equations render as mathematics; the energy table renders with all 11 country rows and its expected anchor. Local chapter link destinations exist.
- A comparison against original copies confirms that exercises, worked examples, solutions, and investigations are unchanged.
- The content-quality check reports no errors. Its one warning flags the repeated groups of zeros in the unchanged number “1/10 000 000.”

- The repository-wide CI commands pass locally: ESLint, formatting, content checks, physics calculations, 145 unit tests, link checking, and the Eleventy build with its marker checks. The CI workflow now also runs on pushes to main.

## Original review: verification and limits

- Checked the review scope against the table of contents and the 73 matching source files.
- Ran the repository’s math-delimiter and equation validators on a temporary extraction excluding example/problem/solution containers and question/exercise sections. Both reported zero errors and zero warnings. These checks validate source syntax, rather than physical correctness or correct placement of mathematically balanced delimiters.
- Compiled 2,057 extracted `$$…$$` spans with the installed MathJax and the textbook’s configured macros; no TeX parser errors were reported. Direct MathML inspection nevertheless confirmed the literal-underscore problem. A successful parse does not establish that the intended notation is rendered.
- Inspected the actual graph images for the 525 m reading and the elasticity slope, and checked the simple numerical counterexamples and table percentages in the findings.
- Checked selected external factual claims against the primary sources linked at the relevant findings. Calculations and counterexamples in this report are reviewer reasoning, rather than quotations from those sources.
- This is a source-content review. It does not certify every historical anecdote, biological claim, numerical table entry, diagram, external link, simulation, or rendered page. It is not a review of exercises or solutions.
