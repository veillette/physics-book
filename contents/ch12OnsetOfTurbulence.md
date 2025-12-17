---
title: The Onset of Turbulence
layout: page
sectionNumber: 5
chapterNumber: 12
---

<div class="abstract" markdown="1">
* Calculate Reynolds number.
* Use the Reynolds number for a system to determine whether it is laminar or turbulent.
</div>

Sometimes we can predict if flow will be laminar or turbulent. We know that flow
in a very smooth tube or around a smooth, streamlined object will be laminar at
low velocity. We also know that at high velocity, even flow in a smooth tube or
around a smooth object will experience turbulence. In between, it is more
difficult to predict. In fact, at intermediate velocities, flow may oscillate
back and forth indefinitely between laminar and turbulent.

An occlusion, or narrowing, of an artery, such as shown
in [[Figure 1]](#Figure1), is likely to cause turbulence because of the
irregularity of the blockage, as well as the complexity of blood as a fluid.
Turbulence in the circulatory system is noisy and can sometimes be detected with
a stethoscope, such as when measuring diastolic pressure in the upper arm’s
partially collapsed brachial artery. These turbulent sounds, at the onset of
blood flow when the cuff pressure becomes sufficiently small, are called 
*Korotkoff sounds*. Aneurysms, or ballooning of arteries, create significant
turbulence and can sometimes be detected with a stethoscope. Heart murmurs,
consistent with their name, are sounds produced by turbulent flow around damaged
and insufficiently closed heart valves. Ultrasound can also be used to detect
turbulence as a medical indicator in a process analogous to Doppler-shift radar
used to detect storms.

![Figure shows a rectangular section of a blood vessel. The blood flow is shown toward right. The blood vessel is shown to be broader at one end and narrow toward the opposite end. The flow is shown to be laminar as shown by horizontal parallel lines. The velocity is v one in the broader section of blood vessel. The junction where the tube narrows the velocity is v two. The lines of flow are shown to bend. The regions where the blood vessels are narrow, the flow is shown to be turbulent as shown to by curling arrows. The velocity is given by v three toward right. The length of the arrows depicting the velocities represent that v three is greater than v two greater than v one.](../resources/Figure_12_05_01.jpg "Flow is laminar in the large part of this blood vessel and turbulent in the part narrowed by plaque, where velocity is high. In the transition region, the flow can oscillate chaotically between laminar and turbulent flow.")
{: #Figure1}

An indicator called the **Reynolds number**  $${N}_{\text{R}} $$ can reveal
whether flow is laminar or turbulent. For flow in a tube of uniform diameter,
the Reynolds number is defined as

<div class="equation" >
 $${N}_{\text{R}}=\frac{2\rho vr}{\eta }\text{(flow in tube),} $$
</div>

where $$\rho $$ is the fluid density, $$v $$ its speed, $$\eta $$ its viscosity,
and $$r $$ the tube radius. The Reynolds number is a unitless quantity.
Experiments have revealed that $${N}_{\text{R}} $$ is related to the onset of
turbulence. For $${N}_{\text{R}} $$ below about 2000, flow is laminar. For
$${N}_{\text{R}} $$ above about 3000, flow is turbulent. For values of $${N}_
{\text{R}} $$ between about 2000 and 3000, flow is unstable—that is, it can be
laminar, but small obstructions and surface roughness can make it turbulent, and
it may oscillate randomly between being laminar and turbulent. The blood flow
through most of the body is a quiet, laminar flow. The exception is in the
aorta, where the speed of the blood flow rises above a critical value of 35 m/s
and becomes turbulent.

<div class="example" markdown="1">
<div class="title">
Is This Flow Laminar or Turbulent?
</div>
Calculate the Reynolds number for flow in the needle considered in [Example 2](../contents/ch12ViscosityAndLaminarFlow#Example2) to verify the assumption that the flow is laminar. Assume that the density of the saline solution is  $$1025 kg/{\text{m}}^{3} $$.

**Strategy**

We have all of the information needed, except the fluid speed $$v $$ , which can
be calculated from $$\overline{v}=Q/A=1.70 \text{m/s} $$
(verification of this is in this chapter’s Problems and Exercises).

**Solution**

Entering the known values into $${N}_{\text{R}}=\frac{2\rho vr}{\eta } $$ gives

<div class="equation" >
 $$\begin{array}{lll}{N}_{\text{R}}& =& \frac{2\rho vr}{\eta }\\
{N}_{\text{R}}& =& \frac{2\left({1025 \text{kg/m}}^{3}\right)\left(1.70 \text{m/s}\right)\left( 0.150 \times 10^{-3}  \text{m}\right)}{ 1.00 \times 10^{-3}  \text{N}\cdot {\text{s/m}}^{2}}\\ 
{N}_{\text{R}}& =& 523\text{.} \end{array} $$
</div>
**Discussion**

Since $${N}_{\text{R}} $$ is well below 2000, the flow should indeed be laminar.

</div>

<div id="Take-Home1" class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Take-Home Experiment: Inhalation
</div>
Under the conditions of normal activity, an adult inhales about 1 L of air during each inhalation. With the aid of a watch, determine the time for one of your own inhalations by timing several breaths and dividing the total length by the number of breaths. Calculate the average flow rate  $$Q $$
 of air traveling through the trachea during each inhalation.

</div>

The topic of chaos has become quite popular over the last few decades. A system
is defined to be *chaotic* when its behavior is so sensitive to some factor that
it is extremely difficult to predict. The field of *chaos* is the study of
chaotic behavior. A good example of chaotic behavior is the flow of a fluid with
a Reynolds number between 2000 and 3000. Whether or not the flow is turbulent is
difficult, but not impossible, to predict—the difficulty lies in the extremely
sensitive dependence on factors like roughness and obstructions on the nature of
the flow. A tiny variation in one factor has an exaggerated (or nonlinear)
effect on the flow. Phenomena as disparate as turbulence, the orbit of Pluto,
and the onset of irregular heartbeats are chaotic and can be analyzed with
similar techniques.

### Section Summary

* The Reynolds number $${N}_{\text{R}} $$ can reveal whether flow is laminar or
  turbulent. It is

  <div class="equation" >
   $${N}_{\text{R}}=\frac{2\rho vr}{\eta }. $$
  </div>

* For $${N}_{\text{R}} $$ below about 2000, flow is laminar. For $${N}_
  {\text{R}} $$ above about 3000, flow is turbulent. For values of $${N}_
  {\text{R}} $$ between 2000 and 3000, it may be either or both.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Doppler ultrasound can be used to measure the speed of blood in the body. If there is a partial constriction of an artery, where would you expect blood speed to be greatest, at or nearby the constriction? What are the two distinct causes of higher resistance in the constriction?

</div>
<div class="solution" markdown="1">
**Strategy**

We apply the continuity equation to determine where velocity is highest, then consider the factors that increase resistance in constricted regions.

**Solution**

**Where is blood speed greatest?**
By the continuity equation ($$A_1v_1 = A_2v_2$$), blood speed is greatest *at the constriction* where the cross-sectional area is smallest. If the area is reduced, velocity must increase proportionally to maintain constant flow rate.

**Two distinct causes of higher resistance in the constriction:**

1. **Geometric resistance (Poiseuille's law)**: Resistance is proportional to $$1/r^4$$, so even a small reduction in radius dramatically increases resistance. A constriction that reduces the radius by half increases resistance by a factor of 16.

2. **Turbulence**: The high-velocity flow through the constriction often exceeds the critical Reynolds number, causing the flow to become turbulent. Turbulent flow has much higher resistance than laminar flow because energy is dissipated in eddies and chaotic motion rather than being used for forward flow.

**Discussion**

Both factors compound the problem: the narrowing directly increases resistance, and the resulting high velocity can trigger turbulence that further increases resistance. This is why arterial plaques are so dangerous—they create a double penalty for blood flow.
</div>
</div>

<div class="exercise"  data-element-type="conceptual-questions">
<div class="problem"  markdown="1">
Sink drains often have a device such as that shown in [[Figure 2]](#Figure2) to help speed the flow of water. How does this work?

![Shows a picture of a small ring shaped section of a cylinder. It is shown to be partitioned in to four equal portions.](../resources/Figure_12_05_02.jpg "You will find devices such as this in many drains. They significantly increase flow rate.")
{: #Figure2}

</div>
<div class="solution" markdown="1">
**Strategy**

We consider how the device affects the flow pattern and whether it promotes laminar or turbulent flow.

**Solution**

The device works by promoting laminar flow in two ways:

1. **Reducing vortex formation**: Without the dividers, water entering the drain tends to form a swirling vortex around the drain opening. This vortex represents turbulent, chaotic flow that wastes energy and reduces effective flow rate. The dividers break up the rotational motion before it can develop.

2. **Creating parallel channels**: The dividers separate the flow into multiple smaller streams that flow more smoothly and in parallel. These smaller effective channels promote laminar flow by reducing the Reynolds number for each stream.

3. **Eliminating air core**: Vortices often create an air core in the center of the drain, effectively blocking part of the drain opening. By preventing vortex formation, the dividers ensure the entire drain opening is used for water flow.

**Discussion**

This is a simple but clever application of fluid dynamics. The device costs almost nothing to manufacture but significantly improves drain performance by converting wasteful turbulent flow into efficient laminar flow.
</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Some ceiling fans have decorative wicker reeds on their blades. Discuss whether these fans are as quiet and efficient as those with smooth blades.

</div>
<div class="solution" markdown="1">
**Strategy**

We consider how surface roughness affects airflow over the fan blades and the consequences for noise and efficiency.

**Solution**

Ceiling fans with decorative wicker reeds are **not as quiet or efficient** as those with smooth blades. Here's why:

**Noise:**
- The rough, irregular surface of wicker reeds creates turbulence as air flows over the blades
- Turbulent flow generates noise through the chaotic mixing and pressure fluctuations
- Small eddies shed from the reed textures produce broadband noise
- Smooth blades maintain more laminar flow, which is much quieter

**Efficiency:**
- Turbulent flow has higher drag than laminar flow
- The increased drag means more motor power is needed to maintain the same blade speed
- Energy is wasted in the turbulent eddies rather than moving air efficiently
- Smooth blades slice through the air with less resistance

**Additional considerations:**
- The gaps in wicker can also create whistling sounds at certain speeds
- Dust accumulation in wicker is harder to clean, further degrading performance over time
- The aesthetic appeal of wicker comes at a measurable cost in performance

**Discussion**

This is a trade-off between form and function. Decorative wicker fans are chosen for their appearance, but they consume more energy and produce more noise than their smooth-bladed counterparts for the same airflow.
</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify that the flow of oil is laminar (barely) for an oil gusher that shoots crude oil 25.0 m into the air through a pipe with a 0.100-m diameter. The vertical pipe is 50 m long. Take the density of the oil to be  $$900 \text{kg}{\text{/m}}^{3} $$
 and its viscosity to be  $$1.00 \left({\text{N/m}}^{2}\right)\cdot \text{s} $$
 (or  $$1.00 \text{Pa} \cdot \text{s} $$ ).

</div>
<div class="solution" markdown="1">
**Strategy**

To verify the flow is laminar, we need to calculate the Reynolds number and check if it is below 2000. First, we must find the oil velocity using projectile motion (the oil shoots 25.0 m into the air), then use the Reynolds number formula for flow in a pipe.

**Solution**

Given:
- Height reached: $$h = 25.0 \text{ m}$$
- Pipe diameter: $$d = 0.100 \text{ m}$$ (so radius $$r = 0.050 \text{ m}$$)
- Pipe length: $$L = 50 \text{ m}$$
- Oil density: $$\rho = 900 \text{ kg/m}^3$$
- Oil viscosity: $$\eta = 1.00 \text{ Pa} \cdot \text{s}$$

Step 1: Find the exit velocity using projectile motion. For oil to reach height h, it must have initial velocity:

$$v^2 = 2gh$$

$$v = \sqrt{2gh} = \sqrt{2(9.80 \text{ m/s}^2)(25.0 \text{ m})} = \sqrt{490 \text{ m}^2/\text{s}^2} = 22.1 \text{ m/s}$$

Step 2: Calculate the Reynolds number:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta} = \frac{2(900 \text{ kg/m}^3)(22.1 \text{ m/s})(0.050 \text{ m})}{1.00 \text{ Pa} \cdot \text{s}}$$

$${N}_{\text{R}} = \frac{1989 \text{ kg/(m} \cdot \text{s)}}{1.00 \text{ kg/(m} \cdot \text{s)}} = 1.99 \times 10^{3}$$

Since $${N}_{\text{R}} = 1990 < 2000$$, the flow is indeed laminar, but barely so.

**Discussion**

The Reynolds number of approximately 1990 is just below the critical value of 2000, confirming the flow is "barely" laminar as stated in the problem. The high viscosity of crude oil (about 1000 times that of water) is what keeps the flow laminar despite the high velocity. Any slight increase in velocity or decrease in viscosity would push the flow into the unstable transition region.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Show that the Reynolds number  $${N}_{\text{R}} $$
 is unitless by substituting units for all the quantities in its definition and cancelling.

</div>
<div class="solution" markdown="1">
**Strategy**

We substitute the SI units for each quantity in the Reynolds number formula and perform algebraic cancellation to show that all units cancel, leaving a dimensionless result.

**Solution**

The Reynolds number for flow in a tube is defined as:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta}$$

The SI units for each quantity are:
- Density: $$[\rho] = \text{kg/m}^3$$
- Velocity: $$[v] = \text{m/s}$$
- Radius: $$[r] = \text{m}$$
- Viscosity: $$[\eta] = \text{Pa} \cdot \text{s} = \frac{\text{N}}{\text{m}^2} \cdot \text{s} = \frac{\text{kg} \cdot \text{m/s}^2}{\text{m}^2} \cdot \text{s} = \frac{\text{kg}}{\text{m} \cdot \text{s}}$$

Substituting these units into the Reynolds number formula:

$$[{N}_{\text{R}}] = \frac{[\rho][v][r]}{[\eta]} = \frac{\left(\frac{\text{kg}}{\text{m}^3}\right)\left(\frac{\text{m}}{\text{s}}\right)(\text{m})}{\left(\frac{\text{kg}}{\text{m} \cdot \text{s}}\right)}$$

Simplifying the numerator:

$$[{N}_{\text{R}}] = \frac{\frac{\text{kg} \cdot \text{m} \cdot \text{m}}{\text{m}^3 \cdot \text{s}}}{\frac{\text{kg}}{\text{m} \cdot \text{s}}} = \frac{\frac{\text{kg}}{\text{m} \cdot \text{s}}}{\frac{\text{kg}}{\text{m} \cdot \text{s}}} = 1$$

All units cancel completely, confirming that the Reynolds number is dimensionless (unitless).

**Discussion**

The Reynolds number being dimensionless is a key property that makes it universally applicable. It allows us to compare flows in different systems—whether water in a pipe, blood in an artery, or air over an airplane wing—using the same critical values (≈2000 for laminar, ≈3000 for turbulent). Dimensionless parameters like this are fundamental in fluid mechanics and enable the use of scale models in engineering.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Calculate the Reynolds numbers for the flow of water through (a) a nozzle with a radius of 0.250 cm and (b) a garden hose with a radius of 0.900 cm, when the nozzle is attached to the hose. The flow rate through hose and nozzle is 0.500 L/s. Can the flow in either possibly be laminar?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the continuity equation to find the velocity in each section from the flow rate, then calculate the Reynolds number using the formula $${N}_{\text{R}} = \frac{2\rho v r}{\eta}$$. We compare each result to 2000 to determine if laminar flow is possible.

**Solution**

Given:
- Nozzle radius: $$r_n = 0.250 \text{ cm} = 2.50 \times 10^{-3} \text{ m}$$
- Hose radius: $$r_h = 0.900 \text{ cm} = 9.00 \times 10^{-3} \text{ m}$$
- Flow rate: $$Q = 0.500 \text{ L/s} = 5.00 \times 10^{-4} \text{ m}^3\text{/s}$$
- Water density: $$\rho = 1000 \text{ kg/m}^3$$
- Water viscosity (at 20°C): $$\eta = 1.002 \times 10^{-3} \text{ Pa} \cdot \text{s}$$

**(a) Nozzle:**

Find the velocity in the nozzle using $$Q = Av$$:

$$v_n = \frac{Q}{A_n} = \frac{Q}{\pi r_n^2} = \frac{5.00 \times 10^{-4} \text{ m}^3\text{/s}}{\pi (2.50 \times 10^{-3} \text{ m})^2}$$

$$v_n = \frac{5.00 \times 10^{-4}}{1.96 \times 10^{-5}} \text{ m/s} = 25.5 \text{ m/s}$$

Calculate Reynolds number:

$${N}_{\text{R,n}} = \frac{2\rho v_n r_n}{\eta} = \frac{2(1000)(25.5)(2.50 \times 10^{-3})}{1.002 \times 10^{-3}}$$

$${N}_{\text{R,n}} = \frac{127.5}{1.002 \times 10^{-3}} = 1.27 \times 10^{5}$$

**(b) Hose:**

Find the velocity in the hose:

$$v_h = \frac{Q}{A_h} = \frac{Q}{\pi r_h^2} = \frac{5.00 \times 10^{-4} \text{ m}^3\text{/s}}{\pi (9.00 \times 10^{-3} \text{ m})^2}$$

$$v_h = \frac{5.00 \times 10^{-4}}{2.54 \times 10^{-4}} \text{ m/s} = 1.97 \text{ m/s}$$

Calculate Reynolds number:

$${N}_{\text{R,h}} = \frac{2\rho v_h r_h}{\eta} = \frac{2(1000)(1.97)(9.00 \times 10^{-3})}{1.002 \times 10^{-3}}$$

$${N}_{\text{R,h}} = \frac{35.5}{1.002 \times 10^{-3}} = 3.54 \times 10^{4}$$

**Summary:**
- (a) Nozzle: $${N}_{\text{R}} = 1.27 \times 10^{5}$$ — **not laminar** (far above 3000)
- (b) Hose: $${N}_{\text{R}} = 3.54 \times 10^{4}$$ — **not laminar** (far above 3000)

Neither flow can possibly be laminar since both Reynolds numbers are well above 3000.

**Discussion**

The nozzle has the higher Reynolds number because, although the radius is smaller (which decreases $$N_R$$), the velocity is much higher (which increases $$N_R$$ more). The velocity scales as $$1/r^2$$ while $$N_R \propto vr$$, so $$N_R \propto 1/r$$—smaller radii actually produce higher Reynolds numbers for the same flow rate. This is why nozzles often produce turbulent, noisy flow even when the hose flow is smoother.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A fire hose has an inside diameter of 6.40 cm. Suppose such a hose carries a flow of 40.0 L/s starting at a gauge pressure of  $$ 1.62 \times 10^{6}  {\text{N/m}}^{2} $$ .
 The hose goes 10.0 m up a ladder to a nozzle having an inside diameter of 3.00 cm. Calculate the Reynolds numbers for flow in the fire hose and nozzle to show that the flow in each must be turbulent.

</div>
<div class="solution" markdown="1">
**Strategy**

We calculate the velocity in each section using the continuity equation, then compute the Reynolds number for each. Flow is turbulent if $${N}_{\text{R}} > 3000$$.

**Solution**

Given:
- Hose diameter: $$d_h = 6.40 \text{ cm}$$ (radius $$r_h = 3.20 \text{ cm} = 0.0320 \text{ m}$$)
- Nozzle diameter: $$d_n = 3.00 \text{ cm}$$ (radius $$r_n = 1.50 \text{ cm} = 0.0150 \text{ m}$$)
- Flow rate: $$Q = 40.0 \text{ L/s} = 0.0400 \text{ m}^3\text{/s}$$
- Water density: $$\rho = 1000 \text{ kg/m}^3$$
- Water viscosity: $$\eta \approx 1.00 \times 10^{-3} \text{ Pa} \cdot \text{s}$$

**Fire Hose:**

Calculate velocity in the hose:

$$v_h = \frac{Q}{\pi r_h^2} = \frac{0.0400 \text{ m}^3\text{/s}}{\pi (0.0320 \text{ m})^2} = \frac{0.0400}{3.22 \times 10^{-3}} \text{ m/s} = 12.4 \text{ m/s}$$

Calculate Reynolds number for the hose:

$${N}_{\text{R,h}} = \frac{2\rho v_h r_h}{\eta} = \frac{2(1000)(12.4)(0.0320)}{1.00 \times 10^{-3}}$$

$${N}_{\text{R,h}} = \frac{794}{1.00 \times 10^{-3}} = 7.94 \times 10^{5}$$

**Nozzle:**

Calculate velocity in the nozzle:

$$v_n = \frac{Q}{\pi r_n^2} = \frac{0.0400 \text{ m}^3\text{/s}}{\pi (0.0150 \text{ m})^2} = \frac{0.0400}{7.07 \times 10^{-4}} \text{ m/s} = 56.6 \text{ m/s}$$

Calculate Reynolds number for the nozzle:

$${N}_{\text{R,n}} = \frac{2\rho v_n r_n}{\eta} = \frac{2(1000)(56.6)(0.0150)}{1.00 \times 10^{-3}}$$

$${N}_{\text{R,n}} = \frac{1698}{1.00 \times 10^{-3}} = 1.70 \times 10^{6}$$

**Summary:**
- Fire hose: $${N}_{\text{R}} = 7.94 \times 10^{5} \gg 3000$$ — **turbulent**
- Nozzle: $${N}_{\text{R}} = 1.70 \times 10^{6} \gg 3000$$ — **turbulent**

Both Reynolds numbers are hundreds of times greater than 3000, confirming the flow must be turbulent in both the hose and nozzle.

**Discussion**

The extremely high Reynolds numbers (nearly a million) make laminar flow impossible in firefighting equipment. This is expected given the enormous flow rates needed to fight fires effectively. The turbulent flow actually helps in firefighting by causing better mixing and dispersion of water at the nozzle exit. The pressure information given ($$1.62 \times 10^{6} \text{ N/m}^2 \approx 16$$ atm) wasn't needed for this calculation but would be used to find pressure at the nozzle using Bernoulli's equation.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Concrete is pumped from a cement mixer to the place it is being laid, instead of being carried in wheelbarrows. The flow rate is 200.0 L/min through a 50.0-m-long, 8.00-cm-diameter hose, and the pressure at the pump is  $$ 8.00 \times 10^{6}  {\text{N/m}}^{2} $$ .
 Verify that the flow of concrete is laminar taking concrete's viscosity to be  $$48.0 \left(\text{N/}{\text{m}}^{2}\right)·\text{s} $$ ,
 and given its density is  $$2300 kg/{\text{m}}^{3} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

We calculate the flow velocity from the given flow rate and pipe dimensions, then use the Reynolds number formula to verify $${N}_{\text{R}} < 2000$$ for laminar flow.

**Solution**

Given:
- Flow rate: $$Q = 200.0 \text{ L/min} = \frac{200.0}{60 \times 1000} \text{ m}^3\text{/s} = 3.33 \times 10^{-3} \text{ m}^3\text{/s}$$
- Hose diameter: $$d = 8.00 \text{ cm}$$ (radius $$r = 4.00 \text{ cm} = 0.0400 \text{ m}$$)
- Concrete density: $$\rho = 2300 \text{ kg/m}^3$$
- Concrete viscosity: $$\eta = 48.0 \text{ Pa} \cdot \text{s}$$

Step 1: Calculate the flow velocity:

$$v = \frac{Q}{A} = \frac{Q}{\pi r^2} = \frac{3.33 \times 10^{-3} \text{ m}^3\text{/s}}{\pi (0.0400 \text{ m})^2}$$

$$v = \frac{3.33 \times 10^{-3}}{5.03 \times 10^{-3}} \text{ m/s} = 0.663 \text{ m/s}$$

Step 2: Calculate the Reynolds number:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta} = \frac{2(2300 \text{ kg/m}^3)(0.663 \text{ m/s})(0.0400 \text{ m})}{48.0 \text{ Pa} \cdot \text{s}}$$

$${N}_{\text{R}} = \frac{122}{48.0} = 2.54$$

Since $${N}_{\text{R}} = 2.54 \ll 2000$$, the flow is definitely laminar.

**Discussion**

The Reynolds number of 2.54 is extraordinarily low—nearly three orders of magnitude below the laminar threshold. This is entirely due to concrete's extremely high viscosity (48 Pa·s compared to water's 0.001 Pa·s—about 48,000 times more viscous). Despite the relatively high flow rate and the high density of concrete, the viscosity dominates the Reynolds number. This is why concrete pumping equipment can use Poiseuille's law to predict flow rates accurately, even though the pressures involved are very high (80 atm in this case).
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
At what flow rate might turbulence begin to develop in a water main with a 0.200-m diameter? Assume a  $$20 \text{ºC} $$
 temperature.

</div>
<div class="solution" markdown="1">
**Strategy**

Turbulence begins to develop when the Reynolds number reaches approximately 2000. We set $${N}_{\text{R}} = 2000$$, solve for the critical velocity, then calculate the corresponding flow rate using $$Q = Av$$.

**Solution**

Given:
- Pipe diameter: $$d = 0.200 \text{ m}$$ (radius $$r = 0.100 \text{ m}$$)
- Temperature: $$T = 20°\text{C}$$
- Water density at 20°C: $$\rho = 1000 \text{ kg/m}^3$$
- Water viscosity at 20°C: $$\eta = 1.002 \times 10^{-3} \text{ Pa} \cdot \text{s}$$
- Critical Reynolds number: $${N}_{\text{R}} = 2000$$

Step 1: Find the critical velocity by rearranging the Reynolds number formula:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta}$$

$$v = \frac{{N}_{\text{R}} \eta}{2\rho r} = \frac{(2000)(1.002 \times 10^{-3} \text{ Pa} \cdot \text{s})}{2(1000 \text{ kg/m}^3)(0.100 \text{ m})}$$

$$v = \frac{2.004}{200} \text{ m/s} = 1.00 \times 10^{-2} \text{ m/s} = 1.00 \text{ cm/s}$$

Step 2: Calculate the corresponding flow rate:

$$Q = Av = \pi r^2 v = \pi (0.100 \text{ m})^2 (1.00 \times 10^{-2} \text{ m/s})$$

$$Q = \pi (0.0100)(1.00 \times 10^{-2}) \text{ m}^3\text{/s} = 3.14 \times 10^{-4} \text{ m}^3\text{/s}$$

Converting to more practical units:

$$Q = 3.14 \times 10^{-4} \text{ m}^3\text{/s} \times \frac{1000 \text{ L}}{1 \text{ m}^3} = 0.314 \text{ L/s} = 18.8 \text{ L/min}$$

Turbulence might begin to develop at a flow rate of approximately **0.31 L/s** (or about 19 L/min).

**Discussion**

This is a surprisingly low flow rate for such a large pipe. At only 0.31 L/s, flow begins transitioning from laminar to turbulent. In practice, municipal water mains operate at much higher flow rates and the flow is thoroughly turbulent. The turbulent flow actually helps maintain water quality by preventing stagnant regions where bacteria could grow. The low critical velocity (1 cm/s) shows that even gentle flows in large pipes tend toward turbulence due to the large characteristic length scale (diameter).
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the greatest average speed of blood flow at  $$37 \text{ºC} $$
 in an artery of radius 2.00 mm if the flow is to remain laminar? What is the corresponding flow rate? Take the density of blood to be  $$1025 kg/{\text{m}}^{3} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

For flow to remain laminar, the Reynolds number must stay below 2000. We solve for the maximum velocity that keeps $${N}_{\text{R}} = 2000$$, then calculate the corresponding flow rate.

**Solution**

Given:
- Artery radius: $$r = 2.00 \text{ mm} = 2.00 \times 10^{-3} \text{ m}$$
- Temperature: $$T = 37°\text{C}$$ (body temperature)
- Blood density: $$\rho = 1025 \text{ kg/m}^3$$
- Blood viscosity at 37°C: $$\eta = 2.084 \times 10^{-3} \text{ Pa} \cdot \text{s}$$ (from Table 12.1)
- Critical Reynolds number for laminar flow: $${N}_{\text{R}} = 2000$$

Step 1: Find the maximum velocity for laminar flow:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta}$$

