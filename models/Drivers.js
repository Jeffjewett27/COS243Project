const { Model } = require("objection");

class Drivers extends Model {
    static tableName() {
        return "Drivers";
    }

    static idColumn() {
        return ["rideID", "driverID"];
    }
}

module.exports = { Drivers };
