/*  slogger.js
    A simple logger module made easy by nachliel shiloh-hills
    use simple and easy.
    Enable/Disable debug mode.
    Write Log to file
    Enable/Disable Console
*/
var fs = require('fs');
const SLogger = function () {};
SLogger.logFile = '';
SLogger.debug = false;
SLogger.enableConsole = true;
SLogger.setLogFile = function (filepath) {
    this.logfile = filepath;
    fs.writeFile(filepath, '', function (err) {
        if (err) {
            this.console('error',"SLogger Error: Log file Error.");
            throw err;
        }
        //Success
      });
};
//Set Mode of logger 'run' or 'debug'
SLogger.log = function (message) {
    // write message to `this.logfile`
    if (this.enableConsole)
        this.console('log',message);
    if (this.logfile != '') 
        this.writeToFile('log',message);  
};
SLogger.error = function (message){
    if (this.enableConsole)
        this.console('error', message);
    if (this.logfile!='') {
        this.writeToFile('error',message);
    }  
};
SLogger.info = function (message) {
    if (this.enableConsole)
        this.console('info', message);
    if (this.logfile!='') {
        this.writeToFile('info',message);
    }  
};
SLogger.debug = function (message) {
    if (this.debug) {
        if (this.enableConsole)
            this.console('debug', message);
        if (this.logfile!='')
            this.writeToFile('debug',message);
    }
};
SLogger.console = function (type, message) {
    console.log(this.logCompositor('log',message));
};
//Log Compositor
SLogger.logFileCompositor = function(type, message) {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '|' + type + '|' + message + '\n';
};
SLogger.logCompositor = function(type, message) {
    return type + ': ' + message;
};
/*
Write the log line to a file
*/
SLogger.writeToFile = function(type,message) {
    if (this.logfile!='') {
        fs.appendFile(this.logfile, this.logFileCompositor(type,message), function (err) {
            if (err) {
                this.console('error',"SLogger Error: Log file Error");
                throw err;
            }
          });
      }  
};

module.exports = SLogger;

/* OLD FASHION ?! GOOD OR BAD

module.exports = {
    logfile: '',
    mode: '',
    enableConsole: true,
    setLogFile(filepath) {
        this.logfile = filepath;
        fs.writeFile(filepath, '', function (err) {
            if (err) {
                this.console('error',"SLogger Error: Log file Error.");
                throw err;
            }
            //Success
          });
    },
    log(message) {
      // write message to `this.logfile`
      if (this.enableConsole)
        this.console('log',message);
      if (this.logfile != '') {
        this.writeToFile('log',message);
      }  
    },
    //Error Log
    error(message) {
        if (this.enableConsole)
            this.console('error', message);
        if (this.logfile!='') {
            this.writeToFile('error',message);
        }  
    },
    //Info Log
    info(message) {
        if (this.enableConsole)
            this.console('info', message);
        if (this.logfile!='') {
            this.writeToFile('info',message);
        }  
    },
    //Console Log Will write to console only!
    console(type, message) {
        console.log(logCompositor('log',message));
    },
    //Log Compositor
    logFileCompositor(type, message) {
        return Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '|' + type + '|' + message;
    },
    logCompositor(type, message) {
        return type + ': ' + message;
    },
    
    //Write the log line to a file
    
    writeToFile(type,message) {
        if (this.logfile!='') {
            fs.appendFile(logfile, logFileCompositor(type,message), function (err) {
                if (err) {
                    this.console('error',"SLogger Error: Log file Error");
                    throw err;
                }
              });
          }  
    }
  };*/