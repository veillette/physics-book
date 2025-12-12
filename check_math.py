#!/usr/bin/env python3
"""
Script to check mathematical calculations in physics textbook markdown files.
Extracts numerical calculations and verifies them.
"""

import re
import os
import math
from pathlib import Path

# Physical constants
g = 9.80  # m/s^2
c = 3.0e8  # m/s speed of light
pi = math.pi

def extract_calculations(content):
    """Extract calculation examples from markdown content."""
    calculations = []

    # Find equation blocks with numerical results
    equation_pattern = r'<div class="equation">\s*\$\$([^$]+)\$\$\s*</div>'
    equations = re.findall(equation_pattern, content, re.DOTALL)

    for eq in equations:
        # Look for equations with = and numerical results
        if '=' in eq and any(c.isdigit() for c in eq):
            calculations.append(eq.strip())

    return calculations

def verify_kinematic_calculation(v0, a, t, expected_v=None, expected_y=None, y0=0):
    """Verify kinematic equations: v = v0 + at, y = y0 + v0*t + 0.5*a*t^2"""
    results = {}

    if expected_v is not None:
        calc_v = v0 + a * t
        results['velocity'] = {
            'calculated': calc_v,
            'expected': expected_v,
            'error_pct': abs(calc_v - expected_v) / abs(expected_v) * 100 if expected_v != 0 else 0
        }

    if expected_y is not None:
        calc_y = y0 + v0 * t + 0.5 * a * t**2
        results['position'] = {
            'calculated': calc_y,
            'expected': expected_y,
            'error_pct': abs(calc_y - expected_y) / abs(expected_y) * 100 if expected_y != 0 else 0
        }

    return results

def verify_centripetal_force(m, v, r, expected_F=None):
    """Verify F_c = mv^2/r"""
    calc_F = m * v**2 / r
    if expected_F:
        error_pct = abs(calc_F - expected_F) / abs(expected_F) * 100
        return {'calculated': calc_F, 'expected': expected_F, 'error_pct': error_pct}
    return {'calculated': calc_F}

def verify_kinetic_energy(m, v, expected_KE=None):
    """Verify KE = 0.5*m*v^2"""
    calc_KE = 0.5 * m * v**2
    if expected_KE:
        error_pct = abs(calc_KE - expected_KE) / abs(expected_KE) * 100
        return {'calculated': calc_KE, 'expected': expected_KE, 'error_pct': error_pct}
    return {'calculated': calc_KE}

def check_ch2_falling_objects():
    """Check calculations in ch2FallingObjects.md"""
    errors = []

    # Example 1: Rock thrown upward with v0 = 13.0 m/s
    # At t = 1.00 s, y1 = 8.10 m, v1 = 3.20 m/s
    v0 = 13.0  # m/s
    a = -9.80  # m/s^2

    # t = 1.00 s
    t = 1.00
    result = verify_kinematic_calculation(v0, a, t, expected_v=3.20, expected_y=8.10)
    if result['velocity']['error_pct'] > 1:
        errors.append(f"ch2FallingObjects: t=1.00s velocity error {result['velocity']['error_pct']:.2f}%")
    if result['position']['error_pct'] > 1:
        errors.append(f"ch2FallingObjects: t=1.00s position error {result['position']['error_pct']:.2f}%")

    # t = 2.00 s: y2 = 6.40 m, v2 = -6.60 m/s
    t = 2.00
    result = verify_kinematic_calculation(v0, a, t, expected_v=-6.60, expected_y=6.40)
    if result['velocity']['error_pct'] > 1:
        errors.append(f"ch2FallingObjects: t=2.00s velocity error {result['velocity']['error_pct']:.2f}%")
    if result['position']['error_pct'] > 1:
        errors.append(f"ch2FallingObjects: t=2.00s position error {result['position']['error_pct']:.2f}%")

    # t = 3.00 s: y3 = -5.10 m, v3 = -16.4 m/s
    t = 3.00
    result = verify_kinematic_calculation(v0, a, t, expected_v=-16.4, expected_y=-5.10)
    if result['velocity']['error_pct'] > 1:
        errors.append(f"ch2FallingObjects: t=3.00s velocity error {result['velocity']['error_pct']:.2f}%")
    if result['position']['error_pct'] > 1:
        errors.append(f"ch2FallingObjects: t=3.00s position error {result['position']['error_pct']:.2f}%")

    # Example 2: Rock thrown down with v0 = -13.0 m/s, y = -5.10 m
    # v^2 = v0^2 + 2a(y - y0) = (-13)^2 + 2(-9.80)(-5.10) = 169 + 99.96 = 268.96
    v0_down = -13.0
    y = -5.10
    v_squared = v0_down**2 + 2 * a * y
    expected_v_squared = 268.96
    error_pct = abs(v_squared - expected_v_squared) / abs(expected_v_squared) * 100
    if error_pct > 1:
        errors.append(f"ch2FallingObjects: Example 2 v^2 error {error_pct:.2f}% (calc={v_squared}, expected={expected_v_squared})")

    # Example 3: Ball falls 1.0000 m in 0.45173 s
    # a = 2(y - y0) / t^2 = 2(-1.0000) / (0.45173)^2
    y_fall = -1.0000
    t_fall = 0.45173
    calc_a = 2 * y_fall / t_fall**2
    expected_a = -9.8010
    error_pct = abs(calc_a - expected_a) / abs(expected_a) * 100
    if error_pct > 1:
        errors.append(f"ch2FallingObjects: Example 3 g calculation error {error_pct:.2f}% (calc={calc_a}, expected={expected_a})")

    # Check understanding: Ice falls 30.0 m, time to hit water
    # t = sqrt(2y / -g) = sqrt(2*(-30) / -9.80) = sqrt(6.12) = 2.47 s
    y_ice = -30.0
    t_ice_calc = math.sqrt(2 * y_ice / a)
    expected_t_ice = 2.47
    error_pct = abs(t_ice_calc - expected_t_ice) / abs(expected_t_ice) * 100
    if error_pct > 1:
        errors.append(f"ch2FallingObjects: Ice fall time error {error_pct:.2f}% (calc={t_ice_calc:.2f}, expected={expected_t_ice})")

    # Problems solutions check
    # Problem 1: ball thrown with v0=15.0 m/s
    # (a) t=0.500s: y1=6.28m, v1=10.1 m/s
    v0_p1 = 15.0
    t_p1a = 0.500
    y_calc = v0_p1 * t_p1a + 0.5 * a * t_p1a**2
    v_calc = v0_p1 + a * t_p1a
    if abs(y_calc - 6.28) / 6.28 * 100 > 1:
        errors.append(f"ch2FallingObjects: Problem 1(a) y error (calc={y_calc:.2f}, expected=6.28)")
    if abs(v_calc - 10.1) / 10.1 * 100 > 1:
        errors.append(f"ch2FallingObjects: Problem 1(a) v error (calc={v_calc:.2f}, expected=10.1)")

    return errors

