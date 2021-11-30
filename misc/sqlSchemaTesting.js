const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'jerrod_anderson',
        password: 'sunerizu',
        database: 'jerrod_anderson'
    }
});

objection = require('objection');

knex.select('*').from('pg_catalog.pg_tables').where('tableowner', 'like', 'jerrod_anderson').then(result => console.log(result)).then(() => knex.destroy());

//knex.select('*').from('User').then(result => console.log(result));






