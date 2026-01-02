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

![Diagram showing a current-carrying loop of width w and length l between the north and south poles of a magnet. The north pole is to the left and the south pole is to the right of the loop. The magnetic field B runs from the north pole across the loop to the south pole. The loop is shown at an instant, while rotating clockwise. The current runs up the left side of the loop, across the top, and down the right side. There is a force F oriented into the page on the left side of the loop and a force F oriented out of the page on the right side of the loop. The torque on the loop is clockwise as viewed from above.](../resources/Figure_22_08_01.jpg 'Torque on a current loop. A current-carrying loop of wire attached to a vertically rotating shaft feels magnetic forces that produce a clockwise torque as viewed from above.')
{: #Figure1}

Let us examine the force on each segment of the loop in [[Figure 1]](#Figure1)
to find the torques produced about the axis of the vertical shaft. (This will
lead to a useful equation for the torque on the loop.) We take the magnetic
field to be uniform over the rectangular loop, which has width$$ w$$ and height
$$ l$$ . First, we note that the forces on the top and bottom segments are
vertical and, therefore, parallel to the shaft, producing no torque. Those
vertical forces are equal in magnitude and opposite in direction, so that they
also produce no net force on the loop. [[Figure 2]](#Figure2) shows views of the
loop from above. Torque is defined as $$\tau = rF \sin \theta$$, where $$F$$
is the force, $$r$$ is the distance from the pivot that the force is applied,
and $$\theta$$ is the angle between $$r$$ and $$F$$. As seen
in [[Figure 2]](#Figure2)(a), right hand rule 1 gives the forces on the sides to
be equal in magnitude and opposite in direction, so that the net force is again
zero. However, each force produces a clockwise torque. Since $$r=w/2$$, the
torque on each vertical segment is $$\left(w/2\right)F \sin \theta$$, and the
two add to give a total torque.

<div class="equation">
$$\tau =\frac{w}{2}F \sin \theta +\frac{w}{2}F \sin \theta = w F \sin \theta$$
</div>

![Diagram showing a current-carrying loop from the top, and four different times as it rotates in a magnetic field. The magnetic field oriented toward the right, perpendicular to the vertical dimension of the loop. In figure a, the top view of the loop is oriented at an angle to the magnetic field lines, which run left to right. The force on the loop is up on the lower left side where the current comes out of the page. The force is down on the upper right side where the loop goes into the page. The angle between the force and the loop is theta. Torque is clockwise and equals w over 2 times I l B sine theta. Figure b shows the top view of the loop parallel to the magnetic field lines. The force on the loop is up on the left side where I comes out of the page. The force on the loop is down on the right side where I goes into the page. The angle theta between the F and B is ninety degrees. Torque is clockwise and equals w over 2 I l B equals maximum torque. Figure c shows the top view of the loop oriented perpendicular to B. The force on the loop is up at the top, where I comes out of the page, and down at the bottom where I goes into the page. Theta equals 0 degrees. Torque equals zero since sine theta equals 0. In figure d the force is down on the lower left side of the loop where I goes in, and up on the upper right side of the loop where I comes out. The torque is counterclockwise. Torque is negative.](../resources/Figure_22_08_02.jpg 'Top views of a current-carrying loop in a magnetic field. (a) The equation for torque is derived using this view. Note that the perpendicular to the loop makes an angle ( \\theta ) with the field that is the same as the angle between ( w/2 ) and ( F ) . (b) The maximum torque occurs when ( \\theta ) is a right angle and ( \\sin \\theta =1 ) . (c) Zero (minimum) torque occurs when ( \\theta ) is zero and ( \\sin \\theta =0 ) . (d) The torque reverses once the loop rotates past ( \\theta=0 ).')
{: #Figure2}

Now, each vertical segment has a length$$ l$$ that is perpendicular to$$B$$ ,
so that the force on each is$$ F=IlB$$ . Entering$$F$$ into the expression
for torque yields

<div class="equation">
$$\tau =wIlB \sin \theta$$
</div>

If we have a multiple loop of$$N$$ turns, we get$$N$$ times the torque of
one loop. Finally, note that the area of the loop is$$ A= wl$$ ; the expression
for the torque becomes

<div class="equation">
$$\tau =NIAB \sin \theta$$
</div>

This is the torque on a current-carrying loop in a uniform magnetic field. This
equation can be shown to be valid for a loop of any shape. The loop carries a
current$$I$$ , has$$N$$ turns, each of area$$A$$ , and the perpendicular
to the loop makes an angle$$\theta$$ with the field$$B$$. The net force on
the loop is zero.

<div class="example" markdown="1">
<div class="title">
Calculating Torque on a Current-Carrying Loop in a Strong Magnetic Field
</div>
Find the maximum torque on a 100-turn square loop of a wire of 10.0 cm on a side that carries 15.0 A of current in a 2.00-T field.

**Strategy**

Torque on the loop can be found using$$\tau =NIAB \sin \theta$$ . Maximum
torque occurs when$$\theta =90 ^\circ$$ and$$\sin \theta =1$$.

**Solution**

For$$\sin \theta =1$$, the maximum torque is

<div class="equation">
$${\tau }_{\text{max}}=NIAB$$
</div>
Entering known values yields

<div class="equation">
$$\begin{array}{lll}{\tau }_{\text{max}}& =& \left(100\right)\left(15.0 \text{A}\right)\left(0.100 {\text{m}}^{2}\right)\left(2.00 \text{T}\right)\\ & =& 30.0 \text{N}\cdot \text{m}\end{array}$$
</div>
**Discussion**

This torque is large enough to be useful in a motor.

</div>

The torque found in the preceding example is the maximum. As the coil rotates,
the torque decreases to zero at$$\theta =0$$ . The torque then _reverses_ its
direction once the coil rotates past$$\theta =0$$ .
(See [[Figure 2]](#Figure2)(d).) This means that, unless we do something, the
coil will oscillate back and forth about equilibrium at$$\theta =0$$ . To get
the coil to continue rotating in the same direction, we can reverse the current
as it passes through$$\theta =0$$ with automatic switches called _brushes_. (
See [\[Figure 3\]](#Figure3).)

![The diagram shows a current-carrying loop between the north and south poles of a magnet at two different times. The north pole is to the left and the south pole is to the right. The magnetic field runs from the north pole to the right to the south pole. Figure a shows the current running through the loop. It runs up on the left side, and down on the right side. The force on the left side is into the page. The force on the right side is out of the page. The torque is clockwise when viewed from above. Figure b shows the loop when it is oriented perpendicular to the magnet. In both diagrams, the bottom of each side of the loop is connected to a half-cylinder that is next to a rectangular brush that is then connected to the rest of the circuit.](../resources/Figure_22_08_03.jpg '(a) As the angular momentum of the coil carries it through ( \\theta =0 ), the brushes reverse the current to keep the torque clockwise. (b) The coil will rotate continuously in the clockwise direction, with the current reversing each half revolution to maintain the clockwise torque.')
{: #Figure3}

**Meters**, such as those in analog fuel gauges on a car, are another common
application of magnetic torque on a current-carrying
loop. [[Figure 4]](#Figure4) shows that a meter is very similar in construction
to a motor. The meter in the figure has its magnets shaped to limit the effect
of$$\theta$$ by making$$B$$ perpendicular to the loop over a large angular
range. Thus the torque is proportional to$$I$$ and not$$\theta$$ . A linear
spring exerts a counter-torque that balances the current-produced torque. This
makes the needle deflection proportional to$$I$$ . If an exact proportionality
cannot be achieved, the gauge reading can be calibrated. To produce a
galvanometer for use in analog voltmeters and ammeters that have a low
resistance and respond to small currents, we use a large loop area$$A$$ , high
magnetic field$$B$$ , and low-resistance coils.

![Diagram of a meter showing a current-carrying loop between two poles of a magnet. The torque on the magnet is clockwise. The top of the loop is connected to a spring and to a pointer that points to a scale as the loop rotates.](../resources/Figure_22_08_04.jpg 'Meters are very similar to motors but only rotate through a part of a revolution. The magnetic poles of this meter are shaped to keep the component of ( B ) perpendicular to the loop constant, so that the torque does not depend on ( \\theta ) and the deflection against the return spring is proportional only to the current ( I ) .')
{: #Figure4}

### Section Summary

- The torque$$\tau$$ on a current-carrying loop of any shape in a uniform
  magnetic field is
  <div class="equation">
$$\tau =NIAB \sin \theta$$
  </div>
     where$$N$$ is the number of turns,
$$I$$ is the current,$$A$$ is the area of the loop,
$$B$$ is the magnetic field strength, and
$$\theta$$ is the angle between the perpendicular to the loop and the magnetic field.

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

**Strategy**

Since torque is$$\tau = NIAB\sin\theta$$, it is directly proportional to the magnetic field strength$$B$$. If$$B$$ decreases by some percentage,$$\tau$$ decreases by the same percentage. To restore the original torque with reduced$$B$$, we must increase$$I$$ proportionally.

**Solution**

**(a) Percent decrease in torque:**

Since$$\tau \propto B$$:

$$\frac{\Delta\tau}{\tau_0} = \frac{\Delta B}{B_0}$$

If$$B$$ decreases by 5.00%, then$$\tau$$ also **decreases by 5.00%**.

**(b) Required current increase:**

Let$$ B' = 0.950 B_0$$ (5% reduction). For the torque to return to$$\tau_0$$:

$$\tau_0 = NI'AB'\sin\theta = NI'A(0.950 B_0)\sin\theta$$

Since originally$$\tau_0 = NI_0AB_0\sin\theta$$:

$$ I' = \frac{I_0}{0.950} = 1.0526 I_0$$

The current must increase by$$\frac{1.0526 - 1}{1} \times 100\% = 5.26\%$$.

**Discussion**

This is an inverse proportionality: a 5% decrease in$$B$$ requires slightly more than a 5% increase in$$I$$ to compensate (specifically,$$1/0.95 = 1.0526$$). This relationship is important for motor performance as permanent magnets age and lose strength.

**(a) The torque decreases by 5.00%.**

**(b) The current must increase by 5.26% to restore the original torque.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the maximum torque on a 150-turn square loop of wire 18.0 cm on a side that carries a 50.0-A current in a 1.60-T field? (b) What is the torque when$$\theta$$  is$$ 10.9º$$ ?
</div>
<div class="solution" markdown="1">

**Strategy**

We use$$\tau = NIAB\sin\theta$$. Maximum torque occurs when$$\sin\theta = 1$$ (i.e.,$$\theta = 90°$$). The area of the square loop is$$ A = s^2$$ where$$ s$$ is the side length.

**Solution**

*Known quantities:*
- Number of turns:$$ N = 150$$
- Side length:$$ s = 18.0 \text{ cm} = 0.180 \text{ m}$$
- Current:$$ I = 50.0 \text{ A}$$
- Magnetic field:$$ B = 1.60 \text{ T}$$

*Area of the loop:*
$$ A = s^2 = (0.180 \text{ m})^2 = 0.0324 \text{ m}^2$$

**(a) Maximum torque ($$\theta = 90°$$):**

$$\tau_{\max} = NIAB = (150)(50.0 \text{ A})(0.0324 \text{ m}^2)(1.60 \text{ T})$$

$$\tau_{\max} = 389 \text{ N·m}$$

**(b) Torque at$$\theta = 10.9°$$:**

$$\tau = NIAB\sin\theta = (389 \text{ N·m})(\sin 10.9°)$$

$$\tau = (389)(0.189) = 73.5 \text{ N·m}$$

**Discussion**

The torque of 389 N·m at maximum is quite large—comparable to the torque output of a small car engine. At$$\theta = 10.9°$$, the torque drops to about 19% of maximum because$$\sin(10.9°) \approx 0.19$$. Motors are designed to operate near$$\theta = 90°$$ for maximum efficiency.

**(a) The maximum torque is 389 N·m.**

**(b) The torque at$$\theta = 10.9°$$ is 73.5 N·m.**

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
Find the current through a loop needed to create a maximum torque of$$9.00 \text{N}\cdot \text{m} \text{.}$$
 The loop has 50 square turns that are 15.0 cm on a side and is in a uniform 0.800-T magnetic field.

</div>
<div class="solution"  markdown="1">

**Strategy**

We use$$\tau_{\max} = NIAB$$ and solve for$$I$$. The area of the square loop is$$ A = s^2$$.

**Solution**

*Known quantities:*
- Maximum torque:$$\tau_{\max} = 9.00 \text{ N·m}$$
- Number of turns:$$ N = 50$$
- Side length:$$ s = 15.0 \text{ cm} = 0.150 \text{ m}$$
- Magnetic field:$$ B = 0.800 \text{ T}$$

*Area:*
$$ A = s^2 = (0.150 \text{ m})^2 = 0.0225 \text{ m}^2$$

Solving for current:

$$ I = \frac{\tau_{\max}}{NAB}$$

$$ I = \frac{9.00 \text{ N·m}}{(50)(0.0225 \text{ m}^2)(0.800 \text{ T})}$$

$$ I = \frac{9.00}{0.900} = 10.0 \text{ A}$$

**Discussion**

This is a moderate current for a practical motor or demonstration device. The loop would need to handle 10 A without overheating, which requires appropriately sized wire.

**The required current is 10.0 A.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the magnetic field strength needed on a 200-turn square loop 20.0 cm on a side to create a maximum torque of$$300 \text{N}\cdot \text{m}$$  if the loop is carrying 25.0 A.

</div>
<div class="solution" markdown="1">

**Strategy**

We use$$\tau_{\max} = NIAB$$ and solve for$$B$$.

**Solution**

*Known quantities:*
- Maximum torque:$$\tau_{\max} = 300 \text{ N·m}$$
- Number of turns:$$ N = 200$$
- Side length:$$ s = 20.0 \text{ cm} = 0.200 \text{ m}$$
- Current:$$ I = 25.0 \text{ A}$$

*Area:*
$$ A = s^2 = (0.200 \text{ m})^2 = 0.0400 \text{ m}^2$$

$$ B = \frac{\tau_{\max}}{NIA}$$

$$ B = \frac{300 \text{ N·m}}{(200)(25.0 \text{ A})(0.0400 \text{ m}^2)}$$

$$ B = \frac{300}{200} = 1.50 \text{ T}$$

**Discussion**

A 1.50 T field is achievable with strong permanent magnets or electromagnets. This torque of 300 N·m is substantial—comparable to a car engine.

**The required magnetic field strength is 1.50 T.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Since the equation for torque on a current-carrying loop is$$\tau =NIAB \sin \theta$$ , the units of$$ \text{N} \cdot \text{m}$$  must equal units of$$\text{A}\cdot {m}^{2} \text{T}$$. Verify this.

</div>
<div class="solution" markdown="1">

**Strategy**

We use the definition of the tesla in terms of base SI units:$$1 \text{ T} = 1 \text{ N/(A·m)}$$, and show that the units work out correctly.

**Solution**

Starting with the units on the right side:

$$[\text{A} \cdot \text{m}^2 \cdot \text{T}]$$

Substituting the definition of tesla:

$$= \text{A} \cdot \text{m}^2 \cdot \frac{\text{N}}{\text{A} \cdot \text{m}}$$

The amperes cancel:

$$= \text{m}^2 \cdot \frac{\text{N}}{\text{m}}$$

One meter cancels:

$$= \text{m} \cdot \text{N} = \text{N·m}$$

This confirms that$$[\text{A} \cdot \text{m}^2 \cdot \text{T}] = [\text{N·m}]$$ ✓

**Discussion**

This dimensional analysis verifies the consistency of the torque equation. The tesla was defined precisely so that electromagnetic equations like this one have consistent units. The fact that$$N$$ (number of turns) and$$\sin\theta$$ are dimensionless doesn't affect this analysis.

**Verified:$$\text{A} \cdot \text{m}^{2} \cdot \text{T} = \text{A} \cdot \text{m}^{2} \cdot \frac{\text{N}}{\text{A} \cdot \text{m}} = \text{N·m}$$.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) At what angle$$\theta$$
 is the torque on a current loop 90.0% of maximum? (b) 50.0% of maximum? (c) 10.0% of maximum?

</div>
<div class="solution" markdown="1">

**Strategy**

Since$$\tau = \tau_{\max}\sin\theta$$, we have$$\tau/\tau_{\max} = \sin\theta$$. We solve for$$\theta = \arcsin(\tau/\tau_{\max})$$.

**Solution**

**(a) 90.0% of maximum:**

$$\sin\theta = 0.900$$

$$\theta = \arcsin(0.900) = 64.2°$$

**(b) 50.0% of maximum:**

$$\sin\theta = 0.500$$

$$\theta = \arcsin(0.500) = 30.0°$$

**(c) 10.0% of maximum:**

$$\sin\theta = 0.100$$

$$\theta = \arcsin(0.100) = 5.74°$$

**Discussion**

These results show that torque drops off slowly at first but then rapidly as$$\theta$$ decreases. At 64°, we still have 90% of max torque, but we need to be at only 5.7° to get down to 10%. This is because the sine function has its steepest slope near$$\theta = 0°$$. Motors use commutators to keep the coil near$$\theta = 90°$$ where torque is maximum.

**(a)$$\theta = 64.2°$$**

**(b)$$\theta = 30.0°$$**

**(c)$$\theta = 5.74°$$**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A proton has a magnetic field due to its spin on its axis. The field is similar to that created by a circular current loop$$ 0.650 \times 10^{-15}  m$$ in radius with a current of$$ 1.05 \times 10^{4}  A$$
 (no kidding). Find the maximum torque on a proton in a 2.50-T field. (This is a significant torque on a small particle.)

</div>
<div class="solution" markdown="1">

**Strategy**

We model the proton's magnetic moment as a circular current loop and use the torque formula$$\tau_{\max} = NIAB$$. The area is$$ A = \pi r^2$$ where$$ r$$ is the "radius" of the effective current loop.

**Solution**

*Known quantities:*
- Equivalent radius:$$ r = 0.650 \times 10^{-15} \text{ m}$$
- Equivalent current:$$ I = 1.05 \times 10^{4} \text{ A}$$
- Magnetic field:$$ B = 2.50 \text{ T}$$
- Number of turns:$$ N = 1$$

*Area of the loop:*
$$ A = \pi r^2 = \pi (0.650 \times 10^{-15} \text{ m})^2 = 1.33 \times 10^{-30} \text{ m}^2$$

*Maximum torque:*
$$\tau_{\max} = NIAB = (1)(1.05 \times 10^{4} \text{ A})(1.33 \times 10^{-30} \text{ m}^2)(2.50 \text{ T})$$

$$\tau_{\max} = 3.49 \times 10^{-26} \text{ N·m}$$

**Discussion**

This tiny torque on a single proton is indeed significant at the atomic scale. It's responsible for nuclear magnetic resonance (NMR) and MRI imaging. The torque causes protons to precess in the magnetic field at a characteristic frequency (the Larmor frequency), which is detected to create medical images. The enormous "equivalent current" comes from the extremely rapid quantum mechanical spin of the proton.

**The maximum torque on the proton is$$3.48 \times 10^{-26}$$ N·m.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A 200-turn circular loop of radius 50.0 cm is vertical, with its axis on an east-west line. A current of 100 A circulates clockwise in the loop when viewed from the east. The Earth's field here is due north, parallel to the ground, with a strength of$$ 3.00 \times 10^{-5} \text{T}$$ .
 What are the direction and magnitude of the torque on the loop? (b) Does this device have any practical applications as a motor?

</div>
<div class="solution" markdown="1">

**Strategy**

The loop is vertical with its axis east-west, and the field points north. The magnetic moment of the loop points along its axis. We need to find the angle between the magnetic moment and the field to calculate torque. The direction comes from the right-hand rule for magnetic moment (fingers curl with current, thumb points along moment).

**Solution**

*Known quantities:*
- Number of turns:$$ N = 200$$
- Radius:$$ r = 50.0 \text{ cm} = 0.500 \text{ m}$$
- Current:$$ I = 100 \text{ A}$$
- Magnetic field:$$ B = 3.00 \times 10^{-5} \text{ T}$$ (pointing north)

*Area of the loop:*
$$ A = \pi r^2 = \pi (0.500)^2 = 0.785 \text{ m}^2$$

**(a) Magnitude and direction:**

The loop is vertical with axis east-west. Current flows clockwise when viewed from the east, so by the right-hand rule, the magnetic moment points **west**.

The field points north. The angle between the moment (west) and the field (north) is$$\theta = 90°$$.

$$\tau = NIAB\sin\theta = NIAB$$

$$\tau = (200)(100 \text{ A})(0.785 \text{ m}^2)(3.00 \times 10^{-5} \text{ T})$$

$$\tau = 0.471 \text{ N·m}$$

Direction: The torque is$$\boldsymbol{\tau} = \boldsymbol{\mu} \times \boldsymbol{B}$$ (west × north = upward, but torque tends to align moment with field). The torque acts to rotate the loop so that its moment aligns with the field—this means the torque is directed **downward** (or the loop tries to tip so the west-pointing moment rotates toward north).

**(b) Practical application as a motor:**

This would be an impractical motor:
- The torque of 0.47 N·m is very weak for the size and current
- Earth's field is too weak for practical motor applications
- The current would need to be reversed to continue rotation
- Efficiency would be extremely low

**Discussion**

Motors require strong magnetic fields (typically 0.1–2 T from permanent magnets or electromagnets), not Earth's field ($$\sim 3 \times 10^{-5}$$ T). The field is about 10,000 times too weak for practical use.

**(a) The torque magnitude is 0.471 N·m. The direction is such that the loop tends to rotate about a vertical axis, bringing the magnetic moment from west toward north.**

**(b) This device would not be practical as a motor due to the extremely weak torque from Earth's field, which is about 10,000 times weaker than fields used in actual motors.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Repeat [[Exercise 1]](#Exercise1), but with the loop lying flat on the ground with its current circulating counterclockwise (when viewed from above) in a location where the Earth's field is north, but at an angle$$ 45.0º$$
 below the horizontal and with a strength of$$6.00\times 10^{-5} \text{T}$$.

</div>
<div class="solution" markdown="1">

**Strategy**

With the loop flat on the ground and current counterclockwise (viewed from above), the magnetic moment points **upward** (by right-hand rule). The field points north but 45° below horizontal, so it has both a horizontal (north) and vertical (downward) component. Only the horizontal component creates torque.

**Solution**

*Known quantities (same as Exercise 1):*
-$$ N = 200$$,$$ r = 0.500$$ m,$$ I = 100$$ A
-$$ A = 0.785 \text{ m}^2$$
- Magnetic field:$$ B = 6.00 \times 10^{-5} \text{ T}$$, 45° below horizontal

**(a) Magnitude and direction:**

The magnetic moment$$\boldsymbol{\mu}$$ points upward (out of the ground).

The field has components:
- Horizontal:$$ B_H = B\cos(45°) = (6.00 \times 10^{-5})\cos(45°)$$ (north)
- Vertical:$$ B_V = B\sin(45°)$$ (downward)

The angle between the upward moment and the field (pointing north and downward at 45°) is$$90° + 45° = 135°$$ from the horizontal field component's perspective. However, since the moment is vertical, we find the torque as:

$$\tau = NIAB\sin\theta$$

The angle$$\theta$$ between the magnetic moment (vertical, upward) and the field (north, 45° below horizontal) is:

$$\theta = 90° + 45° = 135°$$ from moment to field...

Actually, more simply: the moment is perpendicular to the horizontal, so the torque comes from the horizontal component of$$B$$:

$$\tau = NIAB_H = NIA(B\cos 45°)$$

$$\tau = (200)(100)(0.785)(6.00 \times 10^{-5})(\cos 45°)$$

$$\tau = (200)(100)(0.785)(6.00 \times 10^{-5})(0.707)$$

$$\tau = 0.666 \text{ N·m}$$

Direction:$$\boldsymbol{\tau} = \boldsymbol{\mu} \times \boldsymbol{B}$$. With moment up and horizontal field component north, the torque points **west**.

**(b) Practical considerations:**

Same as before—this is not practical as a motor due to the weak field of Earth.

**Discussion**

The vertical component of the field doesn't contribute to torque because it's parallel to the magnetic moment. Only the horizontal component ($$ B\cos 45°$$) creates torque.

**(a) The torque is 0.666 N·m directed west.**

**(b) This would not be practical as a motor. The torque is weak, and the current would need to alternate to produce continuous rotation (otherwise the loop would just oscillate about its equilibrium position).**

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
similar in construction to a motor; by design, the torque is proportional to$$I$$ and not$$\theta$$, so the needle deflection is proportional to the current

</div>
