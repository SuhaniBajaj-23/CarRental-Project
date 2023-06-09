    // function getUser(db) {
    //     var email = document.querySelector("#email").value;
    //     var password = document.querySelector("#password").value;
    
    //     console.log("About to login ");
    
    //     var transaction = db.transaction(["Users"]); //readonly
    //     var objectStore = transaction.objectStore("Users");
    //     var request = objectStore.get(email);
    
    //     request.onerror = function(e) {
    //     alert("User does not exist");
    //     //  return;
    //     };
    //     request.onsuccess = function(e) {
    //     alert(password + " " + request.result.password);
    //     if(password != request.result.password) {
    //     alert("Invalid Credentials");
    //     return;
    //     } 
    //     console.log("Successfully logged in");
    //     };
    // }

    var loginForm = document.querySelector('#loginForm');
    var loginAction = function () {
    var idb = indexedDB.open('carRental', 2);

    idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('Users', 'readonly');
    var store = tx.objectStore('Users');
    var cursor = store.openCursor();
    cursor.onsuccess = function () {
      let currRes = cursor.result;
      if (
        (currRes.value.email == loginForm[0].value) &&
        currRes.value.password == loginForm[1].value
      ) {
        console.log(currRes.value);
        localStorage.setItem('code', 'secret');
        localStorage.setItem('userKey', JSON.stringify(currRes.key));
        window.location.href = '../mybooking.html';
      } else {
        currRes.continue();
        console.log('Enter valid details');
      }
    };
  };
};
