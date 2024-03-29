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
2. *The system is isolated from other masses*. This allows us to neglect any
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

![In figure a, an ellipse is shown on the coordinate axes. Two foci of the ellipse are joined to a point m on the ellipse. A pencil is shown at the point m. In figure b the elliptical path of a planet is shown. At the left focus f-one of the path the Sun is shown. The planet is shown just above the Sun on the elliptical path.](../resources/Figure_06_06_01.jpg "(a) An ellipse is a closed curve such that the sum of the distances from a point on the curve to the two foci ( \( f_1 \) and \( f_2 \) ) is a constant. You can draw an ellipse as shown by putting a pin at each focus, and then placing a string around a pencil and the pins and tracing a line on paper. A circle is a special case of an ellipse in which the two foci coincide (thus any point on the circle is the same distance from the center). (b) For any closed gravitational orbit, \( m \) follows an elliptical path with \( M \) at one focus. Kepler&#x2019;s first law states this fact for planets orbiting the Sun.")
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

![In the figure, the elliptical path of a planet is shown. The Sun is at the left focus. Three shaded regions M A B, M C D and M E F are marked on the figure by joining the Sun to the three pairs of points A B, C D, and E F on the elliptical path. The velocity of the planet is shown on the planet in a direction tangential to the path.](../resources/Figure_06_06_02.jpg "The shaded regions have equal areas. It takes equal times for \( m \) to go from A to B, from C to D, and from E to F. The mass \( m \) moves fastest when it is closest to \( M \) . Kepler&#x2019;s second law was originally devised for planets orbiting the Sun, but it has broader validity. ")
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
\text{km}=7880 \text{km} $$. Now all quantities are known, and so $$ T_{2} $$
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
*what* was happening, Newton discovered that gravitational force was the cause.

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
force of gravity for $$ F_{\text{net}} $$:

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

##### Table 1: Orbital Data and Kepler’s Third Law

| Parent |    Satellite|    Average orbital radius r(km) |    Period T(y) |    $$ r^3/ T^2 $$, $$\left( \text{km}^3/ \text{y}^2 \right) $$ |
| ------ |  -------- | ---- | ---- | ---- |
|Earth     | Moon      | $$ 3.84 \times 10^{5} $$ | 0.07481| $$1.01 \times 10^{19} $$|
|Sun     | Mercury   | $$ 5.79 \times 10^{7} $$ | 0.2409 | $$ 3.34 \times 10^{24} $$|
| Sun    | Venus     | $$ 1.082 \times 10^{8} $$ | 0.6150| $$ 3.35 \times 10^{24} $$ |
| Sun    | Earth     | $$ 1.496 \times 10^{8} $$ | 1.000 | $$ 3.35 \times 10^{24} $$ |
| Sun    | Mars      | $$ 2.279 \times 10^{8} $$ | 1.881 | $$ 3.35 \times 10^{24} $$ |
| Sun    | Jupiter   | $$ 7.783 \times 10^{8} $$ | 11.86 | $$ 3.35 \times 10^{24} $$ |
| Sun    | Saturn    | $$ 1.427 \times 10^{9} $$ | 29.46 | $$ 3.35 \times 10^{24} $$ |
| Sun    | Neptune   | $$ 4.497 \times 10^{9} $$ | 164.8 | $$ 3.35 \times 10^{24} $$ |
| Sun    | Pluto     | $$ 5.90 \times 10^{9} $$ | 248.3 | $$ 3.33 \times 10^{24} $$ |
| Jupiter| Io        | $$ 4.22 \times 10^{5} $$ | 0.00485  (1.77 d) | $$ 3.19 \times 10^{21} $$ |
| Jupiter| Europa    | $$ 6.71 \times 10^{5} $$ | 0.00972 (3.55 d) | $$ 3.20 \times 10^{21} $$ |
| Jupiter| Ganymede  | $$ 1.07 \times 10^{6} $$ |0.0196 (7.16 d) | $$ 3.19 \times 10^{21} $$ |
| Jupiter| Callisto  | $$ 1.88 \times 10^{6} $$ |0.0457 (16.19 d)| $$ 3.20 \times 10^{21} $$ |

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

![In figure a the paths of the different planets are shown in the forms of dotted concentric circles with the Earth at the center with its Moon. The Sun is also shown revolving around the Earth. Each planet is labeled with its name. On the planets Mercury, Venus, Mars, Jupiter and Saturn green colored epicycles are shown. In the figure b Copernican view of planet is shown. The Sun is shown at the center of the solar system. The planets are shown moving around the Sun.](../resources/Figure_06_06_03.jpg "(a) The Ptolemaic model of the universe has Earth at the center with the Moon, the planets, the Sun, and the stars revolving about it in complex superpositions of circular paths. This geocentric model, which can be made progressively more accurate by adding more circles, is purely descriptive, containing no hints as to what are the causes of these motions. (b) The Copernican model has the Sun at the center of the solar system. It is fully explained by a small number of laws of physics, including Newton&#x2019;s universal law of gravitation.")
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

* Kepler’s laws are stated for a small mass $$ m $$ orbiting a larger mass $$ M
  $$ in near-isolation. Kepler’s laws of planetary motion are then as follows:

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

where $$ T $$ is the period (time for one orbit) and $$ r $$ is the average
radius of the orbit.

* The period and radius of a satellite’s orbit about a larger body $$ M $$ are
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
equatorial plane in the same direction as Earth’s rotation). Calculate the radius
of such an orbit based on the data for the moon in [Table 1](#Table1).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the mass of the Sun based on data for Earth’s orbit and compare
the value obtained with the Sun’s actual mass.

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
 $$ 1.98\times 10^{30}\kg $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the mass of Jupiter based on data for the orbit of one of its moons, and compare your result with its actual mass.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the mass of Jupiter to that of Earth based on data in [Table 1](#Table1).

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
 $$ \frac{ M_{J}}{ M_{E}}=316 $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Astronomical observations of our Milky Way galaxy indicate that it has a mass of about $$ 8.0\times 10^{11} $$
solar masses. A star orbiting on the galaxy’s periphery is about $$ 6.0\times
10^{4} $$ light years from its center.
(a) What should the orbital period of
that star be?
(b) If its period is $$ 6.0\times 10^{7} $$ years instead, what is
the mass of the galaxy? Such calculations are used to imply the existence of
“dark matter” in the universe and have indicated, for example, the existence of
very massive black holes at the centers of some galaxies.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Integrated Concepts**

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
a) $$ 7.4 \times 10^{3} \ms $$

b) $$ 1.05 \times 10^{3} \ms $$

c) $$ 2.86 \times 10^{-7}\s $$

d) $$ 1.84 \times 10^{7}\N $$

e) $$ 2.76 \times 10^{4} \J $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Unreasonable Results**

(a) Based on Kepler’s laws and information on the orbital characteristics of the
Moon, calculate the orbital radius for an Earth satellite having a period of
1.00 h.
(b) What is unreasonable about this result?
(c) What is unreasonable or inconsistent about the premise of a 1.00 h orbit?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
a) $$ 5.08 \times 10^{3}\text{km} $$

b) This radius is unreasonable because it is less than the radius of earth.

c) The premise of a one-hour orbit is inconsistent with the known radius of the
earth.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">

**Construct Your Own Problem**

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
