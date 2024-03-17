const backendUrl = 'localhost:3000/api/v1';
const api = `http://${backendUrl}/storage`;

document.getElementById('submit-btn').addEventListener('click', function () {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    console.log('submit', name, email, phone, address);

    fetch(`${api}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, address }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            getUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

async function getUsers() {
    console.log('getUsers');
    const route = '/get/all';
    try {
        const response = await fetch(`${api}${route}`);
        const { users } = await response.json();
        populateUserList(users);
    } catch (error) {
        console.error('Error:', error);
    }
}

function populateUserList(users) {
    console.log('populateUserList', users);
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach((user) => {
        let li = document.createElement('li');
        li.textContent = `${user.name}, ${user.email}, ${user.phone}, ${user.address}`;

        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', function () {
            updateUser(user);
        });
        li.appendChild(updateButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '⛽️';
        deleteButton.addEventListener('click', function () {
            deleteUser(user);
        });
        li.appendChild(deleteButton);

        userList.appendChild(li);
    });
}

function deleteUser(id) {
    fetch(`${api}/remove/${id}`, { method: 'DELETE' })
        .then((response) => response.text())
        .then((data) => {
            console.log('Success:', data);
            getUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function updateUser(user) {
    console.log(updateUser, user);
    let updatedName = prompt('Update name', user.name);
    let updatedEmail = prompt('Update email', user.email);
    let updatedPhone = prompt('Update phone', user.phone);
    let updatedAddress = prompt('Update address', user.address);

    fetch(`http://${backendUrl}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: updatedName,
            email: updatedEmail,
            phone: updatedPhone,
            address: updatedAddress,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Update Success:', data);
            getUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

getUsers();
