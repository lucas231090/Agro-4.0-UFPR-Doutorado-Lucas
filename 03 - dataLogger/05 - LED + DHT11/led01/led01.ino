#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
#include "DHT.h"
 
const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

//const char* IPNodeMCU = "http://192.168.25.32";

ESP8266WebServer server(80);

int LED = 5; //D1
int LEDverde = 4; //D2

#define DHTTYPE DHT11   // DHT11 or DHT22
#define dht_dpin 0 //D3
DHT dht(dht_dpin, DHTTYPE); 


float humidity, temp;  // Values read from sensor
String webString="";     // String to display
unsigned long previousMillis = 0;        // will store last temp was read
const long interval = 2000;              // interval at which to read sensor

void handle_root() {
  server.send(200, "text/plain", "Bem vindo ao ESP8266 da Farm UFPR 4.0 , leitura de DHT11 com temperatura e umidade");
  delay(100);
}
 
void setup(void) 
{
  Serial.begin(115200);

  dht.begin();
  
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  pinMode(LEDverde, OUTPUT);
  digitalWrite(LEDverde, LOW);
    
  WiFi.begin(ssid, password);
  Serial.println("Conectando");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Arduino conectado no IP: ");
  Serial.println(WiFi.localIP());
  
  server.on("/", []() {
    server.send(200, "Farm UFPR 4.0", "Bem vindo ao servidor DHT+leds");
  });

  server.on("/dht11/temperatura", [](){  // if you add this subdirectory to your webserver call, you get text below :)
    gettemperature();       // read sensor
    webString=String((int)temp);   // Arduino has a hard time with float to string
    server.send(200, "application/json", webString);            // send to someones browser when asked
  });

  server.on("/dht11/umidade", [](){  // if you add this subdirectory to your webserver call, you get text below :)
    gettemperature();           // read sensor
    webString= String((int)humidity);
    server.send(200, "application/json", webString);               // send to someones browser when asked
  });
  
  server.on("/offred", []() {
    server.send(200, "ledRed OFF sucess", "Led vermelha apagada com sucesso!");
    digitalWrite(LED, LOW);
    delay(1000);
  });
  
  server.on("/onred", []() {
    server.send(200, "ledRed ON sucess", "Led vermelha acesa com sucesso!");
    digitalWrite(LED, HIGH);
    delay(1000);
  });

   server.on("/offgreen", []() {
    server.send(200, "ledGreen OFF sucess", "Led verde apagada com sucesso!");
    digitalWrite(LEDverde, LOW);
    delay(1000);
  });
  
  server.on("/ongreen", []() {
    server.send(200, "ledGreen ON sucess", "Led verde acesa com sucesso!");
    digitalWrite(LEDverde, HIGH);
    delay(1000);
  });  
  
  server.begin();
  Serial.println("Web server Inicializado!");
  
  delay(700);

}
 
void loop(void) 
  {
     server.handleClient();

  }

     void gettemperature() {
  // Wait at least 2 seconds seconds between measurements.
  // if the difference between the current time and last time you read
  // the sensor is bigger than the interval you set, read the sensor
  // Works better than delay for things happening elsewhere also
  unsigned long currentMillis = millis();
 
  if(currentMillis - previousMillis >= interval) {
    // save the last time you read the sensor 
    previousMillis = currentMillis;   
 
    // Reading temperature for humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (it's a very slow sensor)
    humidity = dht.readHumidity();          // Read humidity (percent)
    temp = dht.readTemperature();
    // Check if any reads failed and exit early (to try again).
    if (isnan(humidity) || isnan(temp)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
}
  }
    }
