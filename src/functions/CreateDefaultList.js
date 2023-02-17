import List from "../classes/List";

function CreateDefaultWorkList() {
    const work = new List('Work');
    work.create({
        title: 'Allow completion of tasks',
        dueDate: {
            day: '04',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Allow deletion of tasks',
        dueDate: {
            day: '21',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 2,
    });
    work.create({
        title: 'Do not allow priority change of completed tasks',
        dueDate: {
            day: '17',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 2,
    });
    work.create({
        title: 'Sort tasks by completion / dueDate / priority',
        dueDate: {
            day: '15',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 2,
    });
    work.create({
        title: 'Allow priority change of tasks',
        dueDate: {
            day: '15',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Implement date-fns for due date',
        dueDate: {
            day: '03',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 0,
    });

    return work;
}

function CreateDefaultPersonalList() {
    const personal = new List('Personal');
    personal.create({
        title: 'Move flat',
        dueDate: {
            day: '16',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 2,
    });
    personal.create({
        title: 'Walk 500 miles',
        dueDate: {
            day: '25',
            month: '12',
            year: '2023',
        },
        priority: 0,
    });
    personal.create({
        title: 'Find a job',
        dueDate: {
            day: '28',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 2,
    });
    personal.create({
        title: `Complete Donkey Kong Country 2 for the 1,000,000'th time`,
        dueDate: {
            day: '16',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 1,
    });

    return personal;
}

function CreateDefaultShoppingList() {
    const shopping = new List ('Shopping');
    shopping.create({
        title: 'Broccoli',
        dueDate: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    shopping.create({
        title: 'Tofu',
        dueDate: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    shopping.create({
        title: 'Soy Sauce',
        dueDate: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    shopping.create({
        title: 'Sriracha',
        dueDate: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    return shopping;
}

function CreateDefaultList() {
    const list = [];

    const work = CreateDefaultWorkList();
    const personal = CreateDefaultPersonalList();
    const shopping = CreateDefaultShoppingList();

    list.push(work);
    list.push(personal);
    list.push(shopping);

    return list;
}

export default CreateDefaultList;