def check_ch6_centripetal_force():
    """Check calculations in ch6CentripetalForce.md"""
    errors = []

    # Example 1: Car on curve
    # m = 900 kg, r = 500 m, v = 25.0 m/s
    # F_c = mv^2/r = 900 * 25^2 / 500 = 900 * 625 / 500 = 1125 N
    m = 900
    r = 500
    v = 25.0
    result = verify_centripetal_force(m, v, r, expected_F=1125)
    if result['error_pct'] > 1:
        errors.append(f"ch6CentripetalForce: Example 1 F_c error {result['error_pct']:.2f}%")

    # Coefficient of friction: mu = v^2 / (rg) = 625 / (500 * 9.80) = 0.1276
    mu_calc = v**2 / (r * g)
    expected_mu = 0.13  # given as 0.13 (2 sig figs)
    error_pct = abs(mu_calc - expected_mu) / abs(expected_mu) * 100
    # This is within rounding for 2 sig figs, so check if reasonably close
    if error_pct > 2:  # allow slightly more for rounding
        errors.append(f"ch6CentripetalForce: Friction coefficient error {error_pct:.2f}% (calc={mu_calc:.4f}, expected={expected_mu})")

    # Example 2: Banked curve at 65 degrees, r = 100 m
    # v = sqrt(rg*tan(theta)) = sqrt(100 * 9.80 * tan(65)) = sqrt(100 * 9.80 * 2.1445) = 45.8 m/s
    theta = math.radians(65.0)
    r_banked = 100
    v_banked_calc = math.sqrt(r_banked * g * math.tan(theta))
    expected_v_banked = 45.8
    error_pct = abs(v_banked_calc - expected_v_banked) / abs(expected_v_banked) * 100
    if error_pct > 1:
        errors.append(f"ch6CentripetalForce: Banked curve speed error {error_pct:.2f}% (calc={v_banked_calc:.2f}, expected={expected_v_banked})")

    # Problem solutions
    # Problem 1(a): m=22.0 kg, omega=40.0 rev/min, r=1.25 m, F_c = 483 N
    m_child = 22.0
    omega_rpm = 40.0
    omega_rad = omega_rpm * 2 * pi / 60  # convert to rad/s
    r_child = 1.25
    F_c_calc = m_child * r_child * omega_rad**2
    expected_F_c = 483
    error_pct = abs(F_c_calc - expected_F_c) / abs(expected_F_c) * 100
    if error_pct > 1:
        errors.append(f"ch6CentripetalForce: Problem 1(a) error {error_pct:.2f}% (calc={F_c_calc:.1f}, expected={expected_F_c})")

    # Problem 3: r=1.20 km = 1200 m, v=105 km/h = 29.17 m/s, theta = 4.14 degrees
    r_highway = 1200
    v_highway = 105 * 1000 / 3600  # km/h to m/s
    theta_calc = math.degrees(math.atan(v_highway**2 / (r_highway * g)))
    expected_theta = 4.14
    error_pct = abs(theta_calc - expected_theta) / abs(expected_theta) * 100
    if error_pct > 1:
        errors.append(f"ch6CentripetalForce: Problem 3 banking angle error {error_pct:.2f}% (calc={theta_calc:.2f}, expected={expected_theta})")

    return errors

