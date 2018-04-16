(glob => {

  const Data = (() => {
    let instance,
        digits = [],
        number;

    return () => {
      if(!instance) {
        instance = {
          digits,
          number,
          storeNumbers
        };
      }

      function storeNumbers(inputVal) {
        digits.push(inputVal);

        return digits;
      }

      return instance;
    };

  })();

  const Events = (() => {
    let instance;

    return () => {
      if(!instance) {
        instance = {
          dispatch
        };
      }

      function dispatch() {
        const da = Data(), op = Operators(), ui = UI(),
              inputVal = this.value,
              re = /\d|\./g,
              result = re.test(inputVal);

        if(result) {
          let digits,
              parsedNumber;

          digits = da.storeNumbers(inputVal);
          da.number = parseFloat(digits.join(''), 10);

          ui.displayNumber(da.number);
        }
        else {
          switch(inputVal) {
            case 'AC':
              op.allClear();
              break;
            case '±':
              op.plusMinus(da.number);
              break;
            case '%':
              op.percentage(da.number);
              break;
            case '+':
              op.add();
              break;
            case '−':
              op.substract();
              break;
            case '×':
              op.multiple();
              break;
            case '÷':
              op.divide();
              break;
            case '=':
              op.sum();
              break;
          }
        }
      }

      return instance;
    };

  })();

  const Operators = (() => {
    let instance;

    return () => {
      if(!instance) {
        instance = {
          allClear,
          plusMinus,
          percentage,
          add,
          substract,
          multiple,
          divide,
          sum
        };
      }

      function allClear() {
        console.log('AC');
      }

      function plusMinus(input) {
        const da = Data(), ui = UI();
        let output;

        output = input * -1;

        da.number = output;
        ui.displayNumber(output);
      }

      function percentage(input) {
        const da = Data(), ui = UI();
        let output;

        output = input / 100;
        da.number = output;
        ui.displayNumber(output);
      }

      function add() {
        console.log('Add');
      }

      function substract() {
        console.log('Substract');
      }

      function multiple() {
        console.log('Multiple');
      }

      function divide() {
        console.log('Divide');
      }

      function sum() {
        console.log('Sum');
      }

      return instance;
    };

  })();

  const UI = (() => {
    let instance;

    return () => {
      if(!instance) {
        instance = {
          displayNumber
        };
      }

      function displayNumber(parsedNumber) {
        const display = document.querySelector('#display');

        display.innerHTML = parsedNumber;
      }

      return instance;
    };

  })();

  const App = (() => {
    const da = Data(), ev = Events(), ui = UI(),
          inputs = document.querySelectorAll('input');

    ui.displayNumber('0');

    inputs.forEach(input => {
      input.addEventListener('click', ev.dispatch);
    });

  })();

})(this);