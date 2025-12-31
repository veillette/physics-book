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

![The figure shows a fluid flowing through a cylindrical pipe open at both ends. A portion of the cylindrical pipe with the fluid is shaded for a length d. The velocity of the fluid in the shaded region is shown by v toward the right. The cross sections of the shaded cylinder are marked as A. This cylinder of fluid flows past a point P on the cylindrical pipe. The velocity v is equal to d over t.](../resources/Figure_12_01_01.jpg 'Flow rate is the volume of fluid per unit time flowing past a point through the area (A) . Here the shaded cylinder of fluid flows past point (P)  in a uniform pipe in time (t) . The volume of the cylinder is  (Ad)  and the average velocity is  ( \\bar{v}=d/t ) so that the flow rate is  ( Q=Ad/t=A\\bar{v} ) .)')
{: #Figure1}

The SI unit for flow rate is $${\text{m}}^{3}\text{/s} $$ , but a number of
other units for $$Q $$ are in common use. For example, the heart of a resting
adult pumps blood at a rate of 5.00 liters per minute (L/min). Note that a **liter** (L) is 1/1000 of a cubic meter or 1000 cubic centimeters ( $$10^{-3} {\text{m}}^{3} $$ or $$10^{3} {\text{cm}}^{3} $$ ). In this text we shall use
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

![The figure shows a cylindrical tube broad at the left and narrow at the right. The fluid is shown to flow through the cylindrical tube toward right along the axis of the tube. A shaded area is marked on the broader cylinder on the left. A cross section is marked on it as A one. A point one is marked on this cross section. The velocity of the fluid through the shaded area on narrow tube is marked by v one as an arrow toward right. Another shaded area is marked on the narrow cylindrical on the right. The shaded area on narrow tube is longer than the one on broader tube to show that when a tube narrows, the same volume occupies a greater length. A cross section is marked on the narrow cylindrical tube as A two. A point two is marked on this cross section. The velocity of fluid through the shaded area on narrow tube is marked v two toward right. The arrow depicting v two is longer than for v one showing v two to be greater in value than v one.](../resources/Figure_12_01_02.jpg 'When a tube narrows, the same volume occupies a greater length. For the same volume to pass points 1 and 2 in a given time, the speed must be greater at point 2. The process is exactly reversible. If the fluid flows in the opposite direction, its speed will decrease when the tube widens. (Note that the relative volumes of the two cylinders and the corresponding velocity vector arrows are not drawn to scale.)')
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
proportional to the _square_ of the radius of the tube, making for large effects
when radius varies. We can blow out a candle at quite a distance, for example,
by pursing our lips, whereas blowing on a candle with our mouth wide open is
quite ineffective.

In many situations, including in the cardiovascular system, branching of the
flow occurs. The blood is pumped from the heart into arteries that subdivide
into smaller arteries (arterioles) which branch into very fine vessels called
capillaries. In this situation, continuity of flow is maintained, but it is
the _sum_ of the flow rates in each of the branches in any portion along the
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

The flow rate is given by $$Q=A\overline{v} $$ or $$\overline{v}=\frac{Q}{ \pi r^2} $$ for a cylindrical vessel.

Substituting the known values (converted to units of meters and seconds) gives

<div class="equation">
 $$\overline{v}=\frac{\left(5.0 \text{L/min}\right)\left(10^{-3} {\text{m}}^{3}\text{/L}\right)\left(1 \text{min/}60 \text{s}\right)}{\pi {\left(0.010 \text{m}\right)}^{2}}= 0.27 \text{m/s}. $$
</div>
**Solution for (b)**

Using $${n}_{1}{A}_{1}{\overline{v}}_{1}={n}_{2}{A}_{2}{\overline{v}}_{1} $$ ,
assigning the subscript 1 to the aorta and 2 to the capillaries, and solving for
$${n}_{2} $$
(the number of capillaries) gives $${n}_{2}=\frac{ {n}_{1}{A}_{1}{\overline{v}}_ {1}}{ {A}_{2}{\overline{v}}\_{2}} $$ . Converting all quantities to units of
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
muscle, one finds about 200 capillaries per $${\text{mm}}^{3} $$, or about $$200 \times 10^{6} $$ per 1 kg of muscle. For 20 kg of muscle, this amounts to about
$$4 \times 10^{9} $$ capillaries.

</div>

### Section Summary

- Flow rate $$Q $$ is defined to be the volume $$V $$ flowing past a point in
  time $$t $$, or $$Q=\frac{V}{t} $$ where $$V $$ is volume and $$t $$ is time.
- The SI unit of volume is $${\text{m}}^{3} $$ .
- Another common unit is the liter (L), which is $$10^{-3} {\text{m}}^{3} $$ .
- Flow rate and velocity are related by $$Q=A\overline{v} $$ where $$A $$ is the
  cross-sectional area of the flow and $$\overline{v} $$ is its average
  velocity.
- For incompressible fluids, flow rate at various points is constant. That is,
  <div class="equation" >
   $$\begin{array}{c} {Q}_{1}={Q}_{2}\\ {A}_{1} {\overline{v}}_{1}={A}_{2} {\overline{v}}_{2} \\ {n}_{1} {A}_{1} {\overline{v}}_{1}={n}_{2} {A}_{2} {\overline{v}}_{2} \end{array} \text{.} $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is the difference between flow rate and fluid velocity? How are they related?

</div>
<div class="solution" markdown="1">
**Strategy**

To answer this conceptual question, we need to examine the definitions of flow rate and fluid velocity and identify how they differ as physical quantities.

**Solution**

Flow rate $$Q$$ and fluid velocity $$v$$ are related but distinct physical quantities:

- **Flow rate** $$Q$$ measures the *volume* of fluid passing a point per unit time. Its SI unit is $$\text{m}^3/\text{s}$$. Flow rate tells us *how much* fluid moves through a system.

- **Fluid velocity** $$v$$ measures *how fast* the fluid is moving at a particular location. Its SI unit is $$\text{m/s}$$. Velocity is a local property that can vary from point to point in the fluid.

The two quantities are related by the equation:
$$Q = A\bar{v}$$

where $$A$$ is the cross-sectional area through which the fluid flows and $$\bar{v}$$ is the average velocity.

**Discussion**

The key distinction is that flow rate is an *extensive* property that depends on the size of the conduit, while velocity is an *intensive* property describing local motion. Two pipes with the same fluid velocity can have very different flow rates if their cross-sectional areas differ. Conversely, the same flow rate can be achieved with high velocity through a small pipe or low velocity through a large pipe.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Many figures in the text show streamlines. Explain why fluid velocity is greatest where streamlines are closest together. (Hint: Consider the relationship between fluid velocity and the cross-sectional area through which it flows.)

</div>
<div class="solution" markdown="1">
**Strategy**

We apply the equation of continuity for incompressible fluids, which relates flow velocity to cross-sectional area.

**Solution**

For an incompressible fluid, the equation of continuity states:
$$A_1 v_1 = A_2 v_2$$

Streamlines represent the paths that fluid particles follow. When streamlines are closer together, they indicate a smaller cross-sectional area $$A$$ through which the fluid flows.

Since flow rate $$Q = Av$$ must remain constant for an incompressible fluid, when the area $$A$$ decreases (streamlines closer together), the velocity $$v$$ must increase proportionally:
$$v = \frac{Q}{A}$$

Therefore, where streamlines are most closely packed (smallest effective cross-sectional area), the fluid velocity is greatest.

**Discussion**

This principle is directly observable in everyday life. When you partially cover a garden hose opening with your thumb, you reduce the exit area, causing the water to spray out at much higher velocity. Similarly, wind speeds up as it flows between tall buildings (the "urban canyon effect") because the streamlines are compressed into a smaller area.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Identify some substances that are incompressible and some that are not.

</div>
<div class="solution" markdown="1">
**Strategy**

We consider the molecular structure and behavior of different substances under pressure to classify them as compressible or incompressible.

**Solution**

**Incompressible substances** (liquids and solids):
- Water and other liquids (oil, blood, mercury)
- Metals (steel, aluminum, copper)
- Glass and ceramics
- Most biological tissues
- Hydraulic fluids

**Compressible substances** (gases):
- Air and atmospheric gases
- Natural gas (methane)
- Steam and water vapor
- Carbon dioxide
- Helium and other noble gases

**Discussion**

The distinction arises from molecular structure. In liquids and solids, molecules are already closely packed with strong intermolecular forces, leaving little room for compression. In gases, molecules are far apart with weak interactions, allowing significant volume changes under pressure.

Note that "incompressible" is an idealization—all substances compress slightly under extreme pressure. However, liquids typically compress less than 0.01% under normal conditions, making the incompressible approximation excellent for most applications. This is why hydraulic systems use liquids rather than gases to transmit force reliably.
</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the average flow rate in  $${\text{cm}}^{3}\text{/s} $$
 of gasoline to the engine of a car traveling at 100 km/h if it averages 10.0 km/L?

</div>
<div class="solution" markdown="1">
**Strategy**

We need to find the volume of gasoline consumed per unit time. The car's fuel efficiency (10.0 km/L) tells us how far the car travels per liter of fuel. Combined with the speed (100 km/h), we can determine the fuel consumption rate.

**Solution**

First, find how many liters are consumed per hour:
$$\text{Fuel consumption rate} = \frac{\text{Speed}}{\text{Fuel efficiency}} = \frac{100 \text{ km/h}}{10.0 \text{ km/L}} = 10.0 \text{ L/h}$$

Now convert to $$\text{cm}^3/\text{s}$$:
$$Q = 10.0 \frac{\text{L}}{\text{h}} \times \frac{1000 \text{ cm}^3}{1 \text{ L}} \times \frac{1 \text{ h}}{3600 \text{ s}} = \frac{10.0 \times 1000}{3600} \text{ cm}^3/\text{s} = 2.78 \text{ cm}^3/\text{s}$$

**Discussion**

The average flow rate of gasoline to the engine is **2.78 cm³/s**. This relatively small flow rate makes sense—gasoline is energy-dense, so a small volume can power a car at highway speeds. For perspective, this is about half a teaspoon per second, which seems reasonable for maintaining 100 km/h travel.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The heart of a resting adult pumps blood at a rate of 5.00 L/min. (a) Convert this to  $${\text{cm}}^{3}\text{/s} $$ .
 (b) What is this rate in  $${\text{m}}^{3}\text{/s} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

This is a unit conversion problem. We apply conversion factors to change from L/min to the requested units, using the relationships: 1 L = 1000 cm³ = 10⁻³ m³ and 1 min = 60 s.

**Solution**

**(a)** Convert 5.00 L/min to cm³/s:
$$Q = 5.00 \frac{\text{L}}{\text{min}} \times \frac{1000 \text{ cm}^3}{1 \text{ L}} \times \frac{1 \text{ min}}{60 \text{ s}} = \frac{5.00 \times 1000}{60} \text{ cm}^3/\text{s} = 83.3 \text{ cm}^3/\text{s}$$

**(b)** Convert 5.00 L/min to m³/s:
$$Q = 5.00 \frac{\text{L}}{\text{min}} \times \frac{10^{-3} \text{ m}^3}{1 \text{ L}} \times \frac{1 \text{ min}}{60 \text{ s}} = \frac{5.00 \times 10^{-3}}{60} \text{ m}^3/\text{s} = 8.33 \times 10^{-5} \text{ m}^3/\text{s}$$

**Discussion**

The heart pumps blood at a rate of **(a) 83.3 cm³/s** or **(b) 8.33 × 10⁻⁵ m³/s**. The cm³/s unit is convenient for physiological applications—83.3 cm³/s means roughly a third of a cup of blood per second. Over a day, this amounts to about 7,200 liters, highlighting the remarkable endurance of the heart muscle.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Blood is pumped from the heart at a rate of 5.0 L/min into the aorta (of radius 1.0 cm). Determine the speed of blood through the aorta.

</div>
<div class="solution" markdown="1">
**Strategy**

We use the relationship between flow rate, cross-sectional area, and velocity: $$Q = A\bar{v}$$. The aorta is approximately circular, so $$A = \pi r^2$$.

**Solution**

Given:
- Flow rate: $$Q = 5.0 \text{ L/min}$$
- Aorta radius: $$r = 1.0 \text{ cm} = 0.010 \text{ m}$$

First, convert flow rate to SI units:
$$Q = 5.0 \frac{\text{L}}{\text{min}} \times \frac{10^{-3} \text{ m}^3}{1 \text{ L}} \times \frac{1 \text{ min}}{60 \text{ s}} = 8.33 \times 10^{-5} \text{ m}^3/\text{s}$$

Calculate the cross-sectional area:
$$A = \pi r^2 = \pi (0.010 \text{ m})^2 = 3.14 \times 10^{-4} \text{ m}^2$$

Solve for velocity:
$$\bar{v} = \frac{Q}{A} = \frac{8.33 \times 10^{-5} \text{ m}^3/\text{s}}{3.14 \times 10^{-4} \text{ m}^2} = 0.27 \text{ m/s} = 27 \text{ cm/s}$$

**Discussion**

The speed of blood through the aorta is approximately **27 cm/s**. This is a reasonable value—fast enough to deliver oxygenated blood efficiently throughout the body, yet slow enough to avoid damaging the vessel walls. During exercise, cardiac output can increase significantly, leading to higher blood velocities.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Blood is flowing through an artery of radius 2 mm at a rate of 40 cm/s. Determine the flow rate and the volume that passes through the artery in a period of 30 s.

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$Q = A\bar{v}$$ to find the flow rate, then use $$V = Qt$$ to find the total volume passing through the artery in the given time.

**Solution**

Given:
- Artery radius: $$r = 2 \text{ mm} = 0.2 \text{ cm} = 0.002 \text{ m}$$
- Blood velocity: $$v = 40 \text{ cm/s} = 0.40 \text{ m/s}$$
- Time: $$t = 30 \text{ s}$$

Calculate the cross-sectional area:
$$A = \pi r^2 = \pi (0.002 \text{ m})^2 = 1.26 \times 10^{-5} \text{ m}^2$$

Calculate the flow rate:
$$Q = Av = (1.26 \times 10^{-5} \text{ m}^2)(0.40 \text{ m/s}) = 5.03 \times 10^{-6} \text{ m}^3/\text{s}$$

Converting to more convenient units:
$$Q = 5.03 \times 10^{-6} \text{ m}^3/\text{s} \times \frac{10^6 \text{ cm}^3}{1 \text{ m}^3} = 5.0 \text{ cm}^3/\text{s}$$

Calculate the volume in 30 s:
$$V = Qt = (5.03 \times 10^{-6} \text{ m}^3/\text{s})(30 \text{ s}) = 1.51 \times 10^{-4} \text{ m}^3 = 151 \text{ cm}^3 = 0.15 \text{ L}$$

**Discussion**

The flow rate through the artery is **5.0 cm³/s** (or 5.0 × 10⁻⁶ m³/s), and **151 cm³** (about 0.15 L) of blood passes through in 30 seconds. This is consistent with blood flow through a medium-sized artery. The relatively high velocity of 40 cm/s suggests this could be an artery close to the heart where blood moves faster.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The Huka Falls on the Waikato River is one of New Zealand's most visited natural tourist attractions (see [[Figure 3]](#Figure3)). On average the river has a flow rate of about 300 000 L/s. At the gorge, the river narrows to 20 m wide and averages 20 m deep. (a) What is the average speed of the river in the gorge? (b) What is the average speed of the water in the river downstream of the falls when it widens to 60 m and its depth increases to an average of 40 m?

![Water rushes over a fall.](../resources/Figure_12_01_04.jpg 'The Huka Falls in Taupo, New Zealand, demonstrate flow rate. (credit: RaviGogna, Flickr)')
{: #Figure3}

</div>
<div class="solution" markdown="1">
**Strategy**

We apply $$Q = Av$$ at different points along the river. Since water is incompressible, the flow rate $$Q$$ remains constant. We calculate velocity at each location using the cross-sectional area (width × depth).

**Solution**

Given:
- Flow rate: $$Q = 300\,000 \text{ L/s} = 300 \text{ m}^3/\text{s}$$
- Gorge dimensions: width = 20 m, depth = 20 m
- Downstream dimensions: width = 60 m, depth = 40 m

**(a)** Calculate the velocity in the gorge:
$$A_{\text{gorge}} = (20 \text{ m})(20 \text{ m}) = 400 \text{ m}^2$$

$$v_{\text{gorge}} = \frac{Q}{A_{\text{gorge}}} = \frac{300 \text{ m}^3/\text{s}}{400 \text{ m}^2} = 0.75 \text{ m/s}$$

**(b)** Calculate the velocity downstream:
$$A_{\text{downstream}} = (60 \text{ m})(40 \text{ m}) = 2400 \text{ m}^2$$

$$v_{\text{downstream}} = \frac{Q}{A_{\text{downstream}}} = \frac{300 \text{ m}^3/\text{s}}{2400 \text{ m}^2} = 0.125 \text{ m/s} \approx 0.13 \text{ m/s}$$

**Discussion**

The average speed of the river is **(a) 0.75 m/s** in the gorge and **(b) 0.13 m/s** downstream. The water speeds up by a factor of about 6 as it passes through the narrow gorge, which explains why the Huka Falls is such a dramatic sight—the river is compressed into a much smaller cross-section. This is a direct application of the continuity equation: when the area decreases, velocity must increase proportionally to maintain constant flow rate.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A major artery with a cross-sectional area of  $$ 1.00 {\text{cm}}^{2} $$
 branches into 18 smaller arteries, each with an average cross-sectional area of  $$ 0.400 {\text{cm}}^{2} $$ .
 By what factor is the average velocity of the blood reduced when it passes into these branches?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the generalized continuity equation for branching flow: $$A_1 v_1 = n_2 A_2 v_2$$, where $$n_2$$ is the number of branches. The total cross-sectional area of the branches determines how the velocity changes.

**Solution**

Given:
- Major artery area: $$A_1 = 1.00 \text{ cm}^2$$
- Number of branches: $$n = 18$$
- Each branch area: $$A_2 = 0.400 \text{ cm}^2$$

The total cross-sectional area of all branches:
$$A_{\text{total}} = nA_2 = 18 \times 0.400 \text{ cm}^2 = 7.20 \text{ cm}^2$$

From continuity: $$A_1 v_1 = A_{\text{total}} v_2$$

Solving for the velocity ratio:
$$\frac{v_2}{v_1} = \frac{A_1}{A_{\text{total}}} = \frac{1.00 \text{ cm}^2}{7.20 \text{ cm}^2} = 0.139$$

The reduction factor is:
$$\frac{v_1}{v_2} = \frac{7.20}{1.00} = 7.20$$

**Discussion**

The blood velocity is reduced by a factor of **7.2** (or equivalently, the velocity in the branches is about 14% of the velocity in the major artery). This slowing of blood as it enters smaller vessels is physiologically important—it allows more time for oxygen and nutrient exchange with surrounding tissues, particularly in capillaries where the total cross-sectional area is enormous.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) As blood passes through the capillary bed in an organ, the capillaries join to form venules (small veins). If the blood speed increases by a factor of 4.00 and the total cross-sectional area of the venules is  $$ 10.0 {\text{cm}}^{2} $$ ,
 what is the total cross-sectional area of the capillaries feeding these venules? (b) How many capillaries are involved if their average diameter is  $$10.0 \mu \text{m} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) We apply the continuity equation. If velocity increases by a factor of 4, the cross-sectional area must decrease by the same factor to maintain constant flow rate.
