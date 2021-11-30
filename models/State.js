const { Model } = require("objection");

class State extends Model {
    static tableName() {
        return "State";
    }

    static idColumn() {
        return 'abbreviation';
    }

    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Vehicle',
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.licenseState'
                }
            },
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Driver',
                join: {
                    from: 'State.abbreviation',
                    to: 'Driver.licenseState'
                }
            },
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Location',
                join: {
                    from: 'State.abbreviation',
                    to: 'Location.state'
                }
            }
        }
    }
}

module.exports = { State };
