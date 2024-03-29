---
title: 'Introduction to the Second Law of Thermodynamics: Heat Engines and Their Efficiency'
layout: page
sectionNumber: 3
chapterNumber: 15
---

<div class="abstract" markdown="1">
* State the expressions of the second law of thermodynamics.
* Calculate the efficiency and carbon dioxide emission of a coal-fired electricity plant, using second law characteristics.
* Describe and define the Otto cycle.
</div>

![Photograph of melting ice floes in the Arctic.](../resources/Figure_15_03_01.jpg "These ice floes melt during the Arctic summer. Some of them refreeze in the winter, but the second law of thermodynamics predicts that it would be extremely unlikely for the water molecules contained in these particular floes to reform the distinctive alligator-like shape they formed when the picture was taken in the summer of 2009. (credit: Patrick Kelley, U.S. Coast Guard, U.S. Geological Survey) ")
{: #Figure1}

The second law of thermodynamics deals with the direction taken by spontaneous
processes. Many processes occur spontaneously in one direction only—that is,
they are irreversible, under a given set of conditions. Although irreversibility
is seen in day-to-day life—a broken glass does not resume its original state,
for instance—complete irreversibility is a statistical statement that cannot be
seen during the lifetime of the universe. More precisely, an **irreversible
process** is one that depends on path. If the process can go in only one
direction, then the reverse path differs fundamentally and the process cannot be
reversible. For example, as noted in the previous section, heat involves the
transfer of energy from higher to lower temperature. A cold object in contact
with a hot one never gets colder, transferring heat to the hot object and making
it hotter. Furthermore, mechanical energy, such as kinetic energy, can be
completely converted to thermal energy by friction, but the reverse is
impossible. A hot stationary object never spontaneously cools off and starts
moving. Yet another example is the expansion of a puff of gas introduced into
one corner of a vacuum chamber. The gas expands to fill the chamber, but it
never regroups in the corner. The random motion of the gas molecules could take
them all back to the corner, but this is never observed to happen. (
See [[Figure 2]](#Figure2).)

![Part a of the figure shows spontaneous heat transfers. A rectangular section is divided down the center, and then marked hot on the left end and cold on the right. Heat Q is shown to flow from the hot end to the cold end as shown by a bold arrow toward the right. Part b of the figure shows a car moving on a horizontal road toward the right with initial velocity v. The car brake is applied after some time. The final velocity v sub f is shown equal to zero. Heat is released by the car. Part c of the figure shows two parts. The first part shows a burst of gas let into a vacuum chamber using a sprayer. The molecules of gas are shown to move in a random manner shown as dashed zigzag arrows. The second part of the same diagram shows the next stage after the air burst is sprayed. The molecules of air are shown to be arranged in uniform distribution as shown by horizontal, parallel dashed curves in the medium.](../resources/Figure_15_03_02.jpg "Examples of one-way processes in nature. (a) Heat transfer occurs spontaneously from hot to cold and not from cold to hot. (b) The brakes of this car convert its kinetic energy to heat transfer to the environment. The reverse process is impossible. (c) The burst of gas let into this vacuum chamber quickly expands to uniformly fill every part of the chamber. The random motions of the gas molecules will never return them to the corner.")
{: #Figure2}

The fact that certain processes never occur suggests that there is a law
forbidding them to occur. The first law of thermodynamics would allow them to
occur—none of those processes violate conservation of energy. The law that
forbids these processes is called the second law of thermodynamics. We shall see
that the second law can be stated in many ways that may seem different, but
which in fact are equivalent. Like all natural laws, the second law of
thermodynamics gives insights into nature, and its several statements imply that
it is broadly applicable, fundamentally affecting many apparently disparate
processes.

The already familiar direction of heat transfer from hot to cold is the basis of
our first version of the **second law of thermodynamics**.

<div class="note" data-has-label="true"  data-label="" markdown="1">
<div class="title">
The Second Law of Thermodynamics (first expression)
</div>
Heat transfer occurs spontaneously from higher- to lower-temperature bodies but never spontaneously in the reverse direction.

</div>

Another way of stating this: It is impossible for any process to have as its
sole result heat transfer from a cooler to a hotter object.

### Heat Engines

Now let us consider a device that uses heat transfer to do work. As noted in the
previous section, such a device is called a heat engine, and one is shown
schematically in [[Figure 3]](#Figure3)(b). Gasoline and diesel engines, jet
engines, and steam turbines are all heat engines that do work by using part of
the heat transfer from some source. Heat transfer from the hot object (or hot
reservoir) is denoted as $${Q}_{\text{h}} $$ , while heat transfer into the cold
object (or cold reservoir) is $${Q}_{\text{c}} $$ , and the work done by the
engine is $$W $$ . The temperatures of the hot and cold reservoirs are $${T}_
{\text{h}} $$ and $${T}_{\text{c}} $$ , respectively.

![Part a of the figure shows the spontaneous heat transfer from a hot system to a cold system. The hot reservoir at temperature T sub h is represented by a rectangular section in the top and the cold reservoir at temperature T sub c is shown as a rectangular section at the bottom. Heat is shown to flow from hot reservoir to cold reservoir as shown by a bold arrow pointing downward. Part b of the figure shows a heat engine represented as a circle. The hot reservoir at temperature T sub h is represented by a rectangular section at the top and a cold reservoir at temperature T sub c is shown as a rectangular section at the bottom. Heat Q sub h is transferred out of the hot reservoir, work W is the output equals Q sub h minus Q sub c, and heat Q sub c is the heat transferred into the cold reservoir. All these are shown using bold arrows.](../resources/Figure_15_03_03.jpg "(a) Heat transfer occurs spontaneously from a hot object to a cold one, consistent with the second law of thermodynamics. (b) A heat engine, represented here by a circle, uses part of the heat transfer to do work. The hot and cold objects are called the hot and cold reservoirs. \( Q_{h} \) is the heat transfer out of the hot reservoir, \( W \) is the work output, and \( Q_{c} \) is the heat transfer into the cold reservoir.")
{: #Figure3}

Because the hot reservoir is heated externally, which is energy intensive, it is
important that the work is done as efficiently as possible. In fact, we would
like $$W $$ to equal $${Q}_{\text{h}} $$ , and for there to be no heat transfer
to the environment ( $${Q}_{\text{c}}=0 $$ ). Unfortunately, this is impossible.
The **second law of thermodynamics** also states, with regard to using heat
transfer to do work (the second expression of the second law):

<div class="note" data-has-label="true"  data-label="" markdown="1">
<div class="title">
The Second Law of Thermodynamics (second expression)
</div>
It is impossible in any system for heat transfer from a reservoir to completely convert to work in a cyclical process in which the system returns to its initial state.

</div>

A **cyclical process** brings a system, such as the gas in a cylinder, back to
its original state at the end of every cycle. Most heat engines, such as
reciprocating piston engines and rotating turbines, use cyclical processes. The
second law, just stated in its second form, clearly states that such engines
cannot have perfect conversion of heat transfer into work done. Before going
into the underlying reasons for the limits on converting heat transfer into
work, we need to explore the relationships among $$W $$ , $${Q}_{\text{h}} $$ ,
and $${Q}_{\text{c}} $$ , and to define the efficiency of a cyclical heat
engine. As noted, a cyclical process brings the system back to its original
condition at the end of every cycle. Such a system’s internal energy $$U $$ is
the same at the beginning and end of every cycle—that is, $$\Delta U=0 $$ . The
first law of thermodynamics states that

<div class="equation" >
 $$\Delta U=Q-W\text{,} $$
</div>

where $$Q $$ is the *net* heat transfer during the cycle ( $$Q={Q}_
{\text{h}}-{Q}_{\text{c}} $$ )
and $$W $$ is the net work done by the system. Since $$\Delta U=0 $$ for a
complete cycle, we have

<div class="equation" >
 $$0=Q-W\text{,} $$
</div>

so that

<div class="equation" >
 $$W=Q\text{.} $$
</div>

Thus, the net work done by the system equals the net heat transfer into the
system, or

<div class="equation" >
 $$W={Q}_{\text{h}}-{Q}_{\text{c}} \text{(cyclical process),} $$
</div>

just as shown schematically in [[Figure 3]](#Figure3)(b). The problem is that in
all processes, there is some heat transfer $${Q}_{\text{c}} $$ to the
environment—and usually a very significant amount at that.

In the conversion of energy to work, we are always faced with the problem of
getting less out than we put in. We define *conversion efficiency*  $$\text{Eff}
$$ to be the ratio of useful work output to the energy input (or, in other
words, the ratio of what we get to what we spend). In that spirit, we define the
efficiency of a heat engine to be its net work output $$W $$ divided by heat
transfer to the engine $${Q}_{\text{h}} $$ ; that is,

<div class="equation" >
 $$\text{Eff}=\frac{W}{ {Q}_{\text{h}}}\text{.} $$
</div>

Since $$W={Q}_{\text{h}}-{Q}_{\text{c}} $$ in a cyclical process, we can also
express this as

<div class="equation" >
 $$\text{Eff}=\frac{ {Q}_{\text{h}}-{Q}_{\text{c}}}{ {Q}_{\text{h}}}=1-\frac{ {Q}_{\text{c}}}{ {Q}_{\text{h}}} \text{(cyclical process),} $$
</div>

making it clear that an efficiency of 1, or 100%, is possible only if there is
no heat transfer to the environment ( $${Q}_{\text{c}}=0 $$ ). Note that all $$Q
$$ s are positive. The direction of heat transfer is indicated by a plus or
minus sign. For example, $${Q}_{\text{c}} $$ is out of the system and so is
preceded by a minus sign.

<div id="Example1" class="example" markdown="1">
<div class="title">
Daily Work Done by a Coal-Fired Power Station, Its Efficiency and Carbon Dioxide Emissions
</div>
A coal-fired power station is a huge heat engine. It uses heat transfer from burning coal to do work to turn turbines, which are used to generate electricity. In a single day, a large coal power station has  $$ 2.50 \times 10^{14} \text{J} $$
 of heat transfer from coal and  $$ 1.48 \times 10^{14} \text{J} $$
 of heat transfer into the environment. (a) What is the work done by the power station? (b) What is the efficiency of the power station? (c) In the combustion process, the following chemical reaction occurs: $$\text{C}+{\text{O}}_{2}\to {\text{CO}}_{2} $$. This implies that every 12 kg of coal puts 12 kg + 16 kg + 16 kg = 44 kg of carbon dioxide into the atmosphere. Assuming that 1 kg of coal can provide  $$ 2.5 \times 10^{6}  \text{J} $$
 of heat transfer upon combustion, how much $${\text{CO}}_{2} $$ is emitted per day by this power plant?

<strong> Strategy for (a)</strong>

We can use $$W={Q}_{\text{h}}-{Q}_{\text{c}} $$ to find the work output $$W $$ ,
assuming a cyclical process is used in the power station. In this process, water
is boiled under pressure to form high-temperature steam, which is used to run
steam turbine-generators, and then condensed back to water to start the cycle
again.

**Solution for (a)**

Work output is given by:

<div class="equation" >
 $$W={Q}_{\text{h}}-{Q}_{\text{c}}\text{.} $$
</div>
Substituting the given values:

<div class="equation" >
 $$\begin{array}{lll}W& =&  2.50 \times 10^{14} \text{J} - 1.48 \times 10^{14} \text{J}\\ & =&  1.02 \times 10^{14} \text{J}\text{.}\end{array} $$
</div>
<strong> Strategy for (b)</strong>

The efficiency can be calculated with $$\text{Eff}=\frac{W}{ {Q}_{\text{h}}} $$
since $${Q}_{\text{h}} $$ is given and work $$W $$ was found in the first part
of this example.

**Solution for (b)**

Efficiency is given by:  $$\text{Eff}=\frac{W}{ {Q}_{\text{h}}} $$ . The work
$$W $$ was just found to be $$1.02 \times 10^{14} \text{J} $$ , and $${Q}_
{\text{h}} $$ is given, so the efficiency is

<div class="equation" >
 $$\begin{array}{lll}
 \text{Eff}& =& \frac{ 1.02 \times 10^{14} \text{J}}{ 2.50 \times 10^{14} \text{J}}\\ 
   & =&  0.408\text{, or } 40.8\% \end{array} $$
</div>
**Strategy for (c)**

The daily consumption of coal is calculated using the information that each day
there is $$ 2.50 \times 10^{14} \text{J} $$ of heat transfer from coal. In the
combustion process, we have $$\text{C}+{\text{O}}_{2}\to {\text{CO}}_{2} $$. So
every 12 kg of coal puts 12 kg + 16 kg + 16 kg = 44 kg of $${\text{CO}}_{2} $$
into the atmosphere.

**Solution for (c)**

The daily coal consumption is

<div class="equation" >
 $$\frac{ 2.50 \times 10^{14} \text{J}}{ 2.50 \times 10^{6}  \text{J/kg}}= 1.0 \times 10^{8}  \text{kg} \text{.}  $$
</div>
Assuming that the coal is pure and that all the coal goes toward producing carbon dioxide, the carbon dioxide produced per day is

<div class="equation" >
 $$ 1.0 \times 10^{8}  \text{kg coal}×\frac{ {44 \text{kg CO}}_{2}}{12 \text{kg coal}}= 3.7 \times 10^{8}  {\text{kg CO}}_{2}\text{.} $$
</div>
This is 370 000 metric tons of $${\text{CO}}_{2} $$ produced every day.

**Discussion**

If all the work output is converted to electricity in a period of one day, the
average power output is 1180 MW (this is left to you as an end-of-chapter
problem). This value is about the size of a large-scale conventional power
plant. The efficiency found is acceptably close to the value of 42% given for
coal power stations. It means that fully 59.2% of the energy is heat transfer to
the environment, which usually results in warming lakes, rivers, or the ocean
near the power station, and is implicated in a warming planet generally. While
the laws of thermodynamics limit the efficiency of such plants—including plants
fired by nuclear fuel, oil, and natural gas—the heat transfer to the environment
could be, and sometimes is, used for heating homes or for industrial processes.
The generally low cost of energy has not made it economical to make better use
of the waste heat transfer from most heat engines. Coal-fired power plants
produce the greatest amount of $${\text{CO}}_{2} $$ per unit energy output (
compared to natural gas or oil), making coal the least efficient fossil fuel.

</div>

With the information given in [[Example 1]](#Example1), we can find
characteristics such as the efficiency of a heat engine without any knowledge of
how the heat engine operates, but looking further into the mechanism of the
engine will give us greater insight. [[Figure 4]](#Figure4) illustrates the
operation of the common four-stroke gasoline engine. The four steps shown
complete this heat engine’s cycle, bringing the gasoline-air mixture back to its
original condition.

The **Otto cycle** shown in [[Figure 5]](#Figure5)(a) is used in four-stroke
internal combustion engines, although in fact the true Otto cycle paths do not
correspond exactly to the strokes of the engine.

The adiabatic process AB corresponds to the nearly adiabatic compression stroke
of the gasoline engine. In both cases, work is done on the system (the gas
mixture in the cylinder), increasing its temperature and pressure. Along path BC
of the Otto cycle, heat transfer $${Q}_{\text{h}} $$ into the gas occurs at
constant volume, causing a further increase in pressure and temperature. This
process corresponds to burning fuel in an internal combustion engine, and takes
place so rapidly that the volume is nearly constant. Path CD in the Otto cycle
is an adiabatic expansion that does work on the outside world, just as the power
stroke of an internal combustion engine does in its nearly adiabatic expansion.
The work done by the system along path CD is greater than the work done on the
system along path AB, because the pressure is greater, and so there is a net
work output. Along path DA in the Otto cycle, heat transfer $${Q}_{\text{c}} $$
from the gas at constant volume reduces its temperature and pressure, returning
it to its original state. In an internal combustion engine, this process
corresponds to the exhaust of hot gases and the intake of an air-gasoline
mixture at a considerably lower temperature. In both cases, heat transfer into
the environment occurs along this final path.

The net work done by a cyclical process is the area inside the closed path on a
$$PV $$ diagram, such as that inside path ABCDA in [[Figure 5]](#Figure5). Note
that in every imaginable cyclical process, it is absolutely necessary for heat
transfer from the system to occur in order to get a net work output. In the Otto
cycle, heat transfer occurs along path DA. If no heat transfer occurs, then the
return path is the same, and the net work output is zero. The lower the
temperature on the path AB, the less work has to be done to compress the gas.
The area inside the closed path is then greater, and so the engine does more
work and is thus more efficient. Similarly, the higher the temperature along
path CD, the more work output there is. (See [[Figure 6]](#Figure6).) So
efficiency is related to the temperatures of the hot and cold reservoirs. In the
next section, we shall see what the absolute limit to the efficiency of a heat
engine is, and how it is related to temperature.

![The figure shows four diagrams a, b, c, and d representing four stages of a four stroke gasoline engine. The construction of the engine has the base chamber whose cross section is in the shape of a square with flat corners, the top portion of the chamber is extended into a cylindrical section. The cylindrical section ends in the upper section with two valves, an inlet and an outlet. The cylindrical section has a movable cylinder with a piston attached to it. The piston is connected to the crank shaft in the base gas chamber. There is a spark plug on the top most part of the cylinder between the two valves. The four parts of the diagram show various stages of this four stoke engine. Part a of the diagram shows the air fuel mixture enters through the inlet valve in the upper section of the engine. The outlet valve is shown to be closed. The air and fuel is shown to exert a pressure on the piston acting downward. This force is shown to move the rotating crank shaft in clockwise direction in the gas chamber. This is the intake stroke. Part b of the diagram shows the compression stroke. Both the inlet and outlet valves are closed. The air and fuel mixture is shown to be compressed. The piston is shown to rise up as shown by a vertically pointing arrow. The piston is at the edge of the cylinder near the valves. The crankshaft in the gas chamber has shown to complete one complete cycle of rotation in the gas chamber. Part c of the diagram shows the power stroke. It has two parts, first the ignition stroke. This shows ignition of the fuel in the cylinder and pressure buildup in the region. Then in the second part the piston is shown to descend down the cylinder moving the crankshaft in the gas chamber in the clockwise direction. Part d of the figure shows the exhaust stroke. The piston expels the hot gas by moving upward and the gas is expelled through the exhaust valve.](../resources/Figure_15_03_04.jpg "In the four-stroke internal combustion gasoline engine, heat transfer into work takes place in the cyclical process shown here. The piston is connected to a rotating crankshaft, which both takes work out of and does work on the gas in the cylinder. (a) Air is mixed with fuel during the intake stroke. (b) During the compression stroke, the air-fuel mixture is rapidly compressed in a nearly adiabatic process, as the piston rises with the valves closed. Work is done on the gas. (c) The power stroke has two distinct parts. First, the air-fuel mixture is ignited, converting chemical potential energy into thermal energy almost instantaneously, which leads to a great increase in pressure. Then the piston descends, and the gas does work by exerting a force through a distance in a nearly adiabatic process. (d) The exhaust stroke expels the hot gas to prepare the engine for another cycle, starting again with the intake stroke.")
{: #Figure4}

![Part a of the figure shows a graph of pressure P versus volume V for an Otto cycle. The pressure P is along the Y axis and the volume V is along the X axis. The graph shows a complete cycle A B C D. The path begins at point A; the curve rises upward from point A to point B along the direction of the negative X axis. This is marked as an adiabatic process. Then the curve rises vertically up from point B to point C in a direction perpendicular to the X axis. Then the curve moves smoothly down to point D along the direction of the positive X axis. This is also marked as an adiabatic process. The last part of the curve drops vertically down from point D back to point A. The path A B is slightly lower than path C D. Heat Q sub h is shown to enter the system as shown by a bold arrow to the curve B C. Heat Q sub c is shown to leave the system as shown by a bold arrow near D A. The area inside A B C D is shaded, and the area of the shaded region is shown proportional to the work W. Part b of the diagram shows an internal combustion engine represented as a circle. The hot reservoir is a rectangular section at the top of the circle shown at temperature T sub h. A cold reservoir is shown as a rectangular section in the bottom part of the circle at temperature T sub c. Heat Q sub h is shown to enter the heat engine, as shown by a bold arrow. Work W is produced as output, shown to leave the system, and the remaining heat Q sub c is returned back to the cold reservoir as shown by bold arrow toward it.](../resources/Figure_15_03_05.jpg "\( PV \) diagram for a simplified Otto cycle, analogous to that employed in an internal combustion engine. Point A corresponds to the start of the compression stroke of an internal combustion engine. Paths AB and CD are adiabatic and correspond to the compression and power strokes of an internal combustion engine, respectively. Paths BC and DA are isochoric and accomplish similar results to the ignition and exhaust-intake portions, respectively, of the internal combustion engine&#x2019;s cycle. Work is done on the gas along path AB, but more work is done by the gas along path CD, so that there is a net work output.")
{: #Figure5}

![Part a of the figure shows a graph of pressure P versus volume V for an Otto cycle. The pressure P is along the Y axis and the volume V is along the X axis. The graph shows a complete cycle A B C D. The path begins at point A; the curve rises upward from point A to point B along the direction of the negative X axis. This is marked as an adiabatic process. Then the curve rises vertically up from point B to point C in a direction perpendicular to the X axis. Then the curve moves smoothly down to point D along the direction of the positive X axis. This is also marked as an adiabatic process. The last part of the curve drops vertically down from point D back to point A. The path A B is much lower than path C D, which shows that the starting temperature of path C D is higher than A B. Heat Q sub h prime enters the system as shown by a bold arrow to the curve B C. Heat Q sub c prime leaves the system, as shown by a bold arrow near D A. The area inside A B C D is shaded. Part b of the diagram shows an internal combustion engine represented as a circle. The hot reservoir is a rectangular section at the top of the circle shown at temperature T sub h prime. A cold reservoir is shown as a rectangular section in the bottom part of the circle at temperature T sub c prime. Heat Q sub h prime enters the heat engine as shown by a bold arrow, a work W prime is produced as output, shown to leave the system, and the remaining heat Q sub c prime is returned back to the cold reservoir, as shown by a bold arrow toward it.](../resources/Figure_15_03_06.jpg "This Otto cycle produces a greater work output than the one in [Figure 5](#Figure5), because the starting temperature of path CD is higher and the starting temperature of path AB is lower. The area inside the loop is greater, corresponding to greater net work output.")
{: #Figure6}

### Section Summary

* The two expressions of the second law of thermodynamics are: (i) Heat transfer
  occurs spontaneously from higher- to lower-temperature bodies but never
  spontaneously in the reverse direction; and (ii) It is impossible in any
  system for heat transfer from a reservoir to completely convert to work in a
  cyclical process in which the system returns to its initial state.
* Irreversible processes depend on path and do not return to their original
  state. Cyclical processes are processes that return to their original state at
  the end of every cycle.
* In a cyclical process, such as a heat engine, the net work done by the system
  equals the net heat transfer into the system, or $$W={Q}_{\text{h}}-{Q}_
  {\text{c}} $$ , where $${Q}_{\text{h}} $$ is the heat transfer from the hot
  object (hot reservoir), and $${Q}_{\text{c}} $$ is the heat transfer into the
  cold object (cold reservoir).
* Efficiency can be expressed as $$\text{Eff}=\frac{W}{ {Q}_{\text{h}}} $$ , the
  ratio of work output divided by the amount of energy input.
* The four-stroke gasoline engine is often explained in terms of the Otto cycle,
  which is a repeating sequence of processes that convert heat into work.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Imagine you are driving a car up Pike’s Peak in Colorado. To raise a car weighing 1000 kilograms a distance of 100 meters would require about a million joules. You could raise a car 12.5 kilometers with the energy in a gallon of gas. Driving up Pike's Peak (a mere 3000-meter climb) should consume a little less than a quart of gas. But other considerations have to be taken into account. Explain, in terms of efficiency, what factors may keep you from realizing your ideal energy use on this trip.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Is a temperature difference necessary to operate a heat engine? State why or why not.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Definitions of efficiency vary depending on how energy is being converted. Compare the definitions of efficiency for the human body and heat engines. How does the definition of efficiency in each relate to the type of energy being converted into doing work?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why—other than the fact that the second law of thermodynamics says reversible engines are the most efficient—should heat engines employing reversible processes be more efficient than those employing irreversible processes? Consider that dissipative mechanisms are one cause of irreversibility.

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A certain heat engine does 10.0 kJ of work and 8.50 kJ of heat transfer occurs to the environment in a cyclical process. (a) What was the heat transfer into this engine? (b) What was the engine’s efficiency?

</div>
<div class="solution" markdown="1">
(a)  $$18.5 \text{kJ} $$
(b) 54.1%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
With  $$ 2.56 \times 10^{6}  \text{J} $$
 of heat transfer into this engine, a given cyclical heat engine can do only  $$ 1.50 \times 10^{5}  \text{J} $$
 of work. (a) What is the engine’s efficiency? (b) How much heat transfer to the environment takes place?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the work output of a cyclical heat engine having a 22.0% efficiency and  $$ 6.00 \times 10^{9}  \text{J} $$
 of heat transfer into the engine? (b) How much heat transfer occurs to the environment?

</div>
<div class="solution" markdown="1">
(a)  $$1.32 \times 10^{9} \text{J} $$
(b)  $$4.68 \times 10^{9} \text{J} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the efficiency of a cyclical heat engine in which 75.0 kJ of heat transfer occurs to the environment for every 95.0 kJ of heat transfer into the engine? (b) How much work does it produce for 100 kJ of heat transfer into the engine?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The engine of a large ship does  $$ 2.00 \times 10^{8}  \text{J} $$
 of work with an efficiency of 5.00%. (a) How much heat transfer occurs to the environment? (b) How many barrels of fuel are consumed, if each barrel produces  $$ 6.00 \times 10^{9}  \text{J} $$
 of heat transfer when burned?

</div>
<div class="solution" markdown="1">
(a)  $$3.80 \times 10^{9} \text{J} $$
(b) 0.667 barrels

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) How much heat transfer occurs to the environment by an electrical power station that uses  $$ 1.25 \times 10^{14} \text{J} $$
 of heat transfer into the engine with an efficiency of 42.0%? (b) What is the ratio of heat transfer to the environment to work output? (c) How much work is done?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Assume that the turbines at a coal-powered power plant were upgraded, resulting in an improvement in efficiency of 3.32%. Assume that prior to the upgrade the power station had an efficiency of 36% and that the heat transfer into the engine in one day is still the same at  $$ 2.50 \times 10^{14} \text{J} $$ .
 (a) How much more electrical energy is produced due to the upgrade? (b) How much less heat transfer occurs to the environment due to the upgrade?

</div>
<div class="solution"  markdown="1">
(a)  $$8.30 \times 10^{12} \text{J} $$ ,
 which is 3.32% of  $$2.50 \times 10^{14} \text{J} $$ .

(b)  $$-8.30 \times 10^{12} \text{J} $$ , where the negative sign indicates a
reduction in heat transfer to the environment.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
This problem compares the energy output and heat transfer to the environment by two different types of nuclear power stations—one with the normal efficiency of 34.0%, and another with an improved efficiency of 40.0%. Suppose both have the same heat transfer into the engine in one day,  $$ 2.50 \times 10^{14} \text{J} $$ .
 (a) How much more electrical energy is produced by the more efficient power station? (b) How much less heat transfer occurs to the environment by the more efficient power station? (One type of more efficient nuclear power station, the gas-cooled reactor, has not been reliable enough to be economically feasible in spite of its greater efficiency.)

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

irreversible process
: any process that depends on path direction

second law of thermodynamics
: heat transfer flows from a hotter to a cooler object, never the reverse, and
some heat energy in any process is lost to available work in a cyclical process

cyclical process
: a process in which the path returns to its original state at the end of every
cycle

Otto cycle
: a thermodynamic cycle, consisting of a pair of adiabatic processes and a pair
of isochoric processes, that converts heat into work, e.g., the four-stroke
engine cycle of intake, compression, ignition, and exhaust

</div>