$$v_{\text{max}} = \frac{{N}_{\text{R}} \eta}{2\rho r} = \frac{(2000)(2.084 \times 10^{-3} \text{ Pa} \cdot \text{s})}{2(1025 \text{ kg/m}^3)(2.00 \times 10^{-3} \text{ m})}$$

$$v_{\text{max}} = \frac{4.168}{4.10} \text{ m/s} = 1.02 \text{ m/s}$$

Step 2: Calculate the corresponding flow rate:

$$Q = Av = \pi r^2 v = \pi (2.00 \times 10^{-3} \text{ m})^2 (1.02 \text{ m/s})$$

$$Q = \pi (4.00 \times 10^{-6})(1.02) \text{ m}^3\text{/s} = 1.28 \times 10^{-5} \text{ m}^3\text{/s}$$

Converting to liters per second:

$$Q = 1.28 \times 10^{-5} \text{ m}^3\text{/s} \times \frac{1000 \text{ L}}{1 \text{ m}^3} = 1.28 \times 10^{-2} \text{ L/s}$$

The greatest average speed for laminar flow is **1.02 m/s**, with a corresponding flow rate of **$$1.28 \times 10^{-2}$$ L/s** (or about 0.77 L/min).

**Discussion**

This maximum laminar velocity of about 1 m/s is consistent with known blood flow speeds in major arteries. In the aorta, blood velocities can exceed this during systole (heart contraction), which is why turbulence occasionally occurs there. The critical velocity of 35 m/s mentioned in the text for the aorta corresponds to a much larger diameter vessel. For this 4-mm diameter artery, the 1 m/s limit is clinically relevant—arterial constrictions that increase local velocity above this threshold can cause turbulence, which is detectable as a "bruit" (abnormal sound) with a stethoscope.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In [Take-Home Experiment: Inhalation](#Take-Home1), we measured the average flow rate  $$Q $$  of air traveling through the trachea during each inhalation. Now calculate the average air speed in meters per second through your trachea during each inhalation. The radius of the trachea in adult humans is approximately  $$10^{-2} \text{m} $$ .
 From the data above, calculate the Reynolds number for the air flow in the trachea during inhalation. Do you expect the air flow to be laminar or turbulent?

</div>
<div class="solution" markdown="1">
**Strategy**

We use typical inhalation data to calculate the flow rate, then find the velocity and Reynolds number. A typical adult inhales about 1 L of air per breath in approximately 2 seconds during normal breathing.

**Solution**

Given:
- Trachea radius: $$r = 10^{-2} \text{ m} = 1.0 \text{ cm}$$
- Volume per inhalation: $$V = 1 \text{ L} = 10^{-3} \text{ m}^3$$ (typical value)
- Inhalation time: $$t \approx 2 \text{ s}$$ (typical value)
- Air density at body temperature: $$\rho \approx 1.1 \text{ kg/m}^3$$
- Air viscosity at 37°C: $$\eta \approx 1.9 \times 10^{-5} \text{ Pa} \cdot \text{s}$$

Step 1: Calculate the average flow rate:

$$Q = \frac{V}{t} = \frac{10^{-3} \text{ m}^3}{2 \text{ s}} = 5 \times 10^{-4} \text{ m}^3\text{/s}$$

Step 2: Calculate the average air speed through the trachea:

$$v = \frac{Q}{A} = \frac{Q}{\pi r^2} = \frac{5 \times 10^{-4} \text{ m}^3\text{/s}}{\pi (10^{-2} \text{ m})^2}$$

$$v = \frac{5 \times 10^{-4}}{3.14 \times 10^{-4}} \text{ m/s} = 1.6 \text{ m/s}$$

Step 3: Calculate the Reynolds number:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta} = \frac{2(1.1 \text{ kg/m}^3)(1.6 \text{ m/s})(10^{-2} \text{ m})}{1.9 \times 10^{-5} \text{ Pa} \cdot \text{s}}$$

