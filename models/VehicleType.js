const { Model } = require("objection");

class VehicleType extends Model {
    static tableName() {
        return "VehicleType";
    }

    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Vehicle',
                join: {
                    from: 'VehicleType.id',
                    to: 'Vehicle.vehicleTypeID'
                }
            }
        }
    }
}

module.exports = { VehicleType };
