---
title: The Most General Applications of Bernoulli’s Equation
layout: page
sectionNumber: 3
chapterNumber: 12
---

<div class="abstract" markdown="1">
* Calculate using Torricelli’s theorem.
* Calculate power in fluid flow.
</div>

### Torricelli’s Theorem

[[Figure 1]](#Figure1) shows water gushing from a large tube through a dam. What
is its speed as it emerges? Interestingly, if resistance is negligible, the
speed is just what it would be if the water fell a distance $$h $$ from the
surface of the reservoir; the water’s speed is independent of the size of the
opening. Let us check this out. Bernoulli’s equation must be used since the
depth is not constant. We consider water flowing from the surface (point 1) to
the tube’s outlet (point 2). Bernoulli’s equation as stated in previously is

<div class="equation" >
 $${P}_{1}+\frac{1}{2}\rho v_{1}^{2}+\rho gh_{1}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}+\rho gh_{2}\text{.} $$
</div>

Both $${P}_{1} $$ and $${P}_{2} $$ equal atmospheric pressure ( $${P}_{1} $$ is
atmospheric pressure because it is the pressure at the top of the reservoir.
$${P}_{2} $$ must be atmospheric pressure, since the emerging water is
surrounded by the atmosphere and cannot have a pressure different from
atmospheric pressure.) and subtract out of the equation, leaving

<div class="equation" >
 $$\frac{1}{2}\rho v_{1}^{2}+\rho gh_{1}=\frac{1}{2}\rho v_{2}^{2}+\rho gh_{2}\text{.} $$
</div>

Solving this equation for $${v}_{2}^{2} $$ , noting that the density $$\rho $$
cancels (because the fluid is incompressible), yields

<div class="equation" >
 $${v}_{2}^{2}={v}_{1}^{2}+2g\left({h}_{1}-{h}_{2}\right)\text{.} $$
</div>

We let $$h={h}_{1}-{h}_{2} $$ ; the equation then becomes

<div class="equation" >
 $${v}_{2}^{2}={v}_{1}^{2}+2gh $$
</div>

where $$h $$ is the height dropped by the water. This is simply a kinematic
equation for any object falling a distance $$h $$ with negligible resistance. In
fluids, this last equation is called *Torricelli’s theorem*. Note that the
result is independent of the velocity’s direction, just as we found when
applying conservation of energy to falling objects.

