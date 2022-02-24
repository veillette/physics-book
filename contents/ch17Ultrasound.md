---
title: "Ultrasound"
layout: page
---

<div class="abstract" markdown="1">
* Define acoustic impedance and intensity reflection coefficient.
* Describe medical and other uses of ultrasound technology.
* Calculate acoustic impedance using density values and the speed of ultrasound.
* Calculate the velocity of a moving object using Doppler-shifted ultrasound.
</div>

![An ultrasound image of a 21 week old fetus.](../resources/Figure_18_07_01a.jpg "Ultrasound is used in medicine to painlessly and noninvasively monitor patient health and diagnose a wide range of disorders. (credit: abbybatchelder, Flickr)")
{: #Figure1}

Any sound with a frequency above 20 000 Hz (or 20 kHz)—that is, above the
highest audible frequency—is defined to be ultrasound. In practice, it is
possible to create ultrasound frequencies up to more than a gigahertz. (Higher
frequencies are difficult to create; furthermore, they propagate poorly because
they are very strongly absorbed.) Ultrasound has a tremendous number of
applications, which range from burglar alarms to use in cleaning delicate
objects to the guidance systems of bats. We begin our discussion of ultrasound
with some of its applications in medicine, in which it is used extensively both
for diagnosis and for therapy.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Characteristics of Ultrasound
</div>
The characteristics of ultrasound, such as frequency and intensity, are wave properties common to all types of waves. Ultrasound also has a wavelength that limits the fineness of detail it can detect. This characteristic is true of all waves. We can never observe details significantly smaller than the wavelength of our probe; for example, we will never see individual atoms with visible light, because the atoms are so small compared with the wavelength of light.

</div>

### Ultrasound in Medical Therapy

Ultrasound, like any wave, carries energy that can be absorbed by the medium
carrying it, producing effects that vary with intensity. When focused to
intensities of $$ 10^{3} $$ to $$ 10^{5} {\text{W/m}}^{2} $$ , ultrasound
can be used to shatter gallstones or pulverize cancerous tissue in surgical
procedures. (See [[Figure 2]](#Figure2).) Intensities this great can damage
individual cells, variously causing their protoplasm to stream inside them,
altering their permeability, or rupturing their walls through *cavitation*.
Cavitation is the creation of vapor cavities in a fluid—the longitudinal
vibrations in ultrasound alternatively compress and expand the medium, and at
sufficient amplitudes the expansion separates molecules. Most cavitation damage
is done when the cavities collapse, producing even greater shock pressures.

![A picture of a brain tumor being removed from the skull using a clinical probe.](../resources/Figure_18_07_02a.jpg "The tip of this small probe oscillates at 23 kHz with such a large amplitude that it pulverizes tissue on contact. The debris is then aspirated. The speed of the tip may exceed the speed of sound in tissue, thus creating shock waves and cavitation, rather than a smooth simple harmonic oscillator&#x2013;type wave.")
{: #Figure2}

Most of the energy carried by high-intensity ultrasound in tissue is converted
to thermal energy. In fact, intensities of $$10^{3} $$ to $$10^{4}
{\text{W/m}}^{2} $$ are commonly used for deep-heat treatments called ultrasound
diathermy. Frequencies of 0.8 to 1 MHz are typical. In both athletics and
physical therapy, ultrasound diathermy is most often applied to injured or
overworked muscles to relieve pain and improve flexibility. Skill is needed by
the therapist to avoid “bone burns” and other tissue damage caused by
overheating and cavitation, sometimes made worse by reflection and focusing of
the ultrasound by joint and bone tissue.

In some instances, you may encounter a different decibel scale, called the
sound *pressure* level, when ultrasound travels in water or in human and other
biological tissues. We shall not use the scale here, but it is notable that
numbers for sound pressure levels range 60 to 70 dB higher than you would quote
for $$\beta $$ , the sound intensity level used in this text. Should you
encounter a sound pressure level of 220 decibels, then, it is not an
astronomically high intensity, but equivalent to about 155 dB—high enough to
destroy tissue, but not as unreasonably high as it might seem at first.

### Ultrasound in Medical Diagnostics

When used for imaging, ultrasonic waves are emitted from a transducer, a crystal
exhibiting the piezoelectric effect (the expansion and contraction of a
substance when a voltage is applied across it, causing a vibration of the
crystal). These high-frequency vibrations are transmitted into any tissue in
contact with the transducer. Similarly, if a pressure is applied to the
crystal (in the form of a wave reflected off tissue layers), a voltage is
produced which can be recorded. The crystal therefore acts as both a transmitter
and a receiver of sound. Ultrasound is also partially absorbed by tissue on its
path, both on its journey away from the transducer and on its return journey.
From the time between when the original signal is sent and when the reflections
from various boundaries between media are received, (as well as a measure of the
intensity loss of the signal), the nature and position of each boundary between
tissues and organs may be deduced.

Reflections at boundaries between two different media occur because of
differences in a characteristic known as
the <strong class="term" >acoustic impedance </strong>
$$Z $$ of each substance. Impedance is defined as

<div class="equation" >
 $$Z= \rho v , $$
</div>

where $$\rho $$ is the density of the medium (in $$\text{kg/m}^{3} $$ )
and $$v $$ is the speed of sound through the medium (in m/s). The units for $$Z
$$ are therefore $$\text{kg/m}^{2}·\text{s} $$.

[[Table 1]](#Table1) shows the density and speed of sound through various
media (including various soft tissues) and the associated acoustic impedances.
Note that the acoustic impedances for soft tissue do not vary much but that
there is a big difference between the acoustic impedance of soft tissue and air
and also between soft tissue and bone.

<table id="Table1" aria-describedby="A table containing four columns is shown, giving the ultrasound properties of various media related to the human body. The first column gives the name of each medium, the second column gives the value of density of the medium, the third column gives the speed of ultrasound in that medium, and the fourth column gives the acoustic impedance of the medium."><caption><span class="title">The Ultrasound Properties of Various Media, Including Soft Tissue Found in the Body</span></caption><thead><tr>
            <th>Medium</th>
            <th>Density (kg/m<sup>3</sup>)</th>
            <th>Speed of Ultrasound (m/s)</th>
            <th>
              Acoustic Impedance  $$\left(\text{kg/}\left({\text{m}}^{2}\cdot \text{s}\right)\right) $$
            </th>
          </tr></thead><tbody><tr>
            <td>Air</td>
            <td>1.3</td>
            <td>330</td>
            <td> $$429 $$</td>
          </tr><tr>
            <td>Water</td>
            <td>1000</td>
            <td>1500</td>
            <td> $$1.5 \times 10^{6}  $$</td>
          </tr><tr>
            <td>Blood</td>
            <td>1060</td>
            <td>1570</td>
            <td> $$1.66 \times 10^{6}  $$</td>
          </tr><tr>
            <td>Fat</td>
            <td>925</td>
            <td>1450</td>
            <td> $$1.34 \times 10^{6}  $$</td>
          </tr><tr>
            <td>Muscle (average)</td>
            <td>1075</td>
            <td>1590</td>
            <td> $$1.70 \times 10^{6}  $$</td>
          </tr><tr>
            <td>Bone (varies)</td>
            <td>1400–1900</td>
            <td>4080</td>
            <td> $$5.7 \times 10^{6}  $$ to  $$7.8 \times 10^{6}  $$</td>
          </tr><tr>
            <td>Barium titanate (transducer material)</td>
            <td>5600</td>
            <td>5500</td>
            <td> $$30.8 \times 10^{6}  $$</td>
          </tr></tbody></table>

At the boundary between media of different acoustic impedances, some of the wave
energy is reflected and some is transmitted. The greater the **difference** in
acoustic impedance between the two media, the greater the reflection and the
smaller the transmission.

The **intensity reflection coefficient** $$a $$ is defined as
the ratio of the intensity of the reflected wave relative to the incident (
transmitted) wave. This statement can be written mathematically as

<div class="equation" >
 $$a=\frac{ {\left({Z}_{2}-{Z}_{1}\right)}^{2}}{ {\left({Z}_{1}+{Z}_{2}\right)}^{2}}, $$
</div>

where $${Z}_{1} $$ and $${Z}_{2} $$ are the acoustic impedances of the two media
making up the boundary. A reflection coefficient of zero (corresponding to total
transmission and no reflection) occurs when the acoustic impedances of the two
media are the same. An impedance “match” (no reflection) provides an efficient
coupling of sound energy from one medium to another. The image formed in an
ultrasound is made by tracking reflections (as shown in [[Figure 3]](#Figure3))
and mapping the intensity of the reflected sound waves in a two-dimensional
plane.

<div class="example" markdown="1">
<div class="title">
Calculate Acoustic Impedance and Intensity Reflection Coefficient: Ultrasound and Fat Tissue
</div>
(a) Using the values for density and the speed of ultrasound given in [[Table 1]](#Table1), show that the acoustic impedance of fat tissue is indeed  $$1.34 \times 10^{6}  \text{kg/m}^{2}·\text{s} $$.

(b) Calculate the intensity reflection coefficient of ultrasound when going from
fat to muscle tissue.

**Strategy for (a)**

The acoustic impedance can be calculated using $$Z=\text{ρv} $$ and the values
for $$\rho $$ and $$v $$ found in [[Table 1]](#Table1).

**Solution for (a)**

(1) Substitute known values from [[Table 1]](#Table1) into $$Z= \rho v $$.

<div class="equation" >
 $$Z=\rho v=\left(925 \text{kg}{\text{/m}}^{3}\right)\left(1450 \text{m/s}\right) $$
</div>
(2) Calculate to find the acoustic impedance of fat tissue.

<div class="equation" >
 $$1.34 \times 10^{6}  \text{kg/m}^{2}·\text{s}  $$
</div>
This value is the same as the value given for the acoustic impedance of fat tissue.

**Strategy for (b)**

The intensity reflection coefficient for any boundary between two media is given
by $$a=\frac{ {\left({Z}_{2}-{Z}_{1}\right)}^{2}}{ {\left({Z}_{1} + {Z}_
{2}\right)}^{2}} $$ , and the acoustic impedance of muscle is given
in [[Table 1]](#Table1).

**Solution for (b)**

Substitute known values into $$a=\frac{ {\left({Z}_{2}-{Z}_{1}\right)}^{2}}{
{\left({Z}_{1} + {Z}_{2}\right)}^{2}} $$ to find the intensity reflection
coefficient:

<div class="equation" >
 $$a=\frac{ {\left({Z}_{2}-{Z}_{1}\right)}^{2}}{ {\left({Z}_{1}+{Z}_{2}\right)}^{2}}=\frac{ { \left( 1.34 \times 10^{6}  {\text{kg/m}}^{2}· \text{s} -1.70 \times 10^{6}  {\text{kg/m}}^{2}· \text{s} \right)}^{2}}{ {\left( 1.70 \times 10^{6}  {\text{kg/m}}^{2}· \text{s} + 1.34 \times 10^{6}  {\text{kg/m}}^{2}· \text{s} \right)}^{2}}= 0.014 $$
</div>
**Discussion**

This result means that only 1.4% of the incident intensity is reflected, with
the remaining being transmitted.

</div>

The applications of ultrasound in medical diagnostics have produced untold
benefits with no known risks. Diagnostic intensities are too low (about
$$10^{-2} {\text{W/m}}^{2} $$ )
to cause thermal damage. More significantly, ultrasound has been in use for
several decades and detailed follow-up studies do not show evidence of ill
effects, quite unlike the case for X-rays.

![The first part of the diagram shows a rectangular shaped transducer with speaker and microphone sending spherical waves to produce echos from a fetus. The second part shows a graph of echo intensity versus time, with four sharp peaks.](../resources/Figure_18_07_03a.jpg "(a) An ultrasound speaker doubles as a microphone. Brief bleeps are broadcast, and echoes are recorded from various depths. (b) Graph of echo intensity versus time. The time for echoes to return is directly proportional to the distance of the reflector, yielding this information noninvasively.")
{: #Figure3}

The most common ultrasound applications produce an image like that shown
in [[Figure 4]](#Figure4). The speaker-microphone broadcasts a directional beam,
sweeping the beam across the area of interest. This is accomplished by having
multiple ultrasound sources in the probe’s head, which are phased to interfere
constructively in a given, adjustable direction. Echoes are measured as a
function of position as well as depth. A computer constructs an image that
reveals the shape and density of internal structures.

![The first part of the diagram shows an ultrasound device scanning a woman&#x2019;s abdomen. The second part of the diagram is an ultrasound scan report of the abdomen.](../resources/Figure_18_07_04a.jpg "(a) An ultrasonic image is produced by sweeping the ultrasonic beam across the area of interest, in this case the woman&#x2019;s abdomen. Data are recorded and analyzed in a computer, providing a two-dimensional image. (b) Ultrasound image of 12-week-old fetus. (credit: Margaret W. Carruthers, Flickr)")
{: #Figure4}

How much detail can ultrasound reveal? The image in [[Figure 4]](#Figure4) is
typical of low-cost systems, but that in [[Figure 5]](#Figure5) shows the
remarkable detail possible with more advanced systems, including 3D imaging.
Ultrasound today is commonly used in prenatal care. Such imaging can be used to
see if the fetus is developing at a normal rate, and help in the determination
of serious problems early in the pregnancy. Ultrasound is also in wide use to
image the chambers of the heart and the flow of blood within the beating heart,
using the Doppler effect (echocardiology).

Whenever a wave is used as a probe, it is very difficult to detect details
smaller than its wavelength $$\lambda $$ . Indeed, current technology cannot do
quite this well. Abdominal scans may use a 7-MHz frequency, and the speed of
sound in tissue is about 1540 m/s—so the wavelength limit to detail would be
$$\lambda =\frac{ {v}_{w}}{f}=\frac{1540 \text{m/s}}{7 \times 10^{6}
\text{Hz}}=0.22 \text{mm} $$ . In practice, 1-mm detail is attainable, which is
sufficient for many purposes. Higher-frequency ultrasound would allow greater
detail, but it does not penetrate as well as lower frequencies do. The accepted
rule of thumb is that you can effectively scan to a depth of about $$500\lambda
$$ into tissue. For 7 MHz, this penetration limit is $$500×0.22 \text{mm} $$ ,
which is 0.11 m. Higher frequencies may be employed in smaller organs, such as
the eye, but are not practical for looking deep into the body.

![This is an image of a 3D ultrasound scan of the fetus showing an unborn baby sucking its thumb.](../resources/Figure_18_07_05a.jpg "A 3D ultrasound image of a fetus. As well as for the detection of any abnormalities, such scans have also been shown to be useful for strengthening the emotional bonding between parents and their unborn child. (credit: Jennie Cu, Wikimedia Commons)")
{: #Figure5}

In addition to shape information, ultrasonic scans can produce density
information superior to that found in X-rays, because the intensity of a
reflected sound is related to changes in density. Sound is most strongly
reflected at places where density changes are greatest.

Another major use of ultrasound in medical diagnostics is to detect motion and
determine velocity through the Doppler shift of an echo, known as 
**Doppler-shifted ultrasound**. This technique is used to monitor fetal heartbeat,
measure blood velocity, and detect occlusions in blood vessels, for example. (
See [[Figure 6]](#Figure6).) The magnitude of the Doppler shift in an echo is
directly proportional to the velocity of whatever reflects the sound. Because an
echo is involved, there is actually a double shift. The first occurs because the
reflector (say a fetal heart) is a moving observer and receives a
Doppler-shifted frequency. The reflector then acts as a moving source, producing
a second Doppler shift.

![Doppler-shifted ultrasonic image of a partially occluded artery.](../resources/Figure_18_07_06a.jpg "This Doppler-shifted ultrasonic image of a partially occluded artery uses color to indicate velocity. The highest velocities are in red, while the lowest are blue. The blood must move faster through the constriction to carry the same flow. (credit: Arning C, Grzyska U, Wikimedia Commons)")
{: #Figure6}

A clever technique is used to measure the Doppler shift in an echo. The
frequency of the echoed sound is superimposed on the broadcast frequency,
producing beats. The beat frequency is $${F}_{B}=\mid {f}_{1}-{f}_{2}\mid $$ ,
and so it is directly proportional to the Doppler shift ( $${f}_{1}-{f}_{2} $$ )
and hence, the reflector’s velocity. The advantage in this technique is that the
Doppler shift is small (because the reflector’s velocity is small), so that
great accuracy would be needed to measure the shift directly. But measuring the
beat frequency is easy, and it is not affected if the broadcast frequency varies
somewhat. Furthermore, the beat frequency is in the audible range and can be
amplified for audio feedback to the medical observer.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Uses for Doppler-Shifted Radar
</div>
Doppler-shifted radar echoes are used to measure wind velocities in storms as well as aircraft and automobile speeds. The principle is the same as for Doppler-shifted ultrasound. There is evidence that bats and dolphins may also sense the velocity of an object (such as prey) reflecting their ultrasound signals by observing its Doppler shift.

</div>

<div class="example" markdown="1">
<div class="title">
Calculate Velocity of Blood: Doppler-Shifted Ultrasound
</div>
Ultrasound that has a frequency of 2.50 MHz is sent toward blood in an artery that is moving toward the source at 20.0 cm/s, as illustrated in [[Figure 7](#Figure7). Use the speed of sound in human tissue as 1540 m/s. (Assume that the frequency of 2.50 MHz is accurate to seven significant figures.)

1. What frequency does the blood receive?
2. What frequency returns to the source?
3. What beat frequency is produced if the source and returning frequencies are
   mixed? {: type="a"}

![The picture represents an ultrasound device scanning the arteries and veins of a human hand.](../resources/Figure_18_07_07a.jpg "Ultrasound is partly reflected by blood cells and plasma back toward the speaker-microphone. Because the cells are moving, two Doppler shifts are produced&#x2014;one for blood as a moving observer, and the other for the reflected sound coming from a moving source. The magnitude of the shift is directly proportional to blood velocity.")
{: #Figure7}

**Strategy**

The first two questions can be answered using $${f}_{\text{obs}}={f}_{s}\left(
\frac{ {v}_{w}}{ {v}_{w} ± {v}_{s}}\right) $$ and $${f}_{\text{obs}}={f}_
{s}\left(\frac{ {v}_{w} ± {v}_{\text{obs}}}{ {v}_{w}}\right) $$ for the Doppler
shift. The last question asks for beat frequency, which is the difference
between the original and returning frequencies.

**Solution for (a)**

(1) Identify knowns:

* The blood is a moving observer, and so the frequency it receives is given by
  <div class="equation" >
   $${f}_{\text{obs}}={f}_{s}\left(\frac{ {v}_{w}±{v}_{\text{obs}}}{ {v}_{w}}\right). $$
  </div>

* $${v}_{b} $$ is the blood velocity (
  $${v}_{\text{obs}} $$ here) and the plus sign is chosen because the motion is
  toward the source.

(2) Enter the given values into the equation.

<div class="equation" >
 $${f}_{\text{obs}}=\left(2 500 000 \text{Hz}\right)\left(\frac{1540 \text{m/s}+0.2 \text{m/s}}{1540 \text{m/s}}\right) $$
</div>
(3) Calculate to find the frequency: 2 500 325 Hz.

**Solution for (b)**

(1) Identify knowns:

* The blood acts as a moving source.
* The microphone acts as a stationary observer.
* The frequency leaving the blood is 2 500 325 Hz, but it is shifted upward as
  given by
  <div class="equation" >
   $${f}_{\text{obs}}={f}_{s}\left(\frac{ {v}_{w}}{ {v}_{w} - {v}_{b}}\right). $$
  </div>

  $${f}_{obs} $$ is the frequency received by the speaker-microphone.

* The source velocity is $${v}_{b} $$ .

* The minus sign is used because the motion is toward the observer.

The minus sign is used because the motion is toward the observer.

(2) Enter the given values into the equation:

<div class="equation" >
 $${f}_{\text{obs}}=\left(2 500 325 \text{Hz}\right)\left(\frac{1540 \text{m/s}}{1540 \text{m/s}-0.200 \text{m/s}}\right) $$
</div>
(3) Calculate to find the frequency returning to the source: 2 500 649 Hz.

**Solution for (c)**

(1) Identify knowns:

* The beat frequency is simply the absolute value of the difference between
  $${f}_{s} $$ and $${f}_{\text{obs}} $$ , as stated in:
  <div class="equation" >
   $${f}_{B}=\mid {f}_{\text{obs}}-{f}_{s}\mid . $$
  </div>

(2) Substitute known values:

<div class="equation" >
 $$\mid 2 500 649  \text{Hz}-2 500 000 \text{Hz}\mid  $$
</div>
(3) Calculate to find the beat frequency: 649 Hz.

**Discussion**

The Doppler shifts are quite small compared with the original frequency of 2.50
MHz. It is far easier to measure the beat frequency than it is to measure the
echo frequency with an accuracy great enough to see shifts of a few hundred
hertz out of a couple of megahertz. Furthermore, variations in the source
frequency do not greatly affect the beat frequency, because both $${f}_{s} $$
and $${f}_{\text{obs}} $$ would increase or decrease. Those changes subtract out
in $${f}_{B}=\mid {f}_{\text{obs}}-{f}_{s}\mid . $$
</div>

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Industrial and Other Applications of Ultrasound
</div>
Industrial, retail, and research applications of ultrasound are common. A few are discussed here. Ultrasonic cleaners have many uses. Jewelry, machined parts, and other objects that have odd shapes and crevices are immersed in a cleaning fluid that is agitated with ultrasound typically about 40 kHz in frequency. The intensity is great enough to cause cavitation, which is responsible for most of the cleansing action. Because cavitation-produced shock pressures are large and well transmitted in a fluid, they reach into small crevices where even a low-surface-tension cleaning fluid might not penetrate.

Sonar is a familiar application of ultrasound. Sonar typically employs
ultrasonic frequencies in the range from 30.0 to 100 kHz. Bats, dolphins,
submarines, and even some birds use ultrasonic sonar. Echoes are analyzed to
give distance and size information both for guidance and finding prey. In most
sonar applications, the sound reflects quite well because the objects of
interest have significantly different density than the medium in which they
travel. When the Doppler shift is observed, velocity information can also be
obtained. Submarine sonar can be used to obtain such information, and there is
evidence that some bats also sense velocity from their echoes.

Similarly, there are a range of relatively inexpensive devices that measure
distance by timing ultrasonic echoes. Many cameras, for example, use such
information to focus automatically. Some doors open when their ultrasonic
ranging devices detect a nearby object, and certain home security lights turn on
when their ultrasonic rangers observe motion. Ultrasonic “measuring tapes” also
exist to measure such things as room dimensions. Sinks in public restrooms are
sometimes automated with ultrasound devices to turn faucets on and off when
people wash their hands. These devices reduce the spread of germs and can
conserve water.

Ultrasound is used for nondestructive testing in industry and by the military.
Because ultrasound reflects well from any large change in density, it can reveal
cracks and voids in solids, such as aircraft wings, that are too small to be
seen with X-rays. For similar reasons, ultrasound is also good for measuring the
thickness of coatings, particularly where there are several layers involved.

Basic research in solid state physics employs ultrasound. Its attenuation is
related to a number of physical characteristics, making it a useful probe. Among
these characteristics are structural changes such as those found in liquid
crystals, the transition of a material to a superconducting phase, as well as
density and other properties.

These examples of the uses of ultrasound are meant to whet the appetites of the
curious, as well as to illustrate the underlying physics of ultrasound. There
are many more applications, as you can easily discover for yourself.

</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Why is it possible to use ultrasound both to observe a fetus in the womb and also to destroy cancerous tumors in the body?

</div>
<div class="solution"  data-print-placement="here" markdown="1">
Ultrasound can be used medically at different intensities. Lower intensities do not cause damage and are used for medical imaging. Higher intensities can pulverize and destroy targeted substances in the body, such as tumors.

</div>
</div>

### Section Summary

* The acoustic impedance is defined as:
  <div class="equation" >
   $$Z=\rho v, $$
  </div>

  $$\rho $$ is the density of a medium through which the sound travels and $$v
  $$ is the speed of sound through that medium.
* The intensity reflection coefficient $$a $$ , a measure of the ratio of the
  intensity of the wave reflected off a boundary between two media relative to
  the intensity of the incident wave, is given by
  <div class="equation" >
   $$a=\frac{ {\left({Z}_{2}-{Z}_{1}\right)}^{2}}{ {\left({Z}_{1}+{Z}_{2}\right)}^{2}}. $$
  </div>

* The intensity reflection coefficient is a unitless quantity.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If audible sound follows a rule of thumb similar to that for ultrasound, in terms of its absorption, would you expect the high or low frequencies from your neighbor’s stereo to penetrate into your house? How does this expectation compare with your experience?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Elephants and whales are known to use infrasound to communicate over very large distances. What are the advantages of infrasound for long distance communication?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
It is more difficult to obtain a high-resolution ultrasound image in the abdominal region of someone who is overweight than for someone who has a slight build. Explain why this statement is accurate.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose you read that 210-dB ultrasound is being used to pulverize cancerous tumors. You calculate the intensity in watts per centimeter squared and find it is unreasonably high ( $$10^{5} {\text{W/cm}}^{2} $$ ).
What is a possible explanation?

</div>
</div>

### Problems &amp; Exercises

**Unless otherwise indicated, for problems in this section, assume that the
speed of sound through human tissues is 1540 m/s.**

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the sound intensity level in decibels of ultrasound of intensity  $$10^{5} {\text{W/m}}^{2} $$ ,
 used to pulverize tissue during surgery?

</div>
<div class="solution" markdown="1">
170 dB

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Is 155-dB ultrasound in the range of intensities used for deep heating? Calculate the intensity of this ultrasound and compare this intensity with values quoted in the text.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the sound intensity level in decibels of  $$2.00 \times 10^{-2} {\text{W/m}}^{2}  $$
ultrasound used in medical diagnostics.

</div>
<div class="solution" markdown="1">
103 dB

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The time delay between transmission and the arrival of the reflected wave of a signal using ultrasound traveling through a piece of fat tissue was 0.13 ms. At what depth did this reflection occur?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In the clinical use of ultrasound, transducers are always coupled to the skin by a thin layer of gel or oil, replacing the air that would otherwise exist between the transducer and the skin. (a) Using the values of acoustic impedance given in [[Table 1]](#Table1) calculate the intensity reflection coefficient between transducer material and air. (b) Calculate the intensity reflection coefficient between transducer material and gel (assuming for this problem that its acoustic impedance is identical to that of water). (c) Based on the results of your calculations, explain why the gel is used.

</div>
<div class="solution"  markdown="1">
(a) 1.00

(b) 0.823

(c) Gel is used to facilitate the transmission of the ultrasound between the
transducer and the patient’s body.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the minimum frequency of ultrasound that will allow you to see details as small as 0.250 mm in human tissue. (b) What is the effective depth to which this sound is effective as a diagnostic probe?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Find the size of the smallest detail observable in human tissue with 20.0-MHz ultrasound. (b) Is its effective penetration depth great enough to examine the entire eye (about 3.00 cm is needed)? (c) What is the wavelength of such ultrasound in  $$0ºC $$
 air?

</div>
<div class="solution" markdown="1">
(a)  $$77.0 \mu m $$
(b) Effective penetration depth = 3.85 cm, which is enough to examine the eye.

(c)  $$16.6 \mu m $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Echo times are measured by diagnostic ultrasound scanners to determine distances to reflecting surfaces in a patient. What is the difference in echo times for tissues that are 3.50 and 3.60 cm beneath the surface? (This difference is the minimum resolving time for the scanner to see details as small as 0.100 cm, or 1.00 mm. Discrimination of smaller time differences is needed to see smaller details.) (b) Discuss whether the period  $$T $$
 of this ultrasound must be smaller than the minimum time resolution. If so, what is the minimum frequency of the ultrasound and is that out of the normal range for diagnostic ultrasound?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) How far apart are two layers of tissue that produce echoes having round-trip times (used to measure distances) that differ by  $$0.750 \mu s $$ ? 
(b) What minimum frequency must the ultrasound have to see detail this small?

</div>
<div class="solution" markdown="1">
(a)  $$5.78 \times 10^{-4}  \text{m} $$
(b)  $$2.67 \times 10^{6}  \text{Hz} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A bat uses ultrasound to find its way among trees. If this bat can detect echoes 1.00 ms apart, what minimum distance between objects can it detect? (b) Could this distance explain the difficulty that bats have finding an open door when they accidentally get into a house?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A dolphin is able to tell in the dark that the ultrasound echoes received from two sharks come from two different objects only if the sharks are separated by 3.50 m, one being that much farther away than the other. (a) If the ultrasound has a frequency of 100 kHz, show this ability is not limited by its wavelength. (b) If this ability is due to the dolphin’s ability to detect the arrival times of echoes, what is the minimum time difference the dolphin can perceive?

</div>
<div class="solution" markdown="1">
(a)  $${v}_{w}=1540 m/s=f\lambda ⇒\lambda =\frac{1540 m/s}{100 \times 10^{3}  \text{Hz}}=0.0154 m < 3.50 m. $$
 Because the wavelength is much shorter than the distance in question, the wavelength is not the limiting factor.

(b) 4.55 ms

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A diagnostic ultrasound echo is reflected from moving blood and returns with a frequency 500 Hz higher than its original 2.00 MHz. What is the velocity of the blood? (Assume that the frequency of 2.00 MHz is accurate to seven significant figures and 500 Hz is accurate to three significant figures.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Ultrasound reflected from an oncoming bloodstream that is moving at 30.0 cm/s is mixed with the original frequency of 2.50 MHz to produce beats. What is the beat frequency? (Assume that the frequency of 2.50 MHz is accurate to seven significant figures.)

</div>
<div class="solution" markdown="1">
974 Hz

(Note: extra digits were retained in order to show the difference.)

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

acoustic impedance
: property of medium that makes the propagation of sound waves more difficult

intensity reflection coefficient
: a measure of the ratio of the intensity of the wave reflected off a boundary
between two media relative to the intensity of the incident wave

Doppler-shifted ultrasound
: a medical technique to detect motion and determine velocity through the
Doppler shift of an echo

</div>
