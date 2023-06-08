if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
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
}

function signup(userData, userType) {
    const transaction = db.transaction(userType, 'readwrite');
    const objectStore = transaction.objectStore(userType);

    let request = objectStore.add(userData);

    request.onsuccess = function (event) {
        console.log(`Successfully signed up as ${userType}`);
        window.location.href = '../loginU.html';
    };

    request.onerror = function (event) {
        console.error(`Error signing up as ${userType}: ${event.target.errorCode}`);
    };
}


 function clickU(){
        
    var  name=document.querySelector('#name').value;
    var  password=document.querySelector('#password').value;
    var  email=document.querySelector('#email').value;
    var  cPassword=document.querySelector('#cpassword').value;
    var passwordStrength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    
    if(!passwordStrength.test(password)){
        alert('Password should contain 1 uppercase letter, 1 lowercase letter, 1 numerical, 1 special character and should be atleast 8 characters long');
    }else if (password !== cPassword) {
        alert('please enter the same password in confirm password');
    }

    var Data = {
        name: name,
        email: email,
        password:password,
        cPassword:cPassword
    };

    signup(Data,'Users');
    
    
 }
