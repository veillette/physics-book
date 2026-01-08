---
title: Alternating Current versus Direct Current
layout: page
sectionNumber: 5
chapterNumber: 20
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

![Part a shows a graph of voltage V and current I versus time for a D C source. The time is along the x axis and V and I are along the y axis. The graph shows that the voltage V sub D C and the current I sub D C do not vary with time. Part b shows the variation of voltage V and current I with time for an A C source. The time is along the horizontal axis and V and I are along the vertical axis. The graph for I is a progressing sine wave with a peak value I sub zero on the positive y axis and negative I sub zero on the negative y axis. The graph for V is a progressing sine wave with a higher amplitude than the current curve with a peak value V sub zero on the positive y axis and negative V sub zero on the negative y axis. The peak values of the voltage and current sine waves occur at the same time because they are in phase.](../resources/Figure_20_05_01.jpg '(a) DC voltage and current are constant in time, once the current is established. (b) A graph of voltage and current versus time for 60-Hz AC power. The voltage and current are sinusoidal and are in phase for a simple resistance circuit. The frequencies and peak voltages of AC sources differ greatly.')
{: #Figure1}

![The potential difference variation of an alternating current voltage source with time is shown as a progressing sine wave. The voltage is shown along the vertical axis and the time is along the horizontal axis. Circuit diagrams show that current flowing in one direction corresponds to positive values of the voltage sine wave. Current flowing in the opposite direction in the circuit corresponds to negative values of the voltage sine wave. The maximum value of the voltage sine wave is plus V sub zero. The minimum value of the voltage sine wave is minus V sub zero.](../resources/Figure_20_05_02.jpg 'The potential difference V between the terminals of an AC voltage source fluctuates as shown. The mathematical expression for V is given by ( V=V_0 \\sin{ 2 \\pi f t } )   ')
{: #Figure2}

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

![A graph showing the variation of power P with time t. The power is along the vertical axis and time is along the horizontal axis. The curve is a sine wave starting at the origin on the horizontal axis and having the crests and troughs both above the positive horizontal axis. The maximum value of power is given by the peak value, which is the product of I sub zero and V sub zero. The average power is indicated by a dotted line through the center of the wave parallel to the horizontal axis with a value half of the product of I sub zero and V sub zero.](../resources/Figure_20_05_03.jpg 'AC power as a function of time. Since the voltage and current are in phase here, their product is non-negative and fluctuates between zero and ( I_0 V_0 ) . Average power is ( 1/2 I_0 V_0 ).')
{: #Figure3}

We are most often concerned with average power rather than its fluctuations—that
60-W light bulb in your desk lamp has an average power consumption of 60 W, for
example. As illustrated in [[Figure 3]](#Figure3), the average power $${P}_{\text{ave}} $$ is

<div class="equation" >
 $${P}_{\text{ave}}=\frac{1}{2}{I}_{0}{V}_{0}. $$
</div>

This is evident from the graph, since the areas above and below the $$\left( 1/2\right){I}_{0}{V}_{0} $$ line are equal, but it can also be proven using
trigonometric identities. Similarly, we define an average or **rms current**
$${I}_{\text{rms}} $$ and average or **rms voltage** $${V}_{\text{rms}} $$ to
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

as stated above. It is standard practice to quote $${I}_{\text{rms}} $$ , $${V}_{\text{rms}} $$ , and $${P}_{\text{ave}} $$ rather than the peak values. For
example, most household electricity is 120 V AC, which means that $${V}_{\text{rms}} $$ ** is 120 V. The common 10-A circuit breaker will interrupt a sustained $${I}_{\text{rms}} $$ ** greater than 10 A. Your 1.0-kW microwave oven consumes $${P}_{\text{ave}}=1.0 \text{kW} $$ , and so on. You can think of these rms and average values as the 
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
peak voltage $${V}_{0} $$ and substituting the known value for $${V}_{\text{rms}} $$ gives

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

![Photograph of transformers installed in transmission lines.](../resources/Figure_20_05_04.jpg 'Power is distributed over large distances at high voltage to reduce power loss in the transmission lines. The voltages generated at the power plant are stepped up by passive devices called transformers (see Transformers) to 330 000 volts (or more in some places worldwide). At the point of use, the transformers reduce the voltage transmitted for safe residential and commercial use. (Credit: GeorgHH, Wikimedia Commons)')
{: #Figure4}

<div id="Example2" class="example" markdown="1">
<div class="title">
Power Losses Are Less for High-Voltage Transmission
</div>
(a) What current is needed to transmit 100 MW of power at 200 kV? (b) What is the power dissipated by the transmission lines if they have a resistance of  $$ 1.00 \Omega  $$ ?
 (c) What percentage of the power is lost in the transmission lines?

**Strategy**

We are given $${P}_{\text{ave}}=100 \text{MW} $$ , $${V}_{\text{rms}}=200 \text{kV} $$ , and the resistance of the lines is $$R= 1.00 \Omega $$ . Using
these givens, we can find the current flowing (from $$P=IV $$ )
and then the power dissipated in the lines ( $$P={I}^{2}R $$ ), and we take the
ratio to the total power transmitted.

**Solution**

To find the current, we rearrange the relationship $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}} $$ and substitute known values. This gives

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

- Direct current (DC) is the flow of electric current in only one direction. It
  refers to systems where the source voltage is constant.
- The voltage source of an alternating current (AC) system puts out $$V={V}_{0} \sin 2\pi \text{ft} $$ , where $$V $$ is the voltage at time $$t $$ , $${V}_ $$
  {0} $$ is the peak voltage, and $$f $$ is the frequency in hertz. - In a simple circuit, $$I=V/R $$ and AC current is $$I={I}_{0} \sin 2\pi
  \text{ft} $$ , where $$I $$ is the current at time $$t $$ , and $${I}_{0}={V}_{0}\text{/R} $$ is the peak current. - The average AC power is $${P}_{\text{ave}}=\frac{1}{2}{I}_{0}{V}_{0} $$ . - Average (rms) current $${I}_{\text{rms}} $$ and average (rms) voltage $${V}_{\text{rms}} $$ are $${I}_{\text{rms}}=\frac{ {I}_{0}}{\sqrt{2}} $$ and $${V}_{\text{rms}}=\frac{ {V}_{0}}{\sqrt{2}} $$ , where rms stands for root mean square. - Thus, $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}} $$ . $$

- Ohm’s law for AC is $${I}_{\text{rms}}=\frac{ {V}_{\text{rms}}}{R} $$ .

- Expressions for the average power of an AC circuit are $${P}_{\text{ave}}={I}_{\text{rms}}{V}_{\text{rms}} $$ , $${P}_{\text{ave}}=\frac{ {V}_{\text{rms}}^{ 2}}{R} $$ , and $${P}_{\text{ave}}={I}_{\text{rms}}^{ 2}R $$ , analogous to 
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
(a) What is the hot resistance of a 25-W light bulb that runs on 120-V AC? (b) If the bulb's operating temperature is  $$2700 \text{ºC} $$ ,
 what is its resistance at  $$2600 \text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

For part (a), use $$P = V_{\text{rms}}^{2}/R$$. For part (b), use the temperature dependence of resistance $$R = R_{0}(1 + \alpha \Delta T)$$ with the tungsten temperature coefficient.

**Solution**

**(a)** Calculate the hot resistance:

<div class="equation">
$$R = \frac{V_{\text{rms}}^{2}}{P} = \frac{(120 \text{ V})^{2}}{25 \text{ W}} = \frac{14400 \text{ V}^{2}}{25 \text{ W}} = 576 \text{ Ω}$$
</div>

**(b)** Use the temperature coefficient for tungsten ($$\alpha = 4.5 \times 10^{-3}$$ /°C). With $$\Delta T = 2600 - 2700 = -100$$ °C from the hot operating temperature:

<div class="equation">
$$R_{2600} = R_{2700}(1 + \alpha \Delta T) = 576 \text{ Ω}[1 + (4.5 \times 10^{-3} \text{ /°C})(-100 \text{ °C})]$$
</div>

<div class="equation">
$$R_{2600} = 576 \text{ Ω}(1 - 0.45) = 576 \text{ Ω}(0.55) = 317 \text{ Ω}$$
</div>

**Discussion**

The hot resistance is quite high (576 Ω). At 100°C lower temperature, the resistance drops to 317 Ω—a 45% decrease. This significant temperature dependence explains why incandescent bulbs draw much more current when first switched on (when cold) than during normal operation.

(a) The hot resistance is 576 Ω. (b) At 2600°C, the resistance is approximately 317 Ω.

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
<div class="solution" markdown="1">
**Strategy**

We use the relationship between rms and peak current: $$I_{\text{rms}} = \frac{I_{0}}{\sqrt{2}}$$. Solving for the peak current $$I_{0}$$ will give us the maximum instantaneous current that flows through the circuit.

**Solution**

Rearrange the rms current equation to solve for peak current:

<div class="equation">
$$I_{0} = \sqrt{2} \cdot I_{\text{rms}}$$
</div>

Substitute the known value:

<div class="equation">
$$I_{0} = \sqrt{2} \times 15.0 \text{ A} = 1.414 \times 15.0 \text{ A} = 21.2 \text{ A}$$
</div>

**Discussion**

The peak current of 21.2 A is about 41% higher than the rms value of 15.0 A. This is an important consideration for circuit breakers and fuses, which must be designed to handle the peak current without tripping during normal operation, while still protecting against sustained overcurrent conditions. The breaker responds to the heating effect of current, which is proportional to $$I^{2}$$, and thus relates to the rms value rather than the instantaneous peaks.

The corresponding peak current is 21.2 A.

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
<div class="solution" markdown="1">
**Strategy**

First, find the razor's resistance using its rated power and voltage with $$P = V^{2}/R$$. Then, use this resistance to calculate the power consumed when connected to the higher European voltage.

**Solution**

Calculate the razor's resistance from its rated specifications:

<div class="equation">
$$R = \frac{V^{2}}{P} = \frac{(120 \text{ V})^{2}}{25.0 \text{ W}} = \frac{14400 \text{ V}^{2}}{25.0 \text{ W}} = 576 \text{ Ω}$$
</div>

Now calculate the power consumed when connected to 240 V AC with the same resistance:

<div class="equation">
$$P_{\text{Europe}} = \frac{V^{2}}{R} = \frac{(240 \text{ V})^{2}}{576 \text{ Ω}} = \frac{57600 \text{ V}^{2}}{576 \text{ Ω}} = 100 \text{ W}$$
</div>

Alternatively, since $$P \propto V^{2}$$ for constant resistance, doubling the voltage quadruples the power:

<div class="equation">
$$P_{\text{Europe}} = P_{\text{rated}} \times \left(\frac{V_{\text{Europe}}}{V_{\text{rated}}}\right)^{2} = 25.0 \text{ W} \times \left(\frac{240}{120}\right)^{2} = 25.0 \text{ W} \times 4 = 100 \text{ W}$$
</div>

**Discussion**

The razor consumes four times its rated power (100 W instead of 25 W). This excessive power will cause the razor's motor to overheat and burn out, the heating elements to glow too hot, and potentially cause a fire or electrical damage. This is why travelers need voltage converters, not just plug adapters, when using electrical devices in countries with different voltage standards. Modern "dual voltage" devices (labeled 120-240 V) have internal circuitry that adjusts for different voltages.

The razor consumes 100 W when connected to 240 V AC, which is four times its rated power and will damage or destroy the device.

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
<div class="solution" markdown="1">
**Strategy**

For part (a), use the power equation $$P = V^{2}/R$$ to find the effective resistance. For part (b), calculate the total energy consumed in kW·h, then multiply by the cost per kW·h.

**Solution**

**(a)** Rearrange the power equation to solve for resistance:

<div class="equation">
$$R = \frac{V^{2}}{P} = \frac{(408 \text{ V})^{2}}{50.0 \times 10^{3} \text{ W}} = \frac{166464 \text{ V}^{2}}{50000 \text{ W}} = 3.33 \text{ Ω}$$
</div>

**(b)** Calculate the total energy consumed:

<div class="equation">
$$E = P \times t = 50.0 \text{ kW} \times 8.00 \text{ h/day} \times 30 \text{ days} = 12000 \text{ kW·h}$$
</div>

Calculate the cost:

<div class="equation">
$$\text{Cost} = E \times \text{rate} = 12000 \text{ kW·h} \times \$0.0900/\text{kW·h} = \$1080$$
</div>

**Discussion**

The effective resistance of 3.33 Ω is quite low, which is typical for high-power devices. A low resistance allows a large current to flow, enabling high power consumption. The current drawn is $$I = P/V = 50000 \text{ W}/408 \text{ V} = 122.5 \text{ A}$$, which is substantial and requires heavy-duty wiring.

The monthly operating cost of \$1080 is significant but reasonable for a commercial air conditioning system running 8 hours daily. This cost analysis helps building managers budget for energy expenses and evaluate the economic benefit of more efficient HVAC systems.

(a) The effective resistance is 3.33 Ω. (b) The cost of running the air conditioner for the month is \$1080.

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
<div class="solution" markdown="1">
**Strategy**

First, find the rms current using $$P_{\text{ave}} = I_{\text{rms}} V_{\text{rms}}$$. Then convert to peak current using $$I_{0} = \sqrt{2} \cdot I_{\text{rms}}$$.

**Solution**

Calculate the rms current from the average power:

<div class="equation">
$$I_{\text{rms}} = \frac{P_{\text{ave}}}{V_{\text{rms}}} = \frac{500 \text{ W}}{120 \text{ V}} = 4.17 \text{ A}$$
</div>

Convert to peak current:

<div class="equation">
$$I_{0} = \sqrt{2} \cdot I_{\text{rms}} = 1.414 \times 4.17 \text{ A} = 5.89 \text{ A}$$
</div>

**Discussion**

The peak current of 5.89 A is the maximum instantaneous current flowing through the heater during each AC cycle. The rms current of 4.17 A represents the effective DC equivalent that would produce the same heating effect. For a resistive load like a heater, the current and voltage are in phase, so the peak current occurs at the same instant as the peak voltage. The wiring and circuit breaker for this heater must be rated to handle currents above the peak value to provide a safety margin.

The peak current through the room heater is 5.89 A.

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
<div class="solution" markdown="1">
**Strategy**

For part (a), use $$P = V^{2}/R$$ to find the required hot resistance. For part (b), use the resistivity formula $$R = \rho L/A$$ with the resistivity at the operating temperature. For part (c), find the cold resistance using the temperature coefficient and then calculate the power at room temperature.

**Solution**

**(a)** Find the hot resistance required for 1.00 kW:

<div class="equation">
$$R_{\text{hot}} = \frac{V^{2}}{P} = \frac{(120 \text{ V})^{2}}{1000 \text{ W}} = \frac{14400 \text{ V}^{2}}{1000 \text{ W}} = 14.4 \text{ Ω}$$
</div>

**(b)** Use the resistivity of Nichrome at 500°C. First, find the resistivity at the operating temperature using $$\rho = \rho_{0}(1 + \alpha \Delta T)$$, where $$\rho_{0} = 1.00 \times 10^{-6} \text{ Ω·m}$$ at 20°C and $$\alpha = 0.4 \times 10^{-3}$$ /°C for Nichrome:

<div class="equation">
$$\rho_{500} = (1.00 \times 10^{-6} \text{ Ω·m})[1 + (0.4 \times 10^{-3} \text{ /°C})(500 - 20) \text{ °C}]$$
</div>

<div class="equation">
$$\rho_{500} = (1.00 \times 10^{-6} \text{ Ω·m})(1 + 0.192) = 1.19 \times 10^{-6} \text{ Ω·m}$$
</div>

Solve for length using $$R = \rho L/A$$:

<div class="equation">
$$L = \frac{RA}{\rho} = \frac{(14.4 \text{ Ω})(5.00 \times 10^{-6} \text{ m}^{2})}{1.19 \times 10^{-6} \text{ Ω·m}} = 60.5 \text{ m}$$
</div>

**(c)** Find the cold resistance at 20°C. Since $$R \propto \rho$$:

<div class="equation">
$$R_{\text{cold}} = R_{\text{hot}} \times \frac{\rho_{20}}{\rho_{500}} = 14.4 \text{ Ω} \times \frac{1.00}{1.19} = 12.1 \text{ Ω}$$
</div>

Calculate the initial power:

<div class="equation">
$$P_{\text{cold}} = \frac{V^{2}}{R_{\text{cold}}} = \frac{(120 \text{ V})^{2}}{12.1 \text{ Ω}} = 1.19 \text{ kW}$$
</div>

**Discussion**

The heater requires 60.5 m of Nichrome wire, which is typically wound into a compact coil. When first switched on, the heater draws about 19% more power (1.19 kW vs 1.00 kW) because the cold resistance is lower. This is opposite to the behavior of incandescent bulbs, where tungsten has a much higher temperature coefficient and draws several times more current when cold. Nichrome's relatively small temperature coefficient ($$\alpha = 0.4 \times 10^{-3}$$ /°C vs. tungsten's $$4.5 \times 10^{-3}$$ /°C) makes it ideal for heating elements because the power output remains relatively stable as the element heats up.

