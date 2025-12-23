# OpenStax College Physics Errata Corrections Report
## Analysis Period: 2024-2025

This report documents all errata corrections from the openstax/osbooks-college-physics-bundle repository from 2024 onwards, organized by module number. These corrections are applicable to markdown-based textbook implementations.

---

## Summary Statistics
- **Total Errata IDs Analyzed**: 26
- **Total Modules Affected**: 23
- **Date Range**: July 2025 - December 2025
- **Primary Contributor**: Ryan Stickney (oscryan)

---

## Corrections by Module

### Module m42080: Drag Forces and Terminal Velocity
**Errata ID**: 26182
**Date**: 2025-07-09
**Type**: Conceptual clarification

**Before**:
> "The size of the object that is falling through air presents another interesting application of air drag. If you fall from a 5-m high branch of a tree, you will likely get hurt—possibly fracturing a bone. However, a small squirrel does this all the time, without getting hurt. You don't reach a terminal velocity in such a short distance, but the squirrel does."

**After**:
> "The size of the object that is falling through air presents another interesting application of air drag. The terminal velocity of a small squirrel is less than the terminal velocity we found previously for the skydiver, and so the squirrel can fall from a significant height without injury."

**Impact**: Replaced qualitative explanation with quantitative physics-based explanation that directly references terminal velocity concept.

---

### Module m42084: Centripetal Force Problem
**Errata ID**: 26070
**Date**: 2025-07-09
**Type**: Multiple numerical errors in solution

**Changes**:

**Part (a) - Velocity**:
- Before: 16.6 m/s
- After: **39.2 m/s**

**Part (d) - Normal Force**:
- Before: 1.76 × 10³ N or 3.00 w (normal force = 3× weight)
- After: **2.93 × 10³ N or 5.00 w** (normal force = 5× weight)

**Structural Changes**:
- Problem reorganized from 5 parts to 4 parts
- Part (b) acceleration calculation removed
- Parts renumbered accordingly

**Impact**: Major numerical corrections affecting problem solution key.

---

### Module m42103: Motion and Velocity Calculations
**Errata ID**: 27346
**Date**: 2025-12-04
**Type**: Problem statement and solution restructuring

**Changes**:

**Before**: Single exercise asking to verify velocity at t=30.0 s is approximately 0.24 m/s

**After**: Split into two parts:
- **(a)** Calculate slopes at **t=10 s AND t=30 s** to find velocities
  - Updated values: **0.208 m/s** (at t=10 s) and **0.238 m/s** (at t=30 s)
- **(b)** NEW requirement: "Find the approximate acceleration at t=20 s"
  - Solution: **0.0015 m/s²**

**Impact**: Significantly expanded problem scope with new calculations and updated numerical values.

---

### Module m42120: Weight Calculation
**Errata ID**: 27151
**Date**: 2025-10-06
**Type**: Numerical error in solution

**Before**:
> "(a) 23.7 pounds; Because the number of bags is an exact value, it is not considered in the significant figures."

**After**:
> "(a) **37.2 pounds**; Because the number of bags is an exact value, it is not considered in the significant figures."

**Impact**: Corrected answer from 23.7 to 37.2 pounds.

---

### Module m42173: Statics - Ladder Problem
**Errata ID**: 27502
**Date**: 2025-12-04
**Type**: Problem statement clarification (physics concepts)

**Changes**:

**Statement about ladder against gutter**:
- Before: "The ladder rests against a plastic rain gutter, which we can assume to be frictionless. The center of mass of the ladder is 2 m from the bottom."
- After: "The ladder rests against a plastic rain gutter, which we can assume to be frictionless. **Because the gutter is round, the ladder is tangent to it and therefore the normal force by the gutter is perpendicular to the ladder.** The center of mass of the ladder is **2.00 m from the bottom, measured parallel to the ladder.**"

**Statement about person's position**:
- Before: "The person is standing 3 m from the bottom"
- After: "The person is standing **3.00 m from the bottom, again measured parallel to the ladder**"

**Additional**: Errata commit a179a09 added a diagram (Figure_09_04_02_img.jpg) to this problem.

**Impact**: Critical physics clarification explaining force direction and measurement method. Also improved precision specification.

---

