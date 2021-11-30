const { Model } = require("objection");

class Drivers extends Model {
    static tableName() {
        return "Drivers";
    }
}

module.exports = { Drivers };
