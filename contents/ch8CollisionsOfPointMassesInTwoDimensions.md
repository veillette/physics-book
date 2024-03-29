---
title: Collisions of Point Masses in Two Dimensions
layout: page
sectionNumber: 6
chapterNumber: 8
---

<div class="abstract" markdown="1">
* Discuss two dimensional collisions as an extension of one dimensional analysis.
* Define point masses.
* Derive an expression for conservation of momentum along x-axis and y-axis.
* Describe elastic collisions of two objects with equal mass.
* Determine the magnitude and direction of the final velocity given initial velocity, and scattering angle.

</div>

In the previous two sections, we considered only one-dimensional collisions;
during such collisions, the incoming and outgoing velocities are all along the
same line. But what about collisions, such as those between billiard balls, in
which objects scatter to the side? These are two-dimensional collisions, and we
shall see that their study is an extension of the one-dimensional analysis
already presented. The approach taken (similar to the approach in discussing
two-dimensional kinematics and dynamics) is to choose a convenient coordinate
system and resolve the motion into components along perpendicular axes.
Resolving the motion yields a pair of one-dimensional problems to be solved
simultaneously.

One complication arising in two-dimensional collisions is that the objects might
rotate before or after their collision. For example, if two ice skaters hook
arms as they pass by one another, they will spin in circles. We will not
consider such rotation until later, and so for now we arrange things so that no
rotation is possible. To avoid rotation, we consider only the scattering of
**point masses**—that is, structureless particles that cannot rotate or spin.

