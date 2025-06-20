const display = document.querySelector('.display');
const outerDisplay = document.querySelector('.outerDisplay');
const digits = document.querySelectorAll('.digit');
let numberOne = '';
let numberTwo = '';
let operator = '';
let isClicked = false;
let operationDone = false;
let threshold = 12;

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+' : return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  }
}

function scrollToRight() {
  display.scrollLeft = display.scrollWidth;
  outerDisplay.scrollLeft = outerDisplay.scrollWidth;
}

digits.forEach(button => {button.addEventListener('click', () => {
  if (!isClicked && button.textContent === '.' && numberOne.includes('.')) {
    return;
  } else if (isClicked && button.textContent === '.' && numberTwo.includes('.')) {
    return;
  };

  if (display.textContent === 'Error') {
    display.textContent = '';
    outerDisplay.textContent = '';
    numberOne = '';
    numberTwo = '';
    operator = '';
    isClicked = false;
    operationDone = false;
  }
  if (operationDone) {
    display.textContent = '';
    outerDisplay.textContent = '';
    numberOne = '';
    numberOne += button.textContent;
    numberTwo = '';
    operator = '';
    display.textContent = numberOne;
    operationDone = false;
    scrollToRight();
    return;
  } 
  
  if (!isClicked) {
    numberOne += button.textContent;
    display.textContent = numberOne;
  } else {
    numberTwo += button.textContent;
    display.textContent = numberOne + operator + numberTwo;
  }
  scrollToRight();
})})

document.querySelectorAll('.operator').forEach(button => {button.addEventListener('click', () => {
  if (display.textContent === 'Error') {
    return;
  }
  if (operationDone) {
    numberOne = display.textContent;
    numberTwo = '';
    operator = button.textContent;
    isClicked = true;
    operationDone = false;
    display.textContent = numberOne + operator;
  } else if (isClicked && numberTwo !== '') {
    let result = operate(numberOne, numberTwo, operator);
    if(!isFinite(result)) {
      display.textContent = 'Error';
      numberOne = '';
      numberTwo = '';
      operator = '';
      scrollToRight();
      return;
    }
    result = (result % 1 !== 0 && result.toString().split('.')[1].length > 2) ? Number(result.toFixed(2)) : result;    display.textContent = result;
    numberOne = result;
    numberTwo = '';
  }
  isClicked = true;
  operator = button.textContent;  
  display.textContent = numberOne + operator;
  scrollToRight();
})})

document.querySelector('.equals').addEventListener('click', () => {
  let result = operate(numberOne, numberTwo, operator);
  if (!isFinite(result)) {
      display.textContent = 'Error';
      outerDisplay.textContent = '';
      numberOne = '';
      numberTwo = '';
      operator = '';
      scrollToRight();
      console.log(numberOne, operator, numberTwo)
      return;
    }    
  result = (result % 1 !== 0 && result.toString().split('.')[1].length > 2) ? Number(result.toFixed(2)) : result;
  display.textContent = result;
  outerDisplay.textContent = numberOne + operator + numberTwo;
  isClicked = false;
  numberOne = display.textContent;
  numberTwo = '';
  operator = '';
  operationDone = true;
  scrollToRight();
})

document.querySelector('.clear').addEventListener('click', () => {
  display.textContent = '';
  outerDisplay.textContent = '';
  isClicked = false;
  numberOne = '';
  numberTwo = '';
  operator = '';
  scrollToRight();
})

document.querySelector('.delete').addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, -1);
  if (operationDone) {
    return;
  }

  if (!isClicked) {
    numberOne = numberOne.slice(0, -1);
  } else if (isClicked && numberTwo === '') {
    operator = operator.slice(0, -1);
  } else {
    numberTwo = numberTwo.slice(0, -1);
  }
  scrollToRight();
})

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isClicked && key === '.' && numberOne.includes('.')) {
    return;
  } else if (isClicked && key === '.' && numberTwo.includes('.')) {
    return;
  };

  if (key >= 0 && key <= 9 || key === '.') {

    if (display.textContent === 'Error') {
    display.textContent = '';
    outerDisplay.textContent = '';
    numberOne = '';
    numberTwo = '';
    operator = '';
    isClicked = false;
    operationDone = false;
    }
    if (operationDone) {
      display.textContent = '';
      outerDisplay.textContent = '';
      numberOne = key;
      numberTwo = '';
      operator = '';
      display.textContent = numberOne;
      operationDone = false;
      scrollToRight();
      return;
    } 
    
    if (!isClicked) {
      numberOne += key;
      display.textContent = numberOne;
    } else {
      numberTwo += key;
      display.textContent = numberOne + operator + numberTwo;
    }
    scrollToRight();
  } else if (['+', '-', '*', '/'].includes(key)) {
      if (display.textContent === 'Error') {
        return;
      }
      if (operationDone) {
      numberOne = display.textContent;
      numberTwo = '';
      operator = key;
      isClicked = true;
      operationDone = false;
      display.textContent = numberOne + operator;
      } else if (isClicked && numberTwo !== '') {
      let result = operate(numberOne, numberTwo, operator);
      if(!isFinite(result)) {
        display.textContent = 'Error';
        numberOne = '';
        numberTwo = '';
        operator = '';
        scrollToRight();
        return;
      }
      result = result.toString().length > 4 ? result.toFixed(2) : result;
      display.textContent = result;
      numberOne = result;
      numberTwo = '';
      }
      isClicked = true;
      operator = key;
      display.textContent = numberOne + operator;
      scrollToRight();
    } else if (key === 'Enter' || key === '=') {
      let result = operate(numberOne, numberTwo, operator);
      if (!isFinite(result)) {
        display.textContent = 'Error';
        outerDisplay.textContent = '';
        isClicked = false;
        numberOne = '';
        numberTwo = '';
        operator = '';
        scrollToRight();
        return;
      } 
      result = (result % 1 !== 0 && result.toString().split('.')[1].length > 2) ? Number(result.toFixed(2)) : result;
      display.textContent = result;
      outerDisplay.textContent = numberOne + operator + numberTwo;
      numberOne = display.textContent;
      numberTwo = '';
      operator = '';
      operationDone = true;
      scrollToRight();
    } else if (key === 'Escape') {
      display.textContent = '';
      outerDisplay.textContent = '';
      isClicked = false;
      numberOne = '';
      numberTwo = '';
      operator = '';
      scrollToRight();
    } else if (key === 'Backspace') {
      display.textContent = display.textContent.slice(0, -1);
      if (!isClicked) {
        numberOne = numberOne.slice(0, -1);
      } else if (isClicked && numberTwo === '') {
        operator = operator.slice(0, -1);
      } else {
        numberTwo = numberTwo.slice(0, -1);
      }
      scrollToRight();
    }
})