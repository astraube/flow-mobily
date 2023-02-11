const functions = require('firebase-functions');

// TODO - verificar necessidade
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG.apiKey,
  authDomain: process.env.FIREBASE_CONFIG.authDomain,
  databaseURL: process.env.FIREBASE_CONFIG.databaseURL,
  projectId: process.env.FIREBASE_CONFIG.projectId,
  storageBucket: process.env.FIREBASE_CONFIG.storageBucket,
  messagingSenderId: process.env.FIREBASE_CONFIG.messagingSenderId,
  appId: process.env.FIREBASE_CONFIG.appId,
  measurementId: process.env.FIREBASE_CONFIG.measurementId,
};
admin.initializeApp(firebaseConfig);

let nodemailer = require('nodemailer')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// *******************
// ALL CLOUD FUNCTIONS
// *******************
console.log('functions: ', functions.config());
/*
// STORAGE
const createProductSubImages = require('./src/storage/createProductSubImages')
// DATABASE
const updateProductStatistics = require('./src/db/products/updateProductStatistics')
const updateOrdersStatistics = require('./src/db/orders/updateOrdersStatistics')
const sendOrderNotification = require('./src/db/orders/sendOrderNotification')
const updateReviewsStatistics = require('./src/db/reviews/updateReviewsStatistics')
const sendRequestNotification = require('./src/db/userRequests/sendRequestNotification')
const updateRequestsStatistics = require('./src/db/userRequests/updateRequestsStatistics')
const sendReviewNotification = require('./src/db/reviews/sendReviewNotification')
*/
// GLOBAL CONST
global.CONST = require('./src/common/constants')
// firebase functions:config:set app.production="1.0"
// firebase functions:config:set admin.email="a.straube.m@gmail.com"
// firebase functions:config:set admin.password="***"
// firebase functions:config:set developer.email="a.straube@hotmail.com"
// firebase functions:config:set developer.password="***"
global.IS_PRODUCTION = Number(functions.config().app.production) // 1 - true (prod), 0 - false (dev)
global.ADMIN_EMAIL = functions.config().admin.email
global.ADMIN_PASS = functions.config().admin.password
global.DEVELOPER_EMAIL = functions.config().developer.email
global.DEVELOPER_PASS = functions.config().developer.password

// Can be only one transporter instance
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASS
  }
});
/*
// STORAGE
exports.createProductSubImages = functions
  .storage.object()
  .onFinalize((object, context) => {
    return createProductSubImages.handler(object, context, admin)
  })

// DATABASE
// Now, product updated after insertion (.onWrite not necessary)
// product
// order
exports.onCreateOrder = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context) => {
    return sendOrderNotification.handler(snap, context, mailTransporter)
  })
exports.onWriteOrder = functions.firestore
  .document('orders/{orderId}')
  .onWrite((change, context) => {
    return updateOrdersStatistics.handler(change, context, admin)
  })
// review
exports.onCreateReview = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate((snap, context) => {
    return sendReviewNotification.handler(snap, context, mailTransporter)
  })
exports.onWriteReview = functions.firestore
  .document('reviews/{reviewId}')
  .onWrite((change, context) => {
    return updateReviewsStatistics.handler(change, context, admin)
  })
// user requests
exports.onCreateUserRequest = functions.firestore
  .document('userRequests/{requestId}')
  .onCreate((snap, context) => {
    return sendRequestNotification.handler(snap, context, mailTransporter)
  })
exports.onWriteUserRequest = functions.firestore
  .document('userRequests/{requestId}')
  .onWrite((change, context) => {
    return updateRequestsStatistics.handler(change, context, admin)
  })
*/
