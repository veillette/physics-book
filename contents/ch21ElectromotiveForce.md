---
title: 'Electromotive Force: Terminal Voltage'
layout: page
sectionNumber: 2
chapterNumber: 21
---

<div class="abstract" markdown="1">
* Compare and contrast the voltage and the electromagnetic force of an electric power source.
* Describe what happens to the terminal voltage, current, and power delivered to a load as internal resistance of the voltage source increases (due to aging of batteries, for example).
* Explain why it is beneficial to use more than one voltage source connected in parallel.
</div>

When you forget to turn off your car lights, they slowly dim as the battery runs
down. Why don’t they simply blink off when the battery’s energy is gone? Their
gradual dimming implies that battery output voltage decreases as the battery is
depleted.

Furthermore, if you connect an excessive number of 12-V lights in parallel to a
car battery, they will be dim even when the battery is fresh and even if the
wires to the lights have very low resistance. This implies that the battery’s
output voltage is reduced by the overload.

The reason for the decrease in output voltage for depleted or overloaded
batteries is that all voltage sources have two fundamental parts—a source of
electrical energy and an **internal resistance**. Let us examine both.

### Electromotive Force

You can think of many different types of voltage sources. Batteries themselves
come in many varieties. There are many types of mechanical/electrical
generators, driven by many different energy sources, ranging from nuclear to
wind. Solar cells create voltages directly from light, while thermoelectric
devices create voltage from temperature differences.

