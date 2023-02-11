
import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * Returns Firebase 's global namespace from which all Firebase services are accessed
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} Firebase Module
 */
export const self = () => {
  return firebase
}

/**
 * Returns Firebase 's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Object} currentUser object from firebase
 */
export const auth = () => {
  return firebase.auth()
}

/**
 * Async function providing the application time to
 * wait for firebase to initialize and determine if a
 * user is authenticated or not with only a single observable
 *
 */
export const ensureAuthIsInitialized = (store) => {
  if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
    })
  })
}

export const isInitialized = () => {
  return firebase.apps && firebase.apps.length > 0
}

/** Convenience method to initialize firebase app
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = async (config) => {
  return firebase.initializeApp(config);
}

/** Handle the auth state of the user and
 * set it in the auth store module
 * @param  {Object} store - Vuex Store
 * @param  {Object} currentUser - Firebase currentUser
 */
export const handleOnAuthStateChanged = async (store, currentUser) => {
  //console.log('---> handleOnAuthStateChanged.currentUser: ', currentUser)

  store.commit('auth/setLoggingIn', true)

  const initialAuthState = isAuthenticated(store)

  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true,
    refreshToken: (currentUser ? currentUser.refreshToken : ''),
    uid: (currentUser ? currentUser.uid : '')
  })

  // Get & bind the current user
  if (store.state.auth.isAuthenticated) {
    await store.dispatch('user/getCurrentUser', currentUser.uid).then((result) => {
      //console.log('getCurrentUser', result)
      store.commit('auth/setLoggingIn', false)
    })
  }

  // If the user looses authentication route
  // them to the login page
  if (!currentUser && initialAuthState) {
    store.commit('auth/setLoggingIn', false)
    store.dispatch('auth/routeUserToAuth')
  }
}

/**
 * @param  {Object} store - Vuex store
 */
export const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

/**
 * remove firebase auth token
 */
export const logoutUser = () => {
  return auth().signOut()
}
