import {Timestamp} from "src/services/firebase/db";

/** Class representing a Project. */
export default class Project {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} createdAt - Data de criacao.
   * @param {String} updatedAt - Data de atualização.
   * @param {String} dueAt - Data de vencimento.
   * @param {String} title - Nome do projeto.
   * @param {String} description - Descricao do projeto.
   */
  id = ''
  createdAt = ''
  updatedAt = ''
  dueAt = ''
  title = ''
  description = ''

  status = ''
  statusId = ''

  /**
   * @param  {Object} args
   * project creation
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
