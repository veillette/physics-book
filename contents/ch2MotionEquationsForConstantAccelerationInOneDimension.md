---
title: Motion Equations for Constant Acceleration in One Dimension
layout: page
sectionNumber: 5
chapterNumber: 2
---

<div class="abstract" markdown="1">
* Calculate displacement of an object that is not accelerating, given initial position and velocity.
* Calculate final velocity of an accelerating object, given initial velocity, acceleration, and time.
* Calculate displacement and final position of an accelerating object, given initial position, initial velocity, time, and acceleration.

</div>

![Four men racing up a river in their kayaks.](../resources/Figure_02_05_01.jpg "Kinematic equations can help us describe and predict the motion of moving objects such as these kayaks racing in Newbury, England. (credit: Barry Skeates, Flickr)")
{: #Figure1}

We might know that the greater the acceleration of, say, a car moving away from
a stop sign, the greater the displacement in a given time. But we have not
developed a specific equation that relates acceleration and displacement. In
this section, we develop some convenient equations for kinematic relationships,
starting from the definitions of displacement, velocity, and acceleration
already covered.

### Notation: *t*, *x*, *v*, *a*

First, let us make some simplifications in notation. Taking the initial time to
be zero, as if time is measured with a stopwatch, is a great simplification.
Since elapsed time is $$ \Delta t=t_{f}-t_{0} $$, taking $$ t_{0}=0 $$ means
that $$ \Delta t=t_{f} $$, the final time on the stopwatch. When initial time is
taken to be zero, we use the subscript 0 to denote initial values of position
and velocity. That is, $$ x_{0} $$ is the *initial position* and $$ v_{0} $$ is
the *initial velocity*. We put no subscripts on the final values. That is, $$ t
$$ is the *final time*, $$ x $$ is the *final position*, and $$ v $$ is the 
*final velocity*. This gives a simpler expression for elapsed time—now, $$ \Delta
t=t $$. It also simplifies the expression for displacement, which is now $$
\Delta x=x-x_{0} $$. Also, it simplifies the expression for change in velocity,
which is now $$ \Delta v=v-v_{0} $$. To summarize, using the simplified
notation, with the initial time taken to be zero,

<div class="equation">
 $$ \begin{array}{lll}
\Delta t&=& t\\
\Delta x&=& x-x_{0}\\
\Delta v&=& v-v_{0}
\end{array} $$
</div>
where *the subscript 0 denotes an initial value and the absence of a subscript
denotes a final value* in whatever motion is under consideration.

We now make the important assumption that *acceleration is constant*. This
assumption allows us to avoid using calculus to find instantaneous acceleration.
Since acceleration is constant, the average and instantaneous accelerations are
equal. That is,

<div class="equation">
 $$ \overline{a}=a=\text{constant}, $$
</div>

so we use the symbol $$ a $$ for acceleration at all times. Assuming
acceleration to be constant does not seriously limit the situations we can study
nor degrade the accuracy of our treatment. For one thing, acceleration *is*
constant in a great number of situations. Furthermore, in many other situations
we can accurately describe motion by assuming a constant acceleration equal to
the average acceleration for that motion. Finally, in motions where acceleration
changes drastically, such as a car accelerating to top speed and then braking to
a stop, the motion can be considered in separate parts, each of which has its
own constant acceleration.

<div class="note" data-label="" markdown="1">
<div class="title">
Solving for Displacement ( \( \Delta x \) ) and Final Position (
 \( x \) ) from Average Velocity when Acceleration ( \( a \) ) is Constant
</div>
To get our first two new equations, we start with the definition of average velocity:

<div class="equation">
 $$ \overline{v}=\frac{ \Delta x}{\Delta t}. $$
</div>
Substituting the simplified notation for $$ \Delta x $$ and $$ \Delta t $$
yields

<div class="equation">
 $$ \overline{v}=\frac{x-x_{0}}{t}. $$
</div>
Solving for $$ x $$ yields

<div class="equation">
 $$ x=x_{0}+\overline{v}t, $$
</div>
where the average velocity is

<div class="equation">
 $$ \overline{v}=\frac{ v_{0}+v}{2}\left(\text{constant}a\right). $$
</div>
</div>

The equation $$ \overline{v}=\frac{ v_{0}+v}{2} $$ reflects the fact that, when
acceleration is constant, $$ v $$ is just the simple average of the initial and
final velocities. For example, if you steadily increase your velocity (
that is, with constant acceleration) from 30 to 60 km/h, then your average
velocity during this steady increase is 45 km/h. Using the equation $$
\overline{v}=\frac{ v_{0}+v}{2} $$ to check this, we see that

<div class="equation">
 $$ \overline{v}=\frac{ v_{0}+v}{2}=\frac{30 \text{km/h}+60 \text{km/h}}{2}=45 \text{km/h,} $$
</div>

which seems logical.

<div class="example" markdown="1">
<div class="title">
Calculating Displacement: How Far does the Jogger Run?
</div>
A jogger runs down a straight stretch of road with an average velocity of 4.00 m/s for 2.00 min. What is his final position,
taking his initial position to be zero?

**Strategy**

Draw a sketch.

![Velocity vector arrow labeled v equals 4 point zero zero meters per second over an x axis displaying initial and final positions. Final position is labeled x equals question mark.](../resources/Figure_02_05_02.jpg)
{: #Figure2}

The final position $$ x $$ is given by the equation

<div class="equation">
 $$ x=x_{0}+\overline{v}t. $$
</div>
To find $$ x $$, we identify the values of $$ x_{0} $$, $$ \overline{v} $$,
and $$ t $$ from the statement of the problem and substitute them into the equation.

**Solution**

1\. Identify the knowns. $$ \overline{v}=4.00 \ms $$, $$ \Delta t=2.00
\text{min} $$, and $$ x_{0}=0 \m $$.

2\. Enter the known values into the equation.

<div class="equation">
 $$ x=x_{0}+\overline{v}t=0+\left(4.00 \ms \right)\left(120 \s \right)=480 \m $$
</div>

**Discussion**

Velocity and final displacement are both positive, which means they are in the
same direction.

</div>

The equation $$ x=x_{0}+\overline{v}t $$ gives insight into the relationship
between displacement, average velocity, and time. It shows, for example, that
displacement is a linear function of average velocity. (By linear function, we
mean that displacement depends on $$ \overline{v} $$ rather than on $$
\overline{v} $$ raised to some other power, such as $$ {\overline{v}}^{2} $$.
When graphed, linear functions look like straight lines with a constant slope.)
On a car trip, for example, we will get twice as far in a given time if we
average 90 km/h than if we average 45 km/h.

![Line graph showing displacement in meters versus average velocity in meters per second. The line is straight with a positive slope. Displacement x increases linearly with increase in average velocity v.](../resources/Figure_02_05_03.jpg "There is a linear relationship between displacement and average velocity. For a given time \( t\) , an object moving twice as fast as another object will move twice as far as the other object.")
{: #Figure3}

<div class="note" data-label="" markdown="1">
<div class="title">
Solving for Final Velocity
</div>
We can derive another useful equation by manipulating the definition of acceleration.

<div class="equation">
 $$ a=\frac{ \Delta v}{\Delta t} $$
</div>
Substituting the simplified notation for $$ \Delta v $$ and $$ \Delta t $$
gives us

<div class="equation">
 $$ a=\frac{v-v_{0}}{t} \left(\text{constant}a\right). $$
</div>
Solving for $$ v $$ yields

<div class="equation">
 $$ v=v_{0}+a t \left(\text{ constant }a\right). $$
</div>
</div>

<div class="example" markdown="1">
<div class="title">
Calculating Final Velocity: An Airplane Slowing Down after Landing
</div>
An airplane lands with an initial velocity of 70.0 m/s and then decelerates at $$ 1.50 \mss $$ for 40.0 s. What is its final velocity?

**Strategy**

Draw a sketch. We draw the acceleration vector in the direction opposite the
velocity vector because the plane is decelerating.

![Velocity vector arrow pointing toward the right in the positive x direction. Initial velocity equals seventy meters per second. Final velocity equals question mark. An acceleration vector arrow pointing toward the left labeled a equals negative 1 point 50 meters per second squared.](../resources/Figure_02_05_04.jpg)
{: #Figure4}

**Solution**

1\. Identify the knowns. $$ v_{0}=70.0 \ms $$, $$ a=-1.50 \mss $$, $$ t=40.0\s
$$.

2\. Identify the unknown. In this case, it is final velocity, $$ v_{f} $$.

3\. Determine which equation to use. We can calculate the final velocity using
the equation $$ v=v_{0}+a t $$.

4\. Plug in the known values and solve.

<div class="equation">
 $$ v=v_{0}+a t  =70.0 \ms +\left(-1.50 \mss \right)\left(40.0 \s \right)=10.0 \ms $$
</div>

**Discussion**

The final velocity is much less than the initial velocity, as desired when
slowing down, but still positive. With jet engines, reverse thrust could be
maintained long enough to stop the plane and start moving it backward. That
would be indicated by a negative final velocity, which is not the case here.

![An airplane moving toward the right at two points in time. At time equals 0 the velocity vector arrow points toward the right and is labeled seventy meters per second. The acceleration vector arrow points toward the left and is labeled negative 1 point 5 meters per second squared. At time equals forty seconds, the velocity arrow is shorter, points toward the right, and is labeled ten meters per second. The acceleration vector arrow is still pointing toward the left and is labeled a equals negative 1 point 5 meters per second squared.](../resources/Figure_02_05_05.jpg "The airplane lands with an initial velocity of 70.0 m/s and slows to a final velocity of 10.0 m/s before heading for the terminal. Note that the acceleration is negative because its direction is opposite to its velocity, which is positive.")
{: #Figure5}

</div>

In addition to being useful in problem solving, the equation $$ v=v_{0}+a t $$
gives us insight into the relationships among velocity, acceleration, and time.
From it we can see, for example, that

* final velocity depends on how large the acceleration is and how long it lasts
* if the acceleration is zero, then the final velocity equals the initial
  velocity $$ \left(   v=v_{0}\right) $$, as expected (i.e., velocity is
  constant)
* if $$ a $$ is negative, then the final velocity is less than the initial
  velocity

(All of these observations fit our intuition, and it is always useful to examine
basic equations in light of our intuition and experiences to check that they do
indeed describe nature accurately.)

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Real-World Connection
</div>

![Space shuttle blasting off at night.](../resources/Figure_02_05_06.jpg "The Space Shuttle Endeavor blasts off from the Kennedy Space Center in February 2010. (credit: Matthew Simantov, Flickr)")
{: #Figure6}

An intercontinental ballistic missile (ICBM) has a larger average acceleration
than the Space Shuttle and achieves a greater velocity in the first minute or
two of flight (actual ICBM burn times are classified—short-burn-time missiles
are more difficult for an enemy to destroy). But the Space Shuttle obtains a
greater final velocity, so that it can orbit the earth rather than come directly
back down as an ICBM does. The Space Shuttle does this by accelerating for a
longer time.

</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Solving for Final Position When Velocity is Not Constant ( i.e acceleration is not zero)
</div>
We can combine the equations above to find a third equation that allows us to calculate the final position of an object experiencing constant acceleration. We start with

<div class="equation">
 $$ v=v_{0}+a t . $$
</div>
Adding $$ v_{0} $$ to each side of this equation and dividing by 2 gives

<div class="equation">
 $$ \frac{ v_{0}+v}{2}=v_{0}+\frac{1}{2}a t . $$
</div>
Since $$ \frac{ v_{0}+v }{2}=\overline{v} $$ for constant acceleration, then

<div class="equation">
 $$ \overline{v}=v_{0}+\frac{1}{2}a t . $$
</div>
Now we substitute this expression for $$ \overline{v} $$ into the equation for displacement, $$ x=x_{0}+\overline{v}t $$, yielding

<div class="equation">
 $$ x=x_{0}+v_{0}t+\frac{1}{2} a t^{2} \left(\text{constant}a\right). $$
</div>
</div>

<div class="example" id="example3" markdown="1">
<div class="title">
Calculating Displacement of an Accelerating Object: Dragsters
</div>
Dragsters can achieve average accelerations of $$ 26.0 \mss $$. Suppose such a dragster accelerates from rest at this rate for 5.56 s. How far
does it travel in this time?

![Dragster accelerating down a race track.](../resources/Figure_02_05_07.jpg "U.S. Army Top Fuel pilot Tony &#x201C;The Sarge&#x201D; Schumacher begins a race with a controlled burnout. (credit: Lt. Col. William Thurmond. Photo Courtesy of U.S. Army.)  ")
{: #Figure7}

**Strategy**

Draw a sketch.

![Acceleration vector arrow pointing toward the right in the positive x direction, labeled a equals twenty-six point 0 meters per second squared. x position graph with initial position at the left end of the graph. The right end of the graph is labeled x equals question mark.](../resources/Figure_02_05_08.jpg)
{: #Figure8}

We are asked to find displacement, which is $$ x $$ if we take $$ x_{0} $$ to be
zero. (Think about it like the starting line of a race. It can be anywhere, but
we call it 0 and measure all other positions relative to it.) We can use the
equation $$ x=x_{0}+v_{0}t+\frac{1}{2}a t^{2} $$ once we identify $$ v_{0} $$,
$$ a $$, and $$ t $$ from the statement of the problem.

**Solution**

1\. Identify the knowns. Starting from rest means that $$ v_{0}=0 $$, $$a $$ is
given as $$ 26.0\mss $$ and $$ t $$ is given as 5.56 s.

2\. Plug the known values into the equation to solve for the unknown $$ x $$:

<div class="equation">
 $$ x=x_{0}+v_{0}t+\frac{1}{2}a t^{2} . $$
</div>
Since the initial position and velocity are both zero, this simplifies to

<div class="equation">
 $$ x=\frac{1}{2}a t^{2} . $$
</div>
Substituting the identified values of $$ a $$ and $$ t $$
gives

<div class="equation">
 $$ x=\frac{1}{2}\left(26.0 \mss \right){\left(5.56 \s \right)}^{2}, $$
</div>
yielding

<div class="equation">
 $$ x=402 \m . $$
</div>

**Discussion**

If we convert 402 m to miles, we find that the distance covered is very close to
one quarter of a mile, the standard distance for drag racing. So the answer is
reasonable. This is an impressive displacement in only 5.56 s, but top-notch
dragsters can do a quarter mile in even less time than this.

</div>

What else can we learn by examining the equation $$ x=x_{0}+v_{0}t+\frac{1}{2}a
t^{2} ? $$ We see that:

* displacement depends on the square of the elapsed time when acceleration is
  not zero. In [Example 3](#example3), the dragster covers only one
  fourth of the total distance in the first half of the elapsed time
* if acceleration is zero, then the initial velocity equals average velocity (
  $$ v_{0}=\overline{v} $$ ) and $$ x=x_{0}+v_{0}t+\frac{1}{2}a t^{2} $$ becomes
  $$ x=x_{0}+v_{0}t $$

<div class="note" data-label="" markdown="1">
<div class="title">
Solving for Final Velocity when Velocity Is Not Constant ( acceleration is non-zero )
</div>
A fourth useful equation can be obtained from another algebraic manipulation of previous equations.

If we solve $$ v=v_{0}+a t $$ for $$ t $$, we get

<div class="equation">
 $$ t=\frac{v-v_{0}}{a}. $$
</div>
Substituting this and $$ \overline{v}=\frac{ v_{0}+v}{2} $$ into $$ x=x_{0}+\overline{v}t $$, we get

<div class="equation">
 $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right) \left(\text{ constant }a\right). $$
</div>
</div>

<div class="example" id="example4" markdown="1">
<div class="title">
Calculating Final Velocity: Dragsters
</div>
Calculate the final velocity of the dragster in [Example 3](#example3) 
without 
using information about time.

**Strategy**

Draw a sketch.

![Acceleration vector arrow pointing toward the right, labeled twenty-six point zero meters per second squared. Initial velocity equals 0. Final velocity equals question mark.](../resources/Figure_02_05_09.jpg)
{: #Figure9}

The equation $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right) $$ is ideally suited to
this task because it relates velocities, acceleration, and displacement, and no
time information is required.

**Solution**

1\. Identify the known values. We know that $$ v_{0}=0 $$, since the dragster
starts from rest. Then we note that $$ x-x_{0}=402 \m $$
(this was the answer in [Example 3](#example3)). Finally, the average
acceleration was given to be $$ a=26.0 \mss $$.

2\. Plug the knowns into the equation $$ v^{2}=v_{0}^{2}+2a\left(x-x_
{0}\right) $$ and solve for $$ v. $$
<div class="equation">
 $$ v^{2}=0+2 \left(26.0 \mss \right) \left(402 \m \right) . $$
</div>
Thus

<div class="equation">
 $$ v^{2}=2.09 \times 10^{4} \mmss . $$
</div>
To get $$ v $$, we take the square root:

<div class="equation">
 $$ v=\sqrt{2.09 \times 10^{4} \mmss}=145 \ms . $$
</div>

**Discussion**

145 m/s is about 522 km/h or about 324 mi/h, but even this breakneck speed is
short of the record for the quarter mile. Also, note that a square root has two
values; we took the positive value to indicate a velocity in the same direction
as the acceleration.

</div>

An examination of the equation $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right)
$$ can produce further insights into the general relationships among physical
quantities:

* The final velocity depends on how large the acceleration is and the distance
  over which it acts
* For a fixed deceleration, a car that is going twice as fast doesn’t simply
  stop in twice the distance—it takes much further to stop. (This is why we have
  reduced speed zones near schools.)

### Putting Equations Together

In the following examples, we further explore one-dimensional motion, but in
situations requiring slightly more algebraic manipulation. The examples also
give insight into problem-solving techniques. The box below provides easy
reference to the equations needed.

<div class="note" data-label="">
<div class="title">
Summary of Kinematic Equations (constant acceleration )
</div>
<div class="equation">
 $$ x=x_{0}+\overline{v}t $$
</div>
<div class="equation">
 $$ \overline{v}=\frac{ v_{0}+v}{2} $$
</div>
<div class="equation">
 $$ v=v_{0}+a t $$
</div>
<div class="equation">
 $$ x=x_{0}+v_{0}t+\frac{1}{2}a t^{2} $$
</div>
<div class="equation">
 $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right) $$
</div>
</div>

<div class="example" markdown="1">
<div class="title">
Calculating Displacement: How Far Does a Car Go When Coming to a Halt?
</div>
On dry concrete, a car can decelerate at a rate of $$ 7.00 \mss $$,
whereas on wet concrete it can decelerate at only $$ 5.00 \mss $$.
Find the distances necessary to stop a car moving at 30.0 m/s (about 110
km/h)
(a) on dry concrete and
(b) on wet concrete.
(c) Repeat both calculations, finding the displacement from the point where the
driver sees a traffic light turn red, taking into account his reaction time of 0.500 s to get his foot on
the brake.

**Strategy**

Draw a sketch.

![Initial velocity equals thirty meters per second. Final velocity equals 0. Acceleration dry equals negative 7 point zero zero meters per second squared. Acceleration wet equals negative 5 point zero zero meters per second squared.](../resources/Figure_02_05_10.jpg)
{: #Figure10}

In order to determine which equations are best to use, we need to list all of
the known values and identify exactly what we need to solve for. We shall do
this explicitly in the next several examples, using tables to set them off.

**Solution for (a)**

1\. Identify the knowns and what we want to solve for. We know that $$ v_
{0}=30.0 \ms $$; $$ v=0 $$; $$ a=-7.00\mss $$
( $$ a $$ is negative because it is in a direction opposite to velocity). We
take $$ x_{0} $$ to be 0. We are looking for displacement $$ \Delta x $$, or $$
x-x_{0} $$.

2\. Identify the equation that will help up solve the problem. The best equation
to use is

<div class="equation">
 $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right). $$
</div>
This equation is best because it includes only one unknown, $$ x $$. We know the values of all the other variables in this equation. (There are
other equations that would allow us to solve for $$ x $$, but they require us to know the stopping time, $$ t $$, which we do not know. We could use them but it would entail additional
calculations.)

3\. Rearrange the equation to solve for $$ x $$.

<div class="equation">
 $$ x-x_{0}=\frac{ v^{2}-v_{0}^{2}}{2a} $$
</div>

4\. Enter known values.

<div class="equation">
 $$ x-0=\frac{ 0^{2}-{\left(30.0 \ms \right)}^{2}}{2\left(-7.00 \mss \right)} $$
</div>
Thus,

<div class="equation">
 $$ x=64.3 \m \text{ on dry concrete}. $$
</div>

**Solution for (b)**

This part can be solved in exactly the same manner as Part A. The only
difference is that the deceleration is $$ -5.00 \mss $$. The result is

<div class="equation">
 $$ x_{\text{wet}}=90.0 \m $$ on wet concrete.
</div>

**Solution for (c)**

Once the driver reacts, the stopping distance is the same as it is in Parts A
and B for dry and wet concrete. So to answer this question, we need to calculate
how far the car travels during the reaction time, and then add that to the
stopping time. It is reasonable to assume that the velocity remains constant
during the driver’s reaction time.

1\. Identify the knowns and what we want to solve for. We know that $$
\overline{v}=30.0 \ms $$; $$ t_{\text{reaction}}=0.500\s $$; $$ a_
{\text{reaction}}=0 $$. We take $$ x_{0-\text{reaction}} $$ to be 0. We are
looking for $$ x_{\text{reaction}} $$.

2\. Identify the best equation to use. $$ x=x_{0}+\overline{v}t $$ works well
because the only unknown value is $$ x $$, which is what we want to solve for.

3\. Plug in the knowns to solve the equation.

<div class="equation">
 $$ x=0+\left(30.0 \ms \right)\left(0.500 \s \right)=15.0 \m . $$
</div>
This means the car travels 15.0 m while the driver reacts, making the total displacements in the two cases of dry and wet concrete 15.0 m greater than if he reacted instantly.

4\. Add the displacement during the reaction time to the displacement when
braking.

<div class="equation">
 $$ x_{\text{braking}}+x_{\text{reaction}}=x_{\text{total}} $$
</div>
(a)  64.3 m + 15.0 m = 79.3 m when dry
(b)  90.0 m + 15.0 m = 105 m when wet

![Diagram showing the various braking distances necessary for stopping a car. With no reaction time considered, braking distance is 64 point 3 meters on a dry surface and 90 meters on a wet surface. With reaction time of 0 point 500 seconds, braking distance is 79 point 3 meters on a dry surface and 105 meters on a wet surface.](../resources/Figure_02_05_11.jpg "The distance necessary to stop a car varies greatly, depending on road conditions and driver reaction time. Shown here are the braking distances for dry and wet pavement, as calculated in this example, for a car initially traveling at 30.0 m/s. Also shown are the total distances traveled from the point where the driver first sees a light turn red, assuming a 0.500 s reaction time. ")
{: #Figure11}

**Discussion**

The displacements found in this example seem reasonable for stopping a
fast-moving car. It should take longer to stop a car on wet rather than dry
pavement. It is interesting that reaction time adds significantly to the
displacements. But more important is the general approach to solving problems.
We identify the knowns and the quantities to be determined and then find an
appropriate equation. There is often more than one way to solve a problem. The
various parts of this example can in fact be solved by other methods, but the
solutions presented above are the shortest.

</div>

<div class="example" markdown="1">
<div class="title">
Calculating Time: A Car Merges into Traffic
</div>
Suppose a car merges into freeway traffic on a 200-m-long ramp.
If its initial velocity is 10.0 m/s and it accelerates at $$ 2.00 \mss $$,
how long does it take to travel the 200 m up the ramp?
(Such information might be useful to a traffic engineer.)

**Strategy**

Draw a sketch.

![A line segment with ends labeled x subs zero equals zero and x = two hundred. Above the line segment, the equation t equals question mark indicates that time is unknown. Three vectors, all pointing in the direction of x equals 200, represent the other knowns and unknowns. They are labeled v sub zero equals ten point zero meters per second, v equals question mark, and a equals two point zero zero meters per second squared.](../resources/Figure_02_05_12.jpg)
{: #Figure12}

We are asked to solve for the time $$ t $$. As before, we identify the known
quantities in order to choose a convenient physical relationship (that is, an
equation with one unknown, $$ t $$).

**Solution**

1\. Identify the knowns and what we want to solve for. We know that $$ v_{0}=10
\ms $$; $$ a=2.00 \mss $$; and $$ x=200 \m $$.

2\. We need to solve for $$ t $$. Choose the best equation. $$ x=x_{0}+v_
{0}t+\frac{1}{2} a t^{2} $$ works best because the only unknown in the equation
is the variable $$ t $$ for which we need to solve.

3\. We will need to rearrange the equation to solve for $$ t $$. In this case,
it will be easier to plug in the knowns first.

<div class="equation">
 $$ 200 \m =0 \m +\left(10.0 \ms \right)t+\frac{1}{2}\left(2.00 \mss \right){t}^{2} $$
</div>
4\. Simplify the equation. The units of meters (m) cancel because they are in each term.
We can get the units of seconds (s) to cancel by taking $$ t=t\s $$, where $$ t $$
is the magnitude of time and s is the unit. Doing so leaves

<div class="equation">
 $$ 200 =10 t+ t^{2}. $$
</div>
5\. Use the quadratic formula to solve for $$ t $$.
(a) Rearrange the equation to get 0 on one side of the equation.

<div class="equation">
 $$ t^{2}+10 t-200 =0 $$
</div>
This is a quadratic equation of the form

<div class="equation">
 $$ a t^{2} + b t +c=0, $$
</div>
where the constants are $$a=1.00$$, $$b=10.0$$,  and $$c=-200$$.

(b) Its solutions are given by the quadratic formula:

<div class="equation">
 $$t=\frac{-b \pm \sqrt{ b^{2}-4 a c} }{2a} .$$
</div>
This yields two solutions for $$ t $$, which are

<div class="equation">
 $$t=10.0 \text{ and } - 20.0 . $$
</div>
In this case, then, the time is $$ t=t $$ in seconds, or

<div class="equation">
 $$ t=10.0\s \text{ and }-20.0\s . $$
</div>
A negative value for time is unreasonable, since it would mean
that the event happened 20s before the motion began. We can discard that solution. Thus,

<div class="equation">
 $$ t=10.0\s . $$
</div>

**Discussion**

Whenever an equation contains an unknown squared, there will be two solutions.
In some problems both solutions are meaningful, but in others, such as the
above, only one solution is reasonable. The 10.0 s answer seems reasonable for a
typical freeway on-ramp.

</div>

With the basics of kinematics established, we can go on to many other
interesting examples and applications. In the process of developing kinematics,
we have also glimpsed a general approach to problem solving that produces both
correct answers and insights into physical
relationships. [Problem-Solving Basics](./ch2ProblemSolvingBasicsForOneDimensionalKinematics)
discusses problem-solving basics and outlines an approach that will help you
succeed in this invaluable task.

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment—Breaking News
</div>
We have been using SI units of meters per second squared to describe some
examples of acceleration or deceleration of cars, runners, and trains.
To achieve a better feel for these numbers, one can measure the braking
deceleration of a car doing a slow (and safe) stop.
Recall that, for average acceleration, $$ \overline{a}=\Delta v/\Delta t $$.
While traveling in a car, slowly apply the brakes as you come up to a stop
sign. Have a passenger note the initial speed in miles per hour and the time
taken (in seconds) to stop. From this, calculate the deceleration in miles per
hour per second. Convert this to meters per second squared and compare with
other decelerations mentioned in this chapter. Calculate the distance traveled
in braking.

</div>

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
A manned rocket accelerates at a rate of $$ 20 \mss $$
during launch. How long does it take the rocket to reach a velocity of 400 m/s?

</div>
<div class="solution" markdown="1">
To answer this, choose an equation that allows you to solve for time $$ t $$,
given only $$ a $$, $$ v_{0} $$, and $$ v $$.

<div class="equation">
 $$ v=v_{0}+a t $$
</div>
Rearrange to solve for $$ t $$.

<div class="equation">
 $$ t=\frac{v-v_{0}}{a}=\frac{400 \ms -0 \ms }{ 20 \mss }=20 \s $$
</div>
</div>
</div>

### Section Summary

* To simplify calculations we take acceleration to be constant, so that $$
  \overline{a}=a $$ at all times.
* We also take initial time to be zero.
* Initial position and velocity are given a subscript 0; final values have no
  subscript. Thus,
  <div class="equation">
  $$ \begin{array}{lll} 
  \Delta t&=& t\\ 
  \Delta x&=& x-x_{0}\\
  \Delta v&=& v-v_{0}
  \end{array} $$
  </div>

* The following kinematic equations for motion with constant $$ a $$ are useful:
  <div class="equation">
    $$ x=x_{0}+\overline{v}t $$
  </div>

  <div class="equation">
 $$ \overline{v}=\frac{ v_{0}+v}{2} $$
  </div>

  <div class="equation">
 $$ v=v_{0}+a t $$
  </div>

  <div class="equation">
 $$ x=x_{0}+v_{0}t+\frac{1}{2}a t^{2} $$
  </div>

  <div class="equation">
 $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right) $$
  </div>

* In vertical motion, $$ y $$ is substituted for $$ x $$.

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An Olympic-class sprinter starts a race with an acceleration of $$ 4.50 \mss $$.
(a) What is her speed 2.40 s later?
(b) Sketch a graph of her position vs.
time for this period.

</div>
<div class="solution" markdown="1">

**Strategy**

The sprinter starts from rest and accelerates at a constant rate. For part (a), we use the kinematic equation $$ v = v_0 + at $$ to find the velocity after 2.40 s. For part (b), we sketch a position-time graph, which should be parabolic for constant acceleration starting from rest.

**Solution**

**(a) Speed after 2.40 s:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 0 $$ (starts from rest)
   - Acceleration: $$ a = 4.50 \mss $$
   - Time: $$ t = 2.40 \s $$

2. Use the kinematic equation:
<div class="equation">
$$ v = v_0 + at $$
</div>

3. Substitute the known values:
<div class="equation">
$$ v = 0 + (4.50)(2.40) = 10.8 \ms $$
</div>

**(b) Position-time graph:**

The position as a function of time for constant acceleration starting from rest is given by:
<div class="equation">
$$ x = \frac{1}{2}at^2 = \frac{1}{2}(4.50)t^2 = 2.25t^2 $$
</div>

This is a parabolic function, as shown in the graph below. The position increases quadratically with time, and the slope of the graph (which represents velocity) increases linearly with time.

![Line graph of position in meters versus time in seconds. The line begins at the origin and is concave up, with its slope increasing over time.](../resources/Figure_02_05_13.jpg)
{: #Figure13}

**Discussion**

The sprinter reaches a speed of 10.8 m/s (about 38.9 km/h or 24.2 mph) in just 2.40 seconds with an acceleration of $$ 4.50 \mss $$, which is nearly half of gravitational acceleration. This is realistic for an Olympic-class athlete. The parabolic shape of the position-time graph is characteristic of constant acceleration - the curve gets steeper as time progresses because the velocity increases linearly. The slope at $$ t = 2.40 \s $$ corresponds to the final velocity of 10.8 m/s.

**Answer**

(a) The sprinter's speed 2.40 s later is 10.8 m/s.

(b) The position-time graph is parabolic, starting at the origin with increasing slope, as shown in Figure 13.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A well-thrown ball is caught in a well-padded mitt. If the deceleration of the ball is
$$ 2.10 \times 10^{4}\mss $$,
and 1.85 ms $$ \left(1 \text{ms}=10^{-3}\s \right) $$
elapses from the time the ball first touches the mitt until it stops, what was
the initial velocity of the ball?

</div>
<div class="solution" markdown="1">

**Strategy**

The ball decelerates from its initial velocity to rest (final velocity = 0) in a very short time. We use the kinematic equation $$ v = v_0 + at $$ to find the initial velocity. The deceleration (negative acceleration) and time are given.

**Solution**

1. Identify the known values:
   - Final velocity: $$ v = 0 $$ (ball stops)
   - Acceleration: $$ a = -2.10 \times 10^{4} \mss $$ (negative because it's decelerating)
   - Time: $$ t = 1.85 \times 10^{-3} \s $$ (1.85 ms)

2. Use the kinematic equation:
<div class="equation">
$$ v = v_0 + at $$
</div>

3. Solve for initial velocity $$ v_0 $$:
<div class="equation">
$$ 0 = v_0 + (-2.10 \times 10^{4})(1.85 \times 10^{-3}) $$
</div>

<div class="equation">
$$ v_0 = 2.10 \times 10^{4} \times 1.85 \times 10^{-3} $$
</div>

<div class="equation">
$$ v_0 = 38.85 \ms \approx 38.9 \ms $$
</div>

4. Converting to other units for context:
<div class="equation">
$$ v_0 = 38.9 \ms \times \frac{3600 \s}{1 \text{ hr}} \times \frac{1 \text{ km}}{1000 \m} \times \frac{1 \text{ mile}}{1.609 \text{ km}} \approx 87 \text{ mph} $$
</div>

**Discussion**

The initial velocity of 38.9 m/s (about 87 mph) is consistent with a well-thrown baseball. The enormous deceleration of $$ 2.10 \times 10^{4} \mss $$ (over 2,000 times gravitational acceleration) occurs because the ball stops in such a short time - only 1.85 milliseconds. Despite this huge deceleration, the well-padded mitt protects the catcher's hand by spreading the force over a larger area and slightly extending the stopping time. Without the padding, the contact time would be even shorter and the deceleration even greater, potentially causing injury. This problem illustrates why proper protective equipment is essential in sports.

**Answer**

The initial velocity of the ball was 38.9 m/s (approximately 87 miles per hour).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A bullet in a gun is accelerated from the firing chamber to the
end of the barrel at an average rate of $$ 6.20 \times 10^{5}\mss $$
for $$ 8.10 \times 10^{-4}\s $$.
What is its muzzle velocity (that is, its final velocity)?

</div>
<div class="solution" markdown="1">

**Strategy**

Use the kinematic equation relating final velocity, initial velocity, acceleration, and time. The bullet starts from rest in the firing chamber.

**Solution**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 0 $$ (starts from rest)
   - Acceleration: $$ a = 6.20 \times 10^5 \mss $$
   - Time: $$ t = 8.10 \times 10^{-4} \s $$

2. Apply the kinematic equation:
<div class="equation">
$$ v = v_0 + at = 0 + (6.20 \times 10^5 \mss)(8.10 \times 10^{-4} \s) $$
</div>

<div class="equation">
$$ v = 502 \ms $$
</div>

**Discussion**

This is about 1810 km/h or 1120 mph, which is supersonic (faster than the speed of sound, about 340 m/s). This is a typical muzzle velocity for a rifle bullet.

The bullet's muzzle velocity is $$ 502 \ms $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A light-rail commuter train accelerates at a rate of $$ 1.35 \mss $$.
How long does it take to reach its top speed of 80.0 km/h, starting from
rest?
(b) The same train ordinarily decelerates at a rate of $$ 1.65 \mss $$.
How long does it take to come to a stop from its top speed?
(c) In emergencies the train can decelerate more rapidly, coming to rest from 80.0 km/h in 8.30 s.
What is its emergency deceleration in $$ \mss $$
?

</div>
<div class="solution" markdown="1">

**Strategy**

This problem involves three different scenarios of acceleration and deceleration for a train. For parts (a) and (b), we know the initial and final velocities and the acceleration, so we can use $$ v = v_0 + at $$ to find time. For part (c), we know the velocities and time, so we can use the same equation to solve for acceleration. Remember to convert km/h to m/s first.

**Solution**

**(a) Time to reach top speed:**

1. Convert top speed to m/s:
<div class="equation">
$$ v = 80.0 \text{ km/h} = 80.0 \times \frac{1000 \m}{3600 \s} = 22.2 \ms $$
</div>

2. Identify the known values:
   - Initial velocity: $$ v_0 = 0 $$ (starting from rest)
   - Final velocity: $$ v = 22.2 \ms $$
   - Acceleration: $$ a = 1.35 \mss $$

3. Use the kinematic equation:
<div class="equation">
$$ v = v_0 + at $$
</div>

4. Solve for time:
<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{22.2 - 0}{1.35} = 16.4 \s \approx 16.5 \s $$
</div>

**(b) Time to come to a stop:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 22.2 \ms $$ (top speed)
   - Final velocity: $$ v = 0 $$ (comes to rest)
   - Deceleration: $$ a = -1.65 \mss $$ (negative for deceleration)

2. Use the same equation:
<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{0 - 22.2}{-1.65} = \frac{-22.2}{-1.65} = 13.5 \s $$
</div>

**(c) Emergency deceleration:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 22.2 \ms $$
   - Final velocity: $$ v = 0 $$
   - Time: $$ t = 8.30 \s $$

2. Solve for acceleration:
<div class="equation">
$$ a = \frac{v - v_0}{t} = \frac{0 - 22.2}{8.30} = -2.67 \mss \approx -2.68 \mss $$
</div>

The negative sign indicates deceleration.

**Discussion**

The train takes about 16.5 seconds to accelerate to its top speed and 13.5 seconds to decelerate normally - the deceleration is faster because the braking rate ($$ 1.65 \mss $$) is greater than the acceleration rate ($$ 1.35 \mss $$). In emergency situations, the train can decelerate even more rapidly at $$ 2.68 \mss $$, which is about 62% faster than normal braking. This emergency deceleration stops the train in only 8.30 seconds compared to 13.5 seconds for normal braking - significantly reducing stopping distance in critical situations. These accelerations are all relatively gentle (well under 1g), ensuring passenger comfort and safety.

**Answer**

(a) It takes 16.5 s to reach top speed from rest.

(b) It takes 13.5 s to come to a stop from top speed using normal deceleration.

(c) The emergency deceleration is $$ -2.68 \mss $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
While entering a freeway, a car accelerates from rest at a rate of $$ 2.40 \mss $$ for 12.0 s.
(a) Draw a sketch of the situation.
(b) List the knowns in this problem.
(c) How far does the car travel in those 12.0 s? To solve this part,
first identify the unknown, and then discuss how you chose the appropriate
equation to solve for it. After choosing the equation, show your steps in
solving for the unknown, check your units, and discuss whether the answer is
reasonable.
(d) What is the car's final velocity? Solve for this unknown in the
same manner as in part (c), showing all steps explicitly.

</div>
<div class="solution" markdown="1">
**Strategy**

This problem involves constant acceleration from rest. We need to use kinematic equations to find both displacement and final velocity. Since we're given acceleration and time, we can use the equations that relate these quantities to displacement and velocity.

**Solution**

**(a) Sketch:**

A car starts from rest (initial position $$x_0 = 0$$, initial velocity $$v_0 = 0$$) and accelerates in the positive direction with acceleration vector $$a = 2.40 \mss$$ for time $$t = 12.0 \s$$.

**(b) Knowns:**
- Initial velocity: $$ v_0 = 0 \ms $$ (starts from rest)
- Acceleration: $$ a = 2.40 \mss $$
- Time: $$ t = 12.0 \s $$
- Initial position: $$ x_0 = 0 \m $$ (taking starting point as origin)

**(c) Distance traveled:**

**Unknown:** Displacement $$ x - x_0 $$ or final position $$ x $$

**Choosing the equation:** We have $$ v_0 $$, $$ a $$, and $$ t $$, and we need to find $$ x $$. The most appropriate equation is:

<div class="equation">
$$ x = x_0 + v_0 t + \frac{1}{2}at^2 $$
</div>

This equation is ideal because it relates displacement to acceleration and time without requiring knowledge of final velocity.

**Solving:**

Since $$ x_0 = 0 $$ and $$ v_0 = 0 $$, the equation simplifies to:

<div class="equation">
$$ x = \frac{1}{2}at^2 $$
</div>

Substituting the known values:

<div class="equation">
$$ x = \frac{1}{2}(2.40 \mss)(12.0 \s)^2 $$
</div>

<div class="equation">
$$ x = \frac{1}{2}(2.40)(144) \m = (1.20)(144) \m = 173 \m $$
</div>

**Units check:** $$ \mss \times \s^2 = \m $$ ✓

**Reasonableness:** A distance of 173 meters (about 568 feet or 0.11 miles) seems reasonable for a car accelerating onto a freeway over 12 seconds. This is roughly the length of a typical freeway on-ramp.

**(d) Final velocity:**

**Unknown:** Final velocity $$ v $$

**Choosing the equation:** We have $$ v_0 $$, $$ a $$, and $$ t $$, and we need to find $$ v $$. The appropriate equation is:

<div class="equation">
$$ v = v_0 + at $$
</div>

This equation directly relates final velocity to initial velocity, acceleration, and time.

**Solving:**

Since $$ v_0 = 0 $$:

<div class="equation">
$$ v = at = (2.40 \mss)(12.0 \s) $$
</div>

<div class="equation">
$$ v = 28.8 \ms $$
</div>

**Units check:** $$ \mss \times \s = \ms $$ ✓

**Reasonableness:** Converting to more familiar units: $$ 28.8 \ms \times \frac{3.6 \text{ km/h}}{1 \ms} = 104 \text{ km/h} $$ or about 64 mph. This is a reasonable speed for merging onto a freeway.

**Discussion**

The results are physically reasonable. The car travels 173 m while accelerating to 28.8 m/s (about 104 km/h). We can verify our answers are consistent by using an alternative approach: using the equation $$ v^2 = v_0^2 + 2a(x - x_0) $$:

<div class="equation">
$$ v^2 = 0 + 2(2.40 \mss)(173 \m) = 830 \mmss $$
</div>

<div class="equation">
$$ v = \sqrt{830} \ms = 28.8 \ms $$ ✓
</div>

This confirms our answer. The acceleration of 2.40 m/s² (about 0.24g) is typical for a family car, and the final speed is appropriate for freeway traffic.

**Answer**

(c) The car travels **173 m** in 12.0 seconds.

(d) The car's final velocity is **28.8 m/s** (approximately 104 km/h or 64 mph).
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At the end of a race, a runner decelerates from a velocity of 9.00 m/s at a rate of $$ 2.00 \mss $$.
(a) How far does she travel in the next 5.00 s?
(b) What is her final velocity?
(c) Evaluate the result. Does it make sense?

</div>
<div class="solution" markdown="1">

**Strategy**

The runner decelerates at a constant rate. For part (a), we use the kinematic equation that relates displacement, initial velocity, time, and acceleration. For part (b), we use $$ v = v_0 + at $$ to find her velocity after 5.00 s. For part (c), we evaluate whether the results are physically realistic by checking when the runner would actually stop.

**Solution**

**(a) Distance traveled in 5.00 s:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 9.00 \ms $$
   - Acceleration: $$ a = -2.00 \mss $$ (negative for deceleration)
   - Time: $$ t = 5.00 \s $$

2. Use the kinematic equation:
<div class="equation">
$$ x = v_0 t + \frac{1}{2}at^2 $$
</div>

3. Substitute the known values:
<div class="equation">
$$ x = (9.00)(5.00) + \frac{1}{2}(-2.00)(5.00)^2 $$
</div>

<div class="equation">
$$ x = 45.0 + \frac{1}{2}(-2.00)(25.0) = 45.0 - 25.0 = 20.0 \m $$
</div>

**(b) Final velocity after 5.00 s:**

1. Use the kinematic equation:
<div class="equation">
$$ v = v_0 + at $$
</div>

2. Substitute the known values:
<div class="equation">
$$ v = 9.00 + (-2.00)(5.00) = 9.00 - 10.0 = -1.00 \ms $$
</div>

**(c) Evaluation of the result:**

The negative velocity in part (b) indicates a problem. Let's check when the runner actually stops:

<div class="equation">
$$ t_{\text{stop}} = \frac{v - v_0}{a} = \frac{0 - 9.00}{-2.00} = 4.50 \s $$
</div>

The runner stops after 4.50 s, not 5.00 s. At 5.00 s, the calculation gives a velocity of -1.00 m/s, which would mean running backwards!

**Discussion**

This problem illustrates an important limitation of kinematic equations: they calculate mathematical results without considering physical constraints. In reality, the runner cannot continue decelerating past the point where she stops. The runner decelerates for 4.50 s and comes to rest after traveling:

<div class="equation">
$$ x_{\text{actual}} = v_0 t_{\text{stop}} + \frac{1}{2}at_{\text{stop}}^2 = (9.00)(4.50) + \frac{1}{2}(-2.00)(4.50)^2 = 40.5 - 20.25 = 20.25 \m $$
</div>

After stopping at $$ t = 4.50 \s $$, she remains at rest. So while the equation predicts $$ x = 20.0 \m $$ and $$ v = -1.00 \ms $$, the physical answer is that she travels about 20.25 m and stops, remaining at rest thereafter. The negative velocity is unphysical in this context - a runner doesn't spontaneously start running backwards after stopping!

**Answer**

(a) According to the kinematic equation, the runner travels 20.0 m in 5.00 s, but this requires careful interpretation.

(b) The calculated final velocity is -1.00 m/s.

(c) This result does not make physical sense. The runner actually stops after 4.50 s, having traveled about 20.25 m. She cannot continue decelerating to achieve a negative velocity (running backwards). This demonstrates that kinematic equations must be applied with consideration of physical constraints.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application:**

Blood is accelerated from rest to 30.0 cm/s in a distance of 1.80 cm by the left
ventricle of the heart.
(a) Make a sketch of the situation.
(b) List the knowns in this problem.
(c) How long does the acceleration take? To solve this part, first identify the
unknown, and then discuss how you chose the appropriate equation to solve for
it. After choosing the equation, show your steps in solving for the unknown,
checking your units.
(d) Is the answer reasonable when compared with the time for a heartbeat?

</div>
<div class="solution" markdown="1">

**Strategy**

Blood is accelerated over a known distance from rest to a known final velocity. To find the time, we can use the equation relating average velocity to displacement and time, since average velocity can be calculated from initial and final velocities.

**Solution**

**(a) Sketch:**

Blood starts at rest ($$v_0 = 0$$) in the left ventricle and is accelerated in the positive direction to a final velocity $$v = 30.0$$ cm/s over a distance of $$x - x_0 = 1.80$$ cm.

**(b) Knowns:**
- Initial velocity: $$ v_0 = 0 $$ (blood starts from rest)
- Final velocity: $$ v = 30.0 \text{ cm/s} = 0.300 \ms $$
- Displacement: $$ x - x_0 = 1.80 \text{ cm} = 0.0180 \m $$
- Initial position: $$ x_0 = 0 \m $$ (taking starting point as origin)

**(c) Time of acceleration:**

**Unknown:** Time $$ t $$

**Choosing the equation:** We know $$ v_0 $$, $$ v $$, and $$ x - x_0 $$, and we need to find $$ t $$. We can use the equation for displacement with average velocity:

<div class="equation">
$$ x = x_0 + \overline{v}t $$
</div>

where the average velocity for constant acceleration is:

<div class="equation">
$$ \overline{v} = \frac{v_0 + v}{2} $$
</div>

This approach is best because we can calculate average velocity directly from the known initial and final velocities, then solve for time. Alternatively, we could use $$ v^2 = v_0^2 + 2a(x - x_0) $$ to find acceleration first, then use $$ v = v_0 + at $$, but that requires an extra step.

**Solving:**

First, calculate the average velocity:

<div class="equation">
$$ \overline{v} = \frac{v_0 + v}{2} = \frac{0 + 0.300 \ms}{2} = 0.150 \ms $$
</div>

Now use the displacement equation and solve for time:

<div class="equation">
$$ x - x_0 = \overline{v}t $$
</div>

<div class="equation">
$$ t = \frac{x - x_0}{\overline{v}} = \frac{0.0180 \m}{0.150 \ms} = 0.120 \s $$
</div>

**Units check:** $$ \frac{\m}{\ms} = \s $$ ✓

**(d) Reasonableness:**

The acceleration takes 0.120 s, which is 120 milliseconds. A typical resting heart rate is about 60-100 beats per minute, which corresponds to a heartbeat duration of 0.6 to 1.0 seconds. The systolic phase (when the ventricle contracts and ejects blood) typically lasts about 0.3 seconds.

Our answer of 0.120 s is quite reasonable—it's a significant fraction of the systolic phase but short enough to allow for the complete cardiac cycle. The heart must accelerate blood very quickly to pump it efficiently through the circulatory system.

**Discussion**

We can verify this answer by calculating the acceleration and checking consistency. Using $$ v^2 = v_0^2 + 2a(x - x_0) $$:

<div class="equation">
$$ a = \frac{v^2 - v_0^2}{2(x - x_0)} = \frac{(0.300 \ms)^2 - 0}{2(0.0180 \m)} = \frac{0.0900 \mmss}{0.0360 \m} = 2.50 \mss $$
</div>

Now checking with $$ v = v_0 + at $$:

<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{0.300 \ms}{2.50 \mss} = 0.120 \s $$ ✓
</div>

This confirms our answer. The acceleration of 2.50 m/s² (about 0.25g) may seem small, but remember that blood has significant mass and the heart must pump it continuously throughout a lifetime—truly a remarkable organ!

**Answer**

(c) The acceleration takes **0.120 s** (120 milliseconds).

(d) Yes, this is reasonable. It represents a significant portion of the systolic phase of the heartbeat, which typically lasts about 0.3 seconds.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In a slap shot, a hockey player accelerates the puck from a velocity of
8.00 m/s to 40.0 m/s in the same direction. If this shot takes
$$ 3.33 \times 10^{-2}\s $$, calculate the distance over which the
puck accelerates.

</div>
<div class="solution" markdown="1">

**Strategy**

The puck accelerates from one velocity to another in a known time. We need to find the distance over which this acceleration occurs. We can use the equation relating distance, initial velocity, final velocity, and time, which is $$ x = \frac{v_0 + v}{2}t $$ (average velocity times time), or we can first find acceleration and then use another equation.

**Solution**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 8.00 \ms $$
   - Final velocity: $$ v = 40.0 \ms $$
   - Time: $$ t = 3.33 \times 10^{-2} \s $$

2. Use the equation relating displacement to velocities and time:
<div class="equation">
$$ x = \frac{v_0 + v}{2}t $$
</div>

This equation works because the average velocity during constant acceleration is simply the arithmetic mean of initial and final velocities.

3. Substitute the known values:
<div class="equation">
$$ x = \frac{8.00 + 40.0}{2} \times (3.33 \times 10^{-2}) $$
</div>

<div class="equation">
$$ x = \frac{48.0}{2} \times (3.33 \times 10^{-2}) = 24.0 \times 0.0333 $$
</div>

<div class="equation">
$$ x = 0.799 \m $$
</div>

**Discussion**

The puck accelerates over a distance of about 80 cm (roughly 31 inches), which is reasonable for a hockey slap shot where the stick blade maintains contact with the puck during the entire shooting motion. The puck's velocity increases from 8.00 m/s to 40.0 m/s - a fivefold increase in speed! This represents an acceleration of:

<div class="equation">
$$ a = \frac{v - v_0}{t} = \frac{40.0 - 8.00}{0.0333} = 961 \mss $$
</div>

This is about 98 times gravitational acceleration (98g), which demonstrates the enormous forces involved in a professional slap shot. The final speed of 40.0 m/s (144 km/h or 89 mph) is typical for a powerful slap shot in hockey.

**Answer**

The puck accelerates over a distance of 0.799 m (approximately 80 cm or 31 inches).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A powerful motorcycle can accelerate from rest to 26.8 m/s (100 km/h) in only 3.90 s.
(a) What is its average acceleration?
(b) How far does it travel in that time?

</div>
<div class="solution" markdown="1">

**Strategy**

Use the definition of average acceleration for part (a), then use a kinematic equation with the calculated acceleration to find distance in part (b).

**Solution**

**(a) Average acceleration:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 0 $$ (starts from rest)
   - Final velocity: $$ v = 26.8 \ms $$
   - Time: $$ t = 3.90 \s $$

2. Calculate average acceleration:
<div class="equation">
$$ a = \frac{v - v_0}{t} = \frac{26.8 \ms - 0}{3.90 \s} = 6.87 \mss $$
</div>

**(b) Distance traveled:**

Use the kinematic equation:
<div class="equation">
$$ x = x_0 + v_0 t + \frac{1}{2}at^2 = 0 + 0 + \frac{1}{2}(6.87 \mss)(3.90 \s)^2 $$
</div>

<div class="equation">
$$ x = \frac{1}{2}(6.87)(15.21) \m = 52.3 \m $$
</div>

**Discussion**

The acceleration of 6.87 m/s² is about 0.7g, which is quite impressive for a motorcycle. The distance of about 52 meters to reach 100 km/h is consistent with high-performance motorcycle specifications.

(a) The average acceleration is $$ 6.87 \mss $$.

(b) The motorcycle travels $$ 52.3 \m $$ in that time.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Freight trains can produce only relatively small accelerations and decelerations.
(a) What is the final velocity of a freight train that accelerates at
a rate of $$ 0.0500 \mss $$ for 8.00 min, starting with an
initial velocity of 4.00 m/s?
(b) If the train can slow down at a rate of $$ 0.550 \mss $$,
how long will it take to come to a stop from this velocity?
(c) How far will it travel in each case?

</div>
<div class="solution" markdown="1">

**Strategy**

This problem involves two phases: acceleration and deceleration of a freight train. For part (a), we use $$ v = v_0 + at $$ to find the final velocity after acceleration. For part (b), we use the same equation to find the time to decelerate from this velocity to rest. For part (c), we calculate distances using appropriate kinematic equations. Remember to convert 8.00 minutes to seconds.

**Solution**

**(a) Final velocity after acceleration:**

1. Convert time to seconds:
<div class="equation">
$$ t = 8.00 \text{ min} = 8.00 \times 60 = 480 \s $$
</div>

2. Identify the known values:
   - Initial velocity: $$ v_0 = 4.00 \ms $$
   - Acceleration: $$ a = 0.0500 \mss $$
   - Time: $$ t = 480 \s $$

3. Use the kinematic equation:
<div class="equation">
$$ v = v_0 + at $$
</div>

4. Substitute the known values:
<div class="equation">
$$ v = 4.00 + (0.0500)(480) = 4.00 + 24.0 = 28.0 \ms $$
</div>

**(b) Time to decelerate to rest:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 28.0 \ms $$ (from part a)
   - Final velocity: $$ v = 0 $$ (comes to rest)
   - Deceleration: $$ a = -0.550 \mss $$ (negative for deceleration)

2. Solve for time:
<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{0 - 28.0}{-0.550} = \frac{-28.0}{-0.550} = 50.9 \s $$
</div>

**(c) Distances traveled:**

**Distance during acceleration (8.00 min = 480 s):**

<div class="equation">
$$ x_{\text{accel}} = v_0 t + \frac{1}{2}at^2 $$
</div>

<div class="equation">
$$ x_{\text{accel}} = (4.00)(480) + \frac{1}{2}(0.0500)(480)^2 $$
</div>

<div class="equation">
$$ x_{\text{accel}} = 1920 + \frac{1}{2}(0.0500)(230400) = 1920 + 5760 = 7680 \m = 7.68 \text{ km} $$
</div>

**Distance during deceleration (50.9 s):**

<div class="equation">
$$ x_{\text{decel}} = v_0 t + \frac{1}{2}at^2 $$
</div>

<div class="equation">
$$ x_{\text{decel}} = (28.0)(50.9) + \frac{1}{2}(-0.550)(50.9)^2 $$
</div>

<div class="equation">
$$ x_{\text{decel}} = 1425.2 + \frac{1}{2}(-0.550)(2590.81) = 1425.2 - 712.5 = 712.7 \m \approx 713 \m $$
</div>

**Discussion**

The freight train's small acceleration ($$ 0.0500 \mss $$, only about 0.5% of gravitational acceleration) is typical for heavy trains with massive inertia. Despite this tiny acceleration, over 8 minutes the train increases its velocity from 4.00 m/s to 28.0 m/s (about 14 to 101 km/h), traveling an impressive 7.68 km! The deceleration rate ($$ 0.550 \mss $$) is 11 times larger than the acceleration rate, so the train stops much more quickly - in less than one minute compared to 8 minutes of acceleration. However, even with this stronger braking, the train still travels 713 m (over 700 meters, or nearly half a mile) while stopping. This demonstrates why freight trains need such long distances to stop safely.

**Answer**

(a) The final velocity after 8.00 minutes of acceleration is 28.0 m/s.

(b) It takes 50.9 s (about 51 seconds) to come to a stop from this velocity.

(c) The train travels 7.68 km during acceleration and 713 m during deceleration.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A fireworks shell is accelerated from rest to a velocity of 65.0 m/s over a distance of 0.250 m.
(a) How long did the acceleration last?
(b) Calculate the acceleration.
</div>
<div class="solution" markdown="1">

**Strategy**

A fireworks shell is accelerated from rest to a known final velocity over a known distance. For part (a), we need to find time, and for part (b), we need to find acceleration. We can use kinematic equations that relate these quantities.

**Solution**

**Knowns:**
- Initial velocity: $$ v_0 = 0 $$ (starts from rest)
- Final velocity: $$ v = 65.0 \ms $$
- Displacement: $$ x - x_0 = 0.250 \m $$

**(a) Time of acceleration:**

**Unknown:** Time $$ t $$

**Choosing the equation:** We know $$ v_0 $$, $$ v $$, and displacement. We can use the average velocity approach:

<div class="equation">
$$ x - x_0 = \overline{v}t $$
</div>

where

<div class="equation">
$$ \overline{v} = \frac{v_0 + v}{2} = \frac{0 + 65.0 \ms}{2} = 32.5 \ms $$
</div>

**Solving:**

<div class="equation">
$$ t = \frac{x - x_0}{\overline{v}} = \frac{0.250 \m}{32.5 \ms} = 7.69 \times 10^{-3} \s = 7.69 \text{ ms} $$
</div>

**(b) Acceleration:**

**Unknown:** Acceleration $$ a $$

**Choosing the equation:** We know $$ v_0 $$, $$ v $$, and $$ x - x_0 $$. The best equation is:

<div class="equation">
$$ v^2 = v_0^2 + 2a(x - x_0) $$
</div>

This equation relates all known quantities to acceleration without requiring time.

**Solving:**

Rearrange to solve for $$ a $$:

<div class="equation">
$$ a = \frac{v^2 - v_0^2}{2(x - x_0)} $$
</div>

Substitute the known values:

<div class="equation">
$$ a = \frac{(65.0 \ms)^2 - 0}{2(0.250 \m)} = \frac{4225 \mmss}{0.500 \m} = 8.45 \times 10^{3} \mss $$
</div>

**Units check:** For time: $$ \frac{\m}{\ms} = \s $$ ✓; For acceleration: $$ \frac{\mmss}{\m} = \mss $$ ✓

**Discussion**

We can verify our answers are consistent using $$ v = v_0 + at $$:

<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{65.0 \ms}{8.45 \times 10^{3} \mss} = 7.69 \times 10^{-3} \s $$ ✓
</div>

This confirms both answers are correct and consistent.

The acceleration is extremely large: $$ 8.45 \times 10^{3} \mss $$ is about 862 times the acceleration due to gravity (862g)! This makes sense for a fireworks shell—the explosive charge must accelerate the shell very rapidly over the short length of the launch tube. The time of 7.69 ms (less than one-hundredth of a second) is also consistent with the explosive nature of fireworks launches.

For comparison, even the most powerful dragsters only achieve accelerations of about 3-4g during launch. The fireworks shell experiences forces hundreds of times greater, which is why they must be constructed very robustly to withstand the launch.

**Answer**

(a) The acceleration lasted **7.69 ms** (or $$ 7.69 \times 10^{-3} \s $$).

(b) The acceleration is **$$ 8.45 \times 10^{3} \mss $$** (approximately 862g).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A swan on a lake gets airborne by flapping its wings and running on top of the water.
(a) If the swan must reach a velocity of 6.00 m/s to take off and it accelerates
from rest at an average rate of $$ 0.350 \mss $$, how far will it
travel before becoming airborne?
(b) How long does this take?
</div>
<div class="solution" markdown="1">
(a) $$ 51.4\m $$

(b) $$ 17.0 \s $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application:**

A woodpecker's brain is specially protected from large decelerations by
tendon-like attachments inside the skull. While pecking on a tree, the
woodpecker's head comes to a stop from an initial velocity of 0.600 m/s in a
distance of only 2.00 mm.
(a) Find the acceleration in $$ \mss $$ and in multiples of $$ g\left(g=9.80\mss
\right) $$.
(b) Calculate the stopping time.
(c) The tendons cradling the brain stretch, making its stopping distance 4.50
mm ( greater than the head and, hence, less deceleration of the brain). What is
the brain's deceleration, expressed in multiples of $$ g $$ ?

</div>
<div class="solution" markdown="1">

**Strategy**

The woodpecker's head decelerates from a known initial velocity to rest over a known distance. We can use the kinematic equation $$ v^2 = v_0^2 + 2a(x - x_0) $$ to find the deceleration, then use $$ v = v_0 + at $$ to find the stopping time. For part (c), we repeat the acceleration calculation with a different stopping distance.

**Solution**

**Knowns:**
- Initial velocity: $$ v_0 = 0.600 \ms $$
- Final velocity: $$ v = 0 $$ (comes to a stop)
- Head stopping distance: $$ x_{\text{head}} - x_0 = 2.00 \text{ mm} = 2.00 \times 10^{-3} \m $$
- Brain stopping distance: $$ x_{\text{brain}} - x_0 = 4.50 \text{ mm} = 4.50 \times 10^{-3} \m $$
- Acceleration due to gravity: $$ g = 9.80 \mss $$

**(a) Head's deceleration:**

**Unknown:** Acceleration $$ a_{\text{head}} $$

**Choosing the equation:** We know $$ v_0 $$, $$ v $$, and the stopping distance. Use:

<div class="equation">
$$ v^2 = v_0^2 + 2a(x - x_0) $$
</div>

**Solving:**

Rearrange to solve for $$ a $$:

<div class="equation">
$$ a_{\text{head}} = \frac{v^2 - v_0^2}{2(x_{\text{head}} - x_0)} $$
</div>

Substitute the known values:

<div class="equation">
$$ a_{\text{head}} = \frac{0 - (0.600 \ms)^2}{2(2.00 \times 10^{-3} \m)} = \frac{-0.360 \mmss}{4.00 \times 10^{-3} \m} = -90.0 \mss $$
</div>

The negative sign indicates deceleration (acceleration opposite to the direction of motion).

Express in multiples of $$ g $$:

<div class="equation">
$$ \frac{a_{\text{head}}}{g} = \frac{-90.0 \mss}{9.80 \mss} = -9.18 $$
</div>

So the head experiences a deceleration of $$ 90.0 \mss $$ or $$ 9.18g $$.

**(b) Stopping time:**

**Unknown:** Time $$ t $$

**Choosing the equation:** Use $$ v = v_0 + at $$:

<div class="equation">
$$ t = \frac{v - v_0}{a_{\text{head}}} = \frac{0 - 0.600 \ms}{-90.0 \mss} = 6.67 \times 10^{-3} \s = 6.67 \text{ ms} $$
</div>

**(c) Brain's deceleration:**

**Unknown:** Acceleration $$ a_{\text{brain}} $$

The brain has a longer stopping distance due to the stretching tendons:

<div class="equation">
$$ a_{\text{brain}} = \frac{v^2 - v_0^2}{2(x_{\text{brain}} - x_0)} = \frac{0 - (0.600 \ms)^2}{2(4.50 \times 10^{-3} \m)} $$
</div>

<div class="equation">
$$ a_{\text{brain}} = \frac{-0.360 \mmss}{9.00 \times 10^{-3} \m} = -40.0 \mss $$
</div>

Express in multiples of $$ g $$:

<div class="equation">
$$ \frac{a_{\text{brain}}}{g} = \frac{-40.0 \mss}{9.80 \mss} = -4.08 $$
</div>

The brain experiences a deceleration of $$ 40.0 \mss $$ or $$ 4.08g $$.

**Units check:** $$ \frac{\mmss}{\m} = \mss $$ ✓; $$ \frac{\ms}{\mss} = \s $$ ✓

**Discussion**

These results reveal the remarkable biomechanical engineering of the woodpecker's anatomy. The head decelerates at 9.18g—nearly 10 times the acceleration due to gravity! This would cause severe brain injury in most animals.

However, the tendon-like attachments allow the brain to decelerate over a distance 2.25 times greater than the head (4.50 mm vs. 2.00 mm). This reduces the brain's deceleration to 4.08g—less than half the head's deceleration. While still substantial, this is within a survivable range, especially with the woodpecker's other adaptations (compact brain, minimal cerebrospinal fluid, specialized skull structure).

The stopping time of 6.67 ms is extremely brief—less than one-hundredth of a second. Woodpeckers can peck 15-20 times per second, so this rapid deceleration is essential for their feeding and territorial behaviors.

For comparison, race car drivers experience decelerations up to about 5-6g during crashes (with safety equipment), and fighter pilots can experience 9g during high-performance maneuvers. The woodpecker's head exceeds this regularly, highlighting the extraordinary evolutionary adaptation.

**Answer**

(a) The head's deceleration is **$$ -90.0 \mss $$** or **9.18g** (9.18 times the acceleration due to gravity).

(b) The stopping time is **6.67 ms** (or $$ 6.67 \times 10^{-3} \s $$).

(c) The brain's deceleration is **4.08g** (4.08 times the acceleration due to gravity).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An unwary football player collides with a padded goalpost while running at a velocity of 7.50 m/s and comes to
a full stop after compressing the padding and his body 0.350 m.
(a) What is his deceleration?
(b) How long does the collision last?

</div>
<div class="solution" markdown="1">

**Strategy**

The football player decelerates from a known velocity to rest over a known distance. For part (a), we use the kinematic equation $$ v^2 = v_0^2 + 2a(x - x_0) $$ to find the deceleration. For part (b), we use $$ v = v_0 + at $$ to find the collision time. The padding helps extend the stopping distance, reducing the deceleration and impact force.

**Solution**

**(a) Deceleration:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 7.50 \ms $$
   - Final velocity: $$ v = 0 $$ (comes to a full stop)
   - Stopping distance: $$ x - x_0 = 0.350 \m $$

2. Use the kinematic equation:
<div class="equation">
$$ v^2 = v_0^2 + 2a(x - x_0) $$
</div>

3. Solve for acceleration:
<div class="equation">
$$ a = \frac{v^2 - v_0^2}{2(x - x_0)} $$
</div>

4. Substitute the known values:
<div class="equation">
$$ a = \frac{0 - (7.50)^2}{2(0.350)} = \frac{-56.25}{0.700} = -80.4 \mss $$
</div>

The negative sign indicates deceleration.

**(b) Collision duration:**

1. Use the kinematic equation:
<div class="equation">
$$ v = v_0 + at $$
</div>

2. Solve for time:
<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{0 - 7.50}{-80.4} = \frac{-7.50}{-80.4} = 0.0933 \s = 9.33 \times 10^{-2} \s $$
</div>

**Discussion**

The player experiences a deceleration of $$ 80.4 \mss $$, which is:
<div class="equation">
$$ \frac{80.4}{9.80} = 8.2g $$
</div>

This is about 8.2 times gravitational acceleration - a very significant force! However, this is survivable thanks to the padding on the goalpost and the player's own protective equipment. The padding allows the player to decelerate over 0.350 m (about 14 inches) rather than stopping nearly instantly against a rigid surface. Without padding, the stopping distance might be only a few centimeters, resulting in decelerations of 50-100g or more - enough to cause serious injury.

The collision lasts about 93 milliseconds (less than one-tenth of a second), which is too fast for the player to react but slow enough (thanks to the padding) to reduce peak forces. This demonstrates the importance of proper safety equipment and padding in contact sports.

**Answer**

(a) The player's deceleration is $$ -80.4 \mss $$ (about 8.2 times gravitational acceleration).

(b) The collision lasts $$ 9.33 \times 10^{-2} \s $$ (approximately 93 milliseconds).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In World War II, there were several reported cases of airmen who jumped from their
flaming airplanes with no
parachute to escape certain death. Some fell about 20 000 feet (6000 m), and some of them
survived, with few life-threatening injuries. For these lucky pilots, the tree branches
and snow drifts on the ground allowed their deceleration to be relatively small.
If we assume that a pilot's speed upon impact was 123 mph (54 m/s), then what was
his deceleration? Assume that the trees and snow stopped him over a distance of 3.0 m.

</div>
<div class="solution" markdown="1">

**Strategy**

The pilot decelerates from a known impact velocity to rest over a known stopping distance. We can use the kinematic equation $$ v^2 = v_0^2 + 2a(x - x_0) $$ to find the deceleration. This equation is ideal because it relates velocities, acceleration, and distance without requiring time information.

**Solution**

**Knowns:**
- Initial velocity (impact speed): $$ v_0 = 54 \ms $$ (or 123 mph)
- Final velocity: $$ v = 0 $$ (comes to rest)
- Stopping distance: $$ x - x_0 = 3.0 \m $$

**Unknown:** Acceleration $$ a $$

**Choosing the equation:**

Use the kinematic equation:

<div class="equation">
$$ v^2 = v_0^2 + 2a(x - x_0) $$
</div>

**Solving:**

Rearrange to solve for $$ a $$:

<div class="equation">
$$ a = \frac{v^2 - v_0^2}{2(x - x_0)} $$
</div>

Substitute the known values:

<div class="equation">
$$ a = \frac{0 - (54 \ms)^2}{2(3.0 \m)} = \frac{-2916 \mmss}{6.0 \m} = -486 \mss = -4.9 \times 10^{2} \mss $$
</div>

The negative sign indicates deceleration (acceleration opposite to the direction of motion).

Express in multiples of $$ g $$ (where $$ g = 9.80 \mss $$):

<div class="equation">
$$ \frac{a}{g} = \frac{-486 \mss}{9.80 \mss} = -49.6 \approx -50 $$
</div>

The pilot experienced a deceleration of approximately 50g.

**Units check:** $$ \frac{\mmss}{\m} = \mss $$ ✓

**Discussion**

A deceleration of 486 m/s² (about 50g) is extraordinary and would normally be fatal. For comparison:
- Modern fighter pilots can withstand up to about 9g with special suits
- Race car drivers in severe crashes experience 20-40g (often with serious injuries)
- The human body can survive very brief exposures to high g-forces if properly oriented

The survival of these airmen is remarkable and can be attributed to several factors:

1. **Gradual deceleration**: The 3.0 m stopping distance, provided by tree branches and snow, distributed the impact force over a much longer distance than hitting hard ground (which might provide only 0.1-0.2 m of deceleration).

2. **Body orientation**: If the pilot landed feet-first or in a horizontal position, the forces would be distributed more favorably than head-first impact.

3. **Sequential impacts**: Tree branches would have provided multiple smaller impacts rather than one catastrophic stop, further distributing the deceleration.

4. **Duration**: We can calculate the stopping time using $$ v = v_0 + at $$:
<div class="equation">
$$ t = \frac{v - v_0}{a} = \frac{0 - 54 \ms}{-486 \mss} = 0.11 \s $$
</div>

The deceleration lasted about 0.11 seconds—long enough to be survivable, though still extremely dangerous.

Without the trees and snow, stopping over just 0.1 m would produce a deceleration of about 14,600 m/s² (1490g)—absolutely unsurvivable. The 3.0 m stopping distance reduced the deceleration by a factor of 30, making survival possible, though still requiring extraordinary luck.

**Answer**

The pilot's deceleration was **$$ -4.9 \times 10^{2} \mss $$** (or approximately 486 m/s²), which is about **50 times the acceleration due to gravity (50g)**.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Consider a grey squirrel falling out of a tree to the ground.
(a) If we ignore air resistance in this case (only for the sake of this problem),
determine a squirrel’s velocity just before hitting the ground, assuming it fell from a height of 3.0 m.
(b) If the squirrel stops in a distance of 2.0 cm through bending its limbs,
compare its deceleration with that of the airman in the previous problem.

</div>
<div class="solution" markdown="1">

**Strategy**

This problem has two parts. For part (a), the squirrel falls freely under gravity from a known height - we use free fall equations to find the velocity just before impact. For part (b), the squirrel decelerates from this velocity to rest over a very short distance (2.0 cm) by bending its limbs - we use kinematic equations to find this deceleration and compare it to the airman's deceleration from the previous problem.

**Solution**

**(a) Velocity just before hitting the ground:**

1. Identify the known values for free fall:
   - Initial velocity: $$ v_0 = 0 $$ (starts from rest)
   - Acceleration: $$ a = g = 9.80 \mss $$ (downward)
   - Distance fallen: $$ y = 3.0 \m $$

2. Use the kinematic equation:
<div class="equation">
$$ v^2 = v_0^2 + 2gy $$
</div>

3. Substitute the known values:
<div class="equation">
$$ v^2 = 0 + 2(9.80)(3.0) = 58.8 \mmss $$
</div>

<div class="equation">
$$ v = \sqrt{58.8} = 7.67 \ms \approx 7.7 \ms $$
</div>

**(b) Deceleration upon landing:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 7.7 \ms $$ (from part a)
   - Final velocity: $$ v = 0 $$ (comes to rest)
   - Stopping distance: $$ x - x_0 = 2.0 \text{ cm} = 0.020 \m $$

2. Use the kinematic equation:
<div class="equation">
$$ v^2 = v_0^2 + 2a(x - x_0) $$
</div>

3. Solve for acceleration:
<div class="equation">
$$ a = \frac{v^2 - v_0^2}{2(x - x_0)} = \frac{0 - (7.7)^2}{2(0.020)} = \frac{-59.29}{0.040} = -1482 \mss \approx -1.5 \times 10^{3} \mss $$
</div>

4. Compare to the airman's deceleration from the previous problem ($$ -486 \mss $$):
<div class="equation">
$$ \frac{1482}{486} \approx 3.0 $$
</div>

The squirrel's deceleration is about 3 times greater than the airman's!

5. Express in multiples of g:
<div class="equation">
$$ \frac{1482}{9.80} \approx 151g $$
</div>

**Discussion**

This problem reveals a surprising result: the squirrel experiences about 151g of deceleration - three times more than the airman falling from 6000 m! How can this be? The key is the stopping distance. The squirrel, though falling from only 3.0 m and hitting at "only" 7.7 m/s (compared to the airman's 54 m/s), stops in just 2.0 cm - 150 times shorter than the airman's 3.0 m stopping distance.

Small animals like squirrels can survive these enormous decelerations because of several factors:
1. **Square-cube law**: Smaller animals have proportionally stronger bones and tissues relative to their weight
2. **Flexible skeletal structure**: The squirrel bends its limbs to maximize the stopping distance for its size
3. **Lower terminal velocity**: Even without our assumption, a squirrel reaches a much lower terminal velocity in air

This is why squirrels can fall from great heights and walk away unharmed - they're naturally built to handle extreme decelerations relative to their size.

**Answer**

(a) The squirrel's velocity just before hitting the ground is 7.7 m/s.

(b) The squirrel's deceleration is $$ -1.5 \times 10^{3} \mss $$ (about 151g), which is approximately 3 times the deceleration experienced by the airman in the previous problem who was falling from thousands of meters!

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An express train passes through a station. It enters with an initial velocity
of 22.0 m/s and decelerates at a rate of $$ 0.150 \mss $$
as it goes through. The station is 210 m long.
(a) How long did the nose of the train stay in the station?
(b) How fast is it going when the nose leaves the station?
(c) If the train is 130 m long, when does the end of the train leave
the station?
(d) What is the velocity of the end of the train as it leaves?

</div>
<div class="solution" markdown="1">

**Strategy**

The train decelerates at a constant rate as it passes through the station. We need to track the motion of both the nose and the end of the train. For parts (a) and (b), we analyze the nose traveling 210 m through the station. For parts (c) and (d), we analyze the end of the train, which must travel 210 m + 130 m = 340 m (the station length plus the train length) before it clears the station.

**Solution**

**Knowns:**
- Initial velocity: $$ v_0 = 22.0 \ms $$
- Acceleration: $$ a = -0.150 \mss $$ (negative because it's decelerating)
- Station length: $$ L_{\text{station}} = 210 \m $$
- Train length: $$ L_{\text{train}} = 130 \m $$

**(a) Time for nose to traverse the station:**

**Unknown:** Time $$ t_{\text{nose}} $$

The nose travels a distance of 210 m. We know $$ v_0 $$, $$ a $$, and $$ x - x_0 $$, and need to find $$ t $$.

**Choosing the equation:** Use $$ x = x_0 + v_0 t + \frac{1}{2}at^2 $$

Taking $$ x_0 = 0 $$:

<div class="equation">
$$ 210 = 22.0 t + \frac{1}{2}(-0.150)t^2 $$
</div>

<div class="equation">
$$ 210 = 22.0 t - 0.0750 t^2 $$
</div>

Rearrange to standard quadratic form:

<div class="equation">
$$ 0.0750 t^2 - 22.0 t + 210 = 0 $$
</div>

Using the quadratic formula with $$ a = 0.0750 $$, $$ b = -22.0 $$, $$ c = 210 $$:

<div class="equation">
$$ t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \frac{22.0 \pm \sqrt{(-22.0)^2 - 4(0.0750)(210)}}{2(0.0750)} $$
</div>

<div class="equation">
$$ t = \frac{22.0 \pm \sqrt{484 - 63.0}}{0.150} = \frac{22.0 \pm \sqrt{421}}{0.150} = \frac{22.0 \pm 20.5}{0.150} $$
</div>

This gives two solutions:
- $$ t_1 = \frac{22.0 + 20.5}{0.150} = \frac{42.5}{0.150} = 283 \s $$
- $$ t_2 = \frac{22.0 - 20.5}{0.150} = \frac{1.5}{0.150} = 10.0 \s $$

The physically meaningful solution is $$ t_{\text{nose}} = 10.0 \s $$ (the larger time would correspond to the train reversing direction, which is not realistic).

**(b) Velocity when nose leaves the station:**

**Unknown:** Final velocity $$ v_{\text{nose}} $$

Use $$ v = v_0 + at $$:

<div class="equation">
$$ v_{\text{nose}} = 22.0 \ms + (-0.150 \mss)(10.0 \s) = 22.0 - 1.50 = 20.5 \ms $$
</div>

We can verify using $$ v^2 = v_0^2 + 2a(x - x_0) $$:

<div class="equation">
$$ v_{\text{nose}}^2 = (22.0)^2 + 2(-0.150)(210) = 484 - 63.0 = 421 \mmss $$
</div>

<div class="equation">
$$ v_{\text{nose}} = \sqrt{421} = 20.5 \ms $$ ✓
</div>

**(c) Time for end of train to leave the station:**

**Unknown:** Time $$ t_{\text{end}} $$

The end of the train must travel the station length plus the train length: $$ 210 + 130 = 340 \m $$

Using $$ x = x_0 + v_0 t + \frac{1}{2}at^2 $$:

<div class="equation">
$$ 340 = 22.0 t - 0.0750 t^2 $$
</div>

<div class="equation">
$$ 0.0750 t^2 - 22.0 t + 340 = 0 $$
</div>

Using the quadratic formula:

<div class="equation">
$$ t = \frac{22.0 \pm \sqrt{484 - 4(0.0750)(340)}}{0.150} = \frac{22.0 \pm \sqrt{484 - 102}}{0.150} $$
</div>

<div class="equation">
$$ t = \frac{22.0 \pm \sqrt{382}}{0.150} = \frac{22.0 \pm 19.5}{0.150} $$
</div>

This gives:
- $$ t_1 = \frac{22.0 + 19.5}{0.150} = 277 \s $$ (unphysical)
- $$ t_2 = \frac{22.0 - 19.5}{0.150} = \frac{2.5}{0.150} = 16.7 \s $$

So $$ t_{\text{end}} = 16.7 \s $$.

**(d) Velocity of end of train as it leaves:**

**Unknown:** Final velocity $$ v_{\text{end}} $$

Use $$ v = v_0 + at $$:

<div class="equation">
$$ v_{\text{end}} = 22.0 \ms + (-0.150 \mss)(16.7 \s) = 22.0 - 2.51 = 19.5 \ms $$
</div>

**Units check:** All dimensional analysis confirms proper units throughout.

**Discussion**

The results make physical sense. The nose of the train takes 10.0 s to traverse the 210 m station, slowing from 22.0 m/s to 20.5 m/s. The end of the train, entering 130 m behind the nose, takes an additional 6.7 s to clear the station (total of 16.7 s from when the nose entered), and is moving at 19.5 m/s when it exits.

The deceleration of 0.150 m/s² is quite gentle—only about 1.5% of gravitational acceleration. This is typical for passenger trains, ensuring passenger comfort. Over the 16.7 seconds that the train occupies the station, it slows by only 2.5 m/s (from 22.0 to 19.5 m/s), which passengers would barely notice.

The average velocity during the passage can be calculated as $$ \overline{v} = \frac{v_0 + v}{2} = \frac{22.0 + 19.5}{2} = 20.75 \ms $$, and the total distance traveled is $$ 340 \m $$, giving an average time of $$ t = \frac{340}{20.75} = 16.4 \s $$, which is consistent with our calculated 16.7 s (the small difference is due to rounding).

**Answer**

(a) The nose of the train stays in the station for **10.0 s**.

(b) The nose is traveling at **20.5 m/s** when it leaves the station.

(c) The end of the train leaves the station at **16.7 s** after the nose entered.

(d) The end of the train is traveling at **19.5 m/s** as it leaves the station.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Dragsters can actually reach a top speed of 145 m/s in only 4.45 s—considerably
less time than given in [Example 3](#example3) and
[Example 4](#example4).
(a) Calculate the average acceleration for such a dragster.
(b) Find the final velocity of this dragster starting from rest and accelerating at the rate found in (a) for 402 m (a quarter mile) without using any information on time.
(c) Why is the final velocity greater than that used to find the average acceleration? *Hint*: Consider whether the assumption of constant acceleration is valid for a dragster. If not, discuss whether the acceleration would be greater at the beginning or end of the run and what effect that would have on the final velocity.

</div>
<div class="solution" markdown="1">

**Strategy**

For part (a), we calculate average acceleration using the change in velocity and time. For part (b), we use this acceleration with the distance to find final velocity, assuming constant acceleration. For part (c), we discuss why constant acceleration is not a valid assumption for dragsters and how this affects our calculated values.

**Solution**

**(a) Average acceleration:**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 0 $$ (starts from rest)
   - Final velocity: $$ v = 145 \ms $$
   - Time: $$ t = 4.45 \s $$

2. Calculate average acceleration:
<div class="equation">
$$ a = \frac{v - v_0}{t} = \frac{145 - 0}{4.45} = 32.6 \mss $$
</div>

**(b) Final velocity over a quarter mile (402 m):**

1. Identify the known values:
   - Initial velocity: $$ v_0 = 0 $$
   - Acceleration: $$ a = 32.6 \mss $$ (from part a)
   - Distance: $$ x = 402 \m $$

2. Use the kinematic equation (without time):
<div class="equation">
$$ v^2 = v_0^2 + 2ax $$
</div>

3. Substitute the known values:
<div class="equation">
$$ v^2 = 0 + 2(32.6)(402) = 26,210 \mmss $$
</div>

<div class="equation">
$$ v = \sqrt{26,210} = 162 \ms $$
</div>

**(c) Why is the final velocity greater?**

The calculated final velocity of 162 m/s is greater than the actual top speed of 145 m/s used to find the average acceleration. This discrepancy reveals that the assumption of constant acceleration is not valid for a dragster.

A dragster's acceleration is not constant because:
1. **Gear changes**: The dragster shifts through multiple gears during the run, and acceleration is greatest in first gear
2. **Decreasing force-to-resistance ratio**: As velocity increases, air resistance increases dramatically (proportional to $$ v^2 $$)
3. **Tire grip limitations**: Maximum traction force varies with speed and tire heating
4. **Engine power curve**: The engine delivers different power outputs at different RPMs

The acceleration would be greatest at the beginning of the run (possibly 40-50 m/s² in first gear) and would decrease significantly toward the end (perhaps only 10-15 m/s² in high gear at top speed). Therefore, the dragster is not accelerating at 32.6 m/s² during the last few meters—it's accelerating substantially less. This means the actual final velocity is less than the 162 m/s we calculated assuming constant acceleration.

**Discussion**

This problem illustrates an important principle: kinematic equations assume constant acceleration. When applied to situations with varying acceleration, they give average values that may not match actual instantaneous values. The 32.6 m/s² represents the average acceleration over the entire 4.45 s run, not the acceleration at any particular moment.

For comparison, 32.6 m/s² is about 3.3 times gravitational acceleration (3.3g), which is similar to what fighter pilots experience. Top fuel dragsters can actually achieve peak accelerations exceeding 4-5g at launch, far beyond what most people ever experience!

**Answer**

(a) The average acceleration is 32.6 m/s².

(b) If the dragster maintained this constant acceleration over 402 m, the final velocity would be 162 m/s.

(c) This calculated velocity (162 m/s) is greater than the actual top speed (145 m/s) because the assumption of constant acceleration is not valid for a dragster. Dragsters change gears and experience increasing air resistance, so acceleration is greatest at the beginning and decreases throughout the run. The actual acceleration during the final meters is substantially less than 32.6 m/s², resulting in a final velocity less than 162 m/s.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A bicycle racer sprints at the end of a race to clinch a victory.
The racer has an initial velocity of 11.5 m/s and accelerates at
the rate of $$ 0.500 \mss $$ for 7.00 s.
(a) What is his final velocity?
(b) The racer continues at this
velocity to the finish line. If he was 300 m from the finish line when he
started to accelerate, how much time did he save?
(c) One other racer was 5.00 m
ahead when the winner started to accelerate, but he was unable to accelerate,
and traveled at 11.8 m/s until the finish line. How far ahead of him (in meters
and in seconds) did the winner finish?
</div>
<div class="solution" markdown="1">

**Strategy**

This problem involves multiple phases of motion. The winner accelerates for 7.00 s, then continues at constant velocity. We need to find the final velocity after acceleration, calculate the time saved compared to non-accelerated motion, and compare the winner's finish with the other racer who maintains constant velocity.

**Solution**

**Knowns:**
- Winner's initial velocity: $$ v_0 = 11.5 \ms $$
- Winner's acceleration: $$ a = 0.500 \mss $$
- Acceleration time: $$ t_{\text{accel}} = 7.00 \s $$
- Distance to finish line: $$ d_{\text{total}} = 300 \m $$
- Other racer's velocity: $$ v_{\text{other}} = 11.8 \ms $$
- Other racer's initial advantage: $$ 5.00 \m $$ ahead

**(a) Final velocity after acceleration:**

**Unknown:** Final velocity $$ v $$

Use $$ v = v_0 + at $$:

<div class="equation">
$$ v = 11.5 \ms + (0.500 \mss)(7.00 \s) = 11.5 + 3.50 = 15.0 \ms $$
</div>

**(b) Time saved by accelerating:**

**Unknown:** Time saved

First, calculate distance covered during acceleration using $$ x = x_0 + v_0 t + \frac{1}{2}at^2 $$:

<div class="equation">
$$ x_{\text{accel}} = (11.5 \ms)(7.00 \s) + \frac{1}{2}(0.500 \mss)(7.00 \s)^2 $$
</div>

<div class="equation">
$$ x_{\text{accel}} = 80.5 \m + \frac{1}{2}(0.500)(49.0) \m = 80.5 + 12.25 = 92.75 \m $$
</div>

Remaining distance to finish line:

<div class="equation">
$$ x_{\text{remaining}} = 300 - 92.75 = 207.25 \m $$
</div>

Time to cover remaining distance at constant velocity of 15.0 m/s:

<div class="equation">
$$ t_{\text{remaining}} = \frac{207.25 \m}{15.0 \ms} = 13.8 \s $$
</div>

**Total time with acceleration:**

<div class="equation">
$$ t_{\text{total, accel}} = 7.00 + 13.8 = 20.8 \s $$
</div>

**Time if no acceleration** (maintaining 11.5 m/s for entire 300 m):

<div class="equation">
$$ t_{\text{no accel}} = \frac{300 \m}{11.5 \ms} = 26.1 \s $$
</div>

**Time saved:**

<div class="equation">
$$ \Delta t = 26.1 - 20.8 = 5.3 \s $$
</div>

**(c) Comparison with other racer:**

The other racer starts 5.00 m ahead (at position -5.00 m if finish is at 300 m), so must travel $$ 300 + 5.00 = 305 \m $$ to reach the finish.

**Other racer's time:**

<div class="equation">
$$ t_{\text{other}} = \frac{305 \m}{11.8 \ms} = 25.8 \s $$
</div>

**Winner finishes in:** $$ 20.8 \s $$

**Time difference:**

<div class="equation">
$$ \Delta t = 25.8 - 20.8 = 5.0 \s $$
</div>

**Distance ahead:** When the winner finishes (at $$ t = 20.8 \s $$), the other racer has traveled:

<div class="equation">
$$ x_{\text{other}} = (11.8 \ms)(20.8 \s) = 245 \m $$
</div>

The other racer still needs to travel $$ 305 - 245 = 60 \m $$ to reach the finish line.

So the winner finishes **60 m ahead** and **5.0 s ahead**.

**Units check:** All dimensional analysis confirms proper units throughout.

**Discussion**

The acceleration phase was crucial to victory. By accelerating from 11.5 m/s to 15.0 m/s over 7 seconds, the winner increased his speed by 30%. This saved 5.3 seconds compared to maintaining the initial pace—a significant advantage in competitive cycling.

The comparison with the other racer is particularly interesting. Despite starting 5.00 m behind, the winner's acceleration allowed him to finish 60 m ahead—a complete reversal of position! The other racer's slight initial speed advantage (11.8 m/s vs. 11.5 m/s) was completely overwhelmed by the winner's acceleration.

In real bicycle racing, this represents a classic sprint finish strategy. The ability to accelerate at the end of a race—when other competitors are fatigued—is a decisive competitive advantage. An acceleration of 0.500 m/s² sustained for 7 seconds is impressive for a cyclist, especially near the end of a race.

The winner's average velocity during acceleration was $$ \overline{v} = \frac{11.5 + 15.0}{2} = 13.25 \ms $$, which we can verify: $$ (13.25)(7.00) = 92.75 \m $$ ✓

**Answer**

(a) The racer's final velocity is **15.0 m/s**.

(b) By accelerating, the racer saved **5.3 s** compared to maintaining constant velocity.

(c) The winner finished **60 m ahead** and **5.0 s ahead** of the other racer.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In 1967, New Zealander Burt Munro set the world record for an Indian motorcycle,
on the Bonneville Salt Flats in Utah, with a maximum speed of 183.58 mi/h.
The one-way course was 5.00 mi long. Acceleration rates are often described by
the time it takes to reach 60.0 mi/h from rest. If this time was 4.00 s, and
Burt accelerated at this rate until he reached his maximum speed, how long
did it take Burt to complete the course?
</div>

<div class="solution" markdown="1">
104 s
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A world record was set for the men’s 100-m dash in the 2008 Olympic Games in Beijing by Usain Bolt of Jamaica. Bolt “coasted” across the finish line with a time of 9.69 s. If we assume that Bolt accelerated for 3.00 s to reach his maximum speed, and maintained that speed for the rest of the race, calculate his maximum speed and his acceleration.
(b) During the same Olympics, Bolt also set the world record in the 200-m dash with a time of 19.30 s. Using the same assumptions as for the 100-m dash, what was his maximum speed for this race?

</div>
<div class="solution" markdown="1">
(a) $$ v=12.2 \ms $$; $$ a=4.07 \mss $$
(b) $$ v=11.2 \ms $$
</div>
</div>
