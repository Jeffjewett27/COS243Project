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
const { User } = require('./models/User.js'); 
const { Driver } = require('./models/Driver.js');
const { Vehicle } = require('./models/Vehicle.js');
const { Ride } = require('./models/Ride.js');
const { VehicleType } = require('./models/VehicleType.js');
const { State } = require('./models/State.js');
const { Location } = require('./models/Location.js');

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server
const moment = require("moment");

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
      path: "/users",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone: Joi.string().regex(/\d{3}-\d{3}-\d{4}/).required()
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await User.query()
          .where("email", request.payload.email)
          .first();
        if (existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newAccount = await User.query().insert({
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
          phone: request.payload.phone,
          isAdmin: false
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
      path: "/users",
      config: {
        description: "Retrieve all accounts",
      },
      handler: (request, h) => {
        return User.query();
      },
    },

    {
      method: "DELETE",
      path: "/users/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        return User.query()
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
            password: Joi.string().min(6).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const account = await User.query()
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
              phone: account.phone
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

        Location.query().insert(body);

        return request.payload.id;

    }

    },

    {

      method: "POST",

      path: "/rides",

      handler: (request, h) => {

        var body=JSON.parse(request.payload);

        Ride.query().insert(body);

        return request.payload.id;

    }

    },


    {
      method: "POST",
      path: "/ride",
      config: {
        description: "Create Ride",
        validate: {
          payload: Joi.object({
            source: Joi.object().required(),
            destination: Joi.object().required(),
            //I know we shouldn't let the user dictate the distance, but I don't want to deal with backend google maps calls
            //distance is in meters
            distance: Joi.number().min(0).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const fuelCost = 3.5 / 25 //3.50 $/m / 25 mpg;
        const flatFee = 6;

        let date = moment().format("YYYY-MM-DD");
        let time = moment().format("HH:mm:ssZ");
        //convert to miles
        let dist = request.payload.distance * 0.0006213712;

        let addLocation = async function(loc) {
          let newLocation = await Location.query().insert({
            name: loc.name ?? '',
            address: loc.address ?? '',
            city: loc.city ?? '',
            state: loc.state ?? '',
            zipCode: loc.zip ?? -1
          });

          if (!newLocation) {
            return {
              ok: false,
              msge: `Could not add location '${loc}'`,
            };
          }

          return {
            ok: true,
            id: newLocation.id
          }
        }

        let loc1Add = await addLocation(request.payload.source);
        if (!loc1Add.ok) {
          return loc1Add;
        }
        let loc2Add = await addLocation(request.payload.destination);
        if (!loc2Add.ok) {
          return loc2Add;
        }

        let newRide = await Ride.query().insert({
          date: date,
          time: time,
          distance: dist,
          fuelPrice: dist * fuelCost,
          fee: dist * fuelCost + flatFee,
          vehicleID: 1,
          fromLocationID: loc1Add.id,
          toLocationID: loc2Add.id
        })
        
        if (!newRide) {
          return {
            ok: false,
            msge: "Could not process ride"
          }
        }

        console.log(newRide);
        return {
          ok: true,
          msge: "Processed ride successfully",
          id: newRide.id
        }
      }
    },

    {
      method: "GET",
      path: "/rides/{id}",
      config: {
        description: "Get Ride Information",
      },
      handler: async (request, h) => {
        let ride = await Ride.query().withGraphFetched('fromLocation.stateObj').withGraphFetched('toLocation.stateObj')
          .findById(request.params.id);
        if (!ride) {
          return {
            ok: false,
            msge: `Could not find ride ${request.params.id}`
          };
        }
        return ride;
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
