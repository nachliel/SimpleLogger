/*  slogger.js
    A simple logger module made easy by nachliel shiloh-hills
    use simple and easy.
    Enable/Disable debug mode.
    Write Log to file
    Enable/Disable Console
*/
'use strict';

//Require and constants
const fs = require('fs');
const LOG = 'log ';
const DEBUG = 'debug';
const ERROR = 'error';
const INFO = 'info';

const SLogger = function() {
    let logFile = '';
    let debug = false;
    let enableConsole = true;
    const consol = function (type, message) {
        console.log(logCompositor(LOG,message));
    };
    const logFileCompositor = function(type, message) {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '|' + type + '|' + message + '\n';
    };
    const logCompositor =  function(type, message) {
        return type + ': ' + message;
    };
    const writeToFile = function(type,message) {
        if (logfile!='') {
            fs.appendFile(logfile, logFileCompositor(type,message), function (err) {
                if (err) {
                    consol(ERROR,'SLogger Error: Log file Error');
                    throw err;
                }
              });
          }  
    };
    return {
        segetLogFile: function (filepath) {
            if (filepath===undefined)
                return logfile || '';
            else
                logfile = filepath;
            fs.writeFile(filepath, '', function (err) {
                if (err) {
                    consol(ERROR,'SLogger Error: Log file Error.');
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
        
        log: function (message) {
            if (enableConsole)
                consol(LOG,message);
            if (logfile != '') 
                writeToFile(LOG,message);  
        },
        error: function (message){
            if (enableConsole)
                consol(ERROR, message);
            if (logfile!='') {
                writeToFile(ERROR,message);
            }  
        },
        info: function (message) {
            if (enableConsole)
                consol(INFO, message);
            if (logfile!='') {
                writeToFile(INFO,message);
            }  
        },
        debug: function (message) {
            if (debug) {
                if (enableConsole)
                    consol(DEBUG, message);
                if (logfile!='')
                    writeToFile(DEBUG,message);
            }
        }
    }
};
module.exports = SLogger;
