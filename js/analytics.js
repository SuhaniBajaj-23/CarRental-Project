var ctx = document.getElementById('myChart').getContext('2d');
var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
// var ctx3 = document.getElementById('myChart3').getContext('2d');
// var ctx4 = document.getElementById('myChart4').getContext('2d');
// var ctx5 = document.getElementById('myChart5').getContext('2d');

var carBookingNumber = [];
var revenueValues = [];
var eachCarBooking=[];
var eachCar=[];
var revenueOfCars=[];
var object=[];

// function hello(){
  
// const transactionS = db.transaction("Booking", "readonly");
// const objectStoreS = transactionS.objectStore("Booking");
// let Index = objectStoreS.index("user");
// object = Index.getAll(localStorage.getItem("currentUserEmailAdmin"));
//  object.onsuccess = () =>{
//   var res = object.result;
//   console.log(res)

//   return res;
//  }

// }

setTimeout(()=>{
  function calculate() {
    const transactions = db.transaction("Booking", "readonly");
    const objectStores = transactions.objectStore("Booking");
    const cur = objectStores.openCursor();
  
    cur.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        if(cursor.value.owner === localStorage.getItem("currentUserEmailAdmin")){
        var d1 = new Date(cursor.value.bookingDate);
        var month = d1.getMonth();
  
        if (!carBookingNumber[month]) {
          carBookingNumber[month] = 0;
        }

        if (!revenueValues[month]) {
          revenueValues[month] = 0;
        }
  
        carBookingNumber[month] = carBookingNumber[month] + 1;
        revenueValues[month] = revenueValues[month] + cursor.value.totalFare;
      }
        cursor.continue();
      }else{
        var myChart1 = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Revenue per month',
                data: revenueValues,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
          
        });

        var myChart1 = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Number of bookings per month',
                data: carBookingNumber,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
          
        });
      }
      
    };
    
  }
  // hello();
  calculate();
  getBookings();
  // fourthChart();
  
  
},900)

// setTimeout(()=>{
function getBookings() {
  
    const transactionS = db.transaction("Booking", "readonly");
    const objectStoreS = transactionS.objectStore("Booking").openCursor();

    objectStoreS.onsuccess = function (event) {
      var curSor = event.target.result;
      if (curSor) {
        if (curSor.value.owner === localStorage.getItem("currentUserEmailAdmin")) {
          eachCarBooking.push(curSor.value.carName);
        }
        curSor.continue();
    }else{

    var occurrences = eachCarBooking.reduce(function (acc, curr) {
      return acc[curr] ? acc[curr]++ : acc[curr] = 1, acc
    }, {});
    // console.log(occurrences)
    // fourthChart(Object.keys(occurrences));
    var myChart1 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: Object.keys(occurrences),
        datasets: [
          {
            label: 'Car Bookings per Car',
            data: Object.values(occurrences),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      
    });
    }
  }
}

// function fourthChart(eachh){
  
//   for(var x in eachh){
//     console.log(eachh[x]);
//     // revenueOfCars.push(getRevenue(eachh[x]));
//   }
//   // console.log(revenueOfCars)
    
//   var myChart1 = new Chart(ctx3, {
//     type: 'bar',
//     data: {
//       labels: eachh,
//       datasets: [
//         {
//           label: 'Revenue per Car',
//           data: revenueOfCars,
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)',
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     },
    
//   });
// }

// function getRevenue(item) {    
//   // console.log(item)
//   // const transactionS = db.transaction("Booking", "readonly");
//   // const objectStoreS = transactionS.objectStore("Booking").openCursor();
//   var sum=0;
  // objectStoreS.onsuccess = function (event) {
  //   var curSor = event.target.result;
      // if ( === localStorage.getItem("currentUserEmailAdmin")) {
//         if(curSor.value.carName === item){
//           console.log("yes")
//           sum=sum+curSor.value.totalFare;
//         }
//     }
//   }else{
//     // console.log(sum)
//     revenueOfCars.push(sum);
//     // return sum;
//   }
//   // console.log(revenueOfCars)
//   // console.log(sum)
// }
