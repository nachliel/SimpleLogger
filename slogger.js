/*  slogger.js - Simple Logger JS
    A simple logger module made easy by nachliel shiloh-hills
    use simple and easy.
    Enable/Disable debug mode.
    Write Log to file
    Enable/Disable Console
*/
'use strict';

//Require and constants
const fs = require('fs');
const LOG = 'log';
const DEBUG = 'debug';
const ERROR = 'error';
const INFO = 'info';

module.exports = function() {
    let logFile = '';
    let debug = false;
    let enableConsole = true;
    const date = new Date();

    // Consol prints log on console. require type and message.
    const consol = function (type, message) {
        console.log(logCompositor(type,message));
    };

    // logFileCompositor composite a message to log file, require type and message. Servers should use allways in UTC time format and zone.
    const logFileCompositor = function(type, message) {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '|' + type.padEnd(5,' ') + '|' + message + '\n';
    };
    // log Compositor for console messages.
    const logCompositor =  function(type, message) {
        return type + ': ' + message;
    };

    // Write the message to a file.
    const writeToFile = function(type,message) {
        if (logFile!='') {
            fs.appendFile(logFile, logFileCompositor(type,message), function (err) {
                if (err) {
                    consol(ERROR,'SLogger Error: Log file Error');
                    throw err;
                }
              });
          }  
    };
    return {
        // Set or Get the filepath to use. each logger have only one file.
        segetLogFile: function (filepath) {
            if (filepath===undefined)
                return logFile || '';
            else
                logFile = filepath;
            fs.writeFile(filepath, '', function (err) {
                if (err) {
                    consol(ERROR,'SLogger Error: Log file Error.');
                    throw err;
                }
              });
        }, // Set or Return console mode. default true. require bool to enable/Disable
        consoleEnabled: function(que) {                
            if (que===undefined)
                return enableConsole;
            
            if (typeof(que) == 'boolean')
                enableConsole = que;
            else
                consol(ERROR,'SLogger Error: consoleEnabled Require bool type!');
   
        }, //Set or return Debug mode, default false. require bool to enable/Disable
        debugEnabled: function(que) {
            if (que===undefined)
                return debug;
   
            if (typeof(que) == 'boolean')
                debug = que;
            else
                consol(ERROR,'SLogger Error: debugEnabled Require bool type!');
        },
        log: function (message) {
            if (enableConsole)
                consol(LOG,message);
            if (logFile != '') 
                writeToFile(LOG,message);  
        }, 
        error: function (message){
            if (enableConsole)
                consol(ERROR, message);
            if (logFile!='') {
                writeToFile(ERROR,message);
            }  
        },
        info: function (message) {
            if (enableConsole)
                consol(INFO, message);
            if (logFile!='') {
                writeToFile(INFO,message);
            }  
        },
        debug: function (message) {
            if (debug) {
                if (enableConsole)
                    consol(DEBUG, message);
                if (logFile!='')
                    writeToFile(DEBUG,message);
            }
        }
    }
};
