   
    var loginForm = document.querySelector('#loginForm');
    var loginAction = function () {
    var idb = indexedDB.open('carRental', 2);

    idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction('Admins', 'readonly');
    var store = tx.objectStore('Admins');
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
        window.location.href = '../addCar.html';
      } else {
        currRes.continue();
        console.log('Enter valid details');
      }
    };
  };
};
