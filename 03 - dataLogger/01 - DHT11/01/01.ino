#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "DHT.h"  


const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

const char* serverName = "http://192.168.25.9:3333/sensores";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

#define DHTTYPE DHT11   // DHT 11
#define dht_dpin 0

DHT dht(dht_dpin, DHTTYPE); 

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

  dht.begin();
  Serial.begin(9600);
  Serial.println("Humidity and temperature\n\n");
  delay(700);
}

void loop() {

 float h = dht.readHumidity();
 float t = dht.readTemperature();
 
    Serial.print("Current humidity = ");
    Serial.print(h);
    Serial.print("%  ");
    Serial.print("temperature = ");
    Serial.print(t); 
    Serial.println("C  ");
    delay(1000);  

 char buffer[1024]; 
 sprintf(buffer, "{\"user_id\":\"5fac2ad55a219835349cc97a\",\"ipArduino\":\"192.168.25.15\", \"tipoMedida1\":\"Umidade\",\"unidadeMedida1\":\"%%\",\"tipoMedida2\":\"Temperatura\",\"unidadeMedida2\":\"ºC\", \"modeloSensor\":\"DHT-11\",\"valor1\": %f, \"valor2\": %f}", h, t);


 //String httpRequestData = "{\"user_id\":\"5fac2ad55a219835349cc97a\",\"tipoMedida1\":\"Temperatura\",\"unidadeMedida1\":\"ºC\",\"modeloSensor\":\"DHT-11\",\"valor1\": \"" + %f\h + "\" ,\"valor2\": 25,\"ipArduino\":\"192.168.25.15\"}";
 //Serial.println(httpRequestData);
  
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      
      // Your Domain name with URL path or IP address with path
      http.begin(serverName);

       
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
     
      //int httpResponseCode = http.POST(httpRequestData);
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

  
