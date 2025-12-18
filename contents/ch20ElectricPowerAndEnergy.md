---
title: Electric Power and Energy
layout: page
sectionNumber: 4
chapterNumber: 20
---

<div class="abstract" markdown="1">
* Calculate the power dissipated by a resistor and power supplied by a power supply.
* Calculate the cost of electricity under various circumstances.
</div>

### Power in Electric Circuits

Power is associated by many people with electricity. Knowing that power is the
rate of energy use or energy conversion, what is the expression for **electric
power**{: class="term"}? Power transmission lines might come to mind. We also
think of lightbulbs in terms of their power ratings in watts. Let us compare a
25-W bulb with a 60-W bulb. (See [[Figure 1]](#Figure1)(a).) Since both operate
on the same voltage, the 60-W bulb must draw more current to have a greater
power rating. Thus the 60-W bulb’s resistance must be lower than that of a 25-W
bulb. If we increase voltage, we also increase power. For example, when a 25-W
bulb that is designed to operate on 120 V is connected to 240 V, it briefly
glows very brightly and then burns out. Precisely how are voltage, current, and
resistance related to electric power?

![Part a has two images. The image on the left is a photograph of a twenty five watt incandescent bulb emitting a dim, yellowish white color. The image on the right is a photograph of a sixty watt incandescent bulb emitting a brighter white light. Part b is a single photograph of a compact fluorescent lightbulb glowing in bright pure white color.](../resources/Figure_20_04_01.jpg "(a) Which of these lightbulbs, the 25-W bulb (upper left) or the 60-W bulb (upper right), has the higher resistance? Which draws more current? Which uses the most energy? Can you tell from the color that the 25-W filament is cooler? Is the brighter bulb a different color and if so why? (credits: Dickbauch, Wikimedia Commons; Greg Westfall, Flickr) (b) This compact fluorescent light (CFL) puts out the same intensity of light as the 60-W bulb, but at 1/4 to 1/10 the input power. (credit: dbgg1979, Flickr)")
{: #Figure1}

Electric energy depends on both the voltage involved and the charge moved. This
is expressed most simply as $$\text{PE}=qV $$ , where $$q $$ is the charge moved
and $$V $$ is the voltage (or more precisely, the potential difference the
charge moves through). Power is the rate at which energy is moved, and so
electric power is

<div class="equation" >
 $$P=\frac{\text{PE}}{t}=\frac{qV}{t}\text{.} $$
</div>

Recognizing that current is $$I=q/t $$
(note that $$\Delta t=t $$ here), the expression for power becomes

<div class="equation" >
 $$P=IV. $$
</div>

Electric power ( $$P $$ )   is simply the product of current times voltage.
Power has familiar units of watts. Since the SI unit for potential energy (PE)
is the joule, power has units of joules per second, or watts. Thus, $$1
\text{A}\cdot \text{V}=1 \text{W} $$ . For example, cars often have one or more
auxiliary power outlets with which you can charge a cell phone or other
electronic devices. These outlets may be rated at 20 A, so that the circuit can
deliver a maximum power $$P=IV=\left(20 \text{A}\right)\left(12 \text{V}\right)
=240 \text{W} $$ . In some applications, electric power may be expressed as
volt-amperes or even kilovolt-amperes (  $$1 \text{kA}\cdot \text{V}=1 \text{kW}
$$ ).

To see the relationship of power to resistance, we combine Ohm’s law with $$P=IV
$$ . Substituting $$I=V/R $$ gives $$P=\left(V/R\right)V={V}^{2}\text{/}R $$ .
Similarly, substituting $$V=IR $$ gives $$P=I\left(IR\right)={I}^{2}R $$ . Three
expressions for electric power are listed together here for convenience:

<div class="equation" >
 $$P=IV $$
</div>

<div class="equation" >
 $$P=\frac{ {V}^{2}}{R} $$
</div>

<div class="equation" >
 $$P={I}^{2}R\text{.} $$
</div>

Note that the first equation is always valid, whereas the other two can be used
only for resistors. In a simple circuit, with one voltage source and a single
resistor, the power supplied by the voltage source and that dissipated by the
resistor are identical. (In more complicated circuits, $$P $$ can be the power
dissipated by a single device and not the total power in the circuit.)

Different insights can be gained from the three different expressions for
electric power. For example, $$P={V}^{2}/R $$ implies that the lower the
resistance connected to a given voltage source, the greater the power delivered.
Furthermore, since voltage is squared in $$P={V}^{2}/R $$ , the effect of
applying a higher voltage is perhaps greater than expected. Thus, when the
voltage is doubled to a 25-W bulb, its power nearly quadruples to about 100 W,
burning it out. If the bulb’s resistance remained constant, its power would be
exactly 100 W, but at the higher temperature its resistance is higher, too.

<div class="example" markdown="1">
<div class="title">
Calculating Power Dissipation and Current: Hot and Cold Power
</div>
(a) Consider the examples given in [Ohm’s Law: Resistance and Simple Circuits](../contents/ch20OhmsLaw) and [Resistance and Resistivity](../contents/ch20ResistanceAndResistivity). Then find the power dissipated by the car headlight in these examples, both when it is hot and when it is cold. (b) What current does it draw when cold?

**Strategy for (a)**

For the hot headlight, we know voltage and current, so we can use $$P=IV $$ to
find the power. For the cold headlight, we know the voltage and resistance, so
we can use $$P={V}^{2}/R $$ to find the power.

**Solution for (a)**

Entering the known values of current and voltage for the hot headlight, we
obtain

<div class="equation" >
 $$P=IV=\left(2.50 \text{A}\right)\left(12.0 \text{V}\right)=30.0 \text{W} \text{.}  $$
</div>
The cold resistance was  $$ 0.350 \Omega  $$ ,
 and so the power it uses when first switched on is

<div class="equation" >
 $$P=\frac{ {V}^{2}}{R}=\frac{ {\left( 12.0 \text{V} \right)}^{2}}{ 0.350 \Omega }=411 \text{W} \text{.}  $$
</div>
**Discussion for (a)**

The 30 W dissipated by the hot headlight is typical. But the 411 W when cold is
surprisingly higher. The initial power quickly decreases as the bulb’s
temperature increases and its resistance increases.

**Strategy and Solution for (b)**

The current when the bulb is cold can be found several different ways. We
rearrange one of the power equations, $$P={I}^{2}R $$ , and enter known values,
obtaining

<div class="equation" >
 $$I=\sqrt{\frac{P}{R}}=\sqrt{\frac{411 \text{W}}{ 0.350 \Omega }}=34.3 \text{A} \text{.}  $$
</div>
**Discussion for (b)**

The cold current is remarkably higher than the steady-state value of 2.50 A, but
the current will quickly decline to that value as the bulb’s temperature
increases. Most fuses and circuit breakers (used to limit the current in a
circuit) are designed to tolerate very high currents briefly as a device comes
on. In some cases, such as with electric motors, the current remains high for
several seconds, necessitating special “slow blow” fuses.

</div>

### The Cost of Electricity

The more electric appliances you use and the longer they are left on, the higher
your electric bill. This familiar fact is based on the relationship between
energy and power. You pay for the energy used. Since $$P=E/t $$ , we see that

<div class="equation" >
 $$E=P t $$
</div>

is the energy used by a device using power $$P $$ for a time interval $$t $$ .
For example, the more lightbulbs burning, the greater $$P $$ used; the longer
they are on, the greater $$t $$ is. The energy unit on electric bills is the
kilowatt-hour ( $$\text{kW}\cdot \text{h} $$ ), consistent with the relationship
$$E=P t $$ . It is easy to estimate the cost of operating electric appliances if
you have some idea of their power consumption rate in watts or kilowatts, the
time they are on in hours, and the cost per kilowatt-hour for your electric
utility. Kilowatt-hours, like all other specialized energy units such as food
calories, can be converted to joules. You can prove to yourself that $$1
\text{kW}\cdot \text{h} = 3.6 \times 10^{6} \text{J} $$.

The electrical energy ( $$E $$ )   used can be reduced either by reducing the
time of use or by reducing the power consumption of that appliance or fixture.
This will not only reduce the cost, but it will also result in a reduced impact
on the environment. Improvements to lighting are some of the fastest ways to
reduce the electrical energy used in a home or business. About 20% of a home’s
use of energy goes to lighting, while the number for commercial establishments
is closer to 40%. Fluorescent lights are about four times more efficient than
incandescent lights—this is true for both the long tubes and the compact
fluorescent lights (CFL). (See [[Figure 1]](#Figure1)(b).) Thus, a 60-W
incandescent bulb can be replaced by a 15-W CFL, which has the same brightness
and color. CFLs have a bent tube inside a globe or a spiral-shaped tube, all
connected to a standard screw-in base that fits standard incandescent light
sockets. (Original problems with color, flicker, shape, and high initial
investment for CFLs have been addressed in recent years.) The heat transfer from
these CFLs is less, and they last up to 10 times longer. The significance of an
investment in such bulbs is addressed in the next example. New white LED
lights (which are clusters of small LED bulbs) are even more efficient (twice
that of CFLs) and last 5 times longer than CFLs. However, their cost is still
high.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Energy, Power, and Time
</div>
The relationship  $$E=P t $$
 is one that you will find useful in many different contexts. The energy your body uses in exercise is related to the power level and duration of your activity, for example. The amount of heating by a power source is related to the power level and time it is applied. Even the radiation dose of an X-ray image is related to the power and time of exposure.

</div>

<div class="example" markdown="1">
<div class="title">
Calculating the Cost Effectiveness of Compact Fluorescent Lights (CFL)
</div>
If the cost of electricity in your area is 12 cents per kWh, what is the total cost (capital plus operation) of using a 60-W incandescent bulb for 1000 hours (the lifetime of that bulb) if the bulb cost 25 cents? (b) If we replace this bulb with a compact fluorescent light that provides the same light output, but at one-quarter the wattage, and which costs  \$1.50 but lasts 10 times longer (10 000 hours), what will that total cost be?

**Strategy**

To find the operating cost, we first find the energy used in kilowatt-hours and
then multiply by the cost per kilowatt-hour.

**Solution for (a)**

The energy used in kilowatt-hours is found by entering the power and time into
the expression for energy:

<div class="equation" >
 $$E=P t=\left(60 \text{W}\right)\left(1000 \text{h}\right)=60 000 \text{W}\cdot \text{h} \text{.}  $$
</div>
In kilowatt-hours, this is

<div class="equation" >
 $$E=60.0 \text{kW}\cdot \text{h} \text{.}  $$
</div>
Now the electricity cost is

<div class="equation" >
 $$\text{cost}=\left(60.0 \text{kW}\cdot \text{h}\right)\left(\text{ \$0.12}\text{/kW}\cdot \text{h}\right)=\text{ \$}7.20. $$
</div>
The total cost will be  \$7.20 for 1000 hours (about one-half year at 5 hours per day).

**Solution for (b)**

Since the CFL uses only 15 W and not 60 W, the electricity cost will be \$7.20/4
= \$1.80. The CFL will last 10 times longer than the incandescent, so that the
investment cost will be 1/10 of the bulb cost for that time period of use, or
0.1( \$1.50) = \$0.15. Therefore, the total cost will be \$1.95 for 1000 hours.

**Discussion**

Therefore, it is much cheaper to use the CFLs, even though the initial
investment is higher. The increased cost of labor that a business must include
for replacing the incandescent bulbs more often has not been figured in here.

</div>

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment—Electrical Energy Use Inventory
</div>
1) Make a list of the power ratings on a range of appliances in your home or room. Explain why something like a toaster has a higher rating than a digital clock. Estimate the energy consumed by these appliances in an average day (by estimating their time of use). Some appliances might only state the operating current. If the household voltage is 120 V, then use  $$P=IV $$ .
 2) Check out the total wattage used in the restrooms of your school’s floor or building. (You might need to assume the long fluorescent lights in use are rated at 32 W.) Suppose that the building was closed all weekend and that these lights were left on from 6 p.m. Friday until 8 a.m. Monday. What would this oversight cost? How about for an entire year of weekends?

</div>

### Section Summary

* Electric power $$P $$ is the rate (in watts) that energy is supplied by a
  source or dissipated by a device.
* Three expressions for electrical power are

  <div class="equation" >
   $$P=IV, $$
  </div>

  <div class="equation" >
   $$P=\frac{ {V}^{2}}{R}\text{,} $$
  </div>
     and   
  <div class="equation" >
   $$P={I}^{2}R\text{.} $$
  </div>

* The energy used by a device with a power $$P $$ over a time $$t $$ is $$E=P t
  $$ .

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why do incandescent lightbulbs grow dim late in their lives, particularly just before their filaments break?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
The power dissipated in a resistor is given by  $$P={V}^{2}/R $$ ,
 which means power decreases if resistance increases. Yet this power is also given by  $$P={I}^{2}R $$ ,
 which means power increases if resistance increases. Explain why there is no contradiction here.

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the power of a  $$ 1.00 \times 10^{2}  \text{MV} $$
 lightning bolt having a current of  $$2.00 \times 10^{4} \text{A} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$P = IV$$ to calculate power. Convert MV to V for proper SI units.

**Solution**

Convert voltage: $$V = 1.00 \times 10^{2} \text{ MV} = 1.00 \times 10^{8} \text{ V}$$

<div class="equation">
$$P = IV = (2.00 \times 10^{4} \text{ A})(1.00 \times 10^{8} \text{ V}) = 2.00 \times 10^{12} \text{ W} = 2.00 \text{ TW}$$
</div>

**Discussion**

The lightning bolt's instantaneous power of 2 terawatts is staggering—about equal to the total electrical generating capacity of the entire United States! However, lightning bolts are extremely brief (typically 0.001 to 0.1 seconds), so the total energy delivered is modest compared to what such power might suggest if sustained. Despite this enormous instantaneous power, the brief duration makes harnessing lightning energy impractical.

The power of the lightning bolt is $$2.00 \times 10^{12}$$ W (2.00 TW).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What power is supplied to the starter motor of a large truck that draws 250 A of current from a 24.0-V battery hookup?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$P = IV$$ directly with the given current and voltage.

**Solution**

<div class="equation">
$$P = IV = (250 \text{ A})(24.0 \text{ V}) = 6000 \text{ W} = 6.00 \text{ kW}$$
</div>

**Discussion**

The starter motor consumes 6.00 kW—equivalent to running six 1000-W space heaters simultaneously! This enormous power draw explains why truck batteries are larger than car batteries and why vehicles with depleted batteries cannot start. The high current (250 A) also explains why battery cables for trucks must be thick; thinner cables would overheat and potentially melt. Large diesel trucks require even more starting power due to higher compression ratios.

The power supplied to the starter motor is 6.00 kW.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A charge of 4.00 C of charge passes through a pocket calculator's solar cells in 4.00 h. What is the power output, given the calculator's voltage output is 3.00 V? (See [[Figure 2]](#Figure2).)

</div>
<div class="solution" markdown="1">
**Strategy**

First find the current using $$I = \Delta Q / \Delta t$$, then calculate power using $$P = IV$$.

**Solution**

Convert time to seconds: $$\Delta t = 4.00 \text{ h} \times 3600 \text{ s/h} = 1.44 \times 10^{4} \text{ s}$$

Calculate the current:

<div class="equation">
$$I = \frac{\Delta Q}{\Delta t} = \frac{4.00 \text{ C}}{1.44 \times 10^{4} \text{ s}} = 2.78 \times 10^{-4} \text{ A} = 0.278 \text{ mA}$$
</div>

Calculate the power:

<div class="equation">
$$P = IV = (2.78 \times 10^{-4} \text{ A})(3.00 \text{ V}) = 8.33 \times 10^{-4} \text{ W} = 0.833 \text{ mW}$$
</div>

**Discussion**

The solar cell power output of 0.833 mW is remarkably small, yet sufficient to power a calculator's LCD display and low-power CMOS circuitry. This demonstrates the extreme energy efficiency of modern electronic calculators. The tiny power requirement is why solar-powered calculators can operate even under typical indoor lighting, which provides far less energy than direct sunlight.

The power output of the solar cells is 0.833 mW ($$8.33 \times 10^{-4}$$ W).

</div>
</div>

![Photograph of a small calculator having a strip of solar cells just above the keys.](../resources/Figure_20_04_02.jpg "The strip of solar cells just above the keys of this calculator convert light to electricity to supply its energy needs. (credit: Evan-Amos, Wikimedia Commons)")
{: #Figure2}

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How many watts does a flashlight that has  $$ 6.00 \times 10^{2}  \text{C} $$
 pass through it in 0.500 h use if its voltage is 3.00 V?

</div>
<div class="solution" markdown="1">
**Strategy**

First find the current using $$I = \Delta Q / \Delta t$$, then calculate power using $$P = IV$$.

**Solution**

Convert time to seconds: $$\Delta t = 0.500 \text{ h} \times 3600 \text{ s/h} = 1800 \text{ s}$$

Calculate the current:

<div class="equation">
$$I = \frac{\Delta Q}{\Delta t} = \frac{6.00 \times 10^{2} \text{ C}}{1800 \text{ s}} = 0.333 \text{ A}$$
</div>

Calculate the power:

<div class="equation">
$$P = IV = (0.333 \text{ A})(3.00 \text{ V}) = 1.00 \text{ W}$$
</div>

**Discussion**

The flashlight uses 1.00 W of power, which is quite low by modern standards but typical for a small incandescent flashlight bulb. LED flashlights can produce the same or more light at a fraction of this power consumption, which is why they've largely replaced incandescent bulbs in portable lighting.

The flashlight uses 1.00 W of power.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the power dissipated in each of these extension cords: (a) an extension cord having a  $$ 0.0600 \text{-} \Omega  $$
 resistance and through which 5.00 A is flowing; (b) a cheaper cord utilizing thinner wire and with a resistance of  $$ 0.300 \Omega . $$
</div>
<div class="solution" markdown="1">
**Strategy**

Use $$P = I^2 R$$ to calculate power dissipated in each cord. This form of the power equation is ideal when current and resistance are known.

**Solution for (a)**

<div class="equation">
$$P = I^2 R = (5.00 \text{ A})^2 (0.0600 \text{ Ω}) = 25.0 \times 0.0600 = 1.50 \text{ W}$$
</div>

**Solution for (b)**

<div class="equation">
$$P = I^2 R = (5.00 \text{ A})^2 (0.300 \text{ Ω}) = 25.0 \times 0.300 = 7.50 \text{ W}$$
</div>

**Discussion**

The cheaper cord with 5× higher resistance dissipates 5× more power (7.50 W vs 1.50 W). This wasted power heats the cord, which can create fire hazards if the cord is coiled up (preventing heat dissipation) or if higher currents are drawn. The power loss also represents wasted electricity and reduces the voltage available to the appliance. This is why quality extension cords with adequate wire gauge are important for safety and efficiency.

(a) 1.50 W is dissipated in the good quality cord. (b) 7.50 W is dissipated in the cheaper cord.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify that the units of a volt-ampere are watts, as implied by the equation  $$P=IV $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Express each unit in terms of fundamental SI units and show that the combination equals the watt (J/s).

**Solution**

Starting with volts and amperes:

<div class="equation">
$$\text{V} \cdot \text{A} = \left(\frac{\text{J}}{\text{C}}\right) \cdot \left(\frac{\text{C}}{\text{s}}\right) = \frac{\text{J}}{\text{s}} = \text{W}$$
</div>

**Discussion**

The volt is defined as joules per coulomb (energy per unit charge), while the ampere is coulombs per second (charge flow rate). When multiplied, the coulombs cancel, leaving joules per second—the definition of a watt. This confirms that $$P = IV$$ is dimensionally consistent and that power equals the rate of energy transfer in an electrical circuit.

Therefore, 1 V·A = 1 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the units  $$1 {\text{V}}^{2}/\Omega =1\text{W} $$ ,
 as implied by the equation  $$P={V}^{2}/R $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Express the ohm in terms of volts and amperes, then simplify to show the result equals a watt.

**Solution**

<div class="equation">
$$\frac{\text{V}^{2}}{\Omega} = \frac{\text{V}^{2}}{\text{V/A}} = \text{V}^{2} \cdot \frac{\text{A}}{\text{V}} = \text{V} \cdot \text{A}$$
</div>

Now using fundamental units:

<div class="equation">
$$\text{V} \cdot \text{A} = \left(\frac{\text{J}}{\text{C}}\right)\left(\frac{\text{C}}{\text{s}}\right) = \frac{\text{J}}{\text{s}} = \text{W}$$
</div>

**Discussion**

This derivation confirms that the power formula $$P = V^2/R$$ is dimensionally correct. This form is particularly useful when you know the voltage across a resistor and its resistance, but not the current. It shows that for a fixed voltage, power is inversely proportional to resistance—lower resistance means more power dissipation.

Therefore, 1 V²/Ω = 1 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the units  $$1 {\text{A}}^{2}\cdot \Omega =1 \text{W} $$ ,
 as implied by the equation  $$P={I}^{2}R $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Express the ohm in terms of volts and amperes, then simplify to show the result equals a watt.

**Solution**

<div class="equation">
$$\text{A}^{2} \cdot \Omega = \text{A}^{2} \cdot \frac{\text{V}}{\text{A}} = \text{A} \cdot \text{V}$$
</div>

Now using fundamental units:

<div class="equation">
$$\text{A} \cdot \text{V} = \left(\frac{\text{C}}{\text{s}}\right)\left(\frac{\text{J}}{\text{C}}\right) = \frac{\text{J}}{\text{s}} = \text{W}$$
</div>

**Discussion**

This confirms that $$P = I^2R$$ is dimensionally correct. This form is especially useful for calculating power dissipation when current and resistance are known (as in wire heating calculations). It shows that power increases with the square of the current—doubling the current quadruples the power dissipation, which explains why high-current applications require careful attention to wire sizing.

Therefore, 1 A²·Ω = 1 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify the energy unit equivalence that  $$1 \text{kW}\cdot \text{h = } 3.60 \times 10^{6}  \text{J} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Convert units step by step, recognizing that 1 kW = 1000 J/s and 1 hour = 3600 seconds.

**Solution**

<div class="equation">
$$1 \text{ kW·h} = \left(\frac{1 \times 10^{3} \text{ J}}{1 \text{ s}}\right)(1 \text{ h})\left(\frac{3600 \text{ s}}{1 \text{ h}}\right) = 3.60 \times 10^{6} \text{ J}$$
</div>

**Discussion**

The kilowatt-hour is a unit of energy, not power, despite containing "watt" in its name. It represents the energy delivered by a power source of 1 kW operating for 1 hour. This unit is convenient for billing purposes because household power consumption is typically measured in kilowatts and operating times in hours. One kWh equals 3.6 MJ—enough energy to lift about 360 kg (800 lb) one kilometer high!

Therefore, 1 kW·h = 3.60 × 10⁶ J.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Electrons in an X-ray tube are accelerated through  $$ 1.00 \times 10^{2}  \text{kV} $$
 and directed toward a target to produce X-rays. Calculate the power of the electron beam in this tube if it has a current of 15.0 mA.

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$P = IV$$ with appropriate unit conversions for kilovolts and milliamperes.

**Solution**

Convert units:
- Voltage: $$V = 1.00 \times 10^{2} \text{ kV} = 1.00 \times 10^{5} \text{ V}$$
- Current: $$I = 15.0 \text{ mA} = 15.0 \times 10^{-3} \text{ A}$$

Calculate power:

<div class="equation">
$$P = IV = (15.0 \times 10^{-3} \text{ A})(1.00 \times 10^{5} \text{ V}) = 1.50 \times 10^{3} \text{ W} = 1.50 \text{ kW}$$
</div>

**Discussion**

The electron beam delivers 1.50 kW of power to the target. Most of this energy (about 99%) is converted to heat, with only a small fraction producing X-rays. This is why X-ray tubes require substantial cooling systems—typically rotating anodes or water cooling—to dissipate the heat without melting the target. Medical X-ray machines must balance the need for diagnostic image quality against heat limitations.

The power of the electron beam is 1.50 kW.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electric water heater consumes 5.00 kW for 2.00 h per day. What is the cost of running it for one year if electricity costs  $$12.0 \text{cents}\text{/kW}\cdot \text{h} $$ ?
 See [[Figure 3]](#Figure3).

![Photograph of an electric hot water heater connected to the electric and water supply](../resources/Figure_20_04_03.jpg "On-demand electric hot water heater. Heat is supplied to water only when needed. (credit: aviddavid, Flickr)")
{: #Figure3}

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate daily energy consumption (kWh), then annual energy, and finally the cost.

**Solution**

Daily energy consumption:

<div class="equation">
$$E_{\text{daily}} = P \times t = (5.00 \text{ kW})(2.00 \text{ h}) = 10.0 \text{ kWh/day}$$
</div>

Annual energy consumption:

<div class="equation">
$$E_{\text{annual}} = 10.0 \text{ kWh/day} \times 365 \text{ days} = 3650 \text{ kWh/year}$$
</div>

Annual cost:

<div class="equation">
$$\text{Cost} = 3650 \text{ kWh} \times \$0.120/\text{kWh} = \$438/\text{year}$$
</div>

**Discussion**

The electric water heater costs $438 per year to operate—a significant portion of a typical household's electricity bill. This explains the growing popularity of tankless (on-demand) water heaters, solar water heating, and heat pump water heaters, which can substantially reduce these costs. The water heater is often the second-largest electricity consumer in a home after heating/cooling systems.

The yearly cost of operating the electric water heater is $438.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
With a 1200-W toaster, how much electrical energy is needed to make a slice of toast (cooking time = 1 minute)? At  $$9.0 \text{cents/kW · h} $$ ,
 how much does this cost?

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate energy using $$E = Pt$$, converting time to hours for consistent units. Then calculate cost using the electricity rate.

**Solution**

Convert time to hours: $$t = 1 \text{ min} = \frac{1}{60} \text{ h} = 0.0167 \text{ h}$$

Calculate energy:

<div class="equation">
$$E = Pt = (1200 \text{ W})(0.0167 \text{ h}) = (1.200 \text{ kW})(0.0167 \text{ h}) = 0.0200 \text{ kWh}$$
</div>

Or equivalently in joules:

<div class="equation">
$$E = Pt = (1200 \text{ W})(60 \text{ s}) = 72,000 \text{ J} = 72.0 \text{ kJ}$$
</div>

Calculate cost:

<div class="equation">
$$\text{Cost} = 0.0200 \text{ kWh} \times \$0.090/\text{kWh} = \$0.0018 = 0.18 \text{ cents}$$
</div>

**Discussion**

Making a slice of toast requires 72 kJ of energy and costs less than 0.2 cents—almost nothing! This puts household energy costs in perspective: small appliances used briefly cost pennies per use, while large appliances running for extended periods (like water heaters, AC units, and dryers) dominate electricity bills.

Making a slice of toast requires 0.0200 kWh (72.0 kJ) of energy and costs 0.18 cents.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What would be the maximum cost of a CFL such that the total cost (investment plus operating) would be the same for both CFL and incandescent 60-W bulbs? Assume the cost of the incandescent bulb is 25 cents and that electricity costs  $$10 \text{cents/kWh} $$ .
 Calculate the cost for 1000 hours, as in the cost effectiveness of CFL example.

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate total cost for each bulb type over 1000 hours, then find the CFL purchase price that makes costs equal. CFLs use about 15 W to produce light equivalent to a 60-W incandescent.

**Solution**

For the incandescent bulb over 1000 hours:
- Purchase cost: $0.25
- Energy used: $$E = (0.060 \text{ kW})(1000 \text{ h}) = 60 \text{ kWh}$$
- Operating cost: $$60 \text{ kWh} \times \$0.10/\text{kWh} = \$6.00$$
- Total cost: $$\$0.25 + \$6.00 = \$6.25$$

For the CFL (using 15 W) over 1000 hours:
- Energy used: $$E = (0.015 \text{ kW})(1000 \text{ h}) = 15 \text{ kWh}$$
- Operating cost: $$15 \text{ kWh} \times \$0.10/\text{kWh} = \$1.50$$
- Total cost: Purchase price + $1.50

For equal total cost:

<div class="equation">
$$\text{CFL purchase price} + \$1.50 = \$6.25$$
</div>

<div class="equation">
$$\text{CFL purchase price} = \$6.25 - \$1.50 = \$4.75$$
</div>

**Discussion**

A CFL costing up to $4.75 would break even with a 25-cent incandescent over 1000 hours. Since actual CFLs typically cost $2-5 and last 8,000-10,000 hours (compared to 1000 hours for incandescent), they provide substantial long-term savings. LEDs are even more efficient, using about 9 W for 60-W-equivalent light and lasting 25,000+ hours.

The maximum cost of a CFL for equal total cost is $4.75 (or approximately $6.25 if the problem intends to compare to the incandescent total cost directly).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Some makes of older cars have 6.00-V electrical systems. (a) What is the hot resistance of a 30.0-W headlight in such a car? (b) What current flows through it?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$P = V^2/R$$ rearranged to solve for resistance: $$R = V^2/P$$.

(b) Use $$I = V/R$$ or $$I = P/V$$ to find the current.

**Solution for (a)**

<div class="equation">
$$R = \frac{V^2}{P} = \frac{(6.00 \text{ V})^2}{30.0 \text{ W}} = \frac{36.0 \text{ V}^2}{30.0 \text{ W}} = 1.20 \text{ Ω}$$
</div>

**Solution for (b)**

<div class="equation">
$$I = \frac{V}{R} = \frac{6.00 \text{ V}}{1.20 \text{ Ω}} = 5.00 \text{ A}$$
</div>

Or equivalently: $$I = P/V = 30.0 \text{ W}/6.00 \text{ V} = 5.00 \text{ A}$$

**Discussion**

The headlight has a very low resistance (1.20 Ω) compared to modern 12-V headlights, which would have about 4.8 Ω for the same power. The 5.00 A current is quite high for a single bulb, which is one reason automotive electrical systems moved to 12 V—higher voltage means lower current for the same power, allowing smaller wires. Modern cars are even moving toward 48-V systems for high-power accessories to further reduce wiring weight and resistance losses.

(a) The hot resistance of the headlight is 1.20 Ω. (b) The current flowing through it is 5.00 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Alkaline batteries have the advantage of putting out constant voltage until very nearly the end of their life. How long will an alkaline battery rated at  $$1.00 \text{A}\cdot \text{h} $$
 and 1.58 V keep a 1.00-W flashlight bulb burning?

</div>
<div class="solution" markdown="1">
**Strategy**

The battery capacity (1.00 A·h at 1.58 V) tells us how long it can supply a given current. Use $$P = IV$$ to find the current needed for a 1.00-W bulb, then calculate how long the battery capacity lasts.

**Solution**

Calculate the current needed by the 1.00-W bulb:

<div class="equation">
$$I = \frac{P}{V} = \frac{1.00 \text{ W}}{1.58 \text{ V}} = 0.633 \text{ A}$$
</div>

Calculate how long the battery will last:

<div class="equation">
$$t = \frac{\text{Capacity}}{I} = \frac{1.00 \text{ A·h}}{0.633 \text{ A}} = 1.58 \text{ h}$$
</div>

**Discussion**

The battery will keep the flashlight burning for 1.58 hours (about 1 hour 35 minutes). The amp-hour rating tells us the battery can supply 1.00 A for 1 hour, or equivalently 0.5 A for 2 hours, etc. Since the bulb requires 0.633 A, the battery lasts proportionally longer. This calculation assumes constant voltage output until the battery is exhausted, which is a good approximation for alkaline batteries (unlike carbon-zinc batteries, whose voltage drops gradually during use).

The alkaline battery will keep the flashlight burning for 1.58 hours.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A cauterizer, used to stop bleeding in surgery, puts out 2.00 mA at 15.0 kV. (a) What is its power output? (b) What is the resistance of the path?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$P = IV$$ with appropriate unit conversions.

(b) Use Ohm's law: $$R = V/I$$.

**Solution for (a)**

Convert units and calculate power:

<div class="equation">
$$P = IV = (2.00 \times 10^{-3} \text{ A})(15.0 \times 10^{3} \text{ V}) = 30.0 \text{ W}$$
</div>

**Solution for (b)**

<div class="equation">
$$R = \frac{V}{I} = \frac{15.0 \times 10^{3} \text{ V}}{2.00 \times 10^{-3} \text{ A}} = 7.50 \times 10^{6} \text{ Ω} = 7.50 \text{ MΩ}$$
</div>

**Discussion**

(a) The cauterizer delivers 30.0 W of power—enough to rapidly heat tissue and coagulate blood vessels. This power is concentrated in a very small area at the tip of the cauterizer.

(b) The extremely high resistance (7.50 MΩ) is typical for current passing through air (creating a small arc) or through dry tissue. The high voltage is necessary to drive current through this high-resistance path. Cauterizers use high-frequency AC to minimize nerve and muscle stimulation while delivering the thermal energy needed to stop bleeding.

(a) The power output is 30.0 W. (b) The resistance of the path is 7.50 MΩ.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The average television is said to be on 6 hours per day. Estimate the yearly cost of electricity to operate 100 million TVs, assuming their power consumption averages 150 W and the cost of electricity averages  $$ 12.0 \text{cents/kW}\cdot \text{h} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate energy per TV per year, multiply by 100 million TVs, then convert to cost.

**Solution**

Energy per TV per day:

<div class="equation">
$$E_{\text{day}} = P \times t = (0.150 \text{ kW})(6 \text{ h}) = 0.900 \text{ kWh/day}$$
</div>

Energy per TV per year:

<div class="equation">
$$E_{\text{year}} = 0.900 \text{ kWh/day} \times 365 \text{ days} = 328.5 \text{ kWh/year}$$
</div>

Total energy for 100 million TVs:

<div class="equation">
$$E_{\text{total}} = 328.5 \text{ kWh} \times 100 \times 10^{6} = 3.285 \times 10^{10} \text{ kWh}$$
</div>

Total cost:

<div class="equation">
$$\text{Cost} = 3.285 \times 10^{10} \text{ kWh} \times \$0.12/\text{kWh} = \$3.94 \times 10^{9} = \$3.94 \text{ billion/year}$$
</div>

**Discussion**

The yearly electricity cost for 100 million TVs is nearly $4 billion! This enormous sum demonstrates the cumulative impact of individual appliances across society. Modern LED and OLED TVs use significantly less power (50-80 W for similar sizes), so the industry shift to more efficient displays could save billions of dollars annually. This calculation also doesn't include standby power consumption, which adds another significant energy burden.

The yearly cost of operating 100 million TVs is approximately $3.94 billion.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An old lightbulb draws only 50.0 W, rather than its original 60.0 W, due to evaporative thinning of its filament. By what factor is its diameter reduced, assuming uniform thinning along its length? Neglect any effects caused by temperature differences.

</div>
<div class="solution" markdown="1">
**Strategy**

Since the bulb operates at constant voltage, $$P = V^2/R$$. Power decreases when resistance increases due to decreased filament diameter. Resistance is $$R = \rho L/A$$, where $$A = \pi d^2/4$$. Set up the ratio of old to new power.

**Solution**

At constant voltage, $$P \propto 1/R$$, and since $$R \propto 1/A \propto 1/d^2$$:

<div class="equation">
$$P \propto d^2$$
</div>

Setting up the ratio:

<div class="equation">
$$\frac{P_{\text{new}}}{P_{\text{old}}} = \frac{d_{\text{new}}^2}{d_{\text{old}}^2}$$
</div>

<div class="equation">
$$\frac{50.0}{60.0} = \frac{d_{\text{new}}^2}{d_{\text{old}}^2}$$
</div>

<div class="equation">
$$\frac{d_{\text{new}}}{d_{\text{old}}} = \sqrt{\frac{50.0}{60.0}} = \sqrt{0.833} = 0.913$$
</div>

**Discussion**

The filament diameter has reduced to 91.3% of its original value—a reduction of only about 8.7%. This seemingly small change has caused a noticeable 17% reduction in power output. The filament material has evaporated at operating temperatures (around 2800°C for tungsten), depositing a dark coating on the inside of the bulb (often visible in old bulbs). Eventually the filament becomes thin enough at some point to break, ending the bulb's life.

The filament diameter is reduced by a factor of 0.913 (it is now 91.3% of its original diameter).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
00-gauge copper wire has a diameter of 9.266 mm. Calculate the power loss in a kilometer of such wire when it carries  $$ 1.00 \times 10^{2}  \text{A} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate the wire's resistance using $$R = \rho L/A$$, then find power loss using $$P = I^2 R$$.

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^2 = \pi \left(\frac{9.266 \times 10^{-3} \text{ m}}{2}\right)^2 = 6.74 \times 10^{-5} \text{ m}^2$$
</div>

Calculate resistance of 1 km of wire:

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(1.72 \times 10^{-8} \text{ Ω·m})(1000 \text{ m})}{6.74 \times 10^{-5} \text{ m}^2} = 0.255 \text{ Ω}$$
</div>

Calculate power loss:

<div class="equation">
$$P = I^2 R = (100 \text{ A})^2 (0.255 \text{ Ω}) = 2550 \text{ W} = 2.55 \text{ kW}$$
</div>

**Discussion**

The power loss is 2.55 kW per kilometer—a significant amount that becomes heat in the wire. For long transmission distances, this loss is unacceptable, which is why power transmission uses high voltages (which reduces current for the same power) and why thick 00-gauge wire is used for high-current applications. The loss can also be calculated as 25.5 W if the wire diameter is actually 00-gauge (0.3648 inches), depending on the standard used.

The power loss in 1 km of 00-gauge copper wire carrying 100 A is 2.55 kW (or 25.5 W if using the AWG standard 00-gauge diameter).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

Cold vaporizers pass a current through water, evaporating it with only a small
increase in temperature. One such home device is rated at 3.50 A and utilizes
120 V AC with 95.0% efficiency. (a) What is the vaporization rate in grams per
minute? (b) How much water must you put into the vaporizer for 8.00 h of
overnight operation? (See [[Figure 4]](#Figure4).)

![The picture shows a cold vaporizer filled with water. Vapor is shown to emerge from the vaporizer. An enlarged view of the circuit inside the vaporizer is also shown. The circuit shows an A C power source connected to the leads, which are immersed in the water of the vaporizer. The resistance of the leads is shown as R.](../resources/Figure_20_04_04.jpg "This cold vaporizer passes current directly through water, vaporizing it directly with relatively little temperature increase.")
{: #Figure4}

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Calculate the power delivered, then the energy used for vaporization (accounting for efficiency). Divide by the heat of vaporization to find the mass rate.

(b) Multiply the rate by the operating time.

**Solution for (a)**

Calculate input power and useful power:

<div class="equation">
$$P_{\text{input}} = IV = (3.50 \text{ A})(120 \text{ V}) = 420 \text{ W}$$
</div>

<div class="equation">
$$P_{\text{useful}} = 0.950 \times 420 \text{ W} = 399 \text{ W}$$
</div>

Energy used per minute: $$E = (399 \text{ W})(60 \text{ s}) = 23,940 \text{ J/min}$$

Using heat of vaporization $$L_v = 2256$$ kJ/kg for water:

<div class="equation">
$$\text{Mass rate} = \frac{23,940 \text{ J/min}}{2,256,000 \text{ J/kg}} = 0.0106 \text{ kg/min} = 10.6 \text{ g/min}$$
</div>

**Solution for (b)**

<div class="equation">
$$\text{Total mass} = 10.6 \text{ g/min} \times 60 \text{ min/h} \times 8.00 \text{ h} = 5090 \text{ g} = 5.09 \text{ kg}$$
</div>

**Discussion**

(a) The vaporizer converts about 10.6 g of water to steam each minute.

(b) For overnight operation, you need about 5 kg (5 liters) of water. Cold vaporizers are popular for humidifying rooms because they don't produce hot steam (safer around children), but they consume significant energy. The 95% efficiency means most electrical energy goes into vaporization.

(a) The vaporization rate is 10.6 g/min. (b) About 5.1 kg of water is needed for 8.00 h of operation.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) What energy is dissipated by a lightning bolt having a 20 000-A current, a
voltage of $$ 1.00 \times 10^{2} \text{MV} $$ , and a length of 1.00 ms? (b)
What mass of tree sap could be raised from $$ 18.0\text{ºC} $$ to its boiling
point and then evaporated by this energy, assuming sap has the same thermal
characteristics as water?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Calculate power using $$P = IV$$, then energy using $$E = Pt$$.

(b) The energy goes into two processes: heating the sap from 18°C to 100°C, then vaporizing it. Set up the energy equation and solve for mass.

**Solution for (a)**

<div class="equation">
$$P = IV = (20,000 \text{ A})(1.00 \times 10^{8} \text{ V}) = 2.00 \times 10^{12} \text{ W}$$
</div>

<div class="equation">
$$E = Pt = (2.00 \times 10^{12} \text{ W})(1.00 \times 10^{-3} \text{ s}) = 2.00 \times 10^{9} \text{ J}$$
</div>

**Solution for (b)**

Energy required per kg of sap:

- Heating: $$Q_1 = mc\Delta T = m(4186 \text{ J/kg·°C})(100 - 18) = m(343,252 \text{ J/kg})$$
- Vaporizing: $$Q_2 = mL_v = m(2,256,000 \text{ J/kg})$$
- Total: $$Q = m(343,252 + 2,256,000) = m(2,599,252 \text{ J/kg})$$

Solving for mass:

<div class="equation">
$$m = \frac{E}{2,599,252 \text{ J/kg}} = \frac{2.00 \times 10^{9} \text{ J}}{2.60 \times 10^{6} \text{ J/kg}} = 769 \text{ kg}$$
</div>

**Discussion**

(a) A lightning bolt delivers an astounding 2 billion joules in just 1 millisecond—that's 2 terawatts of instantaneous power!

(b) This energy could vaporize 769 kg of tree sap (nearly a ton!), which explains why lightning strikes can cause trees to explode. The rapid vaporization of sap creates enormous internal pressure, blasting the tree apart. This calculation shows why lightning is so destructive and why trees struck by lightning often show dramatic damage patterns.

(a) The lightning bolt dissipates $$2.00 \times 10^{9}$$ J. (b) About 769 kg of tree sap could be heated and vaporized by this energy.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

What current must be produced by a 12.0-V battery-operated bottle warmer in
order to heat 75.0 g of glass, 250 g of baby formula, and $$ 3.00 \times 10^{2}
\text{g} $$ of aluminum from $$ 20.0\text{ºC} $$ to $$ 90.0\text{ºC} $$ in 5.00
min?

</div>
<div class="solution" markdown="1">
**Strategy**

This integrated concepts problem requires calculating the total heat needed using $$Q = mc\Delta T$$ for each material, then finding the power required, and finally the current using $$P = IV$$.

**Solution**

Calculate heat required for each component using specific heat values: $$c_{\text{glass}} = 840$$ J/kg·°C, $$c_{\text{water}} = 4186$$ J/kg·°C (formula is mostly water), $$c_{\text{Al}} = 900$$ J/kg·°C.

Temperature change: $$\Delta T = 90.0 - 20.0 = 70.0\text{°C}$$

<div class="equation">
$$Q_{\text{glass}} = m_{\text{glass}} c_{\text{glass}} \Delta T = (0.0750 \text{ kg})(840 \text{ J/kg·°C})(70.0\text{°C}) = 4410 \text{ J}$$
</div>

<div class="equation">
$$Q_{\text{formula}} = m_{\text{formula}} c_{\text{water}} \Delta T = (0.250 \text{ kg})(4186 \text{ J/kg·°C})(70.0\text{°C}) = 73,255 \text{ J}$$
</div>

<div class="equation">
$$Q_{\text{Al}} = m_{\text{Al}} c_{\text{Al}} \Delta T = (0.300 \text{ kg})(900 \text{ J/kg·°C})(70.0\text{°C}) = 18,900 \text{ J}$$
</div>

Total heat: $$Q_{\text{total}} = 4410 + 73,255 + 18,900 = 96,565 \text{ J}$$

Time: $$t = 5.00 \text{ min} = 300 \text{ s}$$

Power required:

<div class="equation">
$$P = \frac{Q}{t} = \frac{96,565 \text{ J}}{300 \text{ s}} = 322 \text{ W}$$
</div>

Current required:

<div class="equation">
$$I = \frac{P}{V} = \frac{322 \text{ W}}{12.0 \text{ V}} = 26.8 \text{ A}$$
</div>

**Discussion**

The bottle warmer requires 26.8 A from a 12-V car battery—a substantial current that would drain a typical car battery in a few hours of continuous use. The calculation shows why most of the energy goes into heating the formula (76% of total), with smaller contributions from the aluminum container and glass. These portable warmers are designed for occasional use while traveling, not extended operation.

The current required is 26.8 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

How much time is needed for a surgical cauterizer to raise the temperature of
1.00 g of tissue from $$ 37.0\text{ºC} $$ to $$100 \text{ºC} $$ and then boil
away 0.500 g of water, if it puts out 2.00 mA at 15.0 kV? Ignore heat transfer
to the surroundings.

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate the power output of the cauterizer using $$P = IV$$. Then calculate the total energy needed: (1) heating tissue from 37°C to 100°C, and (2) vaporizing water. Finally, find time using $$t = E/P$$.

**Solution**

Calculate power:

<div class="equation">
$$P = IV = (2.00 \times 10^{-3} \text{ A})(15.0 \times 10^{3} \text{ V}) = 30.0 \text{ W}$$
</div>

Energy to heat tissue (using $$c_{\text{tissue}} \approx 3500$$ J/kg·°C, similar to water):

<div class="equation">
$$Q_1 = mc\Delta T = (0.00100 \text{ kg})(3500 \text{ J/kg·°C})(100 - 37) = 220.5 \text{ J}$$
</div>

Energy to vaporize water ($$L_v = 2.256 \times 10^6$$ J/kg):

<div class="equation">
$$Q_2 = mL_v = (0.000500 \text{ kg})(2.256 \times 10^{6} \text{ J/kg}) = 1128 \text{ J}$$
</div>

Total energy: $$E = Q_1 + Q_2 = 220.5 + 1128 = 1348.5 \text{ J}$$

Time required:

<div class="equation">
$$t = \frac{E}{P} = \frac{1348.5 \text{ J}}{30.0 \text{ W}} = 44.95 \text{ s} \approx 45.0 \text{ s}$$
</div>

**Discussion**

The cauterizer takes about 45 seconds to heat and vaporize the tissue. Most of the energy (84%) goes into vaporizing water, not heating—this is typical because the latent heat of vaporization is much larger than the sensible heat. The high voltage (15 kV) with tiny current (2 mA) produces the same power as lower voltage at higher current, but creates a concentrated, localized heating effect suitable for precise surgical work.

The time needed is 45.0 s.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

Hydroelectric generators (see [[Figure 5]](#Figure5)) at Hoover Dam produce a
maximum current of $$ 8.00 \times 10^{3} \text{A} $$ at 250 kV. (a) What is the
power output? (b) The water that powers the generators enters and leaves the
system at low speed (thus its kinetic energy does not change) but loses 160 m in
altitude. How many cubic meters per second are needed, assuming 85.0%
efficiency?

![](../resources/Figure_20_04_05.jpg "Hydroelectric generators at the Hoover dam. (credit: Jon Sullivan)")
{: #Figure5}

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$P = IV$$ for electrical power output.

(b) The gravitational potential energy of falling water is converted to electrical energy with 85% efficiency. Use $$P_{\text{input}} = \rho g h \times \text{flow rate}$$ and relate to electrical output.

**Solution for (a)**

<div class="equation">
$$P = IV = (8.00 \times 10^{3} \text{ A})(250 \times 10^{3} \text{ V}) = 2.00 \times 10^{9} \text{ W} = 2.00 \text{ GW}$$
</div>

**Solution for (b)**

The water loses gravitational potential energy: $$\Delta PE = mgh$$ per unit time gives power input.

Power input required (accounting for 85% efficiency):

<div class="equation">
$$P_{\text{input}} = \frac{P_{\text{output}}}{\text{efficiency}} = \frac{2.00 \times 10^{9} \text{ W}}{0.850} = 2.35 \times 10^{9} \text{ W}$$
</div>

For water flow rate $$Q$$ (m³/s), mass flow rate is $$\rho Q$$ where $$\rho = 1000$$ kg/m³:

<div class="equation">
$$P_{\text{input}} = \rho Q g h$$
</div>

<div class="equation">
$$Q = \frac{P_{\text{input}}}{\rho g h} = \frac{2.35 \times 10^{9} \text{ W}}{(1000 \text{ kg/m}^3)(9.80 \text{ m/s}^2)(160 \text{ m})} = 1500 \text{ m}^3/\text{s}$$
</div>

**Discussion**

(a) Hoover Dam produces 2.0 GW at maximum output—enough to power about 1.3 million homes! This makes it one of the largest hydroelectric facilities in the U.S.

(b) The required water flow of 1500 m³/s (nearly 400,000 gallons per second) is enormous. The Colorado River must supply this flow rate, which is why dam operations are carefully managed to balance power generation with water conservation and downstream needs. The 160 m head (height difference) is crucial—doubling the head would halve the required flow rate for the same power output.

(a) The power output is 2.00 GW. (b) Approximately 1500 m³/s of water flow is needed.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) Assuming 95.0% efficiency for the conversion of electrical power by the
motor, what current must the 12.0-V batteries of a 750-kg electric car be able
to supply: (a) To accelerate from rest to 25.0 m/s in 1.00 min? (b) To climb a
$$ 2.00 \times 10^{2} \text{-m} $$ -high hill in 2.00 min at a constant 25.0-m/s
speed while exerting $$ 5.00 \times 10^{2} \text{N} $$ of force to overcome air
resistance and friction? (c) To travel at a constant 25.0-m/s speed, exerting a
$$ 5.00 \times 10^{2} \text{N} $$ force to overcome air resistance and friction?
See [[Figure 6]](#Figure6).

![](../resources/Figure_20_04_06.jpg "This REVAi, an electric car, gets recharged on a street in London. (credit: Frank Hebbert)")
{: #Figure6}

</div>
<div class="solution" markdown="1">
**Strategy**

For each scenario, calculate the mechanical power required, account for efficiency, then find current using $$P = IV$$.

**Solution for (a)** — Acceleration from rest

Kinetic energy gained: $$KE = \frac{1}{2}mv^2 = \frac{1}{2}(750 \text{ kg})(25.0 \text{ m/s})^2 = 234,375 \text{ J}$$

Mechanical power: $$P_{\text{mech}} = \frac{234,375 \text{ J}}{60.0 \text{ s}} = 3906 \text{ W}$$

Electrical power (accounting for 95% efficiency):

<div class="equation">
$$P_{\text{elec}} = \frac{P_{\text{mech}}}{0.950} = \frac{3906 \text{ W}}{0.950} = 4112 \text{ W}$$
</div>

Current: $$I = \frac{P}{V} = \frac{4112 \text{ W}}{12.0 \text{ V}} = 343 \text{ A}$$

**Solution for (b)** — Hill climb with friction

Power for climbing: $$P_{\text{gravity}} = \frac{mgh}{t} = \frac{(750)(9.80)(200)}{120} = 12,250 \text{ W}$$

Power for friction: $$P_{\text{friction}} = Fv = (500 \text{ N})(25.0 \text{ m/s}) = 12,500 \text{ W}$$

Total mechanical power: $$P_{\text{mech}} = 12,250 + 12,500 = 24,750 \text{ W}$$

Electrical power: $$P_{\text{elec}} = \frac{24,750}{0.950} = 26,053 \text{ W}$$

Current: $$I = \frac{26,053 \text{ W}}{12.0 \text{ V}} = 2.17 \times 10^{3} \text{ A}$$

**Solution for (c)** — Constant speed on flat ground

Only overcoming friction: $$P_{\text{mech}} = Fv = (500)(25.0) = 12,500 \text{ W}$$

Electrical power: $$P_{\text{elec}} = \frac{12,500}{0.950} = 13,158 \text{ W}$$

Current: $$I = \frac{13,158 \text{ W}}{12.0 \text{ V}} = 1.10 \times 10^{3} \text{ A}$$

**Discussion**

These currents are enormous for a 12-V system! Part (b) requiring 2170 A shows why practical electric vehicles use much higher voltages (300-800 V)—this reduces current to manageable levels, allowing smaller cables and reducing I²R losses. The hill-climbing scenario requires nearly twice the current of level travel because the car must do work against both gravity and friction.

(a) 343 A for acceleration. (b) $$2.17 \times 10^{3}$$ A for hill climbing. (c) $$1.10 \times 10^{3}$$ A for constant speed.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

A light-rail commuter train draws 630 A of 650-V DC electricity when
accelerating. (a) What is its power consumption rate in kilowatts? (b) How long
does it take to reach 20.0 m/s starting from rest if its loaded mass is $$ 5.30
\times 10^{4} \text{kg} $$ , assuming 95.0% efficiency and constant power? (c)
Find its average acceleration. (d) Discuss how the acceleration you found for
the light-rail train compares to what might be typical for an automobile.

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$P = IV$$. (b) Use energy conservation: electrical energy (times efficiency) equals kinetic energy gained. (c) Use $$a = v/t$$. (d) Compare to typical automobile acceleration.

**Solution for (a)**

<div class="equation">
$$P = IV = (630 \text{ A})(650 \text{ V}) = 409,500 \text{ W} = 410 \text{ kW}$$
</div>

**Solution for (b)**

Final kinetic energy: $$KE = \frac{1}{2}mv^2 = \frac{1}{2}(5.30 \times 10^{4})(20.0)^2 = 1.06 \times 10^{7} \text{ J}$$

Useful power (at 95% efficiency): $$P_{\text{useful}} = 0.950 \times 409,500 = 389,025 \text{ W}$$

Time: $$t = \frac{KE}{P_{\text{useful}}} = \frac{1.06 \times 10^{7} \text{ J}}{389,025 \text{ W}} = 27.2 \text{ s}$$

**Solution for (c)**

<div class="equation">
$$a = \frac{v}{t} = \frac{20.0 \text{ m/s}}{27.2 \text{ s}} = 0.735 \text{ m/s}^2$$
</div>

**Solution for (d)**

A typical automobile can accelerate from 0 to 20 m/s (about 45 mph) in approximately 5-8 seconds, giving accelerations of 2.5-4 m/s². The light-rail train's acceleration of 0.735 m/s² is about 3-5 times slower than a car. This lower acceleration is expected because:
- The train is much more massive (53,000 kg vs ~1500 kg for a car)
- Passenger comfort and safety require gentler acceleration
- Electric motor characteristics provide high torque at low speeds but limited peak power

**Discussion**

The train's 410 kW power consumption is substantial but necessary for its large mass. The relatively slow acceleration (0.735 m/s²) ensures passenger comfort—standing passengers would have difficulty maintaining balance at higher accelerations. Despite the lower acceleration, trains achieve competitive travel times through higher cruising speeds and fewer stops.

(a) Power consumption is 410 kW. (b) Time to reach 20 m/s is 27.2 s. (c) Average acceleration is 0.735 m/s². (d) This is 3-5 times slower than typical automobile acceleration.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) An aluminum power transmission line has a resistance of $$ 0.0580 \Omega
/\text{km} $$ . What is its mass per kilometer? (b) What is the mass per
kilometer of a copper line having the same resistance? A lower resistance would
shorten the heating time. Discuss the practical limits to speeding the heating
by lowering the resistance.

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$R = \rho L/A$$ to find the required cross-sectional area, then calculate mass using $$m = \rho_{\text{density}} \times A \times L$$.

**Solution for (a)** — Aluminum

Given: $$R/L = 0.0580$$ Ω/km, $$\rho_{\text{Al}} = 2.65 \times 10^{-8}$$ Ω·m, density $$= 2700$$ kg/m³

From $$R = \rho L/A$$: $$A = \frac{\rho L}{R} = \frac{\rho}{R/L}$$

<div class="equation">
$$A = \frac{2.65 \times 10^{-8} \text{ Ω·m}}{0.0580 \times 10^{-3} \text{ Ω/m}} = 4.57 \times 10^{-4} \text{ m}^2$$
</div>

Mass per kilometer:

<div class="equation">
$$m = \rho_{\text{density}} \times A \times L = (2700 \text{ kg/m}^3)(4.57 \times 10^{-4} \text{ m}^2)(1000 \text{ m}) = 1.23 \times 10^{3} \text{ kg}$$
</div>

**Solution for (b)** — Copper

Given: $$\rho_{\text{Cu}} = 1.72 \times 10^{-8}$$ Ω·m, density $$= 8900$$ kg/m³

<div class="equation">
$$A = \frac{1.72 \times 10^{-8} \text{ Ω·m}}{0.0580 \times 10^{-3} \text{ Ω/m}} = 2.97 \times 10^{-4} \text{ m}^2$$
</div>

Mass per kilometer:

<div class="equation">
$$m = (8900 \text{ kg/m}^3)(2.97 \times 10^{-4} \text{ m}^2)(1000 \text{ m}) = 2.64 \times 10^{3} \text{ kg}$$
</div>

**Discussion**

Aluminum requires 1230 kg/km while copper requires 2640 kg/km for the same resistance—copper is more than twice as heavy! Although copper is a better conductor (lower resistivity), its much higher density makes aluminum the preferred choice for overhead transmission lines. The weight savings reduce tower structural requirements and costs. Aluminum is also less expensive per kilogram. This is why nearly all long-distance power transmission lines use aluminum (or aluminum-core steel-reinforced cables).

(a) The aluminum line has a mass of $$1.23 \times 10^{3}$$ kg per kilometer. (b) The copper line has a mass of $$2.64 \times 10^{3}$$ kg per kilometer.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) An immersion heater utilizing 120 V can raise the temperature of a $$ 1.00
\times 10^{2} \text{-g} $$ aluminum cup containing 350 g of water from $$
20.0\text{ºC} $$ to $$ 95.0\text{ºC} $$ in 2.00 min. Find its resistance,
assuming it is constant during the process. (b) A lower resistance would shorten
the heating time. Discuss the practical limits to speeding the heating by
lowering the resistance.

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Calculate total heat needed, find required power, then use $$R = V^2/P$$ to find resistance.

(b) Consider the practical constraints on lowering resistance.

**Solution for (a)**

Heat required for aluminum ($$c_{\text{Al}} = 900$$ J/kg·°C):

<div class="equation">
$$Q_{\text{Al}} = m_{\text{Al}} c_{\text{Al}} \Delta T = (0.100 \text{ kg})(900)(95.0 - 20.0) = 6750 \text{ J}$$
</div>

Heat required for water ($$c_{\text{water}} = 4186$$ J/kg·°C):

<div class="equation">
$$Q_{\text{water}} = m_{\text{water}} c_{\text{water}} \Delta T = (0.350 \text{ kg})(4186)(75.0) = 109,883 \text{ J}$$
</div>

Total heat: $$Q = 6750 + 109,883 = 116,633 \text{ J}$$

Power required: $$P = \frac{Q}{t} = \frac{116,633 \text{ J}}{120 \text{ s}} = 972 \text{ W}$$

Resistance:

<div class="equation">
$$R = \frac{V^2}{P} = \frac{(120 \text{ V})^2}{972 \text{ W}} = 14.8 \text{ Ω}$$
</div>

**Solution for (b)**

Practical limits to lowering resistance include:
- **Current limits**: Lower resistance means higher current ($$I = V/R$$). Household circuits are typically limited to 15-20 A, limiting power to ~1800-2400 W.
- **Wire gauge**: Higher currents require thicker wires to avoid overheating.
- **Heater element durability**: Very high power densities can burn out heating elements.
- **Safety**: Higher power means more rapid and potentially dangerous heating if unattended.
- **Boiling hazard**: Too much power could cause violent boiling and splashing.

**Discussion**

The 14.8 Ω resistance produces about 1 kW, a reasonable power level for a portable immersion heater. At this power, it takes 2 minutes to heat the water—acceptable for making tea. A 5 Ω element would triple the power to ~3 kW, but this exceeds typical household circuit capacity and poses safety risks.

(a) The heater resistance is 14.8 Ω. (b) Practical limits include circuit breaker ratings, wire heating, safety, and heater element durability.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) What is the cost of heating a hot tub containing 1500 kg of water from $$
10.0\text{ºC} $$ to $$ 40.0\text{ºC} $$ , assuming 75.0% efficiency to account
for heat transfer to the surroundings? The cost of electricity is $$9
\text{cents/kW}\cdot \text{h} $$ .
(b) What current was used by the 220-V AC electric heater, if this took 4.00 h?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Calculate heat needed, account for efficiency losses, convert to kWh, and find cost.

(b) Use the energy and time to find power, then current.

**Solution for (a)**

Heat required for water:

<div class="equation">
$$Q = mc\Delta T = (1500 \text{ kg})(4186 \text{ J/kg·°C})(40.0 - 10.0) = 1.88 \times 10^{8} \text{ J}$$
</div>

Accounting for 75% efficiency (more energy input needed):

<div class="equation">
$$E_{\text{input}} = \frac{Q}{\text{efficiency}} = \frac{1.88 \times 10^{8} \text{ J}}{0.750} = 2.51 \times 10^{8} \text{ J}$$
</div>

Convert to kWh: $$E = \frac{2.51 \times 10^{8} \text{ J}}{3.60 \times 10^{6} \text{ J/kWh}} = 69.7 \text{ kWh}$$

Cost:

<div class="equation">
$$\text{Cost} = 69.7 \text{ kWh} \times \$0.09/\text{kWh} = \$6.27$$
</div>

**Solution for (b)**

Power used:

<div class="equation">
$$P = \frac{E}{t} = \frac{69.7 \text{ kWh}}{4.00 \text{ h}} = 17.4 \text{ kW}$$
</div>

Current:

<div class="equation">
$$I = \frac{P}{V} = \frac{17,400 \text{ W}}{220 \text{ V}} = 79.1 \text{ A}$$
</div>

**Discussion**

(a) Heating the hot tub costs about $6.27—relatively inexpensive for the enjoyment it provides. This explains why hot tubs are often kept warm continuously rather than heated from cold each time.

(b) The 79 A current is substantial and requires a dedicated 220-V circuit with appropriate wiring. This is typical for hot tub installations and explains why they need special electrical hookups. The 17.4 kW heater is powerful—equivalent to about seven hair dryers running simultaneously!

(a) The cost is approximately $6.27. (b) The current used is 79.1 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) What current is needed to transmit $$ 1.00 \times 10^{2} \text{MW} $$ of
power at 480 V? (b) What power is dissipated by the transmission lines if they
have a $$ 1.00 \text{-} \Omega $$ resistance? (c) What is unreasonable about
this result? (d) Which assumptions are unreasonable, or which premises are
inconsistent?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$I = P/V$$ to find current. (b) Use $$P_{\text{loss}} = I^2R$$ to find power dissipated. (c-d) Analyze whether results are physically reasonable.

**Solution for (a)**

<div class="equation">
$$I = \frac{P}{V} = \frac{1.00 \times 10^{8} \text{ W}}{480 \text{ V}} = 2.08 \times 10^{5} \text{ A}$$
</div>

**Solution for (b)**

<div class="equation">
$$P_{\text{loss}} = I^2 R = (2.08 \times 10^{5} \text{ A})^2 (1.00 \text{ Ω}) = 4.33 \times 10^{10} \text{ W} = 4.33 \times 10^{4} \text{ MW}$$
</div>

**Solution for (c)**

The transmission lines dissipate 43,300 MW—over 430 times more power than they're supposed to transmit (100 MW)! This means only about 0.23% of the generated power would reach the destination, with 99.77% lost as heat. The transmission lines would also vaporize from the extreme current.

**Solution for (d)**

The voltage of 480 V is unreasonably low for power transmission. Since $$P_{\text{loss}} = I^2R = P^2/(V^2) \times R$$, power loss is inversely proportional to the square of the voltage. Real transmission lines use voltages of 115 kV to 765 kV or higher. At 500 kV, the current would be only 200 A, and line losses would be just 40 kW—0.04% of the transmitted power.

**Discussion**

This problem illustrates why high-voltage transmission is essential for long-distance power delivery. Thomas Edison's original DC distribution systems used low voltages and could only serve customers within about a mile of the power station. The adoption of AC and transformers (championed by Tesla and Westinghouse) allowed voltage step-up for efficient transmission and step-down for safe distribution, enabling our modern grid.

(a) The required current is $$2.08 \times 10^{5}$$ A. (b) Power loss is $$4.33 \times 10^{4}$$ MW. (c) This is unreasonable—more power is lost than transmitted. (d) The 480 V transmission voltage is unreasonably low; high voltages (100s of kV) are needed.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) What current is needed to transmit $$ 1.00 \times 10^{2} \text{MW} $$ of
power at 10.0 kV? (b) Find the resistance of 1.00 km of wire that would cause a
0.0100% power loss. (c) What is the diameter of a 1.00-km-long copper wire
having this resistance? (d) What is unreasonable about these results? (e) Which
assumptions are unreasonable, or which premises are inconsistent?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$I = P/V$$. (b) For a given power loss percentage, find required resistance. (c) Use $$R = \rho L/A$$ to find area, then diameter. (d-e) Assess reasonableness.

**Solution for (a)**

<div class="equation">
$$I = \frac{P}{V} = \frac{1.00 \times 10^{8} \text{ W}}{10.0 \times 10^{3} \text{ V}} = 1.00 \times 10^{4} \text{ A}$$
</div>

**Solution for (b)**

Power loss of 0.0100% of 100 MW:

<div class="equation">
$$P_{\text{loss}} = 0.000100 \times 1.00 \times 10^{8} \text{ W} = 1.00 \times 10^{4} \text{ W} = 10.0 \text{ kW}$$
</div>

Using $$P_{\text{loss}} = I^2 R$$:

<div class="equation">
$$R = \frac{P_{\text{loss}}}{I^2} = \frac{1.00 \times 10^{4} \text{ W}}{(1.00 \times 10^{4} \text{ A})^2} = 1.00 \times 10^{-4} \text{ Ω}$$
</div>

**Solution for (c)**

For copper ($$\rho = 1.72 \times 10^{-8}$$ Ω·m):

<div class="equation">
$$A = \frac{\rho L}{R} = \frac{(1.72 \times 10^{-8})(1000)}{1.00 \times 10^{-4}} = 0.172 \text{ m}^2$$
</div>

Diameter from $$A = \pi d^2/4$$:

<div class="equation">
$$d = \sqrt{\frac{4A}{\pi}} = \sqrt{\frac{4(0.172)}{\pi}} = 0.468 \text{ m} = 46.8 \text{ cm}$$
</div>

**Solution for (d)**

A wire diameter of 46.8 cm (nearly half a meter!) is completely unreasonable for a transmission line. Such a wire would weigh about 1.5 million kg per kilometer and be impossible to support on towers. No transmission line uses wire anywhere close to this size.

**Solution for (e)**

The combination of premises is inconsistent:
- The 0.01% power loss target is too stringent for practical transmission
- The 10 kV voltage is still too low for transmitting 100 MW
- Real transmission systems accept 3-5% losses and use much higher voltages

At 500 kV (typical for major transmission lines), the current drops to 200 A, and achieving reasonable losses requires much more manageable wire sizes (a few centimeters diameter).

**Discussion**

This problem demonstrates the interdependence of voltage, current, and conductor size in power transmission. Engineers must balance efficiency goals against practical constraints like weight, cost, and structural requirements.

(a) Current is $$1.00 \times 10^{4}$$ A. (b) Required resistance is $$1.00 \times 10^{-4}$$ Ω. (c) Wire diameter would be 46.8 cm. (d) This diameter is unreasonably large. (e) The combination of low voltage and extremely low loss requirement is inconsistent with practical constraints.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider an electric immersion heater used to heat a cup of water to make tea.
Construct a problem in which you calculate the needed resistance of the heater
so that it increases the temperature of the water and cup in a reasonable amount
of time. Also calculate the cost of the electrical energy used in your process.
Among the things to be considered are the voltage used, the masses and heat
capacities involved, heat losses, and the time over which the heating takes
place. Your instructor may wish for you to consider a thermal safety switch (
perhaps bimetallic) that will halt the process before damaging temperatures are
reached in the immersion unit.

</div>
<div class="solution" markdown="1">
**Sample Problem**

An electric immersion heater operates on 120 V and is used to heat 300 g of water in a 50-g ceramic mug from room temperature (22°C) to boiling (100°C) in 3 minutes. (a) What resistance should the heater have? (b) What is the cost of this energy if electricity costs $0.12/kWh? (c) What safety considerations apply?

**Strategy**

Calculate the total heat required, determine the power needed, then find resistance using $$R = V^2/P$$.

**Solution for (a)**

Heat for ceramic mug ($$c_{\text{ceramic}} = 800$$ J/kg·°C):

<div class="equation">
$$Q_{\text{mug}} = m_{\text{mug}} c_{\text{ceramic}} \Delta T = (0.050 \text{ kg})(800)(100 - 22) = 3120 \text{ J}$$
</div>

Heat for water ($$c_{\text{water}} = 4186$$ J/kg·°C):

<div class="equation">
$$Q_{\text{water}} = m_{\text{water}} c_{\text{water}} \Delta T = (0.300 \text{ kg})(4186)(78) = 97,955 \text{ J}$$
</div>

Total heat: $$Q = 3120 + 97,955 = 101,075 \text{ J}$$

Power required: $$P = \frac{Q}{t} = \frac{101,075 \text{ J}}{180 \text{ s}} = 562 \text{ W}$$

Resistance:

<div class="equation">
$$R = \frac{V^2}{P} = \frac{(120 \text{ V})^2}{562 \text{ W}} = 25.6 \text{ Ω}$$
</div>

**Solution for (b)**

Energy in kWh: $$E = (0.562 \text{ kW})(0.050 \text{ h}) = 0.0281 \text{ kWh}$$

Cost: $$0.0281 \text{ kWh} \times \$0.12/\text{kWh} = \$0.0034 \approx 0.3 \text{ cents}$$

**Solution for (c)**

Safety considerations include:
- A thermal cutoff switch (bimetallic) should deactivate the heater if water boils away, preventing element burnout and fire
- The element should be fully immersed to prevent overheating
- Proper electrical insulation prevents shock when touching the water
- Current draw is 4.7 A, well within household circuit limits

**Discussion**

The 25.6 Ω heater draws about 560 W—less than a typical hair dryer. The 0.3-cent cost shows that making tea electrically is very inexpensive. The 3-minute heating time is reasonable for a morning cup of tea. Lower resistance would speed heating but increase current draw; a 10 Ω element would draw 12 A, approaching circuit limits.

(a) The heater resistance should be about 25.6 Ω. (b) The cost is approximately 0.3 cents. (c) A thermal safety switch is essential to prevent overheating if water boils away.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

electric power
: the rate at which electrical energy is supplied by a source or dissipated by a
device; it is the product of current times voltage

</div>
