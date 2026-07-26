

"use strict";


   
 

class GuardianEngine {

    constructor() {

        this.version = "1.0.0";

        this.project = "PenVerse";

        this.environment = "production";

        this.started = false;

        this.modules = new Map();

        this.errors = [];

        this.warnings = [];

        this.performance = {};

        this.health = {

            firebase: false,

            supabase: false,

            dashboard: false,

            notifications: false,

            library: false

        };

        this.startTime = performance.now();

    }

    start() {

        if (this.started) {

            console.warn("🛡 Guardian already running.");

            return;

        }

        this.started = true;

        console.log(

            `%c🛡 PenVerse Guardian v${this.version} Online`,

            "color:#FFD54F;font-size:16px;font-weight:bold;"

        );

        this.registerGlobalErrorHandlers();

        this.measureStartup();

    }

   

    registerModule(name, module) {

        this.modules.set(name, module);

        console.log(`✅ Module Registered → ${name}`);

    }

    getModule(name) {

        return this.modules.get(name);

    }

    hasModule(name) {

        return this.modules.has(name);

    }

    

    measureStartup() {

        window.addEventListener("load", () => {

            const total = performance.now() - this.startTime;

            this.performance.startupTime = total;

            console.log(

                `⚡ Startup Time: ${total.toFixed(2)} ms`

            );

        });

    }

   

    getVersion() {

        return this.version;

    }

}


window.Guardian = new GuardianEngine();


Guardian.start();

GuardianEngine.prototype.registerGlobalErrorHandlers = function () {



    window.onerror = (

        message,

        source,

        line,

        column,

        error

    ) => {

        const report = {

            type: "Runtime Error",

            message,

            source,

            line,

            column,

            stack: error?.stack || "Unavailable",

            time: new Date().toLocaleTimeString()

        };

        this.errors.push(report);

        console.group("🛡 Guardian Runtime Error");

        console.error(report);

        console.groupEnd();

        return false;

    };



    window.addEventListener(

        "unhandledrejection",

        (event) => {

            const report = {

                type: "Unhandled Promise",

                reason: event.reason,

                time: new Date().toLocaleTimeString()

            };

            this.errors.push(report);

            console.group("🛡 Guardian Promise Error");

            console.error(report);

            console.groupEnd();

        }

    );

};

GuardianEngine.prototype.log = function (

    level,

    title,

    details = {}

) {

    const report = {

        level,

        title,

        details,

        time: new Date().toLocaleTimeString()

    };

    switch (level) {

        case "warning":

            this.warnings.push(report);

            console.warn(

                "🟡 Guardian",

                title,

                details

            );

            break;

        case "error":

            this.errors.push(report);

            console.error(

                "🔴 Guardian",

                title,

                details

            );

            break;

        default:

            console.log(

                "🔵 Guardian",

                title,

                details

            );

    }

}

GuardianEngine.prototype.setHealth = function (

    system,

    state

) {

    if (this.health.hasOwnProperty(system)) {

        this.health[system] = state;

    }

};

GuardianEngine.prototype.getHealth = function () {

    return {

        ...this.health

    };

};


GuardianEngine.prototype.verifyModule = function (

    name

) {

    if (!this.hasModule(name)) {

        this.log(

            "warning",

            `${name} module is missing.`

        );

        return false;

    }

    return true;

};

GuardianEngine.prototype.summary = function () {

    console.group(

        "🛡 PenVerse Guardian Summary"

    );

    console.table({

        Version: this.version,

        Modules: this.modules.size,

        Errors: this.errors.length,

        Warnings: this.warnings.length,

        Startup:

            this.performance.startupTime
                ?.toFixed(2) + " ms"

    });

    console.log(

        "System Health",

        this.health

    );

    console.groupEnd();

};

GuardianEngine.prototype.inspectDOM = function () {

    const requiredElements = [

        {
            id: "libraryEntrance",
            name: "Grand Library Entrance"
        },

        {
            id: "toast",
            name: "Toast Notification"
        },

        {
            id: "dashboard",
            name: "Dashboard Container"
        },

        {
            id: "continueLibrary",
            name: "Continue Button"
        }

    ];

    requiredElements.forEach((element) => {

        const found = document.getElementById(element.id);

        if (!found) {

            this.log(

                "warning",

                `${element.name} is missing.`,

                element

            );

        }

    });

};

GuardianEngine.prototype.preventDuplicateStartup = function () {

    if (window.__PENVERSE_STARTED__) {

        this.log(

            "warning",

            "Duplicate startup detected."

        );

        return false;

    }

    window.__PENVERSE_STARTED__ = true;

    return true;

};

GuardianEngine.prototype.watchPerformance = function () {

    const startup = this.performance.startupTime || 0;

    if (startup > 5000) {

        this.log(

            "warning",

            "Startup is taking unusually long.",

            {

                startup

            }

        );

    }

};


