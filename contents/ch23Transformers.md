---
title: Transformers
layout: page
sectionNumber: 7
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Explain how a transformer works.
* Calculate voltage, current, and/or number of turns given the other quantities.
</div>

**Transformers** do what their name implies—they transform voltages from one
value to another (The term voltage is used rather than emf, because transformers
have internal resistance). For example, many cell phones, laptops, video games,
and power tools and small appliances have a transformer built into their plug-in
unit (like that in [[Figure 1]](#Figure1)) that changes 120 V or 240 V AC into
whatever voltage the device uses. Transformers are also used at several points
in the power distribution systems, such as illustrated in [[Figure 2]](#Figure2)
. Power is sent long distances at high voltages, because less current is
required for a given amount of power, and this means less line loss, as was
discussed previously. But high voltages pose greater hazards, so that
transformers are employed to produce lower voltage at the user’s location.

![A photo graph of two plug in transformers operated on voltages other than common one hundred twenty volt AC.](../resources/Figure_23_07_01.jpg "The plug-in transformer has become increasingly familiar with the proliferation of electronic devices that operate on voltages other than common 120 V AC. Most are in the 3 to 12 V range. (credit: Shop Xtreme)")
{: #Figure1}

![The figure shows a transmission power system. It shows the various stages in a power transmission system from the power plant to the house hold with the help of images. The first image is of a power plant. The voltage generated is at twelve volts. This voltage is shown to pass on to a step up transformer through cables. From the step up transformer the current passes through a high voltage transmission line at four hundred kilo volt. The high voltage transmission line is shown passing on three towers. The current is then passed to a step down transformer substation. The current is step down to twelve volts. This is now passed through power transmission lines on poles. This current reaches a step down transformer which is fixed on a pole. Here the voltage is further stepped down to two hundred forty volts. Current is then supplied to an individual household at two hundred forty volts.](../resources/Figure_23_07_02.jpg "Transformers change voltages at several points in a power distribution system. Electric power is usually generated at greater than 10 kV, and transmitted long distances at voltages over 200 kV&#x2014;sometimes as great as 700 kV&#x2014;to limit energy losses. Local power distribution to neighborhoods or industries goes through a substation and is sent short distances at voltages ranging from 5 to 13 kV. This is reduced to 120, 240, or 480 V for safety at the individual user site.")
{: #Figure2}

The type of transformer considered in this text—see [[Figure 3]](#Figure3)—is
based on Faraday’s law of induction and is very similar in construction to the
apparatus Faraday used to demonstrate magnetic fields could cause currents. The
two coils are called the **primary** and **secondary coils**. In normal use, the
input voltage is placed on the primary, and the secondary produces the
transformed output voltage. Not only does the iron core trap the magnetic field
created by the primary coil, its magnetization increases the field strength.
Since the input voltage is AC, a time-varying magnetic flux is sent to the
secondary, inducing its AC output voltage.

![The figure shows a simple transformer with two coils wound on either sides of a laminated ferromagnetic core. The set of coil on left side of the core is marked as the primary and there number is given as N p. The voltage across the primary is given by V p. The set of coil on right side of the core is marked as the secondary and there number is represented as N s. The voltage across the secondary is given by V s. A symbol of the transformer is also shown below the diagram. It consists of two inductor coils separated by two equal parallel lines representing the core.](../resources/Figure_23_07_03.jpg "A typical construction of a simple transformer has two coils wound on a ferromagnetic core that is laminated to minimize eddy currents. The magnetic field created by the primary is mostly confined to and increased by the core, which transmits it to the secondary coil. Any change in current in the primary induces a current in the secondary.")
{: #Figure3}

For the simple transformer shown in [[Figure 3]](#Figure3), the output voltage
$${V}_{\text{s}} $$ depends almost entirely on the input voltage $${V}_
{\text{p}} $$ and the ratio of the number of loops in the primary and secondary
coils. Faraday’s law of induction for the secondary coil gives its induced
output voltage $${V}_{\text{s}} $$ to be

<div class="equation" >
 $${V}_{\text{s}}=-{N}_{\text{s}}\frac{\Delta \Phi }{\Delta t}\text{,} $$
</div>

where $${N}_{\text{s}} $$ is the number of loops in the secondary coil and
$$\Delta \Phi $$ / $$\Delta t $$ is the rate of change of magnetic flux. Note
that the output voltage equals the induced emf ( $${V}_{\text{s}}={\text{emf}}_
{\text{s}} $$ ), provided coil resistance is small (a reasonable assumption for
transformers). The cross-sectional area of the coils is the same on either side,
as is the magnetic field strength, and so $$\Delta \Phi /\Delta t $$ is the same
on either side. The input primary voltage $${V}_{\text{p}} $$ is also related to
changing flux by

<div class="equation" >
 $${V}_{p}=-{N}_{\text{p}}\frac{\Delta \Phi }{\Delta t}\text{.} $$
</div>

The reason for this is a little more subtle. Lenz’s law tells us that the
primary coil opposes the change in flux caused by the input voltage $${V}_
{\text{p}} $$ , hence the minus sign (This is an example of **self-inductance**,
a topic to be explored in some detail in later sections). Assuming negligible
coil resistance, Kirchhoff’s loop rule tells us that the induced emf exactly
equals the input voltage. Taking the ratio of these last two equations yields a
useful relationship:

<div class="equation" >
 $$\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {N}_{\text{s}}}{ {N}_{\text{p}}}\text{.} $$
</div>

This is known as the **transformer equation**, and it simply states that the
ratio of the secondary to primary voltages in a transformer equals the ratio of
the number of loops in their coils.

The output voltage of a transformer can be less than, greater than, or equal to
the input voltage, depending on the ratio of the number of loops in their coils.
Some transformers even provide a variable output by allowing connection to be
made at different points on the secondary coil. A **step-up transformer** is one
that increases voltage, whereas a **step-down transformer** decreases voltage.
Assuming, as we have, that resistance is negligible, the electrical power output
of a transformer equals its input. This is nearly true in practice—transformer
efficiency often exceeds 99%. Equating the power input and output,

<div class="equation" >
 $${P}_{\text{p}}={I}_{\text{p}}{V}_{\text{p}}={I}_{\text{s}}{V}_{\text{s}}={P}_{\text{s}}\text{.} $$
</div>

Rearranging terms gives

<div class="equation" >
 $$\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {I}_{\text{p}}}{ {I}_{\text{s}}}\text{.} $$
</div>

Combining this with $$\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {N}_
{\text{s}}}{ {N}_{\text{p}}} $$ , we find that

<div class="equation" >
 $$\frac{ {I}_{\text{s}}}{ {I}_{\text{p}}}=\frac{ {N}_{\text{p}}}{ {N}_{\text{s}}} $$
</div>

is the relationship between the output and input currents of a transformer. So
if voltage increases, current decreases. Conversely, if voltage decreases,
current increases.

<div class="example" markdown="1">
<div class="title">
Calculating Characteristics of a Step-Up Transformer
</div>
A portable x-ray unit has a step-up transformer, the 120 V input of which is transformed to the 100 kV output needed by the x-ray tube. The primary has 50 loops and draws a current of 10.00 A when in use. (a) What is the number of loops in the secondary? (b) Find the current output of the secondary.

**Strategy and Solution for (a)**

We solve $$\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {N}_{\text{s}}}{ {N}_
{\text{p}}} $$ for $${N}_{\text{s}} $$ , the number of loops in the secondary,
and enter the known values. This gives

<div class="equation" >
 $$\begin{array}{lll}{N}_{\text{s}}& =& {N}_{\text{p}}\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}\\ & =& \left(50\right)\frac{100 000\text{V}}{120 \text{V}}= 4.17 \times 10^{4} \text{.}\end{array} $$
</div>
**Discussion for (a)**

A large number of loops in the secondary (compared with the primary) is required
to produce such a large voltage. This would be true for neon sign transformers
and those supplying high voltage inside TVs and CRTs.

**Strategy and Solution for (b)**

We can similarly find the output current of the secondary by solving $$\frac{
{I}_{\text{s}}}{ {I}_{\text{p}}}=\frac{ {N}_{\text{p}}}{ {N}_{\text{s}}} $$ for
$${I}_{\text{s}} $$ and entering known values. This gives

<div class="equation" >
 $$\begin{array}{lll}{I}_{\text{s}}& =& {I}_{\text{p}}\frac{ {N}_{\text{p}}}{ {N}_{\text{s}}}\\ & =& \left(10.00 \text{A}\right) \frac{50}{ 4.17 \times 10^{4} } = 12.0 \text{mA}\text{.}\end{array} $$
</div>
**Discussion for (b)**

As expected, the current output is significantly less than the input. In certain
spectacular demonstrations, very large voltages are used to produce long arcs,
but they are relatively safe because the transformer output does not supply a
large current. Note that the power input here is $${P}_{\text{p}}={I}_
{\text{p}}{V}_{\text{p}}=\left( 10.00 \text{A}\right)\left(120 \text{V}\right)=
1.20 \text{kW} $$ . This equals the power output $${P}_{\text{p}}={I}_
{\text{s}}{V}_{\text{s}}=\left( 12.0 \text{mA}\right)\left(100 \text{kV}\right)=
1.20 \text{kW} $$ , as we assumed in the derivation of the equations used.

</div>

The fact that transformers are based on Faraday’s law of induction makes it
clear why we cannot use transformers to change DC voltages. If there is no
change in primary voltage, there is no voltage induced in the secondary. One
possibility is to connect DC to the primary coil through a switch. As the switch
is opened and closed, the secondary produces a voltage like that
in [[Figure 4]](#Figure4). This is not really a practical alternative, and AC is in
common use wherever it is necessary to increase or decrease voltages.

![The first part of the figure shows a graph of DC voltage input. The graph shows a variation of voltage V p along the Y axis and time t along the X axis. The wave is a pulsed wave nearly square in nature with the vibrations only in positive half cycle. The negative half cycles are not present in the wave. The second part of the figure shows a spike wave graph. The graph shows a variation of voltage V s along the Y axis and time t along the X axis. The wave has both positive and negative half cycles shown as sharp spikes of uniform amplitude.](../resources/Figure_23_07_04.jpg "Transformers do not work for pure DC voltage input, but if it is switched on and off as on the top graph, the output will look something like that on the bottom graph. This is not the sinusoidal AC most AC appliances need.")
{: #Figure4 height="300"}

<div class="example" markdown="1">
<div class="title">
Calculating Characteristics of a Step-Down Transformer
</div>
A battery charger meant for a series connection of ten nickel-cadmium batteries (total emf of 12.5 V DC) needs to have a 15.0 V output to charge the batteries. It uses a step-down transformer with a 200-loop primary and a 120 V input. (a) How many loops should there be in the secondary coil? (b) If the charging current is 16.0 A, what is the input current?

**Strategy and Solution for (a)**

You would expect the secondary to have a small number of loops. Solving $$\frac{
{V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {N}_{\text{s}}}{ {N}_{\text{p}}} $$ for
$${N}_{\text{s}} $$ and entering known values gives

<div class="equation" >
 $$\begin{array}{lll}{N}_{\text{s}}& =& {N}_{\text{p}}\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}\\ & =& \left(200\right)\frac{15.0 \text{V}}{120 \text{V}}=25 \text{.}\end{array} $$
</div>
**Strategy and Solution for (b)**

The current input can be obtained by solving $$\frac{ {I}_{\text{s}}}{ {I}_
{\text{p}}}=\frac{ {N}_{\text{p}}}{ {N}_{\text{s}}} $$ for $${I}_{\text{p}} $$
and entering known values. This gives

<div class="equation" >
 $$\begin{array}{lll}{I}_{\text{p}}& =& {I}_{\text{s}}\frac{ {N}_{\text{s}}}{ {N}_{\text{p}}}\\ & =& \left(16.0 \text{A}\right)\frac{25}{200}=2.00 \text{A}\text{.}\end{array} $$
</div>
**Discussion**

The number of loops in the secondary is small, as expected for a step-down
transformer. We also see that a small input current produces a larger output
current in a step-down transformer. When transformers are used to operate large
magnets, they sometimes have a small number of very heavy loops in the
secondary. This allows the secondary to have low internal resistance and produce
large currents. Note again that this solution is based on the assumption of 100%
efficiency—or power out equals power in ( $${P}_{\text{p}}={P}_{\text{s}} $$ )
—reasonable for good transformers. In this case the primary and secondary power
is 240 W. (Verify this for yourself as a consistency check.) Note that the Ni-Cd
batteries need to be charged from a DC power source (as would a 12 V battery).
So the AC output of the secondary coil needs to be converted into DC. This is
done using something called a rectifier, which uses devices called diodes that
allow only a one-way flow of current.

</div>

Transformers have many applications in electrical safety systems, which are
discussed
in [Electrical Safety: Systems and Devices](../contents/ch23ElectricalSafetySystemsAndDevices)
.

<div class="note" data-has-label="true"  class="interactive" data-label="" markdown="1">
<div class="title">
PhET Explorations: Generator
</div>
Generate electricity with a bar magnet! Discover the physics behind the phenomena by exploring magnets and how you can use them to make a bulb light.

<div class="media" id="PhET_module" data-alt="Generator">
<iframe width="660" height="371.4" src="https://veillette.github.io/simulations/generator/#sim-generator"></iframe>
</div>
</div>

### Section Summary

* Transformers use induction to transform voltages from one value to another.
* For a transformer, the voltages across the primary and secondary coils are
  related by

  <div class="equation" >
   $$\frac{ {V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {N}_{\text{s}}}{ {N}_{\text{p}}}\text{,} $$
  </div>
     where
   $${V}_{\text{p}} $$ and
   $${V}_{\text{s}} $$ are the voltages across primary and secondary coils having
   $${N}_{\text{p}} $$ and
   $${N}_{\text{s}} $$ turns.
* The currents $${I}_{\text{p}} $$ and $${I}_{\text{s}} $$ in the primary and
  secondary coils are related by $$\frac{ {I}_{\text{s}}}{ {I}_
  {\text{p}}}=\frac{ {N}_{\text{p}}}{ {N}_{\text{s}}} $$ .

* A step-up transformer increases voltage and decreases current, whereas a
  step-down transformer decreases voltage and increases current.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain what causes physical vibrations in transformers at twice the frequency of the AC power involved.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A plug-in transformer, like that in [[Figure 4]](#Figure4), supplies 9.00 V to a video game system. (a) How many turns are in its secondary coil, if its input voltage is 120 V and the primary coil has 400 turns? (b) What is its input current when its output is 1.30 A?

</div>
<div class="solution" markdown="1">
(a) 30.0

(b)  $$ 9.75 \times 10^{-2} \text{A} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An American traveler in New Zealand carries a transformer to convert New Zealand’s standard 240 V to 120 V so that she can use some small appliances on her trip. (a) What is the ratio of turns in the primary and secondary coils of her transformer? (b) What is the ratio of input to output current? (c) How could a New Zealander traveling in the United States use this same transformer to power her 240 V appliances from 120 V?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A cassette recorder uses a plug-in transformer to convert 120 V to 12.0 V, with a maximum current output of 200 mA. (a) What is the current input? (b) What is the power input? (c) Is this amount of power reasonable for a small appliance?

</div>
<div class="solution" markdown="1">
(a) 20.0 mA

(b) 2.40 W

(c) Yes, this amount of power is quite reasonable for a small appliance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the voltage output of a transformer used for rechargeable flashlight batteries, if its primary has 500 turns, its secondary 4 turns, and the input voltage is 120 V? (b) What input current is required to produce a 4.00 A output? (c) What is the power input?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) The plug-in transformer for a laptop computer puts out 7.50 V and can supply a maximum current of 2.00 A. What is the maximum input current if the input voltage is 240 V? Assume 100% efficiency. (b) If the actual efficiency is less than 100%, would the input current need to be greater or smaller? Explain.

</div>
<div class="solution" markdown="1">
(a) 0.063 A

(b) Greater input current needed.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A multipurpose transformer has a secondary coil with several points at which a voltage can be extracted, giving outputs of 5.60, 12.0, and 480 V. (a) The input voltage is 240 V to a primary coil of 280 turns. What are the numbers of turns in the parts of the secondary used to produce the output voltages? (b) If the maximum input current is 5.00 A, what are the maximum output currents (each used alone)?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A large power plant generates electricity at 12.0 kV. Its old transformer once converted the voltage to 335 kV. The secondary of this transformer is being replaced so that its output can be 750 kV for more efficient cross-country transmission on upgraded transmission lines. (a) What is the ratio of turns in the new secondary compared with the old secondary? (b) What is the ratio of new current output to old output (at 335 kV) for the same power? (c) If the upgraded transmission lines have the same resistance, what is the ratio of new line power loss to old?

</div>
<div class="solution" markdown="1">
(a) 2.2

(b) 0.45

(c) 0.20, or 20.0%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If the power output in the previous problem is 1000 MW and line resistance is  $$2.00 \Omega  $$ ,
 what were the old and new line losses?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

The 335 kV AC electricity from a power transmission line is fed into the primary
coil of a transformer. The ratio of the number of turns in the secondary to the
number in the primary is $${N}_{\text{s}}/{N}_{\text{p}}=1000 $$ .
(a) What voltage is induced in the secondary? (b) What is unreasonable about
this result? (c) Which assumption or premise is responsible?

</div>
<div class="solution" markdown="1">
(a) 335 MV

(b) way too high, well beyond the breakdown voltage of air over reasonable
distances

(c) input voltage is too high

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider a double transformer to be used to create very large voltages. The
device consists of two stages. The first is a transformer that produces a much
larger output voltage than its input. The output of the first transformer is
used as input to a second transformer that further increases the voltage.
Construct a problem in which you calculate the output voltage of the final stage
based on the input voltage of the first stage and the number of turns or loops
in both parts of both transformers (four coils in all). Also calculate the
maximum output current of the final stage based on the input current. Discuss
the possibility of power losses in the devices and the effect on the output
current and power.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

transformer
: a device that transforms voltages from one value to another using induction

transformer equation
: the equation showing that the ratio of the secondary to primary voltages in a
transformer equals the ratio of the number of loops in their coils; $$\frac{
{V}_{\text{s}}}{ {V}_{\text{p}}}=\frac{ {N}_{\text{s}}}{ {N}_{\text{p}}} $$

step-up transformer
: a transformer that increases voltage

step-down transformer
: a transformer that decreases voltage

</div>
