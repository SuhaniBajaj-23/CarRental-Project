setTimeout(()=>{

    function displayOrders() {

        var transaction = db.transaction("Booking", "readonly");
        var objectStore = transaction.objectStore("Booking").openCursor();
    
        objectStore.onsuccess = function (event) {
          var cursor= event.target.result;
          console.log(cursor)
          const grid = document.querySelector(".viewCars");
          if(cursor){
            var car = cursor.value;
            if(car.owner === localStorage.getItem("currentUserEmailAdmin")){
              let divv = document.createElement('div');
              var user = car.user.replace(/[" [\]]/g, '');
              divv.innerHTML = `<div class="cards">
                                    <div class="image">
                                        <img src=${car.image} style="height: 200px; width: 350px;">
                                    </div>
                                    <div class="deets">
                                        <div class="carname">${car.carName}</div>
                                        <div class="price">Total Fare - $${car.totalFare}</div>
                                        <div class="flex">
                                        <div class="frompick">From : ${car.address}</div>
                                        <div class="dates">${car.pickDate} to ${car.dropDate}</div>
                                        </div>
                                        <div class="seater">
                                        <div class="number">Booked On : ${car.bookingDate}</div>
                                    </div>
                                    <div class="booker">
                                        <div class="number">Booked by : ${user}</div>
                                    </div>
                                    </div>
                                </div>`;
          grid.appendChild(divv)
            }
          cursor.continue();
          }
        };
      };
      displayOrders();
},900)


function removeCar(id) {
  const transactions = db.transaction("Booking", "readwrite");
  const objectStores = transactions.objectStore("Booking");
  const request = objectStores.delete(id);

  request.onsuccess = function (event) {
    console.log("Car removed");
    location.reload();
  };
}