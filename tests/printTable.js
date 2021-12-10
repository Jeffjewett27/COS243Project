var knex = require('knex')(require('../knexfile').development)

let name = process.argv[2]
knex.from(name).then(x=>console.log(x)).catch(e=>console.log(e));