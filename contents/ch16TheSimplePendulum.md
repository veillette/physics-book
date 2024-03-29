---
title: The Simple Pendulum
layout: page
sectionNumber: 4
chapterNumber: 16
---

<div class="abstract" markdown="1">
* Measure acceleration due to gravity.
</div>

![In the figure, a horizontal bar is drawn. A perpendicular dotted line from the middle of the bar, depicting the equilibrium of pendulum, is drawn downward. A string of length L is tied to the bar at the equilibrium point. A circular bob of mass m is tied to the end of the string which is at a distance s from the equilibrium. The string is at an angle of theta with the equilibrium at the bar. A red arrow showing the time T of the oscillation of the mob is shown along the string line toward the bar. An arrow from the bob toward the equilibrium shows its restoring force asm g sine theta. A perpendicular arrow from the bob toward the ground depicts its mass as W equals to mg, and this arrow is at an angle theta with downward direction of string.](../resources/Figure_16_04_01.jpg "A simple pendulum has a small-diameter bob and a string that has a very small mass but is strong enough not to stretch appreciably. The linear displacement from equilibrium is \( s \) , the length of the arc. Also shown are the forces on the bob, which result in a net force of \( -mg \sin \theta \) toward the equilibrium position&#x2014;that is, a restoring force.")
{: #Figure1}

Pendulums are in common usage. Some have crucial uses, such as in clocks; some
are for fun, such as a child’s swing; and some are just there, such as the
sinker on a fishing line. For small displacements, a pendulum is a simple
harmonic oscillator. A **simple pendulum**{: class="term"} is defined to have an
object that has a small mass, also known as the pendulum bob, which is suspended
from a light wire or string, such as shown in [[Figure 1]](#Figure1). Exploring
the simple pendulum a bit further, we can discover the conditions under which it
performs simple harmonic motion, and we can derive an interesting expression for
its period.

We begin by defining the displacement to be the arc length $$s $$ . We see
from [[Figure 1]](#Figure1) that the net force on the bob is tangent to the arc
and equals $$-mg \sin \theta $$ .
(The weight $$mg $$ has components $$mg \cos \theta $$ along the string and $$mg
\sin \theta $$ tangent to the arc.) Tension in the string exactly cancels the component $$
mg \cos \theta $$ parallel to the string. This leaves a *net* restoring force
back toward the equilibrium position at $$\theta =0 $$.

Now, if we can show that the restoring force is directly proportional to the
displacement, then we have a simple harmonic oscillator. In trying to determine
if we have a simple harmonic oscillator, we should note that for small angles (
less than about $$15 ^\circ $$ ), $$\sin \theta \approx \theta $$
( $$\sin \theta $$ and $$\theta $$ differ by about 1% or less at smaller angles)
. Thus, for angles less than about $$15 ^\circ $$ , the restoring force $$F $$
is

<div class="equation" >
 $$F\approx -mg\theta . $$
</div>

The displacement $$s $$ is directly proportional to $$\theta $$ . When $$\theta
$$ is expressed in radians, the arc length in a circle is related to its
radius ( $$L $$ in this instance) by:

<div class="equation" >
 $$s=L\theta , $$
</div>

so that

<div class="equation" >
 $$\theta =\frac{s}{L}. $$
</div>

For small angles, then, the expression for the restoring force is:

<div class="equation" >
 $$F\approx -\frac{mg}{L}s $$
</div>

This expression is of the form:

<div class="equation" >
 $$F=-kx, $$
</div>

where the force constant is given by $$k=mg/L $$ and the displacement is given
by $$x=s $$ . For angles less than about $$15 ^\circ $$ , the restoring force
is directly proportional to the displacement, and the simple pendulum is a
simple harmonic oscillator.

Using this equation, we can find the period of a pendulum for amplitudes less
than about $$15 ^\circ $$ . For the simple pendulum:

<div class="equation" >
 $$T=2\pi \sqrt{\frac{m}{k}}=2\pi \sqrt{\frac{m}{mg/L}}. $$
</div>

Thus,

<div class="equation" >
 $$T=2\pi \sqrt{\frac{L}{g}} $$
</div>

for the period of a simple pendulum. This result is interesting because of its
simplicity. The only things that affect the period of a simple pendulum are its
length and the acceleration due to gravity. The period is completely independent
of other factors, such as mass. As with simple harmonic oscillators, the period
$$T $$ for a pendulum is nearly independent of amplitude, especially if $$\theta
$$ is less than about $$15 ^\circ $$ . Even simple pendulum clocks can be
finely adjusted and accurate.

Note the dependence of $$T $$ on $$g $$ . If the length of a pendulum is
precisely known, it can actually be used to measure the acceleration due to
gravity. Consider the following example.

<div class="example" markdown="1">
<div class="title">
Measuring Acceleration due to Gravity: The Period of a Pendulum
</div>
What is the acceleration due to gravity in a region where a simple pendulum having a length 75.000 cm has a period of 1.7357 s?

**Strategy**

We are asked to find $$g $$ given the period $$T $$ and the length $$L $$ of a
pendulum. We can solve $$T=2\pi \sqrt{\frac{L}{g}} $$ for $$g $$ , assuming only
that the angle of deflection is less than $$15 ^\circ $$.

**Solution**

1. Square $$T=2\pi \sqrt{\frac{L}{g}} $$ and solve for $$g $$ \:

    <div class="equation" >
     $$g={4\pi }^{2}\frac{L}{ {T}^{2}}. $$
    </div>

2. Substitute known values into the new equation:
   <div class="equation" >
   $$g={4\pi }^{2}\frac{0.75000 \text{m}}{ {\left(1.7357 \text{s}\right)}^{2}}.
   $$
   </div>

3. Calculate to find $$g $$ \:
   <div class="equation" >
   $$g=9.8281 \text{m}/{\text{s}}^{2}. $$
   </div>

**Discussion**

This method for determining $$g $$ can be very accurate. This is why length and
period are given to five digits in this example. For the precision of the
approximation $$\sin \theta \approx \theta $$ to be better than the precision of
the pendulum length and period, the maximum displacement angle should be kept
below about $$0.5 ^\circ $$.

</div>

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Career Connections
</div>
Knowing  $$g $$
 can be important in geological exploration; for example, a map of  $$g $$  over large geographical regions aids the study of plate tectonics and helps in the search for oil fields and large mineral deposits.

</div>

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Take Home Experiment: Determining  $$g $$
</div>
Use a simple pendulum to determine the acceleration due to gravity  $$g $$
 in your own locale. Cut a piece of a string or dental floss so that it is about 1 m long. Attach a small object of high density to the end of the string (for example, a metal nut or a car key). Starting at an angle of less than  $$10 ^\circ $$ ,
 allow the pendulum to swing and measure the pendulum’s period for 10 oscillations using a stopwatch. Calculate  $$g $$ .
 How accurate is this measurement? How might it be improved?

</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
An engineer builds two simple pendula. Both are suspended from small wires secured to the ceiling of a room. Each pendulum hovers 2 cm above the floor. Pendulum 1 has a bob with a mass of  $$10 \text{kg} $$ .
 Pendulum 2 has a bob with a mass of  $$100 \text{kg} $$ .
 Describe how the motion of the pendula will differ if the bobs are both displaced by  $$12 ^\circ $$.

</div>
<div class="solution" data-print-placement="here" markdown="1">
The movement of the pendula will not differ at all because the mass of the bob has no effect on the motion of a simple pendulum. The pendula are only affected by the period (which is related to the pendulum’s length) and by the acceleration due to gravity.

</div>
</div>

<div class="note" data-has-label="true"  class="interactive" data-label="" markdown="1">
<div class="title">
PhET Explorations: Pendulum Lab
</div>
Play with one or two pendulums and discover how the period of a simple pendulum depends on the length of the string, the mass of the pendulum bob, and the amplitude of the swing. It’s easy to measure the period using the photogate timer. You can vary friction and the strength of gravity. Use the pendulum to find the value of  $$g $$
 on planet X. Notice the anharmonic behavior at large amplitude.
{: class="newline"}

<div class="media"  data-alt="pendulums">
<iframe width="660" height="371.4" src="https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html"></iframe>
</div>
</div>

### Section Summary

* A mass $$m $$ suspended by a wire of length $$L $$ is a simple pendulum and undergoes
      simple harmonic motion for amplitudes less than about $$15 ^\circ. $$
      The period of a simple pendulum is

  <div class="equation" >
   $$T=2\pi \sqrt{\frac{L}{g}}, $$
  </div>

where $$L $$ is the length of the string and $$g $$ is the acceleration due to
gravity.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Pendulum clocks are made to run at the correct rate by adjusting the pendulum’s length. Suppose you move from one city to another where the acceleration due to gravity is slightly greater, taking your pendulum clock with you, will you have to lengthen or shorten the pendulum to keep the correct time, other factors remaining constant? Explain your answer.

</div>
</div>

### Problems &amp; Exercises

**As usual, the acceleration due to gravity in these problems is taken to be**
$$g=9.80 \text{m}/{\text{s}}^{2} $$ ,
**unless otherwise specified.**

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the length of a pendulum that has a period of 0.500 s?

</div>
<div class="solution" markdown="1">
6.21 cm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Some people think a pendulum with a period of 1.00 s can be driven with “mental energy” or psycho kinetically, because its period is the same as an average heartbeat. True or not, what is the length of such a pendulum?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the period of a 1.00-m-long pendulum?

</div>
<div class="solution" markdown="1">
2.01 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How long does it take a child on a swing to complete one swing if her center of gravity is 4.00 m below the pivot?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The pendulum on a cuckoo clock is 5.00 cm long. What is its frequency?

</div>
<div class="solution" markdown="1">
2\.23 Hz

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two parakeets sit on a swing with their combined center of mass 10.0 cm below the pivot. At what frequency do they swing?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A pendulum that has a period of 3.00000 s and that is located where the acceleration due to gravity is  $$9.79 {\text{m/s}}^{2} $$
 is moved to a location where the acceleration due to gravity is  $$9.82 {\text{m/s}}^{2} $$ .
 What is its new period? (b) Explain why so many digits are needed in the value for the period, based on the relation between the period and the acceleration due to gravity.

</div>
<div class="solution" markdown="1">
(a) 2.99541 s

(b) Since the period is related to the square root of the acceleration of
gravity, when the acceleration changes by 1% the period changes by $${\left(
0.01 \right)}^{2}=0.01\% $$ so it is necessary to have at least 4 digits after
the decimal to see the changes.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A pendulum with a period of 2.00000 s in one location  $$\left(g=9.80 {\text{m/s}}^{2}\right) $$
 is moved to a new location where the period is now 1.99796 s. What is the acceleration due to gravity at its new location?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the effect on the period of a pendulum if you double its length?

(b) What is the effect on the period of a pendulum if you decrease its length by
5.00%?

</div>
<div class="solution" markdown="1">
(a) Period increases by a factor of 1.41 ( $$\sqrt{2} $$ )  

(b) Period decreases to 97.5% of old period

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the new/old periods of a pendulum if the pendulum were transported from Earth to the Moon, where the acceleration due to gravity is  $$1.63 {\text{m/s}}^{2} $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what rate will a pendulum clock run on the Moon, where the acceleration due to gravity is  $$1.63 {\text{m/s}}^{2} $$ ,
 if it keeps time accurately on Earth? That is, find the time (in hours) it takes the clock’s hour hand to make one revolution on the Moon.

</div>
<div class="solution" markdown="1">
Slow by a factor of 2.45

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose the length of a clock’s pendulum is changed by 1.000%, exactly at noon one day. What time will it read 24.00 hours later, assuming it the pendulum has kept perfect time before the change? Note that there are two answers, and perform the calculation to four-digit precision.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If a pendulum-driven clock gains 5.00 s/day, what fractional change in pendulum length must be made for it to keep perfect time?

</div>
<div class="solution" markdown="1">
length must increase by 0.0116%.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

simple pendulum
: an object with a small mass suspended from a light wire or string

</div>
