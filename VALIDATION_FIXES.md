# Form Validation Logic Fixes

This document records the changes made to `script.js` to fix the issues with multiple error messages appearing simultaneously and stacking up.

## 1. Fixing Sequential Logic (Preventing Double Errors)

**The Problem:**
Previously, the code used separate `if` statements for each check. If a field was empty, it failed the "Blank Check". But then the code _continued_ to the next check (Length Check). Since an empty string has length 0 (which is less than 8), it failed that too. This caused two error messages ("Cannot be blank" AND "Must be 8 characters") to show at once.

**Removed (Old Logic):**

```javascript
// Old sequential checks
if (usernameValue === "") {
  showError(username, "This field cannot be blank");
} else {
  showSuccess(username);
}

// The code would continue running effectively doing this:
if (passwordValue.length >= 8) {
  showSuccess(password);
} else {
  // This runs even if the field is blank!
  showError(password, "Password must be at least 8 characters");
}
```

**Added (New Logic):**
I replaced this with an `if...else if` structure. This creates a chain of potential errors where only the _first_ matching error is triggered.

```javascript
// New exclusive checks
if (passwordValue === "") {
  // 1. Priority One: Check if blank
  showError(password, "This field cannot be blank");
} else if (passwordValue.length < 8) {
  // 2. Priority Two: Check length (ONLY runs if it wasn't blank)
  showError(password, "Password must be at least 8 characters");
} else {
  // 3. Success: Neither error matched
  showSuccess(password);
}
```

**Why this was done:**
This ensures that "Blank" is the highest priority error. If a user hasn't typed anything, we don't bother telling them it's too short—we just tell them it's empty.

---

## 2. Fixing Stacking Messages (Cleanup)

**The Problem:**
Every time the `showError` function ran, it created a _new_ `<small>` element and appended it to the parent. It never checked if one was already there. If a user clicked "Sign Up" 5 times, 5 error messages would pile up on top of each other.

**Removed (Old Logic):**

```javascript
const showError = (input, message) => {
  // ... setup error element ...
  // Blindly adding a new error to the list
  parent.append(error);
  // ...
};
```

**Added (New Logic):**
I added a "Cleanup Step" at the beginning of `showError`. It looks for any existing error message label and removes it before adding the new one.

```javascript
const showError = (input, message) => {
  const parent = input.parentElement;

  // CLEANUP CHECK:
  // Is there already an error message here? If so, delete it.
  const existingError = parent.querySelector("small");
  if (existingError) {
    existingError.remove();
  }

  // Now it is safe to add the new one
  let error = document.createElement("small");
  // ...
};
```

**Why this was done:**
This guarantees that each input field has exactly _zero_ or _one_ error message at any given time, keeping the UI clean.

---

## 3. Cleaning Up on Success

**The Problem:**
Previously, `showSuccess` only changed the border color to green. If an error message text was already there, it might stay visible despite the green border.

**Added (New Logic):**
I added the same cleanup logic to `showSuccess`.

```javascript
const showSuccess = (input) => {
  const parent = input.parentElement;

  // Remove any leftover error text when the user gets it right
  const existingError = parent.querySelector("small");
  if (existingError) {
    existingError.remove();
  }

  parent.className = "input-group success";
};
```
