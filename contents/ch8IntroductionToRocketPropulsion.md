---
title: Introduction to Rocket Propulsion
layout: page
sectionNumber: 7
chapterNumber: 8
---
:::: abstract

* State Newton’s third law of motion.
* Explain the principle involved in propulsion of rockets and jet engines.
* Derive an expression for the acceleration of the rocket and discuss the factors that affect the acceleration.
* Describe the function of a space shuttle.

::::

Rockets range in size from fireworks so small that ordinary people use them to
immense Saturn Vs that once propelled massive payloads toward the Moon. The
propulsion of all rockets, jet engines, deflating balloons, and even squids and
octopuses is explained by the same physical principle—Newton’s third law of
motion. Matter is forcefully ejected from a system, producing an equal and
opposite reaction on what remains. Another common example is the recoil of a
gun. The gun exerts a force on a bullet to accelerate it and consequently
experiences an equal and opposite force, causing the gun’s recoil or kick.

:::: note {"class":"note","data-label":""}

<div class="title">
Making Connections: Take-Home Experiment—Propulsion of a Balloon
</div>

Hold a balloon and fill it with air. Then, let the balloon go. In which direction does the air come out of the balloon and in which direction does the balloon get propelled? If you fill the balloon with water and then let the balloon go, does the balloon’s direction change? Explain your answer.

::::

