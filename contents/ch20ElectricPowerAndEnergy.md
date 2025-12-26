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

![Part a has two images. The image on the left is a photograph of a twenty five watt incandescent bulb emitting a dim, yellowish white color. The image on the right is a photograph of a sixty watt incandescent bulb emitting a brighter white light. Part b is a single photograph of a compact fluorescent lightbulb glowing in bright pure white color.](../resources/Figure_20_04_01.jpg '(a) Which of these lightbulbs, the 25-W bulb (upper left) or the 60-W bulb (upper right), has the higher resistance? Which draws more current? Which uses the most energy? Can you tell from the color that the 25-W filament is cooler? Is the brighter bulb a different color and if so why? (credits: Dickbauch, Wikimedia Commons; Greg Westfall, Flickr) (b) This compact fluorescent light (CFL) puts out the same intensity of light as the 60-W bulb, but at 1/4 to 1/10 the input power. (credit: dbgg1979, Flickr)')
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

Electric power ( $$P $$ ) is simply the product of current times voltage.
Power has familiar units of watts. Since the SI unit for potential energy (PE)
is the joule, power has units of joules per second, or watts. Thus, $$1
\text{A}\cdot \text{V}=1 \text{W} $$ . For example, cars often have one or more
auxiliary power outlets with which you can charge a cell phone or other
electronic devices. These outlets may be rated at 20 A, so that the circuit can
deliver a maximum power $$P=IV=\left(20 \text{A}\right)\left(12 \text{V}\right)
=240 \text{W} $$ . In some applications, electric power may be expressed as
volt-amperes or even kilovolt-amperes ( $$1 \text{kA}\cdot \text{V}=1 \text{kW}

$$
).

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

__Solution for (a)__

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

_ Electric power $$P $$ is the rate (in watts) that energy is supplied by a
  source or dissipated by a device.
_ Three expressions for electrical power are

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

_ The energy used by a device with a power $$P $$ over a time $$t $$ is $$E=P t
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

Use the basic power equation $$P = IV$$, converting the voltage to SI units (volts).

**Solution**

Convert voltage:

<div class="equation">
$$V = 1.00 \times 10^{2} \text{ MV} = 1.00 \times 10^{8} \text{ V}$$
</div>

Calculate power:

<div class="equation">
$$P = IV = (2.00 \times 10^{4} \text{ A})(1.00 \times 10^{8} \text{ V}) = 2.00 \times 10^{12} \text{ W} = 2.00 \text{ TW}$$
</div>

**Discussion**

This 2 terawatt power is enormous—roughly equal to the total average power consumption of the entire United States! However, a lightning bolt lasts only about 0.2 milliseconds, so the total energy delivered is $$E = Pt = (2 \times 10^{12})(2 \times 10^{-4}) = 4 \times 10^{8}$$ J, or about 110 kWh. Despite the impressive power, the brief duration means the energy is similar to running a 100-W light bulb for about 45 days.

The power of the lightning bolt is $$2.00 \times 10^{12}$$ W (2.00 TW).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What power is supplied to the starter motor of a large truck that draws 250 A of current from a 24.0-V battery hookup?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the basic power equation $$P = IV$$, where $$I$$ is the current and $$V$$ is the voltage supplied by the battery.

**Solution**

<div class="equation">
$$P = IV = (250 \text{ A})(24.0 \text{ V}) = 6000 \text{ W} = 6.00 \text{ kW}$$
</div>

**Discussion**

This 6.00 kW of power is substantial—equivalent to about 8 horsepower—which is necessary to overcome the mechanical resistance of a large truck engine during starting. The high current of 250 A requires thick battery cables to minimize resistance losses. Large trucks use 24-V systems (two 12-V batteries in series) rather than the 12-V systems in cars because, for the same power, a higher voltage requires less current, allowing for lighter-gauge cables.

