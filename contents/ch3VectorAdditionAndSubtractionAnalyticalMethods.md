---
title: 'Vector Addition and Subtraction: Analytical Methods'
layout: page
sectionNumber: 3
chapterNumber: 3
---

<div class="abstract" markdown="1">
* Understand the rules of vector addition and subtraction using analytical methods.
* Apply analytical methods to determine vertical and horizontal component vectors.
* Apply analytical methods to determine the magnitude and direction of a resultant vector.

</div>

**Analytical methods** of vector addition and subtraction employ geometry and
simple trigonometry rather than the ruler and protractor of graphical methods.
Part of the graphical technique is retained, because vectors are still
represented by arrows for easy visualization. However, analytical methods are
more concise, accurate, and precise than graphical methods, which are limited by
the accuracy with which a drawing can be made. Analytical methods are limited
only by the accuracy and precision with which physical quantities are known.

### Resolving a Vector into Perpendicular Components

Analytical techniques and right triangles go hand-in-hand in physics because (
among other things) motions along perpendicular directions are independent. We
very often need to separate a vector into perpendicular components. For example,
given a vector like $$ \vb{A} $$ in [Figure 1](#Figure1), we may wish to find which
two perpendicular vectors, $$ \vb{A}_{x} $$ and $$ \vb{A}_{y} $$, add to produce
it.

![In the given figure a dotted vector A sub x is drawn from the origin along the x axis. From the head of the vector A sub x another vector A sub y is drawn in the upward direction. Their resultant vector A is drawn from the tail of the vector A sub x to the head of the vector A sub y at an angle theta from the x axis. On the graph a vector A, inclined at an angle theta with x axis is shown. Therefore vector A is the sum of the vectors A sub x and A sub y.](../resources/Figure_03_03_01.jpg "The vector \( A \) , with its tail at the origin of an x, y-coordinate system, is shown together with its x- and y-components, \( A_x \) and \( A_y \) . These vectors form a right triangle. The analytical relationships among these vectors are summarized below.")
{: #Figure1 height="200"}

$$ \vb{A}_{x} $$ and $$ \vb{A}_{y} $$ are defined to be the components of $$
\vb{A} $$ along the **x**- and **y**-axes. The three vectors $$ \vb{A} $$, $$
\vb{A}_{x} $$, and $$ \vb{A}_{y} $$ form a right triangle:

<div class="equation">
 $$ \vb{A}_{x}+ \vb{A}_{y} = \vb{A}. $$
</div>

Note that this relationship between vector components and the resultant vector
holds only for vector quantities (which include both magnitude and direction).
The relationship does not apply for the magnitudes alone. For example, if $$
\vb{A}_{x}=3 \m $$ east, $$ \vb{A}_{y}=4 \m $$ north, and $$ \vb{A}=5 \m $$
north-east, then it is true that the vectors $$ \vb{A}_{x} +\vb{A}_{y} =\vb{A}
$$. However, it is
**not** true that the sum of the magnitudes of the vectors is also equal. That
is,

<div class="equation">
 $$ 3 \m + 4 \m \ne 5 \m $$
</div>

Thus,

<div class="equation">
 $$ A_x+A_y \neq A $$
</div>

If the vector $$ \vb{A} $$ is known, then its magnitude $$ A $$
(its length) and its angle $$ \theta $$
(its direction) are known. To find $$ A_{x} $$ and $$ A_{y} $$, its **x**-
and **y**-components, we use the following relationships for a right triangle.

<div class="equation">
 $$ A_{x}=A\cos{\theta} $$
</div>

and

<div class="equation">
 $$ A_{y}=A\sin{\theta} . $$
</div>

![\]A dotted vector A sub x whose magnitude is equal to A cosine theta is drawn from the origin along the x axis. From the head of the vector A sub x another vector A sub y whose magnitude is equal to A sine theta is drawn in the upward direction. Their resultant vector A is drawn from the tail of the vector A sub x to the head of the vector A-y at an angle theta from the x axis. Therefore vector A is the sum of the vectors A sub x and A sub y.](../resources/Figure_03_03_02.jpg "The magnitudes of the vector components \( A_x \) and \( A_y \) can be related to the resultant vector \( A \) and the angle \( \theta \) with trigonometric identities. Here we see that \( A_x = A \cos{\theta } \) and \( A_y=A \sin{\theta} \) .")
{: #Figure2 height="225"}

Suppose, for example, that $$ \vb{A} $$ is the vector representing the total
displacement of the person walking in a city considered
in [Kinematics in Two Dimensions: An Introduction](../contents/ch3KinematicsInTwoDimensionsAnIntroduction.md)
and [Vector Addition and Subtraction: Graphical Methods](../contents/ch3VectorAdditionAndSubtractionGraphicalMethods.md)
.

![In the given figure a vector A of magnitude ten point three blocks is inclined at an angle twenty nine point one degrees to the positive x axis. The horizontal component A sub x of vector A is equal to A cosine theta which is equal to ten point three blocks multiplied to cosine twenty nine point one degrees which is equal to nine blocks east. Also the vertical component A sub y of vector A is equal to A sin theta is equal to ten point three blocks multiplied to sine twenty nine point one degrees, which is equal to five point zero blocks north.](../resources/Figure_03_03_03.jpg "We can use the relationships \( A_x=A \cos{ \theta} \) and \( A_y=A \sin{ \theta } \) to determine the magnitude of the horizontal and vertical component vectors in this example.")
{: #Figure3}

Then $$ A=10.3 $$ blocks and $$ \theta =29.1^\circ $$, so that

<div class="equation">
 $$ A_{x}=\mag{A} \cos{\theta} =\left(10.3 \text{blocks}\right)\left(\cos{29.1^\circ }\right)=9.0 \text{blocks} $$
</div>

<div class="equation">
 $$ A_{y} = \mag{A} \sin{\theta} =\left(10.3 \text{ blocks}\right)\left(\sin{29.1^\circ }\right)=5.0 \text{blocks}. $$
</div>

### Calculating a Resultant Vector

If the perpendicular components $$ \vb{A}_{x} $$ and $$ \vb{A}_{y} $$ of a
vector $$ \vb{A} $$ are known, then $$ \vb{A} $$ can also be found analytically.
To find the magnitude $$ A $$ and direction $$ \theta $$ of a vector from its
perpendicular components $$ \vb{A}_{x} $$ and $$ \vb{A}_{y} $$, we use the
following relationships:

<div class="equation">
 $$ A=\sqrt{ A_x^2+ A_y^2} $$
</div>

<div class="equation">
 $$ \theta ={\tan}^{-1} \left( \frac{ A_{y}}{ A_{x}} \right). $$
</div>

![Vector A is shown with its horizontal and vertical components A sub x and A sub y respectively. The magnitude of vector A is equal to the square root of A sub x squared plus A sub y squared. The angle theta of the vector A with the x axis is equal to inverse tangent of A sub y over A sub x](../resources/Figure_03_03_04.jpg "The magnitude and direction of the resultant vector  can be determined once the horizontal and vertical components, \( \vb{A}_x \) and \( \vb{A}_y \) have been determined.")
{: #Figure4}

Note that the equation $$ A=\sqrt{ A_{x}^{2}+ A_{y}^{2}} $$ is just the
Pythagorean theorem relating the legs of a right triangle to the length of the
hypotenuse. For example, if $$ A_{x} $$ and $$ A_{y} $$ are 9 and 5 blocks,
respectively, then $$ A=\sqrt{ 9^{2}+5^{2}}=10.3 $$ blocks, again consistent
with the example of the person walking in a city. Finally, the direction is $$
\theta ={\tan}^{-1}\left(5/9 \right) =29.1^\circ $$, as before.

<div class="note" data-label="" markdown="1">
<div class="title">
Determining Vectors and Vector Components with Analytical Methods
</div>
Equations $$ A_{x}=A\cos{\theta} $$ and $$ A_{y}=A\sin{\theta} $$
are used to find the perpendicular components of a vector—that is, to go from
$$ A $$ and $$ \theta $$ to $$ A_{x} $$ and $$ A_{y} $$.
Equations $$ A=\sqrt{ A_{x}^{2}+ A_{y}^{2}} $$
and $$ \theta ={\tan}^{-1} \left( \frac{ A_{y}}{ A_{x}} \right) $$
are used to find a vector from its perpendicular components—that is, to go from
$$ A_{x} $$ and $$ A_{y} $$ to $$ A $$ and $$ \theta $$.
Both processes are crucial to analytical methods of vector addition and
subtraction.

</div>

### Adding Vectors Using Analytical Methods

To see how to add vectors using perpendicular components,
consider [Figure 5](#Figure5), in which the vectors $$ \vb{A} $$ and $$ \vb{B} $$
are added to produce the resultant $$ \vb{R} $$.

![Two vectors A and B are shown. The tail of vector B is at the head of vector A and the tail of the vector A is at origin. Both the vectors are in the first quadrant. The resultant R of these two vectors extending from the tail of vector A to the head of vector B is also shown.](../resources/Figure_03_03_05.jpg "Vectors \( A \) and \( B \) are two legs of a walk, and \( R \) is the resultant or total displacement. You can use analytical methods to determine the magnitude and direction of \( R \) .")
{: #Figure5}

If $$ \vb{A} $$ and $$ \vb{B} $$ represent two legs of a walk (two
displacements), then $$ \vb{R} $$ is the total displacement. The person taking
the walk ends up at the tip of $$ \vb{R}$$. There are many ways to arrive at the
same point. In particular, the person could have walked first in the *x*
-direction and then in the *y*-direction. Those paths are the *x*- and
*y*-components of the resultant, $$ \vb{R}_{x} $$ and $$ \vb{R}_{y} $$. If we
know $$ \vb{R}_{x} $$ and $$ \vb{R}_{y} $$, we can find $$ R $$ and $$ \theta $$
using the equations $$ A=\sqrt{ A_{x}^{2}+ A_
{y}^{2}} $$ and $$ \theta ={\tan}^{-1}\left( A_{y}/ A_{x}\right) $$. When you
use the analytical method of vector addition, you can determine the components
or the magnitude and direction of a vector.

***Step 1.*** *Identify the x- and y-axes that will be used in the problem.
Then, find the components of each vector to be added along the chosen
perpendicular axes.* Use the equations $$ A_{x}=A\cos{\theta} $$ and $$ A_
{y}=A\sin{\theta} $$ to find the components. In [Figure 6](#Figure6), these
components are $$ A_{x} $$, $$ A_{y} $$, $$ B_{x} $$, and $$ B_{y} $$. The
angles that vectors $$ \vb{A} $$ and $$ \vb{B} $$ make with the **x**-axis are
$$ \theta_{\text{A}} $$ and $$ \theta_{\text{B}} $$, respectively.

![Two vectors A and B are shown. The tail of the vector B is at the head of vector A and the tail of the vector A is at origin. Both the vectors are in the first quadrant. The resultant R of these two vectors extending from the tail of vector A to the head of vector B is also shown. The horizontal and vertical components of the vectors A and B are shown with the help of dotted lines. The vectors labeled as A sub x and A sub y are the components of vector A, and B sub x and B sub y as the components of vector B..](../resources/Figure_03_03_06.jpg "To add vectors \( A \) and \( B \) , first determine the horizontal and vertical components of each vector. These are the dotted vectors \( A_x \) , \( A_y \) , \( B_x \) and \( B_y \) shown in the image.")
{: #Figure6}

***Step 2.*** *Find the components of the resultant along each axis by adding
the components of the individual vectors along that axis.* That is, as shown
in [Figure 7](#Figure7),

<div class="equation">
 $$ R_{x}= A_{x}+B_{x} $$
</div>

and

<div class="equation">
 $$ R_{y}= A_{y}+B_{y}. $$
</div>

![Two vectors A and B are shown. The tail of vector B is at the head of vector A and the tail of the vector A is at origin. Both the vectors are in the first quadrant. The resultant R of these two vectors extending from the tail of vector A to the head of vector B is also shown. The vectors A and B are resolved into the horizontal and vertical components shown as dotted lines parallel to x axis and y axis respectively. The horizontal components of vector A and vector B are labeled as A sub x and B sub x and the horizontal component of the resultant R is labeled at R sub x and is equal to A sub x plus B sub x. The vertical components of vector A and vector B are labeled as A sub y and B sub y and the vertical components of the resultant R is labeled as R sub y is equal to A sub y plus B sub y.](../resources/Figure_03_03_07.jpg "The magnitude of the vectors \( A_x \) and \( B_x \) add to give the magnitude \( R_x \) of the resultant vector in the horizontal direction. Similarly, the magnitudes of the vectors \( A_y \) and \( B_y \) add to give the magnitude \( R_y \) of the resultant vector in the vertical direction.")
{: #Figure7}

Components along the same axis, say the **x**-axis, are vectors along the same
line and, thus, can be added to one another like ordinary numbers. The same is
true for components along the **y**-axis. (For example, a 9-block eastward walk
could be taken in two legs, the first 3 blocks east and the second 6 blocks
east, for a total of 9, because they are along the same direction.) So resolving
vectors into components along common axes makes it easier to add them. Now that
the components of $$ \vb{R} $$ are known, its magnitude and direction can be
found.

***Step 3.*** *To get the magnitude $$ R $$ of the resultant, use the
Pythagorean theorem:*

<div class="equation">
$$ R=\sqrt{ R_{x}^{2}+R_{y}^{2}}. $$
</div>

***Step 4.*** *To get the direction of the resultant:*

<div class="equation">
$$ \theta ={\tan}^{-1} \left( R_{y}/R_{x} \right). $$
</div>

The following example illustrates this technique for adding vectors using
perpendicular components.

<div class="example" markdown="1">
<div class="title">
Adding Vectors Using Analytical Methods
</div>
Add the vector $$ \vb{A} $$ to the vector $$ \vb{B} $$
shown in [Figure 8](#Figure8), using perpendicular
components along the **x**- and **y**-axes. The **x**- and **y**-axes are along
the east–west and north–south directions, respectively. Vector $$ \vb{A}
$$
represents the first leg of a walk in which a person walks $$ 53.0 \m  $$
in a direction $$ 20.0^\circ $$
north of east. Vector $$ \vb{B} $$
represents the second leg, a displacement of $$ 34.0 \m  $$
in a direction $$ 63.0^\circ $$
north of east.

![Two vectors A and B are shown. The tail of the vector A is at origin. Both the vectors are in the first quadrant. Vector A is of magnitude fifty three units and is inclined at an angle of twenty degrees to the horizontal. From the head of the vector A another vector B of magnitude 34 units is drawn and is inclined at angle sixty three degrees with the horizontal. The resultant of two vectors is drawn from the tail of the vector A to the head of the vector B.](../resources/Figure_03_03_08.jpg "Vector \( A \) has magnitude 53.0 m and direction 20.0 degrees north of the x-axis. Vector \( B \) has magnitude 34.0 m and direction 63.0 degrees north of the x-axis. You can use analytical methods to determine the magnitude and direction of \( R \) .")
{: #Figure8}

**Strategy**

The components of $$ \vb{A} $$ and $$ \vb{B} $$ along the **x**- and
**y**-axes represent walking due east and due north to get to the same ending
point. Once found, they are combined to produce the resultant.

**Solution**

Following the method outlined above, we first find the components of $$ \vb{A}
$$ and $$ \vb{B} $$ along the **x**- and **y**-axes. Note that $$ A=53.0 \m $$,
$$ \theta_{\text{A}}=20.0^\circ $$, $$ B=34.0 \m $$, and $$ \theta_
{\text{B}}=63.0^\circ $$. We find the **x**-components by using $$ A_
{x}=A\cos{\theta} $$, which gives

<div class="equation">
 $$ \begin{array}{lll}
A_{x}&=& A\cos{\theta_{A}}=\left(53.0 \m \right) \left(\cos{20.0^\circ}\right)\\
A_{x}&=& \left(53.0 \m \right)\left(0.940 \right)=49.8 \m
\end{array} $$
</div>
and

<div class="equation">
 $$ \begin{array}{lll}
B_{x}&=& B\cos{\theta_{B}}=\left(34.0 \m \right) \left(\cos{63.0^\circ}\right)\\
B_{x}&=& \left(34.0 \m \right)\left(0.454\right)=15.4 \m .
\end{array} $$
</div>
Similarly, the *y*-components are found using $$ A_{y}=A\sin{\theta_{A}} $$:

<div class="equation">
 $$ \begin{array}{lll}
A_{y}&=& A\sin{\theta_{A}}=\left(53.0 \m \right) \left(\sin{20.0^\circ }\right)\\
A_{y}&=& \left(53.0 \m \right)\left(0.342\right)=18.1 \m
\end{array} $$
</div>
and

<div class="equation">
 $$ \begin{array}{lll}
B_{y}&=& B\sin{\theta_{B}}=\left(34.0 \m \right)\left(\sin{ 63.0^\circ}\right)\\
B_{y}&=&\left(34.0 \m \right)\left(0.891\right)=30.3 \m .
\end{array} $$
</div>
The **x**- and **y**-components of the resultant are thus

<div class="equation">
 $$ R_{x}= A_{x}+B_{x}=49.8 \m +15.4 \m =65.2 \m $$
</div>
and

<div class="equation">
 $$ R_{y}= A_{y}+B_{y}=18.1 \m  +30.3 \m =48.4  \m . $$
</div>
Now we can find the magnitude of the resultant by using the Pythagorean theorem:

<div class="equation">
 $$ R=\sqrt{ R_{x}^{2}+R_{y}^{2} }=
\sqrt{ \left( 65.2 \m  \right)^{2}+\left(48.4 \m  \right)^{2} } $$
</div>
so that

<div class="equation">
 $$ R=81.2 \m $$
</div>
Finally, we find the direction of the resultant:

<div class="equation">
 $$ \theta ={\tan}^{-1}\left( \frac{ R_{y}}{R_{x}} \right)= +{\tan}^{-1}\left( \frac{48.4 \m}{65.2\m}\right) . $$
</div>
Thus,

<div class="equation">
 $$ \theta ={\tan}^{-1}\left(0.742\right)=36.6^\circ . $$
</div>

![The addition of two vectors A and B is shown. Vector A is of magnitude fifty three units and is inclined at an angle of twenty degrees to the horizontal. Vector B is of magnitude thirty four units and is inclined at angle sixty three degrees to the horizontal. The components of vector A are shown as dotted vectors A X is equal to forty nine point eight meter along x axis and A Y is equal to eighteen point one meter along Y axis. The components of vector B are also shown as dotted vectors B X is equal to fifteen point four meter and B Y is equal to thirty point three meter. The horizontal component of the resultant R X is equal to A X plus B X is equal to sixty five point two meter. The vertical component of the resultant R Y is equal to A Y plus B Y is equal to forty eight point four meter. The magnitude of the resultant of two vectors is eighty one point two meters. The direction of the resultant R is in thirty six point six degree from the vector A in anticlockwise direction.](../resources/Figure_03_03_09.jpg "Using analytical methods, we see that the magnitude of  \( R \)  is 81.2 m and its direction is 36.6 degrees north of east."){: #Figure9}

**Discussion**

This example illustrates the addition of vectors using perpendicular components.
Vector subtraction using perpendicular components is very similar—it is just the
addition of a negative vector.

Subtraction of vectors is accomplished by the addition of a negative vector.
That is, $$ \vb{A}-\vb{B}\equiv \vb{A}+\left( -\vb{B} \right) $$. Thus, *the
method for the subtraction of vectors using perpendicular components is
identical to that for addition*. The components of $$ -\vb{B} $$ are the
negatives of the components of $$ \vb{B} $$. The *x*- and **y**-components of
the resultant $$ \vb{A}-\vb{B} = \vb{R} $$ are thus

<div class="equation">
 $$ R_{x}= A_{x}+\left(- B_{x}\right) $$
</div>
and

<div class="equation">
 $$ R_{y}= A_{y}+\left(- B_{y}\right) $$
</div>
and the rest of the method outlined above is identical to that for addition. (See [Figure 10](#Figure10).)

</div>

Analyzing vectors using perpendicular components is very useful in many areas of
physics, because perpendicular quantities are often independent of one another.
The next module, [Projectile Motion](../contents/ch3ProjectileMotion.md), is one
of many in which using perpendicular components helps make the picture clear and
simplifies the physics.

![In this figure, the subtraction of two vectors A and B is shown. A red colored vector A is inclined at an angle theta A to the positive of x axis. From the head of vector A a blue vector negative B is drawn. Vector B is in west of south direction. The resultant of the vector A and vector negative B is shown as a black vector R from the tail of vector A to the head of vector negative B. The resultant R is inclined to x axis at an angle theta below the x axis. The components of the vectors are also shown along the coordinate axes as dotted lines of their respective colors.](../resources/Figure_03_03_10.jpg "The subtraction of the two vectors shown in <a href="#Figure8">Figure 8</a>. The components of &#x2013; \( B \) are the negatives of the components of \( B \) . The method of subtraction is the same as that for addition.")
{: #Figure10}

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Vector Addition
</div>
Learn how to add vectors. Drag vectors onto a graph, change their length and angle, and sum them together. The magnitude, angle, and components of each vector can be displayed in several formats.

<figure markdown="1">
<iframe loading="lazy" src="https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_en.html" width="600" height="450"  allowfullscreen></iframe>
<figcaption>
Vector Addition
</figcaption>

</figure>
</div>

### Summary

* The analytical method of vector addition and subtraction involves using the
  Pythagorean theorem and trigonometric identities to determine the magnitude
  and direction of a resultant vector.
* The steps to add vectors $$ \vb{A} $$ and $$ \vb{B} $$ using the analytical
  method are as follows:
  Step 1: Determine the coordinate system for the vectors. Then, determine the
  horizontal and vertical components of each vector using the equations

  <div class="equation">
    $$ \begin{array}{lll} A_{x}&=& A\cos{\theta} \\ B_{x}&=& B\cos{\theta}
    \end{array} $$
  </div>

and

  <div class="equation">
 $$ \begin{array}{lll} 
A_{y}&=& A\sin{\theta} \\ 
B_{y}&=& B\sin{\theta} .
\end{array} $$
  </div>

Step 2: Add the horizontal and vertical components of each vector to determine
the components $$ R_{x} $$ and $$ R_{y} $$ of the resultant vector, $$ \vb{R}
$$:

  <div class="equation">
 $$ R_{x}= A_{x}+B_{x} $$
  </div>

and

  <div class="equation">
 $$ R_{y}= A_{y}+B_{y} . $$
  </div>

Step 3: Use the Pythagorean theorem to determine the magnitude, $$ R $$, of the
resultant vector $$ \vb{R} $$:

  <div class="equation">
 $$ R=\sqrt{ R_{x}^{2}+R_{y}^{2}}. $$
  </div>

Step 4: Use a trigonometric identity to determine the direction, $$ \theta $$,
of $$ \vb{R} $$:

  <div class="equation">
 $$ \theta ={\tan}^{-1}\left( R_{y}/ R_{x}\right). $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose you add two vectors $$ \vb{A} $$ and $$ \vb{B} $$. What relative direction between them produces the resultant with the greatest
magnitude? What is the maximum magnitude? What relative direction between them
produces the resultant with the smallest magnitude? What is the minimum
magnitude?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Give an example of a nonzero vector that has a component of zero.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain why a vector cannot have a component greater than its own magnitude.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If the vectors $$ \vb{A} $$ and $$ \vb{B} $$
are perpendicular, what is the component of $$ \vb{A} $$
along the direction of $$ \vb{B} $$
? What is the component of $$ \vb{B} $$
along the direction of $$ \vb{A} $$
?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the following for path C in [Figure 11](#Figure11): (a) the total distance traveled and (b) the magnitude and direction of the displacement from start to finish. In this part of the problem, explicitly show how you follow the steps of the analytical method of vector addition.

![A map of city is shown. The houses are in form of square blocks of side one hundred and twenty meter each. Four paths A B C and D are shown in different colors. The path c shown as blue extends to one block towards north, then five blocks towards east and then two blocks towards south then one block towards west and one block towards north and finally three blocks towards west. It is asked to find out the total distance traveled the magnitude and the direction of the displacement from start to finish for path C.](../resources/Figure_03_03_11.jpg "The various lines represent paths taken by different people walking in a city. All blocks are 120 m on a side.")
{: #Figure11}

</div>
<div class="solution"  markdown="1">
(a) 1.56 km

(b) 120 m east

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the following for path D in [Figure 11](#Figure11): (a) the total distance traveled and (b) the magnitude and direction of the displacement from start to finish. In this part of the problem, explicitly show how you follow the steps of the analytical method of vector addition.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the north and east components of the displacement from San Francisco to Sacramento shown in [Figure 12](#Figure12).

![A map of northern California with a circle with a radius of one hundred twenty three kilometers centered on San Francisco. Sacramento lies on the circumference of this circle in a direction forty-five degrees north of east from San Francisco.](../resources/Figure_03_03_12.jpg)
{: #Figure12}

</div>
<div class="solution"  markdown="1">
North-component 87.0 km, east-component 87.0 km

</div>
</div>

<div class="exercise" id="problem" data-element-type="problems-exercises">
<div class="problem"  markdown="1">
Solve the following problem using analytical techniques: Suppose you walk 18.0 m straight west and then 25.0 m straight north. How far are you from your starting point, and what is the compass direction of a line connecting your starting point to your final position?
(If you represent the two legs of the walk as vector displacements $$ \vb{A} $$ and $$ \vb{B} $$, as in [Figure 13](#Figure13), then this problem asks you to
find their sum $$
\vb{R}=\vb{A}+\vb{B} $$.)

![In the given figure displacement of a person is shown. First movement of the person is shown as vector A from origin along negative x axis. They then turns to their right. Their movement is now shown as a vertical vector in north direction. The displacement vector R is also shown. In the question you are asked to find the displacement of the person from the start to finish.](../resources/Figure_03_03_13.jpg "The two displacements \( A \) and \( B \) add to give a total displacement \( R \) having magnitude \( R \) and direction \( \theta \) .")
{: #Figure13}

Note that you can also solve this graphically. Discuss why the analytical
technique for solving this problem is potentially more accurate than the
graphical technique.

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
Repeat the previous [Problem](#problem) using analytical techniques, but reverse the order of the two legs of the walk and show that you get the same final result.
(This problem shows that adding them in reverse order gives the same result—that is,
$$ \vb{B} + \vb{A} = \vb{A} + \vb{B} $$.) Discuss how taking another path to reach the same point might help to
overcome an obstacle blocking your other path.

</div>
<div class="solution"  markdown="1">
30.8 m, 35.8 west of north

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
You drive $$ 7.50 \text{km} $$ in a straight line in a direction $$ 15^\circ $$
east of north.
(a) Find the distances you would have to drive straight east and
then straight north to arrive at the same point. (This determination is
equivalent to find the components of the displacement along the east and north
directions.)
(b) Show that you still arrive at the same point if the east and
north legs are reversed in order.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Do [Problem](#problem) again using analytical techniques and change the second leg of the walk to $$ 25.0 \m  $$
straight south. (This is equivalent to subtracting $$ \vb{B} $$
from $$ \vb{A} $$
—that is, finding $$ \vb{R}^\prime =\vb{A} - \vb{B} $$)

(b) Repeat again, but now you first walk $$ 25.0 \m $$ north and then $$ 18.0 \m
$$ east. (This is equivalent to subtract $$ \vb{A} $$ from $$ \vb{B} $$ —that
is, to find $$ \vb{A}=\vb{B}+\vb{C} $$. Is that consistent with your result?)

</div>
<div class="solution" markdown="1">
(a) $$ 30.8 \m $$, $$ 54.2^\circ $$ south of west

(b) $$ 30.8 \m $$, $$ 54.2^\circ $$ north of east

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A new landowner has a triangular piece of flat land she wishes to fence. Starting at the west corner, she measures the first side to be 80.0 m long and the next to be 105 m. These sides are represented as displacement vectors $$ \vb{A} $$ from $$ \vb{B} $$
in [Figure 14](#Figure14). She then correctly calculates the length and
orientation of the third side $$ \text{C} $$. What is her result?

![In the given figure the sides of a triangular piece of land are shown in vector form. West corner is at origin. A vector starts from the origin towards south east direction and makes an angle twenty-one degrees with the horizontal. Then from the head of this vector another vector B making an angle eleven degrees with the vertical is drawn upwards. Then another vector C from the head of the vector B to the tail of the initial vector is drawn. The length and orientation of side C is indicated as unknown, represented by a question mark.](../resources/Figure_03_03_14.jpg)
{: #Figure14}

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
You fly $$ 32.0 \text{km} $$ in a straight line in still air in the direction $$ 35.0^\circ $$
south of west.
(a) Find the distances you would have to fly straight south and
then straight west to arrive at the same point. (This determination is
equivalent to finding the components of the displacement along the south and
west directions.)
(b) Find the distances you would have to fly first in a direction $$ 45.0^\circ $$
south of west and then in a direction $$ 45.0^\circ $$
west of north. These are the components of the displacement along a different
set of axes—one rotated $$ 45^\circ $$.

</div>
<div class="solution" markdown="1">
18.4 km south, then 26.2 km west(b) 31.5 km at $$ 45.0^\circ $$ south of west, then 5.56 km at $$ 45.0^\circ $$
west of north

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
A farmer wants to fence off their four-sided plot of flat land.
They measure the first three sides, shown as $$ \vb{A}, $$
$$ \vb{B}, $$ and $$ \vb{C} $$ in [Figure 15](#Figure15), and then correctly calculate the length and orientation of the fourth side $$
\vb{D} $$. What is their result?

![A quadrilateral with sides A, B, C, and D. A begins at the end of D and is 4 point seven zero kilometers  at an angle of 7 point 5 degrees south of west. B begins at the end of A and is 2 point four eight kilometers in a direction sixteen degrees west of north. C begins at the end of B and is 3 point zero 2 kilometers in a direction nineteen degrees north of west. D begins at the end of C and runs distance and direction that must be calculated](../resources/Figure_03_03_15.jpg)
{: #Figure15}

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In an attempt to escape his island, Gilligan builds a raft and sets to sea.
The wind shifts a great deal during the day, and he is blown along the following straight lines: $$ 2.50 \text{km} $$,
$$ 45.0^\circ $$ north of west; then $$ 4.70 \text{km} $$, $$ 60.0^\circ $$ south
of east; then $$ 1.30\text{km} $$,$$ 25.0^\circ $$ south of west; then $$ 5.10
\text{km} $$ straight east; then $$ 1.70\text{km} $$, $$ 5.00^\circ $$ east of
north; then $$ 7.20 \text{km} $$, $$ 55.0^\circ $$ south of west; and finally $$
2.80 \text{km} $$, $$ 10.0^\circ $$ north of east. What is his final position
relative to the island?

</div>
<div class="solution" markdown="1">
 $$ 7.34 \text{km} $$, $$ 63.5^\circ $$ south of east

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose a pilot flies $$ 40.0 \text{km} $$ in a direction $$ 60^\circ $$
north of east and then flies $$ 30.0 \text{km} $$
in a direction $$ 15^\circ $$
north of east as shown in [Figure 16](#Figure16). Find her total
distance $$ R $$
from the starting point and the direction $$ \theta $$
of the straight-line path to the final position. Discuss qualitatively how this
flight would be altered by a wind from the north and how the effect of the wind
would depend on both wind speed and the speed of the plane relative to the air
mass.

![A triangle  defined by vectors A, B, and R. A begins at the origin and run forty kilometers in a direction sixty degrees north of east. B begins at the end of A and runs thirty kilometers in a direction fifteen degrees north of east. R is the resultant vector and runs from the origin (the beginning of A) to the end of B for a distance and in a direction theta that need to be calculated.](../resources/Figure_03_03_16.jpg)
{: #Figure16}

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

analytical method
: the method of determining the magnitude and direction of a resultant vector
using the Pythagorean theorem and trigonometric identities

</div>
