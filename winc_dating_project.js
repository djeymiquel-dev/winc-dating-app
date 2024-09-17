"use strict";
const mockData = require("./mockData").data;
const prompt = require("prompt-sync")();

// //Use this to test if everything is working correctly
// const userProfile = {
//   first_name: "",
//   last_name: "",
//   age: ,
//   gender: "",
//   gender_interest: "",
//   location: "",
//   min_age_interest: ,
//   max_age_interest: ,
// };

// User Profile
const userProfile = {};

// Questions for creating a profile
const questions = [
  "What is your First name? ",
  "and your Last name? ",
  "What is your age? ",
  "What is your gender identity? (M/F/X) ",
  "Which gender are you interested in? (M/F/X) ",
  "What is your location? (city/rural) ",
  "Could you please specify the minimum age you are interested in? ",
  "And the maximum age? ",
];

let i = 0; // Starts question @ (index [0])
while (i < questions.length) {
  let answer = prompt(questions[i].trim());

  // variables for evaluating valid inputs
  const notAllowedInput = "0123456789".split("");
  const capitalizedName =
    answer.split("", 1).join().toUpperCase() + answer.slice(1).toLowerCase();
  const emptyString = "";
  const genderCapitalized = answer.toUpperCase();
  const genderInterestCapitalized = answer.toUpperCase();
  const age = Number(answer);
  const minAge = Number(answer);
  const maxAge = Number(answer);

  // Store answer based on the given question
  // Check if input is valid
  // Prompt question again if answer is invalid
  let inputIsValid = true;
  switch (i) {
    case 0:
      // check if answer includes numbers
      for (let char of answer) {
        if (notAllowedInput.includes(char)) {
          inputIsValid = false;
          break;
        }
      }
      if (!inputIsValid) {
        continue;
      } else if (answer === emptyString) {
        continue;
      } else {
        userProfile.first_name = capitalizedName;
        break;
      }

    case 1:
      for (let char of answer) {
        if (notAllowedInput.includes(char)) {
          inputIsValid = false;
          break;
        }
      }
      if (!inputIsValid) {
        continue;
      } else if (answer === emptyString) {
        continue;
      } else {
        userProfile.lastName = capitalizedName;
        break;
      }

    case 2:
      if (isNaN(age) || age < 18) {
        continue;
      } else {
        userProfile.age = age;
        break;
      }

    case 3:
      if (
        genderCapitalized !== "M" &&
        genderCapitalized !== "F" &&
        genderCapitalized !== "X"
      ) {
        continue;
      } else {
        userProfile.gender = genderCapitalized;
        break;
      }

    case 4:
      if (
        genderInterestCapitalized !== "M" &&
        genderInterestCapitalized !== "F" &&
        genderInterestCapitalized !== "X"
      ) {
        continue;
      } else {
        userProfile.gender_interest = genderInterestCapitalized;
        break;
      }

    case 5:
      if (answer !== "city" && answer !== "rural") {
        continue;
      } else {
        userProfile.location = answer;
        break;
      }

    case 6:
      if (isNaN(minAge) || minAge < 18) {
        continue;
      } else {
        userProfile.min_age_interest = minAge;
        break;
      }

    case 7:
      if (
        isNaN(maxAge) ||
        maxAge < 18 ||
        maxAge < userProfile.min_age_interest // Check if the max_age_interest is not < less than min_age_interest (max_age:30 < min_:32 ?)
      ) {
        continue;
      } else {
        userProfile.max_age_interest = maxAge;
        break;
      }
  }

  i++; // Go to next question if answer is correct
}

// Check if there is a match based on the criteria
// Count the number of matches found
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

const heart = "❤️";
if (numberOfMatches === 1) {
  console.log(`You have ${numberOfMatches} match ${heart} !`);
} else {
  console.log(`You have ${numberOfMatches} matches${heart} !`);
}
console.table(matchResults);
