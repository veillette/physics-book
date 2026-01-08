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
parallel to the field, and so $$W=Fd $$ . Since $$F=qE $$ , we see that $$W=qEd $$
. Substituting this expression for work into the previous equation gives

<div class="equation" >
 $$qEd=qV_{\text{AB}}. $$
</div>

The charge cancels, and so the voltage between points A and B is seen to be

<div class="equation" >
$$

\begin{array}{c}
\begin{array}{c}
V_\text{AB}=Ed \\
E=\frac{ V_\text{AB} }{d}
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

where $$\Delta s $$ is the distance over which the change in potential, $$\Delta V $$ , takes place. The minus sign tells us that $$\vb{E} $$ points
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
<div class="solution" markdown="1">
**Strategy**

To show that V/m and N/C are equivalent, we'll use dimensional analysis. We need to express volts in terms of more fundamental SI units and show that V/m reduces to N/C.

**Solution**

Start with the definition of the volt. One volt is one joule per coulomb:

$$1 \text{ V} = 1 \frac{\text{J}}{\text{C}}$$

The joule can be expressed in terms of base SI units. Energy equals force times distance:

$$1 \text{ J} = 1 \text{ N} \cdot \text{m}$$

Substituting this into the expression for volts:

$$1 \text{ V} = 1 \frac{\text{N} \cdot \text{m}}{\text{C}}$$

Now, express V/m:

$$1 \frac{\text{V}}{\text{m}} = 1 \frac{\text{N} \cdot \text{m}}{\text{C} \cdot \text{m}} = 1 \frac{\text{N}}{\text{C}}$$

Therefore:

$$\boxed{1 \text{ V/m} = 1 \text{ N/C}}$$

**Discussion**

This equivalence makes physical sense because the electric field can be defined in two ways:

1. **Force per unit charge:** $$E = F/q$$, which gives units of N/C
2. **Potential drop per unit distance:** $$E = -\Delta V/\Delta s$$, which gives units of V/m

Both definitions describe the same physical quantity—the electric field strength. The equivalence of units confirms the consistency of our definitions. The N/C form emphasizes the force aspect of electric fields, while V/m emphasizes the energy/potential aspect. Use whichever is more convenient for the problem at hand.

**V/m and N/C are equivalent units: 1 V/m = 1 N/C.**

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
What is the strength of the electric field between two parallel conducting plates separated by 1.00 cm and having a potential difference (voltage) between them of  $$ 1.50 \times 10^{4}  V $$ ?

</div>
<div class="solution" markdown="1">
**Strategy**

For a uniform electric field between parallel plates, the relationship between voltage and field is $$V = Ed$$, where $$d$$ is the plate separation. We'll solve this for $$E$$ and substitute the given values.

**Solution**

*Known quantities:*
- Plate separation: $$d = 1.00 \text{ cm} = 0.0100 \text{ m}$$
- Potential difference: $$V = 1.50 \times 10^{4} \text{ V}$$

Using the relationship for a uniform field:

$$E = \frac{V}{d} = \frac{1.50 \times 10^{4} \text{ V}}{0.0100 \text{ m}}$$

$$E = 1.50 \times 10^{6} \text{ V/m}$$

**Discussion**

This is a strong electric field—about half the breakdown strength of air ($$3.0 \times 10^{6}$$ V/m). Such fields are used in particle accelerators and high-voltage equipment. The field is uniform between the plates (except near the edges), meaning a charged particle would experience the same force anywhere between the plates. Note that if we increased the voltage much more (or decreased the plate spacing), we would exceed air's breakdown strength and get a spark.

**The electric field strength is $$1.50 \times 10^{6}$$ V/m or 1.50 MV/m.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The electric field strength between two parallel conducting plates separated by 4.00 cm is  $$ 7.50 \times 10^{4}  \text{V/m} $$ .
 (a) What is the potential difference between the plates? (b) The plate with the lowest potential is taken to be at zero volts. What is the potential 1.00 cm from that plate (and 3.00 cm from the other)?

</div>
<div class="solution" markdown="1">
**Strategy**

For parallel plates with a uniform electric field, the potential varies linearly with distance. For part (a), we use $$V = Ed$$ to find the total potential difference. For part (b), we recognize that potential increases linearly from the zero-volt plate, so we can use the same relationship with the distance from that plate.