(b) We calculate the area of a single capillary and divide the total area by this value.

**Solution**

**(a)** From continuity: $$A_{\text{cap}} v_{\text{cap}} = A_{\text{ven}} v_{\text{ven}}$$

Since $$v_{\text{ven}} = 4.00 \times v_{\text{cap}}$$:
$$A_{\text{cap}} v_{\text{cap}} = A_{\text{ven}} (4.00 \times v_{\text{cap}})$$

$$A_{\text{cap}} = 4.00 \times A_{\text{ven}} = 4.00 \times 10.0 \text{ cm}^2 = 40.0 \text{ cm}^2$$

**(b)** Calculate the area of a single capillary:

Given diameter: $$d = 10.0 \text{ μm} = 10.0 \times 10^{-4} \text{ cm}$$

$$A_{\text{single}} = \pi r^2 = \pi \left(\frac{d}{2}\right)^2 = \pi \left(\frac{10.0 \times 10^{-4} \text{ cm}}{2}\right)^2 = \pi (5.00 \times 10^{-4} \text{ cm})^2$$

$$A_{\text{single}} = 7.85 \times 10^{-7} \text{ cm}^2$$

Number of capillaries:
$$n = \frac{A_{\text{cap}}}{A_{\text{single}}} = \frac{40.0 \text{ cm}^2}{7.85 \times 10^{-7} \text{ cm}^2} = 5.09 \times 10^{7}$$

