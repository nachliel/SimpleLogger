#Simple Logger Simplog

##Usage:

const logger = require("slogger")();
logger.segetLogFile('log.log');
logger.debugEnabled(true);

//Simple Log:
logger.log("Simple comment");
//Error log:
logger.error("error notification!");
//debug log:
logger.debug("bug bug bug!!");
//information log:
logger.info("did you know?!");
