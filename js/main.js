"use strict";

// const baseUrl = document.querySelector("#baseUrl").value;
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
const insuranceError = document.querySelector("#insurance-error");

let currentStep = 1;
let check = false;
let checkType = false;

const goNext = (e) => {
	e.preventDefault();
	if (check) {
		currentStep += 1;
		goToStep(currentStep);
		country.classList.remove("error");
		country.nextElementSibling.classList.remove("d-block");
		insuranceError.classList.remove("d-block");
	} else if (country.value == "null") {
		country.classList.add("error");
		country.nextElementSibling.classList.add("d-block");
	} else if (!checkType) {
		insuranceError.classList.add("d-block");
	}
	check = false;
};

const goPrevious = (e) => {
	e.preventDefault();
	currentStep -= 1;
	goToStep(currentStep);
	check = true;
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

const changeImage = (country) => {
	// countryImg.setAttribute("src", `${baseUrl}images/countries/${country}.jpg`);
};

previousButton.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		goPrevious(e);
	});
});
nextButton.onclick = goNext;

countrySelect.addEventListener("change", function (e) {
	changeImage(e.target.value);
	check = true;
	goNext(e);
});

insuranceType.forEach((insurance) => {
	insurance.addEventListener("change", function (e) {
		let type = e.target.value;
		check = true;
		checkType = true;
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
