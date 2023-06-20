function logout(){
    var logout = localStorage.setItem("code", "logout")
window.location.href = "../../index.html"
}
var carForm = document.querySelector("#detailsForm");

function rent(key){
    
    var transaction1 = db.transaction('Car','readonly');
    var objectStore1 = transaction1.objectStore("Car");
    var data = objectStore1.get(key);
    if (checkEmpty()) {
    data.onsuccess=(event)=>{
                var tx = db.transaction('Booking','readwrite');
                var os = tx.objectStore("Booking");
                var req = os.openCursor(key);
                req.onsuccess =(e)=>{
                    var res = e.target.result; 
                    if(res){
                        alert("car is currently unavailable");
                    }else{
                        var currentDate = new Date();
                    var time = currentDate.getTime();
                    const enUSFormatter = new Intl.DateTimeFormat('en-US');

                    var fare = totalFare(data);
                    if (typeof fare === 'undefined') {
                        alert("enter valid details");
                    }else{
                        var details = {
                            owner:data.result.owner,
                            time:enUSFormatter.format(time),
                            user: localStorage.getItem("currentUserEmailUser"),
                            noPlate: data.result.noPlate,
                            name: data.result.name,
                            price: data.result.price,
                            number: data.result.number,
                            image:data.result.image,
                            address:carForm[0].value,
                            pickDate:carForm[1].value,
                            dropDate:carForm[2].value,
                            pickTime:carForm[3].value,
                            totalFare: fare,
                            stock: 0
                        }
        
                        os.add(details);
                        alert("car booked")
                    }
                    }
                }
                // console.log("entered event")
                
                
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
        // alert('enter valid dates!');
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
    
        objectStore.onsuccess = function (event) {
          var cursor= event.target.result;
          console.log(cursor)
          const grid = document.querySelector(".cards");
          if(cursor){
            var car = cursor.value;
            let divv = document.createElement('div');
              divv.innerHTML = `<div class="card">
                                    <div class="image">
                                        <img style="height: 200px; width: 400px;" src=${car.image}>
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

// function check(key){
//     var transaction = db.transaction("Booking", "readonly");
//     var objectStore = transaction.objectStore("Booking").openCursor();
//     var x=0;

//     objectStore.onsuccess = function (event) {
//         var cursor= event.target.result;
//         if(cursor){
//           var car = cursor.value;
//           if(car.noPlate === key){
//             var d1=new Date(car.pickDate);
//             var d2=new Date(car.dropDate);
//             var date1 = d1.getTime();
//             var date2 = d2.getTime();
//             var d3=  new Date(carForm[1].value);
//             var d4 = new Date(carForm[2].value);
//             var date3 = d3.getTime();
//             var date4 = d4.getTime();
//             console.log(date1);
//             console.log(date2);
//             console.log(date3);
//             console.log(date4);
//             if(date4<date1){
//                 x=0;
//             }else if(date3>date2){
//                 x=0;
//             }else{
//                 x=1;
//             }
//           }
//           cursor.continue();
//         }
//         if(x===0){
//             rent(key);
//         }else{
//             alert("car unavailable within these dates");

//         }
//       };
// }