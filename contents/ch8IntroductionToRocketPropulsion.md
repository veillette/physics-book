---
title: Introduction to Rocket Propulsion
layout: page
sectionNumber: 7
chapterNumber: 8
---

<div class="abstract" markdown="1">
* State Newton’s third law of motion.
* Explain the principle involved in propulsion of rockets and jet engines.
* Derive an expression for the acceleration of the rocket and discuss the factors that affect the acceleration.
* Describe the function of a space shuttle.

</div>

Rockets range in size from fireworks so small that ordinary people use them to
immense Saturn Vs that once propelled massive payloads toward the Moon. The
propulsion of all rockets, jet engines, deflating balloons, and even squids and
octopuses is explained by the same physical principle—Newton’s third law of
motion. Matter is forcefully ejected from a system, producing an equal and
opposite reaction on what remains. Another common example is the recoil of a
gun. The gun exerts a force on a bullet to accelerate it and consequently
experiences an equal and opposite force, causing the gun’s recoil or kick.

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment—Propulsion of a Balloon
</div>
Hold a balloon and fill it with air. Then, let the balloon go. In which direction does the air come out of the balloon and in which direction does the balloon get propelled? If you fill the balloon with water and then let the balloon go, does the balloon’s direction change? Explain your answer.

</div>

