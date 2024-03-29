---
title: 'Statistical Interpretation of Entropy and the Second Law of Thermodynamics: The Underlying Explanation'
layout: page
sectionNumber: 7
chapterNumber: 15
---

<div class="abstract" markdown="1">
* Identify probabilities in entropy.
* Analyze statistical probabilities in entropic systems.
</div>

![Photograph of many coins laid down on a surface, some with heads shown up and some with tails shown up.](../resources/Figure_15_07_01.jpg "When you toss a coin a large number of times, heads and tails tend to come up in roughly equal numbers. Why doesn&#x2019;t heads come up 100, 90, or even 80% of the time? (credit: Jon Sullivan, PDPhoto.org)")
{: #Figure1}

The various ways of formulating the second law of thermodynamics tell what
happens rather than why it happens. Why should heat transfer occur only from hot
to cold? Why should energy become ever less available to do work? Why should the
universe become increasingly disorderly? The answer is that it is a matter of
overwhelming probability. Disorder is simply vastly more likely than order.

When you watch an emerging rainstorm begin to wet the ground, you will notice
that the drops fall in a disorganized manner both in time and in space. Some
fall close together, some far apart, but they never fall in straight, orderly
rows. It is not impossible for rain to fall in an orderly pattern, just highly
unlikely, because there are many more disorderly ways than orderly ones. To
illustrate this fact, we will examine some random processes, starting with coin
tosses.

### Coin Tosses

What are the possible outcomes of tossing 5 coins? Each coin can land either
heads or tails. On the large scale, we are concerned only with the total heads
and tails and not with the order in which heads and tails appear. The following
possibilities exist:

<div class="equation">
 $$\begin{array}{}5 \text{heads, 0 tails}\\ 4 \text{heads, 1 tail}\\ 3 \text{heads, 2 tails}\\ 2 \text{heads, 3 tails}\\ 1 \text{head, 4 tails}\\ 0 \text{head, 5 tails}\end{array} $$
</div>

These are what we call macrostates. A **macrostate** is an overall property of a
system. It does not specify the details of the system, such as the order in
which heads and tails occur or which coins are heads or tails.

Using this nomenclature, a system of 5 coins has the 6 possible macrostates just
listed. Some macrostates are more likely to occur than others. For instance,
there is only one way to get 5 heads, but there are several ways to get 3 heads
and 2 tails, making the latter macrostate more probable. [[Table 1]](#Table1)
lists of all the ways in which 5 coins can be tossed, taking into account the
order in which heads and tails occur. Each sequence is called a **microstate**—a
detailed description of every element of a system.

<table id="Table1" aria-describedby="A table with combinations of five coins tossed together five times is shown. The first column shows different toss results. The second column represents individual microstates, and the third column represents the number of microstates."><caption><span class="title">5-Coin Toss</span></caption><thead><tr>
            <th></th>
            <th>Individual microstates</th>
            <th>Number of microstates</th>
          </tr></thead><tbody><tr>
            <td>5 heads, 0 tails</td>
            <td>HHHHH</td>
            <td data-align="center">1</td>
          </tr><tr>
            <td>4 heads, 1 tail</td>
            <td>HHHHT, HHHTH, HHTHH, HTHHH, THHHH</td>
            <td data-align="center">5</td>
          </tr><tr>
            <td>3 heads, 2 tails</td>
            <td>HTHTH, THTHH, HTHHT, THHTH, THHHT HTHTH, THTHH, HTHHT, THHTH, THHHT</td>
            <td data-align="center">10</td>
          </tr><tr>
            <td>2 heads, 3 tails</td>
            <td>TTTHH, TTHHT, THHTT, HHTTT, TTHTH, THTHT, HTHTT, THTTH, HTTHT, HTTTH</td>
            <td data-align="center">10</td>
          </tr><tr>
            <td>1 head, 4 tails</td>
            <td>TTTTH, TTTHT, TTHTT, THTTT, HTTTT</td>
            <td data-align="center">5</td>
          </tr><tr>
            <td>0 heads, 5 tails</td>
            <td>TTTTT</td>
            <td data-align="center">1</td>
          </tr><tr>
            <td></td>
            <td></td>
            <td data-align="center">Total: 32</td>
          </tr></tbody></table>

The macrostate of 3 heads and 2 tails can be achieved in 10 ways and is thus 10
times more probable than the one having 5 heads. Not surprisingly, it is equally
probable to have the reverse, 2 heads and 3 tails. Similarly, it is equally
probable to get 5 tails as it is to get 5 heads. Note that all of these
conclusions are based on the crucial assumption that each microstate is equally
probable. With coin tosses, this requires that the coins not be asymmetric in a
way that favors one side over the other, as with loaded dice. With any system,
the assumption that all microstates are equally probable must be valid, or the
analysis will be erroneous.

The two most orderly possibilities are 5 heads or 5 tails. (They are more
structured than the others.) They are also the least likely, only 2 out of 32
possibilities. The most disorderly possibilities are 3 heads and 2 tails and its
reverse. (They are the least structured.) The most disorderly possibilities are
also the most likely, with 20 out of 32 possibilities for the 3 heads and 2
tails and its reverse. If we start with an orderly array like 5 heads and toss
the coins, it is very likely that we will get a less orderly array as a result,
since 30 out of the 32 possibilities are less orderly. So even if you start with
an orderly state, there is a strong tendency to go from order to disorder, from
low entropy to high entropy. The reverse can happen, but it is unlikely.

<table id="Table2" aria-describedby="A table is shown for hundred coin toss with three columns. The first two columns are for the microstate heads and tails and the third column is for number of microstates W."><caption><span class="title">100-Coin Toss</span></caption><thead><tr>
            <th colspan="2">Macrostate</th>
            <th>Number of microstates</th>
          </tr></thead><tbody><tr>
            <td data-align="center">Heads</td>
            <td data-align="center">Tails</td>
            <td data-align="center">(<em>W</em>)</td>
          </tr><tr>
            <td data-align="center">100</td>
            <td data-align="center">0</td>
            <td data-align="center">1</td>
          </tr><tr>
            <td data-align="center">99</td>
            <td data-align="center">1</td>
            <td data-align="center">
               $$ 1.0 \times 10^{2}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">95</td>
            <td data-align="center">5</td>
            <td data-align="center">
               $$ 7.5 \times 10^{7}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">90</td>
            <td data-align="center">10</td>
            <td data-align="center">
               $$ 1.7 \times 10^{13}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">75</td>
            <td data-align="center">25</td>
            <td data-align="center">
               $$ 2.4 \times 10^{23}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">60</td>
            <td data-align="center">40</td>
            <td data-align="center">
               $$ 1.4 \times 10^{28}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">55</td>
            <td data-align="center">45</td>
            <td data-align="center">
               $$ 6.1 \times 10^{28}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">51</td>
            <td data-align="center">49</td>
            <td data-align="center">
               $$ 9.9 \times 10^{28}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">50</td>
            <td data-align="center">50</td>
            <td data-align="center">
               $$ 1.0 \times 10^{29}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">49</td>
            <td data-align="center">51</td>
            <td data-align="center">
               $$ 9.9 \times 10^{28}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">45</td>
            <td data-align="center">55</td>
            <td data-align="center">
               $$ 6.1 \times 10^{28}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">40</td>
            <td data-align="center">60</td>
            <td data-align="center">
               $$ 1.4 \times 10^{28}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">25</td>
            <td data-align="center">75</td>
            <td data-align="center">
               $$ 2.4 \times 10^{23}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">10</td>
            <td data-align="center">90</td>
            <td data-align="center">
               $$ 1.7 \times 10^{13}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">5</td>
            <td data-align="center">95</td>
            <td data-align="center">
               $$ 7.5 \times 10^{7}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">1</td>
            <td data-align="center">99</td>
            <td data-align="center">
               $$ 1.0 \times 10^{2}  $$ 
            </td>
          </tr><tr>
            <td data-align="center">0</td>
            <td data-align="center">100</td>
            <td data-align="center">1</td>
          </tr><tr>
            <td></td>
            <td></td>
            <td></td>
          </tr><tr>
            <td></td>
            <td></td>
            <td data-align="center">Total:  $$ 1.27 \times 10^{30}  $$</td>
          </tr></tbody></table>

This result becomes dramatic for larger systems. Consider what happens if you
have 100 coins instead of just 5. The most orderly arrangements (most
structured) are 100 heads or 100 tails. The least orderly (least structured) is
that of 50 heads and 50 tails. There is only 1 way (1 microstate) to get the
most orderly arrangement of 100 heads. There are 100 ways (100 microstates) to
get the next most orderly arrangement of 99 heads and 1 tail (also 100 to get
its reverse). And there are $$ 1.0 \times 10^{29} $$ ways to get 50 heads and 50
tails, the least orderly arrangement. [[Table 2]](#Table2) is an abbreviated
list of the various macrostates and the number of microstates for each
macrostate. The total number of microstates—the total number of different ways
100 coins can be tossed—is an impressively large $$ 1.27 \times 10^{30} $$ .
Now, if we start with an orderly macrostate like 100 heads and toss the coins,
there is a virtual certainty that we will get a less orderly macrostate. If we
keep tossing the coins, it is possible, but exceedingly unlikely, that we will
ever get back to the most orderly macrostate. If you tossed the coins once each
second, you could expect to get either 100 heads or 100 tails once in $$2 \times
10^{22} $$ years! This period is 1 trillion ( $$ 10^{12} $$ )
times longer than the age of the universe, and so the chances are essentially
zero. In contrast, there is an 8% chance of getting 50 heads, a 73% chance of
getting from 45 to 55 heads, and a 96% chance of getting from 40 to 60 heads.
Disorder is highly likely.

### Disorder in a Gas

The fantastic growth in the odds favoring disorder that we see in going from 5
to 100 coins continues as the number of entities in the system increases. Let us
now imagine applying this approach to perhaps a small sample of gas. Because
counting microstates and macrostates involves statistics, this is called **statistical analysis**. The macrostates of a gas correspond to its macroscopic
properties, such as volume, temperature, and pressure; and its microstates
correspond to the detailed description of the positions and velocities of its
atoms. Even a small amount of gas has a huge number of atoms:  $$
1.0{\text{cm}}^{3} $$ of an ideal gas at 1.0 atm and $$0º C $$ has $$ 2.7 \times
10^{19} $$ atoms. So each macrostate has an immense number of microstates. In
plain language, this means that there are an immense number of ways in which the
atoms in a gas can be arranged, while still having the same pressure,
temperature, and so on.

The most likely conditions (or macrostates) for a gas are those we see all the
time—a random distribution of atoms in space with a Maxwell-Boltzmann
distribution of speeds in random directions, as predicted by kinetic theory.
This is the most disorderly and least structured condition we can imagine. In
contrast, one type of very orderly and structured macrostate has all of the
atoms in one corner of a container with identical velocities. There are very few
ways to accomplish this (very few microstates corresponding to it), and so it is
exceedingly unlikely ever to occur. (See [[Figure 2]](#Figure2)(b).) Indeed, it
is so unlikely that we have a law saying that it is impossible, which has never
been observed to be violated—the second law of thermodynamics.

![Two states of a container of gas are shown. In state a, the gas molecules, depicted as small green spheres, are randomly distributed in the container, with random velocities (an arrow is attached to each sphere, and the arrows vary in length and direction). This state is labeled likely. In state b, the molecules are clustered in the lower left-hand corner of the container and the arrows are much shorter. This state is labeled highly unlikely.](../resources/Figure_15_07_02.jpg "(a) The ordinary state of gas in a container is a disorderly, random distribution of atoms or molecules with a Maxwell-Boltzmann distribution of speeds. It is so unlikely that these atoms or molecules would ever end up in one corner of the container that it might as well be impossible. (b) With energy transfer, the gas can be forced into one corner and its entropy greatly reduced. But left alone, it will spontaneously increase its entropy and return to the normal conditions, because they are immensely more likely.")
{: #Figure2}

The disordered condition is one of high entropy, and the ordered one has low
entropy. With a transfer of energy from another system, we could force all of
the atoms into one corner and have a local decrease in entropy, but at the cost
of an overall increase in entropy of the universe. If the atoms start out in one
corner, they will quickly disperse and become uniformly distributed and will
never return to the orderly original state ([[Figure 2]](#Figure2)(b)). Entropy
will increase. With such a large sample of atoms, it is possible—but
unimaginably unlikely—for entropy to decrease. Disorder is vastly more likely
than order.

The arguments that disorder and high entropy are the most probable states are
quite convincing. The great Austrian physicist Ludwig Boltzmann (1844–1906)—who,
along with Maxwell, made so many contributions to kinetic theory—proved that the
entropy of a system in a given state (a macrostate) can be written as

<div class="equation" >
 $$S=k_{B} \ln W\text{,} $$
</div>

where $$k_{B}= 1.38 \times 10^{-23} \text{J/K} $$ is Boltzmann’s constant, and
$$\ln W $$ is the natural logarithm of the number of microstates $$W $$
corresponding to the given macrostate. $$W $$ is proportional to the probability
that the macrostate will occur. Thus entropy is directly related to the
probability of a state—the more likely the state, the greater its entropy.
Boltzmann proved that this expression for $$S $$ is equivalent to the definition
$$\Delta S=Q/T $$ , which we have used extensively.

Thus the second law of thermodynamics is explained on a very basic level:
entropy either remains the same or increases in every process. This phenomenon
is due to the extraordinarily small probability of a decrease, based on the
extraordinarily larger number of microstates in systems with greater entropy.
Entropy *can* decrease, but for any macroscopic system, this outcome is so
unlikely that it will never be observed.

<div class="example" markdown="1">
<div class="title">
Entropy Increases in a Coin Toss
</div>
Suppose you toss 100 coins starting with 60 heads and 40 tails, and you get the most likely result, 50 heads and 50 tails. What is the change in entropy?

**Strategy**

Noting that the number of microstates is labeled $$W $$ in [[Table 2]](#Table2)
for the 100-coin toss, we can use $$\Delta S={S}_{\text{f}}-{S}_{\text{i}}=k_
{B}\ln {W}_{\text{f}}-k_{B}\ln {W}_{\text{i}} $$ to calculate the change in
entropy.

**Solution**

The change in entropy is

<div class="equation" >
 $$\Delta S={S}_{\text{f}}-{S}_{\text{i}}=k_{B}\ln {W}_{\text{f}}-k_{B}\ln {W}_{\text{i},} $$
</div>
where the subscript i stands for the initial 60 heads and 40 tails state, and the subscript f for the final 50 heads and 50 tails state. Substituting the values for  $$W $$
 from [[Table 2]](#Table2) gives

<div class="equation" >
 $$\begin{array}{lll}\Delta S& =& \left( 1.38 \times 10^{-23} \text{J/K}\right)\left[ \ln \left( 1.0 \times 10^{29} \right)-\ln \left( 1.4 \times 10^{28} \right)\right]  \\ & =& 2.7 \times 10^{-23} \text{J/K}\end{array} $$
</div>
**Discussion**

This increase in entropy means we have moved to a less orderly situation. It is
not impossible for further tosses to produce the initial state of 60 heads and
40 tails, but it is less likely. There is about a 1 in 90 chance for that
decrease in entropy ( $$ - 2.7 \times 10^{-23} \text{J/K} $$ )
to occur. If we calculate the decrease in entropy to move to the most orderly
state, we get $$\Delta S= -92 \times 10^{-23} \text{J/K} $$ . There is about a
$$1 $$ in $$10^{30} $$ chance of this change occurring. So while very small
decreases in entropy are unlikely, slightly greater decreases are impossibly
unlikely. These probabilities imply, again, that for a macroscopic system, a
decrease in entropy is impossible. For example, for heat transfer to occur
spontaneously from 1.00 kg of $$0\text{ºC} $$ ice to its $$0\text{ºC} $$
environment, there would be a decrease in entropy of $$ 1.22 \times 10^{3}
\text{J/K} $$ . Given that a $$\Delta S $$ of $$10^{-21} \text{J/K} $$
corresponds to about a $$1 $$ in $$10^{30} $$ chance, a decrease of this size (
$$10^{3} \text{J/K} $$ )
is an *utter* impossibility. Even for a milligram of melted ice to spontaneously
refreeze is impossible.

</div>

<div class="note" id="Note1" data-has-label="true" data-label="" markdown="1">
<div class="title">
Problem-Solving Strategies for Entropy
</div>
1.   *Examine the situation to determine if entropy is involved.*
2.   *Identify the system of interest and draw a labeled diagram of the system showing energy flow.*
3.   *Identify exactly what needs to be determined in the problem (identify the unknowns).* A written list is useful.
4.   *Make a list of what is given or can be inferred from the problem as stated (identify the knowns).* You must carefully identify the heat transfer, if any, and the temperature at which the process takes place. It is also important to identify the initial and final states.
5.   *Solve the appropriate equation for the quantity to be determined (the unknown).* Note that the change in entropy can be determined between any states by calculating it for a reversible process.
6.   *Substitute the known value along with their units into the appropriate equation, and obtain numerical solutions complete with units.*
7.   *To see if it is reasonable: Does it make sense?* For example, total entropy should increase for any real process or be constant for a reversible process. Disordered states should be more probable and have greater entropy than ordered states. 

</div>

### Section Summary

* Disorder is far more likely than order, which can be seen statistically.
* The entropy of a system in a given state (a macrostate) can be written as
  <div class="equation" >
   $$S=k_{B} \ln W, $$
  </div>
     where
   $$k_{B} =1.38 \times 10^{-23} \text{J/K} $$ is Boltzmann’s constant, and
   $$\ln W $$ is the natural logarithm of the number of microstates
   $$W $$ corresponding to the given macrostate.

### Conceptual Questions

<div class="exercise" >
<div class="problem"  markdown="1">
Explain why a building made of bricks has smaller entropy than the same bricks in a disorganized pile. Do this by considering the number of ways that each could be formed (the number of microstates in each macrostate).

</div>
</div>

### Problem Exercises

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Using [[Table 2]](#Table2), verify the contention that if you toss 100 coins each second, you can expect to get 100 heads or 100 tails once in  $$2 \times 10^{22} $$
 years; calculate the time to two-digit accuracy.

</div>
<div class="solution" markdown="1">
It should happen twice in every  $$ 1.27 \times 10^{30}  \text{s} $$
 or once in every  $$ 6.35 \times 10^{29}  \text{s} $$
  $$\begin{array}{ll}\left( 6.35 \times 10^{29}  \text{s}\right)\left(\frac{1 \text{h}}{3600 \text{s}}\right)& \left(\frac{1 \text{d}}{24 \text{h}}\right)\left(\frac{1 \text{y}}{365.25 \text{d}}\right)\\ =&  2.0 \times 10^{22}  \text{y}\end{array} $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What percent of the time will you get something in the range from 60 heads and 40 tails through 40 heads and 60 tails when tossing 100 coins? The total number of microstates in that range is  $$ 1.22 \times 10^{30}  $$ .
 (Consult [[Table 2]](#Table2).)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) If tossing 100 coins, how many ways (microstates) are there to get the three most likely macrostates of 49 heads and 51 tails, 50 heads and 50 tails, and 51 heads and 49 tails? (b) What percent of the total possibilities is this? (Consult [[Table 2]](#Table2).)

</div>
<div class="solution" markdown="1">
(a)  $$ 3.0 \times 10^{29}  $$
(b) 24%

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the change in entropy if you start with 100 coins in the 45 heads and 55 tails macrostate, toss them, and get 51 heads and 49 tails? (b) What if you get 75 heads and 25 tails? (c) How much more likely is 51 heads and 49 tails than 75 heads and 25 tails? (d) Does either outcome violate the second law of thermodynamics?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) What is the change in entropy if you start with 10 coins in the 5 heads and 5 tails macrostate, toss them, and get 2 heads and 8 tails? (b) How much more likely is 5 heads and 5 tails than 2 heads and 8 tails? (Take the ratio of the number of microstates to find out.) (c) If you were betting on 2 heads and 8 tails would you accept odds of 252 to 45? Explain why or why not.

</div>
<div class="solution" markdown="1">
(a)  $$ -2.38 \times 10^{-23} \text{J/K} $$
(b) 5.6 times more likely

(c) If you were betting on two heads and 8 tails, the odds of breaking even are
252 to 45, so on average you would break even. So, no, you wouldn’t bet on odds
of 252 to 45.

</div>
</div>

<table id="Table3" aria-describedby="10-COIN TOSS"><caption><span class="title">10-Coin Toss</span></caption><thead><tr>
            <th colspan="2">Macrostate</th>
            <th>Number of Microstates (<em>W</em>)</th>
          </tr></thead><tbody><tr>
            <td>Heads</td>
            <td>Tails</td>
            <td></td>
          </tr><tr>
            <td>10</td>
            <td>0</td>
            <td>1</td>
          </tr><tr>
            <td>9</td>
            <td>1</td>
            <td>10</td>
          </tr><tr>
            <td>8</td>
            <td>2</td>
            <td>45</td>
          </tr><tr>
            <td>7</td>
            <td>3</td>
            <td>120</td>
          </tr><tr>
            <td>6</td>
            <td>4</td>
            <td>210</td>
          </tr><tr>
            <td>5</td>
            <td>5</td>
            <td>252</td>
          </tr><tr>
            <td>4</td>
            <td>6</td>
            <td>210</td>
          </tr><tr>
            <td>3</td>
            <td>7</td>
            <td>120</td>
          </tr><tr>
            <td>2</td>
            <td>8</td>
            <td>45</td>
          </tr><tr>
            <td>1</td>
            <td>9</td>
            <td>10</td>
          </tr><tr>
            <td>0</td>
            <td>10</td>
            <td>1</td>
          </tr><tr>
            <td></td>
            <td></td>
            <td>Total: 1024</td>
          </tr></tbody></table>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) If you toss 10 coins, what percent of the time will you get the three most likely macrostates (6 heads and 4 tails, 5 heads and 5 tails, 4 heads and 6 tails)? (b) You can realistically toss 10 coins and count the number of heads and tails about twice a minute. At that rate, how long will it take on average to get either 10 heads and 0 tails or 0 heads and 10 tails?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Construct a table showing the macrostates and all of the individual microstates for tossing 6 coins. (Use [[Table 3]](#Table3) as a guide.) (b) How many macrostates are there? (c) What is the total number of microstates? (d) What percent chance is there of tossing 5 heads and 1 tail? (e) How much more likely are you to toss 3 heads and 3 tails than 5 heads and 1 tail? (Take the ratio of the number of microstates to find out.)

</div>
<div class="solution" markdown="1">
(b) 7

(c) 64

(d) 9.38%

(e) 3.33 times more likely (20 to 6)

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
In an air conditioner, 12.65 MJ of heat transfer occurs from a cold environment in 1.00 h. (a) What mass of ice melting would involve the same heat transfer? (b) How many hours of operation would be equivalent to melting 900 kg of ice? (c) If ice costs 20 cents per kg, do you think the air conditioner could be operated more cheaply than by simply using ice? Describe in detail how you evaluate the relative costs.

</div>
</div>

<div class="glossary" markdown="1">
### Glossary
{: class="glossary-title"}

macrostate
: an overall property of a system

microstate
: each sequence within a larger macrostate

statistical analysis
: using statistics to examine data, such as counting microstates and macrostates

</div>