**Discussion**

The total cross-sectional area of the capillaries is **(a) 40.0 cm²**, and there are approximately **(b) 5.09 × 10⁷ capillaries** (about 51 million). This enormous number of tiny capillaries explains why blood slows down so dramatically in capillary beds—the total cross-sectional area is vastly larger than in arteries, giving time for gas and nutrient exchange.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The human circulation system has approximately  $$1 \times 10^{9}  $$
 capillary vessels. Each vessel has a diameter of about  $$8 \mu \text{m} $$ .
 Assuming cardiac output is 5 L/min, determine the average velocity of blood flow through each capillary vessel.

</div>
<div class="solution" markdown="1">
**Strategy**

We calculate the total cross-sectional area of all capillaries, then use $$Q = Av$$ to find the velocity. All capillaries are assumed to share the total cardiac output.

**Solution**

Given:
- Number of capillaries: $$n = 1 \times 10^9$$
- Capillary diameter: $$d = 8 \text{ μm} = 8 \times 10^{-6} \text{ m}$$
- Cardiac output: $$Q = 5 \text{ L/min} = \frac{5 \times 10^{-3} \text{ m}^3}{60 \text{ s}} = 8.33 \times 10^{-5} \text{ m}^3/\text{s}$$

Calculate the area of a single capillary:
$$A_{\text{single}} = \pi r^2 = \pi \left(\frac{8 \times 10^{-6} \text{ m}}{2}\right)^2 = \pi (4 \times 10^{-6} \text{ m})^2 = 5.03 \times 10^{-11} \text{ m}^2$$

