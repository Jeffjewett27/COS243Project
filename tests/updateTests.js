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

var numUpdated = 0;

async function testUpdate(sourceClass, obj) {
    const trx = await sourceClass.startTransaction();

    try {
        const inserted = await sourceClass.query(trx).findById(obj.id).patch(obj);
        console.log(inserted);
        if (inserted) {
            numUpdated++;
        }
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
            id: 1,
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
            id: 1,
            userID: 1,
            licenseNumber: '02asfsd',
            licenseState: 'IN'
        }
    },
    {
        source: VehicleType,
        obj: {
            id: 1,
            type: "Lambo"
        }
    },
    {
        source: Vehicle,
        obj: {
            id: 1,
            make: 'John Deere', 
            model: 'P40', 
            color: 'green', 
            vehicleTypeID: 1, 
            capacity: 50, 
            mpg: 1.0, 
            licenseState: 'CO', 
            licensePlate: 'NULL'
        }
    },
    {
        source: Ride,
        obj: {
            id: 1,
            date: '2020-02-29', 
            time: '04:02', 
            distance: 100.0, 
            fuelPrice: 10, 
            fee: 300, 
            vehicleID: 1, 
            fromLocationID: 1, 
            toLocationID: 2
        }
    },
    {
        source: Location,
        obj: {
            id: 1,
            name: 'Beef Co', 
            address: '42 Moo St', 
            city: 'Steakford', 
            state: 'WI', 
            zipCode: 12345
        }
    },
]

async function runTests() {
    for (test of testObjects) {
        console.log(`Testing update for class ${test.source.tableName()}`);
        await testUpdate(test.source, test.obj);
    }

    knex.destroy();
    console.log(`${numUpdated} tests passed`);
}

runTests();