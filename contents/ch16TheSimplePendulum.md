---
title: The Simple Pendulum
layout: page
sectionNumber: 4
chapterNumber: 16
---

<div class="abstract" markdown="1">
* Measure acceleration due to gravity.
</div>

![In the figure, a horizontal bar is drawn. A perpendicular dotted line from the middle of the bar, depicting the equilibrium of pendulum, is drawn downward. A string of length L is tied to the bar at the equilibrium point. A circular bob of mass m is tied to the end of the string which is at a distance s from the equilibrium. The string is at an angle of theta with the equilibrium at the bar. A red arrow showing the time T of the oscillation of the mob is shown along the string line toward the bar. An arrow from the bob toward the equilibrium shows its restoring force asm g sine theta. A perpendicular arrow from the bob toward the ground depicts its mass as W equals to mg, and this arrow is at an angle theta with downward direction of string.](../resources/Figure_16_04_01.jpg 'A simple pendulum has a small-diameter bob and a string that has a very small mass but is strong enough not to stretch appreciably. The linear displacement from equilibrium is ( s ) , the length of the arc. Also shown are the forces on the bob, which result in a net force of ( -mg \\sin \\theta ) toward the equilibrium position—that is, a restoring force.')
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
mg \cos \theta $$ parallel to the string. This leaves a _net_ restoring force
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

$$
is expressed in radians, the arc length in a circle is related to its
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

- A mass $$m $$ suspended by a wire of length $$L $$ is a simple pendulum and undergoes
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
**Strategy**

We can use the formula for the period of a simple pendulum $$T = 2\pi\sqrt{\frac{L}{g}}$$ and solve for the length $$L$$.

**Solution**

Squaring both sides of $$T = 2\pi\sqrt{\frac{L}{g}}$$:

<div class="equation">
 $$T^2 = 4\pi^2\frac{L}{g}$$
</div>

Solving for $$L$$:

<div class="equation">
 $$L = \frac{gT^2}{4\pi^2}$$
</div>

Substituting the known values $$g = 9.80 \text{ m/s}^2$$ and $$T = 0.500 \text{ s}$$:

<div class="equation">
 $$L = \frac{(9.80)(0.500)^2}{4\pi^2} = \frac{(9.80)(0.250)}{39.48} = \frac{2.45}{39.48} = 0.0621 \text{ m}$$
</div>

Converting to centimeters: $$L = 6.21 \text{ cm}$$

**Discussion**

A pendulum only about 6 cm long (about 2.4 inches) has a very short period of half a second. This result demonstrates the square root relationship between length and period in the equation $$T = 2\pi\sqrt{\frac{L}{g}}$$. To achieve such a short period requires a very short pendulum length.

This makes physical sense: a shorter pendulum has less distance to travel in each swing, and the restoring force (which depends on the angle from vertical) acts over a shorter arc length, causing the bob to accelerate more quickly back toward equilibrium. The result is a rapid oscillation—this pendulum completes 2 full back-and-forth swings per second, or 120 swings per minute.

Such short-period pendulums have practical applications in small clocks and timing mechanisms where compact size is important. However, they're also more sensitive to friction and air resistance (which scale unfavorably at small sizes), making them less suitable for precision timekeeping compared to longer pendulums. The answer is reasonable in magnitude—a few centimeters is a practical length that could actually be constructed and used.

**Answer**

6.21 cm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Some people think a pendulum with a period of 1.00 s can be driven with "mental energy" or psycho kinetically, because its period is the same as an average heartbeat. True or not, what is the length of such a pendulum?

</div>
<div class="solution" markdown="1">
**Strategy**

We can use the formula for the period of a simple pendulum $$T = 2\pi\sqrt{\frac{L}{g}}$$ and solve for the length $$L$$.

**Solution**

Squaring both sides of $$T = 2\pi\sqrt{\frac{L}{g}}$$:

<div class="equation">
 $$T^2 = 4\pi^2\frac{L}{g}$$
</div>

Solving for $$L$$:

<div class="equation">
 $$L = \frac{gT^2}{4\pi^2} = \frac{(9.80)(1.00)^2}{4\pi^2} = \frac{9.80}{39.48} = 0.248 \text{ m}$$
</div>

**Discussion**

A pendulum of length 24.8 cm (about 10 inches) has a period of 1.00 s, matching the average human heartbeat of about 60 beats per minute. This coincidence has led to various claims about "psychokinetic" effects, though physics provides no mechanism for mental energy to influence pendulum motion.

