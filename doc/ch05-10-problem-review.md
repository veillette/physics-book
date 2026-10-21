# Review of problem solutions: Chapters 5–10

Reviewed **2026-10-20** by the Cursor agent (one sub-review per chapter, numbers recomputed independently), against HEAD `eb913af2`. All 315 Problems & Exercises in chapters 5–10 were checked; none is missing an answer.

**Status:** every definite finding (F1–F45) and judgement calls J1, J3, and J4 were applied in the commit that added this file. J2 needed no change: the printed value already matches the precision of the 6° slope. Line references below refer to the files before those corrections.

The report is reproduced as written, in the order the chapter reviews came in.

The 2026-10-19 problem findings were rechecked against the current text. The serious ones (dog-sled friction, drawbridge span, swing-loop slack, disk-spin sign, head lever, flywheel constraint, and the factor-of-ten and factor-of-1000 slips) are fixed and are not repeated below. What remains is last-digit arithmetic and a few false discussion claims.

## Summary

| Chapter   | Problems checked | Definite findings |
| --------- | ---------------: | ----------------: |
| 5         |               44 |                 1 |
| 6         |               50 |                 1 |
| 7         |               69 |                 1 |
| 8         |               64 |                 2 |
| 9         |               40 |                 0 |
| 10        |               48 |                 1 |
| **Total** |          **315** |             **6** |

Chapter 10 includes the untyped ball-catch exercise in `ch10CollisionsOfExtendedBodiesInTwoDimensions.md`. No problem solution is missing.

## Definite errors

**F1 — Gravitation P4.** `contents/ch6NewtonsUniversalLawOfGravitation.md:788`. The stated Sun-surface gravity, 275 m/s², and the weight factor 28.1 come from dividing already-rounded intermediates. With the solution’s own inputs, \(g = (6.67\times10^{-11})(1.99\times10^{30})/(6.96\times10^{8})^2 = 274\,\mathrm{m/s^2}\), and \(274/9.80 = 28.0\). Replace 275 m/s² and 28.1 with **274 m/s²** and **28.0**.

**F2 — Power P11.** `contents/ch7Power.md:911`. Eighteen 30-day months are \(4.6656\times10^{7}\,\mathrm{s}\), so \(E = (2.00\,\mathrm{W})(4.6656\times10^{7}\,\mathrm{s}) = 9.33\times10^{7}\,\mathrm{J}\), not \(9.34\times10^{7}\,\mathrm{J}\) from the rounded time \(4.67\times10^{7}\,\mathrm{s}\). Report **\(9.33\times10^{7}\,\mathrm{J}\)**.

**F3 — Impulse P16.** `contents/ch8Impulse.md:1232`. The foot’s impulse magnitude is stated as 1.64 kg·m/s. With \(v_i=\sqrt{2(9.80)(1.00)}=4.427\,\mathrm{m/s}\) and \(\cos55^\circ\), \(\sin55^\circ\) unrounded, \(J=\sqrt{0.77433^2+1.43789^2}=1.633\,\mathrm{kg\cdot m/s}\), which is **1.63 kg·m/s** at three figures. The angle 61.7° is already right.

**F4 — Gyroscopic effects P1.** `contents/ch10GyroscopicEffects.md:232`. The printed step \(1.39\times10^{22}/6.376\times10^{6}=2.17\times10^{15}\) is not that quotient: it is \(2.18\times10^{15}\,\mathrm{N}\). The kept answer matches the unrounded torque, \(1.386\times10^{22}/6.376\times10^{6}=2.17\times10^{15}\,\mathrm{N}\). Show that unrounded torque, and keep **\(2.17\times10^{15}\,\mathrm{N}\)**.

**F5 — Impulse P15.** `contents/ch8Impulse.md:1181`. The mass 60.0 g is the correct result of \((540\,\mathrm{N})(5.00\times10^{-3}\,\mathrm{s})/45.0\,\mathrm{m/s}\), but the discussion says it is consistent with the 56.0–59.4 g tennis-ball specification. 60.0 g is outside that interval. Delete “consistent with”; say it lies just above the specified range.

