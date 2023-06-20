var loginForm = document.querySelector('#loginForm');
function loginAction() {
    const tx = db.transaction('User', 'readonly');
    const store = tx.objectStore('User');
    const foundEmail = store.index('email');
    const alreadySigned = foundEmail.openCursor();
    // var cursor = store.openCursor();
    alreadySigned.onsuccess = function (event) {
        const cur =event.target.result;
        if(cur){
          if (
            cur.value.email === loginForm[0].value &&
            cur.value.password === loginForm[1].value &&
            cur.value.type === 'admin'
          ) { 
            var currentUserEmail = JSON.parse("[]");
            currentUserEmail.push(loginForm[0].value);
            localStorage.setItem("currentUserEmailAdmin",JSON.stringify(currentUserEmail));
            
            window.location.href = 'addCar.html';
          } else if (
              cur.value.email === loginForm[0].value &&
              cur.value.password === loginForm[1].value &&
              cur.value.type === 'user'
          ){
                  var currentUserEmail = JSON.parse("[]");
                  currentUserEmail.push(loginForm[0].value);
                  localStorage.setItem("currentUserEmailUser",JSON.stringify(currentUserEmail));
                  window.location.href = 'fleet.html';
          }else{
            cur.continue();
          }
          
        }else{
          alert("enter valid login details")
        }
    };
  };
