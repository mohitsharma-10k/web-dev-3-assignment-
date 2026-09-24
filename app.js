// app.js
const isEven = require('./modules/isEven');

console.log("=== Demonstrating Custom Module Reusability: isEven ===");

// Example 1: Testing individual numbers
const testNumbers = [0, 4, 7, 10, -2, -9, 100];
testNumbers.forEach(num => {
    console.log(`Checking if ${num} is even: ${isEven(num)}`);
});

// Example 2: Reusing module to filter an array of numbers
const numbersList = [12, 15, 22, 33, 48, 55, 60];
const evenNumbers = numbersList.filter(isEven);
console.log("\nOriginal List:", numbersList);
console.log("Filtered Even Numbers:", evenNumbers);