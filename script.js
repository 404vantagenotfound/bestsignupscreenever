// Get the elements
const signUpBtn = document.getElementById("sign-up-btn");
const stepOne = document.getElementById("step-one");
const stepTwo = document.getElementById("step-two");
const firstNameDropdown = document.getElementById("first-name");
const lastNameDropdown = document.getElementById("last-name");
const nextBtn = document.getElementById("next-btn");
const phoneSlider = document.getElementById("phone-slider");
const phoneDisplay = document.getElementById("phone-display");
const submitBtn = document.getElementById("submit-btn");

// Add click event to the sign-up button
signUpBtn.addEventListener("click", () => {
  // Hide the sign-up button
  signUpBtn.style.display = "none";

  // Show the step one form
  stepOne.style.display = "block";
});

// Function to check if both dropdowns have a valid selection
function checkNextButton() {
  if (
    firstNameDropdown.value !== "select" &&
    lastNameDropdown.value !== "select"
  ) {
    nextBtn.disabled = false; // Enable the next button
  } else {
    nextBtn.disabled = true; // Disable the next button
  }
}

// Add event listeners to dropdowns to check when selection changes
firstNameDropdown.addEventListener("change", checkNextButton);
lastNameDropdown.addEventListener("change", checkNextButton);

// Initial check on load (in case the user doesn’t change anything)
checkNextButton();

// Add click event to the next button to move to Step 2
nextBtn.addEventListener("click", () => {
  // Hide step one
  stepOne.style.display = "none";

  // Show step two
  stepTwo.style.display = "block";
});

// Update phone number display when slider value changes
phoneSlider.addEventListener("input", () => {
  let raw = phoneSlider.value.toString();

  // Add "+" in front always
  let formatted = "+" + raw;

  // Try to format like a normal phone number if long enough
  if (raw.length >= 11) {
    formatted = `+${raw[0]} (${raw.slice(1, 4)}) ${raw.slice(4, 7)}-${raw.slice(
      7,
      11
    )}`;
    if (raw.length > 11) {
      formatted += " " + raw.slice(11); // dump leftovers for max annoyance
    }
  } else if (raw.length >= 7) {
    formatted = `+${raw[0]} (${raw.slice(1, 4)}) ${raw.slice(4, 7)}-${raw.slice(
      7
    )}`;
  } else if (raw.length >= 4) {
    formatted = `+${raw[0]} (${raw.slice(1, 4)}) ${raw.slice(4)}`;
  }

  phoneDisplay.textContent = formatted;
  submitBtn.disabled = false;
});

// Add event listener to the submit button (disabled for now)
// Add event listener to the submit button
submitBtn.addEventListener("click", () => {
  // Hide step two
  stepTwo.style.display = "none";

  // Show step three
  stepThree.style.display = "block";
});

const stepThree = document.getElementById("step-three");
const passwordDisplay = document.getElementById("password-display");
const keyboard = document.getElementById("keyboard");
const finalSubmit = document.getElementById("final-submit");

let password = "";

// Full set of keys (upper, lower, symbols, reset)
const baseKeys = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."!@#$%^&*(),.?"
];
baseKeys.push("RESET");

// Function to shuffle array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function validatePassword(pwd) {
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasSpecial = /[!@#$%^&*(),.?]/.test(pwd);
  return pwd.length >= 8 && hasUpper && hasLower && hasSpecial;
}

function updatePasswordDisplay() {
  if (password.length === 0) {
    passwordDisplay.textContent = "";
  } else {
    let masked = "*".repeat(password.length - 1) + password.slice(-1);
    passwordDisplay.textContent = masked;
  }

  // Only enable Finish if requirements met
  finalSubmit.disabled = !validatePassword(password);
}

// Render keyboard
function renderKeyboard() {
  keyboard.innerHTML = "";
  let keys = shuffle([...baseKeys]);
  keys.forEach((keyChar) => {
    let keyEl = document.createElement("div");
    keyEl.className = "key";
    keyEl.textContent = keyChar;

    if (keyChar === "RESET") {
      keyEl.style.width = "80px"; // make it wider
      keyEl.style.background = "#ffe5e5"; // optional: evil highlight lol
    }

    keyEl.addEventListener("click", () => {
      if (keyChar === "RESET") {
        password = "";
      } else {
        password += keyChar;
      }
      updatePasswordDisplay();
      renderKeyboard(); // shuffle every time
    });

    keyboard.appendChild(keyEl);
  });
}

// Initialize keyboard
renderKeyboard();

finalSubmit.addEventListener("click", () => {
  finalSubmit.textContent = "Loading...";
  finalSubmit.disabled = true;
});


// Example tiny dictionary (replace w/ full English dictionary for max pain)
const dictionary = ["Apple", "Banana", "Chair", "Dog", "Elephant", "Zebra"];

// Populate dropdowns with all dictionary words
function populateDropdown(dropdown, words) {
    dropdown.innerHTML = ""; // clear old options

    // Add default "Select One"
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "select";
    defaultOpt.textContent = "Select One";
    dropdown.appendChild(defaultOpt);

    // Add every word
    words.forEach(word => {
        const opt = document.createElement("option");
        opt.value = word;
        opt.textContent = word;
        dropdown.appendChild(opt);
    });
}

// Call this on load
populateDropdown(firstNameDropdown, dictionary);
populateDropdown(lastNameDropdown, dictionary);

