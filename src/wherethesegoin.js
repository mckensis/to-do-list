/*function AddTaskForm() {

    if (!document.querySelector(".newTaskForm")) {

        //the + button
        const addTaskButton = document.querySelector('.addTaskButton');

        const newTaskForm = document.createElement("form");
        const taskContainer = document.querySelector(".taskContainer");
        const section = document.querySelector(".displaySection");
        const inputTaskTitle = document.createElement("input");
        const inputTaskDescription = document.createElement("input");
        const inputTaskDueDate = document.createElement("input");
        const inputTaskPriority = document.createElement("input");
        const submitButton = document.createElement("button");
        const cancelButton = document.createElement("button");

        submitButton.type = "button";
        cancelButton.type = "button";

        inputTaskTitle.placeholder = "Title";
        inputTaskDescription.placeholder = "Description";
        inputTaskDueDate.placeholder = "Due";
        inputTaskPriority.placeholder = "Priority";
        
        inputTaskTitle.classList.add("addNewTask");
        inputTaskDescription.classList.add("addNewTask");
        inputTaskDueDate.classList.add("addNewTask");
        inputTaskPriority.classList.add("addNewTask");
        submitButton.classList.add("addTaskConfirm");
        cancelButton.classList.add("addTaskCancel");
        newTaskForm.classList.add("newTaskForm");

        submitButton.textContent = "✓";
        cancelButton.textContent = "❌";
        
        newTaskForm.appendChild(inputTaskTitle);
        newTaskForm.appendChild(inputTaskDueDate);
        newTaskForm.appendChild(inputTaskDescription);
        newTaskForm.appendChild(inputTaskPriority);
        newTaskForm.appendChild(submitButton);
        newTaskForm.appendChild(cancelButton);

        section.removeChild(addTaskButton);
        section.insertBefore(newTaskForm, taskContainer);

        return section;
    }
}*/