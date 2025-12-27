---
title: Motional Emf
layout: page
sectionNumber: 3
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Calculate emf, force, magnetic field, and work due to the motion of an object in a magnetic field.
</div>

As we have seen, any change in magnetic flux induces an emf opposing that
change—a process known as induction. Motion is one of the major causes of
induction. For example, a magnet moved toward a coil induces an emf, and a coil
moved toward a magnet produces a similar emf. In this section, we concentrate on
motion in a magnetic field that is stationary relative to the Earth, producing
what is loosely called **motional emf**.

One situation where motional emf occurs is known as the Hall effect and has
already been examined. Charges moving in a magnetic field experience the
magnetic force $$F=qvB \sin \theta $$ , which moves opposite charges in opposite
directions and produces an $$\text{emf}=B\ell v $$ . We saw that the Hall effect
has applications, including measurements of $$B $$ and $$v $$ . We will now see
that the Hall effect is one aspect of the broader phenomenon of induction, and
we will find that motional emf can be used as a power source.

Consider the situation shown in [[Figure 1]](#Figure1). A rod is moved at a
speed $$v $$ along a pair of conducting rails separated by a distance $$\ell $$
in a uniform magnetic field $$B $$ . The rails are stationary relative to $$B $$
and are connected to a stationary resistor $$R $$ . The resistor could be
anything from a light bulb to a voltmeter. Consider the area enclosed by the
moving rod, rails, and resistor. $$B $$ is perpendicular to this area, and the
area is increasing as the rod moves. Thus the magnetic flux enclosed by the
rails, rod, and resistor is increasing. When flux changes, an _emf_ is induced
according to Faraday’s law of induction.

![Part a of the figure shows two parallel rails held horizontal at distance l apart in a uniform magnetic field B in, directed toward the plane of the paper. A resistance R is connected at one of its ends. A rod is kept vertical at the middle on the rails and moved toward the right for a distance delta x with a velocity v. the velocity v is given by delta x divided by delta t. The rectangular area enclosed between the initial position of the rod and the final position after a movement of delta x is given as delta A equals l multiplied by delta x. There is a current induced, I in the upper rail toward left. The upper end of the rod is shown positive and the lower end negative. Part b of the diagram shows the same arrangement as in part a. Two parallel rails held horizontal at distance l apart in a uniform magnetic field B in, directed toward the plane of the paper. A resistance is connected at one of its ends. A rod is kept vertical at the middle on the rails and moved toward the right a distance delta x with a velocity v. Lenz’s law is applied and the direction of induced field and current is shown. There is a current induced I in the upper rail toward left. The upper end of the rod is shown positive and the lower end negative. The induced field B ind is shown in the area enclosed between the resistance R, the rod and the rails. The induced field is opposite to the applied field. The induced field points away from the paper. The flux phi is shown increasing in the enclosed area. A picture of the right hand with its fingers and thumb stretched is shown toward the right of the image to explain the right hand rule. An equivalent circuit of the above figure is shown to be equivalent to a cell of e m f connected across a resistance R.](../resources/Figure_23_03_01.jpg '(a) A motional ( \\text{emf} =Blv ) is induced between the rails when this rod moves to the right in the uniform magnetic field. The magnetic field ( B ) is into the page, perpendicular to the moving rod and rails and, hence, to the area enclosed by them. (b) Lenz’s law gives the directions of the induced field and current, and the polarity of the induced emf. Since the flux is increasing, the induced field is in the opposite direction, or out of the page. RHR-2 gives the current direction shown, and the polarity of the rod will drive such a current. RHR-1 also indicates the same polarity for the rod.  (Note that the script E symbol used in the equivalent circuit at the bottom of part (b) represents emf.)  ')
{: #Figure1}

To find the magnitude of emf induced along the moving rod, we use Faraday’s law
of induction without the sign:

<div class="equation" >
 $$\text{emf}=N\frac{\Delta \Phi }{\Delta t}\text{.} $$
</div>

Here and below, “emf” implies the magnitude of the emf. In this equation, $$N=1
$$ and the flux $$\Phi =BA \cos \theta $$ . We have $$\theta =0º $$ and $$\cos
\theta =1 $$ , since $$B $$ is perpendicular to $$A $$ . Now $$\Delta \Phi
=\Delta \left(BA\right)=B\Delta A $$ , since $$B $$ is uniform. Note that the
area swept out by the rod is $$\Delta A=\ell \Delta x $$ . Entering these
quantities into the expression for **emf** yields

<div class="equation" >
 $$\text{emf}=\frac{B\Delta A}{\Delta t}=B\frac{\ell \Delta x}{\Delta t}\text{.} $$
</div>

Finally, note that $$\Delta x/\Delta t=v $$ ,
\*\* the velocity of the rod. Entering this into the last expression shows that

<div class="equation" >
 $$\text{emf}=B\ell v \left( B, \mathrm{\ell , and} v \text{perpendicular} \right) $$
</div>

is the motional emf. This is the same expression given for the Hall effect
previously.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Unification of Forces
</div>
There are many connections between the electric force and the magnetic force. The fact that a moving electric field produces a magnetic field and, conversely, a moving magnetic field produces an electric field is part of why electric and magnetic forces are now considered to be different manifestations of the same force. This classic unification of electric and magnetic forces into what is called the electromagnetic force is the inspiration for contemporary efforts to unify other basic forces.

</div>

To find the direction of the induced field, the direction of the current, and
the polarity of the induced emf, we apply Lenz’s law as explained
in [Faraday\'s Law of Induction: Lenz\'s Law](../contents/ch23FaradaysLawOfInduction). (
See [[Figure 1]](#Figure1)(b).) Flux is increasing, since the area enclosed is
increasing. Thus the induced field must oppose the existing one and be out of
the page. And so the RHR-2 requires that _I_ be counterclockwise, which in turn
means the top of the rod is positive as shown.

Motional emf also occurs if the magnetic field moves and the rod (or other
object) is stationary relative to the Earth (or some observer). We have seen an
example of this in the situation where a moving magnet induces an emf in a
stationary coil. It is the relative motion that is important. What is emerging
in these observations is a connection between magnetic and electric fields. A
moving magnetic field produces an electric field through its induced emf. We
already have seen that a moving electric field produces a magnetic field—moving
charge implies moving electric field and moving charge produces a magnetic
field.

Motional emfs in the Earth’s weak magnetic field are not ordinarily very large,
or we would notice voltage along metal rods, such as a screwdriver, during
ordinary motions. For example, a simple calculation of the motional emf of a 1 m
rod moving at 3.0 m/s perpendicular to the Earth’s field gives

$$
\text{emf}=B\ell v=\left( 5.0 \times 10^{-5} \text{T}\right)\left( 1.0
m\right)\left( 3.0 m/s\right)=150 \text{μV} $$ . This small value is consistent
with experience. There is a spectacular exception, however. In 1992 and 1996,
attempts were made with the space shuttle to create large motional emfs. The
Tethered Satellite was to be let out on a 20 km length of wire as shown
in [[Figure 2]](#Figure2), to create a 5 kV emf by moving at orbital speed
through the Earth’s field. This emf could be used to convert some of the
shuttle’s kinetic and potential energy into electrical energy if a complete
circuit could be made. To complete the circuit, the stationary ionosphere was to
supply a return path for the current to flow. (The ionosphere is the rarefied
and partially ionized atmosphere at orbital altitudes. It conducts because of
the ionization. The ionosphere serves the same function as the stationary rails
and connecting resistor in [[Figure 1]](#Figure1), without which there would not
be a complete circuit.) Drag on the current in the cable due to the magnetic
force $$F=I\ell B \sin \theta $$ does the work that reduces the shuttle’s
kinetic and potential energy and allows it to be converted to electrical energy.
The tests were both unsuccessful. In the first, the cable hung up and could only
be extended a couple of hundred meters; in the second, the cable broke when
almost fully extended. [[Example 1]](#Example1) indicates feasibility in
principle.

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating the Large Motional Emf of an Object in Orbit
</div>
![Figure shows a tethered satellite in Earth orbit. The Earth magnetic field is given as B Earth directed toward the plane of the paper. A tether satellite is a satellite connected to another by a space tether. An aircraft is shown flying at distance l below the tethered satellite. A current path is shown from the aircraft flying in the ionosphere to the tethered satellite and back.](../resources/Figure_23_03_02.jpg "Motional emf as electrical power conversion for the space shuttle is the motivation for the Tethered Satellite experiment. A 5 kV emf was predicted to be induced in the 20 km long tether while moving at orbital speed in the Earth&#x2019;s magnetic field. The circuit is completed by a return path through the stationary ionosphere."){: #Figure2}

Calculate the motional emf induced along a 20.0 km long conductor moving at an
orbital speed of 7.80 km/s perpendicular to the Earth’s $$ 5.00 \times 10^{-5}
\text{T} $$ magnetic field.

**Strategy**

This is a straightforward application of the expression for motional emf—
$$\text{emf}=B\ell v $$.

**Solution**

Entering the given values into $$\text{emf}=B\ell v $$ gives

<div class="equation" >
 $$\begin{array}{lll}\text{emf}& =& B\ell v\\ & =& \left( 5.00 \times 10^{-5}  \text{T}\right)\left( 2.0 \times 10^{4}  \text{m}\right)\left( 7.80 \times 10^{3}  \text{m/s}\right)\\ & =&  7.80 \times 10^{3}  \text{V} \text{.} \end{array} $$
</div>
**Discussion**

The value obtained is greater than the 5 kV measured voltage for the shuttle
experiment, since the actual orbital motion of the tether is not perpendicular
to the Earth’s field. The 7.80 kV value is the maximum emf obtained when
$$\theta =90 ^\circ $$ and $$\sin \theta =1 $$.

</div>

### Section Summary

* An emf induced by motion relative to a magnetic field $$B $$ is called a *motional emf* and is given by

  <div class="equation" >
   $$\text{emf}=B\ell v  \left( B\text{,} \ell \text{, and} v \text{perpendicular} \right) , $$
  </div>
     where
   $$\ell  $$ is the length of the object moving at speed
   $$v $$ relative to the field.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why must part of the circuit be moving relative to other parts, to have usable motional emf? Consider, for example, that the rails in [[Figure 1]](#Figure1) are stationary relative to the magnetic field, while the rod moves.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
A powerful induction cannon can be made by placing a metal cylinder inside a solenoid coil. The cylinder is forcefully expelled when solenoid current is turned on rapidly. Use Faraday’s and Lenz’s laws to explain how this works. Why might the cylinder get live/hot when the cannon is fired?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
An induction stove heats a pot with a coil carrying an alternating current located beneath the pot (and without a hot surface). Can the stove surface be a conductor? Why won’t a coil carrying a direct current work?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain how you could thaw out a frozen water pipe by wrapping a coil carrying an alternating current around it. Does it matter whether or not the pipe is a conductor? Explain.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Use Faraday's law, Lenz's law, and RHR-1 to show that the magnetic force on the current in the moving rod in [[Figure 1]](#Figure1) is in the opposite direction of its velocity.

</div>
<div class="solution" markdown="1">
**Strategy**

We'll apply Faraday's law to find the induced emf, use Lenz's law to determine the direction of the induced current, and then apply RHR-1 to find the direction of the magnetic force on that current.

**Solution**

As the rod moves to the right with velocity $$v$$, the flux through the circuit increases (the enclosed area increases). By Faraday's law, this changing flux induces an emf in the circuit.

By Lenz's law, the induced current must create a magnetic field that opposes the change in flux. Since the flux into the page is increasing, the induced magnetic field must point out of the page. Using RHR-2 (right-hand rule for the magnetic field created by a current loop), the induced current must flow counterclockwise in the circuit—up through the rod.

Now we apply RHR-1 (the right-hand rule for the magnetic force on a current-carrying conductor). Point your fingers in the direction of current (upward in the rod), curl them toward the direction of the magnetic field (into the page), and your thumb points in the direction of the force. This gives a force to the left—opposite to the rod's velocity (which is to the right).

**Discussion**

This result makes physical sense from energy conservation. The magnetic force opposes the motion of the rod, so work must be done to keep the rod moving at constant velocity. This mechanical work is converted into electrical energy in the circuit. If the magnetic force were in the same direction as the velocity, we would have perpetual motion, violating energy conservation. The opposing force represents the mechanical "cost" of generating electrical power.

**Final Answer**

By Faraday's law, the moving rod induces an emf. By Lenz's law, the induced current flows upward through the rod (counterclockwise in the circuit). By RHR-1, a current flowing upward in a magnetic field directed into the page experiences a force to the left, opposite to the rod's rightward velocity.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If a current flows in the Satellite Tether shown in [[Figure 2]](#Figure2), use Faraday's law, Lenz's law, and RHR-1 to show that there is a magnetic force on the tether in the direction opposite to its velocity.

</div>
<div class="solution" markdown="1">
**Strategy**

We'll apply the same reasoning as in the previous problem: use Faraday's law for the induced emf, Lenz's law for the current direction, and RHR-1 for the force direction.

**Solution**

As the tethered satellite moves through Earth's magnetic field at orbital velocity, the tether sweeps through the field lines, creating a changing magnetic flux through the circuit formed by the tether, ionosphere, and shuttle. By Faraday's law, this induces an emf of $$\text{emf}=B\ell v$$.

By Lenz's law, the induced current must flow in a direction that creates a magnetic field opposing the flux change. As the system moves forward through Earth's magnetic field, the induced current flows in such a direction to oppose this motion.

Using RHR-1 (force on a current-carrying conductor in a magnetic field): Point your fingers in the direction of the current in the tether, curl them toward the direction of Earth's magnetic field, and your thumb points in the direction of the magnetic force. This force, $$F=I\ell B$$, is directed opposite to the satellite's velocity.

**Discussion**

This magnetic drag force is what enables energy conversion in the Tethered Satellite experiment. The satellite's kinetic and potential energy is converted to electrical energy through the induced emf and current. The opposing magnetic force does negative work on the satellite, slowing it down and extracting energy from its orbital motion. This is the fundamental principle behind electromagnetic braking and regenerative power generation.

**Final Answer**

The moving tether induces an emf by Faraday's law. The resulting current (whose direction is determined by Lenz's law to oppose the motion) experiences a magnetic force by RHR-1 that is directed opposite to the satellite's velocity, providing magnetic drag.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A jet airplane with a 75.0 m wingspan is flying at 280 m/s. What emf is induced between wing tips if the vertical component of the Earth's field is  $$ 3.00 \times 10^{-5}  \text{T} $$ ?
 (b) Is an emf of this magnitude likely to have any consequences? Explain.

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use the motional emf formula $$\text{emf}=B\ell v$$ where $$\ell$$ is the wingspan, $$v$$ is the airplane's speed, and $$B$$ is the vertical component of Earth's magnetic field.
(b) Assess whether 0.630 V is significant in the context of an aircraft's electrical system.

**Solution**

**(a)** Given:
- $$\ell = 75.0 \text{ m}$$
- $$v = 280 \text{ m/s}$$
- $$B = 3.00 \times 10^{-5} \text{ T}$$

<div class="equation">
$$\text{emf}=B\ell v=(3.00 \times 10^{-5} \text{ T})(75.0 \text{ m})(280 \text{ m/s})=0.630 \text{ V}$$
</div>

**(b)** No, this emf is very small and unlikely to have any practical consequences. Modern aircraft electrical systems operate at much higher voltages (typically 28 V DC or 115 V AC). The 0.630 V induced emf is far too small to affect aircraft electronics, cause sparking, or pose any safety hazard. Furthermore, for current to flow and dissipate energy, there would need to be a complete circuit through the aircraft, which is generally not present in a way that would utilize this emf.

**Discussion**

While the induced emf exists, it's insignificant compared to the voltages used in aircraft systems. This problem illustrates that motional emf in Earth's relatively weak magnetic field produces only small voltages unless the conductor is very long (as in the Tethered Satellite experiment) or moving extremely fast. The calculation confirms that pilots and passengers need not worry about electromagnetic effects from flying through Earth's magnetic field.

**Final Answer**

(a) 0.630 V

(b) No, this is a very small emf compared to aircraft electrical system voltages and poses no practical consequences.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A nonferrous screwdriver is being used in a 2.00 T magnetic field. What maximum emf can be induced along its 12.0 cm length when it moves at 6.00 m/s? (b) Is it likely that this emf will have any consequences or even be noticed?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$\text{emf}=B\ell v$$ with maximum emf occurring when motion is perpendicular to the field.
(b) Assess whether the calculated emf is noticeable.

**Solution**

**(a)** Given: $$B = 2.00 \text{ T}$$, $$\ell = 12.0 \text{ cm} = 0.120 \text{ m}$$, $$v = 6.00 \text{ m/s}$$

<div class="equation">
$$\text{emf}=B\ell v=(2.00 \text{ T})(0.120 \text{ m})(6.00 \text{ m/s})=1.44 \text{ V}$$
</div>

**(b)** This emf of 1.44 V is unlikely to be noticed or have practical consequences. It's too small to cause sparking or electrical shock. While it's larger than typical static electricity, the screwdriver's high resistance would limit current flow. A person holding the screwdriver wouldn't feel anything, and it wouldn't affect the tool's operation.

**Final Answer**

(a) 1.44 V; (b) No practical consequences—too small to notice.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what speed must the sliding rod in [[Figure 1]](#Figure1) move to produce an emf of 1.00 V in a 1.50 T field, given the rod's length is 30.0 cm?

</div>
<div class="solution" markdown="1">
**Strategy**

Rearrange $$\text{emf}=B\ell v$$ to solve for $$v$$.

**Solution**

Given: $$\text{emf} = 1.00 \text{ V}$$, $$B = 1.50 \text{ T}$$, $$\ell = 30.0 \text{ cm} = 0.300 \text{ m}$$

<div class="equation">
$$v=\frac{\text{emf}}{B\ell}=\frac{1.00 \text{ V}}{(1.50 \text{ T})(0.300 \text{ m})}=\frac{1.00}{0.450}=2.22 \text{ m/s}$$
</div>

**Discussion**

This is a moderate speed (about 8 km/h or 5 mph)—roughly walking pace. The relatively strong magnetic field (1.50 T, about 30,000 times Earth's field) allows a modest velocity to generate 1.00 V, which is sufficient to drive measurable current through a load resistor.

**Final Answer**

2.22 m/s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The 12.0 cm long rod in [[Figure 1]](#Figure1) moves at 4.00 m/s. What is the strength of the magnetic field if a 95.0 V emf is induced?

</div>
<div class="solution" markdown="1">
**Strategy**

Rearrange $$\text{emf}=B\ell v$$ to solve for $$B$$.

**Solution**

Given: $$\ell = 12.0 \text{ cm} = 0.120 \text{ m}$$, $$v = 4.00 \text{ m/s}$$, $$\text{emf} = 95.0 \text{ V}$$

<div class="equation">
$$B=\frac{\text{emf}}{\ell v}=\frac{95.0 \text{ V}}{(0.120 \text{ m})(4.00 \text{ m/s})}=\frac{95.0}{0.480}=198 \text{ T}$$
</div>

**Discussion**

This is an extremely strong magnetic field—about 4 million times stronger than Earth's field and much stronger than typical laboratory electromagnets (usually 1-2 T). Such fields are only achievable with superconducting magnets or pulsed magnetic field facilities. This demonstrates that generating substantial voltage with a small, slow-moving conductor requires an extraordinarily strong field.

**Final Answer**

198 T

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Prove that when  $$B $$ ,
  $$\ell  $$ ,  and  $$v $$
 are not mutually perpendicular, motional emf is given by  $$\text{emf}=B\ell v \sin \theta  $$ .
 If  $$v $$  is perpendicular to  $$B $$ ,
 then  $$\theta  $$
 is the angle between  $$\ell  $$  and  $$B $$ .
 If  $$\ell  $$  is perpendicular to  $$B $$ ,
 then  $$\theta  $$  is the angle between  $$v $$  and  $$B $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Start with Faraday's law and consider the component of either $$\ell$$ or $$v$$ that is perpendicular to $$B$$.

**Solution**

From Faraday's law, $$\text{emf}=\frac{\Delta \Phi}{\Delta t}=\frac{B\Delta A}{\Delta t}$$, where $$\Delta A$$ is the change in area.

**Case 1:** If $$v$$ is perpendicular to $$B$$, then $$\theta$$ is the angle between $$\ell$$ and $$B$$. The effective length perpendicular to $$B$$ is $$\ell_{\perp}=\ell \sin \theta$$. The area swept out in time $$\Delta t$$ is:

<div class="equation">
$$\Delta A = \ell_{\perp} v \Delta t = \ell v \sin \theta \cdot \Delta t$$
</div>

Therefore:
<div class="equation">
$$\text{emf}=\frac{B\Delta A}{\Delta t}=B\ell v \sin \theta$$
</div>

**Case 2:** If $$\ell$$ is perpendicular to $$B$$, then $$\theta$$ is the angle between $$v$$ and $$B$$. The effective velocity perpendicular to $$B$$ is $$v_{\perp}=v \sin \theta$$. The area swept out is:

<div class="equation">
$$\Delta A = \ell v_{\perp} \Delta t = \ell v \sin \theta \cdot \Delta t$$
</div>

Again:
<div class="equation">
$$\text{emf}=\frac{B\Delta A}{\Delta t}=B\ell v \sin \theta$$
</div>

**Discussion**

This proves that motional emf depends on the sine of the angle between the vectors. Maximum emf occurs when $$\theta = 90°$$ (perpendicular configuration), and zero emf when $$\theta = 0°$$ (parallel configuration). This is consistent with the requirement that the conductor must cut through field lines to generate emf.

**Final Answer**

Proven: $$\text{emf}=B\ell v \sin \theta$$ where $$\theta$$ is defined as stated depending on which pair of vectors are perpendicular.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In the August 1992 space shuttle flight, only 250 m of the conducting tether considered in [[Example 1]](#Example1) could be let out. A 40.0 V motional emf was generated in the Earth's  $$ 5.00 \times 10^{-5}  \text{T} $$
 field, while moving at  $$ 7.80 \times 10^{3}  \text{m/s} $$ .
 What was the angle between the shuttle's velocity and the Earth's field, assuming the conductor was perpendicular to the field?

</div>
<div class="solution" markdown="1">
**Strategy**

Use $$\text{emf}=B\ell v \sin \theta$$ and solve for $$\theta$$, where $$\theta$$ is the angle between $$v$$ and $$B$$.

**Solution**

Given:
- $$\text{emf} = 40.0 \text{ V}$$
- $$B = 5.00 \times 10^{-5} \text{ T}$$
- $$\ell = 250 \text{ m}$$
- $$v = 7.80 \times 10^3 \text{ m/s}$$

<div class="equation">
$$\sin \theta=\frac{\text{emf}}{B\ell v}=\frac{40.0}{(5.00 \times 10^{-5})(250)(7.80 \times 10^3)}=\frac{40.0}{97.5}=0.410$$
</div>

<div class="equation">
$$\theta=\arcsin(0.410)=24.2°$$
</div>

**Discussion**

The angle of 24.2° means the shuttle's velocity was not perpendicular to Earth's magnetic field, which reduced the induced emf from what it would have been at 90°. If the tether had been perpendicular to both $$v$$ and $$B$$, the maximum possible emf would have been $$97.5 \text{ V}$$. The actual value of 40.0 V represents about 41% of this maximum, consistent with $$\sin 24.2° = 0.410$$.

**Final Answer**

24.2°

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

Derive an expression for the current in a system like that
in [[Figure 1]](#Figure1), under the following conditions. The resistance
between the rails is $$R $$ , the rails and the moving rod are identical in
cross-section $$A $$ and have the same resistivity $$\rho $$ . The distance
between the rails is l, and the rod moves at constant speed $$v $$ perpendicular
to the uniform field $$B $$ . At time zero, the moving rod is next to the
resistance $$R $$.

</div>
<div class="solution" markdown="1">
**Strategy**

Find the total resistance of the circuit (including the rails and rod) and use Ohm's law with the motional emf.

**Solution**

The motional emf is: $$\text{emf}=B\ell v$$

At time $$t$$, the rod has moved a distance $$x = vt$$ from the resistance $$R$$. The circuit consists of:
- Resistance $$R$$
- Two rail segments each of length $$x$$ with resistance $$R_{\text{rail}}=\rho \frac{x}{A}$$ each
- The moving rod of length $$\ell$$ with resistance $$R_{\text{rod}}=\rho \frac{\ell}{A}$$

Total resistance:
<div class="equation">
$$R_{\text{total}}=R + 2\rho \frac{x}{A} + \rho \frac{\ell}{A}=R + \frac{2\rho vt}{A} + \frac{\rho \ell}{A}$$
</div>

Current from Ohm's law:
<div class="equation">
$$I=\frac{\text{emf}}{R_{\text{total}}}=\frac{B\ell v}{R + \frac{2\rho vt}{A} + \frac{\rho \ell}{A}}$$
</div>

This can be written as:
<div class="equation">
$$I=\frac{B\ell vA}{RA + 2\rho vt + \rho \ell}$$
</div>

**Discussion**

The current decreases with time as the rod moves away from $$R$$, increasing the total circuit resistance. Initially (at $$t=0$$), the current is maximum. As $$t$$ increases, the resistance from the lengthening rail sections causes the current to decrease.

**Final Answer**

$$I=\frac{B\ell v}{R + \frac{2\rho vt + \rho \ell}{A}}$$ or equivalently $$I=\frac{B\ell vA}{RA + 2\rho vt + \rho \ell}$$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

The Tethered Satellite in [[Figure 2]](#Figure2) has a mass of 525 kg and is at
the end of a 20.0 km long, 2.50 mm diameter cable with the tensile strength of
steel. (a) How much does the cable stretch if a 100 N force is exerted to pull
the satellite in? (Assume the satellite and shuttle are at the same altitude
above the Earth.) (b) What is the effective force constant of the cable? (c) How
much energy is stored in it when stretched by the 100 N force?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use $$\Delta L=\frac{FL_0}{YA}$$ where $$Y$$ is Young's modulus for steel ($$2.0 \times 10^{11} \text{ N/m}^2$$).
(b) Calculate $$k=F/\Delta L$$.
(c) Use $$E=\frac{1}{2}k(\Delta L)^2$$.

**Solution**

**(a)** Given:
- $$F = 100 \text{ N}$$
- $$L_0 = 20.0 \text{ km} = 2.00 \times 10^4 \text{ m}$$
- $$d = 2.50 \text{ mm}$$, so $$A = \pi r^2 = \pi(1.25 \times 10^{-3})^2 = 4.91 \times 10^{-6} \text{ m}^2$$
- $$Y = 2.0 \times 10^{11} \text{ N/m}^2$$

<div class="equation">
$$\Delta L=\frac{FL_0}{YA}=\frac{(100)(2.00 \times 10^4)}{(2.0 \times 10^{11})(4.91 \times 10^{-6})}=\frac{2.00 \times 10^6}{9.82 \times 10^5}=2.04 \text{ m}$$
</div>

**(b)** <div class="equation">
$$k=\frac{F}{\Delta L}=\frac{100 \text{ N}}{2.04 \text{ m}}=49.0 \text{ N/m}$$
</div>

**(c)** <div class="equation">
$$E=\frac{1}{2}k(\Delta L)^2=\frac{1}{2}(49.0)(2.04)^2=102 \text{ J}$$
</div>

**Discussion**

The 2.04 m stretch in a 20 km cable is only 0.01% elongation, typical for steel under moderate tension. The very low spring constant (49.0 N/m) reflects the cable's length—it's much easier to stretch a long thin cable than a short thick one. The stored energy of 102 J is modest but could cause a "snap-back" hazard if the cable were suddenly released.

**Final Answer**

(a) 2.04 m; (b) 49.0 N/m; (c) 102 J

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

The Tethered Satellite discussed in this module is producing 5.00 kV, and a
current of 10.0 A flows. (a) What magnetic drag force does this produce if the
system is moving at 7.80 km/s? (b) How much kinetic energy is removed from the
system in 1.00 h, neglecting any change in altitude or velocity during that
time? (c) What is the change in velocity if the mass of the system is 100 000
kg? (d) Discuss the long term consequences (say, a week-long mission) on the
space shuttle’s orbit, noting what effect a decrease in velocity has and
assessing the magnitude of the effect.

</div>
<div class="solution" markdown="1">
(a) 10.0 N

(b)  $$ 2.81 \times 10^{8} \text{J} $$
(c) 0.36 m/s

(d) For a week-long mission (168 hours), the change in velocity will be 60 m/s,
or approximately 1%. In general, a decrease in velocity would cause the orbit to
start spiraling inward because the velocity would no longer be sufficient to
keep the circular orbit. The long-term consequences are that the shuttle would
require a little more fuel to maintain the desired speed, otherwise the orbit
would spiral slightly inward.

</div>
</div>
$$
