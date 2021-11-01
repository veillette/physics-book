---
title: "Ohm’s Law: Resistance and Simple Circuits"
layout: page
---

<div class="abstract" markdown="1">
* Explain the origin of Ohm’s law.
* Calculate voltages, currents, or resistances with Ohm’s law.
* Explain what an ohmic material is.
* Describe a simple circuit.
</div>

What drives current? We can think of various devices—such as batteries,
generators, wall outlets, and so on—which are necessary to maintain a current.
All such devices create a potential difference and are loosely referred to as
voltage sources. When a voltage source is connected to a conductor, it applies a
potential difference $$V $$ that creates an electric field. The electric field
in turn exerts force on charges, causing current.

### Ohm’s Law

The current that flows through most substances is directly proportional to the
voltage $$V $$ applied to it. The German physicist Georg Simon Ohm (1787–1854)
was the first to demonstrate experimentally that the current in a metal wire
is *directly proportional to the voltage applied*\:

<div class="equation" >
 $$I\propto V\text{.} $$
</div>

This important relationship is known as **Ohm’s law**. It can be viewed as a
cause-and-effect relationship, with voltage the cause and current the effect.
This is an empirical law like that for friction—an experimentally observed
phenomenon. Such a linear relationship doesn’t always occur.

### Resistance and Simple Circuits

If voltage drives current, what impedes it? The electric property that impedes
current (crudely similar to friction and air resistance) is called **
resistance**  $$R $$ . Collisions of moving charges with atoms and molecules in
a substance transfer energy to the substance and limit current. Resistance is
defined as inversely proportional to current, or

<div class="equation" >
 $$I\propto \frac{1}{R}\text{.} $$
</div>

Thus, for example, current is cut in half if resistance doubles. Combining the
relationships of current to voltage and current to resistance gives

<div class="equation" >
 $$I=\frac{V}{R}\text{.} $$
</div>

This relationship is also called Ohm’s law. Ohm’s law in this form really
defines resistance for certain materials. Ohm’s law (like Hooke’s law) is not
universally valid. The many substances for which Ohm’s law holds are called **
ohmic**{: class="term"}. These include good conductors like copper and aluminum,
and some poor conductors under certain circumstances. Ohmic materials have a
resistance $$R $$ that is independent of voltage $$V $$ and current $$I $$ . An
object that has simple resistance is called a **resistor**, even if its
resistance is small. The unit for resistance is an **ohm** and is given the
symbol $$\Omega $$
(upper case Greek omega). Rearranging $$I=V/R $$ gives $$R=\text{V/I} $$ , and
so the units of resistance are 1 ohm = 1 volt per ampere:

<div class="equation" >
 $$1 \text{Ω}=1\frac{V}{A}\text{.} $$
</div>

