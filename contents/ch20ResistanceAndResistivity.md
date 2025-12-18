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
**Strategy**

Use the resistance formula $$R = \rho L/A$$, where $$\rho$$ for copper is $$1.72 \times 10^{-8}$$ Ω·m. Calculate the cross-sectional area from the diameter.

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^2 = \pi \left(\frac{2.053 \times 10^{-3} \text{ m}}{2}\right)^2 = 3.310 \times 10^{-6} \text{ m}^2$$
</div>

Calculate resistance:

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(1.72 \times 10^{-8} \text{ Ω·m})(20.0 \text{ m})}{3.310 \times 10^{-6} \text{ m}^2} = 0.104 \text{ Ω}$$
</div>

**Discussion**

This resistance of 0.104 Ω for 20 m of 12-gauge wire is small but not negligible. In household circuits, this wire might carry 15-20 A, creating a voltage drop of $$V = IR = (15)(0.104) = 1.56$$ V and power loss of $$P = I^2R = (15)^2(0.104) = 23.4$$ W. This is why the National Electrical Code specifies maximum wire lengths for different gauge wires and load currents.

The resistance of the 20.0-m copper wire is 0.104 Ω.

</div>
</div>

<div id="Exercise2" class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The diameter of 0-gauge copper wire is 8.252 mm. Find the resistance of a 1.00-km length of such wire used for power transmission.

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$R = \rho L/A$$ with copper's resistivity. The larger diameter wire will have much lower resistance than 12-gauge wire.

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^2 = \pi \left(\frac{8.252 \times 10^{-3} \text{ m}}{2}\right)^2 = 5.35 \times 10^{-5} \text{ m}^2$$
</div>

Convert length to meters: $$L = 1.00 \text{ km} = 1000 \text{ m}$$

Calculate resistance:

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(1.72 \times 10^{-8} \text{ Ω·m})(1000 \text{ m})}{5.35 \times 10^{-5} \text{ m}^2} = 0.322 \text{ Ω}$$
</div>

**Discussion**

Even though this is 1 km of wire, the resistance is only 0.322 Ω because 0-gauge wire is very thick (diameter 8.252 mm, about 16 times the cross-sectional area of 12-gauge). This thick wire is used for high-current applications like battery cables and power transmission where minimizing resistance losses is critical. For comparison, 1 km of 12-gauge wire would have resistance of about 5.2 Ω—16 times higher.

The resistance of 1.00 km of 0-gauge copper wire is 0.322 Ω.

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

Rearrange $$R = \rho L/A$$ to solve for length: $$L = RA/\rho$$. Use tungsten's resistivity from Table 1 ($$5.6 \times 10^{-8}$$ Ω·m at 20°C).

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^2 = \pi \left(\frac{0.100 \times 10^{-3} \text{ m}}{2}\right)^2 = 7.85 \times 10^{-9} \text{ m}^2$$
</div>

Solve for length:

<div class="equation">
$$L = \frac{RA}{\rho} = \frac{(0.200 \text{ Ω})(7.85 \times 10^{-9} \text{ m}^2)}{5.6 \times 10^{-8} \text{ Ω·m}} = 2.81 \times 10^{-2} \text{ m} = 2.81 \text{ cm}$$
</div>

**Discussion**

The filament is only 2.81 cm long but is typically coiled into a compact helix to fit in the bulb. Note this is the cold resistance at 20°C; when operating at around 2800°C, the resistance increases dramatically (to about 4.8 Ω, as shown in a later example), causing the hot filament to draw much less current than when first turned on. The very thin diameter (0.1 mm = 100 μm, about the width of a human hair) is necessary to achieve high resistance in such a short length.

The tungsten filament should be 2.81 cm long.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the ratio of the diameter of aluminum to copper wire, if they have the same resistance per unit length (as they might in household wiring).

</div>
<div class="solution" markdown="1">
**Strategy**

