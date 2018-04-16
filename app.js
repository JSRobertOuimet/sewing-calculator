(glob => {

  const Data = (() => {
    let instance,
        digits = [0];

    return () => {
      if(!instance) {
        instance = {
          digits,
          storeNumbers
        };
      }

      function storeNumbers(inputVal) {
        if(inputVal === '0') {
          digits.shift();
          digits.push(inputVal);
        }
        else {
          digits.push(inputVal);
        }

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
        const da = Data(),
              op = Operators(),
              ui = UI(),

              inputVal = this.value,
              re = /\d|\./g,
              result = re.test(inputVal);

        if(result) {
          let digits,
              parsedNumber;

          digits = da.storeNumbers(inputVal);
          parsedNumber = parseFloat(digits.join(''), 10);

          ui.displayNumber(parsedNumber);
        }
        else {
          switch(inputVal) {
            case 'AC':
              op.allClear();
              break;
            case '±':
              op.plusMinus();
              break;
            case '%':
              op.percentage();
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
          plusMinus,
          percentage,
          allClear,
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

      function plusMinus() {
        console.log('Plus/minus');
      }

      function percentage() {
        console.log('Percentage');
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
        const da = Data();
        const display = document.querySelector('#display');

        display.innerHTML = parsedNumber;
      }

      return instance;
    };

  })();

  const App = (() => {
    const da = Data(),
          ev = Events(),
          ui = UI(),
          inputs = document.querySelectorAll('input');

    ui.displayNumber(da.digits);

    inputs.forEach(input => {
      input.addEventListener('click', ev.dispatch);
    });

  })();

})(this);