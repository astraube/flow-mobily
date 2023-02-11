import {Timestamp} from "src/services/firebase/db";

/** Class representing a Group. */
export default class Group {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} createdAt - Data de criacao.
   * @param {String} updatedAt - Data de atualização.
   * @param {String} icon - Ícone do grupo
   * @param {String} name - Nome do grupo
   * @param {Number} order - Ordenação
   */
  id = ''
  createdAt = ''
  updatedAt = ''
  icon = ''
  name = ''
  order = 0

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
