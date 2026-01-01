---
title: Conservation of Momentum
layout: page
sectionNumber: 3
chapterNumber: 8
---

<div class="abstract" markdown="1">
* Describe the principle of conservation of momentum.
* Derive an expression for the conservation of momentum.
* Explain conservation of momentum with examples.
* Explain the principle of conservation of momentum as it relates to atomic and subatomic particles.

</div>

Momentum is an important quantity because it is conserved. Yet it was not
conserved in the examples in [Impulse](./ch8Impulse)
and [Linear Momentum and Force](./ch8LinearMomentumAndForce), where
large changes in momentum were produced by forces acting on the system of
interest. Under what circumstances is momentum conserved?

The answer to this question entails considering a sufficiently large system. It
is always possible to find a larger system in which total momentum is constant,
even if momentum changes for components of the system. If a football player runs
into the goalpost in the end zone, there will be a force on him that causes him
to bounce backward. However, the Earth also recoils —conserving momentum—because
of the force applied to it through the goalpost. Because Earth is many orders of
magnitude more massive than the player, its recoil is immeasurably small and can
be neglected in any practical sense, but it is real nevertheless.

Consider what happens if the masses of two colliding objects are more similar
than the masses of a football player and Earth—for example, one car bumping into
another, as shown in [Figure 1](#Figure1). Both cars are coasting in the same
direction when the lead car (labeled $$ m_{2} $$)  is bumped by the trailing
car (labeled $$ m_{1} $$ ). The only unbalanced force on each car is the force
of the collision. (Assume that the effects due to friction are negligible.) Car
1 slows down as a result of the collision, losing some momentum, while car 2
speeds up and gains some momentum. We shall now show that the total momentum of
the two-car system remains constant.

![A brown car with velocity V 1 and mass m 1 moves toward the right behind a tan car of velocity V 2 and mass m 2. The system of interest has a total momentum equal to the sum of individual momentums p 1 and p 2. The net force between them is zero before they collide with one another. The brown car after colliding with the tan car has velocity V 1prime and momentum p 1 prime and the light brown car moves with velocity V 2 prime and momentum p 2 prime. Both move in the same direction as before collision. This system of interest has a total momentum equal to the sum p 1 prime and p 2 prime.](../resources/Figure_08_03_01.jpg 'A car of mass ( m_1 ) moving with a velocity of ( v_1 ) bumps into another car of mass ( m_2 ) and velocity ( v_2 ) that it is following. As a result, the first car slows down to a velocity of ( v^\\prime_1 ) and the second speeds up to a velocity of ( v^\\prime_2 ). The momentum of each car is changed, but the total momentum ( p_{\\text{tot}} ) of the two cars is the same before and after the collision (if you assume friction is negligible).')
{: #Figure1}

Using the definition of impulse, the change in momentum of car 1 is given by

<div class="equation">
 $$ \Delta p_{1}= F_{1}\Delta t, $$
</div>

where $$ F\_{1} $$ is the force on car 1 due to car 2, and $$ \Delta t $$ is the
time the force acts (the duration of the collision). Intuitively, it seems
obvious that the collision time is the same for both cars, but it is only true
for objects traveling at ordinary speeds. This assumption must be modified for
objects travelling near the speed of light, without affecting the result that
momentum is conserved.

Similarly, the change in momentum of car 2 is

<div class="equation">
 $$ \Delta p_{2}= F_{2}\Delta t , $$
</div>

where $$ F_{2} $$ is the force on car 2 due to car 1, and we assume the duration
of the collision $$ \Delta t $$ is the same for both cars. We know from Newton’s
third law that $$ F_{2}=- F\_{1} $$, and so

<div class="equation">
 $$ \Delta  p_{2}=- F_{1}\Delta t=-\Delta  p_{1}. $$
</div>

Thus, the changes in momentum are equal and opposite, and

<div class="equation">
 $$ \Delta  p_{1}+\Delta  p_{2}=0. $$
</div>

Because the changes in momentum add to zero, the total momentum of the two-car
system is constant. That is,

<div class="equation">
 $$ p_{1}+ p_{2}=\text{constant}, $$
</div>

<div class="equation">
 $$ p_{1}+ p_{2}={p^{\prime} }_{1}+{p^{\prime} }_{2}, $$
</div>

where $$ p^{\prime}_{1} $$ and $$ p^{\prime}_{2} $$ are the momenta of cars 1
and 2 after the collision. (We often use primes to denote the final state.)

This result—that momentum is conserved—has validity far beyond the preceding
one-dimensional case. It can be similarly shown that total momentum is conserved
for any isolated system, with any number of objects in it. In equation form,
the **conservation of momentum principle** for an isolated system is written

<div class="equation">
 $$ \vb{p}_{\text{tot}}=\text{constant}, $$
</div>

or

<div class="equation">
 $$ \vb{p}_{\text{tot}}={\vb{p}^{\prime} }_{\text{tot}}, $$
</div>

where $$ \vb{p}_{\text{tot}} $$ is the total momentum (the sum of the momenta of
the individual objects in the system) and $$ {\vb{p}^{\prime} }_{\text{tot}} $$
is the total momentum some time later. (The total momentum can be shown to be
the momentum of the center of mass of the system.) An **isolated system** is
defined to be one for which the net external force is zero $$ \left(\vb{F}\_ {\text{net}}=0\right). $$

<div class="note" data-label="">
<div class="title">
Conservation of Momentum Principle
</div>
<div class="equation">
 $$ \begin{array}{lll} \vb{p}_{\text{tot}}&=& \text{constant}\\ \vb{p}_{\text{tot}}&=& {\vb{p}^{\prime} }_{\text{tot}}\left(\text{isolated system}\right)\end{array} $$ 
</div>
</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Isolated System
</div>
An isolated system is defined to be one for which the net external force
is zero $$ \left(\vb{F}_{\text{net}}=0\right). $$

</div>

Perhaps an easier way to see that momentum is conserved for an isolated system
is to consider Newton’s second law in terms of momentum, $$ \vb{F}_ {\text{net}}=\frac{ \Delta \vb{p}_{\text{tot}}}{\Delta t} $$. For an isolated
system, $$ \left(\vb{F}_{\text{net}}=0\right) $$; thus, $$ \Delta \vb{p}_{\text{tot}}=0 $$, and $$ \vb{p}_ {\text{tot}} $$ is constant. We have noted that the three length dimensions in nature— $$ x $$, $$ y $$, and
$$ z $$—are independent, and it is interesting to note that momentum can be
conserved in different ways along each dimension. For example, during projectile
motion and where air resistance is negligible, momentum is conserved in the
horizontal direction because horizontal forces are zero and momentum is
unchanged. But along the vertical direction, the net vertical force is not zero
and the momentum of the projectile is not conserved. (
See [Figure 2](#Figure2)
.) However, if the momentum of the projectile-Earth system is considered in the
vertical direction, we find that the total momentum is conserved.

![A space probe is projected upward. It takes a parabolic path. No horizontal net force acts on. The horizontal component of momentum remains conserved. The vertical net force is not zero and the vertical component of momentum is not a constant. When the space probe separates, the horizontal net force remains zero as the force causing separation is internal to the system. The vertical net force is not zero and the vertical component of momentum is also not a constant after separation. The centre of mass however continues in the same parabolic path.](../resources/Figure_08_03_02.jpg 'The horizontal component of a projectile’s momentum is conserved if air resistance is negligible, even in this case where a space probe separates. The forces causing the separation are internal to the system, so that the net external horizontal force Fx–net is still zero. The vertical component of the momentum is not conserved, because the net vertical force Fy–net is not zero. In the vertical direction, the space probe-Earth system needs to be considered and we find that the total momentum is conserved. The center of mass of the space probe takes the same path it would if the separation did not occur.')
{: #Figure2}

The conservation of momentum principle can be applied to systems as different as
a comet striking Earth and a gas containing huge numbers of atoms and molecules.
Conservation of momentum is violated only when the net external force is not
zero. But another larger system can always be considered in which momentum is
conserved by simply including the source of the external force. For example, in
the collision of two cars considered above, the two-car system conserves
momentum while each one-car system does not.

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Investigation—Drop of Tennis Ball and a Basketball
</div>
Hold a tennis ball side by side and in contact with a basketball. Drop the balls together. (Be careful!) What happens? Explain your observations. Now hold the tennis ball above and in contact with the basketball. What happened? Explain your observations. What do you think will happen if the basketball ball is held above and in contact with the tennis ball?

</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Investigation—Two Tennis Balls in a Ballistic Trajectory
</div>
Tie two tennis balls together with a string about a foot long. Hold one ball and let the other hang down and throw it in a ballistic trajectory. Explain your observations. Now mark the center of the string with bright ink or attach a brightly colored sticker to it and throw again. What happened? Explain your observations.

Some aquatic animals such as jellyfish move around based on the principles of
conservation of momentum. A jellyfish fills its umbrella section with water and
then pushes the water out resulting in motion in the opposite direction to that
of the jet of water. Squids propel themselves in a similar manner but, in
contrast with jellyfish, are able to control the direction in which they move by
aiming their nozzle forward or backward. Typical squids can move at speeds of 8
to 12 km/h.

The ballistocardiograph (BCG) was a diagnostic tool used in the second half of
the 20th century to study the strength of the heart. About once a second, your
heart beats, forcing blood into the aorta. A force in the opposite direction is
exerted on the rest of your body (recall Newton’s third law). A
ballistocardiograph is a device that can measure this reaction force. This
measurement is done by using a sensor (resting on the person) or by using a
moving table suspended from the ceiling. This technique can gather information
on the strength of the heart beat and the volume of blood passing from the
heart. However, the electrocardiogram (ECG or EKG) and the echocardiogram (
cardiac ECHO or ECHO; a technique that uses ultrasound to see an image of the
heart) are more widely used in the practice of cardiology.

</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Conservation of Momentum and Collision
</div>
Conservation of momentum is quite useful in describing collisions. Momentum is crucial to our understanding of atomic and subatomic particles because much of what we know about these particles comes from collision experiments.

</div>

### Subatomic Collisions and Momentum

The conservation of momentum principle not only applies to the macroscopic
objects, it is also essential to our explorations of atomic and subatomic
particles. Giant machines hurl subatomic particles at one another, and
researchers evaluate the results by assuming conservation of momentum (among
other things).

On the small scale, we find that particles and their properties are invisible to
the naked eye but can be measured with our instruments, and models of these
subatomic particles can be constructed to describe the results. Momentum is
found to be a property of all subatomic particles including massless particles
such as photons that compose light. Momentum being a property of particles hints
that momentum may have an identity beyond the description of an object’s mass
multiplied by the object’s velocity. Indeed, momentum relates to wave properties
and plays a fundamental role in what measurements are taken and how we take
these measurements. Furthermore, we find that the conservation of momentum
principle is valid when considering systems of particles. We use this principle
to analyze the masses and other properties of previously undetected particles,
such as the nucleus of an atom and the existence of quarks that make up
particles of nuclei. [Figure 3](#Figure3) below illustrates how a particle
scattering backward from another implies that its target is massive and dense.
Experiments seeking evidence that **quarks** make up protons (one type of
particle that makes up nuclei) scattered high-energy electrons off

of protons (nuclei of hydrogen atoms). Electrons occasionally scattered straight
backward in a manner that implied a very small and very dense particle makes up
the proton—this observation is considered nearly direct evidence of quarks. The
analysis was based partly on the same conservation of momentum principle that
works so well on the large scale.

![An electron strikes on a macroscopic target and recoils back. A closer look shows the electron to scatter backward after interacting with the proton.](../resources/Figure_08_03_03.jpg 'A subatomic particle scatters straight backward from a target particle. In experiments seeking evidence for quarks, electrons were observed to occasionally scatter straight backward from a proton.')
{: #Figure3}

### Section Summary

- The conservation of momentum principle is written
  <div class="equation">
    $$ \vb{p}_{\text{tot}}=\text{constant} $$
  </div>

or

  <div class="equation">
 $$ \vb{p}_{\text{tot}}={\vb{p}^{\prime} }_{\text{tot}}\left(\text{isolated system}\right), $$
  </div>

$$ \vb{p}_{\text{tot}} $$ is the initial total momentum and $$ {\vb{p}^{\prime} }_{\text{tot}} $$ is the total momentum some time later.

- An isolated system is defined to be one for which the net external force is
  zero $$ \left( \vb{F}\_{\text{net}}=0\right). $$
- During projectile motion and where air resistance is negligible, momentum is
  conserved in the horizontal direction because horizontal forces are zero.
- Conservation of momentum applies only when the net external force is zero.
- The conservation of momentum principle is valid when considering systems of
  particles.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">

**Professional Application**

If you dive into water, you reach greater depths than if you do a belly flop.
Explain this difference in depth using the concept of conservation of energy.
Explain this difference in depth using what you have learned in this chapter.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Under what circumstances is momentum conserved?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Can momentum be conserved for a system if there are external forces acting on the system? If so, under what conditions? If not, why not?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Momentum for a system can be conserved in one direction while not being conserved in another. What is the angle between the directions? Give an example.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">

**Professional Application**

Explain in terms of momentum and Newton’s laws how a car’s air resistance is due
in part to the fact that it pushes air in its direction of motion.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Can objects in a system have momentum while the momentum of the system is zero? Explain your answer.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Must the total energy of a system be conserved whenever its momentum is conserved? Explain why or why not.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Train cars are coupled together by being bumped into one another. Suppose two
loaded train cars are moving toward one another, the first having a mass of 150
000 kg and a velocity of 0.300 m/s, and the second having a mass of 110 000 kg
and a velocity of $$ -0.120 \ms $$. (The minus indicates direction of motion.)
What is their final velocity?

</div>
<div class="solution" markdown="1">
**Strategy**

When the cars couple together, they undergo a perfectly inelastic collision. We apply conservation of momentum, with the final velocity being the same for both cars since they stick together.

**Solution**

Apply conservation of momentum:

$$ m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f $$

Substitute the known values:

$$ (150000 \kg)(0.300 \ms) + (110000 \kg)(-0.120 \ms) = (150000 + 110000) \kg \times v_f $$

Calculate each term:

$$ 45000 \kg \cdot \ms - 13200 \kg \cdot \ms = 260000 \kg \times v_f $$

$$ 31800 \kg \cdot \ms = 260000 \kg \times v_f $$

Solve for the final velocity:

$$ v_f = \frac{31800 \kg \cdot \ms}{260000 \kg} = 0.122 \ms $$

The final velocity of the coupled train cars is 0.122 m/s in the direction of the first car's initial motion.

**Discussion**

The positive final velocity indicates the coupled cars move in the direction of the heavier, faster car (car 1). The first car had more momentum (45,000 kg·m/s) than the second car (13,200 kg·m/s), so the net momentum is in the direction of the first car. This is a typical coupling operation where cars are gently bumped together at low speeds to minimize damage.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose a clay model of a koala bear has a mass of 0.200 kg and slides on ice at a speed of 0.750 m/s.
It runs into another clay model, which is initially motionless and has a mass of 0.350 kg.
Both being soft clay, they naturally stick together. What is their final velocity?

</div>
<div class="solution" markdown="1">
**Strategy**

This is a perfectly inelastic collision where two objects stick together. We apply conservation of momentum, recognizing that one object is initially at rest.

**Solution**

Apply conservation of momentum:

$$ m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f $$

Since the second clay model is initially at rest ($$ v_2 = 0 $$):

$$ m_1 v_1 = (m_1 + m_2) v_f $$

Solve for the final velocity:

$$ v_f = \frac{m_1 v_1}{m_1 + m_2} = \frac{(0.200 \kg)(0.750 \ms)}{0.200 \kg + 0.350 \kg} $$

$$ v_f = \frac{0.150 \kg \cdot \ms}{0.550 \kg} = 0.273 \ms $$

The final velocity of the combined clay models is 0.273 m/s in the direction of the first model's initial motion.

**Discussion**

The final velocity is less than the initial velocity of the moving koala, as expected when momentum is shared with a stationary object. The combined mass is 2.75 times the moving koala's mass, so the final velocity is reduced by approximately this factor (0.750/2.75 ≈ 0.273). This is a classic example of a perfectly inelastic collision where objects stick together and move as one unit afterward.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Consider the following question: _A car moving at 10 m/s crashes into a tree and
stops in 0.26 s. Calculate the force the seatbelt exerts on a passenger in the
car to bring him to a halt. The mass of the passenger is 70 kg._ Would the
answer to this question be different if the car with the 70-kg passenger had
collided with a car that has a mass equal to and is traveling in the opposite
direction and at the same speed? Explain your answer.

</div>
<div class="solution" markdown="1">
**Strategy**

First, solve the tree collision problem using impulse-momentum. Then, analyze the car-car collision using conservation of momentum to determine if the passenger experiences the same momentum change.

**Solution**

For the tree collision, calculate the force on the passenger:

$$ \Delta p = m(v_f - v_i) = (70 \kg)(0 - 10 \ms) = -700 \kg \cdot \ms $$

$$ F = \frac{\Delta p}{\Delta t} = \frac{-700 \kg \cdot \ms}{0.26 \s} = -2700 \N $$

The seatbelt exerts approximately 2700 N on the passenger.

For the car-car collision with identical cars moving at equal speeds in opposite directions:

By conservation of momentum:

$$ m(+10 \ms) + m(-10 \ms) = 2m \times v_f $$

$$ 0 = 2m \times v_f $$

$$ v_f = 0 $$

Both cars come to rest. The passenger's change in momentum is the same: from $$ +700 \kg \cdot \ms $$ to 0.

**Discussion**

The change in momentum is identical in both cases—the passenger goes from 10 m/s to 0. However, the **force** depends on the collision time, which may differ between the two scenarios. A car-car collision might have different deformation characteristics than hitting a rigid tree, potentially changing the stopping time. If the collision time in the car-car crash were longer (due to crumple zones in both cars absorbing energy over a longer distance), the force would be reduced. If shorter, the force would be greater. Without knowing the collision time for the car-car scenario, we cannot definitively compare the forces, but the momentum change remains the same.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the velocity of a 900-kg car initially moving at 30.0 m/s, just after it hits a 150-kg deer initially running at 12.0 m/s in the same direction? Assume the deer remains on the car.

</div>
<div class="solution" markdown="1">
**Strategy**

This is a perfectly inelastic collision where the deer remains on the car. Both objects are moving in the same direction initially. We apply conservation of momentum.

**Solution**

Apply conservation of momentum:

$$ m_{\text{car}} v_{\text{car}} + m_{\text{deer}} v_{\text{deer}} = (m_{\text{car}} + m_{\text{deer}}) v_f $$

Substitute the known values:

$$ (900 \kg)(30.0 \ms) + (150 \kg)(12.0 \ms) = (900 \kg + 150 \kg) v_f $$

Calculate the initial momenta:

$$ 27000 \kg \cdot \ms + 1800 \kg \cdot \ms = 1050 \kg \times v_f $$

$$ 28800 \kg \cdot \ms = 1050 \kg \times v_f $$

Solve for the final velocity:

$$ v_f = \frac{28800 \kg \cdot \ms}{1050 \kg} = 27.4 \ms $$

The velocity of the car with the deer is 27.4 m/s in the original direction of motion.

**Discussion**

The final velocity (27.4 m/s) is less than the car's initial velocity (30.0 m/s) but greater than the deer's initial velocity (12.0 m/s), as expected when two objects moving in the same direction collide and stick together. The car loses about 2.6 m/s of speed. Since both were moving in the same direction, the velocity change is less severe than a head-on collision would produce.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 1.80-kg falcon catches a 0.650-kg dove from behind in midair. What is their velocity after impact if the falcon's velocity is initially 28.0 m/s and the dove's velocity is 7.00 m/s in the same direction?

</div>
<div class="solution" markdown="1">
**Strategy**

When the falcon catches the dove, they move together as one object—a perfectly inelastic collision. Both birds are moving in the same direction, so we apply conservation of momentum with all velocities positive.

**Solution**

Apply conservation of momentum:

$$ m_{\text{falcon}} v_{\text{falcon}} + m_{\text{dove}} v_{\text{dove}} = (m_{\text{falcon}} + m_{\text{dove}}) v_f $$

Substitute the known values:

$$ (1.80 \kg)(28.0 \ms) + (0.650 \kg)(7.00 \ms) = (1.80 \kg + 0.650 \kg) v_f $$

Calculate each term:

$$ 50.4 \kg \cdot \ms + 4.55 \kg \cdot \ms = 2.45 \kg \times v_f $$

$$ 54.95 \kg \cdot \ms = 2.45 \kg \times v_f $$

Solve for the final velocity:

$$ v_f = \frac{54.95 \kg \cdot \ms}{2.45 \kg} = 22.4 \ms $$

The velocity of the falcon and dove after impact is 22.4 m/s in the same direction as the original motion.

**Discussion**

The final velocity (22.4 m/s) is between the initial velocities of the falcon (28.0 m/s) and the dove (7.00 m/s), as expected for a perfectly inelastic collision where both objects are moving in the same direction. The falcon slows down from 28.0 m/s to 22.4 m/s upon catching the dove. The falcon dominates the outcome because it has both greater mass and greater velocity, contributing 92% of the total initial momentum.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

conservation of momentum principle
: when the net external force is zero, the total momentum of the system is
conserved or constant

isolated system
: a system in which the net external force is zero

quark
: fundamental constituent of matter and an elementary particle

</div>
