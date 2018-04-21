(glob => {
  const Data = (() => {
    let
      instance,
      digits = [],
      parsedNumbers = [],
      parsedNumber;

    return () => {
      if (!instance) {
        instance = {
          digits, // array
          parsedNumbers, // array
          parsedNumber, // number
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
      if (!instance) {
        instance = {
          dispatch
        };
      }

      function dispatch() {
        const
          da = Data(), op = Operators(), ui = UI(),
          inputVal = this.value,
          re = /\d|\./g,
          result = re.test(inputVal);

        // Numbers
        if(result) {
          da.digits = da.storeNumbers(inputVal);
          da.parsedNumber = parseFloat(da.digits.join(""), 10);
          ui.displayNumber(da.parsedNumber);
        }
        // Operations
        else {
          switch (inputVal) {
          case "AC":
            op.allClear();
            break;
          case "±":
            op.plusMinus(da.parsedNumber);
            break;
          case "%":
            op.percentage(da.parsedNumber);
            break;
          case "+":
            op.add(da.parsedNumber);
            break;
          case "−":
            op.substract();
            break;
          case "×":
            op.multiple();
            break;
          case "÷":
            op.divide();
            break;
          case "=":
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
      if (!instance) {
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
        const da = Data(), ui = UI();

        da.digits.splice(0, da.digits.length);
        da.parsedNumber = undefined;
        ui.displayNumber("0");
      }

      function plusMinus(input) {
        const da = Data(), ui = UI();
        let output;

        output = input * -1;

        da.parsedNumber = output;
        ui.displayNumber(output);
      }

      function percentage(input) {
        const da = Data(), ui = UI();
        let output;

        output = input / 100;

        da.parsedNumber = output;
        ui.displayNumber(output);
      }

      function add(input) {
        const da = Data();

        da.parsedNumbers.push(input);
        da.digits.length = 0;
      }

      function substract() {}

      function multiple() {}

      function divide() {}

      function sum() {
        const da = Data(), ui = UI();
        let   output;

        // Adding two numbers
        if(da.parsedNumbers.length === 1) {
          output = da.parsedNumbers[0] + da.parsedNumber;
        }
        // Adding more than two numbers
        else {
          output = da.parsedNumbers.reduce((acc, cur) => acc + cur);
        }

        ui.displayNumber(output);
      }

      return instance;
    };
  })();

  const UI = (() => {
    let instance, els = {};

    return () => {
      if (!instance) {
        instance = {
          els,
          getEls,
          displayNumber
        };
      }

      function getEls(el, all) {
        if(all) {
          els[`${el}`] = document.querySelectorAll(el);

          return document.querySelectorAll(el);
        }
        else {
          els[`${el}`] = document.querySelector(el);
 
          return document.querySelector(el);
        }
      }

      function displayNumber(parsedNumber) {
        const display = getEls("#display", false);

        display.innerHTML = parsedNumber;
      }

      return instance;
    };
  })();

  const App = (() => {
    const
      ev = Events(), ui = UI(),
      inputs = ui.getEls("input", true);

    ui.displayNumber(0);

    inputs.forEach(input => {
      input.addEventListener("click", ev.dispatch);
    });
  })();

})(this);