The result is physically reasonable and demonstrates an important property of pendulums: the period depends only on length and gravity, not on who is holding it or thinking about it. A 1-second period is very convenient for timekeeping and demonstrations, which is why "seconds pendulums" (with a half-period of 1 second, giving a full period of 2 seconds) have historically been important in clockmaking.

The 25-cm length is practical for handheld demonstrations and small experimental setups. It's also worth noting that this pendulum would complete exactly 60 full swings per minute, making it easy to observe and count. The independence of the period from mass means that different observers holding identical-length pendulums would see them swing in perfect synchrony, regardless of any purported "mental influence"—a good demonstration of the objective nature of physical laws.

**Answer**

0.248 m or 24.8 cm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the period of a 1.00-m-long pendulum?

</div>
<div class="solution" markdown="1">
**Strategy**

We can directly use the period formula $$T = 2\pi\sqrt{\frac{L}{g}}$$ with the given length $$L = 1.00 \text{ m}$$.

**Solution**

<div class="equation">
 $$T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{1.00}{9.80}}$$
</div>

<div class="equation">
 $$T = 2\pi\sqrt{0.102} = 2\pi(0.319) = 2.01 \text{ s}$$
</div>

**Discussion**

A 1-meter pendulum has a period of about 2 seconds, making it one of the most commonly used pendulum lengths in physics education and demonstrations. This result is historically significant: early proposals for defining the meter suggested using the length of a "seconds pendulum" (one with a half-period of 1 second, or full period of 2 seconds). However, this definition was ultimately rejected because $$g$$ varies with latitude and altitude, meaning the required length would differ by location.

The 2-second period makes this pendulum very convenient for timing manually with a stopwatch—you can easily count "one thousand one, one thousand two" as it swings. The pendulum completes 30 full oscillations per minute, which is slow enough to observe clearly but fast enough to gather meaningful data quickly.

This length is also practical for classroom demonstrations: it requires about 1 meter of string and a ceiling height of at least 1.5-2 meters, which is available in most labs. The result demonstrates that longer pendulums have longer periods—compare this 2-second period to the 0.5-second period of the 6-cm pendulum in Problem 1. The period scales with the square root of length, so multiplying the length by 16 (from 6.21 cm to 100 cm) multiplies the period by $$\sqrt{16} = 4$$ (from 0.5 s to 2.0 s).

**Answer**

2.01 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How long does it take a child on a swing to complete one swing if her center of gravity is 4.00 m below the pivot?

</div>
<div class="solution" markdown="1">
**Strategy**

The time for one complete swing is the period. We use $$T = 2\pi\sqrt{\frac{L}{g}}$$ where $$L = 4.00$$ m is the distance from the pivot to the center of gravity.

**Solution**

<div class="equation">
 $$T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{4.00}{9.80}} = 2\pi\sqrt{0.408} = 2\pi(0.639) = 4.01 \text{ s}$$
</div>

**Discussion**

A period of about 4 seconds is typical for a playground swing, which makes physical sense based on the swing's length. The 4-meter distance from pivot to center of gravity is realistic for a standard swing set. This means the child completes one full back-and-forth motion every 4 seconds, or about 15 complete oscillations per minute.

This result illustrates an important principle that parents intuitively discover: to effectively push a child on a swing, you must push at the swing's natural frequency (about once every 4 seconds). Pushing at any other frequency leads to poor energy transfer and small amplitudes. This is an example of resonance in simple harmonic motion.

Critically, the period depends only on the length (4 m to the center of gravity) and gravitational acceleration, not on the child's mass. Whether a small toddler or a large adult sits on the swing, the period remains 4 seconds. This mass-independence is a unique property of pendulum motion. Similarly, the period is independent of amplitude (for small angles), so whether the child swings gently or very high, the period stays constant—this is called isochronism.

The 4-second period is slow enough that parents can easily time their pushes, making swings effective and enjoyable for children. Comparing to the 2-second period of a 1-meter pendulum (Problem 3), we see that doubling the length from 1 m to 4 m doesn't double the period—it multiplies it by $$\sqrt{4} = 2$$, demonstrating the square root relationship in $$T = 2\pi\sqrt{\frac{L}{g}}$$.

**Answer**

4.01 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The pendulum on a cuckoo clock is 5.00 cm long. What is its frequency?

</div>
<div class="solution" markdown="1">
**Strategy**

The frequency is the reciprocal of the period. We first find the period using $$T = 2\pi\sqrt{\frac{L}{g}}$$, then calculate $$f = \frac{1}{T}$$.

**Solution**

Convert length to meters: $$L = 5.00 \text{ cm} = 0.0500 \text{ m}$$

