'use strict';


(function (global) {


class Logger {


    constructor() {


        this.logs = [];


        this.maxLogs = 5000;


        this.debugMode = true;


        this.enabled = true;


        this.performanceTimers = new Map();


        this.levels = Object.freeze({


            DEBUG: "DEBUG",


            INFO: "INFO",


            SUCCESS: "SUCCESS",


            WARNING: "WARNING",


            ERROR: "ERROR",


            CRITICAL: "CRITICAL"


        });


    }


    initialize() {


        if (


            typeof Config !== "undefined" &&


            Config.Logging


        ) {


            this.debugMode =


                Config.Logging.Console === true;


            this.enabled =


                Config.Logging.Enabled === true;


        }


        this.info(


            "Logger",


            "PenVerse Logger initialized."


        );


    }


    createEntry(level, module, message, data = null) {


        return {


            id: crypto.randomUUID(),


            level,


            module,


            message,


            data,


            timestamp: new Date(),


            time:


                new Date().toLocaleTimeString()


        };


    }


    add(entry) {


        if (!this.enabled) {


            return;


        }


        this.logs.push(entry);


        if (


            this.logs.length >


            this.maxLogs


        ) {


            this.logs.shift();


        }


        this.print(entry);


    }


    print(entry) {


        if (


            !this.debugMode


        ) {


            return;


        }


        const prefix =


            "[" +


            entry.level +


            "] [" +


            entry.module +


            "]";


        switch (


            entry.level


        ) {


            case this.levels.DEBUG:


                console.debug(


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


                break;


            case this.levels.INFO:


                console.info(


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


                break;


            case this.levels.SUCCESS:


                console.log(


                    "✅",


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


                break;
            case this.levels.WARNING:


                console.warn(


                    "⚠️",


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


                break;


            case this.levels.ERROR:


                console.error(


                    "❌",


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


                break;


            case this.levels.CRITICAL:


                console.error(


                    "🔥",


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


                break;


            default:


                console.log(


                    prefix,


                    entry.message,


                    entry.data ?? ""


                );


        }


    }


    debug(module, message, data = null) {


        this.add(


            this.createEntry(


                this.levels.DEBUG,


                module,


                message,


                data


            )


        );


    }


    info(module, message, data = null) {


        this.add(


            this.createEntry(


                this.levels.INFO,


                module,


                message,


                data


            )


        );


    }


    success(module, message, data = null) {


        this.add(


            this.createEntry(


                this.levels.SUCCESS,


                module,


                message,


                data


            )


        );


    }


    warning(module, message, data = null) {


        this.add(


            this.createEntry(


                this.levels.WARNING,


                module,


                message,


                data


            )


        );


    }


    error(module, message, data = null) {


        this.add(


            this.createEntry(


                this.levels.ERROR,


                module,


                message,


                data


            )


        );


    }


    critical(module, message, data = null) {


        this.add(


            this.createEntry(


                this.levels.CRITICAL,


                module,


                message,


                data


            )


        );


    }


    startTimer(name) {


        this.performanceTimers.set(


            name,


            performance.now()


        );


    }


    endTimer(name) {


        if (


            !this.performanceTimers.has(name)


        ) {


            this.warning(


                "Logger",


                "Timer '" +


                name +


                "' was never started."


            );


            return null;


        }


        const start =


            this.performanceTimers.get(name);


        this.performanceTimers.delete(name);


        const duration =


            performance.now() - start;


        this.info(


            "Performance",


            name +


            " completed.",


            {


                duration:


                    duration.toFixed(2) + " ms"


            }


        );


        return duration;


    }
    getLogs() {


        return [...this.logs];


    }


    getLogsByLevel(level) {


        return this.logs.filter(


            log => log.level === level


        );


    }


    getLogsByModule(module) {


        return this.logs.filter(


            log => log.module === module


        );


    }


    search(keyword) {


        if (!keyword) {


            return [];


        }


        const searchTerm = keyword.toLowerCase();


        return this.logs.filter(log =>


            log.message.toLowerCase().includes(searchTerm) ||


            log.module.toLowerCase().includes(searchTerm)


        );


    }


    clear() {


        this.logs.length = 0;


        console.info(


            "[Logger] History cleared."


        );


    }


    exportJSON() {


        return JSON.stringify(


            this.logs,


            null,


            2


        );


    }


    exportText() {


        return this.logs.map(log =>


            `[${log.time}] [${log.level}] [${log.module}] ${log.message}`


        ).join("\n");


    }


    enable() {


        this.enabled = true;


    }


    disable() {


        this.enabled = false;


    }


    setDebug(enabled) {


        this.debugMode = Boolean(enabled);


    }


    getStatistics() {


        return {


            totalLogs: this.logs.length,


            debug: this.getLogsByLevel(this.levels.DEBUG).length,


            info: this.getLogsByLevel(this.levels.INFO).length,


            success: this.getLogsByLevel(this.levels.SUCCESS).length,


            warning: this.getLogsByLevel(this.levels.WARNING).length,


            error: this.getLogsByLevel(this.levels.ERROR).length,


            critical: this.getLogsByLevel(this.levels.CRITICAL).length


        };


    }


}


const LoggerInstance = new Logger();


LoggerInstance.initialize();


Object.freeze(LoggerInstance);


Object.defineProperty(


    global,


    "Logger",


    {


        value: LoggerInstance,


        writable: false,


        configurable: false,


        enumerable: true


    }


);


})(window);