---
title: 'Satellites and Kepler’s Laws: An Argument for Simplicity'
layout: page
sectionNumber: 6
chapterNumber: 6
---

<div class="abstract" markdown="1">
* State Kepler’s laws of planetary motion.
* Derive the third Kepler’s law for circular orbits.
* Discuss the Ptolemaic model of the universe.

</div>

Examples of gravitational orbits abound. Hundreds of artificial satellites orbit
Earth together with thousands of pieces of debris. The Moon’s orbit about Earth
has intrigued humans from time immemorial. The orbits of planets, asteroids,
meteors, and comets about the Sun are no less interesting. If we look further,
we see almost unimaginable numbers of stars, galaxies, and other celestial
objects orbiting one another and interacting through gravity.

All these motions are governed by gravitational force, and it is possible to
describe them to various degrees of precision. Precise descriptions of complex
systems must be made with large computers. However, we can describe an important
class of orbits without the use of computers, and we shall find it instructive
to study them. These orbits have the following characteristics:

1. A small mass $$ m $$ orbits a much larger mass $$ M $$. This allows us to
   view the motion as if $$ M $$ were stationary—in fact, as if from an inertial
   frame of reference placed on $$ M $$ —without significant error. Mass $$ m $$
   is the satellite of $$ M $$, if the orbit is gravitationally bound.
2. _The system is isolated from other masses_. This allows us to neglect any
   small effects due to outside masses.

The conditions are satisfied, to good approximation, by Earth’s satellites (
including the Moon), by objects orbiting the Sun, and by the satellites of other
planets. Historically, planets were studied first, and there is a classical set
of three laws, called Kepler’s laws of planetary motion, that describe the
orbits of all bodies satisfying the two previous conditions (not just planets in
our solar system). These descriptive laws are named for the German astronomer
Johannes Kepler (1571–1630), who devised them after careful study (over some 20
years) of a large amount of meticulously recorded observations of planetary
motion done by Tycho Brahe (1546–1601). Such careful collection and detailed
recording of methods and data are hallmarks of good science. Data constitute the
evidence from which new interpretations and meanings can be constructed.

### Kepler’s Laws of Planetary Motion

**Kepler’s First Law**

The orbit of each planet about the Sun is an ellipse with the Sun at one focus.

