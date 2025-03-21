let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null; // Сброс предыдущего оператора
            break;
        case '=':
            if (previousOperator === null) {
                return; // Ничего не делать, если нет предыдущей операции
            }
            flushOperation(parseFloat(buffer)); // Используйте parseFloat для поддержки дробных чисел
            previousOperator = null; 
            buffer = runningTotal.toString(); // Преобразуйте в строку перед присвоением
            runningTotal = 0; // Сбросить значение после вычисления
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return; // Не делать ничего, если буфер пустой
    }

    const intBuffer = parseFloat(buffer); // Используйте parseFloat для поддержки дробных чисел

    if (runningTotal === 0) {
        runningTotal = intBuffer; // Установите начальное значение
    } else {
        flushOperation(intBuffer); // Примените предыдущую операцию
    }
    
    previousOperator = symbol; // Сохраните текущую операцию
    buffer = '0'; // Сбросить буфер для следующего числа
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString; // Если буфер пустой, замените его на новое число
    } else {
        buffer += numberString; // Добавьте новое число к буферу
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();
