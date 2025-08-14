---
title: BLE Server v1.0
---

## my request

Create app for waveshare s3 mini chip as below

It has a BLE server:

- name: jjS3mini
- repor chip temperature in celsius, in name "temperature"
- report/change on-chip led status:
  - three component R/G/B on/off separately, in names R, G, B respectively
  - blinking behavior:
  - cycle in seconds, 0 - 5, step 1, 0 means off completely
  - duty percent: 0-100%, 0 means off, 100% means always on, 30% means 30% on

The on-chip led is WS2812 RGB on GP21 according to its spec,

## grok

I'll create an Arduino application for the Waveshare ESP32-S3 Mini (ESP32-S3-Zero) that implements a BLE server with the specified functionality. The app will use the Arduino framework with the Adafruit NeoPixel library for WS2812 control and the ESP32 BLE library for Bluetooth communication.

The BLE server will:

- Advertise as "jjS3mini"
- Expose a service with characteristics for:
  - Temperature (read-only, in Celsius)
  - R, G, B LED states (read/write, on/off)
  - Blink cycle (read/write, 0-5 seconds)
  - Duty cycle (read/write, 0-100%)

Here's the complete Arduino sketch:

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

// Callback for characteristic writes
class MyCharacteristicCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string uuid = pCharacteristic->getUUID().toString();
    std::string value = pCharacteristic->getValue();

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
      }
    } else if (uuid == DUTY_CHAR_UUID) {
      int val = atoi(value.c_str());
      if (val >= 0 && val <= 100) {
        dutyCycle = val;
      }
    }
  }
};

void setup() {
  // Initialize NeoPixel
  pixels.begin();
  pixels.setBrightness(50); // Moderate brightness to avoid overheating
  pixels.clear();
  pixels.show();

  // Initialize BLE
  BLEDevice::init("jjS3mini");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create characteristics
  pTempCharacteristic = pService->createCharacteristic(
    TEMP_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
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
}

void loop() {
  // Update temperature every 5 seconds
  static unsigned long lastTempUpdate = 0;
  if (millis() - lastTempUpdate >= 5000) {
    char tempStr[8];
    dtostrf(getChipTemperature(), 1, 2, tempStr);
    pTempCharacteristic->setValue(tempStr);
    pTempCharacteristic->notify();
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
      }
    } else {
      if (ledState) {
        pixels.clear();
        pixels.show();
        ledState = false;
      }
    }
  }

  delay(10);
}

```

To use this app:

1. Install the Arduino IDE and the ESP32 board package (version 2.0.11 or later) as described in the Waveshare Wiki.[](https://www.waveshare.com/wiki/ESP32-S3-Zero)
2. Install the Adafruit NeoPixel library via the Arduino Library Manager.
3. Connect the ESP32-S3-Zero to your computer via USB-C.
4. Select "ESP32S3 Dev Module" in the Arduino IDE and the appropriate COM port.
5. Upload the sketch.

The BLE server can be accessed using a BLE client app (e.g., nRF Connect). You can:

- Read the temperature characteristic to get the chip temperature in Celsius.
- Read/write the R, G, B characteristics with "1" (on) or "0" (off).
- Read/write the cycle characteristic with values 0-5 (seconds).
- Read/write the duty cycle characteristic with values 0-100 (%).

Note: The WS2812 LED is connected to GPIO21, and the brightness is set to a moderate level to prevent overheating, as recommended by Waveshare. Avoid setting the duty cycle or cycle time outside the specified ranges to prevent unexpected behavior.[](https://www.waveshare.com/wiki/ESP32-S3-Matrix)
