---
title: Resistance and Resistivity
layout: page
sectionNumber: 3
chapterNumber: 20
---

<div class="abstract" markdown="1">
* Explain the concept of resistivity.
* Use resistivity to calculate the resistance of specified configurations of material.
* Use the thermal coefficient of resistivity to calculate the change of resistance with temperature.
</div>

### Material and Shape Dependence of Resistance

The resistance of an object depends on its shape and the material of which it is
composed. The cylindrical resistor in [[Figure 1]](#Figure1) is easy to analyze,
and, by so doing, we can gain insight into the resistance of more complicated
shapes. As you might expect, the cylinder’s electric resistance $$R $$ is
directly proportional to its length $$L $$ , similar to the resistance of a pipe
to fluid flow. The longer the cylinder, the more collisions charges will make
with its atoms. The greater the diameter of the cylinder, the more current it
can carry (again similar to the flow of fluid through a pipe). In fact, $$R $$
is inversely proportional to the cylinder’s cross-sectional area $$A $$.

![A cylindrical conductor of length L and cross section A is shown. The resistivity of the cylindrical section is represented as rho. The resistance of this cross section R is equal to rho L divided by A. The section of length L of cylindrical conductor is shown equivalent to a resistor represented by symbol R.](../resources/Figure_20_03_01.jpg 'A uniform cylinder of length ( L ) and cross-sectional area ( A ) . Its resistance to the flow of current is similar to the resistance posed by a pipe to fluid flow. The longer the cylinder, the greater its resistance. The larger its cross-sectional area ( A ) , the smaller its resistance.')
{: #Figure1}

For a given shape, the resistance depends on the material of which the object is
composed. Different materials offer different resistance to the flow of charge.
We define the **resistivity** $$\rho $$ of a substance so that the **resistance** $$R $$ of an object is directly proportional to $$\rho $$ .
Resistivity $$\rho $$ is an _intrinsic_ property of a material,
independent of its shape or size. The resistance $$R $$ of a uniform cylinder of
length $$L $$ , of cross-sectional area $$A $$ , and made of a material with
resistivity $$\rho $$, is

<div class="equation" >
 $$R=\frac{\rho L}{A}\text{.} $$
</div>

[[Table 1]](#Table1) gives representative values of $$\rho $$ . The materials
listed in the table are separated into categories of conductors, semiconductors,
and insulators, based on broad groupings of resistivities. Conductors have the
smallest resistivities, and insulators have the largest; semiconductors have
intermediate resistivities. Conductors have varying but large free charge
densities, whereas most charges in insulators are bound to atoms and are not
free to move. Semiconductors are intermediate, having far fewer free charges
than conductors, but having properties that make the number of free charges
depend strongly on the type and amount of impurities in the semiconductor. These
unique properties of semiconductors are put to use in modern electronics, as
will be explored in later chapters.

<table id="Table1" aria-describedby="Table 21_03_01"><caption><span class="title">Resistivities         $$\rho  $$     of Various materials at        $$20 \text{ºC} $$     </span></caption><thead><tr>
            <th><span class="space" data-count="2">  </span>Material</th>
            <th>
            Resistivity  \(\rho \)  \( ( \Omega \cdot \text{m} ) \)
            </th>
          </tr></thead><tbody>
<tr>
<td>
<em>Conductors</em></td>
            <td></td>
</tr>
<tr>
<td><span class="space" data-count="2">  </span>Silver</td>
            <td>
               $$ 1.59 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Copper</td>
            <td>
               $$ 1.72 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Gold</td>
            <td>
               $$ 2.44 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Aluminum</td>
            <td>
               $$ 2.65 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Tungsten</td>
            <td>
               $$ 5.6 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Iron</td>
            <td>
               $$ 9.71 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Platinum</td>
            <td>
               $$ 10.6 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Steel</td>
            <td>
               $$20 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Lead</td>
            <td>
               $$22 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Manganin (Cu, Mn, Ni alloy)</td>
            <td>
               $$44 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Constantan (Cu, Ni alloy)</td>
            <td>
               $$49 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Mercury</td>
            <td>
               $$96 \times 10^{-8}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Nichrome (Ni, Fe, Cr alloy)</td>
            <td>
               $$100 \times 10^{-8}  $$ 
            </td>
          </tr>
<tr>
            <td><em>Semiconductors</em><sup class="footnote-number" id="footnote-ref1"><a class="footnote-link" href="#footnote1">1</a></sup>
            </td>
<td></td>
          </tr>
<tr>
            <td><span class="space" data-count="2">  </span>Carbon (pure)</td>
            <td>
               $$3.5 \times 10^{-5} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Carbon</td>
            <td>
               $$\left(3.5-60\right) \times 10^{-5} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Germanium (pure)</td>
            <td> $$600 \times 10^{-3}  $$</td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Germanium</td>
            <td> $$\left(1-600\right) \times 10^{-3}  $$</td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Silicon (pure)</td>
            <td> $$2300 $$</td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Silicon</td>
            <td> $$0.1 \text-2300 $$</td>
          </tr><tr>
            <td><em>Insulators</em></td>
            <td></td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Amber</td>
            <td>
               $$5 \times 10^{14} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Glass</td>
            <td>
               $$10^{9}- 10^{14} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Lucite</td>
            <td>
               $$>10^{13} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Mica</td>
            <td>
               $$ 10^{11}- 10^{15} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Quartz (fused)</td>
            <td>
               $$75 \times 10^{16} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Rubber (hard)</td>
            <td>
               $$ 10^{13}- 10^{16} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Sulfur</td>
            <td>
               $$ 10^{15} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Teflon</td>
            <td>
               $$>10^{13} $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Wood</td>
            <td>
               $$10^{8}- 10^{11} $$ 
            </td>
          </tr></tbody></table>

<div class="example" markdown="1">
<div class="title">
Calculating Resistor Diameter: A Headlight Filament
</div>
A car headlight filament is made of tungsten and has a cold resistance of  $$ 0.350 \Omega  $$ .
 If the filament is a cylinder 4.00 cm long (it may be coiled to save space), what is its diameter?

**Strategy**

We can rearrange the equation $$R=\frac{\rho L}{A} $$ to find the
cross-sectional area $$A $$ of the filament from the given information. Then its
diameter can be found by assuming it has a circular cross-section.

**Solution**

The cross-sectional area, found by rearranging the expression for the resistance
of a cylinder given in $$R=\frac{\rho L}{A} $$, is

<div class="equation" >
 $$A=\frac{\rho L}{R}\text{.} $$
</div>
Substituting the given values, and taking  $$\rho  $$
 from [[Table 1]](#Table1), yields

<div class="equation" >
 $$\begin{array}{lll}A& =& \frac{\left(5.6 \times 10^{-8} \Omega \cdot \text{m}\right)\left(4.00 \times 10^{-2} \text{m}\right)}{0.350 \Omega }\\ & =& 6.40 \times 10^{-9} {\text{m}}^{2}\text{.}\end{array} $$
</div>
The area of a circle is related to its diameter  $$D $$  by

<div class="equation" >
 $$A=\frac{ \pi D^{2}}{4}\text{.} $$
</div>
Solving for the diameter  $$D $$ ,
 and substituting the value found for  $$A $$, gives 
<div class="equation" >
 $$\begin{array}{lll}D& =& 2{\left(\frac{A}{p}\right)}^{\frac{1}{2}}=2{\left(\frac{6.40 \times 10^{-9} {\text{m}}^{2}}{3.14}\right)}^{\frac{1}{2}}\\ & =& 9.0 \times 10^{-5} \text{m}\text{.}\end{array} $$
</div>
**Discussion**

The diameter is just under a tenth of a millimeter. It is quoted to only two
digits, because $$\rho $$ is known to only two digits.

</div>

### Temperature Variation of Resistance

The resistivity of all materials depends on temperature. Some even become
superconductors (zero resistivity) at very low temperatures. (
See [[Figure 2]](#Figure2).) Conversely, the resistivity of conductors increases
with increasing temperature. Since the atoms vibrate more rapidly and over
larger distances at higher temperatures, the electrons moving through a metal
make more collisions, effectively making the resistivity higher. Over relatively
small temperature changes (about $$100 \text{ºC} $$ or less), resistivity $$\rho
$$ varies with temperature change $$\Delta T $$ as expressed in the following
equation

<div class="equation" >
 $$\rho ={\rho }_{0}\left(1+\alpha \Delta T\right)\text{,} $$
</div>

where $${\rho }_{0} $$ is the original resistivity and $$\alpha $$ is the **temperature coefficient of resistivity**. (See the values of $$\alpha $$
in [[Table 2]](#Table2) below.) For larger temperature changes, $$\alpha $$ may
vary or a nonlinear equation may be needed to find $$\rho $$ . Note that
$$\alpha $$ is positive for metals, meaning their resistivity increases with
temperature. Some alloys have been developed specifically to have a small
temperature dependence. Manganin (which is made of copper, manganese and nickel)
, for example, has $$\alpha $$
\*\* close to zero (to three digits on the scale in [[Table 2]](#Table2)), and so
its resistivity varies only slightly with temperature. This is useful for making
a temperature-independent resistance standard, for example.

![A graph for variation of resistance R with temperature T for a mercury sample is shown. The temperature T is plotted along the x axis and is measured in Kelvin, and the resistance R is plotted along the y axis and is measured in ohms. The curve starts at x equals zero and y equals zero, and coincides with the X axis until the value of temperature is four point two Kelvin, known as the critical temperature T sub c. At temperature T sub c, the curve shows a vertical rise, represented by a dotted line, until the resistance is about zero point one one ohms. After this temperature the resistance shows a nearly linear increase with temperature T.](../resources/Figure_20_03_02.jpg 'The resistance of a sample of mercury is zero at very low temperatures—it is a superconductor up to about 4.2 K. Above that critical temperature, its resistance makes a sudden jump and then increases nearly linearly with temperature.')
{: #Figure2}

<table id="Table2" aria-describedby="Table 21_03_02"><caption><span class="title">Temperature Coefficients of Resistivity    $$\alpha  $$     </span></caption><thead><tr>
            <th><span class="space" data-count="2">  </span>Material</th>
            <th>Coefficient  $$\alpha  $$<em></em>(1/ºC)<sup class="footnote-number" id="footnote-ref2"><a class="footnote-link" href="#footnote2">2</a></sup></th>
          </tr></thead><tbody><tr>
            <td><em>Conductors</em></td>
            <td></td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Silver</td>
            <td>
               $$ 3.8 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Copper</td>
            <td>
               $$ 3.9 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Gold</td>
            <td>
               $$ 3.4 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Aluminum</td>
            <td>
               $$ 3.9 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Tungsten</td>
            <td>
               $$ 4.5 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Iron</td>
            <td>
               $$ 5.0 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Platinum</td>
            <td>
               $$ 3.93 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Lead</td>
            <td>
               $$ 3.9 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Manganin (Cu, Mn, Ni alloy)</td>
            <td>
               $$ 0.000 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Constantan (Cu, Ni alloy)</td>
            <td>
               $$ 0.002 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Mercury</td>
            <td>
               $$ 0.89 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Nichrome (Ni, Fe, Cr alloy)</td>
            <td>
               $$ 0.4 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><em>Semiconductors</em></td>
            <td></td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Carbon (pure)</td>
            <td>
               $$ -0.5 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Germanium (pure)</td>
            <td>
               $$-50 \times 10^{-3}  $$ 
            </td>
          </tr><tr>
            <td><span class="space" data-count="2">  </span>Silicon (pure)</td>
            <td>
               $$-70 \times 10^{-3}  $$ 
            </td>
          </tr></tbody></table>

Note also that $$\alpha $$ is negative for the semiconductors listed
in [[Table 2]](#Table2), meaning that their resistivity decreases with
increasing temperature. They become better conductors at higher temperature,
because increased thermal agitation increases the number of free charges
available to carry current. This property of decreasing $$\rho $$ with
temperature is also related to the type and amount of impurities present in the
semiconductors.

The resistance of an object also depends on temperature, since $${R}_{0} $$ is
directly proportional to $$\rho $$ . For a cylinder we know $$R=\rho L/A $$ ,
and so, if $$L $$ and $$A $$ do not change greatly with temperature, $$R $$ will
have the same temperature dependence as $$\rho $$ .
(Examination of the coefficients of linear expansion shows them to be about two
orders of magnitude less than typical temperature coefficients of resistivity,
and so the effect of temperature on $$L $$ and $$A $$ is about two orders of
magnitude less than on $$\rho $$ .)
Thus,

<div class="equation" >
 $$R={R}_{0}\left(1+\alpha \Delta T\right) $$
</div>

is the temperature dependence of the resistance of an object, where $${R}_{0} $$
is the original resistance and $$R $$ is the resistance after a temperature
change $$\Delta T $$ . Numerous thermometers are based on the effect of
temperature on resistance. (See [[Figure 3]](#Figure3).) One of the most common
is the thermistor, a semiconductor crystal with a strong temperature dependence,
the resistance of which is measured to obtain its temperature. The device is
small, so that it quickly comes into thermal equilibrium with the part of a
person it touches.

![A photograph showing two digital thermometers used for measuring body temperature.](../resources/Figure_20_03_03.jpg 'These familiar thermometers are based on the automated measurement of a thermistor’s temperature-dependent resistance. (credit: Biol, Wikimedia Commons)')
{: #Figure3}

<div class="example" markdown="1">
<div class="title">
Calculating Resistance: Hot-Filament Resistance
</div>
Although caution must be used in applying  $$\rho ={\rho }_{0}\left(1+\alpha \Delta T\right) $$
 and  $$R={R}_{0}\left(1+\alpha \Delta T\right) $$
 for temperature changes greater than  $$100 \text{ºC} $$ ,
 for tungsten the equations work reasonably well for very large temperature changes. What, then, is the resistance of the tungsten filament in the previous example if its temperature is increased from room temperature ( $$20 \text{ºC} $$ ) 
to a typical operating temperature of  $$2850 \text{ºC} $$ ?

**Strategy**

This is a straightforward application of $$R={R}_{0}\left(1+\alpha \Delta
T\right) $$ , since the original resistance of the filament was given to be
$${R}\_{0}=0.350 \text{Ω} $$ , and the temperature change is $$\Delta T=2830
\text{ºC} $$.

**Solution**

The hot resistance $$R $$ is obtained by entering known values into the above
equation:

<div class="equation" >
 $$\begin{array}{lll}R& =& {R}_{0}\left(1+\alpha \Delta T\right)\\ 
& =& \left(0.350 \text{Ω}\right)\left[1+\left(4.5 \times 10^{-3}/\text{ºC}\right)\left(2830 \text{ºC}\right)\right]\\ 
& =& 4.8 \text{Ω.}\end{array} $$
</div>
**Discussion**

This value is consistent with the headlight resistance example
in [Ohm’s Law: Resistance and Simple Circuits](../contents/ch20OhmsLaw).

</div>

<div class="note" data-has-label="true"  class="interactive" data-label="" markdown="1">
<div class="title">
PhET Explorations: Resistance in a Wire
</div>
Learn about the physics of resistance in a wire. Change its resistivity, length, and area to see how they affect the wire\'s resistance. The sizes of the symbols in the equation change along with the diagram of a wire.
{: class="newline"}

<div class="media"  data-alt="resistance in a wire">
<iframe width="660" height="371.4" src="https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_en.html"></iframe>
</div>
</div>

### Section Summary

- The resistance $$R $$ of a cylinder of length $$L $$ and cross-sectional area
  $$A $$ is $$R=\frac{\rho L}{A} $$ , where $$\rho $$ is the resistivity of the
  material.
- Values of $$\rho $$ in [[Table 1]](#Table1) show that materials fall into
  three groups—_conductors, semiconductors, and insulators_.
- Temperature affects resistivity; for relatively small temperature changes
  $$\Delta T $$ , resistivity is $$\rho ={\rho }_{0}\left(1+\alpha \Delta
  T\right) $$ , where $${\rho }_{0} $$ is the original resistivity and
  $$\text{α} $$ is the temperature coefficient of resistivity.
- [[Table 2]](#Table2) gives values for $$\alpha $$ , the temperature
  coefficient of resistivity.
- The resistance $$R $$ of an object also varies with temperature:
  $$R={R}_{0}\left(1+\alpha \Delta T\right) $$ , where $${R}_{0} $$ is the
  original resistance, and $$R $$ is the resistance after the temperature
  change.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In which of the three semiconducting materials listed in [[Table 1]](#Table1) do impurities supply free charges? (Hint: Examine the range of resistivity for each and determine whether the pure semiconductor has the higher or lower conductivity.)

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Does the resistance of an object depend on the path current takes through it? Consider, for example, a rectangular bar—is its resistance the same along its length as across its width? (See [[Figure 4]](#Figure4).)

![Part a of the figure shows a voltage V applied along the length of a rectangular bar using a battery. The current is shown to emerge from the positive terminal, pass along the length of the rectangular bar, and enter the negative terminal of the battery. The resistance of the rectangular bar along the length is shown as R and the current is shown as I. Part b of the figure shows a voltage V applied along the width of the same rectangular bar using a battery. The current is shown to emerge from the positive terminal, pass along the width of the rectangular bar, and enter the negative terminal of the battery. The resistance of the rectangular bar along the width is shown as R prime, and the current is shown as I prime.](../resources/Figure_20_03_04.jpg 'Does current taking two different paths through the same object encounter different resistance?')
{: #Figure4}

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If aluminum and copper wires of the same length have the same resistance, which has the larger diameter? Why?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain why  $$R={R}_{0}\left(1+\alpha \Delta T\right) $$
 for the temperature variation of the resistance  $$R $$
 of an object is not as accurate as  $$\rho ={\rho }_{0}\left(1+\alpha \Delta T\right) $$ ,
 which gives the temperature variation of resistivity  $$\rho  $$.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the resistance of a 20.0-m-long piece of 12-gauge copper wire having a 2.053-mm diameter?

</div>
<div class="solution" markdown="1">
**Strategy**

Use the resistance formula $$R = \frac{\rho L}{A}$$, where $$\rho$$ is the resistivity of copper from [[Table 1]](#Table1). Calculate the cross-sectional area from the diameter.

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^{2} = \pi \left(\frac{2.053 \times 10^{-3} \text{ m}}{2}\right)^{2} = \pi (1.027 \times 10^{-3} \text{ m})^{2} = 3.31 \times 10^{-6} \text{ m}^{2}$$
</div>

Apply the resistance formula using $$\rho_{\text{copper}} = 1.72 \times 10^{-8} \text{ Ω}\cdot\text{m}$$:

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(1.72 \times 10^{-8} \text{ Ω}\cdot\text{m})(20.0 \text{ m})}{3.31 \times 10^{-6} \text{ m}^{2}} = 0.104 \text{ Ω}$$
</div>

**Discussion**

This resistance of about 0.1 Ω is typical for household wiring. 12-gauge wire is commonly used for 20-amp circuits in homes. The low resistance minimizes power loss and voltage drop across the wire, ensuring that appliances receive adequate voltage. For a 20-A current, this wire would dissipate $$P = I^{2}R = (20)^{2}(0.104) = 41.6$$ W over its 20-meter length, which is acceptable.

The resistance of the 12-gauge copper wire is 0.104 Ω.

</div>
</div>

<div id="Exercise2" class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The diameter of 0-gauge copper wire is 8.252 mm. Find the resistance of a 1.00-km length of such wire used for power transmission.

</div>
<div class="solution" markdown="1">
**Strategy**

We use the resistance formula $$R = \frac{\rho L}{A}$$, where $$\rho$$ is the resistivity of copper from [[Table 1]](#Table1). We need to calculate the cross-sectional area from the given diameter and convert all units to SI.

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^{2} = \pi \left(\frac{8.252 \times 10^{-3} \text{ m}}{2}\right)^{2} = \pi (4.126 \times 10^{-3} \text{ m})^{2} = 5.350 \times 10^{-5} \text{ m}^{2}$$
</div>

Apply the resistance formula using $$\rho_{\text{copper}} = 1.72 \times 10^{-8} \text{ Ω}\cdot\text{m}$$:

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(1.72 \times 10^{-8} \text{ Ω}\cdot\text{m})(1.00 \times 10^{3} \text{ m})}{5.350 \times 10^{-5} \text{ m}^{2}} = 0.322 \text{ Ω}$$
</div>

**Discussion**

This relatively low resistance of about a third of an ohm for a full kilometer of wire is why copper is preferred for power transmission. The thick 0-gauge wire (diameter about 8 mm) is used for high-current applications. Even this small resistance causes power loss in long transmission lines; for a 1000 A current, the power dissipated in this wire would be $$P = I^{2}R = (1000)^{2}(0.322) = 322$$ kW. This is why high-voltage, lower-current transmission is preferred for long distances.

The resistance of a 1.00-km length of 0-gauge copper wire is 0.322 Ω.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If the 0.100-mm diameter tungsten filament in a light bulb is to have a resistance of  $$0.200 \text{Ω} $$
 at  $$ 20.0\text{ºC} $$ ,
 how long should it be?

</div>
<div class="solution" markdown="1">
**Strategy**

Rearrange the resistance formula $$R = \frac{\rho L}{A}$$ to solve for length: $$L = \frac{RA}{\rho}$$. Use the resistivity of tungsten from [[Table 1]](#Table1).

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^{2} = \pi \left(\frac{0.100 \times 10^{-3} \text{ m}}{2}\right)^{2} = \pi (5.00 \times 10^{-5} \text{ m})^{2} = 7.85 \times 10^{-9} \text{ m}^{2}$$
</div>

Solve for length using $$\rho_{\text{tungsten}} = 5.6 \times 10^{-8} \text{ Ω}\cdot\text{m}$$:

<div class="equation">
$$L = \frac{RA}{\rho} = \frac{(0.200 \text{ Ω})(7.85 \times 10^{-9} \text{ m}^{2})}{5.6 \times 10^{-8} \text{ Ω}\cdot\text{m}} = 2.81 \text{ m}$$
</div>

**Discussion**

A filament length of 2.81 m seems long for a small light bulb, but this wire is extremely thin (0.1 mm diameter). The filament is coiled tightly, often in a double-coil configuration (a coil of a coil), to fit within the small bulb envelope. This coiling also helps retain heat and increases efficiency. The 0.200 Ω cold resistance will increase significantly when the filament heats to its operating temperature of around 2500-3000°C.

The tungsten filament should be 2.81 m long.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the diameter of aluminum to copper wire, if they have the same resistance per unit length (as they might in household wiring).

</div>
<div class="solution" markdown="1">
**Strategy**

For the same resistance per unit length, we set $$\frac{R}{L}$$ equal for both materials. Using $$R = \frac{\rho L}{A}$$ and $$A = \frac{\pi D^{2}}{4}$$ for a circular wire, we can derive a relationship between the diameters in terms of the resistivities.

**Solution**

The resistance per unit length is:

<div class="equation">
$$\frac{R}{L} = \frac{\rho}{A} = \frac{\rho}{\pi D^{2}/4} = \frac{4\rho}{\pi D^{2}}$$
</div>

Setting this equal for aluminum and copper:

<div class="equation">
$$\frac{4\rho_{\text{Al}}}{\pi D_{\text{Al}}^{2}} = \frac{4\rho_{\text{Cu}}}{\pi D_{\text{Cu}}^{2}}$$
</div>

Solving for the ratio of diameters:

<div class="equation">
$$\frac{D_{\text{Al}}^{2}}{D_{\text{Cu}}^{2}} = \frac{\rho_{\text{Al}}}{\rho_{\text{Cu}}}$$
</div>

<div class="equation">
$$\frac{D_{\text{Al}}}{D_{\text{Cu}}} = \sqrt{\frac{\rho_{\text{Al}}}{\rho_{\text{Cu}}}} = \sqrt{\frac{2.65 \times 10^{-8} \text{ Ω}\cdot\text{m}}{1.72 \times 10^{-8} \text{ Ω}\cdot\text{m}}} = \sqrt{1.541} = 1.24$$
</div>

**Discussion**

Aluminum wire must have a diameter 1.24 times larger (about 24% larger) than copper wire to have the same resistance per unit length. This is because aluminum has higher resistivity than copper. Despite needing thicker wire, aluminum is still widely used in power transmission because it is lighter and cheaper than copper. The larger diameter is acceptable for overhead power lines where weight (not size) is the limiting factor. For household wiring, copper is usually preferred because its smaller diameter allows for easier installation in walls and conduits.

The aluminum wire must have a diameter 1.24 times that of the copper wire to achieve the same resistance per unit length.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What current flows through a 2.54-cm-diameter rod of pure silicon that is 20.0 cm long, when  $$1.00 \times 10^{3} \text{V} $$
 is applied to it? (Such a rod may be used to make nuclear-particle detectors, for example.)

</div>
<div class="solution" markdown="1">
**Strategy**

First calculate the resistance of the silicon rod using $$R = \frac{\rho L}{A}$$, then use Ohm's law $$I = V/R$$ to find the current. Pure silicon has a very high resistivity ($$\rho = 2300 \text{ Ω}\cdot\text{m}$$ from [[Table 1]](#Table1)).

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^{2} = \pi \left(\frac{2.54 \times 10^{-2} \text{ m}}{2}\right)^{2} = \pi (1.27 \times 10^{-2} \text{ m})^{2} = 5.07 \times 10^{-4} \text{ m}^{2}$$
</div>

Calculate the resistance:

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(2300 \text{ Ω}\cdot\text{m})(0.200 \text{ m})}{5.07 \times 10^{-4} \text{ m}^{2}} = 9.07 \times 10^{5} \text{ Ω}$$
</div>

Calculate the current:

<div class="equation">
$$I = \frac{V}{R} = \frac{1.00 \times 10^{3} \text{ V}}{9.07 \times 10^{5} \text{ Ω}} = 1.10 \times 10^{-3} \text{ A} = 1.10 \text{ mA}$$
</div>

**Discussion**

Despite the high voltage (1000 V), only about 1 mA flows through the silicon rod because pure silicon is a semiconductor with very high resistivity—about 100 billion times higher than copper. This property makes silicon ideal for radiation detectors, where incoming particles create electron-hole pairs that produce brief current pulses. The high resistance ensures low background current, making these small signals detectable.

A current of 1.10 mA flows through the silicon rod.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) To what temperature must you raise a copper wire, originally at  $$20.0 \text{ºC} $$ ,
 to double its resistance, neglecting any changes in dimensions? (b) Does this happen in household wiring under ordinary circumstances?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the temperature dependence of resistance: $$R = R_{0}(1 + \alpha \Delta T)$$. For the resistance to double, we need $$R = 2R_{0}$$. We solve for $$\Delta T$$ and then find the final temperature.

**Solution**

**(a)** Set up the equation for doubling the resistance:

<div class="equation">
$$R = 2R_{0} = R_{0}(1 + \alpha \Delta T)$$
</div>

<div class="equation">
$$2 = 1 + \alpha \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{1}{\alpha} = \frac{1}{3.9 \times 10^{-3} \text{ /ºC}} = 256 \text{ ºC}$$
</div>

The final temperature is:

<div class="equation">
$$T = T_{0} + \Delta T = 20.0 \text{ ºC} + 256 \text{ ºC} = 276 \text{ ºC}$$
</div>

**(b)** No, this does not happen under ordinary circumstances. Household wiring should never reach anywhere near 276°C. Typical household wiring is rated for temperatures up to about 60-90°C. At 276°C, the wire insulation would have long since melted and likely caught fire. Copper's melting point is 1085°C, so the wire itself wouldn't melt, but the surrounding materials would be destroyed. If household wiring ever approached such temperatures, it would indicate a severe fault such as a dangerous overload or short circuit.

**Discussion**

This problem illustrates why overloaded circuits are fire hazards. A wire carrying too much current heats up due to $$P = I^{2}R$$ power dissipation. As it heats, its resistance increases, causing even more power dissipation and further heating—a positive feedback loop that can lead to thermal runaway. Circuit breakers and fuses are designed to interrupt the circuit before temperatures become dangerous.

(a) The copper wire must be raised to 276°C to double its resistance. (b) No, this temperature is never reached in properly functioning household wiring.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A resistor made of Nichrome wire is used in an application where its resistance cannot change more than 1.00% from its value at  $$ 20.0\text{ºC} $$ .
 Over what temperature range can it be used?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$R = R_{0}(1 + \alpha \Delta T)$$. For 1.00% change, we need $$|\alpha \Delta T| \leq 0.01$$. Solve for the maximum $$\Delta T$$ using the temperature coefficient for Nichrome ($$\alpha = 0.4 \times 10^{-3}$$ /ºC from [[Table 2]](#Table2)).

**Solution**

Set up the equation for 1% change:

<div class="equation">
$$|\alpha \Delta T| = 0.01$$
</div>

<div class="equation">
$$|\Delta T| = \frac{0.01}{\alpha} = \frac{0.01}{0.4 \times 10^{-3} \text{ /ºC}} = 25 \text{ ºC}$$
</div>

The temperature can vary by ±25°C from the reference temperature of 20.0°C:

<div class="equation">
$$T_{\text{min}} = 20.0 - 25 = -5 \text{ ºC}$$
</div>

<div class="equation">
$$T_{\text{max}} = 20.0 + 25 = 45 \text{ ºC}$$
</div>

**Discussion**

The allowable temperature range of -5°C to 45°C is quite practical for most indoor applications. Nichrome was chosen for this resistor because of its relatively small temperature coefficient compared to pure metals. Copper, for example, with $$\alpha = 3.9 \times 10^{-3}$$ /ºC, would only allow a ±2.6°C variation for the same 1% tolerance—impractical for most applications.

The Nichrome resistor can be used over the temperature range of -5°C to 45°C.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Of what material is a resistor made if its resistance is 40.0% greater at  $$100 \text{ºC} $$
 than at  $$ 20.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

A 40.0% increase in resistance means $$R = 1.40 R_{0}$$. Using the temperature dependence equation $$R = R_{0}(1 + \alpha \Delta T)$$, we can solve for the temperature coefficient $$\alpha$$ and identify the material from [[Table 2]](#Table2).

**Solution**

The temperature change is:

<div class="equation">
$$\Delta T = 100 \text{ ºC} - 20.0 \text{ ºC} = 80.0 \text{ ºC}$$
</div>

Set up the equation with $$R = 1.40 R_{0}$$:

<div class="equation">
$$1.40 R_{0} = R_{0}(1 + \alpha \Delta T)$$
</div>

<div class="equation">
$$1.40 = 1 + \alpha (80.0 \text{ ºC})$$
</div>

<div class="equation">
$$\alpha = \frac{0.40}{80.0 \text{ ºC}} = 5.0 \times 10^{-3} \text{ /ºC}$$
</div>

Comparing with [[Table 2]](#Table2), this value matches **iron**.

**Discussion**

Iron's temperature coefficient of $$5.0 \times 10^{-3}$$ /ºC is among the highest for common conductors. This relatively large temperature dependence makes iron unsuitable for precision resistors but useful for applications like resistance temperature detectors (RTDs). The 40% increase in resistance over 80°C is significant—this is why materials like Manganin or Constantan (with $$\alpha$$ near zero) are used when stable resistance is needed across temperature ranges.

The resistor is made of iron, which has a temperature coefficient of resistivity of $$5.0 \times 10^{-3}$$ /ºC.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electronic device designed to operate at any temperature in the range from  $$-10.0\text{ºC} \text{to} 55.0\text{ºC} $$
 contains pure carbon resistors. By what factor does their resistance increase over this range?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$R = R_{0}(1 + \alpha \Delta T)$$ with carbon's negative temperature coefficient ($$\alpha = -0.5 \times 10^{-3}$$ /ºC from [[Table 2]](#Table2)). Note that for carbon, resistance *decreases* with increasing temperature. We compare resistance at the two temperature extremes.

**Solution**

Using 20°C as the reference temperature, find the resistance at each extreme:

At -10°C ($$\Delta T = -30$$ °C):

<div class="equation">
$$R_{-10} = R_{0}[1 + (-0.5 \times 10^{-3})(-30)] = R_{0}(1 + 0.015) = 1.015 R_{0}$$
</div>

At 55°C ($$\Delta T = +35$$ °C):

<div class="equation">
$$R_{55} = R_{0}[1 + (-0.5 \times 10^{-3})(35)] = R_{0}(1 - 0.0175) = 0.9825 R_{0}$$
</div>

The factor by which resistance changes from lowest to highest temperature:

<div class="equation">
$$\text{Factor} = \frac{R_{-10}}{R_{55}} = \frac{1.015 R_{0}}{0.9825 R_{0}} = 1.03$$
</div>

**Discussion**

The resistance changes by only 3% over this 65°C temperature range. This is because carbon has a small (and negative) temperature coefficient. The resistance is highest at the cold extreme (-10°C) and lowest at the warm extreme (55°C). Carbon's negative coefficient means it behaves opposite to metals—its resistance decreases as temperature increases. This property, combined with carbon's small coefficient, makes carbon resistors useful in applications requiring moderate temperature stability.

The resistance increases by a factor of 1.03 (or about 3%) from the highest to lowest temperature in this range.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Of what material is a wire made, if it is 25.0 m long with a 0.100 mm diameter and has a resistance of  $$ 77.7 \Omega  $$
 at  $$ 20.0\text{ºC} $$ ?
 (b) What is its resistance at  $$150 \text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

For part (a), we rearrange $$R = \frac{\rho L}{A}$$ to solve for resistivity $$\rho$$, then compare with [[Table 1]](#Table1) to identify the material. For part (b), we use the temperature dependence $$R = R_{0}(1 + \alpha \Delta T)$$ with the appropriate temperature coefficient.

**Solution**

**(a)** Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^{2} = \pi \left(\frac{0.100 \times 10^{-3} \text{ m}}{2}\right)^{2} = \pi (5.00 \times 10^{-5} \text{ m})^{2} = 7.854 \times 10^{-9} \text{ m}^{2}$$
</div>

Solve for resistivity:

<div class="equation">
$$\rho = \frac{RA}{L} = \frac{(77.7 \text{ Ω})(7.854 \times 10^{-9} \text{ m}^{2})}{25.0 \text{ m}} = 2.44 \times 10^{-8} \text{ Ω}\cdot\text{m}$$
</div>

Comparing with [[Table 1]](#Table1), this resistivity matches **gold** ($$\rho = 2.44 \times 10^{-8}$$ Ω·m).

**(b)** Using the temperature coefficient for gold ($$\alpha = 3.4 \times 10^{-3}$$ /ºC from [[Table 2]](#Table2)):

<div class="equation">
$$\Delta T = 150 \text{ ºC} - 20.0 \text{ ºC} = 130 \text{ ºC}$$
</div>

<div class="equation">
$$R = R_{0}(1 + \alpha \Delta T) = 77.7 \text{ Ω} \left[1 + (3.4 \times 10^{-3} \text{ /ºC})(130 \text{ ºC})\right]$$
</div>

<div class="equation">
$$R = 77.7 \text{ Ω} (1 + 0.442) = 77.7 \text{ Ω} (1.442) = 112 \text{ Ω}$$
</div>

**Discussion**

The very thin wire (0.100 mm diameter) combined with a 25-meter length and relatively high resistance indicates a material with moderate resistivity. Gold is used for this type of wire in specialized applications requiring corrosion resistance and reliability, such as in aerospace and medical equipment. The 44% increase in resistance when heated to 150°C is significant and must be accounted for in precision circuits that operate over wide temperature ranges.

(a) The wire is made of gold. (b) At 150°C, its resistance is 112 Ω.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Assuming a constant temperature coefficient of resistivity, what is the maximum percent decrease in the resistance of a constantan wire starting at  $$ 20.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

The maximum decrease occurs at the lowest achievable temperature, which is absolute zero (-273.15°C or 0 K). Use $$R = R_{0}(1 + \alpha \Delta T)$$ with constantan's temperature coefficient ($$\alpha = 0.002 \times 10^{-3}$$ /ºC from [[Table 2]](#Table2)).

**Solution**

Calculate the temperature change to absolute zero:

<div class="equation">
$$\Delta T = -273.15 \text{ ºC} - 20.0 \text{ ºC} = -293 \text{ ºC}$$
</div>

Calculate the resistance at absolute zero:

<div class="equation">
$$R = R_{0}(1 + \alpha \Delta T) = R_{0}[1 + (0.002 \times 10^{-3})(-293)]$$
</div>

<div class="equation">
$$R = R_{0}(1 - 0.000586) = 0.99941 R_{0}$$
</div>

The percent decrease is:

<div class="equation">
$$\text{Percent decrease} = (1 - 0.99941) \times 100\% = 0.059\% \approx 0.06\%$$
</div>

**Discussion**

Constantan's resistance decreases by a mere 0.06% even when cooled from room temperature all the way to absolute zero! This extraordinarily small temperature coefficient is why constantan (a copper-nickel alloy) is specifically designed and named for making precision resistors with "constant" resistance. The alloy was engineered to have near-zero temperature dependence, making it invaluable for precision measurement equipment, resistance standards, and strain gauges where temperature stability is critical.

The maximum percent decrease in resistance is 0.06%.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A wire is drawn through a die, stretching it to four times its original length. By what factor does its resistance increase?

</div>
<div class="solution" markdown="1">
**Strategy**

When a wire is drawn (stretched), its volume remains constant (assuming the material is incompressible). If the length increases by a factor of 4, the cross-sectional area must decrease proportionally. We use $$R = \frac{\rho L}{A}$$ to find the new resistance.

**Solution**

Let the original length be $$L$$ and original area be $$A$$. The original resistance is:

<div class="equation">
$$R_{0} = \frac{\rho L}{A}$$
</div>

The volume is conserved during stretching:

<div class="equation">
$$V = LA = L'A'$$
</div>

With the new length $$L' = 4L$$:

<div class="equation">
$$LA = (4L)A' \implies A' = \frac{A}{4}$$
</div>

The new resistance is:

<div class="equation">
$$R' = \frac{\rho L'}{A'} = \frac{\rho (4L)}{A/4} = \frac{16 \rho L}{A} = 16 R_{0}$$
</div>

**Discussion**

The resistance increases by a factor of 16 when the wire is stretched to four times its original length. This dramatic increase occurs because resistance depends on both length and area—the length increases by a factor of 4 (increasing resistance) while the area decreases by a factor of 4 (also increasing resistance), giving a combined factor of $$4 \times 4 = 16$$. In general, stretching a wire by a factor of $$n$$ increases its resistance by a factor of $$n^{2}$$. This principle is important in wire manufacturing and explains why thin wires have much higher resistance than thick ones of the same material and length.

The resistance increases by a factor of 16.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A copper wire has a resistance of  $$ 0.500 \Omega  $$
 at  $$ 20.0\text{ºC} $$ ,
 and an iron wire has a resistance of  $$ 0.525 \Omega  $$
 at the same temperature. At what temperature are their resistances equal?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$R = R_{0}(1 + \alpha \Delta T)$$ for each metal and set them equal. Use temperature coefficients from [[Table 2]](#Table2): $$\alpha_{\text{Cu}} = 3.9 \times 10^{-3}$$ /ºC and $$\alpha_{\text{Fe}} = 5.0 \times 10^{-3}$$ /ºC.

**Solution**

Set the resistances equal:

<div class="equation">
$$R_{\text{Cu}} = R_{\text{Fe}}$$
</div>

<div class="equation">
$$R_{0,\text{Cu}}(1 + \alpha_{\text{Cu}} \Delta T) = R_{0,\text{Fe}}(1 + \alpha_{\text{Fe}} \Delta T)$$
</div>

<div class="equation">
$$0.500(1 + 3.9 \times 10^{-3} \Delta T) = 0.525(1 + 5.0 \times 10^{-3} \Delta T)$$
</div>

Expand and solve:

<div class="equation">
$$0.500 + 1.95 \times 10^{-3} \Delta T = 0.525 + 2.625 \times 10^{-3} \Delta T$$
</div>

<div class="equation">
$$0.500 - 0.525 = (2.625 - 1.95) \times 10^{-3} \Delta T$$
</div>

<div class="equation">
$$-0.025 = 0.675 \times 10^{-3} \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{-0.025}{0.675 \times 10^{-3}} = -37 \text{ ºC}$$
</div>

The temperature at which resistances are equal:

<div class="equation">
$$T = 20.0 + (-37) = -17 \text{ ºC}$$
</div>

**Discussion**

At -17°C, both wires have equal resistance. This occurs below room temperature because iron has a higher temperature coefficient than copper. Since iron's resistance changes faster with temperature, the resistances converge at a lower temperature where the initially higher iron resistance has decreased more than the copper. This problem illustrates that different materials can have equal resistance at a specific temperature even if they differ at other temperatures.

The resistances are equal at -17°C.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Digital medical thermometers determine temperature by measuring the resistance of a semiconductor device called a thermistor (which has  $$\alpha = - 0.0600/\text{ºC} $$ )
when it is at the same temperature as the patient. What is a patient's temperature if the thermistor's resistance at that temperature is 82.0% of its value at  $$ 37.0\text{ºC} $$
 (normal body temperature)? (b) The negative value for  $$\alpha  $$ may not be maintained for very low temperatures. Discuss why and whether this is the case here. (Hint: Resistance can't become negative.)

</div>
<div class="solution" markdown="1">
**Strategy**

For part (a), we use $$R = R_{0}(1 + \alpha \Delta T)$$ where $$R_{0}$$ is the resistance at 37.0°C (the reference temperature) and $$R = 0.820 R_{0}$$. Note that $$\Delta T = T - 37.0$$ where $$T$$ is the unknown patient temperature. For part (b), we analyze when the linear model breaks down.

**Solution**

**(a)** Set up the equation with $$R = 0.820 R_{0}$$:

<div class="equation">
$$0.820 R_{0} = R_{0}(1 + \alpha \Delta T)$$
</div>

<div class="equation">
$$0.820 = 1 + (-0.0600 \text{ /ºC})(\Delta T)$$
</div>

<div class="equation">
$$-0.180 = -0.0600 \text{ /ºC} \times \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{-0.180}{-0.0600 \text{ /ºC}} = 3.00 \text{ ºC}$$
</div>

The patient's temperature is:

<div class="equation">
$$T = 37.0 \text{ ºC} + 3.00 \text{ ºC} = 40.0 \text{ ºC}$$
</div>

**(b)** The negative temperature coefficient means resistance decreases as temperature increases. However, the linear model $$R = R_{0}(1 + \alpha \Delta T)$$ would predict zero resistance when $$1 + \alpha \Delta T = 0$$, which occurs at:

<div class="equation">
$$\Delta T = \frac{-1}{\alpha} = \frac{-1}{-0.0600} = 16.7 \text{ ºC}$$
</div>

This corresponds to $$T = 37.0 + 16.7 = 53.7$$ ºC above the reference, meaning at about 53.7°C the model would predict zero resistance, and below that temperature (going to even higher temperatures) negative resistance—which is physically impossible. However, in part (a), we found the patient is at 40.0°C, which is only 3°C above 37°C—well within the valid range of the linear model. For the expected range of human body temperatures (roughly 35-42°C), the linear approximation is acceptable.

**Discussion**

A temperature of 40.0°C (104°F) indicates a significant fever and would warrant medical attention. The thermistor's decreasing resistance with increasing temperature makes sense for semiconductors, where thermal energy frees more charge carriers. The 18% decrease in resistance for a 3°C temperature rise shows the high sensitivity of thermistors, which is why they are excellent for precise temperature measurements. Medical thermometers typically operate within a narrow temperature range where the linear approximation remains valid.

(a) The patient's temperature is 40.0°C (indicating a fever). (b) The linear model remains valid for this temperature since it is only 3°C above the reference temperature, well within the practical operating range.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

(a) Redo [[Exercise 2]](#Exercise2) taking into account the thermal expansion of
the tungsten filament. You may assume a thermal expansion coefficient of $$12
\times 10^{-6} /\text{ºC} $$ .
(b) By what percentage does your answer differ from that in the example?

</div>
<div class="solution" markdown="1">

**Strategy**

Thermal expansion affects resistance in two ways: (1) the length increases by factor $$(1 + \alpha \Delta T)$$, and (2) the cross-sectional area decreases because the diameter increases by the same factor, making $$A' = A(1 + \alpha \Delta T)^{-2}$$. The resistance formula becomes $$R' = \frac{\rho' L'}{A'}$$, where both the geometry and resistivity change with temperature. For this problem, we consider thermal expansion effects on the tungsten wire dimensions.

**Solution**

**(a)** When a wire undergoes thermal expansion with coefficient $$\alpha = 12 \times 10^{-6} \text{ /ºC}$$:

The new length is:
<div class="equation">
 $$L' = L(1 + \alpha \Delta T)$$
</div>

The new diameter is:
<div class="equation">
 $$D' = D(1 + \alpha \Delta T)$$
</div>

The new area is:
<div class="equation">
 $$A' = \pi (D'/2)^{2} = A(1 + \alpha \Delta T)^{2}$$
</div>

For resistance (assuming constant resistivity for this calculation):
<div class="equation">
 $$R' = \frac{\rho L'}{A'} = \frac{\rho L(1 + \alpha \Delta T)}{A(1 + \alpha \Delta T)^{2}} = \frac{\rho L}{A} \cdot \frac{1}{(1 + \alpha \Delta T)}$$
</div>

<div class="equation">
 $$R' = \frac{R}{(1 + \alpha \Delta T)}$$
</div>

For a typical operating temperature increase in a tungsten filament ($$\Delta T \approx 2500 \text{ ºC}$$):
<div class="equation">
 $$1 + \alpha \Delta T = 1 + (12 \times 10^{-6})(2500) = 1 + 0.030 = 1.030$$
</div>

If the room temperature resistance was 4.84 Ω (hypothetical reference value):
<div class="equation">
 $$R' = \frac{4.84}{1.030} = 4.70 \text{ Ω} \approx 4.7 \text{ Ω}$$
</div>

**(b)** The percentage difference is:
<div class="equation">
 $$\frac{4.84 - 4.70}{4.84} \times 100\% = \frac{0.14}{4.84} \times 100\% = 2.9\% \approx 3.0\%$$
</div>

**Discussion**

Part (a): Thermal expansion causes the wire to become longer and thinner, with competing effects on resistance. The length increase tends to increase resistance ($$R \propto L$$), while the area increase tends to decrease it ($$R \propto 1/A$$). However, area depends on diameter squared, so $$A \propto D^2 \propto (1 + \alpha \Delta T)^2$$, which means the area effect dominates, leading to a net decrease in resistance due to thermal expansion alone.

This 3% decrease might seem counterintuitive since we know tungsten filaments have much higher resistance when hot. However, this problem isolates only the geometric thermal expansion effect. In reality, the resistivity of tungsten increases dramatically with temperature (by a factor of 15-20), which completely overwhelms this small geometric decrease, resulting in the observed high hot resistance of filaments.

Part (b): The 3.0% decrease is relatively small, confirming that thermal expansion has a modest effect on resistance compared to the temperature coefficient of resistivity. For precision applications, both effects must be considered, but in most cases, the resistivity change dominates.

**Answer: (a) 4.7 Ω, (b) 3.0% decrease due to thermal expansion**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) To what temperature must you raise a resistor made of constantan to double
its resistance, assuming a constant temperature coefficient of resistivity? (b)
To cut it in half? (c) What is unreasonable about these results? (d) Which
assumptions are unreasonable, or which premises are inconsistent?

</div>
<div class="solution" markdown="1">
**Strategy**

We apply $$R = R_{0}(1 + \alpha \Delta T)$$ with the temperature coefficient for constantan ($$\alpha = 0.002 \times 10^{-3}$$ /ºC from [[Table 2]](#Table2)). For doubling, $$R = 2R_{0}$$; for halving, $$R = 0.5R_{0}$$.

**Solution**

**(a)** To double the resistance ($$R = 2R_{0}$$):

<div class="equation">
$$2 = 1 + \alpha \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{1}{\alpha} = \frac{1}{0.002 \times 10^{-3} \text{ /ºC}} = \frac{1}{2 \times 10^{-6} \text{ /ºC}} = 5.0 \times 10^{5} \text{ ºC}$$
</div>

Starting from 20°C: $$T = 20 + 500\,000 = 500\,020$$ ºC

**(b)** To halve the resistance ($$R = 0.5R_{0}$$):

<div class="equation">
$$0.5 = 1 + \alpha \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{-0.5}{\alpha} = \frac{-0.5}{2 \times 10^{-6} \text{ /ºC}} = -2.5 \times 10^{5} \text{ ºC}$$
</div>

Starting from 20°C: $$T = 20 - 250\,000 = -249\,980$$ ºC

**(c)** Both results are unreasonable:
- To double the resistance would require heating to 500,020°C, which is approximately 90 times hotter than the surface of the Sun (about 5,500°C). Constantan would vaporize long before reaching such temperatures—its melting point is around 1,220°C.
- To halve the resistance would require cooling to -249,980°C, which is about 250,000 degrees below absolute zero (-273.15°C). This is physically impossible since absolute zero is the lowest possible temperature.

**(d)** The unreasonable assumption is that the temperature coefficient of resistivity $$\alpha$$ remains constant over such extreme temperature ranges. The linear model $$R = R_{0}(1 + \alpha \Delta T)$$ is only valid for relatively small temperature changes (typically less than 100°C). For large temperature changes, the relationship between resistance and temperature becomes nonlinear, $$\alpha$$ itself changes with temperature, and at extreme temperatures, phase changes occur (melting, vaporization). Additionally, the premise of trying to significantly change constantan's resistance through temperature is fundamentally misguided—constantan is specifically designed and named for its nearly constant resistance over a wide temperature range.

**Discussion**

This problem illustrates why constantan and similar alloys (like Manganin) are valuable for precision resistors. Their extremely small temperature coefficients make their resistance nearly independent of temperature within normal operating ranges. Trying to double or halve their resistance through temperature change alone is essentially impossible under any realistic conditions.

(a) 500,020°C; (b) -249,980°C; (c) These temperatures are impossibly high and below absolute zero, respectively; (d) The assumption of constant $$\alpha$$ over extreme temperature ranges is invalid, and the linear model breaks down completely outside normal temperature ranges.

</div>
</div>

<div class="footnote-refs" markdown="1">
### Footnotes
{: class="footnote-refs-title"}

- {: class="footnote-ref" #footnote1} [1](#footnote-ref1){: class="
  footnote-ref-link"} <span class="footnote-ref-content">Values depend strongly
  on amounts and types of impurities</span>
- {: class="footnote-ref" #footnote2} [2](#footnote-ref2){: class="
  footnote-ref-link"} <span class="footnote-ref-content">Values at 20ºC.</span>
  { data-list-type="bulleted" data-bullet-style="none"}

</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

resistivity
: an intrinsic property of a material, independent of its shape or size,
directly proportional to the resistance, denoted by _ρ_

temperature coefficient of resistivity
: an empirical quantity, denoted by _α_, which describes the change in
resistance or resistivity of a material with temperature

</div>