Total cross-sectional area of all capillaries:
$$A_{\text{total}} = n \times A_{\text{single}} = (1 \times 10^9)(5.03 \times 10^{-11} \text{ m}^2) = 0.0503 \text{ m}^2$$

Calculate average velocity:
$$v = \frac{Q}{A_{\text{total}}} = \frac{8.33 \times 10^{-5} \text{ m}^3/\text{s}}{0.0503 \text{ m}^2} = 1.66 \times 10^{-3} \text{ m/s} = 0.17 \text{ cm/s}$$

**Discussion**

The average velocity of blood through each capillary is approximately **0.17 cm/s** (or about 1.7 mm/s). This very slow speed is crucial for capillary function—it allows sufficient time (about 1-2 seconds) for red blood cells to exchange oxygen and carbon dioxide with surrounding tissues as they traverse the capillary bed.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Estimate the time it would take to fill a private swimming pool with a capacity of 80 000 L using a garden hose delivering 60 L/min. (b) How long would it take to fill if you could divert a moderate size river, flowing at  $$5000 {\text{m}}^{3}\text{/s} $$, into it?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the relationship $$Q = V/t$$, solving for time: $$t = V/Q$$. We need to ensure consistent units for each calculation.

**Solution**

Given:
- Pool capacity: $$V = 80\,000 \text{ L}$$
- Garden hose flow rate: $$Q_{\text{hose}} = 60 \text{ L/min}$$
- River flow rate: $$Q_{\text{river}} = 5000 \text{ m}^3/\text{s} = 5000 \times 1000 \text{ L/s} = 5 \times 10^6 \text{ L/s}$$

