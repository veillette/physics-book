---
title: "Kinematics in Two Dimensions: An Introduction"
layout: page
---

<div class="abstract" markdown="1">
* Observe that motion in two dimensions consists of horizontal and vertical components.
* Understand the independence of horizontal and vertical vectors in two-dimensional motion.

</div>

![A busy traffic intersection in New York showing vehicles moving on the road.](../resources/Figure_03_01_00.jpg "Walkers and drivers in a city like New York are rarely able to travel in straight lines to reach their destinations. Instead, they must follow roads and sidewalks, making two-dimensional, zigzagged paths. (credit: Margaret W. Carruthers)")
{: #Figure1}

### Two-Dimensional Motion: Walking in a City

Suppose you want to walk from one point to another in a city with uniform square
blocks, as pictured in [Figure 2](#Figure2).

![An X Y graph with origin at zero zero with x axis labeled nine blocks east and y axis labeled five blocks north. Starting point at the origin and destination at point nine on the x axis and point five on the y axis.](../resources/Figure_03_01_01.jpg "A pedestrian walks a two-dimensional path between two points in a city. In this scene, all blocks are square and are the same size.")
{: #Figure2}

The straight-line path that a helicopter might fly is blocked to you as a
pedestrian, and so you are forced to take a two-dimensional path, such as the
one shown. You walk 14 blocks in all, 9 east followed by 5 north. What is the
straight-line distance?

An old adage states that the shortest distance between two points is a straight
line. The two legs of the trip and the straight-line path form a right triangle,
and so the Pythagorean theorem, $$ a^{2} + b^{2} = c^{2} $$, can be used to find
the straight-line distance.

![A right-angled triangle with base labeled a height labeled b and hypotenuse labeled c is shown. Using Pythagorean 
theorem c is calculated as square root of a squared plus b squared.](../resources/Figure_03_01_03.svg "The Pythagorean 
theorem relates the length of the legs of a right triangle, labeled \( a\) and \( b \), with the hypotenuse, labeled \( c \). 
The relationship is given by: \( a^2+b^2=c^2 \). This can be rewritten, solving for \( c \). In this way one finds 
\( c=\sqrt{a^2+b^2} \).")
{: #Figure3}

The hypotenuse of the triangle is the straight-line path, and so in this case
its length in units of city blocks is $$ \sqrt{\left(9 \text{ blocks} \right)
^{2} + \left(5 \text{ blocks}\right)^{2} } = 10.3 \text{blocks} $$, considerably
shorter than the 14 blocks you walked. (Note that we are using three significant
figures in the answer. Although it appears that “9” and “5” have only one
significant digit, they are discrete numbers. In this case “9 blocks” is the
same as “9.0 or 9.00 blocks.” We have decided to use three significant figures
in the answer in order to show the result more precisely.)

![An X Y graph with origin at zero zero with x-axis labeled nine blocks east and y axis labeled five blocks north. A diagonal vector arrow joining starting point at point zero on x axis and destination at point five on y axis with its direction northeast is shown. A helicopter is flying along the diagonal vector arrow with helicopter path of ten point three blocks. The angle formed by diagonal vector arrow and the x-axis is equal to twenty-nine point one degrees.](../resources/Figure_03_01_03.jpg "The straight-line path followed by a helicopter between the two points is shorter than the 14 blocks walked by the pedestrian. All blocks are square and the same size.")
{: #Figure4}

The fact that the straight-line distance (10.3 blocks)
in [Figure 4](#Figure4) is less than the total distance walked (14 blocks) is one
example of a general characteristic of vectors. (
Recall that **vectors** are quantities that have both magnitude and direction.)

As for one-dimensional kinematics, we use arrows to represent vectors. The
length of the arrow is proportional to the vector’s magnitude. The arrow’s
length is indicated by hash marks in [Figure 2](#Figure2)
and [Figure 4](#Figure4). The arrow points in the same direction as the vector. For
two-dimensional motion, the path of an object can be represented with three
vectors: one vector shows the straight-line path between the initial and final
points of the motion, one vector shows the horizontal component of the motion,
and one vector shows the vertical component of the motion. The horizontal and
vertical components of the motion add together to give the straight-line path.
For example, observe the three vectors in [Figure 4](#Figure4). The first
represents a 9-block displacement east. The second represents a 5-block
displacement north. These vectors are added to give the third vector, with a
10.3-block total displacement. The third vector is the straight-line path
between the two points. Note that in this example, the vectors that we are
adding are perpendicular to each other and thus form a right triangle. This
means that we can use the Pythagorean theorem to calculate the magnitude of the
total displacement. (Note that we cannot use the Pythagorean theorem to add
vectors that are not perpendicular. We will develop techniques for adding
vectors having any direction, not just those perpendicular to one another,
in [Vector Addition and Subtraction: Graphical Methods](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md)
and [Vector Addition and Subtraction: Analytical Methods](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md)
.)

### The Independence of Perpendicular Motions

The person taking the path shown in [Figure 4](#Figure4)
walks east and then north (two perpendicular directions). How far they walk east
is only affected by their motion eastward. Similarly, how far they walk north is
only affected by their motion northward.

<div class="note" data-label="" markdown="1">
<div class="title">
Independence of Motion
</div>
The horizontal and vertical components of two-dimensional motion are independent of each other. Any motion in the horizontal direction does not affect motion in the vertical direction, and vice versa.

</div>

This is true in a simple scenario like that of walking in one direction first,
followed by another. It is also true of more complicated motion involving
movement in two directions at once. For example, let’s compare the motions of
two baseballs. One baseball is dropped from rest. At the same instant, another
is thrown horizontally from the same height and follows a curved path. A
stroboscope has captured the positions of the balls at fixed time intervals as
they fall.

![Two identical balls one red and another blue are falling. Five positions of the balls during fall are shown. The horizontal velocity vectors for blue ball towards right are of same magnitude for all the positions. The vertical velocity vectors shown downwards for red ball are increasing with each position.](../resources/Figure_03_01_04.jpg "This shows the motions of two identical balls&#x2014;one falls from rest, the other has an initial horizontal velocity. Each subsequent position is an equal time interval. Arrows represent horizontal and vertical velocities at each position. The ball on the right has an initial horizontal velocity, while the ball on the left has no horizontal velocity. Despite the difference in horizontal velocities, the vertical velocities and positions are identical for both balls. This shows that the vertical and horizontal motions are independent.")
{: #Figure5}

It is remarkable that for each flash of the strobe, the vertical positions of
the two balls are the same. This similarity implies that the vertical motion is
independent of whether or not the ball is moving horizontally. (Assuming no air
resistance, the vertical motion of a falling object is influenced by gravity
only, and not by any horizontal forces.) Careful examination of the ball thrown
horizontally shows that it travels the same horizontal distance between flashes.
This is due to the fact that there are no additional forces on the ball in the
horizontal direction after it is thrown. This result means that the horizontal
velocity is constant, and affected neither by vertical motion nor by gravity (
which is vertical). Note that this case is true only for ideal conditions. In
the real world, air resistance will affect the speed of the balls in both
directions.

The two-dimensional curved path of the horizontally thrown ball is composed of
two independent one-dimensional motions (
horizontal and vertical). The key to analyzing such motion, called **projectile
motion**, is to **resolve** (break) it into motions along perpendicular
directions. Resolving two-dimensional motion into perpendicular components is
possible because the components are independent. We shall see how to resolve
vectors
in [Vector Addition and Subtraction: Graphical Methods](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md)
and [Vector Addition and Subtraction: Analytical Methods](../contents/ch3VectorAdditionAndSubtractionAnalyticalMethods.md)
. We will find such techniques to be useful in many areas of physics.

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Ladybug Motion 2D
</div>
Learn about position, velocity and acceleration vectors. Move the ladybug by setting the position, velocity or acceleration,
and see how the vectors change. Choose linear, circular or elliptical motion, and record
and playback the motion to analyze the behavior.

<figure markdown="1">
<figcaption>
Ladybug Motion 2D
</figcaption>
<iframe loading="lazy" src="https://phet.colorado.edu/sims/cheerpj/motion-2d/latest/motion-2d.html?simulation=motion-2d" width="600" height="450"  allowfullscreen></iframe>
</figure>
</div>

### Summary

* The shortest path between any two points is a straight line. In two
  dimensions, this path can be represented by a vector with horizontal and
  vertical components.
* The horizontal and vertical components of a vector are independent of one
  another. Motion in the horizontal direction does not affect motion in the
  vertical direction, and vice versa.

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

vector
: a quantity that has both magnitude and direction; an arrow used to represent
quantities with both magnitude and direction

</div>
