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

async function testInsert(sourceClass, obj) {
    const trx = await sourceClass.startTransaction();

    try {
        const inserted = await sourceClass.query(trx).insert(obj);
        console.log(inserted);
    } catch (e) {
        console.log(e);
    } finally {
        trx.rollback();
    }
}

const testObjects = [
    {
        source: User, 
        obj: {
            id: 5,
            firstName: "Joe",
            lastName: "Mama", 
            email: 'joe@mama.com', 
            password: 'mama69joe', 
            phone: '123-456-7890', 
            isAdmin: true
        }
    },
    {
        source: Driver,
        obj: {
            id: 4,
            userID: 1,
            licenseNumber: '02asfsd',
            licenseState: 'IN'
        }
    }
]

async function runTests() {
    for (test of testObjects) {
        console.log(`Testing insertion for class ${test.source.tableName()}`);
        await testInsert(test.source, test.obj);
    }

    knex.destroy();
}

runTests();