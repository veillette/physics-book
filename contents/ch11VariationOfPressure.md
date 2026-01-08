---
title: Variation of Pressure with Depth in a Fluid
layout: page
sectionNumber: 4
chapterNumber: 11
---

<div class="abstract" markdown="1">
* Define pressure in terms of weight.
* Explain the variation of pressure with depth in a fluid.
* Calculate density given pressure and altitude.
</div>

If your ears have ever popped on a plane flight or ached during a deep dive in a
swimming pool, you have experienced the effect of depth on pressure in a fluid.
At the Earth’s surface, the air pressure exerted on you is a result of the
weight of air above you. This pressure is reduced as you climb up in altitude
and the weight of air above you decreases. Under water, the pressure exerted on
you increases with increasing depth. In this case, the pressure being exerted
upon you is a result of both the weight of water above you _and_ that of the
atmosphere above you. You may notice an air pressure change on an elevator ride
that transports you many stories, but you need only dive a meter or so below the
surface of a pool to feel a pressure increase. The difference is that water is
much denser than air, about 775 times as dense.

Consider the container in [[Figure 1]](#Figure1). Its bottom supports the weight
of the fluid in it. Let us calculate the pressure exerted on the bottom by the
weight of the fluid. That **pressure** is the weight of the fluid $$mg $$
divided by the area $$A $$ supporting it (the area of the bottom of the
container):

<div class="equation" >
 $$P=\frac{mg}{A}. $$
</div>

We can find the mass of the fluid from its volume and density:

<div class="equation" >
 $$m=\rho V. $$
</div>

The volume of the fluid $$V $$ is related to the dimensions of the container. It is

<div class="equation" >
 $$V=Ah, $$
</div>

where $$A $$ is the cross-sectional area and $$h $$ is the depth. Combining the
last two equations gives

<div class="equation" >
 $$m=\rho Ah. $$
</div>

If we enter this into the expression for pressure, we obtain

<div class="equation" >
 $$P=\frac{\left(\rho Ah\right)g}{A}. $$
</div>

The area cancels, and rearranging the variables yields

<div class="equation" >
 $$P=h \rho g. $$
</div>

This value is the _pressure due to the weight of a fluid_. The equation has
general validity beyond the special conditions under which it is derived here.
Even if the container were not there, the surrounding fluid would still exert
this pressure, keeping the fluid static. Thus the equation $$P=h \rho g $$
represents the pressure due to the weight of any fluid of *average density*
$$\rho $$ at any depth $$h $$ below its surface. For liquids, which are nearly
incompressible, this equation holds to great depths. For gases, which are quite
compressible, one can apply this equation as long as the density changes are
small over the depth considered. [[Example 2]](#Example2) illustrates this
situation.

![A container with fluid filled to a depth h. The fluid’s weight w equal to m times g is shown by an arrow pointing downward. A denotes the area of the fluid at the bottom of the container and as well as on the surface.](../resources/Figure_11_04_01.jpg 'The bottom of this container supports the entire weight of the fluid in it. The vertical sides cannot exert an upward force on the fluid (since it cannot withstand a shearing force), and so the bottom must support it all.')
{: #Figure1}

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating the Average Pressure and Force Exerted: What Force Must a Dam Withstand?
</div>
In [[Example 1]](../contents/ch11Density#Example1), we calculated the mass of water in a large reservoir. We will now consider the pressure and force acting on the dam retaining water. (See [[Figure 2]](#Figure2).) The dam is 500 m wide, and the water is 80.0 m deep at the dam. (a) What is the average pressure on the dam due to the water? (b) Calculate the force exerted against the dam and compare it with the weight of water in the dam (previously found to be  $$1.96 \times 10^{13}  \text{N} $$ ).

**Strategy for (a)**

The average pressure $$\overline{P} $$ due to the weight of the water is the
pressure at the average depth $$\overline{h} $$ of 40.0 m, since pressure
increases linearly with depth.

**Solution for (a)**

The average pressure due to the weight of a fluid is

<div class="equation" >
 $$\overline{P}=\overline{h}\rho g. $$
</div>
Entering the density of water from [[Table 1]](../contents/ch11Density#Table1) and taking  $$\overline{h} $$
 to be the average depth of 40.0 m, we obtain

<div class="equation" >
 $$\begin{array}{lll}\overline{P}& =& \left(40.0 \text{m}\right)\left(10^{3} \frac{\text{kg}}{ {\text{m}}^{3}}\right)\left(9.80 \frac{\text{m}}{ {\text{s}}^{2}}\right)\\ & =&  3.92 \times 10^{5}  \frac{\text{N}}{ {\text{m}}^{2}}=392 \text{kPa} \text{.} \end{array} $$
</div>
**Strategy for (b)**

The force exerted on the dam by the water is the average pressure times the area
of contact:

<div class="equation" >
 $$F=\overline{P}A. $$
</div>
**Solution for (b)**

We have already found the value for $$\overline{P} $$ . The area of the dam is
$$A=80.0 \text{m}×500 \text{m}= 4.00 \times 10^{4} {\text{m}}^{2} $$ , so that

<div class="equation" >
 $$\begin{array}{lll}F& =& \left( 3.92 \times 10^{5}  {\text{N/m}}^{2}\right)\left( 4.00 \times 10^{4}  {\text{m}}^{2}\right)\\ & =&  1.57 \times 10^{10}  \text{N} \text{.} \end{array} $$
</div>
**Discussion**

Although this force seems large, it is small compared with the $$ 1.96 \times 10^{13} \text{N} $$ weight of the water in the reservoir—in fact, it is only
$$0.0800\% $$ of the weight. Note that the pressure found in part (a) is
completely independent of the width and length of the lake—it depends only on
its average depth at the dam. Thus the force depends only on the water’s average
depth and the dimensions of the dam, _not_ on the horizontal extent of the
reservoir. In the diagram, the thickness of the dam increases with depth to
balance the increasing force due to the increasing pressure.

</div>

![A two-dimensional view of a dam with dimensions L and h is shown. Force F at h is shown by a horizontal arrow. The force F exerted by water on the dam is F equals average pressure p bar into area A and pressure in turn is average height h bar into density rho into acceleration due to gravity g.](../resources/Figure_11_04_02.jpg 'The dam must withstand the force exerted against it by the water it retains. This force is small compared with the weight of the water behind the dam.')
{: #Figure2}

_Atmospheric pressure_ is another example of pressure due to the weight of a
fluid, in this case due to the weight of _air_ above a given height. The
atmospheric pressure at the Earth’s surface varies a little due to the
large-scale flow of the atmosphere induced by the Earth’s rotation (this creates
weather “highs” and “lows”). However, the average pressure at sea level is given
by the _standard atmospheric pressure_ $${P}_{\text{atm}} $$ , measured to be

<div class="equation" >
 $$1 \text{atmosphere (atm)}={P}_{\text{atm}}= 1.01 \times 10^{5}  {\text{N/m}}^{2}=101 \text{kPa}. $$
</div>

This relationship means that, on average, at sea level, a column of air above
$$1.00 {\text{m}}^{2} $$ of the Earth’s surface has a weight of $$ 1.01 \times 10^{5} \text{N} $$ , equivalent to $$1 \text{atm} $$ .
(See [[Figure 3]](#Figure3).)

![Figure shows a column of air exerting a weight of one point zero one times ten to the power five newtons on a rectangular patch of ground of one square meter cross section.](../resources/Figure_11_04_03.jpg 'Atmospheric pressure at sea level averages ( 1.01 \\times 10^5 \\text{Pa} ) (equivalent to 1 atm), since the column of air over this ( 1 \\text{m}^2 ), extending to the top of the atmosphere, weighs ( 1.01 \\times 10^5 \\text{N} ) .')
{: #Figure3}

<div id="Example2" class="example" markdown="1">
<div class="title">
Calculating Average Density: How Dense Is the Air?
</div>
Calculate the average density of the atmosphere, given that it extends to an altitude of 120 km. Compare this density with that of air listed in [[Table 1]](../contents/ch11Density#Table1).

**Strategy**

If we solve $$P=h \rho g $$ for density, we see that

<div class="equation" >
 $$\overline{\rho }=\frac{P}{\text{hg}}. $$
</div>
We then take  $$P $$  to be atmospheric pressure,  $$h $$  is given, and  $$g $$
 is known, and so we can use this to calculate  $$\overline{\rho } $$.

**Solution**

Entering known values into the expression for $$\overline{\rho } $$ yields

<div class="equation" >
 $$\overline{\rho }=\frac{ 1.01 \times 10^{5}  {\text{N/m}}^{2}}{\left(120 \times 10^{3}  \text{m}\right)\left( 9.80 {\text{m/s}}^{2}\right)}= 8.59 \times 10^{-2}  {\text{kg/m}}^{3}. $$
</div>
**Discussion**

This result is the average density of air between the Earth’s surface and the
top of the Earth’s atmosphere, which essentially ends at 120 km. The density of
air at sea level is given in [[Table 1]](../contents/ch11Density#Table1) as $$ 1.29 {\text{kg/m}}^{3} $$ —about 15 times its average value. Because air is so
compressible, its density has its highest value near the Earth’s surface and
declines rapidly with altitude.

</div>

<div id="Example3" class="example" markdown="1">
<div class="title">
Calculating Depth Below the Surface of Water: What Depth of Water Creates the Same Pressure as the Entire Atmosphere?
</div>
Calculate the depth below the surface of water at which the pressure due to the weight of the water equals 1.00 atm.

**Strategy**

We begin by solving the equation $$P=h \rho g $$ for depth $$h $$ \:

<div class="equation" >
 $$h=\frac{P}{\rho g}. $$
</div>
Then we take  $$P $$
 to be 1.00 atm and  $$\rho  $$
 to be the density of the water that creates the pressure.

**Solution**

Entering the known values into the expression for $$h $$ gives

<div class="equation" >
 $$h=\frac{ 1.01 \times 10^{5}  {\text{N/m}}^{2}}{\left( 1.00 \times 10^{3}  {\text{kg/m}}^{3}\right)\left( 9.80 {\text{m/s}}^{2}\right)}= 10.3 \text{m}. $$
</div>
**Discussion**

Just 10.3 m of water creates the same pressure as 120 km of air. Since water is
nearly incompressible, we can neglect any change in its density over this depth.

</div>

What do you suppose is the _total_ pressure at a depth of 10.3 m in a swimming
pool? Does the atmospheric pressure on the water’s surface affect the pressure
below? The answer is yes. This seems only logical, since both the water’s weight
and the atmosphere’s weight must be supported. So the _total_ pressure at a
depth of 10.3 m is 2 atm—half from the water above and half from the air above.
We shall see in [Pascal’s Principle](../contents/ch11PascalsPrinciple) that fluid pressures
always add in this way.

### Section Summary

- Pressure is the weight of the fluid $$mg $$ divided by the area $$A $$
  supporting it (the area of the bottom of the container):

  <div class="equation" >
   $$P=\frac{mg}{A}. $$
  </div>

- Pressure due to the weight of a liquid is given by
  <div class="equation" >
  $$P=h \rho g, $$
  </div>
    where  $$P $$ is the pressure,  $$h $$ is the height of the liquid,  $$\rho  $$
    is the density of the liquid, and  $$g $$ is the acceleration due to gravity.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Atmospheric pressure exerts a large force (equal to the weight of the atmosphere above your body—about 10 tons) on the top of your body when you are lying on the beach sunbathing. Why are you able to get up?

</div>
<div class="solution" markdown="1">
**Strategy:**
Consider that atmospheric pressure acts on all surfaces, not just the top of your body. Analyze the net force from atmospheric pressure.

**Solution:**
You can get up because **atmospheric pressure acts equally on all sides of your body, resulting in zero net force from atmospheric pressure.**

Force analysis:
- Pressure on top (pushing down): $$ F_{\text{top}} = P_{\text{atm}} \times A_{\text{top}} $$
- Pressure on bottom (pushing up): $$ F_{\text{bottom}} = P_{\text{atm}} \times A_{\text{bottom}} $$
- Since $$ A_{\text{top}} \approx A_{\text{bottom}} $$, these forces cancel

The atmosphere also pushes inward on all sides of your body (front, back, sides), but your body's internal pressure (blood pressure, pressure in tissues) balances these forces. Your body has evolved to function at atmospheric pressure, with internal pressures that counterbalance the external atmospheric pressure.

**Discussion:**
This is similar to why fish don't feel crushed by water pressure—their internal pressure matches the external water pressure. If atmospheric pressure suddenly disappeared (like in a vacuum), the internal pressure would cause your body to expand. Conversely, deep-sea creatures brought to the surface too quickly can be damaged because their internal pressure exceeds the reduced external pressure. The key insight is that pressure forces from all directions must be considered together.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why does atmospheric pressure decrease more rapidly than linearly with altitude?

</div>
<div class="solution" markdown="1">
**Strategy:**
Consider how the density of air varies with altitude due to its compressibility, and how this affects the pressure-altitude relationship.

**Solution:**
Atmospheric pressure decreases more rapidly than linearly because **air is compressible, so its density decreases with altitude, causing pressure to drop exponentially rather than linearly.**

Detailed explanation:
1. The equation $$ P = \rho g h $$ assumes constant density
2. For incompressible fluids (like water), this gives linear pressure increase with depth
3. Air is highly compressible—at lower altitudes, the weight of air above compresses the air, increasing its density
4. At higher altitudes, less air above means less compression and lower density
5. Since pressure depends on the weight of air above, and that air has decreasing density at higher altitudes, pressure drops off faster than linear

Mathematically, for an isothermal atmosphere:
$$ P = P_0 e^{-h/H} $$

where $$ H $$ is the scale height (about 8.5 km for Earth). This exponential decay is faster than linear at low altitudes.

**Discussion:**
At sea level, about 50% of the atmosphere's mass is below 5.5 km altitude. The next 50% is spread over the remaining ~115 km to the edge of space. This concentration of air at low altitudes is why aircraft pressurize cabins for high-altitude flight, and why weather phenomena occur primarily in the lowest layer of the atmosphere (troposphere).

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What are two reasons why mercury rather than water is used in barometers?

</div>
<div class="solution" markdown="1">
**Strategy:**
Compare the physical properties of mercury and water that affect barometer design and practicality.

**Solution:**
Two key reasons mercury is preferred over water in barometers:

**1. Mercury's high density allows for a much shorter tube**

From $$ P = \rho g h $$, solving for height: $$ h = P/(\rho g) $$

For 1 atm pressure:
- Mercury ($$ \rho = 13,600 \text{ kg/m}^3 $$): $$ h = 0.760 \text{ m} $$ (76 cm)
- Water ($$ \rho = 1,000 \text{ kg/m}^3 $$): $$ h = 10.3 \text{ m} $$

A water barometer would need to be over 10 meters tall—impractical for most applications!

**2. Mercury has very low vapor pressure at room temperature**

- Mercury's vapor pressure at 20°C: ~0.002 mm Hg (negligible)
- Water's vapor pressure at 20°C: ~17.5 mm Hg

The space above the mercury column must be a near-vacuum. Water would evaporate into this space, creating vapor pressure that would depress the column and give inaccurate readings. Mercury's extremely low evaporation rate maintains the vacuum.

**Discussion:**
Additional advantages of mercury include: it doesn't wet glass (forms clean meniscus for easy reading), it's chemically stable, and its silvery appearance makes the column easily visible. However, mercury's toxicity has led to restrictions on its use, and modern barometers often use aneroid (mechanical) or electronic pressure sensors instead.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
[[Figure 4]](#Figure4) shows how sandbags placed around a leak outside a river levee can effectively stop the flow of water under the levee. Explain how the small amount of water inside the column formed by the sandbags is able to balance the much larger body of water behind the levee.

![The figure shows a flooding river on the extreme right, with a levee set up on its left, and sandbags are stacked on the left of the levee. The height of the levee and that of the stacked sandbags is greater than the water level of the flooding river, so the water does not flow over their tops, but a leak under the levee allows some water to flow under it and reach the sandbags.](../resources/Figure_11_04_04.jpg 'Because the river level is very high, it has started to leak under the levee. Sandbags are placed around the leak, and the water held by them rises until it is the same level as the river, at which point the water there stops rising.')
{: #Figure4}

</div>
<div class="solution" markdown="1">
**Strategy:**
Apply the principle that pressure in a connected fluid depends only on depth, not on the total volume of fluid.

**Solution:**
The small column of water can balance the large river because **pressure at a given depth depends only on the height of the fluid column above that point, not on the total volume of water.**

From $$ P = \rho g h $$:
- The pressure at the base of the leak depends only on the height $$ h $$ of water above it
- The river's pressure at the leak: $$ P_{\text{river}} = \rho g h_{\text{river}} $$
- The sandbag column's pressure: $$ P_{\text{column}} = \rho g h_{\text{column}} $$

When $$ h_{\text{column}} = h_{\text{river}} $$:
- Both pressures are equal
- No net pressure difference exists to drive flow
- Water stops rising in the sandbag column

The total volume or horizontal extent of the river is irrelevant—only the vertical height matters for determining pressure.

**Discussion:**
This counterintuitive result is sometimes called the "hydrostatic paradox." It's the same principle that allows a thin tube of water to exert the same pressure as a wide lake at the same depth. This is also how water towers work: a relatively small tank elevated to a certain height provides the same pressure as if the entire water supply were at that elevation. The sandbag technique is a practical emergency flood control method used by civil engineers worldwide.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why is it difficult to swim under water in the Great Salt Lake?

</div>
<div class="solution" markdown="1">
**Strategy:**
Consider how the high salt content affects water density and thus the buoyant force on a swimmer.

**Solution:**
It is difficult to swim under water in the Great Salt Lake because **the extremely high salt concentration makes the water much denser than the human body, creating a strong buoyant force that pushes swimmers to the surface.**

Quantitative analysis:
- Great Salt Lake density: ~1.1 to 1.2 g/cm³ (varies with salinity)
- Human body density: ~1.01 to 1.08 g/cm³
- Fresh water density: 1.00 g/cm³

By Archimedes' principle, the buoyant force equals the weight of displaced water:
$$ F_b = \rho_{\text{water}} V_{\text{body}} g $$

In the Great Salt Lake:
- The buoyant force exceeds body weight
- The body floats very high in the water
- Pushing down to submerge requires fighting this excess buoyancy
- Staying submerged is like trying to hold a beach ball underwater

**Discussion:**
The Great Salt Lake is one of the saltiest bodies of water on Earth (up to 27% salinity, compared to ~3.5% for ocean water). Similar experiences occur in the Dead Sea (33% salinity). Swimmers often find they cannot sink even if they try—they bob like corks. This makes conventional swimming strokes difficult since the body rides too high to get proper arm position in the water. While drowning is very difficult, the high salt content irritates eyes and any cuts, and the salt crust left on skin can be uncomfortable.

</div>
</div>

<div class="exercise"  data-element-type="conceptual-questions">
<div class="problem"  markdown="1">
Is there a net force on a dam due to atmospheric pressure? Explain your answer.

</div>
<div class="solution" markdown="1">
**Strategy:**
Consider whether atmospheric pressure acts on both sides of the dam and analyze the net effect.

**Solution:**
**No, there is essentially no net force on a dam due to atmospheric pressure.**

Atmospheric pressure acts on both sides of the dam:
- On the reservoir side: $$ F_{\text{atm, water side}} = P_{\text{atm}} \times A $$
- On the air side: $$ F_{\text{atm, air side}} = P_{\text{atm}} \times A $$

Since the same atmospheric pressure acts on equal areas on both sides:
$$ F_{\text{net, atm}} = P_{\text{atm}} \times A - P_{\text{atm}} \times A = 0 $$

The atmospheric pressure contributions cancel out.

**Discussion:**
This is why dam engineering calculations typically use *gauge pressure* (pressure above atmospheric) rather than absolute pressure. The net force on the dam comes only from the water pressure, which increases with depth according to $$ P = \rho g h $$. Atmospheric pressure adds to the absolute pressure on the water side, but since it equally pushes on the air side, it doesn't contribute to the net structural load. This same principle applies to any structure exposed to atmosphere on both sides—windows, walls, and diving bells all experience balanced atmospheric forces.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Does atmospheric pressure add to the gas pressure in a rigid tank? In a toy balloon? When, in general, does atmospheric pressure *not* affect the total pressure in a fluid?

</div>
<div class="solution" markdown="1">
**Strategy:**
Consider whether the container walls isolate the internal fluid from atmospheric pressure or transmit it.

**Solution:**

**Rigid tank:** No, atmospheric pressure does not add to the internal pressure. The rigid walls support the pressure difference between inside and outside. The gas inside has whatever absolute pressure it was filled to, independent of external atmospheric pressure.

**Toy balloon:** Yes, atmospheric pressure adds to the internal pressure. The flexible balloon walls transmit atmospheric pressure to the gas inside. If the balloon is inflated to a gauge pressure of 0.01 atm, the absolute internal pressure is approximately 1.01 atm (gauge + atmospheric).

**General principle:** Atmospheric pressure does NOT affect total fluid pressure when:
1. The fluid is in a rigid, sealed container (like a steel tank or sealed pipe)
2. The container walls can support the pressure difference

Atmospheric pressure DOES add to fluid pressure when:
1. The fluid has a free surface open to atmosphere (like a lake or open container)
2. The container has flexible walls (like a balloon or IV bag)
3. The system is connected to atmosphere through any opening

**Discussion:**
This distinction matters practically. A tire pressure gauge reads *gauge pressure* (pressure above atmospheric), not absolute pressure. A tire reading "32 psi" actually contains air at about 32 + 14.7 = 46.7 psi absolute. Scuba tanks, however, are typically rated in absolute pressure because the rigid tank isolates the contents from external pressure changes.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
You can break a strong wine bottle by pounding a cork into it with your fist, but the cork must press directly against the liquid filling the bottle—there can be no air between the cork and liquid. Explain why the bottle breaks, and why it will not if there is air between the cork and liquid.

</div>
<div class="solution" markdown="1">
**Strategy:**
Compare how liquids and gases respond to compression, applying Pascal's principle for pressure transmission.

**Solution:**

**Why the bottle breaks when cork contacts liquid directly:**
1. Liquids are essentially *incompressible*
2. When you pound the cork, the cork's motion tries to compress the liquid
3. Since the liquid cannot compress, the pressure increases dramatically and instantaneously
4. By Pascal's principle, this pressure increase transmits equally throughout the liquid to all surfaces
5. The pressure spike exceeds the bottle's strength, causing it to shatter

**Why the bottle doesn't break with air between cork and liquid:**
1. Air (gas) is highly *compressible*
2. When you pound the cork, the air compresses to a smaller volume
3. The pressure increase is gradual as the air compresses
4. The air acts as a "shock absorber," cushioning the impact
5. The pressure increase is much smaller and spread over more time, so the bottle survives

Quantitative comparison:
- Bulk modulus of water: ~2.2 × 10⁹ Pa (very hard to compress)
- Bulk modulus of air: ~1.4 × 10⁵ Pa (easily compressible)
- Water is about 15,000 times harder to compress than air!

**Discussion:**
This demonstrates both the incompressibility of liquids and Pascal's principle in a dramatic way. The same physics explains why hydraulic systems work so effectively—incompressible fluid instantly transmits pressure. It also explains water hammer in plumbing: when a faucet is closed quickly, the incompressible water creates a pressure spike that can damage pipes.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What depth of mercury creates a pressure of 1.00 atm?

</div>
<div class="solution" markdown="1">
**Strategy:**
Use the hydrostatic pressure formula $$ P = \rho g h $$ and solve for depth.

**Solution:**

Given:
- Pressure: $$ P = 1.00 \text{ atm} = 1.01 \times 10^5 \text{ Pa} $$
- Mercury density: $$ \rho = 13.6 \times 10^3 \text{ kg/m}^3 $$
- $$ g = 9.80 \text{ m/s}^2 $$

Solving for depth:
$$ h = \frac{P}{\rho g} = \frac{1.01 \times 10^5 \text{ Pa}}{(13.6 \times 10^3 \text{ kg/m}^3)(9.80 \text{ m/s}^2)} $$

$$ h = \frac{1.01 \times 10^5}{1.33 \times 10^5} \text{ m} = 0.760 \text{ m} = 76.0 \text{ cm} $$

**Discussion:**
A mercury column **0.760 m** (or **76.0 cm**, about 30 inches) tall creates a pressure of 1.00 atm. This is the basis for the mercury barometer invented by Torricelli in 1643. At sea level, atmospheric pressure supports a mercury column of this height in an evacuated tube. This is why atmospheric pressure is often expressed as "760 mm Hg" or "760 torr" (named after Torricelli). Mercury is ideal for barometers because its high density allows a compact instrument—a water barometer would need to be over 10 meters tall!

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The greatest ocean depths on the Earth are found in the Marianas Trench near the Philippines. Calculate the pressure due to the ocean at the bottom of this trench, given its depth is 11.0 km and assuming the density of seawater is constant all the way down.

</div>
<div class="solution" markdown="1">
**Strategy:**
Use the hydrostatic pressure formula $$ P = \rho g h $$ with the density of seawater and the given depth.

**Solution:**
Given:
- Depth: $$ h = 11.0 \text{ km} = 11.0 \times 10^3 \text{ m} $$
- Density of seawater: $$ \rho = 1.025 \times 10^3 \text{ kg/m}^3 $$ (from Table 1)
- $$ g = 9.80 \text{ m/s}^2 $$

Calculating the pressure due to seawater:
$$ P = \rho g h $$

$$ P = (1.025 \times 10^3 \text{ kg/m}^3)(9.80 \text{ m/s}^2)(11.0 \times 10^3 \text{ m}) $$

$$ P = 1.10 \times 10^8 \text{ Pa} = 1.10 \times 10^8 \text{ N/m}^2 $$

Converting to atmospheres:
$$ P = \frac{1.10 \times 10^8 \text{ Pa}}{1.01 \times 10^5 \text{ Pa/atm}} \approx 1090 \text{ atm} $$

**Discussion:**
The pressure at the bottom of the Marianas Trench is approximately **1.10 × 10⁸ Pa** (about **1090 atmospheres** or roughly **16,000 psi**). This is an enormous pressure—over 1000 times atmospheric pressure! At this depth, the pressure would crush most submarines and equipment. Only specially designed deep-sea vessels like the Trieste (1960) and Deepsea Challenger (2012) have reached these depths. The assumption of constant density introduces a small error since seawater is slightly compressed at these pressures, but the result gives a good approximation.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify that the SI unit of  $$h \rho g $$
 is  $${\text{N/m}}^{2} $$.

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
**Strategy:**
Substitute the SI units for each quantity in the expression $$ h \rho g $$ and simplify algebraically to show the result is equivalent to N/m² (the unit of pressure).

**Solution:**

The SI units for each quantity are:
- Height: $$ h $$ has units of meters (m)
- Density: $$ \rho $$ has units of kg/m³
- Gravitational acceleration: $$ g $$ has units of m/s²

Multiplying these units together:

<div class="equation" >
 $$\begin{array}{lll}{\left(h\rho g\right)}_{\text{units}}& =& \left(\text{m}\right)\left({\text{kg/m}}^{3}\right)\left({\text{m/s}}^{2}\right)=\left(\text{kg}\cdot {\text{m}}^{2}\right)/\left({\text{m}}^{3}\cdot {\text{s}}^{2}\right)\\ & =& \left(\text{kg}\cdot {\text{m/s}}^{2}\right)\left({1 \text{/m}}^{2}\right)\\ & =& {\text{N/m}}^{2}\end{array} $$
</div>

Since 1 newton is defined as 1 kg·m/s², the final result is indeed N/m², which is the pascal (Pa), the SI unit of pressure.

**Discussion:**
This verification confirms the dimensional consistency of the hydrostatic pressure formula $$ P = h \rho g $$. The algebraic manipulation shows that:
1. Starting with (m)(kg/m³)(m/s²) gives kg·m²/(m³·s²)
2. Simplifying: kg·m²/(m³·s²) = (kg·m/s²)·(1/m²) = (kg·m/s²)/m²
3. Recognizing that kg·m/s² = N (newton), we get N/m² (pascal)

This dimensional analysis is crucial in physics for checking whether equations are physically meaningful. Any valid physics equation must have the same units on both sides, and intermediate steps must make dimensional sense. This particular formula relates pressure (force per area) to the weight of a column of fluid (mass per volume × acceleration × height), and the units verify this relationship is correct.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Water towers store water above the level of consumers for times of heavy use, eliminating the need for high-speed pumps. How high above a user must the water level be to create a gauge pressure of  $$ 3.00 \times 10^{5}  {\text{N/m}}^{2} $$ ?

</div>
<div class="solution" markdown="1">
**Strategy:**
Use the hydrostatic pressure formula $$ P = \rho g h $$ and solve for height $$ h $$.

**Solution:**
Given:
- Desired gauge pressure: $$ P = 3.00 \times 10^5 \text{ N/m}^2 $$
- Density of water: $$ \rho = 1.00 \times 10^3 \text{ kg/m}^3 $$
- $$ g = 9.80 \text{ m/s}^2 $$

Solving $$ P = \rho g h $$ for height:
$$ h = \frac{P}{\rho g} $$

$$ h = \frac{3.00 \times 10^5 \text{ N/m}^2}{(1.00 \times 10^3 \text{ kg/m}^3)(9.80 \text{ m/s}^2)} $$

$$ h = \frac{3.00 \times 10^5}{9.80 \times 10^3} \text{ m} $$

$$ h = 30.6 \text{ m} $$

**Discussion:**
The water level must be approximately **30.6 meters** (about 100 feet) above the user to create this gauge pressure of 3.00 × 10⁵ Pa (about 44 psi or 3 atm gauge). This is a typical pressure for municipal water systems, adequate for multi-story buildings and fire hydrants. Water towers are typically 40-50 meters tall to provide this pressure plus some margin. The beauty of this system is that gravity does the work—no pumps are needed during peak demand because the elevated water naturally flows downward under pressure. Pumps only run during off-peak hours to refill the tower.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The aqueous humor in a person's eye is exerting a force of 0.300 N on the  $$ 1.10{\text{-cm}}^{2} $$
 area of the cornea. (a) What pressure is this in mm Hg? (b) Is this value within the normal range for pressures in the eye?

</div>
<div class="solution" markdown="1">
**Strategy:**
(a) Use $$ P = F/A $$ to find pressure in pascals, then convert to mm Hg using the relationship $$ P = \rho g h $$.
(b) Compare the result to the normal intraocular pressure range given in Table 1 of the Pressures in the Body section.

**Solution:**

**(a) Calculate pressure in mm Hg:**

First, calculate pressure in pascals:
<div class="equation">
$$ P = \frac{F}{A} = \frac{0.300 \text{ N}}{1.10 \times 10^{-4} \text{ m}^2} = 2.73 \times 10^{3} \text{ Pa} $$
</div>

Convert to mm Hg using $$ 1 \text{ mm Hg} = 133 \text{ Pa} $$:
<div class="equation">
$$ P = \frac{2.73 \times 10^{3} \text{ Pa}}{133 \text{ Pa/mm Hg}} = 20.5 \text{ mm Hg} $$
</div>

**(b) Is this within normal range?**

From Table 1 in the Pressures in the Body section, normal intraocular pressure (eye pressure) ranges from 12–24 mm Hg. The calculated value of 20.5 mm Hg is within this normal range.

**Discussion:**
The intraocular pressure of **20.5 mm Hg** is comfortably within the normal range for eye pressure. This pressure is maintained by the balance between production and drainage of aqueous humor, the clear fluid that fills the anterior chamber of the eye. The pressure helps maintain the eye's shape and provides nutrients to the lens and cornea.

Pressures above 24 mm Hg are considered elevated and may indicate glaucoma, a serious condition that can damage the optic nerve and lead to vision loss if untreated. Regular eye pressure measurements (tonometry) are important for detecting glaucoma early, especially for people over 40. The relatively modest pressure (about 1/37 of atmospheric pressure) demonstrates how sensitive the eye's internal structures are—even small pressure increases can cause significant damage over time.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How much force is exerted on one side of an 8.50 cm by 11.0 cm sheet of paper by the atmosphere? How can the paper withstand such a force?

</div>
<div class="solution" markdown="1">
**Strategy:**
Calculate the area of the paper, then use $$ F = PA $$ to find the force from atmospheric pressure.

**Solution:**
*Step 1: Calculate the area*

$$ A = (8.50 \text{ cm})(11.0 \text{ cm}) = 93.5 \text{ cm}^2 $$

Converting to m²:
$$ A = 93.5 \text{ cm}^2 \times \left(\frac{1 \text{ m}}{100 \text{ cm}}\right)^2 = 9.35 \times 10^{-3} \text{ m}^2 $$

*Step 2: Calculate the force*

Using atmospheric pressure $$ P_{\text{atm}} = 1.01 \times 10^5 \text{ Pa} $$:

$$ F = P \times A = (1.01 \times 10^5 \text{ N/m}^2)(9.35 \times 10^{-3} \text{ m}^2) $$

$$ F = 944 \text{ N} \approx 9.4 \times 10^2 \text{ N} $$

This is equivalent to about 212 pounds of force!

**How can the paper withstand such a force?**

The paper withstands this enormous force because **atmospheric pressure acts equally on both sides**, creating zero net force:
- Force on front: 944 N (pushing backward)
- Force on back: 944 N (pushing forward)
- Net force: 944 N − 944 N = 0

**Discussion:**
The force on one side of a sheet of paper is approximately **940 N** (about 210 lb). This seems impossibly large for such a thin, flexible material. The paper survives because it never actually experiences this force as a *net* load—the equal and opposite forces from the other side cancel perfectly. This is why objects at atmospheric pressure don't get crushed: the pressure acts from all directions, creating balanced forces. If you could somehow apply atmospheric pressure to only one side (like with a vacuum pump), even this sheet of paper would be crushed by the unbalanced force.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What pressure is exerted on the bottom of a 0.500-m-wide by 0.900-m-long gas tank that can hold 50.0 kg of gasoline by the weight of the gasoline in it when it is full?

</div>
<div class="solution" markdown="1">
**Strategy:**
Calculate the weight of the gasoline, then divide by the bottom area to find pressure.

**Solution:**

*Step 1: Calculate the weight of gasoline*

$$ W = mg = (50.0 \text{ kg})(9.80 \text{ m/s}^2) = 490 \text{ N} $$

*Step 2: Calculate the bottom area*

$$ A = (0.500 \text{ m})(0.900 \text{ m}) = 0.450 \text{ m}^2 $$

*Step 3: Calculate pressure*

$$ P = \frac{W}{A} = \frac{490 \text{ N}}{0.450 \text{ m}^2} = 1.09 \times 10^{3} \text{ Pa} $$

**Discussion:**
The pressure on the bottom of the gas tank is approximately **1.09 × 10³ Pa** (about 1.09 kPa or 0.011 atm). This is a relatively modest pressure—only about 1% of atmospheric pressure. This makes sense because gasoline is not very dense (about 680 kg/m³) and the tank is relatively shallow. For comparison, if we calculate the depth of gasoline: $$ h = V/A = (m/\rho)/A = 50/(680 × 0.45) = 0.164 \text{ m} $$, we can verify using $$ P = \rho g h = (680)(9.80)(0.164) = 1090 \text{ Pa} $$. The tank experiences more pressure from atmospheric pressure (101 kPa) than from its own fuel!

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the average pressure exerted on the palm of a shot-putter's hand by the shot if the area of contact is  $$ 50.0 {\text{cm}}^{2} $$
 and he exerts a force of 800 N on it. Express the pressure in  $${\text{N/m}}^{2} $$
 and compare it with the  $$ 1.00 \times 10^{6}  \text{Pa} $$
 pressures sometimes encountered in the skeletal system.

</div>
<div class="solution" markdown="1">
**Strategy:**
Use the pressure formula $$ P = F/A $$, being careful to convert area to SI units.

**Solution:**
Given:
- Force: $$ F = 800 \text{ N} $$
- Contact area: $$ A = 50.0 \text{ cm}^2 $$

*Step 1: Convert area to m²*

$$ A = 50.0 \text{ cm}^2 \times \left(\frac{1 \text{ m}}{100 \text{ cm}}\right)^2 = 50.0 \times 10^{-4} \text{ m}^2 = 5.00 \times 10^{-3} \text{ m}^2 $$

*Step 2: Calculate pressure*

$$ P = \frac{F}{A} = \frac{800 \text{ N}}{5.00 \times 10^{-3} \text{ m}^2} $$

$$ P = 1.60 \times 10^5 \text{ N/m}^2 = 1.60 \times 10^5 \text{ Pa} $$

*Step 3: Compare with skeletal system pressure*

$$ \frac{P_{\text{shot-putter}}}{P_{\text{skeletal}}} = \frac{1.60 \times 10^5 \text{ Pa}}{1.00 \times 10^6 \text{ Pa}} = 0.16 = 16\% $$

**Discussion:**
The pressure on the shot-putter's palm is approximately **1.60 × 10⁵ Pa** (about 160 kPa or 23 psi). This is only about **16% of the maximum pressures encountered in the skeletal system** (1.00 × 10⁶ Pa). The higher skeletal pressures occur in joints and bones during activities like running and jumping, where forces concentrate on smaller areas. The result is reasonable: while 800 N is a substantial force (about 180 pounds), it's distributed over a relatively large palm area. This explains why shot-putting, while strenuous, doesn't typically cause hand injuries from pressure alone—the contact area is large enough to keep pressure within tolerable limits.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The left side of the heart creates a pressure of 120 mm Hg by exerting a force directly on the blood over an effective area of  $$ 15.0 {\text{cm}}^{2}. $$
 What force does it exert to accomplish this?

</div>
<div class="solution" data-element-type="problems-exercises" markdown="1">
**Strategy:**
Convert the pressure from mm Hg to Pa, then use $$ F = PA $$ to find the force.

**Solution:**

*Step 1: Convert pressure to pascals*

$$ P = h \rho_{\text{Hg}} g = (0.120 \text{ m})(13.6 \times 10^3 \text{ kg/m}^3)(9.80 \text{ m/s}^2) $$

$$ P = 1.60 \times 10^{4} \text{ Pa} $$

*Step 2: Convert area to m²*

$$ A = 15.0 \text{ cm}^2 = 15.0 \times 10^{-4} \text{ m}^2 = 1.50 \times 10^{-3} \text{ m}^2 $$

*Step 3: Calculate force*

$$ F = PA = (1.60 \times 10^{4} \text{ Pa})(1.50 \times 10^{-3} \text{ m}^2) = 24.0 \text{ N} $$

**Discussion:**
The heart exerts a force of approximately **24.0 N** (about 5.4 pounds) to create the systolic blood pressure of 120 mm Hg. This seems modest, but the heart must maintain this rhythmically about 70 times per minute, every minute, for decades—an impressive feat of biological engineering! The effective area (15 cm²) represents the internal surface of the left ventricle that contacts the blood during contraction. The heart's muscle tissue is specially adapted for this continuous, rhythmic work, with its own dedicated blood supply (coronary arteries) and electrical conduction system. This 24 N force pumps blood through the entire systemic circulation, from the aorta to the smallest capillaries and back to the right atrium.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the total force on a rectangular dam due to the water behind it increases with the *square* of the water depth. In particular, show that this force is given by  $$F=\rho gh^{2}L/2 $$ ,
 where  $$\rho  $$
 is the density of water,  $$h $$  is its depth at the dam, and  $$L $$
 is the length of the dam. You may assume the face of the dam is vertical. (Hint: Calculate the average pressure exerted and multiply this by the area in contact with the water. (See [[Figure 5]](#Figure5).)

![A two-dimensional view of a dam with dimensions L and h is shown. Force F at h is shown by a horizontal arrow. The force F exerted by water on the dam is F equals average pressure p bar into area A and pressure in turn is average height h bar into density rho into acceleration due to gravity g.](../resources/Figure_11_04_02.jpg ' ')
{: #Figure5}

</div>
<div class="solution" markdown="1">
**Strategy:**
Since pressure varies linearly with depth, find the average pressure over the dam face, then multiply by the area in contact with water.

**Solution:**
*Step 1: Determine how pressure varies with depth*

At any depth $$ y $$ below the water surface, the pressure is:
$$ P(y) = \rho g y $$

At the surface ($$ y = 0 $$): $$ P = 0 $$
At the bottom ($$ y = h $$): $$ P = \rho g h $$

*Step 2: Calculate the average pressure*

Since pressure varies linearly from 0 at the top to $$ \rho g h $$ at the bottom:
$$ \bar{P} = \frac{P_{\text{top}} + P_{\text{bottom}}}{2} = \frac{0 + \rho g h}{2} = \frac{\rho g h}{2} $$

*Step 3: Calculate the area of the dam face in contact with water*

$$ A = L \times h $$

where $$ L $$ is the length (width) of the dam and $$ h $$ is the water depth.

*Step 4: Calculate the total force*

$$ F = \bar{P} \times A = \frac{\rho g h}{2} \times (L \times h) $$

$$ \boxed{F = \frac{\rho g h^2 L}{2}} $$

*Step 5: Confirm force scales as h²*

The formula shows that $$ F \propto h^2 $$:
- If depth doubles, force quadruples
- If depth triples, force increases 9-fold

**Discussion:**
The force on a dam increases with the **square of the water depth** because both the average pressure and the contact area increase linearly with depth. Doubling the depth doubles the average pressure AND doubles the area, resulting in 2 × 2 = 4 times the force. This $$ h^2 $$ dependence has profound engineering implications: a dam holding back 20 m of water experiences 4 times more force than one holding 10 m. This explains why dams are built thicker at the bottom—the pressure and force increase dramatically with depth. The derivation also confirms that the force depends on depth and dam length, but NOT on the horizontal extent of the reservoir (consistent with the hydrostatic paradox).

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

pressure
: the weight of the fluid divided by the area supporting it

</div>
