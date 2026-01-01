---
title: Capacitors in Series and Parallel
layout: page
sectionNumber: 6
chapterNumber: 19
---

<div class="abstract" markdown="1">
* Derive expressions for total capacitance in series and in parallel.
* Identify series and parallel parts in the combination of connection of capacitors.
* Calculate the effective capacitance in series and parallel given individual capacitances.
</div>

Several capacitors may be connected together in a variety of applications.
Multiple connections of capacitors act like a single equivalent capacitor. The
total capacitance of this equivalent single capacitor depends both on the
individual capacitors and how they are connected. There are two simple and
common types of connections, called **series** and **parallel**, for which we
can easily calculate the total capacitance. Certain more complicated connections
can also be related to combinations of series and parallel.

### Capacitance in Series

[[Figure 1]](#Figure1)(a) shows a series connection of three capacitors with a
voltage applied. As for any capacitor, the capacitance of the combination is
related to charge and voltage by $$C=\frac{Q}{V} $$.

Note in [[Figure 1]](#Figure1) that opposite charges of magnitude $$Q $$ flow to
either side of the originally uncharged combination of capacitors when the
voltage $$V $$ is applied. Conservation of charge requires that equal-magnitude
charges be created on the plates of the individual capacitors, since charge is
only being separated in these originally neutral devices. The end result is that
the combination resembles a single capacitor with an effective plate separation
greater than that of the individual capacitors alone. (
See [[Figure 1]](#Figure1)(b).) Larger plate separation means smaller
capacitance. It is a general feature of series connections of capacitors that
the total capacitance is less than any of the individual capacitances.

![When capacitors are connected in series, an equivalent capacitor would have a plate separation that is greater than that of any individual capacitor. Hence the series connections produce a resultant capacitance less than that of the individual capacitors.](../resources/Figure_19_06_01.jpg '(a) Capacitors connected in series. The magnitude of the charge on each plate is ( Q ) . (b) An equivalent capacitor has a larger plate separation ( d ) . Series connections produce a total capacitance that is less than that of any of the individual capacitors.')
{: #Figure1}

We can find an expression for the total capacitance by considering the voltage
across the individual capacitors shown in [[Figure 1]](#Figure1). Solving
$$C=\frac{Q}{V} $$ for $$V $$ gives $$V=\frac{Q}{C} $$ . The voltages across the
individual capacitors are thus $${V}_{1}=\frac{Q}{ {C}_{1}} $$ , $${V}_ {2}=\frac{Q}{ {C}_{2}} $$ , and $${V}_{3}=\frac{Q}{ {C}_{3}} $$ . The total
voltage is the sum of the individual voltages:

<div class="equation" >
 $$V={V}_{1}+{V}_{2}+{V}_{3}. $$
</div>

Now, calling the total capacitance $${C}_{\text{S}} $$ for series capacitance,
consider that

<div class="equation" >
 $$V=\frac{Q}{ {C}_{\text{S}}}={V}_{1}+{V}_{2}+{V}_{3}. $$
</div>

Entering the expressions for $${V}_{1} $$ , $${V}_{2} $$ , and $${V}_{3} $$ , we
get

<div class="equation" >
 $$\frac{Q}{ {C}_{\text{S}}}=\frac{Q}{ {C}_{1}}+\frac{Q}{ {C}_{2}}+\frac{Q}{ {C}_{3}}. $$
</div>

Canceling the $$Q $$ s, we obtain the equation for the total capacitance in
series $${C}_{\text{S}} $$ to be

<div class="equation" >
 $$\frac{1}{ {C}_{\text{S}}}=\frac{1}{ {C}_{1}}+\frac{1}{ {C}_{2}}+\frac{1}{ {C}_{3}}+\text{...}, $$
</div>

where “...” indicates that the expression is valid for any number of capacitors
connected in series. An expression of this form always results in a total
capacitance $${C}_{\text{S}} $$ that is less than any of the individual
capacitances $${C}_{1} $$ , $${C}_{2} $$ , ..., as the next example illustrates.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Total Capacitance in Series,
 $${C}_{\text{s}} $$
</div>
Total capacitance in series:  $$\frac{1}{ {C}_{\text{S}}}=\frac{1}{ {C}_{1}}+\frac{1}{ {C}_{2}}+\frac{1}{ {C}_{3}}+\text{...} $$

</div>

<div class="example" markdown="1">
<div class="title">
What Is the Series Capacitance?
</div>
Find the total capacitance for three capacitors connected in series, given their individual capacitances are 1.000, 5.000, and 8.000  $$\text{µF} $$.

**Strategy**

With the given information, the total capacitance can be found using the
equation for capacitance in series.

**Solution**

Entering the given capacitances into the expression for $$\frac{1}{ {C}_ {\text{S}}} $$ gives $$\frac{1}{ {C}_{S}}=\frac{1}{ {C}_{1}}+\frac{1}{ {C}_ {2}}+\frac{1}{ {C}_{3}} $$. <div class="equation" > $$\frac{1}{ {C}_{\text{S}}}=\frac{1}{1.000 \text{µF}}+\frac{1}{5.000 \text{µF}}+\frac{1}{8.000 \text{µF}}=\frac{ 1.325}{\text{µF}} $$
</div>
Inverting to find  $${C}_{\text{S}} $$  yields 
 $${C}_{\text{S}}=\frac{\text{µF}}{ 1.325}=0.755 \text{µF} $$.

**Discussion**

The total series capacitance $${C}_{\text{s}} $$ is less than the smallest
individual capacitance, as promised. In series connections of capacitors, the
sum is less than the parts. In fact, it is less than any individual. Note that
it is sometimes possible, and more convenient, to solve an equation like the
above by finding the least common denominator, which in this case (showing only
whole-number calculations) is 40. Thus,

<div class="equation" >
 $$\frac{1}{ {C}_{\text{S}}}=\frac{40}{40 \text{µF}}+\frac{8}{40 \text{µF}}+\frac{5}{40 \text{µF}}=\frac{53}{40 \text{µF}}, $$
</div>
so that

<div class="equation" >
 $${C}_{\text{S}}=\frac{40 \text{µF}}{53}=0.755 \text{µF}. $$
</div>
</div>

### Capacitors in Parallel

[[Figure 2]](#Figure2)(a) shows a parallel connection of three capacitors with a
voltage applied. Here the total capacitance is easier to find than in the series
case. To find the equivalent total capacitance $${C}_{\text{p}} $$ , we first
note that the voltage across each capacitor is $$V $$ , the same as that of the
source, since they are connected directly to it through a conductor. (Conductors
are equipotentials, and so the voltage across the capacitors is the same as that
across the voltage source.) Thus the capacitors have the same charges on them as
they would have if connected individually to the voltage source. The total
charge $$Q $$ is the sum of the individual charges:

<div class="equation" >
 $$Q={Q}_{1}+{Q}_{2}+{Q}_{3}. $$
</div>

![Part a of the figure shows three capacitors connected in parallel to each other and to the applied voltage. The total capacitance when they are connected in parallel is simply the sum of the individual capacitances. Part b of the figure shows the larger equivalent plate area of the capacitors connected in parallel, which in turn can hold more charge than the individual capacitors.](../resources/Figure_19_06_02.jpg '(a) Capacitors in parallel. Each is connected directly to the voltage source just as if it were all alone, and so the total capacitance in parallel is just the sum of the individual capacitances. (b) The equivalent capacitor has a larger plate area and can therefore hold more charge than the individual capacitors. ')
{: #Figure2}

Using the relationship $$Q=CV $$ , we see that the total charge is $$Q={C}_ {\text{p}}V $$ , and the individual charges are $${Q}_{1}={C}_{1}V $$ <em>, </em> $${Q}_{2}={C}_{2}V $$
_,_ and $${Q}_{3}={C}_{3}V $$ . Entering these into the previous equation gives

<div class="equation" >
 $${C}_{\text{p}}V={C}_{1}V+{C}_{2}V+{C}_{3}V. $$
</div>

Canceling $$V $$ from the equation, we obtain the equation for the total
capacitance in parallel $${C}_{\text{p}} $$ \:

<div class="equation" >
 $${C}_{p}={C}_{1}+{C}_{2}+{C}_{3}+\text{...}. $$
</div>

Total capacitance in parallel is simply the sum of the individual
capacitances. (Again the “_..._” indicates the expression is valid for any
number of capacitors connected in parallel.) So, for example, if the capacitors
in the example above were connected in parallel, their capacitance would be

<div class="equation" >
 $${C}_{\text{p}}=1.000 \text{µF}+5.000 \text{µF}+8.000 \text{µF}= 14.000 µF. $$
</div>

The equivalent capacitor for a parallel connection has an effectively larger
plate area and, thus, a larger capacitance, as illustrated
in [[Figure 2]](#Figure2)(b).

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Total Capacitance in Parallel,
 $${C}_{\text{p}} $$
</div>
Total capacitance in parallel  $${C}_{\text{p}}={C}_{1}+{C}_{2}+{C}_{3}+\text{...} $$
</div>

More complicated connections of capacitors can sometimes be combinations of
series and parallel. (See [[Figure 3]](#Figure3).) To find the total capacitance
of such combinations, we identify series and parallel parts, compute their
capacitances, and then find the total.

![The first figure has two capacitors, C sub1 and C sub2 in series and the third capacitor C sub 3 is parallel to C sub 1 and C sub 2. The second figure shows C sub S, the equivalent capacitance of C sub 1 and C sub 2, in parallel to C sub 3. The third figure represents the total capacitance of C sub S and C sub 3.](../resources/Figure_19_06_03.jpg '(a) This circuit contains both series and parallel connections of capacitors. See Worked out Example for the calculation of the overall capacitance of the circuit. (b) ( C_1 ) and ( C_2 ) are in series; their equivalent capacitance ( C_S ) is less than either of them. (c) Note that ( C_S ) is in parallel with ( C_3 ) . The total capacitance is, thus, the sum of ( C_S ) and ( C_3 ) .')
{: #Figure3}

<div class="example" markdown="1">
<div class="title">
A Mixture of Series and Parallel Capacitance
</div>
Find the total capacitance of the combination of capacitors shown in [[Figure 3]](#Figure3). Assume the capacitances in [[Figure 3]](#Figure3) are known to three decimal places (  $${C}_{1}=1.000 µF $$ ,
  $${C}_{2}=5.000 µF $$ ,
 and  $${C}_{3}=8.000 µF $$ ), 
and round your answer to three decimal places.

**Strategy**

To find the total capacitance, we first identify which capacitors are in series
and which are in parallel. Capacitors $${C}_{1} $$ and $${C}_{2} $$ are in
series. Their combination, labeled $${C}_{\text{S}} $$ in the figure, is in
parallel with $${C}_{3} $$.

**Solution**

Since $${C}_{1} $$ and $${C}_{2} $$ are in series, their total capacitance is
given by $$\frac{1}{ {C}_{\text{S}}}=\frac{1}{ {C}_{1}}+\frac{1}{ {C}_ {2}}+\frac{1}{ {C}_{3}} $$ . Entering their values into the equation gives

<div class="equation" >
 $$\frac{1}{ {C}_{\text{S}}}=\frac{1}{ {C}_{1}}+\frac{1}{ {C}_{2}}=\frac{1}{ 1.000 \text{μF}}+\frac{1}{ 5.000 \text{μF}}=\frac{ 1.200}{\text{μF}}. $$
</div>
Inverting gives

<div class="equation" >
 $${C}_{\text{S}}=0.833 \text{µF}. $$
</div>
This equivalent series capacitance is in parallel with the third capacitor; thus, the total is the sum

<div class="equation" >
 $$\begin{array}{lll}{C}_{\text{tot}}& =& {C}_{\text{S}}+{C}_{\text{S}}\\ {C}_{\text{tot}}& =& 0.833 \text{μF}+ 8.000 \text{μF}\\ {C}_{\text{tot}}& =& 8.833 \text{μF}.\end{array} $$ 
</div>
**Discussion**

This technique of analyzing the combinations of capacitors piece by piece until
a total is obtained can be applied to larger combinations of capacitors.

</div>

### Section Summary

- Total capacitance in series $$\frac{1}{ {C}_{\text{S}}}=\frac{1}{ {C}_ {1}}+\frac{1}{ {C}_{2}}+\frac{1}{ {C}_{3}}+\text{...} $$

- Total capacitance in parallel $${C}_{\text{p}}={C}_{1}+{C}_{2}+{C}_ {3}+\text{...} $$
- If a circuit contains a combination of capacitors in series and parallel,
  identify series and parallel parts, compute their capacitances, and then find
  the total.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
If you wish to store a large amount of energy in a capacitor bank, would you connect capacitors in series or parallel? Explain.

</div>
</div>

### Problems &amp; Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the total capacitance of the combination of capacitors in [[Figure 4]](#Figure4).

![A circuit is shown with three capacitors. Two capacitors, of ten microfarad and two point five microfarad capacitance, are in parallel to each other, and their combination is in series with a zero point three zero microfarad capacitor.](../resources/Figure_19_06_04.jpg 'A combination of series and parallel connections of capacitors.')
{: #Figure4}

</div>
<div class="solution" markdown="1">
**Strategy**

This circuit has a combination of series and parallel connections. First, identify the capacitors in parallel (10 μF and 2.5 μF), find their equivalent capacitance, then combine this result with the 0.30 μF capacitor in series.

**Solution**

Step 1: Find the equivalent capacitance of the parallel combination:

$$C_{\text{p}} = C_1 + C_2 = 10 \text{ μF} + 2.5 \text{ μF} = 12.5 \text{ μF}$$

Step 2: This parallel combination is in series with the 0.30 μF capacitor. Use the series formula:

$$\frac{1}{C_{\text{total}}} = \frac{1}{C_{\text{p}}} + \frac{1}{C_3}$$

$$\frac{1}{C_{\text{total}}} = \frac{1}{12.5 \text{ μF}} + \frac{1}{0.30 \text{ μF}}$$

$$\frac{1}{C_{\text{total}}} = 0.080 \text{ μF}^{-1} + 3.33 \text{ μF}^{-1} = 3.41 \text{ μF}^{-1}$$

$$C_{\text{total}} = \frac{1}{3.41 \text{ μF}^{-1}} = 0.293 \text{ μF}$$

**Discussion**

The total capacitance is dominated by the smallest capacitor in the series portion of the circuit (0.30 μF). Even though the parallel combination has 12.5 μF, the series connection with 0.30 μF reduces the total to less than 0.30 μF. This illustrates how a single small capacitor in series can dramatically reduce the overall capacitance.

**Final Answer**

The total capacitance of the combination is **0.293 μF**.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose you want a capacitor bank with a total capacitance of 0.750 F and you possess numerous 1.50 mF capacitors. What is the smallest number you could hook together to achieve your goal, and how would you connect them?

</div>
<div class="solution" markdown="1">
**Strategy**

To achieve a larger total capacitance from smaller individual capacitors, we must connect them in parallel (series connections would reduce the total capacitance). We need to find how many 1.50 mF capacitors connected in parallel will yield 0.750 F.

**Solution**

For capacitors in parallel:

$$C_{\text{total}} = C_1 + C_2 + C_3 + ... = nC$$

where $$n$$ is the number of identical capacitors each with capacitance $$C$$.

Solving for $$n$$:

$$n = \frac{C_{\text{total}}}{C} = \frac{0.750 \text{ F}}{1.50 \times 10^{-3} \text{ F}}$$

$$n = \frac{0.750}{0.00150} = 500$$

**Discussion**

500 capacitors is a large number, which illustrates why achieving farad-level capacitances is challenging with conventional capacitors. Modern supercapacitors (or ultracapacitors) can achieve farad-level capacitances in a single device by using extremely thin separations and large effective surface areas through porous materials. The parallel connection is essential here—connecting 1.50 mF capacitors in series would give a total capacitance of $$1.50 \text{ mF}/n$$, which becomes smaller as more capacitors are added.

**Final Answer**

The smallest number needed is **500 capacitors**, and they must all be connected **in parallel**.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What total capacitances can you make by connecting a  $$5.00 \text{µF} $$
 and an  $$8.00 \text{µF} $$
 capacitor together?

</div>
<div class="solution" markdown="1">
**Strategy**

With two capacitors, there are two possible simple connections: series and parallel. Each produces a different total capacitance. For series, use $$\frac{1}{C_S} = \frac{1}{C_1} + \frac{1}{C_2}$$; for parallel, use $$C_P = C_1 + C_2$$.

**Solution**

**Series connection:**

$$\frac{1}{C_{\text{S}}} = \frac{1}{C_1} + \frac{1}{C_2} = \frac{1}{5.00 \text{ μF}} + \frac{1}{8.00 \text{ μF}}$$

$$\frac{1}{C_{\text{S}}} = 0.200 \text{ μF}^{-1} + 0.125 \text{ μF}^{-1} = 0.325 \text{ μF}^{-1}$$

$$C_{\text{S}} = \frac{1}{0.325 \text{ μF}^{-1}} = 3.08 \text{ μF}$$

**Parallel connection:**

$$C_{\text{P}} = C_1 + C_2 = 5.00 \text{ μF} + 8.00 \text{ μF} = 13.0 \text{ μF}$$

**Discussion**

The series capacitance (3.08 μF) is less than either individual capacitor, while the parallel capacitance (13.0 μF) is the sum. This demonstrates the general rule: series connections always produce a smaller total capacitance, while parallel connections produce a larger one. Note the ratio: the parallel value is more than 4 times the series value. With more capacitors of different values, more combinations become possible.

**Final Answer**

The two possible total capacitances are **3.08 μF** (series) and **13.0 μF** (parallel).
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the total capacitance of the combination of capacitors shown in [[Figure 5]](#Figure5).

![The circuit includes three capacitors. A zero point three zero microfarad capacitor and a ten microfarad capacitor are connected in series, and together they are connected in parallel with a two point five microfarad capacitor.](../resources/Figure_19_06_05.jpg 'A combination of series and parallel connections of capacitors.')
{: #Figure5}

</div>
<div class="solution" markdown="1">
**Strategy**

First identify the circuit structure: the 0.30 μF and 10 μF capacitors are in series, and their combination is in parallel with the 2.5 μF capacitor. We'll find the series equivalent first, then add it to the parallel capacitor.

**Solution**

Step 1: Find the equivalent capacitance of the series combination (0.30 μF and 10 μF):

$$\frac{1}{C_{\text{S}}} = \frac{1}{C_1} + \frac{1}{C_2} = \frac{1}{0.30 \text{ μF}} + \frac{1}{10 \text{ μF}}$$

$$\frac{1}{C_{\text{S}}} = 3.33 \text{ μF}^{-1} + 0.10 \text{ μF}^{-1} = 3.43 \text{ μF}^{-1}$$

$$C_{\text{S}} = \frac{1}{3.43 \text{ μF}^{-1}} = 0.291 \text{ μF}$$

Step 2: This series combination is in parallel with the 2.5 μF capacitor:

$$C_{\text{total}} = C_{\text{S}} + C_3 = 0.291 \text{ μF} + 2.5 \text{ μF} = 2.79 \text{ μF}$$

**Discussion**

Comparing this to Problem 1, the same three capacitors are connected differently. In Problem 1, the parallel pair was in series with 0.30 μF, giving 0.293 μF. Here, the series pair is in parallel with 2.5 μF, giving 2.79 μF—nearly 10 times larger! This illustrates how the connection topology dramatically affects the total capacitance. The 2.5 μF capacitor dominates here because the series combination contributes only 0.29 μF.

**Final Answer**

The total capacitance of the combination is **2.79 μF**.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the total capacitance of the combination of capacitors shown in [[Figure 6]](#Figure6).

![The figure shows a circuit that is a combination of series and parallel connections of capacitors. On the left of the circuit is a five point zero microfarad capacitor in series with a three point five microfarad capacitor. In the middle is an eight point zero microfarad capacitor. On the right, a zero point seven five microfarad capacitor is in parallel with a fifteen microfarad capacitor, and together they are in series with a one point five microfarad capacitor. Altogether, the system of capacitors on the left, the capacitor in the middle, and the system of capacitors on the right are connected in parallel.](../resources/Figure_19_06_06.jpg 'A combination of series and parallel connections of capacitors.')
{: #Figure6}

</div>
<div class="solution" markdown="1">
**Strategy**

This complex circuit has three branches in parallel. We need to find the equivalent capacitance of each branch, then add them together:
- Left branch: 5.0 μF and 3.5 μF in series
- Middle branch: 8.0 μF alone
- Right branch: (0.75 μF parallel with 15 μF) in series with 1.5 μF

**Solution**

**Left Branch** (5.0 μF and 3.5 μF in series):

$$\frac{1}{C_{\text{left}}} = \frac{1}{5.0 \text{ μF}} + \frac{1}{3.5 \text{ μF}} = 0.200 + 0.286 = 0.486 \text{ μF}^{-1}$$

$$C_{\text{left}} = 2.06 \text{ μF}$$

**Middle Branch**:

$$C_{\text{middle}} = 8.0 \text{ μF}$$

**Right Branch** (first find parallel combination, then series with 1.5 μF):

Parallel combination of 0.75 μF and 15 μF:
$$C_{\text{p}} = 0.75 \text{ μF} + 15 \text{ μF} = 15.75 \text{ μF}$$

This is in series with 1.5 μF:
$$\frac{1}{C_{\text{right}}} = \frac{1}{15.75 \text{ μF}} + \frac{1}{1.5 \text{ μF}} = 0.0635 + 0.667 = 0.730 \text{ μF}^{-1}$$

$$C_{\text{right}} = 1.37 \text{ μF}$$

**Total capacitance** (all three branches in parallel):

$$C_{\text{total}} = C_{\text{left}} + C_{\text{middle}} + C_{\text{right}}$$

$$C_{\text{total}} = 2.06 \text{ μF} + 8.0 \text{ μF} + 1.37 \text{ μF} = 11.4 \text{ μF}$$

**Discussion**

The middle branch dominates the total capacitance because it contains the largest single capacitor (8.0 μF) with no series reduction. The right branch, despite containing a 15 μF capacitor, only contributes 1.37 μF because the series connection with 1.5 μF drastically reduces its effective capacitance. This problem demonstrates systematic reduction of complex networks by working from the innermost combinations outward.

**Final Answer**

The total capacitance of the combination is **11.4 μF**.
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

(a) An $$8.00 \text{µF} $$ capacitor is connected in parallel to another
capacitor, producing a total capacitance of $$5.00 \text{µF} $$ . What is the
capacitance of the second capacitor? (b) What is unreasonable about this
result? (c) Which assumptions are unreasonable or inconsistent?

</div>
<div class="solution"  markdown="1">
**Strategy**

This is a critical thinking problem. We'll use the parallel capacitance formula to solve for the unknown capacitor, then examine whether the result makes physical sense.

**Solution**

**(a)** For capacitors in parallel:

$$C_{\text{total}} = C_1 + C_2$$

Solving for $$C_2$$:

$$C_2 = C_{\text{total}} - C_1 = 5.00 \text{ μF} - 8.00 \text{ μF} = -3.00 \text{ μF}$$

**(b)** A negative capacitance is physically impossible. Capacitance is defined as $$C = Q/V$$, and since charge and voltage have the same sign relationship (positive charge at higher potential), capacitance must always be positive. There is no physical device that stores negative charge per volt.

**(c)** The assumption that the capacitors are connected in parallel is inconsistent with the given data. For a parallel connection, the total capacitance must always be *greater* than any individual capacitance:

$$C_{\text{parallel}} = C_1 + C_2 > C_1 \text{ (always, since } C_2 > 0\text{)}$$

Since 5.00 μF < 8.00 μF, a parallel connection is impossible. The capacitors must be connected in *series*. Let's verify:

$$\frac{1}{C_{\text{S}}} = \frac{1}{8.00 \text{ μF}} + \frac{1}{C_2}$$

$$\frac{1}{C_2} = \frac{1}{5.00 \text{ μF}} - \frac{1}{8.00 \text{ μF}} = 0.200 - 0.125 = 0.075 \text{ μF}^{-1}$$

$$C_2 = 13.3 \text{ μF}$$

This is a reasonable, positive capacitance.

**Discussion**

This problem illustrates an important check: parallel combinations always increase total capacitance, while series combinations always decrease it. If you calculate a negative capacitance or resistance, it's a strong indicator that your assumptions about the circuit topology are wrong.

**Final Answer**

(a) Using the parallel assumption, $$C_2 = -3.00 \text{ μF}$$.

(b) Negative capacitance is physically impossible—capacitance must always be positive.

(c) The assumption that the capacitors are connected in parallel is incorrect. A parallel connection always produces a total capacitance greater than any individual capacitor. Since 5.00 μF < 8.00 μF, the connection must be in series, not parallel.
</div>
</div>
