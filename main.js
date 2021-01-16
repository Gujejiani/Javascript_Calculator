const buttons = document.querySelectorAll(".btn");

const prevDisplay = document.querySelector(".display-previousNum");
const mainDisplay = document.querySelector(".display-result");

let firstVal = "";
let secondVal = "";
let operation, result, Reset, firstValueAdded;

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const oper = e.target.value;
    let val = Number(e.target.value);
    if (oper === ".") {
      val = oper;
    }

    operationClickedHandler(oper);

    //if value is number and operation does not clicked yet
    if ((val || val === 0) && !operation) {
      if (Reset) {
        console.log("Reseted");
        newOperation();
        result = undefined;
      }
      //geting first  value
      firstVal += e.target.value;
      zeroCheckValidator(firstVal, "first");
      mainDisplay.innerHTML = firstVal;
    }

    //second operator
    if (operation && (val || val === 0)) {
      secondVal += val;
      zeroCheckValidator(secondVal);
      mainDisplay.innerHTML = secondVal;
      console.log("second operation ");
    }

    //reset
    if (oper === "reset") {
      resetAll();
    }
    //DELETE
    if (oper === "delete") {
      if (!firstValueAdded) {
        deleteOperation(firstVal, "first");
      } else {
        deleteOperation(secondVal, "sec");
      }
    }
    //square
    if (oper === "square") {
      square(firstVal);
    }
    if (oper === "%") {
      if (!firstVal) {
        firstVal = "0";
        prevDisplay.innerHTML = "0";
      } else {
        percentageCounter(secondVal);
      }
    }

    if (e.target.value === "=") {
      console.log(firstVal, secondVal, operation); // for testing
    }
    if (e.target.value === "=" && firstVal && secondVal && operation) {
      calc(firstVal, secondVal, operation);
      prevDisplay.innerHTML = `${firstVal} ${operation} ${secondVal} = `;

      operation = undefined;
      Reset = true; //to reset secondVal and prevDisplay in next operation
    }
  });
});
function calc(first, second, operation) {
  let firstV = Number(first);
  let secondV = Number(second);
  if (first && second && operation) {
    switch (operation) {
      case "+":
        result = firstV + secondV;
        mainDisplay.innerHTML = result.toFixed(2);
        break;
      case "-":
        result = firstV - secondV;
        mainDisplay.innerHTML = result.toFixed(2);
        break;
      case "*":
        result = firstV * secondV;
        mainDisplay.innerHTML = result.toFixed(2);
        break;
      case "/":
        result = firstV / secondV;
        mainDisplay.innerHTML = result.toFixed(2);
        break;
      default:
        console.log("error");
        break;
    }
  }
}

//to continue after one operation ended
function newOperation() {
  secondVal = "";
  firstVal = "";
  prevDisplay.innerHTML = "";
  Reset = false;
}

//reseting everithing
function resetAll() {
  firstVal = "";
  secondVal = "";
  prevDisplay.innerHTML = "";
  mainDisplay.innerHTML = "0";
  result = undefined;
  operation = undefined;
  firstValueAdded = undefined;
}

function operationClickedHandler(operator) {
  //checking if operator is clicked
  if (
    operator === "/" ||
    operator === "*" ||
    operator === "-" ||
    operator === "+"
  ) {
    if (!firstVal) {
      firstVal = "0"; //if user first clicked some operator, we display 0 before it
      prevDisplay.innerHTML = firstVal;
    }

    //changing value of our global operation
    operation = operator;
    //changing value to inform our function that user already addded firstVal
    firstValueAdded = true;

    //if result is already there we continuing to display last operation in prevDisplay
    if (result) {
      //displaing last results in prevDisplay area
      prevDisplay.innerHTML = `${result} ${operation}`;
      //updating values
      firstVal = result;
      secondVal = "";
    } else {
      //showing last operations
      prevDisplay.innerHTML = `${firstVal} ${operation}`;
    }
  }
}

function deleteOperation(operationOn, operationVal) {
  let updatedVal = operationOn;

  if (updatedVal) {
    //create array with split
    updatedVal = operationOn.split("");

    //checking if only one number remains in array
    if (updatedVal.length > 1) {
      //removing last item and joining than
      updatedVal.pop();
      updatedVal = updatedVal.join("");
      //update values

      operationVal === "first"
        ? (firstVal = updatedVal)
        : (secondVal = updatedVal);

      mainDisplay.innerHTML = updatedVal;
    } else {
      //if no items set to zero and update
      operationVal === "first" ? (firstVal = "") : (secondVal = "");

      mainDisplay.innerHTML = 0;
    }
  }
}

function square(val) {
  let squared = Number(val);
  if (!result) {
    squared = val * val;
    result = squared;
    mainDisplay.innerHTML = squared;
    prevDisplay.innerHTML = `sqr(${firstVal})`;
  } else {
    squared = result * result;
    mainDisplay.innerHTML = squared;
    prevDisplay.innerHTML = `sqr(${result})`;
    result = squared;
  }
}

function zeroCheckValidator(checking, val) {
  //checking input val starts with zero

  let checkingVal = checking;
  if (checkingVal[0] === "0" && checkingVal[1] === "0") {
    splitPopJoin(checkingVal, val);
  }
  if (checking[0] === ".") {
    firstVal = "0.";
    console.log("sdd");
  }
  if (checking.indexOf(".") !== checking.lastIndexOf(".")) {
    splitPopJoin(checkingVal, val);
  }
}

function splitPopJoin(checkingVal, val) {
  //spliting to array
  checkingVal = checkingVal.split("");

  //deleting last one
  checkingVal.pop();
  //joining array with join which gives us a string
  checkingVal = checkingVal.join("");
  val === "first" ? (firstVal = checkingVal) : (secondVal = checkingVal);
}

function percentageCounter(perc) {
  const devided = perc / 100;
  result = percentageCounter;
  prevDisplay.innerHTML = `${firstVal} * ${devided}`;
  secondVal = devided;
  mainDisplay.innerHTML = secondVal;
}