**(a)** Time using garden hose:
$$t = \frac{V}{Q} = \frac{80\,000 \text{ L}}{60 \text{ L/min}} = 1333 \text{ min} = 22.2 \text{ h} \approx 22 \text{ h}$$

**(b)** Time using river:
$$t = \frac{V}{Q} = \frac{80\,000 \text{ L}}{5 \times 10^6 \text{ L/s}} = 0.016 \text{ s} = 16 \text{ ms}$$

**Discussion**

Using a garden hose, it would take approximately **(a) 22 hours** to fill the pool. Using a moderate river, it would take only **(b) 0.016 seconds** (16 milliseconds). This dramatic difference illustrates the enormous flow rates of natural rivers compared to household water sources. The river flow rate is about 5 billion times greater than the garden hose!
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The flow rate of blood through a  $$ 2.00 \times 10^{-6}\text{-m} $$
 -radius capillary is  $$ 3.80 \times 10^{-9}  {\text{cm}}^{3}\text{/s} $$ .
 (a) What is the speed of the blood flow? (This small speed allows time for diffusion of materials to and from the blood.) (b) Assuming all the blood in the body passes through capillaries, how many of them must there be to carry a total flow of  $$ 90.0 {\text{cm}}^{3}\text{/s} $$ ?
 (The large number obtained is an overestimate, but it is still reasonable.)

</div>
<div class="solution" markdown="1">
**Strategy**

