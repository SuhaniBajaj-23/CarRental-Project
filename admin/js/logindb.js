var loginForm = document.querySelector('#loginForm');
var loginAction = function () {
  var idb = indexedDB.open('carRental', 6);

  idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('Admins', 'readonly');
    var store = tx.objectStore('Admins');
    var cursor = store.openCursor();
    
    cursor.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        if (
          cursor.value.email === loginForm[0].value &&
          cursor.value.password === loginForm[1].value
        ) {
          console.log(cursor.value);
          localStorage.setItem('code', 'secret');
          localStorage.setItem('userKey', JSON.stringify(cursor.key));
          window.location.href = '../addCar.html';
        } else {
          cursor.continue();
        }
      } else {
        console.log('Enter valid details');
      }
    };
  };
};

loginAction();
