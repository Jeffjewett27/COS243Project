import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";
import App from "./App.vue";
import * as VueGoogleMaps from 'vue2-google-maps'

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});
Vue.prototype.$axios = axiosClient;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDnKdd_RR4YrXznbH8QRxhP94QdSR7dJWY',
    libraries: 'places',
  }
});

new Vue({
  el: "#app",
  data: {
    currentUser: null,
  },
  router: router,
  store,
  vuetify,
  render: (h) => h(App),
});
