const backendUrl = 'http://localhost:3000/api/v1';
const storageUrl = `${backendUrl}/storage`;
const userRoute = `${backendUrl}/user`;

// HTML elements
const rowContainer = document.getElementById('user-rows');

document
    .getElementById('submit-btn')
    .addEventListener('click', async function () {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let address = document.getElementById('address').value;

        try {
            const response = await fetch(`${userRoute}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, address }),
            });
            const userData = await response.json();
            console.log('Success:', userData);
            const userRow = createUserRow(userData);
            rowContainer.appendChild(userRow);
        } catch (error) {
            console.error('Error:', error);
        }
    });

async function getUsers() {
    console.log('getUsers');
    const route = '/get/all';
    try {
        const response = await fetch(`${storageUrl}${route}`);
        const { users } = await response.json();

        rowContainer.innerHTML = '';

        users.forEach((user) => {
            const userRow = createUserRow(user);
            rowContainer.appendChild(userRow);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function createUserRow(user) {
    const row = document.createElement('tr');
    row.id = user.id;

    const name = document.createElement('td');
    name.textContent = user.name;
    name.className = 'name';
    row.appendChild(name);

    const email = document.createElement('td');
    email.textContent = user.email;
    email.className = 'email';
    row.appendChild(email);

    const phone = document.createElement('td');
    phone.textContent = user.phone;
    phone.className = 'phone';
    row.appendChild(phone);

    const address = document.createElement('td');
    address.textContent = user.address;
    address.className = 'address';
    row.appendChild(address);

    const updateTd = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', function () {
        showUpdateForm(user);
    });
    updateTd.appendChild(updateButton);
    row.appendChild(updateTd);

    const deleteTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteUser(user.id);
    });
    deleteTd.appendChild(deleteButton);
    row.appendChild(deleteTd);

    return row;
}

function updateUserRow(user) {
    const userRow = document.getElementById(user.id);
    userRow.querySelector('.name').textContent = user.name;
    userRow.querySelector('.email').textContent = user.email;
    userRow.querySelector('.phone').textContent = user.phone;
    userRow.querySelector('.address').textContent = user.address;
}

function showUpdateForm(user) {
    const id = document.getElementById('update-id');
    const name = document.getElementById('update-name');
    const email = document.getElementById('update-email');
    const phone = document.getElementById('update-phone');
    const address = document.getElementById('update-address');

    // fill existing data
    id.value = user.id;
    name.value = user.name;
    email.value = user.email;
    phone.value = user.phone;
    address.value = user.address;

    // show form
    const updateForm = document.getElementById('update-user-form');
    updateForm.style.display = 'block';

    const submitButton = document.getElementById('update-submit-btn');

    submitButton.onclick = function () {
        user.name = name.value;
        user.email = email.value;
        user.phone = phone.value;
        user.address = address.value;

        updateForm.style.display = 'none';
        updateUser(user);
    };
}

async function deleteUser(id) {
    try {
        const response = await fetch(`${storageUrl}/remove/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        const data = await response.text();
        console.log('Success:', data);
        // remove user row
        const userRow = document.getElementById(id);
        userRow.remove();
    } catch (error) {
        console.error(error);
    }
}

async function updateUser(user) {
    try {
        const response = await fetch(`${userRoute}/id/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Update failed');
        }

        const userData = await response.json();
        console.log('Update Success:', userData);
        updateUserRow(userData);
    } catch (error) {
        console.error('Error:', error);
    }
}

getUsers();
