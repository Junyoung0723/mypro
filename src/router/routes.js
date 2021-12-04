import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/member/Login.vue"),
  },
  {
    path: "/join",
    name: "Join",
    component: () =>
      import(/* webpackChunkName: "join" */ "../views/member/Join.vue"),
  },
];

export default routes;
