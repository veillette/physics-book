# Animated figures in chapters 1–34

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

## Second batch: 44 more animations in chapters 1–13

Defined in [animations01to13extra.js](../scripts/figures/animations01to13extra.js),
with models in [animation-models.js](../scripts/figures/animation-models.js) and
checks in [animations01to13extra.test.js](../tests/animations01to13extra.test.js).
Shared drawing helpers live in [animation-svg.js](../scripts/figures/animation-svg.js).
Generated figures at least 450 units wide get an inset below the original
drawing. Narrower figures and photographs get a standalone `companion_*` figure
placed after them in the text, so the original is not enlarged.

Numbers come from the book’s examples and exercises where one applies (the
traffic light, forearm, pole vaulter, sandwich board, merry-go-round, dark-room
collision, skydiver, and ice-block exercise). Schematic scenes say so in
their notes.

### Chapter 1

- Orders of magnitude on a logarithmic axis: [companion_01_02_scales.svg](../resources/companion_01_02_scales.svg).
- Counting cesium oscillations: [companion_01_02_cesium.svg](../resources/companion_01_02_cesium.svg).

### Chapter 2

- Subway train with synchronized x, v and a graphs: [Figure_02_04_10.svg](../resources/Figure_02_04_10.svg).
- Area under v–t equals displacement: [Figure_02_08_03.svg](../resources/Figure_02_08_03.svg).
- Tangent slope flattening near top speed: [Figure_02_08_06.svg](../resources/Figure_02_08_06.svg).
- Knowns sketches in motion: [Figure_02_04_05.svg](../resources/Figure_02_04_05.svg), [Figure_02_04_09.svg](../resources/Figure_02_04_09.svg), [Figure_02_07_04.svg](../resources/Figure_02_07_04.svg).
- Displacement proportional to average velocity: [Figure_02_05_03.svg](../resources/Figure_02_05_03.svg).

### Chapter 3

- Walker’s distance versus displacement: [Figure_03_01_04.svg](../resources/Figure_03_01_04.svg).
- Components through a full rotation: [companion_03_03_components.svg](../resources/companion_03_03_components.svg).
- Adding by components: [Figure_03_03_07.svg](../resources/Figure_03_03_07.svg).
- Subtracting by adding −B: [Figure_03_03_10.svg](../resources/Figure_03_03_10.svg).

### Chapter 4

- Tightrope sag and tension: [Figure_04_05_07.svg](../resources/Figure_04_05_07.svg).
- Traffic-light force balance: [companion_04_07_traffic_light.svg](../resources/companion_04_07_traffic_light.svg).
- Exchange of a ball between skaters: [companion_04_08_exchange.svg](../resources/companion_04_08_exchange.svg).
- One force on a ball and an SUV: [companion_04_03_same_force.svg](../resources/companion_04_03_same_force.svg).

### Chapter 5

- Terminal velocity: [companion_05_02_terminal.svg](../resources/companion_05_02_terminal.svg).
- Pushing versus pulling at an angle: [companion_05_01_push_pull.svg](../resources/companion_05_01_push_pull.svg).
- Tendon stress–strain and fiber crimp: [Figure_05_03_05.svg](../resources/Figure_05_03_05.svg).

### Chapter 6

- Defining the radian: [companion_06_01_radian.svg](../resources/companion_06_01_radian.svg).
- String-and-pins ellipse: [Figure_06_06_01.svg](../resources/Figure_06_06_01.svg).
- Inverse-square force: [Figure_06_05_02.svg](../resources/Figure_06_05_02.svg).
- Friction on a flat curve: [Figure_06_03_01.svg](../resources/Figure_06_03_01.svg).

### Chapter 7

- Coasting car energy bars: [Figure_07_06_02.svg](../resources/Figure_07_06_02.svg).
- Rock on a spring and on soil: [companion_07_05_rocks.svg](../resources/companion_07_05_rocks.svg).

### Chapter 8

- Elastic backscatter: [Figure_08_03_03.svg](../resources/Figure_08_03_03.svg).
- Dark-room collision and momentum triangle: [Figure_08_06_02.svg](../resources/Figure_08_06_02.svg).

### Chapter 9

- Biceps force as a book slides out: [companion_09_06_forearm.svg](../resources/companion_09_06_forearm.svg).
- Pole vaulter’s hand forces: [companion_09_04_pole.svg](../resources/companion_09_04_pole.svg).
- Sandwich-board chain tension: [Figure_09_03_14.svg](../resources/Figure_09_03_14.svg).

