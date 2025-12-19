---
title: Electric Potential in a Uniform Electric Field
layout: page
sectionNumber: 2
chapterNumber: 19
---

<div class="abstract" markdown="1">
* Describe the relationship between voltage and electric field.
* Derive an expression for the electric potential and electric field.
* Calculate electric field strength given distance and voltage.
</div>

In the previous section, we explored the relationship between voltage and
energy. In this section, we will explore the relationship between voltage and
electric field. For example, a uniform electric field $$\vb{E} $$ is
produced by placing a potential difference (or voltage)  $$\Delta V $$ across
two parallel metal plates, labeled A and B. (See [[Figure 1]](#Figure1).)
Examining this will tell us what voltage is needed to produce a certain electric
field strength; it will also reveal a more fundamental relationship between
electric potential and electric field. From a physicist’s point of view, either
$$\Delta V $$ or $$\vb{E} $$ can be used to describe any charge
distribution. $$\Delta V $$ is most closely tied to energy, whereas
$$\vb{E} $$ is most closely related to force. $$\Delta V $$ is a **scalar**{: class="term"} quantity and has no direction, while
$$\vb{E} $$ is a **vector**{: class="term"} quantity, having both
magnitude and direction. (Note that the magnitude of the electric field
strength, a scalar quantity, is represented by $$E $$ below.) The relationship
between $$\Delta V $$ and $$\vb{E} $$ is revealed by calculating the
work done by the force in moving a charge from point A to point B. But, as noted
in [Electric Potential Energy: Potential Difference](../contents/ch19ElectricPotentialEnergy)
, this is complex for arbitrary charge distributions, requiring calculus. We
therefore look at a uniform electric field as an interesting special case.

![The figure shows two vertically oriented parallel plates A and B separated by a distance d. The plate A is positively charged and B is negatively charged. Electric field lines are parallel between the plates and curved at the ends of the plates. A charge q is moved from A to B. The work done W equals q times V sub A B, and the electric field intensity E equals V sub A B over d and potential difference delta V equals q times V sub A B.](../resources/Figure_19_02_01.jpg 'The relationship between ( V ) and ( E ) for parallel conducting plates is ( E=V/d ) . (Note that ( \\Delta V = V_{\\text{AB}} ) in magnitude. For a charge that is moved from plate A at higher potential to plate B at lower potential, a minus sign needs to be included as follows:  ( -\\Delta V = V_\\text{A} -V_\\text{B} = V_{\\text{AB}} ). See the text for details.)')
{: #Figure1}

The work done by the electric field in [[Figure 1]](#Figure1) to move a positive
charge $$q $$ from A, the positive plate, higher potential, to B, the negative plate, lower
potential, is

<div class="equation" >
 $$W= -\Delta \text{PE}= -q\Delta V. $$
</div>

The potential difference between points A and B is

<div class="equation" >
 $$-\Delta V= -\left({V}_{\text{B}}-{V}_{\text{A}}\right)={V}_{\text{A}}-{V}_{\text{B}}={V}_{\text{AB}}. $$
</div>

Entering this into the expression for work yields

<div class="equation" >
 $$W=qV_{\text{AB}}. $$
</div>

Work is $$W=Fd \cos \theta $$ ; here $$\cos \theta =1 $$ , since the path is
parallel to the field, and so $$W=Fd $$ . Since $$F=qE $$ , we see that $$W=qEd

$$
. Substituting this expression for work into the previous equation gives

<div class="equation" >
 $$qEd=qV_{\text{AB}}. $$
</div>

The charge cancels, and so the voltage between points A and B is seen to be

<div class="equation" >
$$

\begin{array}{c}
\begin{array}{c}
V*\text{AB}=Ed \\
E=\frac{ V*\text{AB} }{d}
\end{array}
\left( \text{uniform} E \text{-field only,} \right)  
\end{array} $$

</div>

where $$d $$ is the distance from A to B, or the distance between the plates
in [[Figure 1]](#Figure1). Note that the above equation implies the units for
electric field are volts per meter. We already know the units for electric field
are newtons per coulomb; thus the following relation among units is valid:

<div class="equation" >
 $$1 \text{N}/\text{C}=1 \text{V}/\text{m}. $$
</div>

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Voltage between Points A and B
</div>
<div class="equation" >
 $$\begin{array}{c}
\begin{array}{c}
V_\text{AB}=Ed\\ 
E=\frac{ V_\text{AB} }{d}
\end{array}
\text{uniform} E \text{- field only,}
\end{array} $$
</div>
where  $$d $$  is the distance from A to B, or the distance between the plates.

</div>

<div class="example" markdown="1">
<div class="title">
What Is the Highest Voltage Possible between Two Plates?
</div>
Dry air will support a maximum electric field strength of about  $$ 3.0 \times 10^{6}  \text{V/m} $$ .
 Above that value, the field creates enough ionization in the air to make the air a conductor. This allows a discharge or spark that reduces the field. What, then, is the maximum voltage between two parallel conducting plates separated by 2.5 cm of dry air?

**Strategy**

We are given the maximum electric field $$E $$ between the plates and the
distance $$d $$ between them. The equation $${V}_{\text{AB}}=Ed $$ can thus be
used to calculate the maximum voltage.

**Solution**

The potential difference or voltage between the plates is

<div class="equation" >
 $${\text{V}}_{\text{AB}}=Ed. $$
</div>
Entering the given values for  $$E $$  and  $$d $$  gives

<div class="equation" >
 $${V}_{\text{AB}}=\left( 3.0 \times 10^{6}  \text{V/m}\right)\left(0.025 m\right)= 7.5 \times 10^{4}  V $$
</div>
or

<div class="equation" >
 $${V}_{\text{AB}}=75 \text{kV}. $$
</div>
(The answer is quoted to only two digits, since the maximum field strength is approximate.)

**Discussion**

One of the implications of this result is that it takes about 75 kV to make a
spark jump across a 2.5 cm (1 in.) gap, or 150 kV for a 5 cm spark. This limits
the voltages that can exist between conductors, perhaps on a power transmission
line. A smaller voltage will cause a spark if there are points on the surface,
since points create greater fields than smooth surfaces. Humid air breaks down
at a lower field strength, meaning that a smaller voltage will make a spark jump
through humid air. The largest voltages can be built up, say with static
electricity, on dry days.

</div>

![The picture shows a spark chamber placed on a wooden base.](../resources/Figure_19_02_02.jpg 'A spark chamber is used to trace the paths of high-energy particles. Ionization created by the particles as they pass through the gas between the plates allows a spark to jump. The sparks are perpendicular to the plates, following electric field lines between them. The potential difference between adjacent plates is not high enough to cause sparks without the ionization produced by particles from accelerator experiments (or cosmic rays). (credit: Daderot, Wikimedia Commons)')
{: #Figure2}

<div class="example" markdown="1">
<div class="title">
Field and Force inside an Electron Gun
</div>
(a) An electron gun has parallel plates separated by 4.00 cm and gives electrons 25.0 keV of energy. What is the electric field strength between the plates? (b) What force would this field exert on a piece of plastic with a  $$0.500 \text{μC} $$
 charge that gets between the plates?

**Strategy**

Since the voltage and plate separation are given, the electric field strength
can be calculated directly from the expression $$E=\frac{ {V}_{\text{AB}}}{d} $$
. Once the electric field strength is known, the force on a charge is found
using $$\vb{F}=q \vb{E} $$ . Since the electric field is
in only one direction, we can write this equation in terms of the magnitudes,
$$F=q E $$.

**Solution for (a)**

The expression for the magnitude of the electric field between two uniform metal
plates is

<div class="equation" >
 $$E=\frac{ {V}_{\text{AB}}}{d}. $$
</div>
Since the electron is a single charge and is given 25.0 keV of energy, the potential difference must be 25.0 kV. Entering this value for  $${V}_{\text{AB}} $$
 and the plate separation of 0.0400 m, we obtain

<div class="equation" >
 $$E=\frac{25.0 \text{kV}}{0.0400 \text{m}}= 6.25 \times 10^{5}  \text{V/m}. $$
</div>
**Solution for (b)**

The magnitude of the force on a charge in an electric field is obtained from the
equation

<div class="equation" >
 $$F=qE. $$
</div>
Substituting known values gives

<div class="equation" >
 $$F=\left(0.500 \times 10^{-6} \text{C}\right)\left( 6.25 \times 10^{5}  \text{V/m}\right)=0.313 \text{N}. $$
</div>
**Discussion**

Note that the units are newtons, since $$1 \text{V/m}=1 \text{N/C} $$ . The
force on the charge is the same no matter where the charge is located between
the plates. This is because the electric field is uniform between the plates.

</div>

In more general situations, regardless of whether the electric field is uniform,
it points in the direction of decreasing potential, because the force on a
positive charge is in the direction of $$\vb{E} $$ and also in the
direction of lower potential $$V $$ . Furthermore, the magnitude of
$$\vb{E} $$ equals the rate of decrease of $$V $$ with distance. The
faster $$V $$ decreases over distance, the greater the electric field. In
equation form, the general relationship between voltage and electric field is

<div class="equation" >
 $$E= -\frac{\Delta V}{\Delta s}, $$
</div>

where $$\Delta s $$ is the distance over which the change in potential, $$\Delta
V $$ , takes place. The minus sign tells us that $$\vb{E} $$ points
in the direction of decreasing potential. The electric field is said to be
the **gradient** (as in grade or slope) of the electric potential.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Relationship between Voltage and Electric Field
</div>
In equation form, the general relationship between voltage and electric field is

<div class="equation" >
 $$E= -\frac{\Delta V}{\Delta s}, $$
</div>
where  $$\Delta s $$
 is the distance over which the change in potential,  $$\Delta V $$ ,
 takes place. The minus sign tells us that  $$\vb{E} $$
 points in the direction of decreasing potential. The electric field is said to be the **gradient** (as in grade or slope) of the electric potential.

</div>

For continually changing potentials, $$\Delta V $$ and $$\Delta s $$ become
infinitesimals and differential calculus must be employed to determine the
electric field.

### Section Summary

- The voltage between points A and B is
    <div class="equation" >
     $$ \begin{array}{c}
    \begin{array}{c}
    V_\text{AB}=Ed \\ 
    E=\frac{ V_\text{AB} }{d}
    \end{array}
    \left( \text{uniform} E \text{-field only,} \right)  
    \end{array} $$
    </div>
     where $$d $$ is the distance from A to B, or the distance between the plates.
- In equation form, the general relationship between voltage and electric field is
  <div class="equation" >
  $$E= -\frac{\Delta V}{\Delta s}, $$
  </div>
  where $$\Delta s $$ is the distance over which the change in potential, $$\Delta V $$ ,
  takes place. The minus sign tells us that $$\vb{E} $$ points in the direction of decreasing potential.) The electric field is said to be the **gradient** (as in grade or slope) of the electric potential.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Discuss how potential difference and electric field strength are related. Give an example.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is the strength of the electric field in a region where the electric potential is constant?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Will a negative charge, initially at rest, move toward higher or lower potential? Explain why.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
Show that units of V/m and N/C for electric field strength are indeed equivalent.

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
What is the strength of the electric field between two parallel conducting plates separated by 1.00 cm and having a potential difference (voltage) between them of  $$ 1.50 \times 10^{4}  V $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The electric field strength between two parallel conducting plates separated by 4.00 cm is  $$ 7.50 \times 10^{4}  \text{V/m} $$ .
 (a) What is the potential difference between the plates? (b) The plate with the lowest potential is taken to be at zero volts. What is the potential 1.00 cm from that plate (and 3.00 cm from the other)?

</div>
<div class="solution" markdown="1">
(a)  $$3.00 \text{kV} $$
(b)  $$750 \text{V} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How far apart are two conducting plates that have an electric field strength of  $$ 4.50 \times 10^{3}  \text{V/m} $$
 between them, if their potential difference is 15.0 kV?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Will the electric field strength between two parallel conducting plates exceed the breakdown strength for air ( $$ 3.0 \times 10^{6}  \text{V/m} $$ ) 
if the plates are separated by 2.00 mm and a potential difference of  $$ 5.0 \times 10^{3}  \text{V} $$
 is applied? (b) How close together can the plates be with this applied voltage?

</div>
<div class="solution"  markdown="1">
(a) No. The electric field strength between the plates is  $$ 2.5 \times 10^{6}  \text{V/m} \text{,}  $$
 which is lower than the breakdown strength for air ( $$ 3.0 \times 10^{6}  \text{V/m} $$ ).

(b) 1.7 mm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The voltage across a membrane forming a cell wall is 80.0 mV and the membrane is 9.00 nm thick. What is the electric field strength? (The value is surprisingly large, but correct. Membranes are discussed in [Capacitors and Dielectrics](./ch19CapacitorsAndDielectrics) and [Nerve Conduction—Electrocardiograms](./ch20NerveConductionElectrocardiograms).) You may assume a uniform electric field.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Membrane walls of living cells have surprisingly large electric fields across them due to separation of ions. (Membranes are discussed in some detail in [Nerve Conduction—Electrocardiograms](./ch20NerveConductionElectrocardiograms).) What is the voltage across an 8.00 nm–thick membrane if the electric field strength across it is 5.50 MV/m? You may assume a uniform electric field.

</div>
<div class="solution" markdown="1">
44.0 mV

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two parallel conducting plates are separated by 10.0 cm, and one of them is taken to be at zero volts. (a) What is the electric field strength between them, if the potential 8.00 cm from the zero volt plate (and 2.00 cm from the other) is 450 V? (b) What is the voltage between the plates?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the maximum potential difference between two parallel conducting plates separated by 0.500 cm of air, given the maximum sustainable electric field strength in air to be  $$ 3.0 \times 10^{6}  \text{V/m} $$.

</div>
<div class="solution" markdown="1">
 $$15 \text{kV} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A doubly charged ion is accelerated to an energy of 32.0 keV by the electric field between two parallel conducting plates separated by 2.00 cm. What is the electric field strength between the plates?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electron is to be accelerated in a uniform electric field having a strength of  $$ 2.00 \times 10^{6}  \text{V/m} $$ .
 (a) What energy in keV is given to the electron if it is accelerated through 0.400 m? (b) Over what distance would it have to be accelerated to increase its energy by 50.0 GeV?

</div>
<div class="solution" markdown="1">
(a)  $$800 \text{KeV} $$
(b)  $$25.0 \text{km} $$
</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

scalar
: physical quantity with magnitude but no direction

vector
: physical quantity with both magnitude and direction

</div>
