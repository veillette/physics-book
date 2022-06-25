---
title: "DC Circuits Containing Resistors and Capacitors"
layout: page
---

<div class="abstract" markdown="1">
* Explain the importance of the time constant, τ , and calculate the time constant for a given resistance and capacitance.
* Explain why batteries in a flashlight gradually lose power and the light dims over time.
* Describe what happens to a graph of the voltage across a capacitor over time as it charges.
* Explain how a timing circuit works and list some applications.
* Calculate the necessary speed of a strobe flash needed to “stop” the movement of an object over a particular length.
</div>

When you use a flash camera, it takes a few seconds to charge the capacitor that
powers the flash. The light flash discharges the capacitor in a tiny fraction of
a second. Why does charging take longer than discharging? This question and a
number of other phenomena that involve charging and discharging capacitors are
discussed in this module.

### *RC* Circuits

An $$\mathbf{\text{RC}} $$ **circuit** is one containing a **resistor** $$ R $$
and a **capacitor**  $$C $$ . The capacitor is an electrical component that
stores electric charge.

[[Figure 1]](#Figure1) shows a simple $$\text{RC} $$ circuit that employs a DC (
direct current) voltage source. The capacitor is initially uncharged. As soon as
the switch is closed, current flows to and from the initially uncharged
capacitor. As charge increases on the capacitor plates, there is increasing
opposition to the flow of charge by the repulsion of like charges on each plate.

In terms of voltage, this is because voltage across the capacitor is given by
$${V}_{\text{c}}=Q/C $$ , where $$Q $$ is the amount of charge stored on each
plate and $$C $$ is the **capacitance**. This voltage opposes the battery,
growing from zero to the maximum emf when fully charged. The current thus
decreases from its initial value of $${I}_{0}=\frac{\text{emf}}{R} $$ to zero as
the voltage on the capacitor reaches the same value as the emf. When there is no
current, there is no $$IR $$ drop, and so the voltage on the capacitor must then
equal the emf of the voltage source. This can also be explained with Kirchhoff’s
second rule (the loop rule), discussed
in [Kirchhoff’s Rules](../contents/ch21KirchhoffsRules), which says that the algebraic sum
of changes in potential around any closed loop must be zero.

The initial current is $${I}_{0}=\frac{\text{emf}}{R} $$ , because all of the
$$IR $$ drop is in the resistance. Therefore, the smaller the resistance, the
faster a given capacitor will be charged. Note that the internal resistance of
the voltage source is included in $$R $$ , as are the resistances of the
capacitor and the connecting wires. In the flash camera scenario above, when the
batteries powering the camera begin to wear out, their internal resistance
rises, reducing the current and lengthening the time it takes to get ready for
the next flash.