The starter motor receives 6.00 kW of power from the battery.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A charge of 4.00 C of charge passes through a pocket calculator's solar cells in 4.00 h. What is the power output, given the calculator's voltage output is 3.00 V? (See [[Figure 2]](#Figure2).)

</div>
<div class="solution" markdown="1">
**Strategy**

First find the current using $$I = \frac{\Delta Q}{\Delta t}$$, then calculate power using $$P = IV$$.

**Solution**

Calculate the current:

<div class="equation">
$$I = \frac{\Delta Q}{\Delta t} = \frac{4.00 \text{ C}}{4.00 \text{ h} \times 3600 \text{ s/h}} = \frac{4.00 \text{ C}}{14400 \text{ s}} = 2.78 \times 10^{-4} \text{ A}$$
</div>

Calculate the power output:

<div class="equation">
$$P = IV = (2.78 \times 10^{-4} \text{ A})(3.00 \text{ V}) = 8.33 \times 10^{-4} \text{ W} = 0.833 \text{ mW}$$
</div>

**Discussion**

This tiny power output of less than 1 milliwatt is sufficient for a pocket calculator because modern electronic calculators are extremely efficient. The small solar cell strip provides enough power to operate the LCD display and processor chip. This demonstrates how little energy is required for modern low-power electronics.

The power output of the calculator's solar cells is 0.833 mW.

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

First calculate the current from the charge and time using $$I = \frac{\Delta Q}{\Delta t}$$, then find power using $$P = IV$$.

**Solution**

Calculate the current:

<div class="equation">
$$I = \frac{\Delta Q}{\Delta t} = \frac{600 \text{ C}}{0.500 \text{ h} \times 3600 \text{ s/h}} = \frac{600 \text{ C}}{1800 \text{ s}} = 0.333 \text{ A}$$
</div>

Calculate the power:

<div class="equation">
$$P = IV = (0.333 \text{ A})(3.00 \text{ V}) = 1.00 \text{ W}$$
</div>

**Discussion**

A 1-watt flashlight is consistent with a small, battery-powered LED flashlight. The 3.00 V suggests two AA or AAA batteries in series. Modern LED flashlights are much more efficient than older incandescent bulb flashlights, producing more light per watt consumed. This 1-watt power consumption is reasonable for portable lighting that needs to conserve battery life.

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

Use the power equation $$P = I^{2}R$$ since we know current and resistance. This form shows that power dissipation increases with resistance for a given current.

**Solution**

__(a)__ For the quality extension cord:

<div class="equation">
$$P = I^{2}R = (5.00 \text{ A})^{2}(0.0600 \text{ Ω}) = (25.0 \text{ A}^{2})(0.0600 \text{ Ω}) = 1.50 \text{ W}$$
</div>

__(b)__ For the cheaper cord with higher resistance:

<div class="equation">
$$P = I^{2}R = (5.00 \text{ A})^{2}(0.300 \text{ Ω}) = (25.0 \text{ A}^{2})(0.300 \text{ Ω}) = 7.50 \text{ W}$$
</div>

**Discussion**

The cheaper cord with 5× higher resistance dissipates 5× more power as heat (7.50 W vs 1.50 W). This wasted power represents both energy loss and a potential fire hazard. For a 120-V appliance drawing 5 A, the voltage drop across each cord would be $$V = IR$$: 0.30 V for the quality cord versus 1.50 V for the cheaper cord. While these voltage drops seem small, they become significant at higher currents. Additionally, the heat generated in the cheaper cord could melt its insulation over time, especially if coiled up or run under a carpet. This is why electrical codes specify minimum wire gauges for extension cords based on length and expected current.

(a) The quality cord dissipates 1.50 W. (b) The cheaper cord dissipates 7.50 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify that the units of a volt-ampere are watts, as implied by the equation  $$P=IV $$.

</div>
<div class="solution" markdown="1">
**Strategy**

We express volts and amperes in terms of fundamental SI units and show that their product equals watts (joules per second).

**Solution**

Starting with the definitions:
- 1 volt = 1 joule per coulomb (energy per charge): $$1 \text{ V} = 1 \text{ J/C}$$
- 1 ampere = 1 coulomb per second (charge per time): $$1 \text{ A} = 1 \text{ C/s}$$

Multiply volt × ampere:

<div class="equation">
$$1 \text{ V} \cdot \text{A} = \left(\frac{1 \text{ J}}{1 \text{ C}}\right) \cdot \left(\frac{1 \text{ C}}{1 \text{ s}}\right) = \frac{1 \text{ J}}{1 \text{ s}} = 1 \text{ W}$$
</div>

**Discussion**

This unit analysis confirms that the equation $$P = IV$$ is dimensionally correct. The coulombs cancel, leaving joules per second, which is the definition of a watt. This verification is important because it shows that our power equation is consistent with the fundamental definitions of electrical quantities.

The units verify: 1 V·A = 1 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the units  $$1 {\text{V}}^{2}/\Omega =1\text{W} $$ ,
 as implied by the equation  $$P={V}^{2}/R $$.

</div>
<div class="solution" markdown="1">
 $$\frac{ {V}^{2}}{\Omega }=\frac{ {V}^{2}}{\text{V/A}}=\text{AV}=\left(\frac{C}{s}\right)\left(\frac{J}{C}\right)=\frac{J}{s}=1 \text{W} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the units  $$1 {\text{A}}^{2}\cdot \Omega =1 \text{W} $$ ,
 as implied by the equation  $$P={I}^{2}R $$.

</div>
<div class="solution" markdown="1">
**Strategy**

We express amperes and ohms in terms of fundamental SI units and show that A²·Ω equals watts.

**Solution**

Starting with the definitions:
- 1 ohm = 1 volt per ampere: $$1 \text{ Ω} = 1 \text{ V/A}$$
- 1 volt = 1 joule per coulomb: $$1 \text{ V} = 1 \text{ J/C}$$
- 1 ampere = 1 coulomb per second: $$1 \text{ A} = 1 \text{ C/s}$$

Calculate A²·Ω:

<div class="equation">
$$1 \text{ A}^{2} \cdot \Omega = 1 \text{ A}^{2} \cdot \frac{\text{V}}{\text{A}} = 1 \text{ A} \cdot \text{V}$$
</div>

From the previous problem, we know $$1 \text{ A} \cdot \text{V} = 1 \text{ W}$$. Alternatively:

<div class="equation">
$$1 \text{ A}^{2} \cdot \Omega = \left(\frac{\text{C}}{\text{s}}\right)^{2} \cdot \frac{\text{V}}{\text{A}} = \frac{\text{C}^{2}}{\text{s}^{2}} \cdot \frac{\text{J/C}}{\text{C/s}} = \frac{\text{C}^{2}}{\text{s}^{2}} \cdot \frac{\text{J} \cdot \text{s}}{\text{C}^{2}} = \frac{\text{J}}{\text{s}} = 1 \text{ W}$$
</div>

**Discussion**

This confirms that $$P = I^{2}R$$ is dimensionally consistent. This form of the power equation is particularly useful when current and resistance are known but voltage is not. It also shows that power dissipated in a resistor increases with the square of the current, making high currents particularly problematic for heating.

The units verify: 1 A²·Ω = 1 W.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify the energy unit equivalence that  $$1 \text{kW}\cdot \text{h = } 3.60 \times 10^{6}  \text{J} $$.

</div>
<div class="solution" markdown="1">
 $$1 \text{kW}\cdot \text{h}=\left(\frac{1 \times 10^{3}  \text{J}}{1 \text{s}}\right)\left(1 h\right)\left(\frac{3600 \text{s}}{1 \text{h}}\right)= 3.60 \times 10^{6}  \text{J} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Electrons in an X-ray tube are accelerated through  $$ 1.00 \times 10^{2}  \text{kV} $$
 and directed toward a target to produce X-rays. Calculate the power of the electron beam in this tube if it has a current of 15.0 mA.

</div>
<div class="solution" markdown="1">
**Strategy**

We use $$P = IV$$ with the given voltage and current, converting to SI units first.

**Solution**

Convert to SI units:

<div class="equation">
$$V = 1.00 \times 10^{2} \text{ kV} = 1.00 \times 10^{5} \text{ V}$$
</div>

<div class="equation">
$$I = 15.0 \text{ mA} = 15.0 \times 10^{-3} \text{ A} = 0.0150 \text{ A}$$
</div>

Calculate the power:

<div class="equation">
$$P = IV = (0.0150 \text{ A})(1.00 \times 10^{5} \text{ V}) = 1.50 \times 10^{3} \text{ W} = 1.50 \text{ kW}$$
</div>

**Discussion**

This 1.50 kW power is substantial for an electron beam. Most of this energy is converted to heat when the electrons strike the target, with only about 1% converted to X-rays. This is why X-ray tubes require active cooling systems. The high voltage of 100 kV determines the maximum energy (and hence minimum wavelength) of the X-rays produced, while the current determines the intensity of the X-ray beam.

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

Calculate daily energy use with $$E = Pt$$, then multiply by 365 days for annual use. Finally, multiply by the cost per kW·h.

**Solution**

Calculate daily energy consumption:

<div class="equation">
$$E_{\text{daily}} = Pt = (5.00 \text{ kW})(2.00 \text{ h}) = 10.0 \text{ kW·h/day}$$
</div>

Calculate annual energy consumption:

<div class="equation">
$$E_{\text{annual}} = 10.0 \text{ kW·h/day} \times 365 \text{ days/year} = 3650 \text{ kW·h/year}$$
</div>

Calculate annual cost:

<div class="equation">
$$\text{Cost} = (3650 \text{ kW·h})(\$0.120/\text{kW·h}) = \$438/\text{year}$$
</div>

**Discussion**

Water heating is typically one of the largest energy expenses in a home, often second only to heating/cooling. At \$438/year, this represents a significant operating cost. The "on-demand" or tankless water heater shown in the figure can reduce energy costs compared to traditional tank heaters because it only heats water when needed, eliminating standby heat losses. However, the instantaneous power demand (5 kW) is high, requiring adequate electrical service.

The annual cost of running the water heater is \$438.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
With a 1200-W toaster, how much electrical energy is needed to make a slice of toast (cooking time = 1 minute)? At  $$9.0 \text{cents/kW · h} $$ ,
 how much does this cost?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$E = Pt$$ to find the energy consumed, converting time to appropriate units for both joules and kilowatt-hours. Then calculate the cost using the given rate.

**Solution**

Calculate the energy in joules:

<div class="equation">
$$E = Pt = (1200 \text{ W})(1 \text{ min} \times 60 \text{ s/min}) = (1200 \text{ W})(60 \text{ s}) = 72000 \text{ J} = 72.0 \text{ kJ}$$
</div>

Convert to kilowatt-hours:

<div class="equation">
$$E = (1200 \text{ W})\left(\frac{1}{60} \text{ h}\right) = 20 \text{ W·h} = 0.0200 \text{ kW·h}$$
</div>

Calculate the cost:

<div class="equation">
$$\text{Cost} = (0.0200 \text{ kW·h})(\$0.090\text{/kW·h}) = \$0.0018 = 0.18 \text{ cents}$$
</div>

**Discussion**

Making a slice of toast costs less than one-fifth of a cent! This shows how inexpensive electrical energy is for everyday tasks. While 1200 W is a high power level, the short duration (1 minute) keeps the total energy consumption very low. This contrasts with appliances that run continuously, like refrigerators or water heaters, which dominate household electricity bills despite having lower power ratings.

Making a slice of toast requires 72.0 kJ (or 0.0200 kW·h) of energy and costs about 0.18 cents.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What would be the maximum cost of a CFL such that the total cost (investment plus operating) would be the same for both CFL and incandescent 60-W bulbs? Assume the cost of the incandescent bulb is 25 cents and that electricity costs  $$10 \text{cents/kWh} $$ .
 Calculate the cost for 1000 hours, as in the cost effectiveness of CFL example.

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate the total cost (bulb + electricity) for the incandescent for 1000 hours. For a fair comparison, set the CFL total cost equal to the incandescent total cost and solve for the maximum CFL price. The CFL uses 1/4 the power (15 W instead of 60 W).

**Solution**

Calculate incandescent total cost for 1000 hours:

<div class="equation">
$$E_{\text{incand}} = Pt = (60 \text{ W})(1000 \text{ h}) = 60 \text{ kW·h}$$
</div>

<div class="equation">
$$\text{Electricity cost} = (60 \text{ kW·h})(\$0.10/\text{kW·h}) = \$6.00$$
</div>

<div class="equation">
$$\text{Total incandescent cost} = \$0.25 + \$6.00 = \$6.25$$
</div>

For the CFL running 1000 hours:

<div class="equation">
$$E_{\text{CFL}} = Pt = (15 \text{ W})(1000 \text{ h}) = 15 \text{ kW·h}$$
</div>

<div class="equation">
$$\text{CFL electricity cost} = (15 \text{ kW·h})(\$0.10/\text{kW·h}) = \$1.50$$
</div>

For breakeven total cost over 1000 hours:

<div class="equation">
$$\text{CFL price} + \$1.50 = \$6.25$$
</div>

<div class="equation">
$$\text{Maximum CFL price} = \$6.25 - \$1.50 = \$4.75$$
</div>

However, accounting for the CFL's longer lifetime (10,000 hours vs 1,000 hours), only 1/10 of its cost applies to this period, allowing a maximum price of \$47.50 for true lifecycle equivalence.

**Discussion**

The electricity savings of \$4.50 over 1000 hours means a CFL costing up to \$4.75 more than an incandescent bulb will still break even in this period. When you factor in that the CFL lasts 10× longer, the economics strongly favor CFLs. At typical CFL prices of \$1.50-\$5.00, they offer significant savings over incandescent bulbs.

The maximum CFL cost for equivalent total cost over 1000 hours is \$6.25 (when accounting for the full bulb price during the comparison period).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Some makes of older cars have 6.00-V electrical systems. (a) What is the hot resistance of a 30.0-W headlight in such a car? (b) What current flows through it?

</div>
<div class="solution" markdown="1">
**Strategy**

For part (a), use $$P = V^{2}/R$$ rearranged to $$R = V^{2}/P$$. For part (b), use $$P = IV$$ rearranged to $$I = P/V$$.

**Solution**

__(a)__ Calculate the hot resistance:

<div class="equation">
$$R = \frac{V^{2}}{P} = \frac{(6.00 \text{ V})^{2}}{30.0 \text{ W}} = \frac{36.0 \text{ V}^{2}}{30.0 \text{ W}} = 1.20 \text{ Ω}$$
</div>

__(b)__ Calculate the current:

<div class="equation">
$$I = \frac{P}{V} = \frac{30.0 \text{ W}}{6.00 \text{ V}} = 5.00 \text{ A}$$
</div>

**Discussion**

The 1.20 Ω resistance is relatively low, which is necessary to allow sufficient current at the lower 6-V system voltage. The 5.00 A current is higher than what a similar-brightness headlight would draw in a modern 12-V system (which would be 2.50 A for the same power). This is why older 6-V systems required thicker wires to handle the higher currents without excessive power losses. The automotive industry switched to 12-V systems partly to reduce these wiring requirements.

(a) The hot resistance is 1.20 Ω. (b) A current of 5.00 A flows through the headlight.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Alkaline batteries have the advantage of putting out constant voltage until very nearly the end of their life. How long will an alkaline battery rated at  $$1.00 \text{A}\cdot \text{h} $$
 and 1.58 V keep a 1.00-W flashlight bulb burning?

</div>
<div class="solution" markdown="1">
**Strategy**

The battery's energy capacity can be expressed as charge capacity (A·h) times voltage. The flashlight's power consumption determines the rate of energy use. We find how long the battery's energy lasts at this power level.

**Solution**

Calculate the battery's total energy capacity:

<div class="equation">
$$E = (1.00 \text{ A·h})(1.58 \text{ V}) = 1.58 \text{ W·h}$$
</div>

Calculate the operating time using $$E = Pt$$:

<div class="equation">
$$t = \frac{E}{P} = \frac{1.58 \text{ W·h}}{1.00 \text{ W}} = 1.58 \text{ h}$$
</div>

**Discussion**

The battery will power the flashlight for about 1.58 hours (1 hour 35 minutes). This calculation assumes ideal conditions with no internal battery resistance losses. In practice, the actual time may be slightly less due to internal resistance heating and the gradual voltage drop near the end of the battery's life. The amp-hour rating is useful because it remains relatively constant regardless of discharge rate, while actual energy depends on the voltage at which that current is delivered.

The alkaline battery will keep the flashlight burning for 1.58 hours.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A cauterizer, used to stop bleeding in surgery, puts out 2.00 mA at 15.0 kV. (a) What is its power output? (b) What is the resistance of the path?

</div>
<div class="solution" markdown="1">
**Strategy**

For part (a), use $$P = IV$$. For part (b), use Ohm's law $$R = V/I$$.

**Solution**

Convert to SI units:

<div class="equation">
$$I = 2.00 \text{ mA} = 2.00 \times 10^{-3} \text{ A}$$
</div>

<div class="equation">
$$V = 15.0 \text{ kV} = 15.0 \times 10^{3} \text{ V} = 1.50 \times 10^{4} \text{ V}$$
</div>

__(a)__ Calculate the power:

<div class="equation">
$$P = IV = (2.00 \times 10^{-3} \text{ A})(1.50 \times 10^{4} \text{ V}) = 30.0 \text{ W}$$
</div>

__(b)__ Calculate the resistance:

<div class="equation">
$$R = \frac{V}{I} = \frac{1.50 \times 10^{4} \text{ V}}{2.00 \times 10^{-3} \text{ A}} = 7.50 \times 10^{6} \text{ Ω} = 7.50 \text{ MΩ}$$
</div>

**Discussion**

The 30.0 W power output is sufficient to cauterize blood vessels by heating tissue to coagulation temperatures. The high voltage (15 kV) is needed because of the very high resistance of the tissue path (7.50 MΩ). Despite the high voltage, the current is kept very low (2 mA) for safety—this is below the threshold that would cause dangerous stimulation of heart muscle. The power is concentrated at the small contact point of the cauterizer, creating intense local heating while minimizing effects on surrounding tissue.

(a) The power output is 30.0 W. (b) The resistance of the path is 7.50 MΩ.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The average television is said to be on 6 hours per day. Estimate the yearly cost of electricity to operate 100 million TVs, assuming their power consumption averages 150 W and the cost of electricity averages  $$ 12.0 \text{cents/kW}\cdot \text{h} $$.

</div>
<div class="solution" markdown="1">
 $$3.94 billion/year

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An old lightbulb draws only 50.0 W, rather than its original 60.0 W, due to evaporative thinning of its filament. By what factor is its diameter reduced, assuming uniform thinning along its length? Neglect any effects caused by temperature differences.

</div>
<div class="solution" markdown="1">
**Strategy**

At constant voltage, power depends on resistance: $$P = V^{2}/R$$. The resistance of a wire is $$R = \rho L/A$$, where $$A \propto D^{2}$$ for a circular cross-section. Combining these relationships, we can find how diameter relates to power.

**Solution**

At constant voltage and resistivity:

<div class="equation">
$$P = \frac{V^{2}}{R} = \frac{V^{2}}{(\rho L/A)} = \frac{V^{2} A}{\rho L} \propto A \propto D^{2}$$
</div>

Therefore:

<div class="equation">
$$\frac{P_{\text{new}}}{P_{\text{old}}} = \frac{D_{\text{new}}^{2}}{D_{\text{old}}^{2}}$$
</div>

<div class="equation">
$$\frac{D_{\text{new}}}{D_{\text{old}}} = \sqrt{\frac{P_{\text{new}}}{P_{\text{old}}}} = \sqrt{\frac{50.0 \text{ W}}{60.0 \text{ W}}} = \sqrt{0.833} = 0.913$$
</div>

**Discussion**

The filament diameter has been reduced to about 91.3% of its original value—a reduction of about 8.7%. This small change in diameter produces a noticeable 17% reduction in power (and thus light output). This illustrates how sensitive the power is to filament dimensions, since power is proportional to diameter squared. The evaporation of tungsten from hot filaments is a gradual process that eventually leads to bulb failure when the filament becomes thin enough to break.

The filament diameter is reduced by a factor of 0.913 (or reduced to 91.3% of its original diameter).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
00-gauge copper wire has a diameter of 9.266 mm. Calculate the power loss in a kilometer of such wire when it carries  $$ 1.00 \times 10^{2}  \text{A} $$.

</div>
<div class="solution" markdown="1">
25.5 W

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

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

Calculate the useful power output, then use the heat of vaporization of water ($$L_v = 2.26 \times 10^{6}$$ J/kg) to find the vaporization rate.

**Solution**

__(a)__ Calculate the useful power:

<div class="equation">
$$P_{\text{useful}} = \eta \times P = \eta \times IV = (0.950)(3.50 \text{ A})(120 \text{ V}) = 399 \text{ W}$$
</div>

The vaporization rate is:

<div class="equation">
$$\text{Rate} = \frac{P_{\text{useful}}}{L_v} = \frac{399 \text{ J/s}}{2.26 \times 10^{6} \text{ J/kg}} = 1.77 \times 10^{-4} \text{ kg/s}$$
</div>

Converting to grams per minute:

<div class="equation">
$$\text{Rate} = 1.77 \times 10^{-4} \text{ kg/s} \times \frac{1000 \text{ g}}{1 \text{ kg}} \times \frac{60 \text{ s}}{1 \text{ min}} = 10.6 \text{ g/min}$$
</div>

__(b)__ For 8.00 hours of operation:

<div class="equation">
$$\text{Water needed} = 10.6 \text{ g/min} \times 60 \text{ min/h} \times 8.00 \text{ h} = 5090 \text{ g} = 5.09 \text{ kg}$$
</div>

**Discussion**

Over 5 kg (about 5 liters) of water is needed for overnight operation. This is a substantial amount and explains why vaporizers have large reservoirs. The 95% efficiency means only 5% of the electrical energy is lost to heating the water rather than vaporizing it. This "cold" vaporization process is valuable for humidifying rooms, especially during winter when indoor air becomes very dry.

(a) The vaporization rate is 10.6 g/min. (b) About 5.09 kg of water is needed for 8 hours of operation.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

(a) What energy is dissipated by a lightning bolt having a 20 000-A current, a
voltage of $$ 1.00 \times 10^{2} \text{MV} $$ , and a length of 1.00 ms? (b)
What mass of tree sap could be raised from $$ 18.0\text{ºC} $$ to its boiling
point and then evaporated by this energy, assuming sap has the same thermal
characteristics as water?

</div>
<div class="solution" markdown="1">
(a)  $$ 2.00 \times 10^{9}  \text{J} $$
(b) 769 kg

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

What current must be produced by a 12.0-V battery-operated bottle warmer in
order to heat 75.0 g of glass, 250 g of baby formula, and $$ 3.00 \times 10^{2}
\text{g} $$ of aluminum from $$ 20.0\text{ºC} $$ to $$ 90.0\text{ºC} $$ in 5.00
min?

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate the total heat needed using $$Q = mc\Delta T$$ for each material (using specific heats: glass ≈ 840 J/kg·°C, water ≈ 4186 J/kg·°C for formula, aluminum ≈ 900 J/kg·°C). Then find the power required and use $$P = IV$$ to find the current.

**Solution**

Calculate the heat needed for each component ($$\Delta T = 70.0$$ °C):

<div class="equation">
$$Q_{\text{glass}} = m_g c_g \Delta T = (0.0750 \text{ kg})(840 \text{ J/kg·°C})(70.0 \text{ °C}) = 4410 \text{ J}$$
</div>

<div class="equation">
$$Q_{\text{formula}} = m_f c_f \Delta T = (0.250 \text{ kg})(4186 \text{ J/kg·°C})(70.0 \text{ °C}) = 73255 \text{ J}$$
</div>

<div class="equation">
$$Q_{\text{aluminum}} = m_{\text{Al}} c_{\text{Al}} \Delta T = (0.300 \text{ kg})(900 \text{ J/kg·°C})(70.0 \text{ °C}) = 18900 \text{ J}$$
</div>

<div class="equation">
$$Q_{\text{total}} = 4410 + 73255 + 18900 = 96565 \text{ J}$$
</div>

Calculate the power needed:

<div class="equation">
$$P = \frac{Q}{t} = \frac{96565 \text{ J}}{5.00 \text{ min} \times 60 \text{ s/min}} = \frac{96565 \text{ J}}{300 \text{ s}} = 322 \text{ W}$$
</div>

Calculate the current:

<div class="equation">
$$I = \frac{P}{V} = \frac{322 \text{ W}}{12.0 \text{ V}} = 26.8 \text{ A}$$
</div>

**Discussion**

A current of 26.8 A is quite high for a 12-V system and would require relatively heavy wiring. Most of the heat goes into the baby formula (about 76%) because of water's high specific heat. This type of bottle warmer would typically be plugged into a car's cigarette lighter socket, though 26.8 A exceeds the typical 15-20 A rating of such sockets. In practice, such warmers often take longer than 5 minutes to reduce current requirements.

The bottle warmer must produce a current of 26.8 A.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

How much time is needed for a surgical cauterizer to raise the temperature of
1.00 g of tissue from $$ 37.0\text{ºC} $$ to $$100 \text{ºC} $$ and then boil
away 0.500 g of water, if it puts out 2.00 mA at 15.0 kV? Ignore heat transfer
to the surroundings.

</div>
<div class="solution" markdown="1">
45.0 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

Hydroelectric generators (see [[Figure 5]](#Figure5)) at Hoover Dam produce a
maximum current of $$ 8.00 \times 10^{3} \text{A} $$ at 250 kV. (a) What is the
power output? (b) The water that powers the generators enters and leaves the
system at low speed (thus its kinetic energy does not change) but loses 160 m in
altitude. How many cubic meters per second are needed, assuming 85.0%
efficiency?

![Hydroelectric generators at the Hoover dam.](../resources/Figure_20_04_05.jpg "Hydroelectric generators at the Hoover dam. (credit: Jon Sullivan)")
{: #Figure5}

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

(a) Assuming 95.0% efficiency for the conversion of electrical power by the
motor, what current must the 12.0-V batteries of a 750-kg electric car be able
to supply: (a) To accelerate from rest to 25.0 m/s in 1.00 min? (b) To climb a
$$ 2.00 \times 10^{2} \text{-m} $$ -high hill in 2.00 min at a constant 25.0-m/s
speed while exerting $$ 5.00 \times 10^{2} \text{N} $$ of force to overcome air
resistance and friction? (c) To travel at a constant 25.0-m/s speed, exerting a
$$ 5.00 \times 10^{2} \text{N} $$ force to overcome air resistance and friction?
See [[Figure 6]](#Figure6).

![Electric car charging in London.](../resources/Figure_20_04_06.jpg "This REVAi, an electric car, gets recharged on a street in London. (credit: Frank Hebbert)")
{: #Figure6}

</div>
<div class="solution" markdown="1">
(a) 343 A

(b)  $$ 2.17 \times 10^{3} \text{A} $$
(c)  $$ 1.10 \times 10^{3} \text{A} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

A light-rail commuter train draws 630 A of 650-V DC electricity when
accelerating. (a) What is its power consumption rate in kilowatts? (b) How long
does it take to reach 20.0 m/s starting from rest if its loaded mass is $$ 5.30
\times 10^{4} \text{kg} $$ , assuming 95.0% efficiency and constant power? (c)
Find its average acceleration. (d) Discuss how the acceleration you found for
the light-rail train compares to what might be typical for an automobile.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

(a) An aluminum power transmission line has a resistance of $$ 0.0580 \Omega
/\text{km} $$ . What is its mass per kilometer? (b) What is the mass per
kilometer of a copper line having the same resistance? A lower resistance would
shorten the heating time. Discuss the practical limits to speeding the heating
by lowering the resistance.

</div>
<div class="solution" markdown="1">
(a)  $$ 1.23 \times 10^{3}  \text{kg} $$
(b)  $$ 2.64 \times 10^{3}  \text{kg} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

(a) An immersion heater utilizing 120 V can raise the temperature of a $$ 1.00
\times 10^{2} \text{-g} $$ aluminum cup containing 350 g of water from $$
20.0\text{ºC} $$ to $$ 95.0\text{ºC} $$ in 2.00 min. Find its resistance,
assuming it is constant during the process. (b) A lower resistance would shorten
the heating time. Discuss the practical limits to speeding the heating by
lowering the resistance.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Integrated Concepts__

(a) What is the cost of heating a hot tub containing 1500 kg of water from
$$

10.0\text{ºC} $$ to $$ 40.0\text{ºC} $$ , assuming 75.0% efficiency to account
for heat transfer to the surroundings? The cost of electricity is $$9
\text{cents/kW}\cdot \text{h} $$ .
(b) What current was used by the 220-V AC electric heater, if this took 4.00 h?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Unreasonable Results__

(a) What current is needed to transmit $$ 1.00 \times 10^{2} \text{MW} $$ of
power at 480 V? (b) What power is dissipated by the transmission lines if they
have a $$ 1.00 \text{-} \Omega $$ resistance? (c) What is unreasonable about
this result? (d) Which assumptions are unreasonable, or which premises are
inconsistent?

</div>
<div class="solution" markdown="1">
(a)  $$ 2.08 \times 10^{5}  \text{A} $$
(b)  $$ 4.33 \times 10^{4}  \text{MW} $$
(c) The transmission lines dissipate more power than they are supposed to transmit.

(d) A voltage of 480 V is unreasonably low for a transmission voltage.
Long-distance transmission lines are kept at much higher voltages (often
hundreds of kilovolts) to reduce power losses.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Unreasonable Results__

(a) What current is needed to transmit $$ 1.00 \times 10^{2} \text{MW} $$ of
power at 10.0 kV? (b) Find the resistance of 1.00 km of wire that would cause a
0.0100% power loss. (c) What is the diameter of a 1.00-km-long copper wire
having this resistance? (d) What is unreasonable about these results? (e) Which
assumptions are unreasonable, or which premises are inconsistent?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
__Construct Your Own Problem__

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
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

electric power
: the rate at which electrical energy is supplied by a source or dissipated by a
device; it is the product of current times voltage

</div>
