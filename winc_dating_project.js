"use strict";
const mockData = require("./mockData").data;
const prompt = require("prompt-sync")();

//Gebruik dit om testen
// const userProfileMock = {
//   first_name: "djey",
//   last_name: "pocorni",
//   age: 36,
//   gender: "M",
//   gender_interest: "F",
//   location: "city",
//   min_age_interest: 25,
//   max_age_interest: 60,
// };

// User Profile
const userProfile = {};

// Questions for creating a profile
const questions = [
  "What is your first name? ",
  "What is your last name? ",
  "What is your age? ",
  "What is your gender (M/F/X)? ",
  "Which gender are you interested in (M/F/X)? ",
  "What is your location (city/rural)? ",
  "What is the minimum age you are interested in? ",
  "What is the maximum age you are interested in? ",
];

let i = 0; // Begin bij de eerste vraag (index [0])
while (i < questions.length) {
  let answer = prompt(questions[i].trim());
  const capitalizeFirstLetter =
    answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();

  // Sla het antwoord op in het userProfile object op basis van de vraag
  // Controleer of de input geldig is
  // Vraag dezelfde vraag opnieuw als de input ongeldig is

  switch (i) {
    case 0:
      if (answer === "") {
        continue;
      }
      userProfile.firstName = capitalizeFirstLetter;
      break;

    case 1:
      if (answer === "") {
        continue;
      }
      userProfile.lastName = capitalizeFirstLetter;
      break;

    case 2:
      let age = Number(answer);
      if (isNaN(age) || age < 18) {
        continue;
      }
      userProfile.age = age;
      break;

    case 3:
      if (answer !== "m" && answer !== "f" && answer !== "x") {
        continue;
      }
      userProfile.gender = answer.toUpperCase();
      break;

    case 4:
      if (answer !== "m" && answer !== "f" && answer !== "x") {
        continue;
      }
      userProfile.gender_interest = answer.toUpperCase();
      break;

    case 5:
      if (answer !== "city" && answer !== "rural") {
        continue;
      }
      userProfile.location = answer;
      break;

    case 6:
      let minAge = Number(answer);
      if (isNaN(minAge) || minAge < 18) {
        continue;
      }
      userProfile.min_age_interest = minAge;
      break;

    case 7:
      let maxAge = Number(answer);
      if (
        isNaN(maxAge) ||
        maxAge < 18 ||
        maxAge < userProfile.min_age_interest // Controleer of de max_age_interest hoger is dan de min_age_interest
      ) {
        continue;
      }
      userProfile.max_age_interest = maxAge;
      break;
  }

  i++; // Ga door naar de volgende vraag als de huidige vraag correct is beantwoord
}

let matchResults = [];
let numberOfMatches = 0;

for (let datingMatch of mockData) {
  if (
    datingMatch.age >= userProfile.min_age_interest &&
    datingMatch.age <= userProfile.max_age_interest &&
    userProfile.age >= datingMatch.min_age_interest &&
    userProfile.age <= datingMatch.max_age_interest
  ) {
    if (
      userProfile.gender_interest === datingMatch.gender &&
      datingMatch.gender_interest === userProfile.gender
    ) {
      if (userProfile.location === datingMatch.location) {
        matchResults.push([
          datingMatch.first_name,
          datingMatch.age,
          datingMatch.location,
        ]);
        numberOfMatches++;
      }
    }
  }
}

console.log(`You've got ${numberOfMatches} matches!`);
console.table(matchResults);
