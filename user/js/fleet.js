function logout(){
    var logout = localStorage.setItem("code", "logout")
window.location.href = "../../index.html"
}
add();

function add(){
    
const request = indexedDB.open('fleetDB', 1);

// Define the object store and its structure
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('cars', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('price', 'price', { unique: false });
  objectStore.createIndex('seater', 'seater', { unique: false });
};

// Handle successful database opening
request.onsuccess = function(event) {
  const db = event.target.result;

  // Start a transaction and get the object store
  const transaction = db.transaction('cars', 'readwrite');
  const objectStore = transaction.objectStore('cars');

  // Define the car data
  const carData = [
    { name: 'Ford', price: 20, seater: 4 },
    { name: 'Tesla', price: 40, seater: 2 },
    { name: 'Maruti', price: 30, seater: 4 },
    { name: 'Hyundai', price: 25, seater: 4 },
    { name: 'Mahindra', price: 40, seater: 4 },
    { name: 'Kia', price: 36, seater: 2 },
    { name: 'Toyota', price: 25, seater: 6 },
    { name: 'Volksvagen', price: 18, seater: 4 },
    { name: 'Audi', price: 50, seater: 4 },
    // Add more car data here
  ];

  // Add each car data to the object store
  carData.forEach(function(car) {
    const request = objectStore.add(car);
    request.onsuccess = function(event) {
      console.log('Car data added successfully');
    };
    request.onerror = function(event) {
      console.error('Error adding car data', event.target.error);
    };
  });

  // Close the transaction when all car data is added
  transaction.oncomplete = function() {
    console.log('All car data added successfully');
    // db.close();
  };
};

// Handle errors during database opening
request.onerror = function(event) {
  console.error('Error opening database', event.target.error);
};
display();
}


function display(){
    // Open the IndexedDB database
const request = indexedDB.open('fleetDB', 1);

// Handle successful database opening
request.onsuccess = function(event) {
  const db = event.target.result;

  // Start a transaction and get the object store
  const transaction = db.transaction('cars', 'readonly');
  const objectStore = transaction.objectStore('cars');

  // Retrieve all car data from the object store
  const getAllRequest = objectStore.getAll();

  getAllRequest.onsuccess = function(event) {
    const carData = event.target.result;

    // Display car data on the page
    carData.forEach(function(car) {
        const grid = document.querySelector('.cards');
        grid.innerHTML +=`
        <div class="card">
                    <div class="image">
                        <img style="height: 200px; width: 400px;" src="..\..\assets\car9\car2.png">
                    </div><br>
                    <div class="label">
                        <div class="top">
                            <div class="name">${car.name}</div>
                        <div class="price"><b>$ ${car.price} /day</b></div>
                        </div>
                        <div class="low">
                            <div class="seater">
                                <i class="fa-solid fa-users"></i>
                                <div class="number">${car.seater}</div>
                            </div>
                            <button class="btn">Book</button>
                        </div>
                        
                    </div>
                </div>`;
    //   const carElement = document.createElement('div');
    //   carElement.textContent = `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}`;
    //   document.body.appendChild(carElement);
    });
  };

  // Close the transaction
  transaction.oncomplete = function() {
    console.log('Data retrieval completed');
    // db.close();
  };
};

// Handle errors during database opening
request.onerror = function(event) {
  console.error('Error opening database', event.target.error);
};

}

