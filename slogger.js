/*  slogger.js
    A simple logger module made easy by nachliel shiloh-hills
    use simple and easy.
    Enable/Disable debug mode.
    Write Log to file
    Enable/Disable Console
*/
var fs = require('fs');

const SLogger = function() {
    let logFile = '';
    let debug = false;
    let enableConsole = true;
    return {
        segetLogFile: function (filepath) {
            if (filepath===undefined)
                return logfile;
            else
                logfile = filepath;
            fs.writeFile(filepath, '', function (err) {
                if (err) {
                    this.consol('error',"SLogger Error: Log file Error.");
                    throw err;
                }
                //Success
              });
        },
        consoleEnabled: function(que) {
            if (que===undefined)
                return enableConsole;
            enableConsole = que;
        },
        debugEnabled: function(que) {
            if (que===undefined)
                return debug;
            debug = que;
        },
        consol: function (type, message) {
            console.log(logCompositor('log',message));
        },
        logFileCompositor: function(type, message) {
            return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '|' + type + '|' + message + '\n';
        },
        logCompositor: function(type, message) {
            return type + ': ' + message;
        },
        writeToFile: function(type,message) {
            if (logfile!='') {
                fs.appendFile(logfile, logFileCompositor(type,message), function (err) {
                    if (err) {
                        this.consol('error',"SLogger Error: Log file Error");
                        throw err;
                    }
                  });
              }  
        },
        log: function (message) {
            // write message to `this.logfile`
            if (enableConsole)
                this.consol('log',message);
            if (logfile != '') 
                this.writeToFile('log',message);  
        },
        error: function (message){
            if (enableConsole)
                this.consol('error', message);
            if (logfile!='') {
                this.writeToFile('error',message);
            }  
        },
        info: function (message) {
            if (enableConsole)
                this.consol('info', message);
            if (logfile!='') {
                this.writeToFile('info',message);
            }  
        },
        debug: function (message) {
            if (debug) {
                if (enableConsole)
                    this.consol('debug', message);
                if (logfile!='')
                    this.writeToFile('debug',message);
            }
        }
    }
};
module.exports = SLogger;
