function operate(operator, firstNumber, secondNumber) {
    
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
    
        case "-":
            result = firstNumber - secondNumber;
            break;
    
        case "*":
            result = firstNumber * secondNumber;
            break;
    
        case "/":
            if (secondNumber == 0) {
                return "Hey Bro NO Using Power of Gojo's Infinity";
            } else {
                result =  firstNumber / secondNumber;
            }
            break;
            
        default:
            return "Invalid Operator"
    }
    
    return Number(result.toFixed(4));
}

const number = document.querySelector(".numbers");
const result = document.querySelector(".result")
const operation = document.querySelector(".operators");
const equals = document.querySelector(".equals")
const buttons = number.querySelectorAll("button");
const operatorButtons = operation.querySelectorAll("button");

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

   if (result.textContent.includes(".") && clickedButton == ".") {
    return;
} else {
    result.textContent += clickedButton;
}

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

    if (tempop === "Backspace") {
    result.textContent = result.textContent.slice(0, -1);
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
    if (justCalculated) {
    return;
    }
    if (firstNumber == undefined || operator == undefined || result.textContent == "") {
        return;
    } else {
        secondNumber = result.textContent;
        calculation = operate(operator,Number(firstNumber),Number(secondNumber));
    }
    result.textContent = calculation;

    if (typeof calculation === "string") {
        firstNumber = undefined;
        operator = undefined;
    } else {
        firstNumber = calculation; }
    
    secondNumber = undefined; 
    justCalculated = true;

});

document.addEventListener("keydown", (event) => {

    for (const button of buttons) {
        if (button.textContent === event.key) {                                     // Numbers and decimal
            button.click();
            return;
        }
    }   // Numbers and decimal

    for (const button of operatorButtons) {
        if (button.textContent === event.key) {                                    // Operators
            button.click();
            return;
        }
    }   // Operators

    if (event.key === "Enter" || event.key === "=") {                              // Enter or =
        equals.click();
        return;
    }   // Enter or =

    if (event.key === "Escape") {
        const clearButton = operation.querySelector(".clear");                     // Escape = Clear
        clearButton.click();
        return;
    }   // Escape = Clear

    
    if (event.key === "Backspace") {                                               // Backspace
        const backspaceButton = operation.querySelector(".backspace");
        backspaceButton.click();
        return;
    }   
});