const bmiHandler = async (event) => {
  event.preventDefault();
  console.log("in function");

  const weight = parseFloat(document.querySelector("#weight").value);
  const height = parseFloat(document.querySelector("#height").value);
  const resultElement = document.querySelector("#result");

  const calcBMI = (weight, height) => {
    const result = weight / (height * height);
    return result;
  };

  const bmiResult = calcBMI(weight, height);
  console.log(bmiResult);
  resultElement.innerHTML = `Your BMI is: ${bmiResult}`;

  if (bmiResult >= 18.5 && bmiResult <= 24.9) {
    window.location.href = "/normal";
  } else {
    alert("Not normal BMI");
  }
};

document.querySelector(".BMI-calculator").addEventListener("click", bmiHandler);
