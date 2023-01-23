#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>


const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

const char* serverName = "http://192.168.25.9:3333/sensores";

unsigned long lastTime = 0;

unsigned long timerDelay = 5000;


int Gas_analog = A0;    
int Gas_digital = D1; 

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
 
  Serial.begin(115200);
  pinMode(Gas_digital, INPUT);
  
  Serial.println("Sensor de gás CO2 \n\n");
  delay(700);
}

void loop() {

  float gassensorAnalog = analogRead(Gas_analog);
  //int gassensorDigital = digitalRead(Gas_digital);

  char buffer[1024]; 
 
    Serial.print("Sensor de Gás =  ");
    Serial.print(gassensorAnalog);
    Serial.print("%  \n");
    delay(1000);  

    if(gassensorAnalog > 10){
       sprintf(buffer, "{\"user_id\":\"5fac2ad55a219835349cc97a\",\"ipArduino\":\"192.168.25.15\", \"tipoMedida1\":\"CO2\",\"unidadeMedida1\":\"%%\", \"modeloSensor\":\"MQ-2\",\"valor1\": %f}", gassensorAnalog);
    }else{
      Serial.print("... \n");
    }

  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      http.begin(serverName);

      http.addHeader("Content-Type", "application/json");
   
      int httpResponseCode = http.POST(buffer);
      Serial.println(httpResponseCode);

     Serial.print("Resposta da requisição HTTP: ");

       if(httpResponseCode == 200){

        Serial.println("API FARM UFPR 4.0 conectada...");
        Serial.println("Dados gravados com sucesso");
        Serial.println("------------------------------------------------------------------------------------");
        }

        if(httpResponseCode == 400){
          Serial.println("Requisição não enviada - gás não detectado");
          }

        else{
          Serial.println("API não conectada");
          Serial.println("Contate o administrador");
          Serial.println("------------------------------------------------------------------------------------");          
        }    

      http.end();
    }
    else {
      Serial.println("WiFi Desconectado");
    }
    lastTime = millis();
  }

}

  