Calculate the period:

<div class="equation">
 $$T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{0.0500}{9.80}} = 2\pi\sqrt{0.00510} = 2\pi(0.0714) = 0.449 \text{ s}$$
</div>

Calculate the frequency:

<div class="equation">
 $$f = \frac{1}{T} = \frac{1}{0.449} = 2.23 \text{ Hz}$$
</div>

**Discussion**

The cuckoo clock pendulum oscillates at 2.23 Hz, meaning it completes about 2.2 full swings per second, or about 134 swings per minute. This high frequency is characteristic of the short pendulum used in cuckoo clocks and creates the rapid, distinctive ticking sound these clocks are known for.

Comparing to other pendulum clocks helps establish reasonableness: a grandfather clock typically uses a pendulum about 1 meter long with a period of 2 seconds (frequency 0.5 Hz), while this 5-cm cuckoo clock pendulum has a frequency more than 4 times higher. The short pendulum allows the clock to be compact and mounted on a wall, unlike the tall grandfather clock that requires floor space.

The relationship between frequency and period ($$f = 1/T$$) combined with the pendulum formula gives us $$f = \frac{1}{2\pi}\sqrt{\frac{g}{L}}$$. This shows that frequency is inversely proportional to the square root of length: shorter pendulums oscillate faster. The 5-cm length is practical for manufacturing small clock mechanisms and provides adequate mechanical advantage for the escapement mechanism that regulates the clock's gears.

One limitation of such short pendulums is their greater sensitivity to friction and air resistance, which can affect timing accuracy more than in longer pendulums. However, for decorative cuckoo clocks, absolute precision is less critical than for scientific instruments.

**Answer**

2.23 Hz

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two parakeets sit on a swing with their combined center of mass 10.0 cm below the pivot. At what frequency do they swing?

</div>
<div class="solution" markdown="1">
**Strategy**

The frequency is the reciprocal of the period. We first find the period using $$T = 2\pi\sqrt{\frac{L}{g}}$$, then calculate $$f = \frac{1}{T}$$.

**Solution**

Convert length to meters: $$L = 10.0 \text{ cm} = 0.100 \text{ m}$$

Calculate the period:

<div class="equation">
 $$T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{0.100}{9.80}} = 2\pi\sqrt{0.0102} = 2\pi(0.101) = 0.635 \text{ s}$$
</div>

Calculate the frequency:

<div class="equation">
 $$f = \frac{1}{T} = \frac{1}{0.635} = 1.57 \text{ Hz}$$
</div>

**Discussion**

The frequency of 1.57 Hz means the parakeets complete about 1.6 full swings per second, or about 94 swings per minute. This is a fairly rapid oscillation, much faster than a playground swing (about 15 swings per minute) because the bird swing is much shorter (10 cm vs. 4 meters).

This problem beautifully illustrates a fundamental principle of pendulum motion: **the period and frequency are independent of mass**. Whether one parakeet, two parakeets, or even no parakeets sit on the swing, as long as the center of mass remains 10 cm below the pivot, the frequency stays 1.57 Hz. The formula $$T = 2\pi\sqrt{\frac{L}{g}}$$ contains no mass term, which is why mass doesn't affect the motion.

This mass-independence might seem counterintuitive—one might expect heavier birds to swing more slowly. However, while heavier birds do have more inertia (resistance to acceleration), they also experience proportionally more gravitational restoring force. These two effects exactly cancel, leaving the period unchanged. This is analogous to why all objects fall at the same rate in a vacuum, regardless of mass.

The 10-cm length is reasonable for a small bird toy or cage swing. The rapid 1.57 Hz frequency means the swing returns to the same position about 1.6 times per second, which birds seem to find comfortable and even enjoyable. Comparing this to the 5-cm cuckoo clock pendulum (2.23 Hz), we see that doubling the length from 5 cm to 10 cm decreases the frequency by a factor of $$\sqrt{2} \approx 1.41$$, from 2.23 Hz to 1.57 Hz, confirming the inverse square root relationship between length and frequency.

**Answer**

1.57 Hz

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A pendulum that has a period of 3.00000 s and that is located where the acceleration due to gravity is  $$9.79 {\text{m/s}}^{2} $$
 is moved to a location where the acceleration due to gravity is  $$9.82 {\text{m/s}}^{2} $$ .
 What is its new period? (b) Explain why so many digits are needed in the value for the period, based on the relation between the period and the acceleration due to gravity.

</div>
<div class="solution" markdown="1">

**Strategy**

