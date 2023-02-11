import firebaseService from '../services/firebase'

export default ({ router, store, Vue, app }) => {
  //const config = process.env.environments.FIREBASE_CONFIG
  const config = {
    apiKey: process.env.FIREBASE_CONFIG.apiKey,
    authDomain: process.env.FIREBASE_CONFIG.authDomain,
    databaseURL: process.env.FIREBASE_CONFIG.databaseURL,
    projectId: process.env.FIREBASE_CONFIG.projectId,
    storageBucket: process.env.FIREBASE_CONFIG.storageBucket,
    messagingSenderId: process.env.FIREBASE_CONFIG.messagingSenderId,
    appId: process.env.FIREBASE_CONFIG.appId,
    measurementId: process.env.FIREBASE_CONFIG.measurementId,
  };
  firebaseService.fBInit(config);

  // Tell the application what to do when the
  // authentication state has changed
  firebaseService.auth().onAuthStateChanged((currentUser) => {
      //firebaseService.handleOnAuthStateChanged(store, currentUser)

    if (currentUser) {
      firebaseService.handleOnAuthStateChanged(store, currentUser)

      router.replace('/dashboard').catch(() => {});
      new Vue(app); /* eslint-disable-line no-new */
    } else {
      firebaseService.handleOnAuthStateChanged(store, null)

      // eslint-disable-next-line no-underscore-dangle
      if (router.app._route.path !== '/signup') {
        router.replace('/login').catch(() => {});
      }
      new Vue(app); /* eslint-disable-line no-new */
    }

    }, (error) => {
      console.error(error)
    })

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService
}
