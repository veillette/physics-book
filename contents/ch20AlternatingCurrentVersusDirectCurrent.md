---
title: "Alternating Current versus Direct Current"
layout: page
---

<div class="abstract" markdown="1">
* Explain the differences and similarities between AC and DC current.
* Calculate rms voltage, current, and average power.
* Explain why AC current is used for power transmission.
</div>

### Alternating Current

Most of the examples dealt with so far, and particularly those utilizing
batteries, have constant voltage sources. Once the current is established, it is
thus also a constant. **Direct current** (DC) is the flow of electric charge in
only one direction. It is the steady state of a constant-voltage circuit. Most
well-known applications, however, use a time-varying voltage source. 
**Alternating current** (AC) is the flow of electric charge that
periodically reverses direction. If the source varies periodically, particularly
sinusoidally, the circuit is known as an alternating current circuit. Examples
include the commercial and residential power that serves so many of our
needs. [[Figure 1]](#Figure1) shows graphs of voltage and current versus time
for typical DC and AC power. The AC voltages and frequencies commonly used in
homes and businesses vary around the world.

![Part a shows a graph of voltage V and current I versus time for a D C source. The time is along the x axis and V and I are along the y axis. The graph shows that the voltage V sub D C and the current I sub D C do not vary with time. Part b shows the variation of voltage V and current I with time for an A C source. The time is along the horizontal axis and V and I are along the vertical axis. The graph for I is a progressing sine wave with a peak value I sub zero on the positive y axis and negative I sub zero on the negative y axis. The graph for V is a progressing sine wave with a higher amplitude than the current curve with a peak value V sub zero on the positive y axis and negative V sub zero on the negative y axis. The peak values of the voltage and current sine waves occur at the same time because they are in phase.](../resources/Figure_20_05_01.jpg "(a) DC voltage and current are constant in time, once the current is established. (b) A graph of voltage and current versus time for 60-Hz AC power. The voltage and current are sinusoidal and are in phase for a simple resistance circuit. The frequencies and peak voltages of AC sources differ greatly.")
{ #Figure1}

![The potential difference variation of an alternating current voltage source with time is shown as a progressing sine wave. The voltage is shown along the vertical axis and the time is along the horizontal axis. Circuit diagrams show that current flowing in one direction corresponds to positive values of the voltage sine wave. Current flowing in the opposite direction in the circuit corresponds to negative values of the voltage sine wave. The maximum value of the voltage sine wave is plus V sub zero. The minimum value of the voltage sine wave is minus V sub zero.](../resources/Figure_20_05_03.jpg "The potential difference V between the terminals of an AC voltage source fluctuates as shown. The mathematical expression for V is given by \( V=V_0 \sin{ 2 \pi f t } \)   ")
{ #Figure2}

[[Figure 2]](#Figure2) shows a schematic of a simple circuit with an AC voltage
source. The voltage between the terminals fluctuates as shown, with the **AC
voltage** given by

<div class="equation" >
 $$V={V}_{0} \sin 2\pi \text{ft} \text{,}  $$
</div>

where $$V $$ is the voltage at time $$t $$
<em>, </em> $${V}_{0} $$ is the peak voltage, and $$f $$ is the frequency in
hertz. For this simple resistance circuit, $$I=V/R $$ , and so the **AC
current** is

<div class="equation" >
 $$I={I}_{0} \sin 2\pi \text{ft} \text{,}  $$
</div>

where $$I $$ is the current at time $$t $$ , and $${I}_{0}={V}_{0}\text{/R} $$
is the peak current. For this example, the voltage and current are said to be in
phase, as seen in [[Figure 1]](#Figure1)(b).

Current in the resistor alternates back and forth just like the driving voltage,
since $$I=V/R $$ . If the resistor is a fluorescent light bulb, for example, it
brightens and dims 120 times per second as the current repeatedly goes through
zero. A 120-Hz flicker is too rapid for your eyes to detect, but if you wave
your hand back and forth between your face and a fluorescent light, you will see
a stroboscopic effect evidencing AC. The fact that the light output fluctuates
means that the power is fluctuating. The power supplied is $$P=IV $$ . Using the
expressions for $$I $$ and $$V $$ above, we see that the time dependence of
power is $$P={I}_{0}{V}_{0} {\sin}^{2} 2\pi \text{ft} $$ , as shown
in [[Figure 3]](#Figure3).

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment—AC/DC Lights
</div>
Wave your hand back and forth between your face and a fluorescent light bulb. Do you observe the same thing with the headlights on your car? Explain what you observe. *Warning: Do not look directly at very bright light*.

</div>

![A graph showing the variation of power P with time t. The power is along the vertical axis and time is along the horizontal axis. The curve is a sine wave starting at the origin on the horizontal axis and having the crests and troughs both above the positive horizontal axis. The maximum value of power is given by the peak value, which is the product of I sub zero and V sub zero. The average power is indicated by a dotted line through the center of the wave parallel to the horizontal axis with a value half of the product of I sub zero and V sub zero.](../resources/Figure_20_05_04.jpg "AC power as a function of time. Since the voltage and current are in phase here, their product is non-negative and fluctuates between zero and \( I_0 V_0 \) . Average power is \( 1/2 I_0 V_0 \).")
{ #Figure3}

We are most often concerned with average power rather than its fluctuations—that
60-W light bulb in your desk lamp has an average power consumption of 60 W, for
example. As illustrated in [[Figure 3]](#Figure3), the average power $${P}_
{\text{ave}} $$ is

<div class="equation" >
 $${P}_{\text{ave}}=\frac{1}{2}{I}_{0}{V}_{0}. $$
</div>

This is evident from the graph, since the areas above and below the $$\left(
1/2\right){I}_{0}{V}_{0} $$ line are equal, but it can also be proven using
trigonometric identities. Similarly, we define an average or **rms current**
$${I}_{\text{rms}} $$ and average or **rms voltage**  $${V}_{\text{rms}} $$ to
be, respectively,

<div class="equation" >
 $${I}_{\text{rms}}=\frac{ {I}_{0}}{\sqrt{2}} $$
</div>

and

<div class="equation" >
 $${V}_{\text{rms}}=\frac{ {V}_{0}}{\sqrt{2}}. $$
</div>

where rms stands for root-mean-square, a particular kind of average. In general,
to obtain a root-mean-square, the particular quantity is squared, its mean (or
average) is found, and the square root is taken. This is useful for AC, since
the average value is zero. Now,

<div class="equation" >
 $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}}, $$
</div>

which gives

<div class="equation" >
 $${P}_{\text{ave}}=\frac{ {I}_{0}}{\sqrt{2}}\cdot \frac{ {V}_{0}}{\sqrt{2}}=\frac{1}{2}{I}_{0}{V}_{0}, $$
</div>

as stated above. It is standard practice to quote $${I}_{\text{rms}} $$ , $${V}_
{\text{rms}} $$ , and $${P}_{\text{ave}} $$ rather than the peak values. For
example, most household electricity is 120 V AC, which means that $${V}_
{\text{rms}} $$
** is 120 V. The common 10-A circuit breaker will interrupt a sustained $${I}_
{\text{rms}} $$
** greater than 10 A. Your 1.0-kW microwave oven consumes $${P}_{\text{ave}}=1.0
\text{kW} $$ , and so on. You can think of these rms and average values as the
equivalent DC values for a simple resistive circuit.

To summarize, when dealing with AC, Ohm’s law and the equations for power are
completely analogous to those for DC, but rms and average values are used for
AC. Thus, for AC, Ohm’s law is written

<div class="equation" >
 $${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{R}. $$
</div>

The various expressions for AC power $${P}_{\text{ave}} $$ are

<div class="equation" >
 $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}}, $$
</div>

<div class="equation" >
 $${P}_{\text{ave}}=\frac{ {V}_{\text{rms}}^{2}}{R}, $$
</div>

and

<div class="equation" >
 $${P}_{\text{ave}}={I}_{\text{rms}}^{2}R. $$
</div>

<div id="Example1" class="example" markdown="1">
<div class="title">
Peak Voltage and Power for AC
</div>
(a) What is the value of the peak voltage for 120-V AC power? (b) What is the peak power consumption rate of a 60.0-W AC light bulb?

**Strategy**

We are told that $${V}_{\text{rms}} $$ is 120 V and $${P}_{\text{ave}} $$ is
60.0 W. We can use $${V}_{\text{rms}}=\frac{ {V}_{0}}{\sqrt{2}} $$ to find the
peak voltage, and we can manipulate the definition of power to find the peak
power from the given average power.

**Solution for (a)**

Solving the equation $${V}_{\text{rms}}=\frac{ {V}_{0}}{\sqrt{2}} $$ for the
peak voltage $${V}_{0} $$ and substituting the known value for $${V}_
{\text{rms}} $$ gives

<div class="equation" >
 $${V}_{0}=\sqrt{2}{V}_{\text{rms}}= 1.414 \left(120 \text{V}\right)=170 \text{V}. $$
</div>
**Discussion for (a)**

This means that the AC voltage swings from 170 V to $$-170 \text{V} $$ and back
60 times every second. An equivalent DC voltage is a constant 120 V.

**Solution for (b)**

Peak power is peak current times peak voltage. Thus,

<div class="equation" >
 $${P}_{0}={I}_{0}{V}_{0}=2\left(\frac{1}{2}{I}_{0}{V}_{0}\right)=2{P}_{\text{ave}}. $$
</div>
We know the average power is 60.0 W, and so

<div class="equation" >
 $${P}_{0}=2\left(60.0 \text{W}\right)=120 \text{W}. $$
</div>
**Discussion**

So the power swings from zero to 120 W one hundred twenty times per second (
twice each cycle), and the power averages 60 W.

</div>

### Why Use AC for Power Distribution?

Most large power-distribution systems are AC. Moreover, the power is transmitted
at much higher voltages than the 120-V AC (240 V in most parts of the world) we
use in homes and on the job. Economies of scale make it cheaper to build a few
very large electric power-generation plants than to build numerous small ones.
This necessitates sending power long distances, and it is obviously important
that energy losses en route be minimized. High voltages can be transmitted with
much smaller power losses than low voltages, as we shall see. (
See [[Figure 4]](#Figure4).) For safety reasons, the voltage at the user is
reduced to familiar values. The crucial factor is that it is much easier to
increase and decrease AC voltages than DC, so AC is used in most large power
distribution systems.

![Photograph of transformers installed in transmission lines.](../resources/Figure_20_05_05.jpg "Power is distributed over large distances at high voltage to reduce power loss in the transmission lines. The voltages generated at the power plant are stepped up by passive devices called transformers (see Transformers) to 330 000 volts (or more in some places worldwide). At the point of use, the transformers reduce the voltage transmitted for safe residential and commercial use. (Credit: GeorgHH, Wikimedia Commons)")
{ #Figure4}

<div id="Example2" class="example" markdown="1">
<div class="title">
Power Losses Are Less for High-Voltage Transmission
</div>
(a) What current is needed to transmit 100 MW of power at 200 kV? (b) What is the power dissipated by the transmission lines if they have a resistance of  $$ 1.00 \Omega  $$ ?
 (c) What percentage of the power is lost in the transmission lines?

**Strategy**

We are given $${P}_{\text{ave}}=100 \text{MW} $$ , $${V}_{\text{rms}}=200
\text{kV} $$ , and the resistance of the lines is $$R= 1.00 \Omega $$ . Using
these givens, we can find the current flowing (from $$P=IV $$ )
and then the power dissipated in the lines ( $$P={I}^{2}R $$ ), and we take the
ratio to the total power transmitted.

**Solution**

To find the current, we rearrange the relationship $${P}_{\text{ave}}={I}_
{\text{rms}}{V}_{\text{rms}} $$ and substitute known values. This gives

<div class="equation" >
 $${I}_{\text{rms}}=\frac{ {P}_{\text{ave}}}{ {V}_{\text{rms}}}=\frac{100 \times 10^{6}  \text{W}}{200 \times 10^{3}  \text{V}}=500 \text{A}. $$
</div>
**Solution**

Knowing the current and given the resistance of the lines, the power dissipated
in them is found from $${P}_{\text{ave}}={I}_{\text{rms}}^{2}R $$ . Substituting
the known values gives

<div class="equation" >
 $${P}_{\text{ave}}={I}_{\text{rms}}^{2}R={\left( 500 \text{A} \right)}^{2}\left( 1.00 \Omega \right)=250 \text{kW}. $$
</div>
**Solution**

The percent loss is the ratio of this lost power to the total or input power,
multiplied by 100:

<div class="equation" >
 $$ \% \text{loss}=\frac{250 \text{kW}}{100 \text{MW}} \times 100=0.250\%. $$
</div>
**Discussion**

One-fourth of a percent is an acceptable loss. Note that if 100 MW of power had
been transmitted at 25 kV, then a current of 4000 A would have been needed. This
would result in a power loss in the lines of 16.0 MW, or 16.0% rather than
0.250%. The lower the voltage, the more current is needed, and the greater the
power loss in the fixed-resistance transmission lines. Of course,
lower-resistance lines can be built, but this requires larger and more expensive
wires. If superconducting lines could be economically produced, there would be
no loss in the transmission lines at all. But, as we shall see in a later
chapter, there is a limit to current in superconductors, too. In short, high
voltages are more economical for transmitting power, and AC voltage is much
easier to raise and lower, so that AC is used in most large-scale power
distribution systems.

</div>

It is widely recognized that high voltages pose greater hazards than low
voltages. But, in fact, some high voltages, such as those associated with common
static electricity, can be harmless. So it is not voltage alone that determines
a hazard. It is not so widely recognized that AC shocks are often more harmful
than similar DC shocks. Thomas Edison thought that AC shocks were more harmful
and set up a DC power-distribution system in New York City in the late 1800s.
There were bitter fights, in particular between Edison and George Westinghouse
and Nikola Tesla, who were advocating the use of AC in early power-distribution
systems. AC has prevailed largely due to transformers and lower power losses
with high-voltage transmission.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
PhET Explorations: Generator
</div>
Generate electricity with a bar magnet! Discover the physics behind the phenomena by exploring magnets and how you can use them to make a bulb light.

<div class="media"  data-alt="generator">
<iframe width="660" height="371.4" src="https://veillette.github.io/simulations/generator/#sim-generator"></iframe>
</div>
</div>

### Section Summary

* Direct current (DC) is the flow of electric current in only one direction. It
  refers to systems where the source voltage is constant.
* The voltage source of an alternating current (AC) system puts out $$V={V}_{0}
  \sin 2\pi \text{ft} $$ , where $$V $$ is the voltage at time $$t $$ , $${V}_
  {0} $$ is the peak voltage, and $$f $$ is the frequency in hertz.
* In a simple circuit, $$I=V/R $$ and AC current is $$I={I}_{0} \sin 2\pi
  \text{ft} $$ , where $$I $$ is the current at time $$t $$ , and $${I}_{0}={V}_
  {0}\text{/R} $$ is the peak current.
* The average AC power is $${P}_{\text{ave}}=\frac{1}{2}{I}_{0}{V}_{0} $$ .

* Average (rms) current $${I}_{\text{rms}} $$ and average (rms) voltage $${V}_
  {\text{rms}} $$ are $${I}_{\text{rms}}=\frac{ {I}_{0}}{\sqrt{2}} $$ and $${V}_
  {\text{rms}}=\frac{ {V}_{0}}{\sqrt{2}} $$ , where rms stands for root mean
  square.
* Thus, $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}} $$ .

* Ohm’s law for AC is $${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{R} $$ .

* Expressions for the average power of an AC circuit are $${P}_{\text{ave}}={I}_
  {\text{rms}}{V}_{\text{rms}} $$ , $${P}_{\text{ave}}=\frac{ {V}_{\text{rms}}^{
  2}}{R} $$ , and $${P}_{\text{ave}}={I}_{\text{rms}}^{ 2}R $$ , analogous to
  the expressions for DC circuits.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Give an example of a use of AC power other than in the household. Similarly, give an example of a use of DC power other than that supplied by batteries.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why do voltage, current, and power go through zero 120 times per second for 60-Hz AC electricity?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
You are riding in a train, gazing into the distance through its window. As close objects streak by, you notice that the nearby fluorescent lights make *dashed* streaks. Explain.

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the hot resistance of a 25-W light bulb that runs on 120-V AC? (b) If the bulb’s operating temperature is  $$2700 \text{ºC} $$ ,
 what is its resistance at  $$2600 \text{ºC} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Certain heavy industrial equipment uses AC power that has a peak voltage of 679 V. What is the rms voltage?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
480 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A certain circuit breaker trips when the rms current is 15.0 A. What is the corresponding peak current?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Military aircraft use 400-Hz AC power, because it is possible to design lighter-weight equipment at this higher frequency. What is the time for one complete cycle of this power?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
2.50 ms

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A North American tourist takes his 25.0-W, 120-V AC razor to Europe, finds a special adapter, and plugs it into 240 V AC. Assuming constant resistance, what power does the razor consume as it is ruined?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In this problem, you will verify statements made at the end of the power losses for [[Example 2]](#Example2). (a) What current is needed to transmit 100 MW of power at a voltage of 25.0 kV? (b) Find the power loss in a  $$1.00 \text{-} \Omega  $$
 transmission line. (c) What percent loss does this represent?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
(a) 4.00 kA

(b) 16.0 MW

(c) 16.0%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A small office-building air conditioner operates on 408-V AC and consumes 50.0 kW. (a) What is its effective resistance? (b) What is the cost of running the air conditioner during a hot summer month when it is on 8.00 h per day for 30 days and electricity costs  $$9.00 \text{cents/kW}\cdot \text{h} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the peak power consumption of a 120-V AC microwave oven that draws 10.0 A?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
2.40 kW

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the peak current through a 500-W room heater that operates on 120-V AC power?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two different electrical devices have the same power consumption, but one is meant to be operated on 120-V AC and the other on 240-V AC. (a) What is the ratio of their resistances? (b) What is the ratio of their currents? (c) Assuming its resistance is unaffected, by what factor will the power increase if a 120-V AC device is connected to 240-V AC?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
(a) 4.0

(b) 0.50

(c) 4.0

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Nichrome wire is used in some radiative heaters. (a) Find the resistance needed if the average power output is to be 1.00 kW utilizing 120-V AC. (b) What length of Nichrome wire, having a cross-sectional area of  $$5.00{\text{mm}}^{2} $$ ,
 is needed if the operating temperature is  $$500 \text{ºC} $$ ?
 (c) What power will it draw when first switched on?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the time after  $$t=0 $$
 when the instantaneous voltage of 60-Hz AC first reaches the following values: (a)  $${V}_{0}/2 $$
 (b)  $${V}_{0} $$
 (c) 0.

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
(a) 1.39 ms

(b) 4.17 ms

(c) 8.33 ms

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) At what two times in the first period following  $$t=0 $$
 does the instantaneous voltage in 60-Hz AC equal  $${V}_{\text{rms}} $$ ?
 (b) $$-{V}_{\text{rms}} $$ ?

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{ class="glossary-title"}

direct current
: (DC) the flow of electric charge in only one direction

alternating current
: (AC) the flow of electric charge that periodically reverses direction

AC voltage
: voltage that fluctuates sinusoidally with time, expressed as $$ V = V_0 \sin
2\pi f t $$, where $$V$$ is the voltage at time $$t$$, $$V_0$$ is the peak
voltage, and $$f$$ is the frequency in hertz

AC current
: current that fluctuates sinusoidally with time, expressed as $$ I = I_0 \sin
2\pi f t $$, where $$I$$ is the current at time $$t$$, $$I_0$$ is the peak
current, and $$f$$ is the frequency in hertz

rms current
: the root-mean-square of the current, $${I}_{\text{rms}}={I}_{0}/\sqrt{2} $$ ,
where $$I_0$$ is the peak current, in an AC system

rms voltage
: the root-mean-square of the voltage, $${V}_{\text{rms}}={V}_{0}/\sqrt{2} $$ ,
where $$V_0$$ is the peak voltage, in an AC system

</div>