def check_ch7_work_energy():
    """Check calculations in ch7KineticEnergyAndTheWorkEnergyTheorem.md"""
    errors = []

    # Example 1: KE of package
    # m = 30.0 kg, v = 0.500 m/s, KE = 3.75 J
    m = 30.0
    v = 0.500
    result = verify_kinetic_energy(m, v, expected_KE=3.75)
    if result['error_pct'] > 1:
        errors.append(f"ch7KineticEnergy: Example 1 KE error {result['error_pct']:.2f}%")

    # Example 2: Net work calculation
    # F_app = 120 N, f = 5.00 N, d = 0.800 m
    # F_net = 120 - 5 = 115 N
    # W_net = 115 * 0.800 = 92.0 J
    F_app = 120
    f = 5.00
    d = 0.800
    F_net = F_app - f
    W_net_calc = F_net * d
    expected_W_net = 92.0
    error_pct = abs(W_net_calc - expected_W_net) / abs(expected_W_net) * 100
    if error_pct > 1:
        errors.append(f"ch7KineticEnergy: Example 2 net work error {error_pct:.2f}%")

    # Example 3: Final speed
    # W_net = 92.0 J, KE_0 = 3.75 J, KE_f = 95.75 J
    # v = sqrt(2 * KE_f / m) = sqrt(2 * 95.75 / 30) = sqrt(6.383) = 2.53 m/s
    KE_f = 95.75
    v_final_calc = math.sqrt(2 * KE_f / m)
    expected_v_final = 2.53
    error_pct = abs(v_final_calc - expected_v_final) / abs(expected_v_final) * 100
    if error_pct > 1:
        errors.append(f"ch7KineticEnergy: Example 3 final speed error {error_pct:.2f}% (calc={v_final_calc:.2f}, expected={expected_v_final})")

    # Example 4: Coast distance
    # W_fr = -95.75 J, f = 5.00 N
    # d' = -W_fr / f = 95.75 / 5.00 = 19.15 m (given as 19.2 m)
    d_coast_calc = 95.75 / 5.00
    expected_d_coast = 19.2
    error_pct = abs(d_coast_calc - expected_d_coast) / abs(expected_d_coast) * 100
    if error_pct > 1:
        errors.append(f"ch7KineticEnergy: Example 4 coast distance error {error_pct:.2f}% (calc={d_coast_calc:.2f}, expected={expected_d_coast})")

    return errors

def check_ch3_projectile_motion():
    """Check calculations in ch3ProjectileMotion.md"""
    errors = []

    # Example 1: Fireworks - v0 = 70.0 m/s at 75.0 degrees
    v0 = 70.0  # m/s
    theta = 75.0  # degrees
    theta_rad = math.radians(theta)

    # v0y = v0 * sin(75) = 70 * 0.9659 = 67.6 m/s
    v0y_calc = v0 * math.sin(theta_rad)
    expected_v0y = 67.6
    error_pct = abs(v0y_calc - expected_v0y) / abs(expected_v0y) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: v0y error {error_pct:.2f}% (calc={v0y_calc:.2f}, expected={expected_v0y})")

    # Height y = v0y^2 / (2g) = 67.6^2 / (2*9.80) = 233 m
    y_calc = v0y_calc**2 / (2 * g)
    expected_y = 233
    error_pct = abs(y_calc - expected_y) / abs(expected_y) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: max height error {error_pct:.2f}% (calc={y_calc:.2f}, expected={expected_y})")

    # Time t = 2y / v0y = 2*233 / 67.6 = 6.90 s
    t_calc = 2 * expected_y / expected_v0y
    expected_t = 6.90
    error_pct = abs(t_calc - expected_t) / abs(expected_t) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: time error {error_pct:.2f}% (calc={t_calc:.2f}, expected={expected_t})")

    # v0x = v0 * cos(75) = 70 * 0.2588 = 18.1 m/s
    v0x_calc = v0 * math.cos(theta_rad)
    expected_v0x = 18.1
    error_pct = abs(v0x_calc - expected_v0x) / abs(expected_v0x) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: v0x error {error_pct:.2f}% (calc={v0x_calc:.2f}, expected={expected_v0x})")

    # Horizontal displacement x = v0x * t = 18.1 * 6.90 = 125 m
    x_calc = expected_v0x * expected_t
    expected_x = 125
    error_pct = abs(x_calc - expected_x) / abs(expected_x) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: horizontal displacement error {error_pct:.2f}% (calc={x_calc:.2f}, expected={expected_x})")

    # Example 2: Hot rock - v0 = 25.0 m/s at 35 degrees, lands 20 m below
    v0_rock = 25.0
    theta_rock = 35.0
    theta_rock_rad = math.radians(theta_rock)

    # v0y = 25 * sin(35) = 14.3 m/s
    v0y_rock = v0_rock * math.sin(theta_rock_rad)
    expected_v0y_rock = 14.3
    error_pct = abs(v0y_rock - expected_v0y_rock) / abs(expected_v0y_rock) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: rock v0y error {error_pct:.2f}%")

    # v0x = 25 * cos(35) = 20.5 m/s
    v0x_rock = v0_rock * math.cos(theta_rock_rad)
    expected_v0x_rock = 20.5
    error_pct = abs(v0x_rock - expected_v0x_rock) / abs(expected_v0x_rock) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: rock v0x error {error_pct:.2f}%")

    # Quadratic: 4.90*t^2 - 14.3*t - 20 = 0, t = 3.96 s
    a_quad = 4.90
    b_quad = -14.3
    c_quad = -20.0
    discriminant = b_quad**2 - 4*a_quad*c_quad
    t_rock_calc = (-b_quad + math.sqrt(discriminant)) / (2*a_quad)
    expected_t_rock = 3.96
    error_pct = abs(t_rock_calc - expected_t_rock) / abs(expected_t_rock) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: rock time error {error_pct:.2f}% (calc={t_rock_calc:.2f}, expected={expected_t_rock})")

    # vy = v0y - g*t = 14.3 - 9.80*3.96 = -24.5 m/s
    vy_rock_calc = expected_v0y_rock - g * expected_t_rock
    expected_vy_rock = -24.5
    error_pct = abs(vy_rock_calc - expected_vy_rock) / abs(expected_vy_rock) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: rock vy error {error_pct:.2f}% (calc={vy_rock_calc:.2f}, expected={expected_vy_rock})")

    # |v| = sqrt(20.5^2 + (-24.5)^2) = 31.9 m/s
    v_mag_calc = math.sqrt(expected_v0x_rock**2 + expected_vy_rock**2)
    expected_v_mag = 31.9
    error_pct = abs(v_mag_calc - expected_v_mag) / abs(expected_v_mag) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: rock |v| error {error_pct:.2f}% (calc={v_mag_calc:.2f}, expected={expected_v_mag})")

    # angle = atan(-24.5/20.5) = -50.1 degrees
    angle_calc = math.degrees(math.atan(expected_vy_rock / expected_v0x_rock))
    expected_angle = -50.1
    error_pct = abs(angle_calc - expected_angle) / abs(expected_angle) * 100
    if error_pct > 1:
        errors.append(f"ch3ProjectileMotion: rock angle error {error_pct:.2f}% (calc={angle_calc:.2f}, expected={expected_angle})")

    return errors