GuardianEngine.prototype.recover = function (

    target

) {

    switch (target) {

        case "library":

            console.log(

                "🛡 Guardian attempting to recover Grand Library..."

            );

            break;

        case "toast":

            console.log(

                "🛡 Guardian attempting to recover Notifications..."

            );

            break;

        case "dashboard":

            console.log(

                "🛡 Guardian attempting to recover Dashboard..."

            );

            break;

        default:

            console.log(

                "🛡 No recovery routine exists for",

                target

            );

    }

};


GuardianEngine.prototype.scan = function () {

    console.group(

        "🛡 Guardian Health Scan"

    );

    this.inspectDOM();

    this.watchPerformance();

    console.log(

        "Modules Registered:",

        this.modules.size

    );

    console.log(

        "Warnings:",

        this.warnings.length

    );

    console.log(

        "Errors:",

        this.errors.length

    );

    console.groupEnd();

};


window.addEventListener(

    "load",

    () => {

        setTimeout(() => {

            Guardian.scan();

        }, 2000);

    }

);

GuardianEngine.prototype.checkFirebase = function () {

    try {

        if (window.firebase || window.auth) {

            this.setHealth("firebase", true);

            this.log(

                "info",

                "Firebase connection verified."

            );

        } else {

            this.setHealth("firebase", false);

            this.log(

                "warning",

                "Firebase is not available."

            );

        }

    } catch (error) {

        this.setHealth("firebase", false);

        this.log(

            "error",

            "Firebase health check failed.",

            error

        );

    }

};

GuardianEngine.prototype.checkSupabase = function () {

    try {

        if (

            window.supabase ||

            window.supabaseClient ||

            window.SupabaseEngine

        ) {

            this.setHealth("supabase", true);

            this.log(

                "info",

                "Supabase connection verified."

            );

        } else {

            this.setHealth("supabase", false);

            this.log(

                "warning",

                "Supabase is not available."

            );

        }

    } catch (error) {

        this.setHealth("supabase", false);

        this.log(

            "error",

            "Supabase health check failed.",

            error

        );

    }

};


GuardianEngine.prototype.checkDashboard = function () {

    const dashboard =

        document.getElementById("dashboard");

    if (dashboard) {

        this.setHealth(

            "dashboard",

            true

        );

    } else {

        this.setHealth(

            "dashboard",

            false

        );

        this.log(

            "warning",

            "Dashboard container missing."

        );

    }

};

GuardianEngine.prototype.checkNotifications = function () {

    const toast =

        document.getElementById("toast");

    if (toast) {

        this.setHealth(

            "notifications",

            true

        );

    } else {

        this.setHealth(

            "notifications",

            false

        );

        this.log(

            "warning",

            "Notification system missing."

        );

    }

};



GuardianEngine.prototype.checkLibrary = function () {

    const library =

        document.getElementById(

            "libraryEntrance"

        );

    if (library) {

        this.setHealth(

            "library",

            true

        );

    } else {

        this.setHealth(

            "library",

            false

        );

        this.log(

            "warning",

            "Grand Library Entrance missing."

        );

    }

};


GuardianEngine.prototype.verifySystems = function () {

    this.checkFirebase();

    this.checkSupabase();

    this.checkDashboard();

    this.checkNotifications();

    this.checkLibrary();

};



GuardianEngine.prototype.status = function () {

    console.group(

        "🛡 PenVerse Guardian Status"

    );

    Object.entries(

        this.health

    ).forEach(

        ([system, state]) => {

            console.log(

                `${

                    state

                        ? "🟢"

                        : "🔴"

                } ${system}`

            );

        }

    );

    console.groupEnd();

};



window.addEventListener(

    "load",

    () => {

        setTimeout(() => {

            Guardian.verifySystems();

            Guardian.status();

        }, 2500);

    }

);


GuardianEngine.prototype.timeline = [];

GuardianEngine.prototype.recordEvent = function (

    type,

    title,

    details = {}

) {

    const event = {

        id: crypto.randomUUID(),

        type,

        title,

        details,

        timestamp: new Date().toISOString()

    };

    this.timeline.push(event);

    if (this.timeline.length > 500) {

        this.timeline.shift();

    }

};


GuardianEngine.prototype.dependencies = [

    "firebase",

    "supabase",

    "dashboard",

    "notifications",

    "library"

];

GuardianEngine.prototype.verifyDependencies = function () {

    this.dependencies.forEach((dependency) => {

        if (!this.health[dependency]) {

            this.recordEvent(

                "dependency",

                `${dependency} unavailable`

            );

        }

    });

};



