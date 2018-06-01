Usage:

const logger = require("slogger")();
logger.segetLogFile('log.log');
logger.debugEnabled(true);

//Simple Log:
logger.log("Simple comment");
//Error log:
logger.error("error notification!");
//debug log:
logger.debug("bug bug bug!!");
//debug log:
logger.debug("bug bug bug!!");