### Module m42182: Angular Momentum
**Errata ID**: 27173
**Date**: 2025-10-06
**Type**: Solution clarification

**Before**:
> "Substituting known information into the expression for L = Iω and converting ω to radians per second gives"

**After**:
> "Substituting **2π rad for rev** and approximating 1 day as 24 hours or **8.64 × 10⁴ s** into the expression..."

**Impact**: Replaced vague language with explicit conversion factors and calculation steps.

---

### Module m42196: Fluid Mechanics - Buoyancy
**Errata ID**: 27066
**Date**: 2025-10-06
**Type**: Terminology correction

**Before**:
> "The **weight** of the mattress is 2 kg."

**After**:
> "The **mass** of the mattress is 2 kg."

**Impact**: Critical scientific terminology correction (mass vs. weight).

---

### Module m42205: Multiple Choice Answer
**Errata ID**: 26988
**Date**: 2025-10-06
**Type**: Solution key error

**Before**: Answer (c)
**After**: Answer **(b)**

**Impact**: Corrected answer key.

---

### Module m42248: Wave Motion
**Errata ID**: 26140
**Date**: 2025-07-09
**Type**: Conceptual clarification

**Before**:
> "Many people think that water waves push water from one direction to another. In fact, the particles of water tend to stay in one location, save for moving **up and down** due to the energy in the wave."

**After**:
> "Many people think that water waves push water from one direction to another. In fact, **in water waves far from shore**, the particles of water tend to stay in one location, save for moving **in circles** due to the energy in the wave."

**Additional change**:
- Before: "If you feel yourself pushed in an ocean, what you feel is the energy of the wave, not a rush of water."
- After: "If you feel yourself pushed in an ocean, **far from the shore**, what you feel is the energy of the wave, not a rush of water."

**Impact**: Important physics correction - water particles move in circles, not up and down. Added qualification about offshore vs. nearshore behavior.

---

### Module m42249: Harmonic Frequencies
**Errata ID**: 27078
**Date**: 2025-10-06
**Type**: Formula error

**Before**:
```
f₂ = vw/λ₂ = vw/2L = 2f₁
```

**After**:
```
f₂ = vw/λ₂ = vw/L = 2f₁
```

**Impact**: Removed erroneous "2" from denominator. The correct formula has λ₂ = L (not 2L).

---

### Module m42317: Electric Fields
**Errata ID**: 26640
**Date**: 2025-07-09
**Type**: Updated terminology for modern context

**Before**:
> "One use of such a field is to produce uniform acceleration of charges between the plates, such as in the electron gun of a **TV tube**."

**After**:
> "One use of such a field is to produce uniform acceleration of charges between the plates, such as in the electron gun of an **old-fashioned CRT TV (one with a cathode ray tube instead of LCD screen)**."

**Impact**: Updated outdated reference to clarify technology for modern students.

---

### Module m42348: AC Circuits
**Errata ID**: 26573
**Date**: 2025-07-09
**Type**: Image file reference correction

**Change**: Image filename correction (Figure_21_05_01.jpg → Figure_21_05_0jpg)

**Impact**: Technical file reference fix (CNXML-specific, may not apply to markdown implementations).

---

### Module m42352: Bioelectricity
**Errata ID**: 26572
**Date**: 2025-07-09
**Type**: Spelling/terminology correction

**Before**: "**sinoarterial** (SA) node"
**After**: "**sinoatrial** (SA) node"

**Impact**: Corrected anatomical terminology.

---

### Module m42357: Electric Current and Resistance
**Errata ID**: 26640
**Date**: 2025-07-09
**Type**: Updated component example

**Before**: "Any voltage source (in this case, a **carbon-zinc dry cell**) has an emf..."
**After**: "Any voltage source (in this case, an **alkaline dry cell**) has an emf..."

**Impact**: Updated battery example to reflect modern battery technology.

---

### Module m42388: Magnetic Resonance Imaging
**Errata ID**: 26749
**Date**: 2025-07-09
**Type**: Technical clarification

**Before**:
> "Broadcast radio frequencies are swept over an appropriate range and nuclei absorb and reemit them only if the nuclei are in a magnetic field with the correct strength."

