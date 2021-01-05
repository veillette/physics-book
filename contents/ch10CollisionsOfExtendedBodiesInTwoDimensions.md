---
title: "Collisions of Extended Bodies in Two Dimensions"
layout: page
---

<div class="abstract" markdown="1">
* Observe collisions of extended bodies in two dimensions.
* Examine collision at the point of percussion.

</div>

Bowling pins are sent flying and spinning when hit by a bowling ball—angular
momentum as well as linear momentum and energy have been imparted to the pins. (
See [Figure](#fig1)). Many collisions involve angular
momentum. Cars, for example, may spin and collide on ice or a wet surface.
Baseball pitchers throw curves by putting spin on the baseball. A tennis player
can put a lot of top spin on the tennis ball which causes it to dive down onto
the court once it crosses the net. We now take a brief look at what happens when
objects that can rotate collide.

Consider the relatively simple collision shown
in [Figure](#fig2), in which a disk strikes and adheres to an
initially motionless stick nailed at one end to a frictionless surface. After
the collision, the two rotate about the nail. There is an unbalanced external
force on the system at the nail. This force exerts no torque because its lever
arm $$ r $$ is zero. Angular momentum is therefore conserved in the collision.
Kinetic energy is not conserved, because the collision is inelastic. It is
possible that momentum is not conserved either because the force at the nail may
have a component in the direction of the disk’s initial velocity. Let us examine
a case of rotation in a collision in [Figure](#fs-id3007371).

![A bowling ball, just as it is striking the pins.](../resources/Figure_11_06_01a.jpg "The bowling ball causes the pins to fly, some of them spinning violently. (credit: Tinou Bao, Flickr)")
{: #fig1}

![Figure a shows a disc m sliding toward a motionless stick M of length r pivoted about a nail, on a frictionless surface. In figure b, a disk hits the stick at one end and adheres to it, and the stick rotates, pivoting around the nail in a direction shown by the arrow in the clockwise direction and angular velocity omega.](../resources/Figure_11_06_02a.jpg "(a) A disk slides toward a motionless stick on a frictionless surface. &#10;        (b) The disk hits the stick at one end and adheres to it, and they rotate together, pivoting around the nail. Angular momentum is conserved for this inelastic collision because the surface is frictionless and the unbalanced external force at the nail exerts no torque.")
{: #fig2}

<div class="example" markdown="1">
<div class="title">
Rotation in a Collision
</div>
Suppose the disk in [Figure](#fig2) has a mass of 50.0 g and an initial velocity of 30.0 m/s when it strikes the stick that is 1.20 m long and 2.00 kg.

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
nail. [Figure](../contents/ch10DynamicsOfRotationalMotion.md#figMomentOfInertia) gives the formula for a rod
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
is known as the *percussion point*.

An analogous situation occurs in tennis as seen
in [Figure](#fig3). If you hit a ball with the end of your
racquet, the handle is pulled away from your hand. If you hit a ball much
farther down, for example, on the shaft of the racquet, the handle is pushed
into your palm. And if you hit the ball at the racquet’s percussion point (what
some people call the “sweet spot”), then little or *no* force is exerted on your
hand, and there is less vibration, reducing chances of a tennis elbow. The same
effect occurs for a baseball bat.

![In figure a, a disk hitting a stick is compared to a tennis ball being hit by a racquet. When the ball strikes the racquet near the end with a force denoted by f ball as shown by the direction of the arrow, a backward force, f hand is exerted on the hand, In figure b, when the racquet is struck much farther down by a force F ball, a forward force, f hand is exerted on the hand as shown by the arrows. In figure (c), when the racquet is struck by the ball with a force f ball at the percussion point, no force is delivered to the hand. This implies that f hand is equal to zero.](../resources/Figure_11_06_03.jpg "A disk hitting a stick is compared to a tennis ball being hit by a racquet. (a) When the ball strikes the racquet near the end, a backward force is exerted on the hand.
(b) When the racquet is struck much farther down, a forward force is exerted on the hand. (c) When the racquet is struck at the percussion point, no force is delivered to the hand.")
{: #fig3}

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

* Angular momentum $$ L $$ is analogous to linear
  momentum and is given by $$ L=I \omega $$.
* Angular momentum is changed by torque, following the relationship $$
 \text{net}\tau =\frac{ \Delta L}{\Delta t}. $$
* Angular momentum is conserved if the net torque is
  zero $$ L=\text{constant}\left( \text{net}\tau =0 \right) $$ or
 $$ L=L^{\prime} \left( \text{net}\tau = 0 \right) $$. This equation is known as
  the law of
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
Repeat [Figure](#fs-id3007371) in which the disk strikes and adheres to the stick 0.100 m from the nail.

</div>
<div class="solution" markdown="1">
(a) $$ 0.156 \rads $$

(b) $$ 1.17 \times 10^{-2} \J $$

(c) $$ 0.188 \kg \cdot \ms $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [Figure](#fs-id3007371) in which the disk originally spins clockwise at 1000 rpm and has a radius of 1.50 cm.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Twin skaters approach one another as shown in [Figure](#fig4) and lock hands.
(a) Calculate their final angular velocity, given each had an initial speed of 2.50 m/s relative to the ice. Each has a mass of 70.0 kg, and each has a center of mass located 0.800 m from their locked hands. You may approximate their moments of inertia to be that of point masses at this radius.
(b) Compare the initial kinetic energy and final kinetic energy.

![Figure a shows two skaters from the top view approaching each other from opposite directions with velocity v. In figure b two skaters then lock their right hands and start to spin in the clockwise direction with angular velocity omega.](../resources/Figure_11_06_04a.jpg "Twin skaters approach each other with identical speeds. Then, the skaters lock hands and spin.")
{: #fig4}

</div>
<div class="solution" markdown="1">
(a) 3.13 rad/s

(b) Initial KE = 438 J, final KE = 438 J

</div>
</div>

<div class="exercise">
<div class="problem" markdown="1">
Suppose a 0.250-kg ball is thrown at 15.0 m/s to a motionless person standing on ice who catches it with an outstretched arm as shown in [Figure](#fig5).

(a) Calculate the final linear velocity of the person, given his mass is 70.0 kg.

(b) What is his angular velocity if each arm is 5.00 kg? You may treat the ball
as a point mass and treat the person's arms as uniform rods (each has a length
of 0.900 m) and the rest of his body as a uniform cylinder of radius 0.180 m.
Neglect the effect of the ball on his center of mass so that his center of mass
remains in his geometrical center.

(c) Compare the initial and final total kinetic energies.

![Figure a shows a skater through an overhead view with both his hands outstretched. A ball is seen approaching toward him in air with velocity v. Figure b shows that skater catching two balls in his left hand, and then, recoiling toward the left, in clockwise direction, with angular velocity omega and finally, the balls have velocity v prime.](../resources/Figure_11_06_05a.jpg "The figure shows the overhead view of a person standing motionless on ice about to catch a ball. Both arms are outstretched. After catching the ball, the skater recoils and rotates.")
{: #fig5}

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [Figure](#fs-id3007371) in which the stick is free to have translational motion as well as rotational motion.

</div>
<div class="solution" id="eip-id1884339" markdown="1">
(a) 1.70 rad/s

(b) Initial KE = 22.5 J, final KE = 2.04 J

(c) $$ 1.50 \kg \cdot \ms $$
</div>
</div>
