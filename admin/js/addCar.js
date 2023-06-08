const request = indexedDB.open('carDatabase', 2);
let db;

request.onerror = function(event) {
  console.log('Error opening database');
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('Database opened successfully');
  displayCars();
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  console.log('Database upgraded successfully');

  // Create an object store for cars
  const objectStore = db.createObjectStore('cars', { keyPath: 'id', autoIncrement: true });
};

// Handle form submission
const carForm = document.getElementById('carForm');
carForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get input values
  const name = document.querySelector('name').value;
  const price = document.querySelector('price').value;
  const number = document.querySelector('number').value;
//   const color = document.getElementById('color').value;

  // Save car to IndexedDB
  const transaction = db.transaction(['cars'], 'readwrite');
  const objectStore = transaction.objectStore('cars');
  const car = { name: name, price: price, number: number};
  const request = objectStore.add(car);

  request.onsuccess = function(event) {
    console.log('Car added to IndexedDB');
    displayCars(); // Update the displayed cars
  };

  // Reset the form
  carForm.reset();
});

// Display all cars
function displayCars() {

//   const carTableBody = document.getElementById('cards');
//   carTableBody.innerHTML = '';

//   const objectStore = db.transaction('cars').objectStore('cars');
//   objectStore.openCursor().onsuccess = function(event) {
//     const cursor = event.target.result;
//     if (cursor) {
//       const car = cursor.value;

//       // Create a new row in the table with the car details
//       const newRow = document.createElement('card');
//       newRow.innerHTML = `
//         <td>${car.name}</td>
//         <td>${car.price}</td>
//         <td>${car.number}</td>
//       `;
//       carTableBody.appendChild(newRow);

//       cursor.continue();
//     }
//   };

    const grid = document.querySelector('cards');
    const transaction = db.transaction(['cars'],'readonly');
    const objectStore = transaction.objectStore('cars');
    const request = objectStore.getAll();

    request.onsuccess=function(event){
        const cars=event.target.result;

        for(const car of cars){
            grid.innerHTML +=`
            <div class="card">
                            <div class="image">
                                <img style="height: 200px; width: 400px;" src="assets\car9\car2.png">
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
