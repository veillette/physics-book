import { FBD } from './fbd.js';

export default {
  // 9.1 Conceptual Question 1 — a car in dynamic equilibrium
  fbd_09_01_q01: () => {
    const d = new FBD({
      title: 'Free-body diagram of a car moving at constant velocity',
      desc: 'Free-body diagram of a car moving to the right at constant velocity on a level road, with +x in the direction of motion and +y up: the road pushes the drive wheels forward with F along +x, air resistance and rolling friction f point backward along −x with the same length, normal force N up and weight w down have equal lengths. The net force is zero, so a = 0 and the velocity v stays constant.',
      width: 420,
      height: 300,
      cx: 200,
      cy: 150,
    });
    d.axes({ xLen: 180, yLen: 115, xNeg: 170, yNeg: 115 });
    d.force(90, 80, 'N');
    d.force(270, 80, 'w');
    d.force(0, 100, 'F');
    d.force(180, 100, 'f');
    d.accel(0, 0, { at: [-120, 95] });
    d.note(110, 90, 'v = constant →', { size: 15 });
    d.objectLabel('car', { dx: 10, dy: -22 });
    return d.render();
  },
};
