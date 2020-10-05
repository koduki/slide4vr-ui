import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import store from "@/store";
import Auth from "@/modules/auth";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "../node_modules/sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import { BCarousel } from 'bootstrap-vue'
Vue.component('b-carousel', BCarousel)
import { BCarouselSlide } from 'bootstrap-vue'
Vue.component('b-carousel-slide', BCarouselSlide)

Auth.init();

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
