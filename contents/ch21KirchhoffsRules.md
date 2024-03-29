---
title: Kirchhoff’s Rules
layout: page
sectionNumber: 3
chapterNumber: 21
---

<div class="abstract" markdown="1">
* Analyze a complex circuit using Kirchhoff’s rules, using the conventions for determining the correct signs of various terms.
</div>

Many complex circuits, such as the one in [[Figure 1]](#Figure1), cannot be
analyzed with the series-parallel techniques developed
in [Resistors in Series and Parallel](../contents/ch21ResistorsInSeriesAndInParallel)
and [Electromotive Force: Terminal Voltage](../contents/ch21ElectromotiveForce). There are,
however, two circuit analysis rules that can be used to analyze any circuit,
simple or complex. These rules are special cases of the laws of conservation of
charge and conservation of energy. The rules are known as **Kirchhoff’s rules**,
after their inventor Gustav Kirchhoff (1824–1887).

![A complicated circuit diagram shows multiple resistances and voltage sources wired in series and in parallel. The circuit has three arms. The first has a cell of e m f script E sub one and internal resistance r sub one in series with a resistor R sub two. The second has a cell of e m f script E sub two and internal resistance r sub two in series with resistor R sub three. The third arm has a resistor R sub one. The three arms are connected in parallel.](../resources/Figure_21_03_01.jpg "This circuit cannot be reduced to a combination of series and parallel connections. Kirchhoff&#x2019;s rules, special applications of the laws of conservation of charge and energy, can be used to analyze it. (Note: The script E in the figure represents electromotive force, emf.)")
{: #Figure1}

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Kirchhoff’s Rules
</div>
*  Kirchhoff’s first rule—the junction rule. The sum of all currents entering a junction must equal the sum of all currents leaving the junction.
*  Kirchhoff’s second rule—the loop rule. The algebraic sum of changes in potential around any closed circuit path (loop) must be zero.

</div>

Explanations of the two rules will now be given, followed by problem-solving
hints for applying Kirchhoff’s rules, and a worked example that uses them.

### Kirchhoff’s First Rule

Kirchhoff’s first rule (the **junction rule**) is an application of the
conservation of charge to a junction; it is illustrated
in [[Figure 2]](#Figure2). Current is the flow of charge, and charge is
conserved; thus, whatever charge flows into the junction must flow out.
Kirchhoff’s first rule requires that $${I}_{1}={I}_{2}+{I}_{3} $$
(see figure). Equations like this can and will be used to analyze circuits and
to solve circuit problems.

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Making Connections: Conservation Laws
</div>
Kirchhoff’s rules for circuit analysis are applications of **conservation laws** to circuits. The first rule is the application of conservation of charge, while the second rule is the application of conservation of energy. Conservation laws, even used in a specific application, such as circuit analysis, are so basic as to form the foundation of that application.

</div>

![This schematic drawing shows a T-junction, with one current I sub one flowing into the T and two currents I sub two and I sub three flowing out of the T junction.](../resources/Figure_21_03_02.jpg "The junction rule. The diagram shows an example of Kirchhoff&#x2019;s first rule where the sum of the currents into a junction equals the sum of the currents out of a junction. In this case, the current going into the junction splits and comes out as two currents, so that \( I_1=I_2+I_3 \). Here \( I_{1} \) must be 11 A, since \( I_{2} \) is 7 A and \( I_{3} \) is 4 A.")
{: #Figure2}

### Kirchhoff’s Second Rule

Kirchhoff’s second rule (the **loop rule**) is an application of conservation of
energy. The loop rule is stated in terms of potential, $$V $$ , rather than
potential energy, but the two are related since $${\text{PE}}_{\text{elec}}=qV
$$ . Recall that **emf**{: class="term"} is the potential difference of a source
when no current is flowing. In a closed loop, whatever energy is supplied by emf
must be transferred into other forms by devices in the loop, since there are no
other ways in which energy can be transferred into or out of the
circuit. [[Figure 3]](#Figure3) illustrates the changes in potential in a simple
series circuit loop.

Kirchhoff’s second rule requires $$\text{emf}-Ir-IR_{1}-IR_{2}=0 $$ .
Rearranged, this is $$\text{emf}=Ir+IR_{1}+IR_{2} $$ , which means the emf
equals the sum of the $$IR $$
(voltage) drops in the loop.

![Part a shows a schematic of a simple circuit that has a voltage source in series with two load resistors. The voltage source has an e m f, labeled script E, of eighteen volts. The voltage drops are one volt across the internal resistance and twelve volts and five volts across the two load resistances. Part b is a perspective drawing corresponding to the circuit in part a. The charge is raised in potential by the e m f and lowered by the resistances.](../resources/Figure_21_03_03.jpg "The loop rule. An example of Kirchhoff&#x2019;s second rule where the sum of the changes in potential around a closed loop must be zero. (a) In this standard schematic of a simple series circuit, the emf supplies 18 V, which is reduced to zero by the resistances, with 1 V across the internal resistance, and 12 V and 5 V across the two load resistances, for a total of 18 V. (b) This perspective view represents the potential as something like a roller coaster, where charge is raised in potential by the emf and lowered by the resistances. (Note that the script E stands for emf.)")
{: #Figure3}

### Applying Kirchhoff’s Rules

By applying Kirchhoff’s rules, we generate equations that allow us to find the
unknowns in circuits. The unknowns may be currents, emfs, or resistances. Each
time a rule is applied, an equation is produced. If there are as many
independent equations as unknowns, then the problem can be solved. There are two
decisions you must make when applying Kirchhoff’s rules. These decisions
determine the signs of various quantities in the equations you obtain from
applying the rules.

1. When applying Kirchhoff’s first rule, the junction rule, you must label the
   current in each branch and decide in what direction it is going. For example,
   in [[Figure 1]](#Figure1), [[Figure 2]](#Figure2), and [[Figure 3]](#Figure3)
   , currents are labeled $${I}_{1} $$ , $${I}_{2} $$ , $${I}_{3} $$ , and $$I
   $$ , and arrows indicate their directions. There is no risk here, for if you
   choose the wrong direction, the current will be of the correct magnitude but
   negative.
2. When applying Kirchhoff’s second rule, the loop rule, you must identify a
   closed loop and decide in which direction to go around it, clockwise or
   counterclockwise. For example, in [[Figure 3]](#Figure3) the loop was
   traversed in the same direction as the current (clockwise). Again, there is
   no risk; going around the circuit in the opposite direction reverses the sign
   of every term in the equation, which is like multiplying both sides of the
   equation by $$-1. $$

[[Figure 4]](#Figure4) and the following points will help you get the plus or
minus signs right when applying the loop rule. Note that the resistors and emfs
are traversed by going from a to b. In many circuits, it will be necessary to
construct more than one loop. In traversing each loop, one needs to be
consistent for the sign of the change in potential. (See [[Example 1]](#Example1)
.)

![This figure shows four situations where current flows through either a resistor or a source, and the calculation of the potential change across each. The first two diagrams show the potential drop across a resistor, with the current flowing from left to right or right to left. The other two diagrams show a potential drop across a voltage source, when the terminals are in one orientation and then another.](../resources/Figure_21_03_04.jpg "Each of these resistors and voltage sources is traversed from a to b. The potential changes are shown beneath each element and are explained in the text. (Note that the script E stands for emf.)")
{: #Figure4}

* When a resistor is traversed in the same direction as the current, the change
  in potential is $$-IR $$ .
  (See [[Figure 4]](#Figure4).)
* When a resistor is traversed in the direction opposite to the current, the
  change in potential is $$+IR $$ .
  (See [[Figure 4]](#Figure4).)
* When an emf is traversed from $$- $$ to + (the same direction it moves
  positive charge), the change in potential is +emf. (See [[Figure 4]](#Figure4)
  .)
* When an emf is traversed from + to $$- $$ (opposite to the direction it moves
  positive charge), the change in potential is $$- $$ emf. (
  See [[Figure 4]](#Figure4).)

<div id="Example1" class="example" markdown="1">
<div class="title">
Calculating Current: Using Kirchhoff’s Rules
</div>
Find the currents flowing in the circuit in [[Figure 5]](#Figure5).

![The diagram shows a complex circuit with two voltage sources E sub one and E sub two and several resistive loads, wired in two loops and two junctions. Several points on the diagram are marked with letters a through h. The current in each branch is labeled separately.](../resources/Figure_21_03_05.jpg "This circuit is similar to that in Figure 1, but the resistances and emfs are specified. (Each emf is denoted by script E.) The currents in each branch are labeled and assumed to move in the directions shown. This example uses Kirchhoff&#x2019;s rules to find the currents.")
{: #Figure5}

**Strategy**

This circuit is sufficiently complex that the currents cannot be found using
Ohm’s law and the series-parallel techniques—it is necessary to use Kirchhoff’s
rules. Currents have been labeled $${I}_{1} $$ , $${I}_{2} $$ , and $${I}_{3} $$
in the figure and assumptions have been made about their directions. Locations
on the diagram have been labeled with letters a through h. In the solution we
will apply the junction and loop rules, seeking three independent equations to
allow us to solve for the three unknown currents.

**Solution**

We begin by applying Kirchhoff’s first or junction rule at point a. This gives

<div class="equation" >
 $${I}_{1}={I}_{2}+{I}_{3}, $$
</div>
since  $${I}_{1} $$  flows into the junction, while  $${I}_{2} $$  and  $${I}_{3} $$
 flow out. Applying the junction rule at e produces exactly the same equation, so that no new information is obtained. This is a single equation with three unknowns—three independent equations are needed, and so the loop rule must be applied.

Now we consider the loop abcdea. Going from a to b, we traverse $${R}_{2} $$ in
the same (assumed) direction of the current $${I}_{2} $$ , and so the change in
potential is $$-{I}_{2}{R}_{2} $$ . Then going from b to c, we go from $$- $$ to
+, so that the change in potential is $$+{\text{emf}}_{1} $$ . Traversing the
internal resistance $${r}_{1} $$ from c to d gives $$-{I}_{2}{r}_{1} $$ .
Completing the loop by going from d to a again traverses a resistor in the same
direction as its current, giving a change in potential of $$-{I}_{1}{R}_{1} $$.

The loop rule states that the changes in potential sum to zero. Thus,

<div class="equation" >
 $$-{I}_{2}{R}_{2}+{\text{emf}}_{1}-{I}_{2}{r}_{1}-{I}_{1}{R}_{1}=-{I}_{2}\left({R}_{2}+{r}_{1}\right)+{\text{emf}}_{1}-{I}_{1}{R}_{1}=0. $$
</div>
Substituting values from the circuit diagram for the resistances and emf, and canceling the ampere unit gives

<div class="equation" >
 $$-{3I}_{2}+18-{6I}_{1}=0. $$
</div>
Now applying the loop rule to aefgha (we could have chosen abcdefgha as well) similarly gives

<div class="equation" >
 $$+ {I}_{1}{R}_{1}+{I}_{3}{R}_{3}+{I}_{3}{r}_{2}-{\text{emf}}_{2}= + {I}_{1}{R}_{1}+{I}_{3}\left({R}_{3}+{r}_{2}\right)-{\text{emf}}_{2}=0. $$
</div>
Note that the signs are reversed compared with the other loop, because elements are traversed in the opposite direction. With values entered, this becomes

<div class="equation" >
 $$+ {6I}_{1}+{2I}_{3}-45=0. $$
</div>
These three equations are sufficient to solve for the three unknown currents. First, solve the second equation for  $${I}_{2} $$
\:

<div class="equation" >
 $${I}_{2}=6-{2I}_{1}. $$
</div>
Now solve the third equation for  $${I}_{3} $$
\:

<div class="equation" >
 $${I}_{3}= 22.5-{3I}_{1}. $$
</div>
Substituting these two new equations into the first one allows us to find a value for  $${I}_{1} $$
\:

<div class="equation" >
 $${I}_{1}={I}_{2}+{I}_{3}=\left(6-{2I}_{1}\right)+\left( 22.5-{3I}_{1}\right)= 28.5-{5I}_{1}. $$
</div>
Combining terms gives

<div class="equation" >
 $${6I}_{1}= 28.5, and $$
</div>
<div class="equation" >
 $${I}_{1}=4.75 \text{A}. $$
</div>
Substituting this value for  $${I}_{1} $$  back into the fourth equation gives

<div class="equation" >
 $${I}_{2}=6-{2I}_{1}=6-9.50 $$
</div>
<div class="equation" >
 $${I}_{2}=-3.50 \text{A}. $$
</div>
The minus sign means  $${I}_{2} $$
 flows in the direction opposite to that assumed in [[Figure 5]](#Figure5).

Finally, substituting the value for $${I}_{1} $$ into the fifth equation gives

<div class="equation" >
 $${I}_{3}=22.5-{3I}_{1}=22.5- 14.25  $$
</div>
<div class="equation" >
 $${I}_{3}=8.25 \text{A}. $$
</div>
**Discussion**

Just as a check, we note that indeed $${I}_{1}={I}_{2}+{I}_{3} $$ . The results
could also have been checked by entering all of the values into the equation for
the abcdefgha loop.

</div>

<div class="note" data-has-label="true" data-label="" markdown="1">
<div class="title">
Problem-Solving Strategies for Kirchhoff’s Rules
</div>
1.   Make certain there is a clear circuit diagram on which you can label all known and unknown resistances, emfs, and currents. If a current is unknown, you must assign it a direction. This is necessary for determining the signs of potential changes. If you assign the direction incorrectly, the current will be found to have a negative value—no harm done.
2.   Apply the junction rule to any junction in the circuit. Each time the junction rule is applied, you should get an equation with a current that does not appear in a previous application—if not, then the equation is redundant.
3.   Apply the loop rule to as many loops as needed to solve for the unknowns in the problem. (There must be as many independent equations as unknowns.) To apply the loop rule, you must choose a direction to go around the loop. Then carefully and consistently determine the signs of the potential changes for each element using the four bulleted points discussed above in conjunction with [[Figure 4]](#Figure4).
4.   Solve the simultaneous equations for the unknowns. This may involve many algebraic steps, requiring careful checking and rechecking.
5.   Check to see whether the answers are reasonable and consistent. The numbers should be of the correct order of magnitude, neither exceedingly large nor vanishingly small. The signs should be reasonable—for example, no resistance should be negative. Check to see that the values obtained satisfy the various equations obtained from applying the rules. The currents should satisfy the junction rule, for example. 

</div>

The material in this section is correct in theory. We should be able to verify
it by making measurements of current and voltage. In fact, some of the devices
used to make such measurements are straightforward applications of the
principles covered so far and are explored in the next modules. As we shall see,
a very basic, even profound, fact results—making a measurement alters the
quantity being measured.

<div class="exercise" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Can Kirchhoff’s rules be applied to simple series and parallel circuits or are they restricted for use in more complicated circuits that are not combinations of series and parallel?

</div>
<div class="solution" data-print-placement="here" markdown="1">
Kirchhoff's rules can be applied to any circuit since they are applications to circuits of two conservation laws. Conservation laws are the most broadly applicable principles in physics. It is usually mathematically simpler to use the rules for series and parallel in simpler circuits so we emphasize Kirchhoff’s rules for use in more complicated situations. But the rules for series and parallel can be derived from Kirchhoff’s rules. Moreover, Kirchhoff’s rules can be expanded to devices other than resistors and emfs, such as capacitors, and are one of the basic analysis devices in circuit analysis.

</div>
</div>

### Section Summary

* Kirchhoff’s rules can be used to analyze any circuit, simple or complex.
* Kirchhoff’s first rule—the junction rule: The sum of all currents entering a
  junction must equal the sum of all currents leaving the junction.
* Kirchhoff’s second rule—the loop rule: The algebraic sum of changes in
  potential around any closed circuit path (loop) must be zero.
* The two rules are based, respectively, on the laws of conservation of charge
  and energy.
* When calculating potential and current using Kirchhoff’s rules, a set of
  conventions must be followed for determining the correct signs of various
  terms.
* The simpler series and parallel rules are special cases of Kirchhoff’s rules.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Can all of the currents going into the junction in [[Figure 6]](#Figure6) be positive? Explain.

</div>
</div>

![The diagram shows a T junction with currents I sub one, I sub two, and I sub three entering the T junction.](../resources/Figure_21_03_06.jpg " ")
{: #Figure6}

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Apply the junction rule to junction b in [[Figure 7]](#Figure7). Is any new information gained by applying the junction rule at e? (In the figure, each emf is represented by script E.)

</div>
</div>

![The diagram shows a complex circuit with four voltage sources: E sub one, E sub two, E sub three, E sub four and several resistive loads, wired in two loops and two junctions. Several points on the diagram are marked with letters a through g. The current in each branch is labeled separately.](../resources/Figure_21_03_07.jpg " ")
{: #Figure7}

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
(a) What is the potential difference going from point a to point b in [[Figure 7]](#Figure7)? (b) What is the potential difference going from c to b? (c) From e to g? (d) From e to d?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Apply the loop rule to loop afedcba in [[Figure 7]](#Figure7).

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Apply the loop rule to loops abgefa and cbgedc in [[Figure 7]](#Figure7).

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Apply the loop rule to loop abcdefgha in [[Figure 5]](#Figure5).

</div>
<div class="solution">
<div class="equation" >
 $$-{I}_{2}{R}_{2}+{\text{emf}}_{1}-I_{2}{r}_{1}+I_{3}{R}_{3}+I_{3}{r}_{2}-{\text{emf}}_{2}=0 $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Apply the loop rule to loop aedcba in [[Figure 5]](#Figure5).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify the second equation in [[Example 1]](#Example1) by substituting the values found for the currents  $${I}_{1} $$
 and  $${I}_{2} $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Verify the third equation in [[Example 1]](#Example1) by substituting the values found for the currents  $${I}_{1} $$
 and  $${I}_{3} $$.

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Apply the junction rule at point a in [[Figure 8]](#Figure8).

![The diagram shows a complex circuit with four voltage sources E sub one, E sub two, E sub three, E sub four and several resistive loads, wired in two loops and many junctions. Several points on the diagram are marked with letters a through j. The current in each branch is labeled separately.](../resources/Figure_21_03_08.jpg " ")
{: #Figure8}

</div>
<div class="solution">
<div class="equation" >
 $${I}_{3}=I_{1}+I_{2} $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Apply the loop rule to loop abcdefghija in [[Figure 8]](#Figure8).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Apply the loop rule to loop akledcba in [[Figure 8]](#Figure8).

</div>
<div class="solution">
<div class="equation" >
 $${\text{emf}}_{2}-I_{2}{r}_{2}-I_{2}{R}_{2}+I_{1}{R}_{5}+{I}_{1}{r}_{1}-{\text{emf}}_{1}+I_{1}{R}_{1}=0 $$
</div>
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the currents flowing in the circuit in [[Figure 8]](#Figure8). Explicitly show how you follow the steps in 
the [Problem-Solving Strategies for Series and Parallel Resistors](../contents/ch21ResistorsInSeriesAndInParallel#Note1).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Solve [[Example 1]](#Example1), but use loop abcdefgha instead of loop akledcba. Explicitly show how you follow the 
steps in the [Problem-Solving Strategies for Series and Parallel Resistors](../contents/ch21ResistorsInSeriesAndInParallel#Note1).

</div>
<div class="solution" markdown="1">
(a)  $$I_{1}=4.75 \text{A} $$
(b)  $$I_{2}=-3.5 \text{A} $$
(c)  $$I_{3}=8.25 \text{A} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Find the currents flowing in the circuit in [[Figure 7]](#Figure7).

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
**Unreasonable Results**

Consider the circuit in [[Figure 9]](#Figure9), and suppose that the emfs are
unknown and the currents are given to be $${I}_{1}=5.00 \text{A} $$ , $${I}_
{2}=3.0\text{ A} $$ , and $${I}_{3}= -2.00 \text{A} $$ .
(a) Could you find the emfs? (b) What is wrong with the assumptions?

![The diagram shows a complex circuit with two voltage sources E sub one and E sub two, and three resistive loads, wired in two loops and two junctions. Several points on the diagram are marked with letters a through h. The current in each branch is labeled separately.](../resources/Figure_21_03_09.jpg " ")
{: #Figure9}

</div>
<div class="solution" markdown="1">
(a) No, you would get inconsistent equations to solve.

(b)  $${I}_{1}\ne {I}_{2}+{I}_{3} $$ . The assumed currents violate the junction
rule.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

Kirchhoff’s rules
: a set of two rules, based on conservation of charge and energy, governing
current and changes in potential in an electric circuit

junction rule
: Kirchhoff’s first rule, which applies the conservation of charge to a
junction; current is the flow of charge; thus, whatever charge flows into the
junction must flow out; the rule can be stated $${I}_{1}={I}_{2}+{I}_{3} $$

loop rule
: Kirchhoff’s second rule, which states that in a closed loop, whatever energy
is supplied by emf must be transferred into other forms by devices in the loop,
since there are no other ways in which energy can be transferred into or out of
the circuit. Thus, the emf equals the sum of the $$IR $$
(voltage) drops in the loop and can be stated:
$$\text{emf}=Ir+IR_{1}+IR_{2} $$

conservation laws
: require that energy and charge be conserved in a system

</div>
