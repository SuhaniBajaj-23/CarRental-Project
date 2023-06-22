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
            autoIncrement: true
        });
        console.log("done")
        booking.createIndex('noPlate','noPlate', { unique: false });
    }
    
};

