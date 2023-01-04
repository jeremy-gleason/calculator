let runningTotal = 0;
let displayStr = '0';
let lastOperator = '';

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

buttons.forEach(button => {
  button.addEventListener('click', handleInput);
});

function handleInput(e) {
  if (!isNaN(e.target.value)) {
    displayStr = displayStr === '0' ? e.target.value : displayStr + e.target.value;
    display.textContent = displayStr;
  } else {
    switch(e.target.value) {
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
        lastOperator = e.target.value;
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
