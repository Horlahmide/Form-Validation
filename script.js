const form = document.querySelector(".login-form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

// Refactored to read value directly from the element.
// This prevents the bug where the Event object was passed as 'value' by addEventListener.
const checkUsername = () => {
  const value = username.value.trim();
  if (value === "") {
    showError(username, "This field cannot be blank");
  } else {
    showSuccess(username);
  }
};
// Event listener now works correctly because checkUsername ignores the passed Event object
username.addEventListener("input", checkUsername);

const checkEmail = () => {
  const value = email.value.trim();
  if (value === "") {
    showError(email, "This field cannot be blank");
  } else if (!value.includes("@") || !value.includes(".")) {
    // Real-time validation: Checks for @ and . immediately as user types
    showError(email, "Enter a valid email");
  } else {
    showSuccess(email);
  }
};
email.addEventListener("input", checkEmail);

const checkPassword = () => {
  const value = password.value.trim();
  if (value === "") {
    showError(password, "This field cannot be blank");
  } else if (value.length < 8) {
    showError(password, "Password must be at least 8 characters");
  } else {
    showSuccess(password);
  }
};
password.addEventListener("input", checkPassword);

const checkConfirmPassword = () => {
  const value = confirmPassword.value.trim();
  const passwordValue = password.value.trim(); // Retrieve current password value for comparison

  if (value === "") {
    showError(confirmPassword, "This field cannot be blank");
  } else if (value !== passwordValue) {
    showError(confirmPassword, "Passwords do not match");
  } else {
    showSuccess(confirmPassword);
  }
};
confirmPassword.addEventListener("input", checkConfirmPassword);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

const checkInputs = () => {
  // Functions now handle fetching values themselves
  checkUsername();
  checkEmail();
  checkPassword();
  checkConfirmPassword();
};

const showError = (input, message) => {
  const parent = input.parentElement;

  // ADDED: Cleanup step to remove ANY existing error messages before adding a new one.
  // This solves the issue of stacking "This field cannot be blank" messages.
  const existingError = parent.querySelector("small");
  if (existingError) {
    existingError.remove();
  }

  // Show the Error message
  let error = document.createElement("small");
  error.style.color = "#dc3545";
  error.textContent = message;
  parent.append(error);

  // Show the error border
  parent.className = "input-group error";
};

const showSuccess = (input) => {
  const parent = input.parentElement;

  // ADDED: Cleanup to remove error messages if the user fixes the input.
  const existingError = parent.querySelector("small");
  if (existingError) {
    existingError.remove();
  }

  parent.className = "input-group success";
};