def check_ch4_newtons_second_law():
    """Check calculations in ch4NewtonsSecondLawOfMotion.md"""
    errors = []

    # Example 1: Lawn mower - F_net = 51 N, m = 24 kg
    # a = F/m = 51/24 = 2.125 m/s^2 (given as 2.1)
    F_net = 51
    m = 24
    a_calc = F_net / m
    expected_a = 2.1
    error_pct = abs(a_calc - expected_a) / abs(expected_a) * 100
    if error_pct > 1:
        errors.append(f"ch4NewtonsSecondLaw: lawn mower acceleration error {error_pct:.2f}% (calc={a_calc:.2f}, expected={expected_a})")

    # Example 2: Rocket sled - a = 49 m/s^2, m = 2100 kg, f = 650 N
    # 4T = ma + f = 2100*49 + 650 = 103550 N ~ 1.0e5 N
    a_sled = 49
    m_sled = 2100
    f_sled = 650
    total_thrust_calc = m_sled * a_sled + f_sled
    expected_total_thrust = 1.0e5
    error_pct = abs(total_thrust_calc - expected_total_thrust) / abs(expected_total_thrust) * 100
    if error_pct > 4:  # Allow 4% since they round to 1.0e5
        errors.append(f"ch4NewtonsSecondLaw: rocket sled total thrust error {error_pct:.2f}% (calc={total_thrust_calc:.0f}, expected={expected_total_thrust:.0f})")

    # T = total/4 = 1.0e5/4 = 2.5e4 N (given as 2.6e4)
    T_calc = total_thrust_calc / 4
    expected_T = 2.6e4
    error_pct = abs(T_calc - expected_T) / abs(expected_T) * 100
    if error_pct > 1:
        errors.append(f"ch4NewtonsSecondLaw: individual thrust error {error_pct:.2f}% (calc={T_calc:.0f}, expected={expected_T:.0f})")

    # Problem 1: m = 63.0 kg, a = 4.20 m/s^2, F = ma = 265 N
    m_sprinter = 63.0
    a_sprinter = 4.20
    F_sprinter_calc = m_sprinter * a_sprinter
    expected_F_sprinter = 265
    error_pct = abs(F_sprinter_calc - expected_F_sprinter) / abs(expected_F_sprinter) * 100
    if error_pct > 1:
        errors.append(f"ch4NewtonsSecondLaw: sprinter force error {error_pct:.2f}%")

    # Problem 3: m = 4.50 kg, F = 60.0 N, a = F/m = 13.33 m/s^2 (given as 13.3)
    m_cart = 4.50
    F_cart = 60.0
    a_cart_calc = F_cart / m_cart
    expected_a_cart = 13.3
    error_pct = abs(a_cart_calc - expected_a_cart) / abs(expected_a_cart) * 100
    if error_pct > 1:
        errors.append(f"ch4NewtonsSecondLaw: laundry cart acceleration error {error_pct:.2f}%")

    return errors