[Figure 1](#Figure1) shows a rocket accelerating straight up. In part (a), the
rocket has a mass $$ m $$ and a velocity $$ v $$ relative to Earth, and hence a
momentum $$ mv $$. In part (b), a time $$ \Delta t $$ has elapsed in which the
rocket has ejected a mass $$ \Delta m $$ of hot gas at a velocity $$ v_{\text{e}} $$ relative to the rocket. The remainder of the mass $$ \left( m-\Delta m\right) $$ now has a greater velocity $$ \left(v+\Delta v\right) $$. The momentum of the entire system (rocket plus expelled gas) has actually decreased because the force of gravity has acted for a time $$ \Delta t $$, producing a negative
impulse $$ \Delta p=-mg \Delta t $$. (Remember that impulse is the net external
force on a system multiplied by the time it acts, and it equals the change in
momentum of the system.) So, the center of mass of the system is in free fall
but, by rapidly expelling mass, part of the system can accelerate upward. It is
a commonly held misconception that the rocket exhaust pushes on the ground. If
we consider thrust; that is, the force exerted on the rocket by the exhaust
gases, then a rocket’s thrust is greater in outer space than in the atmosphere
or on the launch pad. In fact, gases are easier to expel into a vacuum.

By calculating the change in momentum for the entire system over $$ \Delta t $$,
and equating this change to the impulse, the following expression can be shown
to be a good approximation for the acceleration of the rocket.

<div class="equation">
 $$ a=\frac{ v_{\text{e}}}{m}\frac{ \Delta m}{\Delta t}-g $$
</div>

“The rocket” is that part of the system remaining after the gas is ejected, and
$$ g $$ is the acceleration due to gravity.

:::: note {"class":"note","data-label":""}

<div class="title">
Acceleration of a Rocket
</div>

Acceleration of a rocket is

<div class="equation">
 $$ a=\frac{ v_{\text{e}}}{m}\frac{ \Delta m}{\Delta t}-g, $$
</div>

where $$ a $$ is the acceleration of the rocket, $$ v_{\text{e}} $$
is the exhaust velocity, $$ m $$ is the mass of the rocket, $$ \Delta m $$
is the mass of the ejected gas, and $$ \Delta t $$ is the time in which the gas is ejected.

::::

![Picture a shows a rocket launched into space. It moves upward with velocity v in time t and the burning of fuel is also shown. After time t plus delta t the mass of fuel decreases by delta m and hence the velocity of the rocket increases to v plus delta v. The free body diagram shows the weight W of the rocket downward, reaction force upward and the resultant velocity upward too.](../resources/Figure_08_07_01.jpg '(a) This rocket has a mass \( m \) and an upward velocity \( v \) . The net external force on the system is \( mg \) pointing down, if air resistance is neglected. (b) A time \( \Delta t \) later the system has two main parts, the ejected gas and the remainder of the rocket. The reaction force on the rocket is what overcomes the gravitational force and accelerates it upward.')
{: #Figure1}

A rocket’s acceleration depends on three major factors, consistent with the
equation for acceleration of a rocket. First, the greater the exhaust velocity
of the gases relative to the rocket, $$ v_{\text{e}} $$, the greater the
acceleration is. For conventional (non-nuclear) chemical rockets, $$ v_{\text{e}} $$ typically ranges from about $$ 2.5\times 10^{3} \ms $$ up to about $$ 4.5\times 10^{3} \ms $$
for the best hydrogen–oxygen engines. The second factor is the rate at which mass is ejected from the rocket.
This is the factor $$ \Delta m/\Delta t $$ in the equation. The quantity $$ \left(\Delta m/\Delta t\right)v_{\text{e}} $$, with units of newtons, is called
\"thrust.” The faster the rocket burns its fuel, the greater its thrust, and the
greater its acceleration. The third factor is the mass $$ m $$ of the rocket.
The smaller the mass is (all other factors being the same), the greater the
acceleration. The rocket mass $$ m $$ decreases dramatically during flight
because most of the rocket is fuel to begin with, so that acceleration increases
continuously, reaching a maximum just before the fuel is exhausted.

:::: note {"class":"note","data-label":""}

<div class="title">
Factors Affecting a Rocket’s Acceleration
</div>

* The greater the exhaust velocity $$ v_{\text{e}} $$ of the gases relative to the rocket, the greater the acceleration.
* The faster the rocket burns its fuel, the greater its acceleration.
* The smaller the rocket’s mass (all other factors being the same), the greater
  the acceleration.

::::

:::: example

<div class="title">
Calculating Acceleration: Initial Acceleration of a Moon Launch
</div>

A Saturn V’s mass at liftoff was $$ 2.80\times 10^{6}\kg $$,
its fuel-burn rate was $$ 1.40\times 10^{4}\text{kg/s} $$, and the exhaust
velocity was $$ 2.40\times 10^{3} \ms $$. Calculate its initial
acceleration.

**Strategy**

This problem is a straightforward application of the expression for acceleration
because $$ a $$ is the unknown and all of the terms on the right side of the
equation are given.

**Solution**

Substituting the given values into the equation for acceleration yields

<div class="equation">
$$ \begin{array}{lll}
a&=& \frac{ v_{\text{e}}}{m}\frac{ \Delta m}{\Delta t}-g\\
a&=&\frac{2.40\times 10^{3} \ms }{2.80\times 10^{6}\kg }\left(1.40\times 10^{4}\text{kg/s}\right)-9.80\mss \\
a&=&2.20\mss .
\end{array} $$
</div>

**Discussion**

This value is fairly small, even for an initial acceleration. The acceleration
does increase steadily as the rocket burns fuel, because $$ m $$ decreases while
$$ v_{\text{e}} $$ and $$ \frac{ \Delta m}{\Delta t} $$ remain constant. Knowing
this acceleration and the mass of the rocket, you can show that the thrust of
the engines was $$ 3.36\times 10^{7}\N $$.

::::

To achieve the high speeds needed to hop continents, obtain orbit, or escape
Earth’s gravity altogether, the mass of the rocket other than fuel must be as
small as possible. It can be shown that, in the absence of air resistance and
neglecting gravity, the final velocity of a one-stage rocket initially at rest
is

<div class="equation">
 $$ v=v_{\text{e}} \ln \frac{ m_{0}}{ m_{\text{r}}}, $$
</div>

where $$ \text{ln}\left(m_{0}/m_{\text{r}}\right) $$ is the natural logarithm of
the ratio of the initial mass of the rocket $$ \left(m_{0}\right) $$ to what is
left $$ \left(m_{\text{r}}\right) $$ after all of the fuel is exhausted. (Note
that $$ v $$ is actually the change in velocity, so the equation can be used for
any segment of the flight. If we start from rest, the change in velocity equals
the final velocity.) For example, let us calculate the mass ratio needed to
escape Earth’s gravity starting from rest, given that the escape velocity from
Earth is about $$ 11.2\times 10^{3} \ms $$, and assuming an exhaust velocity $$ v_{\text{e}}=2.5\times 10^{3} \ms $$.

<div class="equation">
 $$ \ln \frac{ m_{0}}{ m_{\text{r}}}=\frac{v}{ v_{\text{e}}}=\frac{11.2\times 10^{3} \ms }{2.5\times 10^{3} \ms }=4.48 $$
</div>

Solving for $$ m_{0}/m_{\text{r}} $$ gives

<div class="equation">
 $$ \frac{ m_{0}}{ m_{\text{r}}}={e}^{4.48}=88. $$
</div>

Thus, the mass of the rocket is

<div class="equation">
 $$ m_{\text{r}}=\frac{ m_{0}}{88}. $$
</div>

This result means that only $$ 1/88 $$ of the mass is left when the fuel is
burnt, and $$ 87/88 $$ of the initial mass was fuel. Expressed as percentages,
98.9% of the rocket is fuel, while payload, engines, fuel tanks, and other
components make up only 1.14%. Taking air resistance and gravitational force
into account, the mass $$ m_{\text{r}} $$ remaining can only be about $$ m_{0}/180 $$. It is difficult to build a rocket in which the fuel has a mass 180
times everything else. The solution is multistage rockets. Each stage only needs
to achieve part of the final velocity and is discarded after it burns its fuel.
The result is that each successive stage can have smaller engines and more
payload relative to its fuel. Once out of the atmosphere, the ratio of payload
to fuel becomes more favorable, too.

The space shuttle was an attempt at an economical vehicle with some reusable
parts, such as the solid fuel boosters and the craft itself. (
See [Figure 2](#Figure2)) The shuttle’s need to be operated by humans, however,
made it at least as costly for launching satellites as expendable, unmanned
rockets. (Since 2015, some commercial rockets have routinely landed and reused
their first stages, which has substantially lowered launch costs.) Ideally, the shuttle would only have been used when human activities
were required for the success of a mission, such as the repair of the Hubble
space telescope. Rockets with satellites can also be launched from airplanes.
Using airplanes has the double advantage that the initial velocity is
significantly above zero and a rocket can avoid most of the atmosphere’s
resistance.

![The space shuttle is launched. It consists of the shuttle orbiter, two solid rocket boosters, and an expendable external tank. It takes off leaving much smoke and fire.](../resources/Figure_08_07_02.jpg 'The space shuttle had a number of reusable parts. Solid fuel boosters on either side were recovered and refueled after each flight, and the entire orbiter returned to Earth for use in subsequent flights. The large liquid fuel tank was expended. The space shuttle was a complex assemblage of technologies, employing both solid and liquid fuel and pioneering ceramic tiles as reentry heat shields. As a result, it permitted multiple launches as opposed to single-use rockets. (credit: NASA)')
{: #Figure2}

:::: note {"class":"note","data-label":"OpenLyceum Exploration"}

<div class="title">
 Lunar Lander
</div>

Can you avoid the boulder field and land safely, just before your fuel runs out, as Neil Armstrong did in 1969? Our version of this classic video game accurately simulates the real motion of the lunar lander with the correct mass, thrust, fuel consumption rate, and lunar gravity. The real lunar lander is very hard to control.

::: figure {}

<figcaption>
Lunar Lander
</figcaption>
<iframe loading="lazy" src="https://openlyceum.github.io/LunarLander/" width="750" height="500"  allowfullscreen></iframe>

:::

::::

### Section Summary

- Newton’s third law of motion states that to every action, there is an equal
  and opposite reaction.
- Acceleration of a rocket is $$ a=\frac{ v_{\text{e}}}{m}\frac{ \Delta m}{\Delta t}-g $$.
- A rocket’s acceleration depends on three main factors. They are
  1. The greater the exhaust velocity of the gases, the greater the
     acceleration.
  2. The faster the rocket burns its fuel, the greater its acceleration.
  3. The smaller the rocket\'s mass, the greater the acceleration.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">

:::: problem

**Professional Application**

Suppose a fireworks shell explodes, breaking into three large pieces for which
air resistance is negligible. How is the motion of the center of mass affected
by the explosion? How would it be affected if the pieces experienced
significantly more air resistance than the intact shell?

::::

</div>

<div class="exercise" data-element-type="conceptual-questions">

:::: problem

**Professional Application**

During a visit to the International Space Station, an astronaut was positioned
motionless in the center of the station, out of reach of any solid object on
which he could exert a force. Suggest a method by which he could move himself
away from this position, and explain the physics involved.

::::

</div>

<div class="exercise" data-element-type="conceptual-questions">

:::: problem

**Professional Application**

It is possible for the velocity of a rocket to be greater than the exhaust
velocity of the gases it ejects. When that is the case, the gas velocity and gas
momentum are in the same direction as that of the rocket. How is the rocket
still able to obtain thrust by ejecting the gases?

::::

</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Professional Application**

Antiballistic missiles (ABMs) are designed to have very large accelerations so
that they may intercept fast-moving incoming missiles in the short time
available. What is the takeoff acceleration of a 10 000-kg ABM that expels 196
kg of gas per second at an exhaust velocity of $$ 2.50\times 10^{3} \ms $$ ?

::::

:::: solution

**Strategy**

Use the rocket acceleration equation $$ a = \frac{v_{\text{e}}}{m}\frac{\Delta m}{\Delta t} - g $$. We're given the initial mass, exhaust velocity, and mass expulsion rate. The acceleration due to gravity acts downward, opposing the upward acceleration.

**Solution**

Given:

- Mass: $$ m = 10\,000 \kg $$
- Mass expulsion rate: $$ \frac{\Delta m}{\Delta t} = 196 \text{ kg/s} $$
- Exhaust velocity: $$ v_{\text{e}} = 2.50 \times 10^{3} \ms $$
- Gravitational acceleration: $$ g = 9.80 \mss $$

Apply the rocket acceleration equation:

$$ a = \frac{v_{\text{e}}}{m}\frac{\Delta m}{\Delta t} - g $$

$$ a = \frac{2.50 \times 10^{3} \ms}{10\,000 \kg}(196 \text{ kg/s}) - 9.80 \mss $$

$$ a = 49.0 \mss - 9.80 \mss = 39.2 \mss $$

The takeoff acceleration of the ABM is $$ 39.2 \mss $$ (approximately 4.0g).

**Discussion**

This acceleration is about 4 times the acceleration due to gravity, meaning the thrust force is about 5 times the rocket's weight. This high acceleration is essential for intercepting incoming missiles, which travel at high speeds. The ABM must reach the target in seconds, requiring rapid acceleration from rest.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Professional Application**

What is the acceleration of a 5000-kg rocket taking off from the Moon, where the
acceleration due to gravity is only $$ 1.6\mss $$, if the rocket expels 8.00 kg
of gas per second at an exhaust velocity of $$ 2.20\times 10^{3}\ms $$ ?

::::

:::: solution

**Strategy**

Use the rocket acceleration equation with the Moon's gravitational acceleration instead of Earth's. The lower gravity on the Moon means rockets can achieve higher net acceleration with the same thrust.

**Solution**

Given:

- Mass: $$ m = 5000 \kg $$
- Mass expulsion rate: $$ \frac{\Delta m}{\Delta t} = 8.00 \text{ kg/s} $$
- Exhaust velocity: $$ v_{\text{e}} = 2.20 \times 10^{3} \ms $$
- Lunar gravitational acceleration: $$ g_{\text{Moon}} = 1.6 \mss $$

Apply the rocket acceleration equation:

$$ a = \frac{v_{\text{e}}}{m}\frac{\Delta m}{\Delta t} - g $$

$$ a = \frac{2.20 \times 10^{3} \ms}{5000 \kg}(8.00 \text{ kg/s}) - 1.6 \mss $$

$$ a = 3.52 \mss - 1.6 \mss = 1.92 \mss $$

The acceleration of the rocket taking off from the Moon is $$ 1.92 \mss $$ (approximately 1.2 times lunar gravity, or about 0.2g on Earth).

**Discussion**

On Earth with $$ g = 9.80 \mss $$, this rocket would have a negative acceleration (it couldn't lift off). The Moon's weaker gravity (about 1/6 of Earth's) allows rockets with much smaller engines or fuel consumption rates to launch successfully. This is one reason why returning from the Moon required much less fuel than launching from Earth.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Professional Application**

Calculate the increase in velocity of a 4000-kg space probe that expels 3500 kg
of its mass at an exhaust velocity of $$ 2.00\times 10^{3} \ms $$. You may
assume the gravitational force is negligible at the probe's location.

::::

:::: solution

**Strategy**

Since gravity is negligible, we use the rocket velocity equation $$ v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$, where $$ m_0 $$ is the initial mass and $$ m_{\text{r}} $$ is the remaining mass after fuel is expended. This equation comes from integrating the rocket equation with no external forces.

**Solution**

Given:

- Initial mass: $$ m_0 = 4000 \kg $$
- Mass expelled: $$ \Delta m = 3500 \kg $$
- Remaining mass: $$ m_{\text{r}} = m_0 - \Delta m = 4000 \kg - 3500 \kg = 500 \kg $$
- Exhaust velocity: $$ v_{\text{e}} = 2.00 \times 10^{3} \ms $$

Apply the rocket velocity equation:

$$ v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$

$$ v = (2.00 \times 10^{3} \ms) \ln\left(\frac{4000 \kg}{500 \kg}\right) $$

$$ v = (2.00 \times 10^{3} \ms) \ln(8) $$

$$ v = (2.00 \times 10^{3} \ms)(2.079) = 4.16 \times 10^{3} \ms $$

The increase in velocity of the space probe is $$ 4.16 \times 10^{3} \ms $$ (about 4.2 km/s).

**Discussion**

The probe expels 87.5% of its total mass as propellant to achieve this velocity increase. This illustrates why space travel is so challenging—most of a spacecraft's initial mass must be fuel. The mass ratio of 8:1 (initial to final) is significant but achievable with chemical rockets. The final velocity is about twice the exhaust velocity, which demonstrates the power of the logarithmic relationship.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Professional Application**

Ion-propulsion rockets have been proposed for use in space. They employ atomic
ionization techniques and nuclear energy sources to produce extremely high
exhaust velocities, perhaps as great as $$ 8.00\times 10^{6} \ms $$. These
techniques allow a much more favorable payload-to-fuel ratio. To illustrate this
fact:
(a) Calculate the increase in velocity of a 20 000-kg space probe that expels
only 40.0-kg of its mass at the given exhaust velocity.
(b) These engines are usually designed to produce a very small thrust for a very
long time—the type of engine that might be useful on a trip to the outer
planets, for example. Calculate the acceleration of such an engine if it expels
$$ 4.50\times 10^{-6}\text{kg/s} $$ at the given velocity, assuming the
acceleration due to gravity is negligible.

::::

:::: solution

**Strategy**

For part (a), use the rocket velocity equation. For part (b), use the rocket acceleration equation with gravity negligible. Ion propulsion achieves extremely high exhaust velocities, enabling significant velocity changes with minimal fuel mass.

**Solution**

**(a)** Given:

- Initial mass: $$ m_0 = 20\,000 \kg $$
- Mass expelled: $$ \Delta m = 40.0 \kg $$
- Remaining mass: $$ m_{\text{r}} = 20\,000 \kg - 40 \kg = 19\,960 \kg $$
- Exhaust velocity: $$ v_{\text{e}} = 8.00 \times 10^{6} \ms $$

Apply the rocket velocity equation:

$$ \Delta v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$

$$ \Delta v = (8.00 \times 10^{6} \ms) \ln\left(\frac{20\,000 \kg}{19\,960 \kg}\right) $$

$$ \Delta v = (8.00 \times 10^{6} \ms) \ln(1.002) = (8.00 \times 10^{6} \ms)(0.002) = 1.60 \times 10^{4} \ms $$

The velocity increase is $$ 1.60 \times 10^{4} \ms $$ (16 km/s) from expelling only 40 kg of propellant.

**(b)** Given:

- Mass expulsion rate: $$ \frac{\Delta m}{\Delta t} = 4.50 \times 10^{-6} \text{ kg/s} $$
- Exhaust velocity: $$ v_{\text{e}} = 8.00 \times 10^{6} \ms $$
- Mass: $$ m \approx 20\,000 \kg $$ (approximately constant at this rate)

With negligible gravity, the rocket acceleration equation becomes:

$$ a = \frac{v_{\text{e}}}{m}\frac{\Delta m}{\Delta t} $$

$$ a = \frac{8.00 \times 10^{6} \ms}{20\,000 \kg}(4.50 \times 10^{-6} \text{ kg/s}) = (400 \text{ m/(kg}\cdot\text{s)})(4.50 \times 10^{-6} \text{ kg/s}) = 1.80 \times 10^{-3} \mss $$

The acceleration is $$ 1.80 \times 10^{-3} \mss $$ (about 1.80 mm/s²).

**Discussion**

The power of ion propulsion is evident: ejecting only 0.2% of the spacecraft's mass provides a 16 km/s velocity change—more than enough to escape Earth's gravity (11.2 km/s). With a chemical exhaust speed of about 2.00 km/s, the ideal rocket equation gives $$ m_f/m_i = e^{-\Delta v/v_e} = e^{-8} $$, so about 99.966% of the initial mass would have to be propellant. The tradeoff is the tiny acceleration (1.80 mm/s²): expelling the 40.0 kg of propellant at $$ 4.50 \times 10^{-6} $$ kg/s takes $$ 8.9 \times 10^{6} $$ s, about 103 days of continuous operation. Ion engines are ideal for deep space missions where time is less critical than fuel efficiency.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

Derive the equation for the vertical acceleration of a rocket.

::::

:::: solution

**Strategy**

To derive the rocket acceleration equation, we analyze the forces on the ejected gas and apply Newton's third law to find the thrust force on the rocket. Then we apply Newton's second law to the rocket, accounting for both the thrust force (upward) and gravitational force (downward).

**Solution**

Consider a small mass $$ \Delta m $$ of gas ejected in a small time interval $$ \Delta t $$. The force needed to give this mass an acceleration $$ a_{\Delta m} $$ is:

$$ F = \Delta m a_{\Delta m} $$

To accelerate this mass to the exhaust velocity $$ v_{\text{e}} $$ in time $$ \Delta t $$ requires:

$$ v_{\text{e}} = a_{\Delta m} \Delta t $$

Therefore:

$$ a_{\Delta m} = \frac{v_{\text{e}}}{\Delta t} $$

Substituting this into the force equation:

$$ F = \Delta m \cdot \frac{v_{\text{e}}}{\Delta t} = v_{\text{e}} \frac{\Delta m}{\Delta t} $$

By Newton's third law, this force is equal in magnitude to the thrust force acting on the rocket:

$$ F_{\text{thrust}} = v_{\text{e}} \frac{\Delta m}{\Delta t} $$

where all quantities are positive. Now applying Newton's second law to the rocket of mass $$ m $$, we must account for both the upward thrust force and the downward gravitational force $$ mg $$:

$$ F_{\text{thrust}} - mg = ma $$

Substituting the expression for thrust:

$$ v_{\text{e}} \frac{\Delta m}{\Delta t} - mg = ma $$

Solving for the acceleration:

$$ a = \frac{v_{\text{e}}}{m} \frac{\Delta m}{\Delta t} - g $$

This is the equation for the vertical acceleration of a rocket, where $$ m $$ is the mass of the rocket and unburnt fuel.

**Discussion**

This equation shows that rocket acceleration depends on three factors: (1) the exhaust velocity $$ v_{\text{e}} $$, (2) the rate of mass ejection $$ \Delta m / \Delta t $$, and (3) the rocket's current mass $$ m $$, minus the constant gravitational acceleration $$ g $$. As fuel burns, $$ m $$ decreases, causing the acceleration to increase even if the thrust remains constant. The negative $$ g $$ term shows that gravity opposes the rocket's acceleration; in deep space where $$ g \approx 0 $$, the rocket would achieve higher acceleration with the same thrust.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Professional Application**

(a) Calculate the maximum rate at which a rocket can expel gases if its
acceleration cannot exceed seven times that of gravity. The mass of the rocket
just as it runs out of fuel is 75 000-kg, and its exhaust velocity is $$ 2.40\times 10^{3} \ms $$. Assume that the acceleration of gravity is the same as
on Earth's surface $$ \left( 9.80\mss \right) $$.
(b) Why might it be necessary to limit the acceleration of a rocket?

::::

:::: solution

**Strategy**

For part (a), use the rocket acceleration equation and solve for the mass expulsion rate, setting the acceleration to 7g (seven times gravitational acceleration). For part (b), consider the physical and physiological limitations that would necessitate limiting acceleration.

**Solution**

**(a)** Given:

- Maximum acceleration: $$ a_{\max} = 7g = 7(9.80 \mss) = 68.6 \mss $$
- Mass at fuel exhaustion: $$ m = 75\,000 \kg $$
- Exhaust velocity: $$ v_{\text{e}} = 2.40 \times 10^{3} \ms $$
- Gravitational acceleration: $$ g = 9.80 \mss $$

From the rocket acceleration equation:

$$ a = \frac{v_{\text{e}}}{m}\frac{\Delta m}{\Delta t} - g $$

Solve for mass expulsion rate:

$$ a + g = \frac{v_{\text{e}}}{m}\frac{\Delta m}{\Delta t} $$

$$ \frac{\Delta m}{\Delta t} = \frac{m(a + g)}{v_{\text{e}}} $$

The maximum acceleration occurs when mass is minimum (just as fuel runs out):

$$ \frac{\Delta m}{\Delta t} = \frac{(75\,000 \kg)(68.6 + 9.80) \mss}{2.40 \times 10^{3} \ms} = \frac{(75\,000 \kg)(78.4 \mss)}{2.40 \times 10^{3} \ms} = 2.45 \times 10^{3} \text{ kg/s} $$

The maximum mass expulsion rate is $$ 2.45 \times 10^{3} \text{ kg/s} $$ (about 2450 kg/s).

**(b)** Limiting acceleration is necessary because:

1. **Structural integrity**: High accelerations create enormous forces on the rocket structure. At an upward acceleration of 7g near Earth's surface, each component must be supported by a force $$ m(a + g) = 8mg $$, eight times its weight.

2. **Payload protection**: Satellites, scientific instruments, and especially human passengers can be damaged by excessive g-forces. Humans can tolerate about 6-8g briefly, but sustained high g-forces cause blackouts and physical harm.

3. **Fuel efficiency**: Burning fuel too rapidly can be less efficient due to incomplete combustion and heating effects.

4. **Control**: Very high accelerations make course corrections more difficult and can cause trajectory errors.

**Discussion**

At an upward acceleration of 7g (68.6 m/s²) in Earth-strength gravity, the seat must push up on an astronaut with $$ N = m(a + g) = 8mg $$. A 70-kg person requires $$ (70 \kg)(68.6 + 9.80) \mss = 5488 \N $$ of support, eight times their ordinary weight, so they would feel as if they weighed 8 times their normal weight. This is near the limit of human endurance for brief periods.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

Given the following data for a fire extinguisher-toy wagon rocket experiment, calculate the average exhaust velocity of the gases expelled from the extinguisher. Starting from rest, the final velocity is 10.0 m/s. The total mass is initially 75.0 kg and is 70.0 kg after the extinguisher is fired.

::::

:::: solution

**Strategy**

Use the rocket velocity equation $$ v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$ and solve for the exhaust velocity. We assume the experiment occurs horizontally on a frictionless surface, so gravity does not affect the horizontal motion.

**Solution**

Given:

- Initial mass: $$ m_0 = 75.0 \kg $$
- Final mass: $$ m_{\text{r}} = 70.0 \kg $$
- Final velocity: $$ v = 10.0 \ms $$

The rocket velocity equation is:

$$ v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$

Solve for exhaust velocity:

$$ v_{\text{e}} = \frac{v}{\ln\left(\frac{m_0}{m_{\text{r}}}\right)} $$

$$ v_{\text{e}} = \frac{10.0 \ms}{\ln\left(\frac{75.0 \kg}{70.0 \kg}\right)} $$

$$ v_{\text{e}} = \frac{10.0 \ms}{\ln(1.0714)} $$

$$ v_{\text{e}} = \frac{10.0 \ms}{0.0690} = 145 \ms $$

The average exhaust velocity of the gases is approximately $$ 145 \ms $$ (about 522 km/h or 324 mph).

**Discussion**

This exhaust velocity is reasonable for compressed gas expelled from a fire extinguisher. It's much lower than chemical rocket exhaust (2000-4500 m/s) because the gas is simply expanding from pressure rather than undergoing chemical combustion. The mass expelled was only 5.0 kg (6.7% of total mass), yet it was enough to accelerate the 70-kg wagon to 10 m/s—a practical demonstration of rocket propulsion principles.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

How much of a single-stage rocket that is 100 000 kg can be anything but fuel if the rocket is to have a final speed of
$$ 8.00\text{km/s} $$, given that it expels gases at an exhaust velocity of $$ 2.20\times 10^{3} \ms $$ ?

::::

:::: solution

**Strategy**

Use the rocket velocity equation and solve for the remaining mass $$ m_{\text{r}} $$. With gravity negligible (in space), the final velocity equals the velocity change.

**Solution**

Given:

- Initial mass: $$ m_0 = 100\,000 \kg $$
- Final velocity: $$ v = 8.00 \text{ km/s} = 8.00 \times 10^{3} \ms $$
- Exhaust velocity: $$ v_{\text{e}} = 2.20 \times 10^{3} \ms $$

The rocket velocity equation:

$$ v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$

Solve for the mass ratio:

$$ \ln\left(\frac{m_0}{m_{\text{r}}}\right) = \frac{v}{v_{\text{e}}} = \frac{8.00 \times 10^{3} \ms}{2.20 \times 10^{3} \ms} = 3.636 $$

$$ \frac{m_0}{m_{\text{r}}} = e^{3.636} = 37.9 $$

$$ m_{\text{r}} = \frac{m_0}{37.9} = \frac{100\,000 \kg}{37.9} = 2.63 \times 10^{3} \kg $$

The mass that can be anything but fuel is $$ 2.63 \times 10^{3} \kg $$ (2630 kg), which is only 2.63% of the total rocket mass.

**Discussion**

This result shows that 97.4% of the rocket must be fuel to achieve orbital velocity (8 km/s is approximately orbital speed). Only 2.6% can be structure, engines, and payload combined—an enormous engineering challenge that explains why rockets are so expensive and complex. This is why multi-stage rockets were developed: each stage can have better mass ratios than a single-stage design.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Professional Application**

(a) A 5.00-kg squid initially at rest ejects 0.250-kg of fluid with a velocity
of 10.0 m/s. What is the recoil velocity of the squid if the ejection is done in
0.100 s and there is a 5.00-N frictional force opposing the squid’s movement.
(b) How much energy is lost to work done against friction?

::::

:::: solution

**Strategy**

Take the lab frame in which the squid is initially at rest. The ejected fluid leaves at $$ 10.0 \ms $$ in the direction opposite the squid’s recoil (that is, $$ v_{\text{fluid}}=-10.0 \ms $$ if recoil is positive). After ejection the squid’s mass is $$ m_{\text{f}}=5.00 \kg-0.250 \kg=4.75 \kg $$. Use momentum conservation for the ejection, then subtract the external impulse from friction over $$ \Delta t=0.100 \s $$. For part (b), estimate friction work from the distance traveled during ejection, assuming roughly constant acceleration so the average speed is half the final recoil speed.

**Solution**

**(a)** Momentum imparted by ejecting $$ 0.250 \kg $$ at $$ 10.0 \ms $$ relative to the initial rest frame:

$$ p_{\text{eject}} = m_{\text{fluid}} v_{\text{fluid}} = (0.250 \kg)(10.0 \ms) = 2.50 \kg \cdot \ms $$

(opposite to the fluid’s velocity, so the squid gains $$ +2.50 \kg \cdot \ms $$ if recoil is taken as the positive direction).

Friction delivers an impulse opposing motion:

$$ J_{\text{friction}} = F_{\text{friction}} \Delta t = (5.00 \N)(0.100 \s) = 0.500 \N \cdot \s $$

Net forward momentum of the squid immediately after ejection:

$$ p_{\text{squid}} = 2.50 \kg \cdot \ms - 0.500 \N \cdot \s = 2.00 \kg \cdot \ms $$

Final recoil speed (mass after ejection):

$$ v = \frac{p_{\text{squid}}}{m_{\text{f}}} = \frac{2.00 \kg \cdot \ms}{4.75 \kg} = 0.421 \ms $$

The squid recoils at approximately $$ 0.42 \ms $$ away from the ejected fluid.

**(b)** Distance traveled during ejection (constant-acceleration estimate, $$ v_{\text{avg}} \approx v/2 $$):

$$ d \approx \left(\frac{v}{2}\right) \Delta t = \left(\frac{0.421 \ms}{2}\right)(0.100 \s) = 0.0211 \m $$

Work done against friction:

$$ W \approx F_{\text{friction}} d = (5.00 \N)(0.0211 \m) = 0.105 \J $$

Approximately $$ 0.11 \J $$ of energy is lost to work done against friction (the exact value depends on how speed varies during the 0.100 s ejection).

**Discussion**

The squid demonstrates natural jet propulsion. Using the final mass $$ 4.75 \kg $$ consistently and specifying that $$ 10.0 \ms $$ is the fluid speed in the initial rest frame avoids mixing initial, final, and average masses. Even with a 5.00-N frictional force, the recoil remains appreciable. A full treatment with exhaust speed relative to the squid would require the variable-mass rocket equation and the ejection history; friction work likewise needs an explicit speed-versus-time model beyond this simple impulse estimate.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Unreasonable Results**

Squids have been reported to jump from the ocean and travel $$ 30.0\m $$
(measured horizontally) before re-entering the water.
(a) Calculate the initial speed of the squid if it leaves the water at an angle
of $$ 20.0^\circ $$, assuming negligible lift from the air and negligible air
resistance.
(b) The squid propels itself by squirting water. What fraction of its mass would
it have to eject in order to achieve the speed found in the previous part? The
water is ejected at $$ 12.0 \ms $$; gravitational force and friction are
neglected.
(c) What is unreasonable about the results?
(d) Which premise is unreasonable, or which premises are inconsistent?

::::

:::: solution

**Strategy**

For part (a), use projectile motion equations to find the launch speed from the given range and angle. For part (b), use the rocket velocity equation to determine what fraction of mass must be ejected. For parts (c) and (d), analyze the physical reasonableness of the results and identify problematic assumptions.

**Solution**

**(a)** The projectile range formula for launch and landing at the same height is:

$$ R = \frac{v_0^2 \sin(2\theta)}{g} $$

Solving for initial speed:

$$ v_0 = \sqrt{\frac{Rg}{\sin(2\theta)}} = \sqrt{\frac{(30.0 \m)(9.80 \mss)}{\sin(40.0^\circ)}} = \sqrt{\frac{294 \mmss}{0.643}} = \sqrt{457 \mmss} = 21.4 \ms $$

The squid would need an initial speed of approximately $$ 21.4 \ms $$ (about 77 km/h or 48 mph).

**(b)** Using the rocket velocity equation with negligible gravity and friction:

$$ v = v_{\text{e}} \ln\left(\frac{m_0}{m_{\text{r}}}\right) $$

With $$ v = 21.4 \ms $$ and $$ v_{\text{e}} = 12.0 \ms $$:

$$ \ln\left(\frac{m_0}{m_{\text{r}}}\right) = \frac{21.4 \ms}{12.0 \ms} = 1.78 $$

$$ \frac{m_0}{m_{\text{r}}} = e^{1.78} = 5.93 $$

Fraction ejected:

$$ \frac{m_{\text{ejected}}}{m_0} = 1 - \frac{m_{\text{r}}}{m_0} = 1 - \frac{1}{5.93} = 0.831 $$

The squid would need to eject $$ 83.1\% $$ of its body mass to achieve this velocity.

**(c)** The unreasonable result is that a squid would need to eject 83% of its body mass. Squids typically can only eject about 10-20% of their body mass as water from their mantle cavity. Additionally, $$ 21.4 \ms $$ (77 km/h) is an extremely high speed for any marine animal to achieve through jet propulsion.

**(d)** The model's premises, not necessarily the observation, are what fail:

1. The assumption of **negligible lift** is the most questionable. Researchers who filmed flying squid report that the animals spread their fins and arms to generate aerodynamic lift and glide, which can greatly extend the range beyond that of a ballistic projectile.

2. The model assumes a **single expulsion** of water before leaving the surface. The same researchers report that squid continue jetting water after they are airborne, so they are not simple projectiles after launch.

3. Air resistance is neglected; it would shorten a purely ballistic flight, but it is the same air that provides lift to a gliding squid.

4. The $$ 20^\circ $$ launch angle and $$ 12.0 \ms $$ exhaust speed are additional idealizations whose values affect the numbers but do not fix the basic problem.

Because the supplied model omits lift and continued propulsion, the calculation cannot be used to reject the reported 30 m observation; it shows instead that a ballistic, single-jet model cannot explain such a flight. See the [primary research team's account](https://www.global.hokudai.ac.jp/blog/squid-can-fly-flight-behavior-of-the-squid-explained-for-the-first-time/) of squid flight.

**Discussion**

This is a classic "unreasonable results" problem that teaches students to critically evaluate whether calculated answers make physical sense. Here the calculated 83% mass fraction follows correctly from the ideal assumptions, so the unreasonable result signals that those assumptions, especially negligible lift, do not describe the squid's flight.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Construct Your Own Problem**

Consider an astronaut in deep space cut free from her space ship and needing to
get back to it. The astronaut has a few packages that she can throw away to move
herself toward the ship. Construct a problem in which you calculate the time it
takes her to get back by throwing all the packages at one time compared to
throwing them one at a time. Among the things to be considered are the masses
involved, the force she can exert on the packages through some distance, and the
distance to the ship.

::::

:::: solution

**Strategy**

This problem requires applying conservation of momentum and the rocket equation to compare two strategies: throwing all packages simultaneously versus throwing them sequentially. Use realistic values for astronaut mass, package masses, throwing speed, and distance to the spacecraft.

**Solution**

**Sample Problem Construction:**

An 80-kg astronaut (in a space suit) is floating 15 m from her spacecraft with zero initial velocity. She carries three 5.0-kg packages (total system mass $$ 95 \kg $$ initially). Take **toward the ship** as the $$ +x $$ direction. Each throw gives the package a speed of **8.0 m/s relative to the astronaut immediately after the throw**, in the $$ -x $$ direction (away from the ship). Conserve momentum for the astronaut **plus any packages she still holds** at each step. Treat each throw as instantaneous, so that no time or distance is used up during the throws, and the travel time is simply 15 m divided by her final speed.

*Modeling choice:* the problem statement mentions the force she can exert through some distance. If she pushed each package with the same force $$ F $$ through the same arm stroke $$ s $$, the work $$ Fs $$ would be shared between her and the package, so the relative launch speed would depend on the package mass: a 15-kg bundle would leave more slowly than a 5-kg package. Here we instead choose the simpler constraint of **equal relative launch speed** (8.0 m/s) for every throw. That is a different, explicitly stated assumption; a more complete construction would specify $$ F $$ and $$ s $$ and find each launch speed from the work-energy theorem.

**(a)** If she throws all three packages (bundled as 15 kg) at once, what speed toward the ship does she acquire?

Let $$ v $$ be her speed after the throw and $$ v_{\text{p}} $$ the package speed in the lab frame. Relative speed gives $$ v_{\text{p}} = v - 8.0 \ms $$ (package at $$ -8.0 \ms $$ relative to her). With everything initially at rest,

$$ 0 = (80 \kg) v + (15 \kg)(v - 8.0 \ms) = (95 \kg) v - (15 \kg)(8.0 \ms) $$

$$ v = \frac{(15 \kg)(8.0 \ms)}{95 \kg} = 1.26 \ms $$

Time to reach the ship at constant speed:

$$ t = \frac{d}{v} = \frac{15 \m}{1.26 \ms} = 11.9 \s $$

**(b)** If she throws the packages one at a time, apply the same relative-speed rule before each throw (masses 95, 90, and 85 kg):

First throw ($$ 5.0 \kg $$ from $$ 95 \kg $$ at rest):

$$ 0 = (90 \kg) v_1 + (5.0 \kg)(v_1 - 8.0 \ms) \quad \Rightarrow \quad v_1 = \frac{(5.0 \kg)(8.0 \ms)}{95 \kg} $$

Second throw ($$ 90 \kg $$ moving at $$ v_1 $$):

$$ (90 \kg) v_1 = (85 \kg) v_2 + (5.0 \kg)(v_2 - 8.0 \ms) \quad \Rightarrow \quad v_2 = v_1 + \frac{(5.0 \kg)(8.0 \ms)}{90 \kg} $$

Third throw ($$ 85 \kg $$ moving at $$ v_2 $$):

$$ v_3 = v_2 + \frac{(5.0 \kg)(8.0 \ms)}{85 \kg} = (8.0 \ms)\left(\frac{5.0 \kg}{95 \kg}+\frac{5.0 \kg}{90 \kg}+\frac{5.0 \kg}{85 \kg}\right) = 1.34 \ms $$

Time to reach the ship:

$$ t = \frac{15 \m}{1.34 \ms} = 11.2 \s $$

**Discussion**

Throwing packages one at a time is more efficient, similar to multi-stage rockets: sequential release gives $$ 1.34 \ms $$ versus $$ 1.26 \ms $$ for a simultaneous throw, so the return time drops from 11.9 s to 11.2 s for this 15 m gap. The key is to include the mass of packages still on the astronaut (95, 90, 85, then 80 kg) and to use one consistent relative-speed convention. Students should construct similar problems varying the number of packages, their masses, the throwing speed, and the distance to explore how these factors affect the two strategies.

::::

</div>

<div class="exercise" data-element-type="problems-exercises">

:::: problem

**Construct Your Own Problem**

Consider an artillery projectile striking armor plating. Construct a problem in
which you find the force exerted by the projectile on the plate. Among the
things to be considered are the mass and speed of the projectile and the
distance over which its speed is reduced. Your instructor may also wish for you
to consider the relative merits of depleted uranium versus lead projectiles
based on the greater density of uranium.

::::

:::: solution

**Strategy**

This problem involves applying the impulse-momentum theorem and the work-energy theorem to calculate the force exerted during impact. Consider realistic values for projectile mass, velocity, armor penetration depth, and material properties. Compare depleted uranium (density $$ 19.1 \text{ g/cm}^3 $$) to lead (density $$ 11.3 \text{ g/cm}^3 $$) projectiles.

**Solution**

**Sample Problem Construction:**

A tank fires an armor-piercing projectile at an enemy tank. Compare two scenarios:
(a) A depleted uranium projectile
(b) A lead projectile of the same dimensions

Both projectiles are cylindrical with diameter 30 mm and length 150 mm, fired at 1500 m/s. The armor plate is 60 mm thick steel that brings the projectile to rest.

**(a) Depleted Uranium Projectile:**

Calculate mass (density = $$ 19\,100 \text{ kg/m}^3 $$):

$$ V = \pi r^2 h = \pi (0.015 \m)^2(0.150 \m) = 1.06 \times 10^{-4} \text{ m}^3 $$

$$ m = \rho V = (19\,100 \text{kg/m}^3)(1.06 \times 10^{-4} \text{m}^3) = 2.02 \kg $$

Using the work-energy theorem, where the projectile penetrates distance $$ d = 0.060 \m $$:

$$ F \cdot d = \frac{1}{2}mv^{2} $$

$$ F = \frac{mv^{2}}{2d} = \frac{(2.02 \kg)(1500 \ms)^2}{2(0.060 \m)} = 3.79 \times 10^{7} \N $$

Average force: $$ 37.9 \text{ MN} $$ (about 3860 tons-force)

**(b) Lead Projectile:**

Mass (density = $$ 11\,300 \text{ kg/m}^3 $$):

$$ m = (11\,300 \text{kg/m}^3)(1.06 \times 10^{-4} \text{m}^3) = 1.20 \kg $$

Average force:

$$ F = \frac{(1.20 \kg)(1500 \ms)^2}{2(0.060 \m)} = 2.25 \times 10^{7} \N $$

Average force: $$ 22.5 \text{ MN} $$ (about 2290 tons-force)

**Discussion**

The depleted uranium projectile exerts 68% more force than the lead projectile due to its higher density and mass. Additionally, depleted uranium's higher hardness (stronger than steel) means it deforms less during impact, maintaining its shape better for penetration. Lead, being softer, would deform and flatten more, reducing penetration effectiveness. This is why depleted uranium is preferred for armor-piercing ammunition despite being more expensive. Students should construct problems varying the projectile dimensions, velocity, armor thickness, and materials to understand the factors affecting armor penetration. They might also consider the momentum and impulse during impact, or calculate the deceleration forces experienced.

::::

</div>