GuardianEngine.prototype.retry = async function (

    callback,

    retries = 3,

    delay = 1000

) {

    for (

        let attempt = 1;

        attempt <= retries;

        attempt++

    ) {

        try {

            return await callback();

        }

        catch (error) {

            this.log(

                "warning",

                `Retry ${attempt}/${retries}`,

                error

            );

            await new Promise(

                resolve =>

                    setTimeout(resolve, delay)

            );

        }

    }

    this.log(

        "error",

        "Retry system exhausted."

    );

};



GuardianEngine.prototype.memory = function () {

    if (

        performance.memory

    ) {

        const memory = performance.memory;

        console.group(

            "🧠 Guardian Memory"

        );

        console.table({

            Used:

                (

                    memory.usedJSHeapSize /

                    1048576

                ).toFixed(2) + " MB",

            Total:

                (

                    memory.totalJSHeapSize /

                    1048576

                ).toFixed(2) + " MB",

            Limit:

                (

                    memory.jsHeapSizeLimit /

                    1048576

                ).toFixed(2) + " MB"

        });

        console.groupEnd();

    }

};



GuardianEngine.prototype.diagnostics = function () {

    console.group(

        "🛡 Guardian Diagnostics"

    );

    console.log(

        "Guardian Version:",

        this.version

    );

    console.log(

        "Environment:",

        this.environment

    );

    console.log(

        "Modules:",

        this.modules.size

    );

    console.log(

        "Timeline Events:",

        this.timeline.length

    );

    console.log(

        "Warnings:",

        this.warnings.length

    );

    console.log(

        "Errors:",

        this.errors.length

    );

    console.groupEnd();

};

window.addEventListener(

    "load",

    () => {

        setTimeout(() => {

            Guardian.verifyDependencies();

            Guardian.memory();

            Guardian.diagnostics();

        }, 3500);

    }

);

GuardianEngine.prototype.consoleVisible = false;

GuardianEngine.prototype.createConsole = function () {

    if (document.getElementById("guardianConsole")) {

        return;

    }

    const panel = document.createElement("div");

    panel.id = "guardianConsole";

    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.right = "20px";
    panel.style.width = "420px";
    panel.style.maxHeight = "80vh";
    panel.style.overflowY = "auto";
    panel.style.background = "rgba(10,10,20,.96)";
    panel.style.color = "#ffffff";
    panel.style.padding = "20px";
    panel.style.borderRadius = "16px";
    panel.style.zIndex = "999999";
    panel.style.display = "none";
    panel.style.fontFamily = "monospace";
    panel.style.boxShadow =
        "0 20px 60px rgba(0,0,0,.45)";
    panel.style.border =
        "2px solid rgba(255,215,0,.25)";

    panel.innerHTML = `

<h2 style="margin-top:0;color:#FFD700">

🛡 Guardian Developer Console

</h2>

<div id="guardianContent"></div>

`;

    document.body.appendChild(panel);

};


GuardianEngine.prototype.refreshConsole = function () {

    const content =

        document.getElementById(

            "guardianContent"

        );

    if (!content) return;

    content.innerHTML = `

<b>Version</b>

<br>

${this.version}

<hr>

<b>Modules</b>

<br>

${this.modules.size}

<hr>

<b>Errors</b>

<br>

${this.errors.length}

<hr>

<b>Warnings</b>

<br>

${this.warnings.length}

<hr>

<b>Timeline</b>

<br>

${this.timeline.length}

<hr>

<b>Startup</b>

<br>

${(

this.performance.startupTime || 0

).toFixed(2)} ms

<hr>

<b>Health</b>

<pre>

${JSON.stringify(

this.health,

null,

2

)}

</pre>

`;

};


GuardianEngine.prototype.toggleConsole = function () {

    const panel =

        document.getElementById(

            "guardianConsole"

        );

    if (!panel) return;

    this.consoleVisible =

        !this.consoleVisible;

    panel.style.display =

        this.consoleVisible

            ? "block"

            : "none";

    if (this.consoleVisible) {

        this.refreshConsole();

    }

};


window.addEventListener(

    "keydown",

    (event) => {

        if (

            event.ctrlKey &&

            event.shiftKey &&

            event.key.toLowerCase() === "g"

        ) {

            Guardian.toggleConsole();

        }

    }

);


setInterval(() => {

    if (

        Guardian.consoleVisible

    ) {

        Guardian.refreshConsole();

    }

}, 1000);


window.addEventListener(

    "load",

    () => {

        Guardian.createConsole();

    }

);

GuardianEngine.prototype.plugins = [];

GuardianEngine.prototype.registerPlugin = function (

    plugin

) {

    if (

        !plugin ||

        !plugin.name

    ) {

        this.log(

            "warning",

            "Invalid Guardian plugin."

        );

        return;

    }

    this.plugins.push(plugin);

    this.log(

        "info",

        `Plugin Registered → ${plugin.name}`

    );

};


