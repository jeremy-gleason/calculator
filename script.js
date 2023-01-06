let runningTotal = null;
let enteredStr = '';
let enteredNum = null;
let operator = '';

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

buttons.forEach(button => {
  button.addEventListener('click', e => handleInput(e.target.value));
});

document.addEventListener('keydown', e => handleInput(e.key));

function handleInput(input) {
  if (!isNaN(input)) {
    if (!enteredStr || enteredStr === '0') {
      enteredStr = input;
    } else {
      enteredStr += input;
    }
    display.textContent = enteredStr;
  } else {
    switch(input) {
      case 'clear':
        enteredStr = '';
        operator = '';
        runningTotal = null;
        display.textContent = '0';
        break;
      case 'sign':
        if (enteredStr) {
          if (enteredStr[0] === '-') {
            enteredStr = enteredStr.slice(1);
          } else {
            enteredStr = '-' + enteredStr;
          }
          display.textContent = enteredStr;
        } else if (runningTotal !== null) {
          runningTotal *= -1;
          display.textContent = runningTotal;
        }
        break;
      case '%':
        if (enteredStr) {
          if (enteredStr.includes('.')) {
            enteredNum = parseFloat(enteredStr);
          } else {
            enteredNum = parseInt(enteredStr);
          }
          enteredStr = '';
        }
        if (enteredNum !== null) {
          enteredNum /= 100;
          display.textContent = enteredNum;
        } else if (runningTotal !== null) {
          runningTotal /= 100;
          display.textContent = runningTotal;
        }
        break;
      case '.':
        if (!enteredStr) {
          enteredStr = '0.';
        } else if (!enteredStr.includes('.')) {
          enteredStr += '.';
        }
        display.textContent = enteredStr;
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        if (enteredNum !== null || enteredStr) {
          if (enteredStr) {
            if (enteredStr.includes('.')) {
              enteredNum = parseFloat(enteredStr);
            } else {
              enteredNum = parseInt(enteredStr);
            }
          }
          if (runningTotal === null || !operator) {
            runningTotal = enteredNum;
            display.textContent = enteredStr;
          } else {
            runningTotal = evaluate(operator, runningTotal, enteredNum);
            display.textContent = runningTotal;
          }
          if (input === '=') {
            operator = '';
          } else {
            operator = input;
          }
          enteredStr = '';
          enteredNum = null;
        } else if (runningTotal !== null) {
          if (input === '=') {
            operator = '';
          } else {
            operator = input;
          }
        }
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

function evaluate(operator, a, b) {
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