(a) We use $$Q = Av$$ to find velocity, calculating the cross-sectional area from the given radius.
(b) We divide the total required flow rate by the flow rate through a single capillary.

**Solution**

Given:
- Capillary radius: $$r = 2.00 \times 10^{-6} \text{ m} = 2.00 \times 10^{-4} \text{ cm}$$
- Flow rate per capillary: $$Q = 3.80 \times 10^{-9} \text{ cm}^3/\text{s}$$
- Total flow required: $$Q_{\text{total}} = 90.0 \text{ cm}^3/\text{s}$$

**(a)** Calculate the cross-sectional area:
$$A = \pi r^2 = \pi (2.00 \times 10^{-4} \text{ cm})^2 = 1.26 \times 10^{-7} \text{ cm}^2$$

Calculate velocity:
$$v = \frac{Q}{A} = \frac{3.80 \times 10^{-9} \text{ cm}^3/\text{s}}{1.26 \times 10^{-7} \text{ cm}^2} = 3.02 \times 10^{-2} \text{ cm/s} = 0.30 \text{ mm/s}$$

**(b)** Number of capillaries needed:
$$n = \frac{Q_{\text{total}}}{Q_{\text{single}}} = \frac{90.0 \text{ cm}^3/\text{s}}{3.80 \times 10^{-9} \text{ cm}^3/\text{s}} = 2.37 \times 10^{10}$$

**Discussion**

The blood velocity in a capillary is approximately **(a) 0.030 cm/s** (or 0.30 mm/s), and about **(b) 2.4 × 10¹⁰ capillaries** would be needed to carry the total blood flow. While this is an overestimate (as the problem notes), it illustrates the enormous number of capillaries in the body. The very slow blood velocity in capillaries is essential—it provides the 1-2 seconds needed for effective gas exchange between blood and tissues.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the fluid speed in a fire hose with a 9.00-cm diameter carrying 80.0 L of water per second? (b) What is the flow rate in cubic meters per second? (c) Would your answers be different if salt water replaced the fresh water in the fire hose?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the relationship $$Q = Av$$ where $$A = \pi r^2$$ for the circular hose cross-section. For part (c), we consider whether density affects the continuity equation.

**Solution**

Given:
- Hose diameter: $$d = 9.00 \text{ cm} = 0.0900 \text{ m}$$, so radius $$r = 0.0450 \text{ m}$$
- Flow rate: $$Q = 80.0 \text{ L/s}$$

**(a)** Calculate the cross-sectional area:
$$A = \pi r^2 = \pi (0.0450 \text{ m})^2 = 6.36 \times 10^{-3} \text{ m}^2$$

Convert flow rate to SI units:
$$Q = 80.0 \text{ L/s} = 80.0 \times 10^{-3} \text{ m}^3/\text{s} = 0.0800 \text{ m}^3/\text{s}$$

Calculate velocity:
$$v = \frac{Q}{A} = \frac{0.0800 \text{ m}^3/\text{s}}{6.36 \times 10^{-3} \text{ m}^2} = 12.6 \text{ m/s}$$

**(b)** The flow rate in cubic meters per second:
$$Q = 80.0 \text{ L/s} \times \frac{1 \text{ m}^3}{1000 \text{ L}} = 0.0800 \text{ m}^3/\text{s}$$

**(c)** The answers would be the same for salt water. The flow rate $$Q$$ and velocity $$v$$ depend only on the volume of fluid passing through per unit time, not on the fluid's density. The equation $$Q = Av$$ contains no density terms.

**Discussion**

The fluid speed in the fire hose is **(a) 12.6 m/s** (about 45 km/h), and the flow rate is **(b) 0.0800 m³/s**. **(c)** No, the answers would not change for salt water because the continuity equation and flow rate definition involve only volume, not mass or density. However, the *pressure* required to achieve this flow rate would differ slightly due to density differences, and other properties like friction might also be affected.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The main uptake air duct of a forced air gas heater is 0.300 m in diameter. What is the average speed of air in the duct if it carries a volume equal to that of the house's interior every 15 min? The inside volume of the house is equivalent to a rectangular solid 13.0 m wide by 20.0 m long by 2.75 m high.

</div>
<div class="solution" markdown="1">
**Strategy**

We first calculate the volume of the house, then determine the required flow rate to move this volume in 15 minutes. Finally, we use $$Q = Av$$ to find the air velocity.

**Solution**

Given:
- Duct diameter: $$d = 0.300 \text{ m}$$, so radius $$r = 0.150 \text{ m}$$
- House dimensions: $$13.0 \text{ m} \times 20.0 \text{ m} \times 2.75 \text{ m}$$
- Time to circulate: $$t = 15 \text{ min} = 900 \text{ s}$$

Calculate the house volume:
$$V = (13.0 \text{ m})(20.0 \text{ m})(2.75 \text{ m}) = 715 \text{ m}^3$$

Calculate the required flow rate:
$$Q = \frac{V}{t} = \frac{715 \text{ m}^3}{900 \text{ s}} = 0.794 \text{ m}^3/\text{s}$$

Calculate the duct cross-sectional area:
$$A = \pi r^2 = \pi (0.150 \text{ m})^2 = 0.0707 \text{ m}^2$$

