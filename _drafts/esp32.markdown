---
title: esp32
---

esp32 development using Arduino  IDE - installation
https://github.com/espressif/arduino-esp32/blob/master/docs/arduino-ide/debian_ubuntu.md

Installation
As python3 was pre installed in Ubuntu18.04, I `sudo python get-pip.py` failed.
So tried to install pip by `sudo apt install python-pip`. 

`sudo pip install pyserial` success


# https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf
The operating voltage of ESP32 ranges from 2.3 V to 3.6 V. When using a single-power supply, the recommended voltage of the power supply is 3.3 V, and its recommended output current is 500 mA or more.

# Voltage supply
5V 550mA ???

# mongoose
Installation: https://mongoose-os.com/docs/mongoose-os/quickstart/setup.md
https://www.youtube.com/watch?v=Y6CZePh5uIA

https://mongoose-os.com/docs/mongoose-os/quickstart/develop-in-js.md
