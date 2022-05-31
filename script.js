class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if(number == '.' && this.currentOperand.includes('.')) {
            console.info('Attempting to add a decimal where one already exists');
        } else if(isNaN(number) && number != '.') {
            console.info('Error: Non numerical value entered!');
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
        console.log(this.currentOperand);
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        let symbols = ['+', '-', '*', '/'];
        if(this.currentOperand == '') {
            return;
        } 
        if(this.previousOperand != '') {
            this.compute();
        } 
        if(symbols.includes(operation)) {
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';   
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) {
            return;
        }

        switch(this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        
    }

    getDisplayNumber(number) {
       const floatNumber = parseFloat(number);
       if(isNaN(floatNumber)) {
           return '';
       } else {
           return floatNumber.toLocaleString('en');
       }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.operation != null 
            ? this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
            : this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

window.addEventListener('keypress', (event) => {
    console.log(event);
    let key = parseFloat(event.key);
    if(isNaN(key) && event.key != '.') {
        calculator.chooseOperation(event.key);
    } else {
        if(isNaN(key)) {
            calculator.appendNumber(event.key);
        } else {
            calculator.appendNumber(key);
        }
    }
    calculator.updateDisplay();
});

window.addEventListener('keydown', (event) => {
    console.log(event);
    const key = event.code;
    if(key == 'Backspace') {
        calculator.delete();
    }
})