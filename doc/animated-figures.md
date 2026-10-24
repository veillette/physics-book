# Animated figures in chapters 1–25

The chapter 1–13 review is implemented as 39 animation ideas in 40 SVG assets.
The accuracy/precision comparison uses two target images. In multi-image
constructions, the last image carries the animated companion and the preceding
stages remain available as static reference drawings.

The chapter 14–25 review adds eleven selected ideas in thirteen SVG assets.
Equipotentials and carrier current each use two figures. All original artwork is
retained above the new companions.

Most source diagrams remain intact above an animated companion. The Chapter 1
targets and meter diagram are redrawn as accessible SVGs. The elevator, swimmer,
rocket sled, and skater receive new schematic companions alongside their original
illustrations. Companion figures do not increment the book’s figure counters.

Every new animation has a complete static alternative for reduced motion and
printing. In the book viewer, **Show static figure** selects that alternative;
**Play animation** returns to the moving view. No scripts run inside SVG files.
**Open full-size figure** opens the scalable artwork separately, including on small screens.
The animation control is hidden for reduced motion and print.

## Source and regeneration

- [Drawing and animation definitions](../scripts/figures/animations01to13.js)
- [Analytic motion models](../scripts/figures/animation-models.js)
- [Physics and SVG checks](../tests/animation-models.test.js)
- [Chapter 14–25 animations](../scripts/figures/animations14to25.js)
- [Chapter 14–25 physics models](../scripts/figures/animation-models14to25.js)
- [Chapter 14–25 physics and SVG checks](../tests/animation-models14to25.test.js)
- [Shared SVG animation rendering](../scripts/figures/animation-svg.js)
- [Viewer controls](../assets/js/figure-animations.js)

Run `npm run generate:figures` to regenerate the images and viewer registry.
Run `npm run check:figures:generated` to check for drift. SVG enhancement happens
in the generation pipeline; base figure builders remain available to tests that
inspect their original force diagrams and graph geometry.

The companions label their assumptions. Some compare geometry or equal heights
rather than physical time. Physical motion models use consistent position,
velocity, acceleration, momentum, and flow relationships. Drawing deformation and
molecular motion are schematic, not calibrated microscopic simulations. The
four-rocket sled uses a short-interval constant-mass approximation. Hydraulic
forces refer to ideal pressure increments, neglecting piston weight and head.

## Implemented ideas

### Chapter 1

- Accuracy versus precision: [Figure_01_03_03.svg](../resources/Figure_01_03_03.svg), [Figure_01_03_04.svg](../resources/Figure_01_03_04.svg).
- Defining the meter: [Figure_01_02_04.svg](../resources/Figure_01_02_04.svg).
- Measurement uncertainty: [concept_01_03_q01.svg](../resources/concept_01_03_q01.svg).

### Chapter 2

- Signs of velocity and acceleration: [Figure_02_04_03.svg](../resources/Figure_02_04_03.svg).
- Distance versus displacement: [Figure_02_01_05.svg](../resources/Figure_02_01_05.svg).
- Free fall at equal time intervals: [Figure_02_07_06.svg](../resources/Figure_02_07_06.svg).

### Chapter 3

- Head-to-tail vector addition: [Figure_03_02_07.svg](../resources/Figure_03_02_07.svg).
- Boat crossing a river: [Figure_03_05_01.svg](../resources/Figure_03_05_01.svg).
- Falling object on a moving ship: [Figure_03_05_05.svg](../resources/Figure_03_05_05.svg).

### Chapter 4

- Elevator scale reading: [companion_04_07_elevator.svg](../resources/companion_04_07_elevator.svg).
- Swimmer pushing off a wall: [companion_04_04_swimmer.svg](../resources/companion_04_04_swimmer.svg).
- Rocket sled and net force: [companion_04_03_sled.svg](../resources/companion_04_03_sled.svg).

### Chapter 5

- Static friction becoming sliding friction: [Figure_05_01_01.svg](../resources/Figure_05_01_01.svg).
- Hooke’s law and elastic limit: [Figure_05_03_01.svg](../resources/Figure_05_03_01.svg).
- Tension and compression: [Figure_05_03_03.svg](../resources/Figure_05_03_03.svg).

### Chapter 6

- Same angular speed, different linear speeds: [Figure_06_01_03.svg](../resources/Figure_06_01_03.svg).
- Forces on a banked curve: [Figure_06_03_03.svg](../resources/Figure_06_03_03.svg).
- Rotating versus inertial reference frames: [Figure_06_04_02.svg](../resources/Figure_06_04_02.svg).

### Chapter 7

- Work as area under a force graph: [Figure_07_02_01.svg](../resources/Figure_07_02_01.svg).
- Path dependence of frictional work: [Figure_07_05_01.svg](../resources/Figure_07_05_01.svg).
- Same height reached by different routes: [Figure_07_04_03.svg](../resources/Figure_07_04_03.svg).

