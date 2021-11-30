
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('User', table => { //#1
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('password');
    table.string('phone');
    table.boolean('isAdmin');
  }) //create table 1
    .then(() => knex.schema.createTableIfNotExists('VehicleType', table => {
      table.increments();
      table.string('type');
    })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('State', table => {
      table.string('abbreviation').primary();
      table.string('name');
    })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('Vehicle', table => {
      table.increments('id');
      table.string('make');
      table.string('model');
      table.string('color');
      table.integer('vehicleTypeID').references('VehicleType.id');
      table.integer('capacity');
      table.float('mpg');
      table.string('licenseState').references('State.abbreviation');
      table.string('licensePlate');
    })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('Driver', table => {
      table.increments('id');
      table.integer('userID').references('User.id');
      table.string('licenseNumber');
      table.string('licenseState').references('State.abbreviation');
    })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('Authorization', table => {
      table.integer('driverID').references('Driver.id');
      table.integer('vehicleID').references('Vehicle.id');
    })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('Location', table => {
      table.increments('id');
      table.string('name');
      table.string('address');
      table.string('city');
      table.string('state');
      table.integer('zipCode');
    })//createTable
    )//then
    .then(() => knex.schema.createTableIfNotExists('Ride', table => {
      table.increments('id');
      table.date('date');
      table.time('time');
      table.float('distance');
      table.float('fuelPrice');
      table.float('fee');
      table.integer('vehicleID').references('Vehicle.id');
      table.integer('fromLocationID').references('Location.id');
      table.integer('toLocationID').references('Location.id');
    })//createTable
    )//then
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

exports.down = function (knex, Promises) {
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













