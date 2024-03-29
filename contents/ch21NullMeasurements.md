---
title: Null Measurements
layout: page
sectionNumber: 5
chapterNumber: 21
---

<div class="abstract" markdown="1">
* Explain why a null measurement device is more accurate than a standard voltmeter or ammeter.
* Demonstrate how a Wheatstone bridge can be used to accurately calculate the resistance in a circuit.
</div>

Standard measurements of voltage and current alter the circuit being measured,
introducing uncertainties in the measurements. Voltmeters draw some extra
current, whereas ammeters reduce current flow. **Null measurements** balance
voltages so that there is no current flowing through the measuring device and,
therefore, no alteration of the circuit being measured.

Null measurements are generally more accurate but are also more complex than the
use of standard voltmeters and ammeters, and they still have limits to their
precision. In this module, we shall consider a few specific types of null
measurements, because they are common and interesting, and they further
illuminate principles of electric circuits.

### The Potentiometer

Suppose you wish to measure the emf of a battery. Consider what happens if you
connect the battery directly to a standard voltmeter as shown
in [[Figure 1]](#Figure1). (Once we note the problems with this measurement, we
will examine a null measurement that improves accuracy.) As discussed before,
the actual quantity measured is the terminal voltage $$V $$ , which is related
to the emf of the battery by $$V=\text{emf}-Ir $$ , where $$I $$ is the current
that flows and $$r $$ is the internal resistance of the battery.

The emf could be accurately calculated if $$r $$ were very accurately known, but
it is usually not. If the current $$I $$ could be made zero, then $$V=\text{emf}
$$ , and so emf could be directly measured. However, standard voltmeters need a
current to operate; thus, another technique is needed.

