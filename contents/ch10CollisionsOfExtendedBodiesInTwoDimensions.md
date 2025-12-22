---
title: Collisions of Extended Bodies in Two Dimensions
layout: page
sectionNumber: 6
chapterNumber: 10
---

<div class="abstract" markdown="1">
* Observe collisions of extended bodies in two dimensions.
* Examine collision at the point of percussion.

</div>

Bowling pins are sent flying and spinning when hit by a bowling ball—angular
momentum as well as linear momentum and energy have been imparted to the pins. (
See [Figure 1](#Figure1)). Many collisions involve angular momentum. Cars, for
example, may spin and collide on ice or a wet surface. Baseball pitchers throw
curves by putting spin on the baseball. A tennis player can put a lot of top
spin on the tennis ball which causes it to dive down onto the court once it
crosses the net. We now take a brief look at what happens when objects that can
rotate collide.

Consider the relatively simple collision shown in [Figure 2](#Figure2), in which a
disk strikes and adheres to an initially motionless stick nailed at one end to a
frictionless surface. After the collision, the two rotate about the nail. There
is an unbalanced external force on the system at the nail. This force exerts no
torque because its lever arm $$ r $$ is zero. Angular momentum is therefore
conserved in the collision. Kinetic energy is not conserved, because the
collision is inelastic. It is possible that momentum is not conserved either
because the force at the nail may have a component in the direction of the
disk’s initial velocity. Let us examine a case of rotation in a collision
in [Example 1](#example1).

![A bowling ball, just as it is striking the pins.](../resources/Figure_10_06_01.jpg 'The bowling ball causes the pins to fly, some of them spinning violently. (credit: Tinou Bao, Flickr)')
{: #Figure1}

![Figure a shows a disc m sliding toward a motionless stick M of length r pivoted about a nail, on a frictionless surface. In figure b, a disk hits the stick at one end and adheres to it, and the stick rotates, pivoting around the nail in a direction shown by the arrow in the clockwise direction and angular velocity omega.](../resources/Figure_10_06_02.jpg '(a) A disk slides toward a motionless stick on a frictionless surface. 
        (b) The disk hits the stick at one end and adheres to it, and they rotate together, pivoting around the nail. Angular momentum is conserved for this inelastic collision because the surface is frictionless and the unbalanced external force at the nail exerts no torque.')
{: #Figure2}

<div class="example" id="example1" markdown="1">
<div class="title">
Rotation in a Collision
</div>
Suppose the disk in [Figure 2](#Figure2) has a mass of 50.0 g and an initial velocity of 30.0 m/s when it strikes the stick that is 1.20 m long and 2.00 kg.

(a) What is the angular velocity of the two after the collision?

(b) What is the kinetic energy before and after the collision?

(c) What is the total linear momentum before and after the collision?

**Strategy for (a)**

We can answer the first question using conservation of angular momentum as
noted. Because angular momentum is $$ I \omega $$, we can solve for angular
velocity.

**Solution for (a)**

Conservation of angular momentum states

<div class="equation">
 $$ L=L^{\prime} , $$
</div>
where primed quantities stand for conditions after the collision and both momenta are calculated relative to the pivot point. The initial angular momentum of the system of stick-disk is that of the disk just before it strikes the stick. That is,

<div class="equation">
 $$ L=I \omega, $$
</div>
where $$ I $$ is the moment of inertia of the disk and $$ \omega $$
is its angular velocity around the pivot point. Now, $$
I=mr^{2} $$
(taking the disk to be approximately a point mass) and $$ \omega =v/r $$, so that

<div class="equation">
 $$ L=m r^{2} \frac{v}{r}= mvr . $$
</div>
After the collision,

<div class="equation">
 $$ L^{\prime} =I^{\prime} \omega^\prime . $$
</div>
It is $$ \omega^\prime $$ that we wish to find. Conservation of angular
momentum gives

<div class="equation">
 $$ I^{\prime} \omega^\prime = mvr . $$
</div>
Rearranging the equation yields

<div class="equation">
 $$ \omega^\prime =\frac{ mvr }{I^{\prime} }, $$
</div>
where $$ I^{\prime} $$ is the moment of inertia of the stick and disk stuck together, which is the sum
of their individual moments of inertia about the
nail. [Figure 3 of Dynamics Of Rotational Motion](./ch10DynamicsOfRotationalMotion#Figure3) gives the formula for a rod
rotating around one end to be $$
I=Mr^{2}/3 $$. Thus,

<div class="equation">
 $$ I^{\prime} =m r^{2} +\frac{ Mr^{2}}{3}=\left(m+\frac{M}{3}\right){r}^{2}. $$
</div>
Entering known values in this equation yields,

<div class="equation">
 $$ I^\prime =\left(0.0500\kg +0.667 \kg \right){\left(1.20\m
\right)
}^{2}=1.032\kg \cdot \mm. $$
</div>
The value of $$ I^{\prime} $$ is now entered into the expression for $$ \omega^\prime $$, which yields

<div class="equation">
 $$ \begin{array}{lll}
\omega^\prime &=& \frac{ mvr }{I^{\prime} }=\frac
{\left(0.0500 \kg \right)\left(30.0 m/s\right)\left(1.20 \m \right)}{1.032 \kg \cdot \mm}\\
\omega^\prime &=& 1.744 \rads \approx 1.74 \rads .
\end{array} $$
</div>

**Strategy for (b)**

The kinetic energy before the collision is the incoming disk’s translational
kinetic energy, and after the collision, it is the rotational kinetic energy of
the two stuck together.

**Solution for (b)**

First, we calculate the translational kinetic energy by entering given values
for the mass and speed of the incoming disk.

<div class="equation">
 $$ \KE=\frac{1}{2}m v^{2}=\left(0.500\right)\left(0.0500\kg \right){\left(30.0 \ms \right)}^{2}=22.5 \J $$
</div>
After the collision, the rotational kinetic energy can be found because we now know the final angular velocity and the final moment of inertia. Thus, entering the values into the rotational kinetic energy equation gives

<div class="equation">
 $$ \begin{array}{lll}
\KE^\prime &=& \frac{1}{2}I^{\prime} {\omega^\prime}^{2}
=\left(0.5\right)\left(1.032\kg
\cdot \mm\right){\left(1.744\frac{ \text{rad}}{\s}\right)}^{2}\\
\KE^\prime &=& 1.57 \J .
\end{array} $$
</div>

**Strategy for (c)**

The linear momentum before the collision is that of the disk. After the
collision, it is the sum of the disk’s momentum and that of the center of mass
of the stick.

**Solution of (c)**

Before the collision, then, linear momentum is

<div class="equation">
 $$ p=mv =\left(0.0500\kg \right)\left(30.0 \ms \right)=1.50\kg \cdot \ms . $$
</div>
After the collision, the disk and the stick’s center of mass move in the same direction.
The total linear momentum is that of the disk moving at a new
velocity $$ v^{\prime} =r \omega^\prime $$ plus that of the stick’s center of mass,
which moves at half this speed because $$ v_{\text{CM}}=\left(
\frac{r}{2} \right) \omega^\prime =\frac{v^{\prime} }{2} $$. Thus,

<div class="equation">
 $$ p^{\prime} =mv^{\prime} +Mv_{\text{CM}}=mv^{\prime} +\frac{Mv^\prime }{2}. $$
</div>
Gathering similar terms in the equation yields,

<div class="equation">
 $$ p^{\prime} =\left(m+\frac{M}{2}\right)v^{\prime} $$
</div>
so that

<div class="equation">
 $$ p^{\prime} =\left(m+\frac{M}{2}\right)r \omega^\prime . $$
</div>
Substituting known values into the equation,

<div class="equation">
 $$ p^{\prime} =\left(1.050 \kg \right)\left(1.20\m \right)\left(1.744 \rads \right)=2.20 \kg \cdot \ms . $$
</div>

**Discussion**

First note that the kinetic energy is less after the collision, as predicted,
because the collision is inelastic. More surprising is that the momentum after
the collision is actually greater than before the collision. This result can be
understood if you consider how the nail affects the stick and vice versa.
Apparently, the stick pushes backward on the nail when first struck by the disk.
The nail’s reaction (consistent with Newton’s third law) is to push forward on
the stick, imparting momentum to it in the same direction in which the disk was
initially moving, thereby increasing the momentum of the system.

</div>

The above example has other implications. For example, what would happen if the
disk hit very close to the nail? Obviously, a force would be exerted on the nail
in the forward direction. So, when the stick is struck at the end farthest from
the nail, a backward force is exerted on the nail, and when it is hit at the end
nearest the nail, a forward force is exerted on the nail. Thus, striking it at a
certain point in between produces no force on the nail. This intermediate point
is known as the _percussion point_.

An analogous situation occurs in tennis as seen in [Figure 3](#Figure3). If you hit
a ball with the end of your racquet, the handle is pulled away from your hand.
If you hit a ball much farther down, for example, on the shaft of the racquet,
the handle is pushed into your palm. And if you hit the ball at the racquet’s
percussion point (what some people call the “sweet spot”), then little or _no_
force is exerted on your hand, and there is less vibration, reducing chances of
a tennis elbow. The same effect occurs for a baseball bat.

![In figure a, a disk hitting a stick is compared to a tennis ball being hit by a racquet. When the ball strikes the racquet near the end with a force denoted by f ball as shown by the direction of the arrow, a backward force, f hand is exerted on the hand, In figure b, when the racquet is struck much farther down by a force F ball, a forward force, f hand is exerted on the hand as shown by the arrows. In figure (c), when the racquet is struck by the ball with a force f ball at the percussion point, no force is delivered to the hand. This implies that f hand is equal to zero.](../resources/Figure_10_06_03.jpg 'A disk hitting a stick is compared to a tennis ball being hit by a racquet. (a) When the ball strikes the racquet near the end, a backward force is exerted on the hand.
(b) When the racquet is struck much farther down, a forward force is exerted on the hand. (c) When the racquet is struck at the percussion point, no force is delivered to the hand.')
{: #Figure3}

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Is rotational kinetic energy a vector? Justify your answer.

</div>
<div class="solution" data-print-placement="here" markdown="1">
No, energy is always scalar whether motion is involved or not. No form of energy has a direction in space and you can see that rotational kinetic energy does not depend on the direction of motion just as linear kinetic energy is independent of the direction of motion.

</div>
</div>

### Section Summary

- Angular momentum $$ L $$ is analogous to linear momentum and is given by $$
  L=I \omega $$.
- Angular momentum is changed by torque, following the relationship $$
  \text{net}\tau =\frac{ \Delta L}{\Delta t}. $$
- Angular momentum is conserved if the net torque is zero $$
  L=\text{constant}\left( \text{net}\tau =0 \right) $$ or $$ L=L^{\prime} \left(
  \text{net}\tau = 0 \right) $$. This equation is known as the law of
  conservation of angular momentum, which may be conserved in collisions.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Describe two different collisions—one in which angular momentum is conserved, and the other in which it is not. Which condition determines whether or not angular momentum is conserved in a collision?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose an ice hockey puck strikes a hockey stick that lies flat on the ice and is free to move in any direction. Which quantities are likely to be conserved: angular momentum, linear momentum, or kinetic energy (assuming the puck and stick are very resilient)?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
While driving his motorcycle at highway speed, a physics student notices that pulling back lightly on the right handlebar tips the cycle to the left and produces a left turn. Explain why this happens.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [Example 1](#example1) in which the disk strikes and adheres to the stick 0.100 m from the nail.

</div>
<div class="solution" markdown="1">
(a) $$ 0.156 \rads $$

(b) $$ 1.17 \times 10^{-2} \J $$

(c) $$ 0.188 \kg \cdot \ms $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [Example 1](#example1) in which the disk originally spins clockwise at 1000 rpm and has a radius of 1.50 cm.

</div>
<div class="solution" markdown="1">

**Strategy**

This is similar to Example 1, but now the disk has initial angular momentum from spinning before it strikes the stick. We must add the disk's spin angular momentum to its orbital angular momentum about the pivot point.

**Solution**

From Example 1: disk mass m = 0.0500 kg, stick mass M = 2.00 kg, stick length r = 1.20 m, disk velocity v = 30.0 m/s.

New information: disk radius R = 1.50 cm = 0.0150 m, initial spin ω₀ = 1000 rpm

Convert disk's spin to rad/s:

<div class="equation">
$$ \omega_0 = 1000 \text{ rpm} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \s} = 105 \text{ rad/s} $$
</div>

Initial angular momentum has two parts:

**Orbital** (disk moving toward stick):

<div class="equation">
$$ L_{\text{orbital}} = mvr = (0.0500 \kg)(30.0 \text{ m/s})(1.20 \m) = 1.80 \kg \cdot \mms $$
</div>

**Spin** (disk rotating about its own axis, treating as a disk):

<div class="equation">
$$ I_{\text{disk}} = \frac{1}{2}mR^2 = \frac{1}{2}(0.0500 \kg)(0.0150 \m)^2 = 5.625 \times 10^{-6} \kg \cdot \mm $$
</div>

Since the disk spins clockwise (negative direction):

<div class="equation">
$$ L_{\text{spin}} = -I_{\text{disk}}\omega_0 = -(5.625 \times 10^{-6})(105) = -5.91 \times 10^{-4} \kg \cdot \mms $$
</div>

Total initial angular momentum:

<div class="equation">
$$ L = L_{\text{orbital}} + L_{\text{spin}} = 1.80 - 0.000591 \approx 1.80 \kg \cdot \mms $$
</div>

The spin contribution is negligible (0.03%), so the final result is essentially the same as Example 1:

<div class="equation">
$$ \omega' = \frac{L}{I'} = \frac{1.80}{1.032} = 1.74 \text{ rad/s} $$
</div>

**Discussion**

Even though the disk spins at 1000 rpm, its small radius means its spin angular momentum is negligible compared to its orbital angular momentum. The final answer is virtually identical to Example 1. This demonstrates that for small objects, translational motion typically dominates over rotational effects.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Twin skaters approach one another as shown in [Figure 4](#Figure4) and lock hands.
(a) Calculate their final angular velocity, given each had an initial speed of 2.50 m/s relative to the ice. Each has a mass of 70.0 kg, and each has a center of mass located 0.800 m from their locked hands. You may approximate their moments of inertia to be that of point masses at this radius.
(b) Compare the initial kinetic energy and final kinetic energy.

![Figure a shows two skaters from the top view approaching each other from opposite directions with velocity v. In figure b two skaters then lock their right hands and start to spin in the clockwise direction with angular velocity omega.](../resources/Figure_10_06_04.jpg 'Twin skaters approach each other with identical speeds. Then, the skaters lock hands and spin.')
{: #Figure4}

</div>
<div class="solution" markdown="1">
(a) 3.13 rad/s

(b) Initial KE = 438 J, final KE = 438 J

</div>
</div>

<div class="exercise">
<div class="problem" markdown="1">
Suppose a 0.250-kg ball is thrown at 15.0 m/s to a motionless person standing on ice who catches it with an outstretched arm as shown in [Figure 5](#Figure5).

(a) Calculate the final linear velocity of the person, given his mass is 70.0
kg.

(b) What is his angular velocity if each arm is 5.00 kg? You may treat the ball
as a point mass and treat the person's arms as uniform rods (each has a length
of 0.900 m) and the rest of his body as a uniform cylinder of radius 0.180 m.
Neglect the effect of the ball on his center of mass so that his center of mass
remains in his geometrical center.

(c) Compare the initial and final total kinetic energies.

![Figure a shows a skater through an overhead view with both his hands outstretched. A ball is seen approaching toward him in air with velocity v. Figure b shows that skater catching two balls in his left hand, and then, recoiling toward the left, in clockwise direction, with angular velocity omega and finally, the balls have velocity v prime.](../resources/Figure_10_06_05.jpg 'The figure shows the overhead view of a person standing motionless on ice about to catch a ball. Both arms are outstretched. After catching the ball, the skater recoils and rotates.')
{: #Figure5}

</div>
<div class="solution" markdown="1">

**Strategy**

For part (a), we use linear momentum conservation. For part (b), we use angular momentum conservation about the person's center of mass. For part (c), we compare initial and final kinetic energies.

**Solution**

**(a)** Linear momentum conservation:

<div class="equation">
$$ m_{\text{ball}}v_{\text{ball}} = (m_{\text{ball}} + m_{\text{person}})v' $$
</div>

<div class="equation">
$$ v' = \frac{m_{\text{ball}}v_{\text{ball}}}{m_{\text{ball}} + m_{\text{person}}} = \frac{(0.250 \kg)(15.0 \text{ m/s})}{0.250 + 70.0} = \frac{3.75}{70.25} = 0.0534 \text{ m/s} $$
</div>

**(b)** For angular momentum, assume the ball is caught at arm's length (0.900 m from center).

Initial angular momentum (ball only):

<div class="equation">
$$ L = m_{\text{ball}}v_{\text{ball}}r = (0.250 \kg)(15.0 \text{ m/s})(0.900 \m) = 3.375 \kg \cdot \mms $$
</div>

Moment of inertia of the system after catching:

Body (cylinder, mass = 70 - 2(5) = 60 kg):
<div class="equation">
$$ I_{\text{body}} = \frac{1}{2}M_{\text{body}}R^2 = \frac{1}{2}(60 \kg)(0.180 \m)^2 = 0.972 \kg \cdot \mm $$
</div>

Two arms (rods rotating about center):
<div class="equation">
$$ I_{\text{arms}} = 2 \times \frac{1}{3}m_{\text{arm}}L^2 = 2 \times \frac{1}{3}(5.00 \kg)(0.900 \m)^2 = 2.70 \kg \cdot \mm $$
</div>

Ball (point mass at r = 0.900 m):
<div class="equation">
$$ I_{\text{ball}} = m_{\text{ball}}r^2 = (0.250 \kg)(0.900 \m)^2 = 0.203 \kg \cdot \mm $$
</div>

Total moment of inertia:
<div class="equation">
$$ I_{\text{total}} = 0.972 + 2.70 + 0.203 = 3.875 \kg \cdot \mm $$
</div>

Angular velocity:
<div class="equation">
$$ \omega = \frac{L}{I_{\text{total}}} = \frac{3.375 \kg \cdot \mms}{3.875 \kg \cdot \mm} = 0.871 \text{ rad/s} $$
</div>

**(c)** Initial kinetic energy (ball only):

<div class="equation">
$$ KE_i = \frac{1}{2}m_{\text{ball}}v_{\text{ball}}^2 = \frac{1}{2}(0.250 \kg)(15.0 \text{ m/s})^2 = 28.1 \J $$
</div>

Final kinetic energy (translational + rotational):

<div class="equation">
$$ KE_{\text{trans}} = \frac{1}{2}(m_{\text{ball}} + m_{\text{person}})v'^2 = \frac{1}{2}(70.25 \kg)(0.0534 \text{ m/s})^2 = 0.100 \J $$
</div>

<div class="equation">
$$ KE_{\text{rot}} = \frac{1}{2}I_{\text{total}}\omega^2 = \frac{1}{2}(3.875 \kg \cdot \mm)(0.871 \text{ rad/s})^2 = 1.47 \J $$
</div>

<div class="equation">
$$ KE_f = 0.100 + 1.47 = 1.57 \J $$
</div>

**Discussion**

Most of the initial kinetic energy (28.1 - 1.57 = 26.5 J, or 94%) is lost in this inelastic collision. The person acquires a small linear velocity (5.34 cm/s) and rotates at 0.871 rad/s. The energy loss goes into deformation, sound, and heat during the catch.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [Example 1](#example1) in which the stick is free to have translational motion as well as rotational motion.

</div>
<div class="solution"  markdown="1">
(a) 1.70 rad/s

(b) Initial KE = 22.5 J, final KE = 2.04 J

(c) $$ 1.50 \kg \cdot \ms $$

</div>
</div>
