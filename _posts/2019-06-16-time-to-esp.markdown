---
layout: post
title: "it's time for esp!"
thumbnail: https://picsum.photos/200
categories: technology
---

<div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/biJKc6rlGfo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Slightly modified `AdvancecWebServer` from `ESP32` wifi example.

```c++
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include "ArduinoJson.h"

const char *ssid     = "ssid";
const char *password = "password";

// READS PWN SIGNAL FROM PIN 26
const byte ANALOG_PWM_INPUT_PIN = 26;

WebServer server(80);

// Allocate the JSON document
// Inside the brackets, 200 is the RAM allocated to this document.
// Don't forget to change this value to match your requirement.
// Use arduinojson.org/v6/assistant to compute the capacity.
StaticJsonDocument<100> doc;

// HALL SENSOR POST PAYLOAD
String payload = "";


class CLedToggle{
  private:
    bool led_status;

  public:
    CLedToggle() {
      led_status = false;
    }
    void toggleLed();
    bool getLedStatus();
    void setLedStatus();
};
bool CLedToggle::getLedStatus(){
  return this->led_status;
}
void CLedToggle::toggleLed(){
  this->led_status = !this->led_status;
}

CLedToggle lT;

// ROUTE /toggle
void ledToggle(){

  lT.toggleLed();
  payload = "";

  // CLEAR JSON DOC: IF NOT EMPTY
  if(!doc.isNull()){
    doc.clear();
  }

  //READ SENSORS
  doc["status"] = "OK";
  doc["hallSensor"] = hallRead();
  doc["ledStatus"] = lT.getLedStatus();
  doc["mockAdruinoData"] = pulseIn(ANALOG_PWM_INPUT_PIN, HIGH);

  // https://arduinojson.org/v6/api/json/serializejson/
  serializeJson(doc, payload); // 'payload' is type String

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", payload);
}

// ROUTE /data
void sensorData(){
  payload = "";

  // CLEAR JSON DOC: IF NOT EMPTY
  if(!doc.isNull()){
    doc.clear();
  }

  //READ SENSORS
  doc["status"] = "OK";
  doc["hallSensor"] = hallRead();
  doc["ledStatus"] = lT.getLedStatus();
  doc["mockAdruinoData"] = pulseIn(ANALOG_PWM_INPUT_PIN, HIGH);

  // https://arduinojson.org/v6/api/json/serializejson/
  serializeJson(doc, payload); // 'payload' is type String

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", payload);
}

// ROUTE 404
void notFound(){
  payload = "";

  // CLEAR JSON DOC: IF NOT EMPTY
  if(!doc.isNull()){
    doc.clear();
  }
  //READ SENSORS
  doc["status"] = "BAD",
  doc["message"] = "BAD REQUEST";

  // https://arduinojson.org/v6/api/json/serializejson/
  serializeJson(doc, payload); // 'payload' is type String

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(404, "application/json", payload);
}

void setup(){
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  // WAIT UNTILL CONNECT
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println(".");
  }

  Serial.println("");
  Serial.print("CONNECTED TO: ");
  Serial.println(ssid);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("WEATHER_STATION")) {
    Serial.println("MDNS responder started");
  }

  // ROUTES
  server.on("/data", sensorData);
  server.on("/toggle", ledToggle);
  server.onNotFound(notFound);
  server.begin();
  Serial.println("HTTP SERVER STARTED!");
}

void loop(){
  server.handleClient();
}
```
