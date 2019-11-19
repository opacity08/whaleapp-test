function createUserItem(username) {
    const label = document.createElement('label');
    label.innerText = username;
    label.className = 'user-name';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';

    const listItem = document.createElement('li');
    listItem.className = 'user-item';

    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    bindEvents(listItem);

    return listItem;
}

function searchUserItem() {

    const searchVal = this.value.trim();
    const searchItem = document.querySelectorAll('.user-item');


    if (searchVal != '') {
        searchItem.forEach(function(elem){
            if (elem.innerText.toLowerCase().indexOf(searchVal.toLowerCase()) == -1) {
                elem.classList.add('hide');
            } else {
                elem.classList.remove('hide');
            }
        } );
    } else {
        searchItem.forEach(function(elem) {
            elem.classList.remove('hide');
        });
    }

};

function bindEvents(userItem) {
    const editButton = userItem.querySelector('button.edit');
    const deleteButton = userItem.querySelector('button.delete');

    editButton.addEventListener('click', editUserItem);
    deleteButton.addEventListener('click', deleteUserItem);
};

function addUserItem(event) {
    event.preventDefault();

    //валидация при добавлении

    if (addInput.value === '') {
        return alert('Please, enter username')
    }

    const userItem = createUserItem(addInput.value);
    userList.appendChild(userItem);
    addInput.value = '';
}

function editUserItem() {
    const listItem = this.parentNode;
    const userName = listItem.querySelector('.user-name');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        userName.innerText = editInput.value;
        this.innerText = 'Edit';
    } else {
        editInput.value = userName.innerText;
        this.innerText = 'Save';
    }

    listItem.classList.toggle('editing');
}

function deleteUserItem() {
    const listItem = this.parentNode;
    userList.removeChild(listItem);
}

const userForm = document.getElementById('user-form');
const addInput = document.getElementById('add-input');
const userList = document.getElementById('user-list');
const searchInput = document.getElementById('search-input');
const sortA = document.getElementById('sort-button-a');
const searchB = document.getElementById('sort-button-b');

console.log(sortA);

userForm.addEventListener('submit', addUserItem);
searchInput.addEventListener('input', searchUserItem);
sortA.addEventListener('onclick', userSort('user-list'));
// searchB.addEventListener('onclick', userSort);

sortA.onclick = function userSort(){

    const list = document.getElementById('user-list');
    const listItems = list.children;
    const new_ul = list.cloneNode();

    console.log(list);
    console.log(new_ul);


    // Add all lis to an array
    var lis = [];
    for(var i = list.childNodes.length; i--;){
        if(list.childNodes[i].nodeName === 'LI')
            lis.push(list.childNodes[i]);
    }

    // Sort the lis in descending order
    lis.sort(function(a, b){
        let nameA = a.toString(),
            nameB = b.toString();
        console.log(nameA);
        console.log(nameB);

        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
        // return parseInt(b.childNodes[0].data , 10) - parseInt(a.childNodes[0].data , 10);
    });

    // Add them into the ul in order
    for(var i = 0; i < lis.length; i++)
        new_ul.appendChild(lis[i]);
    list.parentNode.replaceChild(new_ul, list);
};






