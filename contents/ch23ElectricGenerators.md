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

![The figure shows a schematic diagram of an electric generator. It consists of a rotating rectangular coil placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the coil. The magnetic field B is shown pointing from the North to the South Pole. The two ends of this coil are connected to the two small rings. The two conducting carbon brushes are kept pressed separately on both the rings. The coil is attached to an axle with a handle at the other end. Outer ends of the two brushes are connected to the galvanometer. The axle is mechanically rotated from outside by an angle of ninety degree that is a one fourth revolution, to rotate the coil inside the magnetic field. A current is shown to flow in the coil in clockwise direction and the galvanometer shows a deflection to left.](../resources/Figure_23_05_01.jpg 'When this generator coil is rotated through one-fourth of a revolution, the magnetic flux ( \\Phi ) changes from its maximum to zero, inducing an emf.')
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
an expression for emf \*\*as a function of time by considering the motional emf on
a rotating rectangular coil of width $$w $$ and height $$\ell $$ in a uniform
magnetic field, as illustrated in [[Figure 2]](#Figure2).

![The figure shows a schematic diagram of an electric generator with a single rectangular coil. The rotating rectangular coil is placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the coil. The magnetic field B is shown pointing from the North to the South Pole. The North Pole is on the left and the South Pole is to the right and hence the direction of field is from left to right. The angular velocity of the coil is given as omega. The velocity vector v of the coil makes an angle theta with the direction of field.](../resources/Figure_23_05_02.jpg 'A generator with a single rectangular coil rotated at constant angular velocity in a uniform magnetic field produces an emf that varies sinusoidally in time. Note the generator is similar to a motor, except the shaft is rotated to produce a current rather than the other way around.')
{: #Figure2}

Charges in the wires of the loop experience the magnetic force, because they are
moving in a magnetic field. Charges in the vertical wires experience forces
parallel to the wire, causing currents. But those in the top and bottom segments
feel a force perpendicular to the wire, which does not cause a current. We can
thus find the induced emf by considering only the side wires. Motional emf is given to be $$\text{emf}=B\ell v $$ , where the velocity _v_ is perpendicular to the magnetic field $$B $$ . Here the velocity is at an angle $$\theta $$ with $$B $$ , so that its component perpendicular to $$B $$ is $$v \sin \theta $$
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
_._ [[Figure 3]](#Figure3) shows a graph of emf as a function of time, and it
now seems reasonable that AC voltage is sinusoidal.

![The first part of the figure shows a schematic diagram of a single coil electric generator. It consists of a rotating rectangular loop placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the loop. The magnetic field B is shown pointing from the North to the South Pole. The two ends of this loop are connected to the two small rings. The two conducting carbon brushes are kept pressed separately on both the rings. The loop is rotated in the field with an angular velocity omega. Outer ends of the two brushes are connected to an electric bulb which is shown to glow brightly. The second part of the figure shows the graph for e m f generated E as a function of time t. The e m f is along the Y axis and the time t is along the X axis. The graph is a progressive sine wave with a time period T. The crest maxima are at E zero and trough minima are at negative E zero.](../resources/Figure_23_05_03.jpg 'The emf of a generator is sent to a light bulb with the system of rings and brushes shown. The graph gives the emf of the generator as a function of time. ( emf_0 ) is the peak emf. The period is ( T=1/f=2 \\pi/\\omega ) , where ( f ) is the frequency. Note that the script E stands for emf.')
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

![The first part of the figure shows a schematic diagram of a single coil D C electric generator. It consists of a rotating rectangular loop placed between the two poles of a permanent magnet shown as two rectangular blocks curved on side facing the loop. The magnetic field B is shown pointing from the North to the South Pole. The two ends of this loop are connected to the two sides of a split ring. The two conducting carbon brushes are kept pressed separately on both sides of the split rings. The loop is rotated in the field with an angular velocity w. Outer ends of the two brushes are connected to an electric bulb which is shown to glow brightly. The second part of the figure shows the graph for e m f generated as a function of time. The e m f is along the Y axis and the time t is along the X axis. The graph is a progressive and rectified sine wave with a time period T. The sine wave has only positive pulses. The crest maxima are at E zero.](../resources/Figure_23_05_04.jpg 'Split rings, called commutators, produce a pulsed DC emf output in this configuration.')
{: #Figure4}

<div class="example" markdown="1">
<div class="title">
Calculating the Maximum Emf of a Generator
</div>
Calculate the maximum emf,  $${\text{emf}}_{0} $$ ,
 of the generator that was the subject of [[Example 1]](#Example1).

**Strategy**

Once $$\omega $$ , the angular velocity, is determined, $${\text{emf}}_{0}=NAB\omega $$ can be used to find $${\text{emf}}_{0} $$ . All other
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

![Photograph of a steam turbine connected to a generator.](../resources/Figure_23_05_05.jpg 'Steam turbine/generator. The steam produced by burning coal impacts the turbine blades, turning the shaft which is connected to the generator. (credit: Nabonaco, Wikimedia Commons)')
{: #Figure5}

Generators illustrated in this section look very much like the motors
illustrated previously. This is not coincidental. In fact, a motor becomes a
generator when its shaft rotates. Certain early automobiles used their starter
motor as a generator. In [Back Emf](../contents/ch23BackEmf), we shall further explore the
action of a motor as a generator.

### Section Summary

- An electric generator rotates a coil in a magnetic field, inducing an emf given as a function of time by

  <div class="equation" >
   $$\text{emf}=NAB\omega  \sin \omega t\text{,} $$
  </div>

where $$A $$ is the area of an $$N $$ -turn coil rotated at a constant angular
velocity $$\omega $$ in a uniform magnetic field $$B $$ .

- The peak emf $${\text{emf}}_{0} $$ of a generator is

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
**Strategy**

We use the peak emf formula $$\text{emf}_0 = NAB\omega$$. First, we need to find the area of the circular coil and convert the angular velocity from rpm to rad/s.

**Solution**

The radius of the coil is:

<div class="equation">
$$r = \frac{d}{2} = \frac{0.100}{2} = 0.0500 \text{ m}$$
</div>

The area is:

<div class="equation">
$$A = \pi r^2 = \pi(0.0500)^2 = 7.85 \times 10^{-3} \text{ m}^2$$
</div>

Convert angular velocity from rpm to rad/s:

<div class="equation">
$$\omega = 3600 \text{ rpm} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} = \frac{3600 \times 2\pi}{60} = 377 \text{ rad/s}$$
</div>

Now calculate the peak emf:

<div class="equation">
$$\begin{array}{lll}\text{emf}_0 & = & NAB\omega \\ & = & (200)(7.85 \times 10^{-3})(0.800)(377) \\ & = & 474 \text{ V}\end{array}$$
</div>

**Discussion**

This is a substantial voltage, typical of industrial generators. The high rotation rate (3600 rpm is 60 Hz, a standard power frequency) and strong magnetic field combine to produce a practical output voltage.

**Answer**

474 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what angular velocity in rpm will the peak voltage of a generator be 480 V, if its 500-turn, 8.00 cm diameter coil rotates in a 0.250 T field?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$\text{emf}_0 = NAB\omega$$ and solve for $$\omega$$, then convert from rad/s to rpm.

**Solution**

The area of the coil is:

<div class="equation">
$$A = \pi r^2 = \pi(0.0400)^2 = 5.03 \times 10^{-3} \text{ m}^2$$
</div>

From $$\text{emf}_0 = NAB\omega$$:

<div class="equation">
$$\omega = \frac{\text{emf}_0}{NAB} = \frac{480}{(500)(5.03 \times 10^{-3})(0.250)} = \frac{480}{0.629} = 763 \text{ rad/s}$$
</div>

Converting to rpm:

<div class="equation">
$$\omega = 763 \text{ rad/s} \times \frac{60 \text{ s}}{2\pi \text{ rad/rev}} = \frac{45780}{6.283} = 7.29 \times 10^3 \text{ rpm}$$
</div>

**Discussion**

This is a very high rotation rate (over 7000 rpm), typical of some high-speed generators but requiring careful engineering to handle the mechanical stresses.

**Final Answer**

The required angular velocity is 7290 rpm or 7.29 × 10³ rpm.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the peak emf generated by rotating a 1000-turn, 20.0 cm diameter coil in the Earth's  $$ 5.00 \times 10^{-5}  \text{T} $$
 magnetic field, given the plane of the coil is originally perpendicular to the Earth's field and is rotated to be parallel to the field in 10.0 ms?

</div>
<div class="solution" markdown="1">
**Strategy**

We need to find $$\omega$$ from the rotation information (perpendicular to parallel in 10.0 ms is one-quarter revolution), then use $$\text{emf}_0 = NAB\omega$$.

**Solution**

The radius of the coil is:

<div class="equation">
$$r = \frac{d}{2} = \frac{0.200}{2} = 0.100 \text{ m}$$
</div>

The area is:

<div class="equation">
$$A = \pi r^2 = \pi(0.100)^2 = 3.14 \times 10^{-2} \text{ m}^2$$
</div>

One-quarter revolution is $$\pi/2$$ radians in 10.0 ms:

<div class="equation">
$$\omega = \frac{\Delta \theta}{\Delta t} = \frac{\pi/2}{10.0 \times 10^{-3}} = \frac{1.571}{0.0100} = 157 \text{ rad/s}$$
</div>

Calculate the peak emf:

<div class="equation">
$$\begin{array}{lll}\text{emf}_0 & = & NAB\omega \\ & = & (1000)(3.14 \times 10^{-2})(5.00 \times 10^{-5})(157) \\ & = & 0.247 \text{ V}\end{array}$$
</div>

**Discussion**

The Earth's magnetic field is very weak compared to fields in typical generators, so even with 1000 turns and a relatively large coil, the output voltage is only about a quarter volt. This demonstrates why practical generators require much stronger magnetic fields.

**Answer**

0.247 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the peak emf generated by a 0.250 m radius, 500-turn coil is rotated one-fourth of a revolution in 4.17 ms, originally having its plane perpendicular to a uniform magnetic field. (This is 60 rev/s.)

</div>
<div class="solution" markdown="1">
**Strategy**

This problem refers to a coil setup from a previous problem in the Faraday's law chapter where a similar coil with B = 0.425 T was used. We'll use $$\text{emf}_0 = NAB\omega$$ with that field strength. First, we calculate the area and angular velocity.

**Solution**

The area of the coil is:

<div class="equation">
$$A = \pi r^2 = \pi(0.250)^2 = 0.196 \text{ m}^2$$
</div>

The angular velocity can be found from the frequency. Since one-fourth revolution occurs in 4.17 ms, one complete revolution takes 4 × 4.17 = 16.68 ms, giving f = 60.0 Hz:

<div class="equation">
$$\omega = 2\pi f = 2\pi(60.0) = 377 \text{ rad/s}$$
</div>

Using the magnetic field from the related problem (B = 0.425 T):

<div class="equation">
$$\begin{array}{lll}\text{emf}_0 & = & NAB\omega \\ & = & (500)(0.196)(0.425)(377) \\ & = & 1.57 \times 10^4 \text{ V} \\ & = & 15.7 \text{ kV}\end{array}$$
</div>

**Discussion**

This is a very high voltage, appropriate for power generation at 60 Hz. The peak emf is $$\pi/2$$ times larger than the average emf during a quarter-revolution (which was 10.0 kV in the related problem), consistent with the sinusoidal variation of the induced emf.

**Answer**

15.7 kV

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A bicycle generator rotates at 1875 rad/s, producing an 18.0 V peak emf. It has a 1.00 by 3.00 cm rectangular coil in a 0.640 T field. How many turns are in the coil? (b) Is this number of turns of wire practical for a 1.00 by 3.00 cm coil?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$\text{emf}_0 = NAB\omega$$ and solve for N. The area of the rectangular coil is length times width.

**Solution for (a)**

The area of the rectangular coil is:

<div class="equation">
$$A = (0.0100)(0.0300) = 3.00 \times 10^{-4} \text{ m}^2$$
</div>

From $$\text{emf}_0 = NAB\omega$$, we solve for N:

<div class="equation">
$$N = \frac{\text{emf}_0}{AB\omega} = \frac{18.0}{(3.00 \times 10^{-4})(0.640)(1875)}$$
</div>

<div class="equation">
$$N = \frac{18.0}{0.360} = 50 \text{ turns}$$
</div>

**Solution for (b)**

For a rectangular coil of dimensions 1.00 cm by 3.00 cm, the perimeter is:

<div class="equation">
$$P = 2(1.00 + 3.00) = 8.00 \text{ cm}$$
</div>

With 50 turns, the total length of wire is:

<div class="equation">
$$L = 50 \times 0.0800 = 4.00 \text{ m}$$
</div>

This is a reasonable length of wire. If we use 0.5 mm diameter wire (typical for small coils), 50 turns would fit in a thickness of 25 mm = 2.5 cm, which could be accommodated in a compact bicycle generator housing.

**Discussion**

Part (a) shows that 50 turns is needed to produce 18 V at this rotation rate. Part (b) confirms this is practical - 50 turns of thin wire in an 8 cm perimeter coil requires only about 4 meters of wire and would fit in a small space. Bicycle generators commonly use coils with this number of turns.

**Answer**

(a) 50 turns; (b) Yes, this is practical for a compact bicycle generator.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

This problem refers to the bicycle generator considered in the previous problem.
It is driven by a 1.60 cm diameter wheel that rolls on the outside rim of the
bicycle tire. (a) What is the velocity of the bicycle if the generator's angular
velocity is 1875 rad/s? (b) What is the maximum emf of the generator when the
bicycle moves at 10.0 m/s, noting that it was 18.0 V under the original
conditions? (c) If the sophisticated generator can vary its own magnetic field,
what field strength will it need at 5.00 m/s to produce a 9.00 V maximum emf?

</div>
<div class="solution" markdown="1">
**Strategy**

The generator wheel rolls on the bicycle tire, so $$v = r\omega$$ where $$r$$ is the wheel radius. The emf is proportional to $$\omega$$, which is proportional to bicycle speed.

**Solution for (a)**

<div class="equation">
$$v = r\omega = \frac{d}{2}\omega = \frac{0.0160}{2}(1875) = (0.00800)(1875) = 15.0 \text{ m/s}$$
</div>

**Solution for (b)**

Since emf is proportional to $$\omega$$ and $$\omega$$ is proportional to $$v$$:

<div class="equation">
$$\frac{\text{emf}_{\text{new}}}{\text{emf}_{\text{old}}} = \frac{v_{\text{new}}}{v_{\text{old}}}$$
</div>

<div class="equation">
$$\text{emf}_{\text{new}} = \text{emf}_{\text{old}} \times \frac{v_{\text{new}}}{v_{\text{old}}} = 18.0 \times \frac{10.0}{15.0} = 12.0 \text{ V}$$
</div>

**Solution for (c)**

At 5.00 m/s, the emf without field adjustment would be:

<div class="equation">
$$\text{emf}_{5.00} = 18.0 \times \frac{5.00}{15.0} = 6.00 \text{ V}$$
</div>

To get 9.00 V, the field must be increased by:

<div class="equation">
$$\frac{B_{\text{new}}}{B_{\text{old}}} = \frac{9.00}{6.00} = 1.50$$
</div>

From the previous problem, $$B_{\text{old}} = 0.640 \text{ T}$$:

<div class="equation">
$$B_{\text{new}} = 1.50 \times 0.640 = 0.960 \text{ T}$$
</div>

**Discussion**

Part (a) shows the bicycle moves at 15.0 m/s (54 km/h) when the generator spins at 1875 rad/s. Part (b) shows slower speeds produce lower emf. Part (c) demonstrates that increasing the magnetic field can compensate for lower rotation speeds.

**Final Answer**

(a) 15.0 m/s; (b) 12.0 V; (c) 0.960 T.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A car generator turns at 400 rpm when the engine is idling. Its 300-turn, 5.00 by 8.00 cm rectangular coil rotates in an adjustable magnetic field so that it can produce sufficient voltage even at low rpms. What is the field strength needed to produce a 24.0 V peak emf? (b) Discuss how this required field strength compares to those available in permanent and electromagnets.

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$\text{emf}_0 = NAB\omega$$ and solve for B. First, we need to convert rpm to rad/s and calculate the coil area.

**Solution for (a)**

The area of the rectangular coil is:

<div class="equation">
$$A = (0.0500)(0.0800) = 4.00 \times 10^{-3} \text{ m}^2$$
</div>

Convert angular velocity from rpm to rad/s:

<div class="equation">
$$\omega = 400 \text{ rpm} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} = \frac{800\pi}{60} = 41.9 \text{ rad/s}$$
</div>

From $$\text{emf}_0 = NAB\omega$$, solve for B:

<div class="equation">
$$B = \frac{\text{emf}_0}{NA\omega} = \frac{24.0}{(300)(4.00 \times 10^{-3})(41.9)}$$
</div>

<div class="equation">
$$B = \frac{24.0}{50.3} = 0.477 \text{ T}$$
</div>

**Solution for (b)**

Modern permanent magnets made from neodymium-iron-boron (NdFeB) or samarium-cobalt can produce fields of 1.0-1.4 T. Electromagnets can easily produce fields from 0.5 T to over 2 T with moderate current. The required field of 0.477 T is well within the capability of both types of magnets.

**Discussion**

The relatively low field strength needed (about 0.5 T) makes this practical for automotive applications. Car alternators typically use electromagnets (with field windings) rather than permanent magnets, because the field strength can be adjusted electronically to regulate output voltage as engine speed varies. At higher rpms, the field can be reduced to maintain constant voltage output.

**Answer**

(a) 0.477 T; (b) This field strength is readily achievable with either permanent magnets or electromagnets, making it practical for automotive generators.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that if a coil rotates at an angular velocity  $$\omega  $$ ,
 the period of its AC output is  $$2\pi /\omega  $$.

</div>
<div class="solution" markdown="1">
**Strategy**

The emf varies as $$\text{emf} = \text{emf}_0 \sin(\omega t)$$. The period $$T$$ is the time for one complete cycle, when the argument of sine increases by $$2\pi$$.

**Solution**

The emf from a rotating coil is:

<div class="equation">
$$\text{emf}(t) = \text{emf}_0 \sin(\omega t)$$
</div>

For one complete cycle, the sine function must go through $$2\pi$$ radians:

<div class="equation">
$$\omega T = 2\pi$$
</div>

Solving for $$T$$:

<div class="equation">
$$T = \frac{2\pi}{\omega}$$
</div>

Alternatively, the coil rotates through angle $$\theta = \omega t$$. For one complete revolution, $$\theta = 2\pi$$:

<div class="equation">
$$2\pi = \omega T$$
</div>

<div class="equation">
$$T = \frac{2\pi}{\omega}$$
</div>

**Discussion**

This result connects angular velocity to period. Since frequency $$f = 1/T$$, we also have $$f = \omega/(2\pi)$$ or $$\omega = 2\pi f$$, the familiar relationship between angular frequency and frequency.

**Final Answer**

Proven: The period is $$T = 2\pi/\omega$$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 75-turn, 10.0 cm diameter coil rotates at an angular velocity of 8.00 rad/s in a 1.25 T field, starting with the plane of the coil parallel to the field. (a) What is the peak emf? (b) At what time is the peak emf first reached? (c) At what time is the emf first at its most negative? (d) What is the period of the AC voltage output?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$\text{emf}_0 = NAB\omega$$ for peak emf. The emf varies as $$\text{emf} = \text{emf}_0 \sin(\omega t)$$ when starting with the plane parallel to the field (maximum flux change rate at t = 0). The period is $$T = 2\pi/\omega$$.

**Solution for (a)**

The radius and area of the coil are:

<div class="equation">
$$r = \frac{d}{2} = \frac{0.100}{2} = 0.0500 \text{ m}$$
</div>

<div class="equation">
$$A = \pi r^2 = \pi(0.0500)^2 = 7.85 \times 10^{-3} \text{ m}^2$$
</div>

The peak emf is:

<div class="equation">
$$\begin{array}{lll}\text{emf}_0 & = & NAB\omega \\ & = & (75)(7.85 \times 10^{-3})(1.25)(8.00) \\ & = & 5.89 \text{ V}\end{array}$$
</div>

**Solution for (b)**

Since the coil starts with its plane parallel to the field, the flux through it is zero and the rate of flux change is maximum. This means the emf starts at its maximum value at t = 0.

**Solution for (c)**

Since the coil starts with its plane parallel to the field and has maximum emf at t = 0, the emf varies as $$\text{emf} = \text{emf}_0 \cos(\omega t)$$. The most negative value occurs when $$\cos(\omega t) = -1$$, which happens when $$\omega t = \pi$$:

<div class="equation">
$$t = \frac{\pi}{\omega} = \frac{\pi}{8.00} = \frac{3.142}{8.00} = 0.393 \text{ s}$$
</div>

**Solution for (d)**

<div class="equation">
$$T = \frac{2\pi}{\omega} = \frac{2\pi}{8.00} = \frac{6.283}{8.00} = 0.785 \text{ s}$$
</div>

**Discussion**

Starting with the plane parallel to the field means maximum flux change rate at t = 0, giving maximum emf immediately. The emf follows $$\text{emf} = \text{emf}_0 \cos(\omega t)$$, reaching its most negative value after half a period. The relatively slow rotation (8 rad/s) gives a period of nearly 0.8 seconds.

**Answer**

(a) 5.89 V; (b) t = 0; (c) 0.393 s; (d) 0.785 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) If the emf of a coil rotating in a magnetic field is zero at  $$t=0 $$ ,
 and increases to its first peak at  $$t= 0.100 \text{ms} $$ ,
 what is the angular velocity of the coil? (b) At what time will its next maximum occur? (c) What is the period of the output? (d) When is the output first one-fourth of its maximum? (e) When is it next one-fourth of its maximum?

</div>
<div class="solution" markdown="1">
**Strategy**

The emf is $$\text{emf} = \text{emf}_0 \sin(\omega t)$$. Starting at zero, it reaches maximum when $$\sin(\omega t) = 1$$, which occurs when $$\omega t = \pi/2$$.

**Solution for (a)**

At the first peak, $$\omega t = \pi/2$$:

<div class="equation">
$$\omega = \frac{\pi/2}{t} = \frac{\pi/2}{0.100 \times 10^{-3}} = \frac{1.571}{10^{-4}} = 1.57 \times 10^4 \text{ rad/s}$$
</div>

**Solution for (b)**

The next maximum occurs when $$\omega t = \pi/2 + 2\pi = 5\pi/2$$:

<div class="equation">
$$t = \frac{5\pi/2}{\omega} = \frac{5\pi/2}{1.57 \times 10^4} = \frac{7.854}{1.57 \times 10^4} = 5.00 \times 10^{-4} \text{ s} = 0.500 \text{ ms}$$
</div>

**Solution for (c)**

<div class="equation">
$$T = \frac{2\pi}{\omega} = \frac{2\pi}{1.57 \times 10^4} = 4.00 \times 10^{-4} \text{ s} = 0.400 \text{ ms}$$
</div>

**Solution for (d)**

When $$\text{emf} = \text{emf}_0/4$$:

<div class="equation">
$$\sin(\omega t) = \frac{1}{4}$$
</div>

<div class="equation">
$$\omega t = \sin^{-1}(0.25) = 0.2527 \text{ rad}$$
</div>

<div class="equation">
$$t = \frac{0.2527}{1.57 \times 10^4} = 1.61 \times 10^{-5} \text{ s} = 0.0161 \text{ ms} = 16.1 \text{ μs}$$
</div>

**Solution for (e)**

The next time occurs on the downslope at $$\omega t = \pi - 0.2527 = 2.889 \text{ rad}$$:

<div class="equation">
$$t = \frac{2.889}{1.57 \times 10^4} = 1.84 \times 10^{-4} \text{ s} = 0.184 \text{ ms}$$
</div>

**Discussion**

The coil rotates very rapidly at 15,700 rad/s (about 2500 Hz). The periodic nature of the output is clearly shown by these calculations.

**Final Answer**

(a) 1.57 × 10⁴ rad/s; (b) 0.500 ms; (c) 0.400 ms; (d) 16.1 μs; (e) 0.184 ms.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

A 500-turn coil with a $$ 0.250 {\text{m}}^{2} $$ area is spun in the Earth's $$ 5.00 \times 10^{-5} \text{T} $$ field, producing a 12.0 kV maximum emf. (a) At
what angular velocity must the coil be spun? (b) What is unreasonable about this
result? (c) Which assumption or premise is responsible?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$\text{emf}_0 = NAB\omega$$ and solve for $$\omega$$. Then we evaluate whether this angular velocity is physically reasonable for a mechanical system.

**Solution for (a)**

From $$\text{emf}_0 = NAB\omega$$, solve for $$\omega$$:

<div class="equation">
$$\omega = \frac{\text{emf}_0}{NAB} = \frac{12.0 \times 10^3}{(500)(0.250)(5.00 \times 10^{-5})}$$
</div>

<div class="equation">
$$\omega = \frac{12000}{6.25 \times 10^{-3}} = 1.92 \times 10^{6} \text{ rad/s}$$
</div>

**Solution for (b)**

This angular velocity is extremely unreasonable. Converting to rpm:

<div class="equation">
$$\omega = 1.92 \times 10^{6} \text{ rad/s} \times \frac{60 \text{ s/min}}{2\pi \text{ rad/rev}} = 1.83 \times 10^{7} \text{ rpm}$$
</div>

This is over 18 million rpm! For comparison:
- High-speed turbines operate at ~30,000 rpm
- Jet engine turbines reach ~50,000 rpm
- Even ultracentrifuges only reach ~150,000 rpm
- At the rim of a 0.5 m diameter coil, the linear velocity would be $$v = r\omega = (0.25)(1.92 \times 10^{6}) = 4.8 \times 10^{5}$$ m/s, which exceeds the speed of light divided by 600!

This is far beyond what any mechanical system can achieve without disintegrating due to centrifugal forces.

**Solution for (c)**

The unreasonable assumption is that 12.0 kV can be generated using the Earth's weak magnetic field. The Earth's field ($$5.00 \times 10^{-5}$$ T) is about 10,000 times weaker than typical generator fields (0.5-1.5 T). To produce significant voltages with such a weak field would require impossibly high rotation rates or an impractically large coil with many turns.

**Discussion**

This problem illustrates why practical generators use strong artificial magnetic fields rather than the Earth's field. The Earth's field is useful for compasses and navigation but far too weak for power generation. Realistic generators with fields of ~1 T operating at ~3600 rpm (60 Hz) produce hundreds of volts - a reasonable balance of mechanical and electromagnetic parameters.

**Answer**

(a) 1.92 × 10⁶ rad/s; (b) This is unreasonably high - over 18 million rpm, which would destroy any mechanical system and give rim speeds approaching the speed of light; (c) The assumption that 12.0 kV can be obtained from Earth's weak magnetic field is unreasonable.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

electric generator
: a device for converting mechanical work into electric energy; it induces an
emf by rotating a coil in a magnetic field

emf induced in a generator coil
: $$\text{emf}=NAB\omega \sin \omega t $$ , where $$A $$ is the area of an $$N $$ -turn coil rotated at a constant angular velocity $$\omega $$ in a uniform
magnetic field $$B $$ , over a period of time $$t $$

peak emf
: $${\text{emf}}_{0}=NAB\omega $$

</div>
