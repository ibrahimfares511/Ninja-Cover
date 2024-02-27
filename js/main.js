"use strict";

const stepBoxes = Array.from(document.querySelectorAll(".step-content-box"));
const stepButtons = document.querySelector(".step-buttons");
const nextButton = document.querySelector("#next_step");
const previousButton = document.querySelectorAll(".prev-step");
const endStepButton = document.querySelector("#end_step");
const indicators = document.querySelectorAll(".indicator span");
const countrySelect = document.querySelector("#country");
const countryImg = document.querySelector(".step-image img");
const insuranceType = document.querySelectorAll(
	'input[name="insurance_type"][type="radio"]'
);
const typeForms = document.querySelectorAll(".type-form");
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
		previousButton[previousButton.length - 1].classList.add("hidden");
	} else if (stepNumber < stepBoxes.length) {
		previousButton[previousButton.length - 1].classList.remove("hidden");
		nextButton.classList.remove("hidden");
		endStepButton.classList.add("hidden");
		stepButtons.classList.remove("d-none");
	} else if (stepNumber === stepBoxes.length) {
		stepButtons.classList.add("d-none");
	}
};

const changeImag = (country) => {
	countryImg.setAttribute("src", `./images/countries/${country}.jpg`);
};

previousButton.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		goPrevious(e);
	});
});
nextButton.onclick = goNext;

countrySelect.addEventListener("change", function (e) {
	changeImag(e.target.value);
	goNext(e);
});

insuranceType.forEach((insurance) => {
	insurance.addEventListener("change", function (e) {
		let type = e.target.value;
		goNext(e);
		typeForms.forEach((typeF) => {
			typeF.classList.remove("show");
			typeF.classList.contains(`${type}-form`)
				? typeF.classList.add("show")
				: false;
		});
	});
});

goToStep(currentStep);
