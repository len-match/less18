const pressButton = document.querySelector('#add');
const list = document.querySelector('#list');
const input = document.querySelector('#todo');

let toDoList = JSON.parse(localStorage.getItem('todo')) || [];

if (toDoList.length > 0) {
    toDoList.forEach(elem => {
        createList(elem.value, elem.checkbox, true);
    });
}

pressButton.addEventListener('click', () => {
    createList(input.value, null, false);
    localStorage.setItem('todo', JSON.stringify(toDoList));
    input.value = '';
});

function createList(value, checked, init) {
    let checkBox = document.createElement('input');
    let newLi = document.createElement('li');
    let p = document.createElement('p');
    let del = document.createElement('button');

    newLi.classList.add('container');
    p.classList.add('todo-text');
    del.classList.add('del-button');

    checkBox.setAttribute('type', 'checkbox');

    if (checked) {
        checkBox.setAttribute('checked', true);
        newLi.classList.add('checked')
    }

    p.innerText = value;

    newLi.appendChild(checkBox);
    newLi.appendChild(p);
    newLi.appendChild(del);

    list.appendChild(newLi);

    checkBox.addEventListener('click', () => {
        newLi.classList.toggle('checked');
        const currentElem = toDoList.find(elem => {
            return elem.value === newLi.innerText;
        });

        currentElem.checkbox = !currentElem.checkbox;
        localStorage.setItem('todo', JSON.stringify(toDoList));
    });

    del.addEventListener('click', () => {
        const currElemIndex = toDoList.findIndex(elem => {
            return elem.value === newLi.innerText;
        });

        toDoList.splice(currElemIndex, 1);

        localStorage.setItem('todo', JSON.stringify(toDoList));

        newLi.remove();
    });

    const liObj = {
        value,
        checkbox: newLi.classList.contains('checked'),
    };


    if (!init) return toDoList.push(liObj);

}
