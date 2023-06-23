import Vue from "vue";
import VueRouter from "vue-router";
import AppRecommmend from '../components/AppRecommend'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: AppRecommmend,
  },
  {
    path: "/music/:typeName",
    name: "home",
    component: AppRecommmend,
  },
  {
    path: "/list",
    name: "List",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/List"),
  },
  {
    path: "/my",
    name: "My",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/My"),
  },
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: "history",
});
const originaPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location){
  return originaPush.call(this,location).catch(err=>err)
}
VueRouter.prototype.replace = function replace(location){
  return originReplace.call(this,location).catch(err=>err)
}
export default router;
