// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: 'pg.cse.taylor.edu',
      user: 'jerrod_anderson',
      password: 'sunerizu',
      database: 'jerrod_anderson'
  },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const Account = require("./models/Account");

const { User } = require('../models/User.js'); 
const { Driver } = require('../models/Driver.js');
const { Vehicle } = require('../models/Vehicle.js');
const { Ride } = require('../models/Ride.js');
const { VehicleType } = require('../models/VehicleType.js');
const { State } = require('../models/State.js');
const { Location } = require('../models/Location.js');

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true,
  },
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  // Configure routes.
  server.route([
    {
      method: "POST",
      path: "/accounts",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newAccount = await Account.query().insert({
          first_name: request.payload.firstName,
          last_name: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
        });

        if (newAccount) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create account with email '${request.payload.email}'`,
          };
        }
      },
    },

    {
      method: "GET",
      path: "/accounts",
      config: {
        description: "Retrieve all accounts",
      },
      handler: (request, h) => {
        return Account.query();
      },
    },

    {
      method: "DELETE",
      path: "/accounts/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        return Account.query()
          .deleteById(request.params.id)
          .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted account with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete account with ID '${request.params.id}'`,
              };
            }
          });
      },
    },

    {
      method: "POST",
      path: "/login",
      config: {
        description: "Log in",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const account = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (
          account &&
          (await account.verifyPassword(request.payload.password))
        ) {
          return {
            ok: true,
            msge: `Logged in successfully as '${request.payload.email}'`,
            details: {
              id: account.id,
              firstName: account.first_name,
              lastName: account.last_name,
              email: account.email,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },

    {
      method: "POST",
      path: "/locations",
      handler: (request, h) => {
        var body=JSON.parse(request.payload);
        return Location.query().insert(body);
    }
    },
    {
      method: "POST",
      path: "/rides",
      handler: (request, h) => {
        var body=JSON.parse(request.payload);
        return Ride.query().insert(body);
    }
    },



    
    {
      method: "POST",
      path: "/reset-password",
      config: {
        description: "Reset Password",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            curPassword: Joi.string().min(8).required(),
            newPassword: Joi.string().min(8).required(),
            confirmPassword: Joi.string().min(8).required(),
          }),
        },
      },
      handler: async (request, h) => {
        if (request.payload.newPassword != request.payload.confirmPassword) {
          return {
            ok: false,
            msge: `Passwords did not match'`,
          };
        }
        const existingAccount = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (!existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' does not exist`,
          };
        }

        if (!(await existingAccount.verifyPassword(request.payload.curPassword))) {
          return {
            ok: false,
            msge: `Current Password is incorrect`,
          };
        }

        if (!existingAccount.verifyPassword(request.payload.newPassword)) {
          return {
            ok: false,
            msge: `Password does not meet validation guidelines`,
          };
        }

        const numUpdated = await Account.query()
        .where("email", request.payload.email)
        .first().patch({
          password: request.payload.newPassword
        })

        if (numUpdated) {
          return {
            ok: true,
            msge: `Updated password for account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `There was an error updating the password`,
          };
        }
      },
    },
  ]);

  // Start the server.
  await server.start();
}

// Go!
init();