**Solution**

*Known quantities:*
- Plate separation: $$d = 4.00 \text{ cm} = 0.0400 \text{ m}$$
- Electric field strength: $$E = 7.50 \times 10^{4} \text{ V/m}$$

**(a) Potential difference between plates:**

$$V = Ed = (7.50 \times 10^{4} \text{ V/m})(0.0400 \text{ m}) = 3000 \text{ V} = 3.00 \text{ kV}$$

**(b) Potential at 1.00 cm from the zero-volt plate:**

Since the field is uniform, the potential increases linearly with distance from the grounded (zero-volt) plate.

Distance from zero-volt plate: $$x = 1.00 \text{ cm} = 0.0100 \text{ m}$$

$$V_x = Ex = (7.50 \times 10^{4} \text{ V/m})(0.0100 \text{ m}) = 750 \text{ V}$$

**Discussion**

The potential increases uniformly from 0 V at the grounded plate to 3000 V at the other plate. At 1.00 cm (one-quarter of the way across), the potential is one-quarter of the total: 750 V. This linear relationship makes calculations straightforward for uniform fields. The field points from high potential to low potential (from the 3 kV plate toward the 0 V plate), and has the same magnitude everywhere between the plates.

**(a) The potential difference between the plates is 3.00 kV.**

**(b) The potential 1.00 cm from the zero-volt plate is 750 V.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How far apart are two conducting plates that have an electric field strength of  $$ 4.50 \times 10^{3}  \text{V/m} $$
 between them, if their potential difference is 15.0 kV?

</div>
<div class="solution" markdown="1">
**Strategy**

Using the relationship $$V = Ed$$ for a uniform electric field, we solve for the plate separation $$d$$.

**Solution**

*Known quantities:*
- Electric field strength: $$E = 4.50 \times 10^{3} \text{ V/m}$$
- Potential difference: $$V = 15.0 \text{ kV} = 15,000 \text{ V}$$

Solving $$V = Ed$$ for $$d$$:

$$d = \frac{V}{E} = \frac{15,000 \text{ V}}{4.50 \times 10^{3} \text{ V/m}} = 3.33 \text{ m}$$

**Discussion**

