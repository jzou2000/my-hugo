---
title: The Most Common Arduino Controllers
nav: common controllers
---

## Basic Models
|Controller |Arduino Uno |Arduino Nano|Arduino Duo|Arduino Mega 2560|
|:----------|:-----------|:-----------|:----------|:-----------|
|processor  |Atmega328   |Atmega328   |ATSAM3X8E Cortex-M3|ATmega2560|
|bit        |8           |8           |32?        |8         |
|clock      |16M         |16M         |84M        |16M         |
|program mem|32K         |32K         |512K       |256K        |
|EEPROM     |1K          |1K          |           |4K          |
|RAM        |2K          |2K          |96K        |8K          |
|IO digit   |14          |14          |54         |54          |
|a-input    |6           |6           |12         |16          |
|a-output   |            |            |2          |            |
|PWM        |6           |4           |12         |15          |
|5v         |*           |*           |           |*           |
|3.3v       |*           |*           |*          |            |
|size       |69x54 mm    |            |           |            |
|USB        |*           |            |           |            |
|Power      |            |            |           |            |
|Sample price      |            |$13.69|           |            |
|Best For    |desktop prototype|lower cost  |high performance prototyping|high IO|
|           |use shield  |small profile  |more GPIO, a-inputs|require more memory|
|Sample Projects   |simple robot          |RC plans|data processor of multiple sources|DIY bench tools|
|           |RC cars          |portable devices|machine controller|multi-device controlling|
|           |simple game controller          |sensor gathering|home automation|home automation|
|           |IoT sensor          |            |           |            |

* Aruduio Uno is the most common (standard) version
* Arduino Nana is a tiny size version of Arduino Uno, can't connect to Arduino shields
* Arduino Duo is the first board powered by an ARM processor
* Mega has the same CPU speed with Uno/Nano, with much more GPIO

Note:
* headers - this is the name of the two lines of sockets that line up with the edges of the circuit board. 

Ref
* [Maker Pro: A Comparison of Popular Arduino Boards](https://maker.pro/arduino/tutorial/a-comparison-of-popular-arduino-boards)

## Extra Features

* [Arduino Uno Rev3](https://store-usa.arduino.cc/collections/most-popular/products/arduino-uno-rev3)
  * $23.00
* [ARDUINO UNO WiFi REV2](https://store-usa.arduino.cc/products/arduino-uno-wifi-rev2)
  * $44.82
  * wifi, blue tooth
  * MPU: ATmega4809, 5V
* [Arduino Nano 33 BLE](https://store-usa.arduino.cc/collections/robotics-drones/products/arduino-nano-33-ble)
  * $20.20
  * form factor: 45x18mm
  * nRF52840 from Nordic Semiconductors, a 32-bit ARM® Cortex™-M4 CPU running at 64 MHz, 3.3V
  * a 9 axis inertial measurement unit (IMU)
  * bluetooth and BLE
* [Arduino Nano Every with headers](https://store-usa.arduino.cc/products/arduino-nano-every-with-headers)
  * $14.90
  * form factor: 45x18mm
  * ATMega4809, 5V
* [Arduino Nano RP2040 Connect with headers](https://store-usa.arduino.cc/collections/most-popular/products/arduino-nano-rp2040-connect-with-headers)
  * $25.50
  * Raspberry Pi RP2040 silicon; a dual-core Arm Cortex M0+ running at 133MHz. It has 264KB of SRAM, and the 16MB of flash memory is off-chip to give you extra storage.
  * built-in mic is there for sound activation, audio control and even AI voice recognition.
  * The six-axis smart IMU with AI capabilities tells the board which way it’s moving, and adds fall sensing and double-tap activation.
* [Waterproof Ultrasonic Sensor with Separate Probe](https://store-usa.arduino.cc/collections/sensors-environment/products/waterproof-ultrasonic-sensor-with-separate-probe)
