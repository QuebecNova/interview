//1. Getting json
let mockyData;

const body = document.querySelector('body');

const createPage = async () => {
    const getData = async (url) => {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    }

    const url = 'https://run.mocky.io/v3/8cc1b858-2e3e-4249-a025-c0c52053d618';
    try {
        mockyData = await getData(url);
    } catch (error) {
        console.log(error.message);
    }
    console.log(mockyData);

    displayUsers();
    createMultidimensionalDivs();
}

//1. Render users with valid id on top of the screen
const displayUsers = () => {

    const users = mockyData.data.users;
    const usersDiv = document.createElement('div');
    usersDiv.setAttribute('id', 'users');
    users.forEach(user => {

        if (!user['id'] || typeof(user['id']) === 'string') return;

        const userFirstName = user['firstName'];
        const userLastName = user['lastName'];
        let userFullName = '';
        if (userLastName) {
            userFullName = `${userFirstName} ${userLastName}`;
        } else {
            userFullName = userFirstName
        }

        const eachUser = document.createElement('div');
        eachUser.classList.add('user');
        eachUser.innerHTML = userFullName;
        usersDiv.appendChild(eachUser);

    });
    body.prepend(usersDiv);
}

//2. Multidimesional divs founded on mockydata.numbers
const createMultidimensionalDivs = () => {
    
    mockyData.numbers.forEach(arr => {
        const usersDiv = document.querySelector('#users');
        const div = document.createElement('div');
        div.classList.add('dimDiv');
        const users = mockyData.data.users;
        users.forEach(user => {
            if (arr.includes(user['id']) && user['id'] && typeof(user['id'] === 'number')) {
                const userMatch = document.createElement('div');
                const userFirstName = user['firstName'];
                const userLastName = user['lastName'];
                let userFullName = '';
                if (userLastName) {
                    userFullName = `${userFirstName} ${userLastName}`;
                } else {
                    userFullName = userFirstName
                }
                userMatch.innerHTML = userFullName;
                div.appendChild(userMatch);
            }
        });
        usersDiv.after(div);
    });
}

//3. Search feature
const createSearch = () => {

    const script = document.querySelector('script');
    
    const searchElement = document.createElement('div');
    searchElement.classList.add('search');
    
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search!';
    searchButton.addEventListener('click', search);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';

    searchElement.appendChild(searchInput);
    searchElement.appendChild(searchButton);

    script.before(searchElement);
}

const search = () => {

    if (document.querySelector('.results')) {
        document.querySelector('.results').remove();
    }

    const input = document.querySelector('input');
    const results = document.createElement('div');
    results.classList.add('results');
    results.textContent = '';
    
    const searchBox = document.querySelector('.search');
    searchBox.appendChild(results);

    if (isNaN(input.value) || !input.value) {
        results.textContent = 'Write an id!';
        return;
    } else {
        mockyData.data.users.forEach(user => {

            if (user['id'] && typeof(user['id'] === 'number')) {

                if (parseInt(input.value) !== user['id']) return;

                const userFirstName = user['firstName'];
                const userLastName = user['lastName'];
                let userFullName = '';
                if (userLastName) {
                    userFullName = `${userFirstName} ${userLastName}`;
                } else {
                    userFullName = userFirstName
                }
                
                results.textContent = `Username with id:${input.value} - ${userFullName}`;
            }
        });

        if (!results.textContent && !input.value.includes(' ')) {
            results.textContent = `User with id:${input.value} didn't found.`;
        }
    }
}

createPage();
createSearch();

//4. Iterating matrix

const iterateMatrix = () => {

    const matrix = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ],
    ];
    
    const output = false;

    let sum = 0;
    let sumSecond = 0;

    for (let i = 0; i < 3; i++) {
        const num = matrix[i][i];
        sum += num;
    }


    let matrixArrNum = 2;

    for (let i = 0; i < 3; i++) {
        const num = matrix[i][matrixArrNum];
        sumSecond += num;
        matrixArrNum--;
    }
    
    console.log(sum === sumSecond)
}

iterateMatrix();