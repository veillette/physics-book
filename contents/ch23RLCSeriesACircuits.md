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
crux of the analysis of an *RLC* circuit is the frequency dependence of $${X}_
{L} $$ and $${X}_{C} $$ , and the effect they have on the phase of voltage
versus current (established in the preceding section). These give rise to the
frequency dependence of the circuit, with important “resonance” features that
are the basis of many applications, such as radio tuners.

![The figure describes an R LC series circuit. It shows a resistor R connected in series with an inductor L, connected to a capacitor C in series to an A C source V. The voltage of the A C source is given by V equals V zero sine two pi f t. The voltage across R is V R, across L is V L and across C is V C.](../resources/Figure_23_12_01.jpg "An RLC series circuit with an AC voltage source.")
{: #Figure1}

The combined effect of resistance $$R $$ , inductive reactance $${X}_{L} $$ ,
and capacitive reactance $${X}_{C} $$ is defined to be **impedance**{: class="
term"}, an AC analogue to resistance in a DC circuit. Current, voltage, and
impedance in an *RLC* circuit are related by an AC version of Ohm’s law:

<div class="equation" >
 $${I}_{0}=\frac{ {V}_{0}}{Z} \text{ or } {I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}\text{.} $$
</div>

Here $${I}_{0} $$ is the peak current, $${V}_{0} $$ the peak source voltage, and
$$Z $$ is the impedance of the circuit. The units of impedance are ohms, and its
effect on the circuit is as you might expect: the greater the impedance, the
smaller the current. To get an expression for $$Z $$ in terms of $$R $$ , $${X}_
{L} $$ , and $${X}_{C} $$ , we will now examine how the voltages across the
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
not in phase), the peak voltage $${V}_{0} $$ of the source does *not* equal the
sum of the peak voltages across $$R $$ , $$L $$ , and $$C $$ . The actual
relationship is

<div class="equation" >
 $${V}_{0}=\sqrt{ {V}_{0R}^{2}+{\left( {V}_{0L}-{V}_{0C} \right)}^{2}}, $$
</div>

where $${V}_{0R} $$ , $${V}_{0L} $$ , and $${V}_{0C} $$ are the peak voltages
across $$R $$ , $$L $$ , and $$C $$ , respectively. Now, using Ohm’s law and
definitions
from [Reactance, Inductive and Capacitive](../contents/ch23ReactanceInductiveAndCapacitive),
we substitute $${V}_{0}={I}_{0}Z $$ into the above, as well as $${V}_{0R}={I}_
{0}R $$ , $${V}_
{0L}={I}_{0}{X}_{L} $$ , and $${V}_{0C}={I}_{0}{X}_{C} $$, yielding

<div class="equation" >
 $${I}_{0}Z=\sqrt{ {I}_{0}^{ 2}{R}^{2}+{\left( {I}_{0}{X}_{L}-{I}_{0}{X}_{C} \right)}^{2}}={I}_{0}\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}\text{.} $$
</div>

$${I}_{0} $$ cancels to yield an expression for $$Z $$ \:

<div class="equation" >
 $$Z=\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}}\text{,} $$
</div>

which is the impedance of an *RLC* series AC circuit. For circuits without a
resistor, take $$R=0 $$ ; for those without an inductor, take $${X}_{L}=0 $$ ;
and for those without a capacitor, take $${X}_{C}=0 $$.

![The figure shows graphs showing the relationships of the voltages in an RLC circuit to the current. It has five graphs on the left and two graphs on the right. The first graph on the right is for current I versus time t. Current is plotted along Y axis and time is along X axis. The curve is a smooth progressive sine wave. The second graph is on the right is for voltage V R versus time t. Voltage V R is plotted along Y axis and time is along X axis. The curve is a smooth progressive sine wave. The third graph is on the right is for voltage V L versus time t. Voltage V L is plotted along Y axis and time is along X axis. The curve is a smooth progressive cosine wave. The fourth graph is on the right is for voltage V C versus time t. Voltage V C is plotted along Y axis and time t is along X axis. The curve is a smooth progressive cosine wave starting from negative Y axis. The fifth graph shows the voltage V verses time t for the R L C circuit. Voltage V is plotted along Y axis and time t is along X axis. The curve is a smooth progressive sine wave starting from a point near to origin on negative X axis. The first and the fifth graphs are again shown on the right and their amplitudes and phases compared. The current graph is shown to have a lesser amplitude.](../resources/Figure_23_12_02.jpg "This graph shows the relationships of the voltages in an RLC circuit to the current. The voltages across the circuit elements add to equal the voltage of the source, which is seen to be out of phase with the current.")
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

For each frequency, we use $$Z=\sqrt{ {R}^{2}+{\left( {X}_{L}-{X}_{C} \right)
}^{2}} $$ to find the impedance and then Ohm’s law to find current. We can take
advantage of the results of the previous two examples rather than calculate the
reactances again.

**Solution for (a)**