$${N}_{\text{R}} = \frac{3.52 \times 10^{-2}}{1.9 \times 10^{-5}} = 1850$$

The average air speed is approximately **1.6 m/s** and the Reynolds number is approximately **1850**.

Since $${N}_{\text{R}} \approx 1850$$ is just below 2000, the flow is at the upper edge of the laminar regime. During normal quiet breathing, the flow should be **laminar but close to transitional**.

**Discussion**

This result explains why breathing is normally quiet—laminar flow produces little noise. However, during heavy breathing or exercise, the flow rate increases significantly, pushing the Reynolds number above 2000-3000 and causing turbulent flow. This is why you can hear your breathing during vigorous exercise. During coughing or sneezing, velocities can exceed 30 m/s, producing highly turbulent flow and the characteristic sounds. Note that actual results will vary based on individual breathing patterns measured in the Take-Home Experiment.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Gasoline is piped underground from refineries to major users. The flow rate is  $$ 3.00 \times 10^{-2} {\text{m}}^{3}\text{/s} $$
 (about 500 gal/min), the viscosity of gasoline is  $$1.00 \times 10^{-3} \left({\text{N/m}}^{2}\right)\cdot \text{s} $$ ,
 and its density is  $$680 {\text{kg/m}}^{3} $$ .
 (a) What minimum diameter must the pipe have if the Reynolds number is to be less than 2000? (b) What pressure difference must be maintained along each kilometer of the pipe to maintain this flow rate?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) We express velocity in terms of flow rate and radius, substitute into the Reynolds number formula, set $${N}_{\text{R}} = 2000$$, and solve for the minimum radius.
