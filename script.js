
const previousOperandText = document.querySelector('.previous-operand');
const currentOperandText = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;


function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return; 
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = current === 0 ? 'Error' : prev / current; 
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

function updateDisplay() {
    currentOperandText.innerText = currentOperand;
    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

// Event Listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (button.classList.contains('operator')) {
            chooseOperation(value);
        } else if (button.classList.contains('equals')) {
            compute();
        } else if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('delete')) {
            deleteNumber();
        } else {
            appendNumber(value);
        }

        updateDisplay();
    });
});

// Initial Display
updateDisplay();
