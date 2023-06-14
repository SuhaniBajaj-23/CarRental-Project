function clickU(){
        
    var  name=document.querySelector('#name').value;
    var  password=document.querySelector('#password').value;
    var  email=document.querySelector('#email').value;
    var  cPassword=document.querySelector('#cpassword').value;
    var  type=document.querySelector('#type').value;
    var  passwordStrength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    
    if(!passwordStrength.test(password)){
        alert('Password should contain 1 uppercase letter, 1 lowercase letter, 1 numerical, 1 special character and should be atleast 8 characters long');
    }else if (password !== cPassword) {
        alert('please enter the same password in confirm password');
    }

    var Data = {
        name: name,
        email: email,
        password:password,
        type: type
    };
    
    console.log('user created creds',Data);
    signup(Data);
    
 }

 function signup(userData) {
    const transaction = db.transaction('User', 'readwrite');
    const objectStore = transaction.objectStore('User');

    let request = objectStore.add(userData);

    request.onsuccess = function (event) {
        console.log(`Successfully signed up as ${userData.type}`);
        window.location.href = 'login.html';
    };

    request.onerror = function (event) {
        console.error(`Error signing up as ${userData.type}: ${event.target.errorCode}`);
    };
}