[[Figure 1]](#Figure1) shows the schematic for a simple circuit. A **simple
circuit** has a single voltage source and a single resistor. The wires
connecting the voltage source to the resistor can be assumed to have negligible
resistance, or their resistance can be included in $$R $$.

![The figure describes a simple electric circuit with a battery connected to a resistance R. The direction of current is shown to emerge from the positive terminal of a battery of voltage V, pass through the resistor, and enter the negative terminal of the battery. The current I in the circuit is V divided by R, moving in a clockwise direction.](../resources/Figure_21_02_01a.jpg "A simple electric circuit in which a closed path for current to flow is supplied by conductors (usually metal wires) connecting a load to the terminals of a battery, represented by the red parallel lines. The zigzag symbol represents the single resistor and includes any resistance in the connections to the voltage source.")
{: #Figure1}

<div class="example" markdown="1">
<div class="title">
Calculating Resistance: An Automobile Headlight
</div>
What is the resistance of an automobile headlight through which 2.50 A flows when 12.0 V is applied to it?

**Strategy**

We can rearrange Ohm’s law as stated by $$I=V/R $$ and use it to find the
resistance.

**Solution**

Rearranging $$I=V/R $$ and substituting known values gives

<div class="equation" >
 $$R=\frac{V}{I}=\frac{12.0 \text{V}}{2.50 \text{A}}=4.80 \text{Ω}\text{.} $$
</div>
**Discussion**

This is a relatively small resistance, but it is larger than the cold resistance
of the headlight. As we shall see in [Resistance and Resistivity](/ch20ResistanceAndResistivity),
resistance usually increases with temperature, and so the bulb has a lower
resistance when it is first switched on and will draw considerably more current
during its brief warm-up period.

</div>

Resistances range over many orders of magnitude. Some ceramic insulators, such
as those used to support power lines, have resistances of $$10^{12} \Omega $$ or
more. A dry person may have a hand-to-foot resistance of $$10^{5} \Omega $$ ,
whereas the resistance of the human heart is about $$10^{3} \Omega $$ . A
meter-long piece of large-diameter copper wire may have a resistance of
$$10^{-5} \Omega $$ , and superconductors have no resistance at all (they are
non-ohmic). Resistance is related to the shape of an object and the material of
which it is composed, as will be seen in [Resistance and Resistivity](/ch20ResistanceAndResistivity).

Additional insight is gained by solving $$I=V/R $$ for $$V, $$ yielding

<div class="equation" >
 $$V=I R. $$
</div>

This expression for $$V $$ can be interpreted as the <em>voltage drop across a
resistor produced by the flow of current </em> $$I $$ . The phrase $$IR $$
**drop** is often used for this voltage. For instance, the headlight
in [[link]](#fs-id3120142) has an $$IR $$ drop of 12.0 V. If voltage is measured
at various points in a circuit, it will be seen to increase at the voltage
source and decrease at the resistor. Voltage is similar to fluid pressure. The
voltage source is like a pump, creating a pressure difference, causing
current—the flow of charge. The resistor is like a pipe that reduces pressure
and limits flow because of its resistance. Conservation of energy has important
consequences here. The voltage source supplies energy (causing an electric field
and a current), and the resistor converts it to another form (such as thermal
energy). In a simple circuit (one with a single simple resistor), the voltage
supplied by the source equals the voltage drop across the resistor, since
$$\text{PE}=q\Delta V $$ , and the same $$q $$ flows through each. Thus the
energy supplied by the voltage source and the energy converted by the resistor
are equal. (See [[Figure 2]](#Figure2).)

![The figure shows a simple electric circuit. A battery is connected to a resistor with resistance R, and a voltmeter is connected across the resistor. The direction of current is shown to emerge from the positive terminal of the battery of voltage V, pass through the resistor, and enter the negative terminal of the battery, in a clockwise direction. The voltage V in the circuit equals I R, which equals 18 volts.](../resources/Figure_21_02_02a.jpg "The voltage drop across a resistor in a simple circuit equals the voltage output of the battery.")
{: #Figure2}

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Conservation of Energy
</div>
In a simple electrical circuit, the sole resistor converts energy supplied by the source into another form. Conservation of energy is evidenced here by the fact that all of the energy supplied by the source is converted to another form by the resistor alone. We will find that conservation of energy has other important applications in circuits and is a powerful tool in circuit analysis.

</div>

<div class="note" data-has-label="true"  class="interactive" data-label="" markdown="1">
<div class="title">
PhET Explorations: Ohm's Law
</div>
See how the equation form of Ohm\'s law relates to a simple circuit. Adjust the voltage and resistance, and see the current change according to Ohm\'s law. The sizes of the symbols in the equation change to match the circuit diagram.* * *
{: class="newline"}

<div class="media"  data-alt="ohm's law">
<iframe width="660" height="371.4" src="https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html"></iframe>
</div>
</div>

### Section Summary

* A simple circuit *is* one in which there is a single voltage source and a
  single resistance.
* One statement of Ohm’s law gives the relationship between current $$I $$ ,
  voltage $$V $$ , and resistance $$R $$ in a simple circuit to be
  $$I=\frac{V}{R}. $$
* Resistance has units of ohms (
  $$\text{Ω} $$ )  , related to volts and amperes by $$1 \Omega =1 \text{V/A} $$
  .

* There is a voltage or $$IR $$ drop across a resistor, caused by the current
  flowing through it, given by $$V=IR $$ .

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The  $$IR $$
 drop across a resistor means that there is a change in potential or voltage across the resistor. Is there any change in current as it passes through a resistor? Explain.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
How is the  $$IR $$
 drop in a resistor similar to the pressure drop in a fluid flowing through a pipe?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What current flows through the bulb of a 3.00-V flashlight when its hot resistance is  $$3.60 \text{Ω} $$ ?

</div>
<div class="solution" markdown="1">
0\.833 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the effective resistance of a pocket calculator that has a 1.35-V battery and through which 0.200 mA flows.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the effective resistance of a car’s starter motor when 150 A flows through it as the car battery applies 11.0 V to the motor?

</div>
<div class="solution" markdown="1">
 $$ 7.33 \times 10^{-2}  \Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How many volts are supplied to operate an indicator light on a DVD player that has a resistance of  $$140 \Omega  $$ ,
 given that 25.0 mA passes through it?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Find the voltage drop in an extension cord having a  $$0.0600\text{-}\Omega  $$
 resistance and through which 5.00 A is flowing. (b) A cheaper cord utilizes thinner wire and has a resistance of  $$0.300 \Omega  $$ .
 What is the voltage drop in it when 5.00 A flows? (c) Why is the voltage to whatever appliance is being used reduced by this amount? What is the effect on the appliance?

</div>
<div class="solution" markdown="1">
(a) 0.300 V

(b) 1.50 V

(c) The voltage supplied to whatever appliance is being used is reduced because
the total voltage drop from the wall to the final output of the appliance is
fixed. Thus, if the voltage drop across the extension cord is large, the voltage
drop across the appliance is significantly decreased, so the power output by the
appliance can be significantly decreased, reducing the ability of the appliance
to work properly.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A power transmission line is hung from metal towers with glass insulators having a resistance of  $$ 1.00 \times 10^{9}  \Omega . $$
 What current flows through the insulator if the voltage is 200 kV? (Some high-voltage lines are DC.)

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

Ohm’s law
: an empirical relation stating that the current *I* is proportional to the
potential difference *V*, *∝ V*; it is often written as *I = V/R*, where *R* is
the resistance

resistance
: the electric property that impedes current; for ohmic materials, it is the
ratio of voltage to current, *R = V/I*

ohm
: the unit of resistance, given by 1Ω = 1 V/A

ohmic
: a type of a material for which Ohm\'s law is valid

simple circuit
: a circuit with a single voltage source and a single resistor 

</div>