### Chapter 10

- Twin skaters linking hands: [companion_10_06_twins.svg](../resources/companion_10_06_twins.svg).
- Gyroscope precession: [companion_10_07_gyroscope.svg](../resources/companion_10_07_gyroscope.svg).
- Pushing a merry-go-round three ways: [companion_10_03_merry.svg](../resources/companion_10_03_merry.svg).

### Chapter 11

- Particles in solids, liquids and gases: [companion_11_01_phases.svg](../resources/companion_11_01_phases.svg).
- Loading a ship: [companion_11_07_ship.svg](../resources/companion_11_07_ship.svg).
- Blood-pressure cuff: [companion_11_06_cuff.svg](../resources/companion_11_06_cuff.svg).

### Chapter 12

- Laminar versus turbulent flow: [Figure_12_04_02.svg](../resources/Figure_12_04_02.svg).
- Semipermeable membrane: [Figure_12_07_03.svg](../resources/Figure_12_07_03.svg).
- Car passing a truck: [companion_12_02_passing.svg](../resources/companion_12_02_passing.svg).

### Chapter 13

- Compressing a vapor along an isotherm: [Figure_13_05_04.svg](../resources/Figure_13_05_04.svg).
- Cooling toward absolute zero: [Figure_13_05_01.svg](../resources/Figure_13_05_01.svg).
- Why lakes freeze from the top: [Figure_13_02_03.svg](../resources/Figure_13_02_03.svg).
- Three ways to change tire pressure: [Figure_13_03_03.svg](../resources/Figure_13_03_03.svg).

## Chapters 26 and 27: sixteen optics animations

Defined in [animations26to27.js](../scripts/figures/animations26to27.js), with
analytic states in [animation-models26to27.js](../scripts/figures/animation-models26to27.js)
and checks in [animation-models26to27.test.js](../tests/animation-models26to27.test.js).
Twelve generated SVGs retain their original artwork above an animated inset.
Four standalone companions are placed beside the original eye, resolution, and
three-polarizer illustrations without incrementing figure counters. Every image
uses the existing static/play and full-size controls, reduced-motion fallback,
and static print view. The original JPEGs and hand-authored solution SVG remain.

### Chapter 26

- Accommodation: [companion_26_01_accommodation.svg](../resources/companion_26_01_accommodation.svg). An equivalent thin eye lens changes from 50 to 54 D while the retina remains 2 cm away; the inverted image stays on it.
- Vision correction: [companion_26_02_vision_correction.svg](../resources/companion_26_02_vision_correction.svg). Fixed-power myopic and hyperopic examples use negative and positive corrections, respectively, in an explicitly stated lenses-in-contact approximation.
- Numerical aperture and immersion: [Figure_26_04_05.svg](../resources/Figure_26_04_05.svg). A 35° ray in cover glass refracts into air, water, or oil; the same objective aperture collects different rays. NA uses the half-angle in the immersion medium.
- Fiber acceptance: [Figure_26_04_04.svg](../resources/Figure_26_04_04.svg). Snell refraction and the critical angle determine guidance. Outside the acceptance cone, Fresnel power splits between reflection and leakage rather than disappearing.
- Reflecting telescope: [Figure_26_05_03.svg](../resources/Figure_26_05_03.svg). Equal-distance tracers follow the original spherical primary and flat diagonal ray geometry through the eyepiece. Tracers illustrate paths, not delayed image formation.
- Chromatic aberration: [Figure_26_06_01.svg](../resources/Figure_26_06_01.svg). A detector scans the fixed color foci. The illustrative doublet matches two wavelengths while retaining secondary spectrum; spots describe geometric blur.
- Spherical aberration: [Figure_26_06_03.svg](../resources/Figure_26_06_03.svg). The original two-spherical-surface trace is shared by the animation. An iris blocks marginal rays; the detector stays near the paraxial focus. Diffraction is deliberately excluded from this geometric comparison.

### Chapter 27

