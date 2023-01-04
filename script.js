let runningTotal = 0;
let displayStr = '0';
let lastOperator = '';

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

buttons.forEach(button => {
  button.addEventListener('click', e => handleInput(e.target.value));
});

document.addEventListener('keydown', e => handleInput(e.key));

function handleInput(input) {
  if (!isNaN(input)) {
    displayStr = displayStr === '0' ? input : displayStr + input;
    display.textContent = displayStr;
  } else {
    switch(input) {
      case 'clear':
        displayStr = '0';
        lastOperator = '';
        display.textContent = displayStr;
        break;
      case 'sign':
        if (displayStr[0] === '-') {
          displayStr = displayStr.slice(1);
        } else {
          displayStr = '-' + displayStr;
        }
        display.textContent = displayStr;
        break;
      case '.':
        if (!displayStr.includes('.')) {
          displayStr += '.';
          display.textContent = displayStr;
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        let displayNum;
        if (displayStr.includes('.')) {
          displayNum = parseFloat(displayStr);
        } else {
          displayNum = parseInt(displayStr);
        }
        if (lastOperator) {
          runningTotal = operate(lastOperator, runningTotal, displayNum);
        } else {
          runningTotal = displayNum;
        }
        lastOperator = input;
        displayStr = '0';
        display.textContent = runningTotal;
        break;
    }
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
      break;
    case '-':
      return subtract(a, b);
      break;
    case '*':
      return multiply(a, b);
      break;
    case '/':
      return divide(a, b);
      break;
  }
}
