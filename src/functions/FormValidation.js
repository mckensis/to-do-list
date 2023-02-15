function TestForValidInput(input) {

    const validityState = input.validity;

    if (validityState.valueMissing) {
        input.setCustomValidity("List name cannot be blank.");
    } else if (validityState.patternMismatch) {
        input.setCustomValidity("List name can only contain letters, numbers, and spaces.");
    } else if (validityState.tooLong) {
        input.setCustomValidity("List name can be a maximum of 15 characters in length.");
    } else if (validityState.tooShort) {
        input.setCustomValidity("List name must be at least 1 character in length.");
    } else {
        input.setCustomValidity("");
    }

    input.reportValidity();

    return validityState.valid;
}

export default TestForValidInput;