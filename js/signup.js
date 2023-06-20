function clickU(){
        
    var  name=document.querySelector('#name').value.trim();
    var  password=document.querySelector('#password').value.trim();
    var  email=document.querySelector('#email').value.trim();
    var  cPassword=document.querySelector('#cpassword').value.trim();
    var  type=document.querySelector('#type').value.trim();
    var  passwordStrength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    
    if(name == '' ||
    email == '' ||
    password == '' ||
    cPassword == '' ||
    type ==''){
      alert("fill all the details")
      return
    }else if(!isValidEmail(email)){
      alert("provide correct email id")
      return
    }else if(!passwordStrength.test(password)){
        alert('Password should contain 1 uppercase letter, 1 lowercase letter, 1 numerical, 1 special character and should be atleast 8 characters long');
        return
    }else if (password !== cPassword) {
        alert('please enter the same password in confirm password');
        return
    }else{
        var Data = {
            name: name,
            email: email,
            password:password,
            type: type
        };
        signup(Data);
    }
 }

  function isValidEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email.match(regex);
  };


 function signup(userData) {
    const transaction = db.transaction('User', 'readwrite');
    const objectStore = transaction.objectStore('User');
    const foundEmail = objectStore.index('email');
    const alreadySigned = foundEmail.openCursor();

    alreadySigned.onsuccess=(event)=>{
        const res = event.target.result;
        if(res){
            if(res.value.email === userData.email){
                alert("user already exists with this email id");
                return;
            }
            res.continue();
        }
        else {
            const request = objectStore.add(userData);

            request.onsuccess = function (event) {
                console.log(`Successfully signed up as ${userData.type}`);
                alert("successfully registered")
                window.location.href = 'login.html';
            };

            request.onerror = function (event) {
                console.error(`Error signing up as ${userData.type}: ${event.target.errorCode}`);
            };
        }

    
    }
}

