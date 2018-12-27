class Store{

    constructor(){
        this.drivers = [];
        this.passengers = [];
        this.trips = [];
        this.driverId = 1;
        this.passengerId = 1;
        this.tripId = 1;
    }

    static get store(){
        Store.singleton = Store.singleton || new Store(); 
        return Store.singleton;
    }

}


class Driver{

    static get counter(){
        Driver._counter = (Driver._counter || 0) + 1;
        return Driver._counter;
    }

    constructor(name){
        this.name = name;
        this._id = Driver.counter;
        this.tripsArr = [];
        Store.store.drivers.push(this);
    }

    get id(){
        return this._id;
    }

    addTrip(trip){
        this.tripsArr.push(trip);
    }

    trips(){
        return Store.store.trips.filter((trip) => trip.driver() === this);
    }

    passengers(){
        return Store.store.passengers.filter(p => p.trips().filter(trip => trip.driver() === this).map(trip => trip.passenger()));
    }
}


class Passenger{

    static get counter(){
        Passenger._counter = (Passenger._counter || 0) + 1;
        return Passenger._counter;
    }

    constructor(name){
        this.name = name;
        this._id = Passenger.counter;
        Store.store.passengers.push(this);

    }

    get id(){
        return this._id;
    }

    trips(){
        return Store.store.trips.filter(trip => trip.passenger() === this);
    }

    drivers(){
        return Store.store.trips.filter(trip => trip.passenger() === this).map(trip => trip.driver());
    }
}

class Trip{

    static get counter(){
        Trip._counter = (Trip._counter || 0) + 1;
        return Trip._counter;
    }

    constructor(driver, passenger){
        this._id = Trip.counter;
        this.driverObj = driver;
        this.passengerObj = passenger;
        this.driverId = driver.id;
        this.passengerId = passenger.id;
        Store.store.trips.push(this);
    }

    get id(){
        return this._id;
    }

    driver(){
        return this.driverObj;
    }

    passenger(){
        return this.passengerObj;
    }

}

store = Store.store;

driver = new Driver("micah");
passenger = new Passenger("kristina");
trip = new Trip(driver, passenger);
console.log(passenger);
console.log(driver);
console.log(Store.store);
console.log(driver.trips());