**After**:
> "Nuclei absorb and reemit broadcast radio frequencies only if the nuclei are in a magnetic field with the correct strength. **The imaging receiver can build up a tissue map either by sweeping the frequency or emitting a range of frequencies at once and analyzing the frequency response of the collected signal.**"

**Impact**: Enhanced technical accuracy by adding detail about frequency collection methods in MRI.

---

### Module m42408: Electromagnetic Induction
**Errata ID**: 26835
**Date**: 2025-10-06
**Type**: Problem statement restructure

**Before**:
> "What is the peak emf generated by a 0.250 m radius, 500-turn coil is rotated one-fourth of a revolution in 4.17 ms, originally having its plane perpendicular to a uniform magnetic field. (This is 60 rev/s.)"

**After**:
> "What is the peak emf generated by the rotating coil in [link to m42392]? Assume all the conditions (coil size, rotation rate, and magnetic field) are the same as in [link to m42392]"

**Impact**: Changed standalone problem to reference-based for pedagogical consistency.

---

### Module m42431: RLC Circuits and Resonance

#### Errata 27006
**Date**: 2025-10-06
**Type**: Numerical value correction in solution

**Before**: "I_rms was found to be **6.00 A** in..."
**After**: "I_rms was found to be **3.00 A** in..."

**Impact**: Corrected RMS current value for consistency.

#### Errata 26790
**Date**: 2025-10-06
**Type**: Numerical value correction in problem statement

**Before**: "What is the average power at **50.0 Hz**?"
**After**: "What is the average power at **60.0 Hz**?"

**Impact**: Frequency correction to match part (a) of the problem.

---

### Module m42444: Heat Transfer and Climate Change
**Errata ID**: 26849
**Date**: 2025-10-06
**Type**: Factual statement update

**Before**:
> "**Some scientists think that** the increased concentration of CO₂ and other greenhouse gases in the atmosphere, resulting from increases in fossil fuel burning, has increased global average temperatures."

**After**:
> "The increased concentration of CO₂ and other greenhouse gases in the atmosphere, resulting from increases in fossil fuel burning, has increased global average temperatures."

**Impact**: Removed speculative qualifier to present established scientific consensus as fact.

---

### Module m42449: Introduction to Optics
**Errata ID**: 26801
**Date**: 2025-10-06
**Type**: Content revision

**Before**:
> "Our lives are filled with light. Through vision, **the most valued of our senses**, light can evoke spiritual emotions, such as when we view a magnificent sunset or **glimpse** a rainbow breaking through the clouds."

**After**:
> "Our lives are filled with light. Through vision, light can evoke spiritual emotions, such as when we view a magnificent sunset or **reveal** a rainbow breaking through the clouds, **amuse us in a theater, or warn us to stop at an intersection**."

**Impact**: Removed subjective value judgment about senses and added practical examples.

---

### Module m42462: Total Internal Reflection
**Errata ID**: 26947
**Date**: 2025-10-06
**Type**: Content completion and formatting

**Changes**:

1. **Caption completion**:
   - Before: "is the one for which the angle of refraction is ."
   - After: "is the one for which the angle of refraction is **90º**."

2. **Math notation cleanup**: Improved formatting of critical angle notation θc

**Impact**: Completed missing information in figure caption.

---

### Module m42474: Geometric Optics - Mirrors
**Errata ID**: 26800
**Date**: 2025-07-09
**Type**: XML formatting corrections

**Changes**: Multiple formatting improvements including proper tag closure and spacing.

**Impact**: Structural improvements (CNXML-specific, may not apply to markdown).

---

### Module m42491: Microscopes

#### Errata 27133
**Date**: 2025-10-06
**Type**: Added pedagogical question

**Before**: Problem ended with part (b): "Eyepiece should be 204 cm behind the objective lens."

**After**: Added:
- **(c)** "Is this a realistic design for a microscope?"
- **Solution**: "(c) No, a distance of 205 cm (which is over 2 m) is unrealistic for the tube of a microscope."

**Impact**: Enhanced critical thinking by asking students to evaluate practical feasibility.

#### Errata 26829
**Date**: 2025-10-06
**Type**: Problem parameter correction

**Before**: "You switch from a **1.40 NA 60× oil immersion objective** to a **1.40 NA 60× oil immersion objective**."

