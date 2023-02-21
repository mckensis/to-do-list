//Tests all inputs for the new task form
function TestForMultipleValidInputs(inputs) {
    let results = [];
    inputs.forEach(input => {
        results.push(TestForValidInput(input));
    });
    if (results.includes(false)) {
        return false;
    }
    return true;
}

//Tests an input for validity and reports / returns the validity state
function TestForValidInput(input) {
    const validityState = input.validity;

    if (validityState.valueMissing) {
        input.setCustomValidity("Cannot be blank.");
    } else if (validityState.patternMismatch) {
        if (input.name === 'task-title') {
            input.setCustomValidity("Can only contain letters, numbers, spaces, and punctuation");
        } else {
            input.setCustomValidity("Can only contain letters, numbers, and spaces.");
        }
    } else if (validityState.tooLong) {
        input.setCustomValidity(`Can be a maximum of ${input.max} characters in length.`);
    } else if (validityState.tooShort) {
        input.setCustomValidity(`Name must be at least ${input.min} character in length.`);
    } else if (validityState.rangeUnderflow) {
        input.setCustomValidity("Due date cannot be earlier than today.");
    } else if (validityState.rangeOverflow) {
        input.setCustomValidity("Due date cannot be more than 100 years in the future.")
    } else {
        input.setCustomValidity("");
    }

    input.reportValidity();

    return validityState.valid;
}

export { TestForValidInput, TestForMultipleValidInputs };