![The diagram shows equivalence between two circuits. The first circuit has a cell of e m f script E and an internal resistance r connected across a voltmeter. The equivalent circuit on the right shows the same cell of e m f script E and an internal resistance r connected across a series combination of a galvanometer with an internal resistance r sub G and high resistance R. The currents in the two circuits are shown to be equal.](../resources/Figure_21_05_01.jpg "An analog voltmeter attached to a battery draws a small but nonzero current and measures a terminal voltage that differs from the emf of the battery. (Note that the script capital E symbolizes electromotive force, or emf.) Since the internal resistance of the battery is not known precisely, it is not possible to calculate the emf precisely.")
{: #Figure1}

A **potentiometer** is a null measurement device for measuring potentials (
voltages). (See [[Figure 2]](#Figure2).) A voltage source is connected to a
resistor $$R, $$ say, a long wire, and passes a constant current through it.
There is a steady drop in potential (an $$IR $$ drop) along the wire, so that a
variable potential can be obtained by making contact at varying locations along
the wire.

[[Figure 2]](#Figure2)(b) shows an unknown $${\text{emf}}_{x} $$
(represented by script $${E}_{x} $$ in the figure) connected in series with a
galvanometer. Note that $${\text{emf}}_{x} $$ opposes the other voltage source.
The location of the contact point (see the arrow on the drawing) is adjusted
until the galvanometer reads zero. When the galvanometer reads zero,
$${\text{emf}}_{x}=IR_{x} $$ , where $${R}_{x} $$ is the resistance of the
section of wire up to the contact point. Since no current flows through the
galvanometer, none flows through the unknown emf, and so $${\text{emf}}_{x} $$
is directly sensed.

Now, a very precisely known standard $${\text{emf}}_{s} $$ is substituted for
$${\text{emf}}_{x} $$ , and the contact point is adjusted until the galvanometer
again reads zero, so that $${\text{emf}}_{s}=IR_{s} $$ . In both cases, no
current passes through the galvanometer, and so the current $$I $$ through the
long wire is the same. Upon taking the ratio $$\frac{ {\text{emf}}_{x}}{
{\text{emf}}_{s}} $$ , $$I $$ cancels, giving

<div class="equation" >
 $$\frac{ {\text{emf}}_{x}}{ {\text{emf}}_{s}}=\frac{ IR_{x}}{ IR_{s}}=\frac{ {R}_{x}}{ {R}_{s}}. $$
</div>

Solving for $${\text{emf}}_{x} $$ gives

<div class="equation" >
 $${\text{emf}}_{x}={\text{emf}}_{s}\frac{ {R}_{x}}{ {R}_{s}}. $$
</div>

![Two circuits are shown. The first circuit has a cell of e m f script E and internal resistance r connected in series to a resistor R. The second diagram shows the same circuit with the addition of a galvanometer and unknown voltage source connected with a variable contact that can be adjusted up and down the length of the resistor R.](../resources/Figure_21_05_02.jpg "The potentiometer, a null measurement device. (a) A voltage source connected to a long wire resistor passes a constant current \( I \) through it. (b) An unknown emf (labeled script \( E_x \) in the figure) is connected as shown, and the point of contact along \( R \) is adjusted until the galvanometer reads zero. The segment of wire has a resistance \( R_{x} \) and \( E_{x}=I R_{x}\) , where \( I \) is unaffected by the connection since no current flows through the galvanometer. The unknown emf is thus proportional to the resistance of the wire segment.")
{: #Figure2}

Because a long uniform wire is used for $$R $$ , the ratio of resistances $${R}_
{\text{x}}/{R}_{\text{s}} $$ is the same as the ratio of the lengths of wire
that zero the galvanometer for each emf. The three quantities on the right-hand
side of the equation are now known or measured, and $${\text{emf}}_{\text{x}} $$
can be calculated. The uncertainty in this calculation can be considerably
smaller than when using a voltmeter directly, but it is not zero. There is
always some uncertainty in the ratio of resistances $${R}_{\text{x}}/{R}_
{\text{s}} $$ and in the standard $${\text{emf}}_{s} $$ . Furthermore, it is not
possible to tell when the galvanometer reads exactly zero, which introduces
error into both $${R}_{\text{x}} $$ and $${R}_{\text{s}} $$ , and may also
affect the current $$I $$.

### Resistance Measurements and the Wheatstone Bridge

There is a variety of so-called **ohmmeters** that purport to measure
resistance. What the most common ohmmeters actually do is to apply a voltage to
a resistance, measure the current, and calculate the resistance using Ohm’s law.
Their readout is this calculated resistance. Two configurations for ohmmeters
using standard voltmeters and ammeters are shown in [[Figure 3]](#Figure3). Such
configurations are limited in accuracy, because the meters alter both the
voltage applied to the resistor and the current that flows through it.

![The diagram shows two circuits. The first one has a cell of e m f script E and internal resistance r connected in series to an ammeter A and a resistor R. The second circuit is the same as the first, but in addition there is a voltmeter connected across the voltage source E.](../resources/Figure_21_05_03.jpg "Two methods for measuring resistance with standard meters. (a) Assuming a known voltage for the source, an ammeter measures current, and resistance is calculated as \( R=V/I \) . (b) Since the terminal voltage \( V \) varies with current, it is better to measure it. \( V \) is most accurately known when \( I \) is small, but \( I \) itself is most accurately known when it is large.")
{: #Figure3}

The **Wheatstone bridge** is a null measurement device for calculating
resistance by balancing potential drops in a circuit. (
See [[Figure 4]](#Figure4).) The device is called a bridge because the
galvanometer forms a bridge between two branches. A variety of **bridge
devices** are used to make null measurements in circuits.

Resistors $${R}_{1} $$ and $${R}_{2} $$ are precisely known, while the arrow
through $${R}_{3} $$ indicates that it is a variable resistance. The value of
$${R}_{3} $$ can be precisely read. With the unknown resistance $${R}_{x} $$ in
the circuit, $${R}_{3} $$ is adjusted until the galvanometer reads zero. The
potential difference between points b and d is then zero, meaning that b and d
are at the same potential. With no current running through the galvanometer, it
has no effect on the rest of the circuit. So the branches abc and adc are in
parallel, and each branch has the full voltage of the source. That is, the $$IR
$$ drops along abc and adc are the same. Since b and d are at the same
potential, the $$IR $$ drop along ad must equal the $$IR $$ drop along ab. Thus,

<div class="equation" >
 $${I}_{1}{R}_{1}={I}_{2}{R}_{3}. $$
</div>

Again, since b and d are at the same potential, the $$IR $$ drop along dc must
equal the $$IR $$ drop along bc. Thus,

<div class="equation" >
 $${I}_{1}{R}_{2}={I}_{2}{R}_{\text{x}}. $$
</div>

Taking the ratio of these last two expressions gives

<div class="equation" >
 $$\frac{ {I}_{1}{R}_{1}}{ {I}_{1}{R}_{2}}=\frac{ {I}_{2}{R}_{3}}{ {I}_{2}{R}_{x}}. $$
</div>

Canceling the currents and solving for R<sub>x</sub> yields

<div class="equation" >
 $${R}_{\text{x}}={R}_{3}\frac{ {R}_{2}}{ {R}_{1}}. $$
</div>

![This complex circuit diagram shows a galvanometer connected in the center arm of a Wheatstone bridge arrangement. All the other four arms have a resistor. The bridge is connected to a cell of e m f script E and internal resistance r.](../resources/Figure_21_05_04.jpg "The Wheatstone bridge is used to calculate unknown resistances. The variable resistance \( R_{3} \) is adjusted until the galvanometer reads zero with the switch closed. This simplifies the circuit, allowing \( R_{x} \) to be calculated based on the \( IR \) drops as discussed in the text.")
{: #Figure4}

This equation is used to calculate the unknown resistance when current through
the galvanometer is zero. This method can be very accurate (often to four
significant digits), but it is limited by two factors. First, it is not possible
to get the current through the galvanometer to be exactly zero. Second, there
are always uncertainties in $${R}_{1} $$, $${R}_{2} $$ , and $${R}_{3} $$, which
contribute to the uncertainty in $${R}_{x} $$.

<div class="exercise"  data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Identify other factors that might limit the accuracy of null measurements. Would the use of a digital device that is more sensitive than a galvanometer improve the accuracy of null measurements?

</div>
<div class="solution" data-print-placement="here" markdown="1">
One factor would be resistance in the wires and connections in a null measurement. These are impossible to make zero, and they can change over time. Another factor would be temperature variations in resistance, which can be reduced but not completely eliminated by choice of material. Digital devices sensitive to smaller currents than analog devices do improve the accuracy of null measurements because they allow you to get the current closer to zero.

</div>
</div>

### Section Summary

* Null measurement techniques achieve greater accuracy by balancing a circuit so
  that no current flows through the measuring device.
* One such device, for determining voltage, is a potentiometer.
* Another null measurement device, for determining resistance, is the Wheatstone
  bridge.
* Other physical quantities can also be measured with null measurement
  techniques.

### Conceptual questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why can a null measurement be more accurate than one using standard voltmeters and ammeters? What factors limit the accuracy of null measurements?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If a potentiometer is used to measure cell emfs on the order of a few volts, why is it most accurate for the standard  $${\text{emf}}_{\text{s}} $$
 to be the same order of magnitude and the resistances to be in the range of a few ohms?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the  $${\text{emf}}_{\text{x}} $$
 of a cell being measured in a potentiometer, if the standard cell’s emf is 12.0 V and the potentiometer balances for  $${R}_{\text{x}}= 5.000 \Omega  $$
 and  $${R}_{\text{s}}= 2.500 \Omega  $$ ?

</div>
<div class="solution" markdown="1">
24.0 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the  $${\text{emf}}_{\text{x}} $$
 of a dry cell for which a potentiometer is balanced when  $${R}_{\text{x}}= 1.200 \Omega  $$ ,
 while an alkaline standard cell with an emf of 1.600 V requires  $${R}_{\text{s}}= 1.247 \Omega  $$
 to balance the potentiometer.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
When an unknown resistance  $${R}_{\text{x}} $$
 is placed in a Wheatstone bridge, it is possible to balance the bridge by adjusting  $${R}_{3} $$
 to be  $$2500 \Omega  $$ .
 What is  $${R}_{\text{x}} $$
 if  $$\frac{ {R}_{2}}{ {R}_{1}}= 0.625 $$ ?

</div>
<div class="solution" markdown="1">
 $$1.56 \text{k}\Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
To what value must you adjust  $${R}_{3} $$
 to balance a Wheatstone bridge, if the unknown resistance  $${R}_{\text{x}} $$
 is  $$100 \Omega  $$ ,
  $${R}_{1} $$
 is  $$ 50.0 \Omega  $$ ,
 and  $${R}_{2} $$
 is  $$175 \Omega  $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the unknown  $${\text{emf}}_{\text{x}} $$
 in a potentiometer that balances when  $${R}_{\text{x}} $$
 is  $$ 10.0 \Omega  $$ ,
 and balances when  $${R}_{\text{s}} $$
 is  $$ 15.0 \Omega  $$
 for a standard 3.000-V emf? (b) The same  $${\text{emf}}_{\text{x}} $$
 is placed in the same potentiometer, which now balances when  $${R}_{\text{s}} $$
 is  $$ 15.0 \Omega  $$
 for a standard emf of 3.100 V. At what resistance  $${R}_{\text{x}} $$
 will the potentiometer balance?

</div>
<div class="solution" markdown="1">
(a) 2.00 V

(b)  $$ 9.68 \Omega $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you want to measure resistances in the range from  $$ 10.0 \Omega  $$
 to  $$ 10.0 k\Omega  $$
 using a Wheatstone bridge that has  $$\frac{ {R}_{2}}{ {R}_{1}}= 2.000 $$ .
 Over what range should  $${R}_{3} $$
 be adjustable?

</div>
<div class="solution">
<div class="equation" >
 $$\text{Range} = 5.00 \Omega  \text{to}  5.00 \text{k}\Omega  $$
</div>
</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

null measurements
: methods of measuring current and voltage more accurately by balancing the
circuit so that no current flows through the measurement device

potentiometer
: a null measurement device for measuring potentials (voltages)

ohmmeter
: an instrument that applies a voltage to a resistance, measures the current,
calculates the resistance using Ohm’s law, and provides a readout of this
calculated resistance

bridge device
: a device that forms a bridge between two branches of a circuit; some bridge
devices are used to make null measurements in circuits

Wheatstone bridge
: a null measurement device for calculating resistance by balancing potential
drops in a circuit

</div>
