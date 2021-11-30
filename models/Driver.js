const { Model } = require("objection");

class Driver extends Model {
    static tableName() {
        return "Driver";
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'Driver.userID',
                    to: 'User.id'
                }
            },
            vehicles: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Vehicle',
                join: {
                    from: 'Driver.id',
                    through: {
                        from: 'Authorization.driverID',
                        to: 'Authorization.vehicleID'
                    },
                    to: 'Vehicle.id'
                }
            },
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'Driver.id',
                    through: {
                        from: 'Drivers.driverID',
                        to: 'Drivers.rideID'
                    },
                    to: 'Ride.id'
                }
            },
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/State',
                join: {
                    from: 'Driver.licenseState',
                    to: 'State.abbrevation'
                }
            },
        }
    }
}

module.exports = { Driver };
