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
relationships. [Problem-Solving Basics](../contents/ch2ProblemSolvingBasicsForOneDimensionalKinematics.md)
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
(a) $$ 10.8 \ms $$

(b)

![Line graph of position in meters versus time in seconds. The line begins at the origin and is concave up, with its slope increasing over time.](../resources/Figure_02_05_13.jpg)
{: #Figure13}

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
38.9 m/s (about 87 miles per hour)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A bullet in a gun is accelerated from the firing chamber to the
end of the barrel at an average rate of $$ 6.20 \times 10^{5}\mss $$
for $$ 8.10 \times 10^{-4}\s $$.
What is its muzzle velocity (that is, its final velocity)?

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
(a) $$ 16.5 \s $$

(b) $$ 13.5 \s $$

(c) $$ -2.68 \mss $$
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
(d) What is the car’s final velocity? Solve for this unknown in the
same manner as in part (c), showing all steps explicitly.

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
(a) $$ 20.0 \m $$

(b) $$ -1.00 \ms $$

(c) This result does not really make sense. If the runner starts at 9.00 m/s and
decelerates at $$ 2.00 \mss $$, then she will have stopped after 4.50 s. If she
continues to decelerate, she will be running backwards.

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
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In a slap shot, a hockey player accelerates the puck from a velocity of
8.00 m/s to 40.0 m/s in the same direction. If this shot takes
$$ 3.33 \times 10^{-2}\s $$, calculate the distance over which the
puck accelerates.

</div>
<div class="solution" markdown="1">
 $$ 0.799 \m $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A powerful motorcycle can accelerate from rest to 26.8 m/s (100 km/h) in only 3.90 s.
(a) What is its average acceleration?
(b) How far does it travel in that time?

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
(a) $$ 28.0 \ms $$

(b) $$ 50.9 \s $$

(c) 7.68 km to accelerate and 713 m to decelerate

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A fireworks shell is accelerated from rest to a velocity of 65.0 m/s over a distance of 0.250 m.
(a) How long did the acceleration last?
(b) Calculate the acceleration.
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

A woodpecker’s brain is specially protected from large decelerations by
tendon-like attachments inside the skull. While pecking on a tree, the
woodpecker’s head comes to a stop from an initial velocity of 0.600 m/s in a
distance of only 2.00 mm.
(a) Find the acceleration in $$ \mss $$ and in multiples of $$ g\left(g=9.80\mss
\right) $$.
(b) Calculate the stopping time.
(c) The tendons cradling the brain stretch, making its stopping distance 4.50
mm ( greater than the head and, hence, less deceleration of the brain). What is
the brain’s deceleration, expressed in multiples of $$ g $$ ?

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
(a) $$ -80.4\mss $$

(b) $$ 9.33 \times 10^{-2}\s $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In World War II, there were several reported cases of airmen who jumped from their
flaming airplanes with no
parachute to escape certain death. Some fell about 20 000 feet (6000 m), and some of them
survived, with few life-threatening injuries. For these lucky pilots, the tree branches
and snow drifts on the ground allowed their deceleration to be relatively small.
If we assume that a pilot’s speed upon impact was 123 mph (54 m/s), then what was
his deceleration? Assume that the trees and snow stopped him over a distance of 3.0 m.

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
(a) $$ 7.7 \ms $$

(b) $$ -15 \times 10^{2}\mss $$. This is about 3 times the deceleration of the
pilots, who were falling from thousands of meters high!

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
(a) $$ 32.6 \mss $$

(b) $$ 162 \ms $$

(c) $$ v>v_{\text{max}} $$, because the assumption of constant acceleration is
not valid for a dragster. A dragster changes gears, and would have a greater
acceleration in first gear than second gear than third gear, etc. The
acceleration would be greatest at the beginning, so it would not be accelerating
at $$ 32.6 \mss $$ during the last few meters, but substantially less, and the
final velocity would be less than 162 m/s.
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
