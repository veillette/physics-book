---
title: DC Circuits Containing Resistors and Capacitors
layout: page
sectionNumber: 6
chapterNumber: 21
---
::: abstract

* Explain the importance of the time constant, τ , and calculate the time constant for a given resistance and capacitance.
* Explain why batteries in a flashlight gradually lose power and the light dims over time.
* Describe what happens to a graph of the voltage across a capacitor over time as it charges.
* Explain how a timing circuit works and list some applications.
* Calculate the necessary speed of a strobe flash needed to “stop” the movement of an object over a particular length.

:::

When you use a flash camera, it takes a few seconds to charge the capacitor that
powers the flash. The light flash discharges the capacitor in a tiny fraction of
a second. Why does charging take longer than discharging? This question and a
number of other phenomena that involve charging and discharging capacitors are
discussed in this module.

### _RC_ Circuits

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

![(a) A source of emf, a resistor R, a capacitor C and a switch in series; when the switch closes, current I flows clockwise and the capacitor plates acquire charges +q and −q. (b) The capacitor voltage V rises from 0 toward the emf, reaching 0.632 emf at one time constant τ = RC and coming closer at 2τ, 3τ and 4τ.](../resources/Figure_21_06_01.svg '(a) An ( RC ) circuit with an initially uncharged capacitor. Current flows in the direction shown (opposite of electron flow) as soon as the switch is closed. Mutual repulsion of like charges in the capacitor progressively slows the flow as the capacitor is charged, stopping the current when the capacitor is fully charged and ( Q=C⋅emf ) . (b) A graph of voltage across the capacitor versus time, with the switch closing at time ( t=0 ) . In both parts, ( q ) is the charge stored on the capacitor and ( \\tau ) is the RC time constant.')
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
, the less time needed to charge it. Both factors are contained in $$\tau =\text{RC} $$.

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
as [[Figure 2]](#Figure2) illustrates. Initially, the current is $${I}_{0}=\frac{ {V}_{0}}{R} $$ , driven by the initial voltage $${V}_{0} $$ on the
capacitor. As the voltage decreases, the current and hence the rate of discharge
decreases, implying another exponential formula for $$V $$ . Using calculus, the
voltage $$V $$ on a capacitor $$C $$ being discharged through a resistor $$R $$
is found to be

<div class="equation" >
 $$V=V{}_{0}  {e}^{-t/\text{RC}}\text{(discharging).} $$
</div>

![(a) A charged capacitor C, a resistor R and a switch in series; when the switch closes, current I flows counterclockwise as the capacitor discharges. (b) The capacitor voltage V falls from V0, reaching 0.368 V0 at one time constant τ = RC and approaching zero at 2τ, 3τ and 4τ.](../resources/Figure_21_06_02.svg '(a) Closing the switch discharges the capacitor ( C ) through the resistor ( R ) . Mutual repulsion of like charges on each plate drives the current. (b) A graph of voltage across the capacitor versus time, with ( V = V_0 ) at ( t=0 ). The voltage decreases exponentially, falling a fixed fraction of the way to zero in each subsequent time constant ( \\tau ) .')
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

![In the photograph, details of the fast beating wings of the hummingbird taking nectar from a flower have been caught in focus, instead of the blur that our eyes would see in real time.](../resources/Figure_21_06_03.jpg 'This stop-motion photograph of a rufous hummingbird (Selasphorus rufus) feeding on a flower was obtained with an extremely brief and intense flash of light powered by the discharge of a capacitor through a gas. (credit: Dean E. Biggins, U.S. Fish and Wildlife Service)')
{: #Figure3}

::: example

<div class="title">
Integrated Concept Problem: Calculating Capacitor Size—Strobe Lights
</div>

High-speed flash photography was pioneered by Doc Edgerton in the 1930s, while he was a professor of electrical engineering at MIT. You might have seen examples of his work in the amazing shots of hummingbirds in motion, a drop of milk splattering on a table, or a bullet penetrating an apple (see [[Figure 3]](#Figure3)). To stop the motion and capture these pictures, one needs a high-intensity, very short pulsed flash, as mentioned earlier in this module.

Suppose one wished to capture the picture of a bullet (moving at $$5.0 \times 10^{2} \text{m/s} $$ )
that was passing through an apple. The duration of the flash is related to the
$$\text{RC} $$ time constant, $$\tau $$ . What size capacitor would one need in
the $$\text{RC} $$ circuit to succeed, if the resistance of the flash tube was
$$10.0 \text{Ω} $$ ? Assume the apple is a sphere with a diameter of $$8.0 \times 10^{-2} \text{m} \text{.} $$
**Strategy**

We begin by identifying the physical principles involved. This example deals
with the strobe light, as discussed above. [[Figure 2]](#Figure2) shows the
circuit for this probe. The characteristic time $$\tau $$ of the strobe is given
as $$\tau =\text{RC} $$.

**Solution**

We wish to find $$C $$ , but we don’t know $$\tau $$ . We want the flash to be
on only while the bullet traverses the apple. So we need to use the kinematic
equations that describe the relationship between distance $$x $$ , velocity $$v $$ , and time $$t $$ \:

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

:::

### _RC_ Circuits for Timing

$$\text{RC} $$ circuits are commonly used for timing purposes. A mundane example
of this is found in the ubiquitous intermittent wiper systems of modern cars.
The time between wipes is varied by adjusting the resistance in an $$\text{RC} $$ circuit. Another example of an $$\text{RC} $$ circuit is found in novelty
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

![(a) Left, charging: the lamp has a very high resistance, so current from the source flows through R and charges C. Right, discharging: once the capacitor voltage reaches the lamp threshold, the lamp’s resistance drops and the capacitor discharges through it, lighting it. (b) The capacitor voltage rises along a charging curve to the bulb threshold, then repeatedly drops quickly as the lamp flashes and recharges to the threshold, giving a sawtooth.](../resources/Figure_21_06_04.svg '(a) The lamp in this ( RC ) circuit ordinarily has a very high resistance, so that the battery charges the capacitor as if the lamp were not there. When the voltage reaches a threshold value, a current flows through the lamp that dramatically reduces its resistance, and the capacitor discharges through the lamp as if the battery and charging resistor were not there. Once discharged, the process starts again, with the flash period determined by the ( RC ) constant ( \\tau ). (b) A graph of voltage versus time for this circuit.')
{: #Figure4}

::: example

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

:::

<div class="exercise"  data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>

::: problem {"class":"problem","data-element-type":"check-understanding"}

When is the potential difference across a capacitor an emf?

:::

::: solution {"class":"solution","data-print-placement":"here"}

Only when the current being drawn from or put into the capacitor is zero. Capacitors, like batteries, have internal resistance, so their output voltage is not an emf unless current is zero. This is difficult to measure in practice so we refer to a capacitor’s voltage rather than its emf. But the source of potential difference in a capacitor is fundamental and it is an emf.

:::

</div>

::: interactive {"class":"interactive","data-has-label":"true","data-label":""}

<div class="title">
PhET Explorations: Circuit Construction Kit (DC only)
</div>

An electronics kit in your computer! Build circuits with resistors, light bulbs, batteries, and switches. Take measurements with the realistic ammeter and voltmeter. View the circuit as a schematic diagram, or switch to a life-like view.
{: class="newline"}

<div class="media"  data-alt="circuit construction kit">
<iframe width="660" height="371.4" src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html"></iframe>
</div>

:::

### Section Summary

- An $$\text{RC} $$ circuit is one that has both a resistor and a capacitor.
- The time constant $$\tau $$ for an $$\text{RC} $$ circuit is $$\tau =\text{RC} $$ .
- When an initially uncharged (
  $${V}_{0}=0 $$ at $$t=0 $$ ) capacitor in series with a resistor is charged
  by a DC voltage source, the voltage rises, asymptotically approaching the emf
  of the voltage source; as a function of time,

  <div class="equation" >
   $$V=\text{emf}\left(1-{e}^{-t/\text{RC}}\right)\text{(charging).} $$
  </div>

- Within the span of each time constant $$\tau $$ , the voltage rises by 0.632
  of the remaining value, approaching the final voltage asymptotically.
- If a capacitor with an initial voltage $${V}_{0} $$ is discharged through a
  resistor starting at $$t=0 $$ , then its voltage decreases exponentially as
  given by

  <div class="equation" >
   $$V={V}_{0}{e}^{-t/\text{RC}}\text{(discharging).} $$
  </div>

- In each time constant $$\tau $$ , the voltage falls by 0.368 of its remaining
  initial value, approaching zero asymptotically.

### Conceptual questions

<div class="exercise" data-element-type="conceptual-questions">

::: problem

Regarding the units involved in the relationship  $$\tau =\text{RC} $$ ,
 verify that the units of resistance times capacitance are time, that is,  $$\Omega \cdot F=s $$.

:::

::: solution

**Strategy**

Write each unit in terms of base definitions: resistance $$ R = V/I $$ gives $$ \Omega = \text{V/A} $$; capacitance $$ C = Q/V $$ gives $$ \text{F} = \text{C/V} $$; and current $$ I = Q/t $$ gives $$ \text{A} = \text{C/s} $$.

**Solution**

<div class="equation">
$$ \Omega \cdot \text{F} = \left( \frac{\text{V}}{\text{A}} \right)\left( \frac{\text{C}}{\text{V}} \right) = \frac{\text{C}}{\text{A}} = \frac{\text{C}}{\text{C/s}} = \text{s} $$
</div>

For example, $$ R = 1.00 \text{ k}\Omega $$ and $$ C = 1.00 \ \mu\text{F} $$ give $$ \tau = (1.00 \times 10^{3} \ \Omega)(1.00 \times 10^{-6} \text{ F}) = 1.00 \times 10^{-3} \s $$.

The units of resistance times capacitance are $$ \Omega \cdot \text{F} = (\text{V/A})(\text{C/V}) = \text{C/A} = \text{s} $$, which is time, as required for $$ \tau = RC $$.

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

The  $$\text{RC} $$
 time constant in heart defibrillation is crucial to limiting the time the current flows. If the capacitance in the defibrillation unit is fixed, how would you manipulate resistance in the circuit to adjust the  $$\text{RC} $$
 constant  $$\tau  $$ ?
 Would an adjustment of the applied voltage also be needed to ensure that the current delivered has an appropriate value?

:::

::: solution

**Strategy**

With $$ C $$ fixed, $$ \tau = RC $$ can be changed only through $$ R $$. The initial current when the charged capacitor discharges through the patient is $$ I_0 = V_0/R $$, where $$ R $$ includes the patient and any added resistance. Use a defibrillator with $$ C = 32.0 \ \mu\text{F} $$ charged to $$ 5.00 \text{ kV} $$, and a total resistance of $$ 50.0 \ \Omega $$.

**Solution**

Initially,

<div class="equation">
$$ \tau = RC = (50.0 \ \Omega)(32.0 \times 10^{-6} \text{ F}) = 1.60 \times 10^{-3} \s, \qquad I_0 = \frac{V_0}{R} = \frac{5000 \text{ V}}{50.0 \ \Omega} = 100 \text{ A} $$
</div>

To double the time constant, add series resistance to make $$ R = 100 \ \Omega $$: then $$ \tau = (100 \ \Omega)(32.0 \times 10^{-6} \text{ F}) = 3.20 \times 10^{-3} \s $$. But the initial current falls to $$ (5000 \text{ V})/(100 \ \Omega) = 50.0 \text{ A} $$. To restore $$ 100 \text{ A} $$, the voltage must be raised to

<div class="equation">
$$ V_0 = I_0R = (100 \text{ A})(100 \ \Omega) = 1.00 \times 10^{4} \text{ V} $$
</div>

Likewise, decreasing $$ R $$ shortens $$ \tau $$ but raises the current unless the voltage is lowered.

To adjust $$ \tau $$ with fixed $$ C $$, you would change the resistance in the circuit, increasing $$ R $$ for a longer time constant and decreasing it for a shorter one; yes, the voltage must also be adjusted, because the current $$ V/R $$ changes with $$ R $$ (for example, doubling $$ R $$ from $$ 50.0 \ \Omega $$ to $$ 100 \ \Omega $$ requires doubling the voltage from $$ 5.00 \text{ kV} $$ to $$ 10.0 \text{ kV} $$ to keep $$ 100 \text{ A} $$).

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

When making an ECG measurement, it is important to measure voltage variations over small time intervals. The time is limited by the  $$\text{RC} $$
 constant of the circuit—it is not possible to measure time variations shorter than  $$\text{RC} $$ .
 How would you manipulate  $$R $$  and  $$C $$
 in the circuit to allow the necessary measurements?

:::

::: solution

**Strategy**

The circuit cannot follow changes faster than about one time constant $$ \tau = RC $$. Make $$ \tau $$ much shorter than the fastest features of the ECG, which change over a few milliseconds, by choosing small values of $$ R $$, $$ C $$, or both.

**Solution**

Suppose a circuit has $$ R = 100 \text{ k}\Omega $$ and $$ C = 1.00 \ \mu\text{F} $$:

<div class="equation">
$$ \tau = RC = (1.00 \times 10^{5} \ \Omega)(1.00 \times 10^{-6} \text{ F}) = 0.100 \s $$
</div>

This is far too slow; it would smear out the $$ 0.08\text{-s} $$ QRS spike. Reducing both by a factor of 10, to $$ R = 10.0 \text{ k}\Omega $$ and $$ C = 0.100 \ \mu\text{F} $$, gives

<div class="equation">
$$ \tau = (1.00 \times 10^{4} \ \Omega)(1.00 \times 10^{-7} \text{ F}) = 1.00 \times 10^{-3} \s $$
</div>

which is short enough to follow changes of a few milliseconds.

You would make $$ R $$ and $$ C $$ small, so that the time constant $$ RC $$ is much shorter than the time variations to be measured (for example, $$ 10.0 \text{ k}\Omega $$ and $$ 0.100 \ \mu\text{F} $$ give $$ \tau = 1.00 \text{ ms} $$).

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

Draw two graphs of charge versus time on a capacitor. Draw one for charging an initially uncharged capacitor in series with a resistor, as in the circuit in [[Figure 1]](#Figure1), starting from  $$t=0 $$ .
 Draw the other for discharging a capacitor through a resistor, as in the circuit in [[Figure 2]](#Figure2), starting at  $$\t=0 $$ ,
 with an initial charge  $${Q}_{0} $$ .
 Show at least two intervals of  $$\tau  $$.

:::

::: solution

**Strategy**

Charging from zero follows $$ q = Q(1 - e^{-t/RC}) $$, and discharging follows $$ q = Q_0e^{-t/RC} $$. Evaluate each at $$ t = \tau $$, $$ 2\tau $$, and $$ 3\tau $$, using $$ e^{-1} = 0.368 $$, $$ e^{-2} = 0.135 $$, and $$ e^{-3} = 0.050 $$.

**Solution**

| $$ t $$ | Charging $$ q/Q $$ | Discharging $$ q/Q_0 $$ |
| --- | --- | --- |
| $$ 0 $$ | $$ 0 $$ | $$ 1.000 $$ |
| $$ \tau $$ | $$ 1 - 0.368 = 0.632 $$ | $$ 0.368 $$ |
| $$ 2\tau $$ | $$ 1 - 0.135 = 0.865 $$ | $$ 0.135 $$ |
| $$ 3\tau $$ | $$ 1 - 0.050 = 0.950 $$ | $$ 0.050 $$ |

![Two graphs of charge versus time. Left, charging: the charge rises from zero, reaching 0.632 Q at one time constant and 0.865 Q at two, and approaching Q along a horizontal asymptote. Right, discharging: the charge falls from Q zero, to 0.368 Q zero at one time constant and 0.135 Q zero at two, and approaches zero.](../resources/concept_21_06_q04.svg)

For example, with $$ R = 10.0 \text{ k}\Omega $$, $$ C = 100 \ \mu\text{F} $$, and a $$ 12.0\text{-V} $$ emf, $$ \tau = (1.00 \times 10^{4} \ \Omega)(1.00 \times 10^{-4} \text{ F}) = 1.00 \s $$ and $$ Q = C\,\text{emf} = (1.00 \times 10^{-4} \text{ F})(12.0 \text{ V}) = 1.20 \text{ mC} $$, so the charge is $$ 0.758 \text{ mC} $$ after $$ 1.00 \s $$ and $$ 1.04 \text{ mC} $$ after $$ 2.00 \s $$.

The charging graph rises from zero, steeply at first, through $$ 0.632Q $$ at $$ t = \tau $$ and $$ 0.865Q $$ at $$ t = 2\tau $$, and levels off toward $$ Q $$; the discharging graph falls from $$ Q_0 $$, steeply at first, to $$ 0.368Q_0 $$ at $$ t = \tau $$ and $$ 0.135Q_0 $$ at $$ t = 2\tau $$, and levels off toward zero.

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

When charging a capacitor, as discussed in conjunction with [[Figure 1]](#Figure1), how long does it take for the voltage on the capacitor to reach emf? Is this a problem?

:::

::: solution

**Strategy**

The capacitor voltage while charging is $$ V = \text{emf}(1 - e^{-t/RC}) $$. Find when $$ V = \text{emf} $$, and how close it gets after a few time constants. Use $$ \tau = RC = 1.00 \s $$ and $$ \text{emf} = 12.0 \text{ V} $$.

**Solution**

$$ V = \text{emf} $$ would require $$ e^{-t/RC} = 0 $$, which happens only as $$ t \to \infty $$. In practice the approach is fast:

<div class="equation">
$$ V(5\tau) = (12.0 \text{ V})(1 - e^{-5}) = (12.0 \text{ V})(0.9933) = 11.92 \text{ V} $$
</div>

After $$ 5\tau = 5.00 \s $$ the voltage is within $$ 0.08 \text{ V} $$, or 0.7%, of the emf, and after $$ 10\tau $$ it is within 0.005%.

In principle the capacitor voltage takes an infinite time to reach the emf, but this is not a problem, because after a few time constants it is as close as any measurement can tell (99.3% of the emf, or $$ 11.92 \text{ V} $$ of $$ 12.0 \text{ V} $$, after $$ 5\tau $$).

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

When discharging a capacitor, as discussed in conjunction with [[Figure 2]](#Figure2), how long does it take for the voltage on the capacitor to reach zero? Is this a problem?

:::

::: solution

**Strategy**

While discharging, $$ V = V_0e^{-t/RC} $$. Find when $$ V = 0 $$ and how small $$ V $$ is after a few time constants. Consider both a low-voltage circuit ($$ V_0 = 12.0 \text{ V} $$) and a high-voltage one ($$ V_0 = 10.0 \text{ kV} $$).

**Solution**

$$ V = 0 $$ would require $$ e^{-t/RC} = 0 $$, so in principle it takes an infinite time. After $$ 5\tau $$,

<div class="equation">
$$ V(5\tau) = V_0e^{-5} = 0.00674\,V_0 $$
</div>

For $$ V_0 = 12.0 \text{ V} $$ this is $$ 0.081 \text{ V} $$, which is negligible. For $$ V_0 = 10.0 \text{ kV} $$ it is

<div class="equation">
$$ V(5\tau) = (1.00 \times 10^{4} \text{ V})(0.00674) = 67.4 \text{ V} $$
</div>

which can still give a dangerous shock; it takes about $$ \ln(10\,000\text{ V}/10 \text{ V}) = 6.9 $$ time constants to fall below $$ 10 \text{ V} $$.

In principle the voltage never reaches exactly zero, which is usually not a problem because after a few time constants it is negligible ($$ 0.7\% $$ of $$ V_0 $$ after $$ 5\tau $$); it can be a problem with high-voltage capacitors, where even a small fraction (about $$ 67 \text{ V} $$ of an initial $$ 10 \text{ kV} $$ after $$ 5\tau $$) can still be a shock hazard, so such capacitors must be allowed to discharge for long enough or shorted deliberately.

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

Referring to [[Figure 1]](#Figure1), draw a graph of potential difference across the resistor versus time, showing at least two intervals of  $$\tau  $$ .
 Also draw a graph of current versus time for this situation.

:::

::: solution

**Strategy**

By the loop rule, $$ \text{emf} = V_C + V_R $$ at every instant. Since $$ V_C = \text{emf}(1 - e^{-t/RC}) $$, the resistor's voltage is $$ V_R = \text{emf}\,e^{-t/RC} $$, and the current is $$ I = V_R/R = (\text{emf}/R)e^{-t/RC} $$. Use $$ \text{emf} = 12.0 \text{ V} $$ and $$ R = 10.0 \text{ k}\Omega $$.

**Solution**

![Two graphs for the charging circuit, both decaying exponentials. Left: the potential difference across the resistor falls from the emf at time zero to 0.368 times the emf at one time constant and 0.135 times the emf at two. Right: the current falls from emf over R at time zero to 0.368 and 0.135 of that value at one and two time constants.](../resources/concept_21_06_q07.svg)

At $$ t = 0 $$ the uncharged capacitor has no voltage, so the whole emf is across the resistor: $$ V_R = 12.0 \text{ V} $$ and

<div class="equation">
$$ I_0 = \frac{\text{emf}}{R} = \frac{12.0 \text{ V}}{1.00 \times 10^{4} \ \Omega} = 1.20 \times 10^{-3} \text{ A} $$
</div>

At $$ t = \tau $$: $$ V_R = (12.0 \text{ V})(0.368) = 4.42 \text{ V} $$ and $$ I = (1.20 \text{ mA})(0.368) = 0.442 \text{ mA} $$. At $$ t = 2\tau $$: $$ V_R = (12.0 \text{ V})(0.135) = 1.62 \text{ V} $$ and $$ I = 0.162 \text{ mA} $$.

Both the potential difference across the resistor and the current start at their maximum values ($$ \text{emf} $$ and $$ \text{emf}/R $$, or $$ 12.0 \text{ V} $$ and $$ 1.20 \text{ mA} $$ here) and decay exponentially toward zero, falling to 0.368 of their initial values at $$ t = \tau $$ and 0.135 at $$ t = 2\tau $$; the two graphs have the same shape because $$ I = V_R/R $$.

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

A long, inexpensive extension cord is connected from inside the house to a refrigerator outside. The refrigerator doesn’t run as it should. What might be the problem?

:::

::: solution

**Strategy**

The long cord is in series with the refrigerator, and its two conductors have a total resistance $$ R_{\text{cord}} $$. The voltage drop in the cord, $$ IR_{\text{cord}} $$, reduces the voltage reaching the refrigerator. Take a thin cord whose two conductors have a total resistance of $$ 0.600 \ \Omega $$, a running current of $$ 6.00 \text{ A} $$, and a motor starting current of $$ 30.0 \text{ A} $$ from a $$ 120\text{-V} $$ outlet.

**Solution**

While running:

<div class="equation">
$$ V_{\text{fridge}} = 120 \text{ V} - IR_{\text{cord}} = 120 \text{ V} - (6.00 \text{ A})(0.600 \ \Omega) = 116 \text{ V} $$
</div>

At start-up, when the motor draws a much larger current:

<div class="equation">
$$ V_{\text{fridge}} = 120 \text{ V} - (30.0 \text{ A})(0.600 \ \Omega) = 102 \text{ V} $$
</div>

The motor may not get enough voltage to start, may stall, or may overheat. The cord also dissipates $$ I^2R_{\text{cord}} = (30.0 \text{ A})^2(0.600 \ \Omega) = 540 \text{ W} $$ during start-up, which heats it.

The problem is probably that the long, thin extension cord has enough resistance that the voltage drop across it, especially during the large starting current of the motor, leaves too little voltage for the refrigerator (about $$ 102 \text{ V} $$ instead of $$ 120 \text{ V} $$ in this example).

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

In [[Figure 4]](#Figure4), does the graph indicate the time constant is shorter for discharging than for charging? Would you expect ionized gas to have low resistance? How would you adjust  $$R $$
 to get a longer time between flashes? Would adjusting  $$R $$
 affect the discharge time?

:::

::: solution

**Strategy**

In [[Figure 4]](#Figure4), the capacitor charges through $$ R $$ (the bulb's resistance is high while it is off) and discharges through the bulb once it lights. Compare the two time constants $$ RC $$ and $$ R_{\text{bulb}}C $$. Use $$ C = 10.0 \ \mu\text{F} $$, $$ R = 1.00 \text{ M}\Omega $$, and a lit-bulb resistance of $$ 100 \ \Omega $$.

**Solution**

Yes, the graph shows the voltage rising slowly and dropping almost vertically, so discharging is much faster than charging. Yes, an ionized gas has low resistance, because it contains many free ions and electrons to carry current. With the example values:

<div class="equation">
$$ \tau_{\text{charge}} = RC = (1.00 \times 10^{6} \ \Omega)(1.00 \times 10^{-5} \text{ F}) = 10.0 \s $$
</div>

<div class="equation">
$$ \tau_{\text{discharge}} = R_{\text{bulb}}C = (100 \ \Omega)(1.00 \times 10^{-5} \text{ F}) = 1.00 \times 10^{-3} \s $$
</div>

The time between flashes is the time to recharge from the extinction voltage back to the threshold, which is proportional to $$ RC $$. Doubling $$ R $$ to $$ 2.00 \text{ M}\Omega $$ doubles it. The discharge goes through the bulb, not through $$ R $$, so it is not affected.

Yes, the graph shows a much shorter time constant for discharging (about $$ 1 \text{ ms} $$ compared with $$ 10 \s $$ in this example), consistent with the low resistance of an ionized gas; to get a longer time between flashes you would increase $$ R $$, and this does not affect the discharge time, which depends only on the bulb's resistance and $$ C $$.

:::

</div>

<div class="exercise" data-element-type="conceptual-questions">

::: problem

An electronic apparatus may have large capacitors at high voltage in the power supply section, presenting a shock hazard even when the apparatus is switched off. A “bleeder resistor” is therefore placed across such a capacitor, as shown schematically in [[Figure 5]](#Figure5), to bleed the charge from it after the apparatus is off. Why must the bleeder resistance be much greater than the effective resistance of the rest of the circuit? How does this affect the time constant for discharging the capacitor?

![An electronic circuit, drawn as a box, with a capacitor C and a bleeder resistor R_bl connected in parallel across it.](../resources/Figure_21_06_05.svg 'A bleeder resistor ( R_\\text{bl} ) discharges the capacitor in this electronic device once it is switched off.')
{: #Figure5}

:::

::: solution

**Strategy**

The bleeder resistor is in parallel with the capacitor, so it is connected across the supply voltage the whole time the apparatus is on. Find the current and power it wastes during operation, and the discharge time constant $$ R_{\text{bl}}C $$ after the apparatus is off. Use $$ C = 100 \ \mu\text{F} $$ at $$ 400 \text{ V} $$, a load with effective resistance $$ 2.00 \text{ k}\Omega $$, and $$ R_{\text{bl}} = 200 \text{ k}\Omega $$.

**Solution**

During operation, the bleeder draws

<div class="equation">
$$ I_{\text{bl}} = \frac{V}{R_{\text{bl}}} = \frac{400 \text{ V}}{2.00 \times 10^{5} \ \Omega} = 2.00 \times 10^{-3} \text{ A}, \qquad P_{\text{bl}} = \frac{V^2}{R_{\text{bl}}} = \frac{(400 \text{ V})^2}{2.00 \times 10^{5} \ \Omega} = 0.800 \text{ W} $$
</div>

compared with $$ (400 \text{ V})/(2.00 \text{ k}\Omega) = 0.200 \text{ A} $$ and $$ 80.0 \text{ W} $$ in the circuit itself. Because $$ R_{\text{bl}} \gg R_{\text{circuit}} $$, the bleeder takes only 1% of the current and does not affect the circuit's operation. A bleeder of $$ 2.00 \text{ k}\Omega $$ would waste as much power as the circuit uses.

When the apparatus is off, the capacitor discharges through the bleeder:

<div class="equation">
$$ \tau = R_{\text{bl}}C = (2.00 \times 10^{5} \ \Omega)(1.00 \times 10^{-4} \text{ F}) = 20.0 \s $$
</div>

After about $$ 5\tau = 100 \s $$, the voltage has fallen to $$ (400 \text{ V})e^{-5} = 2.7 \text{ V} $$. A large bleeder resistance thus gives a long discharge time constant, a compromise between wasted power and how long the capacitor stays hazardous.

The bleeder resistance must be much greater than the effective resistance of the rest of the circuit so that it draws only a small fraction of the current and wastes little power while the apparatus is on (about $$ 0.8 \text{ W} $$ compared with $$ 80 \text{ W} $$ in this example); as a result, the time constant $$ R_{\text{bl}}C $$ for discharging the capacitor is relatively long ($$ 20 \s $$ here), so it takes a minute or two to bleed the charge away.

:::

</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">

::: problem

The timing device in an automobile’s intermittent wiper system is based on an  $$\text{RC} $$
 time constant and utilizes a  $$0.500\text{-μF} $$
 capacitor and a variable resistor. Over what range must  $$R $$
 be made to vary to achieve time constants from 2.00 to 15.0 s?

:::

::: solution

 $$\text{range} 4.00 \text{to} 30.0 \text{M}\Omega  $$

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

A heart pacemaker fires 72 times a minute, each time a 25.0-nF capacitor is charged (by a battery in series with a resistor) to 0.632 of its full voltage. What is the value of the resistance?

:::

::: solution

**Strategy**

The capacitor reaches 0.632 of its full voltage after one time constant $$\tau = RC$$. The pacemaker fires 72 times per minute, so the time between firings is the charging time for one time constant. Use this to find the resistance.

**Solution**

Time for one firing cycle:
<div class="equation">
$$t = \frac{60 \text{ s}}{72} = 0.833 \text{ s}$$
</div>

Since the capacitor charges to 0.632 of full voltage in one time constant, $$\tau = t = 0.833 \text{ s}$$.

From $$\tau = RC$$:
<div class="equation">
$$R = \frac{\tau}{C} = \frac{0.833 \text{ s}}{25.0 \times 10^{-9} \text{ F}} = 3.33 \times 10^{7} \text{ Ω} = 33.3 \text{ MΩ}$$
</div>

**Discussion**

The very large resistance (33.3 MΩ) is appropriate for a pacemaker because it needs to charge slowly enough to control the heart rate precisely (72 beats per minute is normal resting heart rate), while using a small capacitor to keep the device compact. The high resistance also minimizes current drain from the battery, extending battery life.

The resistance is 33.3 MΩ.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

The duration of a photographic flash is related to an  $$\text{RC} $$
 time constant, which is  $$0.100 \text{μs} $$
 for a certain camera. (a) If the resistance of the flash lamp is  $$ 0.0400 \Omega  $$
 during discharge, what is the size of the capacitor supplying its energy? (b) What is the time constant for charging the capacitor, if the charging resistance is  $$800 \text{kΩ} $$ ?

:::

::: solution

(a)  $$2.50 \text{μF} $$
(b) 2.00 s

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

A 2.00- and a  $$7.50\text{-μF} $$
 capacitor can be connected in series or parallel, as can a 25.0- and a  $$100 \text{-kΩ} $$
 resistor. Calculate the four  $$\text{RC} $$
 time constants possible from connecting the resulting capacitance and resistance in series.

:::

::: solution

**Strategy**

Find the two possible capacitances (series and parallel) and the two possible resistances (series and parallel). Then calculate all four combinations of $$\tau = RC$$.

**Solution**

**Capacitors:**
- Parallel: $$C_p = C_1 + C_2 = 2.00 \text{ μF} + 7.50 \text{ μF} = 9.50 \text{ μF}$$
- Series: $$\frac{1}{C_s} = \frac{1}{2.00 \text{ μF}} + \frac{1}{7.50 \text{ μF}} = 0.500 \text{ μF}^{-1} + 0.133 \text{ μF}^{-1} = 0.633 \text{ μF}^{-1}$$

  $$C_s = 1.58 \text{ μF}$$

**Resistors:**
- Series: $$R_s = R_1 + R_2 = 25.0 \text{ kΩ} + 100 \text{ kΩ} = 125 \text{ kΩ}$$
- Parallel: $$\frac{1}{R_p} = \frac{1}{25.0 \text{ kΩ}} + \frac{1}{100 \text{ kΩ}} = 0.0400 \text{ kΩ}^{-1} + 0.0100 \text{ kΩ}^{-1} = 0.0500 \text{ kΩ}^{-1}$$

  $$R_p = 20.0 \text{ kΩ}$$

**Four time constants:**

1. $$\tau_{1} = R_s C_p = (125 \times 10^{3} \text{ Ω})(9.50 \times 10^{-6} \text{ F}) = 1.19 \text{ s}$$

2. $$\tau_{2} = R_s C_s = (125 \times 10^{3} \text{ Ω})(1.58 \times 10^{-6} \text{ F}) = 0.198 \text{ s}$$

3. $$\tau_{3} = R_p C_p = (20.0 \times 10^{3} \text{ Ω})(9.50 \times 10^{-6} \text{ F}) = 0.190 \text{ s}$$

4. $$\tau_{4} = R_p C_s = (20.0 \times 10^{3} \text{ Ω})(1.58 \times 10^{-6} \text{ F}) = 0.0316 \text{ s} = 31.6 \text{ ms}$$

**Discussion**

The four time constants span a range from 31.6 ms to 1.19 s—nearly a factor of 40. The longest time constant uses maximum resistance (series) and maximum capacitance (parallel), while the shortest uses minimum resistance (parallel) and minimum capacitance (series). This demonstrates the flexibility of RC circuits for timing applications.

The four time constants are: 1.19 s, 0.198 s, 0.190 s, and 31.6 ms.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

After two time constants, what percentage of the final voltage, emf, is on an initially uncharged capacitor  $$C $$ ,
 charged through a resistance  $$R $$ ?

:::

::: solution

86.5%

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

A  $$500 \text{-Ω} $$
 resistor, an uncharged  $$1.50\text{-μF} $$
 capacitor, and a 6.16-V emf are connected in series. (a) What is the initial current? (b) What is the  $$\text{RC} $$
 time constant? (c) What is the current after one time constant? (d) What is the voltage on the capacitor after one time constant?

:::

::: solution

**Strategy**

Initially, the uncharged capacitor acts like a wire (no voltage across it), so all the emf appears across the resistor. As the capacitor charges, the current decreases exponentially. After one time constant, the voltage reaches 0.632 of the emf, and the current drops to 0.368 of its initial value.

**Solution**

**(a)** Initial current (at $$t = 0$$):
<div class="equation">
$$I_0 = \frac{\text{emf}}{R} = \frac{6.16 \text{ V}}{500 \text{ Ω}} = 0.01232 \text{ A} = 12.3 \text{ mA}$$
</div>

**(b)** Time constant:
<div class="equation">
$$\tau = RC = (500 \text{ Ω})(1.50 \times 10^{-6} \text{ F}) = 7.50 \times 10^{-4} \text{ s} = 0.750 \text{ ms}$$
</div>

**(c)** Current after one time constant:
<div class="equation">
$$I(\tau) = I_0 e^{-1} = 0.368 I_0 = 0.368(12.3 \text{ mA}) = 4.53 \text{ mA}$$
</div>

**(d)** Voltage on capacitor after one time constant:
<div class="equation">
$$V(\tau) = \text{emf}(1 - e^{-1}) = 0.632 \times \text{emf} = 0.632(6.16 \text{ V}) = 3.89 \text{ V}$$
</div>

**Discussion**

The time constant (0.750 ms) is very short, so the capacitor charges quickly. After just one time constant, the capacitor has acquired 63.2% of its final voltage, while the current has dropped to 36.8% of its initial value. The sum of the voltage across the capacitor (3.89 V) and the voltage across the resistor ($$IR = 4.53 \text{ mA} \times 500 \text{ Ω} = 2.27 \text{ V}$$) equals the emf (6.16 V), as required by Kirchhoff's voltage law.

(a) 12.3 mA, (b) 0.750 ms, (c) 4.53 mA, (d) 3.89 V.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

A heart defibrillator being used on a patient has an  $$\text{RC} $$
 time constant of 10.0 ms due to the resistance of the patient and the capacitance of the defibrillator. (a) If the defibrillator has an  $$8.00\text{-μF} $$
 capacitance, what is the resistance of the path through the patient? (You may neglect the capacitance of the patient and the resistance of the defibrillator.) (b) If the initial voltage is 12.0 kV, how long does it take to decline to  $$6.00 \times 10^{2}  \text{V} $$ ?

:::

::: solution

(a)  $$1.25 \text{k}\Omega  $$
(b) 30.0 ms

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

An ECG monitor must have an  $$\text{RC} $$
 time constant less than  $$1.00 \times 10^{2}  \text{μs} $$
 to be able to measure variations in voltage over small time intervals. (a) If the resistance of the circuit (due mostly to that of the patient's chest) is  $$ 1.00 k\Omega  $$ ,
 what is the maximum capacitance of the circuit? (b) Would it be difficult in practice to limit the capacitance to less than the value found in (a)?

:::

::: solution

**Strategy**

The time constant must be less than 100 μs to accurately measure fast voltage changes in the heart. Use $$\tau = RC$$ to find the maximum capacitance, given the resistance.

**Solution**

**(a)** From $$\tau = RC$$:
<div class="equation">
$$C_{\text{max}} = \frac{\tau_{\text{max}}}{R} = \frac{1.00 \times 10^{-4} \text{ s}}{1.00 \times 10^{3} \text{ Ω}} = 1.00 \times 10^{-7} \text{ F} = 100 \text{ nF}$$
</div>

**(b)** No, it would not be difficult to limit the capacitance to less than 100 nF. This is a relatively large capacitance that can be achieved with careful circuit design. The main sources of capacitance in the circuit are:
- Stray capacitance in wiring and components (typically a few pF to a few nF)
- Input capacitance of the measuring device
- Capacitance of electrode-to-skin contact (typically < 10 nF)

By using short leads, proper shielding, and low-capacitance measurement devices, the total circuit capacitance can easily be kept well below 100 nF. Modern ECG monitors routinely achieve much smaller time constants to capture rapid voltage changes during heartbeats.

**Discussion**

The requirement for fast response time ($$\tau < 100 \text{ μs}$$) ensures the ECG can accurately capture the sharp peaks and valleys in the heart's electrical signal, which can change on millisecond timescales. The maximum capacitance of 100 nF is actually quite large for precision measurement circuits. Most modern ECG systems have much smaller capacitances (often < 10 nF), giving time constants well under 10 μs for even better time resolution.

(a) Maximum capacitance is 100 nF. (b) No, this is readily achievable with proper circuit design.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

[[Figure 6]](#Figure6) shows how a bleeder resistor is used to discharge a capacitor after an electronic device is shut off, allowing a person to work on the electronics with less risk of shock. (a) What is the time constant? (b) How long will it take to reduce the voltage on the capacitor to 0.250% (5% of 5%) of its full value once discharge begins? (c) If the capacitor is charged to a voltage  $${V}_{0} $$
 through a  $$100 \text{-Ω} $$
 resistance, calculate the time it takes to rise to  $$ 0.865{V}_{0} $$
 (This is about two time constants.)

![An electronic circuit, a capacitor C = 80 microfarads and a resistor R = 250 kilohms are connected in parallel. A switch on the top wire, between the electronic circuit and the capacitor, disconnects them.](../resources/Figure_21_06_07.svg ' ')
{: #Figure6}

:::

::: solution

(a) 20.0 s

(b) 120 s

(c) 16.0 ms

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

Using the exact exponential treatment, find how much time is required to discharge a  $$250 \text{-μF} $$
 capacitor through a  $$500 \text{-Ω} $$
 resistor down to 1.00% of its original voltage.

:::

::: solution

**Strategy**

Use the exponential discharge formula $$V = V_0 e^{-t/RC}$$ and solve for the time when $$V = 0.0100\text{ V}_0$$.

**Solution**

From $$V = V_0 e^{-t/RC}$$, when $$V = 0.0100\text{ V}_0$$:
<div class="equation">
$$0.0100 V_0 = V_0 e^{-t/RC}$$
</div>

<div class="equation">
$$0.0100 = e^{-t/RC}$$
</div>

Taking natural logarithm of both sides:
<div class="equation">
$$\ln(0.0100) = -\frac{t}{RC}$$
</div>

<div class="equation">
$$t = -RC \ln(0.0100) = RC \ln(100)$$
</div>

Calculate $$RC$$:
<div class="equation">
$$RC = (500 \text{ Ω})(250 \times 10^{-6} \text{ F}) = 0.125 \text{ s}$$
</div>

<div class="equation">
$$t = (0.125 \text{ s}) \ln(100) = (0.125 \text{ s})(4.605) = 0.576 \text{ s}$$
</div>

**Discussion**

The time required (0.576 s) is 4.6 time constants (since $$\ln(100) = 4.605$$). This makes sense: each time constant reduces the voltage by a factor of $$e \approx 2.718$$, so we need about 4.6 time constants to reduce it by a factor of 100. The exact exponential formula is necessary here rather than the approximation method of multiplying by 0.368 repeatedly.

The time required is 0.576 s (or 576 ms).

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

Using the exact exponential treatment, find how much time is required to charge an initially uncharged 100-pF capacitor through a  $$ 75.0\text{-M}\Omega  $$
 resistor to 90.0% of its final voltage.

:::

::: solution

**Strategy**

Use $$V = V_0(1 - e^{-t/RC})$$ and solve for $$t$$ when $$V = 0.900\text{ V}_0$$.

**Solution**

From $$V = V_0(1 - e^{-t/RC})$$, when $$V = 0.900\text{ V}_0$$:
<div class="equation">
$$0.900 = 1 - e^{-t/RC}$$
</div>

<div class="equation">
$$e^{-t/RC} = 0.100$$
</div>

<div class="equation">
$$t = -RC \ln(0.100) = RC \ln(10)$$
</div>

Calculate $$RC$$:
<div class="equation">
$$RC = (75.0 \times 10^{6} \text{ Ω})(100 \times 10^{-12} \text{ F}) = 7.50 \times 10^{-3} \text{ s}$$
</div>

<div class="equation">
$$t = (7.50 \times 10^{-3} \text{ s}) \ln(10) = (7.50 \times 10^{-3} \text{ s})(2.303) = 1.73 \times 10^{-2} \text{ s}$$
</div>

**Discussion**

The time required (17.3 ms) is 2.30 time constants. This makes sense since $$\ln(10) = 2.303$$. The capacitor charges to 63.2% in one time constant and 90% in 2.30 time constants, demonstrating the logarithmic nature of RC charging.

The time required is $$1.73 \times 10^{-2}$$ s or 17.3 ms.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

**Integrated Concepts**

If you wish to take a picture of a bullet traveling at 500 m/s, then a very
brief flash of light produced by an $$\text{RC} $$ discharge through a flash
tube can limit blurring. Assuming 1.00 mm of motion during one $$\text{RC} $$
constant is acceptable, and given that the flash is driven by a $$600 \text{-μF} $$

capacitor, what is the resistance in the flash tube?

:::

::: solution

 $$ 3.33 \times 10^{-3}  \Omega  $$

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

**Integrated Concepts**

A flashing lamp in a Christmas earring is based on an $$\text{RC} $$ discharge
of a capacitor through its resistance. The effective duration of the flash is
0.250 s, during which it produces an average 0.500 W from an average 3.00 V. (a)
What energy does it dissipate? (b) How much charge moves through the lamp? (c)
Find the capacitance. (d) What is the resistance of the lamp?

:::

::: solution

**Strategy**

Use the average values over the flash. The energy is $$ E = Pt $$. The average current is $$ I = P/V $$, and the charge is $$ Q = It $$. The capacitance follows from $$ C = Q/V $$ and the lamp's resistance from $$ R = V/I $$.

**Solution**

**(a)**

<div class="equation">
$$ E = Pt = (0.500 \text{ W})(0.250 \s) = 0.125 \J $$
</div>

**(b)**

<div class="equation">
$$ I = \frac{P}{V} = \frac{0.500 \text{ W}}{3.00 \text{ V}} = 0.167 \text{ A}, \qquad Q = It = (0.167 \text{ A})(0.250 \s) = 4.17 \times 10^{-2} \text{ C} $$
</div>

**(c)**

<div class="equation">
$$ C = \frac{Q}{V} = \frac{4.17 \times 10^{-2} \text{ C}}{3.00 \text{ V}} = 1.39 \times 10^{-2} \text{ F} $$
</div>

**(d)**

<div class="equation">
$$ R = \frac{V}{I} = \frac{3.00 \text{ V}}{0.167 \text{ A}} = 18.0 \ \Omega $$
</div>

**Discussion**

As a check, $$ RC = (18.0 \ \Omega)(1.39 \times 10^{-2} \text{ F}) = 0.250 \s $$, equal to the flash duration, consistent with treating the effective duration of the discharge as one time constant. A $$ 13.9\text{-mF} $$ capacitor is large but available in small sizes at a few volts.

(a) The lamp dissipates $$ 0.125 \J $$. (b) A charge of $$ 4.17 \times 10^{-2} \text{ C} $$ moves through the lamp. (c) The capacitance is $$ 1.39 \times 10^{-2} \text{ F} $$. (d) The lamp's resistance is $$ 18.0 \ \Omega $$.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

**Integrated Concepts**

A $$160 \text{-μF} $$ capacitor charged to 450 V is discharged through a
$$31.2\text{-k}\Omega $$ resistor. (a) Find the time constant. (b) Calculate the
temperature increase of the resistor, given that its mass is 2.50 g and its
specific heat is $$ 1.67\frac{\text{kJ}}{\text{kg} \cdot \text{ºC}} $$ , noting
that most of the thermal energy is retained in the short time of the
discharge. (c) Calculate the new resistance, assuming it is pure carbon. (d)
Does this change in resistance seem significant?

:::

::: solution

(a) 4.99 s

(b)  $$3.87\text{ºC} $$
(c)  $$31.1 \text{k}\Omega $$
(d) No

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

**Unreasonable Results**

(a) Calculate the capacitance needed to get an $$\text{RC} $$ time constant of
$$1.00 \times 10^{3} \text{s} $$ with a $$0.100\text{-Ω} $$ resistor. (b) What
is unreasonable about this result? (c) Which assumptions are responsible?

:::

::: solution

**Strategy**

Solve $$ \tau = RC $$ for $$ C $$ and compare the result with the capacitances of ordinary capacitors, which range from picofarads to millifarads.

**Solution**

**(a)**

<div class="equation">
$$ C = \frac{\tau}{R} = \frac{1.00 \times 10^{3} \s}{0.100 \ \Omega} = 1.00 \times 10^{4} \text{ F} $$
</div>

**(b)** A capacitance of $$ 10\,000 \text{ F} $$ is enormous. Even large supercapacitors are a few thousand farads, and ordinary capacitors are many orders of magnitude smaller; such a device would be impractically large.

**(c)** The assumptions responsible are the combination of a very long time constant and a very small resistance. For a long time constant, use a large resistance: with $$ R = 1.00 \text{ G}\Omega $$, $$ C = (1.00 \times 10^{3} \s)/(1.00 \times 10^{9} \ \Omega) = 1.00 \ \mu\text{F} $$, an ordinary value.

**Discussion**

Since $$ \tau $$ depends on the product $$ RC $$, a time constant of over 16 minutes is easily obtained with a large resistor and an ordinary capacitor, not with a $$ 0.100\text{-}\Omega $$ resistor.

(a) The required capacitance is $$ 1.00 \times 10^{4} \text{ F} $$. (b) That capacitance is unreasonably large. (c) The very small resistance, combined with the long time constant, is responsible.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

**Construct Your Own Problem**

Consider a camera’s flash unit. Construct a problem in which you calculate the
size of the capacitor that stores energy for the flash lamp. Among the things to
be considered are the voltage applied to the capacitor, the energy needed in the
flash and the associated charge needed on the capacitor, the resistance of the
flash lamp during discharge, and the desired $$\text{RC} $$ time constant.

:::

::: solution

**Strategy**

The energy for the flash is stored in the capacitor, $$ E = \frac{1}{2}CV^2 $$, so the voltage and energy determine $$ C $$. The charge is $$ Q = CV $$. The flash lamp's resistance and $$ C $$ set the discharge time constant $$ \tau = RC $$, which should equal the desired flash duration.

**Sample Problem Construction**

A camera flash capacitor is charged to $$ 300 \text{ V} $$ and must deliver $$ 5.00 \J $$ to the flash lamp. The flash should last about $$ 1.00 \text{ ms} $$ (one time constant). (a) What capacitance is needed? (b) What charge is stored on it? (c) What resistance must the lamp (plus any series resistance) have during discharge? (d) What is the initial current through the lamp?

**Solution**

**(a)**

<div class="equation">
$$ C = \frac{2E}{V^2} = \frac{2(5.00 \J)}{(300 \text{ V})^2} = 1.11 \times 10^{-4} \text{ F} = 111 \ \mu\text{F} $$
</div>

**(b)**

<div class="equation">
$$ Q = CV = (1.11 \times 10^{-4} \text{ F})(300 \text{ V}) = 3.33 \times 10^{-2} \text{ C} $$
</div>

**(c)**

<div class="equation">
$$ R = \frac{\tau}{C} = \frac{1.00 \times 10^{-3} \s}{1.11 \times 10^{-4} \text{ F}} = 9.00 \ \Omega $$
</div>

**(d)**

<div class="equation">
$$ I_0 = \frac{V}{R} = \frac{300 \text{ V}}{9.00 \ \Omega} = 33.3 \text{ A} $$
</div>

**Discussion**

The capacitor stores the energy slowly, being charged from a small battery over a few seconds, and then releases it in about a millisecond. That gives a peak power of roughly $$ (300 \text{ V})(33.3 \text{ A}) = 1.0 \times 10^{4} \text{ W} $$, far more than the battery could supply directly. Real flash lamps have resistances of a few ohms once the gas is ionized, consistent with the value found. In practice the lamp delivers somewhat less than $$ 5.00 \J $$ as light, since some energy is lost as heat.

:::

</div>

<div class="exercise" data-element-type="problems-exercises">

::: problem

**Construct Your Own Problem**

Consider a rechargeable lithium cell that is to be used to power a camcorder.
Construct a problem in which you calculate the internal resistance of the cell
during normal operation. Also, calculate the minimum voltage output of a battery
charger to be used to recharge your lithium cell. Among the things to be
considered are the emf and useful terminal voltage of a lithium cell and the
current it should be able to supply to a camcorder.

:::

::: solution

**Strategy**

When the cell supplies current, its terminal voltage is $$ V = \text{emf} - Ir $$, so measuring $$ V $$ and $$ I $$ gives $$ r $$. When it is being charged, current is forced into the positive terminal, so the charger must supply $$ V = \text{emf} + Ir $$.

**Sample Problem Construction**

A lithium-ion cell has an emf of $$ 3.70 \text{ V} $$. While running a camcorder, it supplies $$ 0.750 \text{ A} $$ with a terminal voltage of $$ 3.55 \text{ V} $$. (a) What is the cell's internal resistance? (b) How much power is wasted inside the cell? (c) The cell is recharged at $$ 1.00 \text{ A} $$, and its emf rises to $$ 4.20 \text{ V} $$ when fully charged. What is the minimum output voltage the charger must provide?

**Solution**

**(a)**

<div class="equation">
$$ r = \frac{\text{emf} - V}{I} = \frac{3.70 \text{ V} - 3.55 \text{ V}}{0.750 \text{ A}} = 0.200 \ \Omega $$
</div>

**(b)**

<div class="equation">
$$ P = I^2 r = (0.750 \text{ A})^2(0.200 \ \Omega) = 0.113 \text{ W} $$
</div>

compared with the $$ (3.55 \text{ V})(0.750 \text{ A}) = 2.66 \text{ W} $$ delivered to the camcorder.

**(c)** At the end of charging, the charger must exceed the cell's emf by the drop across the internal resistance:

<div class="equation">
$$ V_{\text{charger}} = \text{emf} + Ir = 4.20 \text{ V} + (1.00 \text{ A})(0.200 \ \Omega) = 4.40 \text{ V} $$
</div>

**Discussion**

About 4% of the cell's output is lost inside it during use. A charger supplying less than $$ 4.40 \text{ V} $$ could not push $$ 1.00 \text{ A} $$ into the cell near full charge. Real lithium-cell chargers regulate the voltage carefully near the end of charging, because overcharging a lithium cell is a fire hazard.

:::

</div>

::: glossary

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

:::