(b) We use Poiseuille's law to find the pressure difference needed to maintain laminar flow.

**Solution**

Given:
- Flow rate: $$Q = 3.00 \times 10^{-2} \text{ m}^3\text{/s}$$
- Gasoline viscosity: $$\eta = 1.00 \times 10^{-3} \text{ Pa} \cdot \text{s}$$
- Gasoline density: $$\rho = 680 \text{ kg/m}^3$$

**(a) Minimum diameter for laminar flow:**

The velocity in terms of flow rate is:

$$v = \frac{Q}{A} = \frac{Q}{\pi r^2}$$

Substituting into the Reynolds number formula:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta} = \frac{2\rho r}{\eta} \cdot \frac{Q}{\pi r^2} = \frac{2\rho Q}{\pi \eta r}$$

Solving for r when $${N}_{\text{R}} = 2000$$:

$$r = \frac{2\rho Q}{\pi \eta {N}_{\text{R}}} = \frac{2(680 \text{ kg/m}^3)(3.00 \times 10^{-2} \text{ m}^3\text{/s})}{\pi (1.00 \times 10^{-3} \text{ Pa} \cdot \text{s})(2000)}$$

$$r = \frac{40.8}{6.28} \text{ m} = 6.50 \text{ m}$$

The minimum diameter is:

