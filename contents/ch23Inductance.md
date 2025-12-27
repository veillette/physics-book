---
title: Inductance
layout: page
sectionNumber: 9
chapterNumber: 23
---

<div class="abstract" markdown="1">
* Calculate the inductance of an inductor.
* Calculate the energy stored in an inductor.
* Calculate the emf generated in an inductor.
</div>

### Inductors

Induction is the process in which an emf is induced by changing magnetic flux.
Many examples have been discussed so far, some more effective than others.
Transformers, for example, are designed to be particularly effective at inducing
a desired voltage and current with very little loss of energy to other forms. Is
there a useful physical quantity related to how “effective” a given device is?
The answer is yes, and that physical quantity is called **inductance**.

**Mutual inductance** is the effect of Faraday’s law of induction for one device
upon another, such as the primary coil in transmitting energy to the secondary
in a transformer. See [[Figure 1]](#Figure1), where simple coils induce emfs in
one another.

![The figure shows two coils coil one, of five turns and coil two, of four turns are kept adjacent to each other. The magnetic field lines of strength B are shown to pass through the two coils. Coil one is shown to be connected to an A C source. The changing current in the coil one is given as I one in clock wise direction. Coil two is connected to a galvanometer. A change in current in coil one is shown to induce an e m f in coil two. The induced e m f in coil two is measured as a deflection in galvanometer.](../resources/Figure_23_09_01.jpg 'These coils can induce emfs in one another like an inefficient transformer. Their mutual inductance M indicates the effectiveness of the coupling between them. Here a change in current in coil 1 is seen to induce an emf in coil 2. (Note that ( E_{2} ) induced represents the induced emf in coil 2.)')
{: #Figure1}

In the many cases where the geometry of the devices is fixed, flux is changed by
varying current. We therefore concentrate on the rate of change of current,
$$\Delta I/\Delta t $$ , as the cause of induction. A change in the current
$${I}_{1} $$ in one device, coil 1 in the figure, induces an $${\text{emf}}_{2}

$$
in the other. We express this in equation form as

<div class="equation" >
 $${\text{emf}}_{2}=-M\frac{\Delta {I}_{1}}{\Delta t}\text{,} $$
</div>

where $$M $$ is defined to be the mutual inductance between the two devices. The
minus sign is an expression of Lenz’s law. The larger the mutual inductance $$M
$$ , the more effective the coupling. For example, the coils
in [[Figure 1]](#Figure1) have a small $$M $$ compared with the transformer
coils in [[Figure3]](../contents/ch23Transformers#Figure3). Units for $$M
$$ are $$\left(\text{V}\cdot \text{s}\right)\text{/A}=\Omega \cdot \text{s} $$ ,
which is named a **henry** (H), after Joseph Henry. That is, $$1 H=1 \Omega
\cdot \text{s} $$.

Nature is symmetric here. If we change the current $${I}_{2} $$ in coil 2, we
induce an $${\text{emf}}_{1} $$ in coil 1, which is given by

<div class="equation" >
 $${\text{emf}}_{1}=-M\frac{\Delta {I}_{2}}{\Delta t}\text{,} $$
</div>

where $$M $$ is the same as for the reverse process. Transformers run backward
with the same effectiveness, or mutual inductance $$M $$ .

A large mutual inductance $$M $$ may or may not be desirable. We want a
transformer to have a large mutual inductance. But an appliance, such as an
electric clothes dryer, can induce a dangerous emf on its case if the mutual
inductance between its coils and the case is large. One way to reduce mutual
inductance $$M $$ is to counterwind coils to cancel the magnetic field produced. (
See [[Figure 2]](#Figure2).)

![The figure describes the heating coils of electric clothes dryer that are counter wound on a cylindrical core. There magnetic fields cancel each other.](../resources/Figure_23_09_02.jpg "The heating coils of an electric clothes dryer can be counter-wound so that their magnetic fields cancel one another, greatly reducing the mutual inductance with the case of the dryer.")
{: #Figure2}

**Self-inductance**, the effect of Faraday’s law of induction of a device on
itself, also exists. When, for example, current through a coil is increased, the
magnetic field and flux also increase, inducing a counter emf, as required by
Lenz’s law. Conversely, if the current is decreased, an emf is induced that
opposes the decrease. Most devices have a fixed geometry, and so the change in
flux is due entirely to the change in current $$\Delta I $$ through the device.
The induced emf is related to the physical geometry of the device and the rate
of change of current. It is given by

<div class="equation" >
 $$\text{emf}=-L\frac{\Delta I}{\Delta t}\text{,} $$
</div>

where $$L $$ is the self-inductance of the device. A device that exhibits significant
self-inductance is called an **inductor**, and given the symbol
in [[Figure 3]](#Figure3).

![Two straight lines connected by three half-circles adjacent to each other.](../resources/Figure_23_09_05.jpg " ")
{: #Figure3}

The minus sign is an expression of Lenz’s law, indicating that emf opposes the
change in current. Units of self-inductance are henries (H) just as for mutual
inductance. The larger the self-inductance $$L $$ of a device, the greater its
opposition to any change in current through it. For example, a large coil with
many turns and an iron core has a large $$L $$ and will not allow current to
change quickly. To avoid this effect, a small $$L $$ must be achieved, such as
by counterwinding coils as in [[Figure 2]](#Figure2).

A 1 H inductor is a large inductor. To illustrate this, consider a device with
$$L= 1.0 \text{H} $$ that has a 10 A current flowing through it. What happens if
we try to shut off the current rapidly, perhaps in only 1.0 ms? An emf, given by
$$\text{emf}=-L\left(\Delta I/\Delta t\right) $$ , will oppose the change. Thus
an emf will be induced given by $$\text{emf}=-L\left(\Delta I/\Delta t\right)
=\left( 1.0 H\right)\left[ \left(10 \text{A}\right)/\left( 1.0 ms\right)\right]
=10 000 \text{V} $$ . The positive sign means this large voltage is in the same
direction as the current, opposing its decrease. Such large emfs can cause arcs,
damaging switching equipment, and so it may be necessary to change current more
slowly.

There are uses for such a large induced voltage. Camera flashes use a battery,
two inductors that function as a transformer, and a switching system or
oscillator to induce large voltages. (Remember that we need a changing magnetic
field, brought about by a changing current, to induce a voltage in another
coil.) The oscillator system will do this many times as the battery voltage is
boosted to over one thousand volts. (You may hear the high pitched whine from
the transformer as the capacitor is being charged.) A capacitor stores the high
voltage for later use in powering the flash. (See [[Figure 4]](#Figure4).)

![The figure describes an inductor L which is connected in parallel to a capacitor C through a variable switch. There is a cell of voltage V placed parallel to the capacitor. The ends of switch can be removed from the capacitor and connected to Cell V for charging. This variable connection is shown as dashed arrows.](../resources/Figure_23_09_03.jpg "Through rapid switching of an inductor, 1.5 V batteries can be used to induce emfs of several thousand volts. This voltage can be used to store charge in a capacitor for later use, such as in a camera flash attachment.")
{: #Figure4}

It is possible to calculate $$L $$ for an inductor given its geometry (size and
shape) and knowing the magnetic field that it produces. This is difficult in
most cases, because of the complexity of the field created. So in this text the
inductance $$L $$ is usually a given quantity. One exception is the solenoid,
because it has a very uniform field inside, a nearly zero field outside, and a
simple shape. It is instructive to derive an equation for its inductance. We
start by noting that the induced emf is given by Faraday’s law of induction
as $$\text{emf}=-N\left(\Delta \Phi /\Delta t\right) $$ and, by the
definition of self-inductance, as $$\text{emf}=-L\left(\Delta I/\Delta
t\right) $$ . Equating these yields

<div class="equation" >
 $$\text{emf}=-N\frac{\Delta \Phi }{\Delta t}=-L\frac{\Delta I}{\Delta t}\text{.} $$
</div>

Solving for $$L $$ gives

<div class="equation" >
 $$L=N\frac{\Delta \Phi }{\Delta I}\text{.} $$
</div>

This equation for the self-inductance $$L $$ of a device is always valid. It
means that self-inductance $$L $$ depends on how effective the current is in
creating flux; the more effective, the greater $$\Delta \Phi $$ / $$\Delta I $$
is.

Let us use this last equation to find an expression for the inductance of a
solenoid. Since the area $$A $$ of a solenoid is fixed, the change in flux is
$$\Delta \Phi =\Delta \left(BA\right)=A\Delta B $$ . To find $$\Delta B $$ , we
note that the magnetic field of a solenoid is given by $$B={\mu }_
{0}\text{nI}={\mu }_{0}\frac{NI}{\ell } $$ .
(Here $$n=N/\ell $$ , where $$N $$ is the number of coils and $$\ell $$ is the
solenoid’s length.) Only the current changes, so that $$\Delta \Phi =A\Delta
B={\mu }_{0}NA\frac{\Delta I}{\ell } $$ . Substituting $$\Delta \Phi $$ into
$$L=N\frac{\Delta \Phi }{\Delta I} $$ gives

<div class="equation" >
 $$L=N\frac{\Delta \Phi }{\Delta I}=N\frac{ {\mu }_{0} NA \frac{\Delta I}{\ell }}{\Delta I}\text{.} $$
</div>

This simplifies to

<div class="equation" >
 $$L=\frac{ {\mu }_{0}{N}^{2}A}{\ell }\text{(solenoid).} $$
</div>

This is the self-inductance of a solenoid of cross-sectional area $$A $$ and
length $$\ell $$ . Note that the inductance depends only on the physical
characteristics of the solenoid, consistent with its definition.

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating the Self-inductance of a Moderate Size Solenoid
</div>
Calculate the self-inductance of a 10.0 cm long, 4.00 cm diameter solenoid that has 200 coils.

**Strategy**

This is a straightforward application of $$L=\frac{ {\mu }_{0}{N}^{2}A}{\ell }
$$ , since all quantities in the equation except $$L $$ are known.

**Solution**

Use the following expression for the self-inductance of a solenoid:

<div class="equation" >
 $$L=\frac{ {\mu }_{0}{N}^{2}A}{\ell }\text{.} $$
</div>
The cross-sectional area in this example is  $$A=\pi r^2=\left( 3.14\text{...}\right) { \left(0.0200\text{m}\right)}^{2}= 1.26 \times 10^{-3}  {\text{m}}^{2} $$ ,
  $$N $$
 is given to be 200, and the length  $$\ell  $$
 is 0.100 m. We know the permeability of free space is  $${\mu }_{0}=4\pi  \times 10^{\text{−7}} \text{T}\cdot \text{m/A} $$ .
 Substituting these into the expression for  $$L $$  gives

<div class="equation" >
 $$\begin{array}{lll}
 L& =& \frac{
        \left(4\pi  \times 10^{-7}  \text{T}\cdot \text{m/A}\right)
        \left( 200 \right)^{2}
        \left( 1.26 \times 10^{-3}  {\text{m}}^{2} \right)
        }
        {0.100 \text{m}}\\
  L& =& 0.632 \text{mH}\text{.}\end{array}
$$

</div>
**Discussion**

This solenoid is moderate in size. Its inductance of nearly a millihenry is also
considered moderate.

</div>

One common application of inductance is used in traffic lights that can tell
when vehicles are waiting at the intersection. An electrical circuit with an
inductor is placed in the road under the place a waiting car will stop over. The
body of the car increases the inductance and the circuit changes sending a
signal to the traffic lights to change colors. Similarly, metal detectors used
for airport security employ the same technique. A coil or inductor in the metal
detector frame acts as both a transmitter and a receiver. The pulsed signal in
the transmitter coil induces a signal in the receiver. The self-inductance of
the circuit is affected by any metal object in the path. Such detectors can be
adjusted for sensitivity and also can indicate the approximate location of metal
found on a person. (But they will not be able to detect any plastic explosive
such as that found on the “underwear bomber.”) See [[Figure 5]](#Figure5).

![Photograph of people around a security gate at an airport departure terminal.](../resources/Figure_23_09_04.jpg 'The familiar security gate at an airport can not only detect metals but also indicate their approximate height above the floor. (credit: Alexbuirds, Wikimedia Commons)')
{: #Figure5}

### Energy Stored in an Inductor

We know from Lenz’s law that inductances oppose changes in current. There is an
alternative way to look at this opposition that is based on energy. Energy is
stored in a magnetic field. It takes time to build up energy, and it also takes
time to deplete energy; hence, there is an opposition to rapid change. In an
inductor, the magnetic field is directly proportional to current and to the
inductance of the device. It can be shown that
the <strong class="term" >energy stored in an
inductor </strong> $${E}_{\text{ind}} $$ is given by

<div class="equation" >
 $${E}_{\text{ind}}=\frac{1}{2}{\text{LI}}^{2}\text{.} $$
</div>

This expression is similar to that for the energy stored in a capacitor.

<div id="Example2" class="example" markdown="1">
<div class="title">
Calculating the Energy Stored in the Field of a Solenoid
</div>
How much energy is stored in the 0.632 mH inductor of the preceding example when a 30.0 A current flows through it?

**Strategy**

The energy is given by the equation $${E}_
{\text{ind}}=\frac{1}{2}{\text{LI}}^{2} $$ , and all quantities except $${E}_
{\text{ind}} $$ are known.

**Solution**

Substituting the value for $$L $$ found in the previous example and the given
current into $${E}_{\text{ind}}=\frac{1}{2}{\text{LI}}^{2} $$ gives

<div class="equation" >
 $$\begin{array}{lll}{E}_{\text{ind}}& =& \frac{1}{2}{\text{LI}}^{2}\\ & =& 0.5\left( 0.632 \times 10^{-3}  \text{H}\right) { \left(30.0 \text{A}\right)}^{2}=0.284 \text{J}\text{.}\end{array} $$
</div>
**Discussion**

This amount of energy is certainly enough to cause a spark if the current is
suddenly switched off. It cannot be built up instantaneously unless the power
input is infinite.

</div>

### Section Summary

- Inductance is the property of a device that tells how effectively it induces
  an emf in another device.
- Mutual inductance is the effect of two devices in inducing emfs in each other.
- A change in current $$\Delta {I}_{1}/\Delta t $$ in one induces an emf
  $${\text{emf}}\_{2} $$ in the second:

  <div class="equation" >
   $${\text{emf}}_{2}=-M\frac{\Delta {I}_{1}}{\Delta t}\text{,} $$
  </div>
     where
   $$M $$ is defined to be the mutual inductance between the two devices, and the minus sign is due to Lenz’s law.

- Symmetrically, a change in current $$\Delta {I}_{2}/\Delta t $$ through the
  second device induces an emf $${\text{emf}}_{1} $$ in the first:
  <div class="equation" >
   $${\text{emf}}_{1}=-M\frac{\Delta {I}_{2}}{\Delta t}\text{,} $$
  </div>
     where
   $$M $$ is the same mutual inductance as in the reverse process.
- Current changes in a device induce an emf in the device itself.
- Self-inductance is the effect of the device inducing emf in itself.
- The device is called an inductor, and the emf \*\*induced in it by a change in current through it is
<div class="equation" >
 $$\text{emf}=-L\frac{\Delta I}{\Delta t}\text{,} $$
</div>
   where
 $$L $$ is the self-inductance of the inductor, and
 $$\Delta I/\Delta t $$ is the rate of change of current through it. The minus sign indicates that emf opposes the change in current, as required by Lenz’s law.
- The unit of self- and mutual inductance is the henry (H), where
  $$1 H=1 \Omega \cdot \text{s} $$ .
- The self-inductance
$$L $$ of an inductor is proportional to how much flux changes with current. For an
$$N $$
-turn inductor,
<div class="equation" >
 $$L=N\frac{\Delta \Phi }{\Delta I}\text{.} $$
</div>

- The self-inductance of a solenoid is

  <div class="equation" >
   $$L=\frac{ {\mu }_{0}{N}^{2}A}{\ell }\text{(solenoid),} $$
  </div>
     where    $$N $$ is its number of turns in the solenoid,
   $$A $$ is its cross-sectional area,
   $$\ell  $$ is its length, and
   $${\text{μ}}_{0}=4\pi  \times 10^{\text{−7}} \text{T}\cdot \text{m/A}  $$ is the permeability of free space.

- The energy stored in an inductor $${E}_{\text{ind}} $$ is
  <div class="equation" >
   $${E}_{\text{ind}}=\frac{1}{2}{\text{LI}}^{2}\text{.} $$
  </div>

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
How would you place two identical flat coils in contact so that they had the greatest mutual inductance? The least?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
How would you shape a given length of wire to give it the greatest self-inductance? The least?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Verify, as was concluded without proof in [[Example 1]](#Example1), that units of  $$\text{T}\cdot {\text{m}}^{2}/A=\Omega \cdot \text{s}=\text{H} $$.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Two coils are placed close together in a physics lab to demonstrate Faraday's law of induction. A current of 5.00 A in one is switched off in 1.00 ms, inducing a 9.00 V emf in the other. What is their mutual inductance?

</div>
<div class="solution" markdown="1">
**Strategy**

We can use the relationship between mutual inductance and induced emf: $${\text{emf}}_{2}=-M\frac{\Delta {I}_{1}}{\Delta t}$$. We know the induced emf, the current change, and the time interval, so we can solve for the mutual inductance $$M$$.

**Solution**

Rearranging the mutual inductance equation to solve for $$M$$:

<div class="equation">
$$M=\frac{\left|{\text{emf}}_{2}\right|}{\Delta I_1/\Delta t}$$
</div>

The change in current is $$\Delta I_1 = 5.00 \text{ A}$$ (from 5.00 A to zero), and the time interval is $$\Delta t = 1.00 \text{ ms} = 1.00 \times 10^{-3} \text{ s}$$. The induced emf is 9.00 V. Substituting:

<div class="equation">
$$M=\frac{9.00 \text{ V}}{5.00 \text{ A}/1.00 \times 10^{-3} \text{ s}}=\frac{9.00 \text{ V} \times 1.00 \times 10^{-3} \text{ s}}{5.00 \text{ A}}=1.80 \times 10^{-3} \text{ H}=1.80 \text{ mH}$$
</div>

**Discussion**

This is a relatively small mutual inductance, which is typical for two separate coils that are not specifically designed to be coupled like a transformer. The mutual inductance depends on the geometry and positioning of the coils—closer coils with better alignment would have higher mutual inductance.

**Final Answer**

1.80 mH

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If two coils placed next to one another have a mutual inductance of 5.00 mH, what voltage is induced in one when the 2.00 A current in the other is switched off in 30.0 ms?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the mutual inductance equation $${\text{emf}}_{2}=-M\frac{\Delta {I}_{1}}{\Delta t}$$ to find the induced emf. We know $$M$$, the current change $$\Delta I_1$$, and the time interval $$\Delta t$$.

**Solution**

Given:
- $$M = 5.00 \text{ mH} = 5.00 \times 10^{-3} \text{ H}$$
- $$\Delta I_1 = 2.00 \text{ A}$$ (from 2.00 A to zero)
- $$\Delta t = 30.0 \text{ ms} = 30.0 \times 10^{-3} \text{ s}$$

The magnitude of the induced emf is:

<div class="equation">
$$\left|{\text{emf}}_{2}\right|=M\frac{\Delta I_1}{\Delta t}=(5.00 \times 10^{-3} \text{ H})\frac{2.00 \text{ A}}{30.0 \times 10^{-3} \text{ s}}$$
</div>

<div class="equation">
$$\left|{\text{emf}}_{2}\right|=(5.00 \times 10^{-3} \text{ H})\left(66.7 \text{ A/s}\right)=0.333 \text{ V}$$
</div>

**Discussion**

The induced voltage is relatively small because the current is switched off over a relatively long time (30.0 ms). If the current were switched off more quickly, the induced voltage would be proportionally larger. This demonstrates that the rate of current change is crucial in determining the magnitude of induced emf.

**Final Answer**

0.333 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The 4.00 A current through a 7.50 mH inductor is switched off in 8.33 ms. What is the emf induced opposing this?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the self-inductance equation $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ to find the induced emf. The inductor opposes the change in current, and we need to find the magnitude of this opposing emf.

**Solution**

Given:
- $$L = 7.50 \text{ mH} = 7.50 \times 10^{-3} \text{ H}$$
- $$\Delta I = 4.00 \text{ A}$$ (from 4.00 A to zero)
- $$\Delta t = 8.33 \text{ ms} = 8.33 \times 10^{-3} \text{ s}$$

The magnitude of the induced emf is:

<div class="equation">
$$\left|\text{emf}\right|=L\frac{\Delta I}{\Delta t}=(7.50 \times 10^{-3} \text{ H})\frac{4.00 \text{ A}}{8.33 \times 10^{-3} \text{ s}}$$
</div>

<div class="equation">
$$\left|\text{emf}\right|=(7.50 \times 10^{-3} \text{ H})(480 \text{ A/s})=3.60 \text{ V}$$
</div>

**Discussion**

The induced emf opposes the decrease in current, attempting to maintain the current flow. This 3.60 V emf is significant enough that it could cause sparking in a mechanical switch. By Lenz's law, the induced emf has the same polarity as the original current direction, trying to keep the current flowing even as we try to switch it off.

**Final Answer**

3.60 V

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A device is turned on and 3.00 A flows through it 0.100 ms later. What is the self-inductance of the device if an induced 150 V emf opposes this?

</div>
<div class="solution" markdown="1">
**Strategy**

We rearrange the self-inductance equation $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ to solve for $$L$$. We know the induced emf, the current change, and the time interval.

**Solution**

Given:
- $$\left|\text{emf}\right| = 150 \text{ V}$$
- $$\Delta I = 3.00 \text{ A}$$ (from 0 to 3.00 A)
- $$\Delta t = 0.100 \text{ ms} = 0.100 \times 10^{-3} \text{ s} = 1.00 \times 10^{-4} \text{ s}$$

Rearranging for $$L$$:

<div class="equation">
$$L=\frac{\left|\text{emf}\right|}{\Delta I/\Delta t}=\frac{\left|\text{emf}\right| \times \Delta t}{\Delta I}$$
</div>

Substituting the values:

<div class="equation">
$$L=\frac{150 \text{ V} \times 1.00 \times 10^{-4} \text{ s}}{3.00 \text{ A}}=\frac{0.0150 \text{ V·s}}{3.00 \text{ A}}=5.00 \times 10^{-3} \text{ H}=5.00 \text{ mH}$$
</div>

**Discussion**

This is a moderate self-inductance value, typical for small inductors used in electronics. The large induced emf (150 V) despite the relatively small inductance is due to the extremely rapid current change (3.00 A in only 0.100 ms). This demonstrates why inductive devices can produce large voltage spikes when switched on or off quickly.

**Final Answer**

5.00 mH

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Starting with  $${\text{emf}}_{2}=-M\frac{\Delta {I}_{1}}{\Delta t} $$ ,
 show that the units of inductance are  $$\left(\text{V}\cdot \text{s}\right)\text{/A}=\Omega \cdot \text{s} $$.

</div>
<div class="solution" markdown="1">
**Strategy**

We analyze the mutual inductance equation to determine the units of $$M$$. Then we show that volts times seconds per ampere is equivalent to ohms times seconds.

**Solution**

Starting with the mutual inductance equation:

<div class="equation">
$${\text{emf}}_{2}=-M\frac{\Delta {I}_{1}}{\Delta t}$$
</div>

Rearranging to solve for $$M$$:

<div class="equation">
$$M=\frac{{\text{emf}}_{2}}{\Delta {I}_{1}/\Delta t}$$
</div>

The units are:

<div class="equation">
$$[M]=\frac{[\text{emf}]}{[I]/[t]}=\frac{\text{V}}{\text{A/s}}=\frac{\text{V} \cdot \text{s}}{\text{A}}$$
</div>

Now we need to show that $$\frac{\text{V} \cdot \text{s}}{\text{A}} = \Omega \cdot \text{s}$$.

From Ohm's law, $$V = IR$$, so $$1 \text{ V} = 1 \text{ A} \times 1 \Omega$$, which means:

<div class="equation">
$$1 \Omega = \frac{1 \text{ V}}{1 \text{ A}}$$
</div>

Therefore:

<div class="equation">
$$\Omega \cdot \text{s} = \frac{\text{V}}{\text{A}} \cdot \text{s} = \frac{\text{V} \cdot \text{s}}{\text{A}}$$
</div>

This proves that $$\left(\text{V}\cdot \text{s}\right)\text{/A}=\Omega \cdot \text{s}$$.

**Discussion**

This unit equivalence makes physical sense. The henry (H), the unit of inductance, can be expressed as either $$\text{V} \cdot \text{s/A}$$ or $$\Omega \cdot \text{s}$$. The first form emphasizes how inductance relates voltage to the rate of current change, while the second form shows that inductance has dimensions of resistance times time, which is useful when analyzing RL circuits.

**Final Answer**

The derivation shows that $$\left(\text{V}\cdot \text{s}\right)\text{/A}=\Omega \cdot \text{s}$$, confirming that both are valid units for inductance (henries).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Camera flashes charge a capacitor to high voltage by switching the current through an inductor on and off rapidly. In what time must the 0.100 A current through a 2.00 mH inductor be switched on or off to induce a 500 V emf?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the self-inductance equation $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ and solve for $$\Delta t$$. We know the inductance, the current change, and the desired emf.

**Solution**

Given:
- $$L = 2.00 \text{ mH} = 2.00 \times 10^{-3} \text{ H}$$
- $$\Delta I = 0.100 \text{ A}$$
- $$\left|\text{emf}\right| = 500 \text{ V}$$

Rearranging the self-inductance equation:

<div class="equation">
$$\Delta t=\frac{L \Delta I}{\left|\text{emf}\right|}$$
</div>

Substituting the values:

<div class="equation">
$$\Delta t=\frac{(2.00 \times 10^{-3} \text{ H})(0.100 \text{ A})}{500 \text{ V}}=\frac{2.00 \times 10^{-4} \text{ V·s}}{500 \text{ V}}=4.00 \times 10^{-7} \text{ s}$$
</div>

<div class="equation">
$$\Delta t = 0.400 \text{ μs}$$
</div>

**Discussion**

The current must be switched extremely rapidly—in only 0.400 microseconds—to generate the 500 V needed to charge the camera flash capacitor. This requires very fast electronic switching, which is why camera flashes use specialized oscillator circuits rather than mechanical switches. The rapid switching creates the high voltage from a low-voltage battery, demonstrating the principle that rapid current changes in inductors produce large voltages.

**Final Answer**

0.400 μs (or $$4.00 \times 10^{-7}$$ s)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A large research solenoid has a self-inductance of 25.0 H. (a) What induced emf opposes shutting it off when 100 A of current through it is switched off in 80.0 ms? (b) How much energy is stored in the inductor at full current? (c) At what rate in watts must energy be dissipated to switch the current off in 80.0 ms? (d) In view of the answer to the last part, is it surprising that shutting it down this quickly is difficult?

</div>
<div class="solution" markdown="1">
(a) 31.3 kV

(b) 125 kJ

(c) 1.56 MW

(d) No, it is not surprising since this power is very high.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Calculate the self-inductance of a 50.0 cm long, 10.0 cm diameter solenoid having 1000 loops. (b) How much energy is stored in this inductor when 20.0 A of current flows through it? (c) How fast can it be turned off if the induced emf cannot exceed 3.00 V?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use the solenoid inductance formula $$L=\frac{\mu_0 N^2 A}{\ell}$$ to find the self-inductance.
(b) Use the energy formula $${E}_{\text{ind}}=\frac{1}{2}LI^2$$ with the inductance from part (a).
(c) Use $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ to find the minimum time required.

**Solution**

**(a)** Given:
- $$N = 1000$$ turns
- $$\ell = 50.0 \text{ cm} = 0.500 \text{ m}$$
- $$d = 10.0 \text{ cm}$$, so $$r = 5.00 \text{ cm} = 0.0500 \text{ m}$$
- $$A = \pi r^2 = \pi (0.0500 \text{ m})^2 = 7.85 \times 10^{-3} \text{ m}^2$$
- $$\mu_0 = 4\pi \times 10^{-7} \text{ T·m/A}$$

<div class="equation">
$$L=\frac{\mu_0 N^2 A}{\ell}=\frac{(4\pi \times 10^{-7} \text{ T·m/A})(1000)^2(7.85 \times 10^{-3} \text{ m}^2)}{0.500 \text{ m}}$$
</div>

<div class="equation">
$$L=\frac{(1.257 \times 10^{-6})(10^6)(7.85 \times 10^{-3})}{0.500}=\frac{9.87}{0.500}=19.7 \text{ mH}$$
</div>

**(b)** Using the energy formula with $$I = 20.0 \text{ A}$$:

<div class="equation">
$${E}_{\text{ind}}=\frac{1}{2}LI^2=\frac{1}{2}(19.7 \times 10^{-3} \text{ H})(20.0 \text{ A})^2$$
</div>

<div class="equation">
$${E}_{\text{ind}}=\frac{1}{2}(19.7 \times 10^{-3})(400)=3.94 \text{ J}$$
</div>

**(c)** Given that $$\left|\text{emf}\right| \leq 3.00 \text{ V}$$ and $$\Delta I = 20.0 \text{ A}$$:

<div class="equation">
$$\Delta t=\frac{L \Delta I}{\left|\text{emf}\right|}=\frac{(19.7 \times 10^{-3} \text{ H})(20.0 \text{ A})}{3.00 \text{ V}}=\frac{0.394}{3.00}=0.131 \text{ s}=131 \text{ ms}$$
</div>

**Discussion**

This solenoid has a relatively large inductance (nearly 20 mH) due to its many turns and reasonable cross-sectional area. The stored energy of nearly 4 J is significant and must be dissipated safely when the current is turned off. The minimum shutdown time of 131 ms ensures the induced emf stays below the 3.00 V limit, preventing damage to switching equipment or dangerous arcing.

**Final Answer**

(a) 19.7 mH

(b) 3.94 J

(c) 131 ms

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A precision laboratory resistor is made of a coil of wire 1.50 cm in diameter and 4.00 cm long, and it has 500 turns. (a) What is its self-inductance? (b) What average emf is induced if the 12.0 A current through it is turned on in 5.00 ms (one-fourth of a cycle for 50 Hz AC)? (c) What is its inductance if it is shortened to half its length and counter-wound (two layers of 250 turns in opposite directions)?

</div>
<div class="solution" markdown="1">
(a) 1.39 mH

(b) 3.33 V

(c) Zero

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The heating coils in a hair dryer are 0.800 cm in diameter, have a combined length of 1.00 m, and a total of 400 turns. (a) What is their total self-inductance assuming they act like a single solenoid? (b) How much energy is stored in them when 6.00 A flows? (c) What average emf opposes shutting them off if this is done in 5.00 ms (one-fourth of a cycle for 50 Hz AC)?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use the solenoid inductance formula $$L=\frac{\mu_0 N^2 A}{\ell}$$.
(b) Calculate the stored energy using $${E}_{\text{ind}}=\frac{1}{2}LI^2$$.
(c) Find the induced emf using $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$.

**Solution**

**(a)** Given:
- $$N = 400$$ turns
- $$\ell = 1.00 \text{ m}$$
- $$d = 0.800 \text{ cm} = 8.00 \times 10^{-3} \text{ m}$$, so $$r = 4.00 \times 10^{-3} \text{ m}$$
- $$A = \pi r^2 = \pi (4.00 \times 10^{-3} \text{ m})^2 = 5.03 \times 10^{-5} \text{ m}^2$$
- $$\mu_0 = 4\pi \times 10^{-7} \text{ T·m/A}$$

<div class="equation">
$$L=\frac{\mu_0 N^2 A}{\ell}=\frac{(4\pi \times 10^{-7} \text{ T·m/A})(400)^2(5.03 \times 10^{-5} \text{ m}^2)}{1.00 \text{ m}}$$
</div>

<div class="equation">
$$L=\frac{(1.257 \times 10^{-6})(1.60 \times 10^5)(5.03 \times 10^{-5})}{1.00}=1.01 \times 10^{-5} \text{ H}=10.1 \text{ μH}$$
</div>

**(b)** Using $$I = 6.00 \text{ A}$$:

<div class="equation">
$${E}_{\text{ind}}=\frac{1}{2}LI^2=\frac{1}{2}(1.01 \times 10^{-5} \text{ H})(6.00 \text{ A})^2$$
</div>

<div class="equation">
$${E}_{\text{ind}}=\frac{1}{2}(1.01 \times 10^{-5})(36.0)=1.82 \times 10^{-4} \text{ J}=0.182 \text{ mJ}$$
</div>

**(c)** Given $$\Delta I = 6.00 \text{ A}$$ and $$\Delta t = 5.00 \text{ ms} = 5.00 \times 10^{-3} \text{ s}$$:

<div class="equation">
$$\left|\text{emf}\right|=L\frac{\Delta I}{\Delta t}=(1.01 \times 10^{-5} \text{ H})\frac{6.00 \text{ A}}{5.00 \times 10^{-3} \text{ s}}$$
</div>

<div class="equation">
$$\left|\text{emf}\right|=(1.01 \times 10^{-5})(1200)=0.0121 \text{ V}=12.1 \text{ mV}$$
</div>

**Discussion**

The hair dryer coils have very small inductance (only about 10 μH) because they are designed primarily as resistive heating elements, not as inductors. The small diameter and relatively few turns result in minimal self-inductance. The tiny stored energy and small induced emf mean that switching the hair dryer on and off presents no safety concerns from inductive effects. This is intentional—heating elements should not exhibit significant inductive behavior.

**Final Answer**

(a) 10.1 μH

(b) 0.182 mJ

(c) 12.1 mV

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
When the 20.0 A current through an inductor is turned off in 1.50 ms, an 800 V emf is induced, opposing the change. What is the value of the self-inductance?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the self-inductance equation $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ and solve for $$L$$. We know the induced emf, the current change, and the time interval.

**Solution**

Given:
- $$\left|\text{emf}\right| = 800 \text{ V}$$
- $$\Delta I = 20.0 \text{ A}$$ (from 20.0 A to zero)
- $$\Delta t = 1.50 \text{ ms} = 1.50 \times 10^{-3} \text{ s}$$

Rearranging the self-inductance equation:

<div class="equation">
$$L=\frac{\left|\text{emf}\right| \times \Delta t}{\Delta I}$$
</div>

Substituting the values:

<div class="equation">
$$L=\frac{800 \text{ V} \times 1.50 \times 10^{-3} \text{ s}}{20.0 \text{ A}}=\frac{1.20 \text{ V·s}}{20.0 \text{ A}}=0.0600 \text{ H}=60.0 \text{ mH}$$
</div>

**Discussion**

This is a moderately large inductance. The 800 V induced emf is quite substantial, demonstrating why inductors can be dangerous when large currents are suddenly interrupted. This high voltage could easily cause arcing across switch contacts or damage to electronic components. Industrial equipment with such inductors typically includes protection circuits to safely dissipate the stored energy when the current is switched off.

**Final Answer**

60.0 mH

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
How fast can the 150 A current through a 0.250 H inductor be shut off if the induced emf cannot exceed 75.0 V?

</div>
<div class="solution" markdown="1">
**Strategy**

We use the self-inductance equation $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ and solve for $$\Delta t$$. The maximum allowed emf sets the minimum time to shut off the current.

**Solution**

Given:
- $$L = 0.250 \text{ H}$$
- $$\Delta I = 150 \text{ A}$$
- $$\left|\text{emf}\right|_{\text{max}} = 75.0 \text{ V}$$

Rearranging for $$\Delta t$$:

<div class="equation">
$$\Delta t=\frac{L \Delta I}{\left|\text{emf}\right|}$$
</div>

Substituting the values:

<div class="equation">
$$\Delta t=\frac{(0.250 \text{ H})(150 \text{ A})}{75.0 \text{ V}}=\frac{37.5 \text{ V·s}}{75.0 \text{ V}}=0.500 \text{ s}$$
</div>

**Discussion**

The current must be shut off over at least half a second to keep the induced emf at or below 75.0 V. This is a significant time constraint. Despite the relatively modest inductance of 0.250 H, the large current (150 A) means substantial energy is stored in the magnetic field ($$E = \frac{1}{2}LI^2 = \frac{1}{2}(0.250)(150)^2 = 2810 \text{ J}$$), and this energy must be dissipated slowly enough to prevent excessive voltage spikes. This illustrates why large industrial inductors require careful shutdown procedures.

**Final Answer**

0.500 s

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

A very large, superconducting solenoid such as one used in MRI scans, stores
1.00 MJ of energy in its magnetic field when 100 A flows. (a) Find its
self-inductance. (b) If the coils “go normal,” they gain resistance and start to
dissipate thermal energy. What temperature increase is produced if all the
stored energy goes into heating the 1000 kg magnet, given its average specific
heat is $$200 \text{J/kg·ºC} $$ ?

</div>
<div class="solution" markdown="1">
(a) 200 H

(b) $$5.00 \text{ºC} $$

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

A 25.0 H inductor has 100 A of current turned off in 1.00 ms. (a) What voltage
is induced to oppose this? (b) What is unreasonable about this result? (c) Which
assumption or premise is responsible?

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use the self-inductance equation $$\text{emf}=-L\frac{\Delta I}{\Delta t}$$ to calculate the induced voltage.
(b) Evaluate whether the calculated voltage is physically reasonable.
(c) Identify which parameter(s) are causing the unreasonable result.

**Solution**

**(a)** Given:
- $$L = 25.0 \text{ H}$$
- $$\Delta I = 100 \text{ A}$$
- $$\Delta t = 1.00 \text{ ms} = 1.00 \times 10^{-3} \text{ s}$$

<div class="equation">
$$\left|\text{emf}\right|=L\frac{\Delta I}{\Delta t}=(25.0 \text{ H})\frac{100 \text{ A}}{1.00 \times 10^{-3} \text{ s}}$$
</div>

<div class="equation">
$$\left|\text{emf}\right|=(25.0)(1.00 \times 10^5)=2.50 \times 10^6 \text{ V}=2.50 \text{ MV}$$
</div>

**(b)** This result is unreasonable because 2.50 million volts is an extremely high voltage that would cause massive electrical arcing through air (which breaks down at about 3 MV/m). Such a voltage would be extremely dangerous and impossible to contain with ordinary insulation. The energy stored in this inductor at 100 A is $$E = \frac{1}{2}(25.0)(100)^2 = 125 \text{ kJ}$$, and attempting to dissipate this in 1 ms would require a power of 125 MW, which is also unreasonable.

**(c)** The unreasonable assumption is the very short switching time of 1.00 ms. A 25.0 H inductor carrying 100 A cannot be switched off this quickly without generating destructive voltages. In practice, such large inductors require much longer shutdown times (on the order of seconds or even minutes) or specialized circuits to safely dissipate the stored energy. The combination of very large inductance (25.0 H) and very large current (100 A) also contributes to the problem.

**Discussion**

This problem illustrates why large research electromagnets and superconducting magnets require careful shutdown procedures. The stored magnetic energy is enormous, and attempting to release it too quickly generates voltages that would destroy equipment and pose severe safety hazards. Real systems use resistor banks, energy recovery systems, or gradual current reduction to safely shut down large inductors.

**Final Answer**

(a) 2.50 MV

(b) This voltage is unreasonably high—it would cause massive arcing and is impossible to contain safely.

(c) The 1.00 ms switching time is far too short for such a large inductor carrying such high current. The combination of large L, large I, and short Δt produces the unreasonable result.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

inductance
: a property of a device describing how efficient it is at inducing emf in
another device

mutual inductance
: how effective a pair of devices are at inducing emfs in each other

henry
: the unit of inductance; $$1 \text{H}=1 \Omega \cdot \text{s} $$

self-inductance
: how effective a device is at inducing emf in itself

inductor
: a device that exhibits significant self-inductance

energy stored in an inductor
: self-explanatory; calculated by $${E}\_{\text{ind}}=\frac{1}{2}{\text{LI}}^{2}

$$

</div>
$$
