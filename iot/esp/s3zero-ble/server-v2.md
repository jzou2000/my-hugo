---
title: BLE Server v2.0
---

## request to add debug

please add debug output when BLE is connected, query and set

## grok

I'll update the previous Arduino sketch to add debug output for BLE connection events, characteristic queries (reads), and characteristic sets (writes). The debug output will be sent to the Serial monitor at 115200 baud. The changes include:

- Initializing Serial in setup()
- Adding a server callback class to handle connect/disconnect events
- Modifying the characteristic callback to log read and write operations
- Keeping the same artifact_id since this is an update to the previous artifact

```c
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <Adafruit_NeoPixel.h>

// Pin definitions
#define NEOPIXEL_PIN 21
#define NUM_PIXELS 1

// BLE Service and Characteristic UUIDs
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define TEMP_CHAR_UUID      "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define RED_CHAR_UUID       "1c95d5e3-d8f7-4135-bd99-7bf1cd4b7235"
#define GREEN_CHAR_UUID     "6e4a6b81-8c36-4681-b1ae-dae4e7d4a8f4"
#define BLUE_CHAR_UUID      "a3b3e2b1-2b6b-4e6f-9c7d-6e4a2b3e4c6f"
#define CYCLE_CHAR_UUID     "f3c3d2a1-3c7b-4e6f-9c7d-6e4a2b3e4c6f"
#define DUTY_CHAR_UUID      "d4c4e3b2-4c8c-4e7f-9c7d-6e4a2b3e4c7f"

// LED control variables
Adafruit_NeoPixel pixels(NUM_PIXELS, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);
bool redOn = false;
bool greenOn = false;
bool blueOn = false;
uint8_t cycleSeconds = 0; // 0-5 seconds, 0 means off
uint8_t dutyCycle = 100;  // 0-100%, 0 means off, 100 means always on
unsigned long lastCycleStart = 0;
bool ledState = false;

// BLE characteristics
BLECharacteristic *pTempCharacteristic;
BLECharacteristic *pRedCharacteristic;
BLECharacteristic *pGreenCharacteristic;
BLECharacteristic *pBlueCharacteristic;
BLECharacteristic *pCycleCharacteristic;
BLECharacteristic *pDutyCharacteristic;

// Function to get chip temperature in Celsius
float getChipTemperature() {
  return (temprature_sens_read() - 32) / 1.8;
}

// Callback for BLE server connection events
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    Serial.println("BLE Client Connected");
  }
  void onDisconnect(BLEServer* pServer) {
    Serial.println("BLE Client Disconnected");
    BLEDevice::startAdvertising(); // Restart advertising
  }
};

// Callback for characteristic reads and writes
class MyCharacteristicCallbacks : public BLECharacteristicCallbacks {
  void onRead(BLECharacteristic *pCharacteristic) {
    std::string uuid = pCharacteristic->getUUID().toString();
    std::string value = pCharacteristic->getValue();
    Serial.print("Read Characteristic UUID: ");
    Serial.print(uuid.c_str());
    Serial.print(", Value: ");
    Serial.println(value.c_str());
  }

  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string uuid = pCharacteristic->getUUID().toString();
    std::string value = pCharacteristic->getValue();
    Serial.print("Write Characteristic UUID: ");
    Serial.print(uuid.c_str());
    Serial.print(", Value: ");
    Serial.println(value.c_str());

    if (uuid == RED_CHAR_UUID) {
      redOn = (value == "1");
    } else if (uuid == GREEN_CHAR_UUID) {
      greenOn = (value == "1");
    } else if (uuid == BLUE_CHAR_UUID) {
      blueOn = (value == "1");
    } else if (uuid == CYCLE_CHAR_UUID) {
      int val = atoi(value.c_str());
      if (val >= 0 && val <= 5) {
        cycleSeconds = val;
        Serial.print("Cycle set to: ");
        Serial.println(cycleSeconds);
      }
    } else if (uuid == DUTY_CHAR_UUID) {
      int val = atoi(value.c_str());
      if (val >= 0 && val <= 100) {
        dutyCycle = val;
        Serial.print("Duty cycle set to: ");
        Serial.println(dutyCycle);
      }
    }
  }
};

void setup() {
  // Initialize Serial for debugging
  Serial.begin(115200);
  Serial.println("Starting jjS3mini BLE Server...");

  // Initialize NeoPixel
  pixels.begin();
  pixels.setBrightness(50); // Moderate brightness to avoid overheating
  pixels.clear();
  pixels.show();

  // Initialize BLE
  BLEDevice::init("jjS3mini");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create characteristics
  pTempCharacteristic = pService->createCharacteristic(
    TEMP_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
  pTempCharacteristic->setCallbacks(new MyCharacteristicCallbacks());
  pTempCharacteristic->addDescriptor(new BLE2902());

  pRedCharacteristic = pService->createCharacteristic(
    RED_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pRedCharacteristic->setCallbacks(new MyCharacteristicCallbacks());

  pGreenCharacteristic = pService->createCharacteristic(
    GREEN_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pGreenCharacteristic->setCallbacks(new MyCharacteristicCallbacks());

  pBlueCharacteristic = pService->createCharacteristic(
    BLUE_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pBlueCharacteristic->setCallbacks(new MyCharacteristicCallbacks());

  pCycleCharacteristic = pService->createCharacteristic(
    CYCLE_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pCycleCharacteristic->setCallbacks(new MyCharacteristicCallbacks());

  pDutyCharacteristic = pService->createCharacteristic(
    DUTY_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pDutyCharacteristic->setCallbacks(new MyCharacteristicCallbacks());

  // Start the service
  pService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("BLE Advertising Started");
}

void loop() {
  // Update temperature every 5 seconds
  static unsigned long lastTempUpdate = 0;
  if (millis() - lastTempUpdate >= 5000) {
    char tempStr[8];
    dtostrf(getChipTemperature(), 1, 2, tempStr);
    pTempCharacteristic->setValue(tempStr);
    pTempCharacteristic->notify();
    Serial.print("Temperature Updated: ");
    Serial.println(tempStr);
    lastTempUpdate = millis();
  }

  // Update LED states
  pRedCharacteristic->setValue(redOn ? "1" : "0");
  pGreenCharacteristic->setValue(greenOn ? "1" : "0");
  pBlueCharacteristic->setValue(blueOn ? "1" : "0");
  char cycleStr[4];
  sprintf(cycleStr, "%d", cycleSeconds);
  pCycleCharacteristic->setValue(cycleStr);
  char dutyStr[4];
  sprintf(dutyStr, "%d", dutyCycle);
  pDutyCharacteristic->setValue(dutyStr);

  // Handle LED blinking
  if (cycleSeconds == 0 || dutyCycle == 0) {
    pixels.clear();
    pixels.show();
  } else {
    unsigned long currentTime = millis();
    unsigned long cycleMillis = cycleSeconds * 1000;
    unsigned long onTime = cycleMillis * dutyCycle / 100;
    unsigned long offTime = cycleMillis - onTime;

    if (currentTime - lastCycleStart >= cycleMillis) {
      lastCycleStart = currentTime;
    }

    if (currentTime - lastCycleStart < onTime) {
      if (!ledState) {
        pixels.setPixelColor(0, pixels.Color(redOn ? 255 : 0, greenOn ? 255 : 0, blueOn ? 255 : 0));
        pixels.show();
        ledState = true;
        Serial.println("LED On");
      }
    } else {
      if (ledState) {
        pixels.clear();
        pixels.show();
        ledState = false;
        Serial.println("LED Off");
      }
    }
  }

  delay(10);
}

```

To use the updated app:

1. Follow the same setup steps as before (Arduino IDE, ESP32 board package, Adafruit NeoPixel library).
2. Open the Serial Monitor in Arduino IDE (set to 115200 baud) to view debug output.
3. Upload the sketch to the ESP32-S3-Zero.

Debug output will show:

- "Starting jjS3mini BLE Server..." and "BLE Advertising Started" on startup
- "BLE Client Connected" when a client connects
- "BLE Client Disconnected" when a client disconnects
- Characteristic UUID and value for every read/write operation
- Specific messages when cycle or duty cycle values are set
- Temperature updates every 5 seconds
- LED on/off state changes during blinking

You can connect using a BLE client app (e.g., nRF Connect) and monitor the Serial output to debug interactions with the characteristics. The functionality remains the same as the previous version, with added debug logging for troubleshooting.
