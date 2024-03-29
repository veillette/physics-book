---
title: Flow Rate and Its Relation to Velocity
layout: page
sectionNumber: 1
chapterNumber: 12
---

<div class="abstract" markdown="1">
* Calculate flow rate.
* Define units of volume.
* Describe incompressible fluids.
* Explain the consequences of the equation of continuity.
</div>

**Flow rate** $$Q $$ is defined to be the volume of fluid passing by some
location through an area during a period of time, as seen in [[Figure 1]](#Figure1).
In symbols, this can be written as

<div class="equation">
 $$Q=\frac{V}{t}\text{,} $$
</div>

where $$V $$ is the volume and $$t $$ is the elapsed time.

![The figure shows a fluid flowing through a cylindrical pipe open at both ends. A portion of the cylindrical pipe with the fluid is shaded for a length d. The velocity of the fluid in the shaded region is shown by v toward the right. The cross sections of the shaded cylinder are marked as A. This cylinder of fluid flows past a point P on the cylindrical pipe. The velocity v is equal to d over t.](../resources/Figure_12_01_01.jpg "Flow rate is the volume of fluid per unit time flowing past a point through the area \(A\) . Here the shaded cylinder of fluid flows past point \(P\)  in a uniform pipe in time \(t\) . The volume of the cylinder is  \(Ad\)  and the average velocity is  \( \bar{v}=d/t \) so that the flow rate is  \( Q=Ad/t=A\bar{v} \) .)")
{: #Figure1}

The SI unit for flow rate is $${\text{m}}^{3}\text{/s} $$ , but a number of
other units for $$Q $$ are in common use. For example, the heart of a resting
adult pumps blood at a rate of 5.00 liters per minute (L/min). Note that a **liter** (L) is 1/1000 of a cubic meter or 1000 cubic centimeters ( $$10^{-3}
{\text{m}}^{3} $$ or $$10^{3} {\text{cm}}^{3} $$ ). In this text we shall use
whatever metric units are most convenient for a given situation.

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating Volume from Flow Rate: The Heart Pumps a Lot of Blood in a Lifetime
</div>
How many cubic meters of blood does the heart pump in a 75-year lifetime, assuming the average flow rate is 5.00 L/min?

**Strategy**

Time and flow rate $$Q $$ are given, and so the volume $$V $$ can be calculated
from the definition of flow rate.

**Solution**

Solving $$Q=V/t $$ for volume gives

<div class="equation">
 $$V=Qt \text{.} $$
</div>
Substituting known values yields

<div class="equation">
 $$\begin{array}{lll}V& =& \left(\frac{ 5.00 \text{L}}{1 \text{min}}\right)\left(75 \text{y}\right)\left(\frac{1 {\text{m}}^{3}}{ 10^{3} \text{L}}\right)\left( 5.26 \times 10^{5} \frac{\text{min}}{\text{y}}\right)\\  & =&  2.0 \times 10^{5}  {\text{m}}^{3}\text{.}\end{array} $$
</div>
**Discussion**

This amount is about 200 000 tons of blood. For comparison, this value is
equivalent to about 200 times the volume of water contained in a 6-lane 50-m lap
pool.

</div>

Flow rate and velocity are related, but quite different, physical quantities. To
make the distinction clear, think about the flow rate of a river. The greater
the velocity of the water, the greater the flow rate of the river. But flow rate
also depends on the size of the river. A rapid mountain stream carries far less
water than the Amazon River in Brazil, for example. The precise relationship
between flow rate $$Q $$ and velocity $$\overline{v} $$ is

<div class="equation">
 $$Q=A\overline{v}\text{,} $$
</div>

where $$A $$ is the cross-sectional area and $$\overline{v} $$ is the average
velocity. This equation seems logical enough. The relationship tells us that
flow rate is directly proportional to both the magnitude of the average
velocity (hereafter referred to as the speed) and the size of a river, pipe, or
other conduit. The larger the conduit, the greater its cross-sectional
area. [[Figure 1]](#Figure1) illustrates how this relationship is obtained. The
shaded cylinder has a volume

<div class="equation">
 $$V=Ad \text{,} $$
</div>

which flows past the point $$\text{P} $$ in a time $$t $$ . Dividing both sides
of this relationship by $$t $$ gives

<div class="equation">
 $$\frac{V}{t}=\frac{Ad}{t}\text{.} $$
</div>



We note that $$Q=V/t $$ and the average speed is $$\overline{v}=d/t $$ . Thus,
the equation becomes $$Q=A\overline{v} $$.

[[Figure 2]](#Figure2) shows an incompressible fluid flowing along a pipe of
decreasing radius. Because the fluid is incompressible, the same amount of fluid
must flow past any point in the tube in a given time to ensure continuity of
flow. In this case, because the cross-sectional area of the pipe decreases, the
velocity must necessarily increase. This logic can be extended to say that the
flow rate must be the same at all points along the pipe. In particular, for
points 1 and 2,

<div class="equation">
 $$\left. \begin{array}{c}{Q}_{1}={Q}_{2}\\ {A}_{1}{\overline{v}}_{1}={A}_{2}{\overline{v}}_{2}\end{array}\right\}\text{.} $$
</div>

This is called the equation of continuity and is valid for any incompressible
fluid. The consequences of the equation of continuity can be observed when water
flows from a hose into a narrow spray nozzle: it emerges with a large speed—that
is the purpose of the nozzle. Conversely, when a river empties into one end of a
reservoir, the water slows considerably, perhaps picking up speed again when it
leaves the other end of the reservoir. In other words, speed increases when
cross-sectional area decreases, and speed decreases when cross-sectional area
increases.

![The figure shows a cylindrical tube broad at the left and narrow at the right. The fluid is shown to flow through the cylindrical tube toward right along the axis of the tube. A shaded area is marked on the broader cylinder on the left. A cross section is marked on it as A one. A point one is marked on this cross section. The velocity of the fluid through the shaded area on narrow tube is marked by v one as an arrow toward right. Another shaded area is marked on the narrow cylindrical on the right. The shaded area on narrow tube is longer than the one on broader tube to show that when a tube narrows, the same volume occupies a greater length. A cross section is marked on the narrow cylindrical tube as A two. A point two is marked on this cross section. The velocity of fluid through the shaded area on narrow tube is marked v two toward right. The arrow depicting v two is longer than for v one showing v two to be greater in value than v one.](../resources/Figure_12_01_02.jpg "When a tube narrows, the same volume occupies a greater length. For the same volume to pass points 1 and 2 in a given time, the speed must be greater at point 2. The process is exactly reversible. If the fluid flows in the opposite direction, its speed will decrease when the tube widens. (Note that the relative volumes of the two cylinders and the corresponding velocity vector arrows are not drawn to scale.)")
{: #Figure2}

Since liquids are essentially incompressible, the equation of continuity is
valid for all liquids. However, gases are compressible, and so the equation must
be applied with caution to gases if they are subjected to compression or
expansion.

<div id="Example2" class="example" markdown="1">
<div class="title">
Calculating Fluid Speed: Speed Increases When a Tube Narrows
</div>
A nozzle with a radius of 0.250 cm is attached to a garden hose with a radius of 0.900 cm. The flow rate through hose and nozzle is 0.500 L/s. Calculate the speed of the water (a) in the hose and (b) in the nozzle.

**Strategy**

We can use the relationship between flow rate and speed to find both velocities.
We will use the subscript 1 for the hose and 2 for the nozzle.

**Solution for (a)**

First, we solve $$Q=A\overline{v} $$ for $${v}_{1} $$ and note that the
cross-sectional area is $$A=\pi r^2 $$, yielding
<div class="equation">
 $${\overline{v}}_{1}=\frac{Q}{ {A}_{1}}=\frac{Q}{ \pi r_{1}^{2}}\text{.} $$
</div>
Substituting known values and making appropriate unit conversions yields

<div class="equation">
 $${\overline{v}}_{1}=  \frac{ \left( 0.500 \text{L/s} \right) \left( 10^{-3} {\text{m}}^{3}/\text{L} \right) }{\pi {\left( 9.00 \times 10^{-3}  \text{m}\right)}^{2}}= 1.96 \text{m/s}\text{.} $$
</div>
**Solution for (b)**

We could repeat this calculation to find the speed in the nozzle
$${\overline{v}}_{2} $$ , but we will use the equation of continuity to give a
somewhat different insight. Using the equation which states

<div class="equation">
 $${A}_{1}{\overline{v}}_{1}={A}_{2}{\overline{v}}_{2}\text{,} $$
</div>
solving for  $${\overline{v}}_{2} $$
 and substituting  $$\pi r^2 $$
 for the cross-sectional area yields

<div class="equation">
 $${\overline{v}}_{2}=\frac{ {A}_{1}}{ {A}_{2}}{\overline{v}}_{1}=\frac{ \pi r_1^2}{ \pi r_2^2}{\overline{v}}_{1}=\frac{ r_1^2}{ r_2^2 }{\overline{v}}_{1}\text{.} $$
</div>
Substituting known values,

<div class="equation">
 $${\overline{v}}_{2}=\frac{ {\left( 0.900 \text{cm} \right)}^{2} }
{ {\left( 0.250 \text{cm} \right)}^{2}} 1.96 \text{m/s}=25.5 \text{m/s}\text{.} $$
</div>
**Discussion**

A speed of 1.96 m/s is about right for water emerging from a nozzleless hose.
The nozzle produces a considerably faster stream merely by constricting the flow
to a narrower tube.

</div>

The solution to the last part of the example shows that speed is inversely
proportional to the *square* of the radius of the tube, making for large effects
when radius varies. We can blow out a candle at quite a distance, for example,
by pursing our lips, whereas blowing on a candle with our mouth wide open is
quite ineffective.

In many situations, including in the cardiovascular system, branching of the
flow occurs. The blood is pumped from the heart into arteries that subdivide
into smaller arteries (arterioles) which branch into very fine vessels called
capillaries. In this situation, continuity of flow is maintained, but it is
the *sum* of the flow rates in each of the branches in any portion along the
tube that is maintained. The equation of continuity in a more general form
becomes

<div class="equation">
 $${n}_{1}{A}_{1}{\overline{v}}_{1}={n}_{2}{A}_{2}{\overline{v}}_{2}\text{,} $$
</div>

where $${n}_{1} $$ and $${n}_{2} $$ are the number of branches in each of the
sections along the tube.

<div id="Example3" class="example" markdown="1">
<div class="title">
Calculating Flow Speed and Vessel Diameter: Branching in the Cardiovascular System
</div>
The aorta is the principal blood vessel through which blood leaves the heart in order to circulate around the body. (a) Calculate the average speed of the blood in the aorta if the flow rate is 5.0 L/min. The aorta has a radius of 10 mm. (b) Blood also flows through smaller blood vessels known as capillaries. When the rate of blood flow in the aorta is 5.0 L/min, the speed of blood in the capillaries is about 0.33 mm/s. Given that the average diameter of a capillary is  $$8.0 \mu \text{m} $$ ,
 calculate the number of capillaries in the blood circulatory system.

**Strategy**

We can use $$Q=A\overline{v} $$ to calculate the speed of flow in the aorta and
then use the general form of the equation of continuity to calculate the number
of capillaries as all the other variables are known.

**Solution for (a)**

The flow rate is given by $$Q=A\overline{v} $$ or $$\overline{v}=\frac{Q}{ \pi
r^2} $$ for a cylindrical vessel.

Substituting the known values (converted to units of meters and seconds) gives

<div class="equation">
 $$\overline{v}=\frac{\left(5.0 \text{L/min}\right)\left(10^{-3} {\text{m}}^{3}\text{/L}\right)\left(1 \text{min/}60 \text{s}\right)}{\pi {\left(0.010 \text{m}\right)}^{2}}= 0.27 \text{m/s}. $$
</div>
**Solution for (b)**

Using $${n}_{1}{A}_{1}{\overline{v}}_{1}={n}_{2}{A}_{2}{\overline{v}}_{1} $$ ,
assigning the subscript 1 to the aorta and 2 to the capillaries, and solving for
$${n}_{2} $$
(the number of capillaries) gives $${n}_{2}=\frac{ {n}_{1}{A}_{1}{\overline{v}}_
{1}}{ {A}_{2}{\overline{v}}_{2}} $$ . Converting all quantities to units of
meters and seconds and substituting into the equation above gives

<div class="equation">
 $${n}_{2}=\frac{\left(1\right)\left(\pi \right){\left(10 \times 10^{-3}  \text{m}\right)}^{2}\left(0.27 \text{m/s} \right)}{\left(\pi \right){\left( 4.0 \times 10^{-6}  \text{m}\right)}^{2}\left( 0.33 \times 10^{-3}  \text{m/s}\right)}= 5.0 \times 10^{9}  \text{capillaries}. $$
</div>
**Discussion**

Note that the speed of flow in the capillaries is considerably reduced relative
to the speed in the aorta due to the significant increase in the total
cross-sectional area at the capillaries. This low speed is to allow sufficient
time for effective exchange to occur, although it is equally important for the
flow not to become stationary in order to avoid the possibility of clotting.
Does this large number of capillaries in the body seem reasonable? In active
muscle, one finds about 200 capillaries per $${\text{mm}}^{3} $$, or about $$200
\times 10^{6} $$ per 1 kg of muscle. For 20 kg of muscle, this amounts to about
$$4 \times 10^{9} $$ capillaries.

</div>

### Section Summary

* Flow rate $$Q $$ is defined to be the volume $$V $$ flowing past a point in
  time $$t $$, or $$Q=\frac{V}{t} $$ where $$V $$ is volume and $$t $$ is time.
* The SI unit of volume is $${\text{m}}^{3} $$ .
* Another common unit is the liter (L), which is $$10^{-3} {\text{m}}^{3} $$ .
* Flow rate and velocity are related by $$Q=A\overline{v} $$ where $$A $$ is the
  cross-sectional area of the flow and $$\overline{v} $$ is its average
  velocity.
* For incompressible fluids, flow rate at various points is constant. That is,
  <div class="equation" >
   $$\begin{array}{c} {Q}_{1}={Q}_{2}\\ {A}_{1} {\overline{v}}_{1}={A}_{2} {\overline{v}}_{2} \\ {n}_{1} {A}_{1} {\overline{v}}_{1}={n}_{2} {A}_{2} {\overline{v}}_{2} \end{array} \text{.} $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is the difference between flow rate and fluid velocity? How are they related?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Many figures in the text show streamlines. Explain why fluid velocity is greatest where streamlines are closest together. (Hint: Consider the relationship between fluid velocity and the cross-sectional area through which it flows.)

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Identify some substances that are incompressible and some that are not.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the average flow rate in  $${\text{cm}}^{3}\text{/s} $$
 of gasoline to the engine of a car traveling at 100 km/h if it averages 10.0 km/L?

</div>
<div class="solution" markdown="1">
 $$2.78 {\text{cm}}^{3}\text{/s} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The heart of a resting adult pumps blood at a rate of 5.00 L/min. (a) Convert this to  $${\text{cm}}^{3}\text{/s} $$ .
 (b) What is this rate in  $${\text{m}}^{3}\text{/s} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Blood is pumped from the heart at a rate of 5.0 L/min into the aorta (of radius 1.0 cm). Determine the speed of blood through the aorta.

</div>
<div class="solution" markdown="1">
27 cm/s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Blood is flowing through an artery of radius 2 mm at a rate of 40 cm/s. Determine the flow rate and the volume that passes through the artery in a period of 30 s.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The Huka Falls on the Waikato River is one of New Zealand’s most visited natural tourist attractions (see [[Figure 3]](#Figure3)). On average the river has a flow rate of about 300 000 L/s. At the gorge, the river narrows to 20 m wide and averages 20 m deep. (a) What is the average speed of the river in the gorge? (b) What is the average speed of the water in the river downstream of the falls when it widens to 60 m and its depth increases to an average of 40 m?

![Water rushes over a fall.](../resources/Figure_12_01_04.jpg "The Huka Falls in Taupo, New Zealand, demonstrate flow rate. (credit: RaviGogna, Flickr)")
{: #Figure3}

</div>
<div class="solution" markdown="1">
(a) 0.75 m/s

(b) 0.13 m/s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A major artery with a cross-sectional area of  $$ 1.00 {\text{cm}}^{2} $$
 branches into 18 smaller arteries, each with an average cross-sectional area of  $$ 0.400 {\text{cm}}^{2} $$ .
 By what factor is the average velocity of the blood reduced when it passes into these branches?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) As blood passes through the capillary bed in an organ, the capillaries join to form venules (small veins). If the blood speed increases by a factor of 4.00 and the total cross-sectional area of the venules is  $$ 10.0 {\text{cm}}^{2} $$ ,
 what is the total cross-sectional area of the capillaries feeding these venules? (b) How many capillaries are involved if their average diameter is  $$10.0 \mu \text{m} $$ ?

</div>
<div class="solution" markdown="1">
(a)  $$40.0 {\text{cm}}^{2} $$
(b)  $$ 5.09 \times 10^{7}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The human circulation system has approximately  $$1 \times 10^{9}  $$
 capillary vessels. Each vessel has a diameter of about  $$8 \mu \text{m} $$ .
 Assuming cardiac output is 5 L/min, determine the average velocity of blood flow through each capillary vessel.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Estimate the time it would take to fill a private swimming pool with a capacity of 80 000 L using a garden hose delivering 60 L/min. (b) How long would it take to fill if you could divert a moderate size river, flowing at  $$5000 {\text{m}}^{3}\text{/s} $$, into it?

</div>
<div class="solution" markdown="1">
(a) 22 h

(b) 0.016 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The flow rate of blood through a  $$ 2.00 \times 10^{-6}\text{-m} $$
 -radius capillary is  $$ 3.80 \times 10^{-9}  {\text{cm}}^{3}\text{/s} $$ .
 (a) What is the speed of the blood flow? (This small speed allows time for diffusion of materials to and from the blood.) (b) Assuming all the blood in the body passes through capillaries, how many of them must there be to carry a total flow of  $$ 90.0 {\text{cm}}^{3}\text{/s} $$ ?
 (The large number obtained is an overestimate, but it is still reasonable.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the fluid speed in a fire hose with a 9.00-cm diameter carrying 80.0 L of water per second? (b) What is the flow rate in cubic meters per second? (c) Would your answers be different if salt water replaced the fresh water in the fire hose?

</div>
<div class="solution" markdown="1">
(a) 12.6 m/s

(b)  $$0.0800 {\text{m}}^{3}\text{/s} $$
(c) No, independent of density.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The main uptake air duct of a forced air gas heater is 0.300 m in diameter. What is the average speed of air in the duct if it carries a volume equal to that of the house’s interior every 15 min? The inside volume of the house is equivalent to a rectangular solid 13.0 m wide by 20.0 m long by 2.75 m high.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Water is moving at a velocity of 2.00 m/s through a hose with an internal diameter of 1.60 cm. (a) What is the flow rate in liters per second? (b) The fluid velocity in this hose’s nozzle is 15.0 m/s. What is the nozzle’s inside diameter?

</div>
<div class="solution"  markdown="1">
(a) 0.402 L/s

(b) 0.584 cm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Prove that the speed of an incompressible fluid through a constriction, such as in a Venturi tube, increases by a factor equal to the square of the factor by which the diameter decreases. (The converse applies for flow out of a constriction into a larger-diameter region.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Water emerges straight down from a faucet with a 1.80-cm diameter at a speed of 0.500 m/s. (Because of the construction of the faucet, there is no variation in speed across the stream.) (a) What is the flow rate in  $${\text{cm}}^{3}\text{/s} $$ ?
 (b) What is the diameter of the stream 0.200 m below the faucet? Neglect any effects due to surface tension.

</div>
<div class="solution"  markdown="1">
(a)  $$127 {\text{cm}}^{3}\text{/s} $$
(b) 0.890 cm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

A mountain stream is 10.0 m wide and averages 2.00 m in depth. During the spring
runoff, the flow in the stream reaches $$100 000 {\text{m}}^{3}\text{/s} $$ .
(a) What is the average velocity of the stream under these conditions? (b) What
is unreasonable about this velocity? (c) What is unreasonable or inconsistent
about the premises?

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

flow rate
: abbreviated *Q*, it is the volume *V* that flows past a particular point
during a time *t*, or *Q = V/t*

liter
: a unit of volume, equal to 10<sup>−3</sup> m<sup>3</sup>

</div>
