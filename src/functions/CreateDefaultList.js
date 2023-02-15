import List from "../classes/List";

function CreateDefaultWorkList() {
    const work = new List('Work');
    work.create({
        title: 'Allow completion of tasks',
        due: '02-18-23',
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Allow deletion of tasks',
        due: '02-21-23',
        complete: false,
        priority: 2,
    });
    work.create({
        title: 'Do not allow priority change of completed tasks',
        due: '02-17-23',
        complete: false,
        priority: 2,
    });
    work.create({
        title: 'Sort tasks by completion / due / priority',
        due: '02-15-23',
        complete: true,
        priority: 2,
    });
    work.create({
        title: 'Allow priority change of tasks',
        due: '02-15-23',
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Implement date-fns for due date',
        due: '02-03-23',
        complete: true,
        priority: 0,
    });

    return work;
}

function CreateDefaultPersonalList() {
    const personal = new List('Personal');
    personal.create({
        title: 'Move flat',
        due: '01-16-23',
        complete: true,
        priority: 2,
    });
    personal.create({
        title: 'Walk 500 miles',
        due: '12-25-23',
        priority: 0,
    });
    personal.create({
        title: 'Find a job',
        due: '02-28-23',
        complete: false,
        priority: 2,
    });
    personal.create({
        title: `Complete Donkey Kong Country 2 for the 1,000,000'th time`,
        due: '02-16-23',
        complete: false,
        priority: 1,
    });

    return personal;
}

function CreateDefaultShoppingList() {
    const shopping = new List ('Shopping');
    shopping.create({
        title: 'eggs',
        due: '01-02-23',
        priority: 2,
    });
    shopping.create({
        title: 'milk',
        due: '04-06-23',
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