(a) The required resistance is 14.4 Ω. (b) The length of Nichrome wire needed is 60.5 m. (c) When first switched on, the heater draws 1.19 kW.

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
<div class="solution" markdown="1">
**Strategy**

Use the AC voltage equation $$V = V_{0} \sin(2\pi f t)$$ and the relationship $$V_{\text{rms}} = V_{0}/\sqrt{2}$$. Set the instantaneous voltage equal to $$\pm V_{\text{rms}}$$ and solve for time. For 60-Hz AC, the period is $$T = 1/f = 1/60$$ s = 16.67 ms.

**Solution**

**(a)** Find when $$V = V_{\text{rms}} = V_{0}/\sqrt{2}$$:

<div class="equation">
$$V_{0} \sin(2\pi f t) = \frac{V_{0}}{\sqrt{2}}$$
</div>

<div class="equation">
$$\sin(2\pi f t) = \frac{1}{\sqrt{2}} = 0.707$$
</div>

The sine function equals $$1/\sqrt{2}$$ at angles of 45° and 135° (or $$\pi/4$$ and $$3\pi/4$$ radians) within one period:

For the first time:
<div class="equation">
$$2\pi f t_{1} = \frac{\pi}{4}$$
</div>

<div class="equation">
$$t_{1} = \frac{1}{8f} = \frac{1}{8 \times 60 \text{ Hz}} = 2.08 \text{ ms}$$
</div>

