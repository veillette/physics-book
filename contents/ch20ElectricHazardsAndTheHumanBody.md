---
title: Electric Hazards and the Human Body
layout: page
sectionNumber: 6
chapterNumber: 20
---

<div class="abstract" markdown="1">
* Define thermal hazard, shock hazard, and short circuit.
* Explain what effects various levels of current have on the human body.
</div>

There are two known hazards of electricity—thermal and shock. A **thermal
hazard** is one where excessive electric power causes undesired thermal effects,
such as starting a fire in the wall of a house. A **shock hazard** occurs when
electric current passes through a person. Shocks range in severity from painful,
but otherwise harmless, to heart-stopping lethality. This section considers
these hazards and the various factors affecting them in a quantitative
manner. [Electrical Safety: Systems and Devices](../contents/ch23ElectricalSafetySystemsAndDevices)
will consider systems and devices for preventing electrical hazards.

### Thermal Hazards

Electric power causes undesired heating effects whenever electric energy is
converted to thermal energy at a rate faster than it can be safely dissipated. A
classic example of this is the **short circuit**, a low-resistance path between
terminals of a voltage source. An example of a short circuit is shown
in [[Figure 1]](#Figure1). Insulation on wires leading to an appliance has worn
through, allowing the two wires to come into contact. Such an undesired contact
with a high voltage is called a *short*. Since the resistance of the short, $$r
$$ , is very small, the power dissipated in the short, $$P={V}^{2}/r $$ , is
very large. For example, if $$V $$ is 120 V and $$r $$ is $$ 0.100 \Omega $$ ,
then the power is 144 kW, *much* greater than that used by a typical household
appliance. Thermal energy delivered at this rate will very quickly raise the
temperature of surrounding materials, melting or perhaps igniting them.

![Part a shows an electric toaster of resistance capital R connected to an A C voltage source. The wires used to connect the toaster to the supply are worn out in one place, allowing them to come into contact with an undesired, lower resistance path, symbolized by lowercase r. Part b of the figure represents the circuit diagram for the electric connection described in part a. The voltage source is connected to two paths in parallel: the toaster with resistance capital R, and the undesired lower resistance path, symbolized by lowercase r.](../resources/Figure_20_06_01.jpg "A short circuit is an undesired low-resistance path across a voltage source. (a) Worn insulation on the wires of a toaster allow them to come into contact with a low resistance \( r \) . Since \( P=V^2/r \), thermal power is created so rapidly that the cord melts or burns. (b) A schematic of the short circuit.")
{: #Figure1}

One particularly insidious aspect of a short circuit is that its resistance may
actually be decreased due to the increase in temperature. This can happen if the
short creates ionization. These charged atoms and molecules are free to move
and, thus, lower the resistance $$r $$ . Since $$P={V}^{2}/r $$ , the power
dissipated in the short rises, possibly causing more ionization, more power, and
so on. High voltages, such as the 480-V AC used in some industrial applications,
lend themselves to this hazard, because higher voltages create higher initial
power production in a short.

Another serious, but less dramatic, thermal hazard occurs when wires supplying
power to a user are overloaded with too great a current. As discussed in the
previous section, the power dissipated in the supply wires is $$P={I}^{2}{R}_
{\text{w}} $$ , where $${R}_{\text{w}} $$ is the resistance of the wires and $$I
$$ the current flowing through them. If either $$I $$ or $${R}_{\text{w}} $$ is
too large, the wires overheat. For example, a worn appliance cord (with some of
its braided wires broken) may have $${R}_{\text{w}}= 2.00 \Omega $$ rather than
the $$ 0.100 \Omega $$ it should be. If 10.0 A of current passes through the
cord, then $$P={I}^{2}{R}_{\text{w}}=200 \text{W} $$ is dissipated in the
cord—much more than is safe. Similarly, if a wire with a $$ 0.100 \text{-}
\Omega $$ resistance is meant to carry a few amps, but is instead carrying 100
A, it will severely overheat. The power dissipated in the wire will in that case
be $$P=1000 \text{W} $$ . Fuses and circuit breakers are used to limit excessive
currents. (See [[Figure 2]](#Figure2) and [[Figure 3]](#Figure3).) Each device
opens the circuit automatically when a sustained current exceeds safe limits.

![Part a of the figure shows an electric fuse with metal having low melting point enclosed in a case with wires leading to the circuit and voltage source. There is a viewing window in the fuse casing. Part b shows a circuit breaker. There is a movable metal strip at one end from which a connector to the circuit is attached at a fixed contact point. There is a compressed spring and switch gear attached adjacent to each other at the other end of the movable metal strip. The movable metallic strip has a bimetallic strip attached perpendicular to it at its center. At the opposite end of the bimetallic strip, there is a connector to the voltage source.](../resources/Figure_20_06_02.jpg "(a) A fuse has a metal strip with a low melting point that, when overheated by an excessive current, permanently breaks the connection of a circuit to a voltage source. (b) A circuit breaker is an automatic but restorable electric switch. The one shown here has a bimetallic strip that bends to the right and into the notch if overheated. The spring then forces the metal strip downward, breaking the electrical connection at the points.")
{: #Figure2}

![The diagram shows an electric circuit with an A C voltage source, a fuse or circuit breaker, and a resistance R all connected in series to form a closed circuit.](../resources/Figure_20_06_03.jpg "Schematic of a circuit with a fuse or circuit breaker in it. Fuses and circuit breakers act like automatic switches that open when sustained current exceeds desired limits.")
{: #Figure3}

Fuses and circuit breakers for typical household voltages and currents are
relatively simple to produce, but those for large voltages and currents
experience special problems. For example, when a circuit breaker tries to
interrupt the flow of high-voltage electricity, a spark can jump across its
points that ionizes the air in the gap and allows the current to continue
flowing. Large circuit breakers found in power-distribution systems employ
insulating gas and even use jets of gas to blow out such sparks. Here AC is
safer than DC, since AC current goes through zero 120 times per second, giving a
quick opportunity to extinguish these arcs.

### Shock Hazards

Electrical currents through people produce tremendously varied effects. An
electrical current can be used to block back pain. The possibility of using
electrical current to stimulate muscle action in paralyzed limbs, perhaps
allowing paraplegics to walk, is under study. TV dramatizations in which
electrical shocks are used to bring a heart attack victim out of ventricular
fibrillation (a massively irregular, often fatal, beating of the heart) are more
than common. Yet most electrical shock fatalities occur because a current put
the heart into fibrillation. A pacemaker uses electrical shocks to stimulate the
heart to beat properly. Some fatal shocks do not produce burns, but warts can be
safely burned off with electric current (though freezing using liquid nitrogen
is now more common). Of course, there are consistent explanations for these
disparate effects. The major factors upon which the effects of electrical shock
depend are

1. The amount of current $$I $$
2. The path taken by the current
3. The duration of the shock
4. The frequency $$f $$ of the current ( $$f=0 $$ for DC)

[[Table 1]](#Table1) gives the effects of electrical shocks as a function of
current for a typical accidental shock. The effects are for a shock that passes
through the trunk of the body, has a duration of 1 s, and is caused by 60-Hz
power.

![Part a of the diagram shows a person working on an electrically hot wire with a metal tool. The next step shows that he is a victim of electric shock and is thrown backward with his arms and legs stretched. The metal tool also falls off his hand. Part b of the diagram shows a person holding the electrically hot wire with his hands. The person is not thrown away. He cannot let go of the wire because the muscles that close the fingers are stronger than those that open them.](../resources/Figure_20_06_04.jpg "An electric current can cause muscular contractions with varying effects. (a) The victim is &#x201C;thrown&#x201D; backward by involuntary muscle contractions that extend the legs and torso. (b) The victim can&#x2019;t let go of the wire that is stimulating all the muscles in the hand. Those that close the fingers are stronger than those that open them.")
{: #Figure4}

<table id="Table1" aria-describedby="The table shows how different amounts of current produce different effects on the human body. The left column shows various magnitudes of current in milliamperes, and the right column shows its effects on body."><caption><span class="title">Effects of Electrical Shock as a Function of Current<sup class="footnote-number" id="footnote-ref1"><a class="footnote-link" href="#footnote1">1</a></sup></span></caption><thead><tr>
            <th>Current (mA)</th>
            <th>Effect</th>
          </tr></thead><tbody><tr>
            <td>1</td>
            <td>Threshold of sensation</td>
          </tr><tr>
            <td>5</td>
            <td>Maximum harmless current</td>
          </tr><tr>
            <td>10–20</td>
            <td>Onset of sustained muscular contraction; cannot let go for duration of shock; contraction of chest muscles may stop breathing during shock</td>
          </tr><tr>
            <td>50</td>
            <td>Onset of pain</td>
          </tr><tr>
            <td>100–300+</td>
            <td>Ventricular fibrillation possible; often fatal</td>
          </tr><tr>
            <td>300</td>
            <td>Onset of burns depending on concentration of current</td>
          </tr><tr>
            <td>6000 (6 A)</td>
            <td>Onset of sustained ventricular contraction and respiratory paralysis; both cease when shock ends; heartbeat may return to normal; used to defibrillate the heart</td>
          </tr></tbody></table>

Our bodies are relatively good conductors due to the water in our bodies. Given
that larger currents will flow through sections with lower resistance (to be
further discussed in the next chapter), electric currents preferentially flow
through paths in the human body that have a minimum resistance in a direct path
to earth. The earth is a natural electron sink. Wearing insulating shoes, a
requirement in many professions, prohibits a pathway for electrons by providing
a large resistance in that path. Whenever working with high-power tools (drills)
, or in risky situations, ensure that you do not provide a pathway for current
flow (especially through the heart).

Very small currents pass harmlessly and unfelt through the body. This happens to
you regularly without your knowledge. The threshold of sensation is only 1 mA
and, although unpleasant, shocks are apparently harmless for currents less than
5 mA. A great number of safety rules take the 5-mA value for the maximum allowed
shock. At 10 to 20 mA and above, the current can stimulate sustained muscular
contractions much as regular nerve impulses do. People sometimes say they were
knocked across the room by a shock, but what really happened was that certain
muscles contracted, propelling them in a manner not of their own choosing. (
See [[Figure 4]](#Figure4)(a).) More frightening, and potentially more
dangerous, is the “can’t let go” effect illustrated in [[Figure 4]](#Figure4)(b)
. The muscles that close the fingers are stronger than those that open them, so
the hand closes involuntarily on the wire shocking it. This can prolong the
shock indefinitely. It can also be a danger to a person trying to rescue the
victim, because the rescuer’s hand may close about the victim’s wrist. Usually
the best way to help the victim is to give the fist a hard knock/blow/jar with
an insulator or to throw an insulator at the fist. Modern electric fences, used
in animal enclosures, are now pulsed on and off to allow people who touch them
to get free, rendering them less lethal than in the past.

Greater currents may affect the heart. Its electrical patterns can be disrupted,
so that it beats irregularly and ineffectively in a condition called
“ventricular fibrillation.” This condition often lingers after the shock and is
fatal due to a lack of blood circulation. The threshold for ventricular
fibrillation is between 100 and 300 mA. At about 300 mA and above, the shock can
cause burns, depending on the concentration of current—the more concentrated,
the greater the likelihood of burns.

Very large currents cause the heart and diaphragm to contract for the duration
of the shock. Both the heart and breathing stop. Interestingly, both often
return to normal following the shock. The electrical patterns on the heart are
completely erased in a manner that the heart can start afresh with normal
beating, as opposed to the permanent disruption caused by smaller currents that
can put the heart into ventricular fibrillation. The latter is something like
scribbling on a blackboard, whereas the former completely erases it. TV
dramatizations of electric shock used to bring a heart attack victim out of
ventricular fibrillation also show large paddles. These are used to spread out
current passed through the victim to reduce the likelihood of burns.

Current is the major factor determining shock severity (given that other
conditions such as path, duration, and frequency are fixed, such as in the table
and preceding discussion). A larger voltage is more hazardous, but since $$I=V/R
$$ , the severity of the shock depends on the combination of voltage and
resistance. For example, a person with dry skin has a resistance of about $$200
\text{k}\Omega $$ . If he comes into contact with 120-V AC, a current $$I=\left(
120 \text{V}\right)/\left(200 \text{k}\Omega \right)= 0.6 \text{mA} $$ passes
harmlessly through him. The same person soaking wet may have a resistance of $$
10.0 \text{k}\Omega $$ and the same 120 V will produce a current of 12 mA—above
the “can’t let go” threshold and potentially dangerous.

Most of the body’s resistance is in its dry skin. When wet, salts go into ion
form, lowering the resistance significantly. The interior of the body has a much
lower resistance than dry skin because of all the ionic solutions and fluids it
contains. If skin resistance is bypassed, such as by an intravenous infusion, a
catheter, or exposed pacemaker leads, a person is rendered **microshock
sensitive**. In this condition, currents about 1/1000 those listed
in [[Table 1]](#Table1) produce similar effects. During open-heart surgery,
currents as small as $$20 \text{μA} $$ can be used to still the heart. Stringent
electrical safety requirements in hospitals, particularly in surgery and
intensive care, are related to the doubly disadvantaged microshock-sensitive
patient. The break in the skin has reduced his resistance, and so the same
voltage causes a greater current, and a much smaller current has a greater
effect.

![The graph of average values for the threshold of sensation and the Can&#x2019;t let go current as a function of frequency, with current in milliamperes verses frequency in hertz. The current is plotted along the vertical axis and frequency along the horizontal axis. The plot has two curves. The curve for Can&#x2019;t let go current starts off at a value nearly eighteen milliamps on the vertical axis. The curve is smooth and dips until frequency equals about one hundred hertz and then rises for values of frequency above one hundred hertz. The curve for Threshold of sensation current starts off at a value nearly four milliamps on the vertical axis. The curve is smooth and dips until frequency equals about one hundred hertz and then rises for values of frequency above one hundred hertz. The maximum value of current reached for this curve is nearly equal to the initial value for the Can&#x2019;t let go current curve. The Threshold of sensation curve lies below the curve for Can&#x2019;t let go current.](../resources/Figure_20_06_05.jpg "Graph of average values for the threshold of sensation and the &#x201C;can&#x2019;t let go&#x201D; current as a function of frequency. The lower the value, the more sensitive the body is at that frequency.")
{: #Figure5}

Factors other than current that affect the severity of a shock are its path,
duration, and AC frequency. Path has obvious consequences. For example, the
heart is unaffected by an electric shock through the brain, such as may be used
to treat manic depression. And it is a general truth that the longer the
duration of a shock, the greater its effects. [[Figure 5]](#Figure5) presents a
graph that illustrates the effects of frequency on a shock. The curves show the
minimum current for two different effects, as a function of frequency. The lower
the current needed, the more sensitive the body is at that frequency.
Ironically, the body is most sensitive to frequencies near the 50- or 60-Hz
frequencies in common use. The body is slightly less sensitive for DC ( $$f=0
$$ ), mildly confirming Edison’s claims that AC presents a greater hazard. At
higher and higher frequencies, the body becomes progressively less sensitive to
any effects that involve nerves. This is related to the maximum rates at which
nerves can fire or be stimulated. At very high frequencies, electrical current
travels only on the surface of a person. Thus a wart can be burned off with very
high frequency current without causing the heart to stop. (Do not try this at
home with 60-Hz AC!) Some of the spectacular demonstrations of electricity, in
which high-voltage arcs are passed through the air and over people’s bodies,
employ high frequencies and low currents. (See [[Figure 6]](#Figure6).)
Electrical safety devices and techniques are discussed in detail
in [Electrical Safety: Systems and Devices](../contents/ch23ElectricalSafetySystemsAndDevices)
.

![Photograph of an electric arc produced between two multi stranded wires close to each other but not in contact.](../resources/Figure_20_06_06.jpg "Is this electric arc dangerous? The answer depends on the AC frequency and the power involved. (credit: Khimich Alex, Wikimedia Commons)")
{: #Figure6}

### Section Summary

* The two types of electric hazards are thermal (excessive power) and shock (
  current through a person).
* Shock severity is determined by current, path, duration, and AC frequency.
* [[Table 1]](#Table1) lists shock hazards as a function of current.
* [[Figure 5]](#Figure5) graphs the threshold current for two hazards as a
  function of frequency.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Using an ohmmeter, a student measures the resistance between various points on his body. He finds that the resistance between two points on the same finger is about the same as the resistance between two points on opposite hands—both are several hundred thousand ohms. Furthermore, the resistance decreases when more skin is brought into contact with the probes of the ohmmeter. Finally, there is a dramatic drop in resistance (to a few thousand ohms) when the skin is wet. Explain these observations and their implications regarding skin and internal resistance of the human body.

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What are the two major hazards of electricity?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why isn’t a short circuit a shock hazard?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What determines the severity of a shock? Can you say that a certain voltage is hazardous without further information?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
An electrified needle is used to burn off warts, with the circuit being completed by having the patient sit on a large butt plate. Why is this plate large?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Some surgery is performed with high-voltage electricity passing from a metal scalpel through the tissue being cut. Considering the nature of electric fields at the surface of conductors, why would you expect most of the current to flow from the sharp edge of the scalpel? Do you think high- or low-frequency AC is used?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Some devices often used in bathrooms, such as hairdryers, often have safety messages saying “Do not use when the bathtub or basin is full of water.” Why is this so?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
We are often advised to not flick electric switches with wet hands, dry your hand first. We are also advised to never throw water on an electric fire. Why is this so?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Before working on a power transmission line, linemen will touch the line with the back of the hand as a final check that the voltage is zero. Why the back of the hand?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Why is the resistance of wet skin so much smaller than dry, and why do blood and other bodily fluids have low resistances?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Could a person on intravenous infusion (an IV) be microshock sensitive?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
In view of the small currents that cause shock hazards and the larger currents that circuit breakers and fuses interrupt, how do they play a role in preventing shock hazards?

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) How much power is dissipated in a short circuit of 240-V AC through a resistance of  $$ 0.250 \Omega  $$?
(b) What current flows?

</div>
<div class="solution" markdown="1">
(a) 230 kW

(b) 960 A

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What voltage is involved in a 1.44-kW short circuit through a  $$ 0.100 \text{-} \Omega  $$ resistance?

</div>
<div class="solution" markdown="1">
**Strategy**

Use the power equation $$P = V^{2}/R$$ and solve for voltage. This will give us the voltage that produces the specified power dissipation through the low-resistance short circuit.

**Solution**

Rearrange the power equation to solve for voltage:

<div class="equation">
$$V = \sqrt{PR} = \sqrt{(1.44 \times 10^{3} \text{ W})(0.100 \text{ Ω})}$$
</div>

<div class="equation">
$$V = \sqrt{144 \text{ V}^{2}} = 12.0 \text{ V}$$
</div>

**Discussion**

This result shows that even a relatively low voltage of 12.0 V can cause significant power dissipation (1.44 kW) when the resistance is very small. This is characteristic of short circuits—the low resistance allows high current flow ($$I = V/R = 12.0 \text{ V}/0.100 \text{ Ω} = 120 \text{ A}$$), which results in high power dissipation despite the modest voltage. This 12-V scenario is common in automotive electrical systems, where a short circuit in the low-resistance wiring can quickly heat wires to dangerous temperatures, potentially causing fires. This is why automotive fuses are critical safety devices.

The voltage involved in the short circuit is 12.0 V.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the current through a person and identify the likely effect on her if she touches a 120-V AC source: (a) if she is standing on a rubber mat and offers a total resistance of $$300 \text{k}\Omega  $$ ;  (b) if she is standing barefoot on wet grass and has a resistance of only  $$4500 \Omega  $$.

</div>
<div class="solution" markdown="1">
(a) 0.400 mA, no effect

(b) 26.7 mA, muscular contraction for duration of the shock (can't let go)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
While taking a bath, a person touches the metal case of a radio. The path through the person to the drainpipe and ground has a resistance of  $$4000 \Omega  $$. What is the smallest voltage on the case of the radio that could cause ventricular fibrillation?

</div>
<div class="solution" markdown="1">
**Strategy**

Use Ohm's law $$V = IR$$ with the threshold current for ventricular fibrillation. From Table 1, ventricular fibrillation can occur at currents as low as 100 mA. We use this minimum threshold to find the smallest dangerous voltage.

**Solution**

Apply Ohm's law with the minimum fibrillation current:

<div class="equation">
$$V = IR = (100 \times 10^{-3} \text{ A})(4000 \text{ Ω})$$
</div>

<div class="equation">
$$V = 400 \text{ V}$$
</div>

**Discussion**

A voltage of 400 V on the radio case could cause ventricular fibrillation. However, this analysis reveals an important safety consideration: standard household voltage (120 V in North America, 240 V in many other countries) would produce currents of $$I = 120 \text{ V}/4000 \text{ Ω} = 30 \text{ mA}$$ or $$I = 240 \text{ V}/4000 \text{ Ω} = 60 \text{ mA}$$. While these currents are below the fibrillation threshold, they are well above the "can't let go" threshold (10-20 mA) and the threshold for pain (50 mA). The person would experience sustained muscular contractions and might drown if unable to release the radio or exit the tub. This is why electrical devices should never be used near bathtubs, and modern bathrooms require ground-fault circuit interrupter (GFCI) outlets that trip at currents as low as 5 mA.

The smallest voltage that could cause ventricular fibrillation is 400 V.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Foolishly trying to fish a burning piece of bread from a toaster with a metal butter knife, a man comes into contact with 120-V AC. He does not even feel it since, luckily, he is wearing rubber-soled shoes. What is the minimum resistance of the path the current follows through the person?

</div>
<div class="solution" markdown="1">
 $$ 1.20 \times 10^{5}  \Omega  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) During surgery, a current as small as  $$20.0 \text{μA} $$
 applied directly to the heart may cause ventricular fibrillation. If the resistance of the exposed heart is  $$300 \Omega  $$ ,
 what is the smallest voltage that poses this danger? (b) Does your answer imply that special electrical safety precautions are needed?

</div>
<div class="solution" markdown="1">
**Strategy**

Use Ohm's law $$V = IR$$ to find the minimum voltage that would cause the dangerous microampere-level current through the exposed heart tissue.

**Solution**

**(a)** Apply Ohm's law:

<div class="equation">
$$V = IR = (20.0 \times 10^{-6} \text{ A})(300 \text{ Ω})$$
</div>

<div class="equation">
$$V = 6.00 \times 10^{-3} \text{ V} = 6.00 \text{ mV}$$
</div>

**(b)** Yes, special electrical safety precautions are absolutely essential during surgery. A voltage of only 6.00 mV can be lethal when applied directly to the heart. This is an extraordinarily small voltage—far below what can be felt through intact skin, and easily produced by:
- Stray electromagnetic fields from nearby equipment
- Ground loops between different pieces of equipment
- Static electricity buildup
- Small potential differences between grounded equipment

**Discussion**

This tiny threshold voltage (6.00 mV) is about 20,000 times smaller than household voltage and would be completely imperceptible under normal conditions. When the skin's protective resistance is bypassed during surgery, the patient becomes "microshock sensitive." This requires stringent safety measures including: equipotential grounding (all equipment at the same ground potential), isolated power systems, low-leakage equipment, and continuous monitoring. Operating rooms use special electrical systems that can detect leakage currents as small as a few microamperes and isolate faulty equipment before it poses a danger. All personnel must follow strict protocols about grounding and equipment handling.

(a) The smallest voltage that could cause ventricular fibrillation is 6.00 mV. (b) Yes, extremely stringent electrical safety precautions are essential during surgery.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the resistance of a 220-V AC short circuit that generates a peak power of 96.8 kW? 
(b) What would the average power be if the voltage was 120 V AC?

</div>
<div class="solution" markdown="1">
(a)  $$ 1.00 \Omega  $$
(b) 14.4 kW

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A heart defibrillator passes 10.0 A through a patient's torso for 5.00 ms in an attempt to restore normal beating. (a) How much charge passed? (b) What voltage was applied if 500 J of energy was dissipated? (c) What was the path's resistance? (d) Find the temperature increase caused in the 8.00 kg of affected tissue.

</div>
<div class="solution" markdown="1">
**Strategy**

(a) Use the definition of current $$I = \Delta Q/\Delta t$$ to find charge. (b) Use energy and charge to find voltage via $$E = QV$$. (c) Use Ohm's law $$R = V/I$$. (d) Use the heat equation $$Q = mc\Delta T$$ with the specific heat of body tissue (approximately that of water, $$c = 3500 \text{ J/kg·°C}$$).

**Solution**

**(a)** Find the charge passed:

<div class="equation">
$$\Delta Q = I \cdot \Delta t = (10.0 \text{ A})(5.00 \times 10^{-3} \text{ s}) = 0.0500 \text{ C} = 50.0 \text{ mC}$$
</div>

**(b)** Find the voltage using energy and charge:

<div class="equation">
$$E = QV \Rightarrow V = \frac{E}{Q} = \frac{500 \text{ J}}{0.0500 \text{ C}} = 10000 \text{ V} = 10.0 \text{ kV}$$
</div>

**(c)** Find the resistance using Ohm's law:

<div class="equation">
$$R = \frac{V}{I} = \frac{10000 \text{ V}}{10.0 \text{ A}} = 1000 \text{ Ω} = 1.00 \text{ kΩ}$$
</div>

**(d)** Find the temperature increase using $$E = mc\Delta T$$:

<div class="equation">
$$\Delta T = \frac{E}{mc} = \frac{500 \text{ J}}{(8.00 \text{ kg})(3500 \text{ J/kg·°C})} = \frac{500}{28000} \text{ °C} = 0.0179 \text{ °C}$$
</div>

**Discussion**

The defibrillator delivers a substantial charge (50.0 mC) at a very high voltage (10.0 kV), but only for a brief 5.00 ms pulse. The path resistance of 1.00 kΩ is reasonable for current passing through the chest (between external paddle electrodes through skin, muscle, and other tissue).

The temperature rise of only 0.018°C is negligible and explains why defibrillation doesn't cause burns despite the high voltage and current. This is because the energy is distributed over a large mass of tissue (8.00 kg) and the duration is extremely short. The large paddles used in defibrillation help spread the current over a wide area, reducing current density and preventing localized heating. The brief, high-current pulse is designed to simultaneously depolarize the entire heart muscle, allowing it to restart with a normal rhythm.

(a) 50.0 mC of charge passed through the patient. (b) A voltage of 10.0 kV was applied. (c) The path's resistance was 1.00 kΩ. (d) The temperature increase in the affected tissue was 0.018°C.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Integrated Concepts**

A short circuit in a 120-V appliance cord has a $$ 0.500\text{-}\Omega $$
resistance. Calculate the temperature rise of the 2.00 g of surrounding
materials, assuming their specific heat capacity is $$0.200 \text{cal/g}\cdot
\text{ºC} $$ and that it takes 0.0500 s for a circuit breaker to interrupt the
current. Is this likely to be damaging?

</div>
<div class="solution" markdown="1">
Temperature increases  $$860 \text{ºC} $$ .
 It is very likely to be damaging.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Construct Your Own Problem**

Consider a person working in an environment where electric currents might pass
through her body. Construct a problem in which you calculate the resistance of
insulation needed to protect the person from harm. Among the things to be
considered are the voltage to which the person might be exposed, likely body
resistance (dry, wet, …), and acceptable currents (safe but sensed, safe and
unfelt, …).

</div>
</div>

<div class="footnote-refs" markdown="1">
### Footnotes
{: class="footnote-refs-title"}

* {: class="footnote-ref" #footnote1} [1](#footnote-ref1){: class="
  footnote-ref-link"} <span class="footnote-ref-content">For an average male
  shocked through trunk of body for 1 s by 60-Hz AC. Values for females are
  60–80% of those listed.</span>
  { data-list-type="bulleted" data-bullet-style="none"}

</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

thermal hazard
: a hazard in which electric current causes undesired thermal effects

shock hazard
: when electric current passes through a person

short circuit
: also known as a “short,” a low-resistance path between terminals of a voltage
source

microshock sensitive
: a condition in which a person’s skin resistance is bypassed, possibly by a
medical procedure, rendering the person vulnerable to electrical shock at
currents about 1/1000 the normally required level

</div>
