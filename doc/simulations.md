# Interactive simulation sources

Reviewed October 20, 2026. Prefer published PhET HTML5 simulations at
`https://phet.colorado.edu/sims/html/<name>/latest/<name>_en.html`.
Use independent OpenLyceum browser rebuilds where they preserve the activity
and no equivalent published PhET HTML5 version was found.

## OpenLyceum activities

| Activity                                                       | Browser simulation                                  |
| -------------------------------------------------------------- | --------------------------------------------------- |
| Moving Man                                                     | https://openlyceum.github.io/MovingMan/             |
| Ladybug Motion 2D (including the former Motion in 2D activity) | https://openlyceum.github.io/LadyBug/               |
| The Ramp                                                       | https://openlyceum.github.io/TheRamp/               |
| Stern–Gerlach Experiment                                       | https://openlyceum.github.io/SternGerlach/          |
| Electric Field of Dreams                                       | https://openlyceum.github.io/ElectricFieldOfDreams/ |
| Maze Game                                                      | https://openlyceum.github.io/MazeGame/              |
| Radio Waves                                                    | https://openlyceum.github.io/RadioWaves/            |
| Lunar Lander                                                   | https://openlyceum.github.io/LunarLander/           |

`?screens=` is 1-based. These embeds show one screen of an original (not PhET) simulation.

| Section                                      | Screen                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Simultaneity and Time Dilation               | Special Relativity, light clock (`screens=1`) and twin paradox (`screens=4`)               |
| Length Contraction                           | Special Relativity, length contraction (`screens=3`)                                       |
| Carnot’s Perfect Heat Engine                 | Carnot Heat Engine, cycle (`screens=1`) and efficiency (`screens=2`)                       |
| Heat Pumps and Refrigerators                 | Carnot Heat Engine, reversed cycle (`screens=3`)                                           |
| Doppler Effect and Sonic Booms               | Doppler Effect (`screens=1`)                                                               |
| Reactance, Inductive and Capacitive          | AC Phasor, one element (`screens=1`)                                                       |
| RLC Series AC Circuits                       | AC Phasor, series (`screens=2`), resonance (`screens=3`), and power (`screens=4`)          |
| Viscosity and Laminar Flow                   | Fluid Dynamics, intro (`screens=1`)                                                        |
| The Onset of Turbulence                      | Fluid Dynamics, lab (`screens=2`)                                                          |
| Gyroscopic Effects                           | Precession, steady precession (`screens=1`)                                                |
| Standing Waves in Air Columns                | Standing Waves, reflection (`screens=1`), phase (`screens=2`), and harmonics (`screens=3`) |
| Hearing                                      | Standing Waves, instruments (`screens=4`)                                                  |
| Forced Oscillations and Resonance            | Resonance, driven oscillator (`screens=1`) and phase (`screens=3`)                         |
| Polarization                                 | Light Propagation, one wave (`screens=1`) and polarizers (`screens=2`)                     |
| Conduction                                   | Heat Transfer, conduction (`screens=2`)                                                    |
| Convection                                   | Heat Transfer, convection (`screens=3`)                                                    |
| Heat Transfer Methods                        | Heat Transfer, combined (`screens=4`)                                                      |
| Multiple Slit Diffraction                    | Optics Lab, gratings (`screens=4`)                                                         |
| Image Formation by Mirrors                   | Optics Lab, presets (`screens=3`)                                                          |
| Complexity and Chaos                         | Oscillations and Chaos, double pendulum (`screens=4`)                                      |
| Graphical Analysis of One-Dimensional Motion | Motion Match, pointer matching (`screens=1`)                                               |
| Capacitors in Series and Parallel            | Capacitor Lab, combinations (`screens=3`)                                                  |

Catalog and source: https://github.com/OpenLyceum

## Retained legacy activities

These six embeds retain PhET’s browser-based Java emulator (CheerpJ).
No equivalent published HTML5 replacement was found in PhET or the OpenLyceum
catalog during this review. Keep their activity descriptions and controls aligned
when evaluating future replacements.

| Activity                           | Book sections                                             |
| ---------------------------------- | --------------------------------------------------------- |
| Ladybug Revolution                 | Rotation Angle and Angular Velocity; Angular Acceleration |
| Torque                             | The First Condition for Equilibrium                       |
| Simplified MRI                     | Medical Imaging and Diagnostics                           |
| Reversible Reactions               | Entropy and the Second Law                                |
| Quantum Tunneling and Wave Packets | Tunneling                                                 |

OpenLyceum LadyBug covers translational 2D kinematics; it does not replace
Ladybug Revolution’s angular controls or the Torque activity. OpenLyceum
QuantumPotential focuses on bound states, rather than scattering wave packets,
so it does not replace the tunneling activity.

The existing browser alternatives for Photoelectric Effect, Nuclear Fission,
and Radioactive Dating Game remain in place. The Estimation activity still
uses its existing PhET HTML5 development build; no published `latest` build
was found.

## Verification

Replacement simulation endpoints returned HTTP 200. The book builds with
`npm run build`. Endpoint checks confirm availability, not complete interactive
behavior on every device.
