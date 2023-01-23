const int MOISTURE_ANALOGIC_IN = A0; // Arduino's analogic pin
const int BOARD_RESOLUTION = 1024; // The analogic board resolution, for example Arduino Uno is 10 bit (from 0 to 1023)
const float OPERATIONAL_VOLTAGE = 5.0; // The default Arduino voltage
const float MAX_SENSOR_VOLTAGE = 3.0; // The maximum voltage that the sensor can output
const float SENSOR_READ_RATIO = OPERATIONAL_VOLTAGE / MAX_SENSOR_VOLTAGE; // The ratio betwent the two voltages

void setup() {
  Serial.begin(9600); // Serial Port setup
}

void loop() {
  int moistureAnalogicVal = analogRead(MOISTURE_ANALOGIC_IN) * SENSOR_READ_RATIO; // Read the analogic data and convert it to [0, 1023] range
  
  if (moistureAnalogicVal < BOARD_RESOLUTION * 0.1) {
    Serial.println("It is really dry!");
    Serial.println(moistureAnalogicVal);
  } else if (moistureAnalogicVal < BOARD_RESOLUTION * 0.33) {
    Serial.println("It is not wet!");
    Serial.println(moistureAnalogicVal);
  } else if (moistureAnalogicVal < BOARD_RESOLUTION * 0.66) {
    Serial.println("It is ok!");
    Serial.println(moistureAnalogicVal);
  } else if (moistureAnalogicVal < BOARD_RESOLUTION * 0.9) {
    Serial.println("It is really wet!");
    Serial.println(moistureAnalogicVal);
  } else {
    Serial.println("I am about to get drowned!");
    Serial.println(moistureAnalogicVal);
  }
  
  delay(1000); // Wait 3 second
}