GuardianEngine.prototype.runPlugins = function () {

    this.plugins.forEach(

        (plugin) => {

            try {

                if (

                    typeof plugin.run ===

                    "function"

                ) {

                    plugin.run(this);

                }

            }

            catch (error) {

                this.log(

                    "error",

                    `Plugin ${plugin.name} crashed.`,

                    error

                );

            }

        }

    );

};


GuardianEngine.prototype.fps = {

    current: 0,

    frames: 0,

    lastTime: performance.now()

};

GuardianEngine.prototype.startFPSMonitor = function () {

    const update = () => {

        const now = performance.now();

        this.fps.frames++;

        if (

            now >=

            this.fps.lastTime + 1000

        ) {

            this.fps.current =

                this.fps.frames;

            this.fps.frames = 0;

            this.fps.lastTime = now;

        }

        requestAnimationFrame(update);

    };

    requestAnimationFrame(update);

};


GuardianEngine.prototype.scanDuplicateIDs = function () {

    const ids = {};

    document.querySelectorAll(

        "[id]"

    ).forEach(

        (element) => {

            const id = element.id;

            ids[id] =

                (ids[id] || 0) + 1;

        }

    );

    Object.entries(ids).forEach(

        ([id, count]) => {

            if (count > 1) {

                this.log(

                    "warning",

                    `Duplicate ID detected: ${id}`

                );

            }

        }

    );

};



GuardianEngine.prototype.autoRecover = function () {

    if (

        !this.health.notifications

    ) {

        this.recover(

            "toast"

        );

    }

    if (

        !this.health.library

    ) {

        this.recover(

            "library"

        );

    }

    if (

        !this.health.dashboard

    ) {

        this.recover(

            "dashboard"

        );

    }

};


GuardianEngine.prototype.exportReport = function () {

    const report = {

        version: this.version,

        generated:

            new Date().toISOString(),

        health: this.health,

        performance:

            this.performance,

        warnings:

            this.warnings,

        errors:

            this.errors,

        timeline:

            this.timeline,

        modules:

            Array.from(

                this.modules.keys()

            ),

        plugins:

            this.plugins.map(

                p => p.name

            )

    };

    const blob = new Blob(

        [

            JSON.stringify(

                report,

                null,

                2

            )

        ],

        {

            type:

                "application/json"

        }

    );

    const url =

        URL.createObjectURL(

            blob

        );

    const link =

        document.createElement(

            "a"

        );

    link.href = url;

    link.download =

        "PenVerse_Guardian_Report.json";

    link.click();

    URL.revokeObjectURL(

        url

    );

};


window.addEventListener(

    "load",

    () => {

        setTimeout(() => {

            Guardian.startFPSMonitor();

            Guardian.scanDuplicateIDs();

            Guardian.autoRecover();

            Guardian.runPlugins();

        }, 4000);

    }

);

GuardianEngine.prototype.boot = function () {

    if (this.booted) {

        this.log(

            "warning",

            "Guardian has already booted."

        );

        return;

    }

    this.booted = true;

    this.recordEvent(

        "system",

        "Guardian Boot Complete"

    );

    this.verifySystems();

    this.verifyDependencies();

    this.scan();

    this.watchPerformance();

    this.diagnostics();

    this.log(

        "info",

        "PenVerse Guardian is protecting the application."

    );

};


GuardianEngine.prototype.api = {

    version() {

        return Guardian.version;

    },

    health() {

        return Guardian.getHealth();

    },

    diagnostics() {

        Guardian.diagnostics();

    },

    summary() {

        Guardian.summary();

    },

    export() {

        Guardian.exportReport();

    }

};


GuardianEngine.prototype.shutdown = function () {

    this.recordEvent(

        "system",

        "Guardian Shutdown"

    );

    this.log(

        "warning",

        "Guardian has been stopped."

    );

}

GuardianEngine.prototype.banner = function () {

    console.log(

`%c
██████╗ ███████╗███╗   ██╗██╗   ██╗███████╗██████╗ ███████╗
██╔══██╗██╔════╝████╗  ██║██║   ██║██╔════╝██╔══██╗██╔════╝
██████╔╝█████╗  ██╔██╗ ██║██║   ██║█████╗  ██████╔╝███████╗
██╔═══╝ ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║
██║     ███████╗██║ ╚████║ ╚████╔╝ ███████╗██║  ██║███████║
╚═╝     ╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝

Guardian AI Production Edition
Version ${this.version}
`,
"color:#FFD700;font-weight:bold;"

    );

};



window.addEventListener(

    "load",

    () => {

        Guardian.banner();

        Guardian.boot();

    }

);



Object.freeze(

    Guardian.api

);

Object.seal(

    Guardian.health

);

console.log(

    "%c🛡 Guardian Production Edition Loaded Successfully",

    "color:#00ff88;font-size:15px;font-weight:bold;"

);
