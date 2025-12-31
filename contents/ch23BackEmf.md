---
title: Back Emf
layout: page
sectionNumber: 6
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Explain what back emf is and how it is induced.
</div>

It has been noted that motors and generators are very similar. Generators
convert mechanical energy into electrical energy, whereas motors convert
electrical energy into mechanical energy. Furthermore, motors and generators
have the same construction. When the coil of a motor is turned, magnetic flux
changes, and an emf (consistent with Faraday’s law of induction) is induced. The
motor thus acts as a generator whenever its coil rotates. This will happen
whether the shaft is turned by an external input, like a belt drive, or by the
action of the motor itself. That is, when a motor is doing work and its shaft is
turning, an emf is generated. Lenz’s law tells us the emf opposes any change, so
that the input emf that powers the motor will be opposed by the motor’s
self-generated emf, called the **back emf** of the motor. (
See [[Figure 1]](#Figure1).)

![Figure shows an electric circuit. The circuit has a cell represented as driving e m f of voltage one hundred and twenty volt is connected in series with a variable e m f source with a range of voltage from zero to one hundred twenty volts and a resistance R. The other end of resistance R is connected to an open switch. The switch is connected back to the Driving e m f cell.](../resources/Figure_23_06_01.jpg 'The coil of a DC motor is represented as a resistor in this schematic. The back emf is represented as a variable emf that opposes the one driving the motor. Back emf is zero when the motor is not turning, and it increases proportionally to the motor’s angular velocity.')
{: #Figure1}

Back emf is the generator output of a motor, and so it is proportional to the
motor’s angular velocity $$\omega $$ . It is zero when the motor is first turned
on, meaning that the coil receives the full driving voltage and the motor draws
maximum current when it is on but not turning. As the motor turns faster and
faster, the back emf grows, always opposing the driving emf, and reduces the
voltage across the coil and the amount of current it draws. This effect is
noticeable in a number of situations. When a vacuum cleaner, refrigerator, or
washing machine is first turned on, lights in the same circuit dim briefly due
to the $$IR $$ drop produced in feeder lines by the large current drawn by the
motor. When a motor first comes on, it draws more current than when it runs at
its normal operating speed. When a mechanical load is placed on the motor, like
an electric wheelchair going up a hill, the motor slows, the back emf drops,
more current flows, and more work can be done. If the motor runs at too low a
speed, the larger current can overheat it (via resistive power in the coil,
$$P={I}^{2}R $$ ), perhaps even burning it out. On the other hand, if there is
no mechanical load on the motor, it will increase its angular velocity $$\omega $$

until the back emf is nearly equal to the driving emf. Then the motor uses
only enough energy to overcome friction.

Consider, for example, the motor coils represented in [[Figure 1]](#Figure1).
The coils have a $$0.400 \Omega $$ equivalent resistance and are driven by a
48.0 V emf. Shortly after being turned on, they draw a current $$I=V/R=\left( 48.0 \text{V}\right)/\left( 0.400 \Omega \right)=120 \text{A} $$ and, thus,
dissipate $$P={I}^{2}R= 5.76 \text{kW} $$ of energy as heat transfer. Under
normal operating conditions for this motor, suppose the back emf is 40.0 V. Then
at operating speed, the total voltage across the coils is 8.0 V (48.0 V minus
the 40.0 V back emf), and the current drawn is $$I=V/R=\left( 8.0 \text{V}\right)/\left( 0.400 \Omega \right)=20 \text{A} $$ . Under normal load,
then, the power dissipated is $$P=IV=\left(20 \text{A}\right)/\left( 8.0 \text{V}\right)=160 \text{W} $$ . The latter will not cause a problem for this
motor, whereas the former 5.76 kW would burn out the coils if sustained.

### Section Summary

* Any rotating coil will have an induced emf—in motors, this is called back emf,
  since it opposes the emf input to the motor.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Suppose you find that the belt drive connecting a powerful motor to an air conditioning unit is broken and the motor is running freely. Should you be worried that the motor is consuming a great deal of energy for no useful purpose? Explain why or why not.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose a motor connected to a 120 V source draws 10.0 A when it first starts. (a) What is its resistance? (b) What current does it draw at its normal operating speed when it develops a 100 V back emf?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) When first starting, back emf is zero, so use Ohm's law with full voltage.
(b) At operating speed, the effective voltage is the supply voltage minus back emf.

**Solution**

**(a)** At startup, back emf = 0, so the full 120 V appears across the resistance:

<div class="equation">
$$R=\frac{V}{I}=\frac{120 \text{ V}}{10.0 \text{ A}}=12.0 \text{ Ω}$$
</div>

**(b)** At operating speed, the effective voltage across the resistance is:

<div class="equation">
$$V_{\text{eff}}=V_{\text{supply}}-V_{\text{back emf}}=120 \text{ V}-100 \text{ V}=20 \text{ V}$$
</div>

The current is:

<div class="equation">
$$I=\frac{V_{\text{eff}}}{R}=\frac{20 \text{ V}}{12.0 \text{ Ω}}=1.67 \text{ A}$$
</div>

**Discussion**

The current drops from 10.0 A at startup to 1.67 A at operating speed—a factor of 6 reduction. This is why motors draw large "inrush" currents when starting and why circuit breakers must be rated to handle these transient currents. The back emf acts as a self-regulating mechanism that limits the motor's current draw during normal operation.

**Final Answer**

(a) 12.0 Ω; (b) 1.67 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A motor operating on 240 V electricity has a 180 V back emf at operating speed and draws a 12.0 A current. (a) What is its resistance? (b) What current does it draw when it is first started?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) At operating speed, find resistance using the effective voltage (supply minus back emf).
(b) At startup, use the full supply voltage with the resistance from part (a).

**Solution**

**(a)** At operating speed, the effective voltage is:

<div class="equation">
$$V_{\text{eff}}=240 \text{ V}-180 \text{ V}=60 \text{ V}$$
</div>

The resistance is:

<div class="equation">
$$R=\frac{V_{\text{eff}}}{I}=\frac{60 \text{ V}}{12.0 \text{ A}}=5.00 \text{ Ω}$$
</div>

**(b)** At startup, back emf = 0, so the current is:

<div class="equation">
$$I=\frac{V_{\text{supply}}}{R}=\frac{240 \text{ V}}{5.00 \text{ Ω}}=48.0 \text{ A}$$
</div>

**Discussion**

The startup current of 48.0 A is four times the operating current of 12.0 A. This large inrush current explains why large motors often require special starting circuits (like soft starters or star-delta starters) to limit the current surge and prevent tripping circuit breakers or causing voltage sags in the power system.

**Final Answer**

(a) 5.00 Ω; (b) 48.0 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the back emf of a 120 V motor that draws 8.00 A at its normal speed and 20.0 A when first starting?

</div>
<div class="solution" markdown="1">
**Strategy**

First find the resistance using startup conditions (no back emf), then use it to find back emf at operating speed.

**Solution**

At startup, back emf = 0, so:

<div class="equation">
$$R=\frac{V}{I_{\text{start}}}=\frac{120 \text{ V}}{20.0 \text{ A}}=6.00 \text{ Ω}$$
</div>

At operating speed, the effective voltage across the resistance is:

<div class="equation">
$$V_{\text{eff}}=IR=(8.00 \text{ A})(6.00 \text{ Ω})=48.0 \text{ V}$$
</div>

The back emf is:

<div class="equation">
$$V_{\text{back emf}}=V_{\text{supply}}-V_{\text{eff}}=120 \text{ V}-48.0 \text{ V}=72.0 \text{ V}$$
</div>

**Discussion**

The back emf of 72.0 V is 60% of the supply voltage, which is typical for motors at normal operating speed. This substantial back emf reduces the current from 20.0 A to 8.00 A, preventing overheating and allowing efficient operation. The back emf represents the motor's energy conversion from electrical to mechanical form.

**Final Answer**

72.0 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The motor in a toy car operates on 6.00 V, developing a 4.50 V back emf at normal speed. If it draws 3.00 A at normal speed, what current does it draw when starting?

</div>
<div class="solution" markdown="1">
**Strategy**

Find the resistance using operating conditions, then calculate startup current with full voltage and no back emf.

**Solution**

At operating speed, the effective voltage is:

<div class="equation">
$$V_{\text{eff}}=6.00 \text{ V}-4.50 \text{ V}=1.50 \text{ V}$$
</div>

The resistance is:

<div class="equation">
$$R=\frac{V_{\text{eff}}}{I}=\frac{1.50 \text{ V}}{3.00 \text{ A}}=0.500 \text{ Ω}$$
</div>

At startup, back emf = 0, so:

<div class="equation">
$$I_{\text{start}}=\frac{V_{\text{supply}}}{R}=\frac{6.00 \text{ V}}{0.500 \text{ Ω}}=12.0 \text{ A}$$
</div>

**Discussion**

The startup current of 12.0 A is four times the operating current of 3.00 A. For a toy car motor, this surge is brief and manageable, but it illustrates why small batteries can sometimes struggle to start motors—the internal resistance of depleted batteries limits the current they can supply during startup.

**Final Answer**

12.0 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

The motor in a toy car is powered by four batteries in series, which produce a
total emf of 6.00 V. The motor draws 3.00 A and develops a 4.50 V back emf at
normal speed. Each battery has a $$0.100 \text{Ω} $$ internal resistance. What
is the resistance of the motor?

</div>
<div class="solution" markdown="1">
**Strategy**

Account for the internal resistance of all four batteries in series, then find the motor resistance using the voltage distribution in the circuit.

**Solution**

The total internal resistance of four batteries is:

<div class="equation">
$$R_{\text{internal}}=4 \times 0.100 \text{ Ω}=0.400 \text{ Ω}$$
</div>

The total resistance in the circuit includes the motor resistance $$R_{\text{motor}}$$ and internal resistance. The effective voltage across the motor resistance is the supply voltage minus the back emf and voltage drop across internal resistance:

<div class="equation">
$$V_{\text{motor}}=V_{\text{supply}}-V_{\text{back emf}}-IR_{\text{internal}}$$
</div>

<div class="equation">
$$V_{\text{motor}}=6.00 \text{ V}-4.50 \text{ V}-(3.00 \text{ A})(0.400 \text{ Ω})=1.50 \text{ V}-1.20 \text{ V}=0.300 \text{ V}$$
</div>

The motor resistance is:

<div class="equation">
$$R_{\text{motor}}=\frac{V_{\text{motor}}}{I}=\frac{0.300 \text{ V}}{3.00 \text{ A}}=0.100 \text{ Ω}$$
</div>

**Discussion**

The motor resistance (0.100 Ω) is quite small, comparable to the internal resistance of a single battery. Most of the voltage drop in this circuit occurs across the back emf (4.50 V) and the battery internal resistance (1.20 V), with only 0.300 V dissipated as heat in the motor resistance. This is characteristic of an efficient motor at operating speed.

**Final Answer**

0.100 Ω

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

back emf
: the emf generated by a running motor, because it consists of a coil turning in
a magnetic field; it opposes the voltage powering the motor

</div>