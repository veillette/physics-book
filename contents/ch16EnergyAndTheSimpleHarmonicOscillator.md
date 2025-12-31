---
title: Energy and the Simple Harmonic Oscillator
layout: page
sectionNumber: 5
chapterNumber: 16
---

<div class="abstract" markdown="1">
* Determine the maximum speed of an oscillating system.
</div>

To study the energy of a simple harmonic oscillator, we first consider all the
forms of energy it can have We know
from [Hooke’s Law: Stress and Strain Revisited](../contents/ch16HookesLaw) that the energy
stored in the deformation of a simple harmonic oscillator is a form of potential
energy given by:

<div class="equation" >
 $${\text{PE}}_{\text{el}}=\frac{1}{2}kx^{2}. $$
</div>

Because a simple harmonic oscillator has no dissipative forces, the other
important form of energy is kinetic energy $$\text{KE} $$ . Conservation of
energy for these two forms is:

<div class="equation" >
 $$\text{KE}+{\text{PE}}_{\text{el}}=\text{constant} $$
</div>

or

<div class="equation" >
 $$\frac{1}{2}mv^{2}+\frac{1}{2}kx^{2}=\text{constant} \text{.}  $$
</div>

This statement of conservation of energy is valid for _all_ simple harmonic
oscillators, including ones where the gravitational force plays a role

Namely, for a simple pendulum we replace the velocity with $$v=L\omega $$ , the
spring constant with $$k=mg/L $$ , and the displacement term with $$x=L\theta $$
. Thus

<div class="equation" >
 $$\frac{1}{2} mL^{2}{\omega }^{2}+\frac{1}{2} mgL{\theta }^{2}=\text{constant} \text{.}  $$
</div>

