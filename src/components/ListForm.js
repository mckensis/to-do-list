function NewListForm() {
    const form = document.createElement("form");

    const input = document.createElement("input");
    const submit = document.createElement("button");
    const cancel = document.createElement("button");
    const label = document.createElement("label");

    submit.type = "submit";
    cancel.type = "cancel";
    
    input.classList.add('add-list','input-field');
    submit.classList.add('add-list','confirm');
    cancel.classList.add('add-list','cancel');
    form.classList.add('add-list','form');
    label.classList.add('add-list','label');

    input.name = "name";
    input.id = "list_name";
    input.type = "text";
    input.minLength = '1';
    input.maxLength = "15";
    input.pattern = '^[a-zA-Z0-9 ]+';
    input.required = true;
    input.autocomplete = 'off';

    
    submit.textContent = '\u2713';
    cancel.textContent = '\u03A7';
    label.textContent = "New List:";
    
    form.append(label, input, submit, cancel);

    return form;

}

export default NewListForm;