---
title: "Accuracy, Precision, and Significant Figures"
layout: page
---

<div class="abstract" markdown="1">
* Determine the appropriate number of significant figures in both addition and subtraction, as well as multiplication and division calculations.
* Calculate the percent uncertainty of a measurement.
</div>

![An old rusted double-pan balance is shown with a weighing stone on one pan.](../resources/Figure_01_03_01.jpg "A double-pan mechanical balance is used to compare different masses. Usually an object with unknown mass is placed in one pan and objects of known mass are placed in the other pan. When the bar that connects the two pans is horizontal, then the masses in both pans are equal. The &#x201C;known masses&#x201D; are typically metal cylinders of standard mass such as 1 gram, 10 grams, and 100 grams. (credit: Serge Melki)")
{: #fig1}

![A digital analytical balance.](../resources/Figure_01_03_02.jpg "Many mechanical balances, such as double-pan balances, have been replaced by digital scales, which can typically measure the mass of an object more precisely. Whereas a mechanical balance may only read the mass of an object to the nearest tenth of a gram, many digital scales can measure the mass of an object up to the nearest thousandth of a gram. (credit: Karel Jakubec)")
{: #fig2 height="250"}

### Accuracy and Precision of a Measurement

Science is based on observation and experiment—that is, on measurements.
**Accuracy** is how close a measurement is to the correct value for that
measurement. For example, let us say that you are measuring the length of
standard computer paper. The packaging in which you purchased the paper states
that it is 11.0 inches long. You measure the length of the paper three times and
obtain the following measurements: 11.1 in., 11.2 in., and 10.9 in. These
measurements are quite accurate because they are very close to the correct value
of 11.0 inches. In contrast, if you had obtained a measurement of 12 inches,
your measurement would not be very accurate.

The **precision** of a measurement system is refers to how close the agreement
is between repeated measurements (
which are repeated under the same conditions). Consider the example of the paper
measurements. The precision of the measurements refers to the spread of the
measured values. One way to analyze the precision of the measurements would be
to determine the range, or difference, between the lowest and the highest
measured values. In that case, the lowest value was 10.9 in. and the highest
value was 11.2 in. Thus, the measured values deviated from each other by at most
0.3 in. These measurements were relatively precise because they did not vary too
much in value. However, if the measured values had been 10.9, 11.1, and 11.9,
then the measurements would not be very precise because there would be
significant variation from one measurement to another.

The measurements in the paper example are both accurate and precise, but in some
cases, measurements are accurate but not precise, or they are precise but not
accurate. Let us consider an example of a GPS system that is attempting to
locate the position of a restaurant in a city. Think of the restaurant location
as existing at the center of a bull’s-eye target, and think of each GPS attempt
to locate the restaurant as a black dot. In [Figure 3](#fig3), you can see that
the GPS measurements are spread out far apart from each other, but they are all
relatively close to the actual location of the restaurant at the center of the
target. This indicates a low precision, high accuracy measuring system. However,
in [Figure 4](#fig4), the GPS measurements are concentrated quite closely to one
another, but they are far away from the target location. This indicates a high
precision, low accuracy measuring system.

![A pattern similar to a dart board with few concentric circles shown in white color on a red background. In the innermost circle, there are four black points on the circumference showing the positions of a restaurant. They are far apart from each other.](../resources/Figure_01_High_accuracy_Low_precision.svg "A GPS system attempts to locate a restaurant at the center of the bull&#x2019;s-eye. The black dots represent each attempt to pinpoint the location of the restaurant. The dots are spread out quite far apart from one another, indicating low precision, but they are each rather close to the actual location of the restaurant, indicating high accuracy. (credit: Dark Evil)")
{: #fig3 height="75"}

![A pattern similar to a dart board with a few concentric circles shown in white color on a red background. Near the outermost white circles there are four black points showing the positions of a restaurant. The black points are very close to each other.](../resources/Figure_01_High_precision_Low_accuracy.svg "In this figure, the dots are concentrated rather closely to one another, indicating high precision, but they are rather far away from the actual location of the restaurant, indicating low accuracy. (credit: Dark Evil)")
{: #fig4 height="75"}

### Accuracy, Precision, and Uncertainty

The degree of accuracy and precision of a measuring system are related to the
**uncertainty** in the measurements. Uncertainty is a quantitative measure of
how much your measured values deviate from a standard or expected value. If your
measurements are not very accurate or precise, then the uncertainty of your
values will be very high. In more general terms, uncertainty can be thought of
as a disclaimer for your measured values. For example, if someone asked you to
provide the mileage on your car, you might say that it is 45 000 miles, plus or
minus 500 miles. The plus or minus amount is the uncertainty in your value. That
is, you are indicating that the actual mileage of your car might be as low as 44
500 miles or as high as 45 500 miles, or anywhere in between. All measurements
contain some amount of uncertainty. In our example of measuring the length of
the paper, we might say that the length of the paper is 11 in., plus or minus
0.2 in. The uncertainty in a measurement, $$ A $$, is often denoted as $$ \delta
A $$
(“delta $$ A $$”), so the measurement result would be recorded as $$ A \pm
\delta A $$. In our paper example, the length of the paper could be expressed as
$$ 11\text{in.} \pm 0.2 $$. The factors contributing to uncertainty in a
measurement include:

1. Limitations of the measuring device,
2. The skill of the person making the measurement,
3. Irregularities in the object being measured,
4. Any other factors that affect the outcome (highly dependent on the situation)
   .

In our example, such factors contributing to the uncertainty could be the
following: the smallest division on the ruler is 0.1 in., the person using the
ruler has bad eyesight, or one side of the paper is slightly longer than the
other. At any rate, the uncertainty in a measurement must be based on a careful
consideration of all the factors that might contribute and their possible
effects.

<div class="note" data-label="" markdown="1">
<div class="title">
Making Connections: Real-World Connections – Fevers or Chills?
</div>
Uncertainty is a critical piece of information, both in physics and
in many other real-world applications. Imagine you are caring for a sick child.
You suspect the child has a fever, so you check their temperature with a thermometer.
What if the uncertainty of the thermometer
were  $$ 3.0^\circ \text{C}  $$?
If the child’s temperature reading was  $$ 37.0^\circ \text{C}  $$
(which is normal body temperature), the “true” temperature could be anywhere
from a hypothermic  $$ 34.0^\circ \text{C}  $$ to a dangerously high  $$ 40.0^\circ
\text{C}  $$. A thermometer with an uncertainty of  $$ 3.0^\circ \text{C}  $$ would
be useless.

</div>

#### Percent Uncertainty

One method of expressing uncertainty is as a percent of the measured value. If a
measurement $$ A $$ is expressed with uncertainty, $$ \delta A $$, the **percent
uncertainty** (%unc)
is defined to be

<div class="equation">
  $$ \% \text{unc} = \frac{ \delta A}{A} \times 100 \% .  $$
</div>

<div class="example" markdown="1">
<div class="title">
Calculating Percent Uncertainty: A Bag of Apples
</div>
A grocery store sells  $$ 5\text{-lb}  $$ bags of apples. You purchase four bags over the course of a month and weigh the
apples each time. You obtain the following measurements:

* Week 1 weight:
  $$ 4.8 \text{lb} $$
* Week 2 weight:
  $$ 5.3 \text{lb} $$
* Week 3 weight:
  $$ 4.9 \text{lb} $$
* Week 4 weight:
  $$ 5.4 \text{lb} $$ You determine that the weight of the $$ 5\text{-lb} $$ bag
  has an uncertainty of $$ \pm 0.4\text{lb} $$. What is the percent uncertainty
  of the bag’s weight?

**Strategy**

First, observe that the expected value of the bag’s weight, $$ A $$, is 5 lb.
The uncertainty in this value, $$ \delta A $$, is 0.4 lb. We can use the
following equation to determine the percent uncertainty of the weight:

<div class="equation">
  $$ \% \text{unc} =\frac{ \delta A}{A} \times 100 \% .  $$
</div>

**Solution**

Plug the known values into the equation:

<div class="equation">
  $$ \% \text{unc} =\frac{0.4\text{lb}}{5\text{lb}} \times 100  \% = 8 \% .  $$
</div>

**Discussion**

We can conclude that the weight of the apple bag is $$ 5\text{lb} \pm 8 \% $$.
Consider how this percent uncertainty would change if the bag of apples were
half as heavy, but the uncertainty in the weight remained the same. Hint for
future calculations: when calculating percent uncertainty, always remember that
you must multiply the fraction by 100%. If you do not do this, you will have a
decimal quantity, not a percent value.

</div>

#### Uncertainties in Calculations

There is an uncertainty in anything calculated from measured quantities. For
example, the area of a floor calculated from measurements of its length and
width has an uncertainty because the length and width have uncertainties. How
big is the uncertainty in something you calculate by multiplication or division?
If the measurements going into the calculation have small uncertainties (a few
percent or less), then the **method of adding percents** can be used for
multiplication or division. This method says that **the percent uncertainty in a
quantity calculated by multiplication or division is the sum of the percent
uncertainties in the items used to make the calculation**. For example, if a
floor has a length of $$ 4.00\m $$ and a width of $$ 3.00\m $$, with
uncertainties of $$ 2 \% $$ and $$ 1 \% $$, respectively, then the area of the
floor is $$ 12.0 \mm $$ and has an uncertainty of $$ 3 \% $$. (Expressed as an
area this is $$ 0.36 \mm $$, which we round to $$ 0.4 \mm $$ since the area of
the floor is given to a tenth of a square meter.)

<div class="exercise" data-print-placement="here" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
A high school track coach has just purchased a new stopwatch. The stopwatch manual states that the stopwatch has an uncertainty of  $$ \pm  0.05 \s  $$. Runners on the track coach’s team regularly clock 100-m sprints of  $$ 11.49 \s    $$
to  $$ 15.01 \s  $$. At the school’s last track meet, the first-place sprinter came in at  $$ 12.04 \s    $$
and the second-place sprinter came in at  $$ 12.07 \s  $$. Will the coach’s new stopwatch be helpful in timing the sprint team? Why or
why not?

</div>
<div class="solution" data-print-placement="here" markdown="1">
No, the uncertainty in the stopwatch is too great to effectively differentiate between the sprint times.

</div>
</div>

### Precision of Measuring Tools and Significant Figures

An important factor in the accuracy and precision of measurements involves the
precision of the measuring tool. In general, a precise measuring tool is one
that can measure values in very small increments. For example, a standard ruler
can measure length to the nearest millimeter, while a caliper can measure length
to the nearest 0.01 millimeter. The caliper is a more precise measuring tool
because it can measure extremely small differences in length. The more precise
the measuring tool, the more precise and accurate the measurements can be.

When we express measured values, we can only list as many digits as we initially
measured with our measuring tool. For example, if you use a standard ruler to
measure the length of a stick, you may measure it to be $$ 36.7\text{cm} $$. You
could not express this value as $$ 36.71\text{cm} $$ because your measuring tool
was not precise enough to measure a hundredth of a centimeter. It should be
noted that the last digit in a measured value has been estimated in some way by
the person performing the measurement. For example, the person measuring the
length of a stick with a ruler notices that the stick length seems to be
somewhere in between $$ 36.6\text{cm} $$ and $$ 36.7\text{cm} $$, and they must
estimate the value of the last digit. Using the method of **significant
figures**, the rule is that **the last digit written down in a measurement is
the first digit with some uncertainty**. In order to determine the number of
significant digits in a value, start with the first measured value at the left
and count the number of digits through the last digit written on the right. For
example, the measured value $$ 36.7\text{cm} $$ has three digits, or significant
figures. Significant figures indicate the precision of a measuring tool that was
used to measure a value.

#### Zeros

Special consideration is given to zeros when counting significant figures. The
zeros in 0.053 are not significant, because they are only placekeepers that
locate the decimal point. There are two significant figures in 0.053. The zeros
in 10.053 are not placekeepers but are significant—this number has five
significant figures. The zeros in 1300 may or may not be significant depending
on the style of writing numbers. They could mean the number is known to the last
digit, or they could be placekeepers. So 1300 could have two, three, or four
significant figures. (To avoid this ambiguity, write 1300 in scientific
notation.) **Zeros are significant except when they serve only as placekeepers**
.

<div class="exercise" data-print-placement="here" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Determine the number of significant figures in the following measurements:

(a) 0.0009
(b) 15 450.0
(c)  $$ 6 \times 10^{3} $$
(d) 87.990
(d) 30.42
</div>
<div class="solution" data-print-placement="here" markdown="1">
(a) 1; the zeros in this number are placekeepers that indicate the decimal point

(b) 6; here, the zeros indicate that a measurement was made to the 0.1 decimal
point, so the zeros are significant

(c) 1; the value $$ 10^{3} $$ signifies the decimal place, not the number of
measured values

(d) 5; the final zero indicates that a measurement was made to the 0.001 decimal
point, so it is significant

(e) 4; any zeros located in between significant figures in a number are also
significant

</div>
</div>

#### Significant Figures in Calculations

When combining measurements with different degrees of accuracy and precision,
**the number of significant digits in the final answer can be no greater than
the number of significant digits in the least precise measured value**. There
are two different rules, one for multiplication and division and the other for
addition and subtraction, as discussed below.

**1. For multiplication and division:** **The result should have the same number
of significant figures as the quantity having the least significant figures
entering into the calculation**. For example, the area of a circle can be
calculated from its radius using $$ A=\pi r^{2} $$. Let us see how many
significant figures the area has if the radius has only two—say, $$ r=1.2\m $$.
Then,

<div class="equation">
  $$ A=\pi r^{2}=\left(3.1415927 \dots \right) \times  \left(1.2\m  \right)^{2}
=4.5238934 \mm  $$
</div>

is what you would get using a calculator that has an eight-digit output. But
because the radius has only two significant figures, it limits the calculated
quantity to two significant figures or

<div class="equation">
  $$ A=4.5 \mm,  $$
</div>

even though $$ \pi $$ is good to at least eight digits.

**2. For addition and subtraction:** **The answer can contain no more decimal
places than the least precise measurement** . Suppose that you buy 7.56-kg of
potatoes in a grocery store as measured with a scale with precision 0.01 kg.
Then you drop off 6.052-kg of potatoes at your laboratory as measured by a scale
with precision 0.001 kg. Finally, you go home and add 13.7 kg of potatoes as
measured by a bathroom scale with precision 0.1 kg. How many kilograms of
potatoes do you now have, and how many significant figures are appropriate in
the answer? The mass is found by simple addition and subtraction:

<div class="equation">
 $$
\eqalign{
7 & . & 56 \kg \\
-6 & . & 052 \kg \\
+13& . & 7 \kg \\
 \hline
15 & . & 208 \kg  \rightarrow  15.2 \kg
}
 $$
</div>

Next, we identify the least precise measurement: 13.7 kg. This measurement is
expressed to the 0.1 decimal place, so our final answer must also be expressed
to the 0.1 decimal place. Thus, the answer is rounded to the tenths place,
giving us 15.2 kg.

#### Significant Figures in this Text

In this text, most numbers are assumed to have three significant figures.
Furthermore, consistent numbers of significant figures are used in all worked
examples. You will note that an answer given to three digits is based on input
good to at least three digits, for example. If the input has fewer significant
figures, the answer will also have fewer significant figures. Care is also taken
that the number of significant figures is reasonable for the situation posed. In
some topics, particularly in optics, more accurate numbers are needed and more
than three significant figures will be used. Finally, if a number is **exact**,
such as the two in the formula for the circumference of a circle, $$ c=2\pi r
$$, it does not affect the number of significant figures in a calculation.

<div class="exercise" data-print-placement="here" data-element-type="check-understanding" data-label="">
<div class="title">
Check Your Understanding
</div>
<div class="problem" markdown="1">
Perform the following calculations and express your answer using the correct number of significant digits.

(a) A woman has two bags weighing 13.5 pounds and one bag with a weight of 10.2
pounds. What is the total weight of the bags?

(b) The force $$ F $$ on an object is equal to its mass $$ m $$ multiplied by
its acceleration $$ a $$. If a wagon with mass 55 kg accelerates at a rate of $$
0.0255\mss $$, what is the force on the wagon? (The unit of force is called the
newton, and it is expressed with the symbol N.)

</div>
<div class="solution" data-print-placement="here" markdown="1">
(a) 37.2 pounds; Because the number of bags is an exact value, it is not considered in the significant figures.

(b) 1.4 N; Because the value 55 kg has only two significant figures, the final
value must also contain two significant figures.

</div>
</div>

<div class="note" data-label="PhET Exploration" markdown="1">
<div class="title">
 Estimation
</div>
Explore size estimation in one, two, and three dimensions! Multiple levels of difficulty allow for progressive skill improvement.

<figure markdown="1">
<figcaption>
Estimation
</figcaption>
<iframe loading="lazy" src="https://phet-dev.colorado.edu/html/estimation/1.0.0-dev.3/estimation_en.html" width="600" height="450"  allowfullscreen></iframe>
</figure>
</div>

### Summary

* Accuracy of a measured value refers to how close a measurement is to the
  correct value. The uncertainty in a measurement is an estimate of the amount
  by which the measurement result may differ from this value.
* Precision of measured values refers to how close the agreement is between
  repeated measurements.
* The precision of a **measuring tool** is related to the size of its
  measurement increments. The smaller the measurement increment, the more
  precise the tool.
* Significant figures express the precision of a measuring tool.
* When multiplying or dividing measured values, the final answer can contain
  only as many significant figures as the least precise value.
* When adding or subtracting measured values, the final answer cannot contain
  more decimal places than the least precise value.

### Conceptual Questions

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What is the relationship between the accuracy and uncertainty of a measurement?

</div>
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Prescriptions for vision correction are given in units called **diopters** (D). Determine the meaning of that unit. Obtain information (perhaps by calling an optometrist or performing an internet search) on the minimum uncertainty with which corrections in diopters are determined and the accuracy with which corrective lenses can be produced. Discuss the sources of uncertainties in both the prescription and accuracy in the manufacture of lenses.

</div>
</div>

### Problems &amp; Exercises

**Express your answers to problems in this section to the correct number of
significant figures and proper units.**

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
Suppose that your bathroom scale reads your mass as 65 kg with a 3% uncertainty. What is the uncertainty in your mass (in kilograms)?

</div>
<div class="solution" markdown="1">
2 kg

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A good-quality measuring tape can be off by 0.50 cm over a distance of 20 m. What is its percent uncertainty?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A car speedometer has a  $$ 5.0 \%  $$ uncertainty. What is the range of
possible speeds when it reads  $$ 90\text{km/h}  $$ ?
(b) Convert this range to miles per hour.  $$ \left(1 \text{km}= 0.6214 \text{mi}\right)  $$
</div>
<div class="solution" markdown="1">
(a)  $$ 85.5\text{to } 94.5 \text{km/h}  $$
(b)  $$ 53.1\text{to } 58.7 \text{mi/h}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
An infant’s pulse rate is measured to be  $$ 130  \pm  5  $$ beats/min.
What is the percent uncertainty in this measurement?
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) Suppose that a person has an average heart rate of 72.0 beats/min.
How many beats do they have in 2.0 y?
(b) In 2.00 y?
(c) In 2.000 y?
</div>
<div class="solution" markdown="1">
(a)  $$ 7.6\times 10^{7}\text{beats}  $$
(b)  $$ 7.57 \times 10^{7}\text{beats}  $$
(c)  $$ 7.57 \times 10^{7}\text{beats}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A can contains 375 mL of soda. How much is left after 308 mL is removed?
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
State how many significant figures are proper in the results of the following calculations:
a.  $$ \left(106.7\right)\left(98.2\right)/\left(46.210\right)\left(1.01\right)  $$
b.  $$ \left(18.7\right)^{2}  $$
c.  $$ \left(1.60 \times 10^{-19}\right) \left( 3712\right)  $$.
</div>
<div class="solution" markdown="1">
(a)  3
(b)  3
(c)  3
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) How many significant figures are in the numbers 99 and 100?
(b) If the uncertainty in each number is 1, what is the percent uncertainty in each?
(c) Which is a more meaningful way to express the accuracy of these two numbers,
significant figures or percent uncertainties?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) If your speedometer has an uncertainty of  $$ 2.0\text{km/h}  $$
at a speed of  $$ 90\text{km/h}  $$, what is the percent uncertainty?
(b) If it has the same percent uncertainty
when it reads  $$ 60\text{km/h}  $$, what is the range of speeds you could be going?

</div>
<div class="solution" markdown="1">
(a)  $$ 2.2 \%  $$
(b)  $$ 59 \text{to 61 km/h}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
(a) A person’s blood pressure is measured to be  $$ 120  \pm  2\text{mm Hg}  $$.
What is its percent uncertainty?
(b) Assuming the same percent uncertainty, what is the uncertainty in a
blood pressure measurement of  $$80 \text{mm Hg}  $$ ?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A person measures their heart rate by counting the number of beats in
 $$30 \s  $$. If  $$ 40 \pm 1  $$ beats are counted in
 $$ 30.0 \pm 0.5\s   $$,
what is the heart rate and its uncertainty in beats per minute?

</div>
<div class="solution" markdown="1">
  $$ 80 \pm 3\text{beats/min}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
What is the area of a circle  $$ 3.102\text{cm}  $$ in diameter?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
If a marathon runner averages 9.5 mi/h, how long does it take them to run a 26.22-mi marathon?

</div>
<div class="solution" markdown="1">
  $$ 2.8\text{h}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A marathon runner completes a  $$ 42.188\text{-km}  $$ course in  $$ 2\text{h}  $$,
30 min, and  $$12 \s  $$. There is an uncertainty of  $$25 \m  $$
in the distance traveled and an uncertainty of 1 s in the elapsed time.
(a) Calculate the percent uncertainty in the distance.
(b) Calculate the uncertainty in the elapsed time.
(c) What is the average speed in meters per second?
(d) What is the uncertainty in the average speed?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The sides of a small rectangular box are measured to be  $$ 1.80 \pm 0.01\text{cm}  $$,
 $$ 2.05 \pm 0.02\text{cm} $$,and  $$3.0 \pm 0.1 \text{cm}  $$
long. Calculate its volume and uncertainty in cubic centimeters.

</div>
<div class="solution" markdown="1">
  $$ 11 \pm 1 \text{cm}^{3}  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
When non-metric units were used in the United Kingdom, a unit of mass called
the **pound-mass** (lbm) was employed, where  $$ 1\text{lbm}=0.4539\kg  $$.
(a) If there is an uncertainty of  $$ 0.0001\kg   $$
in the pound-mass unit, what is its percent uncertainty?
(b) Based on that percent uncertainty, what mass in pound-mass has an uncertainty of 1 kg when
converted to kilograms?

</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
The length and width of a rectangular room are measured to be
 $$ 3.955 \pm 0.005\m  $$ and  $$ 3.050 \pm 0.005\m  $$.
Calculate the area of the room and its uncertainty in square meters.
</div>
<div class="solution" markdown="1">
  $$ 12.06 \pm 0.04 \mm  $$
</div>
</div>

<div class="exercise" data-element-type="problems-exercises">
<div class="problem" markdown="1">
A car engine moves a piston with a circular cross section of
 $$ 7.500 \pm 0.002\text{cm}  $$ diameter a distance of  $$ 3.250 \pm 0.001\text{cm}  $$
to compress the gas in the cylinder.
(a) By what amount is the gas decreased in
volume in cubic centimeters?
(b) Find the uncertainty in this volume.

</div>
</div>

<div class="glossary" markdown="1">

### Glossary

{: class="glossary-title"}

accuracy
: the degree to which a measured value agrees with correct value for that
measurement

method of adding percents
: the percent uncertainty in a quantity calculated by multiplication or division
is the sum of the percent uncertainties in the items used to make the
calculation

percent uncertainty
: the ratio of the uncertainty of a measurement to the measured value, expressed
as a percentage

precision
: the degree to which repeated measurements agree with each other

significant figures
: express the precision of a measuring tool used to measure a value

uncertainty
: a quantitative measure of how much your measured values deviate from a
standard or expected value

</div>
