var carForm = document.querySelector(".fields");
var carPic= document.querySelector('#image');
var carPicInput = null;


var carsData = function () {
    var tx = db.transaction("Car", "readwrite");
    var store = tx.objectStore("Car");
    if (checkEmpty()) {
      alert("car added successfully");
      var owner = localStorage.getItem("currentUserEmailAdmin");
      owner.replace(/[" [\]]/g, '');
      store.add({
        owner:owner,
        carName: carForm[0].value.trim(),
        noPlate: carForm[1].value.trim(),
        rentPrice: carForm[2].value.trim(),
        seater: carForm[3].value.trim(),
        image: String(carPicInput),
      }); 
      
      location.reload();
    } else {
      alert("fill all details");
      // e.preventDefault();
    }
    displayCars();
  };

function checkEmpty() {
  return (
    carForm[0].value.trim() != "" && carForm[1].value.trim() != "" && carForm[2].value.trim() != "" && carForm[3].value.trim() != "" && carForm[4].value != ""
  );
}

carPic.addEventListener('change', function(e) {
  var file = carPic.files[0];
  var imageType = /image.*/;

  if (file.type.match(imageType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
          var img = new Image();
          carPicInput = reader.result;
          console.log(carPicInput);

      }
      reader.readAsDataURL(file);	
  } else {
      console.log("File not supported!");
  }
});

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
        if(car.owner === localStorage.getItem("currentUserEmailAdmin")){
          let divv = document.createElement('div');
          divv.innerHTML = `<div class="card">
                                <div class="image">
                                    <img style="height: 200px; width: 400px;" src=${car.image}>
                                </div><br>
                                <div class="label">
                                    <div class="top">
                                        <div class="name">${car.carName}</div>
                                    <div class="price"><b>$ ${car.rentPrice} /day</b></div>
                                    </div>
                                    <div class="low">
                                        <div class="seater">
                                            <i class="fa-solid fa-users"></i>
                                            <div class="number">${car.seater}</div>
                                        </div>
                                        <button class="btn" onclick="removeCar('${car.noPlate}')">Remove</button>
                                    </div>
                                    
                                </div>
                            </div>`;
      grid.appendChild(divv)
        }
      cursor.continue();
      }
    };
  };
  displayCars();
},900)


function removeCar(id) {
  const transactions = db.transaction("Car", "readwrite");
  const objectStores = transactions.objectStore("Car");
  const request = objectStores.delete(id); 

  request.onsuccess = function (event) {
    console.log("Car removed");
    location.reload();
  };
}
