#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
//#include "DHT.h"  
#include <Ultrasonic.h>

const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

const char* serverName = "http://192.168.25.9:3333/sensores";

unsigned long lastTime = 0;

unsigned long timerDelay = 5000;

#define pino_trigger 4
#define pino_echo 5

int ledverde = 12;
int ledvermelho = 13;

Ultrasonic ultrasonic(pino_trigger, pino_echo);

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

  Serial.begin(9600);
  Serial.println("Sensor HC-SR04 \n\n");
  pinMode (ledverde,OUTPUT);       //definindo os pinos dos LEDs como saída
  pinMode (ledvermelho ,OUTPUT);
  delay(700);
}

void loop() {

    float cmMsec;
    long microsec = ultrasonic.timing();
   
    cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
    
    Serial.print("Distancia em cm: ");
    Serial.print(cmMsec);
    delay(1000);  

     if (cmMsec >=15) {
    digitalWrite(ledverde,HIGH);  //liga o LED verde
  }
   // se a distancia for 10 cm e 20 cm
  if(cmMsec <= 16){
    digitalWrite(ledvermelho,HIGH);//liga LED amarelo
  } 

  if(cmMsec <=15){
    digitalWrite(ledverde, LOW);
  }

  if(cmMsec >= 16){
    digitalWrite(ledvermelho, LOW);
  }


 char buffer[1024]; 
 sprintf(buffer, "{\"user_id\":\"5fac2ad55a219835349cc97a\",\"ipArduino\":\"111.222.33.44\", \"tipoMedida1\":\"Distância\",\"unidadeMedida1\":\"Cm\", \"modeloSensor\":\"HC-SR04\",\"valor1\": %f}", cmMsec );

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

  
