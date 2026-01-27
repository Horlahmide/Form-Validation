const form = document.querySelector(".login-form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

const checkInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  // USERNAME CHECK
  // Logic: Check if empty.
  if (usernameValue === "") {
    showError(username, "This field cannot be blank");
  } else {
    showSuccess(username);
  }

  // EMAIL CHECK
  // REMOVED: Separate if statement for format check that ran even if field was empty.
  // ADDED: else-if block to ensure we only show one error at a time (Priority: Empty check -> Format check).
  if (emailValue === "") {
    showError(email, "This field cannot be blank");
  } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
    // Note: Kept original simple validation logic (includes @ and .) but inverted it for the error condition
    showError(email, "Enter a valid email");
  } else {
    showSuccess(email);
  }

  // PASSWORD CHECK
  // REMOVED: Separate if statement for length check that ran validation on empty strings.
  // ADDED: else-if structure to stop validating if the field is already blank.
  if (passwordValue === "") {
    showError(password, "This field cannot be blank");
  } else if (passwordValue.length < 8) {
    showError(password, "Password must be at least 8 characters");
  } else {
    showSuccess(password);
  }

  // CONFIRM PASSWORD CHECK
  // ADDED: else-if to prevent "Passwords do not match" error when the field is just empty.
  if (confirmPasswordValue === "") {
    showError(confirmPassword, "This field cannot be blank");
  } else if (confirmPasswordValue !== passwordValue) {
    showError(confirmPassword, "Passwords do not match");
  } else {
    showSuccess(confirmPassword);
  }
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
