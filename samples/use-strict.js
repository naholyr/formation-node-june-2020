"use strict";

const counter = {
  value: 0,
  incr: function () {
    this.value++;
  },
};

counter.incr();

console.log(counter.value, global.value);
