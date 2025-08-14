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
const connectionPanel = document.getElementById("connection-panel");
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
            console.log(`red: ${redSwitch.checked}`)
        });
        greenSwitch.addEventListener("change", async () => {
            await greenCharacteristic.writeValue(new TextEncoder().encode(greenSwitch.checked ? "1" : "0"));
            console.log(`green: ${greenSwitch.checked}`)
        });
        blueSwitch.addEventListener("change", async () => {
            await blueCharacteristic.writeValue(new TextEncoder().encode(blueSwitch.checked ? "1" : "0"));
            console.log(`blue ${blueSwitch.checked}`)
        });
        cycleSlider.addEventListener("input", async () => {
            cycleValue.textContent = cycleSlider.value;
            await cycleCharacteristic.writeValue(new TextEncoder().encode(cycleSlider.value));
            console.log(`cycle: ${cycleValue.textContent}`)
        });
        dutySlider.addEventListener("input", async () => {
            dutyValue.textContent = dutySlider.value;
            await dutyCharacteristic.writeValue(new TextEncoder().encode(dutySlider.value));
            console.log(`duty: ${dutyValue.textContent}`)
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