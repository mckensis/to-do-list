import List from "../classes/List";

function CreateDefaultWorkList() {
    const work = new List('Work');
    work.create({
        title: 'Allow completion of tasks',
        due: {
            day: '04',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Allow deletion of tasks',
        due: {
            day: '21',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 2,
    });
    work.create({
        title: 'Do not allow priority change of completed tasks',
        due: {
            day: '17',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 2,
    });
    work.create({
        title: 'Sort tasks by completion / due / priority',
        due: {
            day: '15',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 2,
    });
    work.create({
        title: 'Allow priority change of tasks',
        due: {
            day: '15',
            month: '02',
            year: '2023',
        },
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Implement date-fns for due date',
        due: {
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
        due: {
            day: '16',
            month: '01',
            year: '2023',
        },
        complete: true,
        priority: 2,
    });
    personal.create({
        title: 'Walk 500 miles',
        due: {
            day: '25',
            month: '12',
            year: '2023',
        },
        priority: 0,
    });
    personal.create({
        title: 'Find a job',
        due: {
            day: '28',
            month: '02',
            year: '2023',
        },
        complete: false,
        priority: 2,
    });
    personal.create({
        title: `Complete Donkey Kong Country 2 for the 1,000,000'th time`,
        due: {
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
        due: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    shopping.create({
        title: 'Tofu',
        due: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    shopping.create({
        title: 'Soy Sauce',
        due: {
            day: '18',
            month: '02',
            year: '2023',
        },
        priority: 1,
    });
    shopping.create({
        title: 'Sriracha',
        due: {
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