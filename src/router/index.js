import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

/**
 * utilizado para redirecionar a pagina de busca
 *
this.$router.push({
  path: "/search",
  query: {
    q: this.searchQuery,
    t: new Date().getTime(),
  }
});
 */

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default function ( { store, ssrContext } ) {

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  return Router
}
