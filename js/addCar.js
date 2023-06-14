var carForm = document.querySelector(".fields");

var carsData = function () {
    var tx = db.transaction("Car", "readwrite");
    var store = tx.objectStore("Car");
    if (checkEmpty()) {
      alert("car added successfully");
      store.add({
        name: carForm[0].value,
        noPlate: carForm[1].value,
        price: carForm[2].value,
        number: carForm[3].value,
        stock: 1
      });
      
      location.reload();
    } else {
      alert("fill all details");
      e.preventDefault();
    }
    displayCars();
  };

function checkEmpty() {
  return (
    carForm[0].value != "" && carForm[1].value != "" && carForm[2].value != ""
  );
}

// Display all cars
setTimeout(()=>{
  function displayCars() {

    var transaction = db.transaction("Car", "readonly");
    var objectStore = transaction.objectStore("Car").openCursor();

    objectStore.onsuccess = function (event) {
      var cursor= event.target.result;
      console.log(cursor)
      const grid = document.querySelector(".cards");
      if(cursor){
        var car = cursor.value;
        let divv = document.createElement('div');
          divv.innerHTML = `<div class="card">
                                <div class="image">
                                    <img style="height: 200px; width: 400px;" src='../assets/car9/car2.png'>
                                </div><br>
                                <div class="label">
                                    <div class="top">
                                        <div class="name">${car.name}</div>
                                    <div class="price"><b>$ ${car.price} /day</b></div>
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
      grid.appendChild(divv)
      cursor.continue();
      }
    };
  };
  displayCars();
},900)


// function removeCar(id) {
//   const transactions = db.transaction("cars", "readwrite");
//   const objectStores = transactions.objectStore("cars");
//   const request = objectStores.delete(id);

//   request.onsuccess = function (event) {
//     console.log("Car removed from IndexedDB");
//     // Remove the card from the grid
//     const card = event.target.result;
//     card.parentNode.removeChild(card);
//   };
// }

function logout() {
  var logout = localStorage.setItem("code", "logout");
  window.location.href = "../../index.html";
}
