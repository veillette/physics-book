---
title: The Hall Effect
layout: page
sectionNumber: 6
chapterNumber: 22
---

<div class="abstract" markdown="1">
* Describe the Hall effect.
* Calculate the Hall emf across a current-carrying conductor.
</div>

We have seen effects of a magnetic field on free-moving charges. The magnetic
field also affects charges moving in a conductor. One result is the Hall effect,
which has important implications and applications.

[[Figure 1]](#Figure1) shows what happens to charges moving through a conductor
in a magnetic field. The field is perpendicular to the electron drift velocity
and to the width of the conductor. Note that conventional current is to the
right in both parts of the figure. In part (a), electrons carry the current and
move to the left. In part (b), positive charges carry the current and move to
the right. Moving electrons feel a magnetic force toward one side of the
conductor, leaving a net positive charge on the other side. This separation of
charge *creates a voltage* $$\epsilon $$, known as the **Hall emf**, *across* the conductor. The creation of a
voltage *across* a current-carrying conductor by a magnetic field is known as
the **Hall effect**, after Edwin Hall, the American physicist who discovered it
in 1879.

![Figure a shows an electron with velocity v moving toward the left. The magnetic field B is oriented out of the page. The current I is running toward the right. The force vector on the electron points downward. An illustration of the right hand rule shows the right thumb pointing left with the v vector, the fingers pointing toward 7 o&#x2019;clock with the B vector, the force vector on a positive charge pointing up and the force vector on a negative charge pointing down. Figure b shows a positive charge moving toward the right. The magnetic field lines are coming out of the page. The current I is running toward the right. The force on the positive charge is down. An illustration of the right hand rule shows the thumb pointing in the direction of the charge&#x2019;s velocity, the fingers pointing in the direction of B, and F pointing down away from the palm.](../resources/Figure_22_06_01.jpg "The Hall effect. (a) Electrons move to the left in this flat conductor (conventional current to the right). The magnetic field is directly out of the page, represented by circled dots; it exerts a force on the moving charges, causing a voltage \( \epsilon \) , the Hall emf, across the conductor. (b) Positive charges moving to the right (conventional current also to the right) are moved to the side, producing a Hall emf of the opposite sign, \( -\epsilon \) . Thus, if the direction of the field and current are known, the sign of the charge carriers can be determined from the Hall effect.")
{: #Figure1}

One very important use of the Hall effect is to determine whether positive or
negative charges carries the current. Note that in [[Figure 1]](#Figure1)(b),
where positive charges carry the current, the Hall emf has the sign opposite to
when negative charges carry the current. Historically, the Hall effect was used
to show that electrons carry current in metals and it also shows that positive
charges carry current in some semiconductors. The Hall effect is used today as a
research tool to probe the movement of charges, their drift velocities and
densities, and so on, in materials. In 1980, it was discovered that the Hall
effect is quantized, an example of quantum behavior in a macroscopic object.

The Hall effect has other uses that range from the determination of blood flow
rate to precision measurement of magnetic field strength. To examine these
quantitatively, we need an expression for the Hall emf, $$\epsilon $$ , across a
conductor. Consider the balance of forces on a moving charge in a situation
where $$B $$ , $$v $$ , and $$l $$ are mutually perpendicular, such as shown
in [[Figure 2]](#Figure2). Although the magnetic force moves negative charges to
one side, they cannot build up without limit. The electric field caused by their
separation opposes the magnetic force, $$F=qvB $$ , and the electric force,
$${F}_{e}=qE $$ , eventually grows to equal it. That is,

<div class="equation" >
 $$qE=qvB $$
</div>

or

<div class="equation" >
 $$E=vB. $$
</div>

Note that the electric field $$E $$ is uniform across the conductor because the
magnetic field $$B $$ is uniform, as is the conductor. For a uniform electric
field, the relationship between electric field and voltage is $$E=\epsilon /l $$
, where $$l $$ is the width of the conductor and $$\epsilon $$ is the Hall emf.
Entering this into the last expression gives

<div class="equation" >
 $$\frac{\epsilon }{l}=vB\text{.} $$
</div>

Solving this for the Hall emf yields

<div class="equation" >
 $$\epsilon =Blv \left(B, v, \text{and} l, \text{mutually perpendicular}\right), $$
</div>

where $$\epsilon $$ is the Hall effect voltage across a conductor of width $$l
$$ through which charges move at a speed $$v $$.

![Diagram showing an electron moving to the left in a three-dimensional rectangular space with velocity v. The magnetic field is oriented out of the page. The electric field is down. The electric force on the charge is up while the magnetic force on the charge is down. An illustration of the right hand rule shows the thumb pointing to the left with v, the fingers out of the page with B, and the force on a positive charge up and away from the palm.](../resources/Figure_22_06_02.jpg "The Hall emf \( \epsilon \) produces an electric force that balances the magnetic force on the moving charges. The magnetic force produces charge separation, which builds up until it is balanced by the electric force, an equilibrium that is quickly reached.")
{: #Figure2}

One of the most common uses of the Hall effect is in the measurement of magnetic
field strength $$B $$ . Such devices, called *Hall probes*, can be made very
small, allowing fine position mapping. Hall probes can also be made very
accurate, usually accomplished by careful calibration. Another application of
the Hall effect is to measure fluid flow in any fluid that has free charges (
most do). (See [[Figure 3]](#Figure3).) A magnetic field applied perpendicular
to the flow direction produces a Hall emf $$\epsilon $$ as shown. Note that the
sign of $$\epsilon $$ depends not on the sign of the charges, but only on the
directions of $$B $$ and $$v $$ . The magnitude of the Hall emf is $$\epsilon
=Blv $$ , where $$l $$ is the pipe diameter, so that the average velocity $$v $$
can be determined from $$\epsilon $$ providing the other factors are known.

![Diagram showing a tube with diameter l with one end between the north and south poles of a magnet. The charges are moving with velocity v within the tube and out of the page. The magnetic field B is oriented across the tube, from the north to the south pole of the magnet. The force on the charges is up for positive charges and down for negative charges. e m f = B l v.](../resources/Figure_22_06_03.jpg "The Hall effect can be used to measure fluid flow in any fluid having free charges, such as blood. The Hall emf \( \epsilon \) is measured across the tube perpendicular to the applied magnetic field and is proportional to the average velocity \( v \) .")
{: #Figure3}

<div class="example" markdown="1">
<div class="title">
Calculating the Hall emf: Hall Effect for Blood Flow
</div>
A Hall effect flow probe is placed on an artery, applying a 0.100-T magnetic field across it, in a setup similar to that in [[Figure 3]](#Figure3). What is the Hall emf, given the vessel’s inside diameter is 4.00 mm and the average blood velocity is 20.0 cm/s?

**Strategy**

Because $$B $$ , $$v $$ , and $$l $$ are mutually perpendicular, the equation
$$\epsilon =Blv $$ can be used to find $$\epsilon $$.

**Solution**

Entering the given values for $$B $$ , $$v $$ , and $$l $$ gives

<div class="equation" >
 $$\begin{array}{lll}\epsilon & =& Blv=\left(0.100 \text{T}\right)\left( 4.00 \times 10^{-3}  m\right)\left(0.200\text{ m/s}\right)\\ & =& 80.0 \text{μV}\end{array} $$
</div>
**Discussion**

This is the average voltage output. Instantaneous voltage varies with pulsating
blood flow. The voltage is small in this type of measurement. $$\epsilon $$ is
particularly difficult to measure, because there are voltages associated with
heart action (ECG voltages) that are on the order of millivolts. In practice,
this difficulty is overcome by applying an AC magnetic field, so that the Hall
emf is AC with the same frequency. An amplifier can be very selective in picking
out only the appropriate frequency, eliminating signals and noise at other
frequencies.

</div>

### Section Summary

* The Hall effect is the creation of voltage $$\epsilon $$ , known as the Hall
  emf, across a current-carrying conductor by a magnetic field.
* The Hall emf is given by
  <div class="equation" >
   $$\epsilon =Blv \left(B, v, \text{and} l, \text{mutually perpendicular}\right) $$
  </div>

  for a conductor of width $$l $$ through which charges move at a speed $$v $$ .

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Discuss how the Hall effect could be used to obtain information on free charge density in a conductor. (Hint: Consider how drift velocity and current are related.)

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A large water main is 2.50 m in diameter and the average water velocity is 6.00 m/s. Find the Hall voltage produced if the pipe runs perpendicular to the Earth’s  $$ 5.00 \times 10^{-5} \text{-T} $$
 field.

</div>
<div class="solution" markdown="1">
 $$ 7.50 \times 10^{-4}  V $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What Hall voltage is produced by a 0.200-T field applied across a 2.60-cm-diameter aorta when blood velocity is 60.0 cm/s?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the speed of a supersonic aircraft with a 17.0-m wingspan, if it experiences a 1.60-V Hall voltage between its wing tips when in level flight over the north magnetic pole, where the Earth’s field strength is  $$ 8.00 \times 10^{-5}  \text{T} $$ ?
 (b) Explain why very little current flows as a result of this Hall voltage.

</div>
<div class="solution" markdown="1">
(a) $$1.18 \times 10^3 \text{m/s} $$

(b) Once established, the Hall emf pushes charges one direction and the magnetic
force acts in the opposite direction resulting in no net force on the charges.
Therefore, no current flows in the direction of the Hall emf. This is the same
as in a current-carrying conductor—current does not flow in the direction of the
Hall emf.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A nonmechanical water meter could utilize the Hall effect by applying a magnetic field across a metal pipe and measuring the Hall voltage produced. What is the average fluid velocity in a 3.00-cm-diameter pipe, if a 0.500-T field across it creates a 60.0-mV Hall voltage?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the Hall voltage induced on a patient’s heart while being scanned by an MRI unit. Approximate the conducting path on the heart wall by a wire 7.50 cm long that moves at 10.0 cm/s perpendicular to a 1.50-T magnetic field.

</div>
<div class="solution" markdown="1">
11\.3 mV

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A Hall probe calibrated to read  $$1.00 \text{μV} $$
 when placed in a 2.00-T field is placed in a 0.150-T field. What is its output voltage?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Using information in [[Example 2]](../contents/ch20ResistanceAndResistivity#Example2), what would the Hall voltage be if a 2.00-T field is applied across a 10-gauge copper wire (2.588 mm in diameter) carrying a 20.0-A current?

</div>
<div class="solution" markdown="1">
 $$1.16 \text{μV} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the Hall voltage across wires made of the same material, carrying identical currents, and subjected to the same magnetic field is inversely proportional to their diameters. (Hint: Consider how drift velocity depends on wire diameter.)

</div>
</div>

<div class="exercise"  data-element-type="problems-exercises">
<div class="problem"  markdown="1">
A patient with a pacemaker is mistakenly being scanned for an MRI image. A 10.0-cm-long section of pacemaker wire moves at a speed of 10.0 cm/s perpendicular to the MRI unit’s magnetic field and a 20.0-mV Hall voltage is induced. What is the magnetic field strength?

</div>
<div class="solution"  markdown="1">
2.00 T

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

Hall effect
: the creation of voltage across a current-carrying conductor by a magnetic
field

Hall emf
: the electromotive force created by a current-carrying conductor by a magnetic
field, $$\epsilon =Blv $$

</div>
