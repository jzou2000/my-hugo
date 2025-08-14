---
title: Web Client
---

### my request - web client

Create a web client, it scans BLE servers and services, support filter with prefix by name.
Once seleted, a button to connect the BLE server.

UI contains

* connection panel
  * name filter, text
  * button scan
  * list of scan result using the filter
  * button connect using list selection
* BLE client panel
  * temperature, read-only update every 5 seconds
  * 3 switches for R,G,B
  * slider for cycle (0-5) second
  * slider for duty (0-100) %
  * update BLE server when each writable field changed

use vanilla java script as possible, except must-have 3rd libraries/modules
use separate css files

### grok

I'll create a web-based BLE client using vanilla JavaScript, HTML, and CSS that interacts with the Waveshare ESP32-S3 Mini BLE server from the previous artifact. The app will use the Web Bluetooth API, which is supported in modern browsers like Chrome, and will include separate CSS files for styling. The UI will have a connection panel for scanning and connecting to BLE servers with a name filter, and a client panel for interacting with the temperature, RGB switches, cycle, and duty cycle characteristics.

Here are the artifacts:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jjS3mini BLE Client</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="panel" id="connection-panel">
            <h2>Connect to jjS3mini</h2>
            <div class="input-group">
                <label for="name-filter">Name Filter (Prefix):</label>
                <input type="text" id="name-filter" placeholder="e.g., jjS3mini">
            </div>
            <button id="scan-button">Scan</button>
            <div id="scan-results"></div>
            <button id="connect-button" disabled>Connect</button>
        </div>
        <div class="panel" id="client-panel" style="display: none;">
            <h2>jjS3mini Controls</h2>
            <div class="control-group">
                <label>Temperature: <span id="temperature">N/A</span> °C</label>
            </div>
            <div class="control-group">
                <label>LED Controls:</label>
                <div class="switch-group">
                    <label><input type="checkbox" id="red-switch"> Red</label>
                    <label><input type="checkbox" id="green-switch"> Green</label>
                    <label><input type="checkbox" id="blue-switch"> Blue</label>
                </div>
            </div>
            <div class="control-group">
                <label for="cycle-slider">Cycle (seconds): <span id="cycle-value">0</span></label>
                <input type="range" id="cycle-slider" min="0" max="5" step="1" value="0">
            </div>
            <div class="control-group">
                <label for="duty-slider">Duty Cycle (%): <span id="duty-value">100</span></label>
                <input type="range" id="duty-slider" min="0" max="100" step="1" value="100">
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
}

.panel {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-top: 0;
    color: #333;
}

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px 0;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

#scan-results {
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
}

.scan-result {
    padding: 5px;
    cursor: pointer;
}

.scan-result:hover {
    background-color: #f8f8f8;
}

.control-group {
    margin-bottom: 15px;
}

.switch-group {
    display: flex;
    gap: 15px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

input[type="range"] {
    width: 100%;
}
```

```js
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const TEMP_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const RED_CHAR_UUID = "1c95d5e3-d8f7-4135-bd99-7bf1cd4b7235";
const GREEN_CHAR_UUID = "6e4a6b81-8c36-4681-b1ae-dae4e7d4a8f4";
const BLUE_CHAR_UUID = "a3b3e2b1-2b6b-4e6f-9c7d-6e4a2b3e4c6f";
const CYCLE_CHAR_UUID = "f3c3d2a1-3c7b-4e6f-9c7d-6e4a2b3e4c6f";
const DUTY_CHAR_UUID = "d4c4e3b2-4c8c-4e7f-9c7d-6e4a2b3e4c7f";

let device = null;
let tempCharacteristic = null;
let redCharacteristic = null;
let greenCharacteristic = null;
let blueCharacteristic = null;
let cycleCharacteristic = null;
let dutyCharacteristic = null;

const nameFilterInput = document.getElementById("name-filter");
const scanButton = document.getElementById("scan-button");
const scanResults = document.getElementById("scan-results");
const connectButton = document.getElementById("connect-button");
const clientPanel = document.getElementById("client-panel");
const temperatureDisplay = document.getElementById("temperature");
const redSwitch = document.getElementById("red-switch");
const greenSwitch = document.getElementById("green-switch");
const blueSwitch = document.getElementById("blue-switch");
const cycleSlider = document.getElementById("cycle-slider");
const cycleValue = document.getElementById("cycle-value");
const dutySlider = document.getElementById("duty-slider");
const dutyValue = document.getElementById("duty-value");

scanButton.addEventListener("click", async () => {
    scanResults.innerHTML = "";
    connectButton.disabled = true;
    try {
        const devices = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: nameFilterInput.value || "" }],
            optionalServices: [SERVICE_UUID]
        });
        const deviceName = devices.name || "Unknown Device";
        const result = document.createElement("div");
        result.className = "scan-result";
        result.textContent = deviceName;
        result.dataset.deviceId = devices.id;
        result.addEventListener("click", () => {
            document.querySelectorAll(".scan-result").forEach(r => r.style.backgroundColor = "");
            result.style.backgroundColor = "#e0e0e0";
            connectButton.disabled = false;
            device = devices;
        });
        scanResults.appendChild(result);
    } catch (error) {
        console.error("Scan failed:", error);
    }
});

