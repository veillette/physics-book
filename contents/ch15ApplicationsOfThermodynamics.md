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

![Photograph of various expensive refrigerators displayed in a home appliance store.](../resources/Figure_15_05_00.jpg "Almost every home contains a refrigerator. Most people don&#x2019;t realize they are also sharing their homes with a heat pump. (credit: Id1337x, Wikimedia Commons)")
{: #Figure1}

Heat pumps, air conditioners, and refrigerators utilize heat transfer from cold
to hot. They are heat engines run backward. We say backward, rather than
reverse, because except for Carnot engines, all heat engines, though they can be
run backward, cannot truly be reversed. Heat transfer occurs from a cold
reservoir $${Q}_{\text{c}} $$ and into a hot one. This requires work input $$W
$$ , which is also converted to heat transfer. Thus the heat transfer to the hot
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
4.82

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you have an ideal refrigerator that cools an environment at  $$- 20.0\text{ºC} $$
 and has heat transfer to another environment at  $$ 50.0\text{ºC} $$ .
 What is its coefficient of performance?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the best coefficient of performance possible for a hypothetical refrigerator that could make liquid nitrogen at  $$-200\text{ºC} $$
 and has heat transfer to the environment at  $$ 35.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
0.311

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In a very mild winter climate, a heat pump has heat transfer from an environment at  $$ 5.00\text{ºC} $$
 to one at  $$ 35.0\text{ºC} $$ .
 What is the best possible coefficient of performance for these temperatures? Explicitly show how you follow the steps
in the [Problem-Solving Strategies for Thermodynamics](#Note1).

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
(a) 4.61

(b)  $$ 1.66 \times 10^{8} \text{J} \text{or } 3.97 \times 10^{4} \text{kcal} $$
(c) To transfer $$ 1.66 \times 10^{8} \text{J} $$ , heat pump costs \$1.00,
natural gas costs \$1.34.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the best coefficient of performance for a refrigerator that cools an environment at  $$- 30.0\text{ºC} $$
 and has heat transfer to another environment at  $$ 45.0\text{ºC} $$ ?
 (b) How much work in joules must be done for a heat transfer of 4186 kJ from the cold environment? (c) What is the cost of doing this if the work costs 10.0 cents per  $$ 3.60 \times 10^{6}  \text{J} $$
 (a kilowatt-hour)? (d) How many kJ of heat transfer occurs into the warm environment? (e) Discuss what type of refrigerator might operate between these temperatures.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you want to operate an ideal refrigerator with a cold temperature of  $$- 10.0\text{ºC} $$ ,
 and you would like it to have a coefficient of performance of 7.00. What is the hot reservoir temperature for such a refrigerator?

</div>
<div class="solution" markdown="1">
 $$27.6 \text{ºC} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An ideal heat pump is being considered for use in heating an environment with a temperature of  $$ 22.0\text{ºC} $$ .
 What is the cold reservoir temperature if the pump is to have a coefficient of performance of 12.0?

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
(a)  $$ 1.44 \times 10^{7}  \text{J} $$
(b) 40 cents

(c) This cost seems quite realistic; it says that running an air conditioner all
day would cost \$9.59 (if it ran continuously).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the coefficients of performance of refrigerators and heat pumps are related by  $${\text{COP}}_{\text{ref}}={\text{COP}}_{\text{hp}}-1 $$.

Start with the definitions of the $$\text{COP} $$ s and the conservation of
energy relationship between $${Q}_{\text{h}} $$ , $${Q}_{\text{c}} $$ , and $$W
$$
*.*

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
