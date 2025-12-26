---
title: 'Applications of Thermodynamics: Heat Pumps and Refrigerators'
layout: page
sectionNumber: 5
chapterNumber: 15
---

<div class="abstract" markdown="1">
* Describe the use of heat engines in heat pumps and refrigerators.
* Demonstrate how a heat pump works to warm an interior space.
* Explain the differences between heat pumps and refrigerators.
* Calculate a heat pump’s coefficient of performance.
</div>

![Photograph of various expensive refrigerators displayed in a home appliance store.](../resources/Figure_15_05_00.jpg 'Almost every home contains a refrigerator. Most people don’t realize they are also sharing their homes with a heat pump. (credit: Id1337x, Wikimedia Commons)')
{: #Figure1}

Heat pumps, air conditioners, and refrigerators utilize heat transfer from cold
to hot. They are heat engines run backward. We say backward, rather than
reverse, because except for Carnot engines, all heat engines, though they can be
run backward, cannot truly be reversed. Heat transfer occurs from a cold
reservoir $${Q}_{\text{c}} $$ and into a hot one. This requires work input $$W

$$
, which is also converted to heat transfer. Thus the heat transfer to the hot
reservoir is $${Q}_{\text{h}}={Q}_{\text{c}}+W $$ .
(Note that $${Q}_{\text{h}} $$ , $${Q}_{\text{c}} $$ , and $$W $$ are positive,
with their directions indicated on schematics rather than by sign.) A heat
pump’s mission is for heat transfer $${Q}_{\text{h}} $$ to occur into a warm
environment, such as a home in the winter. The mission of air conditioners and
refrigerators is for heat transfer $${Q}_{\text{c}} $$ to occur from a cool
environment, such as chilling a room or keeping food at lower temperatures than
the environment. (Actually, a heat pump can be used both to heat and cool a
space. It is essentially an air conditioner and a heating unit all in one. In
this section we will concentrate on its heating mode.)

![Part a of the figure shows a heat pump, drawn as a circle. Work W, indicated by a bold orange arrow, is put in to the pump to transfer heat Q sub c, indicated by a bold orange arrow, out of a cold temperature reservoir T sub c, drawn as a blue rectangle, and pumps heat Q sub h, indicated by a larger bold orange arrow, into high temperature reservoir T sub h. Part b of the figure shows a P V diagram for a Carnot cycle. The pressure P is along the Y axis and the volume V is along the X axis. The graph shows a complete cycle A D C B A. The path begins at point A, then it drops sharply down and slightly to the right until point D. This is marked as an adiabatic expansion. Then the curve drops down more gradually, still to the right, from point D to point C. This is marked as an isotherm at temperature T sub c, during which heat Q sub c enters the system. The curve then rises from point C to point B along the direction opposite to that of A D. This is an adiabatic compression. The last part of the curve rises up from point B back to A. This is marked as an isotherm at temperature T sub h, during which heat Q sub h leaves the system. The path D C is lower than path B A. Heat entering and leaving the system is indicated by bold orange arrows, with Q sub h larger than Q sub c.](../resources/Figure_15_05_01.jpg "Heat pumps, air conditioners, and refrigerators are heat engines operated backward. The one shown here is based on a Carnot (reversible) engine. (a) Schematic diagram showing heat transfer from a cold reservoir to a warm reservoir with a heat pump. The directions of \( W \) , \( Q_{h} \), and \( Q_{c} \) are opposite what they would be in a heat engine. (b) \( PV \) diagram for a Carnot cycle similar to that in [Figure 3](#Figure3) but reversed, following path ADCBA. The area inside the loop is negative, meaning there is a net work input. There is heat transfer \( Q_{c} \) into the system from a cold reservoir along path DC, and heat transfer \( Q_{h} \) out of the system into a hot reservoir along path BA.")
{: #Figure2}

### Heat Pumps

The great advantage of using a heat pump to keep your home warm, rather than
just burning fuel, is that a heat pump supplies $${Q}_{\text{h}}={Q}_
{\text{c}}+W $$ . Heat transfer is from the outside air, even at a temperature
below freezing, to the indoor space. You only pay for $$W $$ , and you get an
additional heat transfer of $${Q}_{\text{c}} $$ from the outside at no cost; in
many cases, at least twice as much energy is transferred to the heated space as
is used to run the heat pump. When you burn fuel to keep warm, you pay for all
of it. The disadvantage is that the work input (required by the second law of
thermodynamics) is sometimes more expensive than simply burning fuel, especially
if the work is done by electrical energy.

The basic components of a heat pump in its heating mode are shown
in [[Figure 3]](#Figure3). A working fluid such as a non-CFC refrigerant is
used. In the outdoor coils (the evaporator), heat transfer $${Q}_{\text{c}} $$
occurs to the working fluid from the cold outdoor air, turning it into a gas.

![The diagram shows a diagram of a heat pump. There are four components connected by pipes. They are a condenser (1), an expansion valve (2), an evaporator (3), and a compressor (4), connected in that order. The evaporator coils are outside; all of the other components are inside. Heat Q sub c is absorbed from the outside air at the evaporator, and heat Q sub h is emitted inside from the condenser.](../resources/Figure_15_05_02.jpg "A simple heat pump has four basic components: (1)&#xA0;condenser, (2)&#xA0;expansion valve, (3)&#xA0;evaporator, and (4)&#xA0;compressor. In the heating mode, heat transfer \( Q_{c} \) occurs to the working fluid in the evaporator (3) from the colder outdoor air, turning it into a gas. The electrically driven compressor (4) increases the temperature and pressure of the gas and forces it into the condenser coils (1) inside the heated space. Because the temperature of the gas is higher than the temperature in the room, heat transfer from the gas to the room occurs as the gas condenses to a liquid. The working fluid is then cooled as it flows back through an expansion valve (2) to the outdoor evaporator coils.")
{: #Figure3}

The electrically driven compressor (work input $$W $$ )
raises the temperature and pressure of the gas and forces it into the condenser
coils that are inside the heated space. Because the temperature of the gas is
higher than the temperature inside the room, heat transfer to the room occurs
and the gas condenses to a liquid. The liquid then flows back through a
pressure-reducing valve to the outdoor evaporator coils, being cooled through
expansion. (In a cooling cycle, the evaporator and condenser coils exchange
roles and the flow direction of the fluid is reversed.)

The quality of a heat pump is judged by how much heat transfer $${Q}_{\text{h}}
$$ occurs into the warm space compared with how much work input $$W $$ is
required. In the spirit of taking the ratio of what you get to what you spend,
we define a **heat pump’s coefficient of performance** ( $${\text{COP}}_
{\text{hp}} $$ )
to be

<div class="equation" >
 $${\text{COP}}_{\text{hp}}=\frac{ {Q}_{\text{h}}}{W}\text{.} $$
</div>

Since the efficiency of a heat engine is $$\text{Eff}=W/{Q}_{\text{h}} $$ , we
see that $${\text{COP}}_{\text{hp}}=1/\text{Eff} $$ , an important and
interesting fact. First, since the efficiency of any heat engine is less than 1,
it means that $${\text{COP}}_{\text{hp}} $$ is always greater than 1—that is, a
heat pump always has more heat transfer $${Q}_{\text{h}} $$ than work put into
it. Second, it means that heat pumps work best when temperature differences are
small. The efficiency of a perfect, or Carnot, engine is $${\text{Eff}}_
{\text{C}}=1-\left({T}_{\text{c}}/{T}_{\text{h}}\right) $$ ; thus, the smaller
the temperature difference, the smaller the efficiency and the greater the
$${\text{COP}}_{\text{hp}} $$
** (because $${\text{COP}}_{\text{hp}}=1/\text{Eff} $$ ). In other words, heat
pumps do not work as well in very cold climates as they do in more moderate
climates.

Friction and other irreversible processes reduce heat engine efficiency, but
they do **not** benefit the operation of a heat pump—instead, they reduce the
work input by converting part of it to heat transfer back into the cold
reservoir before it gets into the heat pump.

![A diagram of a heat pump (shown as a circle). Work W, indicated by a large, wavy orange arrow, is the total work put into the pump. Part of this work is done against friction and is lost in the form of frictional heat, Q sub f, to the cold reservoir. The portion of work that is used by the heat pump is represented by W prime. The pump transfers heat Q sub h, indicated by a large orange arrow, into the hot reservoir, a tan-colored rectangle, at temperature T sub h. Frictional heat Q sub f, indicated by a wavy orange arrow, is transferred to the cold reservoir, a blue rectangle at temperature T sub c. Heat Q sub c, indicated by a smaller wavy orange arrow, is transferred into the pump from the cold reservoir. Heat Q sub h is formed from a combination of W prime and Q sub c.](../resources/Figure_15_05_03.jpg "When a real heat engine is run backward, some of the intended work input \( W \) goes into heat transfer before it gets into the heat engine, thereby reducing its coefficient of performance \( \text{COP}_\text{hp} \). In this figure, \(W^\prime \) represents the portion of \(W\) that goes into the heat pump, while the remainder of \(W \) is lost in the form of frictional heat \( Q_f \) to the cold reservoir. If all of \( W \) had gone into the heat pump, then \( Q_{h} \) would have been greater. The best heat pump uses adiabatic and isothermal processes, since, in theory, there would be no dissipative processes to reduce the heat transfer to the hot reservoir.")
{: #Figure4}

<div class="example" markdown="1">
<div class="title">
The Best COP<sub>hp</sub> of a Heat Pump for Home Use
</div>
A heat pump used to warm a home must employ a cycle that produces a working fluid at temperatures greater than typical indoor temperature so that heat transfer to the inside can take place. Similarly, it must produce a working fluid at temperatures that are colder than the outdoor temperature so that heat transfer occurs from outside. Its hot and cold reservoir temperatures therefore cannot be too close, placing a limit on its  $${\text{COP}}_{\text{hp}} $$ .
 (See [[Figure 2]](#Figure2).) What is the best coefficient of performance possible for such a heat pump, if it has a hot reservoir temperature of  $$ 45.0\text{ºC} $$
 and a cold reservoir temperature of  $$- 15.0\text{ºC} $$ ?

**Strategy**

A Carnot engine reversed will give the best possible performance as a heat pump.
As noted above, $${\text{COP}}_{\text{hp}}=1/\text{Eff} $$ , so that we need to
first calculate the Carnot efficiency to solve this problem.

**Solution**

Carnot efficiency in terms of absolute temperature is given by \:

<div class="equation" >
 $${\text{Eff}}_{\text{C}}=1-\frac{ {T}_{\text{c}}}{ {T}_{\text{h}}}\text{.} $$
</div>
The temperatures in kelvins are  $${T}_{\text{h}}=318 \text{K} $$
 and  $${T}_{\text{c}}=258 \text{K} $$ ,
 so that

<div class="equation" >
 $${\text{Eff}}_{\text{C}}=1-\frac{258 \text{K}}{318 \text{K}}= 0.1887 \text{.} $$
</div>
Thus, from the discussion above,

<div class="equation" >
 $${\text{COP}}_{\text{hp}}=\frac{1}{\text{Eff}}=\frac{1}{ 0.1887}= 5.30, $$
</div>
or

<div class="equation" >
 $${\text{COP}}_{\text{hp}}=\frac{ {Q}_{\text{h}}}{W}= 5.30\text{,} $$
</div>
so that

<div class="equation" >
 $${Q}_{\text{h}}=5.30 W\text{.} $$
</div>
**Discussion**

This result means that the heat transfer by the heat pump is 5.30 times as much
as the work put into it. It would cost 5.30 times as much for the same heat
transfer by an electric room heater as it does for that produced by this heat
pump. This is not a violation of conservation of energy. Cold ambient air
provides 4.3 J per 1 J of work from the electrical outlet.

![The figure shows a schematic diagram of a heat pump. The hot and cold reservoirs are shown as two rectangular boxes attached to a vertical rectangular wall. The hot reservoir is at temperature T sub c equals negative fifteen degrees Celsius and the hot reservoir is at a temperature T sub h equals forty five degrees Celsius. Work W is shown to enter from an electrical outlet. Heat Q sub c is shown to enter the cold reservoir at an outside air temperature of negative five degrees Celsius and Q sub h is shown to leave the hot reservoir at an inside air temperature of twenty degrees Celsius.](../resources/Figure_15_05_04.jpg "Heat transfer from the outside to the inside, along with work done to run the pump, takes place in the heat pump of the example above. Note that the cold temperature produced by the heat pump is lower than the outside temperature, so that heat transfer into the working fluid occurs. The pump&#x2019;s compressor produces a temperature greater than the indoor temperature in order for heat transfer into the house to occur. ")
{: #Figure5}

</div>

Real heat pumps do not perform quite as well as the ideal one in the previous
example; their values of $${\text{COP}}_{\text{hp}} $$ range from about 2 to 4.
This range means that the heat transfer $${Q}_{\text{h}} $$ from the heat pumps
is 2 to 4 times as great as the work $$W $$ put into them. Their economical
feasibility is still limited, however, since $$W $$ is usually supplied by
electrical energy that costs more per joule than heat transfer by burning fuels
like natural gas. Furthermore, the initial cost of a heat pump is greater than
that of many furnaces, so that a heat pump must last longer for its cost to be
recovered. Heat pumps are most likely to be economically superior where winter
temperatures are mild, electricity is relatively cheap, and other fuels are
relatively expensive. Also, since they can cool as well as heat a space, they
have advantages where cooling in summer months is also desired. Thus some of the
best locations for heat pumps are in warm summer climates with cool
winters. [[Figure 6]](#Figure6) shows a heat pump, called a “*reverse cycle”* or
“split-system cooler” in some countries.

![A residential heat pump.](../resources/Figure_15_05_05.jpg "In hot weather, heat transfer occurs from air inside the room to air outside, cooling the room. In cool weather, heat transfer occurs from air outside to air inside, warming the room. This switching is achieved by reversing the direction of flow of the working fluid.")
{: #Figure6}

### Air Conditioners and Refrigerators

Air conditioners and refrigerators are designed to cool something down in a warm
environment. As with heat pumps, work input is required for heat transfer from
cold to hot, and this is expensive. The quality of air conditioners and
refrigerators is judged by how much heat transfer $${Q}_{\text{c}} $$ occurs
from a cold environment compared with how much work input $$W $$ is required.
What is considered the benefit in a heat pump is considered waste heat in a
refrigerator. We thus define the **coefficient of performance**  $$\left(
\text{COP}_{\text{ref}} \right) $$ of an air conditioner or refrigerator to be

<div class="equation">
 $${\text{COP}}_{\text{ref}}=\frac{ {Q}_{\text{c}}}{W}\text{.} $$
</div>

Noting again that $${Q}_{\text{h}}={Q}_{\text{c}}+W $$ , we can see that an air
conditioner will have a lower coefficient of performance than a heat pump,
because $${\text{COP}}_{\text{hp}}={Q}_{\text{h}}/W $$ and $${Q}_{\text{h}} $$
is greater than $${Q}_{\text{c}} $$ . In this module’s Problems and Exercises,
you will show that

<div class="equation" >
 $${\text{COP}}_{\text{ref}}={\text{COP}}_{\text{hp}}-1 $$
</div>

for a heat engine used as either an air conditioner or a heat pump operating
between the same two temperatures. Real air conditioners and refrigerators
typically do remarkably well, having values of $${\text{COP}}_{\text{ref}} $$
ranging from 2 to 6. These numbers are better than the $${\text{COP}}_
{\text{hp}} $$ values for the heat pumps mentioned above, because the
temperature differences are smaller, but they are less than those for Carnot
engines operating between the same two temperatures.

A type of $$\text{COP} $$ rating system called the “energy efficiency rating” (
$$\text{EER} $$ )   has been developed. This rating is an example where non-SI
units are still used and relevant to consumers. To make it easier for the
consumer, Australia, Canada, New Zealand, and the U.S. use an Energy Star Rating
out of 5 stars—the more stars, the more energy efficient the appliance.
$$\text{EER}\text{s} $$ are expressed in mixed units of British thermal units (
Btu) per hour of heating or cooling divided by the power input in watts. Room
air conditioners are readily available with $$\text{EER}\text{s} $$ ranging from
6 to 12. Although not the same as the $$\text{COP}\text{s} $$ just described,
these $$\text{EER}\text{s} $$ are good for comparison purposes—the greater the
$$\text{EER} $$ , the cheaper an air conditioner is to operate (but the higher
its purchase price is likely to be).

The $$\text{EER} $$ of an air conditioner or refrigerator can be expressed as

<div class="equation" >
 $$\text{EER}=\frac{ {Q}_{\text{c}}/{t}_{1}}{W/{t}_{2}}, $$
</div>

where $${Q}_{\text{c}} $$ is the amount of heat transfer from a cold environment
in British thermal units, $${t}_{1} $$ is time in hours, $$W $$ is the work
input in joules, and $${t}_{2} $$ is time in seconds.

<div class="note" id="Note1" data-has-label="true" data-label="" markdown="1">
<div class="title">
Problem-Solving Strategies for Thermodynamics
</div>
1.   **Examine the situation to determine whether heat, work, or internal energy are involved*.* Look for any system where the primary methods of transferring energy are heat and work. Heat engines, heat pumps, refrigerators, and air conditioners are examples of such systems.
2.   **Identify the system of interest and draw a labeled diagram of the system showing energy flow.**
3.   **Identify exactly what needs to be determined in the problem (identify the unknowns)*.* A written list is useful. Maximum efficiency means a Carnot engine is involved. Efficiency is not the same as the coefficient of performance.
4.   **Make a list of what is given or can be inferred from the problem as stated (identify the knowns)*.* Be sure to distinguish heat transfer into a system from heat transfer out of the system, as well as work input from work output. In many situations, it is useful to determine the type of process, such as isothermal or adiabatic.
5.   **Solve the appropriate equation for the quantity to be determined (the unknown).**
6.   **Substitute the known quantities along with their units into the appropriate equation and obtain numerical solutions complete with units.**
7.   **Check the answer to see if it is reasonable: Does it make sense?** For example, efficiency is always less than 1, whereas coefficients of performance are greater than 1.

</div>

### Section Summary

* An artifact of the second law of thermodynamics is the ability to heat an
  interior space using a heat pump. Heat pumps compress cold ambient air and, in
  so doing, heat it to room temperature without violation of conservation
  principles.
* To calculate the heat pump’s coefficient of performance, use the equation
  $${\text{COP}}_{\text{hp}}=\frac{ {Q}_{\text{h}}}{W} $$ .

* A refrigerator is a heat pump; it takes warm ambient air and expands it to
  chill it.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain why heat pumps do not work as well in very cold climates as they do in milder ones. Is the same true of refrigerators?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In some Northern European nations, homes are being built without heating systems of any type. They are very well insulated and are kept warm by the body heat of the residents. However, when the residents are not at home, it is still warm in these houses. What is a possible explanation?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why do refrigerators, air conditioners, and heat pumps operate most cost-effectively for cycles with a small difference between  $${T}_{\text{h}} $$
 and  $${T}_{\text{c}} $$ ?
 (Note that the temperatures of the cycle employed are crucial to its  $$\text{COP} $$ .)

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Grocery store managers contend that there is **less** total energy consumption in the summer if the store is kept at a **low** temperature. Make arguments to support or refute this claim, taking into account that there are numerous refrigerators and freezers in the store.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Can you cool a kitchen by leaving the refrigerator door open?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the coefficient of performance of an ideal heat pump that has heat transfer from a cold temperature of  $$- 25.0\text{ºC} $$
 to a hot temperature of  $$ 40.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">

**Strategy**

An ideal heat pump operates on a Carnot cycle. The coefficient of performance for a Carnot heat pump is given by $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} $$, where temperatures must be in absolute units (Kelvin). We convert the given Celsius temperatures to Kelvin and then calculate the COP.

**Solution**

Given values:
- Cold reservoir temperature: $$ T_c = -25.0\text{°C} = 248 \text{ K} $$
- Hot reservoir temperature: $$ T_h = 40.0\text{°C} = 313 \text{ K} $$

For an ideal (Carnot) heat pump:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} $$
</div>

Substituting values:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{313 \text{ K}}{313 \text{ K} - 248 \text{ K}} = \frac{313}{65} = 4.82 $$
</div>

**The coefficient of performance is 4.82.**

**Discussion**

A COP of 4.82 means that for every joule of work input, the heat pump delivers 4.82 joules of heat to the warm environment. This is very good performance, resulting from the moderate temperature difference of only 65 K (65°C) between the indoor and outdoor environments. If the outdoor temperature drops significantly below −25°C, the COP would decrease, making the heat pump less efficient and more expensive to operate. Conversely, in milder climates with smaller temperature differences, the COP would be even higher. Real heat pumps operating between these temperatures would achieve COPs in the range of 3 to 4 due to irreversibilities and inefficiencies in the actual cycle.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you have an ideal refrigerator that cools an environment at  $$- 20.0\text{ºC} $$
 and has heat transfer to another environment at  $$ 50.0\text{ºC} $$ .
 What is its coefficient of performance?

</div>
<div class="solution" markdown="1">

**Strategy**

An ideal refrigerator operates on a Carnot cycle run in reverse. The coefficient of performance for a refrigerator is $$ \text{COP}_{\text{ref}} = \frac{Q_c}{W} $$. For a Carnot cycle, this can be expressed in terms of the absolute temperatures: $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$. We must convert temperatures to Kelvin.

**Solution**

Given values:
- Cold reservoir temperature: $$ T_c = -20.0\text{°C} = 253 \text{ K} $$
- Hot reservoir temperature: $$ T_h = 50.0\text{°C} = 323 \text{ K} $$

For an ideal (Carnot) refrigerator:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$
</div>

Substituting values:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{253 \text{ K}}{323 \text{ K} - 253 \text{ K}} = \frac{253}{70} = 3.61 $$
</div>

**The coefficient of performance is 3.61.**

**Discussion**

A COP of 3.61 means that for every joule of work input, the refrigerator removes 3.61 joules of heat from the cold environment. This is quite good performance, reflecting the relatively modest temperature difference of 70 K between the reservoirs. Real refrigerators operating between these temperatures would have lower COPs due to irreversibilities. The large temperature difference (70 K) between the cold and hot reservoirs makes this less efficient than a refrigerator operating with a smaller temperature difference, which is why home refrigerators (with smaller temperature differences) typically achieve COPs in the range of 4 to 6.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the best coefficient of performance possible for a hypothetical refrigerator that could make liquid nitrogen at  $$-200\text{ºC} $$
 and has heat transfer to the environment at  $$ 35.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">

**Strategy**

The best possible refrigerator operates on a Carnot cycle. For a Carnot refrigerator, the coefficient of performance is $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$. We must convert temperatures to Kelvin before calculating.

**Solution**

Given values:
- Cold reservoir temperature: $$ T_c = -200\text{°C} = 73 \text{ K} $$
- Hot reservoir temperature: $$ T_h = 35.0\text{°C} = 308 \text{ K} $$

For an ideal (Carnot) refrigerator:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$
</div>

Substituting values:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{73 \text{ K}}{308 \text{ K} - 73 \text{ K}} = \frac{73}{235} = 0.311 $$
</div>

**The best possible coefficient of performance is 0.311.**

**Discussion**

A COP of only 0.311 is quite low, meaning this refrigerator requires about 3.2 joules of work for every joule of heat removed from the cold environment. This poor performance results from the enormous temperature difference of 235 K (235°C) between the liquid nitrogen temperature and ambient temperature. The extreme cold required to liquefy nitrogen (−200°C is near nitrogen's boiling point of −196°C) makes this process very energy-intensive. Real cryogenic refrigeration systems operating at these temperatures would have even lower COPs (perhaps 0.15 to 0.25) due to irreversibilities. This explains why producing and storing liquid nitrogen is expensive and why such systems consume significant electrical power. For comparison, a household refrigerator with a much smaller temperature difference (perhaps 40 K) can achieve COPs of 4 to 6, more than 10 times better than this cryogenic system.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In a very mild winter climate, a heat pump has heat transfer from an environment at  $$ 5.00\text{ºC} $$
 to one at  $$ 35.0\text{ºC} $$ .
 What is the best possible coefficient of performance for these temperatures? Explicitly show how you follow the steps
in the [Problem-Solving Strategies for Thermodynamics](#Note1).

</div>
<div class="solution" markdown="1">

**Strategy**

Following the Problem-Solving Strategies for Thermodynamics:

1. **Examine the situation**: This involves a heat pump transferring heat from a cold outdoor environment to a warmer indoor environment. Work input is required.

2. **Identify the system**: The heat pump is the system. Heat transfer $$ Q_c $$ comes from the cold reservoir at $$ T_c = 5.00\text{°C} $$, work $$ W $$ is input, and heat transfer $$ Q_h $$ goes to the hot reservoir at $$ T_h = 35.0\text{°C} $$.

3. **Identify the unknowns**: We need to find the best possible $$ \text{COP}_{\text{hp}} $$.

4. **Identify the knowns**: $$ T_c = 5.00\text{°C} = 278 \text{ K} $$ and $$ T_h = 35.0\text{°C} = 308 \text{ K} $$. "Best possible" means we should use a Carnot cycle.

5. **Solve for the unknown**: For a Carnot heat pump, $$ \text{COP}_{\text{hp}} = \frac{1}{\text{Eff}_C} = \frac{T_h}{T_h - T_c} $$.

6. **Substitute and calculate** (shown below).

7. **Check reasonableness**: COP should be greater than 1.

**Solution**

Given values:
- Cold reservoir temperature: $$ T_c = 5.00\text{°C} = 278 \text{ K} $$
- Hot reservoir temperature: $$ T_h = 35.0\text{°C} = 308 \text{ K} $$

For an ideal (Carnot) heat pump:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} $$
</div>

Substituting values:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{308 \text{ K}}{308 \text{ K} - 278 \text{ K}} = \frac{308}{30} = 10.3 $$
</div>

**The best possible coefficient of performance is 10.3.**

**Discussion**

This remarkably high COP of 10.3 means that the heat pump delivers 10.3 joules of heat to the warm environment for every joule of work input. This excellent performance is due to the small temperature difference (only 30 K) between the indoor and outdoor environments. In a mild winter climate, heat pumps are extremely cost-effective because they can move much more energy than they consume. For every dollar spent on electricity to run the pump, you get the heating equivalent of $10.30 worth of direct electric heating. This is why heat pumps are economically attractive in mild climates. In colder climates with larger temperature differences, the COP drops significantly, making heat pumps less economical. Real heat pumps would achieve COPs of perhaps 6 to 8 under these conditions due to irreversibilities, which is still excellent performance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the best coefficient of performance for a heat pump that has a hot reservoir temperature of  $$ 50.0\text{ºC} $$
 and a cold reservoir temperature of  $$-20.0\text{ºC} $$ ?
 (b) How much heat transfer occurs into the warm environment if  $$ 3.60 \times 10^{7}  \text{J} $$
 of work ( $$ 10.0\text{kW}\cdot \text{h} $$ )
is put into it? (c) If the cost of this work input is  $$10.0 \text{cents/kW}\cdot \text{h} $$ ,
 how does its cost compare with the direct heat transfer achieved by burning natural gas at a cost of 85.0 cents per therm. (A therm is a common unit of energy for natural gas and equals  $$ 1.055 \times 10^{8}  \text{J} $$ .)

</div>
<div class="solution" markdown="1">

__Strategy__

For part (a), we use the Carnot heat pump formula: $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} $$. For part (b), we use $$ \text{COP}_{\text{hp}} = \frac{Q_h}{W} $$ to find $$ Q_h $$. For part (c), we calculate and compare costs per unit of heat delivered for both the heat pump and natural gas.

__Solution__

Given values:
- Cold reservoir temperature: $$ T_c = -20.0\text{°C} = 253 \text{ K} $$
- Hot reservoir temperature: $$ T_h = 50.0\text{°C} = 323 \text{ K} $$
- Work input: $$ W = 3.60 \times 10^{7} \text{ J} = 10.0 \text{ kWh} $$
- Electricity cost: \$0.10 per kWh
- Natural gas cost: \$0.85 per therm, where 1 therm = $$ 1.055 \times 10^{8} \text{ J} $$

__(a)__ Best coefficient of performance:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} = \frac{323 \text{ K}}{323 \text{ K} - 253 \text{ K}} = \frac{323}{70} = 4.61 $$
</div>

__The best COP is 4.61.__

__(b)__ Heat transfer to warm environment:

<div class="equation">
 $$ Q_h = \text{COP}_{\text{hp}} \times W = 4.61 \times 3.60 \times 10^{7} \text{ J} $$
</div>

<div class="equation">
 $$ Q_h = 1.66 \times 10^{8} \text{ J} $$
</div>

Converting to kilocalories (1 kcal = 4186 J):

<div class="equation">
 $$ Q_h = \frac{1.66 \times 10^{8}}{4186} = 3.97 \times 10^{4} \text{ kcal} $$
</div>

__The heat transfer is $$ 1.66 \times 10^{8} \text{ J} $$ or $$ 3.97 \times 10^{4} \text{ kcal} $$.__

__(c)__ Cost comparison:

__Heat pump cost:__
- Cost = 10.0 kWh × \$0.10/kWh = **\$1.00__

__Natural gas cost__ for same heat output:
- Number of therms needed: $$ \frac{1.66 \times 10^{8} \text{ J}}{1.055 \times 10^{8} \text{ J/therm}} = 1.57 \text{ therms} $$
- Cost = 1.57 therms × \$0.85/therm = **\$1.34__

__The heat pump costs \$1.00, while natural gas costs \$1.34 for the same heat delivery. The heat pump is more economical by \$0.34 (25% savings).**

**Discussion**

Part (a): The COP of 4.61 is excellent, meaning the heat pump delivers 4.61 joules of heat for every joule of electrical work input. This good performance results from the moderate 70 K temperature difference.

Part (b): With 10 kWh of electricity input, the heat pump delivers 166 MJ (46.1 kWh equivalent) of thermal energy to the warm space. The additional 126 MJ comes from the cold outdoor environment at no cost.

Part (c): Despite electricity typically being more expensive per joule than natural gas, the heat pump is still cheaper because it provides more than 4 times as much heat as it consumes in electrical energy. The heat pump saves \$0.34 (25%) compared to burning natural gas. This economic advantage exists in mild climates; in very cold climates where the COP drops significantly, natural gas heating might become more economical. Environmental considerations also favor heat pumps when electricity comes from renewable sources, whereas natural gas combustion always produces CO₂ emissions.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the best coefficient of performance for a refrigerator that cools an environment at  $$- 30.0\text{ºC} $$
 and has heat transfer to another environment at  $$ 45.0\text{ºC} $$ ?
 (b) How much work in joules must be done for a heat transfer of 4186 kJ from the cold environment? (c) What is the cost of doing this if the work costs 10.0 cents per  $$ 3.60 \times 10^{6}  \text{J} $$
 (a kilowatt-hour)? (d) How many kJ of heat transfer occurs into the warm environment? (e) Discuss what type of refrigerator might operate between these temperatures.

</div>
<div class="solution" markdown="1">

__Strategy__

For part (a), we use the Carnot COP formula for a refrigerator: $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$. For part (b), we use $$ \text{COP}_{\text{ref}} = \frac{Q_c}{W} $$ to solve for work. For part (c), we calculate cost from the work and given rate. For part (d), we use energy conservation: $$ Q_h = Q_c + W $$. For part (e), we consider what application requires such cold temperatures.

__Solution__

Given values:
- Cold reservoir temperature: $$ T_c = -30.0\text{°C} = 243 \text{ K} $$
- Hot reservoir temperature: $$ T_h = 45.0\text{°C} = 318 \text{ K} $$
- Heat transfer from cold environment: $$ Q_c = 4186 \text{ kJ} = 4.186 \times 10^6 \text{ J} $$

__(a)__ Best coefficient of performance:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} = \frac{243 \text{ K}}{318 \text{ K} - 243 \text{ K}} = \frac{243}{75} = 3.24 $$
</div>

__The best coefficient of performance is 3.24.__

__(b)__ Work required:

From $$ \text{COP}_{\text{ref}} = \frac{Q_c}{W} $$, we solve for work:

<div class="equation">
 $$ W = \frac{Q_c}{\text{COP}_{\text{ref}}} = \frac{4.186 \times 10^6 \text{ J}}{3.24} = 1.29 \times 10^6 \text{ J} $$
</div>

__The work required is $$ 1.29 \times 10^6 \text{ J} $$ or 1290 kJ.__

__(c)__ Cost of operation:

Cost per kWh: $$ \$0.10 \text{ per } 3.60 \times 10^6 \text{ J} $$

Number of kWh used:

<div class="equation">
 $$ \text{Energy in kWh} = \frac{1.29 \times 10^6 \text{ J}}{3.60 \times 10^6 \text{ J/kWh}} = 0.358 \text{ kWh} $$
</div>

<div class="equation">
 $$ \text{Cost} = (0.358 \text{ kWh})(\$0.10/\text{kWh}) = \$0.0358 \approx \$0.036 $$
</div>

__The cost is 3.6 cents.__

__(d)__ Heat transfer to warm environment:

Using energy conservation:

<div class="equation">
 $$ Q_h = Q_c + W = 4186 \text{ kJ} + 1290 \text{ kJ} = 5476 \text{ kJ} $$
</div>

__The heat transfer to the warm environment is 5476 kJ or $$ 5.48 \times 10^6 \text{ J} $$.__

__(e)__ This refrigerator operates at −30.0°C, which is well below the freezing point of water and typical household refrigeration temperatures. Such temperatures are characteristic of:
- __Commercial freezers__ for long-term food storage
- __Laboratory freezers__ for preserving biological samples
- __Industrial cold storage__ facilities
- __Pharmaceutical storage__ requiring very low temperatures

This is not a household refrigerator (which typically operates around −18°C to −20°C in the freezer compartment) but rather a specialized deep-freeze unit.

__Discussion__

The COP of 3.24 is reasonable for this large temperature difference of 75 K. Real freezers operating at these temperatures would have lower COPs (perhaps 2 to 2.5) due to irreversibilities. The cost of 3.6 cents to remove 4186 kJ seems quite economical, but this is for an ideal refrigerator. The heat rejected to the warm environment (5476 kJ) exceeds the heat removed from the cold environment (4186 kJ) by exactly the work input (1290 kJ), as required by energy conservation. This illustrates why freezers warm up the room they're in: they reject more heat than they remove from their interior. The relatively modest COP compared to household refrigerators reflects the challenge of maintaining very low temperatures.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you want to operate an ideal refrigerator with a cold temperature of  $$- 10.0\text{ºC} $$ ,
 and you would like it to have a coefficient of performance of 7.00. What is the hot reservoir temperature for such a refrigerator?

</div>
<div class="solution" markdown="1">

__Strategy__

For an ideal (Carnot) refrigerator, the coefficient of performance is $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$. We are given $$ \text{COP}_{\text{ref}} $$ and $$ T_c $$, so we can solve for $$ T_h $$. We must work in absolute temperature (Kelvin).

__Solution__

Given values:
- Cold reservoir temperature: $$ T_c = -10.0\text{°C} = 263 \text{ K} $$
- Desired coefficient of performance: $$ \text{COP}_{\text{ref}} = 7.00 $$

Starting with the Carnot refrigerator formula:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{T_c}{T_h - T_c} $$
</div>

Rearranging to solve for $$ T_h $$:

<div class="equation">
 $$ \text{COP}_{\text{ref}}(T_h - T_c) = T_c $$
</div>

<div class="equation">
 $$ \text{COP}_{\text{ref}} \cdot T_h - \text{COP}_{\text{ref}} \cdot T_c = T_c $$
</div>

<div class="equation">
 $$ \text{COP}_{\text{ref}} \cdot T_h = T_c + \text{COP}_{\text{ref}} \cdot T_c $$
</div>

<div class="equation">
 $$ T_h = T_c \left(\frac{1 + \text{COP}_{\text{ref}}}{\text{COP}_{\text{ref}}}\right) = T_c \left(\frac{\text{COP}_{\text{ref}} + 1}{\text{COP}_{\text{ref}}}\right) $$
</div>

Substituting values:

<div class="equation">
 $$ T_h = 263 \text{ K} \left(\frac{7.00 + 1}{7.00}\right) = 263 \text{ K} \left(\frac{8.00}{7.00}\right) $$
</div>

<div class="equation">
 $$ T_h = 263 \times 1.143 = 300.6 \text{ K} $$
</div>

Converting to Celsius:

<div class="equation">
 $$ T_h = 300.6 - 273 = 27.6\text{°C} $$
</div>

__The hot reservoir temperature must be 27.6°C or 301 K.__

__Discussion__

A COP of 7.00 is quite high, which requires a small temperature difference between the reservoirs. Indeed, we find that the hot reservoir must be only 37.6 K (or 37.6°C) warmer than the cold reservoir. At −10.0°C cold temperature and 27.6°C warm temperature, the temperature difference is modest, allowing for good efficiency. This result makes sense for a household freezer: the freezer compartment might be at −10°C, while the room temperature is around 28°C, achieving a COP of about 7 in ideal conditions. Real refrigerators would achieve COPs of perhaps 4 to 6 due to irreversibilities. If the room were significantly warmer than 27.6°C, the COP would drop below 7.00, requiring more energy per unit of heat removed. This demonstrates why refrigerators and freezers work more efficiently in cooler environments and why keeping them in hot rooms or garages increases electricity costs.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An ideal heat pump is being considered for use in heating an environment with a temperature of  $$ 22.0\text{ºC} $$ .
 What is the cold reservoir temperature if the pump is to have a coefficient of performance of 12.0?

</div>
<div class="solution" markdown="1">

__Strategy__

For an ideal (Carnot) heat pump, the coefficient of performance is $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} $$. We are given $$ \text{COP}_{\text{hp}} $$ and $$ T_h $$, so we can solve for $$ T_c $$. We must work in absolute temperature (Kelvin).

__Solution__

Given values:
- Hot reservoir temperature: $$ T_h = 22.0\text{°C} = 295 \text{ K} $$
- Coefficient of performance: $$ \text{COP}_{\text{hp}} = 12.0 $$

Starting with the Carnot heat pump formula:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{T_h}{T_h - T_c} $$
</div>

Rearranging to solve for $$ T_c $$:

<div class="equation">
 $$ \text{COP}_{\text{hp}}(T_h - T_c) = T_h $$
</div>

<div class="equation">
 $$ \text{COP}_{\text{hp}} \cdot T_h - \text{COP}_{\text{hp}} \cdot T_c = T_h $$
</div>

<div class="equation">
 $$ \text{COP}_{\text{hp}} \cdot T_c = \text{COP}_{\text{hp}} \cdot T_h - T_h $$
</div>

<div class="equation">
 $$ T_c = T_h \left(\frac{\text{COP}_{\text{hp}} - 1}{\text{COP}_{\text{hp}}}\right) $$
</div>

Substituting values:

<div class="equation">
 $$ T_c = 295 \text{ K} \left(\frac{12.0 - 1}{12.0}\right) = 295 \text{ K} \left(\frac{11.0}{12.0}\right) = 270 \text{ K} $$
</div>

Converting to Celsius:

<div class="equation">
 $$ T_c = 270 \text{ K} - 273 = -3.0\text{°C} $$
</div>

__The cold reservoir temperature must be −3.0°C or 270 K.__

__Discussion__

A COP of 12.0 is quite high, which requires a small temperature difference between the reservoirs. Indeed, we find that the outdoor temperature needs to be only 25 K (or 25°C) below the indoor temperature. At −3.0°C outdoor temperature, the heat pump operates very efficiently because it doesn't have to work hard to "lift" heat from the cold reservoir to the hot one. This result illustrates why heat pumps are most effective in mild climates. If the outdoor temperature drops significantly below −3.0°C, the COP would fall below 12.0, making the heat pump less efficient. Conversely, on warmer days above −3.0°C, the COP would exceed 12.0, providing even better performance. This problem shows the strong dependence of heat pump performance on climate conditions.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 4-ton air conditioner removes  $$ 5.06 \times 10^{7}  \text{J} $$
 (48 000 British thermal units) from a cold environment in 1.00 h. (a) What energy input in joules is necessary to do this if the air conditioner has an energy efficiency rating ( $$\text{EER} $$ )
of 12.0? (b) What is the cost of doing this if the work costs 10.0 cents per  $$ 3.60 \times 10^{6}  \text{J} $$
 (one kilowatt-hour)? (c) Discuss whether this cost seems realistic. Note that the energy efficiency rating ( $$\text{EER} $$ )
of an air conditioner or refrigerator is defined to be the number of British thermal units of heat transfer from a cold environment per hour divided by the watts of power input.

</div>
<div class="solution" markdown="1">

__Strategy__

For part (a), we use the EER definition to find the power input, then multiply by time to get total energy. EER relates heat removed (in BTU/hr) to power input (in watts). For part (b), we calculate cost based on energy consumed and the given rate. For part (c), we assess reasonableness by calculating daily cost.

__Solution__

Given values:
- Heat removed: $$ Q_c = 5.06 \times 10^{7} \text{ J} = 48{,}000 \text{ BTU} $$ in 1.00 hour
- Energy efficiency rating: $$ \text{EER} = 12.0 $$
- Electricity cost: \$0.10 per kWh = \$0.10 per $$ 3.60 \times 10^{6} \text{ J} $$

__(a)__ Energy input required:

The EER is defined as:

<div class="equation">
 $$ \text{EER} = \frac{\text{BTU/hr}}{\text{watts}} $$
</div>

Rearranging for power:

<div class="equation">
 $$ P = \frac{\text{BTU/hr}}{\text{EER}} = \frac{48{,}000 \text{ BTU/hr}}{12.0} = 4000 \text{ W} $$
</div>

Energy input over 1.00 hour:

<div class="equation">
 $$ W = P \times t = 4000 \text{ W} \times 3600 \text{ s} = 1.44 \times 10^{7} \text{ J} $$
</div>

Alternatively, in kWh: $$ W = 4.00 \text{ kW} \times 1.00 \text{ hr} = 4.00 \text{ kWh} $$

__The energy input is $$ 1.44 \times 10^{7} \text{ J} $$ or 4.00 kWh.__

__(b)__ Cost of operation:

<div class="equation">
 $$ \text{Cost} = \frac{1.44 \times 10^{7} \text{ J}}{3.60 \times 10^{6} \text{ J/kWh}} \times \$0.10/\text{kWh} $$
</div>

<div class="equation">
 $$ \text{Cost} = 4.00 \text{ kWh} \times \$0.10/\text{kWh} = \$0.40 $$
</div>

__The cost is 40 cents per hour.__

__(c)__ Is this cost realistic?

If the air conditioner runs continuously for 24 hours:

<div class="equation">
 $$ \text{Daily cost} = \$0.40/\text{hr} \times 24 \text{ hr} = \$9.60 $$
</div>

Monthly cost (30 days): approximately \$288

This cost seems quite realistic for a 4-ton air conditioner running continuously. In practice, air conditioners cycle on and off to maintain temperature, so actual costs would be lower. Typical residential usage might be 8-12 hours per day in summer, costing \$3-5 daily or \$90-150 monthly, which aligns with real-world summer electricity bills in hot climates. An EER of 12.0 is good but not exceptional—modern units can achieve EER values of 13-20 for better efficiency. The 40 cents per hour is reasonable for providing 12,000 BTU/hr of cooling per ton (4 tons = 48,000 BTU/hr total).

**Discussion**

Part (a): The 4,000 W power draw is typical for a whole-house 4-ton air conditioner. The EER of 12.0 means the system removes 12 BTU of heat for every watt-hour of electricity consumed, which is moderately efficient.

Part (b): At 40 cents per hour, the cost is significant but not prohibitive. This represents the operating cost for continuous cooling in hot weather.

Part (c): The calculated \$9.60 daily cost for continuous operation is realistic and aligns with consumer experience in hot climates. Most homeowners don't run their AC continuously, and programmable thermostats or higher-efficiency units can reduce costs substantially. The calculation demonstrates why energy efficiency matters—a unit with EER 15.0 instead of 12.0 would cost only \$7.68 daily for the same cooling, saving \$1.92 per day or \$58 per month.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the coefficients of performance of refrigerators and heat pumps are related by  $${\text{COP}}_{\text{ref}}={\text{COP}}_{\text{hp}}-1 $$.

Start with the definitions of the $$\text{COP} $$ s and the conservation of
energy relationship between $${Q}_{\text{h}} $$ , $${Q}_{\text{c}} $$ , and $$W
$$

_._

</div>
<div class="solution" markdown="1">

**Strategy**

We start with the definitions of the two coefficients of performance and use the energy conservation relationship for a heat pump or refrigerator operating between the same two temperatures. By algebraic manipulation, we can show that one COP equals the other minus 1.

**Solution**

**Definitions:**

For a heat pump:

<div class="equation">
 $$ \text{COP}_{\text{hp}} = \frac{Q_h}{W} $$
</div>

For a refrigerator:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{Q_c}{W} $$
</div>

**Energy conservation:**

For a cyclic process (heat pump or refrigerator):

<div class="equation">
 $$ Q_h = Q_c + W $$
</div>

**Derivation:**

Starting with the definition of $$ \text{COP}_{\text{ref}} $$:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{Q_c}{W} $$
</div>

From energy conservation, we can express $$ Q_c = Q_h - W $$. Substituting:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{Q_h - W}{W} = \frac{Q_h}{W} - \frac{W}{W} $$
</div>

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \frac{Q_h}{W} - 1 $$
</div>

Recognizing that $$ \frac{Q_h}{W} = \text{COP}_{\text{hp}} $$:

<div class="equation">
 $$ \text{COP}_{\text{ref}} = \text{COP}_{\text{hp}} - 1 $$
</div>

**This proves the relationship: $$ \text{COP}_{\text{ref}} = \text{COP}_{\text{hp}} - 1 $$.**

**Discussion**

This elegant relationship shows that for the same device operating between the same two temperatures, the refrigerator COP is always exactly 1 less than the heat pump COP. This makes physical sense: both devices do the same work $$ W $$ and extract the same heat $$ Q_c $$ from the cold reservoir. However, the heat pump "benefits" from delivering $$ Q_h = Q_c + W $$ to the hot reservoir, while the refrigerator only "benefits" from removing $$ Q_c $$ from the cold reservoir. The difference between what each device delivers relative to the work input is exactly the work itself, hence the difference of 1 in their COPs.

For example, if a heat pump has $$ \text{COP}_{\text{hp}} = 5 $$, when operated as a refrigerator between the same temperatures it would have $$ \text{COP}_{\text{ref}} = 4 $$. This relationship is universal for any heat pump/refrigerator, whether ideal (Carnot) or real, as long as it operates between the same two reservoir temperatures in both modes.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

heat pump
: a machine that generates heat transfer from cold to hot

coefficient of performance
: for a heat pump, it is the ratio of heat transfer at the output (the hot
reservoir) to the work supplied; for a refrigerator or air conditioner, it is
the ratio of heat transfer from the cold reservoir to the work supplied

</div>
