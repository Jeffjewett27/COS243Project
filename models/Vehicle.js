const { Model } = require("objection");

class Vehicle extends Model {
    static tableName() {
        return "Vehicle";
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Driver',
                join: {
                    from: 'Vehicle.id',
                    through: {
                        from: 'Authorization.vehicleID',
                        to: 'Authorization.driverID'
                    },
                    to: 'Driver.id'
                }
            },
            vehicleType: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/VehicleType',
                join: {
                    from: 'Vehicle.id',
                    to: 'VehicleType.id'
                }
            },
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/State',
                join: {
                    from: 'Vehicle.licenseState',
                    to: 'State.abbreviation'
                }
            },
            ride: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'Vehicle.id',
                    to: 'Ride.vehicleID'
                }
            },
        }
    }
}

module.exports = { Vehicle };