![In figure a, an ellipse is shown on the coordinate axes. Two foci of the ellipse are joined to a point m on the ellipse. A pencil is shown at the point m. In figure b the elliptical path of a planet is shown. At the left focus f-one of the path the Sun is shown. The planet is shown just above the Sun on the elliptical path.](../resources/Figure_06_06_01.jpg '(a) An ellipse is a closed curve such that the sum of the distances from a point on the curve to the two foci ( ( f_1 ) and ( f_2 ) ) is a constant. You can draw an ellipse as shown by putting a pin at each focus, and then placing a string around a pencil and the pins and tracing a line on paper. A circle is a special case of an ellipse in which the two foci coincide (thus any point on the circle is the same distance from the center). (b) For any closed gravitational orbit, ( m ) follows an elliptical path with ( M ) at one focus. Kepler’s first law states this fact for planets orbiting the Sun.')
{: #Figure1}

**Kepler’s Second Law**

Each planet moves so that an imaginary line drawn from the Sun to the planet
sweeps out equal areas in equal times (
see [Figure 2](#Figure2)).

**Kepler’s Third Law**

The ratio of the squares of the periods of any two planets about the Sun is
equal to the ratio of the cubes of their average distances from the Sun. In
equation form, this is

<div class="equation">
 $$ \frac{ T_{1}^{2}}{ T_{2}^{2}}=\frac{ r_{1}^{3}}{ r_{2}^{3}}, $$
</div>

where $$ T $$ is the period (time for one orbit) and $$ r $$ is the average
radius. This equation is valid only for comparing two small masses orbiting the
same large one. Most importantly, this is a descriptive equation only, giving no
information as to the cause of the equality.

![In the figure, the elliptical path of a planet is shown. The Sun is at the left focus. Three shaded regions M A B, M C D and M E F are marked on the figure by joining the Sun to the three pairs of points A B, C D, and E F on the elliptical path. The velocity of the planet is shown on the planet in a direction tangential to the path.](../resources/Figure_06_06_02.jpg 'The shaded regions have equal areas. It takes equal times for ( m ) to go from A to B, from C to D, and from E to F. The mass ( m ) moves fastest when it is closest to ( M ) . Kepler’s second law was originally devised for planets orbiting the Sun, but it has broader validity. ')
{: #Figure2}

Note again that while, for historical reasons, Kepler’s laws are stated for
planets orbiting the Sun, they are actually valid for all bodies satisfying the
two previously stated conditions.

<div class="example" markdown="1">
<div class="title">
Find the Time for One Orbit of an Earth Satellite
</div>
Given that the Moon orbits Earth each 27.3 d and that it is an average distance of
$$ 3.84\times 10^{8}\m $$ from the center of Earth, calculate the period of an artificial satellite
orbiting at an average altitude of 1500 km above Earth’s surface.

**Strategy**

The period, or time for one orbit, is related to the radius of the orbit by
Kepler’s third law, given in mathematical form in $$ \frac{ T_{1}^{2}}{ T_
{2}^{2}}=\frac{ r_{1}^{3}}{ r_{2}^{3}} $$. Let us use the subscript 1 for the
Moon and the subscript 2 for the satellite. We are asked to find $$ T_{2} $$.
The given information tells us that the orbital radius of the Moon is $$ r_
{1}=3.84 \times 10^{8}\m $$, and that the period of the Moon is $$ T_{1}=27.3
\text{d} $$. The height of the artificial satellite above Earth’s surface is
given, and so we must add the radius of Earth (6380 km) to get $$ r_{2}=\left(
1500 +6380 \right)
\text{km}=7880 \text{km} $$. Now all quantities are known, and so $$ T\_{2} $$
can be found.

**Solution**

Kepler’s third law is

<div class="equation">
 $$ \frac{ T_{1}^{2}}{ T_{2}^{2}}=\frac{ r_{1}^{3}}{ r_{2}^{3}}. $$
</div>
To solve for $$ T_{2} $$, we cross-multiply and take the square root, yielding

<div class="equation">
 $$ T_{2}^{2}=T_{1}^{2}\left(\frac{r_{2}}{ r_{1}}\right)^{3} $$
</div>
<div class="equation">
 $$ T_{2}=T_{1} \left(\frac{r_{2}}{r_{1}}\right)^{3/2}. $$
</div>
Substituting known values yields

<div class="equation">
 $$ \begin{array}{lll} 
T_{2}&=& 27.3 \text{d} \times
\frac{24.0 \text{h}}{\text{d}}
\times {\left(\frac{7880 \text{km}}{3.84\times 10^{5}\text{km}}\right)}^{3/2}\\
T_{2}&=& 1.93 \text{h} .
\end{array} $$
</div>

**Discussion** This is a reasonable period for a satellite in a fairly low
orbit. It is interesting that any satellite at this altitude will orbit in the
same amount of time. This fact is related to the condition that the satellite’s
mass is small compared with that of Earth.

</div>

People immediately search for deeper meaning when broadly applicable laws, like
Kepler’s, are discovered. It was Newton who took the next giant step when he
proposed the law of universal gravitation. While Kepler was able to discover
_what_ was happening, Newton discovered that gravitational force was the cause.

### Derivation of Kepler’s Third Law for Circular Orbits

We shall derive Kepler’s third law, starting with Newton’s laws of motion and
his universal law of gravitation. The point is to demonstrate that the force of
gravity is the cause for Kepler’s laws (although we will only derive the third
one).

Let us consider a circular orbit of a small mass $$ m $$ around a large mass $$
M $$, satisfying the two conditions stated at the beginning of this section.
Gravity supplies the centripetal force to mass $$ m $$. Starting with Newton’s
second law applied to circular motion,

<div class="equation">
$$ F_{\text{net}}= m \ac =m\frac{ v^{2}}{r}. $$
</div>

The net external force on mass $$ m $$ is gravity, and so we substitute the
force of gravity for $$ F\_{\text{net}} $$:

<div class="equation">
 $$ G\frac{mM}{ r^{2}}=m\frac{ v^{2}}{r}. $$
</div>

The mass $$ m $$ cancels, yielding

<div class="equation">
 $$ G\frac{M}{r}={v}^{2}. $$
</div>

The fact that $$ m $$ cancels out is another aspect of the oft-noted fact that
at a given location all masses fall with the same acceleration. Here we see that
at a given orbital radius $$ r $$, all masses orbit at the same speed. (This was
implied by the result of the preceding worked example.) Now, to get at Kepler’s
third law, we must get the period $$ T $$ into the equation. By definition,
period $$ T $$ is the time for one complete orbit. Now the average speed $$ v $$
is the circumference divided by the period—that is,

<div class="equation">
 $$ v=\frac{2\pi r}{T}. $$
</div>

Substituting this into the previous equation gives

<div class="equation">
 $$ G\frac{M}{r}=\frac{ 4\pi^{2}{r}^{2}}{T^{2}}. $$
</div>

Solving for $$ T^{2} $$ yields

<div class="equation">
 $$ T^{2}=\frac{ 4\pi^{2}}{GM} r^{3}. $$
</div>

Using subscripts 1 and 2 to denote two different satellites, and taking the
ratio of the last equation for satellite 1 to satellite 2 yields

<div class="equation">
 $$ \frac{ T_{1}^{2}}{ T_{2}^{2}}=\frac{ r_{1}^{3}}{ r_{2}^{3}}. $$
</div>

This is Kepler’s third law. Note that Kepler’s third law is valid only for
comparing satellites of the same parent body, because only then does the mass of
the parent body $$ M $$ cancel.

Now consider what we get if we solve $$ T^{2}=\frac{ 4\pi^{2} }{GM}{r}^{3} $$
for the ratio $$ r^{3}/ T^{2} $$. We obtain a relationship that can be used to
determine the mass $$ M $$ of a parent body from the orbits of its satellites:

<div class="equation">
 $$ \frac{ r^{3}}{ T^{2}}=\frac{G}{ 4\pi^2 }M. $$
</div>

If $$ r $$ and $$ T $$ are known for a satellite, then the mass $$ M $$ of the
parent can be calculated. This principle has been used extensively to find the
masses of heavenly bodies that have satellites. Furthermore, the ratio $$ r^{3}/
T^{2} $$ should be a constant for all satellites of the same parent body (
because $$ \frac{r^{3}}{T^{2}}=\frac{GM}{4\pi^{2}} $$).
(See [Table 1](#Table1)).

It is clear from [Table 1](#Table1) that the ratio of $$ {r}^{3}/ T^{2} $$ is
constant, at least to the third digit, for all listed satellites of the Sun, and
for those of Jupiter. Small variations in that ratio have two
causes—uncertainties in the $$ r $$ and $$ T $$ data, and perturbations of the
orbits due to other bodies. Interestingly, those perturbations can be—and have
been—used to predict the location of new planets and moons. This is another
verification of Newton’s universal law of gravitation.

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections
</div>
Newton’s universal law of gravitation is modified by Einstein’s general theory of
relativity. Newton’s gravity
is not seriously in error—it was and still is an extremely good approximation for most
situations. Einstein’s modification is most noticeable in extremely large gravitational
fields, such as near black holes. However, general relativity also explains such
phenomena as small but long-known deviations of the orbit of the planet Mercury
from classical predictions.

</div>

### The Case for Simplicity

The development of the universal law of gravitation by Newton played a pivotal
role in the history of ideas. While it is beyond the scope of this text to cover
that history in any detail, we note some important points. The definition of
planet set in 2006 by the International Astronomical Union (IAU) states that in
the solar system, a planet is a celestial body that:

1. is in orbit around the Sun,
2. has sufficient mass to assume hydrostatic equilibrium and
3. has cleared the neighborhood around its orbit.

A non-satellite body fulfilling only the first two of the above criteria is
classified as “dwarf planet.”

In 2006, Pluto was demoted to a ‘dwarf planet’ after scientists revised their
definition of what constitutes a “true” planet.

#### Table 1: Orbital Data and Kepler’s Third Law

| Parent  | Satellite | Average orbital radius r(km) | Period T(y)      | $$ r^3/ T^2 $$, $$\left( \text{km}^3/ \text{y}^2 \right) $$ |
| ------- | --------- | ---------------------------- | ---------------- | ----------------------------------------------------------- |
| Earth   | Moon      | $$ 3.84 \times 10^{5} $$     | 0.07481          | $$1.01 \times 10^{19} $$                                    |
| Sun     | Mercury   | $$ 5.79 \times 10^{7} $$     | 0.2409           | $$ 3.34 \times 10^{24} $$                                   |
| Sun     | Venus     | $$ 1.082 \times 10^{8} $$    | 0.6150           | $$ 3.35 \times 10^{24} $$                                   |
| Sun     | Earth     | $$ 1.496 \times 10^{8} $$    | 1.000            | $$ 3.35 \times 10^{24} $$                                   |
| Sun     | Mars      | $$ 2.279 \times 10^{8} $$    | 1.881            | $$ 3.35 \times 10^{24} $$                                   |
| Sun     | Jupiter   | $$ 7.783 \times 10^{8} $$    | 11.86            | $$ 3.35 \times 10^{24} $$                                   |
| Sun     | Saturn    | $$ 1.427 \times 10^{9} $$    | 29.46            | $$ 3.35 \times 10^{24} $$                                   |
| Sun     | Neptune   | $$ 4.497 \times 10^{9} $$    | 164.8            | $$ 3.35 \times 10^{24} $$                                   |
| Sun     | Pluto     | $$ 5.90 \times 10^{9} $$     | 248.3            | $$ 3.33 \times 10^{24} $$                                   |
| Jupiter | Io        | $$ 4.22 \times 10^{5} $$     | 0.00485 (1.77 d) | $$ 3.19 \times 10^{21} $$                                   |
| Jupiter | Europa    | $$ 6.71 \times 10^{5} $$     | 0.00972 (3.55 d) | $$ 3.20 \times 10^{21} $$                                   |
| Jupiter | Ganymede  | $$ 1.07 \times 10^{6} $$     | 0.0196 (7.16 d)  | $$ 3.19 \times 10^{21} $$                                   |
| Jupiter | Callisto  | $$ 1.88 \times 10^{6} $$     | 0.0457 (16.19 d) | $$ 3.20 \times 10^{21} $$                                   |

{: #Table1}

The universal law of gravitation is a good example of a physical principle that
is very broadly applicable. That single equation for the gravitational force
describes all situations in which gravity acts. It gives a cause for a vast
number of effects, such as the orbits of the planets and moons in the solar
system. It epitomizes the underlying unity and simplicity of physics.

Before the discoveries of Kepler, Copernicus, Galileo, Newton, and others, the
solar system was thought to revolve around Earth as shown in [Figure 3](#Figure3)(
a). This is called the Ptolemaic view, for the Greek philosopher who lived in
the second century AD. This model is characterized by a list of facts for the
motions of planets with no cause and effect explanation. There tended to be a
different rule for each heavenly body and a general lack of simplicity.

[Figure 3](#Figure3)(b) represents the modern or Copernican model. In this model, a
small set of rules and a single underlying force explain not only all motions in
the solar system, but all other situations involving gravity. The breadth and
simplicity of the laws of physics are compelling. As our knowledge of nature has
grown, the basic simplicity of its laws has become ever more evident.

![In figure a the paths of the different planets are shown in the forms of dotted concentric circles with the Earth at the center with its Moon. The Sun is also shown revolving around the Earth. Each planet is labeled with its name. On the planets Mercury, Venus, Mars, Jupiter and Saturn green colored epicycles are shown. In the figure b Copernican view of planet is shown. The Sun is shown at the center of the solar system. The planets are shown moving around the Sun.](../resources/Figure_06_06_03.jpg '(a) The Ptolemaic model of the universe has Earth at the center with the Moon, the planets, the Sun, and the stars revolving about it in complex superpositions of circular paths. This geocentric model, which can be made progressively more accurate by adding more circles, is purely descriptive, containing no hints as to what are the causes of these motions. (b) The Copernican model has the Sun at the center of the solar system. It is fully explained by a small number of laws of physics, including Newton’s universal law of gravitation.')
{: #Figure3}

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Gravity and Orbits
</div>
Move the sun, earth, moon and space station to see how it affects their gravitational forces and orbital paths. Visualize the sizes and distances between different heavenly bodies, and turn off gravity to see what would happen without it!

<figure markdown="1">
<iframe loading="lazy" src="https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html" width="600" height="450"  allowfullscreen></iframe>
<figcaption>
Gravity and Orbits
</figcaption>

</figure>
</div>

### Section Summary

- Kepler’s laws are stated for a small mass $$ m $$ orbiting a larger mass $$ M

  $$
  in near-isolation. Kepler’s laws of planetary motion are then as follows:

  **Kepler’s first law**

  The orbit of each planet about the Sun is an ellipse with the Sun at one
  focus.

  **Kepler’s second law**

  Each planet moves so that an imaginary line drawn from the Sun to the planet
  sweeps out equal areas in equal times.

  **Kepler’s third law**

  The ratio of the squares of the periods of any two planets about the Sun is
  equal to the ratio of the cubes of their average distances from the Sun:

  <div class="equation">
    $$ \frac{T_{1}^{2}}{ T_{2}^{2}}=\frac{ r_{1}^{3}}{r_{2}^{3}}, $$
  </div>
  $$

where $$ T $$ is the period (time for one orbit) and $$ r $$ is the average
radius of the orbit.

- The period and radius of a satellite’s orbit about a larger body $$ M $$ are
  related by
  <div class="equation">
    $$ T^{2}=\frac{4\pi^{2}}{GM} r^{3} $$
  </div>

or

  <div class="equation">
     $$ \frac{ r^{3}}{ T^{2}}=\frac{G}{ 4\pi^{2}}M. $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In what frame(s) of reference are Kepler’s laws valid? Are Kepler’s laws purely
descriptive, or do they contain causal information?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A geosynchronous Earth satellite is one that has an orbital period of precisely
1 day. Such orbits are useful for communication and weather observation because
the satellite remains above the same point on Earth (provided it orbits in the
equatorial plane in the same direction as Earth's rotation). Calculate the radius
of such an orbit based on the data for the moon in [Table 1](#Table1).

</div>
<div class="solution" markdown="1">

**Strategy**

We'll use Kepler's third law: $$ \frac{T_1^2}{T_2^2} = \frac{r_1^3}{r_2^3} $$. We'll use the Moon's data as reference (subscript 1) and solve for the geosynchronous satellite's orbital radius (subscript 2).

**Solution**

From Table 1, the Moon has:

- Orbital radius: $$ r_1 = 3.84 \times 10^5 $$ km
- Orbital period: $$ T_1 = 27.3 $$ days

For the geosynchronous satellite:

- Orbital period: $$ T_2 = 1.00 $$ day
- Orbital radius: $$ r_2 = ? $$

Using Kepler's third law and solving for $$ r_2 $$:

<div class="equation">
$$ \frac{T_1^2}{T_2^2} = \frac{r_1^3}{r_2^3} $$
</div>

<div class="equation">
$$ r_2^3 = r_1^3 \left(\frac{T_2}{T_1}\right)^2 $$
</div>

<div class="equation">
$$ r_2 = r_1 \left(\frac{T_2}{T_1}\right)^{2/3} = (3.84 \times 10^5\text{ km})\left(\frac{1.00}{27.3}\right)^{2/3} $$
</div>

<div class="equation">
$$ r_2 = (3.84 \times 10^5)\left(0.0366\right)^{2/3} = (3.84 \times 10^5)(0.110) = 4.23 \times 10^4\text{ km} $$
</div>

**Discussion**

The orbital radius of a geosynchronous satellite is approximately $$ 4.23 \times 10^4 $$ km or 42,300 km from Earth's center. This corresponds to an altitude of about 35,900 km above Earth's surface (subtracting Earth's radius of 6,400 km). At this altitude and with a 24-hour orbital period, the satellite remains fixed above the same point on Earth's equator, making it ideal for communications and weather monitoring.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the mass of the Sun based on data for Earth's orbit and compare
the value obtained with the Sun's actual mass.

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">

**Strategy**

We'll use the relationship $$ M = \frac{4\pi^2 r^3}{GT^2} $$ derived from Kepler's third law. We know Earth's orbital radius is $$ 1.50 \times 10^{11} $$ m and its period is 1 year.

**Solution**

Convert Earth's period to seconds:

<div class="equation">
$$ T = 1\text{ year} \times \frac{365.25\text{ days}}{1\text{ year}} \times \frac{24\text{ h}}{1\text{ day}} \times \frac{3600\text{ s}}{1\text{ h}} = 3.156 \times 10^7\text{ s} $$
</div>

Calculate the Sun's mass:

<div class="equation">
$$ M = \frac{4\pi^2 r^3}{GT^2} = \frac{4\pi^2 (1.50 \times 10^{11}\text{ m})^3}{(6.67 \times 10^{-11}\text{ N·m}^2\text{/kg}^2)(3.156 \times 10^7\text{ s})^2} $$
</div>

<div class="equation">
$$ M = \frac{4\pi^2 (3.375 \times 10^{33})}{(6.67 \times 10^{-11})(9.96 \times 10^{14})} = \frac{1.33 \times 10^{35}}{6.64 \times 10^{4}} = 2.00 \times 10^{30}\text{ kg} $$
</div>

The actual mass of the Sun is $$ 1.989 \times 10^{30} $$ kg.

**Discussion**

The calculated mass of the Sun based on Earth's orbital data is $$ 2.00 \times 10^{30} $$ kg, which agrees remarkably well with the accepted value of $$ 1.989 \times 10^{30} $$ kg. This excellent agreement validates both Newton's law of universal gravitation and Kepler's laws, demonstrating that we can determine the mass of distant celestial bodies simply by observing the orbital motion of objects around them.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the mass of Jupiter based on data for the orbit of one of its moons, and compare your result with its actual mass.

</div>
<div class="solution" markdown="1">

**Strategy**

We'll use the relationship $$ \frac{r^3}{T^2} = \frac{GM}{4\pi^2} $$ derived from Kepler's third law to find Jupiter's mass $$ M $$. We can use data for any of Jupiter's moons from Table 1. Let's use Io's data.

**Solution**

From Table 1, Io has:

- Orbital radius: $$ r = 4.22 \times 10^5 $$ km $$ = 4.22 \times 10^8 $$ m
- Orbital period: $$ T = 0.00485 $$ years

Convert the period to seconds:

<div class="equation">
$$ T = 0.00485\text{ y} \times \frac{365.25\text{ d}}{1\text{ y}} \times \frac{24\text{ h}}{1\text{ d}} \times \frac{3600\text{ s}}{1\text{ h}} = 1.53 \times 10^5\text{ s} $$
</div>

Solve for Jupiter's mass using $$ M = \frac{4\pi^2 r^3}{GT^2} $$:

<div class="equation">
$$ M = \frac{4\pi^2 r^3}{GT^2} = \frac{4\pi^2 (4.22 \times 10^8)^3}{(6.67 \times 10^{-11})(1.53 \times 10^5)^2} $$
</div>

<div class="equation">
$$ M = \frac{4\pi^2 (7.51 \times 10^{25})}{(6.67 \times 10^{-11})(2.34 \times 10^{10})} = \frac{2.97 \times 10^{27}}{1.56 \times 10^{0}} = 1.90 \times 10^{27}\text{ kg} $$
</div>

The actual mass of Jupiter is $$ 1.90 \times 10^{27} $$ kg.

**Discussion**

The calculated mass of Jupiter based on Io's orbital data is $$ 1.90 \times 10^{27} $$ kg, which matches Jupiter's actual mass perfectly (to three significant figures). This demonstrates the power of Kepler's laws and Newton's law of gravitation - we can determine the mass of a distant planet simply by observing the motion of its satellites. This same technique has been used to find the masses of all planets with moons, as well as stars with orbiting planets.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the mass of Jupiter to that of Earth based on data in [Table 1](#Table1).

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">

**Strategy**

We'll use Kepler's third law in the form $$ \frac{r^3}{T^2} = \frac{GM}{4\pi^2} $$ for both Jupiter (with its moon) and Earth (with its moon). Taking the ratio will allow $$ G $$ and $$4\pi^2$$ to cancel, leaving us with the mass ratio.

**Solution**

From Kepler's third law:

For Earth and its Moon:
<div class="equation">
$$ \frac{r_{\text{Moon}}^3}{T_{\text{Moon}}^2} = \frac{GM_{\text{Earth}}}{4\pi^2} $$
</div>

For Jupiter and one of its moons (using Io):
<div class="equation">
$$ \frac{r_{\text{Io}}^3}{T_{\text{Io}}^2} = \frac{GM_{\text{Jupiter}}}{4\pi^2} $$
</div>

Taking the ratio:

<div class="equation">
$$ \frac{M_{\text{Jupiter}}}{M_{\text{Earth}}} = \frac{r_{\text{Io}}^3 / T_{\text{Io}}^2}{r_{\text{Moon}}^3 / T_{\text{Moon}}^2} $$
</div>

From Table 1, we can read the $$ r^3/T^2 $$ values directly:
- Moon: $$ r^3/T^2 = 1.01 \times 10^{19} $$ km³/y²
- Io: $$ r^3/T^2 = 3.19 \times 10^{21} $$ km³/y²

<div class="equation">
$$ \frac{M_{\text{Jupiter}}}{M_{\text{Earth}}} = \frac{3.19 \times 10^{21}}{1.01 \times 10^{19}} = 316 $$
</div>

**Discussion**

Jupiter's mass is approximately 316 times Earth's mass. This enormous mass difference reflects Jupiter's status as a gas giant - it contains more than twice the mass of all other planets in our solar system combined. The fact that we can calculate this mass ratio simply from observational data in Table 1 demonstrates the elegance and power of Kepler's laws. Remarkably, Jupiter is so massive that the Sun-Jupiter center of mass actually lies slightly outside the Sun's surface, making it almost a binary star system rather than a simple planet-star system.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Astronomical observations of our Milky Way galaxy indicate that it has a mass of about $$ 8.0\times 10^{11} $$
solar masses. A star orbiting on the galaxy's periphery is about $$ 6.0\times
10^{4} $$ light years from its center.
(a) What should the orbital period of
that star be?
(b) If its period is $$ 6.0\times 10^{7} $$ years instead, what is
the mass of the galaxy? Such calculations are used to imply the existence of
"dark matter" in the universe and have indicated, for example, the existence of
very massive black holes at the centers of some galaxies.

</div>
<div class="solution" markdown="1">

**Strategy**

(a) We'll use $$ T^2 = \frac{4\pi^2}{GM}r^3 $$ to find the orbital period. We need to convert units: 1 solar mass $$ = 1.99 \times 10^{30} $$ kg, and 1 light year $$ = 9.46 \times 10^{15} $$ m.
(b) We'll use the same equation solved for mass: $$ M = \frac{4\pi^2 r^3}{GT^2} $$.

**Solution**

(a) Convert the given values to SI units:

- Galaxy mass: $$ M = 8.0 \times 10^{11} \times 1.99 \times 10^{30} = 1.59 \times 10^{42} $$ kg
- Orbital radius: $$ r = 6.0 \times 10^4 \times 9.46 \times 10^{15} = 5.68 \times 10^{20} $$ m

Calculate the orbital period:

<div class="equation">
$$ T^2 = \frac{4\pi^2 r^3}{GM} = \frac{4\pi^2 (5.68 \times 10^{20})^3}{(6.67 \times 10^{-11})(1.59 \times 10^{42})} $$
</div>

<div class="equation">
$$ T^2 = \frac{7.25 \times 10^{63}}{1.06 \times 10^{32}} = 6.84 \times 10^{31}\text{ s}^2 $$
</div>

<div class="equation">
$$ T = 2.62 \times 10^{15}\text{ s} = 2.62 \times 10^{15}\text{ s} \times \frac{1\text{ y}}{3.156 \times 10^7\text{ s}} = 8.3 \times 10^{7}\text{ years} $$
</div>

(b) If the actual period is $$ 6.0 \times 10^7 $$ years, calculate the implied mass:

Convert period to seconds: $$ T = 6.0 \times 10^7 \times 3.156 \times 10^7 = 1.89 \times 10^{15} $$ s

<div class="equation">
$$ M = \frac{4\pi^2 r^3}{GT^2} = \frac{4\pi^2 (5.68 \times 10^{20})^3}{(6.67 \times 10^{-11})(1.89 \times 10^{15})^2} $$
</div>

<div class="equation">
$$ M = \frac{7.25 \times 10^{63}}{2.38 \times 10^{31}} = 3.05 \times 10^{42}\text{ kg} $$
</div>

Convert to solar masses: $$ M = \frac{3.05 \times 10^{42}}{1.99 \times 10^{30}} = 1.5 \times 10^{12} $$ solar masses

**Discussion**

(a) Based on the observed mass of $$ 8.0 \times 10^{11} $$ solar masses, the star should have an orbital period of about $$ 8.3 \times 10^7 $$ years. (b) However, if the actual observed period is $$ 6.0 \times 10^7 $$ years (faster than expected), this implies the galaxy has a mass of about $$ 1.5 \times 10^{12} $$ solar masses - nearly twice the visible mass. This discrepancy is evidence for "dark matter" - matter that doesn't emit light but exerts gravitational force. Such calculations have revolutionized our understanding of galactic structure and the composition of the universe.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

__Integrated Concepts__

Space debris left from old satellites and their launchers is becoming a hazard
to other satellites.
(a) Calculate the speed of a satellite in an orbit 900 km above Earth’s surface.
(b) Suppose a loose rivet is in an orbit of the same radius that intersects the
satellite’s orbit at an angle of $$ 90^\circ $$ relative to Earth. What is the
velocity of the rivet relative to the satellite just before striking it?
(c) Given the rivet is 3.00 mm in size, how long will its collision with the
satellite last?
(d) If its mass is 0.500 g, what is the average force it exerts on the
satellite?
(e) How much energy in joules is generated by the collision? (The satellite’s
velocity does not change appreciably, because its mass is much greater than the
rivet’s.)

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">

**Strategy**

(a) We'll use $$ v = \sqrt{\frac{GM}{r}} $$ where $$ r $$ is the distance from Earth's center.
(b) Since the orbits intersect at 90°, the velocities are perpendicular, so we'll use the Pythagorean theorem: $$ v_{\text{rel}} = \sqrt{v_1^2 + v_2^2} $$.
(c) Collision time is $$ \Delta t = \frac{d}{v_{\text{rel}}} $$.
(d) We'll use impulse-momentum: $$ F_{\text{avg}} = \frac{\Delta p}{\Delta t} $$.
(e) We'll calculate the kinetic energy lost by the rivet.

**Solution**

(a) Calculate satellite orbital speed. The orbital radius is:

<div class="equation">
$$ r = R_{\text{Earth}} + h = 6.38 \times 10^6\text{ m} + 9.00 \times 10^5\text{ m} = 7.28 \times 10^6\text{ m} $$
</div>

<div class="equation">
$$ v = \sqrt{\frac{GM_{\text{Earth}}}{r}} = \sqrt{\frac{(6.674 \times 10^{-11})(5.97 \times 10^{24})}{7.28 \times 10^6}} = \sqrt{5.48 \times 10^7} = 7.40 \times 10^3\text{ m/s} $$
</div>

(b) The rivet has the same orbital speed but at 90°. The relative velocity is:

<div class="equation">
$$ v_{\text{rel}} = \sqrt{v^2 + v^2} = v\sqrt{2} = (7.40 \times 10^3)\sqrt{2} = 1.05 \times 10^4\text{ m/s} $$
</div>

(c) Collision duration (time for rivet to pass through):

<div class="equation">
$$ \Delta t = \frac{d}{v_{\text{rel}}} = \frac{3.00 \times 10^{-3}\text{ m}}{1.05 \times 10^4\text{ m/s}} = 2.86 \times 10^{-7}\text{ s} $$
</div>

(d) Average force using impulse-momentum theorem:

<div class="equation">
$$ F_{\text{avg}} = \frac{\Delta p}{\Delta t} = \frac{m v_{\text{rel}}}{\Delta t} = \frac{(0.500 \times 10^{-3}\text{ kg})(1.05 \times 10^4\text{ m/s})}{2.86 \times 10^{-7}\text{ s}} $$
</div>

<div class="equation">
$$ F_{\text{avg}} = \frac{5.25}{2.86 \times 10^{-7}} = 1.84 \times 10^7\text{ N} $$
</div>

(e) Energy generated (kinetic energy of rivet in satellite's reference frame):

<div class="equation">
$$ E = \frac{1}{2}m v_{\text{rel}}^2 = \frac{1}{2}(0.500 \times 10^{-3})(1.05 \times 10^4)^2 = (2.50 \times 10^{-4})(1.10 \times 10^8) = 2.76 \times 10^4\text{ J} $$
</div>

**Discussion**

This problem illustrates the serious hazard posed by space debris. Even though the rivet is tiny (3 mm, 0.5 g), the relative velocity of 10.5 km/s creates enormous forces and energy. The average force of 18.4 million newtons during the microsecond-long collision is equivalent to the weight of about 1,880 tons! The 27.6 kJ of energy released is comparable to a small explosive. This is why even paint flecks in orbit can damage spacecraft windows, and why tracking and avoiding space debris is critical for satellite and space station safety. The problem also demonstrates why the International Space Station has shielding and why astronauts performing spacewalks face real danger from hypervelocity impacts.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

__Unreasonable Results__

(a) Based on Kepler’s laws and information on the orbital characteristics of the
Moon, calculate the orbital radius for an Earth satellite having a period of
1.00 h.
(b) What is unreasonable about this result?
(c) What is unreasonable or inconsistent about the premise of a 1.00 h orbit?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
**Strategy**

Use Kepler's third law to relate the orbital period and radius. We know the Moon's orbital characteristics, so we can set up a ratio or use the derived form of Kepler's third law with Earth's mass.

**Solution**

__(a) Calculate the orbital radius:__

Using Kepler's third law for Earth satellites:

<div class="equation">
$$ T^2 = \frac{4\pi^2}{GM_{\text{Earth}}}r^3 $$
</div>

Solving for $$ r $$:

<div class="equation">
$$ r = \left(\frac{GM_{\text{Earth}}T^2}{4\pi^2}\right)^{1/3} $$
</div>

__Given:__
- Period: $$ T = 1.00\text{ h} = 3600\text{ s} $$
- $$ G = 6.674 \times 10^{-11}\text{ N·m}^2/\text{kg}^2 $$
- $$ M_{\text{Earth}} = 5.972 \times 10^{24}\text{ kg} $$

<div class="equation">
$$ r = \left(\frac{(6.674 \times 10^{-11})(5.972 \times 10^{24})(3600)^2}{4\pi^2}\right)^{1/3} $$
</div>

<div class="equation">
$$ r = \left(\frac{(3.985 \times 10^{14})(1.296 \times 10^{7})}{39.48}\right)^{1/3} $$
</div>

<div class="equation">
$$ r = \left(\frac{5.17 \times 10^{21}}{39.48}\right)^{1/3} = (1.31 \times 10^{20})^{1/3} $$
</div>

<div class="equation">
$$ r = 5.08 \times 10^{6}\text{ m} = 5.08 \times 10^{3}\text{ km} = 5080\text{ km} $$
</div>

__(b) What is unreasonable about this result?__

The calculated orbital radius of 5080 km is __less than Earth's radius__ of 6371 km. This means the satellite would need to orbit inside the Earth, which is physically impossible. An orbit can only exist if the satellite is above Earth's surface.

__(c) What is unreasonable about the premise?__

The premise of a 1-hour orbital period is physically impossible for an Earth satellite. The __minimum possible orbital period__ occurs when a satellite orbits just above Earth's surface (ignoring atmospheric drag). This minimum period can be calculated:

<div class="equation">
$$ T_{\text{min}} = 2\pi\sqrt{\frac{R_{\text{Earth}}^3}{GM_{\text{Earth}}}} = 2\pi\sqrt{\frac{(6.371 \times 10^{6})^3}{3.985 \times 10^{14}}} $$
</div>

<div class="equation">
$$ T_{\text{min}} = 2\pi\sqrt{\frac{2.586 \times 10^{20}}{3.985 \times 10^{14}}} = 2\pi\sqrt{6.49 \times 10^{5}} = 2\pi(806) = 5063\text{ s} \approx 84.4\text{ min} $$
</div>

Therefore, the minimum orbital period for an Earth satellite is about 84.4 minutes. A 60-minute (1-hour) orbit would require the satellite to be inside Earth, which is impossible.

**Discussion**

This problem illustrates an important physical constraint: there is a minimum orbital period for any spherical body determined by its density. For Earth, this minimum is about 84-85 minutes. The International Space Station, orbiting at about 400 km altitude, has a period of approximately 92 minutes. Satellites in lower orbits have shorter periods, but they can never go below the ~84-minute minimum. Interestingly, this minimum period depends only on the planet's average density - a larger planet with the same density would have the same minimum period. This is why the minimum period can be expressed as $$ T_{\text{min}} = \sqrt{\frac{3\pi}{G\rho}} $$, where $$ \rho $$ is the average density.

**Answer**

(a) The orbital radius would be $$ 5.08 \times 10^{3}\text{ km} $$ (5080 km).

(b) This radius is unreasonable because it is __less than Earth's radius__ (6371 km), meaning the satellite would have to orbit inside the Earth.

(c) The premise of a 1-hour orbit is physically impossible. The __minimum orbital period__ for an Earth satellite is about __84.4 minutes__, which occurs at Earth's surface. No satellite can orbit faster than this around Earth.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

__Construct Your Own Problem__

On February 14, 2000, the NEAR spacecraft was successfully inserted into orbit
around Eros, becoming the first artificial satellite of an asteroid. Construct a
problem in which you determine the orbital speed for a satellite near Eros. You
will need to find the mass of the asteroid and consider such things as a safe
distance for the orbit. Although Eros is not spherical, calculate the
acceleration due to gravity on its surface at a point an average distance from
its center of mass. Your instructor may also wish to have you calculate the
escape velocity from this point on Eros.

</div>
</div>
