function logout(){
    var logout = localStorage.setItem("code", "logout")
window.location.href = "../../index.html"
}
var carForm = document.querySelector("#detailsForm");

function rent(key){
    
    var transaction1 = db.transaction('Car','readonly');
    var objectStore1 = transaction1.objectStore("Car");
    var data = objectStore1.get(key);
    // console.log("hello")
    if (checkEmpty()) {
    data.onsuccess=(event)=>{
        // console.log("got it")
        // console.log(data)
                var tx = db.transaction('Booking','readwrite');
                var os = tx.objectStore("Booking");
                var fare = totalFare(data);
                var details ={
                    noPlate: data.result.noPlate,
                    name: data.result.name,
                    price: data.result.price,
                    number: data.result.number,
                    address:carForm[0].value,
                    pickDate:carForm[1].value,
                    dropDate:carForm[2].value,
                    pickTime:carForm[3].value,
                    totalFare: fare,
                    stock: 0
                }

                os.add(details);
            }

    data.onerror = (event)=>{
        console.log("error retrieving record");
    }
} else{
    alert("fill all the details");
}
}

function checkEmpty() {
    return (
      carForm[0].value != "" && carForm[1].value != "" && carForm[2].value != ""
    );
  }

  function totalFare(data){
    var d1 = new Date(carForm[1].value);
    var d2 = new Date(carForm[2].value);
    var today = new Date();
    today.setHours(0,0,0,0);

    var time = d2.getTime() - d1.getTime();
    var days = time / (1000 * 3600 *24);
    if(time<0 || !isValidDate(d1) || !isValidDate(d2) || today>d1){
        alert('enter valid dates!');
    }else{
        var totalFare = parseInt(data.result.price*days);
        return totalFare;
    }
  }

  var isValidDate = function (date) {
    return date instanceof Date && !isNaN(date);
  };


setTimeout(()=>{
    function displayCars() {
        var transaction = db.transaction("Car", "readonly");
        var objectStore = transaction.objectStore("Car").openCursor();
        // const getAllRequest = objectStore.getAll();
    
        objectStore.onsuccess = function (event) {
          var cursor= event.target.result;
          // const carData = objectStore.result;/
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
                                            <button class="btn" onclick="rent('${car.noPlate}')">Book</button>
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
