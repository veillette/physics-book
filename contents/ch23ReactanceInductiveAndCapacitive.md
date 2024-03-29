---
title: Reactance, Inductive and Capacitive
layout: page
sectionNumber: 11
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Sketch voltage and current versus time in simple inductive, capacitive, and resistive circuits.
* Calculate inductive and capacitive reactance.
* Calculate current and/or voltage in simple inductive, capacitive, and resistive circuits.
</div>

Many circuits also contain capacitors and inductors, in addition to resistors
and an AC voltage source. We have seen how capacitors and inductors respond to
DC voltage when it is switched on and off. We will now explore how inductors and
capacitors react to sinusoidal AC voltage.

### Inductors and Inductive Reactance

Suppose an inductor is connected directly to an AC voltage source, as shown
in [[Figure 1]](#Figure1). It is reasonable to assume negligible resistance,
since in practice we can make the resistance of an inductor so small that it has
a negligible effect on the circuit. Also shown is a graph of voltage and current
as functions of time.

![Part a of the figure describes an A C voltage source V connected across an inductor L. The voltage across the inductance is shown as V L. Part b of the figure describes a graph showing the variation of current and voltage across the inductance as a function of time. The voltage V L and current I L is plotted along the Y axis and the time t is along the X axis. The graph for current is a progressive sine wave from the origin. The graph for voltage V is a cosine wave and an amplitude slightly less than the current wave.](../resources/Figure_23_11_01.jpg "(a) An AC voltage source in series with an inductor having negligible resistance. (b) Graph of current and voltage across the inductor as functions of time.")
{: #Figure1}

The graph in [[Figure 1]](#Figure1)(b) starts with voltage at a maximum. Note
that the current starts at zero and rises to its peak *after* the voltage that
drives it, just as was the case when DC voltage was switched on in the preceding
section. When the voltage becomes negative at point a, the current begins to
decrease; it becomes zero at point b, where voltage is its most negative. The
current then becomes negative, again following the voltage. The voltage becomes
positive at point c and begins to make the current less negative. At point d,
the current goes through zero just as the voltage reaches its positive peak to
start another cycle. This behavior is summarized as follows:

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
AC Voltage in an Inductor
</div>
When a sinusoidal voltage is applied to an inductor, the voltage leads the current by one-fourth of a cycle, or by a  $$90 ^\circ $$
 phase angle.

</div>

Current lags behind voltage, since inductors oppose change in current. Changing
current induces a back emf $$V=-L\left(\Delta I/\Delta t\right) $$ . This is
considered to be an effective resistance of the inductor to AC. The rms current
$$I $$ through an inductor $$L $$ is given by a version of Ohm’s law:

<div class="equation" >
 $$I=\frac{V}{ {X}_{L}}\text{,} $$
</div>

where $$V $$ is the rms voltage across the inductor and $${X}_{L} $$ is defined
to be

<div class="equation" >
 $${X}_{L}=2\pi fL\text{,} $$
</div>

with $$f $$ the frequency of the AC voltage source in hertz (An analysis of the
circuit using Kirchhoff’s loop rule and calculus actually produces this
expression). $${X}_{L} $$ is called the **inductive reactance**, because the
inductor reacts to impede the current. $${X}_{L} $$ has units of ohms ( $$1 H=1
\Omega \cdot \text{s} $$ , so that frequency times inductance has units of
$$\left(\text{cycles/s}\right)\left(\Omega \cdot \text{s}\right)=\Omega $$ ),
consistent with its role as an effective resistance. It makes sense that $${X}_
{L} $$ is proportional to $$L $$ , since the greater the induction the greater
its resistance to change. It is also reasonable that $${X}_{L} $$ is
proportional to frequency $$f $$ , since greater frequency means greater change
in current. That is, $$\Delta I/\Delta t $$ is large for large frequencies (
large $$f $$
*,* small $$\Delta t $$ ). The greater the change, the greater the opposition of
an inductor.

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating Inductive Reactance and then Current
</div>
(a) Calculate the inductive reactance of a 3.00 mH inductor when 60.0 Hz and 10.0 kHz AC voltages are applied. (b) What is the rms current at each frequency if the applied rms voltage is 120 V?

**Strategy**

The inductive reactance is found directly from the expression $${X}_{L}=2\pi fL
$$ . Once $${X}_{L} $$ has been found at each frequency, Ohm’s law as stated in
the Equation $$I=V/{X}_{L} $$ can be used to find the current at each frequency.

**Solution for (a)**

Entering the frequency and inductance into Equation $${X}_{L}=2\pi fL $$ gives

<div class="equation" >
 $${X}_{L}=2\pi fL=6.28\left(60.0/\text{s}\right)\left(3.00 mH\right)=1.13 \Omega \text{ at } 60 \text{Hz}. $$
</div>
Similarly, at 10 kHz,

<div class="equation" >
 $${X}_{L}=2\pi fL= 6.28\left( 1.00 \times 10^{4} \text{/s}\right)\left(3.00 \text{mH}\right)=188 \Omega \text{ at } 10 \text{kHz}. $$
</div>
**Solution for (b)**

The rms current is now found using the version of Ohm’s law in Equation
$$I=V/{X}_{L} $$ , given the applied rms voltage is 120 V. For the first
frequency, this yields

<div class="equation" >
 $$I=\frac{V}{ {X}_{L}}=\frac{120 \text{V}}{1.13 \Omega }=106 \text{A} \text{ at } 60 \text{Hz}. $$
</div> 
Similarly, at 10 kHz,

<div class="equation" >
 $$I=\frac{V}{ {X}_{L}}=\frac{120 \text{V}}{188 \text{Ω}}=0.637 \text{A} \text{ at } 10 kHz. $$
</div>
**Discussion**

The inductor reacts very differently at the two different frequencies. At the
higher frequency, its reactance is large and the current is small, consistent
with how an inductor impedes rapid change. Thus high frequencies are impeded the
most. Inductors can be used to filter out high frequencies; for example, a large
inductor can be put in series with a sound reproduction system or in series with
your home computer to reduce high-frequency sound output from your speakers or
high-frequency power spikes into your computer.

</div>

Note that although the resistance in the circuit considered is negligible, the
AC current is not extremely large because inductive reactance impedes its flow.
With AC, there is no time for the current to become extremely large.

### Capacitors and Capacitive Reactance

Consider the capacitor connected directly to an AC voltage source as shown
in [[Figure 2]](#Figure2). The resistance of a circuit like this can be made so
small that it has a negligible effect compared with the capacitor, and so we can
assume negligible resistance. Voltage across the capacitor and current are
graphed as functions of time in the figure.

![Part a of the figure shows a capacitor C connected across an A C voltage source V. The voltage across the capacitor is given by V C. Part b of the diagram shows a graph for the variation of current and voltage across the capacitor as functions of time. The voltage V C and current I C is plotted along the Y axis and the time t is along the X axis. The graph for current is a progressive sine wave from the origin starting with a wave along the negative Y axis. The graph for voltage is a cosine wave and amplitude slightly less than the current wave.](../resources/Figure_23_11_02.jpg "(a) An AC voltage source in series with a capacitor C having negligible resistance. (b) Graph of current and voltage across the capacitor as functions of time.")
{: #Figure2}

The graph in [[Figure 2]](#Figure2) starts with voltage across the capacitor at
a maximum. The current is zero at this point, because the capacitor is fully
charged and halts the flow. Then voltage drops and the current becomes negative
as the capacitor discharges. At point a, the capacitor has fully discharged (
$$Q=0 $$ on it) and the voltage across it is zero. The current remains negative
between points a and b, causing the voltage on the capacitor to reverse. This is
complete at point b, where the current is zero and the voltage has its most
negative value. The current becomes positive after point b, neutralizing the
charge on the capacitor and bringing the voltage to zero at point c, which
allows the current to reach its maximum. Between points c and d, the current
drops to zero as the voltage rises to its peak, and the process starts to
repeat. Throughout the cycle, the voltage follows what the current is doing by
one-fourth of a cycle:

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
AC Voltage in a Capacitor
</div>
When a sinusoidal voltage is applied to a capacitor, the voltage follows the current by one-fourth of a cycle, or by a  $$90 ^\circ $$
 phase angle.

</div>

The capacitor is affecting the current, having the ability to stop it altogether
when fully charged. Since an AC voltage is applied, there is an rms current, but
it is limited by the capacitor. This is considered to be an effective resistance
of the capacitor to AC, and so the rms current $$I $$ in the circuit containing
only a capacitor $$C $$ is given by another version of Ohm’s law to be

<div class="equation" >
 $$I=\frac{V}{ {X}_{C}}\text{,} $$
</div>

where $$V $$ is the rms voltage and $${X}_{C} $$ is defined (As with $${X}_{L}
$$ , this expression for $${X}_{C} $$ results from an analysis of the circuit
using Kirchhoff’s rules and calculus) to be

<div class="equation" >
 $${X}_{C}=\frac{1}{2\pi \text{fC}}\text{,} $$
</div>

where $${X}_{C} $$ is called the **capacitive reactance**, because the capacitor
reacts to impede the current. $${X}_{C} $$ has units of ohms (verification left
as an exercise for the reader). $${X}_{C} $$ is inversely proportional to the
capacitance $$C $$ ; the larger the capacitor, the greater the charge it can
store and the greater the current that can flow. It is also inversely
proportional to the frequency $$f $$ ; the greater the frequency, the less time
there is to fully charge the capacitor, and so it impedes current less.

<div id="Example2" class="example" markdown="1">
<div class="title">
Calculating Capacitive Reactance and then Current
</div>
(a) Calculate the capacitive reactance of a 5.00 $$\mu$$F capacitor when 60.0 Hz and 10.0 kHz AC voltages are applied. (b) What is the rms current if the applied rms voltage is 120 V?

**Strategy**

The capacitive reactance is found directly from the expression in $${X}_
{C}=\frac{1}{2\pi \text{fC}} $$ . Once $${X}_{C} $$ has been found at each
frequency, Ohm’s law stated as $$I=V/{X}_{C} $$ can be used to find the current
at each frequency.

**Solution for (a)**

Entering the frequency and capacitance into $${X}_{C}=\frac{1}{2\pi \text{fC}}
$$ gives

<div class="equation" >
 $$\begin{array}{lll}{X}_{C}& =& \frac{1}{2\pi \text{fC}}\\ & =& \frac{1}{ 6.28\left( 60.0/\text{s}\right)\left( 5.00 \mu \text{F}\right)}=531 \text{Ω at 60 Hz}\text{.}\end{array} $$
</div>
Similarly, at 10 kHz,

<div class="equation" >
 $$\begin{array}{lll}{X}_{C}& =& \frac{1}{2\pi \text{fC}}=\frac{1}{ 6.28\left( 1.00 \times 10^{4} /\text{s}\right)\left( 5.00 \mu \text{F}\right)}\\ & =& 3.18 \text{Ω at 10 kHz}\end{array}\text{.} $$
</div>
**Solution for (b)**

The rms current is now found using the version of Ohm’s law in $$I=V/{X}_{C} $$
, given the applied rms voltage is 120 V. For the first frequency, this yields

<div class="equation" >
 $$I=\frac{V}{ {X}_{C}}=\frac{120 \text{V}}{531 \text{Ω}}=0.226 \text{A} \text{ at } 60 \text{Hz}. $$
</div>
Similarly, at 10 kHz,

<div class="equation" >
 $$I=\frac{V}{ {X}_{C}}=\frac{120 \text{V}}{3.18 \text{Ω}}=37.7 \text{A} \text{ at } 10 \text{kHz}. $$
</div>
**Discussion**

The capacitor reacts very differently at the two different frequencies, and in
exactly the opposite way an inductor reacts. At the higher frequency, its
reactance is small and the current is large. Capacitors favor change, whereas
inductors oppose change. Capacitors impede low frequencies the most, since low
frequency allows them time to become charged and stop the current. Capacitors
can be used to filter out low frequencies. For example, a capacitor in series
with a sound reproduction system rids it of the 60 Hz hum.

</div>

Although a capacitor is basically an open circuit, there is an rms current in a
circuit with an AC voltage applied to a capacitor. This is because the voltage
is continually reversing, charging and discharging the capacitor. If the
frequency goes to zero (DC), $${X}_{C} $$ tends to infinity, and the current is
zero once the capacitor is charged. At very high frequencies, the capacitor’s
reactance tends to zero—it has a negligible reactance and does not impede the
current (it acts like a simple wire). **Capacitors have the opposite effect on
AC circuits that inductors have**.

### Resistors in an AC Circuit

Just as a reminder, consider [[Figure 3]](#Figure3), which shows an AC voltage
applied to a resistor and a graph of voltage and current versus time. The
voltage and current are exactly **in phase** in a resistor. There is no
frequency dependence to the behavior of plain resistance in a circuit:

![Part a of the diagram shows a resistor R connected across an A C voltage source V. The voltage drop across the resistor R is given by V R.Part b of the diagram shows a graph showing the variation of voltage V R and current I R with time t. the V R and current I R are plotted along Y axis and time t is along the X axis. Both I and V are progressive cosine waves. The amplitude of I wave is more than V wave.](../resources/Figure_23_11_03.jpg "(a) An AC voltage source in series with a resistor. (b) Graph of current and voltage across the resistor as functions of time, showing them to be exactly in phase.  ")
{: #Figure3}

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
AC Voltage in a Resistor
</div>
When a sinusoidal voltage is applied to a resistor, the voltage is exactly in phase with the current—they have a  $$0 ^\circ $$
 phase angle.

</div>

### Section Summary

* For inductors in AC circuits, we find that when a sinusoidal voltage is
  applied to an inductor, the voltage leads the current by one-fourth of a
  cycle, or by a $$90 ^\circ $$ phase angle.
* The opposition of an inductor to a change in current is expressed as a type of
  AC resistance.
* Ohm’s law for an inductor is

  <div class="equation" >
   $$I=\frac{V}{ {X}_{L}}\text{,} $$
  </div>
     where    $$V $$ is the rms voltage across the inductor.
* $${X}_{L} $$ is defined to be the inductive reactance, given by
  <div class="equation" >
   $${X}_{L}=2\pi fL\text{,} $$
  </div>
     with    $$f $$ the frequency of the AC voltage source in hertz.
*  Inductive reactance
   $${X}_{L} $$ has units of ohms and is greatest at high frequencies.
*  For capacitors, we find that when a sinusoidal voltage is applied to a capacitor, the voltage follows the current by one-fourth of a cycle, or by a
   $$90 ^\circ $$ phase angle.
*  Since a capacitor can stop current when fully charged, it limits current and offers another form of AC resistance; Ohm’s law for a capacitor is
  <div class="equation" >
   $$I=\frac{V}{ {X}_{C}}\text{,} $$
  </div>
 where $$V $$ is the rms voltage across the capacitor.
*   $${X}_{C} $$ is defined to be the capacitive reactance, given by
  <div class="equation" >
   $${X}_{C}=\frac{1}{2\pi \text{fC}}\text{.} $$
  </div>

* $${X}_{C} $$ has units of ohms and is greatest at low frequencies.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Presbycusis is a hearing loss due to age that progressively affects higher frequencies. A hearing aid amplifier is designed to amplify all frequencies equally. To adjust its output for presbycusis, would you put a capacitor in series or parallel with the hearing aid’s speaker? Explain.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Would you use a large inductance or a large capacitance in series with a system to filter out low frequencies, such as the 100 Hz hum in a sound system? Explain.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
High-frequency noise in AC power can damage computers. Does the plug-in unit designed to prevent this damage use a large inductance or a large capacitance (in series with the computer) to filter out such high frequencies? Explain.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Does inductance depend on current, frequency, or both? What about inductive reactance?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain why the capacitor in [[Figure 4]](#Figure4)(a) acts as a low-frequency filter between the two circuits, whereas that in [[Figure 4]](#Figure4)(b) acts as a high-frequency filter.

</div>
</div>

![The figure describes two circuits with two different connections. The first part of the diagram shows circuit one and circuit two connected in series and a capacitor C is connected between them. Both the circuits are shown as grounded. The second part of the diagram shows two circuits circuit one and circuit two connected to each other. At the point of connection one end of the capacitor is connected and the other end of the capacitor is grounded. Both the circuits are shown as grounded.](../resources/Figure_23_11_04.jpg "Capacitors and inductors. Capacitor with high frequency and low frequency.")
{: #Figure4}

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If the capacitors in [[Figure 4]](#Figure4) are replaced by inductors, which acts as a low-frequency filter and which as a high-frequency filter?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what frequency will a 30.0 mH inductor have a reactance of  $$100 \text{Ω} $$ ?

</div>
<div class="solution" markdown="1">
531 Hz

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What value of inductance should be used if a  $$20.0 \text{kΩ} $$
 reactance is needed at a frequency of 500 Hz?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What capacitance should be used to produce a  $$2.00 \text{MΩ} $$
 reactance at 60.0 Hz?

</div>
<div class="solution" markdown="1">
1.33 nF

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what frequency will an 80.0 mF capacitor have a reactance of  $$0.250 \text{Ω} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Find the current through a 0.500 H inductor connected to a 60.0 Hz, 480 V AC source. (b) What would the current be at 100 kHz?

</div>
<div class="solution" markdown="1">
(a) 2.55 A

(b) 1.53 mA

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What current flows when a 60.0 Hz, 480 V AC source is connected to a  $$0.250 \text{μF} $$
 capacitor? (b) What would the current be at 25.0 kHz?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 20.0 kHz, 16.0 V source connected to an inductor produces a 2.00 A current. What is the inductance?

</div>
<div class="solution" markdown="1">
 $$63.7 \text{µH} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 20.0 Hz, 16.0 V source produces a 2.00 mA current when connected to a capacitor. What is the capacitance?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) An inductor designed to filter high-frequency noise from power supplied to a personal computer is placed in series with the computer. What minimum inductance should it have to produce a  $$2.00 \text{kΩ} $$
 reactance for 15.0 kHz noise? (b) What is its reactance at 60.0 Hz?

</div>
<div class="solution" markdown="1">
(a) 21.2 mH

(b)  $$8.00 \text{Ω} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The capacitor in [[Figure 4]](#Figure4)(a) is designed to filter low-frequency signals, impeding their transmission between circuits. (a) What capacitance is needed to produce a  $$100 \text{kΩ} $$
 reactance at a frequency of 120 Hz? (b) What would its reactance be at 1.00 MHz? (c) Discuss the implications of your answers to (a) and (b).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The capacitor in [[Figure 4]](#Figure4)(b) will filter high-frequency signals by shorting them to earth/ground. (a) What capacitance is needed to produce a reactance of  $$10.0 \text{mΩ} $$
 for a 5.00 kHz signal? (b) What would its reactance be at 3.00 Hz? (c) Discuss the implications of your answers to (a) and (b).

</div>
<div class="solution" markdown="1">
(a) 3.18 mF

(b)  $$16.7 \text{Ω} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

In a recording of voltages due to brain activity (an EEG), a 10.0 mV signal with
a 0.500 Hz frequency is applied to a capacitor, producing a current of 100 mA.
Resistance is negligible. (a) What is the capacitance? (b) What is unreasonable
about this result? (c) Which assumption or premise is responsible?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider the use of an inductor in series with a computer operating on 60 Hz
electricity. Construct a problem in which you calculate the relative reduction
in voltage of incoming high frequency noise compared to 60 Hz voltage. Among the
things to consider are the acceptable series reactance of the inductor for 60 Hz
power and the likely frequencies of noise coming through the power lines.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

inductive reactance
: the opposition of an inductor to a change in current; calculated by $${X}_
{L}=2\pi fL $$

capacitive reactance
: the opposition of a capacitor to a change in current; calculated by $${X}_
{C}=\frac{1}{2\pi \text{fC}} $$

</div>
