---
title: DC Voltmeters and Ammeters
layout: page
sectionNumber: 4
chapterNumber: 21
---

<div class="abstract" markdown="1">
* Explain why a voltmeter must be connected in parallel with the circuit.
* Draw a diagram showing an ammeter correctly connected in a circuit.
* Describe how a galvanometer can be used as either a voltmeter or an ammeter.
* Find the resistance that must be placed in series with a galvanometer to allow it to be used as a voltmeter with a given reading.
* Explain why measuring the voltage or current in a circuit can never be exact.
</div>

**Voltmeters** measure voltage, whereas **ammeters**{: class="term"} measure
current. Some of the meters in automobile dashboards, digital cameras, cell
phones, and tuner-amplifiers are voltmeters or ammeters. (
See [[Figure 1]](#Figure1).) The internal construction of the simplest of these
meters and how they are connected to the system they monitor give further
insight into applications of series and parallel connections.

![This photograph shows the instruments on a gray Volkswagen Vento dashboard, including the speedometer, odometer, and fuel and temperature gauges, showing some readings.](../resources/Figure_21_04_01.jpg "The fuel and temperature gauges (far right and far left, respectively) in this 1996 Volkswagen are voltmeters that register the voltage output of &#x201C;sender&#x201D; units, which are hopefully proportional to the amount of gasoline in the tank and the engine temperature. (credit: Christian Giersing)")
{: #Figure1}

Voltmeters are connected in parallel with whatever device’s voltage is to be
measured. A parallel connection is used because objects in parallel experience
the same potential difference. (See [[Figure 2]](#Figure2), where the voltmeter
is represented by the symbol V.)

Ammeters are connected in series with whatever device’s current is to be
measured. A series connection is used because objects in series have the same
current passing through them. (See [[Figure 3]](#Figure3), where the ammeter is
represented by the symbol A.)

![Part a shows a schematic drawing of a circuit with a voltage source and its internal resistance, in series with two load resistors R sub one and R sub two having two probes of a voltmeter connected in parallel with each component. There is another resistor in series to close the circuit. Part b shows a photograph of a black voltmeter connected to two inputs on an electrical device, with a digital readout of the voltage across the source as an L E D display.](../resources/Figure_21_04_02.jpg "(a) To measure potential differences in this series circuit, the voltmeter (V) is placed in parallel with the voltage source or either of the resistors. Note that terminal voltage is measured between points a and b. It is not possible to connect the voltmeter directly across the emf without including its internal resistance, r. (b) A digital voltmeter in use. (credit: Messtechniker, Wikimedia Commons)")
{: #Figure2}

![The diagram of an electric circuit shows a voltage source of e m f script E and internal resistance r and two resistive loads R sub one and R sub two. All are connected in series with an ammeter A.](../resources/Figure_21_04_03.jpg "An ammeter (A) is placed in series to measure current. All of the current in this circuit flows through the meter. The ammeter would have the same reading if located between points d and e or between points f and a as it does in the position shown. (Note that the script capital E stands for emf, and r  stands for the internal resistance of the source of potential difference.)")
{: #Figure3}

### Analog Meters: Galvanometers

**Analog meters** have a needle that swivels to point at numbers on a scale, as
opposed to **digital meters**, which have numerical readouts similar to a
hand-held calculator. The heart of most analog meters is a device called a **galvanometer**, denoted by G. Current flow through a galvanometer, $${I}_
{\text{G}} $$ , produces a proportional needle deflection. (This deflection is
due to the force of a magnetic field upon a current-carrying wire.)

The two crucial characteristics of a given galvanometer are its resistance and
current sensitivity. **Current sensitivity** is the current that gives a **full-scale deflection** of the galvanometer’s needle, the maximum current that
the instrument can measure. For example, a galvanometer with a current
sensitivity of $$50 \text{μA} $$ has a maximum deflection of its needle when
$$50 \text{μA} $$ flows through it, reads half-scale when $$25 \mu A $$ flows
through it, and so on.

If such a galvanometer has a $$25-\Omega $$ resistance, then a voltage of only
$$V=IR=\left(50 \text{ μA}\right)\left(25 \text{Ω}\right)=1.25 \text{mV} $$
produces a full-scale reading. By connecting resistors to this galvanometer in
different ways, you can use it as either a voltmeter or ammeter that can measure
a broad range of voltages or currents.

#### Galvanometer as Voltmeter

[[Figure 4]](#Figure4) shows how a galvanometer can be used as a voltmeter by
connecting it in series with a large resistance, $$R $$ . The value of the
resistance $$R $$ is determined by the maximum voltage to be measured. Suppose
you want 10 V to produce a full-scale deflection of a voltmeter containing a
$$25 \text{-Ω} $$ galvanometer with a $$50 \text{-μA} $$ sensitivity. Then 10 V
applied to the meter must produce a current of $$50 \text{μA} $$ . The total
resistance must be

<div class="equation" >
 $${R}_{\text{tot}}=R+r=\frac{V}{I}=\frac{10 \text{V}}{50 \text{μA}}=200 \text{k}\Omega , or $$
</div>

<div class="equation" >
 $$R={R}_{\text{tot}}-r=200 \text{kΩ}-25 \Omega \approx 200 \text{k}\Omega . $$
</div>

( $$R $$ is so large that the galvanometer resistance, $$r $$ , is nearly
negligible.) Note that 5 V applied to this voltmeter produces a half-scale
deflection by producing a $$25 \text{-μA} $$ current through the meter, and so
the voltmeter’s reading is proportional to voltage as desired.

This voltmeter would not be useful for voltages less than about half a volt,
because the meter deflection would be small and difficult to read accurately.
For other voltage ranges, other resistances are placed in series with the
galvanometer. Many meters have a choice of scales. That choice involves
switching an appropriate resistance into series with the galvanometer.

![The drawing shows a voltmeter, which is a circuit with a large resistance in series with a galvanometer, along with its internal resistance.](../resources/Figure_21_04_04.jpg "A large resistance R placed in series with a galvanometer G produces a voltmeter, the full-scale deflection of which depends on the choice of \( R \) . The larger the voltage to be measured, the larger \( R \) must be. (Note that r  represents the internal resistance of the galvanometer.)")
{: #Figure4}

#### Galvanometer as Ammeter

The same galvanometer can also be made into an ammeter by placing it in parallel
with a small resistance $$R $$ , often called the **shunt resistance**, as shown
in [[Figure 5]](#Figure5). Since the shunt resistance is small, most of the
current passes through it, allowing an ammeter to measure currents much greater
than those producing a full-scale deflection of the galvanometer.

Suppose, for example, an ammeter is needed that gives a full-scale deflection
for 1.0 A, and contains the same $$25 \text{-}\Omega $$ galvanometer with its
$$50 \text{-μA} $$ sensitivity. Since $$R $$ and $$r $$ are in parallel, the
voltage across them is the same.

These $$IR $$ drops are $$IR={I}_{\text{G}}r $$ so that $$IR=\frac{ {I}_
{\text{G}}}{I}=\frac{R}{r} $$ . Solving for $$R $$ , and noting that $${I}_
{\text{G}} $$ is $$50 \text{μA} $$ and $$I $$ is 0.999950 A, we have

<div class="equation" >
 $$R=r\frac{ {I}_{\text{G}}}{I}=\left(25 \Omega \right)\frac{50 \text{μA}}{0.999950 \text{A}}= 1.25 \times 10^{-3}  \Omega . $$
</div>

![A resistance R is placed in parallel with a galvanometer G having an internal resistance r to produce an ammeter.](../resources/Figure_21_04_05.jpg "A small shunt resistance \( R \) placed in parallel with a galvanometer G produces an ammeter, the full-scale deflection of which depends on the choice of \( R \) . The larger the current to be measured, the smaller \( R \) must be. Most of the current (I) flowing through the meter is shunted through \( R \) to protect the galvanometer.  (Note that r  represents the internal resistance of the galvanometer.) Ammeters may also have multiple scales for greater flexibility in application. The various scales are achieved by switching various shunt resistances in parallel with the galvanometer&#x2014;the greater the maximum current to be measured, the smaller the shunt resistance must be.")
{: #Figure5}

### Taking Measurements Alters the Circuit

When you use a voltmeter or ammeter, you are connecting another resistor to an
existing circuit and, thus, altering the circuit. Ideally, voltmeters and
ammeters do not appreciably affect the circuit, but it is instructive to examine
the circumstances under which they do or do not interfere.

First, consider the voltmeter, which is always placed in parallel with the
device being measured. Very little current flows through the voltmeter if its
resistance is a few orders of magnitude greater than the device, and so the
circuit is not appreciably affected. (See [[Figure 6]](#Figure6)(a).) (A large
resistance in parallel with a small one has a combined resistance essentially
equal to the small one.) If, however, the voltmeter’s resistance is comparable
to that of the device being measured, then the two in parallel have a smaller
resistance, appreciably affecting the circuit. (See [[Figure 6]](#Figure6)(b).)
The voltage across the device is not the same as when the voltmeter is out of
the circuit.

![Part a shows a desired case in which the resistance of a voltmeter connected in parallel with a load resistor is essentially equivalent to the resistance of the load resistor along as long as the voltmeter&#x2019;s resistance is much greater than that of the load resistor. Part b shows the case when the voltmeter&#x2019;s resistance is approximately the same as that of the load resistor. This case should be avoided because the effective resistance is half that of the load resistor.](../resources/Figure_21_04_06.jpg "(a) A voltmeter having a resistance much larger than the device ( \(R_{\text{Voltmeter}} \gg R \) ) with which it is in parallel produces a parallel resistance essentially the same as the device and does not appreciably affect the circuit being measured. (b) Here the voltmeter has the same resistance as the device ( \(R_{\text{Voltmeter}} \approx R \) ), so that the parallel resistance is half of what it is when the voltmeter is not connected. This is an example of a significant alteration of the circuit and is to be avoided.")
{: #Figure6}

An ammeter is placed in series in the branch of the circuit being measured, so
that its resistance adds to that branch. Normally, the ammeter’s resistance is
very small compared with the resistances of the devices in the circuit, and so
the extra resistance is negligible. (See [[Figure 7]](#Figure7)(a).) However, if
very small load resistances are involved, or if the ammeter is not as low in
resistance as it should be, then the total series resistance is significantly
greater, and the current in the branch being measured is reduced. (
See [[Figure 7]](#Figure7)(b).)

A practical problem can occur if the ammeter is connected incorrectly. If it was
put in parallel with the resistor to measure the current in it, you could
possibly damage the meter; the low resistance of the ammeter would allow most of
the current in the circuit to go through the galvanometer, and this current
would be larger since the effective resistance is smaller.

![The figure shows two cases in which an ammeter is connected in series with a load resistor. Part a shows the desired case in which the resistance of the ammeter is much smaller than that of the load, and the total resistance is about the same as the load resistance. Part b shows the case to be avoided in which the ammeter has a resistance about the same as the load, and the total resistance is twice that of the load resistance.](../resources/Figure_21_04_07.jpg "(a) An ammeter normally has such a small resistance that the total series resistance in the branch being measured is not appreciably increased. The circuit is essentially unaltered compared with when the ammeter is absent. (b) Here the ammeter&#x2019;s resistance is the same as that of the branch, so that the total resistance is doubled and the current is half what it is without the ammeter. This significant alteration of the circuit is to be avoided.")
{: #Figure7}

One solution to the problem of voltmeters and ammeters interfering with the
circuits being measured is to use galvanometers with greater sensitivity. This
allows construction of voltmeters with greater resistance and ammeters with
smaller resistance than when less sensitive galvanometers are used.

There are practical limits to galvanometer sensitivity, but it is possible to
get analog meters that make measurements accurate to a few percent. Note that
the inaccuracy comes from altering the circuit, not from a fault in the meter.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Connections: Limits to Knowledge
</div>
Making a measurement alters the system being measured in a manner that produces uncertainty in the measurement. For macroscopic systems, such as the circuits discussed in this module, the alteration can usually be made negligibly small, but it cannot be eliminated entirely. For submicroscopic systems, such as atoms, nuclei, and smaller particles, measurement alters the system in a manner that cannot be made arbitrarily small. This actually limits knowledge of the system—even limiting what nature can know about itself. We shall see profound implications of this when the Heisenberg uncertainty principle is discussed in the modules on quantum mechanics.

There is another measurement technique based on drawing no current at all and,
hence, not altering the circuit at all. These are called null measurements and
are the topic of [Null Measurements](../contents/ch21NullMeasurements). Digital meters that
employ solid-state electronics and null measurements can attain accuracies of
one part in $$10^{6} $$.

</div>

<div class="exercise"  data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Digital meters are able to detect smaller currents than analog meters employing galvanometers. How does this explain their ability to measure voltage and current more accurately than analog meters?

</div>
<div class="solution" data-print-placement="here" markdown="1">
Since digital meters require less current than analog meters, they alter the circuit less than analog meters. Their resistance as a voltmeter can be far greater than an analog meter, and their resistance as an ammeter can be far less than an analog meter. Consult [[Figure 2]](#Figure2) and [[Figure 3]](#Figure3) and their discussion in the text.

</div>
</div>

<div class="note" data-has-label="true"  data-label="" markdown="1">
<div class="title">
PhET Explorations: Circuit Construction Kit (DC Only), Virtual Lab
</div>
Stimulate a neuron and monitor what happens. Pause, rewind, and move forward in time in order to observe the ions as they move across the neuron membrane.

<div class="media"  data-alt="circuit-construction">
<iframe width="660" height="371.4" src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html"></iframe>
</div>
</div>

### Section Summary

* Voltmeters measure voltage, and ammeters measure current.
* A voltmeter is placed in parallel with the voltage source to receive full
  voltage and must have a large resistance to limit its effect on the circuit.
* An ammeter is placed in series to get the full current flowing through a
  branch and must have a small resistance to limit its effect on the circuit.
* Both can be based on the combination of a resistor and a galvanometer, a
  device that gives an analog reading of current.
* Standard voltmeters and ammeters alter the circuit being measured and are thus
  limited in accuracy.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why should you not connect an ammeter directly across a voltage source as shown in [[Figure 8]](#Figure8)? (Note that script E in the figure stands for emf.)

![A circuit shows a connection of a cell of e m f script E and internal resistance r. Each terminal of the cell is connected to opposite ends of the ammeter. The circuit is closed.](../resources/Figure_21_04_08.jpg " ")
{: #Figure8}

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose you are using a multimeter (one designed to measure a range of voltages, currents, and resistances) to measure current in a circuit and you inadvertently leave it in a voltmeter mode. What effect will the meter have on the circuit? What would happen if you were measuring voltage but accidentally put the meter in the ammeter mode?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Specify the points to which you could connect a voltmeter to measure the following potential differences in [[Figure 9]](#Figure9): (a) the potential difference of the voltage source; (b) the potential difference across  $${R}_{1} $$ ;  (c) across  $${R}_{2} $$ ;  (d) across  $${R}_{3} $$ ;  (e) across  $${R}_{2} $$
 and  $${R}_{3} $$ .
 Note that there may be more than one answer to each part.

![This figure shows a circuit having a cell of e m f script E and internal resistance r connected in parallel to two arms, one arm containing resistor R sub one and a second arm containing a series of resistors R sub two and R sub three.](../resources/Figure_21_04_09.jpg " ")
{: #Figure9}

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
To measure currents in [[Figure 9]](#Figure9), you would replace a wire between two points with an ammeter. Specify the points between which you would place an ammeter to measure the following: (a) the total current; (b) the current flowing through  $${R}_{1} $$ ;  (c) through  $${R}_{2} $$ ;  (d) through  $${R}_{3} $$ .
 Note that there may be more than one answer to each part.

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the sensitivity of the galvanometer (that is, what current gives a full-scale deflection) inside a voltmeter that has a  $$ 1.00\text{-M}\Omega  $$
 resistance on its 30.0-V scale?

</div>
<div class="solution" markdown="1">
 $$30 \mu\text{A} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the sensitivity of the galvanometer (that is, what current gives a full-scale deflection) inside a voltmeter that has a  $$ 25.0\text{-k}\Omega  $$
 resistance on its 100-V scale?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the resistance that must be placed in series with a  $$ 25.0-\Omega  $$
 galvanometer having a  $$50.0-\mu A $$
 sensitivity (the same as the one discussed in the text) to allow it to be used as a voltmeter with a 0.100-V full-scale reading.

</div>
<div class="solution" markdown="1">
 $$1.98 \text{k}\Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the resistance that must be placed in series with a  $$ 25.0-\Omega  $$
 galvanometer having a  $$ 50.0-\mu A $$
 sensitivity (the same as the one discussed in the text) to allow it to be used as a voltmeter with a 3000-V full-scale reading. Include a circuit diagram with your solution.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the resistance that must be placed in parallel with a  $$ 25.0-\Omega  $$
 galvanometer having a  $$ 50.0-\mu A $$
 sensitivity (the same as the one discussed in the text) to allow it to be used as an ammeter with a 10.0-A full-scale reading. Include a circuit diagram with your solution.

</div>
<div class="solution">
<div class="equation" >
 $$ 1.25 \times 10^{-4}  \Omega  $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the resistance that must be placed in parallel with a  $$ 25.0-\Omega  $$
 galvanometer having a  $$ 50.0-\mu A $$
 sensitivity (the same as the one discussed in the text) to allow it to be used as an ammeter with a 300-mA full-scale reading.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the resistance that must be placed in series with a  $$ 10.0-\Omega  $$
 galvanometer having a  $$100 \text{-μA} $$
 sensitivity to allow it to be used as a voltmeter with: (a) a 300-V full-scale reading, and (b) a 0.300-V full-scale reading.

</div>
<div class="solution" markdown="1">
(a)  $$3.00 \text{M}\Omega  $$
(b)  $$2.99 \text{k}\Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the resistance that must be placed in parallel with a  $$ 10.0-\Omega  $$
 galvanometer having a  $$100 \text{-μA} $$
 sensitivity to allow it to be used as an ammeter with: (a) a 20.0-A full-scale reading, and (b) a 100-mA full-scale reading.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you measure the terminal voltage of a 1.585-V alkaline cell having an internal resistance of  $$ 0.100 \Omega  $$
 by placing a  $$ 1.00\text{-k}\Omega  $$
 voltmeter across its terminals. (See [[Figure 10]](#Figure10).) (a) What current flows? (b) Find the terminal voltage. (c) To see how close the measured terminal voltage is to the emf, calculate their ratio.

![The figure shows a circuit diagram that includes a battery with an internal resistance r and a voltmeter connected across its terminals. The current I is shown by an arrow pointing in a clockwise direction.](../resources/Figure_21_04_10.jpg " ")
{: #Figure10}

</div>
<div class="solution" markdown="1">
(a) 1.58 mA

(b) 1.5848 V (need four digits to see the difference)

(c) 0.99990 (need five digits to see the difference from unity)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you measure the terminal voltage of a 3.200-V lithium cell having an internal resistance of  $$ 5.00 \Omega  $$
 by placing a  $$ 1.00\text{-k}\Omega  $$
 voltmeter across its terminals. (a) What current flows? (b) Find the terminal voltage. (c) To see how close the measured terminal voltage is to the emf, calculate their ratio.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A certain ammeter has a resistance of  $$ 5.00 \times 10^{-5}  \Omega  $$
 on its 3.00-A scale and contains a  $$ 10.0-\Omega  $$
 galvanometer. What is the sensitivity of the galvanometer?

</div>
<div class="solution" markdown="1">
 $$ 15.0 \mu A $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A  $$ 1.00\text{-MΩ} $$
 voltmeter is placed in parallel with a  $$ 75.0\text{-k}\Omega  $$
 resistor in a circuit. (a) Draw a circuit diagram of the connection. (b) What is the resistance of the combination? (c) If the voltage across the combination is kept the same as it was across the  $$ 75.0\text{-k}\Omega  $$
 resistor alone, what is the percent increase in current? (d) If the current through the combination is kept the same as it was through the  $$ 75.0\text{-k}\Omega  $$
 resistor alone, what is the percentage decrease in voltage? (e) Are the changes found in parts (c) and (d) significant? Discuss.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A  $$0.0200\text{-Ω} $$
 ammeter is placed in series with a  $$10.00\text{-Ω} $$
 resistor in a circuit. (a) Draw a circuit diagram of the connection. (b) Calculate the resistance of the combination. (c) If the voltage is kept the same across the combination as it was through the  $$10.00\text{-Ω} $$
 resistor alone, what is the percent decrease in current? (d) If the current is kept the same through the combination as it was through the  $$10.00\text{-Ω} $$
 resistor alone, what is the percent increase in voltage? (e) Are the changes found in parts (c) and (d) significant? Discuss.

</div>
<div class="solution" markdown="1">
(a)

![The figure shows part of a circuit that includes an ammeter with internal resistance r connected in series with a load resistance R.](../resources/Figure_21_04_11.jpg " ")

(b)  $$ 10.02 \Omega $$
(c) 0.9980, or a $$2.0 \times 10^{-1} $$ percent decrease

(d) 1.002, or a $$2.0 \times 10^{-1} $$ percent increase

(e) Not significant.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

Suppose you have a $$ 40.0-\Omega $$ galvanometer with a $$ 25.0-\mu A $$
sensitivity. (a) What resistance would you put in series with it to allow it to
be used as a voltmeter that has a full-scale deflection for 0.500 mV? (b) What
is unreasonable about this result? (c) Which assumptions are responsible?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) What resistance would you put in parallel with a $$ 40.0-\Omega $$
galvanometer having a $$25.0-\mu A $$ sensitivity to allow it to be used as an
ammeter that has a full-scale deflection for $$ 10.0-\mu A $$ ?
(b) What is unreasonable about this result? (c) Which assumptions are
responsible?

</div>
<div class="solution" markdown="1">
(a)  $$- 66.7 \Omega  $$
(b) You can’t have negative resistance.

(c) It is unreasonable that $${I}_{G} $$ is greater than $${I}_{\text{tot}} $$
(see [[Figure 5]](#Figure5)). You cannot achieve a full-scale deflection using a
current less than the sensitivity of the galvanometer.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

voltmeter
: an instrument that measures voltage

ammeter
: an instrument that measures current

analog meter
: a measuring instrument that gives a readout in the form of a needle movement
over a marked gauge

digital meter
: a measuring instrument that gives a readout in a digital form

galvanometer
: an analog measuring device, denoted by G, that measures current flow using a
needle deflection caused by a magnetic field force acting upon a
current-carrying wire

current sensitivity
: the maximum current that a galvanometer can read

full-scale deflection
: the maximum deflection of a galvanometer needle, also known as current
sensitivity; a galvanometer with a full-scale deflection of $$50 \text{μA} $$
has a maximum deflection of its needle when $$50 \text{μA} $$ flows through it

shunt resistance
: a small resistance $$R $$ placed in parallel with a galvanometer G to produce
an ammeter; the larger the current to be measured, the smaller $$R $$ must be;
most of the current flowing through the meter is shunted through $$R $$ to
protect the galvanometer

</div>
