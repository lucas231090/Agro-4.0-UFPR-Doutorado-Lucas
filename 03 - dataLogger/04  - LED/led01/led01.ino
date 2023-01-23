#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
 
const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

const char* IPNodeMCU = "http://192.168.25.16";

ESP8266WebServer server(80);

int LED = D1;                 // led connected to D0
int LEDverde = 4; //D2

void setup() 
{
  Serial.begin(115200);
    
  WiFi.begin(ssid, password);
  Serial.println("Conectando");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Arduino conectado no IP: ");
  Serial.println(WiFi.localIP());
 
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  pinMode(LEDverde, OUTPUT);
  digitalWrite(LEDverde, LOW);
  
  server.on("/", []() {
    server.send(200, "Bem vindo ao nosso servidor");
  });
  
  server.on("/off", []() {
    server.send(200, "Led apagada");
    digitalWrite(LED, LOW);
    delay(1000);
  });
  
  server.on("/on", []() {
    server.send(200, "Led acesa");
    digitalWrite(LED, HIGH);
    delay(1000);
  });

  server.on("/offVerde", []() {
    server.send(200, "Led verde apagada");
    digitalWrite(LEDverde, LOW);
    delay(1000);
  });
  
  server.on("/onVerde", []() {
    server.send(200, "Led verde acesa");
    digitalWrite(LEDverde, HIGH);
    delay(1000);
  });

  
  server.begin();
  Serial.println("Web server Inicializado!");
  
  delay(700);

}
 
void loop() 
  {
     server.handleClient();
}
