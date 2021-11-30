const { Model } = require("objection");

class User extends Model {
    static tableName() {
        return "User";
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Driver',
                join: {
                    from: 'User.id',
                    to: 'Driver.userID'
                }
            },
            rides: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'User.id',
                    through: {
                        from: 'Passenger.userID',
                        to: 'Passenger.rideID'
                    },
                    to: 'Ride.id'
                }
            },
        }
    }
}

module.exports = { User };
