
import log from '../utils/log'

export default {
  /**
   * @usage:
   *
   *  this.log.error('texto')
   */
  install (Vue, options) {
    /**
     * @usage:
     */
    Vue.prototype.logger = { ...log }
  },
}
