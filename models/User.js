const { Model } = require("objection");
const { hash, compare } = require("bcrypt");

const SALT_ROUNDS = 10;

class User extends Model {
    static get tableName() {
        return "User";
    }

    async $beforeInsert(queryContext) {
    this.password = await hash(this.password, SALT_ROUNDS);
    }

    async $beforeUpdate(queryContext) {
    this.password = await hash(this.password, SALT_ROUNDS);
    }

    async verifyPassword(plainTextPassword) {
    return compare(plainTextPassword, this.password);
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