For part (a), the period of a simple pendulum is $$T=2\pi\sqrt{\frac{L}{g}}$$. The length $$L$$ remains constant when the pendulum is moved, so we can use the ratio of periods at different gravitational accelerations: $$\frac{T_2}{T_1}=\sqrt{\frac{g_1}{g_2}}$$. For part (b), we analyze how the fractional change in $$g$$ affects the fractional change in $$T$$ through the square root relationship.

**Solution**

**(a)** From the period formula $$T=2\pi\sqrt{\frac{L}{g}}$$, we can write:

<div class="equation">
 $$\frac{T_2}{T_1}=\sqrt{\frac{g_1}{g_2}}$$
</div>

Solving for $$T_2$$:

<div class="equation">
 $$T_2=T_1\sqrt{\frac{g_1}{g_2}}$$
</div>

Substituting the given values:
- $$T_1=3.00000$$ s
- $$g_1=9.79$$ m/s²
- $$g_2=9.82$$ m/s²

<div class="equation">
 $$T_2=(3.00000 \text{ s})\sqrt{\frac{9.79}{9.82}}$$
</div>

<div class="equation">
 $$T_2=(3.00000)\sqrt{0.996945}$$
</div>

<div class="equation">
 $$T_2=(3.00000)(0.998469)=2.99541 \text{ s}$$
</div>

**The new period is 2.99541 s.**

**(b)** The period depends on $$g^{-1/2}$$, so a small change in $$g$$ produces a change in $$T$$ that is half as large (in fractional terms):

<div class="equation">
 $$\frac{\Delta T}{T}\approx -\frac{1}{2}\frac{\Delta g}{g}$$
</div>

In this problem:

<div class="equation">
 $$\frac{\Delta g}{g}=\frac{9.82-9.79}{9.79}=\frac{0.03}{9.79}=0.003065=0.3065\%$$
</div>

The fractional change in period is:

<div class="equation">
 $$\frac{\Delta T}{T}\approx -\frac{1}{2}(0.003065)=-0.001533=-0.1533\%$$
</div>

Change in period:

<div class="equation">
 $$\Delta T=(3.00000)(-0.001533)=-0.00460 \text{ s}$$
</div>

**Discussion**

Part (a): The new period (2.99541 s) is slightly shorter than the original (3.00000 s) by about 0.00459 s or 0.15%. This makes physical sense: stronger gravity (9.82 vs. 9.79 m/s²) pulls the pendulum back toward equilibrium more forcefully, causing it to oscillate faster with a shorter period.

Part (b): The precision requirement stems from the square root relationship. When $$g$$ changes by 0.31%, the period changes by only half that amount (0.15%). To detect a 0.15% change in a 3-second period (which is 0.0046 s), we need at least 5 significant figures, or 5 decimal places in this case.

This problem illustrates why precision pendulum clocks are sensitive to location. A pendulum clock calibrated at sea level ($$g \approx 9.81$$ m/s²) would run slow if moved to high altitude (lower $$g$$) or fast if moved to a location with higher $$g$$ (like near the poles or in a valley). Historical timekeepers had to account for this when using pendulum clocks for navigation or scientific measurements.

The small difference in $$g$$ (9.82 vs. 9.79 m/s²) might arise from:
- Different latitudes (gravity is stronger at poles than equator)
- Different elevations (gravity decreases with altitude)
- Local geological variations (dense rock formations increase $$g$$)

This high precision requirement is why atomic clocks, which don't depend on gravity, have replaced pendulums for scientific timekeeping.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A pendulum with a period of 2.00000 s in one location  $$\left(g=9.80 {\text{m/s}}^{2}\right) $$
 is moved to a new location where the period is now 1.99796 s. What is the acceleration due to gravity at its new location?

</div>
<div class="solution" markdown="1">
**Strategy**

Since the length of the pendulum doesn't change, we can use the relationship between period and gravity at both locations to find the new value of $$g$$. From $$T = 2\pi\sqrt{\frac{L}{g}}$$, we can establish a ratio.

**Solution**

First, find the length using the original location data:

<div class="equation">
 $$L = \frac{gT^2}{4\pi^2} = \frac{(9.80)(2.00000)^2}{4\pi^2} = \frac{39.2}{39.478} = 0.9930 \text{ m}$$
</div>

Now use this length with the new period to find $$g_{\text{new}}$$:

<div class="equation">
 $$g_{\text{new}} = \frac{4\pi^2 L}{T_{\text{new}}^2} = \frac{4\pi^2(0.9930)}{(1.99796)^2} = \frac{39.198}{3.9918} = 9.82 \text{ m/s}^2$$