For equal resistance per unit length, $$R/L = \rho/A$$ must be equal for both materials. Since $$A = \pi d^2/4$$, we can set up a ratio to find how the diameters compare.

**Solution**

For the resistance per unit length to be equal:

<div class="equation">
$$\frac{\rho_{\text{Al}}}{A_{\text{Al}}} = \frac{\rho_{\text{Cu}}}{A_{\text{Cu}}}$$
</div>

Substituting $$A = \pi d^2/4$$:

<div class="equation">
$$\frac{\rho_{\text{Al}}}{\pi d_{\text{Al}}^2/4} = \frac{\rho_{\text{Cu}}}{\pi d_{\text{Cu}}^2/4}$$
</div>

Simplifying:

<div class="equation">
$$\frac{\rho_{\text{Al}}}{d_{\text{Al}}^2} = \frac{\rho_{\text{Cu}}}{d_{\text{Cu}}^2}$$
</div>

<div class="equation">
$$\frac{d_{\text{Al}}^2}{d_{\text{Cu}}^2} = \frac{\rho_{\text{Al}}}{\rho_{\text{Cu}}}$$
</div>

<div class="equation">
$$\frac{d_{\text{Al}}}{d_{\text{Cu}}} = \sqrt{\frac{\rho_{\text{Al}}}{\rho_{\text{Cu}}}} = \sqrt{\frac{2.65 \times 10^{-8}}{1.72 \times 10^{-8}}} = \sqrt{1.54} = 1.24$$
</div>

**Discussion**

Aluminum wire must have a diameter 1.24 times (24% larger) than copper wire to have the same resistance per unit length. This is because aluminum has higher resistivity than copper. Despite needing larger diameter, aluminum is often used for power transmission because it is much lighter (density about 1/3 of copper) and cheaper, so the increased size is acceptable when weight and cost savings are priorities.

The ratio of aluminum to copper wire diameter is 1.24.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What current flows through a 2.54-cm-diameter rod of pure silicon that is 20.0 cm long, when  $$1.00 \times 10^{3} \text{V} $$
 is applied to it? (Such a rod may be used to make nuclear-particle detectors, for example.)

</div>
<div class="solution" markdown="1">
**Strategy**

First calculate the rod's resistance using $$R = \rho L/A$$ with silicon's resistivity ($$\rho = 2300$$ Ω·m from Table 1, noting silicon is a semiconductor). Then use Ohm's law to find the current.

**Solution**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^2 = \pi \left(\frac{2.54 \times 10^{-2} \text{ m}}{2}\right)^2 = 5.07 \times 10^{-4} \text{ m}^2$$
</div>

Calculate resistance (using $$\rho_{\text{silicon}} = 2300$$ Ω·m):

<div class="equation">
$$R = \frac{\rho L}{A} = \frac{(2300 \text{ Ω·m})(0.200 \text{ m})}{5.07 \times 10^{-4} \text{ m}^2} = 9.07 \times 10^{5} \text{ Ω}$$
</div>

Calculate current using Ohm's law:

<div class="equation">
$$I = \frac{V}{R} = \frac{1.00 \times 10^{3} \text{ V}}{9.07 \times 10^{5} \text{ Ω}} = 1.10 \times 10^{-3} \text{ A} = 1.10 \text{ mA}$$
</div>

**Discussion**

The very small current (1.10 mA) despite the high voltage (1000 V) reflects silicon's high resistivity as a semiconductor—about 100 billion times higher than copper! This property makes silicon ideal for controlling current flow in transistors and other semiconductor devices. Pure silicon is actually used in particle detectors where the high resistance minimizes noise while still allowing particle-induced ionization to create detectable signals.

The current flowing through the silicon rod is $$1.10 \times 10^{-3}$$ A (1.10 mA).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) To what temperature must you raise a copper wire, originally at  $$20.0 \text{ºC} $$ ,
 to double its resistance, neglecting any changes in dimensions? (b) Does this happen in household wiring under ordinary circumstances?

