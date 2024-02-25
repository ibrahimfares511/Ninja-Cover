"use strict";

const stepBoxes = Array.from(document.querySelectorAll(".step-content-box"));
const nextButton = document.querySelector("#next_step");
const previousButton = document.querySelector("#prev_step");
const endStepButton = document.querySelector("#end_step");
const indicators = document.querySelectorAll(".indicator span");
let currentStep = 1;

const goNext = (e) => {
	e.preventDefault();
	currentStep += 1;
	goToStep(currentStep);
};

const goPrevious = (e) => {
	e.preventDefault();
	currentStep -= 1;
	goToStep(currentStep);
};

const submitted = (e) => {
	e.preventDefault();
	console.log("Submitted");
};

const goToStep = (stepNumber) => {
	let currentStepBox = document.querySelector(`.step-${stepNumber}`);
	stepBoxes.forEach((box) => box.classList.remove("show"));
	currentStepBox.classList.add("show");

	indicators.forEach((indicator, index) => {
		index + 1 <= stepNumber
			? indicator.classList.add("active")
			: indicator.classList.remove("active");
	});

	if (stepNumber === 1) {
		previousButton.classList.add("hidden");
	} else if (stepNumber < stepBoxes.length) {
		previousButton.classList.remove("hidden");
		nextButton.classList.remove("hidden");
		endStepButton.classList.add("hidden");
	} else if (stepNumber === stepBoxes.length) {
		nextButton.classList.add("hidden");
		endStepButton.classList.remove("hidden");
	}
};

previousButton.onclick = goPrevious;
nextButton.onclick = goNext;
endStepButton.onclick = submitted;

goToStep(currentStep);
