---
title: Rotation Angle and Angular Velocity
layout: page
sectionNumber: 1
chapterNumber: 6
---

<div class="abstract" markdown="1">
* Define arc length, rotation angle, radius of curvature and angular velocity.
* Calculate the angular velocity of a car wheel spin.

</div>

In [Kinematics](./ch2Kinematics), we studied motion along a
straight line and introduced such concepts as displacement, velocity, and
acceleration. [Two-Dimensional Kinematics](./ch3TwoDimensionalKinematics)
dealt with motion in two dimensions. Projectile motion is a special case of
two-dimensional kinematics in which the object is projected into the air, while
being subject to the gravitational force, and lands a distance away. In this
chapter, we consider situations where the object does not land but moves in a
curve. We begin the study of uniform circular motion by defining two angular
quantities needed to describe rotational motion.

### Rotation Angle

When objects rotate about some axis—for example, when the CD (compact disc)
in [Figure 1](#Figure1)
rotates about its center—each point in the object follows a circular arc.
Consider a line from the center of the CD to its edge. Each **pit** used to
record sound along this line moves through the same angle in the same amount of
time. The rotation angle is the amount of rotation and is analogous to linear
distance. We define the
**rotation angle** $$ \Delta\theta $$ to be the ratio of the arc length to the
radius of curvature:

<div class="equation">
 $$ \Delta\theta =\frac{ \Delta s }{r}. $$
</div>

![The figure shows the back side of a compact disc. There is a scratched part on the upper right side of the C D, about one-fifth size of the whole area, with inner circular dots clearly visible. Two line segments are drawn enclosing the scratched area from the border of the C D to the middle plastic portion. A curved arrow is drawn between the two line segments near this middle portion and angle delta theta written alongside it.](../resources/Figure_06_01_01.jpg "All points on a CD travel in circular arcs. The pits along a line from the center to the edge all move through the same angle \( \Delta \theta \)")
{: #Figure1}

![A circle of radius r and center O is shown. A radius O-A of the circle is rotated through angle delta theta about the center O to terminate as radius O-B. The arc length A-B is marked as delta s.](../resources/Figure_06_01_02.jpg "The radius of a circle is rotated through an angle \( \Delta \theta \). The arc length \( \Delta s \) is described on the circumference. ")
{: #Figure2}

The **arc length** $$ \Delta s $$ is the distance traveled along a circular path
as shown in [Figure 2](#Figure2) Note that $$ r $$ is the
**radius of curvature** of the circular path.

We know that for one complete revolution, the arc length is the circumference of
a circle of radius $$ r $$. The circumference of a circle is $$ 2\pi r $$. Thus
for one complete revolution the rotation angle is

<div class="equation">
 $$ \Delta\theta =\frac{2\pi r}{r}=2\pi . $$
</div>

This result is the basis for defining the units used to measure rotation angles,
$$ \Delta\theta $$ to be **radians** (rad), defined so that

<div class="equation">
 $$ 2\pi \text{rad}=1 \text{revolution.} $$
</div>

A comparison of some useful angles expressed in both degrees and radians is
shown in [Table 1](#Table1).

##### Table 1: Comparison of Angular units

| Degree Measures | Radian Measure |
|-----------------|----------------|
| 30º             | 𝜋/6           |
| 60º             | 𝜋/3           |
| 90º             | 𝜋/2           |
| 120º            | 2𝜋/3          |
| 135º            | 3𝜋/4          |
| 180º            | 𝜋             |

{: #Table1}

![A circle is shown. Two radii of the circle, inclined at an acute angle delta theta, are shown. On one of the radii, two points, one and two are marked. The point one is inside the circle through which an arc between the two radii is shown. The point two is on the circumference of the circle. The two arc lengths are delta s one and delta s two respectively for the two points.](../resources/Figure_06_01_03.jpg
"Points 1 and 2 rotate through the same angle \( \Delta \theta \), but point 2 moves through a greater arc length \( \Delta s \) because it is at a greater distance from the center of rotation \( r \) ")
{: #Figure3}

If $$ \Delta\theta =2\pi $$ rad, then the CD has made one complete revolution,
and every point on the CD is back at its original position. Because there are $$
360^\circ $$ in a circle or one revolution, the relationship between radians and
degrees is thus

<div class="equation">
 $$ 2\pi \text{rad}=360^\circ $$
</div>

so that

<div class="equation">
 $$ 1\text{rad}=\frac{360^\circ}{2\pi }\approx 57.3^\circ . $$
</div>

### Angular Velocity

How fast is an object rotating? We define **angular velocity** $$ \omega $$ as
the rate of change of an angle. In symbols, this is

<div class="equation">
 $$ \omega =\frac{ \Delta\theta }{\Delta t }, $$
</div>

where an angular rotation $$ \Delta\theta $$ takes place in a time $$ \Delta t
$$. The greater the rotation angle in a given amount of time, the greater the
angular velocity. The units for angular velocity are radians per second (rad/s).

Angular velocity $$ \omega $$ is analogous to linear velocity $$ v $$. To get
the precise relationship between angular and linear velocity, we again consider
a pit on the rotating CD. This pit moves an arc length $$ \Delta s $$ in a time
$$ \Delta t $$, and so it has a linear velocity

<div class="equation">
 $$ v=\frac{ \Delta s }{\Delta t }. $$
</div>

From $$ \Delta\theta =\frac{ \Delta s }{r} $$ we see that $$ \Delta s
=r\Delta\theta $$. Substituting this into the expression for $$ v $$ gives

<div class="equation">
 $$ v=\frac{r\Delta\theta }{\Delta t }=r \omega . $$
</div>

We write this relationship in two different ways and gain two different
insights:

<div class="equation">
 $$ v=r \omega \text{ or }\omega =\frac{v}{r}. $$
</div>

The first relationship in $$ v=r \omega$$ or $$\omega =\frac{v}{r} $$ states
that the linear velocity $$ v $$ is proportional to the distance from the center
of rotation, thus, it is largest for a point on the rim (largest $$ r $$ ), as
you might expect. We can also call this linear speed $$ v $$ of a point on the
rim the *tangential speed*. The second relationship in $$ v=r \omega \text{ or
}\omega =\frac{v}{r} $$ can be illustrated by considering the tire of a moving
car. Note that the speed of a point on the rim of the tire is the same as the
speed $$ v $$ of the car. See [Figure 4](#Figure4). So the faster the car moves,
the faster the tire spins—large $$ v $$ means a large $$ \omega $$, because $$
v=r \omega $$. Similarly, a larger-radius tire rotating at the same angular
velocity ( $$ \omega $$)
will produce a greater linear speed ( $$ v $$)
for the car.

![The given figure shows the front wheel of a car. The radius of the car wheel, r, is shown as an arrow and the linear velocity, v, is shown with a green horizontal arrow pointing rightward. The angular velocity, omega, is shown with a clockwise-curved arrow over the wheel.](../resources/Figure_06_01_04.jpg "A car moving at a velocity \( v \) to the right has a tire rotating with an angular velocity \( \omega \). The speed of the tread of the tire relative to the axle is \( v \) , the same as if the car were jacked up. Thus the car moves forward at linear velocity \( r \omega \) , where \( r \) is the tire radius. A larger angular velocity for the tire means a greater velocity for the car. ")
{: #Figure4}

<div class="example" markdown="1">
<div class="title">
How Fast Does a Car Tire Spin?
</div>
Calculate the angular velocity of a 0.300 m radius car tire when the car travels at $$ 15.0 \ms $$
(about $$54 \text{km/h} $$). See [Figure 4](#Figure4).

**Strategy**

Because the linear speed of the tire rim is the same as the speed of the car, we
have $$ v=15.0 \ms $$. The radius of the tire is given to be $$ r=0.300 \m $$.
Knowing $$ v $$ and $$ r $$, we can use the second relationship in $$ v=r
\omega$$, $$ \omega =\frac{v}{r} $$ to calculate the angular velocity.

**Solution**

To calculate the angular velocity, we will use the following relationship:

<div class="equation">
 $$ \omega =\frac{v}{r}. $$
</div>
Substituting the knowns,

<div class="equation">
 $$ \omega =\frac{15.0 \ms }{0.300\m }=50.0\text{rad/s.} $$
</div>

**Discussion**

When we cancel units in the above calculation, we get 50.0/s. But the angular
velocity must have units of rad/s. Because radians are actually unitless (
radians are defined as a ratio of distance), we can simply insert them into the
answer for the angular velocity. Also note that if an earth mover with much
larger tires, say 1.20 m in radius, were moving at the same speed of 15.0 m/s,
its tires would rotate more slowly. They would have an angular velocity

<div class="equation">
 $$ \omega =\left(15.0 \ms \right)/\left(1.20\m \right)=12.5\text{rad/s.} $$
</div>
</div>

Both $$ \omega $$ and $$ v $$ have directions (hence they are angular and
linear *velocities*, respectively). Angular velocity has only two directions
with respect to the axis of rotation—it is either clockwise or counterclockwise.
Linear velocity is tangent to the path, as illustrated in [Figure 5](#Figure5).

<div class="note" data-label="" markdown="1">
<div class="title">
Take-Home Experiment
</div>
Tie an object to the end of a string and swing it around in a horizontal circle above your head (swing at your wrist). Maintain uniform speed as the object swings and measure the angular velocity of the motion. What is the approximate speed of the object? Identify a point close to your hand and take appropriate measurements to calculate the linear speed at this point. Identify other circular motions and measure their angular velocities.

</div>

![The given figure shows the top view of an old fashioned vinyl record. Two perpendicular line segments are drawn through the center of the circular record, one vertically upward and one horizontal to the right side. Two flies are shown at the end points of the vertical lines near the borders of the record. Two arrows are also drawn perpendicularly rightward through the end points of these vertical lines depicting linear velocities. A curved arrow is also drawn at the center circular part of the record which shows the angular velocity.](../resources/Figure_06_01_05.jpg "As an object moves in a circle, here a fly on the edge of an old-fashioned vinyl record, its instantaneous velocity is always tangent to the circle. The direction of the angular velocity is clockwise in this case. ")
{: #Figure5}

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Ladybug Revolution
</div>
<figure markdown="1">
<figcaption>
Ladybug Revolution
</figcaption>
<iframe loading="lazy" src="https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=rotation" width="600" height="450"  allowfullscreen></iframe>
</figure>
Join the ladybug in an exploration of rotational motion. Rotate the merry-go-round to change its angle, or choose a constant angular velocity or angular acceleration. Explore how circular motion relates to the bug\'s x,y position, velocity, and acceleration using vectors or graphs.

</div>

### Section Summary

* Uniform circular motion is motion in a circle at constant speed. The rotation
  angle $$ \Delta\theta $$ is defined as the ratio of the arc length to the
  radius of curvature:
  <div class="equation">
  $$ \Delta\theta =\frac{ \Delta s }{r}, $$
  </div>

where arc length $$ \Delta s $$ is distance traveled along a circular path and
$$ r $$ is the radius of curvature of the circular path. The quantity $$
\Delta\theta $$ is measured in units of radians (rad), for which

  <div class="equation">
 $$ 2\pi \text{rad}=360^\circ= 1 \text{ revolution} . $$
  </div>

* The conversion between radians and degrees is $$ 1\text{ rad}=57.3^\circ $$.
* Angular velocity $$ \omega $$ is the rate of change of an angle,
  <div class="equation">
    $$ \omega =\frac{ \Delta\theta }{\Delta t }, $$
  </div>

where a rotation $$ \Delta\theta $$ takes place in a time $$ \Delta t $$. The
units of angular velocity are radians per second (rad/s). Linear velocity $$ v
$$ and angular velocity $$ \omega $$ are related by

  <div class="equation">
 $$ v=r \omega \text{ or }\omega =\frac{v}{r}. $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
There is an analogy between rotational and linear physical quantities. What rotational quantities are analogous to distance and velocity?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Semi-trailer trucks have an odometer on one hub of a trailer wheel. The hub is weighted so that it does not rotate, but it contains gears to count the number of wheel revolutions—it then calculates the distance traveled. If the wheel has a 1.15 m diameter and goes through 200 000 rotations, how many kilometers should the odometer read?

</div>
<div class="solution" markdown="1">

**Strategy**

Each complete rotation of the wheel covers a distance equal to the wheel's circumference. We'll calculate the circumference from the diameter, then multiply by the number of rotations to find the total distance traveled.

**Solution**

The circumference of the wheel is:

<div class="equation">
$$ C = \pi d = \pi(1.15\text{ m}) = 3.61\text{ m} $$
</div>

The total distance traveled is:

<div class="equation">
$$ s = (\text{number of rotations}) \times C = (200{,}000)(3.61\text{ m}) = 7.23 \times 10^5\text{ m} $$
</div>

Convert to kilometers:

<div class="equation">
$$ s = 7.23 \times 10^5\text{ m} \times \frac{1\text{ km}}{1000\text{ m}} = 723\text{ km} $$
</div>

**Discussion**

The odometer should read 723 km, which is a reasonable distance for a semi-trailer truck to travel before needing maintenance or inspection. This calculation demonstrates the relationship between rotational motion (number of wheel revolutions) and linear distance traveled, which is fundamental to how mechanical odometers work.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Microwave ovens rotate at a rate of about 6 rev/min. What is this in revolutions per second? What is the angular velocity in radians per second?

</div>
<div class="solution" markdown="1">

**Strategy**

We need to convert from revolutions per minute to revolutions per second, and then to radians per second. We'll use the conversion factors: 1 minute = 60 seconds and 1 revolution = $$ 2\pi $$ radians.

**Solution**

First, convert revolutions per minute to revolutions per second:

<div class="equation">
$$ 6\frac{\text{rev}}{\text{min}} \times \frac{1\text{ min}}{60\text{ s}} = 0.10\text{ rev/s} $$
</div>

Next, convert revolutions per second to radians per second:

<div class="equation">
$$ 0.10\frac{\text{rev}}{\text{s}} \times \frac{2\pi\text{ rad}}{1\text{ rev}} = 0.628\text{ rad/s} $$
</div>

**Discussion**

The microwave oven turntable rotates at 0.10 revolutions per second, which corresponds to an angular velocity of 0.628 rad/s or approximately 0.63 rad/s.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An automobile with 0.260 m radius tires travels 80 000 km before wearing them out. How many revolutions do the tires make, neglecting any backing up and any change in radius due to wear?

</div>
<div class="solution" markdown="1">

**Strategy**

Each revolution of the tire covers a distance equal to the circumference. We'll find the circumference, convert the total distance to meters, then divide the total distance by the circumference to find the number of revolutions.

**Solution**

The circumference of the tire is:

<div class="equation">
$$ C = 2\pi r = 2\pi(0.260\text{ m}) = 1.63\text{ m} $$
</div>

Convert the total distance to meters:

<div class="equation">
$$ s = 80{,}000\text{ km} \times \frac{1000\text{ m}}{1\text{ km}} = 8.00 \times 10^7\text{ m} $$
</div>

The number of revolutions is:

<div class="equation">
$$ N = \frac{s}{C} = \frac{8.00 \times 10^7\text{ m}}{1.63\text{ m}} = 4.91 \times 10^7\text{ rotations} \approx 5 \times 10^7\text{ rotations} $$
</div>

**Discussion**

The tires make approximately 50 million revolutions before wearing out after traveling 80,000 km. This enormous number of rotations explains why tire tread wears down over time and why tires need to be replaced periodically. The calculation also assumes the tire radius remains constant, though in reality, tire wear would slightly reduce the radius, affecting the actual number of revolutions.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the period of rotation of Earth in seconds?
(b) What is the angular velocity of Earth?
(c) Given that Earth has a radius of $$ 6.4\times 10^{6}\m $$ at its equator, what is the linear velocity at Earth's surface?

</div>
<div class="solution" markdown="1">

**Strategy**

(a) Earth completes one full rotation (one day) in 24 hours. We'll convert this to seconds.
(b) Angular velocity is found using $$ \omega = \frac{\Delta\theta}{\Delta t} $$, where one complete rotation is $$ 2\pi $$ radians.
(c) We'll use the relationship $$ v = r\omega $$ to find the linear velocity at the equator.

**Solution**

(a) Convert the period from hours to seconds:

<div class="equation">
$$ T = 24\text{ h} \times \frac{60\text{ min}}{1\text{ h}} \times \frac{60\text{ s}}{1\text{ min}} = 86{,}400\text{ s} $$
</div>

(b) Calculate the angular velocity:

<div class="equation">
$$ \omega = \frac{\Delta\theta}{\Delta t} = \frac{2\pi\text{ rad}}{86{,}400\text{ s}} = 7.27 \times 10^{-5}\text{ rad/s} $$
</div>

(c) Calculate the linear velocity at Earth's surface:

<div class="equation">
$$ v = r\omega = \left(6.4 \times 10^{6}\text{ m}\right)\left(7.27 \times 10^{-5}\text{ rad/s}\right) = 465\text{ m/s} $$
</div>

**Discussion**

Earth completes one rotation in 86,400 seconds (24 hours) with an angular velocity of $$ 7.27 \times 10^{-5} $$ rad/s. At the equator, the linear velocity of Earth's surface is approximately 465 m/s or about 1674 km/h, which is quite substantial but not noticeable in everyday life because we rotate along with Earth.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A baseball pitcher brings his arm forward during a pitch, rotating the forearm about the elbow. If the velocity of the ball in the pitcher's hand is 35.0 m/s and the ball is 0.300 m from the elbow joint, what is the angular velocity of the forearm?

</div>
<div class="solution" markdown="1">

**Strategy**

We need to find the angular velocity given the linear velocity and radius. We'll use the relationship $$ v = r\omega $$, which we can rearrange to solve for $$ \omega = \frac{v}{r} $$.

**Solution**

Using the relationship between linear and angular velocity:

<div class="equation">
$$ \omega = \frac{v}{r} = \frac{35.0\text{ m/s}}{0.300\text{ m}} = 117\text{ rad/s} $$
</div>

**Discussion**

The angular velocity of the forearm is 117 rad/s, which is quite large. To put this in perspective, we can convert to revolutions per second: $$ \omega = 117\text{ rad/s} \times \frac{1\text{ rev}}{2\pi\text{ rad}} = 18.6\text{ rev/s} $$, or about 19 revolutions per second. This high angular velocity, combined with the radius from the elbow to the ball, produces the high linear velocity needed for a fast pitch. Professional pitchers achieve these impressive velocities through coordinated whole-body motion, not just arm rotation.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In lacrosse, a ball is thrown from a net on the end of a stick by rotating the stick and forearm about the elbow. If the angular velocity of the ball about the elbow joint is 30.0 rad/s and the ball is 1.30 m from the elbow joint, what is the velocity of the ball?

</div>
<div class="solution" markdown="1">

**Strategy**

We need to find the linear velocity of the ball given its angular velocity and distance from the axis of rotation. We'll use the relationship $$ v = r\omega $$.

**Solution**

Using the relationship between linear and angular velocity:

<div class="equation">
$$ v = r\omega = (1.30\text{ m})(30.0\text{ rad/s}) = 39.0\text{ m/s} $$
</div>

**Discussion**

The velocity of the lacrosse ball is 39.0 m/s, which is greater than the baseball pitcher's velocity of 35.0 m/s in the earlier problem, despite having a lower angular velocity (30.0 rad/s compared to 117 rad/s). This is because the ball is much farther from the axis of rotation (1.30 m compared to 0.300 m), demonstrating that linear velocity is directly proportional to both angular velocity and radius.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A truck with 0.420-m-radius tires travels at 32.0 m/s. What is the angular velocity of the rotating tires in radians per second? What is this in rev/min?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">

**Strategy**

We need to find the angular velocity from the linear velocity and radius. We'll use $$ \omega = \frac{v}{r} $$ to find the angular velocity in rad/s, then convert to rev/min using appropriate conversion factors.

**Solution**

Calculate the angular velocity in rad/s:

<div class="equation">
$$ \omega = \frac{v}{r} = \frac{32.0\text{ m/s}}{0.420\text{ m}} = 76.2\text{ rad/s} $$
</div>

Convert to rev/min:

<div class="equation">
$$ \omega = 76.2\frac{\text{rad}}{\text{s}} \times \frac{1\text{ rev}}{2\pi\text{ rad}} \times \frac{60\text{ s}}{1\text{ min}} = \frac{76.2 \times 60}{2\pi}\text{ rev/min} = \frac{4572}{6.28}\text{ rev/min} = 728\text{ rpm} $$
</div>

**Discussion**

The angular velocity of the truck's tires is 76.2 rad/s or 728 rpm. This rotation rate is typical for vehicles traveling at highway speeds. Notice that the angular velocity depends on both the linear speed and the tire radius - larger tires would rotate more slowly at the same linear speed, while smaller tires would rotate faster.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Integrated Concepts**
When kicking a football, the kicker rotates his leg about the hip joint.

(a) If the velocity of the tip of the kicker's shoe is 35.0 m/s and the hip
joint is 1.05 m from the tip of the shoe, what is the shoe tip's angular
velocity?

(b) The shoe is in contact with the initially stationary 0.500 kg football for
20.0 ms. What average force is exerted on the football to give it a velocity of
20.0 m/s?

(c) Find the maximum range of the football, neglecting air resistance.

</div>
<div class="solution" markdown="1">

**Strategy**

(a) We'll use $$ \omega = \frac{v}{r} $$ to find the angular velocity of the leg.
(b) We'll use the impulse-momentum theorem: $$ F\Delta t = m\Delta v $$ to find the average force.
(c) Maximum range occurs at a 45° launch angle. We'll use the range formula $$ R = \frac{v^2\sin(2\theta)}{g} $$.

**Solution**

(a) Calculate the angular velocity:

<div class="equation">
$$ \omega = \frac{v}{r} = \frac{35.0\text{ m/s}}{1.05\text{ m}} = 33.3\text{ rad/s} $$
</div>

(b) Calculate the average force using the impulse-momentum theorem:

<div class="equation">
$$ F\Delta t = m\Delta v $$
</div>

<div class="equation">
$$ F = \frac{m\Delta v}{\Delta t} = \frac{(0.500\text{ kg})(20.0\text{ m/s} - 0)}{20.0 \times 10^{-3}\text{ s}} = \frac{10.0\text{ kg·m/s}}{0.0200\text{ s}} = 500\text{ N} $$
</div>

(c) Calculate the maximum range (at 45° launch angle):

<div class="equation">
$$ R = \frac{v^2\sin(2\theta)}{g} = \frac{(20.0\text{ m/s})^2\sin(90°)}{9.80\text{ m/s}^2} = \frac{400 \times 1}{9.80} = 40.8\text{ m} $$
</div>

**Discussion**

The angular velocity of the kicker's leg is 33.3 rad/s, which combined with the 1.05 m radius produces a shoe tip velocity of 35.0 m/s. The average force on the football during the brief 20 ms contact is 500 N (about 112 lb), which accelerates the football to 20.0 m/s. At the optimal 45° launch angle, the football can travel a maximum distance of 40.8 m (about 45 yards), which is a reasonable distance for a punt or field goal attempt in American football.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Construct Your Own Problem**

Consider an amusement park ride in which participants are rotated about a
vertical axis in a cylinder with vertical walls. Once the angular velocity
reaches its full value, the floor drops away and friction between the walls and
the riders prevents them from sliding down. Construct a problem in which you
calculate the necessary angular velocity that assures the riders will not slide
down the wall. Include a free body diagram of a single rider. Among the
variables to consider are the radius of the cylinder and the coefficients of
friction between the riders’ clothing and the wall.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

arc length
: $$ \Delta s $$, the distance traveled by an object along a circular path

pit
: a tiny indentation on the spiral track moulded into the top of the
polycarbonate layer of CD

rotation angle
: the ratio of the arc length to the radius of curvature on a circular path:
$$ \Delta \theta =\frac{ \Delta s}{r} $$

radius of curvature
: radius of a circular path

radians
: a unit of angle measurement

angular velocity
: $$ \omega $$, the rate of change of the angle with which an object moves on a
circular path

</div>
