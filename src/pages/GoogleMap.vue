<template>
  <v-container>
    <div>
      <div>
        <h2>Search and add a pin</h2>
        <div style="display:flex; align-items: stretch; column-gap: 0.875rem;">
          <GmapAutocomplete
            ref="location"
            @place_changed='setPlace'
            style="width:40%"
          />
          <v-btn
            ref="addButton"
            v-on:click='addMarker'
          >
            {{ addButtonText }}
          </v-btn>
          <v-btn
            ref="resetButton"
            @click="reset"
          >
            Start Over
          </v-btn>
        </div>
      </div>
      <br>
      <GmapMap
        ref="map"
        :center='center'
        :zoom='12'
        style='width:100%;  min-height: 500px'
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      />
      </GmapMap>

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
import {gmapApi} from 'vue2-google-maps'

export default {
  name: 'GoogleMap',
  computed: {
    google: gmapApi
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],

      distance: 0,

      addButtonText: "Add Start Location",

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
      console.log(place);
    },
    addMarker() {
      this.setAddText(this.markers.length+1);
      if (this.markers.length >= 2) {
        this.handleSubmit();
      }
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
      if (this.markers.length == 2) {
        this.getDirection()
      }
      
    },

    reset() {
      window.location.reload();
    },

    setAddText(idx) {
      switch (idx) {
        case 0:
          this.addButtonText = "Add Start Location";
          break;
        case 1:
          this.addButtonText = "Add Destination";
          break;
        case 2:
        default:
          this.addButtonText = "Confirm Route";
      }
    },

    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    getDirection: function() {
      let vobj = this
      this.$gmapApiPromiseLazy().then(() => {
        //your code here
        //E.g. for directions
        console.log(this.$refs)
        var directionsService = new vobj.google.maps.DirectionsService;
        var directionsDisplay = new vobj.google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.$refs.map.$mapObject);

        //google maps API's direction service
        function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
          directionsService.route({
            origin: start,
            destination: destination,
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              console.log("route",response);
              directionsDisplay.setDirections(response);
              vobj.distance = response.routes[0].legs[0].distance.value;
            } else {
              vobj.showDialog("Directions Request Failed", "No route could be found.");
            }
          });
        }

        console.log(this.markers[0]);
        console.log(this.markers[1]);
        console.log('hmmm yha');
        calculateAndDisplayRoute(directionsService, directionsDisplay, this.markers[0].position, this.markers[1].position);
        });
    },

    handleSubmit: function () {
      // Haven't been successful yet.
      this.rideCreated = false;

      var getAddress = function(place) {
        let components = [];
        place.address_components.forEach(element => {
          if (element.types.includes("street_number") || element.types.includes("route")) {
            components.push(element.short_name);
          }
        });
        return components.join(' ');
      }
      var getCity = function(place) {
        console.log("get_city");
        let city = '';
        place.address_components.forEach(element => {
          console.log("city_el", element.short_name, element.types.includes("locality"));
          if (element.types.includes("locality")) {
            city = element.short_name;
          }
        });
        return city;
      }
      var getState = function(place) {
        console.log("get_state");
        let state = '';
        place.address_components.forEach(element => {
          if (element.types.includes("administrative_area_level_1")) {
            state = element.short_name;
          }
        });
        return state;
      }
      var getPostal = function(place) {
        let postal = '-1';
        place.address_components.forEach(element => {
          if (element.types.includes("postal_code")) {
            postal = element.long_name;
          }
        });
        return postal;
      }
      
      //console.log("getAddr", getAddress);
      let loc1 = {
        name: this.places[0].name ?? '',
        address: getAddress(this.places[0]),
        city: getCity(this.places[0]),
        state: getState(this.places[0]),
        zip: parseInt(getPostal(this.places[0]))
      }
      let loc2 = {
        name: this.places[1].name ?? '',
        address: getAddress(this.places[1]),
        city: getCity(this.places[1]),
        state: getState(this.places[1]),
        zip: parseInt(getPostal(this.places[1]))
      }
      //console.dir(this.places, loc1, loc2, "test2");

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/ride", {
          source: loc1,
          destination: loc2,
          distance: this.distance
        })
        .then((result) => {
          console.log(this.places, loc1, loc2, "test1");
          // Based on whether things worked or not, show the
          // appropriate dialog.
          this.rideId = 0;
          if (result.data.ok) {
            this.showDialog("Success", result.data.msge);
            this.rideCreated = true;
            this.rideId = result.data.id;
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
      if (this.rideCreated && this.rideId) {
        // Only navigate away from the sign-up page if we were successful.
        this.$router.push({ name: "receipt", params: { id: this.rideId} });
      }
    },
  },
};
</script>