For the second time:
<div class="equation">
$$2\pi f t_{2} = \frac{3\pi}{4}$$
</div>

<div class="equation">
$$t_{2} = \frac{3}{8f} = \frac{3}{8 \times 60 \text{ Hz}} = 6.25 \text{ ms}$$
</div>

**(b)** Find when $$V = -V_{\text{rms}} = -V_{0}/\sqrt{2}$$:

<div class="equation">
$$\sin(2\pi f t) = -\frac{1}{\sqrt{2}} = -0.707$$
</div>

The sine function equals $$-1/\sqrt{2}$$ at angles of 225° and 315° (or $$5\pi/4$$ and $$7\pi/4$$ radians) within one period:

For the first time:
<div class="equation">
$$t_{3} = \frac{5}{8f} = \frac{5}{8 \times 60 \text{ Hz}} = 10.4 \text{ ms}$$
</div>

For the second time:
<div class="equation">
$$t_{4} = \frac{7}{8f} = \frac{7}{8 \times 60 \text{ Hz}} = 14.6 \text{ ms}$$
</div>

**Discussion**

These times divide the period into eight equal parts of 2.08 ms each. The rms voltage represents the effective DC equivalent, and the instantaneous AC voltage crosses through this value four times per cycle—twice positive and twice negative. Notice that the voltage spends more time below $$V_{\text{rms}}$$ than above it during the positive half-cycle. This is because the sine wave varies slowly near its peaks and quickly near zero crossings. The rms value is calculated by averaging the square of the voltage, which gives extra weight to the peak regions.

