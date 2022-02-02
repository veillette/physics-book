---
title: "RL Circuits"
layout: page
---

<div class="abstract" markdown="1">
* Calculate the current in an RL circuit after a specified number of characteristic time steps.
* Calculate the characteristic time of an RL circuit.
* Sketch the current in an RL circuit over time.
</div>

We know that the current through an inductor $$L $$ cannot be turned on or off
instantaneously. The change in current changes flux, inducing an emf opposing
the change (Lenz’s law). How long does the opposition last? Current **will** flow and **can** be turned off, but how long does it
take? [[Figure 1]](#Figure1) shows a switching circuit that can be used to
examine current through an inductor as a function of time.

![Part a of the figure shows an inductor connected in series with a resistor. The arrangement is connected across a cell by an on and off switch with two positions. When in position one, the battery, resistor, and inductor are in series and a current is established. In position two, the battery is removed and the current stops eventually because of energy loss in the resistor. Part b of the diagram shows the graph when the switch is in position one. It shows a graph for current growth verses time. The current is along the Y axis and the time is along the X axis. The graph shows a smooth rise from origin to a maximum value I zero corresponding to Y axis and value four tau on X axis. Part c of the diagram shows the graph when the switch is in position two. It shows a graph for current decay verses time is shown. The current is along the Y axis and the time is along the X axis. The graph is decreasing curve from a value I zero on Y axis, touching the X axis at a point where value of time equals four tau.](../resources/Figure_24_10_01.jpg "(a) An RL circuit with a switch to turn current on and off. When in position 1, the battery, resistor, and inductor are in series and a current is established. In position 2, the battery is removed and the current eventually stops because of energy loss in the resistor. (b) A graph of current growth versus time when the switch is moved to position 1. (c) A graph of current decay when the switch is moved to position 2.")
{: #Figure1}

When the switch is first moved to position 1 (at $$t=0 $$ ), the current is zero
and it eventually rises to $${I}_{0}=V/R $$ , where $$R $$ is the total
resistance of the circuit. The opposition of the inductor $$L $$ is greatest at
the beginning, because the amount of change is greatest. The opposition it poses
is in the form of an induced emf, which decreases to zero as the current
approaches its final value. The opposing emf is proportional to the amount of
change left. This is the hallmark of an exponential behavior, and it can be
shown with calculus that

<div class="equation" >
 $$I={I}_{0}\left(1-{e}^{-t/\tau }\right)\text{    (turning on),} $$
</div>

is the current in an *RL* circuit when switched on (Note the similarity to the
exponential behavior of the voltage on a charging capacitor). The initial
current is zero and approaches $${I}_{0}=V/R $$ with a **characteristic time
constant**  $$\tau $$ for an *RL* circuit, given by

<div class="equation" >
 $$\tau =\frac{L}{R}\text{,} $$
</div>

where $$\tau $$ has units of seconds, since $$1 \text{H}=1
\text{Ω}\text{·}\text{s} $$ . In the first period of time $$\tau $$ , the
current rises from zero to $$ 0.632{I}_{0} $$ , since $$I={I}_{0}\left(
1-{e}^{-1}\right)={I}_{0}\left(1 -0.368\right)= 0.632{I}_{0} $$ . The current
will go 0.632 of the remainder in the next time $$\tau $$ . A well-known
property of the exponential is that the final value is never exactly reached,
but 0.632 of the remainder to that value is achieved in every characteristic
time $$\tau $$ . In just a few multiples of the time $$\tau $$ , the final value
is very nearly achieved, as the graph in [[Figure 1]](#Figure1)(b) illustrates.

The characteristic time $$\tau $$ depends on only two factors, the inductance
$$L $$ and the resistance $$R $$ . The greater the inductance $$L $$ , the
greater $$\tau $$ is, which makes sense since a large inductance is very
effective in opposing change. The smaller the resistance $$R $$ , the greater
$$\tau $$ is. Again this makes sense, since a small resistance means a large
final current and a greater change to get there. In both cases—large $$L $$ and
small $$R $$ —more energy is stored in the inductor and more time is required to
get it in and out.

When the switch in [[Figure 1]](#Figure1)(a) is moved to position 2 and cuts the
battery out of the circuit, the current drops because of energy dissipation by
the resistor. But this is also not instantaneous, since the inductor opposes the
decrease in current by inducing an emf in the same direction as the battery that
drove the current. Furthermore, there is a certain amount of energy, $$\left(1
\text{/2}\right){\text{LI}}_{0}^{2} $$ , stored in the inductor, and it is
dissipated at a finite rate. As the current approaches zero, the rate of
decrease slows, since the energy dissipation rate is $${I}^{2}R $$ . Once again
the behavior is exponential, and $$I $$ is found to be

<div class="equation" >
 $$I={I}_{0}{e}^{-t/\tau }\text{    (turning off).} $$
</div>

(See [[Figure 1]](#Figure1)(c).) In the first period of time $$\tau =L/R $$
after the switch is closed, the current falls to 0.368 of its initial value,
since $$I={I}_{0}{e}^{-1}= 0.368{I}_{0} $$ . In each successive time $$\tau $$ ,
the current falls to 0.368 of the preceding value, and in a few multiples of
$$\tau $$ , the current becomes very close to zero, as seen in the graph
in [[Figure 1]](#Figure1)(c).

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating Characteristic Time and Current in an *RL* Circuit
</div>
(a) What is the characteristic time constant for a 7.50 mH inductor in series with a  $$3.00 \text{Ω} $$
 resistor? (b) Find the current 5.00 ms after the switch is moved to position 2 to disconnect the battery, if it is initially 10.0 A.

**Strategy for (a)**

The time constant for an *RL* circuit is defined by $$\tau =L/R $$.

**Solution for (a)**

Entering known values into the expression for $$\tau $$ given in $$\tau =L/R $$
yields

<div class="equation" >
 $$\tau =\frac{L}{R}=\frac{7.50 \text{mH}}{3.00 \Omega }=2.50 \text{ms}. $$
</div>
**Discussion for (a)**

This is a small but definitely finite time. The coil will be very close to its
full current in about ten time constants, or about 25 ms.

**Strategy for (b)**

We can find the current by using $$I={I}_{0}{e}^{-t/\tau } $$ , or by
considering the decline in steps. Since the time is twice the characteristic
time, we consider the process in steps.

**Solution for (b)**

In the first 2.50 ms, the current declines to 0.368 of its initial value, which
is

<div class="equation" >
 $$\begin{array}{lll}I& =&  0.368{I}_{0}=\left( 0.368\right)\left(10.0 \text{A}\right)\\ & =& 3.68 \text{A at }t= 2.50\text{ ms.}\end{array} $$
</div>
After another 2.50 ms, or a total of 5.00 ms, the current declines to 0.368 of the value just found. That is,

<div class="equation" >
 $$\begin{array}{lll}I^{\prime}& =&  0.368I=\left( 0.368\right)\left(3.68 \text{A}\right)\\ & =&  1.35\text{ A at }t= 5.00\text{ ms.}\end{array} $$
</div>
**Discussion for (b)**

After another 5.00 ms has passed, the current will be 0.183 A (
see [[Exercise 4]](#Exercise4)); so, although it does die out, the current
certainly does not go to zero instantaneously.

</div>

In summary, when the voltage applied to an inductor is changed, the current also
changes, **but the change in current lags the change in voltage in an RL
circuit**.
In [Reactance, Inductive and Capacitive](../contents/ch23ReactanceInductiveAndCapacitive),
we explore how an *RL* circuit behaves when a sinusoidal AC voltage is applied.

### Section Summary

* When a series connection of a resistor and an inductor—an *RL* circuit—is
  connected to a voltage source, the time variation of the current is

  <div class="equation" >
   $$I={I}_{0}\left(1-{e}^{-t/\tau }\right)\text{    (turning on).} $$
  </div>
     where
   $${I}_{0}=V/R $$ is the final current.
* The characteristic time constant $$\tau $$ is $$\tau =\frac{L}{R} $$ , where
  $$L $$ is the inductance and $$R $$ is the resistance.
* In the first time constant $$\tau $$ , the current rises from zero to $$
  0.632{I}_{0} $$ , and 0.632 of the remainder in every subsequent time interval
  $$\tau $$ .

* When the inductor is shorted through a resistor, current decreases as

  <div class="equation" >
   $$I={I}_{0}{e}^{-t/\tau }\text{    (turning off).} $$
  </div>
     Here
   $${I}_{0} $$ is the initial current.
* Current falls to $$ 0.368{I}_{0} $$ in the first time interval $$\tau $$ , and
  0.368 of the remainder toward zero in each subsequent time $$\tau $$ .

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If you want a characteristic *RL* time constant of 1.00 s, and you have a  $$500 \text{Ω} $$
 resistor, what value of self-inductance is needed?

</div>
<div class="solution" markdown="1">
500 H

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Your *RL* circuit has a characteristic time constant of 20.0 ns, and a resistance of  $$5.00 \text{MΩ} $$ .
 (a) What is the inductance of the circuit? (b) What resistance would give you a 1.00 ns time constant, perhaps needed for quick response in an oscilloscope?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A large superconducting magnet, used for magnetic resonance imaging, has a 50.0 H inductance. If you want current through it to be adjustable with a 1.00 s characteristic time constant, what is the minimum resistance of system?

</div>
<div class="solution" markdown="1">
 $$50.0 \text{Ω} $$
</div>
</div>

<div id="Exercise4" class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify that after a time of 10.0 ms, the current for the situation considered in [[Example 1]](#Example1) will be 0.183 A as stated.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you have a supply of inductors ranging from 1.00 nH to 10.0 H, and resistors ranging from  $$0.100 \text{Ω} $$
 to  $$1.00 \text{MΩ} $$ .
 What is the range of characteristic *RL* time constants you can produce by connecting a single resistor to a single inductor?

</div>
<div class="solution" markdown="1">
 $$ 1.00 \times 10^{-18} \text{s} $$
 to 0.100 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the characteristic time constant of a 25.0 mH inductor that has a resistance of  $$4.00 \text{Ω} $$ ?
 (b) If it is connected to a 12.0 V battery, what is the current after 12.5 ms?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What percentage of the final current  $${I}_{0} $$
 flows through an inductor  $$L $$  in series with a resistor  $$R $$ ,
 three time constants after the circuit is completed?

</div>
<div class="solution" markdown="1">
95.0%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The 5.00 A current through a 1.50 H inductor is dissipated by a  $$2.00 \text{Ω} $$
 resistor in a circuit like that in [[Figure 1]](#Figure1) with the switch in position 2. (a) What is the initial energy in the inductor? (b) How long will it take the current to decline to 5.00% of its initial value? (c) Calculate the average power dissipated, and compare it with the initial power dissipated by the resistor.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Use the exact exponential treatment to find how much time is required to bring the current through an 80.0 mH inductor in series with a  $$15.0 \text{Ω} $$
 resistor to 99.0% of its final value, starting from zero. (b) Compare your answer to the approximate treatment using integral numbers of  $$\tau  $$ .
 (c) Discuss how significant the difference is.

</div>
<div class="solution" markdown="1">
(a) 24.6 ms

(b) 26.7 ms

(c) 9% difference, which is greater than the inherent uncertainty in the given
parameters.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Using the exact exponential treatment, find the time required for the current through a 2.00 H inductor in series with a  $$0.500 \text{Ω} $$
 resistor to be reduced to 0.100% of its original value. (b) Compare your answer to the approximate treatment using integral numbers of  $$\tau  $$ .
 (c) Discuss how significant the difference is.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

characteristic time constant
: denoted by $$\tau $$ , of a particular series *RL* circuit is calculated by
$$\tau =\frac{L}{R} $$ , where $$L $$ is the inductance and $$R $$ is the
resistance

</div>