</div>

Alternatively, using the ratio method:

<div class="equation">
 $$\frac{T_1}{T_2} = \sqrt{\frac{g_2}{g_1}}$$
</div>

<div class="equation">
 $$g_2 = g_1\left(\frac{T_1}{T_2}\right)^2 = 9.80\left(\frac{2.00000}{1.99796}\right)^2 = 9.80(1.00204) = 9.82 \text{ m/s}^2$$
</div>

**Discussion**

The new location has a slightly higher acceleration due to gravity (9.82 m/s² vs. 9.80 m/s²), an increase of about 0.2%. This small change in $$g$$ causes a correspondingly small decrease in period (from 2.00000 s to 1.99796 s, a decrease of 0.102%). The relationship is inverse: stronger gravity pulls the pendulum back more forcefully, causing faster oscillations and a shorter period.

This problem demonstrates that pendulums can serve as precision gravimeters (instruments for measuring $$g$$). The high precision in the period measurement (5 decimal places) allows us to detect very small variations in gravitational acceleration. Such variations occur due to:
- **Latitude**: $$g$$ is about 0.5% stronger at the poles than at the equator due to Earth's rotation and oblate shape
- **Altitude**: $$g$$ decreases by about 0.03% per kilometer of elevation
- **Local geology**: Dense rock formations or mineral deposits can increase $$g$$ locally by small amounts

The calculation is straightforward because the length doesn't change when the pendulum is moved—only $$g$$ changes. Using the ratio method ($$\frac{T_1}{T_2} = \sqrt{\frac{g_2}{g_1}}$$) elegantly eliminates the unknown length from the calculation.

This precision measurement technique was historically important for geological surveying and mapmaking. Variations in $$g$$ can reveal underground structures, and detailed gravity maps help in searching for oil deposits and mineral resources. Modern gravimeters use different technology but the principle remains: measuring how gravity affects the motion of a test mass.

**Answer**

9.82 m/s²

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the effect on the period of a pendulum if you double its length?

(b) What is the effect on the period of a pendulum if you decrease its length by
5.00%?

</div>
<div class="solution" markdown="1">
**Strategy**

Since $$T = 2\pi\sqrt{\frac{L}{g}}$$, the period is proportional to the square root of the length. We can find the ratio of new to old period for each case.

**Solution**

**(a) Doubling the length:**

If $$L_{\text{new}} = 2L_{\text{old}}$$, then:

<div class="equation">
 $$\frac{T_{\text{new}}}{T_{\text{old}}} = \sqrt{\frac{L_{\text{new}}}{L_{\text{old}}}} = \sqrt{\frac{2L}{L}} = \sqrt{2} = 1.41$$
</div>

The period increases by a factor of $$\sqrt{2}$$ or approximately 1.41.

**(b) Decreasing the length by 5.00%:**

If $$L_{\text{new}} = 0.950L_{\text{old}}$$, then:

<div class="equation">
 $$\frac{T_{\text{new}}}{T_{\text{old}}} = \sqrt{\frac{L_{\text{new}}}{L_{\text{old}}}} = \sqrt{0.950} = 0.975$$
</div>

The period decreases to 97.5% of the old period (a 2.5% decrease).

**Discussion**

Part (a) reveals a counterintuitive result: doubling the length doesn't double the period—it only increases it by about 41% (a factor of $$\sqrt{2} \approx 1.414$$). This square root relationship comes directly from $$T = 2\pi\sqrt{\frac{L}{g}}$$. If you wanted to double the period, you would need to quadruple the length (since $$\sqrt{4} = 2$$). This non-linear relationship is a key characteristic of pendulum motion.

Part (b) shows that a 5.00% decrease in length produces only a 2.50% decrease in period (to 97.5% of the original). Notice that the fractional change in period is half the fractional change in length—this follows from the square root: if $$T \propto \sqrt{L}$$, then $$\frac{\Delta T}{T} \approx \frac{1}{2}\frac{\Delta L}{L}$$ for small changes. This means pendulums are somewhat forgiving of small length variations, which is advantageous for clock design.

The square root relationship has practical implications:
- **For clocks**: Small thermal expansion of the pendulum rod (which might change $$L$$ by 0.1%) affects timing by only half that amount (0.05%), though this is still significant for precision timekeeping
- **For adjustments**: To speed up a pendulum clock, you must shorten the pendulum, but the effect is muted by the square root
- **For scaling**: You can't simply scale a pendulum design up or down linearly—a pendulum 4 times longer has a period only 2 times longer

