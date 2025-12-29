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
initially zero and $$ p\_{x} $$ is the momentum of the incoming particle. Both
facts simplify the analysis. ( Even with the simplifying assumptions of point
masses, one particle initially at rest, and a convenient coordinate system, we
still gain new insights into nature from the analysis of two-dimensional
collisions.)

![A purple ball of mass m1 moves with velocity V 1 toward the right side along the X direction. The orange ball of mass m 2 is initially at rest. The total momentum is the momentum possessed by purple ball only. After collision purple ball moves with velocity v 1prime in the positive X Y plane making an angle theta 1 with the x axis and the orange ball moves in the X Y plane below the x axis making an angle theta 2 with the x axis. The total momentum would be the sum of the momentum of purple ball p1 prime and the orange ball p 2 prime. In two-dimensional collision too the momentum before and after collision remains the same.](../resources/Figure_08_06_01.jpg 'A two-dimensional collision with the coordinate system chosen so that ( m_2 ) is initially at rest and ( v_1 ) is parallel to the ( x ) -axis. This coordinate system is sometimes called the laboratory coordinate system, because many scattering experiments have a target that is stationary in the laboratory, while particles are scattered from it to determine the particles that make-up the target and how they are bound together. The particles may not be observed directly, but their initial and final velocities are.')
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
v^{\prime}_{2} $$ and $$\theta_{2} $$) of the 0.400-kg object after the
collision.

**Strategy**

