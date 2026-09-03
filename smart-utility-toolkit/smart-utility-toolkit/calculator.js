// calculator.js
const args = process.argv.slice(2);
const operation = args[0];
const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

if (isNaN(num1) || isNaN(num2)) {
    console.log("Error: Please provide valid numbers.");
    process.exit(1);
}

switch (operation) {
    case 'add':
        console.log(`Result: ${num1 + num2}`);
        break;
    case 'subtract':
        console.log(`Result: ${num1 - num2}`);
        break;
    case 'multiply':
        console.log(`Result: ${num1 * num2}`);
        break;
    case 'divide':
        if (num2 === 0) {
            console.log("Error: Cannot divide by zero.");
        } else {
            console.log(`Result: ${num1 / num2}`);
        }
        break;
    default:
        console.log("Invalid operation. Please use add, subtract, multiply, or divide.");
}
