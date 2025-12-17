---
title: Motion of an Object in a Viscous Fluid
layout: page
sectionNumber: 6
chapterNumber: 12
---

<div class="abstract" markdown="1">
* Calculate the Reynolds number for an object moving through a fluid.
* Explain whether the Reynolds number indicates laminar or turbulent flow.
* Describe the conditions under which an object has a terminal speed.
</div>

A moving object in a viscous fluid is equivalent to a stationary object in a
flowing fluid stream. (For example, when you ride a bicycle at 10 m/s in still
air, you feel the air in your face exactly as if you were stationary in a 10-m/s
wind.) Flow of the stationary fluid around a moving object may be laminar,
turbulent, or a combination of the two. Just as with flow in tubes, it is
possible to predict when a moving object creates turbulence. We use another form
of the Reynolds number $$N^{\prime}_{\text{R}} $$ , defined for an object moving
in a fluid to be

<div class="equation" >
 $$N^{\prime}_{\text{R}}=\frac{\rho vL}{\eta }\text{(object in fluid),} $$
</div>

where $$L $$ is a characteristic length of the object (a sphere’s diameter, for
example), $$\rho $$ the fluid density, $$\eta $$ its viscosity, and $$v $$ the
object’s speed in the fluid. If $$N^{\prime}_{\text{R}} $$ is less than about 1,
flow around the object can be laminar, particularly if the object has a smooth
shape. The transition to turbulent flow occurs for $$N^{\prime}_{\text{R}} $$
between 1 and about 10, depending on surface roughness and so on. Depending on
the surface, there can be a *turbulent wake* behind the object with some laminar
flow over its surface. For an $$N^{\prime}_{\text{R}} $$ between 10 and $$10^{6}
$$ , the flow may be either laminar or turbulent and may oscillate between the
two. For $$N^{\prime}_{\text{R}} $$ greater than about $$10^{6} $$ , the flow is
entirely turbulent, even at the surface of the object. (
See [[Figure 1]](#Figure1).) Laminar flow occurs mostly when the objects in the
fluid are small, such as raindrops, pollen, and blood cells in plasma.

<div class="example" markdown="1">
<div class="title">
Does a Ball Have a Turbulent Wake?
</div>
Calculate the Reynolds number  $$N^{\prime}_{\text{R}} $$
 for a ball with a 7.40-cm diameter thrown at 40.0 m/s.

**Strategy**

We can use $$N^{\prime}_{\text{R}}=\frac{\rho vL}{\eta } $$ to calculate
$$N^{\prime}_{\text{R}} $$ , since all values in it are either given or can be
found in tables of density and viscosity.

**Solution**

Substituting values into the equation for $$N^{\prime}_{\text{R}} $$ yields

<div class="equation" >
 $$\begin{array}{lll}N^{\prime}_{\text{R}}& =& \frac{\rho vL}{\eta }=\frac{\left(1.29 {\text{kg/m}}^{3}\right)\left(40.0 \text{m/s}\right)\left(0.0740 \text{m}\right)}{ 1.81 \times 10^{-5}  1.00 \text{Pa}\cdot \text{s}}\\ N^{\prime}_{\text{R}}& =&  2.11 \times 10^{5} \text{.}\end{array} $$
</div>
**Discussion**

This value is sufficiently high to imply a turbulent wake. Most large objects,
such as airplanes and sailboats, create significant turbulence as they move. As
noted before, the Bernoulli principle gives only qualitatively-correct results
in such situations.

</div>

One of the consequences of viscosity is a resistance force called **viscous
drag**  $${F}_{\text{V}} $$ that is exerted on a moving object. This force
typically depends on the object’s speed (in contrast with simple friction).
Experiments have shown that for laminar flow (  $$N^{\prime}_{\text{R}} $$ less
than about one) viscous drag is proportional to speed, whereas for $$N^{\prime}_
{\text{R}} $$ between about 10 and $$10^{6} $$ , viscous drag is proportional to
speed squared. (This relationship is a strong dependence and is pertinent to
bicycle racing, where even a small headwind causes significantly increased drag
on the racer. Cyclists take turns being the leader in the pack for this reason.)
For $$N^{\prime}_{\text{R}} $$ greater than $$10^{6} $$ , drag increases
dramatically and behaves with greater complexity. For laminar flow around a
sphere, $${F}_{\text{V}} $$ is proportional to fluid viscosity $$\eta $$ , the
object’s characteristic size $$L $$ , and its speed $$v $$ . All of which makes
sense—the more viscous the fluid and the larger the object, the more drag we
expect. Recall Stoke’s law $${F}_{\text{S}}=6\pi r\eta v $$ . For the special
case of a small sphere of radius $$R $$ moving slowly in a fluid of viscosity
$$\eta $$ , the drag force $${F}_{\text{S}} $$ is given by

<div class="equation" >
 $${F}_{\text{S}}=6\pi R\eta v\text{.} $$
</div>

![Part a of the figure shows a sphere moving in a fluid. The fluid lines are shown to move toward the left. The viscous force on the sphere is also toward the left given by F v as shown by the arrow. The flow is shown as laminar as shown by linear bending lines. Part b of the figure shows a sphere moving with higher speed in a fluid. The fluid lines are shown to move toward the left. The viscous force on the sphere is also toward the left given by F v prime as shown by the arrow. The flow is shown as laminar above and below the sphere shown by linear lines of flow and turbulent on left of the sphere shown by curly lines of flow. Part c of the figure shows a sphere still moving with higher speed in a fluid. The fluid lines are shown to move toward the left at the edges of flow away from the sphere. The viscous force on the sphere is also toward the left given by F v double prime as shown by the arrow. The flow is turbulent all around the sphere as shown by curly lines of flow. The viscous drag F v double prime is shown to be still greater by longer length of arrows.](../resources/Figure_12_06_01.jpg "(a) Motion of this sphere to the right is equivalent to fluid flow to the left. Here the flow is laminar with \( N^{\prime}_\text{R} \) less than 1. There is a force, called viscous drag \( F_{V} \), to the left on the ball due to the fluid&#x2019;s viscosity. (b) At a higher speed, the flow becomes partially turbulent, creating a wake starting where the flow lines separate from the surface. Pressure in the wake is less than in front of the sphere, because fluid speed is less, creating a net force to the left \( F^\prime_V \) that is significantly greater than for laminar flow. Here \( N^{\prime}_\text{R} \) is greater than 10. (c) At much higher speeds, where \( N^{\prime}_\text{R} \) is greater than \( 10^6 \), flow becomes turbulent everywhere on the surface and behind the sphere. Drag increases dramatically.")
{: #Figure1}

An interesting consequence of the increase in $${F}_{\text{V}} $$ with speed is
that an object falling through a fluid will not continue to accelerate
indefinitely (as it would if we neglect air resistance, for example). Instead,
viscous drag increases, slowing acceleration, until a critical speed, called
the **terminal speed**, is reached and the acceleration of the object becomes
zero. Once this happens, the object continues to fall at constant speed (the
terminal speed). This is the case for particles of sand falling in the ocean,
cells falling in a centrifuge, and sky divers falling through the
air. [[Figure 2]](#Figure2) shows some of the factors that affect terminal speed.
There is a viscous drag on the object that depends on the viscosity of the fluid
and the size of the object. But there is also a buoyant force that depends on
the density of the object relative to the fluid. Terminal speed will be greatest
for low-viscosity fluids and objects with high densities and small sizes. Thus a
skydiver falls more slowly with outspread limbs than when they are in a pike
position—head first with hands at their side and legs together.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Take-Home Experiment: Don’t Lose Your Marbles
</div>
By measuring the terminal speed of a slowly moving sphere in a viscous fluid, one can find the viscosity of that fluid (at that temperature). It can be difficult to find small ball bearings around the house, but a small marble will do. Gather two or three fluids (syrup, motor oil, honey, olive oil, etc.) and a thick, tall clear glass or vase. Drop the marble into the center of the fluid and time its fall (after letting it drop a little to reach its terminal speed). Compare your values for the terminal speed and see if they are inversely proportional to the viscosities as listed in [[Table 1]](../contents/ch12ViscosityAndLaminarFlow#Table1). Does it make a difference if the marble is dropped near the side of the glass?

</div>

Knowledge of terminal speed is useful for estimating sedimentation rates of
small particles. We know from watching mud settle out of dirty water that
sedimentation is usually a slow process. Centrifuges are used to speed
sedimentation by creating accelerated frames in which gravitational acceleration
is replaced by centripetal acceleration, which can be much greater, increasing
the terminal speed.

![The figure shows the forces acting on an oval shaped object falling through a viscous fluid. An enlarged view of the object is shown toward the left to analyze the forces in detail. The weight of the object w acts vertically downward. The viscous drag F v and buoyant force F b acts vertically upward. The length of the object is given by L. The density of the object is given by rho obj and density of the fluid by rho fl.](../resources/Figure_12_06_02.jpg "There are three forces acting on an object falling through a viscous fluid: its weight \( w \) , the viscous drag \( F_{V} \), and the buoyant force \( F_{B} \).")
{: #Figure2 height="273"}

### Section Summary

* When an object moves in a fluid, there is a different form of the Reynolds
  number $$N^{\prime}_{\text{R}}=\frac{\rho vL}{\eta }\text{(object in fluid),}
  $$ which indicates whether flow is laminar or turbulent.
* For $$N^{\prime}_{\text{R}} $$ less than about one, flow is laminar.
* For $$N^{\prime}_{\text{R}} $$ greater than $$10^{6} $$ , flow is entirely
  turbulent.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What direction will a helium balloon move inside a car that is slowing down—toward the front or back? Explain your answer.

</div>
<div class="solution" markdown="1">
**Strategy**

We analyze the forces on the balloon and air inside the car using Newton's laws and the concept of buoyancy in an accelerating reference frame.

**Solution**

The helium balloon will move **toward the front** of the car when the car slows down.

Here's why: When the car decelerates, everything inside experiences a pseudo-force pushing it forward (from the perspective of someone inside the car). The denser air inside the car tends to move forward due to this pseudo-force. Since the helium balloon is less dense than the surrounding air, it experiences a buoyant force in the opposite direction—just as a helium balloon rises upward against gravity because it's less dense than air.

Alternatively, think of it this way: When the car brakes, the air inside piles up toward the front of the car, creating a pressure gradient (higher pressure at front, lower at back). The balloon, being buoyant, moves from high pressure to low pressure—but wait, that would be toward the back. The key insight is that the balloon moves opposite to what denser objects do. The air wants to move forward, so it pushes the lighter balloon backward relative to the air—but the air is moving forward faster than the balloon can be pushed back, so the net effect is the balloon moves forward relative to the car.

**Discussion**

This is counterintuitive because most objects (your coffee cup, loose change) slide forward when you brake. But the helium balloon behaves oppositely because it's buoyant. This same principle explains why a helium balloon leans forward when a car accelerates (instead of tilting back like a hanging object would). It's essentially "falling up" in the direction opposite to the effective gravity created by the car's acceleration.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Will identical raindrops fall more rapidly in  $$5º C $$
 air or  $$25 \text{ºC} $$
 air, neglecting any differences in air density? Explain your answer.

</div>
<div class="solution" markdown="1">
**Strategy**

We consider how temperature affects air viscosity, and then how viscosity affects terminal speed through Stokes' law.

**Solution**

Raindrops will fall **faster in 5°C (colder) air** than in 25°C air.

The key factor is how temperature affects air viscosity. Unlike liquids (where viscosity decreases with temperature), **gas viscosity increases with temperature**. This occurs because warmer gas molecules move faster and transfer momentum more effectively between fluid layers.

Typical values:
- Air viscosity at 5°C: approximately $$1.73 \times 10^{-5} \text{ Pa} \cdot \text{s}$$
- Air viscosity at 25°C: approximately $$1.84 \times 10^{-5} \text{ Pa} \cdot \text{s}$$

Since terminal velocity is reached when viscous drag equals the net downward force, and Stokes' law gives $$F_S = 6\pi r\eta v$$, a higher viscosity means more drag at any given speed. More drag results in a lower terminal velocity.

Therefore, raindrops reach a **higher terminal velocity in colder (5°C) air** because the lower viscosity produces less drag force.

**Discussion**

This may seem counterintuitive since we often associate warmth with faster processes. However, for gases, viscosity increases with temperature—the opposite of liquids. The effect is relatively small (about 6% difference between these temperatures) but measurable. This principle is relevant to atmospheric science and precipitation studies. Note: if we hadn't neglected density differences as instructed, the lower density of warm air would reduce drag, partially offsetting the viscosity effect.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If you took two marbles of different sizes, what would you expect to observe about the relative magnitudes of their terminal velocities?

</div>
<div class="solution" markdown="1">
**Strategy**

We analyze the forces on a falling sphere (gravity, buoyancy, and viscous drag) and determine how terminal velocity depends on radius.

**Solution**

The **larger marble will have a greater terminal velocity** than the smaller marble.

At terminal velocity, the net force is zero:
$$w - F_B - F_V = 0$$

where $$w$$ is weight, $$F_B$$ is buoyant force, and $$F_V$$ is viscous drag.

For a sphere of radius $$R$$ and density $$\rho_{\text{marble}}$$ in a fluid of density $$\rho_{\text{fluid}}$$:
- Weight: $$w = \frac{4}{3}\pi R^3 \rho_{\text{marble}} g$$
- Buoyant force: $$F_B = \frac{4}{3}\pi R^3 \rho_{\text{fluid}} g$$
- Stokes drag: $$F_V = 6\pi R \eta v$$

Setting $$w - F_B = F_V$$:

$$\frac{4}{3}\pi R^3 (\rho_{\text{marble}} - \rho_{\text{fluid}}) g = 6\pi R \eta v_t$$

Solving for terminal velocity:

$$v_t = \frac{2R^2 (\rho_{\text{marble}} - \rho_{\text{fluid}}) g}{9\eta}$$

Since $$v_t \propto R^2$$, the terminal velocity increases with the **square** of the radius.

**Example:** If one marble has twice the radius of another, it will have **four times** the terminal velocity.

**Discussion**

This $$R^2$$ dependence arises because the net gravitational force (weight minus buoyancy) scales as $$R^3$$ (volume), while Stokes drag scales only as $$R$$ (for a given velocity). The larger marble has more "excess weight" per unit of drag force, so it reaches a higher terminal velocity. This is why sand grains settle faster than fine silt in water, and why centrifuges can separate particles by size—larger particles move outward faster. Note: this analysis assumes laminar flow (low Reynolds number), which is valid for small, slow-moving spheres in viscous fluids like honey or motor oil, as described in the Take-Home Experiment.
</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

viscous drag
: a resistance force exerted on a moving object, with a nontrivial dependence on
velocity

terminal speed
: the speed at which the viscous drag of an object falling in a viscous fluid is
equal to the other forces acting on the object (such as gravity), so that the
acceleration of the object is zero

</div>
