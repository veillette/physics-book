---
title: Kinematics of Rotational Motion
layout: page
sectionNumber: 2
chapterNumber: 10
---

<div class="abstract" markdown="1">
* Observe the kinematics of rotational motion.
* Derive rotational kinematic equations.
* Evaluate problem solving strategies for rotational kinematics.

</div>

Just by using our intuition, we can begin to see how rotational quantities like
$$ \theta $$, $$ \omega $$, and $$ \alpha $$ are related to one another. For
example, if a motorcycle wheel has a large angular acceleration for a fairly
long time, it ends up spinning rapidly and rotates through many revolutions. In
more technical terms, if the wheel’s angular acceleration $$ \alpha $$ is large
for a long period of time $$ t $$, then the final angular velocity $$ \omega $$
and angle of rotation $$ \theta $$ are large. The wheel’s rotational motion is
exactly analogous to the fact that the motorcycle’s large translational
acceleration produces a large final velocity, and the distance traveled will
also be large.

Kinematics is the description of motion. The **kinematics of rotational motion**
describes the relationships among rotation angle, angular velocity, angular
acceleration, and time. Let us start by finding an equation relating $$ \omega $$, $$ \alpha $$,
and $$ t $$. To determine this equation, we recall a familiar kinematic equation
for translational, or straight-line, motion:

<div class="equation">
 $$ v=v_{0}+ at \left(\text{constant } a\right) $$
</div>

Note that in rotational motion $$ a= a_{\text{t}} $$, and we shall use the
symbol $$ a $$ for tangential or linear acceleration from now on. As in linear
kinematics, we assume $$ a $$ is constant, which means that angular acceleration
$$ \alpha $$ is also a constant, because $$ a= r\alpha $$. Now, let us
substitute $$ v=r \omega $$ and $$ a= r\alpha $$ into the linear equation above:

<div class="equation">
 $$ r \omega =r \omega_{0}+ r\alpha t . $$
</div>

The radius $$ r $$ cancels in the equation, yielding

<div class="equation">
 $$ \omega =\omega_{0} +a t \left(\text{constant } a\right), $$
</div>

where $$ \omega_{0} $$ is the initial angular velocity. This last equation is
a *kinematic relationship* among $$ \omega $$, $$ \alpha $$, and $$ t $$ —that
is, it describes their relationship without reference to forces or masses that
may affect rotation. It is also precisely analogous in form to its translational
counterpart.

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections
</div>
Kinematics for rotational motion is completely analogous to translational kinematics,
first presented in [One-Dimensional Kinematics](../contents/ch1OneDimension.
md). Kinematics is 
concerned with the description of motion without regard to force or mass.
We will find that translational kinematic quantities, such as displacement,
velocity, and acceleration have direct analogs in rotational motion.

</div>

Starting with the four kinematic equations we developed
in [One-Dimensional Kinematics](../contents/ch2Kinematics.md), we can derive the
following four rotational kinematic equations (presented together with their
translational counterparts):

##### Table: Rotational Kinematic Equations

|Rotational|Translational| Conditions|
|--- |--- |--- |
| $$\theta= \overline{\omega} t $$| $$ x = \overline{v} t $$ | |
| $$\omega=\omega_0 + \alpha t $$ | $$v = v_0 + a t $$ | constant $$\alpha$$, constant $$a$$ |
| $$\theta=\omega_0 t + \frac{1}{2} \alpha t^2 $$ | $$ x = v_0 t + \frac{1}{2} a t^2 $$ | constant $$\alpha$$, constant $$a$$ |
| $$\omega^2= \omega_0^2 + 2 \alpha \theta $$ | $$ v^2 =v_0^2 + 2 a x $$ | constant $$\alpha$$, constant $$a$$ |

