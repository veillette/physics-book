---
title: 'Carnot’s Perfect Heat Engine: The Second Law of Thermodynamics Restated'
layout: page
sectionNumber: 4
chapterNumber: 15
---

<div class="abstract" markdown="1">
* Identify a Carnot cycle.
* Calculate maximum theoretical efficiency of a nuclear reactor.
* Explain how dissipative processes affect the ideal Carnot engine.
</div>

![Photograph of a novelty toy known as the drinking bird. It is made up of two glass bulbs connected to each other by a glass tube. The upper bulb is shaped like a bird’s head, and the tube looks like its neck. The lower bulb, which may be compared to the abdomen, contains methylene chloride that has been colored red. The bottom of the neck is attached to a pivot, and in front of the bird’s head is a glass of water.](../resources/Figure_15_04_01.jpg 'This novelty toy, known as the drinking bird, is an example of Carnot’s engine. It contains methylene chloride (mixed with a dye) in the abdomen, which boils at a very low temperature—about ( 100 \\text{ºF} ) . To operate, one gets the bird’s head wet. As the water evaporates, fluid moves up into the head, causing the bird to become top-heavy and dip forward back into the water. This cools down the methylene chloride in the head, and it moves back into the abdomen, causing the bird to become bottom heavy and tip up. Except for a very small input of energy—the original head-wetting—the bird becomes a perpetual motion machine of sorts. (credit: Arabesk.nl, Wikimedia Commons)')
{: #Figure1}

We know from the second law of thermodynamics that a heat engine cannot be 100%
efficient, since there must always be some heat transfer $${Q}_{\text{c}} $$ to
the environment, which is often called waste heat. How efficient, then, can a
heat engine be? This question was answered at a theoretical level in 1824 by a
young French engineer, Sadi Carnot (1796–1832), in his study of the
then-emerging heat engine technology crucial to the Industrial Revolution. He
devised a theoretical cycle, now called the **Carnot cycle**, which is the most
efficient cyclical process possible. The second law of thermodynamics can be
restated in terms of the Carnot cycle, and so what Carnot actually discovered
was this fundamental law. Any heat engine employing the Carnot cycle is called
a **Carnot engine**.

What is crucial to the Carnot cycle—and, in fact, defines it—is that only
reversible processes are used. Irreversible processes involve dissipative
factors, such as friction and turbulence. This increases heat transfer $${Q}_ {\text{c}} $$ to the environment and reduces the efficiency of the engine.
Obviously, then, reversible processes are superior.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Carnot Engine
</div>
Stated in terms of reversible processes, the **second law of thermodynamics** has a third form:

A Carnot engine operating between two given temperatures has the greatest
possible efficiency of any heat engine operating between these two temperatures.
Furthermore, all engines employing only reversible processes have this same
maximum efficiency when operating between the same given temperatures.

</div>

[[Figure 2]](#Figure2) shows the $$PV $$ diagram for a Carnot cycle. The cycle
comprises two isothermal and two adiabatic processes. Recall that both
isothermal and adiabatic processes are, in principle, reversible.

Carnot also determined the efficiency of a perfect heat engine—that is, a Carnot
engine. It is always true that the efficiency of a cyclical heat engine is given
by:

<div class="equation" >
 $$\text{Eff}=\frac{ {Q}_{\text{h}}-{Q}_{\text{c}}}{ {Q}_{\text{h}}}=1-\frac{ {Q}_{\text{c}}}{ {Q}_{\text{h}}}\text{.} $$
</div>

What Carnot found was that for a perfect heat engine, the ratio $${Q}_ {\text{c}}/{Q}_{\text{h}} $$ equals the ratio of the absolute temperatures of
the heat reservoirs. That is, $${Q}_{\text{c}}/{Q}_{\text{h}}={T}_ {\text{c}}/{T}_{\text{h}} $$ for a Carnot engine, so that the maximum or **
Carnot efficiency** $$\text{Eff}_{\text{C}} $$ is given by

<div class="equation" >
 $$\text{Eff}_{\text{C}}=1-\frac{ {T}_{\text{c}}}{ {T}_{\text{h}}}\text{,} $$
</div>

where $${T}_{\text{h}} $$ and $${T}_{\text{c}} $$ are in kelvins (or any other
absolute temperature scale). No real heat engine can do as well as the Carnot
efficiency. But the ideal Carnot engine, like the drinking bird
above, while a fascinating novelty, has zero power. This makes it unrealistic
for any applications.

Carnot’s interesting result implies that 100% efficiency would be possible only
if $${T}_{\text{c}}=0 \text{K} $$ —that is, only if the cold reservoir were at
absolute zero, a practical and theoretical impossibility. But the physical
implication is this—the only way to have all heat transfer go into doing work is
to remove _all_ thermal energy, and this requires a cold reservoir at absolute
zero.

It is also apparent that the greatest efficiencies are obtained when the ratio
$${T}_{\text{c}}/{T}_{\text{h}} $$ is as small as possible. Just as discussed
for the Otto cycle in the previous section, this means that efficiency is
greatest for the highest possible temperature of the hot reservoir and lowest
possible temperature of the cold reservoir. (This setup increases the area
inside the closed loop on the $$PV $$ diagram; also, it seems reasonable that
the greater the temperature difference, the easier it is to divert the heat
transfer to work.) The actual reservoir temperatures of a heat engine are
usually related to the type of heat source and the temperature of the
environment into which heat transfer occurs. Consider the following example.

![Part a of the figure shows a graph of pressure P versus volume V for a Carnot cycle. The pressure P is along the Y axis and the volume V is along the X axis. The graph shows a complete cycle A B C D. The path begins at point A, then it moves smoothly down till point B along the direction of the X axis. This is marked as an isotherm at temperature T sub h. Then the curve drops down further, along a different curve, from point B to point C. This is marked as adiabatic expansion. The curve rises from point C to point D along the direction opposite to that of A B. This is also an isotherm but at temperature T sub c. The last part of the curve rises up from point D back to A along a direction opposite to that of B C. This is marked as adiabatic compression. The path C D is lower than path A B. Heat Q sub h enters the system, as shown by a bold arrow to the curve A B. Heat Q sub c leaves the system as shown by a bold arrow near C D. Part b of the diagram shows an internal combustion engine represented as a circle. The hot reservoir is a rectangular section at the top of the circle shown at temperature T sub h. A cold reservoir is shown as a rectangular section in the bottom part of the circle at temperature T sub c. Heat Q sub h enters the heat engine as shown by a bold arrow; work W is produced as output, shown to leave the system, and the remaining heat Q sub c is returned back to the cold reservoir, as shown by a bold arrow toward it.](../resources/Figure_15_04_02.jpg '( PV ) diagram for a Carnot cycle, employing only reversible isothermal and adiabatic processes. Heat transfer ( Q_{h} ) occurs into the working substance during the isothermal path AB, which takes place at constant temperature ( T_{h} ). Heat transfer ( Q_{c} ) occurs out of the working substance during the isothermal path CD, which takes place at constant temperature ( T_{c} ). The net work output ( W ) equals the area inside the path ABCDA. Also shown is a schematic of a Carnot engine operating between hot and cold reservoirs at temperatures ( T_{h} ) and ( T_{c} ). Any heat engine using reversible processes and operating between these two temperatures will have the same maximum efficiency as the Carnot engine.')
{: #Figure2}

<div id="Example1" class="example" markdown="1">
<div class="title">
Maximum Theoretical Efficiency for a Nuclear Reactor
</div>
A nuclear power reactor has pressurized water at  $$300\text{ºC} $$ .
 (Higher temperatures are theoretically possible but practically not, due to limitations with materials used in the reactor.) Heat transfer from this water is a complex process (see [[Figure 3]](#Figure3)). Steam, produced in the steam generator, is used to drive the turbine-generators. Eventually the steam is condensed to water at  $$27\text{ºC} $$
 and then heated again to start the cycle over. Calculate the maximum theoretical efficiency for a heat engine operating between these two temperatures.

![Diagram shows a schematic diagram of a pressurized water nuclear reactor and the steam turbines that convert work into electrical energy. There is a pressure vessel in the middle, dome shaped at the ends. This has a nuclear core in it. The core is a small square in the center of the reactor. Control rods are shown as sticks of equal length attached to the core. The pressure vessel has some coolant tubes passing through it and then back to a steam chamber. These coolant tubes contain a coolant liquid that transports the heat from the pressure vessel to the steam chamber. This whole system is enclosed in another dome shaped containment structure of steel. The water supply to steam chamber and the steam outlet are seen to come out of this chamber. This steam is now shown to run two steam turbines, one a high pressure one and another low pressure one. The turbines are nearly triangular and segmented in shape. The steam turbine in turn generates power using a turbine generator, which is attached to the turbine system. The turbines are again housed in another chamber which gets the steam from the steam chamber and return the steam as water back to the steam chamber with pipes. A coolant tower is shown near the turbine system, which is shown to supply cool water in tubes to the turbine system to cool the steam back to water.](../resources/Figure_15_04_03.jpg 'Schematic diagram of a pressurized water nuclear reactor and the steam turbines that convert work into electrical energy. Heat exchange is used to generate steam, in part to avoid contamination of the generators with radioactivity. Two turbines are used because this is less expensive than operating a single generator that produces the same amount of electrical energy. The steam is condensed to liquid before being returned to the heat exchanger, to keep exit steam pressure low and aid the flow of steam through the turbines (equivalent to using a lower-temperature cold reservoir). The considerable energy associated with condensation must be dissipated into the local environment; in this example, a cooling tower is used so there is no direct heat transfer to an aquatic environment. (Note that the water going to the cooling tower does not come into contact with the steam flowing over the turbines.)')
{: #Figure3}

**Strategy**

Since temperatures are given for the hot and cold reservoirs of this heat
engine, $$\text{Eff}_{\text{C}}=1-\frac{ {T}_{\text{c}}}{ {T}_{\text{h}}} $$ can
be used to calculate the Carnot (maximum theoretical) efficiency. Those
temperatures must first be converted to kelvins.

**Solution**

The hot and cold reservoir temperatures are given as $$300\text{ºC} $$ and $$ 27.0\text{ºC} $$ , respectively. In kelvins, then, $${T}_{\text{h}}=573 \text{K} $$ and $${T}_{\text{c}}=300 \text{K} $$ , so that the maximum efficiency is

<div class="equation" >
 $${\text{Eff}}_{\text{C}}=1-\frac{ {T}_{\text{c}}}{ {T}_{\text{h}}}\text{.} $$
</div>
Thus,

<div class="equation" >
 $$\begin{array}{lll}{\text{Eff}}_{\text{C}}& =& 1-\frac{300 \text{K}}{573 \text{K}}\\ & =&  0.476\text{, or } 47.6 \%\text{.}\end{array} $$
</div>
**Discussion**

A typical nuclear power station’s actual efficiency is about 35%, a little
better than 0.7 times the maximum possible value, a tribute to superior
engineering. Electrical power stations fired by coal, oil, and natural gas have
greater actual efficiencies (about 42%), because their boilers can reach higher
temperatures and pressures. The cold reservoir temperature in any of these power
stations is limited by the local environment. [[Figure 4]](#Figure4) shows (a)
the exterior of a nuclear power station and (b) the exterior of a coal-fired
power station. Both have cooling towers into which water from the condenser
enters the tower near the top and is sprayed downward, cooled by evaporation.

</div>

![Part a shows a photograph of an operational nuclear power plant in night view. There are dome shaped structures which house radioactive material and vapors are shown to come from two cooling towers. Part b shows a photograph of a coal fired power plant. Several huge cooling towers are shown.](../resources/Figure_15_04_04.jpg '(a) A nuclear power station (credit: BlatantWorld.com) and (b) a coal-fired power station. Both have cooling towers in which water evaporates into the environment, representing ( Q_{c} ). The nuclear reactor, which supplies ( Q_{h} ), is housed inside the dome-shaped containment buildings. (credit: Robert & Mihaela Vicol, publicphoto.org)')
{: #Figure4}

Since all real processes are irreversible, the actual efficiency of a heat
engine can never be as great as that of a Carnot engine, as illustrated
in [[Figure 5]](#Figure5)(a). Even with the best heat engine possible, there are
always dissipative processes in peripheral equipment, such as electrical
transformers or car transmissions. These further reduce the overall efficiency
by converting some of the engine’s work output back into heat transfer, as shown
in [[Figure 5]](#Figure5)(b).

![Part a of the diagram shows a combustion engine represented as a circle to compare the efficiency of real and Carnot engines. The hot reservoir is a rectangular section above the circle shown at temperature T sub h. A cold reservoir is shown as a rectangular section below the circle at temperature T sub c. Heat Q sub h enters the heat engine as shown by a bold arrow. For a real engine a small part of it is shown to be expelled as output from the engine shown as a bold arrow leaving the circle and for a Carnot engine larger part of it is shown to leave as work shown by a dashed arrow leaving the circle. The remaining heat is shown to be returned back to the cold reservoir as shown by bold arrow toward it for real engines and comparatively lesser heat is given by the Carnot engine shown by a dashed arrow. Part b of the diagram shows an internal combustion engine represented as a circle to study friction and other dissipative processes in the output mechanisms of a heat engine. The hot reservoir is a rectangular section above the circle shown at temperature T sub h. A cold reservoir is shown as a rectangular section below the circle at temperature T sub c. Heat Q sub h enters the heat engine as shown by a bold arrow, work W is produced as output, shown leaving the system, and the remaining heat Q sub c and Q sub f are returned back to the cold reservoir as shown by bold arrows toward it. Q sub f is heat due to friction. The work done against friction goes as heat Q sub f to the cold reservoir.](../resources/Figure_15_04_05.jpg 'Real heat engines are less efficient than Carnot engines. (a) Real engines use irreversible processes, reducing the heat transfer to work. Solid lines represent the actual process; the dashed lines are what a Carnot engine would do between the same two reservoirs. (b) Friction and other dissipative processes in the output mechanisms of a heat engine convert some of its work output into heat transfer to the environment.')
{: #Figure5}

### Section Summary

- The Carnot cycle is a theoretical cycle that is the most efficient cyclical
  process possible. Any engine using the Carnot cycle, which uses only
  reversible processes (adiabatic and isothermal), is known as a Carnot engine.
- Any engine that uses the Carnot cycle enjoys the maximum theoretical
  efficiency.
- While Carnot engines are ideal engines, in reality, no engine achieves
  Carnot’s theoretical maximum efficiency, since dissipative processes, such as
  friction, play a role. Carnot cycles without heat loss may be possible at
  absolute zero, but this has never been seen in nature.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Think about the drinking bird at the beginning of this section ([[Figure 1]](#Figure1)). Although the bird enjoys the theoretical maximum efficiency possible, if left to its own devices over time, the bird will cease “drinking.” What are some of the dissipative processes that might cause the bird’s motion to cease?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Can improved engineering and materials be employed in heat engines to reduce heat transfer into the environment? Can they eliminate heat transfer into the environment entirely?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Does the second law of thermodynamics alter the conservation of energy principle?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A certain gasoline engine has an efficiency of 30.0%. What would the hot reservoir temperature be for a Carnot engine having that efficiency, if it operates with a cold reservoir temperature of  $$200\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">

**Strategy**

Use the Carnot efficiency formula $$\eta_C = 1 - \frac{T_C}{T_H}$$ where temperatures must be in Kelvin. Solve for $$T_H$$ given $$\eta_C = 0.300$$ and $$T_C = 200°\text{C} = 473 \text{ K}$$.

**Solution**

Given: $$\eta = 30.0\% = 0.300$$, $$T_C = 200°\text{C} = 473 \text{ K}$$

Carnot efficiency formula:

<div class="equation">
 $$\eta_C = 1 - \frac{T_C}{T_H}$$
</div>

Solving for $$T_H$$:

<div class="equation">
 $$\frac{T_C}{T_H} = 1 - \eta_C = 1 - 0.300 = 0.700$$
</div>

<div class="equation">
 $$T_H = \frac{T_C}{0.700} = \frac{473 \text{ K}}{0.700} = 676 \text{ K}$$
</div>

Converting to Celsius:

<div class="equation">
 $$T_H = 676 - 273 = 403°\text{C}$$
</div>

**Discussion**

A Carnot engine with 30% efficiency operating with a 200°C cold reservoir requires a 403°C hot reservoir. This is reasonable for gasoline engines, where combustion temperatures reach 400-600°C but real engines achieve only 20-30% efficiency (less than Carnot). The relatively modest temperature difference (403°C - 200°C = 203°C) for 30% efficiency shows why improving engine efficiency is challenging—large temperature increases are needed for small efficiency gains.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A gas-cooled nuclear reactor operates between hot and cold reservoir temperatures of  $$700\text{ºC} $$
 and  $$ 27.0\text{ºC} $$ .
 (a) What is the maximum efficiency of a heat engine operating between these temperatures? (b) Find the ratio of this efficiency to the Carnot efficiency of a standard nuclear reactor (found in [[Example 1]](#Example1)).

</div>
<div class="solution" markdown="1">

**Strategy**

For part (a), use $$\eta_C = 1 - \frac{T_C}{T_H}$$ with $$T_H = 700°\text{C} = 973 \text{ K}$$ and $$T_C = 27.0°\text{C} = 300 \text{ K}$$. For part (b), compare to standard nuclear reactor efficiency from Example 1.

**Solution**

Given: $$T_H = 973 \text{ K}$$, $$T_C = 300 \text{ K}$$

**(a)** Maximum (Carnot) efficiency:

<div class="equation">
 $$\eta_C = 1 - \frac{T_C}{T_H} = 1 - \frac{300}{973} = 1 - 0.308 = 0.692 = 69.2\%$$
</div>

**(b)** Assuming Example 1 shows standard nuclear reactor Carnot efficiency of ~41.5%, the ratio is:

<div class="equation">
 $$\frac{69.2\%}{41.5\%} = 1.67$$
</div>

**Discussion**

The gas-cooled reactor operating at 700°C can theoretically achieve 69.2% efficiency, which is 1.67 times higher than standard water-cooled reactors operating at lower temperatures. This demonstrates why higher operating temperatures are desirable—they dramatically increase maximum possible efficiency. However, gas-cooled reactors face engineering challenges at these high temperatures, explaining why they aren't widely adopted despite the efficiency advantage.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the hot reservoir temperature of a Carnot engine that has an efficiency of 42.0% and a cold reservoir temperature of  $$ 27.0\text{ºC} $$ ?
 (b) What must the hot reservoir temperature be for a real heat engine that achieves 0.700 of the maximum efficiency, but still has an efficiency of 42.0% (and a cold reservoir at  $$ 27.0\text{ºC} $$ )  ? (c) Does your answer imply practical limits to the efficiency of car gasoline engines?

</div>
<div class="solution" markdown="1">

**Strategy**

For (a), solve $$0.420 = 1 - \frac{300}{T_H}$$ for $$T_H$$. For (b), if real engine achieves 70% of Carnot efficiency but still gets 42%, find required $$T_H$$. For (c), assess practical implications.

**Solution**

Given: $$\eta = 42.0\% = 0.420$$, $$T_C = 27.0°\text{C} = 300 \text{ K}$$

**(a)** $$T_H = \frac{T_C}{1-\eta} = \frac{300}{0.580} = 517 \text{ K} = 244°\text{C}$$

**(b)** If real efficiency is 70% of Carnot: $$0.420 = 0.700 \times \eta_C$$, so $$\eta_C = 0.600$$
Then $$T_H = \frac{300}{1-0.600} = 750 \text{ K} = 477°\text{C}$$

**(c)** Yes, car engines cannot sustain 477°C without overheating, limiting practical efficiency to well below 42%.

**Discussion**

Part (a) shows 244°C hot reservoir for Carnot engine at 42% efficiency—achievable but high. Part (b) reveals that for a real engine at 70% of Carnot to reach 42% actual efficiency, it needs 477°C, which exceeds practical limits for car engines (materials degrade, oil breaks down). This explains why car engines achieve only 20-30% efficiency despite extensive engineering optimization.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Steam locomotives have an efficiency of 17.0% and operate with a hot steam temperature of  $$425\text{ºC} $$ .
 (a) What would the cold reservoir temperature be if this were a Carnot engine? (b) What would the maximum efficiency of this steam engine be if its cold reservoir temperature were  $$150\text{ºC} $$?

</div>
<div class="solution" markdown="1">

**Strategy**

For (a), use $$\eta = 1 - \frac{T_C}{T_H}$$ and solve for $$T_C$$. For (b), calculate Carnot efficiency with new $$T_C$$.

**Solution**

Given: $$\eta = 0.170$$, $$T_H = 425°\text{C} = 698 \text{ K}$$

**(a)** $$T_C = T_H(1-\eta) = 698(0.830) = 579 \text{ K} = 306°\text{C}$$

**(b)** With $$T_C = 150°\text{C} = 423 \text{ K}$$:
$$\eta_{max} = 1 - \frac{423}{698} = 0.394 = 39.4\%$$

**Discussion**

Part (a): For 17% Carnot efficiency at 425°C hot temperature, the cold reservoir would be 306°C—unrealistically hot for exhaust. Real steam locomotives had much cooler exhaust (~100°C), explaining why actual efficiency was far below 17%. Part (b): With realistic 150°C exhaust, maximum efficiency could reach 39.4%, but real locomotives achieved only 5-10% due to mechanical losses, incomplete combustion, and heat losses.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Practical steam engines utilize  $$450\text{ºC} $$
 steam, which is later exhausted at  $$270\text{ºC} $$ .
 (a) What is the maximum efficiency that such a heat engine can have? (b) Since  $$270\text{ºC} $$
 steam is still quite hot, a second steam engine is sometimes operated using the exhaust of the first. What is the maximum efficiency of the second engine if its exhaust has a temperature of  $$150\text{ºC} $$ ?
 (c) What is the overall efficiency of the two engines? (d) Show that this is the same efficiency as a single Carnot engine operating between  $$450\text{ºC} $$
 and  $$150\text{ºC} $$ .
 Explicitly show how you follow the steps in the [Problem-Solving Strategies for Thermodynamics](../contents/ch15ApplicationsOfThermodynamics#Note1).

</div>
<div class="solution"  markdown="1">
(a)  $$\text{Eff}_{1}=1-\frac{ {T}_{\text{c,1}}}{ {T}_{\text{h,1}}}=1-\frac{543 \text{K}}{723 \text{K}}= 0.249 \text{ or }  24.9\%  $$
(b)  $$\text{Eff}_{2}=1-\frac{423 \text{K}}{543 \text{K}}= 0.221 \text{ or }  22.1\%  $$
(c)  $$\begin{array}{l}\text{Eff}_{1}=1-\frac{ {T}_{\text{c,1}}}{ {T}_{\text{h,1}}}⇒{T}_{\text{c,1}}={T}_{\text{h,1}}\left(1,-,\text{Eff}_{1}\right)\end{array} $$
  $$\begin{array}{l}\text{similarly} \text{,}  {T}_{\text{c,2}}={T}_{\text{h,2}}\left(1-\text{Eff}_{2}\right)\end{array} $$
  $$\begin{array}{l}\text{using} {T}_{\text{h,2}}={T}_{\text{c,1}} \text{in} \text{above} \text{equation} \text{gives}\end{array} $$
  $$\begin{array}{l}{T}_{\text{c,2}}={T}_{\text{h,1}}\left(1-\text{Eff}_{1}\right)\left(1-\text{Eff}_{2}\right)\equiv {T}_{\text{h,1}}\left(1-\text{Eff}_{\text{overall}}\right)\\ \therefore \left(1-\text{Eff}_{\text{overall}}\right)=\left(1-\text{Eff}_{1}\right)\left(1-\text{Eff}_{2}\right)\\ \text{Eff}_{\text{overall}}=1-\left(1 -0.249\right)\left(1 -0.221\right)= 41.5\% \end{array} $$
(d)  $${\text{Eff}}_{\text{overall}}=1-\frac{423 \text{K}}{723 \text{K}}= 0.415 \text{ or }  41.5\%  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A coal-fired electrical power station has an efficiency of 38%. The temperature of the steam leaving the boiler is  $$550\text{ºC} $$ .
 What percentage of the maximum efficiency does this station obtain? (Assume the temperature of the environment is  $$20\text{ºC} $$ .)

</div>
<div class="solution" markdown="1">

**Strategy**

Calculate Carnot efficiency for given temperatures, then find what percentage 38% represents of that maximum.

**Solution**

Given: $$\eta_{actual} = 38\% = 0.38$$, $$T_H = 550°\text{C} = 823 \text{ K}$$, $$T_C = 20°\text{C} = 293 \text{ K}$$

Carnot efficiency:
$$\eta_C = 1 - \frac{293}{823} = 0.644 = 64.4\%$$

Percentage of maximum:
$$\frac{0.38}{0.644} \times 100\% = 59.0\%$$

**Discussion**

The power station achieves 59% of the theoretical maximum efficiency. This is reasonable—real power plants typically achieve 50-70% of Carnot efficiency due to turbine inefficiencies, friction, heat losses, and non-ideal thermodynamic processes. The 64.4% Carnot limit itself seems modest given the high steam temperature (550°C), but it's constrained by the relatively warm cold reservoir (environmental temperature of 20°C).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Would you be willing to financially back an inventor who is marketing a device that she claims has 25 kJ of heat transfer at 600 K, has heat transfer to the environment at 300 K, and does 12 kJ of work? Explain your answer.

</div>
<div class="solution" markdown="1">

**Strategy**

We need to check if the inventor's claims violate thermodynamic laws. First, calculate the actual efficiency of the claimed device using $$\text{Eff} = \frac{W}{Q_h}$$. Then calculate the maximum possible (Carnot) efficiency for engines operating between 600 K and 300 K using $$\text{Eff}_C = 1 - \frac{T_c}{T_h}$$. If the claimed efficiency exceeds or is unrealistically close to the Carnot efficiency, the device is fraudulent.

**Solution**

Given values:
- Heat input: $$Q_h = 25 \text{ kJ}$$
- Hot reservoir temperature: $$T_h = 600 \text{ K}$$
- Cold reservoir temperature: $$T_c = 300 \text{ K}$$
- Work output: $$W = 12 \text{ kJ}$$

First, find the heat rejected using energy conservation:

<div class="equation">
 $$Q_c = Q_h - W = 25 \text{ kJ} - 12 \text{ kJ} = 13 \text{ kJ}$$
</div>

Calculate the claimed efficiency:

<div class="equation">
 $$\text{Eff}_{\text{claimed}} = \frac{W}{Q_h} = \frac{12 \text{ kJ}}{25 \text{ kJ}} = 0.480 = 48.0\%$$
</div>

Alternatively, using heat transfers:

<div class="equation">
 $$\text{Eff}_{\text{claimed}} = 1 - \frac{Q_c}{Q_h} = 1 - \frac{13}{25} = 0.480 = 48.0\%$$
</div>

Calculate the maximum possible (Carnot) efficiency:

<div class="equation">
 $$\text{Eff}_C = 1 - \frac{T_c}{T_h} = 1 - \frac{300 \text{ K}}{600 \text{ K}} = 1 - 0.500 = 0.500 = 50.0\%$$
</div>

Compare the claimed efficiency to Carnot efficiency:

<div class="equation">
 $$\frac{\text{Eff}_{\text{claimed}}}{\text{Eff}_C} = \frac{0.480}{0.500} = 0.96 = 96\%$$
</div>

**Conclusion: No, I would not financially back this inventor. The claimed device operates at 96% of the Carnot efficiency, which is impossible in practice.**

**Discussion**

The inventor's device claims to achieve 48% efficiency, which is 96% of the theoretical maximum (Carnot) efficiency of 50%. This is extraordinarily suspicious for several reasons:

1. **Real-world efficiency limits**: Even the most advanced heat engines, built with the best materials and engineering, achieve only about 60-70% of Carnot efficiency. Typical power plants reach 40-42% actual efficiency when the Carnot limit might be 60-65%, giving them about 65% of Carnot. Gas turbines might reach 70% of Carnot under ideal conditions.

2. **Irreversibilities**: All real processes involve friction, turbulence, heat losses, and other irreversibilities that prevent achieving Carnot efficiency. A device at 96% of Carnot would be nearly reversible, which is physically unrealistic for any macroscopic heat engine.

3. **The 2:1 temperature ratio**: With $$T_h = 600$$ K and $$T_c = 300$$ K (exactly 2:1), this looks like a contrived example designed to appear legitimate while being fraudulent.

4. **Red flags**: The inventor is "marketing" the device rather than publishing peer-reviewed results or demonstrating it to independent engineers. This is a classic sign of pseudoscience or fraud.

**Verdict**: This scheme is almost certainly fraudulent. The claimed performance is thermodynamically implausible. Real devices with such exceptional efficiency would be revolutionary and would be demonstrated to scientists and engineers, not marketed to investors. The inventor is likely either deceiving investors deliberately or has made fundamental measurement errors. Either way, investment would be unwise.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) Suppose you want to design a steam engine that has heat transfer to the
environment at $$270 \text{ºC} $$ and has a Carnot efficiency of 0.800. What
temperature of hot steam must you use? (b) What is unreasonable about the
temperature? (c) Which premise is unreasonable?

</div>
<div class="solution" markdown="1">

**Strategy**

Solve $$0.800 = 1 - \frac{T_C}{T_H}$$ for $$T_H$$ with $$T_C = 270°\text{C} = 543 \text{ K}$$.

**Solution**

**(a)** $$T_H = \frac{T_C}{1-\eta} = \frac{543}{0.200} = 2715 \text{ K} = 2442°\text{C}$$

**(b)** This temperature (2442°C) far exceeds the critical point of water (374°C) and melting points of most steels (~1500°C). No practical steam engine materials can withstand this.

**(c)** The 80% Carnot efficiency is unreasonably high for a steam engine with 270°C exhaust. Real steam engines achieve 20-40% efficiency.

**Discussion**

The required 2442°C is impossibly high—water would decompose, and no containment materials exist. This demonstrates that high efficiencies with high cold reservoir temperatures demand extreme hot temperatures. The 80% efficiency assumption is the unreasonable premise.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

Calculate the cold reservoir temperature of a steam engine that uses hot steam
at $$450\text{ºC} $$ and has a Carnot efficiency of 0.700. (b) What is
unreasonable about the temperature? (c) Which premise is unreasonable?

</div>
<div class="solution" markdown="1">

**Strategy**

Use the Carnot efficiency formula $$\eta_C = 1 - \frac{T_c}{T_h}$$ and solve for $$T_c$$. Then evaluate whether the result is physically reasonable for a steam engine's cold reservoir (typically the local environment).

**Solution**

Given values:
- Hot reservoir temperature: $$T_h = 450\text{°C} = 723 \text{ K}$$
- Carnot efficiency: $$\eta_C = 0.700$$

**(a)** Solve for cold reservoir temperature:

<div class="equation">
 $$\eta_C = 1 - \frac{T_c}{T_h}$$
</div>

<div class="equation">
 $$\frac{T_c}{T_h} = 1 - \eta_C = 1 - 0.700 = 0.300$$
</div>

<div class="equation">
 $$T_c = 0.300 \times T_h = 0.300 \times 723 \text{ K} = 217 \text{ K}$$
</div>

Converting to Celsius:

<div class="equation">
 $$T_c = 217 - 273 = -56.3\text{°C}$$
</div>

**The cold reservoir temperature would be −56.3°C or 217 K.**

**(b)** What is unreasonable about this temperature?

This temperature is far too cold for the cold reservoir of a steam engine. The cold reservoir is typically the local environment (air, cooling water, or a cooling tower), which normally operates at temperatures between 0°C and 40°C. Several problems arise:

- **Below water's freezing point**: At −56.3°C, water-based cooling systems would freeze solid, making the engine inoperable.
- **Colder than most natural environments**: Even Arctic winter temperatures rarely drop below −40°C. Achieving −56.3°C would require artificial refrigeration.
- **Steam would freeze**: The exhaust steam at this temperature would solidify as ice, not condense as liquid water.
- **Impractical and expensive**: Maintaining such a cold reservoir would require more energy than the engine produces.

**(c)** Which premise is unreasonable?

The assumed efficiency of 70% (0.700) is unreasonably high for a steam engine. Real steam engines and power plants typically achieve:
- **Actual efficiencies**: 25-42% for modern power plants
- **Carnot efficiency percentage**: 50-70% of theoretical Carnot maximum
- **Best steam turbines**: About 40% actual efficiency when Carnot limit might be 60-65%

A 70% Carnot efficiency with $$T_h = 450\text{°C}$$ would require an impossibly low cold reservoir temperature. More reasonable efficiencies for this hot temperature would be:
- With $$T_c = 20\text{°C}$$ (293 K): $$\eta_C = 1 - \frac{293}{723} = 59.5\%$$ (Carnot)
- Actual efficiency would be about 35-42%

**Discussion**

This problem illustrates the relationship between efficiency and reservoir temperatures. To achieve high efficiency, you need either:
1. Very high hot reservoir temperature, or
2. Very low cold reservoir temperature, or
3. Both

Since the cold reservoir is typically the environment (which we cannot change easily), efficiency improvements usually focus on increasing the hot reservoir temperature. However, materials limitations prevent steam temperatures much above 500-600°C in conventional power plants.

The calculated −56.3°C cold temperature is absurd because it violates practical and economic constraints. It would be like saying "to cool my house efficiently, I need outdoor temperature of −56°C"—which defeats the purpose entirely. The error lies in the unrealistic 70% efficiency assumption. When solving thermodynamics problems, always check if your answer makes physical sense in the context of real-world operation.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

Carnot cycle
: a cyclical process that uses only reversible processes, the adiabatic and
isothermal processes

Carnot engine
: a heat engine that uses a Carnot cycle

Carnot efficiency
: the maximum theoretical efficiency for a heat engine

</div>
