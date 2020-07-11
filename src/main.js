import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import service from "./services/index";

import "bulma/css/bulma.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinusCircle,
  faTimesCircle,
  faChevronCircleUp,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faMinusCircle,
  faTimesCircle,
  faChevronCircleUp,
  faChevronCircleDown
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(service);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
