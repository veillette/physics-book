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