{: #Table1}

In these equations, the subscript 0 denotes initial values
($$ \theta_{0} $$, $$ x_{0} $$, and $$ t_{0} $$ are initial values), and the
average angular velocity $$ \overline{\omega } $$ and average velocity $$
\overline{v} $$ are defined as follows:

<div class="equation">
 $$ \overline{\omega }=\frac{ \omega_{0} +\omega }{2}; \overline{v}=\frac{ v_
{0}+v}{2} . $$
</div>

The equations given above in [Table 1](#Table1) can be used to solve any
rotational or translational kinematics problem in which $$ a $$ and $$ \alpha $$
are constant.

<div class="note" data-label="" markdown="1">
<div class="title">
Problem-Solving Strategy for Rotational Kinematics
</div>
1.  *Examine the situation to determine that rotational kinematics (rotational motion) is involved*. Rotation must be involved, but without the need to consider forces or masses that affect the motion.
2.  *Identify exactly what needs to be determined in the problem (identify the unknowns)*. A sketch of the situation is useful.
3.  *Make a list of what is given or can be inferred from the problem as stated (identify the knowns)*.
4.  *Solve the appropriate equation or equations for the quantity to be determined (the unknown)*. It can be useful to think in terms of a translational analog because by now you are familiar with such motion.
5.  *Substitute the known values along with their units into the appropriate equation, and obtain numerical solutions complete with units*. Be sure to use units of radians for angles.
6.  *Check your answer to see if it is reasonable: Does your answer make sense*?

</div>

<div class="example" id="example1" markdown="1">
<div class="title">
Calculating the Acceleration of a Fishing Reel
</div>
A deep-sea fisherman hooks a big fish that swims away from the boat pulling the fishing
line from his fishing reel. The whole system is initially at rest and the fishing line unwinds
from the reel at a radius of 4.50 cm from its axis of rotation. The reel is given an angular
acceleration of $$ 110 \radss $$
for 2.00 s as seen in [Figure 1](#Figure1).

(a) What is the final angular velocity of the reel?

(b) At what speed is fishing line leaving the reel after 2.00 s elapses?

(c) How many revolutions does the reel make?

(d) How many meters of fishing line come off the reel in this time?

**Strategy**

In each part of this example, the strategy is the same as it was for solving
problems in linear kinematics. In particular, known values are identified and a
relationship is then sought that can be used to solve for the unknown.

**Solution for (a)**

Here $$ \alpha $$ and $$ t $$ are given and $$ \omega $$ needs to be determined.
The most straightforward equation to use is $$ \omega =\omega_{0} +\alpha t $$
because the unknown is already on one side and all other terms are known. That
equation states that

<div class="equation">
 $$ \omega =\omega_{0} +\alpha t . $$
</div>
We are also given that $$ \omega_{0} =0 $$
(it starts from rest), so that

<div class="equation">
 $$ \omega =0+\left( 110 \radss \right)\left(2.00\s \right) =220\rads . $$
</div>

**Solution for (b)**

Now that $$ \omega $$ is known, the speed $$ v $$ can most easily be found using
the relationship

<div class="equation">
 $$ v=r \omega , $$
</div>
where the radius $$ r $$ of the reel is given to be 4.50 cm; thus,

<div class="equation">
 $$ v=\left(0.0450 \m \right)\left(220 \rads \right)=9.90 \ms . $$
</div>
Note again that radians must always be used in any calculation relating linear and angular quantities. Also, because radians are dimensionless, we have $$ \m ×\text{rad}=\m $$.

**Solution for (c)**

Here, we are asked to find the number of revolutions. Because $$ 1 \text{rev}=2
\pi \text{rad} $$, we can find the number of revolutions by finding $$ \theta $$
in radians. We are given $$ \alpha $$ and $$ t $$, and we know $$ \omega_{0} $$
is zero, so that $$ \theta $$ can be obtained using $$ \theta =\omega_{0}
t+\frac{1}{2} \alpha t^{2} $$.

<div class="equation">
 $$ \begin{array}{lll}
\theta &=& \omega_{0} t+\frac{1}{2}\alpha t^{2}\\
\theta &=& 0+\left(0.500\right)\left(110 \radss \right){\left(2.00 \s \right)}^{2}=220 \text{rad}.
\end{array} $$
</div>
Converting radians to revolutions gives

<div class="equation">
 $$ \theta =\left(220 \text{rad}\right)\frac{1 \text{rev}}{2 \pi \text{rad}}
=35.0 \text{rev} . $$
</div>

**Solution for (d)**

The number of meters of fishing line is $$ x $$, which can be obtained through
its relationship with $$ \theta $$:

<div class="equation">
 $$ x=r\theta = \left(0.0450 \m \right)\left(220 \text{rad} \right)=9.90 \m . $$
</div>

**Discussion**

This example illustrates that relationships among rotational quantities are
highly analogous to those among linear quantities. We also see in this example
how linear and rotational quantities are connected. The answers to the questions
are realistic. After unwinding for two seconds, the reel is found to spin at 220
rad/s, which is 2100 rpm. (No wonder reels sometimes make high-pitched sounds.)
The amount of fishing line played out is 9.90 m, about right for when the big
fish bites.

</div>

![The figure shows a fishing reel, with radius equal to 4.5 centimeters. The direction of rotation of the reel is counterclockwise. The rotational quantities are theta, omega and alpha, and x, v, a are linear or translational quantities. The reel, fishing line, and the direction of motion have been separately indicated by curved arrows pointing toward those parts.](../resources/Figure_10_02_01.jpg "Fishing line coming off a rotating reel moves linearly. <a href="#example1">Example 1</a> and <a href="#example2">Example 2</a> consider relationships between rotational and linear quantities associated with a fishing reel.")
{: #Figure1}

<div class="example" id="example2" markdown="1">
<div class="title">
Calculating the Duration When the Fishing Reel Slows Down and Stops
</div>
Now let us consider what happens if the fisherman applies a brake to the spinning reel, achieving an angular acceleration of $$ –300 \radss $$
. How long does it take the reel to come to a stop?

**Strategy**

We are asked to find the time $$ t $$ for the reel to come to a stop. The
initial and final conditions are different from those in the previous problem,
which involved the same fishing reel. Now we see that the initial angular
velocity is $$ \omega_{0}=220 \rads $$ and the final angular velocity $$ \omega
$$ is zero. The angular acceleration is given to be $$ \alpha =-300 \radss $$.
Examining the available equations, we see all quantities but *t* are known in $$
\omega =\omega_{0}+ \alpha t, $$ making it easiest to use this equation.

**Solution**

The equation states

<div class="equation">
 $$ \omega =\omega_{0}+ \alpha t . $$
</div>
We solve the equation algebraically for *t*, and then substitute the known values as usual, yielding

<div class="equation">
 $$ t=\frac{ \omega -\omega_{0} }{\alpha }=\frac{0-220 \rads }
{-300 \radss }=0.733 \s  . $$
</div>

**Discussion**

Note that care must be taken with the signs that indicate the directions of
various quantities. Also, note that the time to stop the reel is fairly small
because the acceleration is rather large. Fishing lines sometimes snap because
of the accelerations involved, and fishermen often let the fish swim for a while
before applying brakes on the reel. A tired fish will be slower, requiring a
smaller acceleration.

</div>

<div class="example" markdown="1">
<div class="title">
Calculating the Slow Acceleration of Trains and Their Wheels
</div>
Large freight trains accelerate very slowly. Suppose one such train accelerates from rest, giving its 0.350-m-radius wheels an angular acceleration of $$ 0.250 \radss $$. After the wheels have made 200 revolutions (assume no slippage):
(a) How far has the train moved down the track?
(b) What are the final angular velocity of the wheels and the linear velocity of the train?

**Strategy**

In part (a), we are asked to find $$ x $$, and in (b) we are asked to find $$
\omega $$ and $$ v $$. We are given the number of revolutions $$ \theta $$, the
radius of the wheels $$ r $$, and the angular acceleration $$ \alpha $$.

**Solution for (a)**

The distance $$ x $$ is very easily found from the relationship between distance
and rotation angle:

<div class="equation">
 $$ \theta =\frac{x}{r}. $$
</div>
Solving this equation for $$ x $$ yields

<div class="equation">
 $$ x=r\theta . $$
</div>
Before using this equation, we must convert the number of revolutions into radians, because we are dealing with a relationship between linear and rotational quantities:

<div class="equation">
 $$ \theta =\left(200\text{rev}\right)\frac{2\pi \text{rad}}{1 \text{rev}}=1257\text{rad}. $$
</div>
Now we can substitute the known values into $$ x= r\theta $$
to find the distance the train moved down the track:

<div class="equation">
 $$ x= r\theta =\left(0.350 \m \right)\left(1257 \text{rad}\right)=440 \m . $$
</div>

**Solution for (b)**

We cannot use any equation that incorporates $$ t $$ to find $$ \omega $$,
because the equation would have at least two unknown values. The equation $$
\omega^{2}=\omega_{0}^{2}+2 \alpha \theta $$ will work, because we know the
values for all variables except $$ \omega $$:

<div class="equation">
 $$ \omega^{2}=\omega_{0}^{2}+2 \alpha \theta $$
</div>
Taking the square root of this equation and entering the known values gives

<div class="equation">
 $$ \begin{array}{lll}
\omega &=& {\left[ 0+ 2\left(0.250 \radss \right)
\left(1257 \text{rad}\right)\right]}^{1/2} \\
\omega &=& 25.1 \text{rad/s.}
\end{array} $$
</div>
We can find the linear velocity of the train, $$ v $$,
through its relationship to $$ \omega $$:

<div class="equation">
 $$ v=r \omega =\left(0.350 \m\right)\left(25.1 \rads \right)=8.77 \ms . $$
</div>

**Discussion**

The distance traveled is fairly large and the final velocity is fairly slow (
just under 32 km/h).

</div>

There is translational motion even for something spinning in place, as the
following example illustrates. [Figure 2](#Figure2) shows a fly on the edge of a
rotating microwave oven plate. The example below calculates the total distance
it travels.

![The figure shows a fly that has landed on the rotating plate of the microwave. The direction of rotation of the plate, omega, is counterclockwise and is shown with an arrow.](../resources/Figure_10_02_02.jpg "The image shows a microwave plate. The fly makes revolutions while the food is heated (along with the fly).")
{: #Figure2}

<div class="example" markdown="1">
<div class="title">
Calculating the Distance Traveled by a Fly on the Edge of a Microwave Oven Plate
</div>
A person decides to use a microwave oven to reheat some lunch. In the process, a fly accidentally flies into the microwave and lands on the outer edge of the rotating plate and remains there. If the plate has a radius of 0.15 m and rotates at 6.0 rpm, calculate the total distance traveled by the fly during a 2.0-min cooking period. (Ignore the start-up and slow-down times.)

**Strategy**

First, find the total number of revolutions $$ \theta $$, and then the linear
distance $$ x $$ traveled. $$ \theta =\overline{\omega }t $$ can be used to find
$$ \theta $$ because $$ \overline{\omega } $$ is given to be 6.0 rpm.

**Solution**

Entering known values into $$ \theta =\overline{\omega }t $$ gives

<div class="equation">
 $$ \theta =\overline{\omega} t=\left(6.0 \text{rpm}\right)\left(2.0 \text{min}\right)=12 \text{rev}. $$
</div>
As always, it is necessary to convert revolutions to radians before
calculating a linear quantity like $$ x $$ from an angular quantity like $$ \theta $$:

<div class="equation">
 $$ \theta =\left(12 \text{rev}\right)\left(\frac{2\pi \text{rad}}{1 \text
{rev}}\right)=75.4\text{rad.} $$
</div>
Now, using the relationship between $$ x $$
and $$ \theta $$, we can determine the distance traveled:

<div class="equation">
 $$ x=r \theta =\left(0.15\m \right)\left(75.4\text{rad}\right)
=11\m . $$
</div>

**Discussion**

Quite a trip (if it survives)! Note that this distance is the total distance
traveled by the fly. Displacement is actually zero for complete revolutions
because they bring the fly back to its original position. The distinction
between total distance traveled and displacement was first noted
in [One-Dimensional Kinematics](../contents/ch2Kinematics.md).

</div>

<div class="exercise" data-element-type="Check-Understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Rotational kinematics has many useful relationships, often expressed in equation form. Are these relationships laws of physics or are they simply descriptive? (Hint: the same question applies to linear kinematics.)

</div>
<div class="solution" data-print-placement="here" markdown="1">
Rotational kinematics (just like linear kinematics) is descriptive and does not represent laws of nature. With kinematics, we can describe many things to great precision but kinematics does not consider causes. For example, a large angular acceleration describes a very rapid change in angular velocity without any consideration of its cause.

</div>
</div>

### Section Summary

* Kinematics is the description of motion.
* The kinematics of rotational motion describes the relationships among rotation
  angle, angular velocity, angular acceleration, and time.
* Starting with the four kinematic equations we developed in
  the [One-Dimensional Kinematics](../contents/ch2Kinematics.md), we can derive
  the four rotational kinematic equations (presented together with their
  translational counterparts) seen in [Table 1](#Table1).
* In these equations, the subscript 0 denotes initial values ($$ x_{0} $$ and $$
  t_{0} $$ are initial values), and the average angular velocity $$
  \overline{\omega } $$ and average velocity $$ \overline{v} $$ are defined as
  follows:
  <div class="equation">
  $$ \overline{\omega }=\frac{ \omega_{0} +\omega }{2}\text{ and
  }\overline{v}=\frac{ v_{0}+v}{2}. $$
  </div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
With the aid of a string, a gyroscope is accelerated from rest to 32 rad/s in 0.40 s.

(a) What is its angular acceleration in $$\radss $$?

(b) How many revolutions does it go through in the process?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
(a) $$ 80 \radss $$

(b) 1.0 rev

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose a piece of dust finds itself on a CD. If the spin rate of the CD is 500 rpm, and the piece of dust is 4.3 cm from the center, what is the total distance traveled by the dust in 3 minutes? (Ignore accelerations due to getting the CD rotating.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A gyroscope slows from an initial rate of 32.0 rad/s at a rate of $$ 0.700
\radss $$.

(a) How long does it take to come to rest?

(b) How many revolutions does it make before stopping?

</div>
<div class="solution" markdown="1">
(a) 45.7 s

(b) 116 rev

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
During a very quick stop, a car decelerates at $$ 7.00 \mss $$.

(a) What is the angular acceleration of its 0.280-m-radius tires, assuming they
do not slip on the pavement?

(b) How many revolutions do the tires make before coming to rest, given their
initial angular velocity is $$ 95.0 \rads $$ ?

(c) How long does the car take to stop completely?

(d) What distance does the car travel in this time?

(e) What was the car’s initial velocity?

(f) Do the values obtained seem reasonable, considering that this stop happens
very quickly?

![The figure shows the left arm of a man with tattoo imprints and wearing a glove. He is circulating a yo-yo toy, which is in mid air and connected by the string to his hand. Some people are standing in the background watching the yo-yo trick.](../resources/Figure_10_02_03.jpg "Yo-yos are amusing toys that display significant physics and are engineered to enhance performance based on physical laws. (credit: Beyond Neon, Flickr)")
{: #Figure3}

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Everyday application: Suppose a yo-yo has a center shaft that has a 0.250 cm radius and that its string is being pulled.

(a) If the string is stationary and the yo-yo accelerates away from it at a rate
of $$ 1.50 \mss $$, what is the angular acceleration of the yo-yo?

(b) What is the angular velocity after 0.750 s if it starts from rest?

(c) The outside radius of the yo-yo is 3.50 cm. What is the tangential
acceleration of a point on its edge?

</div>
<div class="solution" markdown="1">
a) $$ 600 \radss $$

b) 450 rad/s

c) 21.0 m/s

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

kinematics of rotational motion
: describes the relationships among rotation angle, angular velocity, angular
acceleration, and time

</div>
