// Assignment code here

// this function prompts the user and gets all of the required inputs with validation
// returns this info as an object
var getCriteria = function () {

  var tempLength = "0";
  var numTypes = 0;

  // our criteria object
  var criteriaResults = {
    passLength: 0,
    wantsLower: false,
    wantsUpper: false,
    wantsNum: false,
    wantsSpec: false
  };

  // This while loop error checks for the length and if its a valid input. 
  // if they enter in characters or anything non-numeric this will just keep prompting until valid
  while (parseInt(tempLength) < 8 || parseInt(tempLength) > 128 || isNaN(parseInt(tempLength)) === true) {
    tempLength = prompt("How long would you like the password to be? \n" + "It has to be between 8 and 128 characters long \n", "8");

    // bit cumbersome to have this twice but I wanted to inform the user if their input was invalid
    if (parseInt(tempLength) < 8 || parseInt(tempLength) > 128 || isNaN(parseInt(tempLength)) === true) {
      alert("Invalid input, please try again");
    }
    else {
      criteriaResults.passLength = parseInt(tempLength);
    }
  }

  // Checking to see if theres been at least one criteria selected by using a counter
  // that increments everytime a option is selected
  while (numTypes < 1) {
    criteriaResults.wantsLower = confirm("Would you like lowercase letters included? \n" + "Ok for yes, Cancel for no");
    if (criteriaResults.wantsLower) {
      numTypes++;
    }

    criteriaResults.wantsUpper = confirm("Would you like uppercase letters included? \n" + "Ok for yes, Cancel for no");
    if (criteriaResults.wantsUpper) {
      numTypes++;
    }

    criteriaResults.wantsNum = confirm("Would you like numbers included? \n" + "Ok for yes, Cancel for no");
    if (criteriaResults.wantsNum) {
      numTypes++;
    }

    criteriaResults.wantsSpec = confirm("Would you like special characters included? \n" + "Ok for yes, Cancel for no");
    if (criteriaResults.wantsSpec) {
      numTypes++;
    }

    if (numTypes < 1) {
      alert("Please select at least one type of password criteria!");
    }
  }
  return criteriaResults;
};

// function to generate clean numbers up to a given max
// easier than writing out the math.random each time
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var generatePassword = function () {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var specials = "!#$%&()*+-./:;<=>?@[]^_{|}~";
  var passReq = {};
  var tempPassword = "";
  var password = "default_password";
  var randomSelection = "";

  passReq = getCriteria(); // Getting the password requirements via the get criteria function

  // Because the user can select multiple criteria, the number of potential option combinations is quite vast
  // I came up with this system to randomize all the slected options fairly
  // I basically concat a string with the given numeric options (0,1,2, or 3) based on what the user selects
  // then I randomly select one of the characters in this string, parse it as an int
  // and use it in the switch below to randomly select an option with fair weighting for each

  if (passReq.wantsLower === true) {
    randomSelection += "0";
  }

  if (passReq.wantsUpper === true) {
    randomSelection += "1";
  }

  if (passReq.wantsNum === true) {
    randomSelection += "2";
  }

  if (passReq.wantsSpec === true) {
    randomSelection += "3";
  }

  for (x = 0; x < passReq.passLength; x++) {

    // selecting a random character from the randomSelection string and parsing it as an int for the switch
    switch (parseInt(randomSelection[getRandomInt(randomSelection.length)])) {

      case 0: { // Generate random lowercase letter
        // finding a random char in the alphabet variable and changing it to a lowercase
        tempPassword += (alphabet[getRandomInt(alphabet.length)].toLowerCase());
        break;
      }

      case 1: { // Generate random uppercase letter
        // finding a random char in the alphabet variable and changing it to a uppercase
        tempPassword += (alphabet[getRandomInt(alphabet.length)].toUpperCase());
        break;
      }

      case 2: { // Generate random number
        tempPassword += getRandomInt(10); // generates 0 - 9
        break;
      }

      case 3: { // Generate random special character
        // finding a random char in the specials variable
        tempPassword += (specials[getRandomInt(specials.length)]);
        break;
      }
    }
  }
  password = tempPassword;
  tempPassword = "";
  return password;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);