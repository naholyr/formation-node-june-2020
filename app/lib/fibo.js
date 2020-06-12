"use strict";

// Version optimized to crush the CPU
const fibo = (n) => {
  if (n === 1 || n === 0) return 1;
  return fibo(n - 1) + fibo(n - 2);
};

module.exports = fibo;
