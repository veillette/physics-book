---
title: "Angular Acceleration"
layout: page
---

<div class="abstract" markdown="1">
* Describe uniform circular motion.
* Explain non-uniform circular motion.
* Calculate angular acceleration of an object.
* Observe the link between linear and angular acceleration.

</div>

[Uniform Circular Motion and Gravitation](../contents/ch6UniformCircularMotionAndGravitation.md) discussed only
uniform circular motion, which is motion in a circle at constant speed and,
hence, constant angular velocity. Recall that angular velocity $$ \omega $$ was
defined as the time rate of change of angle $$ \theta $$:

<div class="equation">
 $$ \omega =\frac{ \Delta \theta }{\Delta t}, $$
</div>

where $$ \theta $$ is the angle of rotation as seen
in [Figure](#fig1). The relationship between angular velocity
$$ \omega $$ and linear velocity $$ v $$ was also defined
in [Rotation Angle and Angular Velocity](../contents/ch6RotationAngleAndAngularVelocity.md) as

<div class="equation">
 $$ v=r \omega $$
</div>

or

<div class="equation">
 $$ \omega =\frac{v}{r}, $$
</div>

where $$ r $$ is the radius of curvature, also seen
in [Figure 1](#fig1). According to the sign convention, the
counter clockwise direction is considered as positive direction and clockwise
direction as negative

![The given figure shows counterclockwise circular motion with a horizontal line, depicting radius r, drawn from the center of the circle to the right side on its circumference and another line is drawn in such a manner that it makes an acute angle delta theta with the horizontal line. Tangential velocity vectors are indicated at the end of the two lines. At the bottom right side of the figure, the formula for angular velocity is given as v upon r.](../resources/Figure_11_01_01a.jpg "This figure shows uniform circular motion and some of its defined quantities.")
{: #fig1}

Angular velocity is not constant when a skater pulls in her arms, when a child
starts up a merry-go-round from rest, or when a computer’s hard disk slows to a
halt when switched off. In all these cases, there is an **angular acceleration**
**, in which $$ \omega $$ changes. The
faster the change occurs, the greater the angular acceleration. Angular
acceleration $$ \alpha $$ is defined as the rate of change of angular velocity.
In equation form, angular acceleration is expressed as follows:

<div class="equation">
 $$ \alpha =\frac{ \Delta \omega }{\Delta t}, $$
</div>

where $$ \Delta \omega $$ is the **change in angular velocity** and $$ \Delta t $$ 
is the change in time. The
units of angular acceleration are $$ \left(\rads \right)\text{/s} $$,
or $$ \radss $$. If $$ \omega $$
increases, then $$ \alpha $$ is positive. If $$ \omega $$ decreases, then $$
\alpha $$ is negative.

<div class="example" markdown="1">
<div class="title">
Calculating the Angular Acceleration and Deceleration of a Bike Wheel
</div>
Suppose a teenager puts her bicycle on its back and starts the rear wheel spinning from rest to a final angular velocity of 250 rpm in 5.00 s.
(a) Calculate the angular acceleration in $$ \radss $$.
(b) If she now slams on the brakes, causing an angular acceleration of $$
-87.3 \radss $$, how long does it take the wheel to stop?

**Strategy for (a)**

The angular acceleration can be found directly from its definition in $$ \alpha
=\frac{ \Delta \omega }{\Delta t} $$ because the final angular velocity and time
are given. We see that $$ \Delta \omega $$ is 250 rpm and $$ \Delta t $$ is 5.00
s.

**Solution for (a)**

Entering known information into the definition of angular acceleration, we get

<div class="equation">
 $$ \begin{array}{lll}
\alpha & =& \frac{ \Delta \omega }{\Delta t}\\
& =& \frac{250 \text{rpm}}{5.00 \s }.
\end{array} $$
</div>
Because $$ \Delta \omega $$ is in revolutions per minute (rpm)
and we want the standard units of $$
\radss $$ for angular acceleration, we need to convert $$ \Delta
\omega $$ from rpm to rad/s:

<div class="equation">
 $$ \begin{array}{lll}
\Delta \omega & =& 250\frac{ \text{rev}}{\text{min}}\cdot \frac{ 2\pi \text{rad}}{\text{rev}}\cdot \frac{1 \text{min}}{60 \text{sec}}\\
& =& 26.2\frac{ \text{rad}}{\s}.
\end{array} $$
</div>
Entering this quantity into the expression for $$ \alpha $$, we get

<div class="equation">
 $$ \begin{array}{lll}
\alpha & =& \frac{ \Delta \omega }{\Delta t}\\
& =&\frac{26.2 \rads }{5.00 \s }\\
& =& 5.24\radss .
\end{array} $$
</div>

**Strategy for (b)**

In this part, we know the angular acceleration and the initial angular velocity.
We can find the stoppage time by using the definition of angular acceleration
and solving for $$ \Delta t $$, yielding

<div class="equation">
 $$ \Delta t=\frac{ \Delta \omega }{\alpha }. $$
</div>

**Solution for (b)**

Here the angular velocity decreases from $$ 26.2 \rads $$
(250 rpm) to zero, so that $$ \Delta \omega $$ is $$ -26.2 \rads $$, and
$$ \alpha $$ is given to be $$ -87.3 \radss $$. Thus,

<div class="equation">
 $$ \begin{array}{lll}
\Delta t& =& \frac{-26.2 \rads }{-87.3 \radss }\\
&=& 0.300 \s  .
\end{array}$$
</div>

**Discussion**

Note that the angular acceleration as the girl spins the wheel is small and
positive; it takes 5 s to produce an appreciable angular velocity. When she hits
the brake, the angular acceleration is large and negative. The angular velocity
quickly goes to zero. In both cases, the relationships are analogous to what
happens with linear motion. For example, there is a large deceleration when you
crash into a brick wall—the velocity change is large in a short time interval.

</div>

If the bicycle in the preceding example had been on its wheels instead of
upside-down, it would first have accelerated along the ground and then come to a
stop. This connection between circular motion and linear motion needs to be
explored. For example, it would be useful to know how linear and angular
acceleration are related. In circular motion, linear acceleration is *tangent*
to the circle at the point of interest, as seen
in [Figure 2](#fig2). Thus, linear acceleration is called
**tangential acceleration** $$ a_
{\text{t}} $$.

![In the figure, a semicircle is drawn, with its radius r, shown here as a line segment. The anti-clockwise motion of the circle is shown with an arrow on the path of the circle. Tangential velocity vector, v, of the point, which is on the meeting point of radius with the circle, is shown as a green arrow and the linear acceleration, a-t is shown as a yellow arrow in the same direction along v.](../resources/Figure_11_01_02a.jpg "In circular motion, linear acceleration \( a \) , occurs as the magnitude of the velocity changes: \( a \)  is tangent to the motion. In the context of circular motion, linear acceleration is also called tangential acceleration \( a_t \) .")
{: #fig2 height="200"}

Linear or tangential acceleration refers to changes in the magnitude of velocity
but not its direction. We know
from [Uniform Circular Motion and Gravitation](../contents/ch6UniformCircularMotionAndGravitation.md) that in
circular motion centripetal acceleration, $$ \ac $$, refers to changes
in the direction of the velocity but not its magnitude. An object undergoing
circular motion experiences centripetal acceleration, as seen
in [Figure 3](#fig3). Thus, $$ a_{\text{t}} $$ and $$ a_{\text{c}} $$
are perpendicular and independent of one another. Tangential
acceleration $$ a_{\text{t}} $$ is directly related to the angular acceleration
$$ \alpha $$ and is linked to an increase or decrease in the velocity, but not
its direction.

![In the figure, a semicircle is drawn, with its radius r, shown here as a line segment. The anti-clockwise motion of the circle is shown with an arrow on the path of the circle. Tangential velocity vector, v, of the point, which is on the meeting point of radius with the circle, is shown as a green arrow and the linear acceleration, a sub t is shown as a yellow arrow in the same direction along v. The centripetal acceleration, a sub c, is also shown as a yellow arrow drawn perpendicular to a sub t, toward the direction of the center of the circle. A label in the figures states a sub t affects magnitude and a sub c affects direction.](../resources/Figure_11_01_03a.jpg "Centripetal acceleration \( a_c \)  occurs as the direction of velocity changes; it is perpendicular to the circular motion. Centripetal and tangential acceleration are thus perpendicular to each other.")
{: #fig3 height="200"}

Now we can find the exact relationship between linear acceleration $$ a_
{\text{t}} $$ and angular acceleration $$ \alpha $$. Because linear acceleration
is proportional to a change in the magnitude of the velocity, it is defined (as
it was in [One-Dimensional Kinematics](../contents/ch2Kinematics.md)) to be

<div class="equation">
 $$ a_{\text{t}}=\frac{ \Delta v}{\Delta t}. $$
</div>

For circular motion, note that $$ v=r \omega $$, so that

<div class="equation">
 $$ a_{\text{t}}=\frac{ \Delta \left(r \omega \right)}{\Delta t}. $$
</div>

The radius $$ r $$ is constant for circular motion, and so
$$ \Delta \left( r\omega \right)=r\left(\Delta \omega \right) $$. Thus,

<div class="equation">
 $$ a_{\text{t}}=r\frac{ \Delta \omega }{\Delta t}. $$
</div>

By definition, $$ \alpha =\frac{ \Delta \omega }{\Delta t} $$. Thus,

<div class="equation">
 $$ a_{\text{t}}=r \alpha, $$
</div>

or

<div class="equation">
 $$ \alpha =\frac{ a_{\text{t}}}{r}. $$
</div>

These equations mean that linear acceleration and angular acceleration are
directly proportional. The greater the angular acceleration is, the larger the
linear (tangential) acceleration is, and vice versa. For example, the greater
the angular acceleration of a car’s drive wheels, the greater the acceleration
of the car. The radius also matters. For example, the smaller a wheel, the
smaller its linear acceleration for a given angular acceleration $$ \alpha $$.

<div class="example" markdown="1">
<div class="title">
Calculating the Angular Acceleration of a Motorcycle Wheel
</div>
A powerful motorcycle can accelerate from 0 to 30.0 m/s (about 108 km/h) in 4.20 s.
What is the angular acceleration of its 0.320-m-radius wheels? (See [Figure 4](#fig4).)

![The figure shows the right side view of a man riding a motorcycle hence, depicting linear acceleration a of the motorcycle pointing toward the front of the bike as a horizontal arrow and the angular acceleration alpha of its wheels, shown here as curved arrows along the front of both the wheels pointing downward.](../resources/Figure_11_01_04a.jpg "The linear acceleration of a motorcycle is accompanied by an angular acceleration of its wheels.")
{: #fig4}

**Strategy**

We are given information about the linear velocities of the motorcycle. Thus, we
can find its linear acceleration $$ a_{\text{t}} $$. Then, the expression $$
\alpha =\frac{ a_{\text{t}}}{r} $$ can be used to find the angular acceleration.

**Solution**

The linear acceleration is

<div class="equation">
 $$ \begin{array}{lll}
a_{\text{t}}& =& \frac{ \Delta v}{\Delta t}\\
& =& \frac{30.0 \ms }{4.20 \s }\\
& =& 7.14\mss .
\end{array} $$
</div>
We also know the radius of the wheels. Entering the values for $$ a_{\text{t}} $$
and $$ r $$ into $$ \alpha =\frac{ a_{\text{t}}}{r} $$, we get

<div class="equation">
 $$ \begin{array}{lll}
\alpha & =& \frac{ a_{\text{t}}}{r}\\
& =& \frac{7.14\mss }{0.320 \m }\\
& =& 22.3 \radss .
\end{array} $$
</div>

**Discussion**

Units of radians are dimensionless and appear in any relationship between
angular and linear quantities.

</div>

So far, we have defined three rotational quantities— $$ \theta $$, $$\omega
$$, and $$ \alpha $$. These quantities are analogous to the translational
quantities $$ x $$, $$v $$ and $$ a $$. [Table 1](#table1)
displays rotational quantities, the analogous translational quantities, and the
relationships between them.

##### Table: Rotational and Translational Quantities 
{: #table1}

| Rotational| Translational | Relationship |
| ---- | ---- | ---- |
| $$\theta$$ | $$ x $$ | $$ \theta= \frac{x}{r} $$ |
| $$\omega$$ | $$ v $$ | $$ \omega= \frac{v}{r} $$ |
| $$\alpha$$ | $$ a $$ | $$ \alpha= \frac{a}{r} $$ |


<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment
</div>
Sit down with your feet on the ground on a chair that rotates. Lift one of your legs such that it is unbent (straightened out). Using the other leg, begin to rotate yourself by pushing on the ground. Stop using your leg to push the ground but allow the chair to rotate. From the origin where you began, sketch the angle, angular velocity, and angular acceleration of your leg as a function of time in the form of three separate graphs. Estimate the magnitudes of these quantities.

</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Angular acceleration is a vector, having both magnitude and direction. How do we denote its magnitude and direction? Illustrate with an example.

</div>
<div class="solution" data-print-placement="here" markdown="1">
The magnitude of angular acceleration is $$ \alpha $$
and its most common units are $$ \radss $$. The direction of angular
acceleration along a fixed axis is denoted by a + or a – sign, just as the
direction of linear acceleration in one dimension is denoted by a + or a – sign.
For example, consider a gymnast doing a forward flip. Her angular momentum would
be parallel to the mat and to her left. The magnitude of her angular
acceleration would be proportional to her angular velocity (spin rate) and her
moment of inertia about her spin axis.

</div>
</div>

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Ladybug Revolution
</div>
Join the ladybug in an exploration of rotational motion. Rotate the merry-go-round to change its angle, or choose a constant angular velocity or angular acceleration. Explore how circular motion relates to the bug\'s x,y position, velocity, and acceleration using vectors or graphs.

<figure markdown="1">
<figcaption>
Ladybug Revolution
</figcaption>
<iframe loading="lazy" src="https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=rotation" width="600" height="450" allowfullscreen></iframe>
</figure>
</div>

### Section Summary

*  Uniform circular motion is the motion with a
  constant angular velocity $$ \omega =\frac{ \Delta \theta }{\Delta t} $$.
* In non-uniform circular motion, the velocity
  changes with time and the rate of change of angular velocity (i.e. angular
  acceleration) is $$ \alpha =\frac{ \Delta \omega }{\Delta t} $$.
* Linear or tangential acceleration refers to changes
  in the magnitude of velocity but not its direction, given as $$ a_
  {\text{t}}=\frac{ \Delta v}{\Delta t} $$.
* For circular motion, note that $$ v=r \omega $$,
  so that
  <div class="equation">
 $$ a_{\text{t}}\frac{ \Delta \left(r \omega \right)}{\Delta t}. $$
  </div>

* The radius r is constant for circular motion, and
  so $$ \Delta \left(  r \omega \right)=r\Delta \omega $$. Thus,
  <div class="equation">
 $$ a_{\text{t}}=r\frac{ \Delta \omega }{\Delta t}. $$
  </div>

* By definition, $$ \Delta \omega /\Delta t=\alpha $$.
  Thus,
  <div class="equation">
 $$ a_{\text{t}}=r \alpha $$
  </div>

  or

  <div class="equation">
 $$ \alpha =\frac{ a_{\text{t}}}{r}. $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Analogies exist between rotational and translational physical quantities. Identify the rotational term analogous to each of the following: acceleration, force, mass, work, translational kinetic energy, linear momentum, impulse.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain why centripetal acceleration changes the direction of velocity in circular motion but not its magnitude.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In circular motion, a tangential acceleration can change the magnitude of the velocity but not its direction. Explain your answer.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose a piece of food is on the edge of a rotating microwave oven plate. Does it experience nonzero tangential acceleration, centripetal acceleration, or both when: (a) The plate starts to spin?
(b) The plate rotates at constant angular velocity?
(c) The plate slows to a halt?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At its peak, a tornado is 60.0 m in diameter and carries 500 km/h winds.
What is its angular velocity in revolutions per second?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
 $$ \omega =0.737 \text{rev/s} $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Integrated Concepts**

An ultracentrifuge accelerates from rest to 100 000 rpm in 2.00 min.
(a) What is its angular acceleration in $$ \radss $$ ?
(b) What is the tangential acceleration of a point 9.50 cm from the axis of rotation?
(c) What is the radial acceleration in $$ \mss $$ and multiples of $$ g $$ of this
point at full rpm?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Integrated Concepts**

You have a grindstone (a disk) that is 90.0 kg, has a 0.340-m radius, and is
turning at 90.0 rpm, and you press a steel axe against it with a radial force of
20.0 N.
(a) Assuming the kinetic coefficient of friction between steel and stone
is 0.20, calculate the angular acceleration of the grindstone.
(b) How many turns will the stone make before coming to rest?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
(a) $$ -0.26 \radss $$

(b) $$27 \text{rev} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Unreasonable Results**

You are told that a basketball player spins the ball with an angular
acceleration of $$ 100 \radss $$.
(a) What is the ball’s final angular
velocity if the ball starts from rest and the acceleration lasts 2.00 s?
(b) What is unreasonable about the result?
(c) Which premises are unreasonable or inconsistent?

</div>
</div>

<div class="glossary" markdown="1">

### Glossary
{: class="glossary-title"}

angular acceleration
: the rate of change of angular velocity with time

change in angular velocity
: the difference between final and initial values of angular velocity

tangential acceleration
: the acceleration in a direction tangent to the circle at the point of interest
in circular motion

</div>