$$d = 2r = 2(6.50 \text{ m}) = 13.0 \text{ m}$$

**(b) Pressure difference per kilometer:**

Using Poiseuille's law for the pressure difference:

$$\Delta P = \frac{8\eta L Q}{\pi r^4}$$

For $$L = 1000 \text{ m}$$ and $$r = 6.50 \text{ m}$$:

$$\Delta P = \frac{8(1.00 \times 10^{-3} \text{ Pa} \cdot \text{s})(1000 \text{ m})(3.00 \times 10^{-2} \text{ m}^3\text{/s})}{\pi (6.50 \text{ m})^4}$$

$$\Delta P = \frac{0.240}{5617} \text{ Pa} = 4.27 \times 10^{-5} \text{ Pa} = 4.27 \times 10^{-5} \text{ N/m}^2$$

**Summary:**
- (a) Minimum diameter: **$$d \geq 13.0 \text{ m}$$**
- (b) Pressure difference per km: approximately **$$4 \times 10^{-5} \text{ N/m}^2$$**

**Discussion**

This result reveals an unreasonable scenario! A 13-meter diameter pipe would be enormous—larger than most highway tunnels. This demonstrates that maintaining laminar flow for high-volume gasoline transport is completely impractical. In reality, gasoline pipelines use much smaller pipes (typically 0.3-1.2 m diameter) and accept turbulent flow. The extremely low pressure difference calculated assumes laminar flow in this giant pipe, which explains why it's unrealistically small. Real pipelines require much higher pressures due to turbulent losses. This problem illustrates why Reynolds number constraints sometimes lead to impractical engineering solutions, and why turbulent flow is often accepted in industrial applications.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Assuming that blood is an ideal fluid, calculate the critical flow rate at which turbulence is a certainty in the aorta. Take the diameter of the aorta to be 2.50 cm. (Turbulence will actually occur at lower average flow rates, because blood is not an ideal fluid. Furthermore, since blood flow pulses, turbulence may occur during only the high-velocity part of each heartbeat.)