These results are consistent with the fundamental pendulum equation and demonstrate how the square root relationship governs all pendulum behavior, making period changes less dramatic than length changes.

**Answer**

(a) Period increases by a factor of 1.41 ( $$\sqrt{2} $$ )

(b) Period decreases to 97.5% of old period

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the new/old periods of a pendulum if the pendulum were transported from Earth to the Moon, where the acceleration due to gravity is  $$1.63 {\text{m/s}}^{2} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

The length of the pendulum stays the same, so we can use the relationship $$T = 2\pi\sqrt{\frac{L}{g}}$$ to find the ratio of periods. Since $$L$$ is constant, the ratio depends only on the ratio of gravitational accelerations.

**Solution**

For Earth: $$T_{\text{Earth}} = 2\pi\sqrt{\frac{L}{g_{\text{Earth}}}}$$

For Moon: $$T_{\text{Moon}} = 2\pi\sqrt{\frac{L}{g_{\text{Moon}}}}$$

Taking the ratio:

<div class="equation">
 $$\frac{T_{\text{Moon}}}{T_{\text{Earth}}} = \frac{2\pi\sqrt{\frac{L}{g_{\text{Moon}}}}}{2\pi\sqrt{\frac{L}{g_{\text{Earth}}}}} = \sqrt{\frac{g_{\text{Earth}}}{g_{\text{Moon}}}}$$
</div>

<div class="equation">
 $$\frac{T_{\text{Moon}}}{T_{\text{Earth}}} = \sqrt{\frac{9.80}{1.63}} = \sqrt{6.01} = 2.45$$
</div>

**Discussion**

The period on the Moon is 2.45 times longer than on Earth, which makes excellent physical sense. The Moon's gravity (1.63 m/s²) is about 1/6 of Earth's gravity (9.80 m/s²), so the ratio $$\sqrt{\frac{9.80}{1.63}} = \sqrt{6.01} \approx 2.45$$ reflects this weaker gravitational field.

Physically, weaker gravity means a weaker restoring force acting on the pendulum bob. When displaced from equilibrium, the component of gravitational force pulling it back ($$mg\sin\theta \approx mg\theta$$) is proportionally smaller on the Moon. With less force accelerating the bob back toward equilibrium, it takes longer to complete each oscillation.

This has dramatic practical consequences: a pendulum that swings once per second on Earth would take 2.45 seconds per swing on the Moon. A pendulum clock calibrated for Earth would run extremely slowly on the Moon, losing about 59% of the time (since it would run at only 41% of the correct rate). After one Earth-day (24 hours) on the Moon, such a clock would show only about 9.8 hours had passed!

This demonstrates a fundamental limitation of pendulum clocks: they're only accurate at the gravitational acceleration for which they were calibrated. This made pendulum clocks problematic for navigation and surveying, since $$g$$ varies with location. It's also why mechanical pendulum clocks would be useless on the Moon, spacecraft, or any environment with different gravity. Modern timekeeping uses atomic or quartz crystal oscillators that are independent of gravity, making them suitable for any location.

**Answer**

2.45

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what rate will a pendulum clock run on the Moon, where the acceleration due to gravity is  $$1.63 {\text{m/s}}^{2} $$ ,
 if it keeps time accurately on Earth? That is, find the time (in hours) it takes the clock's hour hand to make one revolution on the Moon.

</div>
<div class="solution" markdown="1">
**Strategy**

Since the period on the Moon is longer by a factor found in the previous problem (2.45), the clock runs slow by the same factor. When the clock's hour hand completes one revolution (which it thinks is 12 hours), more actual time will have passed.

**Solution**

From the previous problem, we know:

<div class="equation">
 $$\frac{T_{\text{Moon}}}{T_{\text{Earth}}} = \sqrt{\frac{g_{\text{Earth}}}{g_{\text{Moon}}}} = \sqrt{\frac{9.80}{1.63}} = 2.45$$
</div>

The clock runs slow by this same factor. When the clock measures 12 hours, the actual time elapsed is:

<div class="equation">
 $$t_{\text{actual}} = 2.45 \times 12 \text{ hours} = 29.4 \text{ hours}$$
</div>

Therefore, it takes 29.4 hours of actual time for the clock's hour hand to make one revolution on the Moon.

**Discussion**

The pendulum clock runs very slowly on the Moon—it takes 29.4 actual hours for the clock's hour hand to complete what it thinks is one 12-hour revolution. This means the clock loses about 17.4 hours per "clock cycle," running at only about 41% of its proper rate (12/29.4 ≈ 0.41).

