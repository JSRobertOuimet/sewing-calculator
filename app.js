(function(window) {

  const inputs = document.querySelectorAll('input');

  inputs.forEach(input => {
    input.addEventListener('click', action);
  });

  function action() {
    const inputVal = this.value,
          re = /\d/g,
          result = re.test(inputVal);

    if(result === true) {
      // convert to number and store in array
      displayNumber(inputVal);
    }
    else {
      console.log('Operation or dot.');
    }
  }

  function displayNumber(inputVal) {
    const display = document.querySelector('#display');
    display.innerHTML = inputVal;
  }

})(this);