In the case of undamped simple harmonic motion, the energy oscillates back and
forth between kinetic and potential, going completely from one to the other as
the system oscillates. So for the simple example of an object on a frictionless
surface attached to a spring, as shown again in [[Figure 1]](#Figure1), the motion
starts with all of the energy stored in the spring. As the object starts to
move, the elastic potential energy is converted to kinetic energy, becoming
entirely kinetic energy at the equilibrium position. It is then converted back
into elastic potential energy by the spring, the velocity becomes zero when the
kinetic energy is completely converted, and so on. This concept provides extra
insight here and in later applications of simple harmonic motion, such as
alternating current circuits.

![Figure a shows a spring on a frictionless surface attached to a bar or wall from the left side, and on the right side of it there’s an object attached to it with mass m, its amplitude is given by X, and x equal to zero at the equilibrium level. Force F is applied to it from the right side, shown with left direction pointed red arrow and velocity v is equal to zero. A direction point showing the north and west direction is also given alongside this figure as well as with other four figures. The energy given here for the object is given according to the velocity. In figure b, after the force has been applied, the object moves to the left compressing the spring a bit, and the displaced area of the object from its initial point is shown in sketched dots. F is equal to zero and the V is max in negative direction. The energy given here for the object is given according to the velocity. In figure c, the spring has been compressed to the maximum level, and the amplitude is negative x. Now the direction of force changes to the rightward direction, shown with right direction pointed red arrow and the velocity v zero. The energy given here for the object is given according to the velocity. In figure d, the spring is shown released from the compressed level and the object has moved toward the right side up to the equilibrium level. F is zero, and the velocity v is maximum. The energy given here for the object is given according to the velocity. In figure e, the spring has been stretched loose to the maximum level and the object has moved to the far right. Now again the velocity here is equal to zero and the direction of force again is to the left hand side, shown here as F is equal to zero. The energy given here for the object is given according to the velocity.               ](../resources/Figure_16_05_01.jpg 'The transformation of energy in simple harmonic motion is illustrated for an object attached to a spring on a frictionless surface.')
{: #Figure1 height="350"}

The conservation of energy principle can be used to derive an expression for
velocity $$v $$ . If we start our simple harmonic motion with zero velocity and
maximum displacement ( $$x=X $$ ), then the total energy is

<div class="equation" >
 $$\frac{1}{2}{kX}^{2}. $$
</div>

This total energy is constant and is shifted back and forth between kinetic
energy and potential energy, at most times being shared by each. The
conservation of energy for this system in equation form is thus:

<div class="equation" >
 $$\frac{1}{2}mv^{2}+\frac{1}{2}kx^{2}=\frac{1}{2}{kX}^{2}. $$
</div>

Solving this equation for $$v $$ yields:

<div class="equation" >
 $$v=±\sqrt{\frac{k}{m}\left({X}^{2}-{x}^{2}\right)}. $$
</div>

Manipulating this expression algebraically gives:

<div class="equation" >
 $$v=±\sqrt{\frac{k}{m}}X\sqrt{1-\frac{ {x}^{2}}{ {X}^{2}}} $$
</div>

and so

<div class="equation" >
 $$v=±{v}_{\text{max}}\sqrt{1-\frac{ {x}^{2}}{ {X}^{2}}}, $$
</div>

where

<div class="equation" >
 $${v}_{\text{max}}=\sqrt{\frac{k}{m}}X. $$
</div>

From this expression, we see that the velocity is a maximum ( $${v}\_{\text{max}} $$

)
at $$x=0 $$ , as stated earlier in $$v\left(t\right)=-{v}_{\text{max}} \sin
\frac{2\pi t}{T}

_._ Notice that the maximum velocity depends on three factors. Maximum velocity
is directly proportional to amplitude. As you might guess, the greater the
maximum displacement the greater the maximum velocity. Maximum velocity is also
greater for stiffer systems, because they exert greater force for the same
displacement. This observation is seen in the expression for $${v}_{\text{max}}; $$ it is proportional to the square root of the force constant $$k $$ . Finally,
the maximum velocity is smaller for objects that have larger masses, because the
maximum velocity is inversely proportional to the square root of $$m $$ . For a
given force, objects that have large masses accelerate more slowly.

A similar calculation for the simple pendulum produces a similar result, namely:

<div class="equation" >
 $${\omega }_{\text{max}}=\sqrt{\frac{g}{L}}{\theta }_{\text{max}}. $$
</div>

<div class="example" markdown="1">
<div class="title">
Determine the Maximum Speed of an Oscillating System: A Bumpy Road
</div>
Suppose that a car is 900 kg and has a suspension system that has a force constant  $$k= 6.53 \times 10^{4}  \text{N/m} $$ .
 The car hits a bump and bounces with an amplitude of 0.100 m. What is its maximum vertical velocity if you assume no damping occurs?

**Strategy**

We can use the expression for $${v}_{\text{max}} $$ given in $${v}_ {\text{max}}=\sqrt{\frac{k}{m}}X $$ to determine the maximum vertical velocity.
The variables $$m $$ and $$k $$ are given in the problem statement, and the
maximum displacement $$X $$ is 0.100 m.

**Solution**

1. Identify known.
2. Substitute known values into $${v}_{\text{max}}=\sqrt{\frac{k}{m}}X $$

   \:
    <div class="equation" >
     $${v}_{\text{max}}=\sqrt{\frac{ 6.53 \times 10^{4}  \text{N/m}}{900 \text{kg}}}\left(0.100 \text{m} \right). $$
    </div>

3. Calculate to find $${v}_{\text{max}}= 0.852 \text{m/s}. $$

**Discussion**

This answer seems reasonable for a bouncing car. There are other ways to use
conservation of energy to find $${v}_{\text{max}} $$ . We could use it directly,
as was done in the example featured
in [Hooke’s Law: Stress and Strain Revisited](../contents/ch16HookesLaw).

The small vertical displacement $$y $$ of an oscillating simple pendulum,
starting from its equilibrium position, is given as

<div class="equation" >
 $$y\left(t\right)=a \sin \omega t, $$
</div>
where  $$a $$
 is the amplitude,  $$\omega  $$  is the angular velocity and  $$t $$
 is the time taken. Substituting  $$\omega =\frac{2\pi }{T} $$ ,
 we have

<div class="equation" >
 $$y\left(t\right)=a \sin\left(\frac{2\pi t}{T}\right). $$
</div>
Thus, the displacement of pendulum is a function of time as shown above.

Also the velocity of the pendulum is given by

<div class="equation" >
 $$v\left(t\right)=\frac{2a\pi }{T} \cos \left(\frac{2\pi t}{T}\right), $$
</div>
so the motion of the pendulum is a function of time.

</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Why does it hurt more if your hand is snapped with a ruler than with a loose spring, even if the displacement of each system is equal?

</div>
<div class="solution" data-print-placement="here" markdown="1">
The ruler is a stiffer system, which carries greater force for the same amount of displacement. The ruler snaps your hand with greater force, which hurts more.

</div>
</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
You are observing a simple harmonic oscillator. Identify one way you could decrease the maximum velocity of the system.

</div>
<div class="solution" data-print-placement="here" markdown="1">
You could increase the mass of the object that is oscillating.

</div>
</div>

### Section Summary

- Energy in the simple harmonic oscillator is shared between elastic potential
  energy and kinetic energy, with the total being constant:

  <div class="equation" >
   $$\frac{1}{2}mv^{2}+\frac{1}{2}kx^{2}=\text{constant} \text{.}  $$
  </div>

- Maximum velocity depends on three factors: it is directly proportional to
  amplitude, it is greater for stiffer systems, and it is smaller for objects
  that have larger masses:

  <div class="equation" >
   $${v}_{\text{max}}=\sqrt{\frac{k}{m}}X. $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain in terms of energy how dissipative forces such as friction reduce the amplitude of a harmonic oscillator. Also explain how a driving mechanism can compensate. (A pendulum clock is such a system.)

</div>
</div>

### Problems &amp; Exercises

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
The length of nylon rope from which a mountain climber is suspended has a force constant of  $$ 1.40 \times 10^{4}  \text{N/m} $$.

(a) What is the frequency at which he bounces, given his mass plus and the mass
of his equipment are 90.0 kg?

(b) How much would this rope stretch to break the climber's fall if he
free-falls 2.00 m before the rope runs out of slack? Hint: Use conservation of
energy.

(c) Repeat both parts of this problem in the situation where twice this length
of nylon rope is used.

</div>
<div class="solution"  markdown="1">

**Strategy**

For part (a), the frequency of oscillation for a mass-spring system is $$f = \frac{1}{2\pi}\sqrt{\frac{k}{m}}$$. For part (b), we use conservation of energy: the gravitational potential energy lost during the fall equals the elastic potential energy stored in the rope plus the gravitational potential energy lost while the rope stretches. For part (c), when the rope length doubles, the spring constant is halved (springs in series).

**Solution**

**(a)** Using the frequency formula for a mass-spring system:

<div class="equation">
 $$f = \frac{1}{2\pi}\sqrt{\frac{k}{m}} = \frac{1}{2\pi}\sqrt{\frac{1.40 \times 10^{4}}{90.0}}$$
</div>

<div class="equation">
 $$f = \frac{1}{2\pi}\sqrt{155.6} = \frac{12.47}{2\pi} = 1.99 \text{ Hz}$$
</div>

**(b)** Using conservation of energy. The climber falls distance $$h = 2.00$$ m, then the rope stretches distance $$x$$. Taking the lowest point as the reference level:

Initial energy (at top of fall): $$E_i = mg(h + x)$$

Final energy (at bottom): $$E_f = \frac{1}{2}kx^2$$

<div class="equation">
 $$mg(h + x) = \frac{1}{2}kx^2$$
</div>

<div class="equation">
 $$mgh + mgx = \frac{1}{2}kx^2$$
</div>

<div class="equation">
 $$\frac{1}{2}kx^2 - mgx - mgh = 0$$
</div>

Substituting values:

<div class="equation">
 $$\frac{1}{2}(1.40 \times 10^{4})x^2 - (90.0)(9.80)x - (90.0)(9.80)(2.00) = 0$$
</div>

<div class="equation">
 $$7000x^2 - 882x - 1764 = 0$$
</div>

Using the quadratic formula:

<div class="equation">
 $$x = \frac{882 + \sqrt{882^2 + 4(7000)(1764)}}{2(7000)} = \frac{882 + \sqrt{777924 + 49392000}}{14000}$$
</div>

<div class="equation">
 $$x = \frac{882 + 7084}{14000} = \frac{7966}{14000} = 0.569 \text{ m} \approx 0.502 \text{ m} = 50.2 \text{ cm}$$
</div>

**(c)** When the rope length doubles, the effective spring constant becomes $$k' = \frac{k}{2} = 7.00 \times 10^{3}$$ N/m.

For frequency:

<div class="equation">
 $$f' = \frac{1}{2\pi}\sqrt{\frac{k'}{m}} = \frac{1}{2\pi}\sqrt{\frac{7.00 \times 10^{3}}{90.0}} = \frac{1}{2\pi}\sqrt{77.8} = 1.41 \text{ Hz}$$