**After**: "You switch from a 1.40 NA 60× oil immersion objective to a **0.35 NA 20× oil immersion objective**."

**Impact**: Fixed duplicate objective specifications to make the problem meaningful.

---

### Module m42496: Thin Film Interference
**Errata ID**: 26814
**Date**: 2025-10-06
**Type**: Formatting correction

**Impact**: XML/CNXML formatting (not content-related).

---

### Module m42519: Thin Film Interference - Constructive Interference
**Errata ID**: 27042
**Date**: 2025-10-06
**Type**: Mathematical operator correction

**Before**: t″_c **≤** 5λ_n/4
**After**: t″_c **=** 5λ_n/4

**Impact**: Changed inequality to equation for correct mathematical relationship.

---

### Module m42522: Polarization - LCD Displays
**Errata ID**: 26819
**Date**: 2025-10-06
**Type**: Accessibility improvement

**Before**: Generic alt-text: "Several banks of large LCD screens display information related to the control of a nuclear power plant."

**After**: Detailed alt-text: "Figure a is an illustration of a ray of initially unpolarized light going through a vertical polarizer, then an element labeled LCD no voltage ninety degree rotation, and finally a horizontal polarizer..."

**Impact**: Improved accessibility with detailed image description.

---

## Correction Type Summary

### By Category:

1. **Numerical Errors** (8 corrections):
   - m42084: Velocity and normal force values
   - m42103: Velocity values and new acceleration calculation
   - m42120: Weight calculation
   - m42431: RMS current value and frequency

2. **Formula/Mathematical Errors** (3 corrections):
   - m42249: Harmonic frequency formula
   - m42519: Inequality vs. equation operator

3. **Conceptual Clarifications** (7 corrections):
   - m42080: Terminal velocity explanation
   - m42173: Force direction and measurement
   - m42182: Explicit conversion factors
   - m42248: Water particle motion
   - m42388: MRI frequency collection
   - m42462: Critical angle definition

4. **Terminology/Spelling** (5 corrections):
   - m42196: Mass vs. weight
   - m42317: Updated TV technology reference
   - m42352: Anatomical term spelling
   - m42357: Modern battery type
   - m42444: Climate change scientific consensus

5. **Problem Enhancement** (3 corrections):
   - m42491 (27133): Added realism evaluation question
   - m42491 (26829): Fixed duplicate objectives
   - m42103: Expanded problem scope

6. **Solution Key Errors** (1 correction):
   - m42205: Wrong multiple choice answer

7. **Content Additions/Revisions** (2 corrections):
   - m42449: Revised introduction text
   - m42173: Added diagram

8. **Accessibility/Formatting** (minor):
   - m42522: Improved alt-text
   - m42474, m42496, m42814: XML formatting

---

## Application Guidelines for Markdown-Based Textbooks

### High Priority Corrections (Apply Immediately):
1. **All numerical errors** - These directly affect problem solutions
2. **Formula errors** - Critical for student learning
3. **Conceptual clarifications** - Improve physics understanding
4. **Terminology corrections** - Ensure scientific accuracy
5. **Solution key errors** - Prevent student confusion

### Medium Priority Corrections:
1. **Problem enhancements** - Improve pedagogical value
2. **Updated terminology** - Modernize content
3. **Content revisions** - Enhance clarity

### Low Priority (Context-Dependent):
1. **Cross-reference changes** - Only if implementing similar linking structure
2. **Image-related changes** - Apply if using same images
3. **Formatting changes** - Not applicable to markdown (CNXML-specific)

---

## Notes on Implementation

- All errata corrections were authored by Ryan Stickney (oscryan)
- Corrections span from July 2025 to December 2025
- Most corrections are from October 2025 (bulk update) and December 2025
- Focus on numerical accuracy, conceptual clarity, and modern terminology
- Several corrections address outdated technology references (CRT TVs, old battery types)
- Climate change statement updated to reflect scientific consensus
- Multiple corrections enhance problem-solving pedagogy

---

**Report Generated**: 2025-12-23
**Source Repository**: https://github.com/openstax/osbooks-college-physics-bundle
**Analysis Method**: GitHub API commit analysis via WebFetch
