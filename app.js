(glob => {

  const Data = (() => {
    let instance,
        digits = [];

    return () => {
      if(!instance) {
        instance = {
          storeNumbers,
          joinNumbers
        };
      }
      
      function storeNumbers(inputVal) {
        digits.push(inputVal);

        return digits;
      }
      
      function joinNumbers(digits) {
        let joinedDigits;
        
        joinedDigits = digits.join('');

        return joinedDigits;
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
        const data = Data(),
              ui = UI(),
              
              inputVal = this.value,
              re = /\d|\./g,
              result = re.test(inputVal);
    
        if(result) {
          let digits,
              parsedNumbers;

          digits = data.storeNumbers(inputVal);
          parsedNumbers = parseFloat(data.joinNumbers(digits), 10);
          
          ui.displayNumber(parsedNumbers);
        }
        else {
          console.log('Operation.');
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
          add,
          substract,
          multiple,
          divide,
          plusMinus,
          percentage,
          allClear
        };
      }

      function add() {
        console.log('Add.');
      }

      function substract() {
        console.log('Substract.');
      }

      function multiple() {
        console.log('Multiple.');
      }

      function divide() {
        console.log('Divide.');
      }

      function plusMinus() {
        console.log('Plus/minus.');
      }

      function percentage() {
        console.log('Percentage.');
      }

      function allClear() {
        console.log('AC.');
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

      function displayNumber(inputVal) {
        const display = document.querySelector('#display');
        display.innerHTML = inputVal;
      }

      return instance;
    };

  })();

  const App = ((Events) => {
    const ev = Events(),
          inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
      input.addEventListener('click', ev.dispatch);
    });

  })(Events);

})(this);