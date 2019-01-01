
let container = document.querySelector('.numbersContainer');
let display = document.querySelector('.display');
display.value = '';

let displayString = '';

// Add buttons 1-9
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let button = document.createElement('button');
        button.textContent = j + 1 + 3 * i;
        button.style.gridColumnStart = j + 1;
        button.style.gridRowStart = i + 1;
        button.classList.add('calcButton');

        container.appendChild(button);
    }
}

// Add zero button
let button = document.createElement('button');
button.textContent = 0;
button.style.gridColumnStart = 2;
button.style.gridRowStart = 4;
button.classList.add('calcButton');
container.appendChild(button);

// Add '.' button
button = document.createElement('button');
button.textContent = '.';
button.style.gridColumnStart = 1;
button.style.gridRowStart = 4;
button.classList.add('calcButton');
container.appendChild(button);

// Add clear button
button = document.createElement('button');
button.textContent = 'Clear';
button.style.gridColumnStart = 3;
button.style.gridRowStart = 4;
button.classList.add('clearButton');
container.appendChild(button);

// Add actionlisteners for all buttons
let buttons = document.querySelectorAll('.calcButton');
buttons.forEach(button => {
    button.addEventListener('click' ,e => {        
        displayString = displayString.concat(button.textContent);
        display.value = getDisplayValue();
    });
});

// Add actionlistener for clear button
document.querySelector('.clearButton').addEventListener('click', e => {
    displayString = '';
    display.value = displayString;
});

// Add actionlistener for equals button
document.querySelector('.equalsButton').addEventListener('click', e => {
    let output = calculate();
    display.value = output;
    displayString = (Number(output)) ? output.toString() : '';
});

function calculate() {
    if (checkForErrors()) return "Error";

    let numbers = [];
    let operators = [];

    // Get the numbers in one array and the operators in another.
    let lastOperator = -1;
    let currentNumber = '';
    for (let i = 0; i < displayString.length; i++) {
        if (Number(displayString[i]) || displayString[i] == '.' || displayString[i] == '0') {
            currentNumber = currentNumber.concat(displayString[i]);
        } else {
            numbers.push(currentNumber);
            currentNumber = '';
            operators.push(displayString[i]);
        }
    }
    numbers.push(currentNumber);

    // Calculate the answer
    let answer = calculateAnswer(operators, numbers);
    let formatAnswer = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 10 }).format(answer)
    return formatAnswer;
}

function calculateAnswer(operators, numbers) {
    // First all '*'
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == '*') {
            numbers[i] = operate(numbers[i],  numbers[i+1], operators[i]); 
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        }
    }

    // Then all '/'
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == '/') {
            numbers[i] = operate(numbers[i],  numbers[i+1], operators[i]); 
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        }
    }

    // Then all '-'
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == '-') {
            numbers[i] = operate(numbers[i],  numbers[i+1], operators[i]); 
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        }
    }

    // Then all '+'
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == '+') {
            numbers[i] = operate(numbers[i],  numbers[i+1], operators[i]); 
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        }
    }

    return numbers[0];
}

function checkForErrors() {
    let lastNonNumber = -1;
    for (let i = 0; i < displayString.length; i++) {
        if (!Number(displayString[i])) {
            if (lastNonNumber == i - 1) {
                return true;
            }
            lastNonNumber = i;
        }
    }

    if (!Number(displayString[displayString.length-1])) return true;

    return false;
}

function getDisplayValue() {
    let string = '';
    for (let i = 0; i < displayString.length; i++) {
        if (Number(displayString[i]) || displayString[i] == '.' || displayString[i] == '0') {
            string = string.concat(displayString[i]);
        } else {
            string = string.concat(' ' + displayString[i] +  ' ');
        }
    }

    // If it is too long decrease the font-size.
    if (string.length >= 10) {
        let input = document.querySelector('.display');
        console.log("Tried to decrease font-size");
        input.style.classList.add('smallFont');
        //input.style.fontSize = 10;
    }

    return string;
}


function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function operate(a, b, operator) {
    if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "*") {
        return multiply(a, b);
    } else if (operator == "/") {
        return divide(a, b);
    }
}