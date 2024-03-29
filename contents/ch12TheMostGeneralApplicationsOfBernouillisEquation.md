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
Based on Bernoulli’s equation, what are three forms of energy in a fluid? (Note that these forms are conservative, unlike heat transfer and other dissipative forms not included in Bernoulli’s equation.)

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Water that has emerged from a hose into the atmosphere has a gauge pressure of zero. Why? When you put your hand in front of the emerging stream you feel a force, yet the water’s gauge pressure is zero. Explain where the force comes from in terms of energy.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The old rubber boot shown in [[Figure 3]](#Figure3) has two leaks. To what maximum height can the water squirt from Leak 1? How does the velocity of water emerging from Leak 2 differ from that of leak 1? Explain your responses in terms of energy.

![The picture shows a boot filled with water. The water is shown emerging from two leaks in the old boot, one in front and another at the back. The leaks are at the same height. The leaks are labeled as Leak 1 and Leak 2 respectively.](../resources/Figure_12_03_03.jpg "Water emerges from two leaks in an old boot.")
{: #Figure3}

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Water pressure inside a hose nozzle can be less than atmospheric pressure due to the Bernoulli effect. Explain in terms of energy how the water can emerge from the nozzle against the opposing atmospheric pressure.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Hoover Dam on the Colorado River is the highest dam in the United States at 221 m, with an output of 1300 MW. The dam generates electricity with water taken from a depth of 150 m and an average flow rate of  $$650 {\text{m}}^{3}\text{/s} $$ .
 (a) Calculate the power in this flow. (b) What is the ratio of this power to the facility’s average of 680 MW?

</div>
<div class="solution" markdown="1">
(a)  $$ 9.56 \times 10^{8}  \text{W} $$
(b) 1.4

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A frequently quoted rule of thumb in aircraft design is that wings should produce about 1000 N of lift per square meter of wing. (The fact that a wing has a top and bottom surface does not double its area.) (a) At takeoff, an aircraft travels at 60.0 m/s, so that the air speed relative to the bottom of the wing is 60.0 m/s. Given the sea level density of air to be  $$ 1.29 {\text{kg/m}}^{3} $$ ,
 how fast must it move over the upper surface to create the ideal lift? (b) How fast must air move over the upper surface at a cruising speed of 245 m/s and at an altitude where air density is one-fourth that at sea level? (Note that this is not all of the aircraft’s lift—some comes from the body of the plane, some from engine thrust, and so on. Furthermore, Bernoulli’s principle gives an approximate answer because flow over the wing creates turbulence.)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The left ventricle of a resting adult’s heart pumps blood at a flow rate of  $$ 83.0 {\text{cm}}^{3}\text{/s} $$ ,
 increasing its pressure by 110 mm Hg, its speed from zero to 30.0 cm/s, and its height by 5.00 cm. (All numbers are averaged over the entire heartbeat.) Calculate the total power output of the left ventricle. Note that most of the power is used to increase blood pressure.

</div>
<div class="solution" markdown="1">
1.26 W

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A sump pump (used to drain water from the basement of houses built below the water table) is draining a flooded basement at the rate of 0.750 L/s, with an output pressure of  $$ 3.00 \times 10^{5}  {\text{N/m}}^{2} $$ .
 (a) The water enters a hose with a 3.00-cm inside diameter and rises 2.50 m above the pump. What is its pressure at this point? (b) The hose goes over the foundation wall, losing 0.500 m in height, and widens to 4.00 cm in diameter. What is the pressure now? You may neglect frictional losses in both parts of the problem.

</div>
</div>