We start by assuming that $$ \vb{F}_{\text{net}}=0 $$, so that momentum $$
\vb{p} $$ is conserved. The simplest collision is one in which one of the
particles is initially at rest. (
See [Figure 1](#Figure1).) The best choice for a coordinate system is one with an
axis parallel to the velocity of the incoming particle, as shown
in [Figure 1](#Figure1). Because momentum is conserved, the components of momentum
along the $$ x $$- and $$ y $$-axes $$ \left( p_{x}\text{ and } p_{y}\right) $$
will also be conserved, but with the chosen coordinate system, $$ p_{y} $$ is
initially zero and $$ p_{x} $$ is the momentum of the incoming particle. Both
facts simplify the analysis. (   Even with the simplifying assumptions of point
masses, one particle initially at rest, and a convenient coordinate system, we
still gain new insights into nature from the analysis of two-dimensional
collisions.)

![A purple ball of mass m1 moves with velocity V 1 toward the right side along the X direction. The orange ball of mass m 2 is initially at rest. The total momentum is the momentum possessed by purple ball only. After collision purple ball moves with velocity v 1prime in the positive X Y plane making an angle theta 1 with the x axis and the orange ball moves in the X Y plane below the x axis making an angle theta 2 with the x axis. The total momentum would be the sum of the momentum of purple ball p1 prime and the orange ball p 2 prime. In two-dimensional collision too the momentum before and after collision remains the same.](../resources/Figure_08_06_01.jpg "A two-dimensional collision with the coordinate system chosen so that \( m_2 \) is initially at rest and \( v_1 \) is parallel to the \( x \) -axis. This coordinate system is sometimes called the laboratory coordinate system, because many scattering experiments have a target that is stationary in the laboratory, while particles are scattered from it to determine the particles that make-up the target and how they are bound together. The particles may not be observed directly, but their initial and final velocities are.")
{: #Figure1}

Along the $$ x $$ -axis, the equation for conservation of momentum is

<div class="equation">
 $$ p_{1x}+ p_{2x}=p^{\prime}_{1x}+p^{\prime}_{2x}. $$
</div>

Where the subscripts denote the particles and axes and the primes denote the
situation after the collision. In terms of masses and velocities, this equation
is

<div class="equation">
 $$ m_{1} v_{1x}+ m_{2} v_{2x}= m_{1}v^{\prime}_{1x}+ m_{2}v^{\prime}_{2x}. $$
</div>

But because particle 2 is initially at rest, this equation becomes

<div class="equation">
 $$ m_{1} v_{1x}= m_{1}v^{\prime}_{1x}+ m_{2}v^{\prime}_{2x}. $$
</div>

The components of the velocities along the $$ x $$ -axis have the form $$
v\cos{\theta} $$. Because particle 1 initially moves along the $$ x $$ -axis, we
find $$ v_{1x}= v_{1} $$.

Conservation of momentum along the $$ x $$ -axis gives the following equation:

<div class="equation">
 $$ m_{1} v_{1}= m_{1}v^{\prime}_{1}\cos{\theta_{1}}+ m_{2}v^{\prime}_{2}\cos{\theta_{2}}, $$
</div>

where $$\theta_{1} $$ and $$\theta_{2} $$ are as shown in [Figure 1](#Figure1).

<div class="note" data-label="">
<div class="title">
Conservation of Momentum along the \( x \) -axis
</div>
<div class="equation">
 $$ m_{1} v_{1}= m_{1}v^{\prime}_{1}\cos{\theta_{1}}+ m_{2}v^{\prime}_{2}\cos{\theta_{2}} $$
</div>
</div>

Along the $$ y $$ -axis, the equation for conservation of momentum is

<div class="equation">
 $$ p_{1y}+ p_{2y}=p^{\prime}_{1y}+p^{\prime}_{2y} $$
</div>

or

<div class="equation">
 $$ m_{1} v_{1y}+ m_{2} v_{2y}= m_{1}v^{\prime}_{1y}+ m_{2}v^{\prime}_{2y}. $$
</div>

But $$ v_{1y} $$ is zero, because particle 1 initially moves along the $$ x $$
-axis. Because particle 2 is initially at rest, $$ v_{2y} $$ is also zero. The
equation for conservation of momentum along the $$ y $$ -axis becomes

<div class="equation">
 $$ 0= m_{1}v^{\prime}_{1y}+ m_{2}v^{\prime}_{2y}. $$
</div>

The components of the velocities along the $$ y $$ -axis have the form $$
v\sin{\theta} $$.

Thus, conservation of momentum along the $$ y $$ -axis gives the following
equation:

<div class="equation">
 $$ 0= m_{1}v^{\prime}_{1}\sin{\theta_{1}}+ m_{2}v^{\prime}_{2}\sin{\theta_{2}}. $$
</div>

<div class="note" data-label="">
<div class="title">
Conservation of Momentum along the \( y \) -axis
</div>
<div class="equation">
 $$ 0= m_{1}v^{\prime}_{1}\sin{\theta_{1}}+ m_{2}v^{\prime}_{2}\sin{\theta_{2}} $$
</div>
</div>

The equations of conservation of momentum along the $$ x $$ -axis and $$ y $$
-axis are very useful in analyzing two-dimensional collisions of particles,
where one is originally stationary (a common laboratory situation). But two
equations can only be used to find two unknowns, and so other data may be
necessary when collision experiments are used to explore nature at the subatomic
level.

<div class="example" id="example1" markdown="1">
<div class="title">
Determining the Final Velocity of an Unseen Object from the Scattering of Another Object
</div>
Suppose the following experiment is performed. A 0.250-kg object
$$ \left( m_{1}\right) $$ is slid on a frictionless surface into a dark room, where it strikes an
initially stationary object with mass of 0.400 kg $$ \left( m_{2}\right) $$.
The 0.250-kg object emerges from the room at an angle of $$ 45.0^\circ $$ with its incoming direction.

The speed of the 0.250-kg object is originally 2.00 m/s and is 1.50 m/s after
the collision. Calculate the magnitude and direction of the velocity ($$
v^{\prime}_{2} $$ and $$\theta_{2} $$)  of the 0.400-kg object after the
collision.

**Strategy**

Momentum is conserved because the surface is frictionless. The coordinate system
shown in [Figure 2](#Figure2) is one in which $$ m_{2} $$ is originally at rest and
the initial velocity is parallel to the $$ x $$ -axis, so that conservation of
momentum along the $$ x $$ - and $$ y $$ -axes is applicable.

Everything is known in these equations except $$ v^{\prime}_{2} $$ and $$\theta_
{2} $$, which are precisely the quantities we wish to find. We can find two
unknowns because we have two independent equations: the equations describing the
conservation of momentum in the $$ x $$- and $$ y $$ -directions.

**Solution**

Solving $$ m_{1} v_{1}= m_{1}v^{\prime}_{1}\cos{\theta }_{1}+ m_{2}v^{\prime}_
{2}\cos{\theta }_{2} $$ for $$ v_{2}^{\prime }\cos{\theta_{2}} $$ and $$ 0= m_
{1}v^{\prime}_{1}\sin{\theta }_{1}+ m_{2}v^{\prime}_{2}\sin{\theta }_{2} $$ for
$$ v^{\prime}_{2}\sin{\theta }_{2} $$ and taking the ratio yields an equation (
in which $$ \theta_2 $$ is the only unknown quantity. Applying the identity $$
\left(\tan{\theta} =\frac{ \sin{\theta} }{\cos{\theta} }\right) $$, we obtain:

<div class="equation">
 $$ \tan{\theta_{2}}=\frac{ v^{\prime}_{1}\sin{\theta_{1}}}{ v^{\prime}_{1}\cos{\theta_{1}}- v_{1}}. $$
</div>
Entering known values into the previous equation gives

<div class="equation">
 $$ \tan{\theta_{2}}=\frac{ \left(1.50 \ms \right)\left(0.7071\right)}{\left(1.50 \ms \right)\left(0.7071\right)-2.00 \ms }=-1.129. $$
</div>
Thus,

<div class="equation">
 $$\theta_{2}={\tan}^{-1}\left(-1.129\right)=311.5^\circ \approx 312^\circ. $$
</div>
Angles are defined as positive in the counter clockwise direction, so this angle indicates that $$ m_{2} $$ is scattered to the right in [Figure 2](#Figure2), as expected (
this angle is in the fourth quadrant). Either equation for the $$ x $$- or
$$ y $$-axis can now be used to solve for $$ v^{\prime}_{2} $$, but the latter
equation is easiest because it has fewer terms.

<div class="equation">
 $$ v^{\prime}_{2}=-\frac{ m_{1}}{ m_{2}}v^{\prime}_{1}\frac{ \sin{\theta_{1}}}{\sin{\theta_{2}}} $$
</div>
Entering known values into this equation gives

<div class="equation">
 $$ v^{\prime}_{2}=-\left(\frac{0.250\kg }{0.400\kg }\right)\left(1.50 \ms \right)\left(\frac{0.7071}{-0.7485}\right). $$
</div>
Thus,

<div class="equation">
 $$ v^{\prime}_{2}=0.886 \ms . $$
</div>

**Discussion**

It is instructive to calculate the internal kinetic energy of this two-object
system before and after the collision. (
This calculation is left as an end-of-chapter problem.) If you do this
calculation, you will find that the internal kinetic energy is less after the
collision, and so the collision is inelastic. This type of result makes a
physicist want to explore the system further.

</div>

![A purple ball of mass m1 and velocity v one moves in the right direction into a dark room. It collides with an object of mass m two of value zero point four zero milligrams which was initially at rest and then leaves the dark room from the top right hand side making an angle of forty-five degrees with the horizontal and at velocity v one prime. The net external force on the system is zero. The momentum before and after collision remains the same. The velocity v two prime of the mass m two and the angle theta two it would make with the horizontal after collision not given.](../resources/Figure_08_06_02.jpg "A collision taking place in a dark room is explored in  <a href="#example1">Example 1</a>. The incoming object \( m_1 \) is scattered by an initially stationary object. Only the stationary object&#x2019;s mass \( m_2 \) is known. By measuring the angle and speed at which \( m_1 \) emerges from the room, it is possible to calculate the magnitude and direction of the initially stationary object&#x2019;s velocity after the collision.")
{: #Figure2}

### Elastic Collisions of Two Objects with Equal Mass

Some interesting situations arise when the two colliding objects have equal mass
and the collision is elastic. This situation is nearly the case with colliding
billiard balls, and precisely the case with some subatomic particle collisions.
We can thus get a mental image of a collision of subatomic particles by thinking
about billiards (or pool)
. (Refer to [Figure 1](#Figure1) for masses and angles.) First, an elastic
collision conserves internal kinetic energy. Again, let us assume object 2 $$
\left( m_{2}\right) $$ is initially at rest. Then, the internal kinetic energy
before and after the collision of two objects that have equal masses is

<div class="equation">
 $$ \frac{1}{2}m v_{1}^{2}=\frac{1}{2}{ m {v^{\prime}}_{1}}^{2}+\frac{1}{2}{ m {v^{\prime} }_{2}}^{2}. $$
</div>

Because the masses are equal, $$ m_{1}=m_{2}=m $$. Algebraic manipulation (left
to the reader) of conservation of momentum in the $$ x $$- and $$ y $$
-directions can show that

<div class="equation">
 $$ \frac{1}{2} m v_{1}^{2}=\frac{1}{2}{ m {v^{\prime} }_{1}}^{2}+\frac{1}{2}{ m {v^{\prime} }_{2}}^{2}+{mv^{\prime} }_{1}v^{\prime}_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right). $$
</div>

(Remember that $$\theta_{2} $$ is negative here.) The two preceding equations
can both be true only if

<div class="equation">
 $$ mv^{\prime}_{1}v^{\prime}_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right)=0. $$
</div>

There are three ways that this term can be zero. They are

* $$ v^{\prime}_{1}=0 $$: head-on collision; incoming ball stops

* $$ v^{\prime}_{2}=0 $$: no collision; incoming ball continues unaffected

* $$ \cos\left({\theta_{1}}-{\theta_{2}}\right)=0 $$: angle of separation $$
  \left({\theta_{1}}-{\theta_{2}}\right) $$ is $$ 90^\circ $$ after the
  collision

All three of these ways are familiar occurrences in billiards and pool, although
most of us try to avoid the second. If you play enough pool, you will notice
that the angle between the balls is very close to $$ 90^\circ $$ after the
collision, although it will vary from this value if a great deal of spin is
placed on the ball. (Large spin carries in extra energy and a quantity called
*angular momentum*, which must also be conserved.) The assumption that the
scattering of billiard balls is elastic is reasonable based on the correctness
of the three results it produces. This assumption also implies that, to a good
approximation, momentum is conserved for the two-ball system in billiards and
pool. The problems below explore these and other characteristics of
two-dimensional collisions.

<div class="note" data-label="" markdown="1">
<div class="title">
Connections to Nuclear and Particle Physics
</div>
Two-dimensional collision experiments have revealed much of what we know about
subatomic particles. Ernest Rutherford, for example, discovered the nature of
the atomic nucleus from such experiments.

</div>

### Section Summary

* The approach to two-dimensional collisions is to choose a convenient
  coordinate system and break the motion into components along perpendicular
  axes. Choose a coordinate system with the $$ x $$ -axis parallel to the
  velocity of the incoming particle.
* Two-dimensional collisions of point masses where mass 2 is initially at rest
  conserve momentum along the initial direction of mass 1 (the $$ x $$ -axis),
  stated by $$ m_{1} v_{1} = m_{1} v^{\prime}_{1} \cos{\theta }_{1}+m_
  {2}v^{\prime}_{2} \cos{\theta }_{2} $$ and along the direction perpendicular
  to the initial direction (the $$ y $$ -axis) stated by $$ 0= m_{1}v^{\prime}_
  {1y}+m_{2}v^{\prime}_{2y} $$.
* The internal kinetic before and after the collision of two objects that have
  equal masses is
  <div class="equation">
    $$ \frac{1}{2} m v_{1}^{2}= \frac{1}{2} m{v^{\prime}}_{1}^{2}+ \frac{1}{2}
m{v^{\prime}_{2}}^{2}+ mv^{\prime}_{1} v^{\prime}_{2} \cos{\left( \theta_
{1}-\theta_{2} \right) }. $$
  </div>

* Point masses are structureless particles that cannot spin.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
[Figure 3](#Figure3) shows a cube at rest and a small object heading toward it.
(a) Describe the directions (angle $$\theta_{1} $$)
at which the small object can emerge after colliding elastically with the
cube. How does $$\theta_{1} $$ depend on $$ b $$, the so-called impact
parameter? Ignore any effects that might be due to rotation after the collision,
and assume that the cube is much more massive than the small object.
(b) Answer the same questions if the small object instead collides with a massive sphere.

![A ball m one moves horizontally to the right with speed v one. It will collide with a stationary square labeled capital m two that is rotated at approximately forty-five degrees. The point of impact is on a face of the square a distance b above the center of the square. After the collision the ball is shown heading off at an angle theta one above the horizontal with a speed v one prime. The square remains essentially stationary (v 2 prime is approximately zero).](../resources/Figure_08_06_03.jpg "A small object approaches a collision with a much more massive cube, after which its velocity has the direction \( \theta_1 \). The angles at which the small object can be scattered are determined by the shape of the object it strikes and the impact parameter \( b \). ")
{: #Figure3}

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two identical pucks collide on an air hockey table. One puck was originally at rest.
(a) If the incoming puck has a speed of 6.00 m/s and scatters to an angle of $$ 30.0^\circ $$,
what is the velocity (magnitude and direction) of the second puck? (You may use
the result that $$ \theta_{1}-\theta_{2}=90^\circ $$
for elastic collisions of objects that have identical masses.)
(b) Confirm that the collision is elastic.

</div>
<div class="solution" markdown="1">
(a) 3.00 m/s, $$ 60^\circ $$ below $$ x $$ -axis

(b) Find speed of first puck after collision:
$$ 0=m v^{\prime}_{1} \sin{30^\circ}-m v^{\prime}_{2}\sin{ 60^\circ }⇒
v^{\prime}_{1}=v^{\prime}_{2}\frac{ \sin{ 60^\circ}}{\sin{ 30^\circ }}= 5.196
\ms $$ 

Verify that ratio of initial to final KE equals one:
$$  \left. \begin{array}{l} \KE=\frac{1}{2} m v_{1}^{2}=18 \text{mJ}\\
\KE=\frac{1}{2} m {v^{\prime}_{1}}^{2}+\frac{1}{2} m {v^{\prime}_{2}}^{2}
=18\text{mJ} \end{array} \right\} $$ 
$$\frac{\KE}{\KE^\prime}=1.00 $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Confirm that the results of the [Example 1](#example1) do conserve momentum in
both the $$ x $$- and $$ y $$-directions.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 3000-kg cannon is mounted so that it can recoil only in the horizontal direction.
(a) Calculate its recoil velocity when it fires a 15.0-kg shell at 480 m/s at an angle of $$ 20.0^\circ $$
above the horizontal.
(b) What is the kinetic energy of the cannon? This energy
is dissipated as heat transfer in shock absorbers that stop its recoil.
(c) What happens to the vertical component of momentum that is imparted to the cannon
when it is fired?

</div>
<div class="solution" markdown="1">
(a) $$ -2.26 \ms $$

(b) $$ 7.63\times 10^{3} \J $$

(c) The ground will exert a normal force to oppose recoil of the cannon in the
vertical direction. The momentum in the vertical direction is transferred to the
earth. The energy is transferred into the ground, making a dent where the cannon
is. After long barrages, cannon have erratic aim because the ground is full of
divots.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

A 5.50-kg bowling ball moving at 9.00 m/s collides with a 0.850-kg bowling pin,
which is scattered at an angle of $$ 85.0^\circ $$ to the initial direction of
the bowling ball and with a speed of 15.0 m/s.
(a) Calculate the final velocity (magnitude and direction) of the bowling ball.
(b) Is the collision elastic?
(c) Linear kinetic energy is greater after the collision. Discuss how spin on
the ball might be converted to linear kinetic energy in the collision.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Ernest Rutherford (the first New Zealander to be awarded the Nobel Prize in
Chemistry) demonstrated that nuclei were very small and dense by scattering
helium-4 nuclei $$ \left({}^{4}\text{He}\right) $$ from gold-197 nuclei $$
\left({}^{197}\text{Au}\right) $$. The energy of the incoming helium nucleus was
$$ 8.00\times 10^{-13} \J $$, and the masses of the helium and gold nuclei were
$$ 6.68\times 10^{-27}\kg $$ and $$ 3.29\times 10^{-25}\kg $$, respectively (
note that their mass ratio is 4 to 197).
(a) If a helium nucleus scatters to an angle of $$ 120^\circ $$ during an
elastic collision with a gold nucleus, calculate the helium nucleus’s final
speed and the final velocity (
magnitude and direction) of the gold nucleus.
(b) What is the final kinetic energy of the helium nucleus?

</div>
<div class="solution" markdown="1">
(a) $$ 5.36\times 10^{5} \ms $$

at $$ -29.5^\circ $$
(b) $$ 7.52\times 10^{-13} \J $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Two cars collide at an icy intersection and stick together afterward. The first
car has a mass of 1200 kg and is approaching at $$ 8.00 \ms $$ due south. The
second car has a mass of 850 kg and is approaching at $$ 17.0 \ms $$ due west.
(a) Calculate the final velocity (magnitude and direction) of the cars.
(b) How much kinetic energy is lost in the collision? (This energy goes into
deformation of the cars.) Note that because both cars have an initial velocity,
you cannot use the equations for conservation of momentum along the *
$$ x $$
*-axis and $$ y $$ -axis; instead, you must look for other simplifying aspects.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Starting with equations $$ m_{1}v_{1}=m_{1}v^{\prime}_{1}\cos{\theta_{1}}+m_{2}v^{\prime}_{2}\cos{\theta_{2}} $$
and $$ 0=m_{1}v^{\prime}_{1}\sin{\theta_{1}}+m_{2}v^{\prime}_{2}\sin{\theta_{2}} $$
for conservation of momentum in the $$ x $$ - and $$ y $$ -directions
and assuming that one object is originally stationary, prove that
for an elastic collision of two objects of equal masses,

<div class="equation">
 $$ \frac{1}{2} m v_{1}^{2}=\frac{1}{2}{ m{v^{\prime}}_{1}}^{2}+\frac{1}{2}{ m {v^{\prime}}_{2}}^{2}+mv^{\prime}_{1}v^{\prime}_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right) $$
</div>
as discussed in the text.

</div>
<div class="solution"  markdown="1">
We are given that $$ m_{1}=m_{2}\equiv m $$. The given equations then become:

<div class="equation">
 $$ v_{1}=v_{1}\cos{\theta_{1}}+v_{2}\cos{\theta_{2}} $$
</div>
and

<div class="equation">
 $$ 0=v^{\prime}_{1}\sin{\theta_{1}}+v^{\prime}_{2}\sin{\theta_{2}}. $$
</div>
Square each equation to get

<div class="equation">
 $$ \begin{array}{lll}
v_{1}^{2}&=& { v^{\prime}_{1}}^{2}{\cos}^{2}{\theta_{1}}+{ v^{\prime}_{2}}^{2}{\cos}^{2}{\theta_{2}}+2v^{\prime}_{1}v^{\prime}_{2}\cos{\theta_{1}}\cos{\theta_{2}}\\
0 &=& { v^{\prime}_{1}}^{2}{\sin}^{2}{\theta_{1}}+{ v^{\prime}_{2}}^{2}{\sin}^{2}{\theta_{2}}+2v^{\prime}_{1}v^{\prime}_{2}\sin{\theta_{1}}\sin{\theta_{2}}.
\end{array} $$
</div>
Add these two equations and simplify:

<div class="equation">
 $$ \begin{array}{lll}
v_{1}^{2}&=& { v^{\prime}_{1}}^{2}+{ v^{\prime}_{2}}^{2}+2 v^{\prime}_{1}  v^{\prime}_{2} \left(\cos{\theta_{1}}\cos{\theta_{2}}+\sin{\theta_{1}}\sin{\theta_{2}}\right)\\
v_{1}^{2}&=& { v^{\prime}_{1}}^{2}+{ v^{\prime}_{2}}^{2}+2v^{\prime}_{1}v^{\prime}_{2}\left[\frac{1}{2}\cos\left({\theta_{1}}-{\theta_{2}}\right)+\frac{1}{2}\cos\left({\theta_{1}}+{\theta_{2}}\right)+\frac{1}{2}\cos\left({\theta_{1}}-{\theta_{2}}\right)-\frac{1}{2}\cos\left({\theta_{1}}+{\theta_{2}}\right)\right]\\
v_{1}^{2}&=& { v^{\prime}_{1}}^{2}+{ v^{\prime}_{2}}^{2}+2v^{\prime}_{1}v^{\prime}_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right).
\end{array} $$
</div>
Multiply the entire equation by $$ \frac{1}{2}m $$ to recover the kinetic energy:

<div class="equation">
 $$ \frac{1}{2} mv_{1}^{2}=\frac{1}{2}m{ v^{\prime}_{1}}^{2}+\frac{1}{2}m{ {v^{\prime} }_{2}}^{2}+m{v^{\prime} }_{1}{v^{\prime} }_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right) $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Integrated Concepts**

A 90.0-kg ice hockey player hits a 0.150-kg puck, giving the puck a velocity of
45.0 m/s. If both are initially at rest and if the ice is frictionless, how far
does the player recoil in the time it takes the puck to reach the goal 15.0 m
away?

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

point masses
: structureless particles with no rotation or spin

</div>
