const { Ride } = require("../models/Ride");

// Knex
const knex = require("knex")({
    client: 'postgresql',
    connection: {
      host: 'pg.cse.taylor.edu',
      user: 'jerrod_anderson',
      password: 'sunerizu',
      database: 'jerrod_anderson'
    }
});

//let sql = 'TRUNCATE TABLE Ride RESTART IDENTITY;'
//let sql = 'SELECT * FROM pg_catalog.pg_tables WHERE tableowner LIKE \'jerrod_anderson\'';
let sql = 'SELECT * FROM "public"."Ride"';
knex.raw(sql).then(x=>console.log(x)).catch(e=>console.log(e));//.finally(knex.destroy());
//knex.destroy();