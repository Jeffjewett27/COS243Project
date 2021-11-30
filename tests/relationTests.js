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

const tables = [
    { class: Driver, column: 'id' }, 
    { class: User, column: 'id' }, 
    { class: VehicleType, column: 'id' }, 
    { class: Vehicle, column: 'id' }, 
    { class: Ride, column: 'id' }, 
    //{ class: State, column: 'abbreviation' }, 
    { class: Location, column: 'id' }, 
]

async function runTests() {
    for (let table of tables) {
        let id = 1;
        let tclass = table.class;
        console.log(`Running tests for table ${tclass.tableName()}`);
        //Object.entries(tclass.relationMappings).forEach(entry => {
        for (const key of Object.keys(tclass.relationMappings)) {
            //[key, value] = entry;
            console.log(`Testing relation ${key}`);
            await testRelationForId(tclass, key, table.column, id);
        }
    }

    console.log(`Running tests for table State`);
    for (const key of Object.keys(State.relationMappings)) {
        console.log(`Testing relation ${key}`);
        await testRelationForId(State, key, 'abbreviation', 'CO');
    }

    knex.destroy();
}

runTests()