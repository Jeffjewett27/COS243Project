
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('Authorization', table => {
                   table.integer('driverID').references('Driver.id');
                   table.integer('vehicleID').references('Vehicle.id');
      }) //create table 1
    .then(() => knex.schema.createTableIfNotExists('Passenger', table => {
                   table.integer('userID').references('Ride.id');
                   table.integer('rideID').references('User.id');
      })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('Drivers', table => {
                   table.integer('driverID').references('Driver.id');
                   table.integer('rideID').references('Ride.id');
      })//createTable
    )
    .then(result => console.log('done'))
    .catch(error => console.log(error.message));
    ;
};

exports.down = function(knex, Promises) {
  return knex.schema.dropTableIfExists('Authorization')
                    .dropTableIfExists('Drivers')
                    .dropTableIfExists('Passenger')
                    .dropTableIfExists('Driver')
                    .dropTableIfExists('User')
                    .dropTableIfExists('Ride')
                    .dropTableIfExists('Vehicle')
                    .dropTableIfExists('VehicleType')
                    .dropTableIfExists('Location')
                    .dropTableIfExists('State');
};













