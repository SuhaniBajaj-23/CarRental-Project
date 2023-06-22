setTimeout(()=>{
    function displayBookings() {

        var transaction = db.transaction("Booking", "readonly");
        var objectStore = transaction.objectStore("Booking").openCursor();
    
        objectStore.onsuccess = function (event) {
          var cursor= event.target.result;
          const grid = document.querySelector(".viewCars");
          if(cursor){
            if(cursor.value.user === localStorage.getItem("currentUserEmailUser")){
              let divv = document.createElement('div');
              divv.innerHTML = `<div class="cards">
                                    <div class="image">
                                        <img src=${cursor.value.image} style="height: 200px; width: 350px;">
                                    </div>
                                    <div class="deets">
                                        <div class="carname">${cursor.value.carName}</div>
                                        <div class="price">Total Fare - $${cursor.value.totalFare}</div>
                                        <div class="flex">
                                        <div class="frompick">From : ${cursor.value.address}</div>
                                        <div class="dates">${cursor.value.pickDate} to ${cursor.value.dropDate}</div>
                                        </div>
                                        
                                        <div class="seater">
                                        <div><i class="fa-solid fa-users"></i></div>
                                        <div class="number">${cursor.value.seater}</div>
                                    </div>
                                        <button class="remove" onclick="removeCar('${cursor.key}')">Remove</button>
                                    </div>
                                </div>`;
          grid.appendChild(divv)
          console.log(cursor.key)
            }
            cursor.continue();
          }
        };
      };
      displayBookings();
},900)

function removeCar(id) {
  const transactions = db.transaction("Booking", "readwrite");
  const objectStores = transactions.objectStore("Booking");
  const request = objectStores.delete(parseInt(id));

  request.onsuccess = function (event) {
    location.reload();
    }
}