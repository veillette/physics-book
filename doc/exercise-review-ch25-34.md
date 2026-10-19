# Correctness review: exercises and problems, Chapters 25–34

Date: 2026-10-19. Source revision: `78fbfb3ffab182371728c5c666e8f61c92ecf765`. **Review findings only; textbook files have not been corrected by this review.** This continues [the Chapter 12–24 exercise review](https://github.com/veillette/physics-book/blob/5c89d7db/doc/exercise-review-ch12-24.md) with the same conventions. It covers the end-of-section questions that [the Chapter 24–34 content review](https://github.com/veillette/physics-book/blob/fd2d554c/doc/content-review-ch24-34.md) left out of scope.

## Scope and method

Screened the question statements and available answer text across all **82 chapter/section files** in Chapters 25–34 of `SUMMARY.md`. The inventory contains **946 question blocks**, of which 281 are conceptual questions, and **625 have a worked solution or answer key**. Multi-part questions count as one block. Ordinals below are local to each section and question category; they are not book-wide exercise numbers. Line links point to the `::: problem` fence of the question unless stated otherwise. Chapter numbers are the file prefixes (`ch25` …), which are one less than the chapter numbers shown in `SUMMARY.md`.

The review checked the mathematical model, required assumptions, units, signs, supplied data, physical conclusions, and consistency between statements, solutions, and the revised chapter text. Each suspected numerical error was recalculated independently. Every direction or geometry finding was checked against the referenced figure image itself (Figures 25_03_05 and 30_02_04 were inspected). The review also ran the repository's `check_math.py --range 25-34`; it flagged nothing, so every arithmetic finding below was found by recalculation. Routine rounding differences and the usual stated introductory idealizations were not counted as substantive errors.

This is a substantive screening with targeted verification. **It does not claim that every intermediate step in all 946 blocks was re-derived.** An exercise that is not listed is not certified error-free. External facts were checked only where a finding depends on them.

## Result

The review found **50 substantive findings: 7 P1 and 43 P2**. Some findings cover several related exercises.

- **P1:** a materially incorrect physical rule or model, a large error that undermines the exercise, an answer forced to a key, or missing data that makes exercises unanswerable.
- **P2:** an incorrect result, inconsistent data or direction, a missing premise needed for a unique answer, or a discussion that contradicts the physics.

Presentation and rounding items are listed separately at the end.

| Chapter | Question blocks | Substantive findings |
| ------- | --------------: | -------------------: |
| 25      |              94 |                    6 |
| 26      |              59 |                    3 |
| 27      |             138 |                   10 |
| 28      |             100 |                    6 |
| 29      |             112 |                    2 |
| 30      |             100 |                    5 |
| 31      |             110 |                    1 |
| 32      |              90 |                    9 |
| 33      |              84 |                    5 |
| 34      |              59 |                    3 |

Four recurring patterns account for many of the findings:

1. **Exercises left behind by the content revision.** The Chapter 24–34 revision changed the dose model, the radiotherapy tables, and the treatment of neutrino mass and unification, but the exercises still use the old material (E34, E46, E49). Chapters 31–32 also still point to atomic-mass and isotope appendices that the book no longer contains (E33).
2. **Arithmetic or unit slips that a discussion then explains away.** Examples are the 1111-MeV fission energy (E40), the 10⁵-GeV carrier mass (E43), 0.105 W for 0.105 mW (E26), and a 1.4 × 10¹³-km³ ocean volume called "tiny" (E23).
3. **Discussions that contradict the solution or the physics.** These include the reversed Lyman trend (E28), finer gratings with "smaller" fringes (E11), a yellow film declared "black" (E17), and dilated pupils that "shorten" resolution distance (E13).
4. **Radius and diameter confusion.** It occurs in the laser-spot problem (E12), the Millikan drop (E31), and the air-wedge debris answer forced to the key (E15).

Prioritize these:

- the seven P1 items, beginning with the missing data appendices and the Chapter 32 dose model;
- the forced or rationalized answers (E15, E40, E43);
- the stale neutrino-mass and unification statements, which contradict the corrected chapter text.

Correct the related discussions along with the final numbers. Several discussions explain away the incorrect results.

## Chapter 25

### E01 · P2 · The diver's apparent depth uses the wrong geometry, and the problem links the wrong figure

[ch25TheLawOfRefraction.md:793](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25TheLawOfRefraction.md#L793) (problem 8)

The statement links Figure 3 (the lawn mower), not Figure 5 (the diver). Figure 5 gives the diver's depth as d = 2.0 m. Part (b) instead assumes the horizontal distance under water is 2.00 m. It then derives an "actual depth" of 4.29 m and an apparent depth of 3.22 m. With d = 2.0 m, the horizontal offset under water is 2.0 tan 25.0° = 0.93 m. The instructor sees the diver along the extended 34.3° ray, which gives an apparent depth of about **1.4 m**. The paraxial d/n gives 1.5 m. Part (a), 2.93 m, is correct.

### E02 · P2 · 2.3 × 10⁻⁶ percent is 23 parts per billion, not 2.3 parts per million

[ch25TheLawOfRefraction.md:882](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25TheLawOfRefraction.md#L882) (problem 10)

The correction is 17.6 m in 7.68 × 10⁸ m, a fraction of 2.3 × 10⁻⁸. The solution correctly writes 2.3 × 10⁻⁶ % but restates it as "about **2.3 parts per million**." The fraction is about **23 parts per billion**.

### E03 · P2 · The yellow and green rays emerge 0.043° apart and separate by 1.00 mm after 1.33 m

[ch25Dispersion.md:323](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25Dispersion.md#L323) (problem 4)

sin⁻¹(0.7465) = 48.29°, not 48.20°. Green, with the higher index, bends farther from the normal than yellow (48.25°). The angle between them is 0.043°, and the distance for a 1.00-mm separation is 1.00 mm / 7.5 × 10⁻⁴ rad = **1.33 m**. The answer line gives "0.04° or 0.043°" and "1.43 m (approximately 1.33 m accounting for rounding)." Keep one value: 0.043° and 1.33 m.

### E04 · P2 · The red and blue rays leaving the crown-glass plate are separated by about 0.03 mm, not 0.01 mm

[ch25Dispersion.md:500](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25Dispersion.md#L500) (problem 7)

The solution rounds the refraction angles to 19.3° and 19.2° and subtracts two lateral offsets that agree to two digits. Unrounded, θ₂ = 19.31° (red) and 19.15° (blue). The perpendicular offsets are 0.1965 cm and 0.1992 cm, so the beams are **0.027 mm** apart. Measured along the exit face, the separation is t(tan θ₂,red − tan θ₂,blue) = 0.032 mm. State which separation is meant.

### E05 · P2 · The closest close-up object has magnification −0.500

[ch25ImageFormationByLenses.md:1172](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25ImageFormationByLenses.md#L1172) (problem 10)

With f = 22.0 mm and d_i = 33.0 mm, d_o = 66.0 mm (the key's 6.60 cm is correct). The magnification is m = −d_i/d_o = −33.0/66.0 = **−0.500**. The key gives −0.333.

### E06 · P1 · The heater's image area scales with m², so the intensity is about 620 W/m²

[ch25ImageFormationByMirrors.md:942](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25ImageFormationByMirrors.md#L942) (problem 11)

The image is 11.0 times larger in each linear dimension, so its area is 121 × 100 cm² = **1.21 m²**. The solution's equation divides the area by |m| and then multiplies by 121 in the same line, ending with 0.110 m². With 750 W on 1.21 m², the intensity is **6.2 × 10² W/m²**, not 6.82 kW/m². The discussion's "about 7 times the intensity of direct sunlight" should become about 0.6 times.

## Chapter 26

### E07 · P2 · The presbyopia example uses impossible reading-glass powers

[ch26VisionCorrection.md:508](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26VisionCorrection.md#L508) (conceptual question 4)

The numerical example says a −3.0 D myope with 1 D of accommodation "still needs +1.5 D reading glasses" at 40 cm. That person's far point is 33 cm, so a page at 40 cm is beyond it and needs −0.5 D, while a page at 33 cm needs no glasses. After LASIK, with 1 D of accommodation, reading at 40 cm needs **+1.5 D**, not +2.5 D. With these numbers the example demonstrates the claim it is meant to support: correcting myopia removes built-in reading ability.

### E08 · P2 · The vertex-distance formula has the wrong sign, and the hyperopia discussion claims a check that fails

[ch26VisionCorrection.md:1386](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26VisionCorrection.md#L1386) (problem 14) and [ch26VisionCorrection.md:1612](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26VisionCorrection.md#L1612) (problem 18)

The myopia discussion gives P_spectacle = P_contact/(1 − d·P_contact). That formula turns −4.00 D into −3.74 D. The correct relation, P_contact/(1 + d·P_contact), gives the computed −4.30 D. The hyperopia discussion uses the correct form but says it "confirms" +0.89 D. It actually gives 0.75/(1 + 0.022 × 0.75) = 0.74 D. The +0.89 D result comes from the near-point geometry, not from a distance-vision vertex conversion. The claim that hyperopic spectacles need more plus power than contacts is backwards for distance correction.

### E09 · P2 · A −4.00 D lens would leave the boy unable to focus anything

[ch26VisionCorrection.md:1741](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26VisionCorrection.md#L1741) (problem 20)

The discussion says the lens images distant objects "only 25 cm from his eyes, which is actually at his near point" and gives him a "new far point of only 25 cm." His near point is 50 cm. With the −4.00 D lens, an object at any distance images closer than 25 cm, inside his near point, so nothing would be in focus. The required −0.20 D correction is right.

## Chapter 27

### E10 · P2 · A 9000-line/cm grating has no third-order maximum for 470-nm light

[ch27MultipleSlitDiffraction.md:378](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L378) (problem 3)

The discussion places the second order at 57.1° and the third at 80.8°. It then says the maximum order is 2.4. With sin θ₁ = 0.4226, the second order is at **57.7°**, and the third would need sin θ = 1.27, so it does not exist. [Problem 4](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L425) similarly allows "possibly a dim third-order" when 3λ/d = 1.30.

### E11 · P2 · A finer grating gives wider, not narrower, fringe spacing

[ch27MultipleSlitDiffraction.md:1341](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L1341) (problem 19)

The 1.13-cm answer is correct. The discussion lists "smaller slit separation increases fringe spacing" and then says that "finer gratings (more lines/cm) would produce smaller fringe spacings," with 1000 lines/cm giving 1.4 mm. At 1000 lines/cm, d = 10 µm and Δy = xλ/d = **9.0 cm**.

### E12 · P2 · The 1-mm laser spots are 23.2 m and 592 km in diameter

[ch27LimitsOfResolution.md:414](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27LimitsOfResolution.md#L414) (problem 4)

θ = 1.22λ/D is the half-angle to the first minimum. The solution reports rθ = 11.6 m and 296 km as spot diameters. The next problem (Mount Wilson) correctly treats rθ as the radius and doubles it to 235 m. For consistency, the diameters are **23.2 m** at 15.0 km and **592 km** on the Moon. Then compare 592 km with 235 m in the following discussion.

### E13 · P2 · Larger pupils resolve headlights at a greater distance

[ch27LimitsOfResolution.md:712](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27LimitsOfResolution.md#L712) (problem 10)

The 7.7-km answer is correct. The discussion says that "at night with dilated pupils (larger D), this distance would be somewhat shorter." A larger D decreases θ and increases the diffraction-limited distance. In practice, aberrations at large pupil sizes limit the gain.

### E14 · P2 · The air wedge has one reflection phase change, not two

[ch27ThinFilmInterference.md:889](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27ThinFilmInterference.md#L889) (problem 10)

The solution says both reflections occur "at glass surfaces from air," so the phase changes cancel, and it then uses 2t = mλ for dark bands. Reflection from the top slide's lower surface (glass to air) has no phase change. Reflection from the bottom slide (air to glass) has one. With a single phase change, 2t = mλ is the dark-band condition. The 0.221-mm spacing is right; the reasoning is not.

### E15 · P1 · The debris thickness is forced to the key and is 22.1 µm, not 44.2 µm

[ch27ThinFilmInterference.md:953](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27ThinFilmInterference.md#L953) (problem 11)

The previous problem derives Δx = λ/(2α) with α = h/L. The same relation gives h = λL/(2Δx) = (589 nm)(0.0750 m)/(2 × 1.00 mm) = **2.21 × 10⁻⁵ m**. The solution instead states that "considering the geometry of observing fringes with width, the effective spacing formula yields h = λL/Δx." No such geometry is described, and the result exactly doubles the thickness. Report 22.1 µm and remove the invented justification.

### E16 · P2 · The 45° soap-bubble problem stops before giving an answer

[ch27ThinFilmInterference.md:1004](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27ThinFilmInterference.md#L1004) (problem 12)

The discussion says "the exact color shift calculation would require the specific film thickness from Exercise 1." Exercise 1 is the 100-nm bubble. With θ₂ = 32.1°, 2tn cos θ₂/(1/2) = **450 nm**, so the bubble appears blue at 45°, compared with 532 nm at normal incidence.

### E17 · P2 · The oil film at 45° reflects 580-nm yellow light; it does not "appear very dark"

[ch27ThinFilmInterference.md:1060](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27ThinFilmInterference.md#L1060) (problem 13)

The 580-nm result is correct. The solution then concludes that the film "appears very dark or black" because 580 nm is "where the eye's sensitivity begins to diminish." The eye's photopic peak is near 555 nm, so 580 nm is close to maximum sensitivity. The film shifts from red toward **yellow**.

### E18 · P2 · A dielectric coating on metal has two reflection phase changes

[ch27ThinFilmInterference.md:1126](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27ThinFilmInterference.md#L1126) (problem 14)

The strategy says that with n_air < n_coating < n_aircraft "there's one phase change," and then uses 2tn = (m + ½)λ for destructive interference. Both reflections go from a lower to a higher index, so there are two phase changes, and (m + ½)λ is then the correct destructive condition. With one phase change, the same equation would describe constructive interference. The 8.33-mm answer stands; correct the reasoning.

### E19 · P2 · Unpolarized sunlight loses half its power at the first polarizer

[ch27Polarization.md:1131](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27Polarization.md#L1131) (problem 17)

The key's 2.07 × 10⁻² °C/s equals 31.4 W × cos² 20.0° × 0.800 / (1073 J/°C). That omits the factor of ½ at the first sheet, although the statement says the sunlight is unpolarized and the sheets are 100% efficient. The rate is **1.03 × 10⁻² °C/s**.

## Chapter 28

### E20 · P2 · The slow-muon problem uses a different muon lifetime from Example 1

[ch28LengthContraction.md:429](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28LengthContraction.md#L429) (problem 4)

The solution takes Δt₀ = 2.20 µs "from Example 1," but Example 1 and the preceding problem use 1.52 µs. With 1.52 µs at 0.0500c, the lifetime is 1.522 µs and both distances are **22.8 m**. The discussion's "high-speed example where ... the muon traveled over 2000 meters" should be 1.39 km.

### E21 · P2 · A 1 kg·m/s proton would carry 3 × 10⁸ J, far beyond any cosmic ray

[ch28RelativisticMomentum.md:467](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticMomentum.md#L467) (problem 8)

γ ≈ 2.0 × 10¹⁸ is correct. The discussion then writes "(2 × 10¹⁸)(938 MeV) ≈ 10²¹ eV ... equivalent to ... a baseball." The product is 1.9 × 10²¹ **MeV**, or 1.9 × 10²⁷ eV ≈ 3 × 10⁸ J. The most energetic cosmic ray recorded is about 3 × 10²⁰ eV (about 50 J). The statement that "such protons form a rare component of cosmic radiation" is therefore false by about seven orders of magnitude. Present it as a hypothetical.

### E22 · P2 · Four energy comparisons in the relativistic-energy discussions are off by large factors

[ch28RelativisticEnergy.md:711](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L711) (problem 4), [L752](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L752) (problem 5), [L1520](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L1520) (problem 22), [L1764](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L1764) (problem 27)

The answers are right, but the comparisons are not:

- **Problem 4.** 1.39 × 10²⁰ stars is called "(140 billion)." It is 140 quintillion.
- **Problem 5.** 1.11 × 10²⁷ kg is called "roughly 0.6% of Earth's mass." It is about **190 Earth masses**. In the same discussion, 10⁴⁴ J is not "the energy output of our Sun over several million years": the Sun emits about 1.2 × 10³⁴ J/y, so 10⁴⁴ J is about **8 billion years** of output.
- **Problem 22.** 9 × 10¹⁶ J is about 1400 Hiroshima yields, not 10,000. The lifted mass is about 2 million loaded 747s, not 6 million.
- **Problem 27.** 6.3 × 10²⁷ kg is about **1000 Earth masses**, not 3000. That mass is lost over the 45-billion-year span of part (b), not "over its 10-billion-year main sequence lifetime."

### E23 · P2 · The water volume is 1.4 × 10⁷ km³, not 1.4 × 10¹³ km³

[ch28RelativisticEnergy.md:871](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L871) (problem 8)

1.39 × 10¹⁶ m³ converts to 1.39 × 10⁷ km³ (1 km³ = 10⁹ m³). The solution writes 1.39 × 10¹³ km³. The discussion then calls that "tiny compared to the total ocean volume (1.4 × 10⁹ km³)," which compares a larger number with a smaller one. With the corrected volume, the 1% fraction in part (c) is consistent.

### E24 · P2 · The pion-decay discussion contradicts the problem's assumption

[ch28RelativisticEnergy.md:964](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L964) (problem 10)

The problem stipulates that all 33.9 MeV goes to the muon, and 0.653c follows from that assumption. The discussion then says momentum conservation makes the muon take "most of the available energy but not all of it." Momentum conservation gives the muon only 4.1 MeV of the 33.9 MeV (v ≈ 0.27c) and the neutrino 29.8 MeV. Say that the stated assumption violates momentum conservation, and give the realistic split.

### E25 · P2 · Reactor fuel is not weighed to confirm E = mc²

[ch28RelativisticEnergy.md:1661](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L1661) (problem 25)

The 1.00-kg answer is right. The discussion says "this mass loss IS routinely measured in practice. Nuclear fuel is weighed before and after use, and the decrease matches predictions." A 1-kg deficit spread through tonnes of fuel, cladding, and gaseous fission products is not measured by weighing fuel. The same discussion says 1 kg in 10⁴ kg is not visually observable, which is fine. Remove the weighing claim.

## Chapter 29

### E26 · P2 · The electrons carry 0.105 mW, not 105 mW

[ch29ThePhotoelectricEffect.md:862](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29ThePhotoelectricEffect.md#L862) (problem 14)

The incident power on 1.00 mm² is 1.30 × 10⁻³ W. The electron power is (3.27 × 10¹⁵ /s)(3.20 × 10⁻²⁰ J) = 1.05 × 10⁻⁴ W = **0.105 mW**. The solution writes 0.105 W = 105 mW. Part (c) then subtracts 1.30 W − 0.105 W = 1.20 W. The heat is 1.20 mW, about 92% of the input.

### E27 · P2 · "Second-order minimum" is counted differently from the book's own convention

[ch29ParticleWaveDualityReviewed.md:558](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29ParticleWaveDualityReviewed.md#L558) (problem 10)

The key's 2.30 µm uses d sin θ = 2.5λ. In [Young's Double Slit, problem 5](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27YoungsDoubleSlitExperiment.md#L476), the book counts the first minimum as m = 0 and the third as m = 2. On that convention the second minimum is 1.5λ, so d = **1.38 µm**, and for 1.00-keV protons (λ = 9.06 × 10⁻¹³ m) d = **1.92 × 10⁻¹² m**. Change either the answers or the statement ("third minimum").

## Chapter 30

### E28 · P2 · Higher Lyman lines have shorter wavelengths

[ch30BohrsTheoryOfTheHydrogenAtom.md:556](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30BohrsTheoryOfTheHydrogenAtom.md#L556) (problem 2)

The 97.2-nm answer is correct. The discussion says that moving to higher lines "the wavelength increases (the photon energy decreases)." It also says that 97.2 nm is "longer than the first line (121 nm) and second line (103 nm)." Both statements are reversed. The previous problem's discussion states the trend correctly.

### E29 · P2 · The Balmer-line count depends on a visible window the book does not use elsewhere

[ch30BohrsTheoryOfTheHydrogenAtom.md:1004](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30BohrsTheoryOfTheHydrogenAtom.md#L1004) (problem 12)

The solution uses a 400–700 nm visible range and finds four visible lines, with the first UV line at n = 7 (397 nm). Chapter 29 states that "the range of visible wavelengths is 380 to 760 nm," and Chapter 27 uses the same range. On the book's range, lines from n = 3 through n = 9 (383.6 nm) are visible, and the first UV line is n = 10 → 2 at **379.8 nm**. State the boundary in the problem, or use the book's 380–760 nm range.

### E30 · P2 · The problem asks students to prove that a subshell holds 2n² electrons

[ch30ThePauliExclusionPrinciple.md:893](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L893) (problem 7)

Part (a) should read "the maximum number of electrons in a subshell is 2(2l + 1)"; part (b) proves 2n² for a shell. The key's part (b) begins "2(2l + 1) = 0, 1, 2, …, (n − 1)," which garbles the sum over l. Rewrite it as 2 Σ (2l + 1) from l = 0 to n − 1 = 2n².

### E31 · P2 · The Millikan drop's 5.54 × 10⁻⁷ m is its radius

[ch30ThePauliExclusionPrinciple.md:1125](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L1125) (problem 13)

The mass 6.54 × 10⁻¹⁶ kg at 920 kg/m³ gives V = 7.11 × 10⁻¹⁹ m³ and r = 5.54 × 10⁻⁷ m. The problem asks for the diameter, which is **1.11 × 10⁻⁶ m**.

### E32 · P1 · A He–Ne population inversion needs the 20.66-eV excitation, not the 1.96-eV photon energy

[ch30ThePauliExclusionPrinciple.md:1310](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L1310) (problem 18)

The solution multiplies half the neon atoms by the 632.8-nm photon energy (3.14 × 10⁻¹⁹ J) and gets 9.45 J. The upper laser level lies 20.66 eV above the ground state (Figure 10), and atoms must be raised there from the ground state. With 3.01 × 10¹⁹ atoms, the minimum energy is (3.01 × 10¹⁹)(20.66 eV) = **99.7 J**. Remove the discussion's conclusion that "less than 10 J explains why He-Ne lasers are efficient."

## Chapter 31

### E33 · P1 · The atomic-mass and radioactive-isotope appendices that the problems require are not in the book

[ch31HalfLifeAndActivity.md:593](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch31HalfLifeAndActivity.md#L593) (problem-set note) and [ch31BindingEnergy.md:58](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch31BindingEnergy.md#L58) (text)

The problem sets say "Data from the appendices and the periodic table may be needed." The text and problems cite Appendix A for atomic masses eleven times in Nuclear Decay and Binding Energy, and half-lives "in Appendix B" in Half-Life and Activity. Appendix A is "Useful Information" and has no atomic-mass table; Appendix B is the glossary of symbols. Chapter 32 links to "[Appendix A: Atomic Masses]." The following exercises therefore cannot be completed from the book:

- binding energy per nucleon for ⁵⁶Fe, ²³⁵U/²³⁸U, and ⁵⁸Ni/⁹⁰Sr;
- the energy of ²²²Ra → ¹⁴C, ²⁴⁹Cf α decay, ⁹⁰Sr β⁻ decay, and electron capture by ⁷Be;
- the half-life-dependent ¹³¹I, ²³⁵U, and uranium-glass activities;
- the Chapter 32 ⁹⁸Mo reaction.

Restore the Atomic Masses and Selected Radioactive Isotopes appendices, or put the needed data in each problem.

## Chapter 32

### E34 · P1 · The dose exercises still use the pre-revision RBE table and Sv tumor doses

[ch32BiologicalEffectsAndIonizingRadiation.md:693](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32BiologicalEffectsAndIonizingRadiation.md#L693) (problem 1), [L714](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32BiologicalEffectsAndIonizingRadiation.md#L714) (problem 2), [L777](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32BiologicalEffectsAndIonizingRadiation.md#L777) (problem 4); [ch32TherapeuticUsesOfIonizingRadiation.md:126](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32TherapeuticUsesOfIonizingRadiation.md#L126) (problem 1), [L234](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32TherapeuticUsesOfIonizingRadiation.md#L234) (problem 4), [L409](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32TherapeuticUsesOfIonizingRadiation.md#L409) (problem 8)

The revised text defines equivalent dose as H = w_R D. It lists radiation weighting factors in Table 1 (neutrons: "depends on neutron energy") and says that RBE is a different quantity. It also says that radiotherapy is prescribed as absorbed dose in Gy, with a new Table 1 of 2-Gy fractions and a 60-Gy course. The exercises were not updated:

- **Problem 1(b).** Neutron exposure to the eye (2.5 mGy → 80 mSv) needs the old eye-specific RBE of 32. That value is no longer in the table, so the problem cannot be answered from the book.
- **Biology problems 2 and 4, and therapy problem 8.** These use "Sv = Gy × RBE," "alpha RBE 10–20," and "Table 1 … 50–80+ Sv."
- **Therapy problems 1 and 4.** These give tumor doses in Sv with "an RBE of 20 for heavy ions." Problem 4(b) compares the result with a table of "10–20 Sv for lung … 80+ Sv" that no longer exists.
- **Biology problem 4 (200 Gy of γ rays).** The prescription is three times a full conventional course, but it is presented as acceptable.

Rewrite these exercises in terms of w_R and absorbed dose in Gy, and compare therapy doses with the new fractionation table.

### E35 · P2 · Typical food-irradiation doses are 0.1–10 kGy, which is 100–10,000 Gy

[ch32TherapeuticUsesOfIonizingRadiation.md:142](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32TherapeuticUsesOfIonizingRadiation.md#L142) (problem 2)

The calculation is right. The discussion calls 1000 Sv a "massive dose" and says food irradiation uses "much lower doses (typically 0.1–10 kGy or 0.1–10 Sv for RBE = 1)." 0.1–10 kGy is 100–10,000 Gy, so the problem's dose is in the middle of the normal food-treatment range. Food doses should also be stated in Gy, not Sv.

### E36 · P2 · The ¹⁴C absorbed fraction is about 81%, not 95%

[ch32TherapeuticUsesOfIonizingRadiation.md:487](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32TherapeuticUsesOfIonizingRadiation.md#L487) (problem 9)

Per kilogram of body, 130 g of carbon contains 8.5 × 10¹² ¹⁴C nuclei, so the activity is 32.5 Bq/kg. At 0.0750 MeV per decay, the emitted energy is 1.23 × 10⁻⁵ J/(kg·y). An absorbed dose of 1.0 × 10⁻⁵ Gy/y therefore corresponds to an absorbed fraction of **0.81**. The key's 95% cannot be reproduced from the stated data. The statement's "1.3 × 10⁻¹² N" is also a garbled ratio.

### E37 · P2 · The pool contains 2.68 kg of deuterium, releasing 2.10 × 10¹⁴ J

[ch32Fusion.md:609](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L609) (problem 8)

0.0150% is a fraction by number, as [problem 9](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L658) states and its key uses. 80,000 kg of water contains 8.88 × 10⁶ mol of H, hence 1332 mol of D, or **2.68 kg**. The solution instead applies 0.0150% to the 8.88 × 10⁶ g of hydrogen mass, which halves the result. With 1332 mol, there are 4.01 × 10²⁶ D–D reactions at 3.27 MeV each, giving **2.10 × 10¹⁴ J**, or about 1.6 million gallons of gasoline.

### E38 · P2 · Two ³He nuclei touch at about 3.5 fm, giving about 6 × 10⁹ K

[ch32Fusion.md:882](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L882) (problem 16)

The solution uses a contact distance of 2 × 10⁻¹⁵ m as "the sum of nuclear radii." Each ³He radius is r₀A^(1/3) = 1.2 × 3^(1/3) = 1.73 fm, so contact is at 3.46 fm. Then U = 1.66 MeV and T = U/(3k) ≈ **6.4 × 10⁹ K**. The discussion also says that D–T fusion is easier because "the products (neutron and alpha) carry less initial charge." The barrier depends on the reactants' charges: D and T have +1 each, while each ³He has +2.

### E39 · P2 · Two fusion discussions misstate the physics of the reaction rate and tritium breeding

[ch32Fusion.md:421](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L421) (problem 2) and [ch32Fusion.md:551](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L551) (problem 6)

Problem 2 says the first proton–proton step has the lowest probability partly because it has "the smallest energy release." It is slow because a proton must change into a neutron by the weak interaction. Problem 6 presents n + ²H → ³H + γ as "an important way to produce tritium for fusion reactors," forming a self-sustaining breeding cycle. It also says that tritium "doesn't exist naturally." Fusion blankets breed tritium from ⁶Li (the reaction in the Nuclear Weapons problems), and trace natural tritium is produced by cosmic rays.

### E40 · P1 · The ²³⁵U fission energy is 179.4 MeV, not 1111 MeV

[ch32Fission.md:442](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fission.md#L442) (problem 2)

91.926269 + 141.916361 + 2(1.008665) = **235.859960 u**, not 234.859960 u. The mass defect is 0.192635 u, so E = **179.4 MeV**. The discussion notices that 1111 MeV is "unusually high" and suggests the chosen fragments may be the cause. It should instead correct the addition.

### E41 · P2 · The breeding β⁻ energies subtract an extra electron mass

[ch32Fission.md:554](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fission.md#L554) (problem 5)

With the atomic masses given, the β⁻ Q value is Δm c². For ²³⁹U → ²³⁹Np, Q = (0.001357 u)(931.5 MeV/u) = **1.264 MeV**. For ²³⁹Np → ²³⁹Pu, Q = **0.722 MeV**. The key's 0.753 and 0.211 MeV each subtract 0.511 MeV. The key also writes ν_e where an antineutrino is emitted. The statement says that "the primary purpose of the four nuclear reactors at Chernobyl was breeding plutonium for weapons." Chernobyl's RBMK units were civilian power reactors; remove that claim.

### E42 · P2 · Two nuclear-weapons discussions misstate scale and historical effects

[ch32NuclearWeapons.md:305](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32NuclearWeapons.md#L305) (problem 4) and [ch32NuclearWeapons.md:516](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32NuclearWeapons.md#L516) (problem 10)

Problem 4 says that 4.65 × 10¹² kWh would "power the world for about 2–3 weeks." With 2.5 × 10¹³ kWh per year, it is about **10 weeks**. Its "currently" also relies on a 2006 arsenal estimate. Problem 10 says that "people 10 km away" at Hiroshima and Nagasaki received severe burns. Those 15–21-kt weapons caused burns to roughly 3–4 km; the 10-km figure applies to the problem's 1-Mt case.

## Chapter 33

### E43 · P1 · A 10⁻³⁰-m range corresponds to about 10¹⁴ GeV, not 10⁵ GeV

[ch33TheYukawaParticleAndTheHeisenbergUncertaintyPrincipleRevisited.md:142](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33TheYukawaParticleAndTheHeisenbergUncertaintyPrincipleRevisited.md#L142) (problem 2)

h/(4π × 3.33 × 10⁻³⁹ s) = **1.58 × 10⁴ J**, not 1.58 × 10⁻⁵ J. That is about 10¹⁴ GeV, which agrees with the preceding problem's 10¹⁴ GeV ↔ 3 × 10⁻³⁹ s. The solution's "10⁵ GeV = 100 TeV" is 10⁹ times too small. The discussion then builds on it ("100,000 times the mass of a proton").

### E44 · P2 · The τ⁻ decay in the key does not contain the antiparticles of the τ⁺ products

[ch33ParticlesPatternsAndConservationLaws.md:1015](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33ParticlesPatternsAndConservationLaws.md#L1015) (problem 5)

The τ⁺ products are μ⁺, ν_μ, and ν̄_τ. Their antiparticles are μ⁻, ν̄_μ, and ν_τ, so the τ⁻ decay is τ⁻ → μ⁻ + ν̄_μ + ν_τ. The key writes τ⁻ → μ⁻ + ν_μ + ν̄_τ, which violates both lepton family numbers.

### E45 · P2 · The muon and neutrino from pion decay carry equal momenta

[ch33ParticlesPatternsAndConservationLaws.md:900](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33ParticlesPatternsAndConservationLaws.md#L900) (problem 2)

The discussion says that "the neutrino carries away most of the energy while the muon carries most of the momentum." In the pion rest frame, the two momenta are equal and opposite. The energy split (29.8 MeV to the neutrino and 4.1 MeV to the muon) follows from that equality.

### E46 · P2 · The neutrino-mass answers rely on the old "may be zero" table entry

[ch33ParticlesPatternsAndConservationLaws.md:1121](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33ParticlesPatternsAndConservationLaws.md#L1121) (problem 8) and [ch33GUTS.md:474](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33GUTS.md#L474) (problem 8)

The revised chapters state that neutrino oscillations establish nonzero neutrino masses. Problem 8 in Patterns and Conservation Laws compares with "less than 31 MeV/c²" from Table 1. Its discussion says the tau-neutrino mass is "possibly even zero like its counterparts." The supernova problem in GUTs concludes that neutrinos have "very small (possibly zero) mass." Table 1 itself still lists every neutrino as "0 (<…)," with footnote 3: "Neutrino masses may be zero." Update the table and both discussions together.

### E47 · P2 · Σ⁰ and Λ⁰ have the same spin

[ch33ParticlesPatternsAndConservationLaws.md:1041](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33ParticlesPatternsAndConservationLaws.md#L1041) (problem 6)

Part (b) says the two baryons have "identical quark content but different masses and spins." Both are spin-½ uds states. They differ in the isospin arrangement of the u and d quarks, which is why Σ⁰ decays electromagnetically to Λ⁰.

## Chapter 34

### E48 · P2 · The neutron star's spin energy is about 16 times the Sun's lifetime output, not 100,000 times

[ch34CosmologyAndParticlePhysics.md:993](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34CosmologyAndParticlePhysics.md#L993) (problem 18)

1.9 × 10⁴⁵ J is right. The Sun radiates 3.8 × 10²⁶ W × 3.16 × 10¹⁷ s ≈ 1.2 × 10⁴⁴ J in 10 billion years. The ratio is therefore about **16**.

### E49 · P2 · The Planck-time discussion presents unification as established

[ch34CosmologyAndParticlePhysics.md:1076](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34CosmologyAndParticlePhysics.md#L1076) (problem 20)

The 3.3 × 10¹⁸ GeV result is right. The discussion says this "is exactly the energy scale at which all four fundamental forces … are expected to unify" and that "the universe was truly unified" before 10⁻⁴³ s. The content revision (its item 57) rewrote the chapter to distinguish Planck scales from hypotheses about unification. Describe the Planck energy as the scale at which a quantum theory of gravity is expected to be needed.

### E50 · P2 · Sgr A* has an average density inside its event horizon of about 10⁶ kg/m³

[ch34GeneralRelativityAndQuantumTheory.md:402](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34GeneralRelativityAndQuantumTheory.md#L402) (problem 4, sample solution)

With M = 8.0 × 10³⁶ kg and R_S = 1.19 × 10¹⁰ m, the average density is ρ = M/(4/3 π R_S³) = **1.1 × 10⁶ kg/m³**, about 1100 times that of water. The solution gives "about 5 × 10³ kg/m³ — only about 5 times the density of water," which is also internally inconsistent: 5 × 10³ kg/m³ is 5 times water's density, but the true value is 200 times larger.

## Additional presentation, precision, and modeling notes

These are separate from the substantive finding count.

- **Two answers in one solution.** Each item lists the computed value first.
  - Chapter 29 solutions end with a bare answer-key line. In [The Photoelectric Effect](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29ThePhotoelectricEffect.md), these lines disagree with the computed values: 262 vs "263 nm," 3.68 vs "3.69 eV," 0.48 vs "0.483 eV," 2.24 vs "2.25 eV," 263 vs "264 nm," 1.94 vs "1.95 × 10⁶ m/s," 4.03 vs "4.02 × 10¹⁵ /s," and 0.251 vs "0.256 mW." In [Photon Energies](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29PhotonEnergiesAndTheElectromagneticSpectrum.md), they give 6.31 vs "6.34 × 10⁻⁹ eV," 2.41 vs "2.42 × 10²⁰ Hz," and 0.0828 vs "0.0829 eV." Use one set of constants (h = 6.626 × 10⁻³⁴ J·s, e = 1.602 × 10⁻¹⁹ C) and drop the duplicate line.
  - [Dispersion](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25Dispersion.md#L577), problem 8: violet emerges at 55.2°; the answer gives "55.3° (or 55.2° with rounding)."
  - [Image Formation by Mirrors](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25ImageFormationByMirrors.md#L768), problem 7: "+0.111 or +0.111" and "0.750 cm or 0.752 cm." [Problem 6](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25ImageFormationByMirrors.md#L708) gives R = 2.00 m for a convex mirror whose f is −1.00 m.
  - [X-Rays](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30XRays.md#L563), problem 5: intermediate rounding gives 8.03 and 9.51 keV, then "rounding" gives 8.00 and 9.48 keV. Calling the 9.48-keV model value "quite close" to the measured 8.91 keV overstates the agreement.
  - [Relativistic Energy](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L1473), problem 21: computes 6.3 × 10⁹ J from the data, then writes "Actually … 5.9 × 10⁹ J, let's use" that value.
  - [Nuclear Weapons](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32NuclearWeapons.md#L457), problem 8: the strategy uses 9.0 × 10⁷ kg, but the solution converts short tons to 8.16 × 10⁷ kg, giving heights of 2.37 km and 2.61 km.
  - [Fusion](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L745), problem 12: the strategy adds 2.044 MeV of annihilation energy to 26.73 MeV, which double counts because atomic masses already include it. The solution does not add it.
  - [Therapeutic Uses](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32TherapeuticUsesOfIonizingRadiation.md#L509), problem 10: the strategy uses about 2850 cancer deaths per million per year; the solution uses 110 per 100,000.
  - [Multiple Slit Diffraction](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L1278), problem 18: 633/0.3714 = 1.70 µm, not 1.71 µm. [Problem 1](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L272): the second and third orders are at 12.0° and 18.2°, not 11.96° and 18.05°.
  - [Half-Life and Activity](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch31HalfLifeAndActivity.md#L722), problem 9: 1.75 Bq from 1.00 kg of ⁵⁰V gives 1.51 × 10¹⁷ y; the key gives 1.48 × 10¹⁷ y.
  - [Vision Correction](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26VisionCorrection.md#L1174), problem 10: 1.08 × 52.0 = 56.16 D gives 16.2 cm; rounding to 56.2 first gives 16.1 cm.
- **Statement typos, links, and labels.**
  - [Bohr's Theory](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30BohrsTheoryOfTheHydrogenAtom.md#L823), problem 8: "1.097 × 10⁷ m = R" should have units of m⁻¹. [Problem 13](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30BohrsTheoryOfTheHydrogenAtom.md#L1089) calls the n_f = 5 series an "extended Pfund series"; it is the Pfund series.
  - [Pauli Exclusion Principle](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L830), problem 5 key: states the rule as "n ≥ l" (it is l ≤ n − 1), and writes "3 > (2l + 1) = 2" and "7 > (2l + 1) = 2(2 + 1)" for 2(2l + 1). [Problem 8](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L922) never makes the comparison it asks for.
  - [Fission](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fission.md#L413), problem 1 key: "Z = 92 = 38 + 53" should be 38 + 54 (Xe). [Problem 6](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fission.md#L577) writes "²³⁹P" for ²³⁹Pu. Four solution blocks in this file are tagged `data-element-type="conceptual-questions"`.
  - [Nuclear Weapons](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32NuclearWeapons.md#L421), problem 7 key: "10 overheads." Its missile-mass estimate (about 4.5 tons) is far below real missiles.
  - [Image Formation by Lenses](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25ImageFormationByLenses.md#L909), problem 2: labels 200 mm as the "minimum focal length" and calls 80 mm "wide-angle."
  - [Accelerators](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33AcceleratorsCreateMatterFromEnergy.md#L352), problem 6: the LHC collides protons with protons, not antiprotons. The discussion's "(14.0 TeV versus 14.00 TeV)" is garbled.
  - [Microscopy Enhanced by Wave Characteristics](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MicroscopyEnhancedByTheWaveCharacteristicsOfLight.md#L198), conceptual question 2: "Crown glass prism where n_prism < n_water" contradicts n = 1.52.
  - [Quarks](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33Quarks.md#L1600), problem 21 key: gives p̄ → π⁰ + e⁻ as "its decay mode." The antiproton is stable in isolation, and this is only the conjectured GUT analog.
  - Exercise blocks in [Chapter 25](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch25ImageFormationByLenses.md) (20), Chapter 26 (5), Chapter 28 (61), and Chapter 31 (27) use `data-element-type="problem-exercises"` instead of `problems-exercises`: 113 blocks in all.
- **Modeling notes.**
  - [Medical Imaging](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32MedicalImagingAndDiagnostics.md#L400), problem 4(b): moving the source 1.00 mm changes the path difference by 2.00 mm, so a 1.00-mm resolution needs 6.67 ps. The discussion itself uses Δx = cΔt/2.
  - [Single Slit Diffraction](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27SingleSlitDiffraction.md#L623), problem 9(b): with y = L tan θ at 17.1°, the minima are 0.286 mm apart; L Δθ gives 0.262 mm.
  - [Pauli Exclusion Principle](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L1366), problem 19: the key (2520 J, 1.34 × 10²³ photons) assumes a starting temperature of 37 °C that the statement never gives. [Problem 21](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L1441)'s 7.27 × 10⁻²⁰ J/molecule implies L_v = 2430 kJ/kg; the book's table value, 2256 kJ/kg, gives 6.75 × 10⁻²⁰ J (0.421 eV, a ratio of 15.2).
  - [Quantum Numbers and Rules](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30QuantumNumbersAndRules.md#L791), problem 8: the five m_l orientations do not "correspond to the five d-orbitals in chemistry (d_z², d_xz, …)." The real d orbitals are combinations of m_l states, except d_z².
- **Side-remark slips in discussions.** These items do not change answers. Fix them where the text is touched.
  - **Optics (ch25–ch27).**
    - [Vision Correction](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26VisionCorrection.md#L258), conceptual question 2: the cornea is "2/3 of the eye's power (~43 D out of ~50 D)," and 1 D needs "~6 µm" of ablation, while the next solution uses about 12 µm/D.
    - [Microscopes](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26Microscopes.md#L349), conceptual question 1: Rayleigh is given as 1.22λ/NA, while the same section uses 0.61λ/NA. [Conceptual question 4](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch26Microscopes.md#L598) lists water (1.33) and glycerol (1.47) as "even higher refractive index" media than oil.
    - [Young's Double Slit](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27YoungsDoubleSlitExperiment.md#L431), problem 4: with d < λ there are no first-order maxima, not "one or two orders."
    - [Multiple Slit](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L735), problem 9: "0.5 nm (or about 6 nm)" is garbled, and D₂ is 589.0 nm while the computed line is 589.1 nm. [Problem 21](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27MultipleSlitDiffraction.md#L1465): 380–400 nm light does have a first-order maximum with d = 400 nm.
    - [Single Slit](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27SingleSlitDiffraction.md#L486), problem 7: "13 bright regions: the central maximum plus 12 secondary maxima on each side" miscounts.
    - [Limits of Resolution](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27LimitsOfResolution.md#L370), problem 3: 1.46 × 10⁻⁵ rad is 0.0146 mrad, not 0.00146.
    - [Polarization](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27Polarization.md#L916), problem 12: n = 1.46 matches fused quartz in Table 1, not window glass. [Problem 13](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch27Polarization.md#L945): cubic zirconia (2.15–2.18) is not "consistent with" n = 1.92.
  - **Relativity and quantum physics (ch28–ch29).**
    - [Time Dilation](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28SimultaneityAndTimeDilation.md#L471), problem 1: γ = 1.15 means clocks run 13% slow, not 15%. [Problems 7–8](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28SimultaneityAndTimeDilation.md#L725): the fastest spacecraft reach about 0.06% of c, not 0.01%.
    - [Relativistic Energy](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L1015), problem 11: γ − 1 = 5 × 10⁻¹⁵ at 30 m/s, not 5 × 10⁻¹³. [Problem 15](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28RelativisticEnergy.md#L1204): γ = 1.667 corresponds to 0.800c, not 0.745c.
    - [Quantization of Energy](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29QuantizationOfEnergy.md#L321), problem 3: h ≈ 10⁻⁶ J·s is about 10²⁷ times larger, not "billions of times."
    - [Photon Momentum](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29PhotonMomentum.md#L294), problem 1: the gap to a slow baseball is about 31 orders of magnitude, not 20. A 1-kW oven emits 5.9 × 10²⁶ photons/s and exerts P/c ≈ 3 × 10⁻⁶ N, not 10⁻³ N.
    - [The Wave Nature of Matter](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29TheWaveNatureOfMatter.md#L352), problem 4: at 2.21 × 10⁻³² m/s, the ball crosses a proton diameter in about 2.4 billion years, which is less than the age of the universe.
    - [Probability](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29Probability.md#L526), problem 7: light travels about 100 fm in 3.3 × 10⁻²² s, not 0.1 fm. [Problem 9](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29Probability.md#L606): a 10⁻¹⁸ fractional mass uncertainty is not measurable.
    - [Particle-Wave Duality Reviewed](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29ParticleWaveDualityReviewed.md#L409), problem 6: "0.9999999% of the speed of light" should be 99.99999995%. [Problem 8](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29ParticleWaveDualityReviewed.md#L483): the angular resolution is about 400 times the eye's, not 500,000. [Problem 13](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch29ParticleWaveDualityReviewed.md#L696): 1.24 GeV is not "typical of nuclear processes."
  - **Atomic physics (ch30).**
    - [Discovery of the Atom](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30DiscoveryOfTheAtom.md#L274), problem 3: a basketball is about 0.24 m, not 1 m, across. [Parts of the Atom](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30DiscoveryOfThePartsOfTheAtom.md#L443), problem 1: 6 × 10¹⁴ kg is 600 billion tonnes, not 600 million.
    - [Bohr's Theory](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30BohrsTheoryOfTheHydrogenAtom.md#L958), problem 11: the Lyman series spans 30 nm, so the 243-nm gap is about 8 times its width, not 2. [Problem 15](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30BohrsTheoryOfTheHydrogenAtom.md#L1201): 22.8 nm is extreme UV, not soft X-ray.
    - [X-Rays](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30XRays.md#L429), problem 2: 0.0413 nm is about 13,000 times shorter than visible light, not 1000. [Problem 3](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30XRays.md#L466): 100 keV is about 7400 times hydrogen's ionization energy, not 7 million. [Problem 4](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30XRays.md#L519): tungsten's K edge is 69.5 keV, so 72.5 keV does not "match" it.
    - [Pauli Exclusion Principle](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch30ThePauliExclusionPrinciple.md#L1065), problem 12: 526 km/s is not "typical" of stars in the Galaxy.
  - **Nuclear and particle physics (ch32–ch33).**
    - [Nuclear Weapons](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32NuclearWeapons.md#L252), problem 2: chemical reactions do convert a little mass (Chapter 28 gives Δm/m ~ 10⁻¹⁰); "no mass is converted" contradicts it.
    - [Fusion](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch32Fusion.md#L534), problem 5: 3.12 × 10⁵ kg is about 310 tonnes, not 200.
    - [Quarks](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33Quarks.md#L1010), problem 6: the π⁰ lifetime (8.4 × 10⁻¹⁷ s) is longer than the η⁰'s (2.53 × 10⁻¹⁹ s), not "even shorter." [Problem 10](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33Quarks.md#L1168): s → d does not proceed by emitting a single W⁺; the process is s → u + W⁻, then W⁻ → d + ū.
  - **Cosmology and gravitation (ch34).**
    - [Cosmology](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34CosmologyAndParticlePhysics.md#L667), problem 10: 2.6 × 10⁻¹⁰ N is the weight of about 26 µg, not a bacterium (about 10⁻¹⁴ N).
    - [Cosmology](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34CosmologyAndParticlePhysics.md#L599), problem 8: accelerated expansion is established (Nobel Prize 2011), not merely something observations "suggest … may" show. [Problem 6](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34CosmologyAndParticlePhysics.md#L535): 226 million years ago was the Late Triassic, when early dinosaurs already existed.
    - [Dark Matter and Closure](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34DarkMatterAndClosure.md#L170), problem 2: the cosmic neutrino background is about 1.1 × 10⁸ m⁻³ per flavor (about 3.4 × 10⁸ m⁻³ in total), not 3 × 10⁸ per flavor and 10⁹ in total.
- **Chapter text and glossary left over from the content revision.** These are outside the exercise scope but were found while checking exercise discussions against the text.
  - [Simultaneity and Time Dilation](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch28SimultaneityAndTimeDilation.md#L428): the section summary and glossary still say that "special relativity does not apply to accelerating frames of reference." The corrected main text and the Einstein's Postulates summary say the opposite.
  - [Particles, Patterns, and Conservation Laws, Table 1](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch33ParticlesPatternsAndConservationLaws.md#L305), with footnote 3: neutrino masses are listed as "0 (<…)" and "may be zero" (see E46).
  - [Cosmology glossary](https://github.com/veillette/physics-book/blob/78fbfb3ffab182371728c5c666e8f61c92ecf765/contents/ch34CosmologyAndParticlePhysics.md#L1221): "Big Bang: a gigantic explosion that threw out matter a few billion years ago" (about 13.8 billion years, and not an explosion into pre-existing space). The inflation factor is written "10⁻⁵⁰" for about 10⁵⁰. The epoch entries omit the unit "s."

## Verification notes

Independent calculations used c = 3.00 × 10⁸ m/s, h = 6.626 × 10⁻³⁴ J·s, hc = 1240 eV·nm, 1 u = 931.5 MeV/c², and 1 y = 3.156 × 10⁷ s, unless the question specified otherwise. In particular:

- **Figures.** The diver geometry (E01) was read from Figure 25_03_05. The CRT force directions in Pauli Exclusion Principle problem 9 were checked against Figure 30_02_04 with an explicit cross product and are correct.
- **Atomic-mass arithmetic.** Fission and β-decay Q values were recomputed from the masses printed in each problem. The ²³⁵U alpha-decay key (4.679 MeV) is consistent with the 235.043924 u used in the Chapter 31 text. The Chapter 32 fission solution uses 235.043930 u.
- **Dose model.** E34 compares each exercise with the current `ch32` text and tables (w_R in Biological Effects, Table 1; Gy fractionation in Therapeutic Uses, Table 1), not with the original OpenStax tables.
- **Answer-key forcing.** These were identified only when the solution's own displayed arithmetic or relation gives a different value from the one it reports (E15, E40).
- **Unchanged answers.** Keys that were checked and found correct are not listed. Ch31 and much of ch33 consist of bare answer keys, and every numerical key in those sections was recomputed.

This review did not modify textbook content. A site build or link-linter pass would not validate the physics in these exercises and was not used as evidence of correctness.
