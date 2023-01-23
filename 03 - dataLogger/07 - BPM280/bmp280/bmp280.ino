/*************************************************************************** 
  //simply replaced status = bmp.begin(); by status = bmp.begin(0x76);

  Código para o NODEMCU

  BMP280
  D1 - SCL
  D2 - SDA
  
  DHT11
  D4 - 2   
 ***************************************************************************/
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
//#include "DHT.h" 

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>

const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

const char* serverName = "http://192.168.25.13:3333/sensores";
WiFiClient client;
HTTPClient http;

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

//#define DHTTYPE DHT11   // DHT 11
//#define dht_dpin 2

//DHT dht(dht_dpin, DHTTYPE); 

#define BMP_SCK 13
#define BMP_MISO 12
#define BMP_MOSI 11
#define BMP_CS 10

int altitude;

Adafruit_BMP280 bme; // I2C

void setup() {

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
 
  Serial.println("O Arduino está se conectando com a API FARM UFPR 4.0 aguarde...");

 // dht.begin();
 // Serial.begin(9600);
//  Serial.println("Humidity and temperature\n\n");
 // delay(100);

 // if (!bme.begin(0x76)) {
    if (!bme.begin()) {
    Serial.println("Could not find a valid BMP280 sensor, check wiring!");
    while (1);
  }
}

void loop() {


 // float h = dht.readHumidity();
//  float tDHT = dht.readTemperature();
  float t = bme.readTemperature();
  float p = bme.readPressure();
  float altBmp = bme.readAltitude(1035);
  
 
    Serial.print("Umidade DHT = ");
//    Serial.print(h);
    Serial.print("%  ");
    Serial.print("Temperatura DHT = ");
  //  Serial.print(tDHT); 
    Serial.println("ºC  ");
  //  delay(1000);  
  
  Serial.print("Temperatura BMP280 = ");
  Serial.print(t);
  Serial.println(" ºC");

  Serial.print("Pressão BMP280 = ");
  Serial.print(p);
  Serial.println(" mB");

  Serial.print("Altitude aproximada = ");
  Serial.print(altBmp); // this should be adjusted to your local forcase
  Serial.println(" metros");
 
  delay(2000);

  char buffer[1024]; 
  sprintf(buffer,
  "{\"user_id\":\"5fac2ad55a219835349cc97a\",\"ipArduino\":\"localhost\", \"tipoMedida1\":\"pressão\",\"unidadeMedida1\":\"mBar\",\"tipoMedida2\":\"Temperatura\",\"unidadeMedida2\":\"ºC\", \"modeloSensor\":\"BMP280\",\"valor1\": %f, \"valor2\": %f}", t, p);

if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(buffer);
      Serial.println(httpResponseCode);
      Serial.print("Resposta da requisição HTTP: ");

       if(httpResponseCode == 200){
        Serial.println("API FARM UFPR 4.0 conectada...");
        Serial.println("Dados gravados com sucesso");
        Serial.println("------------------------------------------------------------------------------------");
        }
        else{
          Serial.println("API não conectada");
          Serial.println("Contate o administrador");
          Serial.println("------------------------------------------------------------------------------------");          
        }    
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Desconectado");
    }
    lastTime = millis();
  }  
}