</div>
<div class="solution" markdown="1">
**Strategy**

Turbulence is "a certainty" when the Reynolds number exceeds 3000. We solve for the critical velocity at $${N}_{\text{R}} = 3000$$, then calculate the corresponding flow rate.

**Solution**

Given:
- Aorta diameter: $$d = 2.50 \text{ cm}$$ (radius $$r = 1.25 \text{ cm} = 0.0125 \text{ m}$$)
- Blood density: $$\rho = 1025 \text{ kg/m}^3$$ (typical value)
- Blood viscosity at 37°C: $$\eta = 2.084 \times 10^{-3} \text{ Pa} \cdot \text{s}$$
- Critical Reynolds number for certain turbulence: $${N}_{\text{R}} = 3000$$

Step 1: Find the critical velocity for certain turbulence:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta}$$

$$v_{\text{crit}} = \frac{{N}_{\text{R}} \eta}{2\rho r} = \frac{(3000)(2.084 \times 10^{-3} \text{ Pa} \cdot \text{s})}{2(1025 \text{ kg/m}^3)(0.0125 \text{ m})}$$

$$v_{\text{crit}} = \frac{6.252}{25.6} \text{ m/s} = 0.244 \text{ m/s} = 24.4 \text{ cm/s}$$

Step 2: Calculate the critical flow rate:

