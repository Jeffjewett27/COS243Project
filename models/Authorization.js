const { Model } = require("objection");

class Authorization extends Model {
    static tableName() {
        return "Authorization";
    }
}

module.exports = { Authorization };
