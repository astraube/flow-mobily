import {Timestamp} from "src/services/firebase/db";

/** Class representing a Client. */
export default class Client {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} email - A valid email.
   * @param {String} fullName - The Client full name.
   * @param {Boolean} emailVerified -
   * @param {String} phoneNumber -
   * @param {String} profilePhoto - A generated URL from Google Storage.
   */
  id = ''
  uid = ''
  email = ''
  fullName = ''
  emailVerified = ''
  phoneNumber = ''
  profilePhoto = ''

  /**
   * @param  {Object} args
   * user creation
   */
  constructor (args) {
    Object.keys(args).forEach((v, i) => {
      if (args[v] instanceof Timestamp) {
        this[v] = args[v].toDate()
      } else {
        this[v] = args[v]
      }
    })

    return {
      ...this
    }
  }
}