def check_ch5_friction():
    """Check calculations in ch5Friction.md"""
    errors = []

    # Example 1: Skier - m = 62 kg, f_k = 45.0 N, slope = 25 degrees
    # mu_k = f_k / (mg*cos(25)) = 45 / (62*9.80*0.906) = 0.082
    m_skier = 62
    f_k = 45.0
    theta_slope = 25
    cos_theta = math.cos(math.radians(theta_slope))
    mu_k_calc = f_k / (m_skier * g * cos_theta)
    expected_mu_k = 0.082
    error_pct = abs(mu_k_calc - expected_mu_k) / abs(expected_mu_k) * 100
    if error_pct > 1:
        errors.append(f"ch5Friction: skier mu_k error {error_pct:.2f}% (calc={mu_k_calc:.4f}, expected={expected_mu_k})")

    # Crate example: m = 100 kg, mu_s = 0.45, mu_k = 0.30
    # f_s_max = mu_s * mg = 0.45 * 100 * 9.80 = 441 N (given as 440)
    m_crate = 100
    mu_s_crate = 0.45
    f_s_max_calc = mu_s_crate * m_crate * g
    expected_f_s_max = 440
    error_pct = abs(f_s_max_calc - expected_f_s_max) / abs(expected_f_s_max) * 100
    if error_pct > 1:
        errors.append(f"ch5Friction: crate f_s_max error {error_pct:.2f}%")

    # f_k = mu_k * mg = 0.30 * 100 * 9.80 = 294 N (given as 290)
    mu_k_crate = 0.30
    f_k_crate_calc = mu_k_crate * m_crate * g
    expected_f_k_crate = 290
    error_pct = abs(f_k_crate_calc - expected_f_k_crate) / abs(expected_f_k_crate) * 100
    if error_pct > 2:  # Allow 2% since they round
        errors.append(f"ch5Friction: crate f_k error {error_pct:.2f}%")

    # Problem 1: f = 0.200 N, mu_k = 0.04 (Teflon on steel), N = f/mu_k = 5.00 N
    f_spatula = 0.200
    mu_k_teflon = 0.04
    N_spatula_calc = f_spatula / mu_k_teflon
    expected_N_spatula = 5.00
    error_pct = abs(N_spatula_calc - expected_N_spatula) / abs(expected_N_spatula) * 100
    if error_pct > 1:
        errors.append(f"ch5Friction: spatula normal force error {error_pct:.2f}%")

    # Problem 4: m = 120 kg wood on wood, mu_s = 0.5, mu_k = 0.3
    # f_s_max = mu_s * mg = 0.5 * 120 * 9.80 = 588 N
    m_wood = 120
    f_s_max_wood = 0.5 * m_wood * g
    expected_f_s_max_wood = 588
    error_pct = abs(f_s_max_wood - expected_f_s_max_wood) / abs(expected_f_s_max_wood) * 100
    if error_pct > 1:
        errors.append(f"ch5Friction: wood crate f_s_max error {error_pct:.2f}%")

    # a = (F - f_k) / m = (588 - 0.3*120*9.80) / 120 = (588-352.8)/120 = 1.96 m/s^2
    f_k_wood = 0.3 * m_wood * g
    a_wood_calc = (expected_f_s_max_wood - f_k_wood) / m_wood
    expected_a_wood = 1.96
    error_pct = abs(a_wood_calc - expected_a_wood) / abs(expected_a_wood) * 100
    if error_pct > 1:
        errors.append(f"ch5Friction: wood crate acceleration error {error_pct:.2f}%")

    return errors

