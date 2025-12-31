---
title: Bernoulli’s Equation
layout: page
sectionNumber: 2
chapterNumber: 12
---

<div class="abstract" markdown="1">
* Explain the terms in Bernoulli’s equation.
* Explain how Bernoulli’s equation is related to conservation of energy.
* Explain how to derive Bernoulli’s principle from Bernoulli’s equation.
* Calculate with Bernoulli’s principle.
* List some applications of Bernoulli’s principle.
</div>

When a fluid flows into a narrower channel, its speed increases. That means its
kinetic energy also increases. Where does that change in kinetic energy come
from? The increased kinetic energy comes from the net work done on the fluid to
push it into the channel and the work done on the fluid by the gravitational
force, if the fluid changes vertical position. Recall the work-energy theorem,

<div class="equation" >
 $${W}_{\text{net}}=\frac{1}{2}mv^{2}-\frac{1}{2}mv^{2}_{0}\text{.} $$
</div>

There is a pressure difference when the channel narrows. This pressure
difference results in a net force on the fluid: recall that pressure times area
equals force. The net work done increases the fluid’s kinetic energy. As a
result, the _pressure will drop in a rapidly-moving fluid_, whether or not the
fluid is confined to a tube.

There are a number of common examples of pressure dropping in rapidly-moving
fluids. Shower curtains have a disagreeable habit of bulging into the shower
stall when the shower is on. The high-velocity stream of water and air creates a
region of lower pressure inside the shower, and standard atmospheric pressure on
the other side. The pressure difference results in a net force inward pushing
the curtain in. You may also have noticed that when passing a truck on the
highway, your car tends to veer toward it. The reason is the same—the high
velocity of the air between the car and the truck creates a region of lower
pressure, and the vehicles are pushed together by greater pressure on the
outside. (See [[Figure 1]](#Figure1).) This effect was observed as far back as
the mid-1800s, when it was found that trains passing in opposite directions
tipped precariously toward one another.

![An overhead view of a car passing by a truck on a highway toward left is shown. The air passing through the vehicles is shown using lines along the length of both the vehicles. The lines representing the air movement has a velocity v one outside the area between the vehicles and velocity v two between the vehicles. v two is shown to be greater than v one with the help of a longer arrow toward right. The pressure between the car and the truck is represented by P i and the pressure at the other ends of both the vehicles is represented as P zero. The pressure P i is shown to be less than P zero by shorter length of the arrow. The direction of P i is shown as pushing the car and truck apart, and the direction of P zero is shown as pushing the car and truck toward each other.](../resources/Figure_12_02_01.jpg 'An overhead view of a car passing a truck on a highway. Air passing between the vehicles flows in a narrower channel and must increase its speed (( v_{2} ) is greater than ( v_{1} ) ), causing the pressure between them to drop (( P_{i} ) is less than ( P_{o} )). Greater pressure on the outside pushes the car and truck together.')
{: #Figure1}

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Investigation with a Sheet of Paper
</div>
Hold the short edge of a sheet of paper parallel to your mouth with one hand on each side of your mouth. The page should slant downward over your hands. Blow over the top of the page. Describe what happens and explain the reason for this behavior.

</div>

### Bernoulli’s Equation

The relationship between pressure and velocity in fluids is described
quantitatively by **Bernoulli’s equation**, named after its discoverer, the
Swiss scientist Daniel Bernoulli (1700–1782). Bernoulli’s equation states that
for an incompressible, frictionless fluid, the following sum is constant:

<div class="equation" >
 $$P+\frac{1}{2}\rho v^{2}+\rho gh=\text{constant} \text{,}  $$
</div>

where $$P $$ is the absolute pressure, $$\rho $$ is the fluid density, $$v $$ is
the velocity of the fluid, $$h $$ is the height above some reference point, and
$$g $$ is the acceleration due to gravity. If we follow a small volume of fluid
along its path, various quantities in the sum may change, but the total remains
constant. Let the subscripts 1 and 2 refer to any two points along the path that
the bit of fluid follows; Bernoulli’s equation becomes

<div class="equation" >
 $${P}_{1}+\frac{1}{2}\rho v_{1}^{2}+\rho gh_{1}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}+\rho gh_{2}\text{.} $$
</div>

Bernoulli’s equation is a form of the conservation of energy principle. Note
that the second and third terms are the kinetic and potential energy with $$m $$
replaced by $$\rho $$ . In fact, each term in the equation has units of
energy per unit volume. We can prove this for the second term by substituting
$$\rho =m/V $$ into it and gathering terms:

<div class="equation" >
 $$\frac{1}{2}\rho v^{2}=\frac{\frac{1}{2}mv^{2}}{V}=\frac{\text{KE}}{V}\text{.} $$
</div>

So $$\frac{1}{2}\rho v^{2} $$ is the kinetic energy per unit volume. Making the
same substitution into the third term in the equation, we find

<div class="equation" >
 $$\rho gh=\frac{mgh}{V}=\frac{ {\text{PE}}_{\text{g}}}{V}, $$
</div>

so $$\rho gh $$ is the gravitational potential energy per unit volume. Note that
pressure $$P $$ has units of energy per unit volume, too. Since $$P=F/A $$, its
units are $${\text{N/m}}^{2} $$ . If we multiply these by m/m, we obtain
$$\text{N}\cdot {\text{m/m}}^{3}={\text{J/m}}^{3} $$ , or energy per unit
volume. Bernoulli’s equation is, in fact, just a convenient statement of
conservation of energy for an incompressible fluid in the absence of friction.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Conservation of Energy
</div>
Conservation of energy applied to fluid flow produces Bernoulli’s equation. The net work done by the fluid’s pressure results in changes in the fluid’s  $$\text{KE} $$
 and  $${\text{PE}}_{\text{g}} $$
 per unit volume. If other forms of energy are involved in fluid flow, Bernoulli’s equation can be modified to take these forms into account. Such forms of energy include thermal energy dissipated because of fluid viscosity.

</div>

The general form of Bernoulli’s equation has three terms in it, and it is
broadly applicable. To understand it better, we will look at a number of
specific situations that simplify and illustrate its use and meaning.

### Bernoulli’s Equation for Static Fluids

Let us first consider the very simple situation where the fluid is static—that
is, $${v}_{1}={v}_{2}=0 $$ . Bernoulli’s equation in that case is

<div class="equation" >
 $${P}_{1}+\rho gh_{1}={P}_{2}+\rho gh_{2}\text{.} $$
</div>

We can further simplify the equation by taking $${h}_{2}=0 $$
(we can always choose some height to be zero, just as we often have done for
other situations involving the gravitational force, and take all other heights
to be relative to this). In that case, we get

<div class="equation" >
 $${P}_{2}={P}_{1}+\rho gh_{1}\text{.} $$
</div>

This equation tells us that, in static fluids, pressure increases with depth. As
we go from point 1 to point 2 in the fluid, the depth increases by $${h}_{1} $$
, and consequently, $${P}_{2} $$ is greater than $${P}_{1} $$ by an amount
$$\rho gh_{1} $$ . In the very simplest case, $${P}_{1} $$ is zero at the top of
the fluid, and we get the familiar relationship $$P=\rho gh $$ .
(Recall that $$P=\rho gh $$ and $$\Delta {\text{PE}}_{\text{g}}=mgh. $$ )
Bernoulli’s equation includes the fact that the pressure due to the weight of a
fluid is $$\rho gh $$ . Although we introduce Bernoulli’s equation for fluid
flow, it includes much of what we studied for static fluids in the preceding
chapter.

### Bernoulli’s Principle—Bernoulli’s Equation at Constant Depth

Another important situation is one in which the fluid moves but its depth is
constant—that is, $${h}_{1}={h}_{2} $$ . Under that condition, Bernoulli’s
equation becomes

<div class="equation" >
 $${P}_{1}+\frac{1}{2}\rho v_{1}^{2}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}\text{.} $$
</div>

Situations in which fluid flows at a constant depth are so important that this
equation is often called **Bernoulli’s principle**. It is Bernoulli’s equation
for fluids at constant depth. (Note again that this applies to a small volume of
fluid as we follow it along its path.) As we have just discussed, pressure drops
as speed increases in a moving fluid. We can see this from Bernoulli’s
principle. For example, if $${v}_{2} $$ is greater than $${v}_{1} $$ in the
equation, then $${P}_{2} $$ must be less than $${P}_{1} $$ for the equality to
hold.

<div class="example" markdown="1">
<div class="title">
Calculating Pressure: Pressure Drops as a Fluid Speeds Up
</div>
In [[Example 2]](../contents/ch12FlowRateAndItsRelationsToVelocity#Example2), we found that the speed of water in a hose increased from 1.96 m/s to 25.5 m/s going from the hose to the nozzle. Calculate the pressure in the hose, given that the absolute pressure in the nozzle is  $$ 1.01 \times 10^{5}  {\text{N/m}}^{2} $$
 (atmospheric, as it must be) and assuming level, frictionless flow.

**Strategy**

Level flow means constant depth, so Bernoulli’s principle applies. We use the
subscript 1 for values in the hose and 2 for those in the nozzle. We are thus
asked to find $${P}_{1} $$.

**Solution**

Solving Bernoulli’s principle for $${P}_{1} $$ yields

<div class="equation" >
 $${P}_{1}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}-\frac{1}{2}\rho v_{1}^{2}={P}_{2}+\frac{1}{2}\rho \left({v}_{2}^{2}-{v}_{1}^{2}\right)\text{.} $$
</div>
Substituting known values,

<div class="equation" >
 $$\begin{array}{lll}
{P}_{1}& =&  1.01 \times 10^{5}  {\text{N/m}}^{2}\\ 
& &  +\frac{1}{2} \left(10^{3} {\text{kg/m}}^{3}\right)
\left[ {\left(25.5 \text{m/s}\right)}^{2}-{\left(1.96 \text{m/s}\right)}^{2}\right] \\ 
{P}_{1}& =&  4.24 \times 10^{5}  {\text{N/m}}^{2}\text{.}\end{array} $$
</div>
**Discussion**

This absolute pressure in the hose is greater than in the nozzle, as expected
since $$v $$ is greater in the nozzle. The pressure $${P}_{2} $$ in the nozzle
must be atmospheric since it emerges into the atmosphere without other changes
in conditions.

</div>

### Applications of Bernoulli’s Principle

There are a number of devices and situations in which fluid flows at a constant
height and, thus, can be analyzed with Bernoulli’s principle.

#### Entrainment

People have long put the Bernoulli principle to work by using reduced pressure
in high-velocity fluids to move things about. With a higher pressure on the
outside, the high-velocity fluid forces other fluids into the stream. This
process is called _entrainment_. Entrainment devices have been in use since
ancient times, particularly as pumps to raise water small heights, as in
draining swamps, fields, or other low-lying areas. Some other devices that use
the concept of entrainment are shown in [[Figure 2]](#Figure2).

![Part a of the figure shows a rectangular section of a cylindrical Bunsen burner as a vertical column. The natural gas is shown to enter the rectangular column from the bottom upward. The air is shown to enter though a nozzle at the left side near the bottom part of the rectangular column and rise upward. Both air and natural gas are shown to rise up together along the length of the column, shown as vertical arrows along the length pointing upward. Part b of the figure shows an atomizer that uses a squeeze bulb in the shape of a small sphere to create a jet of air that entrains drops of perfume contained in a spherical bottomed container. The air is shown to come out of the squeeze bulb and the perfume is shown to rise up from the spherical bottomed container. Part c of the figure shows a common aspirator which contains a cylindrical tube held vertically. The tube is broader on the top and narrow at the bottom. Water is shown to enter the tube from the broader region and flow toward the narrow region. Air is shown to enter the cylindrical tube from the bottom part of the broader side and also flow toward the narrow tube. Part d of the figure shows the chimney of a water heater. Water heater is shown as a rectangular box at the bottom having a cylindrical section in the middle. The cylindrical section is broader at the bottom and narrow toward the top. Hot air is shown to rise up along the vertical section of the cylindrical tube. The chimney is conical at the bottom and rectangular upward and is shown above the rectangular water heater. The hot air enters the chimney at the conical end and rises upward. Cool air is shown to enter the chimney through the area between the rectangular section of heater and chimney from the two sides and rise up along the chimney with the hot air as shown by vertical arrows.](../resources/Figure_12_02_02.jpg 'Examples of entrainment devices that use increased fluid speed to create low pressures, which then entrain one fluid into another. (a) A Bunsen burner uses an adjustable gas nozzle, entraining air for proper combustion. (b) An atomizer uses a squeeze bulb to create a jet of air that entrains drops of perfume. Paint sprayers and carburetors use very similar techniques to move their respective liquids. (c) A common aspirator uses a high-speed stream of water to create a region of lower pressure. Aspirators may be used as suction pumps in dental and surgical situations or for draining a flooded basement or producing a reduced pressure in a vessel. (d) The chimney of a water heater is designed to entrain air into the pipe leading through the ceiling.')
{: #Figure2}

#### Wings and Sails

The airplane wing is a beautiful example of Bernoulli’s principle in
action. [[Figure 3]](#Figure3)(a) shows the characteristic shape of a wing. The
wing is tilted upward at a small angle and the upper surface is longer, causing
air to flow faster over it. The pressure on top of the wing is therefore
reduced, creating a net upward force or lift. (Wings can also gain lift by
pushing air downward, utilizing the conservation of momentum principle. The
deflected air molecules result in an upward force on the wing — Newton’s third
law.) Sails also have the characteristic shape of a wing. (
See [[Figure 3]](#Figure3)(b).) The pressure on the front side of the sail,
$${P}_{\text{front}} $$ , is lower than the pressure on the back of the sail,
$${P}\_{\text{back}} $$ . This results in a forward force and even allows you to
sail into the wind.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Investigation with Two Strips of Paper
</div>
For a good illustration of Bernoulli’s principle, make two strips of paper, each about 15 cm long and 4 cm wide. Hold the small end of one strip up to your lips and let it drape over your finger. Blow across the paper. What happens? Now hold two strips of paper up to your lips, separated by your fingers. Blow between the strips. What happens?

</div>

#### Velocity measurement

[[Figure 4]](#Figure4) shows two devices that measure fluid velocity based on
Bernoulli’s principle. The manometer in [[Figure 4]](#Figure4)(a) is connected
to two tubes that are small enough not to appreciably disturb the flow. The tube
facing the oncoming fluid creates a dead spot having zero velocity ( $${v}_{1}=0 $$ )
in front of it, while fluid passing the other tube has velocity $${v}_{2} $$ .
This means that Bernoulli’s principle as stated in $${P}_{1}+\frac{1}{2}\rho v_ {1}^{2}={P}_{2}+\frac{1}{2}\rho v_{2}^{2} $$ becomes

<div class="equation" >
 $${P}_{1}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}\text{.} $$
</div>

![Part a of the figure shows a picture of a wing. It is in the form of an aerofoil. One side of the wing is broader and the other end tapers. The direction of the air is shown as lines along the length of the wing. The direction of the air below the wing is shown as flowing along the length of the wing. The pressure exerted by the air given by P b is upward. The direction of the air on the top or front part of the wing is shown as flowing along the length of the wing. The pressure exerted by the air is given by P f, and it acts downward. Part b of the figure shows a boat with a sail. The direction of the sail is almost across the boat. The direction of the air in the sail is shown by lines on the front and back sides of the sail. The air currents on the front exert a pressure P front toward the sail, and air currents on the back sides of sail exert a pressure P back again toward the sail.](../resources/Figure_12_02_03.jpg '(a) The Bernoulli principle helps explain lift generated by a wing. (b) Sails use the same technique to generate part of their thrust.')
{: #Figure3}

Thus pressure $${P}_{2} $$ over the second opening is reduced by
$$\frac{1}{2}\rho v\_{2}^{2} $$ , and so the fluid in the manometer rises by $$h $$
on the side connected to the second opening, where

<div class="equation" >
 $$h\propto \frac{1}{2}\rho v_{2}^{2}\text{.} $$
</div>

(Recall that the symbol $$\propto $$ means “proportional to.”) Solving for
$${v}_{2} $$ , we see that

<div class="equation" >
 $${v}_{2}\propto \sqrt{h}\text{.} $$
</div>

[[Figure 4]](#Figure4)(b) shows a version of this device that is in common use
for measuring various fluid velocities; such devices are frequently used as air
speed indicators in aircraft.

![Part a shows a U-shaped manometer tube connected to ends of two tubes which are placed close together. Tube one is open on the end and shows a velocity v one equals zero at the end. Tube two has an opening on the side and shows a velocity v two across the opening. The level of fluid in the U-shaped tube is more on the right side than on the left. The difference in height is shown by h. Part b of the figure shows a velocity measuring device a pitot tube. Two coaxial tubes, one broader outside and other narrow inside are connected to a U-shaped tube. The U-shaped tube is also narrow at one end and broader at the other. The narrow end of the U-shaped tube is connected to the narrow inner tube and the broader end of the U-shaped tube is connected to the broader outer tube. The tube one has an opening at one of its edges and the velocity of the fluid at the end is v one equals zero. Tube two has an opening on the side and shows a velocity v two across the opening. The level of fluid in the U-shaped tube is more on the right side than on the left. The difference in height is shown by h.](../resources/Figure_12_02_04.jpg "Measurement of fluid speed based on Bernoulli&#x2019;s principle. (a) A manometer is connected to two tubes that are close together and small enough not to disturb the flow. Tube 1 is open at the end facing the flow. A dead spot having zero speed is created there. Tube 2 has an opening on the side, and so the fluid has a speed \( v \); across the opening; thus, pressure there drops. The difference in pressure at the manometer is \( 1/2 \rho v^2_2 \) , and so \( h \) is proportional to \( 1/2 \rho v^2_2 \). (b) This type of velocity measuring device is a Prandtl tube, also known as a pitot tube.")
{: #Figure4}

### Summary

* Bernoulli’s equation states that the sum on each side of the following
  equation is constant, or the same at any two points in an incompressible
  frictionless fluid:

  <div class="equation" >
   $${P}_{1}+\frac{1}{2}\rho v_{1}^{2}+\rho gh_{1}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}+\rho gh_{2}. $$
  </div>

* Bernoulli’s principle is Bernoulli’s equation applied to situations in which
  depth is constant. The terms involving depth (or height *h* ) subtract out,
  yielding

  <div class="equation" >
   $${P}_{1}+\frac{1}{2}\rho v_{1}^{2}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}. $$
  </div>

* Bernoulli’s principle has many applications, including entrainment, wings and
  sails, and velocity measurement.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
You can squirt water a considerably greater distance by placing your thumb over the end of a garden hose and then releasing, than by leaving it completely uncovered. Explain how this works.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply the continuity equation and Bernoulli's principle to understand how restricting the opening affects water velocity.

**Solution**

When you partially cover the hose opening with your thumb, you reduce the cross-sectional area through which the water exits. By the continuity equation ($$A_1v_1 = A_2v_2$$), if the area decreases while flow rate remains constant, the velocity must increase proportionally.

The water exits at a much higher speed when the opening is restricted. Since the range of a projectile depends on its initial velocity (range $$\propto v^2$$ for a given angle), the higher exit velocity allows the water to travel much farther.

Additionally, Bernoulli's principle explains that the pressure inside the hose increases when you restrict the flow (the water must slow down as it approaches the constriction, converting kinetic energy to pressure energy). This higher pressure is then converted back to kinetic energy as the water accelerates through the small opening.

**Discussion**

This is a practical demonstration of the continuity equation. The same flow rate through a smaller area requires higher velocity. This principle is used in many applications, from spray nozzles to jet engines.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Water is shot nearly vertically upward in a decorative fountain and the stream is observed to broaden as it rises. Conversely, a stream of water falling straight down from a faucet narrows. Explain why, and discuss whether surface tension enhances or reduces the effect in each case.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply the continuity equation considering that gravity affects the water's velocity as it rises or falls.

**Solution**

**Rising water (fountain):** As water rises against gravity, it decelerates. By the continuity equation $$A_1v_1 = A_2v_2$$, when velocity $$v$$ decreases, the cross-sectional area $$A$$ must increase to maintain constant flow rate. Therefore, the stream broadens as it rises.

**Falling water (faucet):** As water falls under gravity, it accelerates. By continuity, when velocity increases, the cross-sectional area must decrease. Therefore, the stream narrows as it falls.

**Effect of surface tension:**
- For the rising fountain stream, surface tension *reduces* the broadening effect by pulling the water surface inward, trying to minimize the surface area.
- For the falling faucet stream, surface tension *enhances* the narrowing effect by pulling the stream together, working in the same direction as the continuity effect.

**Discussion**

This explains why falling water streams eventually break into droplets—the stream continues to narrow until surface tension forces cause instabilities that break the continuous stream into discrete drops (Rayleigh instability).
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Look back to [[Figure 1]](#Figure1). Answer the following two questions. Why is  $${P}_{\text{o}} $$
 less than atmospheric? Why is  $${P}_{\text{o}} $$
 greater than  $${P}_{\text{i}} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle, which states that where fluid velocity is higher, pressure is lower.

**Solution**

**Why is $$P_o$$ less than atmospheric?**
The air on the outer sides of both the car and truck is essentially stationary (moving with the vehicles). According to Bernoulli's principle, stationary or slow-moving air has the highest pressure. The air passing along the outer surfaces of the vehicles moves at a moderate speed, creating a pressure $$P_o$$ that is slightly less than the atmospheric pressure of completely still air far from the vehicles.

**Why is $$P_o$$ greater than $$P_i$$?**
The space between the car and truck is a constricted channel. By continuity, air must speed up as it flows through this narrower gap ($$v_2 > v_1$$). According to Bernoulli's principle, this higher velocity means lower pressure. Therefore, the pressure between the vehicles ($$P_i$$) is less than the pressure on the outer sides ($$P_o$$).

This pressure difference creates a net inward force that pushes the vehicles toward each other.

**Discussion**

This effect is why passing trucks on highways can be hazardous—the pressure difference can cause a car to veer toward the truck. The faster the vehicles travel and the closer they are, the more pronounced this effect becomes.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Give an example of entrainment not mentioned in the text.

</div>
<div class="solution" markdown="1">
**Strategy**

We identify a device or phenomenon that uses the Bernoulli principle to draw one fluid into a moving stream of another fluid.

**Solution**

Examples of entrainment not explicitly mentioned in the text include:

1. **Garden hose siphon attachments**: These devices attach to a hose and use the fast-moving water stream to draw fertilizer or soap solution from a container into the water flow.

2. **Jet pumps (eductors)**: Used in wells to lift water from deep underground by using a high-pressure water jet to create a low-pressure region that draws up groundwater.

3. **Steam ejectors**: Used in industrial settings where high-velocity steam entrains gases or vapors, commonly used to create vacuums.

4. **Foam fire extinguisher nozzles**: The water stream entrains air to create foam.

5. **Aquarium air pumps**: Some designs use water flow to entrain air bubbles into the tank.

6. **Venturi scrubbers**: Industrial pollution control devices that use high-velocity gas flow to entrain scrubbing liquid droplets.

**Discussion**

All these devices exploit the same principle: a high-velocity fluid stream creates a region of low pressure that draws in another fluid. This is a direct application of Bernoulli's principle.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Many entrainment devices have a constriction, called a Venturi, such as shown in [[Figure 5]](#Figure5). How does this bolster entrainment?

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to analyze how a constriction affects pressure and thus entrainment efficiency.

**Solution**

A Venturi constriction bolsters entrainment by maximizing the pressure drop at the point where the secondary fluid is introduced. Here's how it works:

1. **Increased velocity**: By the continuity equation, when fluid passes through the narrowed section, its velocity increases significantly ($$v = Q/A$$, so smaller $$A$$ means larger $$v$$).

2. **Maximum pressure drop**: By Bernoulli's principle ($$P + \frac{1}{2}\rho v^2 = \text{constant}$$), the higher velocity in the constriction corresponds to the lowest pressure in the system.

3. **Enhanced suction**: The secondary fluid inlet is placed at this point of minimum pressure. The greater the velocity increase (and thus the greater the pressure drop), the stronger the suction force drawing in the entrained fluid.

4. **Efficient mixing**: After the constriction, the tube expands again, allowing the velocity to decrease and pressure to recover, which helps mix the two fluids thoroughly.

**Discussion**

The Venturi design optimizes entrainment by creating the maximum possible pressure differential. This is why carburetors, aspirators, and many industrial mixing devices use this characteristic shape. The degree of constriction can be adjusted to control the entrainment rate.
</div>
</div>

![Figure shows a venturi tube, a cylindrical tube broader at both the ends and narrow in the middle. The narrow part is labeled as venturi constriction. The flow of fluid is shown as horizontal arrows along the length of the tube toward the right. The flow lines are closer in the center and spread apart at both the ends. There is an opening on the top portion of the narrow section for the entrained fluid to enter.](../resources/Figure_12_02_05.jpg "A tube with a narrow segment designed to enhance entrainment is called a Venturi. These are very commonly used in carburetors and aspirators.")
{: #Figure5}

<div class="exercise"  data-element-type="conceptual-questions">
<div class="problem"  markdown="1">
Some chimney pipes have a T-shape, with a crosspiece on top that helps draw up gases whenever there is even a slight breeze. Explain how this works in terms of Bernoulli's principle.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to understand how horizontal wind creates a pressure drop at the chimney top.

**Solution**

When wind blows across the horizontal crosspiece of a T-shaped chimney cap, the air flows faster over and around the openings than it would if the air were still. According to Bernoulli's principle, this faster-moving air has lower pressure than the still air inside the chimney.

This pressure difference creates a suction effect: the higher pressure inside the chimney pushes gases upward toward the lower pressure region at the top. Even a slight breeze is enough to enhance the "draft" of the chimney, improving the flow of combustion gases out of the building.

The T-shape is particularly effective because:
1. It shields the opening from rain and downdrafts
2. Wind from any horizontal direction creates flow across at least one opening
3. The crosspiece creates a low-pressure zone regardless of wind direction

**Discussion**

This is an elegant passive ventilation solution. Similar principles are used in rotating turbine vents on rooftops and in the design of natural ventilation systems for buildings.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Is there a limit to the height to which an entrainment device can raise a fluid? Explain your answer.

</div>
<div class="solution" markdown="1">
**Strategy**

We consider the maximum pressure difference that can be created by the Bernoulli effect and compare it to the hydrostatic pressure required to lift a fluid column.

**Solution**

Yes, there is a fundamental limit. An entrainment device works by creating a low-pressure region. The maximum suction possible occurs when the pressure approaches zero (a perfect vacuum). Atmospheric pressure at sea level is approximately 101,325 Pa.

The maximum height $$h$$ to which a fluid can be raised is determined by:
$$P_{atm} = \rho g h_{max}$$

For water ($$\rho = 1000 \text{ kg/m}^3$$):
$$h_{max} = \frac{P_{atm}}{\rho g} = \frac{101,325 \text{ Pa}}{(1000 \text{ kg/m}^3)(9.8 \text{ m/s}^2)} \approx 10.3 \text{ m}$$

This is why suction pumps cannot lift water more than about 10 meters, regardless of how powerful they are. In practice, the limit is even lower because:
1. A perfect vacuum cannot be achieved
2. Water vapor pressure reduces the effective pressure difference
3. Friction and turbulence cause energy losses

**Discussion**

This limit of approximately 10 m for water explains why deep wells require submersible pumps or jet pumps rather than suction pumps at the surface. For denser fluids like mercury, the limit is much lower (about 76 cm), while for less dense fluids like gasoline, it's somewhat higher.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why is it preferable for airplanes to take off into the wind rather than with the wind?

</div>
<div class="solution" markdown="1">
**Strategy**

We consider how airspeed (not ground speed) determines lift, and how a headwind affects the required ground speed for takeoff.

**Solution**

Airplane lift depends on *airspeed*—the speed of the air flowing over the wings—not ground speed. According to Bernoulli's principle, lift is generated when air flows faster over the curved upper surface of the wing, creating lower pressure above than below.

When taking off into the wind:
- If the wind speed is 20 m/s and the aircraft needs 60 m/s airspeed for takeoff, it only needs to reach 40 m/s ground speed
- This means a shorter takeoff roll and less runway required

When taking off with the wind:
- With a 20 m/s tailwind and needing 60 m/s airspeed, the aircraft must reach 80 m/s ground speed
- This requires a much longer runway and more fuel

Additional benefits of taking off into the wind:
1. Better control at low speeds (more air over control surfaces)
2. Steeper climb angle relative to the ground
3. More time and distance to clear obstacles
4. Better engine cooling during the takeoff roll

**Discussion**

This is why airports have runways oriented to align with prevailing winds, and why pilots pay close attention to wind direction and speed when planning takeoffs and landings.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Roofs are sometimes pushed off vertically during a tropical cyclone, and buildings sometimes explode outward when hit by a tornado. Use Bernoulli's principle to explain these phenomena.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to compare pressures inside and outside buildings during high-wind events.

**Solution**

**Roofs pushed off during cyclones:**
During a tropical cyclone, extremely high-speed winds blow over the roof while the air inside the building remains relatively still. By Bernoulli's principle:
- Fast-moving air outside → low pressure above the roof
- Still air inside → normal (higher) pressure below the roof

This pressure difference creates a net upward force on the roof. If the wind speed is high enough, this upward force can exceed the weight of the roof plus the strength of its attachments, lifting the roof off the building.

For a roof area of 100 m² and wind speed of 50 m/s, the pressure difference can create an upward force of over 150,000 N (15+ tons).

**Buildings exploding outward during tornadoes:**
Tornadoes create an extreme low-pressure zone. When a tornado passes directly over a building:
- The pressure outside drops dramatically (can be 10-20% lower than normal)
- The pressure inside the sealed building remains near normal atmospheric pressure

This pressure difference pushes outward on all walls and the roof simultaneously, potentially causing the building to appear to "explode" outward.

**Discussion**

This is why it was once (incorrectly) recommended to open windows during tornadoes—to equalize pressure. However, modern advice is to seek shelter immediately, as the primary danger is from flying debris, not pressure differences. Opening windows actually allows wind and debris to enter and can make structural damage worse.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why does a sailboat need a keel?

</div>
<div class="solution" markdown="1">
**Strategy**

We analyze the forces on a sailboat to understand why a keel is necessary for sailing, particularly when sailing at an angle to the wind.

**Solution**

A sailboat needs a keel for two essential reasons:

**1. To resist sideways motion (leeway):**
When wind pushes on the sail, it creates a force that has both a forward component (desired) and a sideways component. Without a keel, the boat would simply slide sideways through the water. The keel provides lateral resistance—it moves easily forward through the water but strongly resists sideways motion. This converts the sideways force into forward motion.

**2. To provide stability (prevent capsizing):**
The force on the sail also creates a torque that tries to tip the boat over (heel). The keel, especially a weighted keel, creates a counterbalancing torque:
- The weight at the bottom of the keel creates a righting moment
- When the boat heels, the keel's weight acts to bring it back upright
- The deeper and heavier the keel, the more stable the boat

**Relation to Bernoulli's principle:**
The keel itself works somewhat like an underwater wing. When the boat moves forward with some sideways drift, water flows past the keel at an angle, creating lift (via Bernoulli's principle) that opposes the sideways motion and even helps drive the boat forward.

**Discussion**

This is why sailboats can sail "into the wind" (at an angle up to about 45° from the wind direction). The combination of the sail generating force from the wind and the keel preventing sideways slip allows the boat to convert wind energy into forward motion even when heading partially upwind.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
It is dangerous to stand close to railroad tracks when a rapidly moving commuter train passes. Explain why atmospheric pressure would push you toward the moving train.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to analyze the pressure difference created by the fast-moving air near the train.

**Solution**

When a train passes at high speed, it drags air along with it. The air between you and the train moves very rapidly. According to Bernoulli's principle, this fast-moving air has lower pressure than the still air on your other side.

The pressure difference creates a net force pushing you toward the train:
- Low pressure near the train (fast-moving air)
- Normal atmospheric pressure on your far side (still air)
- Net force = (pressure difference) × (your projected area)

For a train moving at 30 m/s and using Bernoulli's principle:
$$\Delta P = \frac{1}{2}\rho v^2 = \frac{1}{2}(1.2 \text{ kg/m}^3)(30 \text{ m/s})^2 \approx 540 \text{ Pa}$$

For a person with a cross-sectional area of about 0.5 m², this creates a force of approximately 270 N (about 60 pounds)—enough to cause an adult to stumble.

**Discussion**

This effect is one reason why safety lines and barriers are placed at train platforms. The danger is particularly acute for lighter objects (children, luggage, newspapers) and increases dramatically with train speed since the force scales with $$v^2$$.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Water pressure inside a hose nozzle can be less than atmospheric pressure due to the Bernoulli effect. Explain in terms of energy how the water can emerge from the nozzle against the opposing atmospheric pressure.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply conservation of energy (Bernoulli's equation) to track how energy transforms as water moves through the system.

**Solution**

Although the pressure inside the nozzle is less than atmospheric, the water can still emerge because it has kinetic energy. Bernoulli's equation shows that total energy per unit volume is conserved:

$$P + \frac{1}{2}\rho v^2 + \rho gh = \text{constant}$$

Inside the hose (before the nozzle):
- Higher pressure $$P_1$$
- Lower velocity $$v_1$$
- Total energy: mostly pressure energy

Inside the nozzle:
- Lower pressure $$P_2 < P_{atm}$$
- Much higher velocity $$v_2$$
- Total energy: mostly kinetic energy

The water doesn't need to "push against" atmospheric pressure in the sense of using pressure energy—it uses its kinetic energy instead. The high velocity of the water carries it forward despite the adverse pressure gradient.

Think of it like a ball thrown upward: even though gravity opposes its motion, the ball's kinetic energy carries it upward until that energy is depleted. Similarly, the water's kinetic energy is sufficient to overcome the slight pressure opposition at the nozzle exit.

**Discussion**

This is why nozzles work so effectively—they convert pressure energy to kinetic energy. The water emerges at high speed with enough momentum to travel a significant distance through the air.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
A perfume bottle or atomizer sprays a fluid that is in the bottle. ([[Figure 6]](#Figure6).) How does the fluid rise up in the vertical tube in the bottle?

![A perfume bottle with a spray cap.](../resources/Figure_12_02_06.jpg "Atomizer: perfume bottle with tube to carry perfume up through the bottle. (credit: Antonia Foy, Flickr)")
{: #Figure6}

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to explain how the horizontal air flow creates suction that draws liquid up the tube.

**Solution**

When you squeeze the bulb (or press the pump), air is forced at high speed across the top opening of the vertical tube that extends down into the perfume. According to Bernoulli's principle:

1. **High-speed air at the tube opening** → Low pressure at the top of the tube
2. **Still air (atmospheric pressure)** → Acts on the liquid surface inside the bottle
3. **Pressure difference** → Pushes liquid up the tube

The atmospheric pressure on the liquid surface (transmitted through a vent hole in the bottle) is greater than the reduced pressure at the top of the tube. This pressure difference pushes the perfume up the tube:

$$P_{atm} > P_{top}$$

$$\Delta P = P_{atm} - P_{top} = \frac{1}{2}\rho_{air} v^2$$

When the liquid reaches the top, the fast-moving air stream also breaks it into tiny droplets (atomization), creating a fine mist.

**Discussion**

This is a classic example of entrainment. The same principle is used in:
- Paint sprayers
- Carburetors (fuel atomization)
- Medical nebulizers
- Garden sprayers
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If you lower the window on a car while moving, an empty plastic bag can sometimes fly out the window. Why does this happen?

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to compare the pressure inside and outside the moving car.

**Solution**

When you lower a car window while driving, there is a pressure difference between the inside and outside of the car:

**Outside the car:** Air rushes past at the speed of the car (relative to the car). By Bernoulli's principle, this fast-moving air has lower pressure than still air.

**Inside the car:** The air is relatively still (moving with the car), so it maintains approximately normal atmospheric pressure.

This creates a pressure difference:
$$\Delta P = P_{inside} - P_{outside} = \frac{1}{2}\rho v^2$$

For a car moving at 25 m/s (about 90 km/h):
$$\Delta P = \frac{1}{2}(1.2 \text{ kg/m}^3)(25 \text{ m/s})^2 \approx 375 \text{ Pa}$$

This pressure difference pushes air (and light objects like plastic bags) from the higher-pressure interior toward the lower-pressure exterior. A light plastic bag experiences this outward force and, if unrestrained, will be pushed out the window.

**Discussion**

This is why you feel air rushing out of a car when you first open a window at highway speeds—the higher inside pressure equalizes with the lower outside pressure. The same effect makes it harder to close a car door when a window on the opposite side is open.
</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify that pressure has units of energy per unit volume.

</div>
<div class="solution"  markdown="1">
**Strategy**

We analyze the fundamental units of pressure and show they are equivalent to energy per unit volume through dimensional analysis.

**Solution**

Starting with the definition of pressure:
$$P = \frac{\text{Force}}{\text{Area}} = \frac{F}{A}$$

The SI unit of pressure is:
$$[P] = \frac{\text{N}}{\text{m}^2}$$

Now we multiply numerator and denominator by meters:
$$[P] = \frac{\text{N}}{\text{m}^2} = \frac{\text{N} \cdot \text{m}}{\text{m}^2 \cdot \text{m}} = \frac{\text{N} \cdot \text{m}}{\text{m}^3}$$

Since N·m = J (joules, the unit of energy):
$$[P] = \frac{\text{J}}{\text{m}^3} = \frac{\text{energy}}{\text{volume}}$$

**Discussion**

This result is important because it shows that each term in Bernoulli's equation ($$P$$, $$\frac{1}{2}\rho v^2$$, and $$\rho gh$$) has units of energy per unit volume, confirming that Bernoulli's equation is a statement of energy conservation. Pressure can be thought of as "pressure energy" per unit volume available to do work on the fluid.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you have a wind speed gauge like the pitot tube shown in [[Example 2]](../contents/ch12FlowRateAndItsRelationsToVelocity#Example2(b). By what factor must wind speed increase to double the value of $$h $$ in the manometer? Is this independent of the moving fluid and the fluid in the manometer?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the relationship between manometer height $$h$$ and fluid velocity from Bernoulli's principle. The pressure difference measured by the manometer is proportional to $$v^2$$.

**Solution**

For a pitot tube, Bernoulli's principle gives:
$$P_1 = P_2 + \frac{1}{2}\rho v^2$$

The pressure difference is:
$$\Delta P = \frac{1}{2}\rho v^2$$

This pressure difference supports a column of manometer fluid of height $$h$$:
$$\Delta P = \rho' g h$$

where $$\rho'$$ is the density of the manometer fluid.

Therefore:
$$h = \frac{\rho v^2}{2\rho' g}$$

This shows that $$h \propto v^2$$, meaning:
$$\frac{h_2}{h_1} = \frac{v_2^2}{v_1^2}$$

To double $$h$$ (so $$h_2 = 2h_1$$):
$$2 = \frac{v_2^2}{v_1^2}$$
$$\frac{v_2}{v_1} = \sqrt{2} \approx 1.41$$

**Is this independent of the fluids?**

The factor $$\sqrt{2}$$ is independent of both the moving fluid density $$\rho$$ and the manometer fluid density $$\rho'$$. While the actual value of $$h$$ depends on these densities, the *ratio* of heights depends only on the ratio of velocities squared.

**Discussion**

The wind speed must increase by a factor of $$\sqrt{2} \approx 1.41$$ (about 41%) to double the manometer reading. This square-root relationship means that pitot tubes become less sensitive at higher speeds—small changes in $$h$$ correspond to larger changes in $$v$$.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If the pressure reading of your pitot tube is 15.0 mm Hg at a speed of 200 km/h, what will it be at 700 km/h at the same altitude?

</div>
<div class="solution" markdown="1">
**Strategy**

Since the pressure difference in a pitot tube is proportional to $$v^2$$, we can use the ratio of velocities squared to find the new pressure reading.

**Solution**

Given:
- Initial reading: $$h_1 = 15.0 \text{ mm Hg}$$ at $$v_1 = 200 \text{ km/h}$$
- Final velocity: $$v_2 = 700 \text{ km/h}$$

From Bernoulli's principle, the pressure reading (height) is proportional to $$v^2$$:
$$\frac{h_2}{h_1} = \frac{v_2^2}{v_1^2}$$

Solving for $$h_2$$:
$$h_2 = h_1 \times \frac{v_2^2}{v_1^2} = 15.0 \text{ mm Hg} \times \frac{(700 \text{ km/h})^2}{(200 \text{ km/h})^2}$$

$$h_2 = 15.0 \text{ mm Hg} \times \frac{490,000}{40,000} = 15.0 \text{ mm Hg} \times 12.25$$

$$h_2 = 184 \text{ mm Hg}$$

**Discussion**

The pressure reading at 700 km/h is **184 mm Hg**. The velocity increased by a factor of 3.5, but the pressure reading increased by a factor of 12.25 (which is 3.5²). This illustrates the quadratic relationship between velocity and the dynamic pressure measured by a pitot tube. The new reading of 184 mm Hg is about 24.5 kPa, a substantial pressure that pilots and instrumentation must account for.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the maximum height to which water could be squirted with the hose in [[Example 2]](../contents/ch12FlowRateAndItsRelationsToVelocity#Example2) example if it: (a) Emerges from the nozzle. (b) Emerges with the nozzle removed, assuming the same flow rate.

</div>
<div class="solution" markdown="1">
**Strategy**

We use energy conservation (Bernoulli's equation). At the maximum height, all kinetic energy is converted to gravitational potential energy. From Example 2 in the previous section, the nozzle velocity is 25.5 m/s and the hose velocity is 1.96 m/s.

**Solution**

At maximum height, all kinetic energy converts to potential energy:
$$\frac{1}{2}v^2 = gh_{max}$$
$$h_{max} = \frac{v^2}{2g}$$

**(a)** With nozzle (v = 25.5 m/s):
$$h_{max} = \frac{(25.5 \text{ m/s})^2}{2(9.80 \text{ m/s}^2)} = \frac{650.25}{19.6} = 33.2 \text{ m}$$

**(b)** Without nozzle (v = 1.96 m/s):
$$h_{max} = \frac{(1.96 \text{ m/s})^2}{2(9.80 \text{ m/s}^2)} = \frac{3.84}{19.6} = 0.196 \text{ m} \approx 0.20 \text{ m}$$

**Discussion**

Water from the nozzle can reach a maximum height of **(a) 33.2 m** (about 109 feet), while without the nozzle it can only reach **(b) 0.20 m** (about 8 inches). The nozzle increases the exit velocity by a factor of 13, which increases the maximum height by a factor of 13² ≈ 169. This dramatic difference demonstrates why fire hoses use nozzles to reach upper floors of buildings.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Every few years, winds in Boulder, Colorado, attain sustained speeds of 45.0 m/s (about 100 mi/h) when the jet stream descends during early spring. Approximately what is the force due to the Bernoulli effect on a roof having an area of  $$220 {\text{m}}^{2} $$ ?
 Typical air density in Boulder is  $$1.14 {\text{kg/m}}^{3} $$ ,
 and the corresponding atmospheric pressure is  $$ 8.89 \times 10^{4}  {\text{N/m}}^{2} $$ .
 (Bernoulli's principle as stated in the text assumes laminar flow. Using the principle here produces only an approximate result, because there is significant turbulence.)

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle comparing the fast-moving air above the roof to the still air inside the building. The pressure difference creates an upward force on the roof.

**Solution**

Given:
- Wind speed: $$v = 45.0 \text{ m/s}$$
- Roof area: $$A = 220 \text{ m}^2$$
- Air density: $$\rho = 1.14 \text{ kg/m}^3$$

Using Bernoulli's principle, the pressure difference is:
$$\Delta P = \frac{1}{2}\rho v^2 = \frac{1}{2}(1.14 \text{ kg/m}^3)(45.0 \text{ m/s})^2$$

$$\Delta P = \frac{1}{2}(1.14)(2025) = 1154 \text{ N/m}^2 \approx 1.15 \text{ kPa}$$

The upward force on the roof is:
$$F = \Delta P \times A = (1154 \text{ N/m}^2)(220 \text{ m}^2) = 2.54 \times 10^5 \text{ N}$$

**Discussion**

The force due to the Bernoulli effect on the roof is approximately **2.54 × 10⁵ N** (about 57,000 pounds or 28.5 tons). This enormous upward force explains why roofs can be lifted off buildings during high-wind events. Since this force exceeds the weight of many residential roofs, proper anchoring is essential in areas prone to severe winds. Note that this is an approximation since real wind flow involves significant turbulence.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the approximate force on a square meter of sail, given the horizontal velocity of the wind is 6.00 m/s parallel to its front surface and 3.50 m/s along its back surface. Take the density of air to be  $$1.29 \text{kg}{\text{/m}}^{3} $$ .
 (The calculation, based on Bernoulli's principle, is approximate due to the effects of turbulence.) (b) Discuss whether this force is great enough to be effective for propelling a sailboat.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle to find the pressure difference between the front and back surfaces of the sail, then calculate the resulting force.

**Solution**

Given:
- Front surface wind speed: $$v_f = 6.00 \text{ m/s}$$
- Back surface wind speed: $$v_b = 3.50 \text{ m/s}$$
- Air density: $$\rho = 1.29 \text{ kg/m}^3$$
- Area: $$A = 1.00 \text{ m}^2$$

**(a)** Using Bernoulli's principle:
$$P_f + \frac{1}{2}\rho v_f^2 = P_b + \frac{1}{2}\rho v_b^2$$

The pressure difference is:
$$\Delta P = P_b - P_f = \frac{1}{2}\rho(v_f^2 - v_b^2)$$

$$\Delta P = \frac{1}{2}(1.29 \text{ kg/m}^3)[(6.00 \text{ m/s})^2 - (3.50 \text{ m/s})^2]$$

$$\Delta P = \frac{1}{2}(1.29)(36.0 - 12.25) = \frac{1}{2}(1.29)(23.75) = 15.3 \text{ N/m}^2$$

Force per square meter:
$$F = \Delta P \times A = 15.3 \text{ N/m}^2 \times 1.00 \text{ m}^2 = 15.3 \text{ N}$$

**(b)** For a typical small sailboat with 15-20 m² of sail area:
$$F_{total} = 15.3 \text{ N/m}^2 \times 20 \text{ m}^2 = 306 \text{ N}$$

This force of about 300 N (68 pounds) is certainly sufficient to propel a small sailboat. Even accounting for the fact that not all this force acts in the desired direction (component resolution is needed), a significant forward thrust remains. Combined with the low resistance of a well-designed hull moving through water, this force can produce sailing speeds of several meters per second.

**Discussion**

The force on a square meter of sail is approximately **(a) 15.3 N**. **(b)** Yes, this force is effective for propelling a sailboat. A typical sail of 15-20 m² would experience about 230-310 N of force, which is adequate for moving a small boat efficiently through water where drag forces are relatively low.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the pressure drop due to the Bernoulli effect as water goes into a 3.00-cm-diameter nozzle from a 9.00-cm-diameter fire hose while carrying a flow of 40.0 L/s? (b) To what maximum height above the nozzle can this water rise? (The actual height will be significantly smaller due to air resistance.)

</div>
<div class="solution" markdown="1">
**Strategy**

(a) We first calculate the velocities in the hose and nozzle using continuity, then apply Bernoulli's equation to find the pressure drop.
(b) We use energy conservation to find the maximum height from the nozzle exit velocity.

**Solution**

Given:
- Hose diameter: $$d_1 = 9.00 \text{ cm} = 0.0900 \text{ m}$$
- Nozzle diameter: $$d_2 = 3.00 \text{ cm} = 0.0300 \text{ m}$$
- Flow rate: $$Q = 40.0 \text{ L/s} = 0.0400 \text{ m}^3/\text{s}$$
- Water density: $$\rho = 1000 \text{ kg/m}^3$$

**(a)** Calculate velocities:
$$A_1 = \pi r_1^2 = \pi (0.0450 \text{ m})^2 = 6.36 \times 10^{-3} \text{ m}^2$$
$$A_2 = \pi r_2^2 = \pi (0.0150 \text{ m})^2 = 7.07 \times 10^{-4} \text{ m}^2$$

$$v_1 = \frac{Q}{A_1} = \frac{0.0400 \text{ m}^3/\text{s}}{6.36 \times 10^{-3} \text{ m}^2} = 6.29 \text{ m/s}$$

$$v_2 = \frac{Q}{A_2} = \frac{0.0400 \text{ m}^3/\text{s}}{7.07 \times 10^{-4} \text{ m}^2} = 56.6 \text{ m/s}$$

Apply Bernoulli's equation (at same height):
$$P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$$

$$\Delta P = P_1 - P_2 = \frac{1}{2}\rho(v_2^2 - v_1^2)$$

$$\Delta P = \frac{1}{2}(1000 \text{ kg/m}^3)[(56.6)^2 - (6.29)^2] \text{ m}^2/\text{s}^2$$

$$\Delta P = \frac{1}{2}(1000)(3204 - 39.6) = \frac{1}{2}(1000)(3164) = 1.58 \times 10^6 \text{ N/m}^2$$

**(b)** Maximum height from nozzle exit velocity:
$$h_{max} = \frac{v_2^2}{2g} = \frac{(56.6 \text{ m/s})^2}{2(9.80 \text{ m/s}^2)} = \frac{3204}{19.6} = 163 \text{ m}$$

**Discussion**

The pressure drop is **(a) 1.58 × 10⁶ N/m²** (about 16 atmospheres), and the water can theoretically rise to **(b) 163 m** (535 feet). This remarkable height explains why fire hoses can reach the upper floors of tall buildings. In practice, air resistance significantly reduces this height, but the calculation shows the tremendous energy available from the high-pressure water supply.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Using Bernoulli's equation, show that the measured fluid speed $$v $$ for a pitot tube, like the one in [[Figure 3]](#Figure3)(b), is given by

<div class="equation" >
 $$v={\left(\frac{2\rho^{\prime} gh}{\rho }\right)}^{1/2}, $$
</div>
where  $$h $$
 is the height of the manometer fluid,  $$\rho^{\prime}  $$
 is the density of the manometer fluid,  $$\rho  $$
 is the density of the moving fluid, and   $$g $$ is the acceleration due to gravity. (Note that   $$v $$ is indeed proportional to the square root of   $$h $$, as stated in the text.) (b) Calculate  $$v $$  for moving air if a mercury manometer's  $$h $$  is 0.200 m.

</div>
<div class="solution" markdown="1">
**Strategy**

(a) We apply Bernoulli's equation at two points: one where flow is stagnant ($$v_1 = 0$$) and one where flow has velocity $$v$$. The pressure difference is measured by the manometer.
(b) We substitute known values for air and mercury to calculate the velocity.

**Solution**

**(a)** Derivation:

At point 1 (stagnation point, where flow stops): $$v_1 = 0$$
At point 2 (in the moving flow): $$v_2 = v$$

Applying Bernoulli's equation at the same height:
$$P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$$

$$P_1 + 0 = P_2 + \frac{1}{2}\rho v^2$$

$$P_1 - P_2 = \frac{1}{2}\rho v^2$$

The manometer measures this pressure difference. For a column of manometer fluid of height $$h$$:
$$P_1 - P_2 = \rho' g h$$

where $$\rho'$$ is the density of the manometer fluid.

Setting these equal:
$$\rho' g h = \frac{1}{2}\rho v^2$$

Solving for $$v$$:
$$v^2 = \frac{2\rho' g h}{\rho}$$

$$v = \sqrt{\frac{2\rho' g h}{\rho}} = \left(\frac{2\rho' g h}{\rho}\right)^{1/2}$$

**(b)** Calculate velocity for air with mercury manometer:

Given:
- $$h = 0.200 \text{ m}$$
- $$\rho' = 13,600 \text{ kg/m}^3$$ (mercury density)
- $$\rho = 1.29 \text{ kg/m}^3$$ (air density at STP)
- $$g = 9.80 \text{ m/s}^2$$

$$v = \sqrt{\frac{2(13,600 \text{ kg/m}^3)(9.80 \text{ m/s}^2)(0.200 \text{ m})}{1.29 \text{ kg/m}^3}}$$

$$v = \sqrt{\frac{53,312}{1.29}} = \sqrt{41,327} = 203 \text{ m/s}$$

**Discussion**

**(a)** The derivation shows that velocity is proportional to $$\sqrt{h}$$, confirming the text's statement. **(b)** For a 0.200 m mercury column, the air velocity is approximately **203 m/s** (about 730 km/h or Mach 0.59). This high velocity is reasonable since mercury is very dense compared to air (ratio of about 10,500:1), so even a small column of mercury corresponds to a large dynamic pressure from high-speed air.
</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

Bernoulli’s equation
: the equation resulting from applying conservation of energy to an
incompressible frictionless fluid: $$P+\frac{1}{2}\rho v^{2} +\rho g h =\text{constant} $$, through the fluid

Bernoulli’s principle
: Bernoulli’s equation applied at constant depth:

$${P}_{1}+\frac{1}{2}\rho v_{1}^{2}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}\text{.} $$

</div>