- Huygens wavelets: [Figure_27_02_02.svg](../resources/Figure_27_02_02.svg). Simultaneously emitted semicircular wavelets grow with radius vt and construct the advancing tangent wavefront.
- Double-slit probe: [Figure_27_03_05.svg](../resources/Figure_27_03_05.svg). Exact path lengths drive relative phase and normalized intensity as an observation point scans the screen. Figure 27.3.4 remains a reference.
- Fringe spacing: [Figure_27_03_08.svg](../resources/Figure_27_03_08.svg). Wavelength, slit separation, and screen distance change in separate stages within the far-field, small-angle approximation. The identical base drawing in Figure 27.4.6 stays static.
- Single-slit diffraction: [Figure_27_05_03.svg](../resources/Figure_27_05_03.svg). Width falls from 6λ to 2λ at fixed wavelength, widening the central band. Intensity curves use the sinc-squared law and are normalized to their central peak.
- Grating sharpness: [Figure_27_04_03.svg](../resources/Figure_27_04_03.svg). Integer slit counts 2, 4, 8, and 16 sharpen the principal maxima at fixed spacing. Each curve is normalized to its own peak; no absolute-power comparison is implied.
- Rayleigh resolution: [companion_27_06_rayleigh.svg](../resources/companion_27_06_rayleigh.svg). Two mutually incoherent Airy intensities add. Separation changes first, then aperture changes at fixed separation. Angular axes retain their initial scale; profiles normalize to one source’s peak at each aperture.
- Thin-film phase: [Figure_27_07_02.svg](../resources/Figure_27_07_02.svg). At normal incidence in an air–film–air stack, a two-beam Fresnel model includes unequal amplitudes and the top-surface phase reversal. It omits further internal reflections and labels its geometric thickness schematic.
- Malus’s law: [Figure_27_08_07.svg](../resources/Figure_27_08_07.svg). The analyzer rotates through 180°; signed field projection and its nonnegative squared intensity stay distinct. Input light is already linearly polarized.
- Crossed polarizers: [companion_27_08_crossed_polarizers.svg](../resources/companion_27_08_crossed_polarizers.svg). A rotating middle axis gives sequential projections of unpolarized input, with maximum output I0/8 at 45°. The original solution diagram stays above it.

## Chapters 28–30: sixteen relativity and quantum animations

Definitions are in [animations28to30.js](../scripts/figures/animations28to30.js),
with physical states in [animation-models28to30.js](../scripts/figures/animation-models28to30.js)
and checks in [animation-models28to30.test.js](../tests/animation-models28to30.test.js).
Thirteen original SVGs retain their artwork above an animated inset. Three
standalone companions follow the original relativity JPEGs without incrementing
figure counters. All use static/play controls, full-size links, and independent
reduced-motion and print drawings. Motion is illustrative unless a clock or
elapsed model time is explicitly defined.

### Chapter 28

- Light clock: [companion_28_02_light_clock.svg](../resources/companion_28_02_light_clock.svg). At v = 0.60c, the moving mirrors and photon share their longitudinal coordinate, the photon moves at c in either frame, and the elapsed ground time is 1.25 times the proper interval.
- Simultaneity: [companion_28_02_simultaneity.svg](../resources/companion_28_02_simultaneity.svg). The same two emission events have equal rest-frame times but different Lorentz-transformed ground times. These are synchronized-clock event coordinates, not signal-arrival times.
- Length contraction: [companion_28_03_length.svg](../resources/companion_28_03_length.svg). Longitudinal length is L0/γ; transverse size stays fixed. Each observer uses simultaneous endpoint positions in their measuring frame; the drawing is not an apparent photographic shape.
- Velocity addition: [Figure_28_04_05.svg](../resources/Figure_28_04_05.svg). A forward launch at u′ = 0.75c is compared with the classical sum while ship speed changes. The latter is explicitly a comparison; light still transforms to c.
- Momentum: [Figure_28_05_02.svg](../resources/Figure_28_05_02.svg). A cursor compares p/(mc) = γv/c with its classical limit on a fixed scale, stopping at 0.97c.
- Kinetic energy: [Figure_28_06_03.svg](../resources/Figure_28_06_03.svg). K/(mc²) = γ − 1 is compared with the classical limit. Rest energy is excluded from K.

### Chapter 29

- Blackbody spectrum: [Figure_29_01_01.svg](../resources/Figure_29_01_01.svg). Temperature rises from 3000 to 6000 K. The Planck curves share one vertical scale; the peak follows Wien’s law and the displayed bolometric power ratio follows T⁴.
- Photoelectric threshold: [Figure_29_02_03.svg](../resources/Figure_29_02_03.svg). Photon energy crosses a 2 eV work function. Below threshold the animation says no emission; above it K max = hf − work. This is the one-photon regime.
- Compton scattering: [Figure_29_04_02.svg](../resources/Figure_29_04_02.svg). A 100 keV photon’s scattering angle controls its energy loss, wavelength shift, and a closed momentum triangle. The recoiling electron obeys the relativistic energy-momentum relation.
- Diffraction buildup: [Figure_29_07_01.svg](../resources/Figure_29_07_01.svg). A seeded sample of 240 independent detections is revealed in small groups. Its histogram approaches the expectation for the normalized density 2 sin²(5πx). The spots are not a particle trajectory.
- Matter wavelength: [Figure_29_08_01.svg](../resources/Figure_29_08_01.svg). Electron kinetic energy changes from 50 to 800 eV. Relativistic momentum sets λ = h/p; an equal-wavelength photon has equal momentum but different energy and speed. Both profiles are schematic instantaneous phase drawings on a fixed spatial span.

