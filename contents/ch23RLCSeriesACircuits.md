---
title: RLC Series AC Circuits
layout: page
sectionNumber: 12
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Calculate the impedance, phase angle, resonant frequency, power, power factor, voltage, and/or current in a RLC series circuit.
* Draw the circuit diagram for an RLC series circuit.
* Explain the significance of the resonant frequency.
</div>

### Impedance

When alone in an AC circuit, inductors, capacitors, and resistors all impede
current. How do they behave when all three occur together? Interestingly, their
individual resistances in ohms do not simply add. Because inductors and
capacitors behave in opposite ways, they partially to totally cancel each
other’s effect. [[Figure 1]](#Figure1) shows an *RLC*series circuit with
an AC voltage source, the behavior of which is the subject of this section. The
crux of the analysis of an _RLC_ circuit is the frequency dependence of $${X}_ {L} $$ and $${X}_{C} $$ , and the effect they have on the phase of voltage
versus current (established in the preceding section). These give rise to the
frequency dependence of the circuit, with important “resonance” features that
are the basis of many applications, such as radio tuners.

![The figure describes an R LC series circuit. It shows a resistor R connected in series with an inductor L, connected to a capacitor C in series to an A C source V. The voltage of the A C source is given by V equals V zero sine two pi f t. The voltage across R is V R, across L is V L and across C is V C.](../resources/Figure_23_12_01.jpg 'An RLC series circuit with an AC voltage source.')
{: #Figure1}

The combined effect of resistance $$R $$ , inductive reactance $${X}_{L} $$ ,
and capacitive reactance $${X}_{C} $$ is defined to be **impedance**{: class="
term"}, an AC analogue to resistance in a DC circuit. Current, voltage, and
impedance in an _RLC_ circuit are related by an AC version of Ohm’s law:

<div class="equation" >
 $${I}_{0}=\frac{ {V}_{0}}{Z} \text{ or } {I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}\text{.} $$
</div>

Here $${I}_{0} $$ is the peak current, $${V}_{0} $$ the peak source voltage, and
$$Z $$ is the impedance of the circuit. The units of impedance are ohms, and its
effect on the circuit is as you might expect: the greater the impedance, the
smaller the current. To get an expression for $$Z $$ in terms of $$R $$ , $${X}_ {L} $$ , and $${X}_{C} $$ , we will now examine how the voltages across the
various components are related to the source voltage. Those voltages are labeled
$${V}_{R} $$ , $${V}_{L} $$ , and $${V}_{C} $$ in [[Figure 1]](#Figure1).

Conservation of charge requires current to be the same in each part of the
circuit at all times, so that we can say the currents in $$R $$ , $$L $$ , and
$$C $$ are equal and in phase. But we know from the preceding section that the
voltage across the inductor $${V}_{L} $$ leads the current by one-fourth of a
cycle, the voltage across the capacitor $${V}_{C} $$ follows the current by
one-fourth of a cycle, and the voltage across the resistor $${V}_{R} $$ is
exactly in phase with the current. [[Figure 2]](#Figure2) shows these
relationships in one graph, as well as showing the total voltage around the
circuit $$V={V}_{R}+{V}_{L}+{V}_{C} $$ , where all four voltages are the
instantaneous values. According to Kirchhoff’s loop rule, the total voltage
around the circuit $$V $$ is also the voltage of the source.

You can see from [[Figure 2]](#Figure2) that while $${V}_{R} $$ is in phase with
the current, $${V}_{L} $$ leads by $$90 ^\circ $$ , and $${V}_{C} $$ follows
by $$90 ^\circ $$ . Thus $${V}_{L} $$ and $${V}_{C} $$ are $$180 ^\circ $$
out of phase (crest to trough) and tend to cancel, although not completely
unless they have the same magnitude. Since the peak voltages are not aligned (
not in phase), the peak voltage $${V}_{0} $$ of the source does _not_ equal the
sum of the peak voltages across $$R $$ , $$L $$ , and $$C $$ . The actual
relationship is

<div class="equation" >
 $${V}_{0}=\sqrt{ {V}_{0R}^{2}+{\left( {V}_{0L}-{V}_{0C} \right)}^{2}}, $$
</div>

where $${V}_{0R} $$ , $${V}_{0L} $$ , and $${V}_{0C} $$ are the peak voltages
across $$R $$ , $$L $$ , and $$C $$ , respectively. Now, using Ohm’s law and
definitions
from [Reactance, Inductive and Capacitive](../contents/ch23ReactanceInductiveAndCapacitive),
we substitute $${V}_{0}={I}_{0}Z $$ into the above, as well as $${V}_{0R}={I}_ {0}R $$ , $${V}_
{0L}={I}_{0}{X}_{L} $$ , and $${V}_{0C}={I}_{0}{X}_{C} $$, yielding <div class="equation" > $${I}_{0}Z=\sqrt{ {I}_{0}^{ 2}{R}^{2}+{\left( {I}_{0}{X}_{L}-{I}_{0}{X}_{C} \right)}^{2}}={I}_{0}\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}\text{.} $$
</div>

$${I}_{0} $$ cancels to yield an expression for $$Z $$ \:

<div class="equation" >
 $$Z=\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}\text{,} $$
</div>

which is the impedance of an _RLC_ series AC circuit. For circuits without a
resistor, take $$R=0 $$ ; for those without an inductor, take $${X}_{L}=0 $$ ;
and for those without a capacitor, take $${X}_{C}=0 $$.

![The figure shows graphs showing the relationships of the voltages in an RLC circuit to the current. It has five graphs on the left and two graphs on the right. The first graph on the right is for current I versus time t. Current is plotted along Y axis and time is along X axis. The curve is a smooth progressive sine wave. The second graph is on the right is for voltage V R versus time t. Voltage V R is plotted along Y axis and time is along X axis. The curve is a smooth progressive sine wave. The third graph is on the right is for voltage V L versus time t. Voltage V L is plotted along Y axis and time is along X axis. The curve is a smooth progressive cosine wave. The fourth graph is on the right is for voltage V C versus time t. Voltage V C is plotted along Y axis and time t is along X axis. The curve is a smooth progressive cosine wave starting from negative Y axis. The fifth graph shows the voltage V verses time t for the R L C circuit. Voltage V is plotted along Y axis and time t is along X axis. The curve is a smooth progressive sine wave starting from a point near to origin on negative X axis. The first and the fifth graphs are again shown on the right and their amplitudes and phases compared. The current graph is shown to have a lesser amplitude.](../resources/Figure_23_12_02.jpg 'This graph shows the relationships of the voltages in an RLC circuit to the current. The voltages across the circuit elements add to equal the voltage of the source, which is seen to be out of phase with the current.')
{: #Figure2}

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating Impedance and Current
</div>
An *RLC* series circuit has a  $$40.0 \text{Ω} $$
 resistor, a 3.00 mH inductor, and a  $$5.00 \text{μF} $$
 capacitor. (a) Find the circuit’s impedance at 60.0 Hz and 10.0 kHz, noting that these frequencies and the values for  $$L $$
 and  $$C $$
 are the same as in [[Example 1]](../contents/ch23ReactanceInductiveAndCapacitive#Example1) and [[Example 2]](../contents/ch23ReactanceInductiveAndCapacitive#Example2). (b) If the voltage source has  $${V}_{\text{rms}}=120 \text{V} $$ ,
 what is  $${I}_{\text{rms}} $$
 at each frequency?

**Strategy**

For each frequency, we use $$Z=\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right) }^{2}} $$ to find the impedance and then Ohm’s law to find current. We can take
advantage of the results of the previous two examples rather than calculate the
reactances again.

**Solution for (a)**

At 60.0 Hz, the values of the reactances were found
in [[Example 1]](../contents/ch23ReactanceInductiveAndCapacitive#Example1) to be $${X}_ {L}= 1.13 \Omega $$ and
in [[Example 2]](../contents/ch23ReactanceInductiveAndCapacitive#Example2) to be $${X}_ {C}=531 \Omega $$ . Entering these and the given $$40.0 \text{Ω} $$ for
resistance into $$Z=\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}} $$
yields

<div class="equation" >
 $$\begin{array}{lll}Z& =& \sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}\\ & =& \sqrt{ {\left(  40.0 \Omega  \right)}^{2}+{\left(  1.13 \Omega -531 \Omega  \right)}^{2}}\\ & =& 531 \Omega \text{ at} 60. \text{Hz}\text{.}\end{array} $$
</div>
Similarly, at 10.0 kHz,  $${X}_{L}=188 \Omega  $$
 and  $${X}_{C}= 3.18 \Omega  $$ ,
 so that

<div class="equation" >
 $$\begin{array}{lll}Z& =& \sqrt{ {\left(  40.0 \Omega  \right)}^{2}+{\left( 188 \Omega  -3.18 \Omega  \right)}^{2}}\\ & =& 190 \Omega \text{ at } 10.0 \text{kHz} \text{.} \end{array} $$
</div>
**Discussion for (a)**

In both cases, the result is nearly the same as the largest value, and the
impedance is definitely not the sum of the individual values. It is clear that
$${X}_{L} $$ dominates at high frequency and $${X}_{C} $$ dominates at low
frequency.

**Solution for (b)**

The current $${I}_{\text{rms}} $$ can be found using the AC version of Ohm’s law
in Equation $${I}_{\text{rms}}={V}_{\text{rms}}/Z $$ \:

$$ {I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}=\frac{120 \text{V}}{531 \Omega }= 0.226 \text{A} $$ at 60.0 Hz

Finally, at 10.0 kHz, we find

$${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}=\frac{120 \text{V}}{190 \Omega }= 0.633 \text{A} $$ at 10.0 kHz

**Discussion for (a)**

The current at 60.0 Hz is the same (to three digits) as found for the capacitor
alone in [[Example 2]](../contents/ch23ReactanceInductiveAndCapacitive#Example2). The
capacitor dominates at low frequency. The current at 10.0 kHz is only slightly
different from that found for the inductor alone
in [[Example 1]](../contents/ch23ReactanceInductiveAndCapacitive#Example1). The
inductor dominates at high frequency.

</div>

### Resonance in *RLC* Series AC Circuits

How does an *RLC* circuit behave as a function of the frequency of the driving
voltage source? Combining Ohm’s law, $${I}_{\text{rms}}={V}_{\text{rms}}/Z $$ ,
and the expression for impedance $$Z $$ from $$Z=\sqrt{ {R}^{2}+{\left( {X}_ {L}-{X}_{C} \right)}^{2}} $$ gives

<div class="equation" >
 $${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}}\text{.} $$
</div>

The reactances vary with frequency, with $${X}_{L} $$ large at high frequencies
and $${X}_{C} $$ large at low frequencies, as we have seen in three previous
examples. At some intermediate frequency $${f}_{0} $$ , the reactances will be
equal and cancel, giving $$Z=R $$ —this is a minimum value for impedance, and a
maximum value for $${I}_{\text{rms}} $$ results. We can get an expression for
$${f}_{0} $$ by taking

<div class="equation" >
 $${X}_{L}={X}_{C}\text{.} $$
</div>

Substituting the definitions of $${X}_{L} $$ and $${X}_{C} $$ ,

<div class="equation" >
 $$2\pi f_{0}L=\frac{1}{2\pi f_{0}C}\text{.} $$
</div>

Solving this expression for $${f}_{0} $$ yields

<div class="equation" >
 $${f}_{0}=\frac{1}{2\pi \sqrt{\text{LC}}}\text{,} $$
</div>

where $${f}_{0} $$ is the **resonant frequency** of an *RLC* series circuit.
This is also the *natural frequency* at which the circuit would oscillate if not
driven by the voltage source. At $${f}_{0} $$ , the effects of the inductor and
capacitor cancel, so that $$Z=R $$ , and $${I}_{\text{rms}} $$ is a maximum.

Resonance in AC circuits is analogous to mechanical resonance, where resonance
is defined to be a forced oscillation—in this case, forced by the voltage
source—at the natural frequency of the system. The receiver in a radio is an *
RLC* circuit that oscillates best at its $${f}_{0} $$ . A variable capacitor is
often used to adjust $${f}_{0} $$ to receive a desired frequency and to reject
others. [[Figure 3]](#Figure3) is a graph of current as a function of frequency,
illustrating a resonant peak in $${I}_{\text{rms}} $$ at $${f}_{0} $$ . The two
curves are for two different circuits, which differ only in the amount of
resistance in them. The peak is lower and broader for the higher-resistance
circuit. Thus the higher-resistance circuit does not resonate as strongly and
would not be as selective in a radio receiver, for example.

![The figure describes a graph of current I versus frequency f. Current I r m s is plotted along Y axis and frequency f is plotted along X axis. Two curves are shown. The upper curve is for small resistance and lower curve is for large resistance. Both the curves have a smooth rise and a fall. The peaks are marked for frequency f zero. The curve for smaller resistance has a higher value of peak than the curve for large resistance.](../resources/Figure_23_12_03.jpg "A graph of current versus frequency for two RLC series circuits differing only in the amount of resistance. Both have a resonance at \( f_{0} \) , but that for the higher resistance is lower and broader. The driving AC voltage source has a fixed amplitude \( V_{0} \) .")
{: #Figure3}

<div id="Example2" class="example" markdown="1">
<div class="title">
Calculating Resonant Frequency and Current
</div>
For the same *RLC* series circuit having a  $$40.0 \text{Ω} $$
 resistor, a 3.00 mH inductor, and a  $$5.00 \text{μF} $$
 capacitor: (a) Find the resonant frequency. (b) Calculate  $${I}_{\text{rms}} $$
 at resonance if  $${V}_{\text{rms}} $$
 is 120 V.

**Strategy**

The resonant frequency is found by using the expression in $${f}_ {0}=\frac{1}{2\pi \sqrt{\text{LC}}} $$ . The current at that frequency is the
same as if the resistor alone were in the circuit.

**Solution for (a)**

Entering the given values for $$L $$ and $$C $$ into the expression given for
$${f}_{0} $$ in $${f}_{0}=\frac{1}{2\pi \sqrt{\text{LC}}} $$ yields

<div class="equation" >
 $$\begin{array}{lll}{f}_{0}& =& \frac{1}{2\pi \sqrt{\text{LC}}}\\ & =& \frac{1}{2\pi \sqrt{\left( 3.00 \times 10^{-3}  \text{H}\right)\left( 5.00 \times 10^{-6}  \text{F}\right)}}= 1.30 \text{kHz}\text{.}\end{array} $$
</div>
**Discussion for (a)**

We see that the resonant frequency is between 60.0 Hz and 10.0 kHz, the two
frequencies chosen in earlier examples. This was to be expected, since the
capacitor dominated at the low frequency and the inductor dominated at the high
frequency. Their effects are the same at this intermediate frequency.

**Solution for (b)**

The current is given by Ohm’s law. At resonance, the two reactances are equal
and cancel, so that the impedance equals the resistance alone. Thus,

<div class="equation" >
 $${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}=\frac{120 \text{V}}{ 40.0  \Omega }= 3.00 \text{A} \text{.}  $$
</div>
**Discussion for (b)**

At resonance, the current is greater than at the higher and lower frequencies
considered for the same circuit in the preceding example.

</div>

### Power in *RLC* Series AC Circuits

If current varies with frequency in an *RLC* circuit, then the power delivered
to it also varies with frequency. But the average power is not simply current
times voltage, as it is in purely resistive circuits. As was seen
in [[Figure 2]](#Figure2), voltage and current are out of phase in an *RLC* circuit. There is a **phase angle**  $$\varphi $$ between the source voltage $$V $$ and the current $$I $$ , which can be found from

<div class="equation" >
 $$\cos \varphi =\frac{R}{Z}\text{.} $$
</div>

For example, at the resonant frequency or in a purely resistive circuit $$Z=R $$
, so that $$\cos \varphi =1 $$ . This implies that $$\varphi =0º $$ and that
voltage and current are in phase, as expected for resistors. At other
frequencies, average power is less than at resonance. This is both because
voltage and current are out of phase and because $${I}_{\text{rms}} $$ is lower.
The fact that source voltage and current are out of phase affects the power
delivered to the circuit. It can be shown that the **average power** is

<div class="equation" >
 $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}}\cos \varphi , $$
</div>

Thus $$\cos \varphi $$ is called the **power factor**, which can range from 0 to

1. Power factors near 1 are desirable when designing an efficient motor, for
   example. At the resonant frequency, $$\cos \varphi =1 $$.

<div id="Example3" class="example" markdown="1">
<div class="title">
Calculating the Power Factor and Power
</div>
For the same *RLC* series circuit having a  $$40.0 \Omega  $$
 resistor, a 3.00 mH inductor, a  $$5.00 \text{μF} $$
 capacitor, and a voltage source with a  $${V}_{\text{rms}} $$
 of 120 V: (a) Calculate the power factor and phase angle for  $$f= 60.0\text{Hz} $$ .
 (b) What is the average power at 60.0 Hz? (c) Find the average power at the circuit's resonant frequency.

**Strategy and Solution for (a)**

The power factor at 60.0 Hz is found from

<div class="equation" >
 $$\cos \varphi =\frac{R}{Z}\text{.} $$
</div>
We know  $$Z= 531 \text{ Ω} $$
 from [[Example 1]](#Example1), so that

<div class="equation" >
 $$\cos \varphi =\frac{ 40.0 \Omega }{531 \Omega }=0.0753 \text{at}  60.0 \text{Hz} \text{.}  $$
</div>
This small value indicates the voltage and current are significantly out of phase. In fact, the phase angle is

<div class="equation" >
 $$\varphi ={\cos}^{-1}  0.0753=85.7 \text{º at 60.0 Hz.} $$
</div>
**Discussion for (a)**

The phase angle is close to $$90 ^\circ $$ , consistent with the fact that the
capacitor dominates the circuit at this low frequency (a pure *RC* circuit has
its voltage and current $$90 ^\circ $$ out of phase).

**Strategy and Solution for (b)**

The average power at 60.0 Hz is

<div class="equation" >
 $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}}\cos \varphi . $$
</div>
 $${I}_{\text{rms}} $$
 was found to be 0.226 A in [[Example 1]](#Example1). Entering the known values gives

<div class="equation" >
 $${P}_{\text{ave}}=\left( 0.226 \text{A}\right)\left(120 \text{V}\right)\left( 0.0753\right)= 2.04 \text{W at 60.0 Hz.} $$
</div>
**Strategy and Solution for (c)**

At the resonant frequency, we know $$\cos \varphi =1 $$ , and $${I}_{\text{rms}} $$ was found to be 3.00 A in [[Example 2]](#Example2). Thus,

$${P}_{\text{ave}}=\left( 3.00 \text{A}\right)\left(120 \text{V}\right)\left( 1\right)=360 \text{W} $$ at resonance (1.30 kHz)

**Discussion**

Both the current and the power factor are greater at resonance, producing
significantly greater power than at higher and lower frequencies.

</div>

Power delivered to an *RLC* series AC circuit is dissipated by the resistance
alone. The inductor and capacitor have energy input and output but do not
dissipate it out of the circuit. Rather they transfer energy back and forth to
one another, with the resistor dissipating exactly what the voltage source puts
into the circuit. This assumes no significant electromagnetic radiation from the
inductor and capacitor, such as radio waves. Such radiation can happen and may
even be desired, as we will see in the next chapter on electromagnetic
radiation, but it can also be suppressed as is the case in this chapter. The
circuit is analogous to the wheel of a car driven over a corrugated road as
shown in [[Figure 4]](#Figure4). The regularly spaced bumps in the road are
analogous to the voltage source, driving the wheel up and down. The shock
absorber is analogous to the resistance damping and limiting the amplitude of
the oscillation. Energy within the system goes back and forth between kinetic (
analogous to maximum current, and energy stored in an inductor) and potential
energy stored in the car spring (analogous to no current, and energy stored in
the electric field of a capacitor). The amplitude of the wheels’ motion is a
maximum if the bumps in the road are hit at the resonant frequency.

![The figure describes the path of motion of a wheel of a car. The front wheel of a car is shown. A shock absorber attached to the wheel is also shown. The path of motion is shown as vertically up and down.](../resources/Figure_23_12_04.jpg "The forced but damped motion of the wheel on the car spring is analogous to an RLC series AC circuit. The shock absorber damps the motion and dissipates energy, analogous to the resistance in an RLC circuit. The mass and spring determine the resonant frequency.")
{: #Figure4}

A pure *LC* circuit with negligible resistance oscillates at $${f}_{0} $$ , the
same resonant frequency as an *RLC* circuit. It can serve as a frequency
standard or clock circuit—for example, in a digital wristwatch. With a very
small resistance, only a very small energy input is necessary to maintain the
oscillations. The circuit is analogous to a car with no shock absorbers. Once it
starts oscillating, it continues at its natural frequency for some
time. [[Figure 5]](#Figure5) shows the analogy between an *LC* circuit and a
mass on a spring.

![The figure describes four stages of an L C oscillation circuit compared to a mass oscillating on a spring. Part a of the figure shows a mass attached to a horizontal spring. The spring is attached to a fixed support on the left. The mass is at rest as shown by velocity v equals zero. The energy of the spring is shown as potential energy. This is compared with a circuit containing a capacitor C and inductor L connected together. The energy is shown as stored in the electric field E of the capacitor between the plates. One plate is shown to have a negative polarity and other plate is shown to have a positive polarity. Part b of the figure shows a mass attached to a horizontal spring which is attached to a fixed support on the left. The mass is shown to move horizontal toward the fixed support with velocity v. The energy here is stored as the kinetic energy of the spring. This is compared with a circuit containing a capacitor C and inductor L connected together. A current is shown in the circuit and energy is stored as magnetic field B in the inductor. Part c of the figure shows a mass attached to a horizontal spring which is attached to a fixed support on the left. The spring is shown as not stretched and the energy is shown as potential energy of the spring. The mass is show to have displaced toward left. This is compared with a circuit containing a capacitor C and inductor L connected together. The energy is shown as stored in the electric field E of the capacitor between the plates. One plate is shown to have a negative polarity and other plate is shown to have a positive polarity. But the polarities are reverse of the first case in part a. Part d of the figure shows a mass attached to a horizontal spring which is attached to a fixed support on the left. The mass is shown to move toward right with velocity v. the energy of the spring is kinetic energy. This is compared with a circuit containing a capacitor C and inductor L connected together. A current is shown in the circuit opposite to that in part b and energy is stored as magnetic field B in the inductor.](../resources/Figure_23_12_05.jpg "An LC circuit is analogous to a mass oscillating on a spring with no friction and no driving force. Energy moves back and forth between the inductor and capacitor, just as it moves from kinetic to potential in the mass-spring system.")
{: #Figure5}

<div class="note" data-has-label="true"  class="interactive" data-label="" markdown="1">
<div class="title">
PhET Explorations: Circuit Construction Kit (AC+DC), Virtual Lab
</div>
Build circuits with capacitors, inductors, resistors and AC or DC voltage sources, and inspect them using lab instruments such as voltmeters and ammeters.

<div class="media" id="PhET_module" data-alt="">
<iframe width="660" height="371.4" src="https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_en.html"></iframe>
</div>
</div>

### Section Summary

* The AC analogy to resistance is impedance $$Z $$ , the combined effect of
  resistors, inductors, and capacitors, defined by the AC version of Ohm’s law:

  <div class="equation" >
   $${I}_{0}=\frac{ {V}_{0}}{Z} \text{ or } {I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}, $$
  </div>
     where
   $${I}_{0} $$ is the peak current and
   $${V}_{0} $$ is the peak source voltage.
* Impedance has units of ohms and is given by $$Z=\sqrt{ {R}^{2}+{\left( {X}_ {L}-{X}_{C} \right)}^{2}} $$ .

* The resonant frequency $${f}_{0} $$ , at which $${X}_{L}={X}_{C} $$ , is

  <div class="equation" >
   $${f}_{0}=\frac{1}{2\pi \sqrt{\text{LC}}}\text{.} $$
  </div>

* In an AC circuit, there is a phase angle $$\varphi $$ between source voltage $$V $$ and the current $$I $$ , which can be found
      from

  <div class="equation" >
   $$\cos \varphi =\frac{R}{Z}\text{,} $$
  </div>

* $$\varphi =0º $$ for a purely resistive circuit or an *RLC* circuit at
  resonance.
* The average power delivered to an *RLC* circuit is affected by the phase angle
  and is given by

  <div class="equation" >
   $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}} \cos \varphi \text{,} $$
  </div>

$$\cos \varphi $$ is called the power factor, which ranges from 0 to 1.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Does the resonant frequency of an AC circuit depend on the peak voltage of the AC source? Explain why or why not.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose you have a motor with a power factor significantly less than 1. Explain why it would be better to improve the power factor as a method of improving the motor’s output, rather than to increase the voltage input.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RL* circuit consists of a  $$40.0 \Omega  $$
 resistor and a 3.00 mH inductor. (a) Find its impedance  $$Z $$
 at 60.0 Hz and 10.0 kHz. (b) Compare these values of  $$Z $$
 with those found in [[Example 1]](#Example1) in which there was also a capacitor.

</div>
<div class="solution" markdown="1">
(a)  $$40.02 \Omega  $$
 at 60.0 Hz,  $$193 \Omega  $$  at 10.0 kHz

(b) At 60 Hz, with a capacitor, $$Z=531 \Omega $$ , over 13 times as high as
without the capacitor. The capacitor makes a large difference at low
frequencies. At 10 kHz, with a capacitor $$Z=190 \Omega $$ , about the same as
without the capacitor. The capacitor has a smaller effect at high frequencies.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RC* circuit consists of a  $$40.0 \Omega  $$
 resistor and a  $$5.00 \text{μF} $$
 capacitor. (a) Find its impedance at 60.0 Hz and 10.0 kHz. (b) Compare these values of  $$Z $$
 with those found in [[Example 1]](#Example1), in which there was also an inductor.

</div>
<div class="solution" markdown="1">
**Strategy**

For an RC circuit, the impedance is given by $$Z=\sqrt{R^2 + X_C^2}$$, where the capacitive reactance is $$X_C = 1/(2\pi fC)$$. We calculate $$X_C$$ at each frequency and then find $$Z$$.

**Solution for (a)**

At 60.0 Hz, the capacitive reactance is:

<div class="equation">
$$X_C = \frac{1}{2\pi fC} = \frac{1}{2\pi(60.0 \text{ Hz})(5.00 \times 10^{-6} \text{ F})} = 531 \Omega$$
</div>

The impedance is:

<div class="equation">
$$Z = \sqrt{R^2 + X_C^2} = \sqrt{(40.0 \Omega)^2 + (531 \Omega)^2} = 532 \Omega \text{ at 60.0 Hz}$$
</div>

At 10.0 kHz:

<div class="equation">
$$X_C = \frac{1}{2\pi(10.0 \times 10^3 \text{ Hz})(5.00 \times 10^{-6} \text{ F})} = 3.18 \Omega$$
</div>

<div class="equation">
$$Z = \sqrt{(40.0 \Omega)^2 + (3.18 \Omega)^2} = 40.1 \Omega \text{ at 10.0 kHz}$$
</div>

**Solution for (b)**

At 60.0 Hz, the RLC circuit in [[Example 1]](#Example1) had $$Z = 531 \Omega$$, which is nearly identical to the RC circuit value of 532 Ω. This confirms that the capacitor dominates at low frequency. At 10.0 kHz, the RLC circuit had $$Z = 190 \Omega$$, which is much larger than the RC value of 40.1 Ω. This is because the inductor contributes significant reactance at high frequency in the RLC circuit.

**Discussion**

At low frequencies, capacitive reactance dominates both circuits, making their impedances nearly equal. At high frequencies, the inductor in the RLC circuit significantly increases impedance, while the RC circuit impedance approaches the resistance value.

**Final Answer**

The impedance of the RC circuit is 532 Ω at 60.0 Hz and 40.1 Ω at 10.0 kHz.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *LC* circuit consists of a  $$ 3.00 \text{mH} $$
 inductor and a  $$ 5.00\mu\text{F} $$
 capacitor. (a) Find its impedance at 60.0 Hz and 10.0 kHz. (b) Compare these values of  $$Z $$
 with those found in [[Example 1]](#Example1) in which there was also a resistor.

</div>
<div class="solution" markdown="1">
(a)  $$529 \Omega  $$
 at 60.0 Hz,  $$185 \Omega  $$  at 10.0 kHz

(b) These values are close to those obtained in [[Example 1]](#Example1)
because at low frequency the capacitor dominates and at high frequency the
inductor dominates. So in both cases the resistor makes little contribution to
the total impedance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the resonant frequency of a 0.500 mH inductor connected to a  $$40.0 \text{μF} $$
 capacitor?

</div>
<div class="solution" markdown="1">
**Strategy**

The resonant frequency is given by $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$. We substitute the given values for $$L$$ and $$C$$.

**Solution**

<div class="equation">
$$\begin{array}{lll}f_0 & = & \frac{1}{2\pi\sqrt{LC}}\\
& = & \frac{1}{2\pi\sqrt{(0.500 \times 10^{-3} \text{ H})(40.0 \times 10^{-6} \text{ F})}}\\
& = & \frac{1}{2\pi\sqrt{2.00 \times 10^{-8}}}\\
& = & \frac{1}{2\pi(1.414 \times 10^{-4})}\\
& = & 1.13 \times 10^3 \text{ Hz} = 1.13 \text{ kHz}\end{array}$$
</div>

**Discussion**

This frequency falls in the audio range and is typical for circuits in audio equipment and some radio tuning applications.

**Final Answer**

The resonant frequency is 1.13 kHz.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
To receive AM radio, you want an *RLC* circuit that can be made to resonate at any frequency between 500 and 1650 kHz. This is accomplished with a fixed  $$1.00 \text{μH} $$
 inductor connected to a variable capacitor. What range of capacitance is needed?

</div>
<div class="solution" markdown="1">
**Strategy**

The resonant frequency is $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$. Solving for $$C$$: $$C = \frac{1}{4\pi^2 f_0^2 L}$$. To cover the frequency range, we need maximum capacitance at the lowest frequency and minimum capacitance at the highest frequency.

**Solution**

For the minimum frequency (500 kHz), we need maximum capacitance:

<div class="equation">
$$\begin{array}{lll}C_{\text{max}} & = & \frac{1}{4\pi^2 f_{\text{min}}^2 L}\\
& = & \frac{1}{4\pi^2(500 \times 10^3 \text{ Hz})^2(1.00 \times 10^{-6} \text{ H})}\\
& = & \frac{1}{4\pi^2(2.50 \times 10^{11})(1.00 \times 10^{-6})}\\
& = & \frac{1}{9.870 \times 10^6}\\
& = & 1.01 \times 10^{-7} \text{ F} = 101 \text{ nF}\end{array}$$
</div>

For the maximum frequency (1650 kHz), we need minimum capacitance:

<div class="equation">
$$\begin{array}{lll}C_{\text{min}} & = & \frac{1}{4\pi^2 f_{\text{max}}^2 L}\\
& = & \frac{1}{4\pi^2(1650 \times 10^3)^2(1.00 \times 10^{-6})}\\
& = & \frac{1}{4\pi^2(2.7225 \times 10^{12})(1.00 \times 10^{-6})}\\
& = & \frac{1}{1.075 \times 10^8}\\
& = & 9.30 \times 10^{-9} \text{ F} = 9.30 \text{ nF}\end{array}$$
</div>

**Discussion**

Variable capacitors in AM radios typically use rotating plates to adjust capacitance over this range. The capacitance must change by more than a factor of 10 to cover the entire AM band.

**Final Answer**

The capacitance must range from 9.30 nF to 101 nF.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you have a supply of inductors ranging from 1.00 nH to 10.0 H, and capacitors ranging from 1.00 pF to 0.100 F. What is the range of resonant frequencies that can be achieved from combinations of a single inductor and a single capacitor?

</div>
<div class="solution" markdown="1">
**Strategy**

The resonant frequency is $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$. To find the maximum frequency, use the smallest values of $$L$$ and $$C$$. To find the minimum frequency, use the largest values of $$L$$ and $$C$$.

**Solution**

For maximum frequency (minimum $$LC$$):

<div class="equation">
$$\begin{array}{lll}f_{\text{max}} & = & \frac{1}{2\pi\sqrt{L_{\text{min}}C_{\text{min}}}}\\
& = & \frac{1}{2\pi\sqrt{(1.00 \times 10^{-9} \text{ H})(1.00 \times 10^{-12} \text{ F})}}\\
& = & \frac{1}{2\pi\sqrt{1.00 \times 10^{-21}}}\\
& = & \frac{1}{2\pi(1.00 \times 10^{-10.5})}\\
& = & 5.03 \times 10^9 \text{ Hz} = 5.03 \text{ GHz}\end{array}$$
</div>

For minimum frequency (maximum $$LC$$):

<div class="equation">
$$\begin{array}{lll}f_{\text{min}} & = & \frac{1}{2\pi\sqrt{L_{\text{max}}C_{\text{max}}}}\\
& = & \frac{1}{2\pi\sqrt{(10.0 \text{ H})(0.100 \text{ F})}}\\
& = & \frac{1}{2\pi\sqrt{1.00}}\\
& = & \frac{1}{2\pi}\\
& = & 0.159 \text{ Hz}\end{array}$$
</div>

**Discussion**

This enormous range covers everything from very slow oscillations (less than once per second) to microwave frequencies, demonstrating the versatility of LC circuits in electronic applications.

**Final Answer**

The range of resonant frequencies is from 0.159 Hz to 5.03 GHz.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What capacitance do you need to produce a resonant frequency of 1.00 GHz, when using an 8.00 nH inductor?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the resonant frequency formula $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$ and solve for $$C$$.

**Solution**

Rearranging the resonant frequency formula:

<div class="equation">
$$C = \frac{1}{4\pi^2 f_0^2 L}$$
</div>

Substituting the given values:

<div class="equation">
$$\begin{array}{lll}C & = & \frac{1}{4\pi^2(1.00 \times 10^9 \text{ Hz})^2(8.00 \times 10^{-9} \text{ H})}\\
& = & \frac{1}{4\pi^2(1.00 \times 10^{18})(8.00 \times 10^{-9})}\\
& = & \frac{1}{4\pi^2(8.00 \times 10^9)}\\
& = & \frac{1}{3.158 \times 10^{11}}\\
& = & 3.17 \times 10^{-12} \text{ F} = 3.17 \text{ pF}\end{array}$$
</div>

**Discussion**

This very small capacitance is typical for high-frequency circuits operating in the gigahertz range, such as those found in cell phones and Wi-Fi devices. The small inductor and capacitor values allow for compact circuit design at microwave frequencies.

**Final Answer**

The required capacitance is 3.17 pF.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What inductance do you need to produce a resonant frequency of 60.0 Hz, when using a  $$2.00 \mu\text{F} $$
 capacitor?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the resonant frequency formula $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$ and solve for $$L$$.

**Solution**

Squaring both sides and rearranging:

<div class="equation">
$$f_0^2 = \frac{1}{4\pi^2 LC}$$
</div>

<div class="equation">
$$L = \frac{1}{4\pi^2 f_0^2 C}$$
</div>

Substituting values:

<div class="equation">
$$\begin{array}{lll}L & = & \frac{1}{4\pi^2(60.0 \text{ Hz})^2(2.00 \times 10^{-6} \text{ F})}\\
& = & \frac{1}{4(9.870)(3600)(2.00 \times 10^{-6})}\\
& = & \frac{1}{2.838 \times 10^{-1}}\\
& = & 3.52 \text{ H}\end{array}$$
</div>

**Discussion**

This is a fairly large inductance, which makes sense given the low frequency. Power line frequency (60 Hz) applications typically require substantial inductances.

**Final Answer**

The required inductance is 3.52 H.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The lowest frequency in the FM radio band is 88.0 MHz. (a) What inductance is needed to produce this resonant frequency if it is connected to a 2.50 pF capacitor? (b) The capacitor is variable, to allow the resonant frequency to be adjusted to as high as 108 MHz. What must the capacitance be at this frequency?

</div>
<div class="solution" markdown="1">
**Strategy**

For part (a), we use $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$ and solve for $$L$$. For part (b), we use the same formula with the inductance found in part (a) and solve for $$C$$ at the new frequency.

**Solution for (a)**

Rearranging the resonant frequency formula:

<div class="equation">
$$L = \frac{1}{4\pi^2 f_0^2 C}$$
</div>

Substituting values:

<div class="equation">
$$\begin{array}{lll}L & = & \frac{1}{4\pi^2(88.0 \times 10^6 \text{ Hz})^2(2.50 \times 10^{-12} \text{ F})}\\
& = & \frac{1}{4\pi^2(7.744 \times 10^{15})(2.50 \times 10^{-12})}\\
& = & \frac{1}{4\pi^2(1.936 \times 10^4)}\\
& = & \frac{1}{7.641 \times 10^5}\\
& = & 1.31 \times 10^{-6} \text{ H} = 1.31 \text{ μH}\end{array}$$
</div>

**Solution for (b)**

Using the inductance from part (a) at the higher frequency:

<div class="equation">
$$\begin{array}{lll}C & = & \frac{1}{4\pi^2 f^2 L}\\
& = & \frac{1}{4\pi^2(108 \times 10^6)^2(1.31 \times 10^{-6})}\\
& = & \frac{1}{4\pi^2(1.166 \times 10^{16})(1.31 \times 10^{-6})}\\
& = & \frac{1}{6.029 \times 10^{11}}\\
& = & 1.66 \times 10^{-12} \text{ F} = 1.66 \text{ pF}\end{array}$$
</div>

**Discussion**

FM radio receivers use a variable capacitor to tune across the FM band. The capacitance only needs to change from 2.50 pF to 1.66 pF, a much smaller range than required for AM radio. This smaller tuning range is one reason FM radios can be more stable and precise than AM radios.

**Final Answer**

(a) The required inductance is 1.31 μH; (b) the capacitance must be 1.66 pF at 108 MHz.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$\mathrm{2.50 \Omega } $$
 resistor, a  $$\mathrm{100 \mu H} $$
 inductor, and an  $$\mathrm{80.0 \mu F} $$
 capacitor.(a) Find the circuit's impedance at 120 Hz. (b) Find the circuit's impedance at 5.00 kHz. (c) If the voltage source has  $${V}_{\text{rms}}= 5.60 \text{V} $$ ,
 what is  $${I}_{\text{rms}} $$
 at each frequency? (d) What is the resonant frequency of the circuit? (e) What is  $${I}_{\text{rms}} $$
 at resonance?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$Z = \sqrt{R^2 + (X_L - X_C)^2}$$ where $$X_L = 2\pi fL$$ and $$X_C = 1/(2\pi fC)$$. Current is found from $$I_{\text{rms}} = V_{\text{rms}}/Z$$, and resonant frequency from $$f_0 = 1/(2\pi\sqrt{LC})$$.

**Solution for (a)**

At 120 Hz:

<div class="equation">
$$X_L = 2\pi(120)(100 \times 10^{-6}) = 0.0754 \Omega$$
</div>

<div class="equation">
$$X_C = \frac{1}{2\pi(120)(80.0 \times 10^{-6})} = 16.6 \Omega$$
</div>

<div class="equation">
$$Z = \sqrt{(2.50)^2 + (0.0754 - 16.6)^2} = \sqrt{6.25 + 272.6} = 16.7 \Omega$$
</div>

**Solution for (b)**

At 5.00 kHz:

<div class="equation">
$$X_L = 2\pi(5000)(100 \times 10^{-6}) = 3.14 \Omega$$
</div>

<div class="equation">
$$X_C = \frac{1}{2\pi(5000)(80.0 \times 10^{-6})} = 0.398 \Omega$$
</div>

<div class="equation">
$$Z = \sqrt{(2.50)^2 + (3.14 - 0.398)^2} = \sqrt{6.25 + 7.52} = 3.71 \Omega$$
</div>

**Solution for (c)**

At 120 Hz: $$I_{\text{rms}} = \frac{5.60 \text{ V}}{16.7 \Omega} = 0.335 \text{ A}$$

At 5.00 kHz: $$I_{\text{rms}} = \frac{5.60 \text{ V}}{3.71 \Omega} = 1.51 \text{ A}$$

**Solution for (d)**

<div class="equation">
$$f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{(100 \times 10^{-6})(80.0 \times 10^{-6})}} = \frac{1}{2\pi(89.4 \times 10^{-6})} = 1.78 \text{ kHz}$$
</div>

**Solution for (e)**

At resonance, $$Z = R = 2.50 \Omega$$:

<div class="equation">
$$I_{\text{rms}} = \frac{5.60 \text{ V}}{2.50 \Omega} = 2.24 \text{ A}$$
</div>

**Discussion**

The current is maximum at resonance, as expected. The capacitor dominates at 120 Hz (below resonance) while the inductor dominates at 5.00 kHz (above resonance).

**Final Answer**

(a) 16.7 Ω at 120 Hz; (b) 3.71 Ω at 5.00 kHz; (c) 0.335 A at 120 Hz, 1.51 A at 5.00 kHz; (d) 1.78 kHz; (e) 2.24 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$1.00 \text{k}\Omega $$
 resistor, a  $$150 \mu\text{H} $$
 inductor, and a 25.0 nF capacitor. (a) Find the circuit's impedance at 500 Hz. (b) Find the circuit's impedance at 7.50 kHz. (c) If the voltage source has  $${V}_{\text{rms}}=408 \text{V} $$ ,
 what is  $${I}_{\text{rms}} $$
 at each frequency? (d) What is the resonant frequency of the circuit? (e) What is  $${I}_{\text{rms}} $$
 at resonance?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$Z = \sqrt{R^2 + (X_L - X_C)^2}$$ where $$X_L = 2\pi fL$$ and $$X_C = 1/(2\pi fC)$$. Current is found from $$I_{\text{rms}} = V_{\text{rms}}/Z$$, and resonant frequency from $$f_0 = 1/(2\pi\sqrt{LC})$$.

**Solution for (a)**

At 500 Hz:

<div class="equation">
$$X_L = 2\pi(500)(150 \times 10^{-6}) = 0.471 \Omega$$
</div>

<div class="equation">
$$X_C = \frac{1}{2\pi(500)(25.0 \times 10^{-9})} = \frac{1}{7.854 \times 10^{-5}} = 12732 \Omega$$
</div>

<div class="equation">
$$Z = \sqrt{(1000)^2 + (0.471 - 12732)^2} = \sqrt{10^6 + 1.620 \times 10^8} = 12738 \Omega = 12.8 \text{ k}\Omega$$
</div>

**Solution for (b)**

At 7.50 kHz:

<div class="equation">
$$X_L = 2\pi(7500)(150 \times 10^{-6}) = 7.07 \Omega$$
</div>

<div class="equation">
$$X_C = \frac{1}{2\pi(7500)(25.0 \times 10^{-9})} = 849 \Omega$$
</div>

<div class="equation">
$$Z = \sqrt{(1000)^2 + (7.07 - 849)^2} = \sqrt{10^6 + 7.087 \times 10^5} = 1307 \Omega = 1.31 \text{ k}\Omega$$
</div>

**Solution for (c)**

At 500 Hz:
<div class="equation">
$$I_{\text{rms}} = \frac{408 \text{ V}}{12738 \Omega} = 0.0320 \text{ A} = 32.0 \text{ mA}$$
</div>

At 7.50 kHz:
<div class="equation">
$$I_{\text{rms}} = \frac{408 \text{ V}}{1307 \Omega} = 0.312 \text{ A} = 312 \text{ mA}$$
</div>

**Solution for (d)**

<div class="equation">
$$\begin{array}{lll}f_0 & = & \frac{1}{2\pi\sqrt{LC}}\\
& = & \frac{1}{2\pi\sqrt{(150 \times 10^{-6})(25.0 \times 10^{-9})}}\\
& = & \frac{1}{2\pi\sqrt{3.75 \times 10^{-12}}}\\
& = & \frac{1}{2\pi(1.936 \times 10^{-6})}\\
& = & 82.2 \times 10^3 \text{ Hz} = 82.2 \text{ kHz}\end{array}$$
</div>

**Solution for (e)**

At resonance, $$Z = R = 1.00 \text{ k}\Omega$$:

<div class="equation">
$$I_{\text{rms}} = \frac{408 \text{ V}}{1000 \Omega} = 0.408 \text{ A}$$
</div>

**Discussion**

At 500 Hz (well below resonance), the capacitive reactance dominates and the impedance is very high, resulting in low current. At 7.50 kHz (closer to but still below resonance), the impedance is lower and current increases. At resonance (82.2 kHz), impedance is minimized to just the resistance, yielding maximum current.

**Final Answer**

(a) 12.8 kΩ at 500 Hz; (b) 1.31 kΩ at 7.50 kHz; (c) 32.0 mA at 500 Hz, 312 mA at 7.50 kHz; (d) 82.2 kHz; (e) 0.408 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$2.50 \Omega $$ resistor, a $$100 \mu\text{H} $$
 inductor, and an  $$80.0 \mu\text{F} $$ capacitor.
(a) Find the power factor at  $$f=120 \text{Hz} $$ .
(b) What is the phase angle at 120 Hz?
(c) What is the average power at 120 Hz?
(d) Find the average power at the circuit's resonant frequency.

</div>
<div class="solution" markdown="1">
**Strategy**

The power factor is $$\cos\varphi = R/Z$$, and average power is $$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}}\cos\varphi$$. We use results from the previous problem where $$Z = 16.7 \Omega$$ at 120 Hz, $$I_{\text{rms}} = 0.335 \text{ A}$$, $$V_{\text{rms}} = 5.60 \text{ V}$$, and $$f_0 = 1.78 \text{ kHz}$$.

**Solution for (a)**

<div class="equation">
$$\cos\varphi = \frac{R}{Z} = \frac{2.50 \Omega}{16.7 \Omega} = 0.150$$
</div>

**Solution for (b)**

<div class="equation">
$$\varphi = \cos^{-1}(0.150) = 81.4°$$
</div>

**Solution for (c)**

<div class="equation">
$$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}}\cos\varphi = (0.335)(5.60)(0.150) = 0.281 \text{ W}$$
</div>

**Solution for (d)**

At resonance, $$\cos\varphi = 1$$ and $$I_{\text{rms}} = 2.24 \text{ A}$$ (from previous problem):

<div class="equation">
$$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}} = (2.24)(5.60) = 12.5 \text{ W}$$
</div>

**Discussion**

At 120 Hz, the large phase angle (81.4°) indicates voltage and current are nearly 90° out of phase, resulting in low power transfer. At resonance, perfect phase alignment yields maximum power transfer—about 45 times greater than at 120 Hz.

**Final Answer**

(a) Power factor is 0.150; (b) phase angle is 81.4°; (c) average power is 0.281 W at 120 Hz; (d) average power is 12.5 W at resonance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$1.00 \text{k}\Omega $$
 resistor, a  $$150 \mu\text{H} $$
 inductor, and a 25.0 nF capacitor. (a) Find the power factor at  $$f=7.50 \text{kHz} $$ .
 (b) What is the phase angle at this frequency? (c) What is the average power at this frequency? (d) Find the average power at the circuit's resonant frequency.

</div>
<div class="solution" markdown="1">
**Strategy**

The power factor is $$\cos\varphi = R/Z$$, and average power is $$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}}\cos\varphi = I_{\text{rms}}^2 R$$. From the previous problem, at 7.50 kHz we have $$Z = 1.31 \text{ k}\Omega$$, $$I_{\text{rms}} = 312 \text{ mA}$$, $$V_{\text{rms}} = 408 \text{ V}$$, and $$f_0 = 82.2 \text{ kHz}$$.

**Solution for (a)**

<div class="equation">
$$\cos\varphi = \frac{R}{Z} = \frac{1.00 \times 10^3 \Omega}{1.31 \times 10^3 \Omega} = 0.763$$
</div>

**Solution for (b)**

<div class="equation">
$$\varphi = \cos^{-1}(0.763) = 40.3°$$
</div>

**Solution for (c)**

The average power can be calculated using $$P_{\text{ave}} = I_{\text{rms}}^2 R$$ (since only the resistor dissipates power):

<div class="equation">
$$P_{\text{ave}} = (0.312)^2(1000) = 97.3 \text{ W}$$
</div>

Alternatively, using $$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}}\cos\varphi$$:

<div class="equation">
$$P_{\text{ave}} = (0.312)(408)(0.763) = 97.1 \text{ W}$$
</div>

**Solution for (d)**

At resonance (82.2 kHz), $$\cos\varphi = 1$$ and $$I_{\text{rms}} = 0.408 \text{ A}$$:

<div class="equation">
$$P_{\text{ave}} = I_{\text{rms}}^2 R = (0.408)^2(1000) = 166 \text{ W}$$
</div>

**Discussion**

At 7.50 kHz, which is below the resonant frequency of 82.2 kHz, the circuit is capacitive with a phase angle of about 40°. The power factor is significantly less than unity, reducing power transfer. At resonance, the power factor is 1 and power delivery is maximized—about 71% greater than at 7.50 kHz. Note that all power is dissipated in the resistor; the reactive components store and release energy but don't dissipate it.

**Final Answer**

(a) Power factor is 0.763; (b) phase angle is 40.3°; (c) average power is 97.1 W at 7.50 kHz; (d) average power is 166 W at resonance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$200 \Omega  $$
 resistor and a 25.0 mH inductor. At 8000 Hz, the phase angle is  $$45.0\text{º} $$ .
 (a) What is the impedance? (b) Find the circuit's capacitance. (c) If  $${V}_{\text{rms}}=408 \text{V} $$
 is applied, what is the average power supplied?

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$\cos\varphi = R/Z$$ to find impedance. Then from $$Z = \sqrt{R^2 + (X_L - X_C)^2}$$ we can find the difference $$(X_L - X_C)$$, and knowing $$X_L$$ we can find $$X_C$$ and hence $$C$$.

**Solution for (a)**

<div class="equation">
$$Z = \frac{R}{\cos\varphi} = \frac{200 \Omega}{\cos 45.0°} = \frac{200}{0.707} = 283 \Omega$$
</div>

**Solution for (b)**

First find $$X_L$$:

<div class="equation">
$$X_L = 2\pi fL = 2\pi(8000)(25.0 \times 10^{-3}) = 1257 \Omega$$
</div>

From $$Z^2 = R^2 + (X_L - X_C)^2$$:

<div class="equation">
$$(283)^2 = (200)^2 + (X_L - X_C)^2$$
</div>

<div class="equation">
$$80089 = 40000 + (X_L - X_C)^2$$
</div>

<div class="equation">
$$X_L - X_C = \sqrt{40089} = 200 \Omega$$
</div>

Since $$\varphi > 0$$, the circuit is inductive, so $$X_L > X_C$$:

<div class="equation">
$$X_C = X_L - 200 = 1257 - 200 = 1057 \Omega$$
</div>

<div class="equation">
$$C = \frac{1}{2\pi f X_C} = \frac{1}{2\pi(8000)(1057)} = 18.9 \times 10^{-9} \text{ F} = 18.9 \text{ nF}$$
</div>

**Solution for (c)**

<div class="equation">
$$I_{\text{rms}} = \frac{V_{\text{rms}}}{Z} = \frac{408}{283} = 1.44 \text{ A}$$
</div>

<div class="equation">
$$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}}\cos\varphi = (1.44)(408)(0.707) = 416 \text{ W}$$
</div>

