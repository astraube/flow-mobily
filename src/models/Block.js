import {Timestamp} from "src/services/firebase/db";

/** Class representing a Block. */
export default class Block {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} createdAt - Data de criacao.
   * @param {String} updatedAt - Data de atualização.
   * @param {String} description - Descricao
   * @param {String} name - Nome do block
   * @param {Number} order - Ordenação
   * @param {String} coverImage - URL da imagem da capa.
   * @param {String} stepId - ID da etapa
   * @param {String} projectId - ID do projeto
   */
  id = ''
  createdAt = ''
  updatedAt = ''
  description = ''
  name = ''
  order = 0
  coverImage = ''
  stepId = ''
  projectId = ''

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