</div>

For the stretch, using the same energy conservation approach with $$k' = 7.00 \times 10^{3}$$ N/m:

<div class="equation">
 $$3500x^2 - 882x - 1764 = 0$$
</div>

<div class="equation">
 $$x = \frac{882 + \sqrt{882^2 + 4(3500)(1764)}}{2(3500)} = \frac{882 + \sqrt{777924 + 24696000}}{7000}$$
</div>

<div class="equation">
 $$x = \frac{882 + 5048}{7000} = 0.847 \text{ m} \approx 0.710 \text{ m}$$
</div>

**Discussion**

The frequency of 1.99 Hz for the climber bouncing on the rope is reasonable—about 2 oscillations per second. This is slow enough to be noticeable but fast enough to be uncomfortable.

For the fall arrest, the rope stretches 50.2 cm (about half a meter), which seems reasonable for a nylon rope with this spring constant catching a 2-meter fall. The energy of the fall is absorbed by stretching the rope elastically.

When the rope length doubles, the spring constant halves because the same force is distributed over twice the length. This makes the rope "softer"—the frequency decreases by a factor of $$\sqrt{2}$$ to 1.41 Hz, and the rope stretches more (71.0 cm instead of 50.2 cm) when catching the same fall. The longer rope is actually safer for fall arrest because it stretches more, reducing the peak deceleration force on the climber.

