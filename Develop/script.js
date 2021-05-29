// Assignment code here

/*
  length,  8 - 128 Chars 
  character types, lower upper num and/or special 
  validate input, one char type selected
*/

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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var generatePassword = function () {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var specials = "!#$%&()*+-./:;<=>?@[]^_{|}~";
  var passReq = {};
  var tempPassword = "";
  var password = "default_password";

  passReq = getCriteria(); // Getting the password requirements via the get criteria function

  for(x = 0; x < passReq.passLength; x++) {
    console.log(getRandomInt(3));
    console.log(password[x]);

    switch (getRandomInt(3)) {
      case 0: // Generate random uppercase letter
        break;
      case 1:
        break;
      case 2:
         break;
      case 3:
         break;
    }

  }
  /* 
  passLength: 0,
  wantsLower: false,
  wantsUpper: false,
  wantsNum: false,
  wantsSpec: false
  */     

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