$$Q_{\text{crit}} = A v_{\text{crit}} = \pi r^2 v_{\text{crit}} = \pi (0.0125 \text{ m})^2 (0.244 \text{ m/s})$$

$$Q_{\text{crit}} = \pi (1.56 \times 10^{-4})(0.244) \text{ m}^3\text{/s} = 1.20 \times 10^{-4} \text{ m}^3\text{/s}$$

Converting to liters per minute:

$$Q_{\text{crit}} = 1.20 \times 10^{-4} \text{ m}^3\text{/s} \times \frac{1000 \text{ L}}{1 \text{ m}^3} \times \frac{60 \text{ s}}{1 \text{ min}} = 7.2 \text{ L/min}$$

The critical flow rate at which turbulence is certain is **$$1.20 \times 10^{-4} \text{ m}^3\text{/s}$$** or approximately **7.2 L/min**.

**Discussion**

This critical flow rate of about 7.2 L/min is remarkably close to the typical cardiac output of 5-6 L/min at rest. This means the aorta normally operates near the turbulent threshold! During exercise, when cardiac output increases to 20-25 L/min, the flow is definitely turbulent. The problem notes that real turbulence occurs at even lower flow rates because:
1. Blood is not an ideal (Newtonian) fluid—it's a suspension of cells
2. Blood flow is pulsatile, not steady—peak velocities during systole are much higher than average
3. The aorta is not a smooth, straight tube—it has curves and branches

