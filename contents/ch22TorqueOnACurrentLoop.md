---
title: 'Torque on a Current Loop: Motors and Meters'
layout: page
sectionNumber: 8
chapterNumber: 22
---

<div class="abstract" markdown="1">
* Describe how motors and meters work in terms of torque on a current loop.
* Calculate the torque on a current-carrying loop in a magnetic field.
</div>

**Motors** are the most common application of magnetic force on current-carrying
wires. Motors have loops of wire in a magnetic field. When current is passed
through the loops, the magnetic field exerts torque on the loops, which rotates
a shaft. Electrical energy is converted to mechanical work in the process. (
See [[Figure 1]](#Figure1).)

![Diagram showing a current-carrying loop of width w and length l between the north and south poles of a magnet. The north pole is to the left and the south pole is to the right of the loop. The magnetic field B runs from the north pole across the loop to the south pole. The loop is shown at an instant, while rotating clockwise. The current runs up the left side of the loop, across the top, and down the right side. There is a force F oriented into the page on the left side of the loop and a force F oriented out of the page on the right side of the loop. The torque on the loop is clockwise as viewed from above.](../resources/Figure_22_08_01.jpg "Torque on a current loop. A current-carrying loop of wire attached to a vertically rotating shaft feels magnetic forces that produce a clockwise torque as viewed from above.")
{: #Figure1}

Let us examine the force on each segment of the loop in [[Figure 1]](#Figure1)
to find the torques produced about the axis of the vertical shaft. (This will
lead to a useful equation for the torque on the loop.) We take the magnetic
field to be uniform over the rectangular loop, which has width $$w $$ and height
$$l $$ . First, we note that the forces on the top and bottom segments are
vertical and, therefore, parallel to the shaft, producing no torque. Those
vertical forces are equal in magnitude and opposite in direction, so that they
also produce no net force on the loop. [[Figure 2]](#Figure2) shows views of the
loop from above. Torque is defined as $$\tau = rF \sin \theta $$ , where $$F $$
is the force, $$r $$ is the distance from the pivot that the force is applied,
and $$\theta $$ is the angle between $$r $$ and $$F $$ . As seen
in [[Figure 2]](#Figure2)(a), right hand rule 1 gives the forces on the sides to
be equal in magnitude and opposite in direction, so that the net force is again
zero. However, each force produces a clockwise torque. Since $$r=w/2 $$ , the
torque on each vertical segment is $$\left(w/2\right)F \sin \theta $$ , and the
two add to give a total torque.

<div class="equation" >
 $$\tau =\frac{w}{2}F \sin \theta +\frac{w}{2}F \sin \theta = w F \sin \theta  $$
</div>

![Diagram showing a current-carrying loop from the top, and four different times as it rotates in a magnetic field. The magnetic field oriented toward the right, perpendicular to the vertical dimension of the loop. In figure a, the top view of the loop is oriented at an angle to the magnetic field lines, which run left to right. The force on the loop is up on the lower left side where the current comes out of the page. The force is down on the upper right side where the loop goes into the page. The angle between the force and the loop is theta. Torque is clockwise and equals w over 2 times I l B sine theta. Figure b shows the top view of the loop parallel to the magnetic field lines. The force on the loop is up on the left side where I comes out of the page. The force on the loop is down on the right side where I goes into the page. The angle theta between the F and B is ninety degrees. Torque is clockwise and equals w over 2 I l B equals maximum torque. Figure c shows the top view of the loop oriented perpendicular to B. The force on the loop is up at the top, where I comes out of the page, and down at the bottom where I goes into the page. Theta equals 0 degrees. Torque equals zero since sine theta equals 0. In figure d the force is down on the lower left side of the loop where I goes in, and up on the upper right side of the loop where I comes out. The torque is counterclockwise. Torque is negative.](../resources/Figure_22_08_02.jpg "Top views of a current-carrying loop in a magnetic field. (a) The equation for torque is derived using this view. Note that the perpendicular to the loop makes an angle \( \theta \) with the field that is the same as the angle between \( w/2 \) and \( F \) . (b) The maximum torque occurs when \( \theta \) is a right angle and \( \sin \theta =1 \) . (c) Zero (minimum) torque occurs when \( \theta \) is zero and \( \sin \theta =0 \) . (d) The torque reverses once the loop rotates past \( \theta=0 \).")
{: #Figure2}

Now, each vertical segment has a length $$l $$ that is perpendicular to $$B $$ ,
so that the force on each is $$F=IlB $$ . Entering $$F $$ into the expression
for torque yields

<div class="equation" >
 $$\tau =wIlB  \sin \theta . $$
</div>

If we have a multiple loop of $$N $$ turns, we get $$N $$ times the torque of
one loop. Finally, note that the area of the loop is $$A= wl $$ ; the expression
for the torque becomes

<div class="equation" >
 $$\tau =NIAB \sin \theta . $$
</div>

This is the torque on a current-carrying loop in a uniform magnetic field. This
equation can be shown to be valid for a loop of any shape. The loop carries a
current $$I $$ , has $$N $$ turns, each of area $$A $$ , and the perpendicular
to the loop makes an angle $$\theta $$ with the field $$B $$. The net force on
the loop is zero.

<div class="example" markdown="1">
<div class="title">
Calculating Torque on a Current-Carrying Loop in a Strong Magnetic Field
</div>
Find the maximum torque on a 100-turn square loop of a wire of 10.0 cm on a side that carries 15.0 A of current in a 2.00-T field.

**Strategy**

Torque on the loop can be found using $$\tau =NIAB \sin \theta $$ . Maximum
torque occurs when $$\theta =90 ^\circ $$ and $$\sin \theta =1 $$.

**Solution**

For $$\sin \theta =1 $$, the maximum torque is

<div class="equation" >
 $${\tau }_{\text{max}}=NIAB. $$
</div>
Entering known values yields

<div class="equation" >
 $$\begin{array}{lll}{\tau }_{\text{max}}& =& \left(100\right)\left(15.0 \text{A}\right)\left(0.100 {\text{m}}^{2}\right)\left(2.00 \text{T}\right)\\ & =& 30.0 \text{N}\cdot \text{m}.\end{array} $$
</div>
**Discussion**

This torque is large enough to be useful in a motor.

</div>

The torque found in the preceding example is the maximum. As the coil rotates,
the torque decreases to zero at $$\theta =0 $$ . The torque then *reverses* its
direction once the coil rotates past $$\theta =0 $$ .
(See [[Figure 2]](#Figure2)(d).) This means that, unless we do something, the
coil will oscillate back and forth about equilibrium at $$\theta =0 $$ . To get
the coil to continue rotating in the same direction, we can reverse the current
as it passes through $$\theta =0 $$ with automatic switches called *brushes*. (
See [\[Figure 3\]](#Figure3).)

![The diagram shows a current-carrying loop between the north and south poles of a magnet at two different times. The north pole is to the left and the south pole is to the right. The magnetic field runs from the north pole to the right to the south pole. Figure a shows the current running through the loop. It runs up on the left side, and down on the right side. The force on the left side is into the page. The force on the right side is out of the page. The torque is clockwise when viewed from above. Figure b shows the loop when it is oriented perpendicular to the magnet. In both diagrams, the bottom of each side of the loop is connected to a half-cylinder that is next to a rectangular brush that is then connected to the rest of the circuit.](../resources/Figure_22_08_03.jpg "(a) As the angular momentum of the coil carries it through \( \theta =0 \), the brushes reverse the current to keep the torque clockwise. (b) The coil will rotate continuously in the clockwise direction, with the current reversing each half revolution to maintain the clockwise torque.")
{: #Figure3}

**Meters**, such as those in analog fuel gauges on a car, are another common
application of magnetic torque on a current-carrying
loop. [[Figure 4]](#Figure4) shows that a meter is very similar in construction
to a motor. The meter in the figure has its magnets shaped to limit the effect
of $$\theta $$ by making $$B $$ perpendicular to the loop over a large angular
range. Thus the torque is proportional to $$I $$ and not $$\theta $$ . A linear
spring exerts a counter-torque that balances the current-produced torque. This
makes the needle deflection proportional to $$I $$ . If an exact proportionality
cannot be achieved, the gauge reading can be calibrated. To produce a
galvanometer for use in analog voltmeters and ammeters that have a low
resistance and respond to small currents, we use a large loop area $$A $$ , high
magnetic field $$B $$ , and low-resistance coils.

![Diagram of a meter showing a current-carrying loop between two poles of a magnet. The torque on the magnet is clockwise. The top of the loop is connected to a spring and to a pointer that points to a scale as the loop rotates.](../resources/Figure_22_08_04.jpg "Meters are very similar to motors but only rotate through a part of a revolution. The magnetic poles of this meter are shaped to keep the component of \( B \) perpendicular to the loop constant, so that the torque does not depend on \( \theta \) and the deflection against the return spring is proportional only to the current \( I \) .")
{: #Figure4}

### Section Summary

* The torque $$\tau $$ on a current-carrying loop of any shape in a uniform
  magnetic field is
  <div class="equation" >
   $$\tau =NIAB \sin \theta , $$
  </div>
     where    $$N $$ is the number of turns,
   $$I $$ is the current,    $$A $$ is the area of the loop,
   $$B $$ is the magnetic field strength, and
   $$\theta  $$ is the angle between the perpendicular to the loop and the magnetic field.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Draw a diagram and use RHR-1 to show that the forces on the top and bottom segments of the motor’s current loop in [[Figure 1]](#Figure1) are vertical and produce no torque about the axis of rotation.

</div>
</div>

### Problems &amp; Exercises

<div id="Exercise1" class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) By how many percent is the torque of a motor decreased if its permanent magnets lose 5.0% of their strength? (b) How many percent would the current need to be increased to return the torque to original values?

</div>
<div class="solution" markdown="1">
(a)  $$\tau $$ decreases by 5.00% if B decreases by 5.00%

(b) 5.26% increase

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the maximum torque on a 150-turn square loop of wire 18.0 cm on a side that carries a 50.0-A current in a 1.60-T field? (b) What is the torque when  $$\theta  $$  is  $$ 10.9º$$ ?
</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
Find the current through a loop needed to create a maximum torque of  $$9.00 \text{N}\cdot \text{m} \text{.}  $$
 The loop has 50 square turns that are 15.0 cm on a side and is in a uniform 0.800-T magnetic field.

</div>
<div class="solution"  markdown="1">
10.0 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the magnetic field strength needed on a 200-turn square loop 20.0 cm on a side to create a maximum torque of  $$300 \text{N}\cdot \text{m} $$  if the loop is carrying 25.0 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Since the equation for torque on a current-carrying loop is  $$\tau =NIAB \sin \theta  $$ , the units of  $$ \text{N} \cdot \text{m} $$  must equal units of  $$\text{A}\cdot {m}^{2} \text{T} $$. Verify this.

</div>
<div class="solution" markdown="1">
 $$\text{A} \cdot {m}^{2}\cdot \text{T}=\text{A} \cdot {m}^{2}\left(\frac{N}{\text{A} \cdot \text{m}}\right)=\text{N} \cdot \text{m} $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) At what angle  $$\theta  $$
 is the torque on a current loop 90.0% of maximum? (b) 50.0% of maximum? (c) 10.0% of maximum?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A proton has a magnetic field due to its spin on its axis. The field is similar to that created by a circular current loop  $$ 0.650 \times 10^{-15}  m $$ in radius with a current of  $$ 1.05 \times 10^{4}  A $$
 (no kidding). Find the maximum torque on a proton in a 2.50-T field. (This is a significant torque on a small particle.)

</div>
<div class="solution" markdown="1">
 $$ 3.48 \times 10^{-26} \text{N} \cdot \text{m} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A 200-turn circular loop of radius 50.0 cm is vertical, with its axis on an east-west line. A current of 100 A circulates clockwise in the loop when viewed from the east. The Earth’s field here is due north, parallel to the ground, with a strength of  $$ 3.00 \times 10^{-5} \text{T} $$ .
 What are the direction and magnitude of the torque on the loop? (b) Does this device have any practical applications as a motor?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [[Exercise 1]](#Exercise1), but with the loop lying flat on the ground with its current circulating counterclockwise (when viewed from above) in a location where the Earth’s field is north, but at an angle  $$ 45.0º $$
 below the horizontal and with a strength of  $$6.00\times 10^{-5} \text{T} $$.

</div>
<div class="solution" markdown="1">
(a)  $$0.666 \text{N}\cdot \text{m} $$  west

(b) This is not a very significant torque, so practical use would be limited.
Also, the current would need to be alternated to make the loop rotate (otherwise
it would oscillate).

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

motor
: loop of wire in a magnetic field; when current is passed through the loops,
the magnetic field exerts torque on the loops, which rotates a shaft; electrical
energy is converted to mechanical work in the process

meter
: common application of magnetic torque on a current-carrying loop that is very
similar in construction to a motor; by design, the torque is proportional to $$I
$$ and not $$\theta $$, so the needle deflection is proportional to the current

</div>