def check_ch9_statics_torque():
    """Check calculations in ch9TheSecondConditionForEquilibrium.md"""
    errors = []

    # Example 1: Seesaw with two children
    # m1 = 26.0 kg, r1 = 1.60 m, m2 = 32.0 kg, find r2
    m1 = 26.0
    r1 = 1.60
    m2 = 32.0

    # r2 = r1 * (m1/m2) = 1.60 * (26/32) = 1.30 m
    r2_calc = r1 * (m1 / m2)
    expected_r2 = 1.30
    error_pct = abs(r2_calc - expected_r2) / abs(expected_r2) * 100
    if error_pct > 1:
        errors.append(f"ch9StaticsTorque: seesaw r2 error {error_pct:.2f}%")

    # F_p = (m1 + m2) * g = (26 + 32) * 9.80 = 568 N
    F_p_calc = (m1 + m2) * g
    expected_F_p = 568
    error_pct = abs(F_p_calc - expected_F_p) / abs(expected_F_p) * 100
    if error_pct > 1:
        errors.append(f"ch9StaticsTorque: pivot force error {error_pct:.2f}%")

    # Problem: Seesaw with shifted center of mass
    # m_s = 12.0 kg, r_s = 0.160 m
    m_s = 12.0
    r_s = 0.160

    # r2 = (m1*r1 + m_s*r_s) / m2 = (26*1.6 + 12*0.16) / 32 = 1.36 m
    r2_shifted_calc = (m1 * r1 + m_s * r_s) / m2
    expected_r2_shifted = 1.36
    error_pct = abs(r2_shifted_calc - expected_r2_shifted) / abs(expected_r2_shifted) * 100
    if error_pct > 1:
        errors.append(f"ch9StaticsTorque: shifted seesaw r2 error {error_pct:.2f}%")

    # F_p = (m1 + m2 + m_s) * g = (26 + 32 + 12) * 9.80 = 686 N
    F_p_shifted_calc = (m1 + m2 + m_s) * g
    expected_F_p_shifted = 686
    error_pct = abs(F_p_shifted_calc - expected_F_p_shifted) / abs(expected_F_p_shifted) * 100
    if error_pct > 1:
        errors.append(f"ch9StaticsTorque: shifted pivot force error {error_pct:.2f}%")

    # Problem 1: Door torque
    # τ = r*F*sin(90°) = 0.850 * 55.0 = 46.75 ≈ 46.8 N·m
    r_door = 0.850
    F_door = 55.0
    tau_calc = r_door * F_door
    expected_tau = 46.8
    error_pct = abs(tau_calc - expected_tau) / abs(expected_tau) * 100
    if error_pct > 1:
        errors.append(f"ch9StaticsTorque: door torque error {error_pct:.2f}%")

    # Problem 3: Two children pushing door
    # 17.5 * 0.600 = F2 * 0.450 => F2 = 10.5/0.450 = 23.3 N
    F2_calc = (17.5 * 0.600) / 0.450
    expected_F2 = 23.3
    error_pct = abs(F2_calc - expected_F2) / abs(expected_F2) * 100
    if error_pct > 1:
        errors.append(f"ch9StaticsTorque: door force error {error_pct:.2f}%")

    return errors

def check_ch8_elastic_collisions():
    """Check calculations in ch8ElasticCollisionsInOneDimension.md"""
    errors = []

    # Example: m1 = 0.500 kg, m2 = 3.50 kg, v1 = 4.00 m/s, v2 = 0
    # After elastic collision: v1' = -3.00 m/s, v2' = 1.00 m/s
    m1 = 0.500
    m2 = 3.50
    v1 = 4.00
    v2 = 0

    # Conservation of momentum: m1*v1 + m2*v2 = m1*v1' + m2*v2'
    # 0.5*4 + 0 = 0.5*v1' + 3.5*v2' => 2 = 0.5*v1' + 3.5*v2'

    # For elastic collision with v2=0:
    # v1' = (m1-m2)/(m1+m2) * v1 = (0.5-3.5)/(0.5+3.5) * 4 = -3/4 * 4 = -3.00 m/s
    v1_prime_calc = (m1 - m2) / (m1 + m2) * v1
    expected_v1_prime = -3.00
    error_pct = abs(v1_prime_calc - expected_v1_prime) / abs(expected_v1_prime) * 100
    if error_pct > 1:
        errors.append(f"ch8ElasticCollisions: v1' error {error_pct:.2f}%")

    # v2' = 2*m1/(m1+m2) * v1 = 2*0.5/4 * 4 = 1.00 m/s
    v2_prime_calc = 2 * m1 / (m1 + m2) * v1
    expected_v2_prime = 1.00
    error_pct = abs(v2_prime_calc - expected_v2_prime) / abs(expected_v2_prime) * 100
    if error_pct > 1:
        errors.append(f"ch8ElasticCollisions: v2' error {error_pct:.2f}%")

    # Verify using given formula: v2' = m1/m2 * (v1 - v1') = 0.5/3.5 * (4 - (-3)) = 0.5/3.5 * 7 = 1.00 m/s
    v2_prime_check = (m1 / m2) * (v1 - expected_v1_prime)
    error_pct = abs(v2_prime_check - expected_v2_prime) / abs(expected_v2_prime) * 100
    if error_pct > 1:
        errors.append(f"ch8ElasticCollisions: v2' from formula error {error_pct:.2f}%")

    # Verify KE conservation: 0.5*m1*v1^2 = 0.5*m1*v1'^2 + 0.5*m2*v2'^2
    KE_initial = 0.5 * m1 * v1**2
    KE_final = 0.5 * m1 * expected_v1_prime**2 + 0.5 * m2 * expected_v2_prime**2
    expected_KE = 4.00  # Given as 4.00 J
    error_pct_init = abs(KE_initial - expected_KE) / abs(expected_KE) * 100
    error_pct_fin = abs(KE_final - expected_KE) / abs(expected_KE) * 100
    if error_pct_init > 1 or error_pct_fin > 1:
        errors.append(f"ch8ElasticCollisions: KE conservation error (init={KE_initial:.2f}, final={KE_final:.2f}, expected=4.00)")

    return errors

