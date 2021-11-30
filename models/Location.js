const { Model } = require("objection");

class Location extends Model {
    static tableName() {
        return "Location";
    }

    static get relationMappings() {
        return {
            stateObj: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/State',
                join: {
                    from: 'Location.state',
                    to: 'State.abbreviation'
                }
            },
            fromLocations: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocationID'
                }
            },
            toLocations: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'Location.id',
                    to: 'Ride.toLocationID'
                }
            }
        }
    }
}

module.exports = { Location };