### Chapter 30

- Rutherford scattering: [Figure_30_02_08.svg](../resources/Figure_30_02_08.svg). Repulsive Coulomb hyperbolas use four impact parameters. Dots follow equal elapsed dimensionless time obtained from angular momentum conservation; the energy and impact-angle relation are checked. The nucleus is drawn enlarged and electrons are omitted.
- Hydrogen transitions: [Figure_30_03_07.svg](../resources/Figure_30_03_07.svg). Selected Balmer transitions n = 3, 4, 5, 6 to n = 2 emit photons with energies from the rounded book levels −13.6 eV/n². Atomic states change discretely; transition arrows indicate energy gaps, not spatial electron motion.
- Ring waves: [Figure_30_06_01.svg](../resources/Figure_30_06_01.svg). The historical Bohr–de Broglie boundary-condition illustration fits three or four wavelengths around a ring. Radial displacement is a drawing aid for amplitude; no electron orbit or calibrated atomic phase clock is implied.
- Ruby laser: [Figure_30_05_16.svg](../resources/Figure_30_05_16.svg). A 2.30 eV pump leads to 0.51 eV nonradiative loss and 1.79 eV stored excitation. A 1.79 eV seed produces two matched outgoing photons. Pump plus seed balances stored energy, heat, and output throughout the illustrated cycle.
- Pauli exclusion: [Figure_30_09_02.svg](../resources/Figure_30_09_02.svg). Trials show why a 1s orbital accepts opposite spin projections but rejects duplicate quantum numbers and a third electron. A subsequent electron can occupy 2s. Arrows denote spin projection rather than literal rotation.

## Chapters 31–34: twenty nuclear, particle and cosmology animations

Definitions are in [animations31to34.js](../scripts/figures/animations31to34.js),
with states in [animation-models31to34.js](../scripts/figures/animation-models31to34.js)
and checks in [animation-models31to34.test.js](../tests/animation-models31to34.test.js).
All twenty original SVGs retain their artwork above an animated inset. They use
the existing static/play and full-size controls, independent reduced-motion and
print drawings, and unchanged figure numbers. Progress sweeps a parameter or
illustrates a sequence unless a model clock is explicitly stated.

### Chapter 31

- Alpha recoil: [Figure_31_04_02.svg](../resources/Figure_31_04_02.svg). U-238 becomes Th-234 plus He-4, conserving A and Z. Opposite recoil uses masses proportional to A. Nuclear sizes and absolute speeds are schematic.
- Beta-minus bookkeeping: [Figure_31_04_04.svg](../resources/Figure_31_04_04.svg). A neutron becomes a proton, electron and electron antineutrino. Charge, baryon number and lepton number balance. Separating labels does not specify three-body kinematics.
- Half-life: [Figure_31_05_01.svg](../resources/Figure_31_05_01.svg). Eighty seeded independent exponential lifetimes are compared with the ensemble curve over four half-lives. A finite sample need not halve exactly.
- Mass defect: [Figure_31_06_03.svg](../resources/Figure_31_06_03.svg). Free proton and neutron mass energies exceed the deuteron mass energy by about 2.225 MeV. The capture sequence illustrates energy release; photon recoil and the small input kinetic energy are not drawn quantitatively.
- Force range: [Figure_31_06_04.svg](../resources/Figure_31_06_04.svg). Independently normalized exponential and inverse-square magnitudes compare short-range nuclear attraction with Coulomb repulsion. The exponential is qualitative, not a fitted nuclear potential.
- Tunneling: [Figure_31_07_03.svg](../resources/Figure_31_07_03.svg). Increasing rectangular-barrier width lowers the exact stationary transmission at E/V0 = 0.4. Probability-current fractions sum to one; no under-barrier trajectory or traversal time is assigned.

### Chapter 32