def check_ch10_rotational_energy():
    """Check calculations in ch10RotationalKineticEnergy.md"""
    errors = []

    # Example 1: Grindstone - r = 0.320 m, F = 200 N, theta = 1.00 rad, m = 85.0 kg
    r = 0.320
    F = 200
    theta = 1.00
    m = 85.0

    # Work = r*F*theta = 0.320 * 200 * 1.00 = 64.0 J
    W_calc = r * F * theta
    expected_W = 64.0
    error_pct = abs(W_calc - expected_W) / abs(expected_W) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Work error {error_pct:.2f}%")

    # Torque = r*F = 64.0 N·m
    tau = r * F
    expected_tau = 64.0
    error_pct = abs(tau - expected_tau) / abs(expected_tau) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Torque error {error_pct:.2f}%")

    # I = 0.5*M*R^2 = 0.5 * 85.0 * 0.320^2 = 4.352 kg·m^2
    I_calc = 0.5 * m * r**2
    expected_I = 4.352
    error_pct = abs(I_calc - expected_I) / abs(expected_I) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Moment of inertia error {error_pct:.2f}%")

    # alpha = tau / I = 64.0 / 4.352 = 14.7 rad/s^2
    alpha_calc = tau / I_calc
    expected_alpha = 14.7
    error_pct = abs(alpha_calc - expected_alpha) / abs(expected_alpha) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Angular acceleration error {error_pct:.2f}%")

    # omega = sqrt(2*alpha*theta) = sqrt(2*14.7*1.00) = 5.42 rad/s
    omega_calc = math.sqrt(2 * alpha_calc * theta)
    expected_omega = 5.42
    error_pct = abs(omega_calc - expected_omega) / abs(expected_omega) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Angular velocity error {error_pct:.2f}%")

    # KE_rot = 0.5*I*omega^2 = 0.5 * 4.352 * 5.42^2 = 64.0 J
    KE_rot_calc = 0.5 * I_calc * omega_calc**2
    expected_KE_rot = 64.0
    error_pct = abs(KE_rot_calc - expected_KE_rot) / abs(expected_KE_rot) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Rotational KE error {error_pct:.2f}%")

    # Example 2: Helicopter blades - 4 blades, each L=4.00m, m=50.0kg, omega=300rpm
    # Total helicopter mass = 1000 kg
    L_blade = 4.00
    m_blade = 50.0
    omega_rpm = 300
    m_helicopter = 1000

    # omega in rad/s: 300 * 2*pi / 60 = 31.4 rad/s
    omega_heli = omega_rpm * 2 * pi / 60
    expected_omega_heli = 31.4
    error_pct = abs(omega_heli - expected_omega_heli) / abs(expected_omega_heli) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Helicopter omega error {error_pct:.2f}%")

    # I = 4 * (ML^2/3) = 4 * 50 * 16 / 3 = 1067 kg·m^2
    I_heli = 4 * (m_blade * L_blade**2 / 3)
    expected_I_heli = 1067
    error_pct = abs(I_heli - expected_I_heli) / abs(expected_I_heli) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Helicopter I error {error_pct:.2f}%")

    # KE_rot = 0.5 * 1067 * 31.4^2 = 5.26e5 J
    KE_rot_heli = 0.5 * I_heli * omega_heli**2
    expected_KE_rot_heli = 5.26e5
    error_pct = abs(KE_rot_heli - expected_KE_rot_heli) / abs(expected_KE_rot_heli) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Helicopter KE_rot error {error_pct:.2f}% (calc={KE_rot_heli:.2e}, expected={expected_KE_rot_heli:.2e})")

    # KE_trans = 0.5 * 1000 * 20^2 = 2.00e5 J
    v_heli = 20.0
    KE_trans_heli = 0.5 * m_helicopter * v_heli**2
    expected_KE_trans_heli = 2.00e5
    error_pct = abs(KE_trans_heli - expected_KE_trans_heli) / abs(expected_KE_trans_heli) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Helicopter KE_trans error {error_pct:.2f}%")

    # Height h = KE_rot / (m*g) = 5.26e5 / (1000*9.80) = 53.7 m
    h_calc = expected_KE_rot_heli / (m_helicopter * g)
    expected_h = 53.7
    error_pct = abs(h_calc - expected_h) / abs(expected_h) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Helicopter height error {error_pct:.2f}%")

    # Example 3: Cylinder rolling down - h = 2.00 m
    # v = sqrt(4*g*h/3) = sqrt(4*9.80*2.00/3) = 5.11 m/s
    h_cylinder = 2.00
    v_cylinder_calc = math.sqrt(4 * g * h_cylinder / 3)
    expected_v_cylinder = 5.11
    error_pct = abs(v_cylinder_calc - expected_v_cylinder) / abs(expected_v_cylinder) * 100
    if error_pct > 1:
        errors.append(f"ch10RotationalEnergy: Rolling cylinder speed error {error_pct:.2f}%")

    return errors

