
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Passenger').del()
    .then(function () {return knex('Drivers').del()})
    .then(function () {return knex('Ride').del()})
    .then(function () {return knex('Location').del()})
    .then(function () {return knex('Authorization').del()})
    .then(function () {return knex('Driver').del()})
    .then(function () {return knex('Vehicle').del()})
    .then(function () {return knex('State').del()})
    .then(function () {return knex('VehicleType').del()})
    .then(function () {return knex('User').del()})
    .then(function () { //1
      // Inserts seed entries
      return knex('User').insert([
        {id: 1, firstName: 'Jerrod', lastName: 'anderson', email:'jerrod@derson.us', password:'no', phone: '7203630816', isAdmin: 't'},
        {id: 2, firstName: 'Jeff', lastName: 'Jewett', email:'jeff_jewett@taylor.edu', password:'no', phone: '5555555555', isAdmin: 't'},
        {id: 3, firstName: 'Jason', lastName: 'Doster', email:'jason_doster@taylor.edu', password:'no', phone: '5555555555', isAdmin: 't'},
        {id: 4, firstName: 'Tom', lastName: 'Nurkkala', email:'tnurkkala@taylor.edu', password:'ye', phone: '4444444444', isAdmin: 'f'}
      ]);//closing insert
    })//closes .then 1
    .then(function () { 
      return knex('VehicleType').insert([
        {id: 1, type: 'Truck'},
        {id: 2, type: 'Midsize'},
        {id: 3, type: 'Tree Hugger'},
        {id: 4, type: 'Bug'}
      ]);//closing insert
    })
    .then(function () { 
      return knex('State').insert([
        {abbreviation: 'CO', name: 'Colorado'},
        {abbreviation: 'IN', name: 'Indiana'},
        {abbreviation: 'WA', name: 'Washington'},
        {abbreviation: 'HI', name: 'Hawaii'}
      ]);//closing insert
    })
    .then(function () { 
      return knex('Vehicle').insert([
        {id: 1, make: 'Ford', model: 'F150', color: 'white', vehicleTypeID: 1, capacity: 5, mpg: 11.0, licenseState: 'CO', licensePlate: 'HQY-999'},
        {id: 2, make: 'Ram', model: '1500', color: 'poop Brown', vehicleTypeID: 1, capacity: 4, mpg: 16.0, licenseState: 'CO', licensePlate: 'ILU-VMN'},
        {id: 3, make: 'Toyota', model: 'Prius', color: 'green', vehicleTypeID: 3, capacity: 6, mpg: 50, licenseState: 'CO', licensePlate: 'LUV-YOU'},
        {id: 4, make: 'GM', model: 'Racer', color: 'lightning', vehicleTypeID: 3, capacity: 8, mpg: 12, licenseState: 'CO', licensePlate: 'BIG-BOI'}
      ]);//closing insert
    })
    .then(function () { 
      return knex('Location').insert([
        {id: 1, name: 'City Land', address: 'RA 1', city: 'HR', state: 'CO', zipCode: 80130},
        {id: 2, name: 'buttF nowhere', address: 'RA 1', city: 'Upland', state: 'IN', zipCode: 46989},
        {id: 3, name: 'OilConquest1', address: 'RA 1', city: 'HR', state: 'IN', zipCode: 55555},
        {id: 4, name: 'Billy and Son', address: '69 Addison', city: 'Doug', state: 'IN', zipCode: 54321},
      ]);//closing insert
    })
    .then(function () { 
      return knex('Ride').insert([
        {id: 1, date: '2020-02-08', time: '04:05', distance: 1000.0, fuelPrice: 100, fee: 3000, vehicleID: 1, fromLocationID: 1, toLocationID: 2},
        {id: 2, date: '1999-01-08', time: '04:05', distance: 500.0, fuelPrice: 20, fee: 3000, vehicleID: 2, fromLocationID: 2, toLocationID: 3},
        {id: 3, date: '1999-01-08', time: '04:05', distance: 100.0, fuelPrice: 10, fee: 900000, vehicleID: 3, fromLocationID: 3, toLocationID: 1},
        {id: 4, date: '1999-01-08', time: '04:05', distance: 10.0, fuelPrice: 12, fee: 900, vehicleID: 3, fromLocationID: 3, toLocationID: 1},
      ]);//closing insert
    })
    .then(function () { 
      return knex('Passenger').insert([
        {userID: 1, rideID: 1},
        {userID: 3, rideID: 2},
        {userID: 2, rideID: 3}
      ]);//closing insert
    })
    .then(function () { 
      return knex('Driver').insert([
        {id: 1, userID: 1, licenseNumber: 'licenceNumber1', licenseState: 'CO'},
        {id: 2, userID: 2, licenseNumber: 'licenceNumber2', licenseState: 'IN'},
        {id: 3, userID: 3, licenseNumber: 'licenceNumber3', licenseState: 'WA'},
        {id: 4, userID: 3, licenseNumber: 'licenceNumber4', licenseState: 'CO'},
      ]);//closing insert
    })
    .then(function () { 
      return knex('Authorization').insert([
        {driverID: 1, vehicleID: 1},
        {driverID: 2, vehicleID: 2},
        {driverID: 3, vehicleID: 3}
      ]);//closing insert
    })
    .then(function () { 
      return knex('Drivers').insert([
        {driverID: 1, rideID: 1},
        {driverID: 2, rideID: 2},
        {driverID: 3, rideID: 3}
      ]);//closing insert
    })
    ;
};
