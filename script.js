const man = document.getElementById("man");
const steps = document.querySelectorAll(".step");

let currentStep = 0;
let goingUp = true;

function startWalk() {
  currentStep = 0;
  goingUp = true;
  walk();
}

function walk() {
  if (goingUp && currentStep < steps.length) {
    moveToStep(currentStep);
    sinkStep(currentStep);

    if (currentStep > 0) {
      liftStep(currentStep - 1);
    }

    currentStep++;
    setTimeout(walk, 800);

  } else if (!goingUp && currentStep >= 0) {
    moveToStep(currentStep);
    sinkStep(currentStep);

    if (currentStep < steps.length - 1) {
      liftStep(currentStep + 1);
    }

    currentStep--;
    setTimeout(walk, 800);

  } else {
    if (goingUp) {
      goingUp = false;
      currentStep = steps.length - 1;
      setTimeout(walk, 1000);
    } else {
      resetAll();
    }
  }
}

function moveToStep(index) {
  const step = steps[index];
  const stepBottom = parseInt(window.getComputedStyle(step).bottom);

  man.style.bottom = `${stepBottom + 10}px`;
  man.style.left = "60px";
}

function sinkStep(index) {
  if (steps[index]) {
    steps[index].style.transform = "translateY(15px)";
  }
}

function liftStep(index) {
  if (steps[index]) {
    steps[index].style.transform = "translateY(0px)";
  }
}

function resetAll() {
  steps.forEach(step => step.style.transform = "translateY(0px)");
  man.style.bottom = `10px`;
  man.style.left = `30px`;
  currentStep = 0;
  goingUp = true;
}