def check_ch11_archimedes():
    """Check calculations in ch11ArchimedesPrinciple.md"""
    errors = []

    # Example 1: Steel in water
    # m_steel = 1.00e7 kg, rho_steel = 7.8e3 kg/m^3, rho_water = 1.0e3 kg/m^3

    m_steel = 1.00e7
    rho_steel = 7.8e3
    rho_water = 1.0e3

    # V_steel = m/rho = 1.00e7 / 7.8e3 = 1.28e3 m^3
    V_steel_calc = m_steel / rho_steel
    expected_V_steel = 1.28e3
    error_pct = abs(V_steel_calc - expected_V_steel) / abs(expected_V_steel) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Steel volume error {error_pct:.2f}%")

    # m_water_displaced = rho_water * V = 1.0e3 * 1.28e3 = 1.28e6 kg
    m_water_calc = rho_water * V_steel_calc
    expected_m_water = 1.28e6
    error_pct = abs(m_water_calc - expected_m_water) / abs(expected_m_water) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Displaced water mass error {error_pct:.2f}%")

    # F_B = m_water * g = 1.28e6 * 9.80 = 1.3e7 N (rounded)
    F_B_calc = m_water_calc * g
    expected_F_B = 1.3e7
    error_pct = abs(F_B_calc - expected_F_B) / abs(expected_F_B) * 100
    if error_pct > 4:  # Allow more since they round significantly
        errors.append(f"ch11Archimedes: Buoyant force error {error_pct:.2f}%")

    # Weight of steel = m * g = 1.00e7 * 9.80 = 9.80e7 N
    W_steel = m_steel * g
    expected_W_steel = 9.80e7
    error_pct = abs(W_steel - expected_W_steel) / abs(expected_W_steel) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Steel weight error {error_pct:.2f}%")

    # Part (b): V_boat = 1.00e5 m^3
    # m_water = rho * V = 1.0e3 * 1.0e5 = 1.0e8 kg
    # F_B_max = m * g = 1.0e8 * 9.80 = 9.80e8 N
    V_boat = 1.00e5
    m_water_boat = rho_water * V_boat
    F_B_max_calc = m_water_boat * g
    expected_F_B_max = 9.80e8
    error_pct = abs(F_B_max_calc - expected_F_B_max) / abs(expected_F_B_max) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Max buoyant force error {error_pct:.2f}%")

    # Example 2: Floating woman - 97% submerged
    # density = 0.97 * 1000 = 970 kg/m^3
    fraction_submerged = 0.97
    density_woman_calc = fraction_submerged * rho_water
    expected_density_woman = 970
    error_pct = abs(density_woman_calc - expected_density_woman) / abs(expected_density_woman) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Woman density error {error_pct:.2f}%")

    # Example 3: Coin density
    # m_air = 8.630 g, m_apparent = 7.800 g
    # m_water_displaced = 8.630 - 7.800 = 0.830 g
    # V = 0.830 / 1.000 = 0.830 cm^3
    # density = 8.630 / 0.830 = 10.4 g/cm^3
    m_coin_air = 8.630
    m_coin_apparent = 7.800
    m_water_disp = m_coin_air - m_coin_apparent
    V_coin = m_water_disp / 1.000  # density of water in g/cm^3
    density_coin_calc = m_coin_air / V_coin
    expected_density_coin = 10.4
    error_pct = abs(density_coin_calc - expected_density_coin) / abs(expected_density_coin) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Coin density error {error_pct:.2f}%")

    # Problem 1: Ice in water - fraction submerged = rho_ice / rho_water = 917/1000 = 0.917 = 91.7%
    rho_ice = 917
    fraction_ice_calc = rho_ice / rho_water * 100
    expected_fraction_ice = 91.7
    error_pct = abs(fraction_ice_calc - expected_fraction_ice) / abs(expected_fraction_ice) * 100
    if error_pct > 1:
        errors.append(f"ch11Archimedes: Ice fraction error {error_pct:.2f}%")

    return errors

def main():
    """Main function to run all checks."""
    print("=" * 60)
    print("Physics Textbook Mathematical Error Checker")
    print("=" * 60)
    print()

    all_errors = []

    # Check Chapter 2
    print("Checking Chapter 2 - Falling Objects...")
    errors = check_ch2_falling_objects()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 3
    print("\nChecking Chapter 3 - Projectile Motion...")
    errors = check_ch3_projectile_motion()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 4
    print("\nChecking Chapter 4 - Newton's Second Law...")
    errors = check_ch4_newtons_second_law()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 5
    print("\nChecking Chapter 5 - Friction...")
    errors = check_ch5_friction()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 6
    print("\nChecking Chapter 6 - Centripetal Force...")
    errors = check_ch6_centripetal_force()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 7
    print("\nChecking Chapter 7 - Kinetic Energy...")
    errors = check_ch7_work_energy()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 8
    print("\nChecking Chapter 8 - Elastic Collisions...")
    errors = check_ch8_elastic_collisions()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 9
    print("\nChecking Chapter 9 - Statics and Torque...")
    errors = check_ch9_statics_torque()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 10
    print("\nChecking Chapter 10 - Rotational Energy...")
    errors = check_ch10_rotational_energy()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    # Check Chapter 11
    print("\nChecking Chapter 11 - Archimedes' Principle...")
    errors = check_ch11_archimedes()
    all_errors.extend(errors)
    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
    else:
        print("  All calculations verified OK")

    print("\n" + "=" * 60)
    print(f"SUMMARY: Found {len(all_errors)} error(s) with >1% discrepancy")
    print("=" * 60)

    return all_errors

if __name__ == "__main__":
    main()
