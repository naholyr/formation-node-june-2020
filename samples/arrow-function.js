"use strict";

/*
const plus = function (a, b) {
  return a + b;
};

const plus = (a, b) => {
  return a + b;
};

const plus = (a, b) => a + b;

const incr = (n) => n + 1;

const a = [1, 2, 3, 4];
const squares = a.map((v) => v ** 2); // [1, 4, 9, 16]
const even = a.filter((v) => v % 2 === 1); // [1, 3]
*/

const counter = {
  value: 0,
  incr() {
    this.value++;
  },

  /*
  toto: function() { this.value }, // yep
  toto() {}, // idem
  //toto: () {}
  //toto(): {}
  toto: () => { this.value } // nope
  */

  incrASAP() {
    // this = counter
    setTimeout(() => {
      // this = le this du dessus
      this.incr();
    }, 0);
  },
};

counter.incrASAP();

setTimeout(() => {
  console.log(counter.value, global.value);
}, 5);
