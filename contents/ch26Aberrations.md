---
title: Aberrations
layout: page
sectionNumber: 6
chapterNumber: 26
---

<div class="abstract" markdown="1">
* Describe optical aberration.
</div>

Real lenses behave somewhat differently from how they are modeled using the thin
lens equations, producing **aberrations**. An aberration is a distortion in an
image. There are a variety of aberrations due to a lens size, material,
thickness, and position of the object. One common type of aberration is
chromatic aberration, which is related to color. Since the index of refraction
of lenses depends on color or wavelength, images are produced at different
places and with different magnifications for different colors. (The law of
reflection is independent of wavelength, and so mirrors do not have this
problem. This is another advantage for mirrors in optical systems such as
telescopes.) [[Figure 1]](#Figure1)(a) shows chromatic aberration for a single
convex lens and its partial correction with a two-lens system. Violet rays are
bent more than red, since they have a higher index of refraction and are thus
focused closer to the lens. The diverging lens partially corrects this, although
it is usually not possible to do so completely. Lenses of different materials
and having different dispersions may be used. For example an achromatic doublet
consisting of a converging lens made of crown glass and a diverging lens made of
flint glass in contact can dramatically reduce chromatic aberration (
see [[Figure 1]](#Figure1)(b)).

Quite often in an imaging system the object is off-center. Consequently,
different parts of a lens or mirror do not refract or reflect the image to the
same point. This type of aberration is called a coma and is shown
in [[Figure 2]](#Figure2). The image in this case often appears pear-shaped.
Another common aberration is spherical aberration where rays converging from the
outer edges of a lens converge to a focus closer to the lens and rays closer to
the axis focus further (see [[Figure 3]](#Figure3)). Aberrations due to
astigmatism in the lenses of the eyes are discussed
in [Vision Correction](../contents/ch26VisionCorrection), and a chart used to detect astigmatism is shown
in [[Figure 4]](../contents/ch26VisionCorrection#Figure4). Such aberrations and can also be an
issue with manufactured lenses.

![Part a shows a single convex lens. White light source rays are striking the edges and the optical axis of the lens. Visible spectrum of light is refracted from the lens and is falling on the axis. Violet rays have bent more than red rays and are focused closer to the lens shown as V and R dots at different location. Part b shows an achromatic doublet lens. White light source rays are striking the edges and the optical axis of the lens. Rays are getting refracted within the lens and a visible spectrum of light is falling at one point of the axis shown as a dot.](../resources/Figure_26_06_01.jpg '(a) Chromatic aberration is caused by the dependence of a lens’s index of refraction on color (wavelength). The lens is more powerful for violet (V) than for red (R), producing images with different locations and magnifications. (b) Multiple-lens systems can partially correct chromatic aberrations, but they may require lenses of different materials and add to the expense of optical systems such as cameras.')
{: #Figure1}

![The image shows a biconvex lens. Rays originating from points not on the optical axis are striking the lens. Pairs of the rays converge at different focus points, but there is no one point where all rays converge.](../resources/Figure_26_06_02.jpg 'A coma is an aberration caused by an object that is off-center, often resulting in a pear-shaped image. The rays originate from points that are not on the optical axis and they do not converge at one common focal point.')
{: #Figure2}

![The image shows a spherical converging lens. Light rays are hitting the lens and converging at different points. These focus positions are dependent on which zone of the lens the light hits.](../resources/Figure_26_06_03.jpg 'Spherical aberration is caused by rays focusing at different distances from the lens.')
{: #Figure3}

The image produced by an optical system needs to be bright enough to be
discerned. It is often a challenge to obtain a sufficiently bright image. The
brightness is determined by the amount of light passing through the optical
system. The optical components determining the brightness are the diameter of
the lens and the diameter of pupils, diaphragms or aperture stops placed in
front of lenses. Optical systems often have entrance and exit pupils to
specifically reduce aberrations but they inevitably reduce brightness as well.
Consequently, optical systems need to strike a balance between the various
components used. The iris in the eye dilates and constricts, acting as an
entrance pupil. You can see objects more clearly by looking through a small hole
made with your hand in the shape of a fist. Squinting, or using a small hole in
a piece of paper, also will make the object sharper.

So how are aberrations corrected? The lenses may also have specially shaped
surfaces, as opposed to the simple spherical shape that is relatively easy to
produce. Expensive camera lenses are large in diameter, so that they can gather
more light, and need several elements to correct for various aberrations.
Further, advances in materials science have resulted in lenses with a range of
refractive indices—technically referred to as graded index (GRIN) lenses.
Spectacles often have the ability to provide a range of focusing ability using
similar techniques. GRIN lenses are particularly important at the end of optical
fibers in endoscopes. Advanced computing techniques allow for a range of
corrections on images after the image has been collected and certain
characteristics of the optical system are known. Some of these techniques are
sophisticated versions of what are available on commercial packages like Adobe
Photoshop.

### Section Summary

- Aberrations or image distortions can arise due to the finite thickness of
  optical instruments, imperfections in the optical components, and limitations
  on the ways in which the components are used.
- The means for correcting aberrations range from better components to
  computational techniques.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
List the various types of aberrations. What causes them and how can each be reduced?

</div>
<div class="solution" markdown="1">

**Strategy**

To systematically address optical aberrations, we need to identify the main types discussed in optical systems, understand their physical origins, and examine practical methods for their reduction. Aberrations arise from the departure of real optical systems from the idealized thin lens approximation.

**Solution**

The major types of optical aberrations are:

**1. Chromatic Aberration**

*Cause:* The refractive index of optical materials varies with wavelength (dispersion). Different colors of light are refracted by different amounts, causing them to focus at different distances from the lens. Violet light (shorter wavelength, higher refractive index) focuses closer to the lens than red light (longer wavelength, lower refractive index).

*Reduction methods:*
- Use **achromatic doublets**: Combine a converging lens (crown glass) with a diverging lens (flint glass) made from materials with different dispersion properties
- Use **apochromatic lens systems**: Multiple lens elements designed to bring three wavelengths to the same focus
- Use **mirrors instead of lenses**: Reflection is independent of wavelength, so mirrors do not exhibit chromatic aberration
- Apply **diffractive optical elements**: Can be designed to have opposite dispersion to refractive elements

**2. Spherical Aberration**

*Cause:* Rays passing through the outer edges of a spherical lens converge at a point closer to the lens than rays passing through the center (paraxial rays). This occurs because spherical surfaces are not the ideal shape for focusing—a parabolic surface would be better for collimated light.

*Reduction methods:*
- Use **aspheric lens surfaces**: Depart from spherical shape to achieve better focusing
- Use **aperture stops**: Reduce the lens diameter to block peripheral rays (though this reduces brightness)
- Use **multiple lens elements**: Combine lenses to partially cancel spherical aberration
- Position lenses optimally: Use specific lens orientations and separations

**3. Coma**

*Cause:* Off-axis object points produce comet-shaped or pear-shaped images. Different zones of the lens refract off-axis rays to different positions, and the magnification varies across the lens aperture. This asymmetric aberration increases with distance from the optical axis.

*Reduction methods:*
- Use **aplanatic lens designs**: Special lens combinations that simultaneously correct for spherical aberration and coma
- Use **symmetrical optical designs**: Multi-element systems with symmetric configuration
- Restrict **field of view**: Limit the angular range of off-axis objects
- Use **field flatteners**: Additional optical elements to improve off-axis performance

**4. Astigmatism (in lenses and optical systems)**

*Cause:* For off-axis points, rays in different planes (tangential vs. sagittal) focus at different distances. The lens effectively has different focal lengths in perpendicular directions for off-axis objects.

*Reduction methods:*
- Use **anastigmat lens designs**: Multi-element systems designed to correct astigmatism
- Use **curved image surfaces**: Match the natural field curvature of the lens system
- Optimize **lens spacing and curvatures**: Careful optical design can minimize astigmatism
- Limit **field angle**: Keep objects near the optical axis

**5. Field Curvature**

*Cause:* The image surface naturally falls on a curved surface (Petzval surface) rather than a flat plane. Even when other aberrations are corrected, sharp focus occurs on a curved rather than flat surface.

*Reduction methods:*
- Use **field-flattening elements**: Additional lenses designed to flatten the image surface
- Use **curved detectors/film**: Match the detector to the natural field curvature
- Balance against astigmatism: These aberrations can partially cancel
- Use **meniscus lenses**: Can help reduce field curvature

**6. Distortion (Barrel and Pincushion)**

*Cause:* Magnification varies with distance from the optical axis. This doesn't affect sharpness but causes straight lines to appear curved. Barrel distortion occurs when magnification decreases away from the axis; pincushion distortion occurs when it increases.

*Reduction methods:*
- Use **symmetrical lens designs**: Balanced optical configurations
- Position **aperture stops appropriately**: Strategic placement can minimize distortion
- Use **computational correction**: Digital post-processing to correct distortion
- Use **multiple elements**: Specific lens combinations can cancel distortion

**Discussion**

The correction of aberrations involves fundamental trade-offs in optical design. No single lens can simultaneously correct all aberrations perfectly across a wide field of view and wavelength range. High-quality optical systems (such as expensive camera lenses, microscope objectives, and telescope optics) use multiple lens elements made from different glass types, often including aspherical surfaces and special coatings.

Modern optical design relies heavily on computer optimization to balance these various aberrations for specific applications. For example, a wide-angle camera lens prioritizes distortion correction and field flatness, while a telescope objective prioritizes chromatic and spherical aberration correction for on-axis performance.

Some practical examples of aberration correction include:
- **Camera lenses**: Expensive lenses use 10-20 elements to correct multiple aberrations
- **Microscope objectives**: Marked as "achromat," "plan" (flat field), or "apo" (apochromatic)
- **Eyeglasses**: Simple lenses accept some aberration for off-axis vision
- **Telescopes**: Reflector designs eliminate chromatic aberration entirely
- **GRIN lenses**: Graded-index materials provide correction through varying refractive index
- **Digital correction**: Modern cameras correct distortion computationally

The choice of correction method depends on application requirements, cost constraints, and acceptable performance trade-offs. Scientific instruments typically demand more comprehensive aberration correction than consumer devices.

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) During laser vision correction, a brief burst of 193 nm ultraviolet light is
projected onto the cornea of the patient. It makes a spot 1.00 mm in diameter
and deposits 0.500 mJ of energy. Calculate the depth of the layer ablated,
assuming the corneal tissue has the same properties as water and is initially at
$$34.0 \text{ºC} $$ . The tissue’s temperature is increased to $$100 \text{ºC} $$
and evaporated without further temperature increase.

(b) Does your answer imply that the shape of the cornea can be finely
controlled?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
(a)  $$0.251 \text{μm} $$
(b) Yes, this thickness implies that the shape of the cornea can be very finely controlled, producing normal distant vision in more than 90% of patients.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

aberration
: failure of rays to converge at one focus because of limitations or defects in
a lens or mirror

</div>