### Chapter 8

- Impulse as area under force–time curve: [Figure_08_02_01.svg](../resources/Figure_08_02_01.svg).
- Rocket and exhaust momentum: [Figure_08_07_01.svg](../resources/Figure_08_07_01.svg).
- Center of mass after fragmentation: [Figure_08_03_02.svg](../resources/Figure_08_03_02.svg).

### Chapter 9

- Pencil tipping threshold: [Figure_09_03_04.svg](../resources/Figure_09_03_04.svg).
- Neutral equilibrium: [Figure_09_03_07.svg](../resources/Figure_09_03_07.svg).
- Crank and wheel mechanical advantage: [Figure_09_05_03.svg](../resources/Figure_09_05_03.svg).

### Chapter 10

- Tangential and radial acceleration: [Figure_10_01_03.svg](../resources/Figure_10_01_03.svg).
- Sliding versus rolling race: [Figure_10_04_06.svg](../resources/Figure_10_04_06.svg).
- Skater changing rotational inertia: [companion_10_05_skater.svg](../resources/companion_10_05_skater.svg).

### Chapter 11

- Hydraulic force multiplication: [Figure_11_05_01.svg](../resources/Figure_11_05_01.svg).
- Buoyancy equals displaced-fluid weight: [Figure_11_07_03.svg](../resources/Figure_11_07_03.svg).
- Positive and negative gauge pressure: [Figure_11_06_02.svg](../resources/Figure_11_06_02.svg).

### Chapter 12

- Venturi entrainment: [Figure_12_02_05.svg](../resources/Figure_12_02_05.svg).
- Osmosis and osmotic pressure: [Figure_12_07_04.svg](../resources/Figure_12_07_04.svg).
- Uniform versus parabolic velocity profile: [Figure_12_04_04.svg](../resources/Figure_12_04_04.svg).

### Chapter 13

- Evaporation and condensation: [Figure_13_06_01.svg](../resources/Figure_13_06_01.svg).
- Bubble growth as water heats: [Figure_13_06_02.svg](../resources/Figure_13_06_02.svg).
- Reading a phase diagram: [Figure_13_05_05.svg](../resources/Figure_13_05_05.svg).

### Chapters 14–25: eleven selected ideas

- Chapter 14, conduction through a layered wall: [companion_14_composite_wall.svg](../resources/companion_14_composite_wall.svg). A moving probe follows temperature through gypsum, insulation, and brick with constant steady heat flux.
- Chapter 15, heat-pump energy accounting: [Figure_15_05_01.svg](../resources/Figure_15_05_01.svg). Cumulative heat and work obey Q hot = Q cold + W, including when heating COP exceeds one.
- Chapter 15, entropy budget: [companion_15_entropy_budget.svg](../resources/companion_15_entropy_budget.svg). The two reservoir changes sum to a positive total as heat passes from 600 K to 250 K.
- Chapter 16, interference versus relative phase: [Figure_16_10_03.svg](../resources/Figure_16_10_03.svg). Fixed-instant snapshots vary the phase parameter between equal-frequency waves and display their pointwise sum. Figure 16.10.2 remains a static reference.
- Chapter 18, Coulomb force versus separation: [Figure_18_03_02.svg](../resources/Figure_18_03_02.svg). Like and unlike charges have equal and opposite forces that fall by a factor of four when separation doubles.
- Chapter 19, work along and across equipotentials: [Figure_19_04_01.svg](../resources/Figure_19_04_01.svg), [Figure_19_04_04.svg](../resources/Figure_19_04_04.svg). Imposed probe paths distinguish zero work along an equipotential from electric work −qΔV across it.
- Chapter 20, electron drift and conventional current: [Figure_20_01_03.svg](../resources/Figure_20_01_03.svg), [Figure_20_01_06.svg](../resources/Figure_20_01_06.svg). Signed charge and drift direction determine current; accumulated charge obeys Q = It. Dots represent many carriers and drift is enlarged.
- Chapter 20, resistance versus geometry: [Figure_20_03_01.svg](../resources/Figure_20_03_01.svg). Length and area change independently with material, temperature, and voltage fixed.
- Chapter 20, instantaneous and average AC power: [Figure_20_05_03.svg](../resources/Figure_20_05_03.svg). A pure resistor has in-phase voltage and current, nonnegative twice-frequency power, and the correct mean.
- Chapter 21, real battery with a changing load: [Figure_21_02_05.svg](../resources/Figure_21_02_05.svg). Current and internal loss decrease as load resistance increases; terminal voltage approaches the emf.
- Chapter 24, wavelength and frequency: [Figure_24_03_01.svg](../resources/Figure_24_03_01.svg). A logarithmic selector spans sixteen frequency decades with fλ = c in vacuum. Each state rescales space and time; the wave is a local schematic, not a fixed-scale propagation model.
