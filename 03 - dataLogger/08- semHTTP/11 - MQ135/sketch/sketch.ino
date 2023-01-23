#include "MQ135.h"

#define VIRTUAL_PIN 5
#define ANALOGPIN A0

MQ135 gasSensor = MQ135(ANALOGPIN);

float ppm;

void setup() {
  
    Serial.begin(115200);
  
    ppm = gasSensor.getPPM();
  
}

void loop() {
  
  Serial.println(ppm); // this to display the ppm value continuously, uncomment this to get rzero value
}
