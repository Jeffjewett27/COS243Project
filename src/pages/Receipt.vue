<template>
  <v-container>
    <div>
      <h4 class="display-1">Receipt</h4>

      <instructions details="Here is a confirmation of your trip." />

      <h3>From location</h3>
      <div style="display:flex; align-items: stretch; column-gap: 0.875rem;">
        <h4>Name</h4>
        <p style="width:9rem">{{ receipt.fromLocation.name }}</p>
        <h4>Address</h4>
        <p style="width:9rem">{{ receipt.fromLocation.address }}</p>
        <h4>City</h4>
        <p style="width:6rem">{{ receipt.fromLocation.city }}</p>
        <h4>State</h4>
        <p style="width:6rem">{{ receipt.fromLocation.state }}</p>
        <h4>Zip</h4>
        <p>{{ receipt.fromLocation.zip }}</p>
      </div>
      <h3>To location</h3>
      <div style="display:flex; align-items: stretch; column-gap: 0.875rem;">
        <h4>Name</h4>
        <p style="width:9rem">{{ receipt.toLocation.name }}</p>
        <h4>Address</h4>
        <p style="width:9rem">{{ receipt.toLocation.address }}</p>
        <h4>City</h4>
        <p style="width:6rem">{{ receipt.toLocation.city }}</p>
        <h4>State</h4>
        <p style="width:6rem">{{ receipt.toLocation.state }}</p>
        <h4>Zip</h4>
        <p>{{ receipt.toLocation.zip }}</p>
      </div>
      <h3>Trip Details</h3>
      <div style="display:flex; align-items: stretch; column-gap: 0.875rem;">
        <h4>Date</h4>
        <p style="width:9rem">{{ receipt.date }}</p>
        <h4>Distance</h4>
        <p style="width:5rem">{{ receipt.distance }}mi</p>
        <h4>Fuel Cost</h4>
        <p style="width:5rem">${{ receipt.fuelCost }}</p>
        <h4>Total Cost</h4>
        <p style="width:5rem">${{ receipt.fee }}</p>
      </div>
    </div>

    <div>
      <div class="text-xs-center">
        <v-dialog v-model="dialogVisible" width="500">
          <v-card>
            <v-card-title primary-title>
              {{ dialogHeader }}
            </v-card-title>

            <v-card-text>
              {{ dialogText }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#065100" text v-on:click="hideDialog">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import Instructions from "../components/Instructions.vue";

export default {
  name: "SignUpPage",
  components: {
    Instructions, // Use the Instructions component we just imported
  },
  mounted: function() {
    this.$axios.get(`/rides/${this.$route.params.id}`).then(response => {
      let data = response.data

      let date = new Date(data.date.split('T')[0]+'T'+data.time);
      let dist = data.distance.toFixed(1);
      let fuel = data.fuelPrice.toFixed(2);
      let fee = data.fee.toFixed(2);
      console.log(data.fromLocation.stateObj);
      this.receipt = {
        date: date,
        distance: dist,
        fee: fee,
        fuelCost: fuel,
        fromLocation: {
          name: data.fromLocation.name,
          address: data.fromLocation.address,
          city: data.fromLocation.city,
          state: data.fromLocation.stateObj.name,
          zip: data.fromLocation.zipCode
        },
        toLocation: {
          name: data.toLocation.name,
          address: data.toLocation.address,
          city: data.toLocation.city,
          state: data.toLocation.stateObj.name,
          zip: data.toLocation.zipCode
        }
      }
      console.log("data", this.receipt);
    });
  },
  data: function () {
    return {
      valid: false, // Are all the fields in the form valid?

      receipt: {
        date: '',
        distance: '',
        fee: '',
        fuelCost: '',
        fromLocation: {
          name: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        },
        toLocation: {
          name: '',
          address: '',
          city: '',
          state: '',
          zip: ''
        }
      },

      // Was an account created successfully?
      accountCreated: false,

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,

      // Validation rules for the form fields. This functionality is an extension
      // that's part of the Vuetify package. Each rule is a list of functions
      // (note the fat arrows). Vuetify invokes all functions in the list,
      // passing it the content of the associated form field. Functions should
      // return either true (the field passes that validation) or a string
      // containing an error message indicating why the field doesn't pass validation.
      rules: {
        required: [(val) => val.length > 0 || "Required"],
        email: [
          (val) => /\w{3,}@\w{3,}(?:.\w{3,})+$/.test(val) || "Invalid e-mail",
        ],
        password: [
          (val) => val.length >= 6 || "Minimum 6 characters",
        ],
      },
    };
  },
  methods: {
    // Invoked when the user clicks the 'Sign Up' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      this.accountCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/users", {
          firstName: this.newMember.firstName,
          lastName: this.newMember.lastName,
          email: this.newMember.email,
          password: this.newMember.password,
          phone: '425-269-7302'
        })
        .then((result) => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.data.ok) {
            this.showDialog("Success", result.data.msge);
            this.accountCreated = true;
          } else {
            this.showDialog("Sorry", result.data.msge);
          }
        })
        .catch((err) => this.showDialog("Failed", err));
    },

    // Helper method to display the dialog box with the appropriate content.
    showDialog: function (header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },

    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function () {
      this.dialogVisible = false;
      if (this.accountCreated) {
        // Only navigate away from the sign-up page if we were successful.
        this.$router.push({ name: "home-page" });
      }
    },
  },
};
</script>
