---
title: Uniform Circular Motion and Simple Harmonic Motion
layout: page
sectionNumber: 6
chapterNumber: 16
---

<div class="abstract" markdown="1">
* Compare simple harmonic motion with uniform circular motion.
</div>

![The figure shows a clock-wise rotating empty merry go round with iron bars holding the decorated wooden horse statues, four in each column.](../resources/Figure_16_06_01.jpg "The horses on this merry-go-round exhibit uniform circular motion. (credit: Wonderlane, Flickr)")
{: #Figure1}

There is an easy way to produce simple harmonic motion by using uniform circular
motion. [[Figure 2]](#Figure2) shows one way of using this method. A ball is
attached to a uniformly rotating vertical turntable, and its shadow is projected
on the floor as shown. The shadow undergoes simple harmonic motion. Hooke’s law
usually describes uniform circular motions ( $$\omega $$ constant) rather than
systems that have large visible displacements. So observing the projection of
uniform circular motion, as in [[Figure 2]](#Figure2), is often easier than
observing a precise large-scale simple harmonic oscillator. If studied in
sufficient depth, simple harmonic motion produced in this manner can give
considerable insight into many aspects of oscillations and waves and is very
useful mathematically. In our brief treatment, we shall indicate some of the
major features of this relationship and how they might be useful.

![The given figure shows a vertical turntable with four floor projecting light bulbs at the top. A smaller sized rectangular bar is attached to this turntable at the bottom half, with a circular knob attached to it. A red colored small ball is rolling along the boundary of this knob in angular direction, and the lights falling through this ball are ball making shadows just under the knob on the floor. The middle shadow is the brightest and starts fading as we look through to the cornered shadow.](../resources/Figure_16_06_02.jpg "The shadow of a ball rotating at constant angular velocity \( \omega \) on a turntable goes back and forth in precise simple harmonic motion.")
{: #Figure2}

[[Figure 3]](#Figure3) shows the basic relationship between uniform circular
motion and simple harmonic motion. The point P travels around the circle at
constant angular velocity $$\omega $$ . The point P is analogous to an object on
the merry-go-round. The projection of the position of P onto a fixed axis
undergoes simple harmonic motion and is analogous to the shadow of the object.
At the time shown in the figure, the projection has position $$x $$ and moves to
the left with velocity $$v $$ . The velocity of the point P around the circle
equals $${\overline{v}}_{\text{max}} $$ . The projection of $${\overline{v}}_
{\text{max}} $$ on the $$x $$ -axis is the velocity $$v $$ of the simple
harmonic motion along the $$x $$ -axis.

![The figure shows a point P moving through the circumference of a circle in an angular way with angular velocity omega. The diameter is projected along the x axis, with point P making an angle theta at the centre of the circle. A point along the diameter shows the projection of the point P with a dotted perpendicular line from P to this point, the projection of the point is given as v along the circle and its velocity v subscript max, over the top of the projection arrow in an upward left direction.](../resources/Figure_16_06_03.jpg "A point P moving on a circular path with a constant angular velocity \( \omega \) is undergoing uniform circular motion. Its projection on the x-axis undergoes simple harmonic motion. Also shown is the velocity of this point around the circle, \( {\overline{v} }_\text{max} \), and its projection, which is \( v \) . Note that these velocities form a similar triangle to the displacement triangle.")
{: #Figure3}

To see that the projection undergoes simple harmonic motion, note that its
position $$x $$ is given by

<div class="equation" >
 $$x=X \cos \theta \text{,} $$
</div>

where $$\theta =\omega t $$, $$\omega $$ is the constant angular velocity, and
$$X $$ is the radius of the circular path. Thus,

<div class="equation" >
 $$x=X \cos \omega t. $$
</div>

The angular velocity $$\omega $$ is in radians per unit time; in this case
$$2\pi $$ radians is the time for one revolution $$T $$ . That is, $$\omega
=2\pi /T $$ . Substituting this expression for $$\omega $$, we see that the
position $$x $$ is given by:

<div class="equation" >
 $$x\left(t\right)=\cos\left(\frac{2\pi t}{T}\right). $$
</div>

This expression is the same one we had for the position of a simple harmonic
oscillator
in [Simple Harmonic Motion: A Special Periodic Motion](../contents/ch16SimpleHarmonicMotion)
. If we make a graph of position versus time as in [[Figure 4]](#Figure4), we
see again the wavelike character (typical of simple harmonic motion) of the
projection of uniform circular motion onto the $$x $$ -axis.

![The given figure shows a vertical turntable with four floor projecting light bulbs at the top. A smaller sized rectangular bar is attached to this turntable at the bottom half, with a circular knob attached to it. A red colored small ball is rolling along the boundary of this knob in angular direction. The turnaround table is put upon a roller paper sheet, on which the simple harmonic motion is measured, which is shown here in oscillating waves on the paper sheet in front of the table. A graph of amplitude versus time is also given alongside the figure.](../resources/Figure_16_06_04.jpg "The position of the projection of uniform circular motion performs simple harmonic motion, as this wavelike graph of \( x \) versus \( t \) indicates.")
{: #Figure4}

Now let us use [[Figure 3]](#Figure3) to do some further analysis of uniform
circular motion as it relates to simple harmonic motion. The triangle formed by
the velocities in the figure and the triangle formed by the displacements ( $$X,
x, $$ and $$\sqrt{ {X}^{2}-{x}^{2}} $$ )
are similar right triangles. Taking ratios of similar sides, we see that

<div class="equation" >
 $$\frac{v}{ {v}_{\text{max}}}=\frac{\sqrt{ {X}^{2}-{x}^{2}}}{X}=\sqrt{1-\frac{ {x}^{2}}{ {X}^{2}}}. $$
</div>

We can solve this equation for the speed $$v $$ or

<div class="equation" >
 $$v={v}_{\text{max}}\sqrt{1-\frac{ {x}^{2}}{ {X}^{2}}}. $$
</div>

This expression for the speed of a simple harmonic oscillator is exactly the
same as the equation obtained from conservation of energy considerations
in [Energy and the Simple Harmonic Oscillator](../contents/ch16EnergyAndTheSimpleHarmonicOscillator)
.You can begin to see that it is possible to get all of the characteristics of
simple harmonic motion from an analysis of the projection of uniform circular
motion.

Finally, let us consider the period $$T $$ of the motion of the projection. This
period is the time it takes the point P to complete one revolution. That time is
the circumference of the circle $$2\pi X $$ divided by the velocity around the
circle, $${v}_{\text{max}} $$ . Thus, the period $$T $$ is

<div class="equation" >
 $$T=\frac{2\pi X}{ {v}_{\text{max}}}. $$
</div>

We know from conservation of energy considerations that

<div class="equation" >
 $${v}_{\text{max}}=\sqrt{\frac{k}{m}}X. $$
</div>

Solving this equation for $$X/{v}_{\text{max}} $$ gives

<div class="equation" >
 $$\frac{X}{ {v}_{\text{max}}}=\sqrt{\frac{m}{k}}. $$
</div>

Substituting this expression into the equation for $$T $$ yields

<div class="equation" >
 $$T=2\pi \sqrt{\frac{m}{k}}\text{.} $$
</div>

Thus, the period of the motion is the same as for a simple harmonic oscillator.
We have determined the period for any simple harmonic oscillator using the
relationship between uniform circular motion and simple harmonic motion.

Some modules occasionally refer to the connection between uniform circular
motion and simple harmonic motion. Moreover, if you carry your study of physics
and its applications to greater depths, you will find this relationship useful.
It can, for example, help to analyze how waves add when they are superimposed.

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Identify an object that undergoes uniform circular motion. Describe how you could trace the simple harmonic motion of this object as a wave.

</div>
<div class="solution" data-print-placement="here" markdown="1">
A record player undergoes uniform circular motion. You could attach dowel rod to one point on the outside edge of the turntable and attach a pen to the other end of the dowel. As the record player turns, the pen will move. You can drag a long piece of paper under the pen, capturing its motion as a wave.

</div>
</div>

### Section Summary

A projection of uniform circular motion undergoes simple harmonic oscillation.

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a)What is the maximum velocity of an 85.0-kg person bouncing on a bathroom scale having a force constant of  $$ 1.50 \times 10^{6}  \text{N/m} $$, if the amplitude of the bounce is 0.200 cm? (b)What is the maximum energy stored in the spring?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
a). 0.266 m/s

b). 3.00 J

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A novelty clock has a 0.0100-kg mass object bouncing on a spring that has a force constant of 1.25 N/m. What is the maximum velocity of the object if the object bounces 3.00 cm above and below its equilibrium position? (b) How many joules of kinetic energy does the object have at its maximum velocity?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what positions is the speed of a simple harmonic oscillator half its maximum? That is, what values of  $$x/X $$
 give  $$v=±{v}_{\text{max}}/2 $$, where  $$X $$  is the amplitude of the motion?

</div>
<div class="solution" markdown="1">
 $$±\frac{\sqrt{3}}{2} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A ladybug sits 12.0 cm from the center of a Beatles music album spinning at 33.33 rpm. What is the maximum velocity of its shadow on the wall behind the turntable, if illuminated parallel to the record by the parallel rays of the setting Sun?

</div>
</div>