Calculate the air velocity:
$$v = \frac{Q}{A} = \frac{0.794 \text{ m}^3/\text{s}}{0.0707 \text{ m}^2} = 11.2 \text{ m/s}$$

**Discussion**

The average speed of air in the duct is approximately **11.2 m/s** (about 40 km/h or 25 mph). This is a reasonable velocity for HVAC systems—fast enough to efficiently circulate air throughout the house, but not so fast as to create excessive noise or require extremely powerful fans. The system circulates the entire house volume every 15 minutes, which means the air is exchanged about 4 times per hour, typical for residential heating systems.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Water is moving at a velocity of 2.00 m/s through a hose with an internal diameter of 1.60 cm. (a) What is the flow rate in liters per second? (b) The fluid velocity in this hose's nozzle is 15.0 m/s. What is the nozzle's inside diameter?

</div>
<div class="solution"  markdown="1">
**Strategy**

(a) We use $$Q = Av$$ to find the flow rate from the known velocity and hose diameter.
(b) We apply the continuity equation, using the fact that flow rate is constant to relate the hose and nozzle dimensions.

**Solution**

Given:
- Hose velocity: $$v_1 = 2.00 \text{ m/s}$$
- Hose diameter: $$d_1 = 1.60 \text{ cm} = 0.0160 \text{ m}$$
- Nozzle velocity: $$v_2 = 15.0 \text{ m/s}$$

**(a)** Calculate the hose cross-sectional area:
$$A_1 = \pi r_1^2 = \pi \left(\frac{0.0160 \text{ m}}{2}\right)^2 = \pi (0.00800 \text{ m})^2 = 2.01 \times 10^{-4} \text{ m}^2$$

Calculate the flow rate:
$$Q = A_1 v_1 = (2.01 \times 10^{-4} \text{ m}^2)(2.00 \text{ m/s}) = 4.02 \times 10^{-4} \text{ m}^3/\text{s}$$

Convert to liters per second:
$$Q = 4.02 \times 10^{-4} \text{ m}^3/\text{s} \times \frac{1000 \text{ L}}{1 \text{ m}^3} = 0.402 \text{ L/s}$$

**(b)** From continuity: $$A_1 v_1 = A_2 v_2$$

Solving for $$A_2$$:
$$A_2 = A_1 \frac{v_1}{v_2} = (2.01 \times 10^{-4} \text{ m}^2)\frac{2.00 \text{ m/s}}{15.0 \text{ m/s}} = 2.68 \times 10^{-5} \text{ m}^2$$

Find the nozzle radius:
$$r_2 = \sqrt{\frac{A_2}{\pi}} = \sqrt{\frac{2.68 \times 10^{-5} \text{ m}^2}{\pi}} = 2.92 \times 10^{-3} \text{ m}$$

Nozzle diameter:
$$d_2 = 2r_2 = 5.84 \times 10^{-3} \text{ m} = 0.584 \text{ cm}$$

**Discussion**

The flow rate through the hose is **(a) 0.402 L/s**, and the nozzle's inside diameter is **(b) 0.584 cm**. The nozzle diameter is about 36% of the hose diameter, which increases the velocity by a factor of 7.5 (from 2.00 to 15.0 m/s). This relationship follows because velocity scales as the inverse square of diameter: $$v_2/v_1 = (d_1/d_2)^2 = (1.60/0.584)^2 \approx 7.5$$.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Prove that the speed of an incompressible fluid through a constriction, such as in a Venturi tube, increases by a factor equal to the square of the factor by which the diameter decreases. (The converse applies for flow out of a constriction into a larger-diameter region.)

</div>
<div class="solution" markdown="1">
**Strategy**

We use the equation of continuity and the relationship between area and diameter for a circular cross-section to derive the relationship between velocity change and diameter change.

**Solution**

For an incompressible fluid, the equation of continuity states:
$$A_1 v_1 = A_2 v_2$$

For circular cross-sections, the area is related to diameter by:
$$A = \pi r^2 = \pi \left(\frac{d}{2}\right)^2 = \frac{\pi d^2}{4}$$

Substituting into the continuity equation:
$$\frac{\pi d_1^2}{4} v_1 = \frac{\pi d_2^2}{4} v_2$$

Simplifying (the $$\pi/4$$ factors cancel):
$$d_1^2 v_1 = d_2^2 v_2$$

Solving for the velocity ratio:
$$\frac{v_2}{v_1} = \frac{d_1^2}{d_2^2} = \left(\frac{d_1}{d_2}\right)^2$$

Let the diameter decrease factor be $$k = d_1/d_2$$ (so $$d_2 = d_1/k$$). Then:
$$\frac{v_2}{v_1} = k^2$$

This proves that if the diameter decreases by a factor of $$k$$, the velocity increases by a factor of $$k^2$$.

**Discussion**

