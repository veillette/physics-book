---
title: "Projectile Motion"
layout: page
---


<div class="abstract" markdown="1">
* Identify and explain the properties of a projectile, such as acceleration due to gravity, range, maximum height, and trajectory.
* Determine the location and velocity of a projectile at different points in its trajectory.
* Apply the principle of independence of motion to solve projectile motion problems.

</div>

**Projectile motion**{: class="term" #import-auto-id1560216} is the
**motion**{: class="term" #import-auto-id1846113} of an object thrown or
projected into the air, subject to only the acceleration of gravity. The
object is called a **projectile**{: class="term" #import-auto-id1809247},
and its path is called its
**trajectory**{: class="term" #import-auto-id1397020}. The motion of
falling objects, as covered
in [Problem-Solving Basics for One-Dimensional Kinematics](../contents/ch2ProblemSolvingBasicsForOneDimensionalKinematics.md), is
a simple one-dimensional type of projectile motion in which there is no
horizontal movement. In this section, we consider two-dimensional projectile
motion, such as that of a football or other object for which
**air resistance**{: class="term" #import-auto-id1230666}
**is negligible**.

The most important fact to remember here is that **motions along perpendicular
axes are independent** and thus can be analyzed separately. This fact was
discussed in [Kinematics in Two Dimensions: An Introduction](../contents/ch3KinematicsInTwoDimensionsAnIntroduction.md),
where vertical and horizontal motions were seen to be independent. The key to
analyzing two-dimensional projectile motion is to break it into two motions, one
along the horizontal axis and the other along the vertical. (This choice of axes
is the most sensible, because acceleration due to gravity is vertical—thus,
there will be no acceleration along the horizontal axis when air resistance is
negligible.) As is customary, we call the horizontal axis the **x**-axis and the
vertical axis the **y**-axis. [[Figure]](#import-auto-id2242290) illustrates the
notation for displacement, where $$ \vb{s} $$ is defined to be the total
displacement and $$ \vb{x} $$ and $$ \vb{y} $$ are its components along
the horizontal and vertical axes, respectively. The magnitudes of these vectors
are $$\mag{s}$$, $$\mag{x}$$, and $$\mag{y}$$.
(Note that in the last section we used the notation
$$ \vb{A} $$ to represent a vector with components $$ \vb{A}_{x} $$
and $$ \vb{A}_{y} $$. If we continued this format, we would call
displacement $$ \vb{s} $$ with components $$ \vb{s}_{x} $$ and $$
\vb{s}_{y} $$. However, to simplify the notation, we will simply represent
the component vectors as $$ s_x $$ and $$ s_y $$.)

Of course, to describe motion we must deal with velocity and acceleration, as
well as with displacement. We must find their components along the **x**- and
**y**-axes, too. We will assume all forces except gravity (such as air resistance
and friction, for example) are negligible. The components of acceleration are
then very simple: $$ a_{y}=-g=-9.80 \mss $$. (Note that this
definition assumes that the upwards direction is defined as the positive
direction. If you arrange the coordinate system instead such that the downwards
direction is positive, then acceleration due to gravity takes a positive value.)
Because gravity is vertical, $$ a_{x}=0 $$. Both accelerations are constant, so
the kinematic equations can be used.

<div class="note" data-label="">
<div class="title">
Review of Kinematic Equations (constant \( a \) )
</div>
<div class="equation" id="eip-891">
 $$ x=x_{0}+\overline{v}t $$
</div>
<div class="equation" id="eip-557">
 $$ \overline{v}=\frac{ v_{0}+v}{2} $$
</div>
<div class="equation" id="eip-405">
 $$ v=v_{0}+a t $$
</div>
<div class="equation" id="eip-556">
 $$ x=x_{0}+v_{0}t+\frac{1}{2}a t^{2} $$
</div>
<div class="equation" id="eip-389">
 $$ v^{2}=v_{0}^{2}+2a\left(x-x_{0}\right). $$
</div>
</div>

![A soccer player is kicking a soccer ball. The ball travels in a projectile
motion and reaches a point whose vertical distance is y and horizontal
distance is x. The displacement between the kicking point and the final
point is s. The angle made by this displacement vector with x axis is theta.](../resources/Figure_03_04_01.jpg "The total displacement \( \vb{s} \)  of a
soccer ball at a point along its path. The vector \( \vb{s} \)  has components
\( x \)  and \( y \)  along the horizontal and vertical axes. Its magnitude
\( x \)  and \( y \)  along the horizontal and vertical axes. Its magnitude
is \( \mag{s} \) , and it makes an angle \( \theta \)  with the horizontal.")
{: #import-auto-id2242290}

Given these assumptions, the following steps are then used to analyze projectile
motion:

***Step 1.*** *Resolve or break the motion into horizontal and vertical
components along the x- and y-axes.* These axes are perpendicular, so $$ A_
{x}=A\cos{\theta} $$ and $$ A_{y}=A\sin{\theta} $$ are used. The magnitude of
the components of displacement $$ \vb{s} $$ along these axes are $$ x $$ and
$$ y $$. The magnitudes of the components of the velocity $$ \vb{v} $$ are
$$ v_{x}=v\cos{\theta} $$ and $$ v_{y}=v\sin{\theta}$$, where $$ v $$ is the
magnitude of the velocity and $$ \theta $$ is its direction, as shown
in [[Figure]](#import-auto-id1815222). Initial values are denoted with a
subscript 0, as usual.

***Step 2.*** *Treat the motion as two independent one-dimensional motions, one
horizontal and the other vertical.* The kinematic equations for horizontal and
vertical motion take the following forms:

<div class="equation" id="eip-338">
 $$ \text{Horizontal Motion}\left(a_{x}=0\right) $$
</div>

<div class="equation" id="eip-362">
 $$ x=x_{0}+v_{x}t $$
</div>

<div class="equation" id="eip-627">
 $$ v_{x}=v_{0x}=v_{x}=\text{velocity is a constant.} $$
</div>

<div class="equation" id="eip-293">
 $$ \text{Vertical Motion}\left(\text{assuming positive is up}a_{y}=-g=-9.80\mss \right) $$
</div>

<div class="equation" id="eip-131">
 $$ y=y_{0}+\frac{1}{2}\left(v_{0y}+v_{y}\right)t $$
</div>

<div class="equation" id="eip-305">
 $$ v_{y}= v_{0y}- g t $$
</div>

<div class="equation" id="eip-542">
 $$ y=y_{0}+v_{0y}t-\frac{1}{2} g t^{2} $$
</div>

<div class="equation" id="eip-243">
 $$ v_{y}^{2}= v_{0y}^{2}-2g \left( y-y_{0} \right) . $$
</div>

***Step 3.*** *Solve for the unknowns in the two separate motions—one
horizontal and one vertical.* Note that the only common variable between the
motions is time $$ t $$. The problem solving procedures here are the same as for
one-dimensional **kinematics**{: class="term"} and are illustrated in the
solved examples below.

***Step 4.*** *Recombine the two motions to find the total displacement* $$ \vb{s} $$ *and velocity* $$ \vb{v} $$. Because the *x*- and *y*-motions
  are perpendicular, we determine these vectors by using the techniques outlined in
the [Vector Addition and Subtraction: Analytical Methods](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md) and
employing $$ A=\sqrt{ A_x^2+ A_y^2} $$ and $$ \theta ={\tan}^{-1}\left(
\frac{A_y}{A_x}\right) $$ in the following form, where $$ \theta $$ is the
direction of the displacement $$ \vb{s} $$ and $$\theta_{v} $$ is the
direction of the velocity $$ \vb{v} $$.

**Total displacement and velocity**

<div class="equation" id="eip-743">
 $$ s=\sqrt{ x^{2}+{y}^{2}} $$
</div>

<div class="equation" id="eip-373">
 $$ \theta ={\tan}^{-1}\left(\frac{y}{x} \right) $$
</div>

<div class="equation" id="eip-679">
 $$ v=\sqrt{ v_{x}^{2}+v_{y}^{2}} $$
</div>

<div class="equation" id="eip-264">
 $$\theta_{v}={\tan}^{-1}\left( \frac{v_{y}}{v_{x}}\right). $$
</div>

![In part a the figure shows projectile motion of a ball with initial velocity of v zero at an angle of theta zero with the horizontal x axis. The horizontal component v x and the vertical component v y at various positions of ball in the projectile path is shown. In part b only the horizontal velocity component v sub x is shown whose magnitude is constant at various positions in the path. In part c only vertical velocity component v sub y is shown. The vertical velocity component v sub y is upwards till it reaches the maximum point and then its direction changes to downwards. In part d resultant v of horizontal velocity component v sub x and downward vertical velocity component v sub y is found which makes an angle theta with the horizontal x axis. The direction of resultant velocity v is towards south east.](../resources/Figure_03_04_02.jpg "(a) We analyze two-dimensional projectile motion by breaking it into two independent one-dimensional motions along the vertical and horizontal axes.
(b) The horizontal motion is simple, because \( a_x=0 \) and \( v_x \)  is thus constant.
(c) The velocity in the vertical direction begins to decrease as the object rises; at its highest point, the vertical velocity is zero. As the object falls towards the Earth again, the vertical velocity increases again in magnitude but points in the opposite direction to the initial vertical velocity. (d) The x - and y -motions are recombined to give the total velocity at any given point on the trajectory.")
{: #import-auto-id1815222 height="600"}

<div class="example" markdown="1">
<div class="title">
A Fireworks Projectile Explodes High and Away
</div>
During a fireworks display, a shell is shot into the air with an initial speed of
70.0 m/s at an angle of $$ 75.0^\circ $$
above the horizontal, as illustrated in [[Figure]](#import-auto-id934168). The
fuse is timed to ignite the shell just as it reaches its highest point above the
ground.
(a) Calculate the height at which the shell explodes.
(b) How much time passed between the launch of the shell and the explosion?
(c) What is the horizontal displacement of the shell when it explodes?

**Strategy**

Because air resistance is negligible for the unexploded shell, the analysis
method outlined above can be used. The motion can be broken into horizontal and
vertical motions in which $$ a_{x}=0 $$ and $$ a_{y}=-g $$. We can then define
$$ x_{0} $$ and $$ y_{0} $$ to be zero and solve for the desired quantities.

**Solution for (a)**

By “height” we mean the altitude or vertical position $$ y $$ above the starting
point. The highest point in any trajectory, called the apex, is reached when $$
v_{y}=0 $$. Since we know the initial and final velocities as well as the
initial position, we use the following equation to find $$ y $$:

<div class="equation" id="eip-734">
 $$ v_{y}^{2}=v_{0y}^{2}-2g\left(y-y_{0}\right). $$
</div>
![The x y graph shows the trajectory of fireworks shell. The initial velocity of the shell v zero is at angle theta zero equal to seventy five degrees with the horizontal x axis. The fuse is set to explode the shell at the highest point of the trajectory which is at a height h equal to two hundred thirty three meters and at a horizontal distance x equal to one hundred twenty five meters from the origin.](../resources/Figure_03_04_03a.jpg "The trajectory of a fireworks shell. The fuse is set to explode the shell at the highest point in its trajectory, which is found to be at a height of 233 m and 125 m away horizontally."){: #import-auto-id934168 height="250"}

Because $$ y_{0} $$ and $$ v_{y} $$ are both zero, the equation simplifies to

<div class="equation" id="eip-42">
 $$ 0=v_{0y}^{2}-2\text{gy.} $$
</div>
Solving for $$ y $$ gives

<div class="equation" id="eip-256">
 $$ y=\frac{ v_{0y}^{2}}{2g}. $$
</div>
Now we must find $$ v_{0y} $$, the component of the initial velocity in the *y*-direction. It is given by $$
v_{0y}=v_{0} \sin{\theta} $$, where $$ v_{0y} $$ is the initial velocity of
70.0 m/s, and $$ \theta_{0}=75.0^\circ $$ is the initial angle. Thus,

<div class="equation" id="eip-677">
 $$ v_{0y}=v_{0}\sin{\theta_{0}}=
\left(70.0 \ms \right)\left(\sin{75^\circ }\right)
=67.6 \ms . $$
</div>
and $$ y $$ is

<div class="equation" id="eip-512">
 $$ y=\frac{ \left(67.6 \ms \right)^{2}}{2\left(9.80 \mss \right)}, $$
</div>
so that

<div class="equation" id="eip-310">
 $$ y=233 \m . $$
</div>

**Discussion for (a)**

Note that because up is positive, the initial velocity is positive, as is the
maximum height, but the acceleration due to gravity is negative. Note also that
the maximum height depends only on the vertical component of the initial
velocity, so that any projectile with a 67.6 m/s initial vertical component of
velocity will reach a maximum height of 233 m (neglecting air resistance). The
numbers in this example are reasonable for large fireworks displays, the shells
of which do reach such heights before exploding. In practice, air resistance is
not completely negligible, and so the initial velocity would have to be somewhat
larger than that given to reach the same height.

**Solution for (b)**

As in many physics problems, there is more than one way to solve for the time to
the highest point. In this case, the easiest method is to use $$ y=y_
{0}+\frac{1}{2}\left(v_{0y}+v_{y}\right)t $$. Because $$ y_{0} $$ is zero, this
equation reduces to simply

<div class="equation" id="eip-383">
 $$ y=\frac{1}{2}\left(v_{0y}+v_{y}\right)t. $$
</div>
Note that the final vertical velocity, $$ v_{y} $$, at the highest point is zero. Thus,

<div class="equation" id="eip-50">
 $$ \begin{array}{lll}
t& =& \frac{2y}{\left(v_{0y}+v_{y}\right)}=\frac{2\left(233 \m \right)}{\left(67.6 \ms \right)}\\
 & =& 6.90 \s .
\end{array} $$
</div>

**Discussion for (b)**

This time is also reasonable for large fireworks. When you are able to see the
launch of fireworks, you will notice several seconds pass before the shell
explodes. (Another way of finding the time is by using $$ y=y_{0}+v_
{0y}t-\frac{1}{2}g t^{2} $$, and solving the quadratic equation for $$ t $$.)

**Solution for (c)**

Because air resistance is negligible, $$ a_{x}=0 $$ and the horizontal velocity
is constant, as discussed above. The horizontal displacement is horizontal
velocity multiplied by time as given by $$ x=x_{0}+v_{x}t $$, where $$ x_{0} $$
is equal to zero:

<div class="equation" id="eip-675">
 $$ x=v_{x}t, $$
</div>
where $$ v_{x} $$ is the **x**-component of the velocity, which is given by $$ v_{x}=v_
{0}\cos{\theta_{0}}$$. Now,

<div class="equation" id="eip-884">
 $$ v_{x}=v_{0}\cos{\theta_{0}}=\left(70.0 \ms \right)\left(\cos {75.0^\circ }\right)=18.1 m/s. $$
</div>
The time $$ t $$ for both motions is the same, and so $$ x $$ is

<div class="equation" id="eip-685">
 $$ x=\left(18.1 \ms \right)\left(6.90 \s \right)=125 \m . $$
</div>

**Discussion for (c)**

The horizontal motion is a constant velocity in the absence of air resistance.
The horizontal displacement found here could be useful in keeping the fireworks
fragments from falling on spectators. Once the shell explodes, air resistance
has a major effect, and many fragments will land directly below.

</div>

In solving part (a) of the preceding example, the expression we found for $$ y
$$ is valid for any projectile motion where air resistance is negligible. Call
the maximum height $$ y=h $$; then,

<div class="equation" id="eip-803">
 $$ h=\frac{ v_{0y}^{2}}{2g}. $$
</div>

This equation defines the **maximum height of a projectile** and depends only on
the vertical component of the initial velocity.

<div class="note" data-label="" markdown="1">
<div class="title">
Defining a Coordinate System
</div>
It is important to set up a coordinate system when analyzing projectile motion.
One part of defining the coordinate system is to define an origin for the $$ x $$
and $$ y $$ positions. Often, it is convenient to choose the initial position of
the object as the origin such that $$ x_{0}=0 $$ and $$ y_{0}=0 $$. It is also
important to define the positive and negative directions in the $$ x $$ and $$ y
$$ directions. Typically, we define the positive vertical direction as upwards,
and the positive horizontal direction is usually the direction of the object’s
motion. When this is the case, the vertical acceleration, $$ g $$, takes a
negative value (since it is directed downwards towards the Earth). However, it
is occasionally useful to define the coordinates differently. For example, if
you are analyzing the motion of a ball thrown downwards from the top of a cliff,
it may make sense to define the positive direction downwards since the motion of
the ball is solely in the downwards direction. If this is the case, $$ g $$
takes a positive value.

</div>

<div class="example" markdown="1">
<div class="title">
Calculating Projectile Motion: Hot Rock Projectile
</div>
Kilauea in Hawaii is the world’s most continuously active volcano. Very active volcanoes characteristically eject
red-hot rocks and lava rather than smoke and ash.
Suppose a large rock is ejected from the volcano with a speed of 25.0 m/s and
at an angle $$ 35.0^\circ $$
above the horizontal, as shown in [[Figure]](#import-auto-id1817519). The rock
strikes the side of the volcano at an altitude 20.0 m lower than its starting
point.
(a) Calculate the time it takes the rock to follow this path.
(b) What are the magnitude and direction of the rock’s velocity at impact?

![The trajectory of a rock ejected from a volcano is shown. The initial velocity of rock v zero is equal to twenty five meters per second and it makes an angle of thirty five degrees with the horizontal x axis. The figure shows rock falling down a height of twenty meters below the volcano level. The velocity at this point is v which makes an angle of theta with horizontal x axis. The direction of v is south east.](../resources/Figure_03_04_04a.jpg "The trajectory of a rock ejected from the Kilauea volcano.")
{: #import-auto-id1817519}

**Strategy**

Again, resolving this two-dimensional motion into two independent
one-dimensional motions will allow us to solve for the desired quantities. The
time a projectile is in the air is governed by its vertical motion alone. We
will solve for $$ t $$ first. While the rock is rising and falling vertically,
the horizontal motion continues at a constant velocity. This example asks for
the final velocity. Thus, the vertical and horizontal results will be recombined
to obtain $$ v $$ and $$\theta_{v} $$ at the final time $$ t $$ determined in
the first part of the example.

**Solution for (a)**

While the rock is in the air, it rises and then falls to a final position 20.0 m
lower than its starting altitude. We can find the time for this by using

<div class="equation" id="eip-895">
 $$ y=y_{0}+v_{0y}t-\frac{1}{2}g t^{2} . $$
</div>
If we take the initial position $$ y_{0} $$ to be zero, then the final position is
$$ y=-20.0 \m $$. Now the initial vertical velocity is the vertical component of the initial velocity,
found from $$ v_{0y}=v_{0}\sin{\theta_{0}} = ( 25.0 \ms  )( \sin{35.0^\circ } ) = 14.3 \ms $$. Substituting known values yields

<div class="equation" id="eip-722">
 $$ -20.0 \m =\left(14.3 \ms \right)t-\left(4.90 \mss \right){t}^{2}. $$
</div>
Rearranging terms gives a quadratic equation in $$ t $$:

<div class="equation" id="eip-931">
 $$ \left(4.90 \mss \right) t^{2}-\left(14.3 \ms \right)t-\left(20.0 \m \right)=0. $$
</div>
This expression is a quadratic equation of the form $$ a t^{2} + b t+c=0 $$,
where the constants are $$ a=4.90 $$, $$ b=-14.3 $$, and $$ c=-20.0. $$
Its solutions are given by the quadratic formula:

<div class="equation" id="eip-880">
 $$ t=\frac{-b \pm \sqrt{ b^{2}-4 a c }} {2a}. $$
</div>
This equation yields two solutions: $$ t=3.96 $$
and $$ t=-1.03 $$. (It is left as an exercise for the reader to verify these solutions.) The time
is $$ t=3.96\s $$ or $$ -1.03\s $$. The negative value of time implies an event before the start of
motion, and so
we discard it. Thus,

<div class="equation" id="eip-267">
 $$ t=3.96 \s . $$
</div>

**Discussion for (a)**

The time for projectile motion is completely determined by the vertical motion.
So any projectile that has an initial vertical velocity of 14.3 m/s and lands
20.0 m below its starting altitude will spend 3.96 s in the air.

**Solution for (b)**

From the information now in hand, we can find the final horizontal and vertical
velocities $$ v_{x} $$ and $$ v_{y} $$ and combine them to find the
magnitude of the velocity $$ \mag{v} $$ and the angle $$ \theta_{0} $$ it makes with the
horizontal. Of
course, $$ v_{x} $$ is constant so we can solve for it at any horizontal
location. In this case, we chose the starting point since we know both the
initial velocity and initial angle. Therefore:

<div class="equation" id="eip-873">
 $$ v_{x}=v_{0}\cos{\theta_{0}}=\left(25.0 \ms \right)\left(\cos{35^\circ }\right)=20.5 \ms $$
</div>
The final vertical velocity is given by the following equation:

<div class="equation" id="eip-168">
 $$ v_{y}=v_{0y}-gt, $$
</div>
where $$ v_{0y} $$ was found in part (a) to be $$ 14.3 \ms $$. Thus,

<div class="equation" id="eip-113">
 $$ v_{y}=14.3 \ms -\left(9.80 \mss \right)\left(3.96 \s \right) $$
</div>
so that

<div class="equation" id="eip-571">
 $$ v_{y}=-24.5 \ms $$
</div>
To find the magnitude of the final velocity $$ \mag{v} $$, we combine its
perpendicular components, using the following equation:

<div class="equation" id="eip-394">
 $$ \mag{v}=\sqrt{ v_{x}^{2}+v_{y}^{2}}=\sqrt{\left(20.5 \ms \right)^{2}+\left
(-24.5 \ms \right)^{2}}, $$
</div>
which gives

<div class="equation" id="eip-60">
 $$ \mag{v}=31.9 \ms $$
</div>
The direction $$\theta_{v} $$ is found from the equation:

<div class="equation" id="eip-353">
 $$\theta_{v}={\tan}^{-1}\left(v_{y}/v_{x}\right) $$
</div>
so that

<div class="equation" id="eip-589">
 $$\theta_{v}={\tan}^{-1}\left(-24.5/20.5\right)={\tan}^{-1}\left(-1.19\right). $$
</div>
Thus,

<div class="equation" id="eip-379">
 $$\theta_{v}=-50.1^\circ . $$
</div>

**Discussion for (b)**

The negative angle means that the velocity is $$ 50.1^\circ $$ below the
horizontal. This result is consistent with the fact that the final vertical
velocity is negative and hence downward—as you would expect because the final
altitude is 20.0 m lower than the initial altitude. (
See [[Figure]](#import-auto-id1817519).)

</div>

One of the most important things illustrated by projectile motion is that
vertical and horizontal motions are independent of each other. Galileo was the
first person to fully comprehend this characteristic. He used it to predict the
range of a projectile. On level ground, we define **range**{: class="term"
#import-auto-id1751163} to be the horizontal distance $$ R $$ traveled by a
projectile. Galileo and many others were interested in the range of projectiles
primarily for military purposes—such as aiming cannons. However, investigating
the range of projectiles can shed light on other interesting phenomena, such as
the orbits of satellites around the Earth. Let us consider projectile range
further.

![Part a of the figure shows three different trajectories of projectiles on level ground. In each case the projectiles makes an angle of forty five degrees with the horizontal axis. The first projectile of initial velocity thirty meters per second travels a horizontal distance of R equal to ninety one point eight meters. The second projectile of initial velocity forty meters per second travels a horizontal distance of R equal to one hundred sixty three meters. The third projectile of initial velocity fifty meters per second travels a horizontal distance of R equal to two hundred fifty five meters.](../resources/Figure_03_04_05a.jpg "Trajectories of projectiles on level ground.
(a) The greater the initial speed \( v_0 \), the greater the range for a given initial angle.
(b) The effect of initial angle \(\theta_0 \) on the range of a projectile with a given initial speed. Note that the range is the same for 15 degrees and 75 degrees, although the maximum heights of those paths are different.")
{: #import-auto-id1904800 height="300"}

How does the initial velocity of a projectile affect its range? Obviously, the
greater the initial speed $$ v_{0} $$, the greater the range, as shown
in [[Figure]](#import-auto-id1904800)(a). The initial angle $$ \theta_{0} $$
also has a dramatic effect on the range, as illustrated
in [[Figure]](#import-auto-id1904800)(b). For a fixed initial speed, such as
might be produced by a cannon, the maximum range is obtained with $$ \theta_
{0}=45^\circ $$. This is true only for conditions neglecting air resistance. If
air resistance is considered, the maximum angle is approximately $$ 38^\circ $$.
Interestingly, for every initial angle except $$ 45^\circ $$, there are two
angles that give the same range—the sum of those angles is $$ 90^\circ $$. The
range also depends on the value of the acceleration of gravity $$ g $$. The
lunar astronaut Alan Shepherd was able to drive a golf ball a great distance on
the Moon because gravity is weaker there. The range $$ R $$ of a projectile
on **level ground** for which air resistance is negligible is given by

<div class="equation" id="eip-240">
 $$ R=\frac{ v_0^2\sin{ 2\theta_0 }}{g}, $$
</div>

where $$ v_{0} $$ is the initial speed and $$\theta_{0} $$ is the initial angle
relative to the horizontal. The proof of this equation is left as an
end-of-chapter problem (hints are given), but it does fit the major features of
projectile range as described.

When we speak of the range of a projectile on level ground, we assume that $$ R
$$ is very small compared with the circumference of the Earth. If, however, the
range is large, the Earth curves away below the projectile and acceleration of
gravity changes direction along the path. The range is larger than predicted by
the range equation given above because the projectile has farther to fall than
it would on level ground. (
See [[Figure]](#import-auto-id1645881).) If the initial speed is great enough,
the projectile goes into orbit. This possibility was recognized centuries before
it could be accomplished. When an object is in orbit, the Earth curves away from
underneath the object at the same rate as it falls. The object thus falls
continuously but never hits the surface. These and other aspects of orbital
motion, such as the rotation of the Earth, will be covered analytically and in
greater depth later in this text.

Once again we see that thinking about one topic, such as the range of a
projectile, can lead us to others, such as the Earth orbits.
In [Addition of Velocities](../contents/ch3AdditionOfVelocities.md), we will examine the addition of
velocities, which is another important aspect of two-dimensional kinematics and
will also yield insights beyond the immediate topic.

![A figure of the Earth is shown and on top of it a very high tower is placed. A projectile satellite is launched from this very high tower with initial velocity of v zero in the horizontal direction. Several trajectories are shown with increasing range. A circular trajectory is shown indicating the satellite achieved its orbit and it is revolving around the Earth.](../resources/Figure_03_04_06a.jpg "Projectile to satellite. In each case shown here, a projectile is launched from a very high tower to avoid air resistance. With increasing initial speed, the range increases and becomes longer than it would be on level ground because the Earth curves away underneath its path. With a large enough initial speed, orbit is achieved.")
{: #import-auto-id1645881}

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Projectile Motion
</div>
Blast a Buick out of a cannon! Learn about projectile motion by firing various objects. Set the angle, initial speed, and mass. Add air resistance. Make a game out of this simulation by trying to hit a target.

<figure markdown="1" id="eip-id1462984">

<iframe src="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html" width="600" height="450"  allowfullscreen></iframe>
<figcaption>
Projectile Motion
</figcaption>

</figure>
</div>

### Summary

* {: #import-auto-id1677012} Projectile motion is the motion of an object
  through the air that is subject only to the acceleration of gravity.
* {: #import-auto-id1786765} To solve projectile motion problems, perform the
  following steps:
    1. {: #import-auto-id1830314} Determine a coordinate system. Then, resolve
       the position and/or velocity of the object in the horizontal and vertical
       components. The components of position $$ \vb{s} $$ are given by the
       quantities $$ x $$ and $$ y $$, and the components of the velocity $$
     \vb{v} $$ are given by $$ v_{x}=v\cos{\theta} $$ and $$ v_
       {y}=v\sin{\theta} $$, where $$ v $$ is the magnitude of the velocity and
 $$ \theta $$ is its direction.
    2. {: #import-auto-id1830316} Analyze the motion of the projectile in the
       horizontal direction using the following equations:
       <div class="equation" id="eip-898">
         $$ \text{Horizontal motion}\left(a_{x}=0\right) $$
       </div>

       <div class="equation" id="eip-236">
            $$ x=x_{0}+v_{x}t $$
       </div>

       <div class="equation" id="eip-612">
        $$ v_{x}=v_{0x}=\vb{v}_{\text{x}}=\text{velocity is a constant.} $$
       </div>

    3. {: #import-auto-id1939082} Analyze the motion of the projectile in the
       vertical direction using the following equations:
       <div class="equation" id="import-auto-id1939084">
     $$ \text{Vertical motion}\left(\text{Assuming positive direction is up;}a_
     {y}=-g=-9.80 \mss \right) $$
       </div>

       <div class="equation" id="import-auto-id1492830">
       $$ y=y_{0}+\frac{1}{2}\left(v_{0y}+v_{y}\right)t $$
       </div>

       <div class="equation" id="import-auto-id2022844">
       $$ v_{y}=v_{0y}-g t $$
       </div>

       <div class="equation" id="import-auto-id1677876">
        $$ y=y_{0}+v_{0y}t-\frac{1}{2} g t^{2} $$
       </div>

       <div class="equation" id="import-auto-id1653540">
       $$ v_{y}^{2}=v_{0y}^{2}-2g\left(y-y_{0}\right). $$
       </div>

    4. {: #import-auto-id1552181} Recombine the horizontal and vertical
       components of location and/or velocity using the following equations:
       <div class="equation" id="import-auto-id2092332">
        $$ s=\sqrt{ x^{2}+{y}^{2}} $$
       </div>

       <div class="equation" id="import-auto-id2282348">
        $$ \theta =\tan^{-1}\left(\frac{y}{x}\right) $$
       </div>

       <div class="equation" id="import-auto-id2274748">
    $$ v=\sqrt{ v_{x}^{2}+v_{y}^{2}} $$
       </div>

       <div class="equation" id="import-auto-id1979208">
    $$ \theta_{\text{v}}={\tan}^{-1} \left( \frac{v_{y}}{v_{x}} \right) .$$
       </div>
 

* {: #import-auto-id1888635} The maximum height $$ h $$ of a projectile launched
  with initial vertical velocity $$ v_{0y} $$ is given by
  <div class="equation" id="import-auto-id1534227">
    $$ h=\frac{ v_{0y}^{2}}{2g}. $$
  </div>

* {: #import-auto-id1823593} The maximum horizontal distance traveled by a
  projectile is called the **range**. The range $$ R $$ of a projectile on level
  ground launched at an angle $$\theta_{0} $$ above the horizontal with initial
  speed $$ v_{0} $$ is given by
  <div class="equation" id="import-auto-id1951750">
 $$ R=\frac{ v_0^2 \sin{2\theta_0} }{g}. $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Answer the following questions for projectile motion on level ground assuming negligible air resistance
(the initial angle being neither $$ 0^\circ $$ nor $$ 90^\circ $$ ):

(a) Is the velocity ever zero?

(b) When is the velocity a minimum? A maximum?

(c) Can the velocity ever be the same as the initial velocity at a time other
than at $$ t=0 $$?

(d) Can the speed ever be the same as the initial speed at a time other than at
$$ t=0 $$ ?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Answer the following questions for projectile motion on level ground assuming negligible air resistance
(the initial angle being neither $$ 0^\circ $$ nor $$ 90^\circ $$):

(a) Is the acceleration ever zero?

(b) Is the acceleration ever in the same direction as a component of velocity?

(c) Is the acceleration ever opposite in direction to a component of velocity?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
For a fixed initial speed, the range of a projectile is determined by the angle at which it is fired. For all but the maximum, there are two angles that give the same range. Considering factors that might affect the ability of an archer to hit a target, such as wind, explain why the smaller angle (closer to the horizontal) is preferable. When would it be necessary for the archer to use the larger angle? Why does the punter in a football game use the higher trajectory?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
During a lecture demonstration, a professor places two coins on the edge of a table. She then flicks one of the coins horizontally off the table, simultaneously nudging the other over the edge. Describe the subsequent motion of the two coins, in particular discussing whether they hit the floor at the same time.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A projectile is launched at ground level with an initial speed of 50.0 m/s at an angle of
$$ 30.0^\circ $$ above the horizontal. It strikes a target above the ground 3.00 seconds later.
What are the $$ x $$ and $$ y $$
distances from where the projectile was launched to where it lands?

</div>
<div class="solution" markdown="1">
 $$ \begin{array}{lll}
x& =& 1.30 \m \times 10^{2}\\
y& =& 30.9 \m .
\end{array} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A ball is kicked with an initial velocity of 16 m/s in the horizontal direction and 12 m/s in the vertical direction.
(a) At what speed does the ball hit the ground?
(b) For how long does the ball remain in the air?
(c) What maximum height is attained by the ball?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A ball is thrown horizontally from the top of a 60.0-m building and lands 100.0 m from the base of the building. Ignore air resistance.
(a) How long is the ball in the air?
(b) What must have been the initial horizontal component of the velocity?
(c) What is the vertical component of the velocity just before the ball hits the ground?
(d) What is the velocity (including both the horizontal and vertical components) of the ball just before it hits the ground?

</div>
<div class="solution" markdown="1">
(a) 3.50 s

(b) 28.6 m/s (c) 34.3 m/s

(d) 44.7 m/s, $$ 50.2^\circ $$ below horizontal

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A daredevil is attempting to jump his motorcycle over a line of buses parked end to end by driving up a $$ 32^\circ $$
ramp at a speed of $$ 40.0 \ms \left(144 \text{km/h}\right) $$. How many
buses can he clear if the top of the takeoff ramp is at the same height as the
bus tops and the buses are 20.0 m long?
(b) Discuss what your answer implies
about the margin of error in this act—that is, consider how much greater the
range is than the horizontal distance he must travel to miss the end of the last
bus. (Neglect air resistance.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An archer shoots an arrow at a 75.0 m distant target; the bull’s-eye of the target is at same height as the release height of the arrow.
(a) At what angle must the arrow be released to hit the bull’s-eye if its initial speed is 35.0 m/s? In this part of the problem, explicitly show how you follow the steps involved in solving projectile motion problems.
(b) There is a large tree halfway between the archer and the target with an overhanging horizontal branch 3.50 m above the release height of the arrow. Will the arrow go over or under the branch?

</div>
<div class="solution" markdown="1">
(a) $$ 18.4^\circ $$

(b) The arrow will go over the branch.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A rugby player passes the ball 7.00 m across the field, where it is caught at the same height as it left his hand.
(a) At what angle was the ball thrown if its initial speed was 12.0 m/s, assuming that the smaller of the two possible angles was used?
(b) What other angle gives the same range, and why would it not be used?
(c) How long did this pass take?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify the ranges for the projectiles in [[Figure]](#import-auto-id1904800)(a) for $$ \theta =45^\circ $$
and the given initial velocities.

</div>
<div class="solution" markdown="1">
 $$ \begin{array}{}
R=\frac{  v_{0} }{\sin{2\theta }_{0}g}\\
\text{For}\theta =45^\circ,R=\frac{ v_{0} }{g}
\end{array} $$

$$ R=91.8\m $$ for $$ v_{0}=30 \ms $$; $$ R=163\m $$ for $$
v_{0}=40 \ms $$; $$ R=255\m $$ for $$ v_{0}=50 \ms $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify the ranges shown for the projectiles in [[Figure]](#import-auto-id1904800)(b) for an initial velocity of 50 m/s at the given initial angles.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The cannon on a battleship can fire a shell a maximum distance of 32.0 km.
(a) Calculate the initial velocity of the shell.
(b) What maximum height does it reach? (At its highest, the shell is above 60% of the atmosphere—but air resistance is not really negligible as assumed to make this problem easier.) (c) The ocean is not flat,
because the Earth is curved. Assume that the radius of the Earth is $$ 6.37\times 10^{3}\text{km} $$. How many meters lower will its surface be 32.0 km from the ship along a
horizontal line parallel to the surface at the ship? Does your answer imply that
error introduced by the assumption of a flat Earth in projectile motion is
significant here?

</div>
<div class="solution" markdown="1">
(a) 560 m/s

(b) $$ 8.00\times 10^{3}\m $$

(c) 80.0 m. This error is not significant because it is only 1% of the answer in
part (b).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An arrow is shot from a height of 1.5 m toward a cliff of height $$ H $$. It is shot with a velocity of 30 m/s at an angle of $$ 60^\circ $$
above the horizontal. It lands on the top edge of the cliff 4.0 s later.
(a) What is the height of the cliff?
(b) What is the maximum height reached by the arrow along its trajectory?
(c) What is the arrow’s impact speed just before hitting the cliff?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In the standing broad jump, one squats and then pushes off with the legs to see how far one can jump. Suppose the extension of the legs from the crouch position is 0.600 m and
the acceleration achieved from this position is 1.25 times the acceleration due to gravity, $$ g $$. How far can they jump? State your assumptions. (Increased range can be
achieved by swinging the arms in the direction of the jump.)

</div>
<div class="solution" markdown="1">
1.50 m, assuming launch angle of $$ 45^\circ $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The world long jump record is 8.95 m (Mike Powell, USA, 1991). Treated as a projectile, what is
the maximum range obtainable by a person if he has a take-off speed of 9.5 m/s? State your assumptions.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Serving at a speed of 170 km/h, a tennis player hits the ball at a height of
2.5 m and an angle $$ \theta $$ below the horizontal. The base line is 11.9
m from the net, which is 0.91 m high.
What is the angle $$ \theta $$ such that the ball just crosses the net?
Will the ball land in the service box, whose service line is 6.40 m from the
net?

</div>
<div class="solution" markdown="1">
 $$ \theta =6.1^\circ $$

yes, the ball lands at 5.3 m from the net

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A football quarterback is moving straight backward at a speed of 2.00 m/s
when he throws a pass to a player 18.0 m straight downfield.
(a) If the ball is thrown at an angle of $$ 25^\circ $$ relative to the ground and is
caught at the same height as it is released, what is its initial speed relative to the ground?
(b) How long does it take to get to the receiver?
(c) What is its maximum height above its point of release?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Gun sights are adjusted to aim high to compensate for the effect of gravity, effectively making the gun accurate only for a specific range.
(a) If a gun is sighted to hit targets that are at the same height as the gun and 100.0 m away, how low will the bullet hit if aimed directly at a target 150.0 m away? The muzzle velocity of the bullet is 275 m/s.
(b) Discuss qualitatively how a larger muzzle velocity would affect this problem and what would be the effect of air resistance.

</div>
<div class="solution" markdown="1">
(a) −0.486 m

(b) The larger the muzzle velocity, the smaller the deviation in the vertical
direction, because the time of flight would be smaller. Air resistance would
have the effect of decreasing the time of flight, therefore increasing the
vertical deviation.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An eagle is flying horizontally at a speed of 3.00 m/s when the fish in her talons wiggles loose and falls into the lake 5.00 m below. Calculate the velocity of the fish relative to the water when it hits the water.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An owl is carrying a mouse to the chicks in its nest.
Its position at that time is 4.00 m west and 12.0 m above
the center of the 30.0 cm diameter nest.
The owl is flying east at 3.50 m/s at an angle $$ 30.0^\circ $$
below the horizontal when it accidentally drops the mouse. Is the owl lucky
enough to have the mouse hit the nest? To answer this question, calculate the
horizontal position of the mouse when it has fallen 12.0 m.

</div>
<div class="solution" markdown="1">
4.23 m. No, the owl is not lucky; he misses the nest.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose a soccer player kicks the ball from a distance 30 m toward the goal.
Find the initial speed of the ball if it just passes over the goal,
2.4 m above the ground, given the initial direction to be $$ 40^\circ $$
above the horizontal.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Can a goalkeeper at their goal kick a soccer ball into the opponent’s goal without the ball touching the ground? The distance will be about 95 m. A goalkeeper can give the ball a speed of 30 m/s.

</div>
<div class="solution" markdown="1">
No, the maximum range (neglecting air resistance) is about 92 m.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The free throw line in basketball is 4.57 m (15 ft) from the basket, which is 3.05 m (10 ft) above the floor. A player standing on the free throw line throws the ball with an initial speed of 8.15 m/s, releasing it at a height of 2.44 m (8 ft) above the floor. At what angle above the horizontal must the ball be thrown to exactly hit the basket? Note that most players will use a large initial angle rather than a flat shot because it allows for a larger margin of error. Explicitly show how you follow the steps involved in solving projectile motion problems.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In 2007, Michael Carter (U.S.) set a world record in the shot put with a
throw of 24.77 m. What was the initial speed of the shot if he
released it at a height of 2.10 m and threw it at an angle of $$ 38.0^\circ $$
above the horizontal? (Although the maximum distance for a projectile on level
ground is achieved at $$ 45^\circ $$ when air resistance is neglected, the
actual angle to achieve maximum range is smaller; thus, $$ 38^\circ $$ will give
a longer range than $$ 45^\circ $$ in the shot put.)

</div>
<div class="solution" markdown="1">
15.0 m/s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A basketball player is running at $$ 5.00 \ms $$
directly toward the basket when he jumps into the air to dunk the ball. He
maintains his horizontal velocity.
(a) What vertical velocity does he need to rise 0.750 m above the floor?
(b) How far from the basket (measured in the
horizontal direction) must he start his jump to reach his maximum height at the
same time as he reaches the basket?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A football player punts the ball at a $$ 45.0^\circ $$
angle. Without an effect from the wind, the ball would travel 60.0 m
horizontally.
(a) What is the initial speed of the ball?
(b) When the ball is near its maximum height it experiences a brief gust of wind that reduces its
horizontal velocity by 1.50 m/s. What distance does the ball travel
horizontally?

</div>
<div class="solution" markdown="1">
(a) 24.2 m/s

(b) The ball travels a total of 57.4 m with the brief gust of wind.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Prove that the trajectory of a projectile is parabolic, having the form $$
y=a x +b x^{2} $$. To obtain this expression, solve the equation
$$ x=v_{0x}t $$ for $$ t $$
and substitute it into the expression for $$ y=v_{0y}t-\left(1/2\right)g t^{2} $$
(These equations describe the $$ x $$ and $$ y $$
positions of a projectile that starts at the origin.) You should obtain an
equation of the form $$ y=a x+b x^{2} $$
where $$ a $$ and $$ b $$ are constants.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Derive $$ R=\frac{ v_{0}^{2}\sin{2\theta }_{0}}{g} $$
for the range of a projectile on level ground by finding the time $$ t $$ at
which $$ y $$ becomes zero and substituting this value of $$ t $$ into the
expression for $$ x-x_{0} $$, noting that $$ R=x-x_{0} $$
</div>
<div class="solution" id="eip-id2932521" markdown="1">
 $$ y-y_{0}=0=v_{0y}t-\frac{1}{2}g t^{2}=\left(v_{0}\sin{\theta} \right)
t-\frac{1}{2}gt^{2} $$, so that $$ t=\frac{2\left(v_{0}\sin{\theta}\right)}{g} $$
$$ x-x_{0}=v_{0x}t=\left(v_{0}\cos{\theta}\right)t=R, $$
and substituting for $$ t $$
gives:

$$ R=v_{0}\cos{\theta} \left(\frac{ 2 v_{0}\sin{\theta}}{g}\right)=\frac{ 2v_
{0}^{2}\sin{\theta} \cos{\theta} }{g} $$ since $$ 2\sin{\theta} \cos{\theta}
=\sin{2\theta}$$,  the range is:

$$ R=\frac{ v_{0}^{2}\sin{2\theta}}{g}.$$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Unreasonable Results**

(a) Find the maximum range of a super cannon that has a muzzle velocity of 4.0 km/s.
(b) What is unreasonable about the range you found?
(c) Is the premise unreasonable or is the available equation inapplicable? Explain your answer.
(d) If such a muzzle velocity could be obtained, discuss the effects of air resistance, thinning air with altitude, and the curvature of the Earth on the range of the super cannon.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Construct Your Own Problem**

Consider a ball tossed over a fence. Construct a problem in which you calculate the ball’s needed initial velocity to just clear the fence. Among the things to determine are; the height of the fence, the distance to the fence from the point of release of the ball, and the height at which the ball is released. You should also consider whether it is possible to choose the initial speed for the ball and just calculate the angle at which it is thrown. Also examine the possibility of multiple solutions given the distances and heights you have chosen.

</div>
</div>

</div>
<div class="glossary" markdown="1">

### Glossary
{: class="glossary-title"}

air resistance
: a frictional force that slows the motion of objects as they travel through the
air; when solving basic physics problems, air resistance is assumed to be zero
{: #import-auto-id2275857}

kinematics
: the study of motion without regard to mass or force

motion
: displacement of an object as a function of time

projectile
: an object that travels through the air and experiences only acceleration due
to gravity
{: #import-auto-id1459204}

projectile motion
: the motion of an object that is subject only to the acceleration of gravity
{:#import-auto-id1981500}

range
: the maximum horizontal distance that a projectile travels
{: #import-auto-id2257218}

trajectory
: the path of a projectile through the air
{: #import-auto-id2852095}
</div>
