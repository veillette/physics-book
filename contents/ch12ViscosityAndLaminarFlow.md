---
title: Viscosity and Laminar Flow; Poiseuille’s Law
layout: page
sectionNumber: 4
chapterNumber: 12
---

<div class="abstract" markdown="1">
* Define laminar flow and turbulent flow.
* Explain what viscosity is.
* Calculate flow and resistance with Poiseuille’s law.
* Explain how pressure drops due to resistance.
</div>

### Laminar Flow and Viscosity

When you pour yourself a glass of juice, the liquid flows freely and quickly.
But when you pour syrup on your pancakes, that liquid flows slowly and sticks to
the pitcher. The difference is fluid friction, both within the fluid itself and
between the fluid and its surroundings. We call this property of fluids 
*viscosity*. Juice has low viscosity, whereas syrup has high viscosity. In the
previous sections we have considered ideal fluids with little or no viscosity.
In this section, we will investigate what factors, including viscosity, affect
the rate of fluid flow.

The precise definition of viscosity is based on *laminar*, or nonturbulent,
flow. Before we can define viscosity, then, we need to define laminar flow and
turbulent flow. [[Figure 1]](#Figure1) shows both types of flow. **Laminar**
flow is characterized by the smooth flow of the fluid in layers that do not mix.
Turbulent flow, or **turbulence**, is characterized by eddies and swirls that
mix layers of fluid together.

![Photograph of smoke rising smoothly for a while and then beginning to form swirls and eddies.](../resources/Figure_12_04_01.jpg "Smoke rises smoothly for a while and then begins to form swirls and eddies. The smooth flow is called laminar flow, whereas the swirls and eddies typify turbulent flow. If you watch the smoke (being careful not to breathe on it), you will notice that it rises more rapidly when flowing smoothly than after it becomes turbulent, implying that turbulence poses more resistance to flow. (credit: Creativity103)")
{: #Figure1}

[[Figure 2]](#Figure2) shows schematically how laminar and turbulent flow
differ. Layers flow without mixing when flow is laminar. When there is
turbulence, the layers mix, and there are significant velocities in directions
other than the overall direction of flow. The lines that are shown in many
illustrations are the paths followed by small volumes of fluids. These are
called *streamlines*. Streamlines are smooth and continuous when flow is
laminar, but break up and mix when flow is turbulent. Turbulence has two main
causes. First, any obstruction or sharp corner, such as in a faucet, creates
turbulence by imparting velocities perpendicular to the flow. Second, high
speeds cause turbulence. The drag both between adjacent layers of fluid and
between the fluid and its surroundings forms swirls and eddies, if the speed is
great enough. We shall concentrate on laminar flow for the remainder of this
section, leaving certain aspects of turbulence for later sections.

![Part a of the figure shows a laminar flow on a fixed smooth surface. The different layers of the liquid are shown as different colored bands along the horizontal surface. The friction is shown to act all along the line separating two layers. The direction of flow of the fluid is toward right and the velocity is shown as v b for layers at the bottom and v t for layers on top. Part b of the figure shows turbulent flow on a surface with some obstruction. The fluid directions are horizontal on smooth path and irregular near the area of the obstruction. The velocity is v on top as well as at the bottom of the fluid.](../resources/Figure_12_04_02.jpg "(a) Laminar flow occurs in layers without mixing. Notice that viscosity causes drag between layers as well as with the fixed surface. (b) An obstruction in the vessel produces turbulence. Turbulent flow mixes the fluid. There is more interaction, greater heating, and more resistance than in laminar flow.")
{: #Figure2}

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Take-Home Experiment: Go Down to the River
</div>
Try dropping simultaneously two sticks into a flowing river, one near the edge of the river and one near the middle. Which one travels faster? Why?

</div>

[[Figure 3]](#Figure3) shows how viscosity is measured for a fluid. Two parallel
plates have the specific fluid between them. The bottom plate is held fixed,
while the top plate is moved to the right, dragging fluid with it. The layer (or
lamina) of fluid in contact with either plate does not move relative to the
plate, and so the top layer moves at $$v $$ while the bottom layer remains at
rest. Each successive layer from the top down exerts a force on the one below
it, trying to drag it along, producing a continuous variation in speed from $$v
$$ to 0 as shown. Care is taken to ensure that the flow is laminar; that is, the
layers do not mix. The motion in [[Figure 3]](#Figure3) is like a continuous
shearing motion. Fluids have zero shear strength, but the *rate* at which they
are sheared is related to the same geometrical factors $$A $$ and $$L $$ as is
shear deformation for solids.

![The figure shows the laminar flow of fluid between two rectangular plates each of area A. The bottom plate is shown as fixed. The distance between the plates is L. The top plate is shown to be pushed to right with a force F. The direction of movement of the layer of fluid in contact with the top plate is also toward right with velocity v. The fluid in contact with the plate in the bottom is shown to be in rest with v equals zero. As we see through the layers above the one on the bottom plate, each show a small displacement toward right in increasing order of value with the topmost layer showing the maximum.](../resources/Figure_12_04_03.jpg "The graphic shows laminar flow of fluid between two plates of area \( A \) . The bottom plate is fixed. When the top plate is pushed to the right, it drags the fluid along with it.")
{: #Figure3}

A force $$F $$ is required to keep the top plate in [[Figure 3]](#Figure3)
moving at a constant velocity $$v $$ , and experiments have shown that this
force depends on four factors. First, $$F $$ is directly proportional to $$v
$$  (until the speed is so high that turbulence occurs—then a much larger force
is needed, and it has a more complicated dependence on $$v $$ ). Second, $$F $$
is proportional to the area $$A $$ of the plate. This relationship seems
reasonable, since $$A $$ is directly proportional to the amount of fluid being
moved. Third, $$F $$ is inversely proportional to the distance between the
plates $$L $$ . This relationship is also reasonable; $$L $$ is like a lever
arm, and the greater the lever arm, the less force that is needed. Fourth, $$F
$$ is directly proportional to the **coefficient of viscosity**, $$\eta $$ . The
greater the viscosity, the greater the force required. These dependencies are
combined into the equation

<div class="equation" >
 $$F=\eta \frac{vA}{L}\text{,} $$
</div>

which gives us a working definition of fluid **viscosity** $$\eta $$. 
Solving for $$\eta $$ gives

<div class="equation" >
 $$\eta =\frac{FL}{vA}\text{,} $$
</div>

which defines viscosity in terms of how it is measured. The SI unit of viscosity
is $$\text{N}\cdot \text{m/}\left[\left(\text{m/s}\right){\text{m}}^{2}\right]
=\left({\text{N/m}}^{2}\right)\text{s or Pa}\cdot \text{s} $$ .
[[Table 1]](#Table1) lists the coefficients of viscosity for various fluids.

Viscosity varies from one fluid to another by several orders of magnitude. As
you might expect, the viscosities of gases are much less than those of liquids,
and these viscosities are often temperature dependent. The viscosity of blood
can be reduced by aspirin consumption, allowing it to flow more easily around
the body. (When used over the long term in low doses, aspirin can help prevent
heart attacks, and reduce the risk of blood clotting.)

### Laminar Flow Confined to Tubes—Poiseuille’s Law

What causes flow? The answer, not surprisingly, is pressure difference. In fact,
there is a very simple relationship between horizontal flow and pressure. Flow
rate $$Q $$ is in the direction from high to low pressure. The greater the
pressure differential between two points, the greater the flow rate. This
relationship can be stated as

<div class="equation" >
 $$Q=\frac{ {P}_{2}-{P}_{1}}{R}\text{,} $$
</div>

where $${P}_{1} $$ and $${P}_{2} $$ are the pressures at two points, such as at
either end of a tube, and $$R $$ is the resistance to flow. The resistance $$R
$$ includes everything, except pressure, that affects flow rate. For example,
$$R $$ is greater for a long tube than for a short one. The greater the
viscosity of a fluid, the greater the value of $$R $$ . Turbulence greatly
increases $$R $$ , whereas increasing the diameter of a tube decreases $$R $$ .

If viscosity is zero, the fluid is frictionless and the resistance to flow is
also zero. Comparing frictionless flow in a tube to viscous flow, as
in [[Figure 4]](#Figure4), we see that for a viscous fluid, speed is greatest at
midstream because of drag at the boundaries. We can see the effect of viscosity
in a Bunsen burner flame, even though the viscosity of natural gas is small.

The resistance $$R $$ to laminar flow of an incompressible fluid having
viscosity $$\eta $$ through a horizontal tube of uniform radius $$r $$ and
length $$l $$ , such as the one in [[Figure 5]](#Figure5), is given by

<div class="equation" >
 $$R=\frac{8\eta l}{\pi {r}^{4}}\text{.} $$
</div>

This equation is called **Poiseuille’s law for resistance** after the French
scientist J. L. Poiseuille (1799–1869), who derived it in an attempt to
understand the flow of blood, an often turbulent fluid.

![Part a of the diagram shows a fluid flow across a rectangular non viscous medium. The speed of the fluid is shown to be same across the tube represented as same length of vertical rising arrows. Part b of the diagram shows a fluid flow across a rectangular viscous medium. The speed of the fluid speed at the walls is zero, increasing steadily to its maximum at the center of the tube represented as wave like variation for length of vertical rising arrows. Part c of the figure shows a burning Bunsen burner.](../resources/Figure_12_04_04.jpg "(a) If fluid flow in a tube has negligible resistance, the speed is the same all across the tube. (b) When a viscous fluid flows through a tube, its speed at the walls is zero, increasing steadily to its maximum at the center of the tube. (c) The shape of the Bunsen burner flame is due to the velocity profile across the tube. (credit: Jason Woodhead)")
{: #Figure4}

Let us examine Poiseuille’s expression for $$R $$ to see if it makes good
intuitive sense. We see that resistance is directly proportional to both fluid
viscosity $$\eta $$ and the length $$l $$ of a tube. After all, both of these
directly affect the amount of friction encountered—the greater either is, the
greater the resistance and the smaller the flow. The radius $$r $$ of a tube
affects the resistance, which again makes sense, because the greater the radius,
the greater the flow (all other factors remaining the same). But it is
surprising that $$r $$ is raised to the *fourth* power in Poiseuille’s law. This
exponent means that any change in the radius of a tube has a very large effect
on resistance. For example, doubling the radius of a tube decreases resistance
by a factor of $${2}^{4}=16 $$.

Taken together, $$Q=\frac{ {P}_{2}-{P}_{1}}{R} $$ and $$R=\frac{8\eta l}{\pi
{r}^{4}} $$ give the following expression for flow rate:

<div class="equation" >
 $$Q=\frac{\left({P}_{2}-{P}_{1}\right)\pi r^{4}}{8\eta l}\text{.} $$
</div>

This equation describes laminar flow through a tube. It is sometimes called
Poiseuille’s law for laminar flow, or simply **Poiseuille’s law**.

<div class="example" markdown="1">
<div class="title">
Using Flow Rate: Plaque Deposits Reduce Blood Flow
</div>
Suppose the flow rate of blood in a coronary artery has been reduced to half its normal value by plaque deposits. By what factor has the radius of the artery been reduced, assuming no turbulence occurs?

**Strategy**

Assuming laminar flow, Poiseuille’s law states that

<div class="equation">
 $$Q=\frac{\left({P}_{2}-{P}_{1}\right)\pi r^{4}}{8\eta l}\text{.} $$
</div>
We need to compare the artery radius before and after the flow rate reduction.

**Solution**

With a constant pressure difference assumed and the same length and viscosity,
along the artery we have

<div class="equation" >
 $$\frac{ {Q}_{1}}{ {r}_{1}^{4}}=\frac{ {Q}_{2}}{ {r}_{2}^{4}}\text{.} $$
</div>
So, given that  $${Q}_{2}= 0.5{Q}_{1} $$ ,
 we find that  $${r}_{2}^{4}=0.5r_{1}^{4} $$.

Therefore, $${r}_{2}={\left( 0.5\right)}^{ 0.25}{r}_{1}= 0.841{r}_{1} $$ , a
decrease in the artery radius of 16%.

**Discussion**

This decrease in radius is surprisingly small for this situation. To restore the
blood flow in spite of this buildup would require an increase in the pressure
difference $$\left({P}_{2}-{P}_{1}\right) $$ of a factor of two, with subsequent
strain on the heart.

</div>

<table id="Table1" aria-describedby="Coefficients of Viscosity of Various Fluids"><caption><span class="title">Coefficients of Viscosity of Various Fluids</span></caption><thead><tr>
            <th>Fluid</th>
            <th>Temperature (ºC)</th>
            <th>Viscosity 
 $$\eta  \text{(mPa·s)} $$</th>
          </tr></thead><tbody><tr>
            <td><strong><em>Gases</em></strong></td>
            <td></td>
            <td></td>
          </tr><tr>
            <td rowspan="4">Air</td>
            <td>0</td>
            <td>0.0171</td>
          </tr><tr>
            <td>20</td>
            <td>0.0181</td>
          </tr><tr>
            <td>40</td>
            <td>0.0190</td>
          </tr><tr>
            <td>100</td>
            <td>0.0218</td>
          </tr><tr>
            <td>Ammonia</td>
            <td>20</td>
            <td>0.00974</td>
          </tr><tr>
            <td>Carbon dioxide</td>
            <td>20</td>
            <td>0.0147</td>
          </tr><tr>
            <td>Helium</td>
            <td>20</td>
            <td>0.0196</td>
          </tr><tr>
            <td>Hydrogen</td>
            <td>0</td>
            <td>0.0090</td>
          </tr><tr>
            <td>Mercury</td>
            <td>20</td>
            <td>0.0450</td>
          </tr><tr>
            <td>Oxygen</td>
            <td>20</td>
            <td>0.0203</td>
          </tr><tr>
            <td>Steam</td>
            <td>100</td>
            <td>0.0130</td>
          </tr><tr>
            <td><strong><em>Liquids</em></strong></td>
            <td></td>
            <td></td>
          </tr><tr>
            <td rowspan="5">Water</td>
            <td>0</td>
            <td>1.792</td>
          </tr><tr>
            <td>20</td>
            <td>1.002</td>
          </tr><tr>
            <td>37</td>
            <td>0.6947</td>
          </tr><tr>
            <td>40</td>
            <td>0.653</td>
          </tr><tr>
            <td>100</td>
            <td>0.282</td>
          </tr><tr>
            <td rowspan="2">Whole blood<sup class="footnote-number" id="footnote-ref1"><a class="footnote-link" href="#footnote1">1</a></sup></td>
            <td>20</td>
            <td>3.015 </td>
          </tr><tr>
            <td>37</td>
            <td>2.084</td>
          </tr><tr>
            <td rowspan="2">Blood plasma<sup class="footnote-number" id="footnote-ref2"><a class="footnote-link" href="#footnote2">2</a></sup></td>
            <td>20</td>
            <td>1.810 </td>
          </tr><tr>
            <td>37</td>
            <td>1.257</td>
          </tr><tr>
            <td>Ethyl alcohol</td>
            <td>20</td>
            <td>1.20 </td>
          </tr><tr>
            <td>Methanol</td>
            <td>20</td>
            <td>0.584</td>
          </tr><tr>
            <td>Oil (heavy machine)</td>
            <td>20</td>
            <td>660</td>
          </tr><tr>
            <td>Oil (motor, SAE 10)</td>
            <td>30</td>
            <td>200</td>
          </tr><tr>
            <td>Oil (olive)</td>
            <td>20</td>
            <td>138</td>
          </tr><tr>
            <td>Glycerin</td>
            <td>20</td>
            <td>1500</td>
          </tr><tr>
            <td>Honey</td>
            <td>20</td>
            <td>2000–10000</td>
          </tr><tr>
            <td>Maple Syrup</td>
            <td>20</td>
            <td>2000–3000</td>
          </tr><tr>
            <td>Milk</td>
            <td>20</td>
            <td>3.0</td>
          </tr><tr>
            <td>Oil (Corn)</td>
            <td>20</td>
            <td>65</td>
          </tr></tbody>
</table>

The circulatory system provides many examples of Poiseuille’s law in action—with
blood flow regulated by changes in vessel size and blood pressure. Blood vessels
are not rigid but elastic. Adjustments to blood flow are primarily made by
varying the size of the vessels, since the resistance is so sensitive to the
radius. During vigorous exercise, blood vessels are selectively dilated to
important muscles and organs and blood pressure increases. This creates both
greater overall blood flow and increased flow to specific areas. Conversely,
decreases in vessel radii, perhaps from plaques in the arteries, can greatly
reduce blood flow. If a vessel’s radius is reduced by only 5% (to 0.95 of its
original value), the flow rate is reduced to about $${\left( 0.95 \right)}^{4}=
0.81 $$ of its original value. A 19% decrease in flow is caused by a 5% decrease
in radius. The body may compensate by increasing blood pressure by 19%, but this
presents hazards to the heart and any vessel that has weakened walls. Another
example comes from automobile engine oil. If you have a car with an oil pressure
gauge, you may notice that oil pressure is high when the engine is cold. Motor
oil has greater viscosity when cold than when warm, and so pressure must be
greater to pump the same amount of cold oil.

![The figure shows a section of a cylindrical tube of length l. The two end cross section are shown to have pressure P two and P one respectively. The radius of the cylindrical tube is given by r. The direction of flow is shown by horizontal arrows toward right end of the tube. The flow rate is marked as Q.](../resources/Figure_12_04_05.jpg "Poiseuille&#x2019;s law applies to laminar flow of an incompressible fluid of viscosity \( \eta \) through a tube of length \( l \) and radius \( r \). The direction of flow is from greater to lower pressure. Flow rate \( Q \) is directly proportional to the pressure difference \( P_2-P_1 \) , and inversely proportional to the length \( l \) of the tube and viscosity \( \eta \) of the fluid. Flow rate increases with \( r^4 \), the fourth power of the radius.")
{: #Figure5}

<div id="Example2" class="example" markdown="1">
<div class="title">
What Pressure Produces This Flow Rate?
</div>
An intravenous (IV) system is supplying saline solution to a patient at the rate of  $$ 0.120 {\text{cm}}^{3}\text{/s} $$
 through a needle of radius 0.150 mm and length 2.50 cm. What pressure is needed at the entrance of the needle to cause this flow, assuming the viscosity of the saline solution to be the same as that of water? The gauge pressure of the blood in the patient’s vein is 8.00 mm Hg. (Assume that the temperature is  $$20 \text{ºC} $$ .)

**Strategy**

Assuming laminar flow, Poiseuille’s law applies. This is given by

<div class="equation" >
 $$Q=\frac{\left({P}_{2}-{P}_{1}\right)\pi {r}^{4}}{8\eta l}\text{,} $$
</div>
where  $${P}_{2} $$
 is the pressure at the entrance of the needle and  $${P}_{1} $$
 is the pressure in the vein. The only unknown is  $${P}_{2} $$.

**Solution**

Solving for $${P}_{2} $$ yields

<div class="equation" >
 $${P}_{2}=\frac{8\eta l}{ \pi r^{4}}Q+{P}_{1} \text{.} $$
</div>
 $${P}_{1} $$
 is given as 8.00 mm Hg, which converts to  $$ 1.066 \times 10^{3}  {\text{N/m}}^{2} $$ .
 Substituting this and the other known values yields

<div class="equation" >
 $$\begin{array}{lll}{P}_{2}& =& \left[ \frac{8\left( 1.00 \times 10^{-3}  \text{N}\cdot {\text{s/m}}^{2}\right)\left( 2.50 \times 10^{-2}  \text{m}\right)}{\pi { \left( 0.150 \times 10^{-3}  \text{m} \right)}^{4}}\right]  \left( 1.20 \times 10^{-7}  {\text{m}}^{3}\text{/s}\right)+ 1.066 \times 10^{3}  {\text{N/m}}^{2}\\ 
{P}_{2}& =&  1.62 \times 10^{4}  {\text{N/m}}^{2}\text{.}\end{array} $$
</div>
**Discussion**

This pressure could be supplied by an IV bottle with the surface of the saline
solution 1.61 m above the entrance to the needle (this is left for you to solve
in this chapter’s Problems and Exercises), assuming that there is negligible
pressure drop in the tubing leading to the needle.

</div>

### Flow and Resistance as Causes of Pressure Drops

You may have noticed that water pressure in your home might be lower than normal
on hot summer days when there is more use. This pressure drop occurs in the
water main before it reaches your home. Let us consider flow through the water
main as illustrated in [[Figure 6]](#Figure6). We can understand why the
pressure $${P}_{1} $$ to the home drops during times of heavy use by rearranging

<div class="equation" >
 $$Q=\frac{ {P}_{2}-{P}_{1}}{R} $$
</div>

to

<div class="equation">
 $${P}_{2}-{P}_{1}=RQ\text{,} $$
</div>

where, in this case, $${P}_{2} $$ is the pressure at the water works and $$R $$
is the resistance of the water main. During times of heavy use, the flow rate
$$Q $$ is large. This means that $${P}_{2}-{P}_{1} $$ must also be large. Thus
$${P}_{1} $$ must decrease. It is correct to think of flow and resistance as
causing the pressure to drop from $${P}_{2} $$ to $${P}_{1} $$ . $${P}_{2}-{P}_
{1}=RQ $$ is valid for both laminar and turbulent flows.

![Figure shows the water distribution system from a water works to homes around that area. The pressure at the pipeline near the water works is shown to have a pressure P two and the pressure at the dividing point were the pipe line splits to corresponding houses the pressure is shown as P one.](../resources/Figure_12_04_06.jpg "During times of heavy use, there is a significant pressure drop in a water main, and \( P_1 \) supplied to users is significantly less than \( P_2 \) created at the water works. If the flow is very small, then the pressure drop is negligible, and \( P_2 \approx P_1 \).")
{: #Figure6}

We can use $${P}_{2}-{P}_{1}=RQ $$ to analyze pressure drops occurring in more
complex systems in which the tube radius is not the same everywhere. Resistance
will be much greater in narrow places, such as an obstructed coronary artery.
For a given flow rate $$Q $$ , the pressure drop will be greatest where the tube
is most narrow. This is how water faucets control flow. Additionally, $$R $$ is
greatly increased by turbulence, and a constriction that creates turbulence
greatly reduces the pressure downstream. Plaque in an artery reduces pressure
and hence flow, both by its resistance and by the turbulence it creates.

[[Figure 7]](#Figure7) is a schematic of the human circulatory system, showing
average blood pressures in its major parts for an adult at rest. Pressure
created by the heart’s two pumps, the right and left ventricles, is reduced by
the resistance of the blood vessels as the blood flows through them. The left
ventricle increases arterial blood pressure that drives the flow of blood
through all parts of the body except the lungs. The right ventricle receives the
lower pressure blood from two major veins and pumps it through the lungs for gas
exchange with atmospheric gases – the disposal of carbon dioxide from the blood
and the replenishment of oxygen. Only one major organ is shown schematically,
with typical branching of arteries to ever smaller vessels, the smallest of
which are the capillaries, and rejoining of small veins into larger ones.
Similar branching takes place in a variety of organs in the body, and the
circulatory system has considerable flexibility in flow regulation to these
organs by the dilation and constriction of the arteries leading to them and the
capillaries within them. The sensitivity of flow to tube radius makes this
flexibility possible over a large range of flow rates.

![Figure is a schematic diagram of the circulatory system. The lungs, heart, arteries and vein systems are shown. The blood is shown to flow from the left atrium through the arteries, then through the veins and back to the right atrium. The flow is also shown from right atrium to the lungs and from lungs back to left atrium. All parts of the system are labeled. Pressure various points of the system all along the movement of blood across various parts are also marked.](../resources/Figure_12_04_07.jpg "Schematic of the circulatory system. Pressure difference is created by the two pumps in the heart and is reduced by resistance in the vessels. Branching of vessels into capillaries allows blood to reach individual cells and exchange substances, such as oxygen and waste products, with them. The system has an impressive ability to regulate flow to individual organs, accomplished largely by varying vessel diameters.")
{: #Figure7}

Each branching of larger vessels into smaller vessels increases the total
cross-sectional area of the tubes through which the blood flows. For example, an
artery with a cross-section of $$1 {\text{cm}}^{2} $$ may branch into 20 smaller
arteries, each with cross-sections of $$0.5 {\text{cm}}^{2} $$ , with a total of
$$10 {\text{cm}}^{2} $$ . In that manner, the resistance of the branchings is
reduced so that pressure is not entirely lost. Moreover, because
$$Q=A\overline{v} $$ and $$A $$ increases through branching, the average
velocity of the blood in the smaller vessels is reduced. The blood velocity in
the aorta ( $$\text{diameter}=1 \text{cm} $$ )
is about 25 cm/s, while in the capillaries ( $$20\mu \text{m} $$ in diameter)
the velocity is about 1 mm/s. This reduced velocity allows the blood to exchange
substances with the cells in the capillaries and alveoli in particular.

### Section Summary

* Laminar flow is characterized by smooth flow of the fluid in layers that do
  not mix.
* Turbulence is characterized by eddies and swirls that mix layers of fluid
  together.
* Fluid viscosity $$\eta $$ is due to friction within a fluid. Representative values are given
      in [[Table 1]](#Table1). Viscosity has units of $$\left(
      {\text{N/m}}^{2}\right)\text{s} $$ or $$\text{Pa}\cdot \text{s} $$ .
* Flow is proportional to pressure difference and inversely proportional to
  resistance:

  <div class="equation" >
   $$Q=\frac{ {P}_{2}-{P}_{1}}{R}. $$
  </div>

* For laminar flow in a tube, Poiseuille’s law for resistance states that

  <div class="equation" >
   $$R=\frac{8\eta l}{ \pi r^{4}}. $$
  </div>

* Poiseuille’s law for flow in a tube is

  <div class="equation" >
   $$Q=\frac{\left({P}_{2}-{P}_{1}\right)\pi {r}^{4}}{8\eta l}. $$
  </div>

* The pressure drop caused by flow and resistance is given by

  <div class="equation" >
   $${P}_{2}-{P}_{1}=RQ. $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Explain why the viscosity of a liquid decreases with temperature—that is, how might increased temperature reduce the effects of cohesive forces in a liquid? Also explain why the viscosity of a gas increases with temperature—that is, how does increased gas temperature create more collisions between atoms and molecules?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
When paddling a canoe upstream, it is wisest to travel as near to the shore as possible. When canoeing downstream, it may be best to stay near the middle. Explain why.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why does flow decrease in your shower when someone flushes the toilet?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Plumbing usually includes air-filled tubes near water faucets, as shown in [[Figure 8]](#Figure8). Explain why they are needed and how they work.

![The picture shows water gushing out of a water tap. The faucet in the tap is marked. A pipe connected vertically filled with air is shown at an opening on the water pipe before the tap.](../resources/Figure_12_04_08.jpg "The vertical tube near the water tap remains full of air and serves a useful purpose.")
{: #Figure8}

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the retarding force due to the viscosity of the air layer between a cart and a level air track given the following information—air temperature is  $$20 \text{ºC} $$ ,
 the cart is moving at 0.400 m/s, its surface area is  $$ 2.50 \times 10^{-2}  {\text{m}}^{2} $$ ,
 and the thickness of the air layer is  $$ 6.00 \times 10^{-5}  \text{m} $$ .
 (b) What is the ratio of this force to the weight of the 0.300-kg cart?

</div>
<div class="solution" markdown="1">
(a)  $$ 3.02 \times 10^{-3}  \text{N} $$
(b)  $$ 1.03 \times 10^{-3}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What force is needed to pull one microscope slide over another at a speed of 1.00 cm/s, if there is a 0.500-mm-thick layer of  $$20 \text{ºC} $$
 water between them and the contact area is  $$8.00 {\text{cm}}^{2} $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A glucose solution being administered with an IV has a flow rate of  $$ 4.00 {\text{cm}}^{3}\text{/min} $$ .
 What will the new flow rate be if the glucose is replaced by whole blood having the same density but a viscosity 2.50 times that of the glucose? All other factors remain constant.

</div>
<div class="solution" markdown="1">
 $$1.60 {\text{cm}}^{3}\text{/min} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The pressure drop along a length of artery is 100 Pa, the radius is 10 mm, and the flow is laminar. The average speed of the blood is 15 mm/s. (a) What is the net force on the blood in this section of artery? (b) What is the power expended maintaining the flow?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A small artery has a length of  $$ 1.1 \times 10^{-3}  \text{m} $$
 and a radius of  $$ 2.5 \times 10^{-5}  \text{m} $$ .
 If the pressure drop across the artery is 1.3 kPa, what is the flow rate through the artery? (Assume that the temperature is <span> $$37 \text{ºC} $$ .)
</span>

</div>
<div class="solution" markdown="1">
 $$ 8.7 \times 10^{-11}  {\text{m}}^{3}\text{/s} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Fluid originally flows through a tube at a rate of  $$100 {\text{cm}}^{3}\text{/s} $$ .
 To illustrate the sensitivity of flow rate to various factors, calculate the new flow rate for the following changes with all other factors remaining the same as in the original conditions. (a) Pressure difference increases by a factor of 1.50. (b) A new fluid with 3.00 times greater viscosity is substituted. (c) The tube is replaced by one having 4.00 times the length. (d) Another tube is used with a radius 0.100 times the original. (e) Yet another tube is substituted with a radius 0.100 times the original and half the length, *and* the pressure difference is increased by a factor of 1.50.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The arterioles (small arteries) leading to an organ, constrict in order to decrease flow to the organ. To shut down an organ, blood flow is reduced naturally to 1.00% of its original value. By what factor did the radii of the arterioles constrict? Penguins do this when they stand on ice to reduce the blood flow to their feet.

</div>
<div class="solution" markdown="1">
0.316

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Angioplasty is a technique in which arteries partially blocked with plaque are dilated to increase blood flow. By what factor must the radius of an artery be increased in order to increase blood flow by a factor of 10?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Suppose a blood vessel’s radius is decreased to 90.0% of its original value by plaque deposits and the body compensates by increasing the pressure difference along the vessel to keep the flow rate constant. By what factor must the pressure difference increase? (b) If turbulence is created by the obstruction, what additional effect would it have on the flow rate?

</div>
<div class="solution" markdown="1">
(a) 1.52

(b) Turbulence will decrease the flow rate of the blood, which would require an
even larger increase in the pressure difference, leading to higher blood
pressure.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A spherical particle falling at a terminal speed in a liquid must have the gravitational force balanced by the drag force and the buoyant force. The buoyant force is equal to the weight of the displaced fluid, while the drag force is assumed to be given by Stokes Law,  $${F}_{s}=6\pi r\eta v $$ .
 Show that the terminal speed is given by

<div class="equation" >
 $$v=\frac{ {2R}^{2}g}{9\eta }\left({\rho }_{\text{s}}-{\rho }_{1}\right), $$
</div>
where  $$R $$  is the radius of the sphere,  $${\rho }_{\text{s}} $$
 is its density, and  $${\rho }_{1} $$
 is the density of the fluid and  $$\eta  $$  the coefficient of viscosity.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Using the equation of the previous problem, find the viscosity of motor oil in which a steel ball of radius 0.8 mm falls with a terminal speed of 4.32 cm/s. The densities of the ball and the oil are 7.86 and 0.88 g/mL, respectively.

</div>
<div class="solution">
<div class="equation" >
 $$225 \text{mPa}\cdot \text{s} $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A skydiver will reach a terminal velocity when the air drag equals their weight. For a skydiver with high speed and a large body, turbulence is a factor. The drag force then is approximately proportional to the square of the velocity. Taking the drag force to be  $${F}_{\text{D}}=\frac{1}{2}\rho Av^{2} $$
 and setting this equal to the person’s weight, find the terminal speed for a person falling “spread eagle.” Find both a formula and a number for  $${v}_{\text{t}} $$ ,
 with assumptions as to size.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A layer of oil 1.50 mm thick is placed between two microscope slides. Researchers find that a force of  $$ 5.50 \times 10^{-4}  \text{N} $$
 is required to glide one over the other at a speed of 1.00 cm/s when their contact area is  $$ 6.00 {\text{cm}}^{2} $$ .
 What is the oil’s viscosity? What type of oil might it be?

</div>
<div class="solution" markdown="1">
<div class="equation" >
 $$0.138 \text{Pa}\cdot \text{s} \text{,}  $$
</div>
or

Olive oil.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Verify that a 19.0% decrease in laminar flow through a tube is caused by a 5.00% decrease in radius, assuming that all other factors remain constant, as stated in the text. (b) What increase in flow is obtained from a 5.00% increase in radius, again assuming all other factors remain constant?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
[[Example 2]](#Example2) dealt with the flow of saline solution in an IV system. (a) Verify that a pressure of  $$ 1.62 \times 10^{4}  {\text{N/m}}^{2} $$
 is created at a depth of 1.61 m in a saline solution, assuming its density to be that of sea water. (b) Calculate the new flow rate if the height of the saline solution is decreased to 1.50 m. (c) At what height would the direction of flow be reversed? (This reversal can be a problem when patients stand up.)

</div>
<div class="solution" markdown="1">
(a)  $$ 1.62 \times 10^{4}  {\text{N/m}}^{2} $$
(b)  $$0.111 {\text{cm}}^{3}\text{/s} $$
(c)10.6 cm

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
When physicians diagnose arterial blockages, they quote the reduction in flow rate. If the flow rate in an artery has been reduced to 10.0% of its normal value by a blood clot and the average pressure difference has increased by 20.0%, by what factor has the clot reduced the radius of the artery?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
During a marathon race, a runner’s blood flow increases to 10.0 times her resting rate. Her blood’s viscosity has dropped to 95.0% of its normal value, and the blood pressure difference across the circulatory system has increased by 50.0%. By what factor has the average radii of her blood vessels increased?

</div>
<div class="solution" markdown="1">
1.59

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Water supplied to a house by a water main has a pressure of  $$ 3.00 \times 10^{5}  {\text{N/m}}^{2} $$
 early on a summer day when neighborhood use is low. This pressure produces a flow of 20.0 L/min through a garden hose. Later in the day, pressure at the exit of the water main and entrance to the house drops, and a flow of only 8.00 L/min is obtained through the same hose. (a) What pressure is now being supplied to the house, assuming resistance is constant? (b) By what factor did the flow rate in the water main increase in order to cause this decrease in delivered pressure? The pressure at the entrance of the water main is  $$ 5.00 \times 10^{5}  {\text{N/m}}^{2} $$ ,
 and the original flow rate was 200 L/min. (c) How many more users are there, assuming each would consume 20.0 L/min in the morning?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An oil gusher shoots crude oil 25.0 m into the air through a pipe with a 0.100-m diameter. Neglecting air resistance but not the resistance of the pipe, and assuming laminar flow, calculate the gauge pressure at the entrance of the 50.0-m-long vertical pipe. Take the density of the oil to be  $$900 {\text{kg/m}}^{3} $$
 and its viscosity to be  $$ 1.00 \left({\text{N/m}}^{2}\right)\cdot \text{s} $$
 (or  $$1.00 \text{Pa}\cdot \text{s} $$ ).
Note that you must take into account the pressure due to the 50.0-m column of oil in the pipe.

</div>
<div class="solution" markdown="1">
 $$ 2.95 \times 10^{6}  {\text{N/m}}^{2} $$
(gauge pressure)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Concrete is pumped from a cement mixer to the place it is being laid, instead of being carried in wheelbarrows. The flow rate is 200.0 L/min through a 50.0-m-long, 8.00-cm-diameter hose, and the pressure at the pump is  $$ 8.00 \times 10^{6}  {\text{N/m}}^{2} $$ .
 (a) Calculate the resistance of the hose. (b) What is the viscosity of the concrete, assuming the flow is laminar? (c) How much power is being supplied, assuming the point of use is at the same level as the pump? You may neglect the power supplied to increase the concrete’s velocity.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider a coronary artery constricted by arteriosclerosis. Construct a problem
in which you calculate the amount by which the diameter of the artery is
decreased, based on an assessment of the decrease in flow rate.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Consider a river that spreads out in a delta region on its way to the sea. Construct a problem in which you calculate the average speed at which water moves in the delta region, based on the speed at which it was moving up river. Among the things to consider are the size and flow rate of the river before it spreads out and its size once it has spread out. You can construct the problem for the river spreading out into one large river or into multiple smaller rivers.

</div>
</div>

<div class="footnote-refs" markdown="1">
### Footnotes
{: class="footnote-refs-title"}

* {: class="footnote-ref" #footnote1} [1](#footnote-ref1){: class="
  footnote-ref-link"} <span class="footnote-ref-content">The ratios of the
  viscosities of blood to water are nearly constant between 0ºC and 37ºC.</span>
* {: class="footnote-ref" #footnote2} [2](#footnote-ref2){: class="
  footnote-ref-link"} <span class="footnote-ref-content">See note on Whole
  Blood.</span>
  { data-list-type="bulleted" data-bullet-style="none"}

</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

laminar
: a type of fluid flow in which layers do not mix

turbulence
: fluid flow in which layers mix together via eddies and swirls

viscosity
: the friction in a fluid, defined in terms of the friction between layers

Poiseuille’s law for resistance
: the resistance to laminar flow of an incompressible fluid in a tube: *R = 8
ηl/πr<sup>4</sup>*

Poiseuille’s law
: the rate of laminar flow of an incompressible fluid in a tube: *Q = (P<sub>
2</sub> − P<sub>1</sub>)πr<sup>4</sup>/8ηl*

</div>
