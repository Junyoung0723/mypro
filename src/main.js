import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import { createStore } from "./store";
import { createRouter } from "./router";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

export function createApp(ctx) {
  const router = createRouter();
  const store = createStore();
  sync(store, router);

  const app = new Vue({
    data: { url: ctx ? ctx.url : "" },
    router,
    vuetify,
    render: (h) => h(App),
  });
  return { app, router, store };
}