This is a large plate separation of over 3 meters. The electric field strength is relatively modest (about 0.15% of air's breakdown strength), which is why such a large separation is needed to achieve 15 kV. This might be encountered in high-voltage transmission equipment where large clearances are maintained for safety. Compare this to a typical spark plug, which has a gap of about 1 mm and operates at around 20–40 kV, producing a field near air's breakdown limit.

**The plates are 3.33 m apart.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Will the electric field strength between two parallel conducting plates exceed the breakdown strength for air ( $$ 3.0 \times 10^{6}  \text{V/m} $$ )
if the plates are separated by 2.00 mm and a potential difference of  $$ 5.0 \times 10^{3}  \text{V} $$
 is applied? (b) How close together can the plates be with this applied voltage?

</div>
<div class="solution"  markdown="1">
**Strategy**

For part (a), calculate the electric field using $$E = V/d$$ and compare to the breakdown strength. For part (b), find the minimum separation by setting $$E$$ equal to the breakdown strength and solving for $$d$$.

**Solution**

**(a) Check for breakdown:**

*Known quantities:*
- Plate separation: $$d = 2.00 \text{ mm} = 2.00 \times 10^{-3} \text{ m}$$
- Potential difference: $$V = 5.0 \times 10^{3} \text{ V}$$
- Breakdown strength of air: $$E_{\text{breakdown}} = 3.0 \times 10^{6} \text{ V/m}$$

Calculate the electric field:

$$E = \frac{V}{d} = \frac{5.0 \times 10^{3} \text{ V}}{2.00 \times 10^{-3} \text{ m}} = 2.5 \times 10^{6} \text{ V/m}$$

Comparing to breakdown strength:

$$E = 2.5 \times 10^{6} \text{ V/m} < E_{\text{breakdown}} = 3.0 \times 10^{6} \text{ V/m}$$

**No, the field does not exceed breakdown strength.**

**(b) Minimum separation:**

The minimum separation occurs when the electric field equals the breakdown strength:

$$E_{\text{breakdown}} = \frac{V}{d_{\text{min}}}$$

$$d_{\text{min}} = \frac{V}{E_{\text{breakdown}}} = \frac{5.0 \times 10^{3} \text{ V}}{3.0 \times 10^{6} \text{ V/m}} = 1.67 \times 10^{-3} \text{ m} = 1.7 \text{ mm}$$

**Discussion**

The calculated field (2.5 MV/m) is about 83% of the breakdown value, giving some safety margin. If the plates were moved to 1.7 mm apart, a spark would jump between them. This calculation is important for designing capacitors and high-voltage equipment—you must ensure adequate spacing to prevent arcing. In practice, engineers use additional safety factors because breakdown can occur at lower voltages if there are sharp edges, humidity, or contaminants on the surfaces.

**(a) No, the electric field is $$2.5 \times 10^{6}$$ V/m, which is below the breakdown strength of $$3.0 \times 10^{6}$$ V/m.**

**(b) The minimum plate separation is 1.7 mm.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The voltage across a membrane forming a cell wall is 80.0 mV and the membrane is 9.00 nm thick. What is the electric field strength? (The value is surprisingly large, but correct. Membranes are discussed in [Capacitors and Dielectrics](./ch19CapacitorsAndDielectrics) and [Nerve Conduction—Electrocardiograms](./ch20NerveConductionElectrocardiograms).) You may assume a uniform electric field.

</div>
<div class="solution" markdown="1">
**Strategy**

Apply the relationship $$E = V/d$$ for a uniform electric field across the membrane. The key is careful attention to the very small thickness, which will lead to a surprisingly large field.

**Solution**

*Known quantities:*
- Membrane voltage: $$V = 80.0 \text{ mV} = 80.0 \times 10^{-3} \text{ V} = 0.0800 \text{ V}$$
- Membrane thickness: $$d = 9.00 \text{ nm} = 9.00 \times 10^{-9} \text{ m}$$

Calculate the electric field:

$$E = \frac{V}{d} = \frac{0.0800 \text{ V}}{9.00 \times 10^{-9} \text{ m}}$$

$$E = 8.89 \times 10^{6} \text{ V/m} \approx 8.9 \text{ MV/m}$$

**Discussion**

This field of nearly 9 million V/m is indeed surprisingly large—about 3 times the breakdown strength of air! This is possible because:

1. **Cell membranes are not air:** The lipid bilayer membrane has different electrical properties than air and can sustain much higher fields without breakdown.

2. **The voltage is small but the distance is tiny:** While 80 mV seems negligible, spreading it across only 9 nanometers (about 90 atoms thick) creates an enormous field gradient.

3. **Biological importance:** This strong field is essential for nerve function. When ion channels open, ions are driven across the membrane by this field, creating the nerve impulses that control muscles and transmit sensory information. The field can flip polar molecules and control the transport of charged particles through the membrane.

This is a beautiful example of how microscopic dimensions can lead to macroscopically significant effects.

**The electric field strength across the cell membrane is $$8.89 \times 10^{6}$$ V/m or about 8.9 MV/m.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Membrane walls of living cells have surprisingly large electric fields across them due to separation of ions. (Membranes are discussed in some detail in [Nerve Conduction—Electrocardiograms](./ch20NerveConductionElectrocardiograms).) What is the voltage across an 8.00 nm–thick membrane if the electric field strength across it is 5.50 MV/m? You may assume a uniform electric field.

</div>
<div class="solution" markdown="1">
**Strategy**

Use the relationship $$V = Ed$$ for a uniform electric field to find the voltage across the membrane.

**Solution**

*Known quantities:*
- Membrane thickness: $$d = 8.00 \text{ nm} = 8.00 \times 10^{-9} \text{ m}$$
- Electric field strength: $$E = 5.50 \text{ MV/m} = 5.50 \times 10^{6} \text{ V/m}$$

Calculate the voltage:

$$V = Ed = (5.50 \times 10^{6} \text{ V/m})(8.00 \times 10^{-9} \text{ m})$$

$$V = 44.0 \times 10^{-3} \text{ V} = 44.0 \text{ mV}$$

**Discussion**

This membrane potential of 44 mV is within the typical biological range for cell membranes (usually 40–90 mV). This voltage is maintained by active ion pumps that use cellular energy (ATP) to transport ions against their concentration gradients. Despite being small in absolute terms, this potential difference is significant at the molecular level because it acts across such a thin membrane, creating the enormous field strength given in the problem. Changes in this membrane potential are fundamental to nerve impulse transmission and muscle contraction.

**The voltage across the membrane is 44.0 mV.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two parallel conducting plates are separated by 10.0 cm, and one of them is taken to be at zero volts. (a) What is the electric field strength between them, if the potential 8.00 cm from the zero volt plate (and 2.00 cm from the other) is 450 V? (b) What is the voltage between the plates?

</div>
<div class="solution" markdown="1">
**Strategy**

In a uniform electric field, the potential increases linearly with distance from the grounded plate. Since we know the potential at a specific position, we can find the field strength. Once we have the field, we can calculate the total voltage across the plates.

**Solution**

*Known quantities:*
- Plate separation: $$d = 10.0 \text{ cm} = 0.100 \text{ m}$$
- Distance from zero-volt plate to measurement point: $$x = 8.00 \text{ cm} = 0.0800 \text{ m}$$
- Potential at that point: $$V_x = 450 \text{ V}$$

**(a) Electric field strength:**

For a uniform field with one plate grounded, the potential at distance $$x$$ is:

$$V_x = Ex$$

Solving for $$E$$:

$$E = \frac{V_x}{x} = \frac{450 \text{ V}}{0.0800 \text{ m}} = 5625 \text{ V/m} = 5.63 \times 10^{3} \text{ V/m}$$

**(b) Voltage between the plates:**

$$V_{\text{total}} = Ed = (5625 \text{ V/m})(0.100 \text{ m}) = 562.5 \text{ V} \approx 563 \text{ V}$$

**Discussion**

We can verify this result: at 8.00 cm (80% of the way across), the potential should be 80% of the total. Indeed, $$450/562.5 = 0.80 = 80\%$$. This problem illustrates how measuring the potential at a single interior point allows us to determine both the field strength and the total voltage. This technique is used in practice with voltage probes and electrometers.

**(a) The electric field strength is $$5.63 \times 10^{3}$$ V/m.**

**(b) The voltage between the plates is 563 V.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the maximum potential difference between two parallel conducting plates separated by 0.500 cm of air, given the maximum sustainable electric field strength in air to be  $$ 3.0 \times 10^{6}  \text{V/m} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

The maximum voltage occurs when the electric field reaches the breakdown strength of air. We use $$V = Ed$$ with $$E$$ set to the maximum value.

**Solution**

*Known quantities:*
- Plate separation: $$d = 0.500 \text{ cm} = 5.00 \times 10^{-3} \text{ m}$$
- Maximum field strength (breakdown): $$E_{\max} = 3.0 \times 10^{6} \text{ V/m}$$

Calculate maximum voltage:

$$V_{\max} = E_{\max} \cdot d = (3.0 \times 10^{6} \text{ V/m})(5.00 \times 10^{-3} \text{ m})$$

$$V_{\max} = 15,000 \text{ V} = 15 \text{ kV}$$

**Discussion**

This is the maximum voltage that can be applied before a spark (electrical breakdown) jumps between the plates. In practice, this limit depends on humidity, air pressure, and the smoothness of the plate surfaces. Sharp edges or protrusions on the plates can create locally higher fields and cause breakdown at lower voltages. This calculation is important for designing high-voltage equipment, capacitors, and electrical insulators. The 0.500 cm gap at 15 kV corresponds to 30 kV/cm, a useful rule of thumb: air breaks down at about 30 kV per cm of gap under normal conditions.

**The maximum potential difference is 15 kV.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A doubly charged ion is accelerated to an energy of 32.0 keV by the electric field between two parallel conducting plates separated by 2.00 cm. What is the electric field strength between the plates?

</div>
<div class="solution" markdown="1">
**Strategy**

A doubly charged ion has charge $$q = 2e$$. The kinetic energy gained equals $$qV$$, which lets us find the voltage. Then we use $$E = V/d$$ to find the electric field.

**Solution**

*Known quantities:*
- Charge: $$q = 2e = 2(1.60 \times 10^{-19} \text{ C}) = 3.20 \times 10^{-19} \text{ C}$$
- Kinetic energy: $$\text{KE} = 32.0 \text{ keV} = 32,000 \text{ eV}$$
- Plate separation: $$d = 2.00 \text{ cm} = 0.0200 \text{ m}$$

**Step 1:** Find the voltage between the plates.

For a doubly charged ion: $$\text{KE} = qV = 2eV$$

In electron volts, a doubly charged ion gains 2 eV of energy per volt of potential difference. Therefore:

$$\text{KE}(\text{in eV}) = 2 \times V(\text{in volts})$$

$$32,000 \text{ eV} = 2 \times V$$

$$V = 16,000 \text{ V} = 16.0 \text{ kV}$$

**Step 2:** Calculate the electric field.

$$E = \frac{V}{d} = \frac{16,000 \text{ V}}{0.0200 \text{ m}} = 8.00 \times 10^{5} \text{ V/m}$$

**Discussion**

The doubly charged ion gains twice as much energy per volt as a singly charged particle would. This is why the voltage needed (16 kV) is half what you might initially guess from the energy in keV. The field of 800 kV/m is well below air's breakdown limit, so this arrangement could work in air, though particle accelerators typically operate in vacuum to avoid collisions. This type of setup is used in mass spectrometers and ion implanters.

**The electric field strength between the plates is $$8.00 \times 10^{5}$$ V/m or 800 kV/m.**

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An electron is to be accelerated in a uniform electric field having a strength of  $$ 2.00 \times 10^{6}  \text{V/m} $$ .
 (a) What energy in keV is given to the electron if it is accelerated through 0.400 m? (b) Over what distance would it have to be accelerated to increase its energy by 50.0 GeV?

</div>
<div class="solution" markdown="1">
**Strategy**

The voltage across a distance $$d$$ in a uniform field is $$V = Ed$$. An electron (charge $$e$$) gains energy $$eV$$ when accelerated through this voltage. For part (a), we calculate this directly. For part (b), we work backwards from the required energy to find the distance.

**Solution**

*Known quantities:*
- Electric field strength: $$E = 2.00 \times 10^{6} \text{ V/m}$$
- Electron charge: $$e = 1.60 \times 10^{-19} \text{ C}$$

**(a) Energy gained over 0.400 m:**

Distance: $$d = 0.400 \text{ m}$$

Voltage across this distance:

$$V = Ed = (2.00 \times 10^{6} \text{ V/m})(0.400 \text{ m}) = 8.00 \times 10^{5} \text{ V} = 800 \text{ kV}$$

For an electron (singly charged), the energy in eV equals the voltage in volts:

$$\text{Energy} = eV = 800 \text{ keV}$$

**(b) Distance for 50.0 GeV energy gain:**

Required energy: $$\text{Energy} = 50.0 \text{ GeV} = 50.0 \times 10^{9} \text{ eV}$$

For an electron, this requires:

$$V = 50.0 \times 10^{9} \text{ V}$$

Distance needed:

$$d = \frac{V}{E} = \frac{50.0 \times 10^{9} \text{ V}}{2.00 \times 10^{6} \text{ V/m}} = 25.0 \times 10^{3} \text{ m} = 25.0 \text{ km}$$

**Discussion**

This problem illustrates why high-energy particle accelerators are so large. To accelerate electrons to 50 GeV using a constant electric field near air's breakdown limit would require a 25 km long device! This is why modern accelerators use different techniques:

1. **Circular accelerators:** Particles circle repeatedly through the same accelerating sections (synchrotrons).

2. **RF cavities:** Use oscillating electric fields that particles surf through, gaining energy each pass.

3. **Linear accelerators (linacs):** Like SLAC (Stanford Linear Accelerator Center), which was about 3 km long and achieved 50 GeV using higher effective accelerating gradients.

The Stanford Linear Collider achieved about 17 MeV/m average gradient, compared to the 2 MeV/m in this problem.

**(a) The electron gains 800 keV of energy.**

**(b) The acceleration distance required is 25.0 km.**

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