A few voltage sources are shown in [[Figure 1]](#Figure1). All such devices
create a **potential difference** and can supply current if connected to a
resistance. On the small scale, the potential difference creates an electric
field that exerts force on charges, causing current. We thus use the name **electromotive force**, abbreviated emf.

Emf is not a force at all; it is a special type of potential difference. To be
precise, the electromotive force (emf) is the potential difference of a source
when no current is flowing. Units of emf are volts.

![A set of four photographs. The first one shows a row of tall windmills. The second shows water gushing out of the open shutters of a hydroelectric dam. The third shows a set of five batteries of different sizes that can supply voltage to electric circuits. The fourth photograph shows a solar farm.](../resources/Figure_21_02_01.jpg "A variety of voltage sources (clockwise from top left): the Brazos Wind Farm in Fluvanna, Texas (credit: Leaflet, Wikimedia Commons); the Krasnoyarsk Dam in Russia (credit: Alex Polezhaev); a solar farm (credit: U.S. Department of Energy); and a group of nickel metal hydride batteries (credit: Tiaa Monto). The voltage output of each depends on its construction and load, and equals emf only if there is no load.")
{: #Figure1}

Electromotive force is directly related to the source of potential difference,
such as the particular combination of chemicals in a battery. However, emf
differs from the voltage output of the device when current flows. The voltage
across the terminals of a battery, for example, is less than the emf when the
battery supplies current, and it declines further as the battery is depleted or
loaded down. However, if the device’s output voltage can be measured without
drawing current, then output voltage will equal emf (even for a very depleted
battery).

### Internal Resistance

As noted before, a 12-V truck battery is physically larger, contains more charge
and energy, and can deliver a larger current than a 12-V motorcycle battery.
Both are lead-acid batteries with identical emf, but, because of its size, the
truck battery has a smaller internal resistance $$r $$ . Internal resistance is
the inherent resistance to the flow of current within the source itself.

[[Figure 2]](#Figure2) is a schematic representation of the two fundamental
parts of any voltage source. The emf (represented by a script E in the figure)
and internal resistance $$r $$ are in series. The smaller the internal
resistance for a given emf, the more current and the more power the source can
supply.

![This diagram shows a battery with a schematic indicating the e m f, represented by script E, and the internal resistance r of the battery. The voltage output of the battery is measured between the input and output terminals and is equal to the e m f minus the product of the current and the internal resistance.](../resources/Figure_21_02_02.jpg "Any voltage source (in this case, a carbon-zinc dry cell) has an emf related to its source of potential difference, and an internal resistance \( r \) related to its construction. (Note that the script E stands for emf.). Also shown are the output terminals across which the terminal voltage \( V \) is measured. Since \( V= \text{emf} - I r \), terminal voltage equals emf only if there is no current flowing.")
{: #Figure2}

The internal resistance $$r $$ can behave in complex ways. As noted, $$r $$
increases as a battery is depleted. But internal resistance may also depend on
the magnitude and direction of the current through a voltage source, its
temperature, and even its history. The internal resistance of rechargeable
nickel-cadmium cells, for example, depends on how many times and how deeply they
have been depleted.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Things Great and Small: The Submicroscopic Origin of Battery Potential
</div>
Various types of batteries are available, with emfs determined by the combination of chemicals involved. We can view this as a molecular reaction (what much of chemistry is about) that separates charge.

The lead-acid battery used in cars and other vehicles is one of the most common
types. A single cell (one of six) of this battery is seen
in [[Figure 3]](#Figure3). The cathode (positive) terminal of the cell is
connected to a lead oxide plate, while the anode (negative) terminal is
connected to a lead plate. Both plates are immersed in sulfuric acid, the
electrolyte for the system.

![A simplified view of a battery shows a rectangular container of sulfuric acid with two thin upright metal plates immersed in it, one made of lead and the other made of lead oxide. Each plate projects above the liquid line, providing a positive or negative terminal above the battery. The positive terminal is labeled as the cathode, and the negative terminal is labeled as the anode.](../resources/Figure_21_02_03.jpg "Artist&#x2019;s conception of a lead-acid cell. Chemical reactions in a lead-acid cell separate charge, sending negative charge to the anode, which is connected to the lead plates. The lead oxide plates are connected to the positive or cathode terminal of the cell. Sulfuric acid conducts the charge as well as participating in the chemical reaction.")
{: #Figure3}

The details of the chemical reaction are left to the reader to pursue in a
chemistry text, but their results at the molecular level help explain the
potential created by the battery. [[Figure 4]](#Figure4) shows the result of a
single chemical reaction. Two electrons are placed on the anode, making it
negative, provided that the cathode supplied two electrons. This leaves the
cathode positively charged, because it has lost two electrons. In short, a
separation of charge has been driven by a chemical reaction.

Note that the reaction will not take place unless there is a complete circuit to
allow two electrons to be supplied to the cathode. Under many circumstances,
these electrons come from the anode, flow through a resistance, and return to
the cathode. Note also that since the chemical reactions involve substances with
resistance, it is not possible to create the emf without an internal resistance.

![The diagram shows a simplified view of a battery depicting a rectangular container containing two thin upright metal plates immersed in a liquid. An enlarged view of the metal plates is also shown. One plate has positive charges on it shown as small spheres enclosing a positive sign. The other plate has negative charge on it shown as small spheres enclosing an electron. The electrons are shown to move from the positive plate to the negative plate using arrows through a molecular reaction in the liquid.](../resources/Figure_21_02_04.jpg "Artist&#x2019;s conception of two electrons being forced onto the anode of a cell and two electrons being removed from the cathode of the cell. The chemical reaction in a lead-acid battery places two electrons on the anode and removes two from the cathode. It requires a closed circuit to proceed, since the two electrons must be supplied to the cathode.")
{: #Figure4}

</div>

Why are the chemicals able to produce a unique potential difference? Quantum
mechanical descriptions of molecules, which take into account the types of atoms
and numbers of electrons in them, are able to predict the energy states they can
have and the energies of reactions between them.

In the case of a lead-acid battery, an energy of 2 eV is given to each electron
sent to the anode. Voltage is defined as the electrical potential energy divided
by charge:  $$V=\frac{ {P}_{\text{E}}}{q} $$ . An electron volt is the energy
given to a single electron by a voltage of 1 V. So the voltage here is 2 V,
since 2 eV is given to each electron. It is the energy produced in each
molecular reaction that produces the voltage. A different reaction produces a
different energy and, hence, a different voltage.

### Terminal Voltage

The voltage output of a device is measured across its terminals and, thus, is
called its **terminal voltage** $$ V $$ . Terminal voltage is given by

<div class="equation" >
 $$V=\text{emf}-Ir, $$
</div>

where $$r $$ is the internal resistance and $$I $$ is the current flowing at the
time of the measurement.

$$I $$ is positive if current flows away from the positive terminal, as shown
in [[Figure 2]](#Figure2). You can see that the larger the current, the smaller
the terminal voltage. And it is likewise true that the larger the internal
resistance, the smaller the terminal voltage.

Suppose a load resistance $${R}_{\text{load}} $$ is connected to a voltage
source, as in [[Figure 5]](#Figure5). Since the resistances are in series, the
total resistance in the circuit is $${R}_{\text{load}}+r $$ . Thus the current
is given by Ohm’s law to be

<div class="equation" >
 $$I=\frac{\text{emf}}{ {R}_{\text{load}}+r}. $$
</div>

![This schematic drawing of an electrical circuit shows an e m f, labeled as script E, driving a current through a resistive load R sub load and through the internal resistance r of the voltage source. The current is shown flowing in a clockwise direction from the positive end of the source.](../resources/Figure_21_02_05.jpg "Schematic of a voltage source and its load \( R_\text{load} \). Since the internal resistance \( r \) is in series with the load, it can significantly affect the terminal voltage and current delivered to the load.  (Note that the script E stands for emf.)")
{: #Figure5}

We see from this expression that the smaller the internal resistance $$r $$ ,
the greater the current the voltage source supplies to its load $${R}_
{\text{load}} $$ . As batteries are depleted, $$r $$ increases. If $$r $$
becomes a significant fraction of the load resistance, then the current is
significantly reduced, as the following example illustrates.

<div class="example" markdown="1">
<div class="title">
Calculating Terminal Voltage, Power Dissipation, Current, and Resistance: Terminal Voltage and Load
</div>
A certain battery has a 12.0-V emf and an internal resistance of  $$ 0.100 \Omega  $$ .
 (a) Calculate its terminal voltage when connected to a  $$10.0 \text{-}\Omega  $$
 load. (b) What is the terminal voltage when connected to a  $$0.500\text{-}\Omega  $$
 load? (c) What power does the  $$0.500\text{-}\Omega  $$
 load dissipate? (d) If the internal resistance grows to  $$ 0.500 \Omega  $$ ,
 find the current, terminal voltage, and power dissipated by a  $$0.500\text{-}\Omega  $$
 load.

**Strategy**

The analysis above gave an expression for current when internal resistance is
taken into account. Once the current is found, the terminal voltage can be
calculated using the equation $$V=\text{emf}-Ir $$ . Once current is found, the
power dissipated by a resistor can also be found.

**Solution for (a)**

Entering the given values for the emf, load resistance, and internal resistance
into the expression above yields

<div class="equation" >
 $$I=\frac{\text{emf}}{ {R}_{\text{load}}+r}=\frac{ 12.0 \text{V}}{ 10.1  \Omega }= 1.188 \text{A}. $$
</div>
Enter the known values into the equation  $$V=\text{emf}-Ir $$
 to get the terminal voltage:

<div class="equation" >
 $$\begin{array}{lll}V& =& \text{emf}-Ir=12.0 \text{V}-\left(1.188 \text{A}\right)\left(0.100 \text{Ω}\right)\\ & =& 11.9 \text{V} \text{.} \end{array} $$
</div>
**Discussion for (a)**

The terminal voltage here is only slightly lower than the emf, implying that $$
10.0 \Omega $$ is a light load for this particular battery.

**Solution for (b)**

Similarly, with $${R}_{\text{load}}= 0.500 \Omega $$ , the current is

<div class="equation" >
 $$I=\frac{\text{emf}}{ {R}_{\text{load}}+r}=\frac{ 12.0 \text{V}}{ 0.600 \Omega }= 20.0 \text{A}. $$
</div>
The terminal voltage is now

<div class="equation" >
 $$\begin{array}{lll}V& =& \text{emf}-Ir=12.0 \text{V}-\left(20.0 \text{A}\right)\left(0.100 \text{Ω}\right)\\ & =& 10.0 \text{V} \text{.} \end{array} $$
</div>
**Discussion for (b)**

This terminal voltage exhibits a more significant reduction compared with emf,
implying $$ 0.500 \Omega $$ is a heavy load for this battery.

**Solution for (c)**

The power dissipated by the $$0.500 \text{- Ω} $$ load can be found using the
formula $$P={I}^{2}R $$ . Entering the known values gives

<div class="equation" >
 $${P}_{\text{load}}={I}^{2}{R}_{\text{load}}={\left(20.0 \text{A}\right)}^{2}\left(0.500\text{ Ω}\right)=2.00 \times 10^{2}  \text{W}. $$
</div>
**Discussion for (c)**

Note that this power can also be obtained using the expressions $$\frac{
{V}^{2}}{R} $$ or $$IV $$ , where $$V $$ is the terminal voltage (10.0 V in this
case).

**Solution for (d)**

Here the internal resistance has increased, perhaps due to the depletion of the
battery, to the point where it is as great as the load resistance. As before, we
first find the current by entering the known values into the expression,
yielding

<div class="equation" >
 $$I=\frac{\text{emf}}{ {R}_{\text{load}}+r}=\frac{ 12.0 \text{V}}{ 1.00 \Omega }= 12.0 \text{A}. $$
</div>
Now the terminal voltage is

<div class="equation" >
 $$\begin{array}{lll}V& =& \text{emf}-Ir=12.0 \text{V}-\left(12.0 \text{A}\right)\left(0.500 \text{Ω}\right)\\ & =& 6.00 \text{V} \text{,} \end{array} $$
</div>
and the power dissipated by the load is

<div class="equation" >
 $${P}_{\text{load}}={I}^{2}{R}_{\text{load}}={\left(12.0 \text{A}\right)}^{2}\left( 0.500 \Omega \right)= 72.0 \text{W}. $$
</div>
**Discussion for (d)**

We see that the increased internal resistance has significantly decreased
terminal voltage, current, and power delivered to a load.

</div>

Battery testers, such as those in [[Figure 6]](#Figure6), use small load
resistors to intentionally draw current to determine whether the terminal
voltage drops below an acceptable level. They really test the internal
resistance of the battery. If internal resistance is high, the battery is weak,
as evidenced by its low terminal voltage.

![The first photograph shows an avionics electronics technician working inside an aircraft carrier, measuring voltage of a battery with a voltmeter probe. The second photograph shows the small black battery tester which has an LED screen that indicates the terminal voltage of four batteries inserted into its case.](../resources/Figure_21_02_06.jpg "These two battery testers measure terminal voltage under a load to determine the condition of a battery. The large device is being used by a U.S. Navy electronics technician to test large batteries aboard the aircraft carrier USS Nimitz and has a small resistance that can dissipate large amounts of power. (credit: U.S. Navy photo by Photographer&#x2019;s Mate Airman Jason A. Johnston) The small device is used on small batteries and has a digital display to indicate the acceptability of their terminal voltage. (credit: Keith Williamson)")
{: #Figure6}

Some batteries can be recharged by passing a current through them in the
direction opposite to the current they supply to a resistance. This is done
routinely in cars and batteries for small electrical appliances and electronic
devices, and is represented pictorially in [[Figure 7]](#Figure7). The voltage
output of the battery charger must be greater than the emf of the battery to
reverse current through it. This will cause the terminal voltage of the battery
to be greater than the emf, since $$V=\text{emf}-Ir $$ , and $$I $$ is now
negative.

![The diagram shows a car battery being charged with cables from a battery charger. The current flows from the positive terminal of the charger to the positive terminal of the battery, through the battery and back out the negative terminal of the battery to the negative terminal of the charger.](../resources/Figure_21_02_07.jpg "A car battery charger reverses the normal direction of current through a battery, reversing its chemical reaction and replenishing its chemical potential.")
{: #Figure7}

### Multiple Voltage Sources

There are two voltage sources when a battery charger is used. Voltage sources
connected in series are relatively simple. When voltage sources are in series,
their internal resistances add and their emfs add algebraically. (
See [[Figure 8]](#Figure8).) Series connections of voltage sources are
common—for example, in flashlights, toys, and other appliances. Usually, the
cells are in series in order to produce a larger total emf.

But if the cells oppose one another, such as when one is put into an appliance
backward, the total emf is less, since it is the algebraic sum of the individual
emfs.

A battery is a multiple connection of voltaic cells, as shown
in [[Figure 9]](#Figure9). The disadvantage of series connections of cells is
that their internal resistances add. One of the authors once owned a 1957 MGA
that had two 6-V batteries in series, rather than a single 12-V battery. This
arrangement produced a large internal resistance that caused him many problems
in starting the engine.

![This diagram shows two typical batteries in series, with the positive terminal of the first touching the negative terminal of the second. The schematic diagram of the electric current flowing through them is shown as current I passing through the series of two cells of e m f script E sub one and internal resistance r sub one and e m f script E sub two and internal resistance r sub two.](../resources/Figure_21_02_08.jpg "A series connection of two voltage sources. The emfs (each labeled with a script E) and internal resistances add, giving a total emf of \( \text{emf}_1+\text{emf}_2 \) and a total internal resistance of \( r_1 +r_2 \).")
{: #Figure8}

![The left side of the diagram shows a battery that contains a combination of a large number of cells. The right side shows a set of cells combined in series to form a battery.](../resources/Figure_21_02_09.jpg "Batteries are multiple connections of individual cells, as shown in this modern rendition of an old print. Single cells, such as AA or C cells, are commonly called batteries, although this is technically incorrect.")
{: #Figure9}

If the *series* connection of two voltage sources is made into a complete
circuit with the emfs in opposition, then a current of magnitude
$$I=\frac{\left({\text{emf}}_{1}-{\text{emf}}_{2}\right)}{ {r}_{1}+ {r}_{2}} $$
flows. See [[Figure 10]](#Figure10), for example, which shows a circuit exactly
analogous to the battery charger discussed above. If two voltage sources in
series with emfs in the same sense are connected to a load $${R}_{\text{load}}
$$ , as in [[Figure 11]](#Figure11), then $$I=\frac{\left({\text{emf}}_{1}+
{\text{emf}}_{2}\right)}{ {r}_{1}+ {r}_{2}+{R}_{\text{load}}} $$ flows.

![The diagram shows a closed circuit containing series connection of two cells of e m f script E sub one and internal resistance r sub one and e m f script E sub two and internal resistance r sub two. The positive end of E sub one is connected to the positive end of E sub two.](../resources/Figure_21_02_10.jpg "These two voltage sources are connected in series with their emfs in opposition. Current flows in the direction of the greater emf and is limited to \( I=  ( \text{emf}_1 - \text{emf}_2 )/(r_1+r_2) \) by the sum of the internal resistances. (Note that each emf is represented by script E in the figure.) A battery charger connected to a battery is an example of such a connection. The charger must have a larger emf than the battery to reverse current through it.")
{: #Figure10}

![Part a shows a flashlight glowing when connected to two cells joined in series with the positive end of one cell connected to the negative end of the other. Part b shows the schematic circuit for part a. There is a series combination of two cells of e m f script E sub one and internal resistance r sub one and e m f script E sub two and internal resistance r sub two connected to a load resistor R sub load.](../resources/Figure_21_02_11.jpg "This schematic represents a flashlight with two cells (voltage sources) and a single bulb (load resistance) in series. The current that flows is \( I=  ( \text{emf}_1 + \text{emf}_2 )/(r_1+r_2 +R_\text{load}) \). (Note that each emf is represented by script E in the figure.)")
{: #Figure11}

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Take-Home Experiment: Flashlight Batteries
</div>
Find a flashlight that uses several batteries and find new and old batteries. Based on the discussions in this module, predict the brightness of the flashlight when different combinations of batteries are used. Do your predictions match what you observe? Now place new batteries in the flashlight and leave the flashlight switched on for several hours. Is the flashlight still quite bright? Do the same with the old batteries. Is the flashlight as bright when left on for the same length of time with old and new batteries? What does this say for the case when you are limited in the number of available new batteries?

</div>

[[Figure 12]](#Figure12) shows two voltage sources with identical emfs in
parallel and connected to a load resistance. In this simple case, the total emf
is the same as the individual emfs. But the total internal resistance is
reduced, since the internal resistances are in parallel. The parallel connection
thus can produce a larger current.

Here, $$I=\frac{\text{emf}}{\left({r}_{\text{tot}} + {R}_{\text{load}}\right)}
$$ flows through the load, and $${r}_{\text{tot}} $$ is less than those of the
individual batteries. For example, some diesel-powered cars use two 12-V
batteries in parallel; they produce a total emf of 12 V but can deliver the
larger current needed to start a diesel engine.

![Part a shows parallel combination of two cells of e m f script E and internal resistance r sub one and internal resistance r sub two connected to a load resistor R sub load. Part b shows the combination of e m f of part a. The circuit has a cell of e m f script E with an internal resistance r sub tot and a load resistor R sub load. The resistance r sub tot is less than either r sub one or r sub two.](../resources/Figure_21_02_12.jpg "Two voltage sources with identical emfs (each labeled by script E) connected in parallel produce the same emf but have a smaller total internal resistance than the individual sources. Parallel combinations are often used to deliver more current. Here \( I= \text{emf}/(r_\text{tot}+R_\text{load}) \) flows through the load.")
{: #Figure12}

### Animals as Electrical Detectors

A number of animals both produce and detect electrical signals. Fish, sharks,
platypuses, and echidnas (spiny anteaters) all detect electric fields generated
by nerve activity in prey. Electric eels produce their own emf through
biological cells (electric organs) called electroplaques, which are arranged in
both series and parallel as a set of batteries.

Electroplaques are flat, disk-like cells; those of the electric eel have a
voltage of 0.15 V across each one. These cells are usually located toward the
head or tail of the animal, although in the case of the electric eel, they are
found along the entire body. The electroplaques in the South American eel are
arranged in 140 rows, with each row stretching horizontally along the body and
containing 5 000 electroplaques. This can yield an emf of approximately 600 V,
and a current of 1 A—deadly.

The mechanism for detection of external electric fields is similar to that for
producing nerve signals in the cell through depolarization and
repolarization—the movement of ions across the cell membrane. Within the fish,
weak electric fields in the water produce a current in a gel-filled canal that
runs from the skin to sensing cells, producing a nerve signal. The Australian
platypus, one of the very few mammals that lay eggs, can detect fields of 30
$$\frac{\text{mV}}{m} $$ , while sharks have been found to be able to sense a
field in their snouts as small as 100 $$\frac{\text{mV}}{m} $$
([[Figure 13]](#Figure13)). Electric eels use their own electric fields produced
by the electroplaques to stun their prey or enemies.

![A photograph of a large gray tiger shark that swims along the bottom of a saltwater tank full of smaller fish at the Minnesota Zoo.](../resources/Figure_21_02_13.jpg "Sand tiger sharks (Carcharias taurus), like this one at the Minnesota Zoo, use electroreceptors in their snouts to locate prey. (credit: Jim Winstead, Flickr)")
{: #Figure13}

### Solar Cell Arrays

Another example dealing with multiple voltage sources is that of combinations of
solar cells—wired in both series and parallel combinations to yield a desired
voltage and current. Photovoltaic generation (PV), the conversion of sunlight
directly into electricity, is based upon the photoelectric effect, in which
photons hitting the surface of a solar cell create an electric current in the
cell.

Most solar cells are made from pure silicon—either as single-crystal silicon, or
as a thin film of silicon deposited upon a glass or metal backing. Most single
cells have a voltage output of about 0.5 V, while the current output is a
function of the amount of sunlight upon the cell (the incident solar
radiation—the insolation). Under bright noon sunlight, a current of about $$100
{\text{mA/cm}}^{2} $$ of cell surface area is produced by typical single-crystal
cells.

Individual solar cells are connected electrically in modules to meet
electrical-energy needs. They can be wired together in series or in
parallel—connected like the batteries discussed earlier. A solar-cell array or
module usually consists of between 36 and 72 cells, with a power output of 50 W
to 140 W.

The output of the solar cells is direct current. For most uses in a home, AC is
required, so a device called an inverter must be used to convert the DC to AC.
Any extra output can then be passed on to the outside electrical grid for sale
to the utility.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Take-Home Experiment: Virtual Solar Cells
</div>
One can assemble a “virtual” solar cell array by using playing cards, or business or index cards, to represent a solar cell. Combinations of these cards in series and/or parallel can model the required array output. Assume each card has an output of 0.5 V and a current (under bright light) of 2 A. Using your cards, how would you arrange them to produce an output of 6 A at 3 V (18 W)?

Suppose you were told that you needed only 18 W (but no required voltage). Would
you need more cards to make this arrangement?

</div>

### Section Summary

* All voltage sources have two fundamental parts—a source of electrical energy
  that has a characteristic electromotive force (emf), and an internal
  resistance $$r $$ .

* The emf is the potential difference of a source when no current is flowing.
* The numerical value of the emf depends on the source of potential difference.
* The internal resistance $$r $$ of a voltage source affects the output voltage
  when a current flows.
* The voltage output of a device is called its terminal voltage $$V $$ and is
  given by $$V=\text{emf}-Ir $$ , where $$I $$ is the electric current and is
  positive when flowing away from the positive terminal of the voltage source.
* When multiple voltage sources are in series, their internal resistances add
  and their emfs add algebraically.
* Solar cells can be wired in series or parallel to provide increased voltage or
  current, respectively.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Is every emf a potential difference? Is every potential difference an emf? Explain.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain which battery is doing the charging and which is being charged in [[Figure 14]](#Figure14).

</div>
</div>

![The diagram shows two cells of e m f script E sub one equals twelve volts and internal resistance r sub one equals one ohm, and e m f script E sub two equals eighteen volts and internal resistance r sub two equals zero point five ohms, connected. The cells are connected with their positive terminals facing each other in a closed circuit.](../resources/Figure_21_02_14.jpg " ")
{: #Figure14}

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Given a battery, an assortment of resistors, and a variety of voltage and current measuring devices, describe how you would determine the internal resistance of the battery.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Two different 12-V automobile batteries on a store shelf are rated at 600 and 850 “cold cranking amps.” Which has the smallest internal resistance?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What are the advantages and disadvantages of connecting batteries in series? In parallel?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Semitractor trucks use four large 12-V batteries. The starter system requires 24 V, while normal operation of the truck’s other electrical components utilizes 12 V. How could the four batteries be connected to produce 24 V? To produce 12 V? Why is 24 V better than 12 V for starting the truck’s engine (a very heavy load)?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Standard automobile batteries have six lead-acid cells in series, creating a total emf of 12.0 V. What is the emf of an individual lead-acid cell?

</div>
<div class="solution" markdown="1">
2.00 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Carbon-zinc dry cells (sometimes referred to as non-alkaline cells) have an emf of 1.54 V, and they are produced as single cells or in various combinations to form other voltages. (a) How many 1.54-V cells are needed to make the common 9-V battery used in many small electronic devices? (b) What is the actual emf of the approximately 9-V battery? (c) Discuss how internal resistance in the series connection of cells will affect the terminal voltage of this approximately 9-V battery.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the output voltage of a 3.0000-V lithium cell in a digital wristwatch that draws 0.300 mA, if the cell’s internal resistance is  $$ 2.00 \Omega  $$ ?

</div>
<div class="solution" markdown="1">
2.9994 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the terminal voltage of a large 1.54-V carbon-zinc dry cell used in a physics lab to supply 2.00 A to a circuit, if the cell’s internal resistance is  $$0.100 \text{Ω} $$ ?
 (b) How much electrical power does the cell produce? (c) What power goes to its load?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the internal resistance of an automobile battery that has an emf of 12.0 V and a terminal voltage of 15.0 V while a current of 8.00 A is charging it?

</div>
<div class="solution" markdown="1">
 $$ 0.375 \Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Find the terminal voltage of a 12.0-V motorcycle battery having a  $$0.600\text{-Ω} $$
 internal resistance, if it is being charged by a current of 10.0 A. (b) What is the output voltage of the battery charger?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A car battery with a 12-V emf and an internal resistance of  $$ 0.050 \Omega  $$
 is being charged with a current of 60 A. Note that in this process the battery is being charged. (a) What is the potential difference across its terminals? (b) At what rate is thermal energy being dissipated in the battery? (c) At what rate is electric energy being converted to chemical energy? (d) What are the answers to (a) and (b) when the battery is used to supply 60 A to the starter motor?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The hot resistance of a flashlight bulb is  $$ 2.30 \Omega  $$ ,
 and it is run by a 1.58-V alkaline cell having a  $$0.100\text{-Ω} $$
 internal resistance. (a) What current flows? (b) Calculate the power supplied to the bulb using  $${I}^{2}{R}_{\text{bulb}} $$ .
 (c) Is this power the same as calculated using  $$\frac{ {V}^{2}}{ {R}_{\text{bulb}}} $$ ?

</div>
<div class="solution" markdown="1">
(a) 0.658 A

(b) 0.997 W

(c) 0.997 W; yes

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The label on a portable radio recommends the use of rechargeable nickel-cadmium cells (nicads), although they have a 1.25-V emf while alkaline cells have a 1.58-V emf. The radio has a  $$3.20\text{-Ω} $$
 resistance. (a) Draw a circuit diagram of the radio and its batteries. Now, calculate the power delivered to the radio. (b) When using Nicad cells each having an internal resistance of  $$0.0400 \text{Ω} $$ .
 (c) When using alkaline cells each having an internal resistance of  $$0.200 \text{Ω} $$ .
 (d) Does this difference seem significant, considering that the radio’s effective resistance is lowered when its volume is turned up?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An automobile starter motor has an equivalent resistance of  $$ 0.0500 \Omega  $$
 and is supplied by a 12.0-V battery with a  $$0.0100\text{-Ω} $$
 internal resistance. (a) What is the current to the motor? (b) What voltage is applied to it? (c) What power is supplied to the motor? (d) Repeat these calculations for when the battery connections are corroded and add  $$ 0.0900 \Omega  $$
 to the circuit. (Significant problems are caused by even small amounts of unwanted resistance in low-voltage, high-current applications.)

</div>
<div class="solution" markdown="1">
(a) 200 A

(b) 10.0 V

(c) 2.00 kW

(d)  $$ 0.1000 \Omega ; 80.0 \text{A}, 4.0 \text{V}, 320 \text{W} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A child’s electronic toy is supplied by three 1.58-V alkaline cells having internal resistances of  $$ 0.0200 \Omega  $$
 in series with a 1.53-V carbon-zinc dry cell having a  $$0.100\text{-Ω} $$
 internal resistance. The load resistance is  $$ 10.0 \Omega  $$ .
 (a) Draw a circuit diagram of the toy and its batteries. (b) What current flows? (c) How much power is supplied to the load? (d) What is the internal resistance of the dry cell if it goes bad, resulting in only 0.500 W being supplied to the load?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the internal resistance of a voltage source if its terminal voltage drops by 2.00 V when the current supplied increases by 5.00 A? (b) Can the emf of the voltage source be found with the information supplied?

</div>
<div class="solution" markdown="1">
(a)  $$0.400 \text{Ω} $$
(b) No, there is only one independent equation, so only  $$r $$
 can be found.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A person with body resistance between his hands of  $$ 10.0 \text{k}\Omega  $$
 accidentally grasps the terminals of a 20.0-kV power supply. (Do NOT do this!) (a) Draw a circuit diagram to represent the situation. (b) If the internal resistance of the power supply is  $$2000 \Omega  $$ ,
 what is the current through his body? (c) What is the power dissipated in his body? (d) If the power supply is to be made safe by increasing its internal resistance, what should the internal resistance be for the maximum current in this situation to be 1.00 mA or less? (e) Will this modification compromise the effectiveness of the power supply for driving low-resistance devices? Explain your reasoning.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Electric fish generate current with biological cells called electroplaques, which are physiological emf devices. The electroplaques in the South American eel are arranged in 140 rows, each row stretching horizontally along the body and each containing 5000 electroplaques. Each electroplaque has an emf of 0.15 V and internal resistance of  $$ 0.25 \Omega  $$ .
 If the water surrounding the fish has resistance of  $$800 \Omega  $$ ,
 how much current can the eel produce in water from near its head to near its tail?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

A 12.0-V emf automobile battery has a terminal voltage of 16.0 V when being
charged by a current of 10.0 A. (a) What is the battery’s internal resistance? (
b) What power is dissipated inside the battery? (c) At what rate (in
$$\text{º}\text{C/min} $$ )
will its temperature increase if its mass is 20.0 kg and it has a specific heat
of $$ 0.300 \text{kcal/kg}\cdot\text{ºC} $$ , assuming no heat escapes?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

A 1.58-V alkaline cell with a $$0.200\text{-Ω} $$ internal resistance is
supplying 8.50 A to a load. (a) What is its terminal voltage? (b) What is the
value of the load resistance? (c) What is unreasonable about these results? (d)
Which assumptions are unreasonable or inconsistent?

</div>
<div class="solution" markdown="1">
(a) –0.120 V

(b)  $$ -1.41 \times 10^{-2} \Omega $$
(c) Negative terminal voltage; negative load resistance.

(d) The assumption that such a cell could provide 8.50 A is inconsistent with
its internal resistance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) What is the internal resistance of a 1.54-V dry cell that supplies 1.00 W of
power to a $$ 15.0-\Omega $$ bulb? (b) What is unreasonable about this result? (
c) Which assumptions are unreasonable or inconsistent?

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

electromotive force (emf)
: the potential difference of a source of electricity when no current is
flowing; measured in volts

internal resistance
: the amount of resistance within the voltage source

potential difference
: the difference in electric potential between two points in an electric
circuit, measured in volts

terminal voltage
: the voltage measured across the terminals of a source of potential difference

</div>
