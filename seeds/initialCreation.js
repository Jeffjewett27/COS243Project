
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
    .then(function () {return knex.schema.raw(`TRUNCATE TABLE "public"."Driver" RESTART IDENTITY CASCADE;`)})
    .then(function () {return knex.schema.raw(`TRUNCATE TABLE "public"."Ride" RESTART IDENTITY CASCADE;`)})
    .then(function () {return knex.schema.raw(`TRUNCATE TABLE "public"."Location" RESTART IDENTITY CASCADE;`)})
    .then(function () {return knex.schema.raw(`TRUNCATE TABLE "public"."Vehicle" RESTART IDENTITY CASCADE;`)})
    .then(function () {return knex.schema.raw(`TRUNCATE TABLE "public"."VehicleType" RESTART IDENTITY CASCADE;`)})
    .then(function () {return knex.schema.raw(`TRUNCATE TABLE "public"."User" RESTART IDENTITY CASCADE;`)})
    .then(function () { //1
      // Inserts seed entries
      return knex('User').insert([
        {firstName: 'Jerrod', lastName: 'anderson', email:'jerrod@derson.us', password:'no', phone: '7203630816', isAdmin: 't'},
        {firstName: 'Jeff', lastName: 'Jewett', email:'jeff_jewett@taylor.edu', password:'no', phone: '5555555555', isAdmin: 't'},
        {firstName: 'Jason', lastName: 'Doster', email:'jason_doster@taylor.edu', password:'no', phone: '5555555555', isAdmin: 't'},
        {firstName: 'Tom', lastName: 'Nurkkala', email:'tnurkkala@taylor.edu', password:'ye', phone: '4444444444', isAdmin: 'f'}
      ]);//closing insert
    })//closes .then 1
    .then(function () { 
      return knex('VehicleType').insert([
        {type: 'Truck'},
        {type: 'Midsize'},
        {type: 'Tree Hugger'},
        {type: 'Bug'}
      ]);//closing insert
    })
    .then(function () { 
      return knex('State').insert([
        {abbreviation: 'AL', name: 'Alabama'},
        {abbreviation: 'AK', name: 'Alaska'},
        {abbreviation: 'AZ', name: 'Arizona'},
        {abbreviation: 'AR', name: 'Arkansas'},
        {abbreviation: 'CA', name: 'California'},
        {abbreviation: 'CO', name: 'Colorado'},
        {abbreviation: 'CT', name: 'Connecticut'},
        {abbreviation: 'DE', name: 'Deleware'},
        {abbreviation: 'FL', name: 'Florida'},
        {abbreviation: 'GA', name: 'Georgia'},
        {abbreviation: 'HI', name: 'Hawaii'},
        {abbreviation: 'ID', name: 'Idaho'},
        {abbreviation: 'IL', name: 'Illinois'},
        {abbreviation: 'IN', name: 'Indiana'},
        {abbreviation: 'IA', name: 'Iowa'},
        {abbreviation: 'KS', name: 'Kansas'},
        {abbreviation: 'KY', name: 'Kentucky'},
        {abbreviation: 'LA', name: 'Louisianna'},
        {abbreviation: 'ME', name: 'Maine'},
        {abbreviation: 'MD', name: 'Maryland'},
        {abbreviation: 'MA', name: 'Massachussetts'},
        {abbreviation: 'MI', name: 'Michigan'},
        {abbreviation: 'MN', name: 'Minnesota'},
        {abbreviation: 'MS', name: 'Mississippi'},
        {abbreviation: 'MO', name: 'Missouri'},
        {abbreviation: 'MT', name: 'Montana'},
        {abbreviation: 'NE', name: 'Nebraska'},
        {abbreviation: 'NV', name: 'Nevada'},
        {abbreviation: 'NH', name: 'New Hampshire'},
        {abbreviation: 'NJ', name: 'New Jersey'},
        {abbreviation: 'NM', name: 'New Mexico'},
        {abbreviation: 'NY', name: 'New York'},
        {abbreviation: 'NC', name: 'North Caroline'},
        {abbreviation: 'ND', name: 'North Dakota'},
        {abbreviation: 'OH', name: 'Ohio'},
        {abbreviation: 'OK', name: 'Oklahoma'},
        {abbreviation: 'OR', name: 'Oregon'},
        {abbreviation: 'PA', name: 'Pennsylvania'},
        {abbreviation: 'RI', name: 'Rhode Island'},
        {abbreviation: 'SC', name: 'South Carolina'},
        {abbreviation: 'SD', name: 'South Dakota'},
        {abbreviation: 'TN', name: 'Tennessee'},
        {abbreviation: 'TX', name: 'Texas'},
        {abbreviation: 'UT', name: 'Utah'},
        {abbreviation: 'VT', name: 'Vermont'},
        {abbreviation: 'VA', name: 'Virginia'},
        {abbreviation: 'WA', name: 'Washington'},
        {abbreviation: 'WV', name: 'West Virginia'},
        {abbreviation: 'WI', name: 'Wisconsin'},
        {abbreviation: 'WY', name: 'Wyoming'},
      ]);//closing insert
    })
    .then(function () { 
      return knex('Vehicle').insert([
        {make: 'Ford', model: 'F150', color: 'white', vehicleTypeID: 1, capacity: 5, mpg: 11.0, licenseState: 'CO', licensePlate: 'HQY-999'},
        {make: 'Ram', model: '1500', color: 'poop Brown', vehicleTypeID: 1, capacity: 4, mpg: 16.0, licenseState: 'CO', licensePlate: 'ILU-VMN'},
        {make: 'Toyota', model: 'Prius', color: 'green', vehicleTypeID: 3, capacity: 6, mpg: 50, licenseState: 'CO', licensePlate: 'LUV-YOU'},
        {make: 'GM', model: 'Racer', color: 'lightning', vehicleTypeID: 3, capacity: 8, mpg: 12, licenseState: 'CO', licensePlate: 'BIG-BOI'}
      ]);//closing insert
    })
    .then(function () { 
      return knex('Location').insert([
        {name: 'City Land', address: 'RA 1', city: 'HR', state: 'CO', zipCode: 80130},
        {name: 'buttF nowhere', address: 'RA 1', city: 'Upland', state: 'IN', zipCode: 46989},
        {name: 'OilConquest1', address: 'RA 1', city: 'HR', state: 'IN', zipCode: 55555},
        {name: 'Billy and Son', address: '69 Addison', city: 'Doug', state: 'IN', zipCode: 54321},
      ]);//closing insert
    })
    .then(function () { 
      return knex('Ride').insert([
        {date: '2020-02-08', time: '04:05', distance: 1000.0, fuelPrice: 100, fee: 3000, vehicleID: 1, fromLocationID: 1, toLocationID: 2},
        {date: '1999-01-08', time: '04:05', distance: 500.0, fuelPrice: 20, fee: 3000, vehicleID: 2, fromLocationID: 2, toLocationID: 3},
        {date: '1999-01-08', time: '04:05', distance: 100.0, fuelPrice: 10, fee: 900000, vehicleID: 3, fromLocationID: 3, toLocationID: 1},
        {date: '1999-01-08', time: '04:05', distance: 10.0, fuelPrice: 12, fee: 900, vehicleID: 3, fromLocationID: 3, toLocationID: 1},
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
        {userID: 1, licenseNumber: 'licenceNumber1', licenseState: 'CO'},
        {userID: 2, licenseNumber: 'licenceNumber2', licenseState: 'IN'},
        {userID: 3, licenseNumber: 'licenceNumber3', licenseState: 'WA'},
        {userID: 3, licenseNumber: 'licenceNumber4', licenseState: 'CO'},
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
