import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// The middleware for every page of the application.
const globalMiddleware = ['locale', 'check-auth']

/*
// Load middleware modules dynamically.
const routeMiddleware = resolveMiddleware(
  require.context('~/middleware', false, /.*\.js$/)
)
*/
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

// Create a new router
const router = createRouter()

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default function ( { store, ssrContext } ) {

  return router
}

/**
 * Create a new router instance.
 *
 * @return {VueRouter}
 */
function createRouter() {
  /*let router = new Router({
    mode: 'history',
    routes: paths.map(route =>
      mountRoute(route)
    ).concat([
      { path: '*', redirect: '/home' }
    ]),
    scrollBehavior
  });*/

  const Router = new VueRouter({
    //scrollBehavior: () => ({ x: 0, y: 0 }),
    scrollBehavior,
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach(beforeEach);
  Router.afterEach(afterEach);

  return Router;
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    return { selector: to.hash }
  }
  const [component] = router.getMatchedComponents({ ...to }).slice(-1)

  if (component && component.scrollToTop === false) {
    return {}
  }
  return { x: 0, y: 0 }
}

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach (to, from, next) {

  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  if(requiresAuth) {
    if (localStorage.getItem('refreshToken') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.isAdmin)) {
        if(user.isAdmin == 1){
          next()
        }
        else{
          next({ name: 'Dashboard'})
        }
      }else {
        next()
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('refreshToken') == null){
      next()
    }
    else{
      next({ name: 'Dashboard'})
    }
  } else {
    next(...args)
  }

  /*
  // Get the matched components and resolve them.
  const components = await resolveComponents(
    router.getMatchedComponents({ ...to })
  )

  if (components.length === 0) {
    return next()
  }

  // Start the loading bar.
  if (components[components.length - 1].loading !== false) {
    //router.app.$nextTick(() => router.app.$loading.start())
  }

  // Get the middleware for all the matched components.
  const middleware = getMiddleware(components)

  // Call each middleware.
  callMiddleware(middleware, to, from, (...args) => {
    // Set the application layout only if "next()" was called with no args.
    if (args.length === 0) {
      //router.app.setLayout(components[0].layout || '')
    }

    next(...args)
  })

   */
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach (to, from, next) {
  //await router.app.$nextTick()

  //router.app.$loading.finish()
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
/*
function callMiddleware (middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        router.app.$loading.finish()
      }

      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}
*/

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Array}
 */
function resolveComponents (components) {
  return Promise.all(components.map(component => {
    return typeof component === 'function' ? component() : component
  }))
}

/**
 * Merge the the global middleware with the components middleware.
 *
 * @param  {Array} components
 * @return {Array}
 */
function getMiddleware (components) {
  const middleware = [...globalMiddleware]

  components.filter(c => c.middleware).forEach(component => {
    if (Array.isArray(component.middleware)) {
      middleware.push(...component.middleware)
    } else {
      middleware.push(component.middleware)
    }
  })

  return middleware
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware (requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}
