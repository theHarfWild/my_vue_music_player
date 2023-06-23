import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import MusicList from "../views/MusicList";
import MusicAdd from "../views/MusicAdd";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: '/music',
    children: [
      {
        path: '/music',
        name: 'MusicList',
        component: MusicList
      },
      {
        path: "/music/add",
        name: "musicAdd",
        component: MusicAdd,
      },
      {
        path: "/music/type",
        name: "musicType",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/MusicType"),
      },
      {
        path: "/music/edit",
        name: "musicEdit",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/MusicEdit"),
      },
      {
        path: "/user",
        name: "User",
        component: () => import(/* webpackChunkName: "about" */ "../views/User"),
      },
      {
        path: "/user_add",
        name: "UserAdd",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/add.vue"),
      },
      {
        path: "/user_edit",
        name: "UserEdit",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/edit.vue"),
      },

    ]
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