- Fusion energy: [Figure_32_05_02.svg](../resources/Figure_32_05_02.svg). D + T becomes He-4 + n with Q approximately 17.6 MeV. With negligible input kinetic energy and masses approximated by A, the products receive about 3.5 and 14.1 MeV. Positions are schematic.
- Coulomb turning point: [Figure_32_05_03.svg](../resources/Figure_32_05_03.svg). A radial classical approach converts K into U until K vanishes, then reverses. The cursor sweeps separation rather than uniform time; this model does not describe tunneling or nuclear contact.
- Fission sequence: [Figure_32_06_02.svg](../resources/Figure_32_06_02.svg). Neutron capture produces excited U-236, followed by one possible Ba-141 + Kr-92 + 3n channel. A and Z balance; schematic positions do not claim exact recoil geometry. Other channels, photons and subsequent beta decay are omitted.
- Multiplication factor: [Figure_32_06_03.svg](../resources/Figure_32_06_03.svg). Discrete generations compare expected populations for k = 0.7, 1 and 1.5. Leakage and capture are included in effective k; fluctuations, delayed neutrons and feedback are excluded.

### Chapter 33

- Cyclotron: [Figure_33_03_02.svg](../resources/Figure_33_03_02.svg). Eight equal-duration semicircles use a nonrelativistic thin-gap model with m = qB = qΔV = 1. Energy increases only at gap crossings, the accelerating field reverses each half-turn, and r = mv/qB increases while f stays constant.
- Synchrotron: [Figure_33_03_03.svg](../resources/Figure_33_03_03.svg). A fixed-radius orbit uses relativistic p and a magnetic field proportional to p. Integrated phase makes angular speed proportional to v. A continuous ramp approximates many RF kicks; the gold marker locates a cavity.
- Annihilation: [Figure_33_04_02.svg](../resources/Figure_33_04_02.svg). An electron and positron each have 100 keV kinetic energy in their center-of-momentum frame, producing opposite photons of about 611 keV each. Rest and kinetic energy both contribute.
- Quark charges: [Figure_33_05_01.svg](../resources/Figure_33_05_01.svg). Separate proton, neutron and charged-pion examples add valence electric charges, including opposite antiquark charges. Transitions between examples are discrete; circle positions and purple fill imply no orbit, spin or color-charge state.
- Electron probe: [Figure_33_05_03.svg](../resources/Figure_33_05_03.svg). K rises logarithmically from 100 MeV to 100 GeV. Relativistic p sets the de Broglie wavelength; the displayed wave has explicit upper and lower drawing limits. Actual scattering resolution also depends on momentum transfer.

### Chapter 34

- Expansion: [Figure_34_01_05.svg](../resources/Figure_34_01_05.svg). A scale-factor sweep doubles fixed-comoving separations while galaxy symbols keep their sizes. Recession arrows grow with distance and 1 + z follows the scale-factor ratio. The highlighted observer is not a physical center; this is not an age model.
- Parallax: [Figure_34_01_09.svg](../resources/Figure_34_01_09.svg). A projected annual orbit changes the line of sight to a star 2 pc away. Readouts use the geometric angle; p is about 0.5 arcsec and opposite extrema differ by 2p. The drawing greatly enlarges angular changes and compresses distance.
- Accelerating elevator: [Figure_34_02_01.svg](../resources/Figure_34_02_01.svg). The same pulse is straight in an initial inertial frame and drops by at²/2 in room coordinates. This is a local, low-velocity approximation with vertical displacement enlarged relative to horizontal distance.
- Solar deflection: [Figure_34_02_02.svg](../resources/Figure_34_02_02.svg). The weak-field formula 4GM/(bc²) gives about 1.75 arcsec at the limb and decreases as impact parameter grows. The broken-ray drawing exaggerates the angle and is not a numerical geodesic.
- Superconductivity: [Figure_34_06_01.svg](../resources/Figure_34_06_01.svg). Cooling mercury through about 4.2 K switches an idealized normalized resistance from one to zero. The step is not a fit to measured transition width or normal-state resistance; critical current and field limits are assumed satisfied.

The accelerator conventions were cross-checked against CERN’s
[accelerator overview](https://home.cern/how-accelerator-works/)
and [RF cavity description](https://home.web.cern.ch/science/engineering/accelerating-radiofrequency-cavities/).
The astronomy illustrations follow the explanations of
[gravitational light deflection](https://www.einstein-online.info/en/spotlight/light_deflection/)
and [cosmological wavelength stretching](https://www.jpl.nasa.gov/edu/resources/lesson-plan/math-of-the-expanding-universe/).