[Figure 1](#Figure1) shows a rocket accelerating straight up. In part (a), the
rocket has a mass $$ m $$ and a velocity $$ v $$ relative to Earth, and hence a
momentum $$ mgh $$. In part (b), a time $$ \Delta t $$ has elapsed in which the
rocket has ejected a mass $$ \Delta m $$ of hot gas at a velocity $$ v_
{\text{e}} $$ relative to the rocket. The remainder of the mass $$ \left(
m-\Delta m\right)
$$ now has a greater velocity $$ \left(v+\Delta v\right) $$. The momentum of the
entire system (rocket plus expelled gas) has actually decreased because the
force of gravity has acted for a time $$ \Delta t $$, producing a negative
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

<div class="note" data-label="" markdown="1">
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

</div>

![Picture a shows a rocket launched into space. It moves upward with velocity v in time t and the burning of fuel is also shown. After time t plus delta t the mass of fuel decreases by delta m and hence the velocity of the rocket increases to v plus delta v. The free body diagram shows the weight W of the rocket downward, reaction force upward and the resultant velocity upward too.](../resources/Figure_08_07_01.jpg "(a) This rocket has a mass \( m \) and an upward velocity \( v \) . The net external force on the system is \( mg \) pointing down, if air resistance is neglected. (b) A time \( \Delta t) later the system has two main parts, the ejected gas and the remainder of the rocket. The reaction force on the rocket is what overcomes the gravitational force and accelerates it upward.")
{: #Figure1}

A rocket’s acceleration depends on three major factors, consistent with the
equation for acceleration of a rocket. First, the greater the exhaust velocity
of the gases relative to the rocket, $$ v_{\text{e}} $$, the greater the
acceleration is. The practical limit for $$ v_{\text{e}} $$ is about $$
2.5\times 10^{3} \ms $$ for conventional (non-nuclear) hot-gas propulsion
systems. The second factor is the rate at which mass is ejected from the rocket.
This is the factor $$ \Delta m/\Delta t $$ in the equation. The quantity $$
\left(\Delta m/\Delta t\right)v_{\text{e}} $$, with units of newtons, is called
\"thrust.” The faster the rocket burns its fuel, the greater its thrust, and the
greater its acceleration. The third factor is the mass $$ m $$ of the rocket.
The smaller the mass is (all other factors being the same), the greater the
acceleration. The rocket mass $$ m $$ decreases dramatically during flight
because most of the rocket is fuel to begin with, so that acceleration increases
continuously, reaching a maximum just before the fuel is exhausted.

<div class="note" data-label="" markdown="1">
<div class="title">
Factors Affecting a Rocket’s Acceleration
</div>
* The greater the exhaust velocity $$ v_{\text{e}} $$ of the gases relative to the rocket, the greater the acceleration.
* The faster the rocket burns its fuel, the greater its acceleration.
* The smaller the rocket’s mass (all other factors being the same), the greater
  the acceleration.

</div>

<div class="example" markdown="1">
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

</div>

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
Earth is about $$ 11.2\times 10^{3} \ms $$, and assuming an exhaust velocity $$
v_{\text{e}}=2.5\times 10^{3} \ms $$.

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
components make up only 1.10%. Taking air resistance and gravitational force
into account, the mass $$ m_{\text{r}} $$ remaining can only be about $$ m_
{0}/180 $$. It is difficult to build a rocket in which the fuel has a mass 180
times everything else. The solution is multistage rockets. Each stage only needs
to achieve part of the final velocity and is discarded after it burns its fuel.
The result is that each successive stage can have smaller engines and more
payload relative to its fuel. Once out of the atmosphere, the ratio of payload
to fuel becomes more favorable, too.

The space shuttle was an attempt at an economical vehicle with some reusable
parts, such as the solid fuel boosters and the craft itself. (
See [Figure 2](#Figure2)) The shuttle’s need to be operated by humans, however,
made it at least as costly for launching satellites as expendable, unmanned
rockets. Ideally, the shuttle would only have been used when human activities
were required for the success of a mission, such as the repair of the Hubble
space telescope. Rockets with satellites can also be launched from airplanes.
Using airplanes has the double advantage that the initial velocity is
significantly above zero and a rocket can avoid most of the atmosphere’s
resistance.

![The space shuttle is launched. It consists of the shuttle orbiter, two solid rocket boosters, and an expendable external tank. It takes off leaving much smoke and fire.](../resources/Figure_08_07_02.jpg "The space shuttle had a number of reusable parts. Solid fuel boosters on either side were recovered and refueled after each flight, and the entire orbiter returned to Earth for use in subsequent flights. The large liquid fuel tank was expended. The space shuttle was a complex assemblage of technologies, employing both solid and liquid fuel and pioneering ceramic tiles as reentry heat shields. As a result, it permitted multiple launches as opposed to single-use rockets. (credit: NASA)")
{: #Figure2}

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Lunar Lander
</div>
Can you avoid the boulder field and land safely, just before your fuel runs out, as Neil Armstrong did in 1969? Our version of this classic video game accurately simulates the real motion of the lunar lander with the correct mass, thrust, fuel consumption rate, and lunar gravity. The real lunar lander is very hard to control.

<figure markdown="1">
<figcaption>
Lunar Lander
</figcaption>
<iframe loading="lazy" src="https://phet.colorado.edu/sims/lunar-lander/lunar-lander_en.
html" width="600" height="450"  allowfullscreen></iframe>
</figure>
</div>

### Section Summary

* Newton’s third law of motion states that to every action, there is an equal
  and opposite reaction.
* Acceleration of a rocket is $$ a=\frac{ v_
  {\text{e}}}{m}\frac{ \Delta m}{\Delta t}-g $$.
* A rocket’s acceleration depends on three main factors. They are
    1. The greater the exhaust velocity of the gases, the greater the
       acceleration.
    2. The faster the rocket burns its fuel, the greater its acceleration.
    3. The smaller the rocket\'s mass, the greater the acceleration.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">

**Professional Application**

Suppose a fireworks shell explodes, breaking into three large pieces for which
air resistance is negligible. How is the motion of the center of mass affected
by the explosion? How would it be affected if the pieces experienced
significantly more air resistance than the intact shell?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">

**Professional Application**

During a visit to the International Space Station, an astronaut was positioned
motionless in the center of the station, out of reach of any solid object on
which he could exert a force. Suggest a method by which he could move himself
away from this position, and explain the physics involved.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">

**Professional Application**

It is possible for the velocity of a rocket to be greater than the exhaust
velocity of the gases it ejects. When that is the case, the gas velocity and gas
momentum are in the same direction as that of the rocket. How is the rocket
still able to obtain thrust by ejecting the gases?

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Antiballistic missiles (ABMs) are designed to have very large accelerations so
that they may intercept fast-moving incoming missiles in the short time
available. What is the takeoff acceleration of a 10 000-kg ABM that expels 196
kg of gas per second at an exhaust velocity of $$ 2.50\times 10^{3} \ms $$ ?
</div>
<div class="solution" markdown="1">
 $$ 39.2\mss $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

What is the acceleration of a 5000-kg rocket taking off from the Moon, where the
acceleration due to gravity is only $$ 1.6\mss $$, if the rocket expels 8.00 kg
of gas per second at an exhaust velocity of $$ 2.20\times 10^{3}\ms $$ ?
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

Calculate the increase in velocity of a 4000-kg space probe that expels 3500 kg
of its mass at an exhaust velocity of $$ 2.00\times 10^{3} \ms $$. You may
assume the gravitational force is negligible at the probe’s location.

</div>
<div class="solution" markdown="1">
 $$ 4.16\times 10^{3} \ms $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

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

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Derive the equation for the vertical acceleration of a rocket.

</div>
<div class="solution"  markdown="1">
The force needed to give a small mass $$ \Delta m $$
an acceleration $$ a_{\Delta m} $$ is $$ F=\Delta m a_{\Delta m} $$. To
accelerate this mass in the small time interval $$ \Delta t $$ at a speed $$ v_
{\text{e}} $$ requires $$ v_{\text{e}}= a_{\Delta m}\Delta t $$, so $$ F=v_
{\text{e}}\frac{ \Delta m}{\Delta t} $$. By Newton’s third law, this force is
equal in magnitude to the thrust force acting on the rocket, so $$ F_
{\text{thrust}}=v_{\text{e}}\frac{ \Delta m}{\Delta t} $$, where all quantities
are positive. Applying Newton’s second law to the rocket gives $$ F_
{\text{thrust}}-m g =ma ⇒a=\frac{ v_{\text{e}}}{m}\frac{ \Delta m}{\Delta t}-g
$$, where $$ m $$ is the mass of the rocket and unburnt fuel.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

(a) Calculate the maximum rate at which a rocket can expel gases if its
acceleration cannot exceed seven times that of gravity. The mass of the rocket
just as it runs out of fuel is 75 000-kg, and its exhaust velocity is $$
2.40\times 10^{3} \ms $$. Assume that the acceleration of gravity is the same as
on Earth’s surface $$ \left( 9.80\mss \right) $$.
(b) Why might it be necessary to limit the acceleration of a rocket?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Given the following data for a fire extinguisher-toy wagon rocket experiment, calculate the average exhaust velocity of the gases expelled from the extinguisher. Starting from rest, the final velocity is 10.0 m/s. The total mass is initially 75.0 kg and is 70.0 kg after the extinguisher is fired.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How much of a single-stage rocket that is 100 000 kg can be anything but fuel if the rocket is to have a final speed of
$$ 8.00\text{km/s} $$, given that it expels gases at an exhaust velocity of $$ 2.20\times
10^{3} \ms $$ ?
</div>
<div class="solution" markdown="1">
 $$ 2.63\times 10^{3}\kg $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Professional Application**

(a) A 5.00-kg squid initially at rest ejects 0.250-kg of fluid with a velocity
of 10.0 m/s. What is the recoil velocity of the squid if the ejection is done in
0.100 s and there is a 5.00-N frictional force opposing the squid’s movement.
(b) How much energy is lost to work done against friction?

</div>
<div class="solution" markdown="1">
(a) 0.421 m/s away from the ejected fluid.

(b) $$ 0.237 \J $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

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

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Construct Your Own Problem**

Consider an astronaut in deep space cut free from her space ship and needing to
get back to it. The astronaut has a few packages that she can throw away to move
herself toward the ship. Construct a problem in which you calculate the time it
takes her to get back by throwing all the packages at one time compared to
throwing them one at a time. Among the things to be considered are the masses
involved, the force she can exert on the packages through some distance, and the
distance to the ship.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Construct Your Own Problem**

Consider an artillery projectile striking armor plating. Construct a problem in
which you find the force exerted by the projectile on the plate. Among the
things to be considered are the mass and speed of the projectile and the
distance over which its speed is reduced. Your instructor may also wish for you
to consider the relative merits of depleted uranium versus lead projectiles
based on the greater density of uranium.

</div>
</div>