</div>
<div class="solution" markdown="1">
**Strategy**

Use the temperature-dependence formula $$R = R_0(1 + \alpha \Delta T)$$. For resistance to double, we need $$R = 2R_0$$, which gives $$2 = 1 + \alpha \Delta T$$. Solve for the temperature change and final temperature.

**Solution for (a)**

Setting up the equation for doubled resistance:

<div class="equation">
$$\frac{R}{R_0} = 1 + \alpha \Delta T = 2$$
</div>

<div class="equation">
$$\alpha \Delta T = 1$$
</div>

Using copper's temperature coefficient $$\alpha = 3.9 \times 10^{-3} \text{/ºC}$$:

<div class="equation">
$$\Delta T = \frac{1}{\alpha} = \frac{1}{3.9 \times 10^{-3} \text{/ºC}} = 256 \text{ºC}$$
</div>

Final temperature: $$T = T_0 + \Delta T = 20.0 \text{ºC} + 256 \text{ºC} = 276 \text{ºC}$$

**Solution for (b)**

Normal household wiring should never reach anywhere near 276°C. Wire insulation typically has maximum ratings around 60-90°C for standard wire, and at 276°C the insulation would have long since melted and burned.

**Discussion**

(a) The copper wire must be heated to 276°C (549°F) to double its resistance.

(b) No, this should never happen under ordinary circumstances. If household wiring reached such temperatures, it would indicate a serious problem: overloaded circuits, loose connections creating high-resistance joints, or short circuits. Circuit breakers are designed to trip before wires overheat to dangerous levels. The National Electrical Code limits wire temperatures to ensure safety margins, and properly functioning circuits keep wire temperatures within 10-20°C of ambient temperature.

(a) The wire must be raised to 276°C. (b) No, household wiring should never approach this temperature under ordinary circumstances.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A resistor made of Nichrome wire is used in an application where its resistance cannot change more than 1.00% from its value at  $$ 20.0\text{ºC} $$ .
 Over what temperature range can it be used?

</div>
<div class="solution" markdown="1">
**Strategy**

The resistance change is given by $$\Delta R/R_0 = \alpha \Delta T$$. For a 1.00% maximum change, we need $$|\alpha \Delta T| \leq 0.01$$. Solve for the allowable $$\Delta T$$ using Nichrome's temperature coefficient.

**Solution**

From Table 2, Nichrome has $$\alpha = 0.4 \times 10^{-3} \text{/ºC}$$.

For $$|\alpha \Delta T| \leq 0.01$$:

<div class="equation">
$$|\Delta T| \leq \frac{0.01}{\alpha} = \frac{0.01}{0.4 \times 10^{-3} \text{/ºC}} = 25 \text{ºC}$$
</div>

Since the reference temperature is 20.0°C, the allowable range is:

<div class="equation">
$$T_{\text{min}} = 20.0 - 25 = -5 \text{ºC}$$
</div>

<div class="equation">
$$T_{\text{max}} = 20.0 + 25 = 45 \text{ºC}$$
</div>

**Discussion**

