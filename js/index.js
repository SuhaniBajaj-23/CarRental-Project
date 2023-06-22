// const toggleBtn = document.querySelector('.toggle_btn')
// const toggleBtnIcon = document.querySelector('.toggle_btn i')
// const dropDownMenu =  document.querySelector('.dropdown_menu')

// toggleBtn.onclick = function(){
//     dropDownMenu.classList.toggle('open')
//     const isOpen = dropDownMenu.classList.contains('open')

//     toggleBtnIcon.className=isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark'
// }


if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    // return;
}
let db=null;


const request = indexedDB.open('DataBase', 1);

request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
};

request.onsuccess = (event) => {
    // add implementation here
    // console.log("DB successfully created");
    db=event.target.result;
};

request.onupgradeneeded = (event) => {
    let db = event.target.result;
    if (!db.objectStoreNames.contains('User')) {
        let user = db.createObjectStore('User', {
            keyPath: 'email',
            autoIncrement: true
        });
        user.createIndex('email', 'email', { unique: true });
    }
    
    if (!db.objectStoreNames.contains('Car')) {
        let car = db.createObjectStore('Car', {
            keyPath: 'noPlate',
            autoIncrement: true
        });
        car.createIndex('noPlate', 'noPlate', { unique: true });
    }
    if (!db.objectStoreNames.contains('Booking')) {
        let booking = db.createObjectStore('Booking', {
            // keyPath: 'id',
            autoIncrement: true
        });
        console.log("done")
        booking.createIndex('noPlate','noPlate', { unique: false });
    }
    
};

