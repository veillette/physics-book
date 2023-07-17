---
title: "Falling Objects"
layout: page
---

<div class="abstract" markdown="1">
* Describe the effects of gravity on objects in motion.
* Describe the motion of objects that are in free fall.
* Calculate the position and velocity of objects in free fall.

</div>

Falling objects form an interesting class of motion problems. For example, we
can estimate the depth of a vertical mine shaft by dropping a rock into it and
listening for the rock to hit the bottom. By applying the kinematics developed
so far to falling objects, we can examine some interesting situations and learn
much about gravity in the process.

### Gravity

The most remarkable and unexpected fact about falling objects is that, if air
resistance and friction are negligible, then in a given location all objects
fall toward the center of Earth with the *same constant acceleration,
independent of their mass*. This experimentally determined fact is unexpected,
because we are so accustomed to the effects of air resistance and friction that
we expect light objects to fall slower than heavy ones.

![Positions of a feather and hammer over time as they fall on the Moon. The feather and hammer are at the exact same position at each moment in time.](../resources/Figure_02_07_01.jpg "A hammer and a feather will fall with the same constant acceleration if air resistance is considered negligible. This is a general characteristic of gravity not unique to Earth, as astronaut David R. Scott demonstrated on the Moon in 1971, where the acceleration due to gravity is only \( 1.67 \mss \) ")
{: #Figure1}

In the real world, air resistance can cause a lighter object to fall slower than
a heavier object of the same size. A tennis ball will reach the ground after a
hard baseball dropped at the same time. (It might be difficult to observe the
difference if the height is not large.) Air resistance opposes the motion of an
object through the air, while friction between objects—such as between clothes
and a laundry chute or between a stone and a pool into which it is dropped—also
opposes motion between them. For the ideal situations of these first few
chapters, an object *falling without air resistance or friction* is defined to
be in **free-fall**.

The force of gravity causes objects to fall toward the center of Earth. The
acceleration of free-falling objects is therefore called the **acceleration due
to gravity**. The acceleration due to gravity is *constant*, which means we can
apply the kinematics equations to any falling object where air resistance and
friction are negligible. This opens a broad class of interesting situations to
us. The acceleration due to gravity is so important that its magnitude is given
its own symbol, $$ g $$. It is constant at any given location on Earth and has
the average value

<div class="equation">
 $$ g=9.80 \mss . $$
</div>

Although $$ g $$ varies from $$ 9.78 \mss $$ to $$ 9.83 \mss $$, depending on
latitude, altitude, underlying geological formations, and local topography, the
average value of $$ 9.80 \mss $$ will be used in this text unless otherwise
specified. The direction of the acceleration due to gravity is *downward (
towards the center of Earth)*. In fact, its direction *defines* what we call
vertical. Note that whether the acceleration $$ a $$ in the kinematic equations
has the value $$ +g $$ or $$ -g $$ depends on how we define our coordinate
system. If we define the upward direction as positive, then $$ a=-g=-9.80 \mss
$$, and if we define the downward direction as positive, then $$ a=g=9.80 \mss
$$.

### One-Dimensional Motion Involving Gravity

The best way to see the basic features of motion involving gravity is to start
with the simplest situations and then progress toward more complex ones. So we
start by considering straight up and down motion with no air resistance or
friction. These assumptions mean that the velocity (if there is any) is
vertical. If the object is dropped, we know the initial velocity is zero. Once
the object has left contact with whatever held or threw it, the object is in
free-fall. Under these circumstances, the motion is one-dimensional and has
constant acceleration of magnitude $$ g $$. We will also represent vertical
displacement with the symbol $$ y $$ and use $$ x $$ for horizontal
displacement.

<div class="note" data-label="">
<div class="title">
Kinematic Equations for Objects in Free-Fall where Acceleration = -*g*
</div>
<div class="equation">
 $$ v=v_{0}-g t $$
</div>
<div class="equation">
 $$ y=y_{0}+v_{0}t-\frac{1}{2}g t^{2} $$
</div>
<div class="equation">
 $$ v^{2}=v_{0}^{2}-2g\left(y-y_{0}\right) $$
</div>
</div>

<div class="example" id="example1" markdown="1">
<div class="title">
Calculating Position and Velocity of a Falling Object: A Rock Thrown Upward
</div>
A person standing on the edge of a
high cliff throws a rock straight up with an initial velocity of 13.0 m/s.
The rock misses the edge of the cliff as it falls back to earth.
Calculate the position and velocity of the rock 1.00 s, 2.00 s, and 3.00 s after it
is thrown, neglecting the effects of air resistance.

**Strategy**

Draw a sketch.

![Velocity vector arrow pointing up in the positive y direction, labeled v sub 0 equals thirteen point 0 meters per second. Acceleration vector arrow pointing down in the negative y direction, labeled a equals negative 9 point 8 meters per second squared.](../resources/Figure_02_07_02.jpg
"Velocity and Acceleration Sketch")
{: #Figure2}

We are asked to determine the position $$ y $$ at various times. It is
reasonable to take the initial position $$ y_{0} $$ to be zero. This problem
involves one-dimensional motion in the vertical direction. We use plus and minus
signs to indicate direction, with up being positive and down negative. Since up
is positive, and the rock is thrown upward, the initial velocity must be
positive too. The acceleration due to gravity is downward, so $$ a $$ is
negative. It is crucial that the initial velocity and the acceleration due to
gravity have opposite signs. Opposite signs indicate that the acceleration due
to gravity opposes the initial motion and will slow and eventually reverse it.

Since we are asked for values of position and velocity at three times, we will
refer to these as $$ y_{1} $$ and $$ v_{1} $$; $$ y_{2} $$ and $$ v_{2} $$; and
$$ y_{3} $$ and $$ v_{3} $$.

**Solution for Position** $$ y_{1} $$

1\. Identify the knowns. We know that $$ y_{0}=0 $$; $$ v_{0}=13.0 \ms $$; $$
a=-g=-9.80 \mss $$; and $$ t=1.00 \s $$.

2\. Identify the best equation to use. We will use $$ y=y_{0}+v_{0}t+\frac{1}{2}
at^{2} $$ because it includes only one unknown, $$ y $$ (or $$ y_{1} $$, here),
which is the value we want to find.

3\. Plug in the known values and solve for $$ y_{1} $$.

<div class="equation">
 $$ y_{1}=0+\left(13.0 \ms \right)\left(1.00 \s \right)+\frac{1}{2}\left(-9.80\mss \right){\left(1.00 \s \right)}^{2}=8.10\m $$
</div>

**Discussion**

The rock is 8.10 m above its starting point at $$ t=1.00 \s $$, since $$ y_{1}>
y_
{0} $$. It could be *moving* up or down; the only way to tell is to calculate $$
v_{1} $$ and find out if it is positive or negative.

**Solution for Velocity** $$ v_{1} $$

1\. Identify the knowns. We know that $$ y_{0}=0 $$; $$ v_{0}=13.0 \ms $$; $$
a=-g=-9.80 \mss $$; and $$ t=1.00 \s $$. We also know from the solution above
that $$ y_{1}=8.10 \m $$.

2\. Identify the best equation to use. The most straightforward is $$ v=v_{0}-gt
$$
(from $$ v=v_{0}+at $$, where $$ a=\text{gravitational acceleration}=-g $$).

3\. Plug in the knowns and solve.

<div class="equation">
 $$ v_{1}=v_{0}-gt= 13.0 \ms -\left(9.80 \mss \right)
\left(1.00 \s \right)=3.20 \ms $$
</div>

**Discussion**

The positive value for $$ v_{1} $$ means that the rock is still heading upward
at $$ t=1.00\s $$. However, it has slowed from its original 13.0** m/s, as
expected.

**Solution for Remaining Times**

The procedures for calculating the position and velocity at $$ t=2.00\s $$ and
$$ 3.00 \s $$ are the same as those above. The results are summarized
in [Table 1](#Table1) and illustrated in [Figure 3](#Figure3).

##### Table: Results

|Time, t|Position, y|Velocity, v|Acceleration, a|
|--- |--- |--- |--- |
| $$1.00 \s $$ | $$8.10 \m $$ | $$3.20 \ms $$ | $$-9.80 \mss $$ |
| $$2.00 \s $$ | $$6.40 \m $$| $$-6.60 \ms $$ | $$-9.80 \mss $$ |
| $$3.00 \s $$ | $$-5.10 \m $$ | $$-16.4 \ms $$ | $$-9.80 \mss $$|

{: #Table1}

Graphing the data helps us understand it more clearly.

![Three panels showing three graphs. The top panel shows a graph of vertical position in meters versus time in seconds. The line begins at the origin and has a positive slope that decreases over time until it hits a turning point between seconds 1 and 2. After that it has a negative slope that increases over time. The middle panel shows a graph of velocity in meters per second versus time in seconds. The line is straight, with a negative slope, beginning at time zero velocity of thirteen meters per second and ending at time 3 seconds with a velocity just over negative sixteen meters per second. The bottom panel shows a graph of acceleration in meters per second squared versus time in seconds. The line is straight and flat at a y value of negative 9 point 80 meters per second squared from time 0 to time 3 seconds.](../resources/Figure_02_07_03.jpg "Vertical position, vertical velocity, and vertical acceleration vs. time for a rock thrown vertically up at the edge of a cliff. Notice that velocity changes linearly with time and that acceleration is constant. Misconception Alert! Notice that the position vs. time graph shows vertical position only. It is easy to get the impression that the graph shows some horizontal motion;the shape of the graph looks like the path of a projectile. But this is not the case; the horizontal axis is time, not space. The actual path of the rock in space is straight up, and straight down.")
{: #Figure3}

**Discussion**

The interpretation of these results is important. At 1.00 s the rock is above
its starting point and heading upward, since $$ y_{1} $$ and $$ v_{1} $$ are
both positive. At 2.00 s, the rock is still above its starting point, but the
negative velocity means it is moving downward. At 3.00 s, both $$ y_{3} $$ and
$$ v_{3} $$ are negative, meaning the rock is below its starting point and
continuing to move downward. Notice that when the rock is at its highest point (
at 1.3 s), its velocity is zero, but its acceleration is still $$ -9.80 \mss $$.
Its acceleration is $$ -9.80 \mss $$ for the whole trip—while it is moving up
and while it is moving down. Note that the values for $$ y $$ are the
positions (or displacements) of the rock, not the total distances traveled.
Finally, note that free-fall applies to upward motion as well as downward. Both
have the same acceleration—the acceleration due to gravity, which remains
constant the entire time. Astronauts training in the famous Vomit Comet, for
example, experience free-fall while arcing up as well as down, as we will
discuss in more detail later.

</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment—Reaction Time
</div>
A simple experiment can be done to determine your reaction time. Have a friend hold a ruler between your thumb and index finger, separated by about 1 cm. Note the mark on the ruler that is right between your fingers. Have your friend drop the ruler unexpectedly, and try to catch it between your two fingers. Note the new reading on the ruler. Assuming acceleration is that due to gravity, calculate your reaction time. How far would you travel in a car (moving at 30 m/s) if the time it took your foot to go from the gas pedal to the brake was twice this reaction time?

</div>

<div class="example" id="example2" markdown="1">
<div class="title">
Calculating Velocity of a Falling Object: A Rock Thrown Down
</div>
What happens if the person on the cliff throws the rock straight down, instead of straight up? To explore this question, calculate the velocity of the rock when it is 5.10 m below the starting point, and has been thrown downward with an initial speed of 13.0 m/s.

**Strategy**

Draw a sketch.

![Velocity vector arrow pointing down in the negative y direction and labeled v sub zero equals negative thirteen point 0 meters per second. Acceleration vector arrow also pointing down in the negative y direction, labeled a equals negative 9 point 80 meters per second squared.](../resources/Figure_02_07_04.jpg "Velocity and Accelerator Sketch")
{: #Figure4}

Since up is positive, the final position of the rock will be negative because it
finishes below the starting point at $$ y_{0}=0 $$. Similarly, the initial
velocity is downward and therefore negative, as is the acceleration due to
gravity. We expect the final velocity to be negative since the rock will
continue to move downward.

**Solution**

1\. Identify the knowns. $$ y_{0}=0 $$; $$ y_{1}=-5.10 \m $$; $$ v_
{0}=-13.0 \ms $$; $$ a=-g=-9.80 \mss $$.

2\. Choose the kinematic equation that makes it easiest to solve the problem.
The equation $$ v^{2}=v_{0}^{2}+2a\left(y-y_{0}\right) $$ works well because the
only unknown in it is $$ v $$. (We will plug $$ y_{1} $$ in for $$ y $$.)

3\. Enter the known values

<div class="equation">
 $$ v^{2}={\left(-13.0 \ms \right)}^{2}+
2\left(-9.80 \mss \right)
\left(-5.10 \m -0 \m \right)=268.96 \mmss , $$
</div>
where we have retained extra significant figures because this is an intermediate result.

Taking the square root, and noting that a square root can be positive or
negative, gives

<div class="equation">
 $$ v= \pm  16.4 \ms . $$
</div>
The negative root is chosen to indicate that the rock is still heading down. Thus,

<div class="equation">
 $$ v=-16.4 \ms . $$
</div>

**Discussion**

Note that *this is exactly the same velocity the rock had at this position when
it was thrown straight upward with the same initial speed*. (
See [Example 1](#example1) and [Figure 5](#Figure5)(a).) This is not a coincidental
result. Because we only consider the acceleration due to gravity in this
problem, the *speed* of a falling object depends only on its initial speed and
its vertical position relative to the starting point. For example, if the
velocity of the rock is calculated at a height of 8.10 m above the starting
point (using the method from [Example 1](#example1)) when the initial velocity
is 13.0 m/s straight up, a result of $$ \pm 3.20 \ms $$ is obtained. Here both
signs are meaningful; the positive value occurs when the rock is at 8.10 m and
heading up, and the negative value occurs when the rock is at 8.10 m and heading
back down. It has the same *speed* but the opposite direction.

![Two figures are shown. At left, a man standing on the edge of a cliff throws a rock straight up with an initial speed of thirteen meters per second. At right, the man throws the rock straight down with a speed of thirteen meters per second. In both figures, a line indicates the rock&#x2019;s trajectory. When the rock is thrown straight up, it has a speed of minus sixteen point four meters per second at minus five point one zero meters below the point where the man released the rock. When the rock is thrown straight down, the velocity is the same at this position.](../resources/Figure_02_07_05.jpg "(a) A person throws a rock straight up, as explored in <a href="#example1">Example 1</a>. The arrows are velocity vectors at 0, 1.00, 2.00, and 3.00 s. (b) A person throws a rock straight down from a cliff with the same initial speed as before, as in <a href="#example2">Example 2</a>. Note that at the same distance below the point of release, the rock has the same velocity in both cases. ")
{: #Figure5}

Another way to look at it is this: In [Example 1](#example1), the rock is thrown
up with an initial velocity of $$ 13.0 \ms $$. It rises and then falls back
down. When its position is $$ y=0 $$ on its way back down, its velocity is $$
-13.0 \ms $$. That is, it has the same speed on its way down as on its way up.
We would then expect its velocity at a position of $$ y=-5.10 \m $$ to be the
same whether we have thrown it upwards at $$ +13.0 \ms $$ or thrown it downwards
at $$ -13.0 \ms $$. The velocity of the rock on its way down from $$ y=0 $$ is
the same whether we have thrown it up or down to start with, as long as the
speed with which it was initially thrown is the same.

</div>

<div class="example" markdown="1">
<div class="title">
Find *g* from Data on a Falling Object
</div>
The acceleration due to gravity on Earth differs slightly from place to place, depending on topography (e.g., whether you are on a hill or in a valley) and subsurface geology (whether there is dense rock like iron ore as opposed to light rock like salt beneath you.) The precise acceleration due to gravity can be calculated from data taken in an introductory physics laboratory course. An object, usually a metal ball for which air resistance is negligible, is dropped and the time it takes to fall a known distance is measured. See, for example, [Figure 6](#Figure6). Very precise results can be produced with this method if sufficient care is taken in measuring the distance fallen and the elapsed time.

![Figure has four panels. The first panel (on the top) is an illustration of a ball falling toward the ground at intervals of one tenth of a second. The space between the vertical position of the ball at one time step and the next increases with each time step. At time equals 0, position and velocity are also 0. At time equals 0 point 1 seconds, y position equals negative 0 point 049 meters and velocity is negative 0 point 98 meters per second. At 0 point 5 seconds, y position is negative 1 point 225 meters and velocity is negative 4 point 90 meters per second. The second panel (in the middle) is a line graph of position in meters versus time in seconds. Line begins at the origin and slopes down with increasingly negative slope. The third panel (bottom left) is a line graph of velocity in meters per second versus time in seconds. Line is straight, beginning at the origin and with a constant negative slope. The fourth panel (bottom right) is a line graph of acceleration in meters per second squared versus time in seconds. Line is flat, at a constant y value of negative 9 point 80 meters per second squared.](../resources/Figure_02_07_06.jpg "Positions and velocities of a metal ball released from rest when air resistance is negligible. Velocity is seen to increase linearly with time while displacement increases with time squared. Acceleration is a constant and is equal to gravitational acceleration.")
{: #Figure6}

Suppose the ball falls 1.0000 m in 0.45173 s. Assuming the ball is not affected
by air resistance, what is the precise acceleration due to gravity at this
location?

**Strategy**

Draw a sketch.

![The figure shows a green dot labeled v sub zero equals zero meters per second, a purple downward pointing arrow labeled a equals question mark, and an x y coordinate system with the y axis pointing vertically up and the x axis pointing horizontally to the right.](../resources/Figure_02_07_07.jpg)
{: #Figure7}

We need to solve for acceleration $$ a $$. Note that in this case, displacement
is downward and therefore negative, as is acceleration.

**Solution**

1\. Identify the knowns. $$ y_{0}=0 $$; $$ y=-1.0000 \m $$; $$ t=0.45173 \s $$;
$$ v_{0}=0 $$.

2\. Choose the equation that allows you to solve for $$ a $$ using the known
values.

<div class="equation">
 $$ y=y_{0}+v_{0}t+\frac{1}{2}a t^{2} $$
</div>
3\. Substitute 0 for $$ v_{0} $$ and rearrange the equation to solve for $$
a $$. Substituting 0 for $$ v_{0} $$ yields

<div class="equation">
 $$ y=y_{0}+\frac{1}{2}a t^{2}. $$
</div>
Solving for $$ a $$ gives

<div class="equation">
 $$ a=\frac{2\left(y-y_{0}\right)}{ t^{2}}. $$
</div>
4\. Substitute known values yields

<div class="equation">
 $$ a=\frac{2\left(-1.0000 \m  - 0 \right)}
{\left(0.45173 \s \right)^{2}}=-9.8010\mss ,$$
</div>
so, because $$ a=-g $$ with the directions we have chosen,

<div class="equation">
 $$ g=9.8010 \mss . $$
</div>

**Discussion**

The negative value for $$ a $$ indicates that the gravitational acceleration is
downward, as expected. We expect the value to be somewhere around the average
value of $$ 9.80 \mss $$, so $$ 9.8010 \mss $$ makes sense. Since the data going
into the calculation are relatively precise, this value for $$ g $$ is more
precise than the average value of $$ 9.80 \mss $$; it represents the local value
for the acceleration due to gravity.
</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
A chunk of ice breaks off a glacier and falls 30.0 meters before it hits the
water. Assuming it falls freely (there is no air resistance), how long does
it take to hit the water?
</div>
<div class="solution" markdown="1">
We know that initial position $$ y_{0}=0 $$, final position $$ y=−30.0 \text
{m} $$, and $$ a=-g=-9.80 \mss $$. We can then use the equation $$
y=y_{0}+v_{0}t+\frac{1}{2}a t^{2} $$ to solve for $$ t $$. Inserting $$ a=-g $$, we obtain

<div class="equation">
 $$ \begin{array}{lll}
y&=& 0+0-\frac{1}{2}g t^{2} \\
t^{2}&=& \frac{2y}{-g}\\
t&=& \pm \sqrt{\frac{2y}{-g}}= \pm \sqrt{\frac{2\left(-30.0 \m \right)}{-9.
80 \mss }}= \pm \sqrt{6.12 \s^{2}}=2.47 \s \approx 2.5 \s
\end{array} $$
</div>
where we take the positive value as the physically relevant answer.
Thus, it takes about 2.5 seconds for the piece of ice to hit the water.
</div>
</div>

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
Kinematics of an Elevator
</div>
The three kinematic variables, position, velocity, and acceleration are all related. See how they evolve graphically.
<figure markdown="1">
<iframe loading="lazy" src="https://ccny-physics-sims.github.io/sims/plot-elevator/" 
width ="600" height="1000" allowfullscreen ></iframe >
<figcaption>
Kinematics of an Elevator
</figcaption>
</figure>
</div>



### Section Summary

* An object in free-fall experiences constant acceleration if air resistance is
  negligible.
* On Earth, all free-falling objects have an acceleration due to gravity $$ g
  $$, which averages
  <div class="equation">
  $$ g=9.80 \mss . $$
  </div>

* Whether the acceleration $$a$$ should be taken as $$ +g $$ or $$ -g $$ is
  determined by your choice of coordinate system. If you choose the upward
  direction as positive, $$ a=-g=-9.80 \mss $$ is negative. In the opposite
  case, $$ a=+g=9.80 \mss $$ is positive. Since acceleration is constant, the
  kinematic equations above can be applied with the appropriate $$ +g $$ or $$
  -g $$ substituted for $$ a $$.
* For objects in free-fall, up is normally taken as positive for displacement,
  velocity, and acceleration.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is the acceleration of a rock thrown straight upward on the way up? At the top of its flight? On the way down?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
An object that is thrown straight up falls back to Earth. This is one-dimensional motion.
(a) When is its velocity zero?
(b) Does its velocity change direction?
(c) Does the acceleration due to gravity have the same sign on the way up as on the way down?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose you throw a rock nearly straight up at a coconut in a palm tree, and the rock misses on the way up but hits the coconut on the way down. Neglecting air resistance, how does the speed of the rock when it hits the coconut on the way down compare with what it would have been if it had hit the coconut on the way up? Is it more likely to dislodge the coconut on the way up or down? Explain.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If an object is thrown straight up and air resistance is negligible, then its speed when it returns to the starting point is the same as when it was released. If air resistance were not negligible, how would its speed upon return compare with its initial speed? How would the maximum height to which it rises be affected?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The severity of a fall depends on your speed when you strike the ground. All
factors but the acceleration due to gravity being the same, how many times higher could a safe fall on the Moon be than on Earth (gravitational acceleration on the Moon is about 1/6 that of the Earth)?
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
How many times higher could an astronaut jump on the Moon than on Earth if
his takeoff speed is the same in both locations (gravitational acceleration on the Moon is about 1/6 of $$ g $$ on Earth)?
</div>
</div>

### Problems &amp; Exercises

Assume air resistance is negligible unless otherwise stated.

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the displacement and velocity at times of
(a) 0.500,
(b) 1.00,
(c) 1.50, and
(d) 2.00 s for a ball thrown straight up with an initial velocity of 15.0 m/s.
Take the point of release to be $$ y_{0}=0 $$.
</div>
<div class="solution" markdown="1">
(a) $$ y_{1}=6.28 \m $$; $$ v_{1}=10.1 \ms $$
(b) $$ y_{2}=10.1 \m $$; $$ v_{2}=5.20 \ms $$
(c) $$ y_{3}=11.5 \m $$; $$ v_{3}=0.300 \ms $$
(d) $$ y_{4}=10.4 \m $$; $$ v_{4}=-4.60 \ms $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the displacement and velocity at times of
(a) 0.500,
(b) 1.00,
(c) 1.50,
(d) 2.00, and
(e) 2.50 s for a rock thrown straight down with an initial velocity of 14.0 m/s from the Verrazano Narrows Bridge in New York City. The roadway of this bridge is 70.0 m above the water.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A basketball referee tosses the ball straight up for the starting tip-off.
At what minimum velocity must a basketball player leave the ground to rise 1.25 m
above the floor in an attempt to get the ball?
</div>
<div class="solution" markdown="1">
 $$ v_{0}=4.95 \ms $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A rescue helicopter is hovering over a person whose boat has sunk. One of the rescuers throws a life preserver straight down to the victim with an initial velocity of 1.40 m/s and observes that it takes 1.8 s to reach the water.
(a) List the knowns in this problem.
(b) How high above the water was the preserver released? Note that the downdraft of the helicopter reduces the effects of air resistance on the falling life preserver, so that an acceleration equal to that of gravity is reasonable.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A dolphin in an aquatic show jumps straight up out of the water at a velocity of 13.0 m/s.
(a) List the knowns in this problem.
(b) How high does his body rise above the water? To solve this part, first note that the final velocity is now a known and identify its value. Then identify the unknown, and discuss how you chose the appropriate equation to solve for it. After choosing the equation, show your steps in solving for the unknown, checking units, and discuss whether the answer is reasonable.
(c) How long is the dolphin in the air? Neglect any effects due to his size or orientation.

</div>
<div class="solution" markdown="1">
(a) $$ a=-9.80 \mss $$; $$ v_{0}=13.0 \ms $$; $$ y_{0}=0
\m $$
(b) $$ v=0 \ms $$. Unknown is distance $$ y $$ to top of trajectory,
where velocity is zero. Use equation $$ v^{2}=v_{0}^{2}+2a\left(y-y_{0}\right)
$$ because it contains all known values except for $$ y $$, so we can solve for
$$ y $$. Solving for $$ y $$ gives

<div class="equation">
 $$ \begin{array}{lll}
v^{2}-v_{0}^{2}&=& 2a\left(y-y_{0}\right)\\
\frac{ v^{2}-v_{0}^{2}}{2a}&=& y-y_{0}\\
y&=& y_{0}+\frac{ v^{2}-v_{0}^{2}}{2a}=0 m+\frac{ {\left(0 \ms \right)}^{2}-{\left(13.0 \ms \right)}^{2}}{2\left(-9.80 \mss \right)}=8.62 \m
\end{array} $$
</div>
Dolphins measure about 2 meters long and can jump several times their length out of the water, so this is a reasonable result.

(c) $$ 2.65 \s $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A swimmer bounces straight up from a diving board and falls feet first into a pool.
She starts with a velocity of 4.00 m/s, and her takeoff point is 1.80 m above the pool.
(a) How long are her feet in the air?
(b) What is her highest point above the board?
(c) What is her velocity when her feet hit the water?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the height of a cliff if it takes 2.35 s for a rock to hit the ground when it is thrown straight up from the cliff with an initial velocity of 8.00 m/s.
(b) How long would it take to reach the ground if it is thrown straight down with the same speed?

</div>
<div class="solution" markdown="1">
![Path of a rock being thrown off of cliff. The rock moves up from the cliff top, reaches a transition point, and then falls down to the ground.](../resources/Figure_02_07_05.jpg){: #Figure8}

(a) 8.26 m

(b) 0.717 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A very strong, but inept, shot putter puts the shot straight up vertically with an initial
velocity of 11.0 m/s. How long does he have to get out of the way if the shot was released at a height of 2.20 m,
and he is 1.80 m tall?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
You throw a ball straight up with an initial velocity of 15.0 m/s. It passes a tree branch on the way up at a height of 7.00 m. How much additional time will pass before the ball passes the tree branch on the way back down?

</div>
<div class="solution" markdown="1">
1.91 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A kangaroo can jump over an object 2.50 m high.
(a) Calculate its vertical speed when it leaves the ground.
(b) How long is it in the air?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Standing at the base of one of the cliffs of Mt. Arapiles in Victoria, Australia, a hiker hears a rock break loose from
a height of 105 m. He can’t see the rock right away but then does, 1.50 s later.
(a) How far above the hiker is the rock when he can see it?
(b) How much time does he have to move before the rock hits his head?

</div>
<div class="solution" markdown="1">
(a) 94.0 m

(b) 3.13 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An object is dropped from a height of 75.0 m above ground level.
(a) Determine the distance traveled during the first second.
(b) Determine the final velocity at which the object hits the ground.
(c) Determine the distance traveled during the last second of motion before hitting the ground.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
There is a 250-m-high cliff at Half Dome in Yosemite National Park in California. Suppose a boulder breaks loose from the top of this cliff.
(a) How fast will it be going when it strikes the ground?
(b) Assuming a reaction time of 0.300 s, how long will a tourist at the bottom have to get out of the way after hearing the sound of the rock breaking loose (neglecting the height of the tourist, which would become negligible anyway if hit)? The speed of sound is 335 m/s on this day.

</div>
<div class="solution" markdown="1">
(a) -70.0 m/s (downward)

(b) 6.10 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A ball is thrown straight up. It passes a 2.00-m-high window 7.50 m off the ground on its path up and takes 0.312 s to go past the window. What was the ball’s initial velocity? Hint: First consider only the distance along the window, and solve for the ball's velocity at the bottom of the window. Next, consider only the distance from the ground to the bottom of the window, and solve for the initial velocity using the velocity at the bottom of the window as the final velocity.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you drop a rock into a dark well and, using precision equipment, you measure the time for the sound of a splash to return.
(a) Neglecting the time required for sound to travel up the well, calculate the distance to the water if the sound returns in 2.0000 s.
(b) Now calculate the distance taking into account the time for sound to travel up the well. The speed of sound is 332.00 m/s in this well.
</div>
<div class="solution" markdown="1">
(a) $$ 19.6 \m $$

(b) $$ 18.5 \m $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A steel ball is dropped onto a hard floor from a height of 1.50 m and rebounds to a height of 1.45 m.
(a) Calculate its velocity just before it strikes the floor.
(b) Calculate its velocity just after it leaves the floor on its way back up.
(c) Calculate its acceleration during contact with the floor if that contact lasts 0.0800 ms $$ \left(8.00\times 10^{-5}\s \right) $$.
(d) How much did the ball compress during its collision with the floor,
assuming the floor is absolutely rigid?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A coin is dropped from a hot-air balloon that is 300 m above the ground and rising at 10.0 m/s upward. For the coin, find
(a) the maximum height reached,
(b) its position and velocity 4.00 s after being released, and
(c) the time before it hits the ground.
</div>
<div class="solution" markdown="1">
(a) 305 m

(b) 262 m, -29.2 m/s

(c) 8.91 s
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A soft tennis ball is dropped onto a hard floor from a height of 1.50 m and rebounds to a height of 1.10 m.
(a) Calculate its velocity just before it strikes the floor.
(b) Calculate its velocity just after it leaves the floor on its way back up.
(c) Calculate its acceleration during contact with the floor if that contact lasts 3.50 ms $$ \left(3.50\times 10^{-3}\s \right) $$.
(d) How much did the ball compress during its collision with the floor,
assuming the floor is absolutely rigid?

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

free-fall
: the state of movement that results from gravitational force only

acceleration due to gravity
: acceleration of an object as a result of gravity

</div>
