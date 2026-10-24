# Animated figures in chapters 1–13

The chapter 1–13 review is implemented as 39 animation ideas in 40 SVG assets.
The accuracy/precision comparison uses two target images. In multi-image
constructions, the last image carries the animated companion and the preceding
stages remain available as static reference drawings.

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