This explains why aortic flow can sometimes be heard with a stethoscope even in healthy individuals, especially during exertion.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

A fairly large garden hose has an internal radius of 0.600 cm and a length of
23.0 m. The nozzleless horizontal hose is attached to a faucet, and it delivers
50.0 L/s. (a) What water pressure is supplied by the faucet? (b) What is
unreasonable about this pressure? (c) What is unreasonable about the premise? (
d) What is the Reynolds number for the given flow? (Take the viscosity of water
as $$1.005 \times 10^{-3} \left(\text{N}/{m}^{2}\right)\cdot \text{s} $$ .)

</div>
<div class="solution" markdown="1">
**Strategy**

We use Poiseuille's law to calculate the required pressure (assuming laminar flow), then check whether this assumption is valid using the Reynolds number. The unreasonable results will reveal flaws in the problem's premise.

**Solution**

Given:
- Hose radius: $$r = 0.600 \text{ cm} = 6.00 \times 10^{-3} \text{ m}$$
- Hose length: $$L = 23.0 \text{ m}$$
- Flow rate: $$Q = 50.0 \text{ L/s} = 0.0500 \text{ m}^3\text{/s}$$
- Water viscosity: $$\eta = 1.005 \times 10^{-3} \text{ Pa} \cdot \text{s}$$
- Water density: $$\rho = 1000 \text{ kg/m}^3$$

**(a) Required pressure using Poiseuille's law:**

$$Q = \frac{\pi r^4 \Delta P}{8 \eta L}$$

Solving for pressure:

$$\Delta P = \frac{8 \eta L Q}{\pi r^4} = \frac{8(1.005 \times 10^{-3} \text{ Pa} \cdot \text{s})(23.0 \text{ m})(0.0500 \text{ m}^3\text{/s})}{\pi (6.00 \times 10^{-3} \text{ m})^4}$$

$$\Delta P = \frac{9.25 \times 10^{-3}}{4.07 \times 10^{-9}} \text{ Pa} = 2.27 \times 10^{6} \text{ Pa}$$

Converting to atmospheres: $$\Delta P = \frac{2.27 \times 10^{6} \text{ Pa}}{1.013 \times 10^{5} \text{ Pa/atm}} = 22.4 \text{ atm}$$

Converting to psi: $$\Delta P = 22.4 \text{ atm} \times 14.7 \text{ psi/atm} = 329 \text{ psi}$$

**(b) What is unreasonable about this pressure?**

The pressure of approximately **23 atm (or about 330 psi)** is far too high for residential water systems. Typical household water pressure is 2-5 atm (30-80 psi). This calculated pressure would require industrial high-pressure equipment and would likely rupture a standard garden hose.

**(c) What is unreasonable about the premise?**

The flow rate of **50 L/s is extremely high** for a garden hose—this equals 3000 liters per minute or about 800 gallons per minute! A typical garden hose delivers only about 0.3-0.6 L/s (roughly 10-20 gallons per minute). The stated flow rate is about 100 times too large for a garden hose application.

**(d) Reynolds number:**

First, calculate velocity:

$$v = \frac{Q}{A} = \frac{Q}{\pi r^2} = \frac{0.0500 \text{ m}^3\text{/s}}{\pi (6.00 \times 10^{-3} \text{ m})^2} = \frac{0.0500}{1.13 \times 10^{-4}} = 442 \text{ m/s}$$

Calculate Reynolds number:

$${N}_{\text{R}} = \frac{2\rho v r}{\eta} = \frac{2(1000)(442)(6.00 \times 10^{-3})}{1.005 \times 10^{-3}}$$

$${N}_{\text{R}} = \frac{5304}{1.005 \times 10^{-3}} = 5.28 \times 10^{6}$$

**Summary:**
- (a) $$\Delta P \approx 23 \text{ atm}$$ (or $$330 \text{ psi}$$)
- (b) This pressure is unreasonably high—typical home water pressure is only 2-5 atm
- (c) The flow rate of 50 L/s is about 100× higher than realistic for a garden hose
- (d) $${N}_{\text{R}} = 5.28 \times 10^{6} \gg 3000$$ — highly turbulent

**Discussion**

The Reynolds number of over 5 million confirms that using Poiseuille's law (which assumes laminar flow) is completely invalid here. The flow would be extremely turbulent, requiring even higher pressures than calculated. Additionally, the water velocity of 442 m/s (nearly 1000 mph!) is supersonic—faster than the speed of sound in air and approaching it in water. This absurd velocity confirms that the problem's premises are physically unreasonable. This type of "unreasonable results" problem teaches critical thinking: when calculations yield extreme values, always question the initial assumptions.
</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

Reynolds number
: a dimensionless parameter that can reveal whether a particular flow is laminar
or turbulent

</div>
