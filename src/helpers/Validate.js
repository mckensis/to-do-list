function CheckForBlankInput(input) {
    if (input.value) {
        return true;
    }
    const message = ("Cannot be empty");
    input.setCustomValidity(message)
    input.reportValidity(message);
}

function TestForValidInput(input) {
    
    const pattern = new RegExp(input.pattern);

    if (pattern.test(input.value)) {
        return true;
    }

    const message = ("Can only contain letters and numbers");
    input.setCustomValidity(message)
    input.reportValidity(message);
    input.value = '';

}

export { CheckForBlankInput, TestForValidInput } ;