This dramatic slowdown occurs because the Moon's gravity is only about one-sixth that of Earth's (1.63 m/s² vs. 9.80 m/s²). The restoring force on the pendulum ($$F \approx -mg\theta$$) is proportionally weaker, so the pendulum swings much more slowly. Each tick of the clock takes 2.45 times longer than it should.

To put this in perspective: if an astronaut set the clock to 12:00 noon upon landing on the Moon, then after one full Earth day (24 hours) had passed, the clock would only show about 9:48 (9.8 hours later). The clock would be running over 14 hours slow per day!

This makes mechanical pendulum clocks completely impractical for use on the Moon or in any environment with different gravity. Historically, this limitation affected navigation: pendulum clocks couldn't be used aboard ships due to motion and couldn't provide accurate time across different latitudes (where $$g$$ varies slightly). This problem drove the development of marine chronometers using balance wheels instead of pendulums.

Modern timekeeping devices using quartz crystal oscillators or atomic transitions are fundamentally different—they rely on electromagnetic forces and quantum mechanics rather than gravity, so they work identically on the Moon, Earth, or in zero gravity. This is why spacecraft, satellites, and modern navigation systems use these technologies instead of pendulums.

**Answer**

29.4 hours (slow by a factor of 2.45)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose the length of a clock's pendulum is changed by 1.000%, exactly at noon one day. What time will it read 24.00 hours later, assuming it the pendulum has kept perfect time before the change? Note that there are two answers, and perform the calculation to four-digit precision.

</div>
<div class="solution" markdown="1">
**Strategy**

A change in length changes the period. Since $$T \propto \sqrt{L}$$, a 1% change in length produces a 0.5% change in period. We need to consider both cases: length increased by 1% and length decreased by 1%.

**Solution**

The ratio of new to old period is:

<div class="equation">
 $$\frac{T_{\text{new}}}{T_{\text{old}}} = \sqrt{\frac{L_{\text{new}}}{L_{\text{old}}}}$$
</div>

**Case 1: Length increased by 1.000%** ($$L_{\text{new}} = 1.01000 L_{\text{old}}$$)

<div class="equation">
 $$\frac{T_{\text{new}}}{T_{\text{old}}} = \sqrt{1.01000} = 1.004988$$
</div>

The clock runs slow. In 24.00 real hours, the clock measures:

<div class="equation">
 $$t_{\text{clock}} = \frac{24.00}{1.004988} = 23.88 \text{ hours}$$
</div>

Converting to hours and minutes: $$23.88 \text{ h} = 23 \text{ h } 52.8 \text{ min}$$

So the clock reads 11:52.8 AM (or 11:53 AM to the nearest minute).

**Case 2: Length decreased by 1.000%** ($$L_{\text{new}} = 0.99000 L_{\text{old}}$$)

<div class="equation">
 $$\frac{T_{\text{new}}}{T_{\text{old}}} = \sqrt{0.99000} = 0.99499$$
</div>

The clock runs fast. In 24.00 real hours, the clock measures:

<div class="equation">
 $$t_{\text{clock}} = \frac{24.00}{0.99499} = 24.12 \text{ hours}$$
</div>

Converting: $$24.12 \text{ h} = 24 \text{ h } 7.2 \text{ min}$$

So the clock reads 12:07.2 PM (or 12:07 PM to the nearest minute).

**Discussion**

A mere 1.000% change in pendulum length causes the clock to be off by about 7.2 minutes per day, which is quite significant for practical timekeeping. This demonstrates the sensitivity of pendulum clocks to length variations.

The physical mechanism is clear: if the length increases by 1%, the period increases by $$\sqrt{1.01} \approx 1.005$$ (about 0.5%). This means each swing takes slightly longer, so the clock runs slow. Over 24 hours, the accumulated error is substantial—the clock loses about 7 minutes. Conversely, decreasing the length makes the period shorter, so the clock runs fast and gains about 7 minutes per day.

This sensitivity has important practical implications:

**Temperature effects**: Most materials expand when heated. A steel pendulum rod with thermal expansion coefficient $$\alpha \approx 11 \times 10^{-6}/°C$$ would change length by 0.011% per degree Celsius. A 10°C temperature increase would change the length by 0.11%, causing the clock to lose about 47 seconds per day. This is why precision pendulum clocks used temperature-compensated pendulums (like the "gridiron" pendulum using alternating brass and steel rods, or mercury-filled pendulums where the mercury rises as the rod expands, keeping the effective length constant).

**Adjustment precision**: To keep accurate time, pendulum lengths must be maintained to better than 0.01% precision. This requires careful mechanical design and stable operating conditions.

