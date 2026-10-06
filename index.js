

function operate(operator, firstNumber, secondNumber) {

switch (operator) {
  case "+":
    return firstNumber + secondNumber;
    
  case "-":
    return firstNumber - secondNumber;
    
  case "*":
    return firstNumber * secondNumber;
    
  case "/":
    return firstNumber / secondNumber;
   
  default:
    return "Invalid Operator"
}}

const number = document.querySelector(".numbers");
const result = document.querySelector(".result")
const operation = document.querySelector(".operators");
const equals = document.querySelector(".equals")

let firstNumber;
let operator;
let secondNumber;
let calculation;

let justCalculated = false;

number.addEventListener("click", (event) => {
    const clickedButton = event.target.textContent;

    if (justCalculated) {
        result.textContent = "";
        firstNumber = undefined;
        operator = undefined;
        secondNumber = undefined;
        calculation = undefined;
        justCalculated = false;
    }

    result.textContent += clickedButton;
});

operation.addEventListener("click", (event) => {
    const tempop = event.target.textContent;

    if (tempop === "Clear") {
        result.textContent = "";
        firstNumber = undefined;
        operator = undefined;
        secondNumber = undefined;
        calculation = undefined;
        justCalculated = false;
        return;
    }

    if (tempop === "=") {
        return;
    }

    if (justCalculated) {
        operator = tempop;
        result.textContent = "";
        secondNumber = undefined;
        justCalculated = false;
        return;
    }

    if (result.textContent === "") {
        operator = tempop; // 12 + -

    } else if (firstNumber === undefined) {
        firstNumber = result.textContent; // 12 +
        operator = tempop;
        result.textContent = "";

    } else {
        secondNumber = result.textContent; // 12 + 7 -
        firstNumber = operate(operator,Number(firstNumber),Number(secondNumber));

        operator = tempop;
        result.textContent = "";
        secondNumber = undefined;
    }
});


equals.addEventListener("click", () => {
    secondNumber = result.textContent;
    calculation =  operate(operator, Number(firstNumber), Number(secondNumber));
    result.textContent = calculation; 
    firstNumber = calculation;
    secondNumber = undefined; 
    justCalculated = true;
})


