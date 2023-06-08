// if (!window.indexedDB) {
//     console.log(`Your browser doesn't support IndexedDB`);
//     // return;
// }

// const request = indexedDB.open('carRental', 5);
// let db;

// request.onerror = (event) => {
//     console.error(`Database error: ${event.target.errorCode}`);
// };

// request.onupgradeneeded = (event) => {
//     db = event.target.result;

//     if (!db.objectStoreNames.contains('Admins')) {
//         db.createObjectStore('Admins', { keyPath: 'email', autoIncrement: true });
//     }

//     if (!db.objectStoreNames.contains('Users')) {
//         db.createObjectStore('Users', { keyPath: 'email', autoIncrement: true });
//     }
// };

// request.onsuccess = (event) => {
//     db = event.target.result;
//     console.log('Database opened successfully');

//     // You can perform additional operations here or call relevant functions
// };

// function signup(userData, userType) {
//     const transaction = db.transaction(userType, 'readwrite');
//     const objectStore = transaction.objectStore(userType);

//     let request = objectStore.add(userData);

//     request.onsuccess = function (event) {
//         console.log(`Successfully signed up as ${userType}`);
//     };

//     request.onerror = function (event) {
//         console.error(`Error signing up as ${userType}: ${event.target.errorCode}`);
//     };

//     // transaction.oncomplete = function () {
//     //     db.close();
//     // };
// }

//  function click(){
        
//     var  name=document.querySelector('#name').value;
//     var  password=document.querySelector('#password').value;
//     var  email=document.querySelector('#email').value;
//     var  cPassword=document.querySelector('#cpassword').value;
//     var  selectedValue =  document.querySelector('#access');
//     // var  value = selectedValue.options[selectedValue.selectedIndex].value;
    
//     // console.log(value);
//     var Data = {
//         name: name,
//         email: email,
//         password:password,
//         cPassword:cPassword
//     };

//     console.log(Data);
//     // signup(Data,'Admin')
//     if(selectedValue="Admin"){
//         signup(Data, 'Admins');
//     }else{
//         signup(Data,'Users');
//     }

//  }
//  document.getElementById('submit').addEventListener('click', click);

//  document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('submit').addEventListener('click', click);
// });

if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    // return;
}

const request = indexedDB.open('carRental', 6);
let db;

request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;

    if (!db.objectStoreNames.contains('Admins')) {
        db.createObjectStore('Admins', { keyPath: 'email', autoIncrement: true });
    }

    if (!db.objectStoreNames.contains('Users')) {
        db.createObjectStore('Users', { keyPath: 'email', autoIncrement: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('Database opened successfully');

    // You can perform additional operations here or call relevant functions
};

function signup(userData, userType) {
    const transaction = db.transaction(userType, 'readwrite');
    const objectStore = transaction.objectStore(userType);

    let request = objectStore.add(userData);

    request.onsuccess = function (event) {
        console.log(`Successfully signed up as ${userType}`);
    };

    request.onerror = function (event) {
        console.error(`Error signing up as ${userType}: ${event.target.errorCode}`);
    };

    // transaction.oncomplete = function () {
    //     db.close();
    // };
}

 function clickA(){
        
    var  name=document.querySelector('#name').value;
    var  password=document.querySelector('#password').value;
    var  email=document.querySelector('#email').value;
    var  cPassword=document.querySelector('#cpassword').value;
    
    var Data = {
        name: name,
        email: email,
        password:password,
        cPassword:cPassword
    };

    signup(Data, 'Admins');
    window.location.href = '../loginA.html';

 }

 function clickU(){
        
    var  name=document.querySelector('#name').value;
    var  password=document.querySelector('#password').value;
    var  email=document.querySelector('#email').value;
    var  cPassword=document.querySelector('#cpassword').value;
    
    var Data = {
        name: name,
        email: email,
        password:password,
        cPassword:cPassword
    };

    signup(Data,'Users');
    window.location.href = '../loginU.html';
    

 }
//  document.getElementById('submit').addEventListener('click', click);

//  document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('submit').addEventListener('click', click);
// });
