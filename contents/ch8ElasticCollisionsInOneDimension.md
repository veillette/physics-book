---
title: "Elastic Collisions in One Dimension"
layout: page
---

<div class="abstract" markdown="1">
* Describe an elastic collision of two objects in one dimension.
* Define internal kinetic energy.
* Derive an expression for conservation of internal kinetic energy in a one dimensional collision.
* Determine the final velocities in an elastic collision given masses and initial velocities.

</div>

Let us consider various types of two-object collisions. These collisions are the
easiest to analyze, and they illustrate many of the physical principles involved
in collisions. The conservation of momentum principle is very useful here, and
it can be used whenever the net external force on a system is zero.

We start with the elastic collision of two objects moving along the same line—a
one-dimensional problem. An **elastic collision** is one that also conserves internal kinetic energy.
**Internal kinetic energy** is the sum
of the kinetic energies of the objects in the
system. [[Figure]](#import-auto-id1121320) illustrates an elastic collision in
which internal kinetic energy and momentum are conserved.

Truly elastic collisions can only be achieved with subatomic particles, such as
electrons striking nuclei. Macroscopic collisions can be very nearly, but not
quite, elastic—some kinetic energy is always converted into other forms of
energy such as heat transfer due to friction and sound. One macroscopic
collision that is nearly elastic is that of two steel blocks on ice. Another
nearly elastic collision is that between two carts with spring bumpers on an air
track. Icy surfaces and air tracks are nearly frictionless, more readily
allowing nearly elastic collisions on them.

<div class="note" data-label="" markdown="1">
<div class="title">
Elastic Collision
</div>
An **elastic collision** is one that conserves internal kinetic energy.

</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Internal Kinetic Energy
</div>

**Internal kinetic energy** is the sum of the kinetic energies of the objects in the system.

</div>

![The system of interest contains a smaller mass m sub1 and a larger mass m sub2 moving on a frictionless surface. M sub 2 moves with velocity V sub 2 and momentum p sub 2 and m sub 1 moves behind m sub 2, with velocity V sub 1 and momentum p sub 1 toward the right direction. P 1 plus P 2 equals p total. The net force is zero. After collision m sub 1 moves toward the left with velocity V sub 1 while m sub 2 moves toward the right with velocity V sub 2 on the same frictionless surface. The momentum of m sub 1 becomes p 1 prime and m 2 becomes p 2 prime now. P 1 prime plus p 2 prime equals p total.](../resources/Figure_09_04_01a.jpg "An elastic one-dimensional two-object collision. Momentum and internal kinetic energy are conserved.")
{: #import-auto-id1121320}

Now, to solve problems involving one-dimensional elastic collisions between two
objects we can use the equations for conservation of momentum and conservation
of internal kinetic energy. First, the equation for conservation of momentum for
two objects in a one-dimensional collision is

<div class="equation" id="eip-545">
 $$ p_{1}+p_{2}=p^{\prime}_{1}+p^{\prime}_{2}\left({F}_{\text{net}}=0\right) $$
</div>

or

<div class="equation" id="eip-485">
 $$ m_{1}v_{1}+m_{2}v_{2}=m_{1}v^{\prime}_{1}+m_{2}v^{\prime}_{2}\left({F}_{\text{net}}=0\right), $$
</div>

where the primes (\') indicate values after the collision. By definition, an
elastic collision conserves internal kinetic energy, and so the sum of kinetic
energies before the collision equals the sum after the collision. Thus,

<div class="equation" id="eip-940">
 $$ \frac{1}{2}m_{1}{ v_{1}}^{2}+\frac{1}{2}m_{2}{ v_{2}}^{2}=\frac{1}{2}m_{1}{ v^{\prime}_{1}}^{2}+\frac{1}{2}m_{2}{ v^{\prime}_{2}}^{2}\text{(two-object elastic collision)} $$
</div>

expresses the equation for conservation of internal kinetic energy in a
one-dimensional collision.

<div class="example" markdown="1">
<div class="title">
Calculating Velocities Following an Elastic Collision
</div>
Calculate the velocities of two objects following an elastic collision, given that

<div class="equation" id="eip-634">
 $$ m_{1}=0.500 \kg , m_{2}=3.50 \kg , v_{1}=4.00 \ms, \text{ and } v_{2}=0. $$
</div>

**Strategy and Concept**

First, visualize what the initial conditions mean—a small object strikes a
larger object that is initially at rest. This situation is slightly simpler than
the situation shown in [[Figure]](#import-auto-id1121320) where both objects are
initially moving. We are asked to find two unknowns (the final velocities $$
v^{\prime}_{1} $$ and $$ v^{\prime}_{2} $$).
To find two unknowns, we must use two independent equations. Because this
collision is elastic, we can use the above two equations. Both can be simplified
by the fact that object 2 is initially at rest, and thus $$ v_{2}=0 $$. Once we
simplify these equations, we combine them algebraically to solve for the
unknowns.

**Solution**

For this problem, note that $$ v_{2}=0 $$ and use conservation of momentum.
Thus,

<div class="equation" id="eip-773">
 $$ p_{1}=p^{\prime} {}_{1}+p^{\prime} {}_{2} $$
</div>
or

<div class="equation" id="eip-832">
 $$ m_{1}v_{1}=m_{1}v^{\prime}_{1}+m_{2}v^{\prime}_{2}. $$
</div>
Using conservation of internal kinetic energy and that $$ v_{2}=0 $$,

<div class="equation" id="eip-901">
 $$ \frac{1}{2} m_{1} v_{1}^{2}
=\frac{1}{2} m_{1} {v^{\prime}_{1}}^{2}+ \frac{1}{2}m_{2}{v^{\prime}_{2}}^{2}.
$$
</div>
Solving the first equation (momentum equation) for $$ v^{\prime}_{2} $$,
we obtain

<div class="equation" id="eip-436">
 $$ v^{\prime}_{2}=\frac{ m_{1}}{ m_{2}}\left(v_{1}-v^{\prime}_{1}\right). $$
</div>
Substituting this expression into the second equation (internal kinetic energy equation)
eliminates the variable $$ v^{\prime}_{2} $$, leaving only $$ v^{\prime}_{1} $$ as an unknown
(the algebra is left as an exercise for the reader). There are two solutions to any quadratic equation; in
this example, they are

<div class="equation" id="eip-464">
 $$ v^{\prime}_{1}=4.00 \ms $$
</div>
and

<div class="equation" id="eip-990">
 $$ v^{\prime}_{1}=-3.00 \ms . $$
</div>
As noted when quadratic equations were encountered in earlier chapters, both solutions may or may not be meaningful. In this case, the first solution is the same as the initial condition. The first solution thus represents the situation before the collision and is discarded. The second solution $$ \left(v^{\prime}_{1}=-3.00 \ms \right) $$

is negative, meaning that the first object bounces backward. When this negative
value of $$ v^{\prime}_{1} $$ is used to find the velocity of the second object
after the collision, we get

<div class="equation" id="eip-560">
 $$ v^{\prime}_{2}=\frac{ m_{1}}{ m_{2}}\left(v_{1}-v^{\prime}_{1}\right)=\frac{0.500 \kg }{3.50 \kg }\left[4.00-\left(-3.00\right)\right] \ms $$
</div>
or

<div class="equation" id="eip-819">
 $$ v^{\prime}_{2}=1.00 \ms . $$
</div>

**Discussion**

The result of this example is intuitively reasonable. A small object strikes a
larger one at rest and bounces backward. The larger one is knocked forward, but
with a low speed. (This is like a compact car bouncing backward off a full-size
SUV that is initially at rest.) As a check, try calculating the internal kinetic
energy before and after the collision. You will see that the internal kinetic
energy is unchanged at 4.00 J. Also check the total momentum before and after
the collision; you will find it, too, is unchanged.

The equations for conservation of momentum and internal kinetic energy as
written above can be used to describe any one-dimensional elastic collision of
two objects. These equations can be extended to more objects if needed.

</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Investigation—Ice Cubes and Elastic Collision
</div>
Find a few ice cubes which are about the same size and a smooth kitchen tabletop or a table with a glass top. Place the ice cubes on the surface several centimeters away from each other. Flick one ice cube toward a stationary ice cube and observe the path and velocities of the ice cubes after the collision. Try to avoid edge-on collisions and collisions with rotating ice cubes. Have you created approximately elastic collisions? Explain the speeds and directions of the ice cubes using momentum.

</div>

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Collision Lab
</div>
Investigate collisions on an air hockey table. Set up your own experiments: vary the number of discs, masses and initial conditions. Is momentum conserved? Is kinetic energy conserved? Vary the elasticity and see what happens.

<figure markdown="1">
<iframe src="https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_en.html" width="600" height="450"  allowfullscreen></iframe>
<figcaption>
Masses and Springs
</figcaption>

</figure>
</div>

### Section Summary

* An elastic collision is one that conserves internal
  kinetic energy.
* Conservation of kinetic energy and momentum
  together allow the final velocities to be calculated in terms of initial
  velocities and masses in one dimensional two-body collisions.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is an elastic collision?
</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two identical objects (such as billiard balls) have a one-dimensional collision in which one is initially motionless. After the collision, the moving object is stationary and the other moves with the same speed as the other originally had. Show that both momentum and kinetic energy are conserved.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Two manned satellites approach one another at a relative speed of 0.250 m/s,
intending to dock. The first has a mass of $$ 4.00 \times 10^{3}\kg $$,
and the second a mass of $$ 7.50 \times 10^{3}\kg $$. If the two
satellites collide elastically rather than dock, what is their final relative
velocity?

</div>
<div class="solution" markdown="1">
0.250 m/s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 70.0-kg ice hockey goalie, originally at rest, catches a 0.150-kg hockey puck slapped at him at a velocity of 35.0 m/s. Suppose the goalie and the ice puck have an elastic collision and the puck is reflected back in the direction from which it came. What would their final velocities be in this case?

</div>
</div>

<div class="glossary" markdown="1">

### Glossary
{: class="glossary-title"}

elastic collision
: a collision that also conserves internal kinetic energy


internal kinetic energy
: the sum of the kinetic energies of the objects in a system


</div>
