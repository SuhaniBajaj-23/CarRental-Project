var carForm = document.querySelector('.fields');
var carsData = function(){
    var idb = indexedDB.open('carDatabase', 3);

    idb.onerror = function(e){
        console.log('error opening db!');
    }

    request.onsuccess = function(event) {
    db = event.target.result;
    console.log('Database opened successfully');
    };

    idb.onupgradeneeded=function (){
        var request = idb.result;
        console.log('Database upgraded successfully');
        request.createObjectStore('cars', { autoIncrement: true })
    };

    idb.onsuccess=function(e){
        var request =idb.result;
        var tx=request.transaction('cars','readwrite');
        var store = tx.objectStore('cars');
        if(checkEmpty()){
            alert('car added successfully');
            store.put({
                name: carForm[0].value,
                price: carForm[1].value,
                number: carForm[2].value,
            });
            displayCars();
            location.reload();
        }else{
            alert('fill all deatils');
            e.preventDefault();
        }
    };
};


function checkEmpty() {
    return (
      carForm[0].value != '' &&
      carForm[1].value != '' &&
      carForm[2].value != '' 
    );
  }

// var request = indexedDB.open('carDatabase', 2);
// var db;

// request.onerror = function(event) {
//   console.log('Error opening database');
// };

// request.onsuccess = function(event) {
//   db = event.target.result;
//   console.log('Database opened successfully');
//   displayCars();
// };

// request.onupgradeneeded = function(event) {
//   db = event.target.result;
//   console.log('Database upgraded successfully');

//   // Create an object store for cars
//   const objectStore = db.createObjectStore('cars', { keyPath: 'id', autoIncrement: true });
// };

// // Handle form submission

// carForm.addEventListener('submit', function(event) {
//   event.preventDefault();

//   // Get input values
//   const name = document.querySelector('#name').value;
//   const price = document.querySelector('#price').value;
//   const number = document.querySelector('#number').value;
// //   const color = document.getElementById('color').value;

//   // Save car to IndexedDB
//   const transaction = db.transaction(['cars'], 'readwrite');
//   const objectStore = transaction.objectStore('cars');
//   const car = { name: name, price: price, number: number};
//   const request = objectStore.add(car);

//   request.onsuccess = function(event) {
//     console.log('Car added to IndexedDB');
//     displayCars(); // Update the displayed cars
//   };

//   // Reset the form
//   carForm.reset();
// });

// Display all cars
function displayCars() {

    const grid = document.querySelector('cards');
    const transaction = db.transaction('cars','readonly');
    const objectStore = transaction.objectStore('cars');
    const request = objectStore.getAll();

    request.onsuccess=function(event){
        const cars=event.target.result;

        for(const car of cars){
            grid.innerHTML +=`
            <div class="card">
                            <div class="image">
                                <img style="height: 200px; width: 400px;" src="../assets\car9\car2.png">
                            </div><br>
                            <div class="label">
                                <div class="top">
                                    <div class="name">${car.name}</div>
                                <div class="price"><b>${car.price}</b></div>
                                </div>
                                <div class="low">
                                    <div class="seater">
                                        <i class="fa-solid fa-users"></i>
                                        <div class="number">${car.number}</div>
                                    </div>
                                    <button class="btn">Remove</button>
                                </div>
                                
                            </div>
                        </div>`;
                        car.continue();
        }
    }
}


function removeCar(id) {
    const transactions = db.transaction('cars', 'readwrite');
    const objectStores = transactions.objectStore('cars');
    const request = objectStores.delete(id);
  
    request.onsuccess = function (event) {
      console.log('Car removed from IndexedDB');
      // Remove the card from the grid
      const card = event.target.result;
      card.parentNode.removeChild(card);
    };
  }

  function logout(){
    var logout = localStorage.setItem("code", "logout")
window.location.href = "../../index.html"
  }