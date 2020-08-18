const calculator ={
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
  
  };
  
  function inputDigit(digit) {
  
  
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      // Overwrite `displayValue` with the value of the digit that has been ppressed if the current value is '0', otherwise append to it
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  console.log(calculator);
  
  
  function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
        // If the `displayValue` property does not contain a decimal point
        if (!calculator.displayValue.includes(dot)) {
          // Append the decimal point
          calculator.displayValue += dot;
        }
  }
  
  
  function handleOperator(nextOperator) {
        // Destructure the properties on the calculator object
        const { firstOperand, displayValue, operator } = calculator
  
        // `parseFloat` converts the string contents of `displayValue`
        // to a floating-point number
        const inputValue = parseFloat(displayValue);
      
        /*The if statement checks if an operator already exists and if waitingForSecondOperand 
        is set to true. If so, the value of the operator property is replaced with the new operator
         and the function exits so that no calculations are performed. */
        if (operator && calculator.waitingForSecondOperand)  {
          calculator.operator = nextOperator;
          console.log(calculator);
          return;
        }
  
        // verify that `firstOperand` is null and that the `inputValue`
        // is not a `NaN` value
        if (firstOperand === null && !isNaN(inputValue)) {
  
          // Update the firstOperand property
          calculator.firstOperand = inputValue;
        } else if (operator) {
          const result = calculate(firstOperand, inputValue, operator);
      
          calculator.displayValue = String(result);
          calculator.firstOperand = result;
          console.log(result);
        }
      
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
  }
  console.log(calculator);
  
  
  function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
          return firstOperand + secondOperand;
        } else if (operator === '-') {
          return firstOperand - secondOperand;
        } else if (operator === '*') {
          return firstOperand * secondOperand;
        } else if (operator === '/') {
          return firstOperand / secondOperand;
        }
      //if '=' is clicked it will return the secondoperand and evaluate the expression
    return secondOperand; 
  }
      
  //to clear the screen
  function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
  }
  
  
  function updateDisplay() {
        // select the element with class of `calculator-screen`
        const display = document.querySelector('.screen');
        // update the value of the element with the contents of `displayValue`
        display.value = calculator.displayValue;
  }
  updateDisplay();
  
  
  //Getting the keys and listening for the onclick event
  const keys = document.querySelector('.calculator-keys');
  
  keys.addEventListener('click', (event) => {
  // Access the clicked element
  
  const target = event.target;
  
  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches('button')) {
    return;
  }
  
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
  
    return;
  }
  
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
  
    return;
  }
  
  if (target.classList.contains('clear-all')) {
    resetCalculator();
    updateDisplay();
   //console.log('clear', target.value);
    return;
  }
  
  inputDigit(target.value);
  updateDisplay();
  
  });
  
  
  
  
  