connectButton.addEventListener("click", async () => {
    if (!device) return;
    try {
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        tempCharacteristic = await service.getCharacteristic(TEMP_CHAR_UUID);
        redCharacteristic = await service.getCharacteristic(RED_CHAR_UUID);
        greenCharacteristic = await service.getCharacteristic(GREEN_CHAR_UUID);
        blueCharacteristic = await service.getCharacteristic(BLUE_CHAR_UUID);
        cycleCharacteristic = await service.getCharacteristic(CYCLE_CHAR_UUID);
        dutyCharacteristic = await service.getCharacteristic(DUTY_CHAR_UUID);

        // Setup temperature notifications
        await tempCharacteristic.startNotifications();
        tempCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
            const value = new TextDecoder().decode(event.target.value);
            temperatureDisplay.textContent = parseFloat(value).toFixed(2);
        });

        // Read initial values
        const redValue = await redCharacteristic.readValue();
        redSwitch.checked = new TextDecoder().decode(redValue) === "1";
        const greenValue = await greenCharacteristic.readValue();
        greenSwitch.checked = new TextDecoder().decode(greenValue) === "1";
        const blueValue = await blueCharacteristic.readValue();
        blueSwitch.checked = new TextDecoder().decode(blueValue) === "1";
        const cycleValueRead = await cycleCharacteristic.readValue();
        cycleSlider.value = new TextDecoder().decode(cycleValueRead);
        cycleValue.textContent = cycleSlider.value;
        const dutyValueRead = await dutyCharacteristic.readValue();
        dutySlider.value = new TextDecoder().decode(dutyValueRead);
        dutyValue.textContent = dutySlider.value;

        // Show client panel
        clientPanel.style.display = "block";
        connectionPanel.style.display = "none";

        // Setup event listeners for controls
        redSwitch.addEventListener("change", async () => {
            await redCharacteristic.writeValue(new TextEncoder().encode(redSwitch.checked ? "1" : "0"));
        });
        greenSwitch.addEventListener("change", async () => {
            await greenCharacteristic.writeValue(new TextEncoder().encode(greenSwitch.checked ? "1" : "0"));
        });
        blueSwitch.addEventListener("change", async () => {
            await blueCharacteristic.writeValue(new TextEncoder().encode(blueSwitch.checked ? "1" : "0"));
        });
        cycleSlider.addEventListener("input", async () => {
            cycleValue.textContent = cycleSlider.value;
            await cycleCharacteristic.writeValue(new TextEncoder().encode(cycleSlider.value));
        });
        dutySlider.addEventListener("input", async () => {
            dutyValue.textContent = dutySlider.value;
            await dutyCharacteristic.writeValue(new TextEncoder().encode(dutySlider.value));
        });

        device.addEventListener("gattserverdisconnected", () => {
            clientPanel.style.display = "none";
            connectionPanel.style.display = "block";
            device = null;
            connectButton.disabled = true;
        });
    } catch (error) {
        console.error("Connection failed:", error);
    }
});
```

To use this web client:

1. Serve the files using a local web server (e.g., `python -m http.server 8000` in the directory containing the files).
2. Access the page in a Web Bluetooth-compatible browser (e.g., Chrome) via `http://localhost:8000`.
3. Ensure the browser is running on a device with Bluetooth support and that Bluetooth is enabled.
4. Enter a name prefix (e.g., "jjS3mini") in the filter input, click "Scan", select a device from the results, and click "Connect".
5. The client panel will appear, showing the temperature (updated every 5 seconds) and allowing control of the RGB LED, cycle time, and duty cycle.

Notes:

- The Web Bluetooth API requires a secure context (HTTPS or localhost). For testing, localhost is sufficient.
- No third-party libraries are used; the code relies on vanilla JavaScript and the native Web Bluetooth API.
- The UUIDs match those in the ESP32-S3 Mini BLE server sketch.
- The client automatically updates the server when switches or sliders are changed and handles disconnections by reverting to the connection panel.
- Ensure the ESP32-S3 Mini is running the BLE server sketch from the previous artifact.
- The CSS provides a clean, responsive layout with a light theme, and the JavaScript handles errors gracefully with console logging for debugging.