**Discussion**

The 45° phase angle indicates equal contributions from resistance and net reactance to the impedance. The relatively small capacitance is appropriate for this high frequency operation.

**Final Answer**

(a) The impedance is 283 Ω; (b) the capacitance is 18.9 nF; (c) the average power is 416 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Referring to [[Example 3]](#Example3), find the average power at 10.0 kHz.

</div>
<div class="solution" markdown="1">
**Strategy**

From [[Example 3]](#Example3), the circuit has $$R = 40.0 \Omega$$, $$L = 3.00 \text{ mH}$$, $$C = 5.00 \text{ μF}$$, and $$V_{\text{rms}} = 120 \text{ V}$$. From [[Example 1]](#Example1), at 10.0 kHz we have $$Z = 190 \Omega$$ and $$I_{\text{rms}} = 0.633 \text{ A}$$. We use $$P_{\text{ave}} = I_{\text{rms}}^2 R$$ to find the average power.

**Solution**

The average power is dissipated only in the resistor:

<div class="equation">
$$P_{\text{ave}} = I_{\text{rms}}^2 R = (0.633)^2(40.0) = 16.0 \text{ W}$$
</div>

Alternatively, we can use the power factor approach. First find the power factor:

<div class="equation">
$$\cos\varphi = \frac{R}{Z} = \frac{40.0}{190} = 0.211$$
</div>

Then:

<div class="equation">
$$P_{\text{ave}} = I_{\text{rms}}V_{\text{rms}}\cos\varphi = (0.633)(120)(0.211) = 16.0 \text{ W}$$
</div>

**Discussion**

At 10.0 kHz, the circuit is well above its resonant frequency of 1.30 kHz (from [[Example 2]](#Example2)), so the inductor dominates with $$X_L = 188 \Omega$$ being much larger than $$X_C = 3.18 \Omega$$. The phase angle is $$\varphi = \cos^{-1}(0.211) = 77.8°$$, indicating voltage and current are nearly 90° out of phase. Despite the relatively high current of 0.633 A, the low power factor results in modest power delivery. Compare this to the 360 W delivered at resonance (from [[Example 3]](#Example3))—the power at 10.0 kHz is less than 5% of the maximum possible.

**Final Answer**

The average power at 10.0 kHz is 16.0 W.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

impedance
: the AC analogue to resistance in a DC circuit; it is the combined effect of
resistance, inductive reactance, and capacitive reactance in the form $$Z=\sqrt{
{R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}

resonant frequency
: the frequency at which the impedance in a circuit is at a minimum, and also
the frequency at which the circuit would oscillate if not driven by a voltage
source; calculated by $${f}_{0}=\frac{1}{2\pi \sqrt{\text{LC}}} $$

phase angle
: denoted by $$\varphi $$, the amount by which the voltage and current are out of phase with each other
in a circuit

power factor
: the amount by which the power delivered in the circuit is less than the
theoretical maximum of the circuit due to voltage and current being out of
phase; calculated by $$\cos \varphi $$

</div>