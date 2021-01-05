---
title: "Kinetic Energy and the Work-Energy Theorem"
layout: page
---

<div class="abstract" markdown="1">
* Explain work as a transfer of energy and net work as the work done by the net force.
* Explain and apply the work-energy theorem.

</div>

### Work Transfers Energy

What happens to the work done on a system? Energy is transferred into the
system, but in what form? Does it remain in the system or move on? The answers
depend on the situation. For example, if the lawn mower
in [Figure](../contents/ch7WorkTheScientificDefinition.md#import-auto-id2495459)(a) is pushed just hard
enough to keep it going at a constant speed, then energy put into the mower by
the person is removed continuously by friction, and eventually leaves the system
in the form of heat transfer. In contrast, work done on the briefcase by the
person carrying it up stairs
in [Figure](../contents/ch7WorkTheScientificDefinition.md#import-auto-id2495459)(d) is stored in the
briefcase-Earth system and can be recovered at any time, as shown
in [Figure](../contents/ch7WorkTheScientificDefinition.md#import-auto-id2495459)(e). In fact, the building
of the pyramids in ancient Egypt is an example of storing energy in a system by
doing work on the system. Some of the energy imparted to the stone blocks in
lifting them during construction of the pyramids remains in the stone-Earth
system and has the potential to do work.

In this section we begin the study of various types of work and forms of energy.
We will find that some types of work leave the energy of a system constant, for
example, whereas others change the system in some way, such as making it move.
We will also develop definitions of important forms of energy, such as the
energy of motion.

### Net Work and the Work-Energy Theorem

We know from the study of Newton’s laws
in [Dynamics: Force and Newton\'s Laws of Motion](../contents/ch4Dynamics.md) that net
force causes acceleration. We will see in this section that work done by the net
force gives a system energy of motion, and in the process we will also find an
expression for the energy of motion.

Let us start by considering the total, or net, work done on a system. Net work
is defined to be the sum of work done by all external forces—that is, **net
work** is the work done by the net external force $$
\vb{F}_{\text{net}} $$. In equation form, this is $$ W_{\text{net}}=F_
{\text{net}}d\cos{\theta} $$ where $$ \theta $$ is the angle between the force
vector and the displacement vector.

[Figure](#fig1)(a) shows a graph of force versus displacement
for the component of the force in the direction of the displacement—that is, an
$$ F\cos{\theta} $$ vs. $$ d $$ graph. In this case, $$ F\cos{\theta} $$ is
constant. You can see that the area under the graph is $$ Fd\cos{\theta} $$, or
the work done. [Figure](#fig1)(b) shows a more general
process where the force varies. The area under the curve is divided into strips,
each having an average force $$ \left(
F\cos{\theta} \right)_{i\left(\text{ave}\right)} $$. The work done is $$
\left(
F\cos{\theta} \right)_{i\left(\text{ave}\right)}d_{i} $$ for each strip, and
the total work done is the sum of the $$ W_{i} $$. Thus the total work done is
the total area under the curve, a useful property to which we shall refer later.

![Two drawings labeled a and b. (a) A graph of force component F cosine 
theta versus distance d. d is along the x axis and F cosine theta is along the y axis. A line of length d is drawn parallel to the horizontal axis for some value of F cosine theta. Area under this line in the graph is shaded and is equal to F cosine theta multiplied by d. F d cosine theta is equal to work W. (b) A graph of force component F cosine theta versus distance d. d is along the x axis and F cosine theta is along the y axis. There is an inclined line and the area under it is divided into many thin vertical strips of width d sub i. The area of one vertical stripe is equal to average value of F cosine theta times d sub i which equals to work W sub i.](../resources/Figure_08_02_02a.jpg "(a) A graph of \( F\cos{ \theta} \) vs. \( d \) , when \( F \cos{ \theta} \) is constant. The area under the curve represents the work done by the force. (b) A graph of \( F \cos{ \theta} \) vs. \( d \)  in which the force varies. The work done for each interval is the area of each strip; thus, the total area under the curve equals the total work done.")
{: #fig1}

Net work will be simpler to examine if we consider a one-dimensional situation
where a force is used to accelerate an object in a direction parallel to its
initial velocity. Such a situation occurs for the package on the roller belt
conveyor system shown in [Figure](#fig2).

![A package shown on a roller belt pushed with a force F towards the right shown by a vector F sub app equal to one hundred and twenty newtons. A vector w is in the downward direction starting from the bottom of the package and the reaction force N on the package is shown by the vector N pointing upwards at the bottom of the package. A frictional force vector of five point zero zero newtons acts on the package leftwards. The displacement d is shown by the vector pointing to the right with a value of zero point eight zero zero meters.](../resources/Figure_08_02_03a.jpg "A package on a roller belt is pushed horizontally through a distance &#10; &#10; d&#10; &#10;. ")
{: #fig2}

The force of gravity and the normal force acting on the package are
perpendicular to the displacement and do no work. Moreover, they are also equal
in magnitude and opposite in direction so they cancel in calculating the net
force. The net force arises solely from the horizontal applied force $$
\vb{F}_{\text{app}} $$ and the horizontal friction force $$ \vb{f} $$.
Thus, as expected, the net force is parallel to the displacement, so that $$
\theta =0^\circ $$ and $$ \cos{\theta} =1 $$, and the net work is given by

<div class="equation">
 $$ W_{\text{net}}=F_{\text{net}}d. $$
</div>

The effect of the net force $$ \vb{F}_{\text{net}} $$ is to accelerate the
package from $$ v_{0} $$ to $$ v $$. The kinetic energy of the package
increases, indicating that the net work done on the system is positive. (
See [Figure](#fs-id1703845).) By using Newton’s second law, and doing some
algebra, we can reach an interesting conclusion. Substituting $$ F_
{\text{net}}=ma $$ from Newton’s second law gives

<div class="equation">
 $$ W_{\text{net}}= mad . $$
</div>

To get a relationship between net work and the speed given to a system by the
net force acting on it, we take $$ d=x-x_{0} $$ and use the equation studied
in [Motion Equations for Constant Acceleration in One Dimension](../contents/ch2MotionEquationsForConstantAccelerationInOneDimension.md)
for the change in speed over a distance $$ d $$ if the acceleration has the
constant value $$ a $$; namely, $$ v^{2}= v_{0}^{2}+2ad $$
(note that $$ a $$ appears in the expression for the net work). Solving for
acceleration gives $$ a=\frac{ v^{2}-v_{0}^{2}}{2d} $$. When $$ a $$ is
substituted into the preceding expression for $$ W_{\text{net}} $$, we obtain

<div class="equation">
 $$ W_{\text{net}}=m\left(\frac{ v^{2}-{ v_{0}}^{2}}{2d}\right)d. $$
</div>

The $$ d $$ cancels, and we rearrange this to obtain

<div class="equation">
 $$ W_{\text{net}}=\frac{1}{2}m v^{2}-\frac{1}{2} mv_{0}^{2}. $$
</div>

This expression is called the **work-energy theorem**, and it actually applies *in general* (even for forces
that vary in direction and magnitude), although we have derived it for the
special case of a constant force parallel to the displacement. The theorem
implies that the net work on a system equals the change in the quantity $$
\frac{1}{2}m v^{2} $$. This quantity is our first example of a form of energy.

<div class="note" data-label="" markdown="1">
<div class="title">
The Work-Energy Theorem
</div>
The net work on a system equals the change in the quantity $$ \frac{1}{2}m v^{2} $$.

<div class="equation">
 $$ W_{\text{net}}=\frac{1}{2}m v^{2}-\frac{1}{2}m v_{0}^{2} $$
</div>
</div>

The quantity $$ \frac{1}{2}m v^{2} $$ in the work-energy theorem is defined to
be the translational **kinetic energy** (KE) of a mass $$ m $$ moving at a speed $$ v $$.
(*Translational* kinetic energy is distinct from *rotational* kinetic energy,
which is considered later.) In equation form, the translational kinetic energy,

<div class="equation">
 $$ \KE=\frac{1}{2}m v^{2}, $$
</div>

is the energy associated with translational motion. Kinetic energy is a form of
energy associated with the motion of a particle, single body, or system of
objects moving together.

We are aware that it takes energy to get an object, like a car or the package
in [Figure](#fig2), up to speed, but it may be a bit
surprising that kinetic energy is proportional to speed squared. This
proportionality means, for example, that a car traveling at 100 km/h has four
times the kinetic energy it has at 50 km/h, helping to explain why high-speed
collisions are so devastating. We will now consider a series of examples to
illustrate various aspects of work and energy.

<div class="example" markdown="1">
<div class="title">
Calculating the Kinetic Energy of a Package
</div>
Suppose a 30.0-kg package on the roller belt conveyor system in [Figure](#fig2) is moving at 0.500 m/s. What is its kinetic energy?

**Strategy**

Because the mass $$ m $$ and speed $$ v $$ are given, the kinetic energy can be
calculated from its definition as given in the equation $$
\KE=\frac{1}{2}m v^{2} $$.

**Solution**

The kinetic energy is given by

<div class="equation">
 $$ \KE=\frac{1}{2}m v^{2}. $$
</div>
Entering known values gives

<div class="equation">
 $$ \KE=0.5\left(30.0 \kg \right)\left(0.500 \ms \right)^{2}, $$
</div>
which yields

<div class="equation">
 $$ \KE=3.75 \kg \cdot \mmss=3.75 \J . $$
</div>

**Discussion**

Note that the unit of kinetic energy is the joule, the same as the unit of work,
as mentioned when work was first defined. It is also interesting that, although
this is a fairly massive package, its kinetic energy is not large at this
relatively low speed. This fact is consistent with the observation that people
can move packages like this without exhausting themselves.

</div>

<div class="example" markdown="1">
<div class="title">
Determining the Work to Accelerate a Package
</div>
Suppose that you push on the 30.0-kg package in [Figure](#fig2) with a constant force of 120 N through a distance of 0.800 m, and that the opposing friction force averages 5.00 N.
(a) Calculate the net work done on the package.
(b) Solve the same problem as in part (a), this time by finding the work done by each force that contributes to
the net force.

**Strategy and Concept for (a)**

This is a motion in one dimension problem, because the downward force (from the
weight of the package) and the normal force have equal magnitude and opposite
direction, so that they cancel in calculating the net force, while the applied
force, friction, and the displacement are all horizontal. (
See [Figure](#fig2).) As expected, the net work is the net
force times distance.

**Solution for (a)**

The net force is the push force minus friction, or $$ F_{\text{net}} = 120 N -
5.00\N  = 115 \N $$. Thus the net work is

<div class="equation">
 $$ \begin{array}{lll}
W_{\text{net}}&=& F_{\text{net}}d=\left(115 \N \right)\left(0.800 \m \right)\\
W_{\text{net}}&=& 92.0 \N \cdot \m=92.0 \J .
\end{array} $$
</div>

**Discussion for (a)**

This value is the net work done on the package. The person actually does more
work than this, because friction opposes the motion. Friction does negative work
and removes some of the energy the person expends and converts it to thermal
energy. The net work equals the sum of the work done by each individual force.

**Strategy and Concept for (b)**

The forces acting on the package are gravity, the normal force, the force of
friction, and the applied force. The normal force and force of gravity are each
perpendicular to the displacement, and therefore do no work.

**Solution for (b)**

The applied force does work.

<div class="equation">
 $$ \begin{array}{lll}
W_{\text{app}}&=& F_{\text{app}}d\cos\left(0^\circ \right)=F_{\text{app}}d\\
W_{\text{app}}&=& \left(120 \N \right)\left(0.800 \m \right)\\
W_{\text{app}}&=& 96.0 \J
\end{array} $$
</div>
The friction force and displacement are in opposite directions, so that $$ \theta =180^\circ $$,
and the work done by friction is

<div class="equation">
 $$ \begin{array}{lll}
W_{\text{fr}}&=& F_{\text{fr}}d\cos\left(180^\circ\right)=-F_{\text{fr}}d\\
W_{\text{fr}}&=& -\left(5.00 \N \right)\left(0.800 \m \right)\\
W_{\text{fr}}&=& -4.00 \J .
\end{array} $$
</div>
So the amounts of work done by gravity, by the normal force, by the applied force, and by friction are, respectively,

<div class="equation">
 $$ \begin{array}{lll}
W_{\text{gr}}&=& 0,\\ 
W_{N}&=& 0,\\ 
W_{\text{app}}&=& 96.0 \J  ,\\
W_{\text{fr}}&=& -4.00 \J .
\end{array} $$
</div>
The total work done as the sum of the work done by each force is then seen to be

<div class="equation">
 $$ W_{\text{total}}=W_{\text{gr}}+W_{N}+W_{\text{app}}+W_{\text{fr}}=92.0 \J . $$
</div>

**Discussion for (b)**

The calculated total work $$ W_{\text{total}} $$ as the sum of the work by each
force agrees, as expected, with the work $$ W_{\text{net}} $$ done by the net
force. The work done by a collection of forces acting on an object can be
calculated by either approach.

</div>

<div class="example" markdown="1">
<div class="title">
Determining Speed from Work and Energy
</div>
Find the speed of the package in [Figure](#fig2) at the end of the push, using work and energy concepts.

**Strategy**

Here the work-energy theorem can be used, because we have just calculated the
net work, $$ W_{\text{net}} $$, and the initial kinetic energy, $$
\frac{1}{2}{mv_{0}}^{2} $$. These calculations allow us to find the final
kinetic energy, $$ \frac{1}{2}m v^{2} $$, and thus the final speed $$ v $$.

**Solution**

The work-energy theorem in equation form is

<div class="equation">
 $$ W_{\text{net}}=\frac{1}{2}m v^{2}-\frac{1}{2}{m v_{0}}^{2}. $$
</div>
Solving for $$ \frac{1}{2}m v^{2} $$ gives

<div class="equation">
 $$ \frac{1}{2}m v^{2}=W_{\text{net}}+\frac{1}{2}{m v_{0}}^{2}. $$
</div>
Thus,

<div class="equation">
 $$ \frac{1}{2}m v^{2}=92.0 \J+3.75 \J =95.75 \J . $$
</div>
Solving for the final speed as requested and entering known values gives

<div class="equation">
 $$ \begin{array}{lll}
v&=& \sqrt{\frac{2\text{(95.75 J)}}{m}}=\sqrt{\frac{191.5 \kg \cdot \mmss }{30.0 \kg }}\\
v&=& 2.53 \ms .
\end{array} $$
</div>

**Discussion**

Using work and energy, we not only arrive at an answer, we see that the final
kinetic energy is the sum of the initial kinetic energy and the net work done on
the package. This means that the work indeed adds to the energy of the package.

</div>

<div class="example" markdown="1">
<div class="title">
Work and Energy Can Reveal Distance, Too
</div>
How far does the package in [Figure](#fig2) coast after the push, assuming friction remains constant? Use work and energy considerations.

**Strategy**

We know that once the person stops pushing, friction will bring the package to
rest. In terms of energy, friction does negative work until it has removed all
of the package’s kinetic energy. The work done by friction is the force of
friction times the distance traveled times the cosine of the angle between the
friction force and displacement; hence, this gives us a way of finding the
distance traveled after the person stops pushing.

**Solution**

The normal force and force of gravity cancel in calculating the net force. The
horizontal friction force is then the net force, and it acts opposite to the
displacement, so $$ \theta =180^\circ $$. To reduce the kinetic energy of the
package to zero, the work $$ W_{\text{fr}} $$ by friction must be minus the
kinetic energy that the package started with plus what the package accumulated
due to the pushing. Thus $$ W_{\text{fr}}=-95.75 \J $$. Furthermore, $$ W_
{\text{fr}}=fd^{\prime} \cos{\theta} = -fd^{\prime} $$, where $$
d^{\prime} $$ is the distance it takes to stop. Thus,

<div class="equation">
 $$ d^{\prime} =-\frac{ W_{\text{fr}}}{f}=-\frac{-95.75 \J }{5.00 \N }, $$
</div>
and so

<div class="equation">
 $$ d^{\prime} =19.2 \m . $$
</div>

**Discussion**

This is a reasonable distance for a package to coast on a relatively
friction-free conveyor system. Note that the work done by friction is negative (
the force is in the opposite direction of motion), so it removes the kinetic
energy.

</div>

Some of the examples in this section can be solved without considering energy,
but at the expense of missing out on gaining insights about what work and energy
are doing in this situation. On the whole, solutions involving energy are
generally shorter and easier than those using kinematics and dynamics alone.

### Section Summary

* The net work $$ W_{\text{net}} $$ is the work done by the net force acting on
  an object.
* Work done on an object transfers energy to the object.
* The translational kinetic energy of an object of mass $$ m $$ moving at speed
 $$ v $$ is $$ \KE=\frac{1}{2}m v^{2} $$.
* The work-energy theorem states that the net work $$ W_{\text{net}} $$ on a
  system changes its kinetic energy, $$ W_{\text{net}}=\frac{1}{2}m
  v^{2}-\frac{1}{2} mv_{0}^{2} $$.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The person in [Figure](#fig3) does work on the lawn mower. Under what conditions would the mower gain energy? Under what conditions would it lose energy?

![A person pushing a lawn mower with a force F. Force is represented by a vector making an angle theta below the horizontal and distance moved by the mover is represented by vector d. The component of vector F along vector d is F cosine theta. Work done by the person, W, is equal to F d cosine theta.](../resources/Figure_08_02_04a.jpg)
{: #fig3}

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Work done on a system puts energy into it. Work done by a system removes energy from it. Give an example for each statement.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
When solving for speed in [Figure](#fs-id1534836), we kept only the positive root. Why?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Compare the kinetic energy of a 20 000-kg truck moving at 110 km/h with that of an 80.0-kg
astronaut in orbit moving at 27 500 km/h.

</div>
<div class="solution" markdown="1">
 $$ 1/250 $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) How fast must a 3000-kg elephant move to have the same kinetic energy
as a 65.0-kg sprinter running at 10.0 m/s?
(b) Discuss how the larger energies
needed for the movement of larger animals would relate to metabolic rates.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Confirm the value given for the kinetic energy of an aircraft
carrier in [Figure](../contents/ch7ConservationOfEnergy.md#import-auto-id2866785).
You will need to look up the definition of a nautical mile (1 knot = 1 nautical mile/h).

</div>
<div class="solution" markdown="1">
 $$ 1.1\times 10^{10} \J $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the force needed to bring a 950-kg car to rest from a speed of 90.0 km/h in a distance of 120 m (a fairly typical distance for a non-panic stop).
(b) Suppose instead the car hits a concrete abutment at full speed and is brought to a stop in 2.00 m. Calculate the force exerted on the car and compare it with the force found in part (a).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A car’s bumper is designed to withstand a 4.0-km/h (1.1-m/s) collision with an
immovable object without damage to the body of the car.
The bumper cushions the shock by absorbing the force over a distance.
Calculate the magnitude of the average force on a bumper that collapses 0.200 m
while bringing a 900-kg car to rest from an initial speed of 1.1 m/s.

</div>
<div class="solution" markdown="1">
$$ 2.8 \times 10^{3} \N $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Boxing gloves are padded to lessen the force of a blow.
(a) Calculate the force exerted by a boxing glove on an opponent’s face,
if the glove and face compress 7.50 cm during a blow in which the 7.00-kg arm and glove are
brought to rest from an initial speed of 10.0 m/s.
(b) Calculate the force exerted by an identical blow in the gory old days when no gloves
were used and the knuckles and face would compress only 2.00 cm.
(c) Discuss the magnitude of the force with glove on.
Does it seem high enough
to cause damage even though it is lower than the force with no glove?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Using energy considerations, calculate the average force a 60.0-kg
sprinter exerts backward on the track to accelerate from 2.00 to 8.00 m/s
in a distance of 25.0 m, if he encounters a headwind that exerts an average
force of 30.0 N against him.

</div>
<div class="solution" markdown="1">
102 N

</div>
</div>

<div class="glossary" markdown="1">

### Glossary
{: class="glossary-title"}

net work
: work done by the net force, or vector sum of all the forces, acting on an
object

work-energy theorem
: the result, based on Newton’s laws, that the net work done on an object is
equal to its change in kinetic energy

kinetic energy
: the energy an object has by reason of its motion, equal to $$ \frac{1}{2}m
v^{2} $$ for the translational (i.e., non-rotational) motion of an object of
mass $$ m $$ moving at speed $$ v $$
</div>