**F6 — Friction P18.** `contents/ch5Friction.md:1939`. The push-ice numbers (51.0 N and 0.720 m/s²) are right, but the discussion writes static friction as \(\mu_k=0.1\). That value is \(\mu_s\); \(\mu_k=0.03\). Change the second symbol to \(\mu_s\).

## Model clarifications / judgement calls

**J1 — Gravitation P3.** `contents/ch6NewtonsUniversalLawOfGravitation.md:752`. The Moon and Mars gravities (1.62 m/s² and 3.75 m/s²) are correct, but the discussion says neither body has retained a substantial atmosphere. Mars still holds a CO₂ atmosphere of about 600 Pa. Limit that sentence to the Moon, or say Mars retains only a thin atmosphere.

## Incomplete answers

None. Every one of the 315 problem exercises has a solution, and the earlier gaps (gyroscopic working, the skater sample, and the Earth–Moon sample) are now worked.

## What was not verified

Single displayed numeric equalities were scanned with `check_math.py --range 5-10` (no flags at its 1% tolerance). That scan does not catch a wrong formula whose arithmetic is internally consistent. Previously disputed figures that were reopened here are the head, climber, kneecap, push-up, and drawbridge; other free-body SVGs were not remeasured. Qualitative “unreasonable result” discussions were sampled, not line-audited for every historical aside.

---

The chapter 8 check from [Verify ch8 problem solutions](42535495-55cf-4223-bab5-f96ed0325525) is in. I recomputed each claimed number. Eight of those items are real and were missing from the earlier list; two are not.

## Additional definite errors

