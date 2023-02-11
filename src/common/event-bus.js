export default {
  /**
   * @usage:
   *
   *  this.$bus.$emit('event-name', data);
   *
   *  this.$bus.$on('event-name', (data) => {
   *    doSomething(data)
   *  });
   */
  install (Vue, options) {
    /**
     * @usage:
     */
    Vue.prototype.$bus = new Vue();
  },
}
