// executionFlow.js
// Question 6: Execution Flow & Console Analysis
// Demonstrates:
// 1. Observing execution order and synchronous vs asynchronous behavior in Node.js
// 2. Tracking CLI inputs using process.argv
// 3. Displaying logs before and after major operations
// 4. Debugging file operations
// 5. Analyzing server requests (simulated HTTP request lifecycle)

const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log(" LAB 1 - TASK 6: EXECUTION FLOW & CONSOLE ANALYSIS");
console.log("==================================================\n");

// ----------------------------------------------------
// 1. TRACK CLI INPUTS
// ----------------------------------------------------
console.log(">>> [SECTION 1: TRACKING CLI INPUTS]");
console.log("[INFO] Raw process.argv:", process.argv);
const cliArgs = process.argv.slice(2);
console.log(`[INFO] Parsed Command Line Arguments count: ${cliArgs.length}`);
if (cliArgs.length > 0) {
    cliArgs.forEach((arg, index) => {
        console.log(`  [ARG ${index + 1}]: ${arg}`);
    });
} else {
    console.log("  [ARG]: No extra CLI arguments provided. (Run 'node executionFlow.js param1 param2' to test tracking)");
}
console.log("");

// ----------------------------------------------------
// 2. SYNCHRONOUS VS ASYNCHRONOUS EXECUTION ORDER
// ----------------------------------------------------
console.log(">>> [SECTION 2: OBSERVING SYNC VS ASYNC EXECUTION ORDER]");
console.log("[SYNC 1] Starting synchronous execution sequence...");

// Asynchronous timer operation (Event Loop - Timers phase)
setTimeout(() => {
    console.log("[ASYNC 3] setTimeout (0ms) callback executed via Event Loop");
}, 0);

// Asynchronous process.nextTick / setImmediate
setImmediate(() => {
    console.log("[ASYNC 4] setImmediate callback executed via Event Loop");
});

console.log("[SYNC 2] Continuing synchronous execution (blocking flow)...");
console.log("[SYNC 3] Synchronous block finished. Control passed to Node.js event loop.\n");

// ----------------------------------------------------
// 3. DEBUGGING FILE OPERATIONS WITH BEFORE/AFTER LOGS
// ----------------------------------------------------
console.log(">>> [SECTION 3: DEBUGGING FILE OPERATIONS (BEFORE & AFTER LOGS)]");
const sampleFile = path.join(__dirname, 'debug_sample.txt');
const sampleContent = 'Debugging Node.js file operations with console logging.';

console.log(`[FS-DEBUG] [BEFORE] Attempting to write file: "${sampleFile}"`);
const writeStartTime = Date.now();

fs.writeFile(sampleFile, sampleContent, (err) => {
    const writeDuration = Date.now() - writeStartTime;
    if (err) {
        console.error(`[FS-DEBUG] [ERROR] Failed to write file after ${writeDuration}ms:`, err.message);
        return;
    }
    console.log(`[FS-DEBUG] [AFTER] File written successfully in ${writeDuration}ms.`);

    // Read the file back to verify
    console.log(`[FS-DEBUG] [BEFORE] Reading file: "${sampleFile}"`);
    fs.readFile(sampleFile, 'utf8', (readErr, data) => {
        if (readErr) {
            console.error("[FS-DEBUG] [ERROR] Error reading file:", readErr.message);
            return;
        }
        console.log(`[FS-DEBUG] [AFTER] File read completed. Content length: ${data.length} chars. Data: "${data}"`);

        // Clean up sample file
        console.log(`[FS-DEBUG] [BEFORE] Deleting sample file: "${sampleFile}"`);
        fs.unlink(sampleFile, (unlinkErr) => {
            if (unlinkErr) {
                console.error("[FS-DEBUG] [ERROR] Error deleting file:", unlinkErr.message);
            } else {
                console.log("[FS-DEBUG] [AFTER] Cleanup complete. File deleted successfully.\n");
            }

            // Trigger server request analysis after file operations complete
            analyzeServerRequests();
        });
    });
});

// ----------------------------------------------------
// 4. ANALYZING SERVER REQUESTS
// ----------------------------------------------------
function analyzeServerRequests() {
    console.log(">>> [SECTION 4: ANALYZING SERVER REQUEST LIFECYCLE]");
    
    // Simulated incoming request objects
    const simulatedRequests = [
        { method: 'GET', url: '/', clientIp: '127.0.0.1' },
        { method: 'GET', url: '/about', clientIp: '192.168.1.15' },
        { method: 'POST', url: '/submit', clientIp: '10.0.0.2', body: { user: 'Alice' } },
        { method: 'GET', url: '/unknown-route', clientIp: '172.16.0.4' }
    ];

    simulatedRequests.forEach((req, idx) => {
        const timestamp = new Date().toISOString();
        console.log(`[REQ ${idx + 1}] [${timestamp}] Incoming ${req.method} request to: ${req.url} from ${req.clientIp}`);
        
        // Simulating request route resolution and status determination
        let statusCode = 200;
        let responseMsg = '';

        if (req.url === '/') {
            responseMsg = 'Welcome message sent';
        } else if (req.url === '/about') {
            responseMsg = 'About page content served';
        } else if (req.url === '/submit') {
            statusCode = 201;
            responseMsg = 'Data submitted successfully';
        } else {
            statusCode = 404;
            responseMsg = 'Route not found';
        }

        console.log(`[RES ${idx + 1}] [STATUS ${statusCode}] Logged response for ${req.url}: "${responseMsg}"`);
    });

    console.log("\n==================================================");
    console.log(" EXECUTION FLOW & CONSOLE ANALYSIS FINISHED");
    console.log("==================================================");
}
