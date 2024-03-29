---
title: Electric Generators
layout: page
sectionNumber: 5
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Calculate the emf induced in a generator.
* Calculate the peak emf which can be induced in a particular generator system.
</div>

**Electric generators** induce an emf by rotating a coil in a magnetic field, as
briefly discussed
in [Induced Emf and Magnetic Flux](../contents/ch23InducedEmfAndMagneticFlux). We will now
explore generators in more detail. Consider the following example.

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating the Emf Induced in a Generator Coil
</div>
The generator coil shown in [[Figure 1]](#Figure1) is rotated through one-fourth of a revolution (from  $$\theta =0º $$
 to  $$\theta =90 ^\circ $$ )   in 15.0 ms. The 200-turn circular coil has a 5.00 cm radius and is in a uniform 1.25 T magnetic field. What is the average emf induced?

![The figure shows a schematic diagram of an electric generator. It consists of a rotating rectangular coil placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the coil. The magnetic field B is shown pointing from the North to the South Pole. The two ends of this coil are connected to the two small rings. The two conducting carbon brushes are kept pressed separately on both the rings. The coil is attached to an axle with a handle at the other end. Outer ends of the two brushes are connected to the galvanometer. The axle is mechanically rotated from outside by an angle of ninety degree that is a one fourth revolution, to rotate the coil inside the magnetic field. A current is shown to flow in the coil in clockwise direction and the galvanometer shows a deflection to left.](../resources/Figure_23_05_01.jpg "When this generator coil is rotated through one-fourth of a revolution, the magnetic flux \( \Phi \) changes from its maximum to zero, inducing an emf.")
{: #Figure1}

**Strategy**

We use Faraday’s law of induction to find the average emf induced over a time
$$\Delta t $$ \:

<div class="equation" >
 $$\text{emf}=-N\frac{\Delta \Phi }{\Delta t}\text{.} $$
</div>
We know that  $$N=200 $$
 and  $$\Delta t= 15.0 \text{ms} $$ ,
 and so we must determine the change in flux  $$\Delta \Phi  $$
 to find emf.

**Solution**

Since the area of the loop and the magnetic field strength are constant, we see
that

<div class="equation" >
 $$\Delta \Phi =\Delta \left(BA \cos \theta \right)=AB\Delta \left(\cos \theta \right)\text{.} $$
</div>
Now,  $$\Delta \left(\cos \theta \right)= -1.0 $$ ,
 since it was given that  $$\theta  $$
 goes from  $$0 ^\circ $$
 to  $$90 ^\circ $$ . Thus  $$\Delta \Phi =-AB $$, and 
<div class="equation" >
 $$\text{emf}=N\frac{AB}{\Delta t}. $$
</div>
The area of the loop is  $$A=\pi r^2=\left( 3.14\text{...}\right) {\left( 0.0500 \text{m}\right)}^{2}= 7.85 \times 10^{-3}  {\text{m}}^{2} $$ .
 Entering this value gives

<div class="equation" >
 $$\text{emf}=200\frac{\left( 7.85 \times 10^{-3}  {\text{m}}^{2}\right)\left( 1.25 \text{T}\right)}{ 15.0 \times 10^{-3}  \text{s}}=131 \text{V} \text{.}  $$
</div>
**Discussion**

This is a practical average value, similar to the 120 V used in household power.

</div>

The emf calculated in [Example 1](#Example1) is the average over
one-fourth of a revolution. What is the emf at any given instant? It varies with
the angle between the magnetic field and a perpendicular to the coil. We can get
an expression for emf **as a function of time by considering the motional emf on
a rotating rectangular coil of width $$w $$ and height $$\ell $$ in a uniform
magnetic field, as illustrated in [[Figure 2]](#Figure2).

![The figure shows a schematic diagram of an electric generator with a single rectangular coil. The rotating rectangular coil is placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the coil. The magnetic field B is shown pointing from the North to the South Pole. The North Pole is on the left and the South Pole is to the right and hence the direction of field is from left to right. The angular velocity of the coil is given as omega. The velocity vector v of the coil makes an angle theta with the direction of field.](../resources/Figure_23_05_02.jpg "A generator with a single rectangular coil rotated at constant angular velocity in a uniform magnetic field produces an emf that varies sinusoidally in time. Note the generator is similar to a motor, except the shaft is rotated to produce a current rather than the other way around.")
{: #Figure2}

Charges in the wires of the loop experience the magnetic force, because they are
moving in a magnetic field. Charges in the vertical wires experience forces
parallel to the wire, causing currents. But those in the top and bottom segments
feel a force perpendicular to the wire, which does not cause a current. We can
thus find the induced emf by considering only the side wires. Motional emf is given to be $$\text{emf}=B\ell v $$ , where the velocity *v* is perpendicular to the magnetic field $$B $$ . Here the velocity is at an angle $$\theta $$ with $$B $$ , so that its component perpendicular to $$B $$ is $$v \sin \theta $$
(see [[Figure 2]](#Figure2)). Thus in this case the emf induced on each side is $$\text{emf}=B\ell v \sin \theta $$ , and they are in the same direction.
The total emf around the loop is then

<div class="equation" >
 $$\text{emf}=2B\ell v \sin \theta \text{.} $$
</div>

This expression is valid, but it does not give emf as a function of time. To
find the time dependence of emf, we assume the coil rotates at a constant
angular velocity $$\omega $$ . The angle $$\theta $$ is related to angular
velocity by $$\theta =\omega t $$ , so that

<div class="equation" >
 $$\text{emf}=2B\ell v \sin \omega t\text{.} $$
</div>

Now, linear velocity $$v $$ is related to angular velocity $$\omega $$ by
$$v=r\omega $$ . Here $$r=w/2 $$ , so that $$v=\left(w/2\right)\omega $$ , and

<div class="equation" >
 $$\text{emf}=2B\ell \frac{w}{2}\omega  \sin \omega t=\left(\ell w\right)B\omega  \sin \omega t\text{.} $$
</div>

Noting that the area of the loop is $$A=\ell w $$ , and allowing for $$N $$
loops, we find that

<div class="equation" >
 $$\text{emf}=NAB\omega  \sin \omega t $$
</div>

is the **emf induced in a generator coil** of $$N $$ turns and area $$A $$
rotating at a constant angular velocity $$\omega $$ in a uniform magnetic field
$$B $$ . This can also be expressed as

<div class="equation" >
 $$\text{emf}={\text{emf}}_{0} \sin \omega t\text{,} $$
</div>

where

<div class="equation" >
 $${\text{emf}}_{0}=NAB\omega  $$
</div>

is the maximum **(peak) emf**. Note that the frequency of the oscillation is
$$f=\omega /2\pi $$ , and the period is $$T=1/f=2\pi /\omega $$
*.* [[Figure 3]](#Figure3) shows a graph of emf as a function of time, and it
now seems reasonable that AC voltage is sinusoidal.

![The first part of the figure shows a schematic diagram of a single coil electric generator. It consists of a rotating rectangular loop placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the loop. The magnetic field B is shown pointing from the North to the South Pole. The two ends of this loop are connected to the two small rings. The two conducting carbon brushes are kept pressed separately on both the rings. The loop is rotated in the field with an angular velocity omega. Outer ends of the two brushes are connected to an electric bulb which is shown to glow brightly. The second part of the figure shows the graph for e m f generated E as a function of time t. The e m f is along the Y axis and the time t is along the X axis. The graph is a progressive sine wave with a time period T. The crest maxima are at E zero and trough minima are at negative E zero.](../resources/Figure_23_05_03.jpg "The emf of a generator is sent to a light bulb with the system of rings and brushes shown. The graph gives the emf of the generator as a function of time. \( emf_0 \) is the peak emf. The period is \( T=1/f=2 \pi/\omega \) , where \( f \) is the frequency. Note that the script E stands for emf.")
{: #Figure3}

The fact that the peak emf, $${\text{emf}}_{0}=NAB\omega $$ , makes good sense.
The greater the number of coils, the larger their area, and the stronger the
field, the greater the output voltage. It is interesting that the faster the
generator is spun (greater $$\omega $$ ), the greater the emf. This is
noticeable on bicycle generators—at least the cheaper varieties. One of the
authors as a juvenile found it amusing to ride his bicycle fast enough to burn
out his lights, until he had to ride home lightless one dark night.

[[Figure 4]](#Figure4) shows a scheme by which a generator can be made to
produce pulsed DC. More elaborate arrangements of multiple coils and split rings
can produce smoother DC, although electronic rather than mechanical means are
usually used to make ripple-free DC.

![The first part of the figure shows a schematic diagram of a single coil D C electric generator. It consists of a rotating rectangular loop placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the loop. The magnetic field B is shown pointing from the North to the South Pole. The two ends of this loop are connected to the two sides of a split ring. The two conducting carbon brushes are kept pressed separately on both sides of the split rings. The loop is rotated in the field with an angular velocity w. Outer ends of the two brushes are connected to an electric bulb which is shown to glow brightly. The second part of the figure shows the graph for e m f generated as a function of time. The e m f is along the Y axis and the time t is along the X axis. The graph is a progressive and rectified sine wave with a time period T. The sine wave has only positive pulses. The crest maxima are at E zero.](../resources/Figure_23_05_04.jpg "Split rings, called commutators, produce a pulsed DC emf output in this configuration.")
{: #Figure4}

<div class="example" markdown="1">
<div class="title">
Calculating the Maximum Emf of a Generator
</div>
Calculate the maximum emf,  $${\text{emf}}_{0} $$ ,
 of the generator that was the subject of [[Example 1]](#Example1).

**Strategy**

Once $$\omega $$ , the angular velocity, is determined, $${\text{emf}}_
{0}=NAB\omega $$ can be used to find $${\text{emf}}_{0} $$ . All other
quantities are known.

**Solution**

Angular velocity is defined to be the change in angle per unit time:

<div class="equation" >
 $$\omega =\frac{\Delta \theta }{\Delta t}\text{.} $$
</div>
One-fourth of a revolution is  $$\pi /2 $$
 radians, and the time is 0.0150 s; thus,

<div class="equation" >
 $$\begin{array}{lll}\omega & =& \frac{\pi /2 \text{rad}}{0.0150 \text{s}}\\ & =& 104.7 \text{rad/s}\text{.}\end{array} $$
</div>
104.7 rad/s is exactly 1000 rpm. We substitute this value for  $$\omega  $$
 and the information from the previous example into  $${\text{emf}}_{0}=NAB\omega  $$, yielding 

<div class="equation" >
 $$\begin{array}{lll}{\text{emf}}_{0}& =& NAB\omega \\ & =& 200\left( 7.85 \times 10^{-3}  {\text{m}}^{2}\right)\left( 1.25 \text{T}\right)\left( 104.7 \text{rad/s}\right)\\ & =& 206 \text{V}\end{array}\text{.} $$
</div>
**Discussion**

The maximum emf is greater than the average emf of 131 V found in the previous
example, as it should be.

</div>

In real life, electric generators look a lot different than the figures in this
section, but the principles are the same. The source of mechanical energy that
turns the coil can be falling water (hydropower), steam produced by the burning
of fossil fuels, or the kinetic energy of wind. [[Figure 5]](#Figure5) shows a
cutaway view of a steam turbine; steam moves over the blades connected to the
shaft, which rotates the coil within the generator.

![Photograph of a steam turbine connected to a generator.](../resources/Figure_23_05_05.jpg "Steam turbine/generator. The steam produced by burning coal impacts the turbine blades, turning the shaft which is connected to the generator. (credit: Nabonaco, Wikimedia Commons)")
{: #Figure5}

Generators illustrated in this section look very much like the motors
illustrated previously. This is not coincidental. In fact, a motor becomes a
generator when its shaft rotates. Certain early automobiles used their starter
motor as a generator. In [Back Emf](../contents/ch23BackEmf), we shall further explore the
action of a motor as a generator.

### Section Summary

* An electric generator rotates a coil in a magnetic field, inducing an emf given as a function of time by

  <div class="equation" >
   $$\text{emf}=NAB\omega  \sin \omega t\text{,} $$
  </div>

where $$A $$ is the area of an $$N $$ -turn coil rotated at a constant angular
velocity $$\omega $$ in a uniform magnetic field $$B $$ .

* The peak emf $${\text{emf}}_{0} $$ of a generator is

  <div class="equation" >
   $${\text{emf}}_{0}=NAB\omega \text{.} $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Using RHR-1, show that the emfs in the sides of the generator loop in [[Figure 4]](#Figure4) are in the same sense and thus add.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The source of a generator’s electrical energy output is the work done to turn its coils. How is the work needed to turn the generator related to Lenz’s law?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the peak voltage of a generator that rotates its 200-turn, 0.100 m diameter coil at 3600 rpm in a 0.800 T field.

</div>
<div class="solution" markdown="1">
474 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what angular velocity in rpm will the peak voltage of a generator be 480 V, if its 500-turn, 8.00 cm diameter coil rotates in a 0.250 T field?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the peak emf generated by rotating a 1000-turn, 20.0 cm diameter coil in the Earth’s  $$ 5.00 \times 10^{-5}  \text{T} $$
 magnetic field, given the plane of the coil is originally perpendicular to the Earth’s field and is rotated to be parallel to the field in 10.0 ms?

</div>
<div class="solution" markdown="1">
0.247 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the peak emf generated by a 0.250 m radius, 500-turn coil is rotated one-fourth of a revolution in 4.17 ms, originally having its plane perpendicular to a uniform magnetic field. (This is 60 rev/s.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A bicycle generator rotates at 1875 rad/s, producing an 18.0 V peak emf. It has a 1.00 by 3.00 cm rectangular coil in a 0.640 T field. How many turns are in the coil? (b) Is this number of turns of wire practical for a 1.00 by 3.00 cm coil?

</div>
<div class="solution" markdown="1">
(a) 50

(b) yes

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

This problem refers to the bicycle generator considered in the previous problem.
It is driven by a 1.60 cm diameter wheel that rolls on the outside rim of the
bicycle tire. (a) What is the velocity of the bicycle if the generator’s angular
velocity is 1875 rad/s? (b) What is the maximum emf of the generator when the
bicycle moves at 10.0 m/s, noting that it was 18.0 V under the original
conditions? (c) If the sophisticated generator can vary its own magnetic field,
what field strength will it need at 5.00 m/s to produce a 9.00 V maximum emf?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A car generator turns at 400 rpm when the engine is idling. Its 300-turn, 5.00 by 8.00 cm rectangular coil rotates in an adjustable magnetic field so that it can produce sufficient voltage even at low rpms. What is the field strength needed to produce a 24.0 V peak emf? (b) Discuss how this required field strength compares to those available in permanent and electromagnets.

</div>
<div class="solution" markdown="1">
(a) 0.477 T

(b) This field strength is small enough that it can be obtained using either a
permanent magnet or an electromagnet.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that if a coil rotates at an angular velocity  $$\omega  $$ ,
 the period of its AC output is  $$2\pi /\omega  $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 75-turn, 10.0 cm diameter coil rotates at an angular velocity of 8.00 rad/s in a 1.25 T field, starting with the plane of the coil parallel to the field. (a) What is the peak emf? (b) At what time is the peak emf first reached? (c) At what time is the emf first at its most negative? (d) What is the period of the AC voltage output?

</div>
<div class="solution" markdown="1">
(a) 5.89 V

(b) At t=0

(c) 0.393 s

(d) 0.785 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) If the emf of a coil rotating in a magnetic field is zero at  $$t=0 $$ ,
 and increases to its first peak at  $$t= 0.100 \text{ms} $$ ,
 what is the angular velocity of the coil? (b) At what time will its next maximum occur? (c) What is the period of the output? (d) When is the output first one-fourth of its maximum? (e) When is it next one-fourth of its maximum?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

A 500-turn coil with a $$ 0.250 {\text{m}}^{2} $$ area is spun in the Earth’s $$
5.00 \times 10^{-5} \text{T} $$ field, producing a 12.0 kV maximum emf. (a) At
what angular velocity must the coil be spun? (b) What is unreasonable about this
result? (c) Which assumption or premise is responsible?

</div>
<div class="solution" markdown="1">
(a)  $$ 1.92 \times 10^{6}  \text{rad/s} $$
(b) This angular velocity is unreasonably high, higher than can be obtained for any mechanical system.

(c) The assumption that a voltage as great as 12.0 kV could be obtained is
unreasonable.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

electric generator
: a device for converting mechanical work into electric energy; it induces an
emf by rotating a coil in a magnetic field

emf induced in a generator coil
:  $$\text{emf}=NAB\omega \sin \omega t $$ , where $$A $$ is the area of an $$N
$$ -turn coil rotated at a constant angular velocity $$\omega $$ in a uniform
magnetic field $$B $$ , over a period of time $$t $$

peak emf
:  $${\text{emf}}_{0}=NAB\omega $$

</div>