At 60.0 Hz, the values of the reactances were found
in [[Example 1]](../contents/ch23ReactanceInductiveAndCapacitive#Example1) to be $${X}_
{L}= 1.13 \Omega $$ and
in [[Example 2]](../contents/ch23ReactanceInductiveAndCapacitive#Example2) to be $${X}_
{C}=531 \Omega $$ . Entering these and the given $$40.0 \text{Ω} $$ for
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

$${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}=\frac{120 \text{V}}{531 \Omega }=
0.226 \text{A} $$ at 60.0 Hz

Finally, at 10.0 kHz, we find

$${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{Z}=\frac{120 \text{V}}{190 \Omega }=
0.633 \text{A} $$ at 10.0 kHz

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
and the expression for impedance $$Z $$ from $$Z=\sqrt{ {R}^{2}+{\left( {X}_
{L}-{X}_{C} \right)}^{2}} $$ gives

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

The resonant frequency is found by using the expression in $${f}_
{0}=\frac{1}{2\pi \sqrt{\text{LC}}} $$ . The current at that frequency is the
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
in [[Figure 2]](#Figure2), voltage and current are out of phase in an *RLC* circuit. There is a **phase angle**  $$\varphi $$ between the source voltage $$V
$$ and the current $$I $$ , which can be found from

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
 (b) What is the average power at 50.0 Hz? (c) Find the average power at the circuit’s resonant frequency.

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

At the resonant frequency, we know $$\cos \varphi =1 $$ , and $${I}_{\text{rms}}
$$ was found to be 6.00 A in [[Example 2]](#Example2). Thus,

$${P}_{\text{ave}}=\left( 3.00 \text{A}\right)\left(120 \text{V}\right)\left(
1\right)=360 \text{W} $$ at resonance (1.30 kHz)

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
* Impedance has units of ohms and is given by $$Z=\sqrt{ {R}^{2}+{\left( {X}_
  {L}-{X}_{C} \right)}^{2}} $$ .

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
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
To receive AM radio, you want an *RLC* circuit that can be made to resonate at any frequency between 500 and 1650 kHz. This is accomplished with a fixed  $$1.00 \text{μH} $$
 inductor connected to a variable capacitor. What range of capacitance is needed?

</div>
<div class="solution" markdown="1">
9.30 nF to 101 nF

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you have a supply of inductors ranging from 1.00 nH to 10.0 H, and capacitors ranging from 1.00 pF to 0.100 F. What is the range of resonant frequencies that can be achieved from combinations of a single inductor and a single capacitor?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What capacitance do you need to produce a resonant frequency of 1.00 GHz, when using an 8.00 nH inductor?

</div>
<div class="solution" markdown="1">
3.17 pF

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What inductance do you need to produce a resonant frequency of 60.0 Hz, when using a  $$2.00 \mu\text{F} $$
 capacitor?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The lowest frequency in the FM radio band is 88.0 MHz. (a) What inductance is needed to produce this resonant frequency if it is connected to a 2.50 pF capacitor? (b) The capacitor is variable, to allow the resonant frequency to be adjusted to as high as 108 MHz. What must the capacitance be at this frequency?

</div>
<div class="solution" markdown="1">
(a)  $$\mathrm{1.31 \mu H} $$
(b) 1.66 pF

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$\mathrm{2.50 \Omega } $$
 resistor, a  $$\mathrm{100 \mu H} $$
 inductor, and an  $$\mathrm{80.0 \mu F} $$
 capacitor.(a) Find the circuit’s impedance at 120 Hz. (b) Find the circuit’s impedance at 5.00 kHz. (c) If the voltage source has  $${V}_{\text{rms}}= 5.60 \text{V} $$ ,
 what is  $${I}_{\text{rms}} $$
 at each frequency? (d) What is the resonant frequency of the circuit? (e) What is  $${I}_{\text{rms}} $$
 at resonance?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$1.00 \text{k}\Omega $$
 resistor, a  $$150 \mu\text{H} $$
 inductor, and a 25.0 nF capacitor. (a) Find the circuit’s impedance at 500 Hz. (b) Find the circuit’s impedance at 7.50 kHz. (c) If the voltage source has  $${V}_{\text{rms}}=408 \text{V} $$ ,
 what is  $${I}_{\text{rms}} $$
 at each frequency? (d) What is the resonant frequency of the circuit? (e) What is  $${I}_{\text{rms}} $$
 at resonance?

</div>
<div class="solution" markdown="1">
(a)  $$12.8 \text{k}\Omega $$
(b)  $$1.31 \text{k}\Omega $$
(c) 31.9 mA at 500 Hz, 312 mA at 7.50 kHz

(d) 82.2 kHz

(e) 0.408 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$2.50 \Omega $$ resistor, a $$100 \mu\text{H} $$
 inductor, and an  $$80.0 \mu\text{F} $$ capacitor. 
(a) Find the power factor at  $$f=120 \text{Hz} $$ .
(b) What is the phase angle at 120 Hz? 
(c) What is the average power at 120 Hz? 
(d) Find the average power at the circuit’s resonant frequency.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$1.00 \text{k}\Omega $$
 resistor, a  $$150 \mu\text{H} $$
 inductor, and a 25.0 nF capacitor. (a) Find the power factor at  $$f=7.50 \text{Hz} $$ .
 (b) What is the phase angle at this frequency? (c) What is the average power at this frequency? (d) Find the average power at the circuit’s resonant frequency.

</div>
<div class="solution" markdown="1">
(a) 0.159

(b)  $$80.9\text{º} $$
(c) 26.4 W

(d) 166 W

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An *RLC* series circuit has a  $$200 \Omega  $$
 resistor and a 25.0 mH inductor. At 8000 Hz, the phase angle is  $$45.0\text{º} $$ .
 (a) What is the impedance? (b) Find the circuit’s capacitance. (c) If  $${V}_{\text{rms}}=408 \text{V} $$
 is applied, what is the average power supplied?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Referring to [[Example 3]](#Example3), find the average power at 10.0 kHz.

</div>
<div class="solution" markdown="1">
16.0 W

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

impedance
: the AC analogue to resistance in a DC circuit; it is the combined effect of
resistance, inductive reactance, and capacitive reactance in the form $$Z=\sqrt{
{R}^{2}+{\left( {X}_{L}-{X}_{C} \right)}^{2}} $$

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
