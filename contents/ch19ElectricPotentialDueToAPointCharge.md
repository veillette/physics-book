---
title: Electrical Potential Due to a Point Charge
layout: page
sectionNumber: 3
chapterNumber: 19
---

<div class="abstract" markdown="1">
* Explain point charges and express the equation for electric potential of a point charge.
* Distinguish between electric potential and electric field.
* Determine the electric potential of a point charge given charge and distance.
</div>

Point charges, such as electrons, are among the fundamental building blocks of
matter. Furthermore, spherical charge distributions (like on a metal sphere)
create external electric fields exactly like a point charge. The electric
potential due to a point charge is, thus, a case we need to consider. Using
calculus to find the work needed to move a test charge $$q $$ from a large
distance away to a distance of $$r $$ from a point charge $$Q $$ , and noting
the connection between work and potential $$\left(W= -q\Delta V\right) $$ , it
can be shown that the _electric potential $$V $$ of a point charge_ is

<div class="equation" >
 $$V=\frac{kQ}{r} \left(\text{Point Charge}\right), $$
</div>

where _k_ is a constant equal to $$ 9.0 \times 10^{9} \text{N} \text{·}
{\text{m}}^{2}\text{/}{\text{C}}^{2} $$.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Electric Potential  $$V $$ of a Point Charge
</div>
The electric potential  $$V $$  of a point charge is given by

<div class="equation" >
 $$V=\frac{kQ}{r} \left(\text{Point Charge}\right). $$
</div>
</div>

The potential at infinity is chosen to be zero. Thus $$V $$ for a point charge
decreases with distance, whereas $$\vb{E} $$ for a point charge
decreases with distance squared:

<div class="equation" >
 $$|\mag{E}|=\frac{|\mag{F}|}{q}=\frac{kQ}{ {r}^{2}}. $$
</div>

Recall that the electric potential $$V $$ is a scalar and has no direction,
whereas the electric field $$\vb{E} $$ is a vector. To find the
voltage due to a combination of point charges, you add the individual voltages
as numbers. To find the total electric field, you must add the individual fields
as **vectors**, taking magnitude and direction into account. This is consistent
with the fact that $$V $$ is closely associated with energy, a scalar, whereas
$$\vb{E} $$ is closely associated with force, a vector.

<div class="example" markdown="1">
<div class="title">
What Voltage Is Produced by a Small Charge on a Metal Sphere?
</div>
Charges in static electricity are typically in the nanocoulomb  $$\left(\text{nC}\right) $$
 to microcoulomb  $$\left(\text{µC}\right) $$
 range. What is the voltage 5.00 cm away from the center of a 1-cm diameter metal sphere that has a  $$-3.00 \text{nC} $$
 static charge?

**Strategy**

As we have discussed
in [Electric Charge and Electric Field](../contents/ch18ElectricChargeAndElectricField),
charge on a metal sphere spreads out uniformly and produces a field like that of
a point charge located at its center. Thus we can find the voltage using the
equation $$V=kQ/r $$.

**Solution**

Entering known values into the expression for the potential of a point charge,
we obtain

<div class="equation" >
 $$\begin{array}{lll}V& =& k\frac{Q}{r}\\ 
 V & =& \left( 8.99 \times 10^{9}  \text{N}·{\text{m}}^{2}/{\text{C}}^{2}\right)\left(\frac{-3.00 \times 10^{-9} \text{C}}{5.00 \times 10^{-2} \text{m}}\right)\\ 
 V & =& -539 \text{V} \text{.} \end{array} $$
</div>
**Discussion**

The negative value for voltage means a positive charge would be attracted from a
larger distance, since the potential is lower (more negative) than at larger
distances. Conversely, a negative charge would be repelled, as expected.

</div>