Nichrome is specifically chosen for heating elements and resistors because its temperature coefficient is very low (about 10× smaller than copper's). This allows the resistor to maintain nearly constant resistance over the operating range of -5°C to 45°C—a span of 50°C with only 2% total variation in resistance. For applications requiring even more stability, constantan or manganin (with even lower temperature coefficients) would be used.

The Nichrome resistor can be used in the temperature range from -5°C to 45°C.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Of what material is a resistor made if its resistance is 40.0% greater at  $$100 \text{ºC} $$
 than at  $$ 20.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$R = R_0(1 + \alpha \Delta T)$$ where $$R/R_0 = 1.40$$ (40% greater). Solve for $$\alpha$$ and compare to Table 2 values.

**Solution**

Given that resistance is 40.0% greater:

<div class="equation">
$$\frac{R}{R_0} = 1.40 = 1 + \alpha \Delta T$$
</div>

<div class="equation">
$$\alpha \Delta T = 0.40$$
</div>

With $$\Delta T = 100 - 20 = 80 \text{ºC}$$:

<div class="equation">
$$\alpha = \frac{0.40}{80 \text{ºC}} = 5.0 \times 10^{-3} \text{/ºC}$$
</div>

Comparing to Table 2, this matches **iron**, which has $$\alpha = 5.0 \times 10^{-3} \text{/ºC}$$.

**Discussion**

Iron has one of the highest temperature coefficients among common metals, making it useful in applications where you want resistance to change noticeably with temperature (like resistance temperature detectors or RTDs). The 40% increase from 20°C to 100°C is substantial—a 1.00-Ω iron resistor would become a 1.40-Ω resistor, which would significantly affect current flow in a circuit.

The resistor is made of iron.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electronic device designed to operate at any temperature in the range from  $$-10.0\text{ºC} \text{to} 55.0\text{ºC} $$
 contains pure carbon resistors. By what factor does their resistance increase over this range?

</div>
<div class="solution" markdown="1">
**Strategy**

Calculate the resistance ratio using $$R/R_0 = (1 + \alpha \Delta T)$$ for both temperature extremes, relative to the reference temperature of 20°C. Carbon has a negative temperature coefficient.

**Solution**

From Table 2, carbon has $$\alpha = -0.5 \times 10^{-3} \text{/ºC}$$.

At -10.0°C ($$\Delta T = -30$$ °C from 20°C):

<div class="equation">
$$\frac{R_{-10}}{R_{20}} = 1 + \alpha \Delta T = 1 + (-0.5 \times 10^{-3})(-30) = 1 + 0.015 = 1.015$$
</div>

At 55.0°C ($$\Delta T = +35$$ °C from 20°C):

<div class="equation">
$$\frac{R_{55}}{R_{20}} = 1 + \alpha \Delta T = 1 + (-0.5 \times 10^{-3})(35) = 1 - 0.0175 = 0.9825$$
</div>

The factor by which resistance increases from the minimum to maximum:

<div class="equation">
$$\frac{R_{-10}}{R_{55}} = \frac{1.015}{0.9825} = 1.03$$
</div>

**Discussion**

The resistance increases by only 3% over this 65°C temperature range. Interestingly, carbon has a negative temperature coefficient—its resistance decreases as temperature increases, opposite to metals. At -10°C the resistance is higher, and at 55°C it's lower. This makes carbon useful for temperature compensation in circuits because it can partially offset the positive temperature coefficient of metal components.

The carbon resistors' resistance increases by a factor of 1.03 over the operating temperature range.

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

(a) Calculate the resistivity using $$\rho = RA/L$$ and compare to Table 1 to identify the material.

(b) Use $$R = R_0(1 + \alpha \Delta T)$$ with the appropriate temperature coefficient.

**Solution for (a)**

Calculate the cross-sectional area:

<div class="equation">
$$A = \pi r^2 = \pi \left(\frac{0.100 \times 10^{-3} \text{ m}}{2}\right)^2 = 7.85 \times 10^{-9} \text{ m}^2$$
</div>

Calculate resistivity:

<div class="equation">
$$\rho = \frac{RA}{L} = \frac{(77.7 \text{ Ω})(7.85 \times 10^{-9} \text{ m}^2)}{25.0 \text{ m}} = 2.44 \times 10^{-8} \text{ Ω·m}$$
</div>

Comparing to Table 1, this is very close to **gold** ($$\rho = 2.44 \times 10^{-8}$$ Ω·m).

**Solution for (b)**

Using gold's temperature coefficient $$\alpha = 3.4 \times 10^{-3} \text{/ºC}$$:

<div class="equation">
$$R = R_0(1 + \alpha \Delta T) = 77.7 \text{ Ω}[1 + (3.4 \times 10^{-3})(150 - 20)]$$
</div>

<div class="equation">
$$R = 77.7 \text{ Ω}[1 + (3.4 \times 10^{-3})(130)] = 77.7 \text{ Ω}[1 + 0.442] = 77.7 \times 1.442 = 112 \text{ Ω}$$
</div>

**Discussion**

(a) The wire is made of gold. Despite gold's reputation as an excellent conductor, it's actually less conductive than copper or silver. Gold is valued for electrical connections because it doesn't corrode or oxidize.

(b) At 150°C, the resistance increases to 112 Ω—a 44% increase. This significant change demonstrates why operating temperature must be considered in circuit design, especially for precision applications.

(a) The wire is made of gold. (b) The resistance at 150°C is 112 Ω.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Assuming a constant temperature coefficient of resistivity, what is the maximum percent decrease in the resistance of a constantan wire starting at  $$ 20.0\text{ºC} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

Constantan has an extremely small temperature coefficient ($$\alpha = 0.002 \times 10^{-3} \text{/ºC}$$). The maximum decrease occurs at the lowest achievable temperature. Assuming we could cool to near absolute zero (about -273°C from 20°C), calculate the maximum possible resistance decrease.

**Solution**

Maximum temperature decrease from 20°C: $$\Delta T \approx -293$$ °C (to near 0 K)

Using constantan's coefficient:

<div class="equation">
$$\frac{\Delta R}{R_0} = \alpha \Delta T = (0.002 \times 10^{-3} \text{/ºC})(-293 \text{ºC}) = -5.9 \times 10^{-4}$$
</div>

This equals approximately -0.06% (decrease).

**Discussion**

Constantan's temperature coefficient is exceptionally small—about 2000 times smaller than copper's. Even cooling from room temperature to near absolute zero only changes its resistance by 0.06%. This remarkable temperature stability makes constantan (a copper-nickel alloy) ideal for precision resistors and resistance standards that must maintain their values regardless of temperature. The slightly positive coefficient also means resistance decreases slightly as temperature drops.

The maximum percent decrease in resistance for constantan is approximately 0.06%.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A wire is drawn through a die, stretching it to four times its original length. By what factor does its resistance increase?

</div>
<div class="solution" markdown="1">
**Strategy**

When wire is drawn through a die, its volume remains constant ($$V = AL = \text{constant}$$). If length increases by factor 4, area must decrease by factor 4. Use $$R = \rho L/A$$ to find how resistance changes.

**Solution**

Let the original length and area be $$L_0$$ and $$A_0$$.

After stretching: $$L = 4L_0$$

Since volume is constant: $$A_0 L_0 = A L = A (4L_0)$$

Therefore: $$A = \frac{A_0}{4}$$

Original resistance: $$R_0 = \frac{\rho L_0}{A_0}$$

New resistance: $$R = \frac{\rho L}{A} = \frac{\rho (4L_0)}{A_0/4} = \frac{16 \rho L_0}{A_0} = 16 R_0$$

<div class="equation">
$$\frac{R}{R_0} = 16$$
</div>

**Discussion**

The resistance increases by a factor of 16—not 4! This is because stretching the wire both increases its length (which increases resistance) AND decreases its cross-sectional area (which also increases resistance). The combined effect is that resistance scales as the square of the length change factor: $$(4)^2 = 16$$. This is why wire manufacturers must carefully control wire dimensions—small changes in drawing can significantly affect resistance.

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

Both wires change resistance with temperature according to $$R = R_0(1 + \alpha \Delta T)$$. Find the temperature where both resistance expressions are equal.

**Solution**

For copper at temperature T: $$R_{\text{Cu}} = 0.500[1 + (3.9 \times 10^{-3})(T - 20)]$$

For iron at temperature T: $$R_{\text{Fe}} = 0.525[1 + (5.0 \times 10^{-3})(T - 20)]$$

Setting them equal:

<div class="equation">
$$0.500[1 + 0.0039(T - 20)] = 0.525[1 + 0.0050(T - 20)]$$
</div>

Expanding:

<div class="equation">
$$0.500 + 0.00195(T - 20) = 0.525 + 0.002625(T - 20)$$
</div>

<div class="equation">
$$0.500 - 0.525 = 0.002625(T - 20) - 0.00195(T - 20)$$
</div>

<div class="equation">
$$-0.025 = 0.000675(T - 20)$$
</div>

<div class="equation">
$$T - 20 = \frac{-0.025}{0.000675} = -37.0 \text{ºC}$$
</div>

<div class="equation">
$$T = 20 - 37 = -17 \text{ºC}$$
</div>

**Discussion**

The resistances are equal at -17°C. Iron has a higher temperature coefficient than copper, so its resistance changes more rapidly with temperature. Starting from 20°C where iron has higher resistance (0.525 Ω vs 0.500 Ω), cooling causes iron's resistance to drop faster than copper's until they meet at -17°C. Below this temperature, copper would actually have the higher resistance. This principle is used in temperature-compensated circuits.

The copper and iron wire resistances are equal at -17°C.

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

(a) Use the resistance-temperature relationship. We're given that $$R_T = 0.820 R_{37}$$, and we know the reference is 37.0°C (body temperature).

(b) Consider what happens mathematically when resistance approaches zero.

**Solution for (a)**

Using the temperature dependence formula with reference temperature 37.0°C:

<div class="equation">
$$R_T = R_{37}[1 + \alpha(T - 37.0)]$$
</div>

Given $$R_T/R_{37} = 0.820$$:

<div class="equation">
$$0.820 = 1 + (-0.0600)(T - 37.0)$$
</div>

<div class="equation">
$$-0.180 = -0.0600(T - 37.0)$$
</div>

<div class="equation">
$$T - 37.0 = \frac{0.180}{0.0600} = 3.00 \text{ºC}$$
</div>

<div class="equation">
$$T = 37.0 + 3.00 = 40.0 \text{ºC}$$
</div>

**Solution for (b)**

If $$\alpha$$ remained constant at $$-0.060$$/°C, resistance would reach zero when:

$$0 = 1 + (-0.060)(T - 37)$$, giving $$T - 37 = 16.7$$ °C, or $$T = 53.7$$ °C.

**Discussion**

(a) The patient's temperature is 40.0°C (104°F), indicating a fever. The resistance decreased because the thermistor has a negative temperature coefficient—its resistance drops as temperature rises.

(b) The linear approximation would predict zero resistance at 53.7°C, which is physically impossible (and would imply negative resistance above that temperature). In reality, the temperature coefficient itself changes with temperature, and the linear model breaks down. For the patient's 40°C reading, we're still in a reasonable range where the linear approximation works well. Thermistors are typically calibrated with empirically-determined equations that account for this nonlinearity.

(a) The patient's temperature is 40.0°C. (b) The constant negative $$\alpha$$ model would predict zero resistance at about 54°C, which is impossible. The model is valid for the measured temperature but would need modification for more extreme temperatures.

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

This problem integrates thermal expansion with resistance change. The filament length and area both change with temperature, affecting the final resistance calculation.

(a) Calculate how length and area change, then incorporate these into the resistance formula.

(b) Compare to the result that ignored thermal expansion.

**Solution for (a)**

From Example 2, the tungsten filament operates at 2850°C with cold (20°C) values.

Thermal expansion coefficient: $$\alpha_{\text{thermal}} = 12 \times 10^{-6} \text{/ºC}$$

Temperature change: $$\Delta T = 2850 - 20 = 2830$$ °C

New length: $$L = L_0(1 + \alpha_{\text{thermal}} \Delta T) = L_0[1 + (12 \times 10^{-6})(2830)] = 1.034 L_0$$

For area (expanding in two dimensions): $$A = A_0(1 + 2\alpha_{\text{thermal}} \Delta T) = A_0[1 + 2(12 \times 10^{-6})(2830)] = 1.068 A_0$$

The resistance with thermal expansion is:

<div class="equation">
$$R = \rho \frac{L}{A} = \rho_0(1 + \alpha_{\text{resistivity}} \Delta T) \times \frac{L_0(1.034)}{A_0(1.068)}$$
</div>

Using tungsten's $$\alpha_{\text{resistivity}} = 4.5 \times 10^{-3} \text{/ºC}$$:

<div class="equation">
$$R = R_0 \times [1 + (4.5 \times 10^{-3})(2830)] \times \frac{1.034}{1.068} = R_0 \times (13.74) \times (0.968) = 13.3 R_0$$
</div>

With $$R_0 = 0.350$$ Ω (from Example 2): $$R = 13.3 \times 0.350 = 4.7$$ Ω

**Solution for (b)**

Without thermal expansion (Example 2): $$R = 4.8$$ Ω

Percent decrease: $$\frac{4.8 - 4.7}{4.8} \times 100\% = 2.1\%$$ or approximately 3.0%

**Discussion**

(a) Accounting for thermal expansion gives a resistance of 4.7 Ω at operating temperature.

(b) This is about 3.0% lower than the 4.8 Ω calculated without thermal expansion. The expansion increases both length (increasing R) and area (decreasing R), but the area effect wins since it scales with 2α while length scales with α, resulting in a net decrease in resistance compared to the non-expansion calculation.

(a) The resistance including thermal expansion is 4.7 Ω. (b) This is about 3.0% less than the answer that ignored thermal expansion.

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

Use $$R = R_0(1 + \alpha \Delta T)$$ to find the required temperature changes, then evaluate whether the results are physically reasonable.

**Solution for (a)**

To double resistance ($$R = 2R_0$$):

<div class="equation">
$$2 = 1 + \alpha \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{1}{\alpha} = \frac{1}{0.002 \times 10^{-3} \text{/ºC}} = 500,000 \text{ºC}$$
</div>

Final temperature: $$T = 20 + 500,000 = 500,020$$ °C

**Solution for (b)**

To halve resistance ($$R = 0.5R_0$$):

<div class="equation">
$$0.5 = 1 + \alpha \Delta T$$
</div>

<div class="equation">
$$\Delta T = \frac{-0.5}{\alpha} = \frac{-0.5}{0.002 \times 10^{-3} \text{/ºC}} = -250,000 \text{ºC}$$
</div>

Final temperature: $$T = 20 - 250,000 = -249,980$$ °C

**Solution for (c)**

Both results are completely unreasonable:
- 500,020°C is far above the melting point of any known material (tungsten melts at ~3400°C)
- -249,980°C is below absolute zero (-273.15°C), which is physically impossible

**Solution for (d)**

The unreasonable assumption is that the temperature coefficient remains constant over such extreme temperature ranges. Constantan was specifically designed to have an extremely small $$\alpha$$, making it excellent for precision resistors that maintain stable resistance over normal operating temperatures. However, this same property means that significant resistance changes would require impossibly extreme temperatures. Additionally, the linear model $$R = R_0(1 + \alpha \Delta T)$$ is only valid for relatively small temperature changes.

**Discussion**

This problem illustrates why constantan is prized for applications requiring temperature-stable resistance. Its tiny temperature coefficient makes resistance nearly independent of temperature under normal conditions, but also means the linear model predicts absurd temperatures for significant resistance changes.

(a) 500,020°C to double resistance. (b) -249,980°C to halve resistance. (c) Both temperatures are physically impossible. (d) The assumption of constant $$\alpha$$ over extreme temperature ranges, and the use of a linear model, are unreasonable.

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
