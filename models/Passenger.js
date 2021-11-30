const { Model } = require("objection");

class Passenger extends Model {
    static tableName() {
        return "Passenger";
    }
}

module.exports =  { Passenger };
