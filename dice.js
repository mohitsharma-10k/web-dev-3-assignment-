// dice.js
const crypto = require('crypto');

function rollDice() {
    // crypto.randomInt(min, max) generates a number where max is exclusive
    const result = crypto.randomInt(1, 7); 
    console.log(`Dice Rolled: ${result}`);
}

console.log("Rolling dice 3 times...");
for (let i = 0; i < 3; i++) {
    rollDice();
}
