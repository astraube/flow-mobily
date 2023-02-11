const chalk = require('chalk');
const log = console.log;

function createMessage(message, ...args) {

}

/**
 * Error log
 * @param err
 * @param args
 */
const error = (err, ...args) => {
  log(`[App] ${chalk.white.bgRed(' ERROR ')} ${err}\n`, args.length ? args : '');
}

/**
 * Warn log
 * @param warn
 * @param args
 */
const warn = (warn, ...args) => {
  log(`[App] ${chalk.black.bgKeyword('orange')(' WARNING ')} ${warn}\n`, args.length ? args : '');
}

/**
 * Info log
 * @param info
 * @param args
 */
const info = (info, ...args) => {
  log(`[App] ${chalk.white.bgBlue(' INFO ')} ${info}\n`, args.length ? args : '');
}

/**
 * Success log
 * @param success
 * @param args
 */
const success = (success, ...args) => {
  log(`[App] ${chalk.black.bgGreen(' SUCCESS ')} ${success}\n`, args.length ? args : '');
}

const exports = {
  error,
  warn,
  info,
  success,
}

/**
 * to use: log.e | log.w | log.s | log.i
 */
Object.keys(exports).forEach(m => (exports[ m.charAt(0) ] = exports[m]))

module.exports = exports
