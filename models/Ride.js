const { Model } = require("objection");

class Ride extends Model {
    static tableName() {
        return "Ride";
    }

    static get relationMappings() {
        return {
            toLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Location',
                join: {
                    from: 'Ride.toLocationID',
                    to: 'Location.id'
                }
            },
            fromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Location',
                join: {
                    from: 'Ride.fromLocationID',
                    to: 'Location.id'
                }
            },
            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Vehicle',
                join: {
                    from: 'Ride.vehicleID',
                    to: 'Vehicle.id'
                }
            },
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Driver',
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Drivers.rideID',
                        to: 'Drivers.driverID'
                    },
                    to: 'Driver.id'
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Passenger.rideID',
                        to: 'Passenger.userID'
                    },
                    to: 'User.id'
                }
            },
        }
    }
}

module.exports = { Ride };
