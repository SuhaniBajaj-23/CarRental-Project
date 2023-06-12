
function logout(){
    var logout = localStorage.setItem("code", "logout")
    window.location.href = "../../index.html"
}

var divContainer = document.querySelector('.carContainer');
// var userKey = JSON.parse(localStorage.getItem('userKey'));
var basket;
function read() {
  var idb = indexedDB.open('Accounts', 2);
  idb.onsuccess = function () {
    let request = idb.result;
    let transaction = request.transaction('User', 'readonly');
    let store = transaction.objectStore('User');

    var getData = store.get(userKey);
    getData.onsuccess = function (event) {
      var record = event.target.result;
      basket = record.bookingHistory;
      console.log(basket);

      if (basket.length !== 0) {
        basket.map(function (rentCar) {
          divContainer.innerHTML += `
                    <ul class="featured-car-list">
                    <li>
                    <div class="featured-car-card">
    
                        <div class="card-content">
    
                            <div class="card-title-wrapper">
                                <h3 class="h3 card-title">
                                    <a>${rentCar.model}</a>
                                </h3>
                            </div>
    
                            <ul class="card-list">
                            <li class="card-list-item">
                                <ion-icon name="partly-sunny-outline"></ion-icon>
                                <span class="card-item-text">Booked for: ${rentCar.days} Days</span>
                            </li>
    
                            <li class="card-list-item">
                                <ion-icon name="cash-outline"></ion-icon>
                                <span class="card-item-text">Total Pay: ₹${rentCar.totalPay}</span>
                            </li>
                            <li class="card-list-item">
                                <ion-icon name="calendar-outline"></ion-icon>
                                <span class="card-item-text">Pickup Date: ${rentCar.pickupDate}</span>
                            </li>
                            <li class="card-list-item">
                                <ion-icon name="calendar-outline"></ion-icon>
                                <span class="card-item-text">Return Date: ${rentCar.returnDate}</span>
                            </li>
                        </div>
    
                    </div>
                </li>
            </ul>
                    `;
        });
      } else {
        divContainer.innerHTML += `
                <ul class="featured-car-list">
                    <li>
                    <div class="featured-car-card">
    
                        <div class="card-content">
                            <div class="card-title-wrapper">
                                <h3 class="h3 card-title" style="text-align: center;">
                                    No Bookings Yet!
                                </h3>
                            </div>
                        </div>
                    </div>
                    </li>
                </ul>
                `;
      }
    };
  };
}

read();