![Part a shows a circuit with a cell of e m f script E connected in series with a resistor R, a capacitor C, and a switch to close the circuit. The current is shown flowing in a clockwise direction. The capacitor plates are shown to have a charge positive q and negative q respectively. Part b shows a graph of the variation of voltage of the capacitor with time. The voltage is plotted along the vertical axis and the time is along the horizontal axis. The graph shows a smooth upward rising curve which approaches a maximum and flattens out at maximum voltage equal to e m f script E over time.](../resources/Figure_21_06_01.jpg "(a) An \( RC \) circuit with an initially uncharged capacitor. Current flows in the direction shown (opposite of electron flow) as soon as the switch is closed. Mutual repulsion of like charges in the capacitor progressively slows the flow as the capacitor is charged, stopping the current when the capacitor is fully charged and \( Q=C&#x22C5;emf \) . (b) A graph of voltage across the capacitor versus time, with the switch closing at time \( t=0 \) . (Note that in the two parts of the figure, the capital script E stands for emf, q  stands for the charge stored on the capacitor, and \( \tau \) is the RC  time constant.)")
{: #Figure1}

Voltage on the capacitor is initially zero and rises rapidly at first, since the
initial current is a maximum. [[Figure 1]](#Figure1)(b) shows a graph of
capacitor voltage versus time ( $$t $$ )
starting when the switch is closed at $$t=0 $$ . The voltage approaches emf
asymptotically, since the closer it gets to emf the less current flows. The
equation for voltage versus time when charging a capacitor $$C $$ through a
resistor $$R $$ , derived using calculus, is

<div class="equation" >
 $$V=\text{emf}\left(1-{e}^{-t/\text{RC}}\right) \left(charging\right), $$
</div>

where $$V $$ is the voltage across the capacitor, emf is equal to the emf of the
DC voltage source, and the exponential e = 2.718 … is the base of the natural
logarithm. Note that the units of $$\text{RC} $$ are seconds. We define

<div class="equation" >
 $$\tau =\text{RC}, $$
</div>

where $$\tau $$
(the Greek letter tau) is called the time constant for an $$\text{RC} $$
circuit. As noted before, a small resistance $$R $$ allows the capacitor to
charge faster. This is reasonable, since a larger current flows through a
smaller resistance. It is also reasonable that the smaller the capacitor $$C $$
, the less time needed to charge it. Both factors are contained in $$\tau
=\text{RC} $$.

More quantitatively, consider what happens when $$t=\tau =\text{RC} $$ . Then
the voltage on the capacitor is

<div class="equation" >
 $$V=\text{emf}\left(1-{e}^{-1}\right)=\text{emf}\left(1 -0.368\right)= 0.632\cdot \text{emf}. $$
</div>

This means that in the time $$\tau =\text{RC} $$ , the voltage rises to 0.632 of
its final value. The voltage will rise 0.632 of the remainder in the next time
$$\tau $$ . It is a characteristic of the exponential function that the final
value is never reached, but 0.632 of the remainder to that value is achieved in
every time, $$\tau $$ . In just a few multiples of the time constant $$\tau $$ ,
then, the final value is very nearly achieved, as the graph
in [[Figure 1]](#Figure1)(b) illustrates.

### Discharging a Capacitor

Discharging a capacitor through a resistor proceeds in a similar fashion,
as [[Figure 2]](#Figure2) illustrates. Initially, the current is $${I}_
{0}=\frac{ {V}_{0}}{R} $$ , driven by the initial voltage $${V}_{0} $$ on the
capacitor. As the voltage decreases, the current and hence the rate of discharge
decreases, implying another exponential formula for $$V $$ . Using calculus, the
voltage $$V $$ on a capacitor $$C $$ being discharged through a resistor $$R $$
is found to be

<div class="equation" >
 $$V=V{}_{0}  {e}^{-t/\text{RC}}\text{(discharging).} $$
</div>

![Part a shows a circuit with a capacitor C connected in series with a resistor R and a switch to close the circuit. The current is shown flowing in a counterclockwise direction. The capacitor plates are shown to have a charge positive q and negative q respectively. Part b shows a graph of the variation of voltage across the capacitor with time. The voltage is plotted along the vertical axis and the time is along the horizontal axis. The graph shows a smooth downward falling curve which approaches a minimum and flattens out close to zero over time.](../resources/Figure_21_06_02.jpg "(a) Closing the switch discharges the capacitor \( C \) through the resistor \( R \) . Mutual repulsion of like charges on each plate drives the current. (b) A graph of voltage across the capacitor versus time, with \( V = V_0 \) at \( t=0 \). The voltage decreases exponentially, falling a fixed fraction of the way to zero in each subsequent time constant \( \tau \) .")
{: #Figure2}

The graph in [[Figure 2]](#Figure2)(b) is an example of this exponential decay.
Again, the time constant is $$\tau =\text{RC} $$ . A small resistance $$R $$
allows the capacitor to discharge in a small time, since the current is larger.
Similarly, a small capacitance requires less time to discharge, since less
charge is stored. In the first time interval $$\tau =\text{RC} $$ after the
switch is closed, the voltage falls to 0.368 of its initial value, since
$$V={V}_{0}\cdot {e}^{-1}= 0.368{V}_{0} $$.

During each successive time $$\tau $$ , the voltage falls to 0.368 of its
preceding value. In a few multiples of $$\tau $$ , the voltage becomes very
close to zero, as indicated by the graph in [[Figure 2]](#Figure2)(b).

Now we can explain why the flash camera in our scenario takes so much longer to
charge than discharge; the resistance while charging is significantly greater
than while discharging. The internal resistance of the battery accounts for most
of the resistance while charging. As the battery ages, the increasing internal
resistance makes the charging process even slower. (You may have noticed this.)

The flash discharge is through a low-resistance ionized gas in the flash tube
and proceeds very rapidly. Flash photographs, such as in [[Figure 3]](#Figure3),
can capture a brief instant of a rapid motion because the flash can be less than
a microsecond in duration. Such flashes can be made extremely intense.

During World War II, nighttime reconnaissance photographs were made from the air
with a single flash illuminating more than a square kilometer of enemy
territory. The brevity of the flash eliminated blurring due to the surveillance
aircraft’s motion. Today, an important use of intense flash lamps is to pump
energy into a laser. The short intense flash can rapidly energize a laser and
allow it to reemit the energy in another form.

![In the photograph, details of the fast beating wings of the hummingbird taking nectar from a flower have been caught in focus, instead of the blur that our eyes would see in real time.](../resources/Figure_21_06_03.jpg "This stop-motion photograph of a rufous hummingbird (Selasphorus rufus) feeding on a flower was obtained with an extremely brief and intense flash of light powered by the discharge of a capacitor through a gas. (credit: Dean E. Biggins, U.S. Fish and Wildlife Service)")
{: #Figure3}

<div class="example" markdown="1">
<div class="title">
Integrated Concept Problem: Calculating Capacitor Size—Strobe Lights
</div>
High-speed flash photography was pioneered by Doc Edgerton in the 1930s, while he was a professor of electrical engineering at MIT. You might have seen examples of his work in the amazing shots of hummingbirds in motion, a drop of milk splattering on a table, or a bullet penetrating an apple (see [[Figure 3]](#Figure3)). To stop the motion and capture these pictures, one needs a high-intensity, very short pulsed flash, as mentioned earlier in this module.

Suppose one wished to capture the picture of a bullet (moving at $$5.0 \times
10^{2} \text{m/s} $$ )
that was passing through an apple. The duration of the flash is related to the
$$\text{RC} $$ time constant, $$\tau $$ . What size capacitor would one need in
the $$\text{RC} $$ circuit to succeed, if the resistance of the flash tube was
$$10.0 \text{Ω} $$ ? Assume the apple is a sphere with a diameter of $$8.0
\times 10^{-2} \text{m} \text{.} $$
**Strategy**

We begin by identifying the physical principles involved. This example deals
with the strobe light, as discussed above. [[Figure 2]](#Figure2) shows the
circuit for this probe. The characteristic time $$\tau $$ of the strobe is given
as $$\tau =\text{RC} $$.

**Solution**

We wish to find $$C $$ , but we don’t know $$\tau $$ . We want the flash to be
on only while the bullet traverses the apple. So we need to use the kinematic
equations that describe the relationship between distance $$x $$ , velocity $$v
$$ , and time $$t $$ \:

<div class="equation" >
 $$x=vt \text{ or } t=\frac{x}{v}. $$
</div>
The bullet’s velocity is given as  $$5.0 \times 10^{2}  \text{m/s} $$ ,
 and the distance  $$x $$
 is  $$8.0 \times 10^{-2}  \text{m} \text{.}  $$
 The traverse time, then, is

<div class="equation" >
 $$t=\frac{x}{v}=\frac{8.0 \times 10^{-2}  \text{m}}{5.0 \times 10^{2}  \text{m/s}}= 1.6 \times 10^{-4}  \text{s} \text{.}  $$
</div>
We set this value for the crossing time  $$t $$
 equal to  $$\tau  $$ .  Therefore,

<div class="equation" >
 $$C=\frac{t}{R}=\frac{ 1.6 \times 10^{-4}  s}{10.0 \text{Ω}}=16 \text{μF.} $$
</div>
(Note: Capacitance  $$C $$
 is typically measured in farads,  $$F $$ ,
 defined as Coulombs per volt. From the equation, we see that  $$C $$
 can also be stated in units of seconds per ohm.)

**Discussion**

The flash interval of $$160 \text{μs} $$
(the traverse time of the bullet) is relatively easy to obtain today. Strobe
lights have opened up new worlds from science to entertainment. The information
from the picture of the apple and bullet was used in the Warren Commission
Report on the assassination of President John F. Kennedy in 1963 to confirm that
only one bullet was fired.

</div>

### *RC* Circuits for Timing

$$\text{RC} $$ circuits are commonly used for timing purposes. A mundane example
of this is found in the ubiquitous intermittent wiper systems of modern cars.
The time between wipes is varied by adjusting the resistance in an $$\text{RC}
$$ circuit. Another example of an $$\text{RC} $$ circuit is found in novelty
jewelry, Halloween costumes, and various toys that have battery-powered flashing
lights. (See [[Figure 4]](#Figure4) for a timing circuit.)

A more crucial use of $$\text{RC} $$ circuits for timing purposes is in the
artificial pacemaker, used to control heart rate. The heart rate is normally
controlled by electrical signals generated by the sino-atrial (SA) node, which
is on the wall of the right atrium chamber. This causes the muscles to contract
and pump blood. Sometimes the heart rhythm is abnormal and the heartbeat is too
high or too low.

The artificial pacemaker is inserted near the heart to provide electrical
signals to the heart when needed with the appropriate time constant. Pacemakers
have sensors that detect body motion and breathing to increase the heart rate
during exercise to meet the body’s increased needs for blood and oxygen.

![Part a shows a charging circuit containing cell of e m f script E connected to a resistor R and capacitor C and a closed switch to complete the circuit. The current is shown to flow clockwise through this arm of the circuit alone. A bulb of high resistance R is connected across the capacitor. Part b shows a discharging circuit containing a cell of e m f script E connected to a resistor R and capacitor C and a closed switch to complete the circuit. A bulb of low resistance R is connected across the capacitor. Current flows clockwise through the arm containing the capacitor and the low resistance bulb. Part c is a graph showing variation of voltage verses time for the bulb in above circuit. The voltage is plotted along the vertical axis and the time is plotted along the horizontal axis. The curve has a smooth rise from the origin, reaches a plateau at threshold value of voltage where it begins to drop and rise as a small sawtooth wave with maxima lying along the threshold line.](../resources/Figure_21_06_04.jpg "(a) The lamp in this \( RC \) circuit ordinarily has a very high resistance, so that the battery charges the capacitor as if the lamp were not there. When the voltage reaches a threshold value, a current flows through the lamp that dramatically reduces its resistance, and the capacitor discharges through the lamp as if the battery and charging resistor were not there. Once discharged, the process starts again, with the flash period determined by the \( RC \) constant \( \tau \). (b) A graph of voltage versus time for this circuit.")
{: #Figure4}

<div class="example" markdown="1">
<div class="title">
Calculating Time: *RC* Circuit in a Heart Defibrillator
</div>
A heart defibrillator is used to resuscitate an accident victim by discharging a capacitor through the trunk of her body. A simplified version of the circuit is seen in [[Figure 2]](#Figure2). (a) What is the time constant if an  $$8.00-\mu F $$
 capacitor is used and the path resistance through her body is  $$1.00 \times 10^{3}  \Omega  $$ ?
 (b) If the initial voltage is 10.0 kV, how long does it take to decline to  $$5.00 \times 10^{2}  \text{V} $$ ?

**Strategy**

Since the resistance and capacitance are given, it is straightforward to
multiply them to give the time constant asked for in part (a). To find the time
for the voltage to decline to $$5.00 \times 10^{2} \text{V} $$ , we repeatedly
multiply the initial voltage by 0.368 until a voltage less than or equal to
$$5.00 \times 10^{2} \text{V} $$ is obtained. Each multiplication corresponds to
a time of $$\tau $$ seconds.

**Solution for (a)**

The time constant $$\tau $$ is given by the equation $$\tau =\text{RC} $$ .
Entering the given values for resistance and capacitance (and remembering that
units for a farad can be expressed as $$s/\Omega $$ )
gives

<div class="equation" >
 $$\tau =\text{RC}=\left(1.00 \times 10^{3}  \Omega \right)\left( 8.00 \mu F\right)= 8.00 \text{ms} \text{.}  $$
</div>
**Solution for (b)**

In the first 8.00 ms, the voltage (10.0 kV) declines to 0.368 of its initial
value. That is:

<div class="equation" >
 $$V= 0.368{V}_{0}=3.680 \times 10^{3}  \text{V at }t= 8.00 \text{ms} \text{.}  $$
</div>
(Notice that we carry an extra digit for each intermediate calculation.) After another 8.00 ms, we multiply by 0.368 again, and the voltage is

<div class="equation" >
 $$\begin{array}{lll}V^{\prime}& =& 0.368V\\ & =& \left(0.368\right)\left(3.680 \times 10^{3}  \text{V}\right)\\ & =& 1.354 \times 10^{3}  \text{V} \text{at} t=16.0 \text{ms} \text{.} \end{array} $$
</div>
Similarly, after another 8.00 ms, the voltage is

<div class="equation" >
 $$\begin{array}{lll}V^{\prime\prime}& =& 0.368V^{\prime}=\left(0.368\right)\left( 1.354 \times 10^{3}  \text{V}\right)\\ & =& 498 \text{V at} t=24.0\text{ ms.}\end{array} $$
</div>
**Discussion**

So after only 24.0 ms, the voltage is down to 498 V, or 4.98% of its original
value. Such brief times are useful in heart defibrillation, because the brief
but intense current causes a brief but effective contraction of the heart. The
actual circuit in a heart defibrillator is slightly more complex than the one
in [[Figure 2]](#Figure2), to compensate for magnetic and AC effects that will
be covered in [Magnetism](../contents/ch22Magnetism).

</div>

<div class="exercise"  data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" data-element-type="check-understanding" markdown="1">
When is the potential difference across a capacitor an emf?

</div>
<div class="solution" data-print-placement="here" markdown="1">
Only when the current being drawn from or put into the capacitor is zero. Capacitors, like batteries, have internal resistance, so their output voltage is not an emf unless current is zero. This is difficult to measure in practice so we refer to a capacitor’s voltage rather than its emf. But the source of potential difference in a capacitor is fundamental and it is an emf.

</div>
</div>

<div class="note" data-has-label="true"  class="interactive" data-label="" markdown="1">
<div class="title">
PhET Explorations: Circuit Construction Kit (DC only)
</div>
An electronics kit in your computer! Build circuits with resistors, light bulbs, batteries, and switches. Take measurements with the realistic ammeter and voltmeter. View the circuit as a schematic diagram, or switch to a life-like view.
{: class="newline"}

<div class="media"  data-alt="circuit construction kit">
<iframe width="660" height="371.4" src="https://archive.cnx.org/specials/f23ce496-c9d1-11e5-bdc8-bb04dc1eecb6/circuit-construction-kit-dc-only/#sim-cck"></iframe>
</div>
</div>

### Section Summary

* An $$\text{RC} $$ circuit is one that has both a resistor and a capacitor.
* The time constant $$\tau $$ for an $$\text{RC} $$ circuit is $$\tau =\text{RC}
  $$ .
* When an initially uncharged (
  $${V}_{0}=0 $$ at $$t=0 $$ )   capacitor in series with a resistor is charged
  by a DC voltage source, the voltage rises, asymptotically approaching the emf
  of the voltage source; as a function of time,

  <div class="equation" >
   $$V=\text{emf}\left(1-{e}^{-t/\text{RC}}\right)\text{(charging).} $$
  </div>

* Within the span of each time constant $$\tau $$ , the voltage rises by 0.632
  of the remaining value, approaching the final voltage asymptotically.
* If a capacitor with an initial voltage $${V}_{0} $$ is discharged through a
  resistor starting at $$t=0 $$ , then its voltage decreases exponentially as
  given by

  <div class="equation" >
   $$V={V}_{0}{e}^{-t/\text{RC}}\text{(discharging).} $$
  </div>

* In each time constant $$\tau $$ , the voltage falls by 0.368 of its remaining
  initial value, approaching zero asymptotically.

### Conceptual questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Regarding the units involved in the relationship  $$\tau =\text{RC} $$ ,
 verify that the units of resistance times capacitance are time, that is,  $$\Omega \cdot F=s $$.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The  $$\text{RC} $$
 time constant in heart defibrillation is crucial to limiting the time the current flows. If the capacitance in the defibrillation unit is fixed, how would you manipulate resistance in the circuit to adjust the  $$\text{RC} $$
 constant  $$\tau  $$ ?
 Would an adjustment of the applied voltage also be needed to ensure that the current delivered has an appropriate value?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
When making an ECG measurement, it is important to measure voltage variations over small time intervals. The time is limited by the  $$\text{RC} $$
 constant of the circuit—it is not possible to measure time variations shorter than  $$\text{RC} $$ .
 How would you manipulate  $$R $$  and  $$C $$
 in the circuit to allow the necessary measurements?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Draw two graphs of charge versus time on a capacitor. Draw one for charging an initially uncharged capacitor in series with a resistor, as in the circuit in [[Figure 1]](#Figure1), starting from  $$t=0 $$ .
 Draw the other for discharging a capacitor through a resistor, as in the circuit in [[Figure 2]](#Figure2), starting at  $$\t=0 $$ ,
 with an initial charge  $${Q}_{0} $$ .
 Show at least two intervals of  $$\tau  $$.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
When charging a capacitor, as discussed in conjunction with [[Figure 1]](#Figure1), how long does it take for the voltage on the capacitor to reach emf? Is this a problem?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
When discharging a capacitor, as discussed in conjunction with [[Figure 2]](#Figure2), how long does it take for the voltage on the capacitor to reach zero? Is this a problem?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Referring to [[Figure 1]](#Figure1), draw a graph of potential difference across the resistor versus time, showing at least two intervals of  $$\tau  $$ .
 Also draw a graph of current versus time for this situation.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
A long, inexpensive extension cord is connected from inside the house to a refrigerator outside. The refrigerator doesn’t run as it should. What might be the problem?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In [[Figure 4]](#Figure4), does the graph indicate the time constant is shorter for discharging than for charging? Would you expect ionized gas to have low resistance? How would you adjust  $$R $$
 to get a longer time between flashes? Would adjusting  $$R $$
 affect the discharge time?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
An electronic apparatus may have large capacitors at high voltage in the power supply section, presenting a shock hazard even when the apparatus is switched off. A “bleeder resistor” is therefore placed across such a capacitor, as shown schematically in [[Figure 5]](#Figure5), to bleed the charge from it after the apparatus is off. Why must the bleeder resistance be much greater than the effective resistance of the rest of the circuit? How does this affect the time constant for discharging the capacitor?

![An electrical circuit with a capacitor has an extra resistor R sub b l, called a bleeder, installed in parallel with the capacitor.](../resources/Figure_21_06_05.jpg "A bleeder resistor \( R_\text{bl} \) discharges the capacitor in this electronic device once it is switched off.")
{: #Figure5}

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The timing device in an automobile’s intermittent wiper system is based on an  $$\text{RC} $$
 time constant and utilizes a  $$0.500\text{-μF} $$
 capacitor and a variable resistor. Over what range must  $$R $$
 be made to vary to achieve time constants from 2.00 to 15.0 s?

</div>
<div class="solution" markdown="1">
 $$\text{range} 4.00 \text{to} 30.0 \text{M}\Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A heart pacemaker fires 72 times a minute, each time a 25.0-nF capacitor is charged (by a battery in series with a resistor) to 0.632 of its full voltage. What is the value of the resistance?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The duration of a photographic flash is related to an  $$\text{RC} $$
 time constant, which is  $$0.100 \text{μs} $$
 for a certain camera. (a) If the resistance of the flash lamp is  $$ 0.0400 \Omega  $$
 during discharge, what is the size of the capacitor supplying its energy? (b) What is the time constant for charging the capacitor, if the charging resistance is  $$800 \text{kΩ} $$ ?

</div>
<div class="solution" markdown="1">
(a)  $$2.50 \text{μF} $$
(b) 2.00 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 2.00- and a  $$7.50\text{-μF} $$
 capacitor can be connected in series or parallel, as can a 25.0- and a  $$100 \text{-kΩ} $$
 resistor. Calculate the four  $$\text{RC} $$
 time constants possible from connecting the resulting capacitance and resistance in series.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
After two time constants, what percentage of the final voltage, emf, is on an initially uncharged capacitor  $$C $$ ,
 charged through a resistance  $$R $$ ?

</div>
<div class="solution" markdown="1">
86.5%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A  $$500 \text{-Ω} $$
 resistor, an uncharged  $$1.50\text{-μF} $$
 capacitor, and a 6.16-V emf are connected in series. (a) What is the initial current? (b) What is the  $$\text{RC} $$
 time constant? (c) What is the current after one time constant? (d) What is the voltage on the capacitor after one time constant?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A heart defibrillator being used on a patient has an  $$\text{RC} $$
 time constant of 10.0 ms due to the resistance of the patient and the capacitance of the defibrillator. (a) If the defibrillator has an  $$8.00\text{-μF} $$
 capacitance, what is the resistance of the path through the patient? (You may neglect the capacitance of the patient and the resistance of the defibrillator.) (b) If the initial voltage is 12.0 kV, how long does it take to decline to  $$6.00 \times 10^{2}  \text{V} $$ ?

</div>
<div class="solution" markdown="1">
(a)  $$1.25 \text{k}\Omega  $$
(b) 30.0 ms

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An ECG monitor must have an  $$\text{RC} $$
 time constant less than  $$1.00 \times 10^{2}  \text{μs} $$
 to be able to measure variations in voltage over small time intervals. (a) If the resistance of the circuit (due mostly to that of the patient’s chest) is  $$ 1.00 k\Omega  $$ ,
 what is the maximum capacitance of the circuit? (b) Would it be difficult in practice to limit the capacitance to less than the value found in (a)?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
[[Figure 6]](#Figure6) shows how a bleeder resistor is used to discharge a capacitor after an electronic device is shut off, allowing a person to work on the electronics with less risk of shock. (a) What is the time constant? (b) How long will it take to reduce the voltage on the capacitor to 0.250% (5% of 5%) of its full value once discharge begins? (c) If the capacitor is charged to a voltage  $${V}_{0} $$
 through a  $$100 \text{-Ω} $$
 resistance, calculate the time it takes to rise to  $$ 0.865{V}_{0} $$
 (This is about two time constants.)

![A parallel circuit with a switch, an embedded electronic circuit, a capacitor, and a resistor is shown. The embedded circuit, capacitor, and resistor are connected in parallel with each other: the electronic circuit on the left, the capacitor in the middle, and the resistor on the right. The capacitor has a capacitance of eighty micro farads. The resistor has a resistance of two hundred fifty kilohms. The switch is on the top, between the electronic circuit and the capacitor leg.](../resources/Figure_21_06_07.jpg " ")
{: #Figure6}

</div>
<div class="solution" markdown="1">
(a) 20.0 s

(b) 120 s

(c) 16.0 ms

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Using the exact exponential treatment, find how much time is required to discharge a  $$250 \text{-μF} $$
 capacitor through a  $$500 \text{-Ω} $$
 resistor down to 1.00% of its original voltage.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Using the exact exponential treatment, find how much time is required to charge an initially uncharged 100-pF capacitor through a  $$ 75.0\text{-M}\Omega  $$
 resistor to 90.0% of its final voltage.

</div>
<div class="solution" markdown="1">
 $$ 1.73 \times 10^{-2}  \text{s} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

If you wish to take a picture of a bullet traveling at 500 m/s, then a very
brief flash of light produced by an $$\text{RC} $$ discharge through a flash
tube can limit blurring. Assuming 1.00 mm of motion during one $$\text{RC} $$
constant is acceptable, and given that the flash is driven by a $$600 \text{-μF}
$$ capacitor, what is the resistance in the flash tube?

</div>
<div class="solution" markdown="1">
 $$ 3.33 \times 10^{-3}  \Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

A flashing lamp in a Christmas earring is based on an $$\text{RC} $$ discharge
of a capacitor through its resistance. The effective duration of the flash is
0.250 s, during which it produces an average 0.500 W from an average 3.00 V. (a)
What energy does it dissipate? (b) How much charge moves through the lamp? (c)
Find the capacitance. (d) What is the resistance of the lamp?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

A $$160 \text{-μF} $$ capacitor charged to 450 V is discharged through a
$$31.2\text{-k}\Omega $$ resistor. (a) Find the time constant. (b) Calculate the
temperature increase of the resistor, given that its mass is 2.50 g and its
specific heat is $$ 1.67\frac{\text{kJ}}{\text{kg} \cdot \text{ºC}} $$ , noting
that most of the thermal energy is retained in the short time of the
discharge. (c) Calculate the new resistance, assuming it is pure carbon. (d)
Does this change in resistance seem significant?

</div>
<div class="solution" markdown="1">
(a) 4.99 s

(b)  $$3.87\text{ºC} $$
(c)  $$31.1 \text{k}\Omega $$
(d) No

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) Calculate the capacitance needed to get an $$\text{RC} $$ time constant of
$$1.00 \times 10^{3} \text{s} $$ with a $$0.100\text{-Ω} $$ resistor. (b) What
is unreasonable about this result? (c) Which assumptions are responsible?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider a camera’s flash unit. Construct a problem in which you calculate the
size of the capacitor that stores energy for the flash lamp. Among the things to
be considered are the voltage applied to the capacitor, the energy needed in the
flash and the associated charge needed on the capacitor, the resistance of the
flash lamp during discharge, and the desired $$\text{RC} $$ time constant.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider a rechargeable lithium cell that is to be used to power a camcorder.
Construct a problem in which you calculate the internal resistance of the cell
during normal operation. Also, calculate the minimum voltage output of a battery
charger to be used to recharge your lithium cell. Among the things to be
considered are the emf and useful terminal voltage of a lithium cell and the
current it should be able to supply to a camcorder.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

RC circuit
: a circuit that contains both a resistor and a capacitor

capacitor
: an electrical component used to store energy by separating electric charge on
two opposing plates

capacitance
: the maximum amount of electric potential energy that can be stored (or
separated) for a given electric potential

</div>