![Part a of the figure shows a photograph of a dam with water gushing from a large tube at the base of a dam. Part b shows the schematic diagram for the flow of water in a reservoir. The reservoir is shown in the form of a triangular section with a horizontal opening along the base little near to the base. The water is shown to flow through the horizontal opening near the base. The height which it falls is shown as h two. The pressure and velocity of water at this point are P two and v two. The height to which the water can fall if it falls from a height h above the opening is given by h 2. The pressure and velocity of water at this point are P one and v one.](../resources/Figure_12_03_01.jpg "(a) Water gushes from the base of the Studen Kladenetz dam in Bulgaria. (credit: Kiril Kapustin; http://www.ImagesFromBulgaria.com) (b) In the absence of significant resistance, water flows from the reservoir with the same speed it would have if it fell the distance \( h \) without friction. This is an example of Torricelli&#x2019;s theorem.")
{: #Figure1}

![Figure shows a fire engine that is stationed next to a tall building. A floor of the building ten meters above the ground has caught fire. The flames are shown coming out. A fire man has reached close to the fire caught area using a ladder and is spraying water on the fire using a hose attached to the fire engine.](../resources/Figure_12_03_02.jpg "Pressure in the nozzle of this fire hose is less than at ground level for two reasons: the water has to go uphill to get to the nozzle, and speed increases in the nozzle. In spite of its lowered pressure, the water can exert a large force on anything it strikes, by virtue of its kinetic energy. Pressure in the water stream becomes equal to atmospheric pressure once it emerges into the air.")
{: #Figure2}

All preceding applications of Bernoulli’s equation involved simplifying
conditions, such as constant height or constant pressure. The next example is a
more general application of Bernoulli’s equation in which pressure, velocity,
and height all change. (See [[Figure 2]](#Figure2).)

<div class="example" markdown="1">
<div class="title">
Calculating Pressure: A Fire Hose Nozzle
</div>
Fire hoses used in major structure fires have inside diameters of 6.40 cm. Suppose such a hose carries a flow of 40.0 L/s starting at a gauge pressure of  $$ 1.62 \times 10^{6}  {\text{N/m}}^{2} $$ .
 The hose goes 10.0 m up a ladder to a nozzle having an inside diameter of 3.00 cm. Assuming negligible resistance, what is the pressure in the nozzle?

**Strategy**

Here we must use Bernoulli’s equation to solve for the pressure, since depth is
not constant.

**Solution**

Bernoulli’s equation states

<div class="equation">
 $${P}_{1}+\frac{1}{2}\rho v_{1}^{2}+\rho gh_{1}={P}_{2}+\frac{1}{2}\rho v_{2}^{2}+\rho gh_{2}\text{,} $$
</div>
where the subscripts 1 and 2 refer to the initial conditions at ground level and the final conditions inside the nozzle, respectively. We must first find the speeds  $${v}_{1} $$
 and  $${v}_{2} $$ .
 Since  $$Q={A}_{1}{v}_{1} $$ , we get

<div class="equation">
 $${v}_{1}=\frac{Q}{ {A}_{1}}=\frac{ 40.0 \times 10^{-3}  {\text{m}}^{3}\text{/s}}{\pi {\left( 3.20 \times 10^{-2}  \text{m} \right)}^{2}}= 12.4 \text{m/s}\text{.} $$
</div>
Similarly, we find

<div class="equation">
 $${v}_{2}=56.6 \text{m/s}\text{.} $$
</div>
(This rather large speed is helpful in reaching the fire.) Now, taking  $${h}_{1} $$
 to be zero, we solve Bernoulli’s equation for  $${P}_{2} $$
\:

<div class="equation">
 $${P}_{2}={P}_{1}+\frac{1}{2}\rho \left({v}_{1}^{2}-{v}_{2}^{2}\right)-\rho gh_{2}\text{.} $$
</div>
Substituting known values yields

<div class="equation">
 $${P}_{2}= 1.62 \times 10^{6}  {\text{N/m}}^{2}+\frac{1}{2}\left(1000 {\text{kg/m}}^{3}\right)\left[  { \left( 12.4 \text{m/s} \right)}^{2}-{\left(  56.6 \text{m/s} \right)}^{2}\right]  -\left(1000 {\text{kg/m}}^{3}\right)\left( 9.80 {\text{m/s}}^{2}\right)\left( 10.0 \text{m}\right)=0\text{.} $$
</div>
**Discussion**

This value is a gauge pressure, since the initial pressure was given as a gauge
pressure. Thus, the nozzle pressure equals atmospheric pressure, as it must
because the water exits into the atmosphere without changes in its conditions.

</div>

### Power in Fluid Flow

Power is the *rate* at which work is done or energy in any form is used or
supplied. To see the relationship of power to fluid flow, consider Bernoulli’s
equation:

<div class="equation">
 $$P+\frac{1}{2}\rho v^{2}+\rho gh=\text{constant}\text{.} $$
</div>

All three terms have units of energy per unit volume, as discussed in the
previous section. Now, considering units, if we multiply energy per unit volume
by flow rate (volume per unit time), we get units of power. That is, $$\left(
E/V\right)\left(V/t\right)=E/t $$ . This means that if we multiply Bernoulli’s
equation by flow rate $$Q $$ , we get power. In equation form, this is

<div class="equation">
 $$\left(P+\frac{1}{2}\rho v^{2}+\rho gh\right)Q=\text{power}\text{.} $$
</div>

Each term has a clear physical meaning. For example, $$P Q $$ is the power
supplied to a fluid, perhaps by a pump, to give it its pressure $$P $$ .
Similarly, $$\frac{1}{2}\rho v^{2}Q $$ is the power supplied to a fluid to give
it its kinetic energy. And $$\rho g h Q $$ is the power going to
gravitational potential energy.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Power
</div>
Power is defined as the rate of energy transferred, or  $$E/t $$ . Fluid flow involves several types of power. Each type of power is identified with a specific type of energy being expended or changed in form.

</div>

<div class="example" markdown="1">
<div class="title">
Calculating Power in a Moving Fluid
</div>
Suppose the fire hose in the previous example is fed by a pump that receives water through a hose with a 6.40-cm diameter coming from a hydrant with a pressure of  $$ 0.700 \times 10^{6}  {\text{N/m}}^{2} $$ .
 What power does the pump supply to the water?

**Strategy**

Here we must consider energy forms as well as how they relate to fluid flow.
Since the input and output hoses have the same diameters and are at the same
height, the pump does not change the speed of the water nor its height, and so
the water’s kinetic energy and gravitational potential energy are unchanged.
That means the pump only supplies power to increase water pressure by $$ 0.92
\times 10^{6} {\text{N/m}}^{2} $$
(from $$ 0.700 \times 10^{6} {\text{N/m}}^{2} $$ to $$ 1.62 \times 10^{6}
{\text{N/m}}^{2} $$ ).

**Solution**

As discussed above, the power associated with pressure is

<div class="equation">
 $$\begin{array}{lll}\text{power}& =& P Q\\
\text{power} & =& \left( 0.920 \times 10^{6}  {\text{N/m}}^{2}\right)\left( 40.0 \times 10^{-3}  {\text{m}}^{3}\text{/s}\right)\text{.}\\  
\text{power} & =&  3.68 \times 10^{4}  \text{W}= 36.8 \text{kW}\end{array} $$
</div>
**Discussion**

Such a substantial amount of power requires a large pump, such as is found on
some fire trucks. (This kilowatt value converts to about 50 hp.) The pump in
this example increases only the water’s pressure. If a pump—such as the
heart—directly increases velocity and height as well as pressure, we would have
to calculate all three terms to find the power it supplies.

</div>

### Summary

* Power in fluid flow is given by the equation $$\left({P}_{1}+\frac{1}{2}\rho
  v^{2}+\rho gh\right)Q=\text{power}\text{,} $$ where the first term is power
  associated with pressure, the second is power associated with velocity, and
  the third is power associated with height.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Based on Bernoulli's equation, what are three forms of energy in a fluid? (Note that these forms are conservative, unlike heat transfer and other dissipative forms not included in Bernoulli's equation.)

</div>
<div class="solution" markdown="1">
**Strategy**

We analyze each term in Bernoulli's equation and identify the type of energy it represents.

**Solution**

Bernoulli's equation $$P + \frac{1}{2}\rho v^2 + \rho gh = \text{constant}$$ contains three forms of energy per unit volume:

1. **Pressure energy** ($$P$$): This represents the work per unit volume that can be done by the fluid due to its pressure. It's sometimes called "flow work" or "pressure potential energy." When fluid is pushed from one region to another, pressure does work on it.

2. **Kinetic energy** ($$\frac{1}{2}\rho v^2$$): This is the kinetic energy per unit volume associated with the bulk motion of the fluid. It represents the energy a fluid has due to its velocity.

3. **Gravitational potential energy** ($$\rho gh$$): This is the potential energy per unit volume due to the fluid's height in a gravitational field. It represents the work that gravity can do on the fluid if it moves to a lower height.

**Discussion**

All three forms are conservative—they can be converted back and forth without energy loss (in an ideal, frictionless fluid). Bernoulli's equation states that the sum of these three energy forms remains constant along a streamline, which is a statement of energy conservation for ideal fluids.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Water that has emerged from a hose into the atmosphere has a gauge pressure of zero. Why? When you put your hand in front of the emerging stream you feel a force, yet the water's gauge pressure is zero. Explain where the force comes from in terms of energy.

</div>
<div class="solution" markdown="1">
**Strategy**

We consider what happens when water transitions from confined flow to free flow, and identify the source of force on an obstruction.

**Solution**

**Why gauge pressure is zero:**
Once water exits the hose and enters the atmosphere, there's nothing to maintain a pressure difference between the water and its surroundings. The water is now surrounded by air at atmospheric pressure, so it equilibrates to atmospheric pressure. Gauge pressure (which measures pressure relative to atmospheric) is therefore zero.

**Where the force comes from:**
The force you feel comes from the water's **kinetic energy**, not its pressure. When the water stream strikes your hand:
- The water has significant velocity and therefore kinetic energy ($$\frac{1}{2}\rho v^2$$)
- Your hand stops the water, reducing its velocity to zero
- This change in momentum requires a force (Newton's second law: $$F = \frac{dp}{dt}$$)
- The kinetic energy is transferred to your hand as the work done by this force

**Discussion**

This is an excellent example of the difference between pressure and kinetic energy in a fluid. A fire hose can knock someone down not because of high pressure (which is zero once the water exits), but because of the high kinetic energy of the fast-moving water. The power delivered equals the kinetic energy per unit volume times the flow rate: $$\frac{1}{2}\rho v^2 \times Q$$.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The old rubber boot shown in [[Figure 3]](#Figure3) has two leaks. To what maximum height can the water squirt from Leak 1? How does the velocity of water emerging from Leak 2 differ from that of leak 1? Explain your responses in terms of energy.

![The picture shows a boot filled with water. The water is shown emerging from two leaks in the old boot, one in front and another at the back. The leaks are at the same height. The leaks are labeled as Leak 1 and Leak 2 respectively.](../resources/Figure_12_03_03.jpg "Water emerges from two leaks in an old boot.")
{: #Figure3}

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Torricelli's theorem, recognizing that the velocity of efflux depends on the height of water above the leak, and the maximum height of the spray depends on converting kinetic energy back to potential energy.

**Solution**

**Maximum height from Leak 1:**
By Torricelli's theorem, water exits with velocity $$v = \sqrt{2gh}$$ where $$h$$ is the height of the water surface above the leak. The water can squirt to a maximum height equal to the height of the water surface above the leak—i.e., it can rise back to the level of the water surface in the boot.

This makes sense from energy conservation: the gravitational potential energy at the water surface converts to kinetic energy at the leak, which then converts back to gravitational potential energy as the water rises.

**Velocity comparison for Leak 1 and Leak 2:**
Since both leaks are at the same height (as shown in the figure), and both have the same height of water above them, **the velocities are the same**. Torricelli's theorem gives $$v = \sqrt{2gh}$$ where $$h$$ is measured from the water surface to the leak—this depends only on vertical distance, not horizontal position.

Both streams have the same kinetic energy per unit volume because they come from the same depth below the water surface.

**Discussion**

This problem illustrates that the exit velocity depends only on the depth below the surface, not on the direction of the opening or the shape of the container. The energy analysis shows perfect conversion between potential and kinetic energy in an ideal (frictionless) situation.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Water pressure inside a hose nozzle can be less than atmospheric pressure due to the Bernoulli effect. Explain in terms of energy how the water can emerge from the nozzle against the opposing atmospheric pressure.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply energy conservation (Bernoulli's equation) to explain how water with sub-atmospheric pressure can still exit against atmospheric pressure.

**Solution**

Although the pressure inside the nozzle is less than atmospheric, the water can still emerge because it possesses significant kinetic energy. The total energy per unit volume must be considered, not just the pressure term.

From Bernoulli's equation:
$$P + \frac{1}{2}\rho v^2 + \rho gh = \text{constant}$$

Inside the nozzle:
- Pressure: $$P_{nozzle} < P_{atm}$$ (lower than atmospheric)
- Kinetic energy: $$\frac{1}{2}\rho v^2$$ is very large (high velocity)
- Total energy: still substantial

The water uses its kinetic energy to "push through" the adverse pressure gradient at the exit. Think of it like throwing a ball upward—even though gravity opposes the motion, the ball rises because it has kinetic energy. Similarly, the water's kinetic energy is sufficient to overcome the pressure difference.

At the exit point, some kinetic energy is converted to pressure energy as the water adjusts to atmospheric pressure, but the remaining kinetic energy carries the water forward as a high-speed stream.

**Discussion**

This explains why nozzles are effective despite creating regions of sub-atmospheric pressure—the energy has simply been transformed from pressure form to kinetic form, and the total remains conserved. The high-velocity stream can still exert large forces on objects it strikes because it retains substantial kinetic energy.
</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Hoover Dam on the Colorado River is the highest dam in the United States at 221 m, with an output of 1300 MW. The dam generates electricity with water taken from a depth of 150 m and an average flow rate of  $$650 {\text{m}}^{3}\text{/s} $$ .
 (a) Calculate the power in this flow. (b) What is the ratio of this power to the facility's average of 680 MW?

</div>
<div class="solution" markdown="1">
**Strategy**

The power in the flow comes primarily from the gravitational potential energy of the water. We use the power formula $$\text{Power} = \rho g h Q$$ for the potential energy component.

**Solution**

Given:
- Depth (height): $$h = 150 \text{ m}$$
- Flow rate: $$Q = 650 \text{ m}^3/\text{s}$$
- Water density: $$\rho = 1000 \text{ kg/m}^3$$
- Average facility output: 680 MW

**(a)** Calculate the power in the flow:
$$\text{Power} = \rho g h Q$$
$$\text{Power} = (1000 \text{ kg/m}^3)(9.80 \text{ m/s}^2)(150 \text{ m})(650 \text{ m}^3/\text{s})$$
$$\text{Power} = 9.56 \times 10^8 \text{ W} = 956 \text{ MW}$$

**(b)** Ratio to facility average:
$$\text{Ratio} = \frac{956 \text{ MW}}{680 \text{ MW}} = 1.41 \approx 1.4$$

**Discussion**

The power in the water flow is **(a) 9.56 × 10⁸ W (956 MW)**, and the ratio to the facility's average output is **(b) 1.4**. The fact that the ratio exceeds 1 indicates energy losses in the system—about 29% of the available power is lost to turbine inefficiency, friction, generator losses, and other factors. This ~70% efficiency is typical for large hydroelectric facilities.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A frequently quoted rule of thumb in aircraft design is that wings should produce about 1000 N of lift per square meter of wing. (The fact that a wing has a top and bottom surface does not double its area.) (a) At takeoff, an aircraft travels at 60.0 m/s, so that the air speed relative to the bottom of the wing is 60.0 m/s. Given the sea level density of air to be  $$ 1.29 {\text{kg/m}}^{3} $$ ,
 how fast must it move over the upper surface to create the ideal lift? (b) How fast must air move over the upper surface at a cruising speed of 245 m/s and at an altitude where air density is one-fourth that at sea level? (Note that this is not all of the aircraft's lift—some comes from the body of the plane, some from engine thrust, and so on. Furthermore, Bernoulli's principle gives an approximate answer because flow over the wing creates turbulence.)

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's principle: the pressure difference between upper and lower wing surfaces creates lift. The lift per unit area equals the pressure difference.

**Solution**

The lift per unit area equals the pressure difference:
$$\frac{L}{A} = P_{bottom} - P_{top} = \frac{1}{2}\rho(v_{top}^2 - v_{bottom}^2)$$

Solving for $$v_{top}$$:
$$v_{top} = \sqrt{v_{bottom}^2 + \frac{2(L/A)}{\rho}}$$

**(a)** At takeoff (sea level):
- $$v_{bottom} = 60.0 \text{ m/s}$$
- $$L/A = 1000 \text{ N/m}^2$$
- $$\rho = 1.29 \text{ kg/m}^3$$

$$v_{top} = \sqrt{(60.0)^2 + \frac{2(1000)}{1.29}} = \sqrt{3600 + 1550} = \sqrt{5150} = 71.8 \text{ m/s}$$

**(b)** At cruising altitude:
- $$v_{bottom} = 245 \text{ m/s}$$
- $$\rho = 1.29/4 = 0.323 \text{ kg/m}^3$$

$$v_{top} = \sqrt{(245)^2 + \frac{2(1000)}{0.323}} = \sqrt{60,025 + 6192} = \sqrt{66,217} = 257 \text{ m/s}$$

**Discussion**

At takeoff, air must move at **(a) 71.8 m/s** over the upper surface (about 20% faster than the bottom). At cruising altitude, the upper surface speed must be **(b) 257 m/s** (only about 5% faster than the bottom). At higher altitudes, the lower air density means a larger velocity difference is needed for the same lift, but since the plane is already moving much faster, a smaller *percentage* increase is sufficient. The wing shape (camber and angle of attack) creates these velocity differences.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The left ventricle of a resting adult's heart pumps blood at a flow rate of  $$ 83.0 {\text{cm}}^{3}\text{/s} $$ ,
 increasing its pressure by 110 mm Hg, its speed from zero to 30.0 cm/s, and its height by 5.00 cm. (All numbers are averaged over the entire heartbeat.) Calculate the total power output of the left ventricle. Note that most of the power is used to increase blood pressure.

</div>
<div class="solution" markdown="1">
**Strategy**

The total power output includes three components from Bernoulli's equation: power to increase pressure, power to increase kinetic energy, and power to increase potential energy.

**Solution**

Given:
- Flow rate: $$Q = 83.0 \text{ cm}^3/\text{s} = 83.0 \times 10^{-6} \text{ m}^3/\text{s}$$
- Pressure increase: $$\Delta P = 110 \text{ mm Hg} = 110 \times 133 \text{ Pa} = 14,630 \text{ Pa}$$
- Velocity change: $$\Delta v = 30.0 \text{ cm/s} = 0.300 \text{ m/s}$$ (from 0 to 0.300 m/s)
- Height increase: $$\Delta h = 5.00 \text{ cm} = 0.0500 \text{ m}$$
- Blood density: $$\rho \approx 1060 \text{ kg/m}^3$$

**Power for pressure:**
$$P_1 = \Delta P \times Q = (14,630 \text{ N/m}^2)(83.0 \times 10^{-6} \text{ m}^3/\text{s}) = 1.21 \text{ W}$$

**Power for kinetic energy:**
$$P_2 = \frac{1}{2}\rho v^2 \times Q = \frac{1}{2}(1060)(0.300)^2(83.0 \times 10^{-6}) = 3.96 \times 10^{-3} \text{ W}$$

**Power for potential energy:**
$$P_3 = \rho g h \times Q = (1060)(9.80)(0.0500)(83.0 \times 10^{-6}) = 4.31 \times 10^{-2} \text{ W}$$

**Total power:**
$$P_{total} = P_1 + P_2 + P_3 = 1.21 + 0.004 + 0.043 = 1.26 \text{ W}$$

**Discussion**

The total power output of the left ventricle is approximately **1.26 W**. As noted, most of this power (about 96%) goes to increasing blood pressure. The kinetic and potential energy contributions are relatively small. This is about 1/5 of the total heart power output (both ventricles), and the heart operates continuously for a lifetime—a remarkable feat of engineering!
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A sump pump (used to drain water from the basement of houses built below the water table) is draining a flooded basement at the rate of 0.750 L/s, with an output pressure of  $$ 3.00 \times 10^{5}  {\text{N/m}}^{2} $$ .
 (a) The water enters a hose with a 3.00-cm inside diameter and rises 2.50 m above the pump. What is its pressure at this point? (b) The hose goes over the foundation wall, losing 0.500 m in height, and widens to 4.00 cm in diameter. What is the pressure now? You may neglect frictional losses in both parts of the problem.

</div>
<div class="solution" markdown="1">
**Strategy**

We apply Bernoulli's equation between points, accounting for changes in height and velocity (due to diameter changes). For each part, we calculate velocities using continuity, then apply Bernoulli's equation.

**Solution**

Given:
- Flow rate: $$Q = 0.750 \text{ L/s} = 7.50 \times 10^{-4} \text{ m}^3/\text{s}$$
- Initial pressure: $$P_0 = 3.00 \times 10^5 \text{ N/m}^2$$
- Hose diameter (narrow): $$d_1 = 3.00 \text{ cm} = 0.0300 \text{ m}$$
- Hose diameter (wide): $$d_2 = 4.00 \text{ cm} = 0.0400 \text{ m}$$

**Calculate velocities:**
$$A_1 = \pi (0.0150)^2 = 7.07 \times 10^{-4} \text{ m}^2$$
$$A_2 = \pi (0.0200)^2 = 1.26 \times 10^{-3} \text{ m}^2$$

$$v_1 = \frac{Q}{A_1} = \frac{7.50 \times 10^{-4}}{7.07 \times 10^{-4}} = 1.06 \text{ m/s}$$
$$v_2 = \frac{Q}{A_2} = \frac{7.50 \times 10^{-4}}{1.26 \times 10^{-3}} = 0.596 \text{ m/s}$$

**(a)** After rising 2.50 m (same diameter):
Using Bernoulli's equation with $$v$$ unchanged:
$$P_0 + \rho g h_0 = P_1 + \rho g h_1$$
$$P_1 = P_0 - \rho g \Delta h = 3.00 \times 10^5 - (1000)(9.80)(2.50)$$
$$P_1 = 3.00 \times 10^5 - 2.45 \times 10^4 = 2.76 \times 10^5 \text{ N/m}^2$$

**(b)** After going over the wall (2.50 - 0.50 = 2.00 m above pump, wider diameter):
Using Bernoulli's equation from pump to this point:
$$P_0 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2 + \rho g h_2$$

$$P_2 = P_0 + \frac{1}{2}\rho(v_1^2 - v_2^2) - \rho g h_2$$
$$P_2 = 3.00 \times 10^5 + \frac{1}{2}(1000)[(1.06)^2 - (0.596)^2] - (1000)(9.80)(2.00)$$
$$P_2 = 3.00 \times 10^5 + 384 - 1.96 \times 10^4 = 2.81 \times 10^5 \text{ N/m}^2$$

**Discussion**

The pressure at the top of the rise is **(a) 2.76 × 10⁵ N/m²**, and after going over the wall it is **(b) 2.81 × 10⁵ N/m²**. The pressure increases slightly after going over the wall for two reasons: the height decreased by 0.50 m, and the hose widened, reducing velocity. Both effects increase pressure according to Bernoulli's equation.
</div>
</div>