<div class="example" markdown="1">
<div class="title">
What Is the Excess Charge on a Van de Graaff Generator
</div>
A demonstration Van de Graaff generator has a 25.0 cm diameter metal sphere that produces a voltage of 100 kV near its surface. (See [[Figure 1]](#Figure1).) What excess charge resides on the sphere? (Assume that each numerical value here is shown with three significant figures.)

![The figure shows a Van de Graaff generator. The generator consists of a flat belt running over two metal pulleys. One pulley is positioned at the top and another at the bottom. The upper pulley is surrounded by an aluminum sphere. The aluminum sphere has a diameter of twenty five centimeters. Inside the sphere, the upper pulley is connected to a conductor which in turn is connected to a voltmeter for measuring the potential on the sphere. The lower pulley is connected to a motor. When the motor is switched on, the lower pulley begins turning the flat belt. The Van de Graaff generator with the above described setup produces a voltage of one hundred kilovolts. The potential on the surface of the sphere will be the same as that of a point charge at the center which is twelve point five centimeters away from the center. Thus the excess charge is calculated using the formula Q equals r times V divided by k.](../resources/Figure_19_03_01.jpg 'The voltage of this demonstration Van de Graaff generator is measured between the charged sphere and ground. Earth’s potential is taken to be zero as a reference. The potential of the charged conducting sphere is the same as that of an equal point charge at its center.')
{: #Figure1}

**Strategy**

The potential on the surface will be the same as that of a point charge at the
center of the sphere, 12.5 cm away. (The radius of the sphere is 12.5 cm.) We
can thus determine the excess charge using the equation

<div class="equation" >
 $$V=\frac{kQ}{r}. $$
</div>
**Solution**

Solving for $$Q $$ and entering known values gives

<div class="equation" >
 $$\begin{array}{lll}Q& =& \frac{r V}{k}\\ 
 Q& =& \frac{\left( 0.125 \text{m}\right)\left(100 \times 10^{3}  \text{V}\right)}{ 8.99 \times 10^{9}  \text{N}·{\text{m}}^{2}/{\text{C}}^{2}}\\ 
 Q & =& 1.39 \times 10^{-6} \text{C}=1.39 \text{µC.}\end{array} $$
</div>
**Discussion**

This is a relatively small charge, but it produces a rather large voltage. We
have another indication here that it is difficult to store isolated charges.

</div>

The voltages in both of these examples could be measured with a meter that
compares the measured potential with ground potential. Ground potential is often
taken to be zero (instead of taking the potential at infinity to be zero). It is
the potential difference between two points that is of importance, and very
often there is a tacit assumption that some reference point, such as Earth or a
very distant point, is at zero potential. As noted
in [Electric Potential Energy: Potential Difference](../contents/ch19ElectricPotentialEnergy)
, this is analogous to taking sea level as $$h=0 $$ when considering
gravitational potential energy, $${\text{PE}}_{g}= mgh $$.

### Section Summary

- Electric potential of a point charge is $$V=kQ/r $$ .

- Electric potential is a scalar, and electric field is a vector. Addition of
  voltages as numbers gives the voltage due to a combination of point charges,
  whereas addition of individual fields as vectors gives the total electric
  field.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In what region of space is the potential due to a uniformly charged sphere the same as that of a point charge? In what region does it differ from that of a point charge?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Can the potential of a non-uniformly charged sphere be the same as that of a point charge? Explain.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A 0.500 cm diameter plastic sphere, used in a static electricity demonstration, has a uniformly distributed 40.0 pC charge on its surface. What is the potential near its surface?

</div>
<div class="solution"  markdown="1">
**Strategy**

For a uniformly charged sphere, the electric potential at or outside its surface is the same as that of a point charge located at the center. We'll use $$V = kQ/r$$ where $$r$$ is the radius of the sphere.

**Solution**

*Known quantities:*
- Diameter: $$d = 0.500 \text{ cm}$$, so radius $$r = 0.250 \text{ cm} = 2.50 \times 10^{-3} \text{ m}$$
- Charge: $$Q = 40.0 \text{ pC} = 40.0 \times 10^{-12} \text{ C}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

Calculate the potential at the surface:

$$V = \frac{kQ}{r} = \frac{(8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2)(40.0 \times 10^{-12} \text{ C})}{2.50 \times 10^{-3} \text{ m}}$$

$$V = \frac{3.60 \times 10^{-1} \text{ V·m}}{2.50 \times 10^{-3} \text{ m}} = 144 \text{ V}$$

**Discussion**

This is a modest voltage that is easily achieved in static electricity demonstrations. The small charge (40 pC = 40 trillionths of a coulomb) produces 144 V because the sphere is so small. If you touched this sphere, you might feel a small shock as the charge redistributed. This illustrates how static electricity effects depend on both charge and geometry—the same charge on a larger sphere would produce a lower potential.

**The potential near the surface is 144 V.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the potential  $$ 0.530 \times 10^{-10} \text{m} $$
 from a proton (the average distance between the proton and electron in a hydrogen atom)?

</div>
<div class="solution" markdown="1">
**Strategy**

Use the point charge potential formula $$V = kQ/r$$ with the proton charge and the given distance (which is the Bohr radius $$a_0$$).

**Solution**

*Known quantities:*
- Distance: $$r = 0.530 \times 10^{-10} \text{ m} = 5.30 \times 10^{-11} \text{ m}$$ (Bohr radius)
- Proton charge: $$Q = +e = 1.60 \times 10^{-19} \text{ C}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

$$V = \frac{kQ}{r} = \frac{(8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2)(1.60 \times 10^{-19} \text{ C})}{5.30 \times 10^{-11} \text{ m}}$$

$$V = \frac{1.44 \times 10^{-9} \text{ V·m}}{5.30 \times 10^{-11} \text{ m}} = 27.2 \text{ V}$$

**Discussion**

The potential energy of the electron at this location is $$\text{PE} = qV = (-e)(27.2 \text{ V}) = -27.2 \text{ eV}$$. This is related to the ionization energy of hydrogen (13.6 eV) through the virial theorem. The electron in a hydrogen atom has both kinetic and potential energy, and the 27.2 eV potential energy value confirms we're at the correct atomic scale. This calculation shows why atomic energies are naturally expressed in electron volts—they correspond to voltages on the order of tens of volts.

**The potential at the Bohr radius is 27.2 V.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A sphere has a surface uniformly charged with 1.00 C. At what distance from its center is the potential 5.00 MV? (b) What does your answer imply about the practical aspect of isolating such a large charge?

</div>
<div class="solution"  markdown="1">
**Strategy**

Use the point charge potential formula $$V = kQ/r$$ and solve for distance $$r$$. Then analyze the practical implications.

**Solution**

**(a) Distance calculation:**

*Known quantities:*
- Charge: $$Q = 1.00 \text{ C}$$
- Potential: $$V = 5.00 \text{ MV} = 5.00 \times 10^{6} \text{ V}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

Solving $$V = kQ/r$$ for $$r$$:

$$r = \frac{kQ}{V} = \frac{(8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2)(1.00 \text{ C})}{5.00 \times 10^{6} \text{ V}}$$

$$r = \frac{8.99 \times 10^{9} \text{ m}}{5.00 \times 10^{6}} = 1.80 \times 10^{3} \text{ m} = 1.80 \text{ km}$$

**(b) Practical implications:**

A sphere of radius 1.80 km would be about 3.6 km (over 2 miles) in diameter! This is larger than many cities. The implications are:

1. **One coulomb is an enormous charge:** To maintain even a modest potential (5 MV is achievable in laboratories), you would need an impossibly large sphere.

2. **Charge limitations:** Real objects can only hold microcoulombs or less. A Van de Graaff generator, one of the highest-voltage laboratory devices, might hold microcoulombs on a meter-scale sphere.

3. **Breakdown limitations:** Even if you could build such a sphere, the electric field near its surface would be $$E = V/r = 5 \times 10^6/1800 \approx 2800$$ V/m, which is very weak. However, storing 1 C would require starting at an impossibly small sphere that would immediately discharge.

**Discussion**

This problem illustrates why the coulomb is such a large unit of charge for electrostatics. Lightning, which involves millions of volts, transfers only about 20-350 coulombs total (in pulses), and this causes massive destruction. One coulomb of isolated, static charge is essentially impossible to achieve.

**(a) The distance is 1.80 km from the center of the sphere.**

**(b) Isolating 1.00 C of charge is impractical because it would require a sphere nearly 2 km in radius just to limit the potential to 5 MV. One coulomb is a vastly larger charge than can realistically be accumulated in static electricity situations.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How far from a  $$1.00 \text{µC} $$
 point charge will the potential be 100 V? At what distance will it be  $$ 2.00 \times 10^{2}  \text{V}$$ ?
</div>
<div class="solution" markdown="1">
**Strategy**

Use $$V = kQ/r$$ and solve for $$r$$ at each potential value.

**Solution**

*Known quantities:*
- Charge: $$Q = 1.00 \text{ µC} = 1.00 \times 10^{-6} \text{ C}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

Solving for distance:

$$r = \frac{kQ}{V}$$

**For V = 100 V:**

$$r = \frac{(8.99 \times 10^{9})(1.00 \times 10^{-6})}{100} = \frac{8990}{100} = 89.9 \text{ m}$$

**For V = 200 V:**

$$r = \frac{(8.99 \times 10^{9})(1.00 \times 10^{-6})}{200} = \frac{8990}{200} = 45.0 \text{ m}$$

**Discussion**

Notice that doubling the potential halves the distance. This inverse relationship ($$r \propto 1/V$$) means that high potentials are only found close to the charge. The distances here (tens of meters) are surprisingly large, demonstrating that even a microcoulomb creates a measurable electric potential quite far away.

**At 100 V, the distance is 89.9 m. At 200 V, the distance is 45.0 m.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What are the sign and magnitude of a point charge that produces a potential of  $$-2.00 \text{V} $$
 at a distance of 1.00 mm?

</div>
<div class="solution"  markdown="1">
**Strategy**

The negative potential indicates a negative charge. Use $$V = kQ/r$$ and solve for $$Q$$.

**Solution**

*Known quantities:*
- Potential: $$V = -2.00 \text{ V}$$
- Distance: $$r = 1.00 \text{ mm} = 1.00 \times 10^{-3} \text{ m}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

$$Q = \frac{Vr}{k} = \frac{(-2.00 \text{ V})(1.00 \times 10^{-3} \text{ m})}{8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2} = -2.22 \times 10^{-13} \text{ C}$$

**Discussion**

The charge is negative (as expected from the negative potential) and very small—about 0.22 pC. The sign of the potential always matches the sign of the charge for a point charge.

**The charge is $$-2.22 \times 10^{-13}$$ C (negative, magnitude 0.222 pC).**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If the potential due to a point charge is  $$ 5.00 \times 10^{2}  \text{V} $$
 at a distance of 15.0 m, what are the sign and magnitude of the charge?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$V = kQ/r$$ and solve for $$Q$$. The positive potential indicates a positive charge.

**Solution**

*Known quantities:*
- Potential: $$V = 500 \text{ V}$$
- Distance: $$r = 15.0 \text{ m}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

$$Q = \frac{Vr}{k} = \frac{(500 \text{ V})(15.0 \text{ m})}{8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2} = \frac{7500}{8.99 \times 10^{9}} = 8.34 \times 10^{-7} \text{ C}$$

$$Q = +0.834 \text{ µC}$$

**Discussion**

The charge is positive (matching the positive potential) and is about 0.83 microcoulombs. This is a substantial static charge that could produce noticeable effects at this distance of 15 meters.

**The charge is $$+8.34 \times 10^{-7}$$ C or +0.834 µC.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In nuclear fission, a nucleus splits roughly in half. (a) What is the potential  $$ 2.00 \times 10^{-14} \text{m} $$
 from a fragment that has 46 protons in it? (b) What is the potential energy in MeV of a similarly charged fragment at this distance?

</div>
<div class="solution"  markdown="1">
**Strategy**

The fission fragment with 46 protons has a charge of $$+46e$$. Use $$V = kQ/r$$ for part (a). For part (b), the potential energy of a second identically charged fragment at this location is $$\text{PE} = qV = 46eV$$.

**Solution**

*Known quantities:*
- Number of protons: $$Z = 46$$
- Charge of fragment: $$Q = 46e = 46(1.60 \times 10^{-19} \text{ C}) = 7.36 \times 10^{-18} \text{ C}$$
- Distance: $$r = 2.00 \times 10^{-14} \text{ m}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

**(a) Electric potential:**

$$V = \frac{kQ}{r} = \frac{(8.99 \times 10^{9})(7.36 \times 10^{-18})}{2.00 \times 10^{-14}}$$

$$V = \frac{6.62 \times 10^{-8}}{2.00 \times 10^{-14}} = 3.31 \times 10^{6} \text{ V} = 3.31 \text{ MV}$$

**(b) Potential energy:**

For a second fragment with the same charge (46 protons):

$$\text{PE} = qV = (46e)(3.31 \times 10^{6} \text{ V})$$

$$\text{PE} = 46 \times (3.31 \times 10^{6} \text{ eV}) = 152 \times 10^{6} \text{ eV} = 152 \text{ MeV}$$

**Discussion**

This enormous potential energy (152 MeV) is the Coulomb repulsion energy between the two fission fragments when they are just separating. This energy is released as kinetic energy of the fragments as they fly apart, which is a major portion of the energy released in nuclear fission. The nuclear binding energy overcomes this Coulomb repulsion to hold the nucleus together, but once fission occurs, the Coulomb energy accelerates the fragments to high speeds.

**(a) The potential is $$3.31 \times 10^{6}$$ V or 3.31 MV.**

**(b) The potential energy is 152 MeV.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A research Van de Graaff generator has a 2.00-m-diameter metal sphere with a charge of 5.00 mC on it. (a) What is the potential near its surface? (b) At what distance from its center is the potential 1.00 MV? (c) An oxygen atom with three missing electrons is released near the Van de Graaff generator. What is its energy in MeV at this distance?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$V = kQ/r$$ for a spherical charge distribution. The potential at the surface uses the sphere's radius. For part (b), solve for $$r$$ at the specified potential. For part (c), the ion with charge $$+3e$$ gains energy equal to $$3eV$$ as it moves from 1.00 MV to ground.

**Solution**

*Known quantities:*
- Diameter: $$d = 2.00 \text{ m}$$, so radius $$R = 1.00 \text{ m}$$
- Charge: $$Q = 5.00 \text{ mC} = 5.00 \times 10^{-3} \text{ C}$$
- Coulomb constant: $$k = 8.99 \times 10^{9} \text{ N·m}^2/\text{C}^2$$

**(a) Potential at the surface:**

$$V = \frac{kQ}{R} = \frac{(8.99 \times 10^{9})(5.00 \times 10^{-3})}{1.00} = 4.50 \times 10^{7} \text{ V} = 45.0 \text{ MV}$$

**(b) Distance for 1.00 MV potential:**

$$r = \frac{kQ}{V} = \frac{(8.99 \times 10^{9})(5.00 \times 10^{-3})}{1.00 \times 10^{6}} = 45.0 \text{ m}$$

**(c) Energy of O³⁺ ion at 1.00 MV:**

An oxygen atom missing 3 electrons has charge $$q = +3e$$. If released near the surface (at 45.0 MV) and reaches the 1.00 MV distance:

$$\text{Energy} = q \Delta V = 3e \times (45.0 - 1.00) \text{ MV} = 3e \times 44.0 \text{ MV}$$

$$\text{Energy} = 132 \text{ MeV}$$

If released at 1.00 MV and accelerated to ground (0 V):

$$\text{Energy} = 3e \times 1.00 \text{ MV} = 3.00 \text{ MeV}$$

**Discussion**

The 45 MV surface potential is extremely high—research Van de Graaff generators can achieve such potentials. The triply ionized oxygen gains 3 eV per volt of potential difference, so at 1 MV it would have 3 MeV of kinetic energy. Such devices are used in nuclear physics research to accelerate ions to high energies.

**(a) The potential at the surface is 45.0 MV.**

**(b) The potential is 1.00 MV at a distance of 45.0 m from the center.**

**(c) The O³⁺ ion has 3.00 MeV of energy at this distance (relative to ground).**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electrostatic paint sprayer has a 0.200-m-diameter metal sphere at a potential of 25.0 kV that repels paint droplets onto a grounded object. (a) What charge is on the sphere? (b) What charge must a 0.100-mg drop of paint have to arrive at the object with a speed of 10.0 m/s?

</div>
<div class="solution"  markdown="1">
**Strategy**

For part (a), use $$V = kQ/r$$ to find the charge on the sphere. For part (b), use energy conservation: the electrical potential energy of the charged droplet at the sphere converts to kinetic energy at the grounded object.

**Solution**

**(a) Charge on the sphere:**

*Known quantities:*
- Diameter: $$d = 0.200 \text{ m}$$, radius $$r = 0.100 \text{ m}$$
- Potential: $$V = 25.0 \text{ kV} = 2.50 \times 10^{4} \text{ V}$$

$$Q = \frac{Vr}{k} = \frac{(2.50 \times 10^{4})(0.100)}{8.99 \times 10^{9}} = 2.78 \times 10^{-7} \text{ C}$$

**(b) Charge on paint droplet:**

*Known quantities:*
- Mass of droplet: $$m = 0.100 \text{ mg} = 1.00 \times 10^{-7} \text{ kg}$$
- Final speed: $$v = 10.0 \text{ m/s}$$

The droplet starts at the sphere's potential and ends at ground (0 V). Using energy conservation:

$$q \cdot V = \frac{1}{2}mv^2$$

$$q = \frac{mv^2}{2V} = \frac{(1.00 \times 10^{-7})(10.0)^2}{2(2.50 \times 10^{4})} = \frac{1.00 \times 10^{-5}}{5.00 \times 10^{4}} = 2.00 \times 10^{-10} \text{ C}$$

**Discussion**

The sphere carries a positive charge that repels the positively charged paint droplets. The droplet charge of 0.2 nC is very small but sufficient to accelerate the tiny droplet to 10 m/s over the potential difference. Electrostatic sprayers are efficient because the charged droplets are attracted to the grounded object, reducing overspray and improving coverage.

**(a) The charge on the sphere is $$2.78 \times 10^{-7}$$ C or 0.278 µC.**

**(b) The paint droplet must have a charge of $$2.00 \times 10^{-10}$$ C or 0.200 nC.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In one of the classic nuclear physics experiments at the beginning of the 20th century, an alpha particle was accelerated toward a gold nucleus, and its path was substantially deflected by the Coulomb interaction. If the energy of the doubly charged alpha nucleus was 5.00 MeV, how close to the gold nucleus (79 protons) could it come before being deflected?

</div>
<div class="solution" markdown="1">
**Strategy**

This is Rutherford's famous gold foil experiment. At the distance of closest approach, all of the alpha particle's kinetic energy has been converted to electrical potential energy. We use energy conservation: $$\text{KE}_{\text{initial}} = \text{PE}_{\text{final}} = \frac{kq_\alpha Q_{Au}}{r_{\text{min}}}$$.

**Solution**

*Known quantities:*
- Alpha particle charge: $$q_\alpha = 2e = 3.20 \times 10^{-19} \text{ C}$$
- Gold nucleus charge: $$Q_{Au} = 79e = 1.264 \times 10^{-17} \text{ C}$$
- Initial kinetic energy: $$\text{KE} = 5.00 \text{ MeV} = 5.00 \times 10^{6} \text{ eV} = 8.00 \times 10^{-13} \text{ J}$$

At closest approach:

$$\text{KE} = \frac{kq_\alpha Q_{Au}}{r_{\text{min}}}$$

$$r_{\text{min}} = \frac{kq_\alpha Q_{Au}}{\text{KE}} = \frac{(8.99 \times 10^{9})(3.20 \times 10^{-19})(1.264 \times 10^{-17})}{8.00 \times 10^{-13}}$$

$$r_{\text{min}} = \frac{3.64 \times 10^{-26}}{8.00 \times 10^{-13}} = 4.55 \times 10^{-14} \text{ m} = 45.5 \text{ fm}$$

**Discussion**

This distance (about 45 femtometers) is larger than the gold nucleus radius (~7 fm), so the alpha particle doesn't actually touch the nucleus—it's deflected purely by Coulomb repulsion. This was crucial for Rutherford's discovery: if alpha particles got close enough to "see" a concentrated nuclear charge, they would scatter at large angles, which is exactly what was observed. This experiment led to the nuclear model of the atom and proved that atoms have a small, dense, positively charged nucleus.

**The alpha particle can approach to within $$4.55 \times 10^{-14}$$ m (45.5 fm) of the gold nucleus.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the potential between two points situated 10 cm and 20 cm from a  $$ 3.0 µC $$
 point charge? (b) To what location should the point at 20 cm be moved to increase this potential difference by a factor of two?

</div>
<div class="solution" markdown="1">
**Strategy**

The potential difference between two points is $$\Delta V = V_1 - V_2 = kQ(1/r_1 - 1/r_2)$$. For part (b), we need to find the new position that doubles this difference.

**Solution**

**(a) Potential difference:**

*Known quantities:*
- Charge: $$Q = 3.0 \text{ µC} = 3.0 \times 10^{-6} \text{ C}$$
- $$r_1 = 10 \text{ cm} = 0.10 \text{ m}$$
- $$r_2 = 20 \text{ cm} = 0.20 \text{ m}$$

$$\Delta V = kQ\left(\frac{1}{r_1} - \frac{1}{r_2}\right) = (8.99 \times 10^{9})(3.0 \times 10^{-6})\left(\frac{1}{0.10} - \frac{1}{0.20}\right)$$

$$\Delta V = (2.70 \times 10^{4})(10 - 5) = (2.70 \times 10^{4})(5) = 1.35 \times 10^{5} \text{ V} = 135 \text{ kV}$$

**(b) New location for doubled potential difference:**

We want $$\Delta V' = 2 \times 135 = 270 \text{ kV}$$

$$270 \times 10^{3} = (8.99 \times 10^{9})(3.0 \times 10^{-6})\left(\frac{1}{0.10} - \frac{1}{r_2'}\right)$$

$$270 \times 10^{3} = (2.70 \times 10^{4})\left(10 - \frac{1}{r_2'}\right)$$

$$10 = 10 - \frac{1}{r_2'}$$

This gives $$\frac{1}{r_2'} = 0$$, meaning $$r_2' \rightarrow \infty$$

Alternatively, move the point closer: at $$r_2' = 0.133$$ m (13.3 cm):

$$\Delta V = (2.70 \times 10^{4})(10 - 7.5) = 67.5 \text{ kV}$$ (This gives half, not double)

To double, move farther away or closer to charge. The 20 cm point should move to **infinity** (or effectively very far away) or the 10 cm point adjusted. If we keep 10 cm fixed and move the outer point to 40 cm:

$$\Delta V = (2.70 \times 10^{4})(10 - 2.5) = 202 \text{ kV}$$ (not quite double)

Moving to infinity: $$\Delta V = (2.70 \times 10^{4})(10) = 270 \text{ kV}$$ ✓

**Discussion**

The potential difference can be doubled by moving the outer point to infinity (or at least very far away). This makes sense because the potential at 10 cm is 270 kV and at 20 cm is 135 kV, so the difference is 135 kV. At infinity, the potential is 0, making the difference 270 kV.

**(a) The potential difference is 135 kV.**

**(b) Moving the 20 cm point to infinity (or very far from the charge) will double the potential difference to 270 kV.**

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
**Unreasonable Results**

(a) What is the final speed of an electron accelerated from rest through a
voltage of 25.0 MV by a negatively charged Van de Graaff terminal?

(b) What is unreasonable about this result?

(c) Which assumptions are responsible?

</div>
<div class="solution"  markdown="1">
**Strategy**

This is an "Unreasonable Results" problem. We'll perform the classical (non-relativistic) calculation and identify why the result is physically impossible.

**Solution**

**(a) Classical calculation of electron speed:**

*Known quantities:*
- Voltage: $$V = 25.0 \text{ MV} = 2.50 \times 10^{7} \text{ V}$$
- Electron mass: $$m_e = 9.11 \times 10^{-31} \text{ kg}$$
- Electron charge: $$e = 1.60 \times 10^{-19} \text{ C}$$

Using energy conservation (classical):

$$\frac{1}{2}m_e v^2 = eV$$

$$v = \sqrt{\frac{2eV}{m_e}} = \sqrt{\frac{2(1.60 \times 10^{-19})(2.50 \times 10^{7})}{9.11 \times 10^{-31}}}$$

$$v = \sqrt{\frac{8.00 \times 10^{-12}}{9.11 \times 10^{-31}}} = \sqrt{8.78 \times 10^{18}} = 2.96 \times 10^{9} \text{ m/s}$$

**(b) What is unreasonable:**

This calculated velocity is about **10 times the speed of light** ($$c = 3.00 \times 10^{8}$$ m/s)! According to special relativity, nothing with mass can travel at or faster than the speed of light. This result violates fundamental physics.

**(c) Which assumptions are responsible:**

The unreasonable assumption is using **classical (Newtonian) mechanics** for a highly relativistic situation. Classical mechanics assumes:
- Kinetic energy = $$\frac{1}{2}mv^2$$
- Mass is constant

For electrons accelerated through 25 MV, the kinetic energy (25 MeV) is about 50 times the electron's rest mass energy (0.511 MeV). At such high energies, relativistic effects dominate:
- The electron's mass effectively increases
- The kinetic energy formula becomes $$KE = (\gamma - 1)m_0c^2$$
- The actual speed approaches but never reaches $$c$$

Using relativity, the electron's speed would be approximately $$0.9999c$$—very close to light speed, but never exceeding it.

**Discussion**

This problem illustrates the importance of recognizing when relativistic mechanics is necessary. A good rule of thumb: if the kinetic energy is comparable to or greater than the rest mass energy ($$m_0c^2 = 0.511$$ MeV for an electron), use relativistic formulas.

**(a) The classical calculation gives $$2.96 \times 10^{9}$$ m/s.**

**(b) This is unreasonable because it exceeds the speed of light, which is physically impossible.**

**(c) The assumption of classical mechanics fails here. Relativistic mechanics must be used when particles approach the speed of light. The 25 MeV kinetic energy far exceeds the electron's rest energy of 0.511 MeV.**

</div>
</div>
