
let container = document.querySelector('.numbersContainer');
let display = document.querySelector('.display');
display.value = '';

let displayString = '';

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let button = document.createElement('button');
        button.textContent = j + 1 + 3 * i;
        button.style.gridColumnStart = j + 1;
        button.style.gridRowStart = i + 1;
        button.style.flexGrow = 1;
        button.classList.add('calcButton');

        container.appendChild(button);
    }
}

let buttons = document.querySelectorAll('.calcButton');
buttons.forEach(button => {
    button.addEventListener('click' ,e => {        
        displayString = displayString.concat(button.textContent);
        display.value = getDisplayValue();
    });
});

document.querySelector('.clearButton').addEventListener('click', e => {
    displayString = '';
    display.value = displayString;
});

document.querySelector('.equalsButton').addEventListener('click', e => {
    let output = calculate();
    display.value = output;
    displayString = (Number(output)) ? output.toString() : '';
});

function calculate() {
    if (checkForErrors()) return "Error";

    let numbers = [];
    let operators = [];

    let lastOperator = -1;
    let currentNumber = '';
    for (let i = 0; i < displayString.length; i++) {
        if (Number(displayString[i])) {
            currentNumber = currentNumber.concat(displayString[i]);
        } else {
            numbers.push(currentNumber);
            currentNumber = '';
            operators.push(displayString[i]);
        }
    }
    numbers.push(currentNumber);

    let answer = 0;
    for (let i = 0; i < operators.length; i++) {
        answer += operate(numbers[i], numbers[i+1], operators[i]);
    }

    console.log(numbers, operators);
    
    return answer;
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
        if (Number(displayString[i])) {
            string = string.concat(displayString[i]);
        } else {
            string = string.concat(' ' + displayString[i] +  ' ');
        }
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