Momentum is conserved because the surface is frictionless. The coordinate system
shown in [Figure 2](#Figure2) is one in which $$ m\_{2} $$ is originally at rest and
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

![A purple ball of mass m1 and velocity v one moves in the right direction into a dark room. It collides with an object of mass m two of value zero point four zero milligrams which was initially at rest and then leaves the dark room from the top right hand side making an angle of forty-five degrees with the horizontal and at velocity v one prime. The net external force on the system is zero. The momentum before and after collision remains the same. The velocity v two prime of the mass m two and the angle theta two it would make with the horizontal after collision not given.](../resources/Figure_08_06_02.jpg "A collision taking place in a dark room is explored in <a href="#example1">Example 1</a>. The incoming object \( m_1 \) is scattered by an initially stationary object. Only the stationary object&#x2019;s mass \( m_2 \) is known. By measuring the angle and speed at which \( m_1 \) emerges from the room, it is possible to calculate the magnitude and direction of the initially stationary object&#x2019;s velocity after the collision.")
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

- $$ v^{\prime}\_{1}=0 $$: head-on collision; incoming ball stops

- $$ v^{\prime}\_{2}=0 $$: no collision; incoming ball continues unaffected

- $$ \cos\left({\theta_{1}}-{\theta_{2}}\right)=0 $$: angle of separation $$
  \left({\theta_{1}}-{\theta_{2}}\right) $$ is $$ 90^\circ $$ after the
  collision

All three of these ways are familiar occurrences in billiards and pool, although
most of us try to avoid the second. If you play enough pool, you will notice
that the angle between the balls is very close to $$ 90^\circ $$ after the
collision, although it will vary from this value if a great deal of spin is
placed on the ball. (Large spin carries in extra energy and a quantity called
_angular momentum_, which must also be conserved.) The assumption that the
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

- The approach to two-dimensional collisions is to choose a convenient
  coordinate system and break the motion into components along perpendicular
  axes. Choose a coordinate system with the $$ x $$ -axis parallel to the
  velocity of the incoming particle.
- Two-dimensional collisions of point masses where mass 2 is initially at rest
  conserve momentum along the initial direction of mass 1 (the $$ x $$ -axis),
  stated by $$ m_{1} v_{1} = m_{1} v^{\prime}_{1} \cos{\theta }_{1}+m_
  {2}v^{\prime}_{2} \cos{\theta }_{2} $$ and along the direction perpendicular
  to the initial direction (the $$ y $$ -axis) stated by $$ 0= m_{1}v^{\prime}_
  {1y}+m_{2}v^{\prime}_{2y} $$.
- The internal kinetic before and after the collision of two objects that have
equal masses is
  <div class="equation">
    $$ \frac{1}{2} m v_{1}^{2}= \frac{1}{2} m{v^{\prime}}_{1}^{2}+ \frac{1}{2}
m{v^{\prime}_{2}}^{2}+ mv^{\prime}_{1} v^{\prime}_{2} \cos{\left( \theta_
{1}-\theta_{2} \right) }. $$
  </div>

- Point masses are structureless particles that cannot spin.

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

![A ball m one moves horizontally to the right with speed v one. It will collide with a stationary square labeled capital m two that is rotated at approximately forty-five degrees. The point of impact is on a face of the square a distance b above the center of the square. After the collision the ball is shown heading off at an angle theta one above the horizontal with a speed v one prime. The square remains essentially stationary (v 2 prime is approximately zero).](../resources/Figure_08_06_03.jpg 'A small object approaches a collision with a much more massive cube, after which its velocity has the direction ( \\theta_1 ). The angles at which the small object can be scattered are determined by the shape of the object it strikes and the impact parameter ( b ). ')
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
**Strategy**

For elastic collisions between identical masses where one is initially at rest, the two objects move at 90° to each other after collision. We use this result plus conservation of momentum in both the x- and y-directions to find the velocities.

**Solution**

Part (a): Given that $$ \theta_1 = 30.0^\circ $$ above the x-axis and using the result that $$ \theta_1 - \theta_2 = 90^\circ $$ for elastic collisions of identical masses:

<div class="equation">
 $$ \theta_2 = \theta_1 - 90^\circ = 30.0^\circ - 90^\circ = -60.0^\circ $$
</div>

So the second puck moves at $$ 60.0^\circ $$ below the x-axis.

Applying conservation of momentum in the y-direction (initially zero):

<div class="equation">
 $$ 0 = m v'_1 \sin{30.0^\circ} + m v'_2 \sin{(-60.0^\circ)} $$
</div>

which simplifies to:

<div class="equation">
 $$ v'_1 \sin{30.0^\circ} = v'_2 \sin{60.0^\circ} $$
</div>

Applying conservation of momentum in the x-direction:

<div class="equation">
 $$ m v_1 = m v'_1 \cos{30.0^\circ} + m v'_2 \cos{60.0^\circ} $$
</div>

Substituting the known value $$ v_1 = 6.00 \ms $$:

<div class="equation">
 $$ 6.00 \ms = v'_1 (0.866) + v'_2 (0.500) $$
</div>

From the y-equation: $$ v'_1 (0.500) = v'_2 (0.866) $$, which gives:

<div class="equation">
 $$ v'_1 = 1.732 v'_2 $$
</div>

Substituting into the x-equation:

<div class="equation">
 $$ 6.00 \ms = (1.732 v'_2)(0.866) + v'_2 (0.500) = 1.500 v'_2 + 0.500 v'_2 = 2.00 v'_2 $$
</div>

Solving for $$ v'_2 $$:

<div class="equation">
 $$ v'_2 = 3.00 \ms $$
</div>

The second puck moves at 3.00 m/s at $$ 60.0^\circ $$ below the x-axis.

Part (b): To confirm the collision is elastic, we find $$ v'_1 $$ and compare kinetic energies:

<div class="equation">
 $$ v'_1 = 1.732 (3.00 \ms) = 5.20 \ms $$
</div>

Initial kinetic energy (using m = 1 kg for simplicity):

<div class="equation">
 $$ \KE_i = \frac{1}{2}m v_1^2 = \frac{1}{2}(1\kg)(6.00\ms)^2 = 18.0 \J $$
</div>

Final kinetic energy:

<div class="equation">
 $$ \KE_f = \frac{1}{2}m {v'_1}^2 + \frac{1}{2}m {v'_2}^2 = \frac{1}{2}(1\kg)(5.20\ms)^2 + \frac{1}{2}(1\kg)(3.00\ms)^2 = 13.5 \J + 4.50 \J = 18.0 \J $$
</div>

Since $$ \KE_i = \KE_f = 18.0 \J $$, the collision is elastic.

**Discussion**

The 90° separation angle is a distinctive feature of elastic collisions between equal masses when one is initially at rest. The faster puck after collision (5.20 m/s at 30°) carries more kinetic energy than the slower one (3.00 m/s at 60°), but together they conserve both momentum and kinetic energy. This result is commonly observed in billiards and pool.

**Answer**

(a) The second puck has a velocity of 3.00 m/s at $$ 60.0^\circ $$ below the horizontal (or at $$ -60.0^\circ $$).
(b) The collision is confirmed to be elastic since kinetic energy is conserved.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Confirm that the results of the [Example 1](#example1) do conserve momentum in
both the $$ x $$- and $$ y $$-directions.

</div>
<div class="solution" markdown="1">
**Strategy**

From Example 1: $$ m_1 = 0.250 \kg $$, $$ m_2 = 0.400 \kg $$, $$ v_1 = 2.00 \ms $$, $$ v'\_1 = 1.50 \ms $$, $$ \theta_1 = 45.0^\circ $$, $$ v'\_2 = 0.886 \ms $$, $$ \theta_2 = -48.5^\circ $$ (or 312°). We verify conservation of momentum in both directions.

**Solution**

**x-direction momentum:**

Initial x-momentum:
$$ p\_{x,i} = m_1 v_1 + m_2 (0) = (0.250 \kg)(2.00 \ms) = 0.500 \kg \cdot \ms $$

Final x-momentum:
$$ p\_{x,f} = m_1 v'\_1 \cos{45.0^\circ} + m_2 v'\_2 \cos{(-48.5^\circ)} $$

$$ p\_{x,f} = (0.250 \kg)(1.50 \ms)(0.707) + (0.400 \kg)(0.886 \ms)(0.662) $$

$$ p\_{x,f} = 0.265 \kg \cdot \ms + 0.235 \kg \cdot \ms = 0.500 \kg \cdot \ms $$

Since $$ p_{x,i} = p_{x,f} = 0.500 \kg \cdot \ms $$, x-momentum is conserved. ✓

**y-direction momentum:**

Initial y-momentum:
$$ p\_{y,i} = 0 $$ (both objects moving along x-axis initially)

Final y-momentum:
$$ p\_{y,f} = m_1 v'\_1 \sin{45.0^\circ} + m_2 v'\_2 \sin{(-48.5^\circ)} $$

$$ p\_{y,f} = (0.250 \kg)(1.50 \ms)(0.707) + (0.400 \kg)(0.886 \ms)(-0.749) $$

$$ p\_{y,f} = 0.265 \kg \cdot \ms - 0.265 \kg \cdot \ms = 0 $$

Since $$ p_{y,i} = p_{y,f} = 0 $$, y-momentum is conserved. ✓

**Discussion**

Momentum is conserved in both directions, as required. The y-components of the final momenta are equal and opposite, canceling to give zero net y-momentum, matching the initial condition. This confirms the validity of the solution found in Example 1.

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
**Strategy**

Since the cannon can only recoil horizontally, we apply conservation of momentum in the horizontal direction only. The shell's velocity has horizontal and vertical components; only the horizontal component affects the cannon's recoil. For part (c), we consider what happens to the vertical component of momentum.

**Solution**

Part (a): First, find the horizontal component of the shell's velocity:

<div class="equation">
 $$ v_{\text{shell},x} = v_{\text{shell}} \cos{20.0^\circ} = (480 \ms)(0.940) = 451 \ms $$
</div>

Apply conservation of horizontal momentum (initial momentum = 0):

<div class="equation">
 $$ 0 = m_{\text{cannon}} v_{\text{cannon}} + m_{\text{shell}} v_{\text{shell},x} $$
</div>

Solving for the cannon's recoil velocity:

<div class="equation">
 $$ v_{\text{cannon}} = -\frac{m_{\text{shell}} v_{\text{shell},x}}{m_{\text{cannon}}} = -\frac{(15.0 \kg)(451 \ms)}{3000 \kg} = -2.26 \ms $$
</div>

The cannon recoils at 2.26 m/s in the direction opposite to the horizontal component of the shell's motion.

Part (b): The kinetic energy of the cannon is:

<div class="equation">
 $$ \KE_{\text{cannon}} = \frac{1}{2} m_{\text{cannon}} v_{\text{cannon}}^2 = \frac{1}{2}(3000 \kg)(2.26 \ms)^2 = 7.66 \times 10^{3} \J $$
</div>

The kinetic energy of the cannon is approximately $$ 7.66 \times 10^{3} \J $$ (7.66 kJ).

Part (c): The vertical component of the shell's momentum is:

<div class="equation">
 $$ p_{\text{shell},y} = m_{\text{shell}} v_{\text{shell}} \sin{20.0^\circ} = (15.0 \kg)(480 \ms)(0.342) = 2.46 \times 10^{3} \kg \cdot \ms $$
</div>

Since the cannon cannot move vertically, this momentum is transferred to the Earth through the cannon's mounting. The ground (Earth) exerts an upward normal force on the cannon during firing that absorbs this vertical momentum. Because the Earth's mass is so large, its resulting motion is imperceptible. However, the mounting must be strong enough to withstand this force, and over time, repeated firings can cause the cannon to settle into the ground.

**Discussion**

The cannon's recoil energy (7.66 kJ) must be absorbed by shock absorbers to prevent damage to the mounting. The shell's total kinetic energy is much larger:

<div class="equation">
 $$ \KE_{\text{shell}} = \frac{1}{2}(15.0 \kg)(480 \ms)^2 = 1.73 \times 10^6 \J $$
</div>

Thus, the cannon receives only about 0.44% of the total energy—the rest goes to the shell. This demonstrates the efficiency of momentum transfer when a light object is expelled from a heavy one.

**Answer**

(a) The cannon recoils at 2.26 m/s in the direction opposite to the shell's horizontal motion.
(b) The kinetic energy of the recoiling cannon is $$ 7.66 \times 10^{3} \J $$ (7.66 kJ).
(c) The vertical component of momentum is transferred to the Earth through the cannon's mounting, which must be strong enough to withstand the resulting forces.

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
<div class="solution" markdown="1">
**Strategy**

We apply conservation of momentum in both x and y directions to find the ball's final velocity components. Then we compare kinetic energies to determine if the collision is elastic. The pin is initially at rest, and the ball initially moves along the x-axis.

**Solution**

Part (a): Apply conservation of x-momentum:

<div class="equation">
 $$ m_{\text{ball}} v_{\text{ball}} = m_{\text{ball}} v'_{\text{ball},x} + m_{\text{pin}} v'_{\text{pin}} \cos{85.0^\circ} $$
</div>

Substituting known values:

<div class="equation">
 $$ (5.50\kg)(9.00\ms) = (5.50\kg) v'_{\text{ball},x} + (0.850\kg)(15.0\ms)(0.0872) $$
</div>

<div class="equation">
 $$ 49.5 \kg \cdot \ms = 5.50\kg \cdot v'_{\text{ball},x} + 1.11 \kg \cdot \ms $$
</div>

Solving for $$ v'_{\text{ball},x} $$:

<div class="equation">
 $$ v'_{\text{ball},x} = \frac{49.5 - 1.11}{5.50} \ms = 8.80 \ms $$
</div>

Apply conservation of y-momentum (initially zero):

<div class="equation">
 $$ 0 = m_{\text{ball}} v'_{\text{ball},y} + m_{\text{pin}} v'_{\text{pin}} \sin{85.0^\circ} $$
</div>

Solving for $$ v'_{\text{ball},y} $$:

<div class="equation">
 $$ v'_{\text{ball},y} = -\frac{m_{\text{pin}} v'_{\text{pin}} \sin{85.0^\circ}}{m_{\text{ball}}} = -\frac{(0.850\kg)(15.0\ms)(0.996)}{5.50\kg} = -2.31 \ms $$
</div>

The final ball velocity magnitude is:

<div class="equation">
 $$ v'_{\text{ball}} = \sqrt{{v'_{\text{ball},x}}^2 + {v'_{\text{ball},y}}^2} = \sqrt{(8.80)^2 + (-2.31)^2} = \sqrt{77.4 + 5.34} = 9.10 \ms $$
</div>

The direction is:

<div class="equation">
 $$ \theta = \tan^{-1}\left(\frac{v'_{\text{ball},y}}{v'_{\text{ball},x}}\right) = \tan^{-1}\left(\frac{-2.31}{8.80}\right) = -14.7^\circ $$
</div>

The bowling ball's final velocity is 9.10 m/s at 14.7° below the horizontal.

Part (b): Calculate the initial kinetic energy:

<div class="equation">
 $$ \KE_i = \frac{1}{2}m_{\text{ball}} v_{\text{ball}}^2 = \frac{1}{2}(5.50\kg)(9.00\ms)^2 = 223 \J $$
</div>

Calculate the final kinetic energy:

<div class="equation">
 $$ \KE_f = \frac{1}{2}m_{\text{ball}} {v'_{\text{ball}}}^2 + \frac{1}{2}m_{\text{pin}} {v'_{\text{pin}}}^2 = \frac{1}{2}(5.50\kg)(9.10\ms)^2 + \frac{1}{2}(0.850\kg)(15.0\ms)^2 $$
</div>

<div class="equation">
 $$ \KE_f = 228 \J + 95.6 \J = 324 \J $$
</div>

Since $$ \KE_f > \KE_i $$, the collision is NOT elastic. The linear kinetic energy actually increased!

Part (c): The increase in linear kinetic energy is:

<div class="equation">
 $$ \Delta \KE = \KE_f - \KE_i = 324 \J - 223 \J = 101 \J $$
</div>

This increase comes from the rotational kinetic energy of the spinning bowling ball. During the collision, friction between the ball and pin converts some of the ball's spin energy into linear kinetic energy of both objects. This is why experienced bowlers put spin on the ball—it stores additional energy that can be transferred to the pins during impact, making strikes more likely.

**Discussion**

This is a "superelastic" collision where internal energy (from the ball's rotation) is converted to linear kinetic energy. The ball's speed actually increased slightly (9.00 to 9.10 m/s) while also deflecting by 14.7°, demonstrating that rotational energy was added to the linear motion. This phenomenon is common in bowling and explains why spin is such an important technique. The conversion efficiency depends on the friction between the surfaces and the impact geometry.

**Answer**

(a) The bowling ball's final velocity is 9.10 m/s at 14.7° below the horizontal (or at $$ -14.7^\circ $$).
(b) The collision is not elastic because kinetic energy increased from 223 J to 324 J.
(c) The 101 J increase in linear kinetic energy comes from the rotational kinetic energy of the spinning bowling ball being converted through friction during the collision.

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
**Strategy**

This is an elastic collision between a light helium nucleus and a much heavier gold nucleus (initially at rest). We apply conservation of momentum in both x and y directions and conservation of kinetic energy. First, we find the initial speed of the helium nucleus from its kinetic energy. Then, using the given scattering angle of 120°, we can solve the three conservation equations for the three unknowns: the final speeds of both nuclei and the scattering angle of the gold nucleus.

**Solution**

Part (a): First, find the initial speed of the helium nucleus from its kinetic energy:

<div class="equation">
 $$ \KE_i = \frac{1}{2}m_{\text{He}} v_{\text{He}}^2 $$
</div>

<div class="equation">
 $$ v_{\text{He}} = \sqrt{\frac{2\KE_i}{m_{\text{He}}}} = \sqrt{\frac{2(8.00\times 10^{-13}\J)}{6.68\times 10^{-27}\kg}} = \sqrt{2.395\times 10^{14}\mss} = 1.55\times 10^{7}\ms $$
</div>

Apply conservation of momentum in the x-direction:

<div class="equation">
 $$ m_{\text{He}} v_{\text{He}} = m_{\text{He}} v'_{\text{He}} \cos{120^\circ} + m_{\text{Au}} v'_{\text{Au}} \cos{\theta_{\text{Au}}} $$
</div>

Apply conservation of momentum in the y-direction (initially zero):

<div class="equation">
 $$ 0 = m_{\text{He}} v'_{\text{He}} \sin{120^\circ} + m_{\text{Au}} v'_{\text{Au}} \sin{\theta_{\text{Au}}} $$
</div>

Apply conservation of kinetic energy (elastic collision):

<div class="equation">
 $$ \frac{1}{2}m_{\text{He}} v_{\text{He}}^2 = \frac{1}{2}m_{\text{He}} {v'_{\text{He}}}^2 + \frac{1}{2}m_{\text{Au}} {v'_{\text{Au}}}^2 $$
</div>

From the y-momentum equation:

<div class="equation">
 $$ v'_{\text{Au}} \sin{\theta_{\text{Au}}} = -\frac{m_{\text{He}}}{m_{\text{Au}}} v'_{\text{He}} \sin{120^\circ} = -\frac{6.68\times 10^{-27}\kg}{3.29\times 10^{-25}\kg} v'_{\text{He}} (0.866) $$
</div>

<div class="equation">
 $$ v'_{\text{Au}} \sin{\theta_{\text{Au}}} = -0.0176 v'_{\text{He}} $$
</div>

From the x-momentum equation:

<div class="equation">
 $$ v'_{\text{Au}} \cos{\theta_{\text{Au}}} = \frac{m_{\text{He}}}{m_{\text{Au}}} \left(v_{\text{He}} - v'_{\text{He}} \cos{120^\circ}\right) = 0.0203\left(1.55\times 10^{7} + 0.500 v'_{\text{He}}\right) $$
</div>

Solving this system of three equations with three unknowns is algebraically complex. The momentum equations can be squared and added to eliminate the angle $$ \theta_{\text{Au}} $$, then combined with the energy equation to solve for the unknowns. The detailed algebra involves solving a quadratic equation.

The solution yields: The helium nucleus has a final speed close to its initial speed (since the gold nucleus is so massive), and the gold nucleus recoils with velocity:

<div class="equation">
 $$ v'_{\text{Au}} = 5.36\times 10^{5} \ms \text{ at } \theta_{\text{Au}} = -29.5^\circ $$
</div>

The helium nucleus, after scattering at 120°, has a final speed of approximately $$ 1.50\times 10^{7} \ms $$, only slightly less than its initial speed.

Part (b): The final kinetic energy of the helium nucleus is:

<div class="equation">
 $$ \KE'_{\text{He}} = 7.52\times 10^{-13}\J $$
</div>

This represents approximately 94% of the initial energy of $$ 8.00\times 10^{-13}\J $$. The remaining 6% was transferred to the gold nucleus, which, despite having much more mass, recoils with significant velocity due to the high-energy collision.

**Discussion**

This problem demonstrates Rutherford scattering, which was crucial in discovering the atomic nucleus. The helium nucleus (alpha particle) scatters at a large angle (120°) because it encounters the massive, concentrated charge of the gold nucleus. The fact that the helium nucleus retains most of its kinetic energy (94%) despite the large deflection angle shows that the gold nucleus, being 49 times more massive, recoils with a much smaller velocity. The gold nucleus moves at a small angle (-29.5°) below the horizontal, consistent with momentum conservation. This type of scattering experiment revealed that atoms have small, dense nuclei rather than being uniform spheres of positive charge.

**Answer**

(a) The gold nucleus has a final velocity of $$ 5.36\times 10^{5} \ms $$ at $$ -29.5^\circ $$ (below the horizontal). The helium nucleus has a final speed of approximately $$ 1.50\times 10^{7} \ms $$.
(b) The final kinetic energy of the helium nucleus is $$ 7.52\times 10^{-13} \J $$, which is approximately 94% of its initial energy.

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
you cannot use the equations for conservation of momentum along the _
$$ x $$
_-axis and $$ y $$ -axis; instead, you must look for other simplifying aspects.

</div>
<div class="solution" markdown="1">
**Strategy**

Define coordinates: let +x be east and +y be north. Car 1 moves south (-y direction), Car 2 moves west (-x direction). Since the cars stick together, this is a perfectly inelastic collision. We apply conservation of momentum in both directions separately, then combine to find the final velocity. Even though both cars have initial velocities, the problem simplifies because each car moves along only one axis initially.

**Solution**

Part (a): Set up the initial conditions:

Car 1: $$ m_1 = 1200 \kg $$, $$ v_{1x} = 0 $$, $$ v_{1y} = -8.00 \ms $$ (south)

Car 2: $$ m_2 = 850 \kg $$, $$ v_{2x} = -17.0 \ms $$ (west), $$ v_{2y} = 0 $$

Apply conservation of x-momentum:

<div class="equation">
 $$ m_1 v_{1x} + m_2 v_{2x} = (m_1 + m_2) v_{fx} $$
</div>

<div class="equation">
 $$ (1200\kg)(0) + (850\kg)(-17.0\ms) = (2050\kg) v_{fx} $$
</div>

<div class="equation">
 $$ v_{fx} = \frac{-14450\kg \cdot \ms}{2050\kg} = -7.05 \ms $$
</div>

Apply conservation of y-momentum:

<div class="equation">
 $$ m_1 v_{1y} + m_2 v_{2y} = (m_1 + m_2) v_{fy} $$
</div>

<div class="equation">
 $$ (1200\kg)(-8.00\ms) + (850\kg)(0) = (2050\kg) v_{fy} $$
</div>

<div class="equation">
 $$ v_{fy} = \frac{-9600\kg \cdot \ms}{2050\kg} = -4.68 \ms $$
</div>

The final velocity magnitude is:

<div class="equation">
 $$ v_f = \sqrt{v_{fx}^2 + v_{fy}^2} = \sqrt{(-7.05)^2 + (-4.68)^2} = \sqrt{49.7 + 21.9} = 8.46 \ms $$
</div>

The direction (angle from west toward south):

<div class="equation">
 $$ \theta = \tan^{-1}\left(\frac{|v_{fy}|}{|v_{fx}|}\right) = \tan^{-1}\left(\frac{4.68}{7.05}\right) = 33.6^\circ $$
</div>

The final velocity is 8.46 m/s in a direction $$ 33.6^\circ $$ south of west.

Part (b): Calculate the initial kinetic energy:

<div class="equation">
 $$ \KE_i = \frac{1}{2}m_1 v_1^2 + \frac{1}{2}m_2 v_2^2 = \frac{1}{2}(1200\kg)(8.00\ms)^2 + \frac{1}{2}(850\kg)(17.0\ms)^2 $$
</div>

<div class="equation">
 $$ \KE_i = 38400 \J + 122825 \J = 161225 \J \approx 1.61 \times 10^{5} \J $$
</div>

Calculate the final kinetic energy:

<div class="equation">
 $$ \KE_f = \frac{1}{2}(m_1 + m_2) v_f^2 = \frac{1}{2}(2050\kg)(8.46\ms)^2 = 73400 \J \approx 7.34 \times 10^{4} \J $$
</div>

The kinetic energy lost is:

<div class="equation">
 $$ \Delta \KE = \KE_i - \KE_f = 161225 \J - 73400 \J = 87825 \J \approx 8.78 \times 10^{4} \J $$
</div>

Approximately 87.8 kJ of kinetic energy is lost in the collision.

**Discussion**

Over half (54%) of the initial kinetic energy is converted to deformation of the cars, heat, and sound. This is a significant amount of energy—equivalent to accelerating a 1000-kg car from rest to about 13 m/s (47 km/h). This energy is what crumple zones are designed to absorb, protecting the occupants. The fact that the cars stick together (perfectly inelastic collision) ensures maximum energy loss, which, while destructive to the vehicles, helps protect passengers by extending the collision time and reducing peak forces.

**Answer**

(a) The final velocity of the combined cars is 8.46 m/s at $$ 33.6^\circ $$ south of west.
(b) The kinetic energy lost in the collision is approximately $$ 8.78 \times 10^{4} \J $$ (87.8 kJ), which is 54% of the initial kinetic energy.

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
**Strategy**

We start with the conservation of momentum equations in the x and y directions for the case where one object is initially at rest. For objects of equal mass ($$ m_1 = m_2 = m $$), we can simplify these equations by canceling the mass terms. The proof involves squaring both momentum equations, adding them together, and using trigonometric identities to simplify. The goal is to show that the result matches the energy equation for elastic collisions between equal masses.

**Solution**

We are given that $$ m_{1}=m_{2}\equiv m $$. Dividing through by mass, the given momentum equations become:

<div class="equation">
 $$ v_{1}=v^{\prime}_{1}\cos{\theta_{1}}+v^{\prime}_{2}\cos{\theta_{2}} $$
</div>
and

<div class="equation">
 $$ 0=v^{\prime}_{1}\sin{\theta_{1}}+v^{\prime}_{2}\sin{\theta_{2}}. $$
</div>

Square each equation to get:

<div class="equation">
 $$ \begin{array}{lll}
v_{1}^{2}&=& { v^{\prime}_{1}}^{2}{\cos}^{2}{\theta_{1}}+{ v^{\prime}_{2}}^{2}{\cos}^{2}{\theta_{2}}+2v^{\prime}_{1}v^{\prime}_{2}\cos{\theta_{1}}\cos{\theta_{2}}\\
0 &=& { v^{\prime}_{1}}^{2}{\sin}^{2}{\theta_{1}}+{ v^{\prime}_{2}}^{2}{\sin}^{2}{\theta_{2}}+2v^{\prime}_{1}v^{\prime}_{2}\sin{\theta_{1}}\sin{\theta_{2}}.
\end{array} $$
</div>

Add these two equations and use the trigonometric identity $$ \sin^2\theta + \cos^2\theta = 1 $$:

<div class="equation">
 $$ v_{1}^{2} = { v^{\prime}_{1}}^{2}+{ v^{\prime}_{2}}^{2}+2 v^{\prime}_{1}  v^{\prime}_{2} \left(\cos{\theta_{1}}\cos{\theta_{2}}+\sin{\theta_{1}}\sin{\theta_{2}}\right) $$
</div>

Now apply the trigonometric identity $$ \cos(\theta_1 - \theta_2) = \cos\theta_1\cos\theta_2 + \sin\theta_1\sin\theta_2 $$:

<div class="equation">
 $$ v_{1}^{2} = { v^{\prime}_{1}}^{2}+{ v^{\prime}_{2}}^{2}+2v^{\prime}_{1}v^{\prime}_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right) $$
</div>

Finally, multiply the entire equation by $$ \frac{1}{2}m $$ to express it in terms of kinetic energy:

<div class="equation">
 $$ \frac{1}{2} mv_{1}^{2}=\frac{1}{2}m{ v^{\prime}_{1}}^{2}+\frac{1}{2}m{ {v^{\prime} }_{2}}^{2}+m{v^{\prime} }_{1}{v^{\prime} }_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right) $$
</div>

This is the desired result, showing that for elastic collisions between equal masses, the kinetic energy can be expressed in terms of the final velocities and the angle between them.

**Discussion**

This result is crucial for understanding elastic collisions between equal masses. The equation shows that the initial kinetic energy equals the sum of the final kinetic energies plus a coupling term that depends on the angle between the final velocity vectors. For an elastic collision to conserve kinetic energy (which requires the third term to be zero), we need $$ \cos(\theta_1 - \theta_2) = 0 $$, which means $$ \theta_1 - \theta_2 = 90° $$. This proves the important result that in elastic collisions between equal masses where one is initially at rest, the two objects move off at 90° to each other. This is commonly observed in billiards and pool.

**Answer**

Starting from momentum conservation and assuming equal masses with one initially at rest, we have proven that:
$$ \frac{1}{2} mv_{1}^{2}=\frac{1}{2}m{ v^{\prime}_{1}}^{2}+\frac{1}{2}m{ {v^{\prime} }_{2}}^{2}+m{v^{\prime} }_{1}{v^{\prime} }_{2}\cos\left({\theta_{1}}-{\theta_{2}}\right) $$

This result demonstrates that elastic collisions between equal masses require the objects to separate at 90° to conserve both momentum and kinetic energy.

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
<div class="solution" markdown="1">
**Strategy**

First, use conservation of momentum to find the player's recoil velocity. Then calculate the time for the puck to reach the goal, and use this time to find how far the player moves.

**Solution**

Conservation of momentum (both initially at rest):

$$ 0 = m_{\text{player}} v_{\text{player}} + m_{\text{puck}} v_{\text{puck}} $$

$$ v_{\text{player}} = -\frac{m_{\text{puck}} v_{\text{puck}}}{m_{\text{player}}} = -\frac{(0.150 \kg)(45.0 \ms)}{90.0 \kg} = -0.0750 \ms $$

The player recoils at 0.0750 m/s in the direction opposite to the puck.

Time for puck to reach the goal:

$$ t = \frac{d}{v\_{\text{puck}}} = \frac{15.0 \m}{45.0 \ms} = 0.333 \s $$

Distance the player recoils in this time:

$$ d_{\text{player}} = |v_{\text{player}}| \times t = (0.0750 \ms)(0.333 \s) = 0.0250 \m = 2.50 \text{ cm} $$

The player recoils 2.50 cm (0.025 m) in the time it takes the puck to reach the goal.

**Discussion**

The player barely moves (2.5 cm) despite giving the puck significant velocity. This is because the player's mass is 600 times the puck's mass, so the recoil velocity is 600 times smaller. The frictionless ice ensures momentum is conserved, and the short time (1/3 second) limits how far the player can move before the puck reaches the goal.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

point masses
: structureless particles with no rotation or spin

</div>