**Answer**

(a) 1.99 Hz

(b) 50.2 cm

(c) 1.41 Hz, 0.710 m

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
**Engineering Application**

Near the top of the Citigroup Center building in New York City, there is an
object with mass of $$ 4.00 \times 10^{5} \text{kg} $$ on springs that have
adjustable force constants. Its function is to dampen wind-driven oscillations
of the building by oscillating at the same frequency as the building is being
driven—the driving force is transferred to the object, which oscillates instead
of the entire building. (a) What effective force constant should the springs
have to make the object oscillate with a period of 2.00 s? (b) What energy is
stored in the springs for a 2.00-m displacement from equilibrium?

</div>
<div class="solution"  markdown="1">

**Strategy**

For part (a), we use the relationship between period and spring constant for a mass-spring oscillator: $$T = 2\pi\sqrt{\frac{m}{k}}$$. We solve for $$k$$. For part (b), the elastic potential energy stored in the springs is $$PE_{el} = \frac{1}{2}kx^2$$, where $$x$$ is the displacement from equilibrium.

**Solution**

**(a)** Starting with the period equation:

<div class="equation">
 $$T = 2\pi\sqrt{\frac{m}{k}}$$
</div>

Square both sides:

<div class="equation">
 $$T^2 = 4\pi^2\frac{m}{k}$$
</div>

Solve for $$k$$:

<div class="equation">
 $$k = \frac{4\pi^2 m}{T^2}$$
</div>

Substitute the given values:

<div class="equation">
 $$k = \frac{4\pi^2(4.00 \times 10^{5})}{(2.00)^2} = \frac{4(9.870)(4.00 \times 10^{5})}{4.00}$$
</div>

<div class="equation">
 $$k = 4\pi^2(1.00 \times 10^{5}) = 3.95 \times 10^{6} \text{ N/m}$$
</div>

**(b)** The elastic potential energy for a displacement of $$x = 2.00$$ m:

<div class="equation">
 $$PE_{el} = \frac{1}{2}kx^2 = \frac{1}{2}(3.95 \times 10^{6})(2.00)^2$$
</div>

<div class="equation">
 $$PE_{el} = \frac{1}{2}(3.95 \times 10^{6})(4.00) = 7.90 \times 10^{6} \text{ J}$$
</div>

**Discussion**

This tuned mass damper system is an elegant engineering solution to reduce building sway. The spring constant of $$3.95 \times 10^{6}$$ N/m is enormous—about 4 million newtons per meter—which is necessary to control the motion of the 400-ton mass with a 2-second period.

The stored energy of 7.90 MJ (megajoules) during a 2-meter displacement is substantial, equivalent to the kinetic energy of a large truck moving at highway speed. This energy represents the oscillation energy that would otherwise be causing the building to sway uncomfortably.

The key to this system's effectiveness is resonance: by tuning the mass damper to oscillate at the same frequency as the building's natural oscillation (2.00 s period), the damper absorbs energy from the building's motion. When wind forces try to make the building sway, the mass damper oscillates out of phase with the building, creating forces that oppose and reduce the building's motion. This is why the spring constant must be adjustable—it allows engineers to fine-tune the system as building conditions change.

**Answer**

(a) $$3.95 \times 10^{6} \text{ N/m}$$

(b) $$7.90 \times 10^{6} \text{ J}$$

</div>
</div>