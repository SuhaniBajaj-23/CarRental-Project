var loginForm = document.querySelector('#loginForm');
var loginAction = function () {
    console.log('insdie login action')
    var tx = db.transaction('User', 'readonly');
    var store = tx.objectStore('User');
    var cursor = store.get(loginForm[0].value);
    cursor.onsuccess = function (event) {
        console.log('inside cursor')
      if (cursor) {
        if (
          cursor.result.password === loginForm[1].value &&
          cursor.result.type === 'admin'
        ) { 
          console.log(cursor.value);
          localStorage.setItem('codeAdmin', 'secretAdmin');
          localStorage.setItem('adminKey', JSON.stringify(cursor.key));
          window.location.href = 'addCar.html';
        } else if (
            cursor.result.password === loginForm[1].value &&
            cursor.result.type === 'user'
        ){
                console.log(cursor.value);
                localStorage.setItem('code', 'secret');
                localStorage.setItem('userKey', JSON.stringify(cursor.key));
                window.location.href = 'myBooking.html';
        }
        else {
          cursor.continue();
        }
      } else {
        console.log('Enter valid details');
      }
    };
  };
