---
title: Damped Harmonic Motion
layout: page
sectionNumber: 7
chapterNumber: 16
---

::: abstract

- Compare and discuss underdamped and overdamped oscillating systems.
- Explain critically damped system.

:::

![In the figure shown, a small child is seated in a spring swing, tied with a belt at his waist. In the back is his father, who is pushing the swing in the to and fro motion.](../resources/Figure_16_07_01.jpg 'In order to counteract dampening forces, this dad needs to keep pushing the swing. (credit: Erik A. Johnson, Flickr)')
{: #Figure1}

A guitar string stops oscillating a few seconds after being plucked. To keep a
child happy on a swing, you must keep pushing. Although we can often make
friction and other non-conservative forces negligibly small, completely undamped
motion is rare. In fact, we may even want to damp oscillations, such as with car
shock absorbers.

For a system that has a small amount of damping, the period and frequency are
nearly the same as for simple harmonic motion, but the amplitude gradually
decreases as shown in [[Figure 2]](#Figure2). This occurs because the
non-conservative damping force removes energy from the system, usually in the
form of thermal energy. In general, energy removal by non-conservative forces is
described as

<div class="equation" >
 $${W}_{\text{nc}}=\Delta \left(\text{KE}+\text{PE}\right)\text{,} $$
</div>

where $${W}_{\text{nc}} $$ is work done by a non-conservative force (here the
damping force). For a damped harmonic oscillator, $${W}_{\text{nc}} $$ is
negative because it removes mechanical energy (KE + PE) from the system.

![Displacement x versus time t for a harmonic oscillator with a small amount of damping: x = X e^(−t/τ) cos(2πt/T). The amplitude, shown by the decaying envelope, slowly decreases, but the period T stays the same from cycle to cycle.](../resources/Figure_16_07_02.svg 'In this graph of displacement versus time for a harmonic oscillator with a small amount of damping, the amplitude slowly decreases, but the period and frequency are nearly the same as if the system were completely undamped.')
{: #Figure2}

If you gradually _increase_ the amount of damping in a system, the period and
frequency begin to be affected, because damping opposes and hence slows the back
and forth motion. (The net force is smaller in both directions.) If there is
very large damping, the system does not even oscillate—it slowly moves toward
equilibrium. [[Figure 3]](#Figure3) shows the displacement of a harmonic
oscillator for different amounts of damping. When we want to damp out
oscillations, such as in the suspension of a car, we may want the system to
return to equilibrium as quickly as possible. **Critical damping** is defined as
the condition in which the damping of an oscillator results in it returning as
quickly as possible to its equilibrium position. The critically damped system may
overshoot the equilibrium position, but if it does, it will do so only once.
Critical damping is represented by Curve A in [[Figure 3]](#Figure3). With
less-than critical damping, the system will return to equilibrium faster but
will overshoot and cross over one or more times. Such a system is **underdamped**; its displacement is represented by the curve
in [[Figure 2]](#Figure2). Curve B in [[Figure 3]](#Figure3) represents an **overdamped** system. As with critical damping, it too may overshoot the
equilibrium position, but will reach equilibrium over a longer period of time.

![Displacement x versus time t for two oscillators released from rest at X0. Curve A, critically damped, returns to equilibrium at x = 0 in the shortest possible time without overshooting. Curve B, overdamped, also returns without overshooting but takes longer.](../resources/Figure_16_07_03.svg 'Displacement versus time for a critically damped harmonic oscillator (A) and an overdamped harmonic oscillator (B). The critically damped oscillator returns to equilibrium at ( X=0 ) in the smallest time possible without overshooting.')
{: #Figure3}

Critical damping is often desired, because such a system returns to equilibrium
rapidly and remains at equilibrium as well. In addition, a constant force
applied to a critically damped system moves the system to a new equilibrium
position in the shortest time possible without overshooting or oscillating about
the new position. For example, when you stand on bathroom scales that have a
needle gauge, the needle moves to its equilibrium position without oscillating.
It would be quite inconvenient if the needle oscillated about the new
equilibrium position for a long time before settling. Damping forces can vary
greatly in character. Friction, for example, is sometimes independent of
velocity (as assumed in most places in this text). But many damping forces
depend on velocity—sometimes in complex ways, sometimes simply being
proportional to velocity.

::: example

<div class="title">
Damping an Oscillatory Motion: Friction on an Object Connected to a Spring
</div>

Damping oscillatory motion is important in many systems, and the ability to control the damping is even more so. This is generally attained using non-conservative forces such as the friction between surfaces, and viscosity for objects moving through fluids. The following example considers friction. Suppose a 0.200-kg object is connected to a spring as shown in [[Figure 4]](#Figure4), but there is simple friction between the object and the surface, and the coefficient of friction $${\mu }_{k} $$
is equal to 0.0800. (a) What is the frictional force between the surfaces? (b) What total distance does the object travel if it is released 0.100 m from equilibrium, starting at $$v=0 $$ ?
The force constant of the spring is $$k= 50.0 \text{N/m}  $$.

![Five stages of a block of mass m on a spring on a frictionless surface. (a) At x = X the block is at rest and all the energy is elastic potential energy, ½kX². (b) At x = 0 the spring force is zero and all the energy is kinetic energy, ½m(−v_max)². (c) At x = −X the block is at rest again and the energy is ½k(−X)². (d) At x = 0 moving the other way, the energy is ½mv_max². (e) Back at x = X, the energy is ½kX² once more. The total energy is the same at every stage.](../resources/Figure_16_07_04.svg 'The transformation of energy in simple harmonic motion is illustrated for an object attached to a spring on a frictionless surface.')
{: #Figure4}

**Strategy**

This problem requires you to integrate your knowledge of various concepts
regarding waves, oscillations, and damping. To solve an integrated concept
problem, you must first identify the physical principles involved. Part (a) is
about the frictional force. This is a topic involving the application of
Newton’s Laws. Part (b) requires an understanding of work and conservation of
energy, as well as some understanding of horizontal oscillatory systems.

Now that we have identified the principles we must apply in order to solve the
problems, we need to identify the knowns and unknowns for each part of the
question, as well as the quantity that is constant in Part (a) and Part (b) of
the question.

**Solution a**

1. Choose the proper equation: Friction is $$f={\mu }_{k}mg $$ .

2. Identify the known values.
3. Enter the known values into the equation:
   <div class="equation" >
   $$f=(0.0800)\left(0.200\text{kg}\right) \left( 9.80\text{m}/{\text{s}}^{2}\right). $$
   </div>

4. Calculate and convert units: $$f=0.157 \text{N}. $$

**Discussion a**

The force here is small because the system and the coefficients are small.

**Solution b**

Identify the known:

- The system involves elastic potential energy as the spring compresses and
  expands, friction that is related to the work done, and the kinetic energy as
  the body speeds up and slows down.
- Energy is not conserved as the mass oscillates because friction is a
  non-conservative force.
- The motion is horizontal, so gravitational potential energy does not need to
  be considered.
- Because the motion starts from rest, the energy in the system is initially
  $${\text{PE}}_{\text{el,i}}=\left(1/2\right)k{X}^{2} $$ . This energy
  is removed by work done by friction $${W}_{\text{nc}}=-fd $$ , where
  $$d $$ is the total distance traveled and $$f={\mu }_{\text{k}}mg $$ is the
  force of friction.
- The object stops for good when, at a turning point, the spring force can no
  longer overcome static friction. Taking the static coefficient equal to the
  kinetic one, that happens within $${x}_{\text{s}}={\mu }_{\text{k}}mg/k=3.14 \text{ mm} $$
  of $$x=0 $$, so the elastic energy left at the end is at most
  $$\left(1/2\right)k{x}_{\text{s}}^{2}=2.5 \times 10^{-4} \text{ J} $$, less than
  0.1% of the initial $$0.250 \text{ J} $$. We neglect it.

1. By equating the work done to the energy removed, solve for the distance $$d $$.

2. The work done by the non-conservative force equals the change in mechanical
   energy, which (to within 0.1%) is the loss of all the initial elastic energy:

   <div class="equation" >
    $${\text{W}}_{\text{nc}}=\Delta \left(\text{KE}+\text{PE}\right)\approx 0-{\text{PE}}_{\text{el,i}}=-\frac{1}{2}k{X}^{2}. $$
   </div>

3. Recall that $${W}_{\text{nc}}=-fd=-{\mu }_{\text{k}} mgd $$ .

4. Combine these two equations and solve for $$d $$:

   <div class="equation" >
    $$d=\frac{k{X}^{2}}{2{\mu }_{\text{k}}mg}. $$
   </div>

5. Enter the known values and calculate $$d $$:

   <div class="equation" >
    $$d=\frac{\left( 50.0 \text{N/m}\right){\left( 0.100 \text{m}\right)}^{2}}{2\left( 0.0800\right)\left( 0.200 \text{kg}\right)\left( 9.80 {\text{m/s}}^{2}\right)}= 1.59 \text{m}. $$
   </div>

**Discussion b**

This is the total distance traveled back and forth across $$x=0 $$ , which is
the undamped equilibrium position. With constant friction, each half-swing
reduces the amplitude by the same amount, $$2f/k=6.27 \text{ mm} $$. Starting
from 100 mm, the object makes 16 half-swings, about 8 oscillations, and stops
about 0.35 mm from $$x=0 $$; adding up the 16 half-swings gives 1.594 m,
confirming the energy result. The object generally does not stop exactly at
$$x=0 $$ for this type of damping force, because static friction can hold it
wherever the spring force is too weak to overcome it. This system is underdamped. In contrast, an overdamped system
with a simple constant damping force would not cross the equilibrium position
$$x=0 $$ a single time. For example, if this system had a friction force 20 times
greater, it would move only 0.0746 m toward the equilibrium position and stop
0.0254 m from $$x=0 $$, where static friction holds it.

This worked example illustrates how to apply problem-solving strategies to
situations that integrate the different concepts you have learned. The first
step is to identify the physical principles involved in the problem. The second
step is to solve for the unknowns using familiar problem-solving strategies.
These are found throughout the text, and many worked examples show how to use
them for single topics. In this integrated concepts example, you can see how to
apply them across several topics. You will find these techniques useful in
applications of physics outside a physics course, such as in your profession, in
other science disciplines, and in everyday life.

:::

   <div class="exercise" data-element-type="check-understanding" data-label="">
   <div class="title">
   Check Your Understanding
   </div>

::: problem

Why are completely undamped harmonic oscillators so rare?

:::

::: solution {"class":"solution","data-print-placement":"here"}

Friction often comes into play whenever an object is moving. Friction causes damping in a harmonic oscillator.

:::

   </div>

   <div class="exercise" data-element-type="check-understanding" data-label="">
   <div class="title">
   Check Your Understanding
   </div>

::: problem

Describe the difference between overdamping, underdamping, and critical damping.

:::

::: solution {"class":"solution","data-print-placement":"here"}

An overdamped system moves slowly toward equilibrium. An underdamped system moves quickly to equilibrium, but will oscillate about the equilibrium point as it does so. A critically damped system moves as quickly as possible toward equilibrium without oscillating about the equilibrium.

:::

   </div>

### Section Summary

- Damped harmonic oscillators have non-conservative forces that dissipate their
  energy.
- Critical damping returns the system to equilibrium as fast as possible without
  overshooting.
- An underdamped system will oscillate through the equilibrium position.
- An overdamped system moves more slowly toward equilibrium than one that is
  critically damped.

### Conceptual Questions

   <div class="exercise" data-element-type="conceptual-questions">

::: problem

Give an example of a damped harmonic oscillator. (They are more common than undamped or simple harmonic oscillators.)

:::

::: solution

**Strategy**

Choose an oscillator with a restoring force and an energy-loss mechanism.

**Solution**

A car’s suspension after a bump is a damped oscillator. Springs provide the restoring force, the vehicle body supplies inertia, and shock absorbers dissipate mechanical energy through fluid motion and friction. The displacement approaches its equilibrium value instead of continuing with constant amplitude.

**Discussion**

Depending on damping strength, the return may include oscillations or occur without them. A spring-supported car body with shock absorbers is a practical example of a damped harmonic-oscillator system.

:::

   </div>

   <div class="exercise" data-element-type="conceptual-questions">

::: problem

How would a car bounce after a bump under each of these conditions?

- overdamping
- underdamping
- critical damping

:::

::: solution

**Strategy**

Compare the damping strength with the critical value for the suspension mode.

**Solution**

With overdamping, the car returns slowly toward equilibrium without repeated bouncing. With underdamping, it overshoots equilibrium and bounces several times with decreasing amplitude. With critical damping, it returns as rapidly as possible without oscillation for the usual release-from-displacement comparison.

**Discussion**

Exact trajectories also depend on the initial velocity supplied by the bump. Overdamping gives a sluggish nonoscillatory return, underdamping gives decaying bounces, and critical damping provides the fastest nonoscillatory settling in the standard model.

:::

   </div>

   <div class="exercise" data-element-type="conceptual-questions">

::: problem

Most harmonic oscillators are damped and, if undriven, eventually come to a stop. How is this observation related to the second law of thermodynamics?

:::

::: solution

**Strategy**

Track mechanical energy and entropy together.

**Solution**

Damping transfers organized oscillatory motion into microscopic internal energy of the oscillator and surroundings. Total energy is conserved, but the mechanical energy available in the coherent oscillation decreases. Frictional dissipation generates entropy, so the oscillator plus surroundings evolve toward thermal equilibrium rather than spontaneously reconstructing a large coherent vibration.

**Discussion**

Thermal fluctuations can remain at equilibrium, but they are not the original macroscopic oscillation. The decay of an undriven damped oscillator is an example of the second law’s irreversible conversion of organized mechanical energy into internal energy.

:::

   </div>

### Problems &amp; Exercises

   <div class="exercise" data-element-type="problems-exercises">

::: problem

The amplitude of a lightly damped oscillator decreases by $$ 3.0%  $$
during each cycle. What percentage of the mechanical energy of the oscillator is lost in each cycle?

:::

::: solution

**Strategy**

The mechanical energy of a harmonic oscillator is proportional to the square of the amplitude: $$E = \frac{1}{2}kA^{2}$$. If the amplitude decreases by 3.0%, the new amplitude is 97.0% of the original. We calculate the energy after one cycle and find the percentage decrease.

**Solution**

Let the initial amplitude be $$A_0$$ and the initial energy be $$E_0 = \frac{1}{2}kA_{0}^2$$.

After one cycle, the amplitude decreases by 3.0%, so:

   <div class="equation">
   $$A_1 = A_0(1 - 0.030) = 0.970 A_0$$
   </div>

The energy after one cycle is:

   <div class="equation">
   $$E_1 = \frac{1}{2}kA_{1}^2 = \frac{1}{2}k(0.970 A_0)^2 = \frac{1}{2}k(0.9409)A_0^2$$
   </div>

   <div class="equation">
   $$E_1 = 0.9409 E_0$$
   </div>

The energy lost is:

   <div class="equation">
   $$\Delta E = E_0 - E_1 = E_0 - 0.9409 E_0 = 0.0591 E_0$$
   </div>

The percentage of energy lost is:

   <div class="equation">
   $$\frac{\Delta E}{E_0} \times 100\% = 5.91\% \approx 5.9\%$$
   </div>

**Approximately 5.9% of the mechanical energy is lost in each cycle.**

**Discussion**

The energy loss (5.9%) is nearly twice the amplitude loss (3.0%) because energy is proportional to the square of amplitude. This quadratic relationship is fundamental to understanding damped oscillations.

For lightly damped systems, this energy is dissipated primarily as heat through friction, air resistance, and other non-conservative forces. Over many cycles, the oscillator will gradually come to rest as all its mechanical energy is converted to thermal energy.

The fact that the energy decreases by about 6% per cycle means the oscillator loses roughly half its energy in about 12 cycles (since $$(0.94)^{12} \approx 0.47$$). This relatively slow decay is characteristic of light damping, which is why a plucked guitar string or a struck tuning fork can oscillate audibly for several seconds.

In contrast, a heavily damped system (like a car's shock absorbers) is designed to dissipate energy much more quickly to prevent prolonged oscillations.

:::

   </div>

::: glossary

### Glossary

{: class="glossary-title"}

critical damping
: the condition in which the damping of an oscillator causes it to return as
quickly as possible to its equilibrium position without oscillating back and
forth about this position

over damping
: the condition in which damping of an oscillator causes it to return to
equilibrium without oscillating; oscillator moves more slowly toward equilibrium
than in the critically damped system

under damping
: the condition in which damping of an oscillator causes it to return to
equilibrium with the amplitude gradually decreasing to zero; system returns to
equilibrium faster but overshoots and crosses the equilibrium position one or
more times

:::
