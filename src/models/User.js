import {Timestamp} from "src/services/firebase/db";

/** Class representing a User. */
export default class User {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} email - A valid email.
   * @param {String} displayName - The user's display name.
   * @param {String} firstName - The user's first name.
   * @param {String} lastName - The user's last name.
   * @param {Boolean} emailVerified -
   * @param {Number} lastLoginAt -
   * @param {String} phoneNumber -
   * @param {String} profilePhoto - A generated URL from Google Storage.
   * @param {String} backgroundPhoto - A generated URL from Google Storage.
   */
  id = ''
  uid = ''
  email = ''
  displayName = ''
  firstName = ''
  lastName = ''
  emailVerified = ''
  lastLoginAt = ''
  phoneNumber = ''
  profilePhoto = ''
  backgroundPhoto = ''

  /**
   * @param  {Object} args - arguments supplied
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
