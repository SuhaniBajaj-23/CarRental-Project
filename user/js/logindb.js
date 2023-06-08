function login(){
    let selectedValue = $("access option:selected").text();

    if(selectedValue=="Admin"){
        return getAdmin(db);
    }else{
        return getUser(db);
    }

    function getAdmin(db) {
        var email = document.querySelector("#email").value;
        var password = document.querySelector("#password").value;
    
        console.log("About to login ");
    
        var transaction = db.transaction(["Admins"]); //readonly
        var objectStore = transaction.objectStore("Admins");
        var request = objectStore.get(email);
    
        request.onerror = function(e) {
        alert("Admin does not exist");
        };
        request.onsuccess = function(e) {
        alert(password + " " + request.result.password);
        if(password != request.result.password) {
        alert("Invalid Credentials");
        return;
        } 
        console.log("Successfully logged in");
        };
    }

    function getUser(db) {
        var email = document.querySelector("#email").value;
        var password = document.querySelector("#password").value;
    
        console.log("About to login ");
    
        var transaction = db.transaction(["Users"]); //readonly
        var objectStore = transaction.objectStore("Users");
        var request = objectStore.get(email);
    
        request.onerror = function(e) {
        alert("User does not exist");
        //  return;
        };
        request.onsuccess = function(e) {
        alert(password + " " + request.result.password);
        if(password != request.result.password) {
        alert("Invalid Credentials");
        return;
        } 
        console.log("Successfully logged in");
        };
    }
}