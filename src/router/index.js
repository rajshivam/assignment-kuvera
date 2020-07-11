import Vue from "vue";
import VueRouter from "vue-router";
import Explore from "../views/Explore.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/explore",
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
  },
  {
    path: "/explore/:fundCode",
    name: "FundDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FundDetail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
