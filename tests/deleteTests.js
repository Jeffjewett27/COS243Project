const { testRelationForId } = require('./testUtils');
var knex = require('knex')(require('../knexfile').development)

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

const { User } = require('../models/User.js');
const { Driver } = require('../models/Driver.js');
const { Vehicle } = require('../models/Vehicle.js');
const { Ride } = require('../models/Ride.js');
const { VehicleType } = require('../models/VehicleType.js');
const { State } = require('../models/State.js');
const { Location } = require('../models/Location.js');

async function testDelete(sourceClass, pk) {
    const trx = await sourceClass.startTransaction();

    let column = sourceClass.idColumn === 'function' ? sourceClass.idColumn() : 'id';
    if (!column) {
        column = 'id';
    }
    try {
        const deleted = await sourceClass.query(trx).delete().where(column, pk);
        console.log(`Num deleted: ${deleted}`);
    } catch (e) {
        console.log(e);
    } finally {
        trx.rollback();
    }
}

const testObjects = [
    {
        source: User, 
        id: 4
    },
    {
        source: Driver,
        id: 4
    }
]

async function runTests() {
    for (test of testObjects) {
        console.log(`Testing insertion for class ${test.source.tableName()}`);
        await testDelete(test.source, test.id);
    }

    knex.destroy();
}

runTests();