import { Given, When, Then } from "@cucumber/cucumber";

let num1: number;
let num2: number;
let sum: number;

Given("Numbers are provided", function () {
	num1 = 5;
	num2 = 10;
	return console.log("Numbers are " + num1 + " and " + num2);
});

When("Sum up both numbers here", function () {
	sum = num1 + num2;
	return console.log("Addition is performed here");
});

Then("Display sum of numbers", function () {
	return console.log("Sum of numbers are: " + sum);
});