This result is a direct consequence of the continuity equation and the geometry of circular pipes. For example, if a pipe's diameter is halved ($$k = 2$$), the velocity increases by a factor of $$2^2 = 4$$. If the diameter is reduced to one-third ($$k = 3$$), velocity increases by a factor of 9. This $$k^2$$ relationship is why small changes in tube diameter can produce dramatic changes in flow velocity, which is the operating principle behind devices like Venturi meters and carburetor jets.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Water emerges straight down from a faucet with a 1.80-cm diameter at a speed of 0.500 m/s. (Because of the construction of the faucet, there is no variation in speed across the stream.) (a) What is the flow rate in  $${\text{cm}}^{3}\text{/s} $$ ?
 (b) What is the diameter of the stream 0.200 m below the faucet? Neglect any effects due to surface tension.

</div>
<div class="solution"  markdown="1">
**Strategy**

(a) We use $$Q = Av$$ to find the flow rate at the faucet outlet.
(b) As water falls, it accelerates due to gravity, increasing its speed. By continuity, if speed increases, the cross-sectional area must decrease. We use kinematics to find the velocity at 0.200 m below, then apply continuity to find the new diameter.

**Solution**

Given:
- Initial diameter: $$d_1 = 1.80 \text{ cm} = 0.0180 \text{ m}$$
- Initial velocity: $$v_1 = 0.500 \text{ m/s}$$
- Fall distance: $$h = 0.200 \text{ m}$$

**(a)** Calculate the initial cross-sectional area:
$$A_1 = \pi r_1^2 = \pi \left(\frac{1.80 \text{ cm}}{2}\right)^2 = \pi (0.900 \text{ cm})^2 = 2.54 \text{ cm}^2$$

Calculate the flow rate:
$$Q = A_1 v_1 = (2.54 \text{ cm}^2)(50.0 \text{ cm/s}) = 127 \text{ cm}^3/\text{s}$$

**(b)** Find the velocity after falling 0.200 m using kinematics:
$$v_2^2 = v_1^2 + 2gh$$
$$v_2^2 = (0.500 \text{ m/s})^2 + 2(9.80 \text{ m/s}^2)(0.200 \text{ m})$$
$$v_2^2 = 0.250 + 3.92 = 4.17 \text{ m}^2/\text{s}^2$$
$$v_2 = 2.04 \text{ m/s}$$

Apply continuity to find the new area:
$$A_2 = A_1 \frac{v_1}{v_2} = (2.54 \text{ cm}^2) \frac{0.500 \text{ m/s}}{2.04 \text{ m/s}} = 0.623 \text{ cm}^2$$

Find the new diameter:
$$A_2 = \pi r_2^2 = \frac{\pi d_2^2}{4}$$
$$d_2 = \sqrt{\frac{4A_2}{\pi}} = \sqrt{\frac{4(0.623 \text{ cm}^2)}{\pi}} = 0.890 \text{ cm}$$

**Discussion**

The flow rate is **(a) 127 cm³/s**, and the stream diameter 0.200 m below the faucet is **(b) 0.890 cm**. The stream narrows as it falls because the water accelerates under gravity—by the time it has fallen 20 cm, the water is moving about 4 times faster, so by continuity, the cross-sectional area is reduced by a factor of 4, and the diameter by a factor of 2. This narrowing of a falling water stream is observable in everyday life.
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
<div class="solution" markdown="1">
**Strategy**

We calculate the velocity using $$Q = Av$$, then evaluate whether the result is physically reasonable for a mountain stream.

**Solution**

Given:
- Stream width: $$w = 10.0 \text{ m}$$
- Stream depth: $$d = 2.00 \text{ m}$$
- Flow rate: $$Q = 100\,000 \text{ m}^3/\text{s}$$

**(a)** Calculate the cross-sectional area:
$$A = w \times d = (10.0 \text{ m})(2.00 \text{ m}) = 20.0 \text{ m}^2$$

Calculate the average velocity:
$$v = \frac{Q}{A} = \frac{100\,000 \text{ m}^3/\text{s}}{20.0 \text{ m}^2} = 5000 \text{ m/s}$$

**(b)** This velocity is approximately **5000 m/s** (5 km/s or about 18,000 km/h). This is unreasonable because:
- It is about 15 times the speed of sound in air (343 m/s)
- It exceeds Earth's escape velocity (11.2 km/s) by nearly half
- Typical fast-flowing rivers have velocities of 1-10 m/s; even extreme flash floods rarely exceed 20 m/s
- Water flowing at this speed would vaporize due to friction and impact forces

**(c)** The unreasonable premise is the stated flow rate. A flow rate of 100,000 m³/s is impossibly large for a stream only 10 m wide and 2 m deep. For comparison:
- The Amazon River (the world's largest by volume) has a flow rate of about 200,000 m³/s, but it is 11 km wide and 50 m deep
- A reasonable flow rate for a mountain stream of these dimensions during spring runoff might be 50-500 m³/s, giving velocities of 2.5-25 m/s

**Discussion**

This problem illustrates the importance of checking whether given values lead to physically reasonable results. The stated flow rate would require either an impossibly high velocity (as calculated) or a much larger cross-sectional area. A more realistic flow rate for a 10 m × 2 m stream would be about 100-200 m³/s, yielding velocities of 5-10 m/s.
</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

flow rate
: abbreviated _Q_, it is the volume _V_ that flows past a particular point
during a time _t_, or _Q = V/t_

liter
: a unit of volume, equal to 10<sup>−3</sup> m<sup>3</sup>

</div>