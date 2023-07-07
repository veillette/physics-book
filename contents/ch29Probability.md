---
title: "Probability: The Heisenberg Uncertainty Principle"
layout: page
---

<div class="abstract" markdown="1">
* Use both versions of Heisenberg’s uncertainty principle in calculations.
* Explain the implications of Heisenberg’s uncertainty principle for measurements.
</div>

### Probability Distribution

Matter and photons are waves, implying they are spread out over some distance.
What is the position of a particle, such as an electron? Is it at the center of
the wave? The answer lies in how you measure the position of an electron.
Experiments show that you will find the electron at some definite location,
unlike a wave. But if you set up exactly the same situation and measure it
again, you will find the electron in a different location, often far outside any
experimental uncertainty in your measurement. Repeated measurements will display
a statistical distribution of locations that appears wavelike. (
See [[Figure 1]](#Figure1).)

![A graph is shown for intensity which is varying like a wave. Corresponding to the maximum point of the wave electrons are shown as small dots in three strips. These strips show different number of electrons with varying density of dots along the length of the strip. A larger number of electrons are in the first strip, a smaller number of electrons in the second strip, and very few electrons in third strip.](../resources/Figure_29_07_01a.jpg "The building up of the diffraction pattern of electrons scattered from a crystal surface. Each electron arrives at a definite location, which cannot be precisely predicted. The overall distribution shown at the bottom can be predicted as the diffraction of waves having the de Broglie wavelength of the electrons.")
{ #Figure1}

![A double-slit interference wavelength pattern for electrons is shown in figure a and for photons in figure b.](../resources/Figure_29_07_02a.jpg "Double-slit interference for electrons (a) and protons (b) is identical for equal wavelengths and equal slit separations. Both patterns are probability distributions in the sense that they are built up by individual particles traversing the apparatus, the paths of which are not individually predictable.")
{ #Figure2}

After de Broglie proposed the wave nature of matter, many physicists, including
Schrödinger and Heisenberg, explored the consequences. The idea quickly emerged
that, **because of its wave character, a particle’s trajectory and destination
cannot be precisely predicted for each particle individually**. However, each
particle goes to a definite place (as illustrated in [[Figure 1]](#Figure1)).
After compiling enough data, you get a distribution related to the particle’s
wavelength and diffraction pattern. There is a certain **probability** of
finding the particle at a given location, and the overall pattern is called a **probability distribution**. Those who developed quantum mechanics devised
equations that predicted the probability distribution in various circumstances.

It is somewhat disquieting to think that you cannot predict exactly where an
individual particle will go, or even follow it to its destination. Let us
explore what happens if we try to follow a particle. Consider the double-slit
patterns obtained for electrons and photons in [[Figure2]](#Figure2). First, we
note that these patterns are identical, following $$d \sin \theta
=m \lambda $$ , the equation for double-slit constructive interference
developed in [Photon Energies and the Electromagnetic Spectrum](../contents/ch29PhotonEnergiesAndTheElectomagneticSpectrum), where
$$d $$ is the slit separation and $$\lambda $$ is the electron or photon
wavelength.

Both patterns build up statistically as individual particles fall on the
detector. This can be observed for photons or electrons—for now, let us
concentrate on electrons. You might imagine that the electrons are interfering
with one another as any waves do. To test this, you can lower the intensity
until there is never more than one electron between the slits and the screen.
The same interference pattern builds up! This implies that a particle’s
probability distribution spans both slits, and the particles actually interfere
with themselves. Does this also mean that the electron goes through both slits?
An electron is a basic unit of matter that is not divisible. But it is a fair
question, and so we should look to see if the electron traverses one slit or the
other, or both. One possibility is to have coils around the slits that detect
charges moving through them. What is observed is that an electron always goes
through one slit or the other; it does not split to go through both. But there
is a catch. If you determine that the electron went through one of the slits,
you no longer get a double slit pattern—instead, you get single slit
interference. There is no escape by using another method of determining which
slit the electron went through. Knowing the particle went through one slit
forces a single-slit pattern. If you do not observe which slit the electron goes
through, you obtain a double-slit pattern.

### Heisenberg Uncertainty

How does knowing which slit the electron passed through change the pattern? The
answer is fundamentally important—**measurement affects the system being
observed**. Information can be lost, and in some cases it is impossible to
measure two physical quantities simultaneously to exact precision. For example,
you can measure the position of a moving electron by scattering light or other
electrons from it. Those probes have momentum themselves, and by scattering from
the electron, they change its momentum **in a manner that loses information**.
There is a limit to absolute knowledge, even in principle.

![A photograph of a young, smiling Werner Heisenberg.](../resources/Figure_29_07_04a.jpg "Werner Heisenberg was one of the best of those physicists who developed early quantum mechanics. Not only did his work enable a description of nature on the very small scale, it also changed our view of the availability of knowledge. Although he is universally recognized for his brilliance and the importance of his work (he received the Nobel Prize in 1932, for example), Heisenberg remained in Germany during World War II and headed the German effort to build a nuclear bomb, permanently alienating himself from most of the scientific community. (credit: Author Unknown, via Wikimedia Commons)")
{ #Figure3 height="300"}

It was Werner Heisenberg who first stated this limit to knowledge in 1929 as a
result of his work on quantum mechanics and the wave characteristics of all
particles. (See [[Figure 3]](#Figure3)). Specifically, consider simultaneously
measuring the position and momentum of an electron (it could be any particle).
There is an **uncertainty in position**{ class="term"} $$\Delta x $$ that is
approximately equal to the wavelength of the particle. That is,

<div class="equation" >
 $$\Delta x\approx \lambda . $$
</div>

As discussed above, a wave is not located at one point in space. If the
electron’s position is measured repeatedly, a spread in locations will be
observed, implying an uncertainty in position $$\Delta x $$ . To detect the
position of the particle, we must interact with it, such as having it collide
with a detector. In the collision, the particle will lose momentum. This change
in momentum could be anywhere from close to zero to the total momentum of the
particle, $$p=h/\lambda $$ . It is not possible to tell how much momentum will
be transferred to a detector, and so there is an **uncertainty in momentum**
$$\Delta p $$ , too. In fact, the uncertainty in momentum may be as large as the
momentum itself, which in equation form means that

<div class="equation" >
 $$\Delta p\approx \frac{h}{\lambda }. $$
</div>

The uncertainty in position can be reduced by using a shorter-wavelength
electron, since $$\Delta x\approx \lambda $$ . But shortening the wavelength
increases the uncertainty in momentum, since $$\Delta p\approx h/\lambda $$ .
Conversely, the uncertainty in momentum can be reduced by using a
longer-wavelength electron, but this increases the uncertainty in position.
Mathematically, you can express this trade-off by multiplying the uncertainties.
The wavelength cancels, leaving

<div class="equation" >
 $$\Delta x\Delta p\approx h. $$
</div>

So if one uncertainty is reduced, the other must increase so that their product
is $$\approx h $$.

With the use of advanced mathematics, Heisenberg showed that the best that can
be done in a **simultaneous measurement of position and momentum** is

<div class="equation" >
 $$\Delta x\Delta p\ge \frac{h}{4\pi }. $$
</div>

This is known as the **Heisenberg uncertainty principle**. It is impossible to
measure position $$x $$ and momentum $$p $$ simultaneously with uncertainties
$$\Delta x $$ and $$\Delta p $$ that multiply to be less than $$h/4\pi $$ .
Neither uncertainty can be zero. Neither uncertainty can become small without
the other becoming large. A small wavelength allows accurate position
measurement, but it increases the momentum of the probe to the point that it
further disturbs the momentum of a system being measured. For example, if an
electron is scattered from an atom and has a wavelength small enough to detect
the position of electrons in the atom, its momentum can knock the electrons from
their orbits in a manner that loses information about their original motion. It
is therefore impossible to follow an electron in its orbit around an atom. If
you measure the electron’s position, you will find it in a definite location,
but the atom will be disrupted. Repeated measurements on identical atoms will
produce interesting probability distributions for electrons around the atom, but
they will not produce motion information. The probability distributions are
referred to as electron clouds or orbitals. The shapes of these orbitals are
often shown in general chemistry texts and are discussed
in [The Wave Nature of Matter Causes Quantization](../contents/ch30TheWaveNatureOfMatterCausesQuantization).

<div id="Example1" class="example" markdown="1">
<div class="title">
Heisenberg Uncertainty Principle in Position and Momentum for an Atom
</div>
(a) If the position of an electron in an atom is measured to an accuracy of 0.0100 nm, what is the electron’s uncertainty in velocity? (b) If the electron has this velocity, what is its kinetic energy in eV?

**Strategy**

The uncertainty in position is the accuracy of the measurement, or $$\Delta x=
0.0100 \text{nm} $$ . Thus the smallest uncertainty in momentum $$\Delta p $$
can be calculated using $$\Delta x\Delta p\ge h\text{/4}\pi $$ . Once the
uncertainty in momentum $$\Delta p $$ is found, the uncertainty in velocity can
be found from $$\Delta p=m\Delta v $$.

**Solution for (a)**

Using the equals sign in the uncertainty principle to express the minimum
uncertainty, we have

<div class="equation" >
 $$\Delta x\Delta p=\frac{h}{4\pi }. $$
</div>
Solving for  $$\Delta p $$  and substituting known values gives

<div class="equation" >
 $$\Delta p=\frac{h}{4\pi \Delta x}=\frac{6.63 \times 10^{-34} \text{J}\cdot \text{s}}{4\pi \left(1.00 \times 10^{-11} \text{m}\right)}= 5.28  \times 10^{-24} \text{kg}\cdot \text{m/s}\text{.} $$
</div>
Thus,

<div class="equation" >
 $$\Delta p= 5.28  \times 10^{-24} \text{kg}\cdot \text{m/s}=m\Delta v. $$
</div>
Solving for  $$\Delta v $$  and substituting the mass of an electron gives

<div class="equation" >
 $$\Delta v=\frac{\Delta p}{m}=\frac{ 5.28 \times 10^{-24} \text{kg}\cdot \text{m/s}}{ 9.11 \times 10^{-31} \text{kg}}=5.79 \times 10^{6}  \text{m/s}\text{.} $$
</div>
**Solution for (b)**

Although large, this velocity is not highly relativistic, and so the electron’s
kinetic energy is

<div class="equation" >
 $$\begin{array}{lll}{\text{KE}}_{e}& =& \frac{1}{2}mv^{2}\\ & =& \frac{1}{2}\left(9.11 \times 10^{-31} \text{kg}\right){ \left( 5.79 \times 10^{6}  \text{m/s}\right)}^{2}\\ & =& \left( 1.53 \times 10^{-17} \text{J} \right) \left(\frac{1 \text{eV}}{1.60 \times 10^{-19} \text{J}}\right)=95.5 \text{eV} \text{.} \end{array} $$
</div>
**Discussion**

Since atoms are roughly 0.1 nm in size, knowing the position of an electron to
0.0100 nm localizes it reasonably well inside the atom. This would be like being
able to see details one-tenth the size of the atom. But the consequent
uncertainty in velocity is large. You certainly could not follow it very well if
its velocity is so uncertain. To get a further idea of how large the uncertainty
in velocity is, we assumed the velocity of the electron was equal to its
uncertainty and found this gave a kinetic energy of 95.5 eV. This is
significantly greater than the typical energy difference between levels in
atoms (see [[Table 1]](../contents/ch29PhotonEnergiesAndTheElectomagneticSpectrum#Table1)), so that it is impossible to
get a meaningful energy for the electron if we know its position even moderately
well.

</div>

Why don’t we notice Heisenberg’s uncertainty principle in everyday life? The
answer is that Planck’s constant is very small. Thus the lower limit in the
uncertainty of measuring the position and momentum of large objects is
negligible. We can detect sunlight reflected from Jupiter and follow the planet
in its orbit around the Sun. The reflected sunlight alters the momentum of
Jupiter and creates an uncertainty in its momentum, but this is totally
negligible compared with Jupiter’s huge momentum. The correspondence principle
tells us that the predictions of quantum mechanics become indistinguishable from
classical physics for large objects, which is the case here.

### Heisenberg Uncertainty for Energy and Time

There is another form of **Heisenberg’s uncertainty principle** for *
simultaneous measurements of energy and time*. In equation form,

<div class="equation" >
 $$\Delta E\Delta t\ge \frac{h}{4\pi }, $$
</div>

where $$\Delta E $$ is the **uncertainty in energy** and $$\Delta t $$ is the **uncertainty in time**. This means that within a time interval $$\Delta t $$ , it
is not possible to measure energy precisely—there will be an uncertainty
$$\Delta E $$ in the measurement. In order to measure energy more precisely (to
make $$\Delta E $$ smaller), we must increase $$\Delta t $$ . This time interval
may be the amount of time we take to make the measurement, or it could be the
amount of time a particular state exists, as in the next [[Example 2]](#Example2)
.

<div id="Example2" class="example" markdown="1">
<div class="title">
Heisenberg Uncertainty Principle for Energy and Time for an Atom
</div>
An atom in an excited state temporarily stores energy. If the lifetime of this excited state is measured to be  $${1.0 \text{×10}}^{-10} s $$ ,
 what is the minimum uncertainty in the energy of the state in eV?

**Strategy**

The minimum uncertainty in energy $$\Delta E $$ is found by using the equals
sign in $$\Delta E\Delta t\ge h\text{/4}\pi $$ and corresponds to a reasonable
choice for the uncertainty in time. The largest the uncertainty in time can be
is the full lifetime of the excited state, or $$\Delta t={1.0 \text{×10}}^{-10}
s $$.

**Solution**

Solving the uncertainty principle for $$\Delta E $$ and substituting known
values gives

<div class="equation" >
 $$\Delta E=\frac{h}{4\pi \Delta t}=\frac{ 6.63 \times 10^{-34} \text{J}\cdot \text{s}}{4\pi \left(1.0 \times 10^{-10} \text{s}\right)}= 5.3  \times 10^{-25} \text{J} \text{.}  $$
</div>
Now converting to eV yields

<div class="equation" >
 $$\Delta E= \left( 5.3 \times 10^{-25} \text{J} \right) \left(\frac{1 \text{eV}}{ 1.6 \times 10^{-19} \text{J}}\right)= 3.3  \times 10^{-6} \text{eV}\text{.} $$
</div>
**Discussion**

The lifetime of $$ 10^{-10} \text{s} $$ is typical of excited states in atoms—on
human time scales, they quickly emit their stored energy. An uncertainty in
energy of only a few millionths of an eV results. This uncertainty is small
compared with typical excitation energies in atoms, which are on the order of 1
eV. So here the uncertainty principle limits the accuracy with which we can
measure the lifetime and energy of such states, but not very significantly.

</div>

The uncertainty principle for energy and time can be of great significance if
the lifetime of a system is very short. Then $$\Delta t $$ is very small, and
$$\Delta E $$ is consequently very large. Some nuclei and exotic particles have
extremely short lifetimes (as small as $$ 10^{-25} \text{s} $$ ), causing
uncertainties in energy as great as many GeV ( $$10^{9} \text{eV} $$ ). Stored
energy appears as increased rest mass, and so this means that there is
significant uncertainty in the rest mass of short-lived particles. When measured
repeatedly, a spread of masses or decay energies are obtained. The spread is
$$\Delta E $$ . You might ask whether this uncertainty in energy could be
avoided by not measuring the lifetime. The answer is no. Nature knows the
lifetime, and so its brevity affects the energy of the particle. This is so well
established experimentally that the uncertainty in decay energy is used to
calculate the lifetime of short-lived states. Some nuclei and particles are so
short-lived that it is difficult to measure their lifetime. But if their decay
energy can be measured, its spread is $$\Delta E $$ , and this is used in the
uncertainty principle ( $$\Delta E\Delta t\ge h\text{/4}\pi $$ )
to calculate the lifetime $$\Delta t $$.

There is another consequence of the uncertainty principle for energy and time.
If energy is uncertain by $$\Delta E $$ , then conservation of energy can be
violated by $$\Delta E $$ for a time $$\Delta t $$ . Neither the physicist nor
nature can tell that conservation of energy has been violated, if the violation
is temporary and smaller than the uncertainty in energy. While this sounds
innocuous enough, we shall see in later chapters that it allows the temporary
creation of matter from nothing and has implications for how nature transmits
forces over very small distances.

Finally, note that in the discussion of particles and waves, we have stated that
individual measurements produce precise or particle-like results. A definite
position is determined each time we observe an electron, for example. But
repeated measurements produce a spread in values consistent with wave
characteristics. The great theoretical physicist Richard Feynman (1918–1988)
commented, “What there are, are particles.” When you observe enough of them,
they distribute themselves as you would expect for a wave phenomenon. However,
what there are as they travel we cannot tell because, when we do try to measure,
we affect the traveling.

### Section Summary

* Matter is found to have the same interference characteristics** as any other
  wave.
* There is now a probability distribution for the location of a particle rather
  than a definite position.
* Another consequence of the wave character of all particles is the Heisenberg
  uncertainty principle, which limits the precision with which certain physical
  quantities can be known simultaneously. For position and momentum, the
  uncertainty principle is $$\Delta x\Delta p\ge \frac{h}{4\pi } $$ , where
  $$\Delta x $$ is the uncertainty in position and $$\Delta p $$ is the
  uncertainty in momentum.
* For energy and time, the uncertainty principle is $$\Delta E\Delta t\ge
  \frac{h}{4\pi } $$ where $$\Delta E $$ is the uncertainty in energy and
  $$\Delta t $$ is the uncertainty in time.
* These small limits are fundamentally important on the quantum-mechanical
  scale.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is the Heisenberg uncertainty principle? Does it place limits on what can be known?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
(a) If the position of an electron in a membrane is measured to an accuracy of  $$1.00 \text{μm} $$ ,
 what is the electron’s minimum uncertainty in velocity? (b) If the electron has this velocity, what is its kinetic energy in eV? (c) What are the implications of this energy, comparing it to typical molecular binding energies?

</div>
<div class="solution" markdown="1">
(a) 57.9 m/s

(b)  $$ 9.55 \times 10^{-9} \text{eV} $$
(c) From [[Table 1]](../contents/ch29PhotonEnergiesAndTheElectomagneticSpectrum#Table1), we see that typical
molecular binding energies range from about 1eV to 10 eV, therefore the result
in part (b) is approximately 9 orders of magnitude smaller than typical
molecular binding energies.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
(a) If the position of a chlorine ion in a membrane is measured to an accuracy of  $$1.00 \text{μm} $$ ,
 what is its minimum uncertainty in velocity, given its mass is  $$ 5.86 \times 10^{-26}  \text{kg} $$ ?
 (b) If the ion has this velocity, what is its kinetic energy in eV, and how does this compare with typical molecular binding energies?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
Suppose the velocity of an electron in an atom is known to an accuracy of  $$ 2.0 \times 10^{3}  \text{m/s} $$
 (reasonably accurate compared with orbital velocities). What is the electron’s minimum uncertainty in position, and how does this compare with the approximate 0.1-nm size of the atom?

</div>
<div class="solution" markdown="1">
29 nm,

290 times greater

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
The velocity of a proton in an accelerator is known to an accuracy of 0.250% of the speed of light. (This could be small compared with its velocity.) What is the smallest possible uncertainty in its position?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
A relatively long-lived excited state of an atom has a lifetime of 3.00 ms. What is the minimum uncertainty in its energy?

</div>
<div class="solution" markdown="1">
 $$ 1.10 \times 10^{-13}  \text{eV} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
(a) The lifetime of a highly unstable nucleus is  $$ 10^{-20} \text{s} $$ .
 What is the smallest uncertainty in its decay energy? (b) Compare this with the rest energy of an electron.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
The decay energy of a short-lived particle has an uncertainty of 1.0 MeV due to its short lifetime. What is the smallest lifetime it can have?

</div>
<div class="solution" markdown="1">
 $$ 3.3 \times 10^{-22}  \text{s} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
The decay energy of a short-lived nuclear excited state has an uncertainty of 2.0 eV due to its short lifetime. What is the smallest lifetime it can have?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
What is the approximate uncertainty in the mass of a muon, as determined from its decay lifetime?

</div>
<div class="solution" markdown="1">
 $$ 2.66 \times 10^{-46}  \text{kg} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" data-element-type="problems-exercises" markdown="1">
Derive the approximate form of Heisenberg’s uncertainty principle for energy and time,  $$\Delta E\Delta t\approx h $$ ,
 using the following arguments: Since the position of a particle is uncertain by  $$\Delta x\approx \lambda  $$ ,
 where  $$\lambda  $$
 is the wavelength of the photon used to examine it, there is an uncertainty in the time the photon takes to traverse  $$\Delta x $$ .
 Furthermore, the photon has an energy related to its wavelength, and it can transfer some or all of this energy to the object being examined. Thus the uncertainty in the energy of the object is also related to  $$\lambda  $$ .
 Find  $$\Delta t $$
 and  $$\Delta E $$ ;  then multiply them to give the approximate uncertainty principle.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{ class="glossary-title"}

Heisenberg’s uncertainty principle
: a fundamental limit to the precision with which pairs of quantities (momentum
and position, and energy and time) can be measured

uncertainty in energy
: lack of precision or lack of knowledge of precise results in measurements of
energy

uncertainty in time
: lack of precision or lack of knowledge of precise results in measurements of
time

uncertainty in momentum
: lack of precision or lack of knowledge of precise results in measurements of
momentum

uncertainty in position
: lack of precision or lack of knowledge of precise results in measurements of
position

probability distribution
: the overall spatial distribution of probabilities to find a particle at a
given location

</div>
