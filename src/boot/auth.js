import { auth } from 'src/services/firebase/base'

export default ({ router, store }) => {

  /**
   * Global router guard.
   *
   * @param {Route} to
   * @param {Route} from
   * @param {Function} next
   */
  router.beforeEach((to, from, next) => {
    //router.app.$loading = true

    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

    //console.log('----> to ', to)
    //console.log('----> from ', from)

    if (requiresAuth) {
      const isAuthenticated = async () => await auth().currentUser !== null;

      if (isAuthenticated) {
        if(to.matched.some(record => record.meta.isAdmin)) {
          if(store.state.auth.isAdmin){
            next()
          } else {
            next({ path: '/dashboard' } )
            /*
            if (from)
              next({ path: from.path } )
            else
              next({ path: '/dashboard' } )

             */
          }
        } else {
          next()
        }

      } else {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      }
    } else if(to.matched.some(record => record.meta.guest)) {
      if(store.state.auth.refreshToken == null || store.state.auth.refreshToken == ''){
        next()
      } else {
        next({ path: '/dashboard'} )
      }
    } else {
      next();
    }
  });

  /**
   * Global after hook.
   *
   * @param {Route} to
   * @param {Route} from
   * @param {Function} next
   */
  /*router.afterEach((to, from, next) => {
    router.app.$nextTick()

    router.app.$loading = false
  });*/
};

