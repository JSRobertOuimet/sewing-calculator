(glob => {

  const Data = (() => {

    let instance;
    let digits = [];

    
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

  const Operations = (() => {

    let instance;

    return () => {
      if(!instance) {
        instance = {
          action
        };
      }

      function action() {
        const data = Data(),
              ui = UI();

        const inputVal = this.value,
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

  const App = ((Operation) => {

    const op = Operations(),
          inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
      input.addEventListener('click', op.action);
    });

  })(Operations);

})(this);