**Calibration**: The two answers (11:52.8 and 12:07.2) show that without knowing whether the length increased or decreased, we can't determine which way the clock error goes. In practice, clock adjusters would observe whether the clock gains or loses time over several days, then adjust accordingly.

The calculation to four-digit precision (23.88 hours and 24.12 hours) is necessary to distinguish the small but significant timing errors. This problem illustrates why pendulum clocks, while historically important and accurate for their time, have been replaced by quartz and atomic clocks that are far less sensitive to environmental variations.

**Answer**

If length increased by 1.000%: clock reads 11:52:48 (or 11:52.8 hours)

If length decreased by 1.000%: clock reads 12:07:12 (or 12:07.2 hours)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If a pendulum-driven clock gains 5.00 s/day, what fractional change in pendulum length must be made for it to keep perfect time?

</div>
<div class="solution" markdown="1">
**Strategy**

If the clock gains time, it runs fast, meaning its period is too short. To correct this, we need to increase the length to increase the period. Since $$T \propto \sqrt{L}$$, we can relate the fractional change in period to the fractional change in length.

**Solution**

The clock gains 5.00 s in one day (86400 s), so the ratio of periods is:

<div class="equation">
 $$\frac{T_{\text{actual}}}{T_{\text{clock}}} = \frac{86400}{86400 - 5.00} = \frac{86400}{86395} = 1.0000579$$
</div>

Since $$T \propto \sqrt{L}$$, we have:

<div class="equation">
 $$\frac{T_{\text{new}}}{T_{\text{old}}} = \sqrt{\frac{L_{\text{new}}}{L_{\text{old}}}}$$
</div>

Therefore:

<div class="equation">
 $$\frac{L_{\text{new}}}{L_{\text{old}}} = \left(\frac{T_{\text{new}}}{T_{\text{old}}}\right)^2 = (1.0000579)^2 = 1.000116$$
</div>

The fractional change in length is:

<div class="equation">
 $$\frac{\Delta L}{L} = \frac{L_{\text{new}} - L_{\text{old}}}{L_{\text{old}}} = 1.000116 - 1 = 0.000116 = 0.0116\%$$
</div>

**Discussion**

To correct a clock that gains 5 seconds per day, the pendulum length must be increased by only 0.0116%, or about 1.16 parts in 10,000. This is an extraordinarily small adjustment that illustrates the remarkable precision required in pendulum clock design.

**Scale of the adjustment**: For a 1-meter pendulum, 0.0116% corresponds to 0.116 mm, which is roughly the thickness of a human hair or a sheet of paper! For a typical grandfather clock pendulum about 1 meter long, this would mean adjusting the bob's position by little more than 0.1 mm. This demonstrates the extreme sensitivity of pendulum clocks to length variations.

**Physical reasoning**: The clock gains time, meaning it runs fast, which means its period is too short. From $$T = 2\pi\sqrt{\frac{L}{g}}$$, we see that to increase the period, we must increase the length. This makes physical sense: a longer pendulum has more distance to travel and experiences restoring force over a larger arc, both of which increase the time per oscillation.

**Practical implications**:

1. **Fine adjustment mechanisms**: Precision pendulum clocks include very fine adjustment screws or nuts on the bob. A typical mechanism might have threads that allow adjustments of 0.1 mm per turn, requiring multiple complete turns to make this 0.116 mm adjustment.

2. **Temperature compensation**: Temperature changes easily cause length variations exceeding 0.0116%. A 1-meter steel rod expands by about 0.011 mm per degree Celsius. A temperature swing of just 10°C would change the length by 0.11 mm, comparable to the adjustment needed here. This is why precision pendulum clocks used:
   - Invar (nickel-steel alloy) with very low thermal expansion
   - Gridiron pendulums with alternating metals that compensate for each other's expansion
   - Mercury pendulums where rising mercury compensates for rod expansion

3. **Environmental stability**: Even air currents, humidity changes affecting wooden clock cases, or building vibrations can affect pendulum length and timekeeping at this precision level.

**Historical context**: The fact that such tiny adjustments are needed explains why pendulum clocks required skilled clockmakers for setup and maintenance, and why atomic clocks (accurate to nanoseconds per day) have completely replaced pendulums for scientific timekeeping. Nevertheless, well-maintained pendulum clocks can achieve accuracy of a few seconds per week, which is remarkable for a purely mechanical device.

**Answer**

Length must increase by 0.0116%

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

simple pendulum
: an object with a small mass suspended from a light wire or string

</div>