**F7 — Two-dimensional collisions P4.** `contents/ch8CollisionsOfPointMassesInTwoDimensions.md:683`. The translational energies are given as 223 J to 324 J, an increase of 101 J, and the line \(228 + 95.6 = 324\) is not that sum. Momentum gives \(v'_x = 8.798\,\mathrm{m/s}\), \(v'_y = -2.309\,\mathrm{m/s}\), so \(v' = 9.096\,\mathrm{m/s}\) at \(-14.7^\circ\). The energies are \(\mathrm{KE}_i = 222.75\,\mathrm{J}\) and \(\mathrm{KE}_f = 323.15\,\mathrm{J}\). Report **223 J to 323 J, an increase of 100 J**. The speed 9.10 m/s at \(-14.7^\circ\) is already right.

**F8 — Two-dimensional collisions P3.** `contents/ch8CollisionsOfPointMassesInTwoDimensions.md:565`. Squaring the rounded recoil speed 2.26 m/s produces \(7.66\times10^3\,\mathrm{J}\). The unrounded recoil is \(15(480\cos 20^\circ)/3000 = 2.255\,\mathrm{m/s}\), so \(\mathrm{KE} = 7.63\times10^3\,\mathrm{J}\). Keep **2.26 m/s** and replace the energy with **\(7.63\times10^3\,\mathrm{J}\)**.

**F9 — Inelastic collisions P6.** `contents/ch8InelasticCollisionsInOneDimension.md:828`. Initial kinetic energy is written as 10800 J and the loss as 8480 J. \(\tfrac12(30000)(0.850)^2 = 10837.5\,\mathrm{J}\), and with \(v_f = 25500/140000 = 0.18214\,\mathrm{m/s}\) the final kinetic energy is 2322 J. The loss is **\(8.52\times10^3\,\mathrm{J}\)**. The speed 0.182 m/s is right.

**F10 — Inelastic collisions P9.** `contents/ch8InelasticCollisionsInOneDimension.md:1031`. Squaring the rounded speeds gives \(8.23\times10^{-13}\,\mathrm{J}\) and \(1.41\times10^{-14}\,\mathrm{J}\), which add to \(8.37\times10^{-13}\,\mathrm{J}\) rather than the given \(8.40\times10^{-13}\,\mathrm{J}\). Equal-and-opposite momenta split that energy as \(E\,m_U/(m_\mathrm{He}+m_U) = 8.26\times10^{-13}\,\mathrm{J}\) and \(1.41\times10^{-14}\,\mathrm{J}\). The speeds \(1.57\times10^7\,\mathrm{m/s}\) and \(2.68\times10^5\,\mathrm{m/s}\) stay as they are.

**F11 — Two-dimensional collisions P5.** `contents/ch8CollisionsOfPointMassesInTwoDimensions.md:795`. The helium kinetic energy \(7.52\times10^{-13}\,\mathrm{J}\) is \(\tfrac12 m(1.50\times10^7)^2\). The elastic solution is \(v'_\mathrm{He} = 1.501\times10^7\,\mathrm{m/s}\) and \(\mathrm{KE}'_\mathrm{He} = 7.53\times10^{-13}\,\mathrm{J}\) (94.1% of \(8.00\times10^{-13}\,\mathrm{J}\)). The gold recoil, \(5.36\times10^5\,\mathrm{m/s}\) at \(-29.5^\circ\), is right.

**F12 — Impulse P9.** `contents/ch8Impulse.md:899`. \(0.750\,\mathrm{m/s}\) is **1.68 mph**, not “about 1.5 mph.” The force \(4.69\times10^5\,\mathrm{N}\) is correct.

**F13 — Two-dimensional collisions P6.** `contents/ch8CollisionsOfPointMassesInTwoDimensions.md:913`. Sticking does maximize the kinetic-energy loss for these incoming momenta (\(8.78\times10^4\,\mathrm{J}\), 54%). It does not by itself lengthen the collision or reduce the peak force; those depend on the contact model. Delete that causal clause. The velocity 8.46 m/s at 33.6° south of west can stay.

**F14 — Impulse P10.** `contents/ch8Impulse.md:944`. The rebound speed \(-0.80\,\mathrm{m/s}\) is correct, and \(1.76\times10^4/(110\times9.80) = 16.3\) times body weight. “Survivable due to the padding” does not follow from that average load. Delete the survivability sentence.

**F15 — Inelastic collisions P12.** `contents/ch8InelasticCollisionsInOneDimension.md:1241`. \(v_f = 3.00\times10^5/12080 = 24.834\,\mathrm{m/s}\), correctly 24.8 m/s. The decrease from 25.0 m/s is **0.66%**, not 0.8% from \(25.0-24.8\).

**F16 — Inelastic collisions P1.** `contents/ch8InelasticCollisionsInOneDimension.md:439`. The printed step \(-1.30/0.0150 = -86.4\,\mathrm{N}\) is not that quotient (\(-86.7\,\mathrm{N}\)). The unrounded change is \((0.240)(-5.40) = -1.296\,\mathrm{kg\cdot m/s}\), and \(-1.296/0.0150 = -86.4\,\mathrm{N}\). Keep **86.4 N** and show \(-1.296\).

**F17 — Rocket propulsion P8.** `contents/ch8IntroductionToRocketPropulsion.md:749`. \(100000/37.9 = 2639\,\mathrm{kg} = 2.64\times10^3\,\mathrm{kg}\), not \(2.63\times10^3\,\mathrm{kg}\). The unrounded ratio is \(e^{8000/2200} = 37.95\), so \(m_r = 2635\,\mathrm{kg} = 2.63\times10^3\,\mathrm{kg}\). Keep **\(2.63\times10^3\,\mathrm{kg}\)** and replace 37.9 with 37.95.

## Not adopted

Rocket propulsion P11 is a complete sample. It states that equal relative launch speed is a different constraint from a fixed force and stroke, and the times 11.9 s and 11.2 s match that model. The squid mass-fraction remark in rocket P10 was not checked against a source; the ballistic 21.4 m/s and 83% ejected mass do follow the stated model.

Chapter 8 is now 64 problems with **13** definite findings (F3, F5, and F7–F17). The other chapter passes are still out.

---

The chapter 5, 6, 7, and 10 reviews are in. I recomputed the numerical claims below. The chapter 9 review has not come back. Findings F1–F17 still stand. In particular, [Verify ch6 problem solutions](fa3630b8-b840-40ac-bb0c-e2622edc9fdc) is wrong that the Sun’s surface gravity “checks out” at 275 m/s²: \(GM/R^2 = 274\,\mathrm{m/s^2}\) and \(274/9.80 = 28.0\).

Two claims from those reviews do not hold. The centrifuge free-body diagram already says the drawn angle is exaggerated and that the real angle is 5.71°. The flywheel hill height of 19.9 m is the right three-figure result from \(\omega = 128\,\mathrm{rad/s}\); the no-loss height consistent with the recomputed \(2.21\times 10^6\,\mathrm{J}\) is 22.1 m.

## New definite errors

**F18. Friction P7** — `contents/ch5Friction.md:973` (also `:1005`, `:1017`). The pushes are an overhead pair, east and north, so the resultant is not “above the horizontal,” and the angle is not 35.1°. \(\tan^{-1}(18.6/26.4) = 35.2^\circ\) north of east, \(F = 32.3\,\mathrm{N}\). With \(f_k = 12.74\,\mathrm{N}\), \(a = 0.301\,\mathrm{m/s^2}\), not \(0.302\,\mathrm{m/s^2}\).

**F19. Friction P11** — `contents/ch5Friction.md:1271`. Downhill acceleration is \(9.80(\sin 10.0^\circ - 0.1\cos 10.0^\circ) = 0.737\,\mathrm{m/s^2}\), not \(0.736\,\mathrm{m/s^2}\). The coasting angle 5.71° is right.

**F20. Friction P19** — `contents/ch5Friction.md:2033`. Carrying the unrounded pull \(F = 46.491\,\mathrm{N}\) gives \(a = 0.655\,\mathrm{m/s^2}\), not \(0.656\,\mathrm{m/s^2}\) from the rounded 29.5 N. The 46.5 N pull itself is right.

**F21. Drag P2** — `contents/ch5DragForces.md:622` and `:640`. \(C\rho A = 0.1186\,\mathrm{kg/m}\), so \(v_{t,60} = 99.6\,\mathrm{m/s}\) and \(t = 60.2\,\mathrm{s}\), not 99.5 m/s and 60.3 s. The 90 kg results, 122 m/s and 49.2 s, are right.

**F22. Drag P6** — `contents/ch5DragForces.md:870`. For quadratic drag at \(v_t = 9.8\,\mathrm{m/s}\), the drop reaches 0.99\(v_t\) in about 20 m, not “the first few hundred meters.” The speeds 313 m/s and 9.8 m/s are right.

**F23. Drag P8** — `contents/ch5DragForces.md:973`. Effective weight \(4.11\times 10^{-15}\,\mathrm{N}\) over \(6\pi r\eta\) is \(2.17\times 10^{-7}\,\mathrm{m/s}\), not \(2.18\times 10^{-7}\,\mathrm{m/s}\). The printed quotient \(4.11\times 10^{-15}/1.89\times 10^{-8}\) is already \(2.17\times 10^{-7}\).

**F24. Elasticity P7** — `contents/ch5Elasticity.md:1273`. \(\Delta L = (60100)(9.80)(6.00)/[\pi(0.0250)^2(2.1\times 10^{11})] = 8.57\,\mathrm{mm}\), not 8.59 mm. The printed \(3.53\times 10^6/4.12\times 10^8\) is \(8.57\times 10^{-3}\,\mathrm{m}\).

**F25. Centripetal acceleration P4** — `contents/ch6CentripetalAcceleration.md:435` and `:441`. \(\omega = 126\,\mathrm{rad/s}\) and \(v = 145\,\mathrm{m/s}\) are fine. Unrounded \(a_c = r\omega^2 = 1.82\times 10^4\,\mathrm{m/s^2} = 1.85\times 10^3\,g\), not \(1.83\times 10^4\,\mathrm{m/s^2}\) and 1870\(g\).

**F26. Centripetal acceleration P11(d)** — `contents/ch6CentripetalAcceleration.md:844`. \(3600/(0.425\times 9.80) = 864\), not 865. The 8470 m/s² value is right.

**F27. Centripetal force P1(c)** — `contents/ch6CentripetalForce.md:738`. \(17.4/216 = 0.0806\), and the unrounded ratio is 0.0806, not 0.0807. On line 714, \((22.0)(1.25)(17.6) = 484\); the unrounded force is 483 N, so keep 483 N and show \(\omega^2 = 17.55\,\mathrm{s^{-2}}\).

**F28. Centripetal force P9** — `contents/ch6CentripetalForce.md:1249`. \(v = \sqrt{1.50(9.80)(15.0)} = 14.8\,\mathrm{m/s}\) (about 53 km/h), not 14.9 m/s (about 54 km/h). \(14.7\times 15.0 = 220.5\), not 221. The seat force \(0.50mg\) is right. This replaces the earlier acceptance of 14.9 m/s.

**F29. Gravitation P4** — `contents/ch6NewtonsUniversalLawOfGravitation.md:799`, on top of F1. A 70 kg person weighs about 690 N (154 lb) on Earth and about \(1.9\times 10^4\,\mathrm{N}\) (about 4300 lb) at \(g = 274\,\mathrm{m/s^2}\). Do not call that weight 70 kg or 2000 kg. Keep 274 m/s² and a factor of 28.0.

**F30. Satellites P4** — `contents/ch6SatellitesAndKeplersLaws.md:610`. Table 1’s \(r^3/T^2\) column is km³/y². The Moon and Io entries \(1.01\times 10^{19}\) and \(3.19\times 10^{21}\) are those units, not m³/s². The ratio 316 is right.

**F31. Satellites P6** — `contents/ch6SatellitesAndKeplersLaws.md:745`, `:755`, and `:761`. With \(G = 6.674\times 10^{-11}\) and \(R = 6.38\times 10^6\,\mathrm{m}\), \(v = 7.40\times 10^3\,\mathrm{m/s}\) and \(v_\mathrm{rel} = 1.05\times 10^4\,\mathrm{m/s}\) are right, but the later digits are not: \(\Delta t = 2.87\times 10^{-7}\,\mathrm{s}\), \(F_\mathrm{avg} = 1.82\times 10^7\,\mathrm{N}\), and \(E = 2.74\times 10^4\,\mathrm{J}\). The printed \((2.50\times 10^{-4})(1.10\times 10^8)\) is \(2.75\times 10^4\), not \(2.76\times 10^4\).

**F32. Kinetic energy P1** — `contents/ch7KineticEnergyAndTheWorkEnergyTheorem.md:538`. Truck speed \(110/3.6\,\mathrm{m/s}\) gives \(9.34\times 10^6\,\mathrm{J}\), not \(9.37\times 10^6\,\mathrm{J}\). The mass ratio and the speed ratio are each exactly 250, so the kinetic-energy ratio is exactly \(1/250 = 4.00\times 10^{-3}\), not \(4.02\times 10^{-3}\).

**F33. Nonconservative forces P2** — `contents/ch7NonconservativeForces.md:445` and `:484`. \(h = v^2/(2g) = 47.6\,\mathrm{m}\), not 47.8 m. With the unrounded kinetic energy \(3.50\times 10^5\,\mathrm{J}\), the friction force is \(3.7\times 10^2\,\mathrm{N}\), not \(3.8\times 10^2\,\mathrm{N}\). Thermal energy stays \(1.9\times 10^5\,\mathrm{J}\) at two figures.

**F34. Power P8** — `contents/ch7Power.md:722`. \(W = \tfrac12(500)(110)^2 + (1200)(400) = 3.505\times 10^6\,\mathrm{J}\), so \(P = 4.80\times 10^5\,\mathrm{W}\) (480 kW, 644 hp), not \(4.81\times 10^5\,\mathrm{W}\) (645 hp).

**F35. Power P10** — `contents/ch7Power.md:849`. \(W = (2500)(9.80)(35.0) + \tfrac12(10000)(4.00)^2 = 9.375\times 10^5\,\mathrm{J}\), so \(P = 78.1\,\mathrm{kW}\), not 78.2 kW.

**F36. Rotational kinetic energy P3** — `contents/ch10RotationalKineticEnergy.md:823` and `:839`. Spin energy is \(2.56\times 10^{29}\,\mathrm{J}\), not \(2.57\times 10^{29}\,\mathrm{J}\). Orbital speed is \(2.99\times 10^4\,\mathrm{m/s}\) and orbital kinetic energy is \(2.66\times 10^{33}\,\mathrm{J}\), not \(2.98\times 10^4\,\mathrm{m/s}\) and \(2.65\times 10^{33}\,\mathrm{J}\). “About 10,000 times” still holds.

**F37. Extended-body collisions P5** — `contents/ch10CollisionsOfExtendedBodiesInTwoDimensions.md:774`. About the system center of mass, \(KE_f = 2.05\,\mathrm{J}\), not 2.04 J. \(\omega = 3.41\,\mathrm{rad/s}\) and the loss of 20.5 J (91%) stay.

**F38. Angular momentum P2** — `contents/ch10AngularMomentumAndItsConservation.md:1043`. \(I = (2/5)MR^2 = 8.90\times 10^{34}\,\mathrm{kg\cdot m^2}\) and \(L_\mathrm{spin} = 2.37\times 10^{29}\,\mathrm{kg\cdot m^2/s}\), not \(8.87\times 10^{34}\) and \(2.36\times 10^{29}\). The ratio \(1.22\times 10^5\) is unchanged.

**F39. Angular momentum P6** — `contents/ch10AngularMomentumAndItsConservation.md:1313`. \(\Delta L = 0.400(2\pi)(3.00-6.00) = -7.54\,\mathrm{kg\cdot m^2/s}\), so \(\tau = -0.503\,\mathrm{N\cdot m}\), not \(-0.504\,\mathrm{N\cdot m}\).

## Judgement calls

**J2. Friction P13(c)** — `contents/ch5Friction.md:1451`. The unrounded ice acceleration is \(-0.0497\,\mathrm{m/s^2}\). The slope is given as \(6^\circ\), so the printed \(-0.049\,\mathrm{m/s^2}\) and the discussion’s “about 0.05” match the precision of the angle. Dry and wet values 8.72 and 5.80 m/s² are right.

## Incomplete answers

None newly verified. The earlier sets remain complete.

## Not verified

Chapter 9 has not been rechecked at the same depth. I did not recompute the remaining discussion sentences in chapter 7 (food-energy table, fuel savings, potato chip, sprint efficiency, swimming efficiency, solar albedo) or the rotation-angle free-body diagram.

---

[Verify ch9 problem solutions](7fe2b94d-474c-4c0a-8e72-eb49a5f42bea) checked all 40 chapter 9 problems. I rechecked the six claimed errors against the text and the chicken, push-up, and drafting-head figures. The drawbridge, kneecap, head, and pole-vaulter answers that were wrong in the earlier review are still correct. No chapter 9 solution is incomplete.

## Definite errors

**F40. Stability P6** — `contents/ch9Stability.md:522`. In Figure 12 the foot is to the right of the center of gravity and the wind arrow points right. About the foot, the weight’s torque is counterclockwise and the wind’s is clockwise. The solution has those senses reversed. The magnitudes stay: \(F = (24.5\,\mathrm{N})(0.090\,\mathrm{m})/(0.20\,\mathrm{m}) = 11.0\,\mathrm{N}\) and \(F/W = 0.45\).

**F41. Stability P6** — `contents/ch9Stability.md:553`. The same discussion reverses the mechanism. \(F/W = 0.090/0.20 = 0.45\) because the wind’s lever arm (20 cm) is longer than the weight’s (9.0 cm). A lower center of gravity would shorten the wind arm and raise the required force. The weight’s torque increases the lean; the wind holds the bird up. The figure is one foot, so the “wide stance” remark does not apply. Keep 11.0 N and 0.45.

**F42. Stability P4** — `contents/ch9Stability.md:443`. \(F_1\) is at the end, \(F_2\) is 0.500 m in, and the center of gravity is 1.00 m in. About \(F_1\), the weight’s lever arm is twice \(F_2\)’s, which is why \(F_2 = 2W\). The sentence that the center of gravity “is twice as far from \(F_2\) as it is from where \(F_2\) is applied” does not match that geometry. Keep \(W = 196\,\mathrm{N}\), \(F_2 = 392\,\mathrm{N}\) up, and \(F_1 = 196\,\mathrm{N}\) down.

**F43. Muscles and joints P12** — `contents/ch9ForcesAndTorquesInMusclesAndJoints.md:1446`. Figure 13 puts the center of gravity 0.90 m from the feet and \(1.50 - 0.90 = 0.60\,\mathrm{m}\) from the hands, so it is closer to the hands. Both hands support \(2 \times 147 = 294\,\mathrm{N}\) (60% of 490 N); the feet support 196 N (40%). Each hand is 30% only because that 60% is shared. On line 1441, \(2950/60 = 49.2\,\mathrm{W}\) does not round to 49.0 W. Unrounded work is \((490\,\mathrm{N})(0.240\,\mathrm{m}) = 117.6\,\mathrm{J}\), and \(25 \times 117.6/60 = 49.0\,\mathrm{W}\). Keep 147 N, 1680 N, and 49.0 W; report the work as 118 J without equating 49.2 W to 49.0 W.

**F44. Muscles and joints P1** — `contents/ch9ForcesAndTorquesInMusclesAndJoints.md:631`. \(470 - 24.5 - 39.2 = 406.3\,\mathrm{N}\), which rounds to 406 N, not 407 N. The unrounded biceps force is \(9.80(0.160 \times 2.50 + 0.380 \times 4.00)/0.0400 = 470.4\,\mathrm{N}\), so \(F_E = 470.4 - 63.7 = 406.7\,\mathrm{N}\), which is 407 N. Keep 407 N and show 406.7 N.

**F45. Simple machines P6** — `contents/ch9SimpleMachines.md:624`. \(3 \times 564 = 1692\), not 1690. The engine weight is \(115 \times 9.80 = 1127\,\mathrm{N}\), so \(3T = 3(1127)/2 = 1690\,\mathrm{N}\). Keep 1690 N and 564 N; write the product from 1127 N.

## Judgement calls

**J3. Muscles and joints P5** — `contents/ch9ForcesAndTorquesInMusclesAndJoints.md:886`. In Figure 8 the face is on the right, and the 60 N arrow points right, toward the face. “Positive \(x\) to the right (toward the neck)” points the wrong way. The components are right for \(+x\) toward the face: \(F_V = 97\,\mathrm{N}\) at \(59^\circ\).

**J4. Simple machines P5** — `contents/ch9SimpleMachines.md:560`. \(50 + 1250 + 20.6 = 1321\,\mathrm{N}\) is \(1.32 \times 10^3\,\mathrm{N}\) at three significant figures, not \(1.3 \times 10^3\,\mathrm{N}\). The sum itself is correct.

The 120° biceps result, 470 N, is correct only if the biceps stays vertical. The solution states that model.
