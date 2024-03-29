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

![A cylindrical conductor of length L and cross section A is shown. The resistivity of the cylindrical section is represented as rho. The resistance of this cross section R is equal to rho L divided by A. The section of length L of cylindrical conductor is shown equivalent to a resistor represented by symbol R.](../resources/Figure_20_03_01.jpg "A uniform cylinder of length \( L \) and cross-sectional area \( A \) . Its resistance to the flow of current is similar to the resistance posed by a pipe to fluid flow. The longer the cylinder, the greater its resistance. The larger its cross-sectional area \( A \) , the smaller its resistance.")
{: #Figure1}

For a given shape, the resistance depends on the material of which the object is
composed. Different materials offer different resistance to the flow of charge.
We define the **resistivity**  $$\rho $$ of a substance so that the **resistance**  $$R $$ of an object is directly proportional to $$\rho $$ .
Resistivity $$\rho $$ is an *intrinsic* property of a material,
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
** close to zero (to three digits on the scale in [[Table 2]](#Table2)), and so
its resistivity varies only slightly with temperature. This is useful for making
a temperature-independent resistance standard, for example.

![A graph for variation of resistance R with temperature T for a mercury sample is shown. The temperature T is plotted along the x axis and is measured in Kelvin, and the resistance R is plotted along the y axis and is measured in ohms. The curve starts at x equals zero and y equals zero, and coincides with the X axis until the value of temperature is four point two Kelvin, known as the critical temperature T sub c. At temperature T sub c, the curve shows a vertical rise, represented by a dotted line, until the resistance is about zero point one one ohms. After this temperature the resistance shows a nearly linear increase with temperature T.](../resources/Figure_20_03_02.jpg "The resistance of a sample of mercury is zero at very low temperatures&#x2014;it is a superconductor up to about 4.2 K. Above that critical temperature, its resistance makes a sudden jump and then increases nearly linearly with temperature.")
{: #Figure2}

<table id="Table2" aria-describedby="Table 21_03_02"><caption><span class="title">Tempature Coefficients of Resistivity    $$\alpha  $$     </span></caption><thead><tr>
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

![A photograph showing two digital thermometers used for measuring body temperature.](../resources/Figure_20_03_03.jpg "These familiar thermometers are based on the automated measurement of a thermistor&#x2019;s temperature-dependent resistance. (credit: Biol, Wikimedia Commons)")
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
$${R}_{0}=0.350 \text{Ω} $$ , and the temperature change is $$\Delta T=2830
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

* The resistance $$R $$ of a cylinder of length $$L $$ and cross-sectional area
  $$A $$ is $$R=\frac{\rho L}{A} $$ , where $$\rho $$ is the resistivity of the
  material.
* Values of $$\rho $$ in [[Table 1]](#Table1) show that materials fall into
  three groups—*conductors, semiconductors, and insulators*.
* Temperature affects resistivity; for relatively small temperature changes
  $$\Delta T $$ , resistivity is $$\rho ={\rho }_{0}\left(1+\alpha \Delta
  T\right) $$ , where $${\rho }_{0} $$ is the original resistivity and
  $$\text{α} $$ is the temperature coefficient of resistivity.
* [[Table 2]](#Table2) gives values for $$\alpha $$ , the temperature
  coefficient of resistivity.
* The resistance $$R $$ of an object also varies with temperature:
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

![Part a of the figure shows a voltage V applied along the length of a rectangular bar using a battery. The current is shown to emerge from the positive terminal, pass along the length of the rectangular bar, and enter the negative terminal of the battery. The resistance of the rectangular bar along the length is shown as R and the current is shown as I. Part b of the figure shows a voltage V applied along the width of the same rectangular bar using a battery. The current is shown to emerge from the positive terminal, pass along the width of the rectangular bar, and enter the negative terminal of the battery. The resistance of the rectangular bar along the width is shown as R prime, and the current is shown as I prime.](../resources/Figure_20_03_04.jpg "Does current taking two different paths through the same object encounter different resistance?")
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
 $$0.104 \text{Ω} $$
</div>
</div>

<div id="Exercise2" class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The diameter of 0-gauge copper wire is 8.252 mm. Find the resistance of a 1.00-km length of such wire used for power transmission.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If the 0.100-mm diameter tungsten filament in a light bulb is to have a resistance of  $$0.200 \text{Ω} $$
 at  $$ 20.0\text{ºC} $$ ,
 how long should it be?

</div>
<div class="solution" markdown="1">
 $$ 2.81  \text{m} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the diameter of aluminum to copper wire, if they have the same resistance per unit length (as they might in household wiring).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What current flows through a 2.54-cm-diameter rod of pure silicon that is 20.0 cm long, when  $$1.00 \times 10^{3} \text{V} $$
 is applied to it? (Such a rod may be used to make nuclear-particle detectors, for example.)

</div>
<div class="solution" markdown="1">
 $$ 1.10 \times 10^{-3}  \text{A} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) To what temperature must you raise a copper wire, originally at  $$20.0 \text{ºC} $$ ,
 to double its resistance, neglecting any changes in dimensions? (b) Does this happen in household wiring under ordinary circumstances?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A resistor made of Nichrome wire is used in an application where its resistance cannot change more than 1.00% from its value at  $$ 20.0\text{ºC} $$ .
 Over what temperature range can it be used?

</div>
<div class="solution" markdown="1">
 $$-5º\text{C to 45ºC} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Of what material is a resistor made if its resistance is 40.0% greater at  $$100 \text{ºC} $$
 than at  $$ 20.0\text{ºC} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electronic device designed to operate at any temperature in the range from  $$-10.0\text{ºC} \text{to} 55.0\text{ºC} $$
 contains pure carbon resistors. By what factor does their resistance increase over this range?

</div>
<div class="solution" markdown="1">
1.03

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Of what material is a wire made, if it is 25.0 m long with a 0.100 mm diameter and has a resistance of  $$ 77.7 \Omega  $$
 at  $$ 20.0\text{ºC} $$ ?
 (b) What is its resistance at  $$150 \text{ºC} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Assuming a constant temperature coefficient of resistivity, what is the maximum percent decrease in the resistance of a constantan wire starting at  $$ 20.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
0.06%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A wire is drawn through a die, stretching it to four times its original length. By what factor does its resistance increase?

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
 $$-17 \text{ºC} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Digital medical thermometers determine temperature by measuring the resistance of a semiconductor device called a thermistor (which has  $$\alpha = - 0.0600/\text{ºC} $$ ) 
when it is at the same temperature as the patient. What is a patient’s temperature if the thermistor’s resistance at that temperature is 82.0% of its value at  $$ 37.0\text{ºC} $$
 (normal body temperature)? (b) The negative value for  $$\alpha  $$ may not be maintained for very low temperatures. Discuss why and whether this is the case here. (Hint: Resistance can’t become negative.)

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
(a)  $$ 4.7 \Omega  $$
 (total)

(b) 3.0% decrease

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
</div>

<div class="footnote-refs" markdown="1">
### Footnotes
{: class="footnote-refs-title"}

* {: class="footnote-ref" #footnote1} [1](#footnote-ref1){: class="
  footnote-ref-link"} <span class="footnote-ref-content">Values depend strongly
  on amounts and types of impurities</span>
* {: class="footnote-ref" #footnote2} [2](#footnote-ref2){: class="
  footnote-ref-link"} <span class="footnote-ref-content">Values at 20ºC.</span>
  { data-list-type="bulleted" data-bullet-style="none"}

</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

resistivity
: an intrinsic property of a material, independent of its shape or size,
directly proportional to the resistance, denoted by *ρ*

temperature coefficient of resistivity
: an empirical quantity, denoted by *α*, which describes the change in
resistance or resistivity of a material with temperature

</div>
