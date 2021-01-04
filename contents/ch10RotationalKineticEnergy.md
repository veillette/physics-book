---
title: "Rotational Kinetic Energy: Work and Energy Revisited"
layout: page
---


<div class="abstract" markdown="1">
* Derive the equation for rotational work.
* Calculate rotational kinetic energy.
* Demonstrate the Law of Conservation of Energy.

</div>

In this module, we will learn about work and energy associated with rotational
motion. [[Figure]](#import-auto-id3229349) shows a worker using an electric
grindstone propelled by a motor. Sparks are flying, and noise and vibration are
created as layers of steel are pared from the pole. The stone continues to turn
even after the motor is turned off, but it is eventually brought to a stop by
friction. Clearly, the motor had to work to get the stone spinning. This work
went into heat, light, sound, vibration, and considerable **rotational kinetic
energy**{: class="term" #import-auto-id2669979} .

![The figure shows a mechanic cutting metal with a metal grinder. The sparks are emerging from the point of contact and jumping off tangentially from the cutter.](../resources/Figure_11_04_01a.jpg "The motor works in spinning the grindstone, giving it rotational kinetic energy. That energy is then converted to heat, light, sound, and vibration. (credit: U.S. Navy photo by Mass Communication Specialist Seaman Zachary David Bell)")
{: #import-auto-id3229349}

Work must be done to rotate objects such as grindstones or merry-go-rounds. Work
was defined in [Uniform Circular Motion and Gravitation](../contents/ch6UniformCircularMotionAndGravitation.md) for
translational motion, and we can build on that knowledge when considering work
done in rotational motion. The simplest rotational situation is one in which the
net force is exerted perpendicular to the radius of a disk (as shown
in [[Figure]](#import-auto-id2009471)) and remains perpendicular as the disk
starts to rotate. The force is parallel to the displacement, and so the net work
done is the product of the force times the arc length traveled:

<div class="equation" id="eip-458">
 $$ \text{net}W=\left(\text{net}F\right)\Delta s. $$
</div>

To get torque and other rotational quantities into the equation, we multiply and
divide the right-hand side of the equation by $$ r $$, and gather terms:

<div class="equation" id="eip-909">
 $$ \text{net}W=\left(r\text{net}F\right)\frac{ \Delta s}{r}. $$
</div>

We recognize that $$ r\text{net}F=\text{net τ} $$ and $$ \Delta s/r=\theta $$,
so that

<div class="equation" id="eip-690">
 $$ \text{net}W=\left(\text{net τ}\right)\theta . $$
</div>

This equation is the expression for rotational work. It is very similar to the
familiar definition of translational work as force multiplied by distance. Here,
torque is analogous to force, and angle is analogous to distance. The equation
$$ \text{net}W=\left(\text{net τ}\right)\theta $$ is valid in general, even
though it was derived for a special case.

To get an expression for rotational kinetic energy, we must again perform some
algebraic manipulations. The first step is to note that $$ \text{net τ}=I\alpha
$$, so that

<div class="equation" id="eip-404">
 $$ \text{net}W=I \alpha \theta . $$
</div>

![The figure shows a circular disc of radius r. A net force F is applied perpendicular to the radius, rotating the disc in an anti-clockwise direction and producing a displacement equal to delta S, in a direction parallel to the direction of the force applied. The angle covered is theta.](../resources/Figure_11_04_02a.jpg "The net force on this disk is kept perpendicular to its radius as the force causes the disk to rotate. The net work done is thus \( \text{net} F \cdot \Delta s \). The net work goes into rotational kinetic energy.")
{: #import-auto-id2009471}

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections
</div>
Work and energy in rotational motion are completely analogous to work and energy in translational motion, first presented in [Uniform Circular Motion and Gravitation](../contents/ch6UniformCircularMotionAndGravitation.md).

</div>

Now, we solve one of the rotational kinematics equations for $$ \alpha \theta
$$. We start with the equation

<div class="equation" id="eip-750">
 $$ \omega^{2}= \omega_{0}^{2}+2 \alpha \theta. $$
</div>

Next, we solve for $$ \alpha \theta $$:

<div class="equation" id="eip-241">
 $$ \alpha \theta=\frac{ \omega^{2}- \omega_{0}^{2} }{2}. $$
</div>

Substituting this into the equation for net $$ W $$ and gathering terms yields

<div class="equation" id="eip-789">
 $$ \text{net}W=\frac{1}{2}I\omega^{2}-\frac{1}{2}I \omega_{0}^{2}. $$
</div>

This equation is the **work-energy theorem**{: class="term"
#import-auto-id2409820} for rotational motion only. As you may recall, net work
changes the kinetic energy of a system. Through an analogy with translational
motion, we define the term $$ \left(\frac{1}{2}\right)I\omega^{2} $$ to be
**rotational kinetic energy**{: class="term" #import-auto-id3012447} $$
\KE_{\text{rot}} $$ for an object with a moment of inertia $$ I $$ and
an angular velocity $$ \omega $$ :

<div class="equation" id="eip-682">
 $$ \KE_{\text{rot}}=\frac{1}{2} I\omega^{2}. $$
</div>

The expression for rotational kinetic energy is exactly analogous to
translational kinetic energy, with $$ I $$ being analogous to $$ m $$ and $$
\omega $$ to $$ v $$. Rotational kinetic energy has important effects.
Flywheels, for example, can be used to store large amounts of rotational kinetic
energy in a vehicle, as seen in [[Figure]](#import-auto-id1614457).

![The figure shows a bus carrying a large flywheel on its board in which rotational kinetic energy is stored.](../resources/Figure_11_04_03a.jpg "Experimental vehicles, such as this bus, have been constructed in which rotational kinetic energy is stored in a large flywheel. When the bus goes down a hill, its transmission converts its gravitational
potential energy into \(  \KE_{\text{rot}} /). It can also convert translational kinetic energy, when the bus stops, into
\( \KE_{\text{rot}} /). The flywheel&#x2019;s energy can then be used to accelerate, to go up another hill, or to keep the bus from going against friction.")
{: #import-auto-id1614457}

<div class="example" markdown="1">
<div class="title">
Calculating the Work and Energy for Spinning a Grindstone
</div>
Consider a person who spins a large grindstone by placing her hand on its edge and exerting a force through part of a
revolution as shown in [[Figure]](#import-auto-id2674234). In this example,
we verify that the work done by the torque she exerts equals the change in rotational energy.
(a) How much work is done if she exerts a force of 200 N through
a rotation of $$ 1.00 \text{rad}\left(57.3^\circ\right) $$?
The force is kept perpendicular to the grindstone’s 0.320-m radius at the
point of application, and the effects of friction are negligible.
(b) What is the final angular velocity if the grindstone has a mass of 85.0 kg?
(c) What is the final rotational kinetic energy? (It should equal the work.)

**Strategy**

To find the work, we can use the equation $$ \text{net}W=\left(\text{net
τ}\right)\theta $$. We have enough information to calculate the torque and are
given the rotation angle. In the second part, we can find the final angular
velocity using one of the kinematic relationships. In the last part, we can
calculate the rotational kinetic energy from its expression in $$ \KE_
{\text{rot}}=\frac{1}{2}I\omega^{2} $$.

**Solution for (a)**

The net work is expressed in the equation

<div class="equation" id="eip-117">
 $$ \text{net}W=\left(\text{net τ}\right)\theta , $$
</div>
where net $$ \tau $$ is the applied force multiplied by the radius $$ \left(rF\right) $$ because
there is no retarding friction, and the force is perpendicular to $$ r $$. The
angle $$ \theta $$ is given. Substituting the given values in the equation above
yields

<div class="equation" id="eip-348">
 $$ \begin{array}{lll}
\text{net}W& =& rF\theta =\left(0.320 \m \right)\left(200 \N \right)\left(1.00 \text{rad}\right)\\
 & =& 64.0 \N \cdot \m .
\end{array} $$
</div>
Noting that $$ 1 \N·\m =1 \J $$,

<div class="equation" id="eip-903">
 $$ \text{net}W=64.0 \J . $$
</div>
![The figure shows a large grindstone of radius r which is being given a spin by applying a force F in a counterclockwise direction, as indicated by the arrows.](../resources/Figure_11_04_04a.jpg "A large grindstone is given a spin by a person grasping its outer edge."){: #import-auto-id2674234 height="225"}

**Solution for (b)**

To find $$ \omega $$ from the given information requires more than one step. We
start with the kinematic relationship in the equation

<div class="equation" id="eip-576">
 $$ \omega^{2}=\omega_{0}^{2}+2 \alpha \theta. $$
</div>
Note that $$ \omega_{0}=0 $$ because we start from rest. Taking the square root of the resulting equation
gives

<div class="equation" id="eip-981">
 $$ \omega ={\left(2 \alpha \theta\right)}^{1/2}. $$
</div>
Now we need to find $$ \alpha $$. One possibility is

<div class="equation" id="eip-825">
 $$ \alpha =\frac{ \text{net τ}}{I}, $$
</div>
where the torque is

<div class="equation" id="eip-643">
 $$ \text{net τ}=rF=\left(0.320 \m \right)\left(200 \N \right)=64.0 \N \cdot \m . $$
</div>
The formula for the moment of inertia for a disk is found
in [[Figure]](../contents/ch10DynamicsOfRotationalMotion.md#figMomentOfInertia) :

<div class="equation" id="eip-119">
 $$ I=\frac{1}{2} MR^{2}=0.5\left(85.0 \kg \right){\left(0.320 \m \right)}^{2}=4.352 \kg \cdot \mm. $$
</div>
Substituting the values of torque and moment of inertia into the expression for $$ \alpha $$,
we obtain

<div class="equation" id="eip-877">
 $$ \alpha =\frac{64.0 \N \cdot \m }{4.352 \kg \cdot \mm}=14.7 \radss . $$
</div>
Now, substitute this value and the given value for $$ \theta $$
into the above expression for $$ \omega $$:

<div class="equation" id="eip-116">
 $$ \omega ={\left(2 \alpha \theta \right)}^{1/2}=
{\left[2\left(14.7 \radss \right) \left(1.00 \text{rad} \right) \right]}^{1/2}
=5.42 \rads . $$
</div>

**Solution for (c)**

The final rotational kinetic energy is

<div class="equation" id="eip-291">
 $$ \KE_{\text{rot}}=\frac{1}{2}I\omega^{2}. $$
</div>
Both $$ I $$ and $$ \omega $$ were found above. Thus,

<div class="equation" id="eip-256">
 $$ \KE_{\text{rot}}=\left(0.5\right)\left(4.352 \kg \cdot \mm\right){\left(5.42 \rads \right)}^{2}=64.0 \J . $$
</div>

**Discussion**

The final rotational kinetic energy equals the work done by the torque, which
confirms that the work done went into rotational kinetic energy. We could, in
fact, have used an expression for energy instead of a kinematic relation to
solve part (b). We will do this in later examples.

</div>

Helicopter pilots are quite familiar with rotational kinetic energy. They know,
for example, that a point of no return will be reached if they allow their
blades to slow below a critical angular velocity during flight. The blades lose
lift, and it is impossible to immediately get the blades spinning fast enough to
regain it. Rotational kinetic energy must be supplied to the blades to get them
to rotate faster, and enough energy cannot be supplied in time to avoid a crash.
Because of weight limitations, helicopter engines are too small to supply both
the energy needed for lift and to replenish the rotational kinetic energy of the
blades once they have slowed down. The rotational kinetic energy is put into
them before takeoff and must not be allowed to drop below this crucial level.
One possible way to avoid a crash is to use the gravitational potential energy
of the helicopter to replenish the rotational kinetic energy of the blades by
losing altitude and aligning the blades so that the helicopter is spun up in the
descent. Of course, if the helicopter’s altitude is too low, then there is
insufficient time for the blade to regain lift before reaching the ground.

<div class="note" data-label="" markdown="1">
<div class="title">
Problem-Solving Strategy for Rotational Energy
</div>
1.  {: #import-auto-id3054599} *Determine that energy or work is involved in the rotation*.
2.  {: #import-auto-id1389478} *Determine the system of interest*. A sketch usually helps.
3.  {: #import-auto-id2930250} *Analyze the situation to determine the types of work and energy involved*.
4.  {: #import-auto-id2937257} *For closed systems, mechanical energy is conserved*. That is,
 $$ \KE_{\text{i}}+\PE_{\text{i}}=\KE_{\text{f}}+\PE_{\text{f}}. $$
    Note that $$ \KE_{\text{i}} $$ and $$ \KE_{\text{f}} $$ may each include translational and rotational contributions.

5. {: #import-auto-id1439188} *For open systems*, mechanical energy may not be
   conserved, and other forms of energy (  referred to previously as $$ \text{OE} $$),
   such as heat transfer, may enter or leave the system. Determine what they
   are, and calculate them as necessary.
6. {: #import-auto-id1429438} *Eliminate terms wherever possible to simplify the
   algebra*.
7. {: #import-auto-id3386776} *Check the answer to see if it is reasonable*. {:
   type="1"}

</div>

<div class="example" markdown="1">
<div class="title">
Calculating Helicopter Energies
</div>
A typical small rescue helicopter, similar to the one in [[Figure]](#import-auto-id2420248), has
four blades, each is 4.00 m long and has a mass of 50.0 kg. The blades can be approximated as thin rods that rotate about one end of an axis perpendicular to their length. The helicopter has a total loaded mass of 1000 kg.
(a) Calculate the rotational kinetic energy in the blades when they rotate at 300 rpm.
(b) Calculate the translational kinetic energy of the helicopter when it flies at 20.0 m/s, and compare it with the rotational energy in the blades.
(c) To what height could the helicopter be raised if all of the rotational kinetic energy could be used to lift it?

**Strategy**

Rotational and translational kinetic energies can be calculated from their
definitions. The last part of the problem relates to the idea that energy can
change form, in this case from rotational kinetic energy to gravitational
potential energy.

**Solution for (a)**

The rotational kinetic energy is

<div class="equation" id="eip-327">
 $$ \KE_{\text{rot}}=\frac{1}{2}I\omega^{2}. $$
</div>
We must convert the angular velocity to radians per second and calculate the moment of inertia before we can find $$ \KE_{\text{rot}} $$. The angular velocity $$ \omega $$
is

<div class="equation" id="eip-583">
 $$ \omega =\frac{300 \text{rev}}{1.00 \text{min}}\cdot \frac{2 \pi \text{rad}}{1 \text{rev}}\cdot \frac{1.00 \text{min}}{60.0 \s }=31.4\frac{ \text{rad}}{\s}. $$
</div>
The moment of inertia of one blade will be that of a thin rod rotated about its end,
found in [[Figure]](../contents/ch10DynamicsOfRotationalMotion.md#figMomentOfInertia). The total $$ I $$
is four times this moment of inertia, because there are four blades. Thus,

<div class="equation" id="eip-897">
 $$ I=4\frac{ M\ell^{2}}{3}=4×\frac{ \left(50.0 \kg \right){\left(4.00 \m \right)}^{2}}{3}=1067 \kg \cdot \mm. $$
</div>
Entering $$ \omega $$ and $$ I $$ into the expression for rotational kinetic energy gives

<div class="equation" id="eip-913">
 $$ \begin{array}{lll}
\KE_{\text{rot}}& =& 0.5\left(1067 \kg \cdot \mm\right){\left(31.4 \rads \right)}^{2}\\
 & =& 5.26\times 10^{5} \J
\end{array} $$
</div>

**Solution for (b)**

Translational kinetic energy was defined
in [Uniform Circular Motion and Gravitation](../contents/ch6UniformCircularMotionAndGravitation.md). Entering the
given values of mass and velocity, we obtain

<div class="equation" id="eip-2">
 $$ \KE_{\text{trans}}=\frac{1}{2}m v^{2}=\left(0.5\right)\left(1000 \kg \right){\left(20.0 \ms \right)}^{2}=2.00\times 10^{5} \J . $$
</div>
To compare kinetic energies, we take the ratio of translational kinetic energy to rotational kinetic energy. This ratio is

<div class="equation" id="eip-973">
 $$ \frac{2.00\times 10^{5} \J }{5.26\times 10^{5} \J }=0.380. $$
</div>

**Solution for (c)**

At the maximum height, all rotational kinetic energy will have been converted to
gravitational energy. To find this height, we equate those two energies:

<div class="equation" id="eip-487">
 $$ \KE_{\text{rot}}=\PE_{\text{grav}} $$
</div>
or

<div class="equation" id="eip-154">
 $$ \frac{1}{2}I\omega^{2}=mgh . $$
</div>
We now solve for $$ h $$ and substitute known values into the resulting equation

<div class="equation" id="eip-232">
 $$ h=\frac{ \frac{1}{2} I \omega^{2} }{mg}=\frac{5.26\times 10^{5} \J }{\left(1000 \kg \right)\left(9.80\mss \right)}=53.7 \m . $$
</div>

**Discussion**

The ratio of translational energy to rotational kinetic energy is only 0.380.
This ratio tells us that most of the kinetic energy of the helicopter is in its
spinning blades—something you probably would not suspect. The 53.7 m height to
which the helicopter could be raised with the rotational kinetic energy is also
impressive, again emphasizing the amount of rotational kinetic energy in the
blades.

</div>

![The given figure here shows a helicopter from the Auckland Westpac Rescue Helicopter Service over a sea. A rescue diver is shown holding the iron stand bar at the bottom of the helicopter, clutching a person. In the other image just above this, the blades of the helicopter are shown with their anti-clockwise rotation direction shown with an arrow and the length of one blade is given as four meters.](../resources/Figure_11_04_05a.jpg "The first image shows how helicopters store large amounts of rotational kinetic energy in their blades. This energy must be put into the blades before takeoff and maintained until the end of the flight. The engines do not have enough power to simultaneously provide lift and put significant rotational energy into the blades. The second image shows a helicopter from the Auckland Westpac Rescue Helicopter Service. Over 50 000 lives have been saved since its operations beginning in 1973. Here, a water rescue operation is shown. (credit: 111 Emergency, Flickr)")
{: #import-auto-id2420248 height="300"}

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections
</div>
Conservation of energy includes rotational motion, because rotational
kinetic energy is another form of $$ \KE $$. [Uniform Circular Motion and Gravitation](../contents/ch6UniformCircularMotionAndGravitation.md) has a detailed
treatment of conservation of energy.

</div>

### How Thick Is the Soup? Or Why Don’t All Objects Roll Downhill at the Same Rate?

One of the quality controls in a tomato soup factory consists of rolling filled
cans down a ramp. If they roll too fast, the soup is too thin. Why should cans
of identical size and mass roll down an incline at different rates? And why
should the thickest soup roll the slowest?

The easiest way to answer these questions is to consider energy. Suppose each
can starts down the ramp from rest. Each can starting from rest means each
starts with the same gravitational potential energy $$ \PE_{\text{grav}}
$$, which is converted entirely to $$ \KE $$, provided each rolls without
slipping. $$ \KE $$, however, can take the form of $$ \KE_
{\text{trans}} $$ or $$ \KE_{\text{rot}} $$, and total $$ \KE $$
is the sum of the two. If a can rolls down a ramp, it puts part of its energy
into rotation, leaving less for translation. Thus, the can goes slower than it
would if it slid down. Furthermore, the thin soup does not rotate, whereas the
thick soup does, because it sticks to the can. The thick soup thus puts more of
the can’s original gravitational potential energy into rotation than the thin
soup, and the can rolls more slowly, as seen
in [[Figure]](#import-auto-id3105621).

![The figure shows a flat surface inclined at a height of h from the surface level, with three cans of soup of different densities numbered as one, two, and three rolling along it.](../resources/Figure_11_04_06a.jpg "Three cans of soup with identical masses race down an incline. The first can has a low friction coating and does not roll but just slides down the incline. It wins because it converts its entire PE into translational KE. The second and third cans both roll down the incline without slipping. The second can contains thin soup and comes in second because part of its initial PE goes into rotating the can (but not the thin soup). The third can contains thick soup. It comes in third because the soup rotates along with the can, taking even more of the initial PE for rotational KE, leaving less for translational KE.")
{: #import-auto-id3105621}

Assuming no losses due to friction, there is only one force doing work—gravity.
Therefore the total work done is the change in kinetic energy. As the cans start
moving, the potential energy is changing into kinetic energy. Conservation of
energy gives

<div class="equation" id="eip-138">
 $$ \PE_\text{i}=\KE_\text{f}. $$
</div>

More specifically,

<div class="equation" id="eip-449">
 $$ \PE_{\text{grav}}=\KE_{\text{trans}}+\KE_{\text{rot}} $$
</div>

or

<div class="equation" id="eip-210">
 $$ mgh =\frac{1}{2}m v^{2}+\frac{1}{2}I\omega^{2} . $$
</div>

So, the initial $$ mgh $$ is divided between translational kinetic energy and
rotational kinetic energy; and the greater $$ I $$ is, the less energy goes into
translation. If the can slides down without friction, then $$ \omega =0 $$ and
all the energy goes into translation; thus, the can goes faster.

<div class="note" data-label="" markdown="1">
<div class="title">
Take-Home Experiment
</div>
Locate several cans each containing different types of food. First, predict which can will win the race down an inclined plane and explain why. See if your prediction is correct. You could also do this experiment by collecting several empty cylindrical containers of the same size and filling them with different materials such as wet or dry sand.

</div>

<div class="example" markdown="1">
<div class="title">
Calculating the Speed of a Cylinder Rolling Down an Incline
</div>
Calculate the final speed of a solid cylinder that rolls down a 2.00-m-high incline. The cylinder starts from rest, has a mass of 0.750 kg, and has a radius of 4.00 cm.

**Strategy**

We can solve for the final velocity using conservation of energy, but we must
first express rotational quantities in terms of translational quantities to end
up with $$ v $$ as the only unknown.

**Solution**

Conservation of energy for this situation is written as described above:

<div class="equation" id="eip-454">
 $$ mgh =\frac{1}{2}m v^{2}+\frac{1}{2}I\omega^{2} . $$
</div>
Before we can solve for $$ v $$, we must get an expression for $$ I $$
from [[Figure]](../contents/ch10DynamicsOfRotationalMotion.md#figMomentOfInertia). Because $$ v $$ and $$ \omega $$
are related (note here that the cylinder is rolling without slipping), we must
also substitute the relationship $$ \omega =v/R $$ into the expression. These
substitutions yield

<div class="equation" id="eip-97">
 $$ mgh =\frac{1}{2}m v^{2}+\frac{1}{2}\left(\frac{1}{2}m R^{2}\right)\left(\frac{ v^{2}}{ R^{2}}\right). $$
</div>
Interestingly, the cylinder’s radius $$ R $$ and mass $$ m $$ cancel, yielding

<div class="equation" id="eip-798">
 $$ g h =\frac{1}{2}{v}^{2}+\frac{1}{4}{v}^{2}=\frac{3}{4}{v}^{2} . $$
</div>
Solving algebraically, the equation for the final velocity $$ v $$ gives

<div class="equation" id="eip-320">
 $$ v=\sqrt{ \frac{4 g h }{3} } . $$
</div>
Substituting known values into the resulting expression yields

<div class="equation" id="eip-191">
 $$ v=\sqrt{ \frac{4\left(9.80\mss \right)\left(2.00 \m \right)}{3} }=5.11 \ms . $$
</div>

**Discussion**

Because $$ m $$ and $$ R $$ cancel, the result $$ v=\sqrt{\frac{4}{3}g h} $$ is valid for any solid cylinder, implying that all solid
cylinders will roll down an incline at the same rate independent of their masses
and sizes. (Rolling cylinders down inclines is what Galileo actually did to show
that objects fall at the same rate independent of mass.) Note that if the
cylinder slid without friction down the incline without rolling, then the entire
gravitational potential energy would go into translational kinetic energy. Thus,
$$ \frac{1}{2}m v^{2}=mgh $$ and $$ v=\sqrt{2g h } $$, which is 22%
greater than $$ \sqrt{4g h /3} $$. That is, the cylinder would go
faster at the bottom.

</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
<span class="title">Analogy of Rotational and Translational Kinetic Energy</span>
Is rotational kinetic energy completely analogous to translational kinetic energy?
What, if any, are their differences? Give an example of each type of kinetic energy.

</div>
<div class="solution" markdown="1">
Yes, rotational and translational kinetic energy are exact analogs.
They both are the energy of motion involved with the coordinated (non-random)
movement of mass relative to some reference frame. The only difference between
rotational and translational kinetic energy is that translational is straight
line motion while rotational is not. An example of both kinetic and translational
kinetic energy is found in a bike tire while being ridden down a bike path.
The rotational motion of the tire means it has rotational kinetic energy while
the movement of the bike along the path means the tire also has translational
kinetic energy. If you were to lift the front wheel of the bike and spin it
while the bike is stationary, then the wheel would have only rotational
kinetic energy relative to the Earth.

</div>
</div>

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 My Solar System
</div>
Build your own system of heavenly bodies and watch the gravitational ballet.
With this orbit simulator, you can set initial positions, velocities,
and masses of 2, 3, or 4 bodies, and then see them orbit each other.

<figure markdown="1">
<iframe src="https://veillette.github.io/simulations/my-solar-system/#sim-my-solar-system" width="750" height="500"  allowfullscreen></iframe>
<figcaption>
My solar system
</figcaption>
</figure>
</div>

### Section Summary

* {: #import-auto-id1360816} The rotational kinetic energy $$ \KE_
  {\text{rot}} $$ for an object with a moment of inertia $$ I $$ and an angular
  velocity $$ \omega $$ is given by
  <div class="equation" id="eip-595">
 $$ \KE_{\text{rot}}=\frac{1}{2}I\omega^{2} . $$
  </div>

* {: #import-auto-id1972580} Helicopters store large amounts of rotational
  kinetic energy in their blades. This energy must be put into the blades before
  takeoff and maintained until the end of the flight. The engines do not have
  enough power to simultaneously provide lift and put significant rotational
  energy into the blades.
* {: #import-auto-id3224025} Work and energy in rotational motion are completely
  analogous to work and energy in translational motion.
* {: #import-auto-id2453212} The equation for the **work-energy theorem**{:
  class="term"} for rotational motion is,
  <div class="equation" id="eip-669">
 $$ \text{net}W=\frac{1}{2}I\omega^{2}-\frac{1}{2}I \omega_{0}^{2} . $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Describe the energy transformations involved when a yo-yo is thrown downward and then climbs back up its string to be caught in the user’s hand.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What energy transformations are involved when a dragster engine is revved, its clutch let out rapidly, its tires spun, and it starts to accelerate forward? Describe the source and transformation of energy at each step.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The Earth has more rotational kinetic energy now than did the cloud of gas and dust from which it formed. Where did this energy come from?

![The figure shows a closed view of a red planet in the sky, with a sun like object seen at the far right and the planet shown here being surrounded by circles of gas and dust.](../resources/Figure_11_04_07a.jpg "An immense cloud of rotating gas and dust contracted under the influence of gravity to form the Earth and in the process rotational kinetic energy increased. (credit: NASA)")
{: #import-auto-id2615448}

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
This problem considers energy and work aspects of [[Figure]](../contents/ch10DynamicsOfRotationalMotion.md#fs-id1468671)—use data from that example as needed.
(a) Calculate the rotational kinetic energy in the merry-go-round plus child when they have an angular velocity of 20.0 rpm.
(b) Using energy considerations, find the number of revolutions the father will have to push to achieve this angular velocity starting from rest.
(c) Again, using energy considerations, calculate the force the father must exert to stop the merry-go-round in two revolutions

</div>
<div class="solution" markdown="1">
(a) 185 J

(b) 0.0785 rev

(c) $$ W=9.81 \N $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the final velocity of a hoop that rolls without slipping down a 5.00-m-high hill, starting from rest?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the rotational kinetic energy of Earth on its axis.
(b) What is the rotational kinetic energy of Earth in its orbit around the Sun?

</div>
<div class="solution" markdown="1">
(a) $$ 2.57\times 10^{29} \J $$

(b) $$ \KE_{\text{rot}}=2.65\times 10^{33} \J $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the rotational kinetic energy in the motorcycle wheel
([[Figure]](../contents/ch10DynamicsOfRotationalMotion.md#import-auto-id3370574))
if its angular velocity is 120 rad/s. Assume $$M = 12.0 \kg $$, $$R_1= 0.280 \m $$,
and $$R_2 = 0.330 \m $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A baseball pitcher throws the ball in a motion where there is rotation of the forearm
about the elbow joint as well as other movements. If the linear velocity of the ball relative to
the elbow joint is 20.0 m/s at a distance of 0.480 m from the joint and the moment of inertia of
the forearm is $$ 0.500 \kg \cdot \mm $$, what is the rotational kinetic energy of the forearm?

</div>
<div class="solution">
<div class="equation" id="eip-id1583692">
 $$ \KE_{\text{rot}}=434 \J $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
While punting a football, a kicker rotates his leg about the hip joint. The moment of inertia of the leg is $$ 3.75 \kg \cdot \mm $$
and its rotational kinetic energy is 175 J.
(a) What is the angular velocity of
the leg?
(b) What is the velocity of tip of the punter’s shoe if it is 1.05 m
from the hip joint?
(c) Explain how the football can be given a velocity greater
than the tip of the shoe (necessary for a decent kick distance).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A bus contains a 1500 kg flywheel (a disk that has a 0.600 m radius) and has a total mass of 10 000 kg.
(a) Calculate the angular velocity the flywheel must have to contain enough energy to take the bus from rest to a speed of 20.0 m/s, assuming 90.0% of the rotational kinetic energy can be transformed into translational energy.
(b) How high a hill can the bus climb with this stored energy and still have a speed of 3.00 m/s at the top of the hill? Explicitly show how you follow the steps in the [Problem-Solving Strategy for Rotational Energy](#fs-id1986333).

</div>
<div class="solution" markdown="1">
(a) $$ 128 \rads $$

(b) $$ 19.9 \m $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A ball with an initial velocity of 8.00 m/s rolls up a hill without slipping. Treating the ball as a spherical shell,
(a) Calculate the vertical height it reaches.
(b) Repeat the calculation for the same ball if it slides up the hill without rolling.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
While exercising in a fitness center, a man lies face down on a bench and lifts a
weight with one lower leg by contacting the muscles in the back of the upper leg.
(a) Find the angular acceleration produced given the mass lifted is 10.0 kg at a distance
of 28.0 cm from the knee joint, the moment of inertia of the lower leg is
$$ 0.900 \kg \cdot \mm $$, the muscle force is 1500 N, and its effective perpendicular lever arm is 3.00
cm.
(b) How much work is done if the leg rotates through an angle of $$
20.0^\circ $$ with a constant force exerted by the muscle?

</div>
<div class="solution" markdown="1">
(a) $$ 10.4 \rads ^2 $$

(b) $$ \text{net}W=6.11 \J $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
To develop muscle tone, a woman lifts a 2.00-kg weight held in her hand. She uses her biceps muscle to flex the lower arm through an angle of $$ 60.0^\circ $$.
(a) What is the angular acceleration if the weight is 24.0 cm from the elbow
joint, her forearm has a moment of inertia of $$ 0.250 \kg \cdot
 \mm $$, and the net force she exerts is 750 N at an effective perpendicular lever arm
of 2.00 cm?
(b) How much work does she do?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Consider two cylinders that start down identical inclines from rest except that one is frictionless. Thus one cylinder rolls without slipping, while the other slides frictionlessly without rolling.
They both travel a short distance at the bottom and then start up another incline.
(a) Show that they both reach the same height on the other incline, and that this height is equal to their original height.
(b) Find the ratio of the time the rolling cylinder takes to reach the height on the second incline to the time the sliding cylinder takes to reach the height on the second incline.
(c) Explain why the time for the rolling motion is greater than that for the sliding motion.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the moment of inertia of an object that rolls without slipping down a
2.00-m-high incline starting from rest, and has a final velocity of 6.00 m/s?
Express the moment of inertia as a multiple of $$ M R^{2} $$,
where $$ M $$ is the mass of the object and $$ R $$ is its radius.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose a 200-kg motorcycle has two wheels like, [the one described in Problem 10.15](../contents/ch10DynamicsOfRotationalMotion.md#import-auto-id3370574) and is heading toward a hill at a speed of 30.0 m/s.
(a) How high can it coast up the hill, if you neglect friction?
(b) How much energy is lost to friction if the motorcycle only gains an altitude of 35.0 m before coming to rest?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In softball, the pitcher throws with the arm fully extended (straight at the elbow). In a fast pitch the ball leaves the hand with a speed of 139 km/h.
(a) Find the rotational kinetic energy of the pitcher’s arm given its moment of inertia is $$ 0.720 \kg \cdot \mm $$
and the ball leaves the hand at a distance of 0.600 m from the pivot at the shoulder.
(b) What force did the muscles exert to cause the arm to rotate if
their effective perpendicular lever arm is 4.00 cm and the ball is 0.156 kg?

</div>
<div class="solution" markdown="1">
(a) 1.49 kJ

(b) $$ 2.52\times 10^{4}\N $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Construct Your Own Problem**

Consider the work done by a spinning skater pulling her arms in to increase her
rate of spin. Construct a problem in which you calculate the work done with a
“force multiplied by distance” calculation and compare it to the skater’s
increase in kinetic energy.

</div>
</div>

<div class="glossary" markdown="1">

### Glossary
{: class="glossary-title"}

work-energy theorem
: if one or more external forces act upon a rigid object, causing its kinetic
energy to change from $$ \KE_{1} $$ to $$ \KE_{2} $$, then the
work $$ W $$ done by the net force is equal to the change in kinetic energy
{: #import-auto-id3007462}

rotational kinetic energy
: the kinetic energy due to the rotation of an object. This is part of its total
kinetic energy
{: #import-auto-id1771451}

</div>
