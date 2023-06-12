
var carsData = function () {
    var carForm = document.querySelector(".fields");
  var idb = indexedDB.open("carDatabase", 4);

  idb.onerror = function (e) {
    console.log("error opening db!");
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully");
  };

  idb.onupgradeneeded = function () {
    var request = idb.target.result;
    console.log("Database upgraded successfully");
    request.createObjectStore("cars", { autoIncrement: true });
  };

  idb.onsuccess = function (e) {
    var request = idb.result;
    var tx = request.transaction("cars", "readwrite");
    var store = tx.objectStore("cars");
    // const carData = [
    //     { name: 'Ford', price: 20, seater: 4 }];
    // store.add(carData);
    if (checkEmpty()) {
      alert("car added successfully");
      store.add({
        name: carForm[0].value,
        price: carForm[1].value,
        number: carForm[2].value,
      });
    //   displayCars();
      location.reload();
    } else {
      alert("fill all deatils");
      e.preventDefault();
    }
  };
};

function checkEmpty() {
  return (
    carForm[0].value != "" && carForm[1].value != "" && carForm[2].value != ""
  );
}

// Display all cars
function displayCars() {
  const request = indexedDB.open("carDatabase", 1);
  request.onsuccess = function (event) {
    const db = event.target.result;

    const transaction = db.transaction("cars", "readonly");
    const objectStore = transaction.objectStore("cars");

    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function (event) {
      const carData = event.target.result;

      carData.forEach(function (car) {
        const grid = document.querySelector(".cards");
        grid.innerHTML += `
            <div class="card">
                            <div class="image">
                                <img style="height: 200px; width: 400px;" src="..\assets\car9\car2.png">
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
      });
    };
  };
}

function removeCar(id) {
  const transactions = db.transaction("cars", "readwrite");
  const objectStores = transactions.objectStore("cars");
  const request = objectStores.delete(id);

  request.onsuccess = function (event) {
    console.log("Car removed from IndexedDB");
    // Remove the card from the grid
    const card = event.target.result;
    card.parentNode.removeChild(card);
  };
}

function logout() {
  var logout = localStorage.setItem("code", "logout");
  window.location.href = "../../index.html";
}