(a) The voltage equals $$V_{\text{rms}}$$ at $$t = 2.08$$ ms and $$t = 6.25$$ ms. (b) The voltage equals $$-V_{\text{rms}}$$ at $$t = 10.4$$ ms and $$t = 14.6$$ ms.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

direct current
: (DC) the flow of electric charge in only one direction

alternating current
: (AC) the flow of electric charge that periodically reverses direction

AC voltage
: voltage that fluctuates sinusoidally with time, expressed as $$ V = V_0 \sin 2\pi f t $$, where $$V$$ is the voltage at time $$t$$, $$V_0$$ is the peak
voltage, and $$f$$ is the frequency in hertz

AC current
: current that fluctuates sinusoidally with time, expressed as $$ I = I_0 \sin 2\pi f t $$, where $$I$$ is the current at time $$t$$, $$I_0$$ is the peak
current, and $$f$$ is the frequency in hertz

rms current
: the root-mean-square of the current, $${I}_{\text{rms}}={I}_{0}/\sqrt{2} $$ ,
where $$I_0$$ is the peak current, in an AC system

rms voltage
: the root-mean-square of the voltage, $${V}_{\text{rms}}={V}_{0}/\sqrt{2} $$ ,
where $$V_0$$ is the peak voltage, in an AC system

</div>
