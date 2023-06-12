var loginForm = document.querySelector('#loginForm');
var loginAction = function () {
  var idb = indexedDB.open('carRental', 2);

  idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('Users', 'readonly');
    var store = tx.objectStore('Users');
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
          location.href = '../mybooking.html';
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
