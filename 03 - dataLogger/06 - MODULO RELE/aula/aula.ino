#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

const char* ssid= "FIBRA-A066";
const char* password= "0Z48058288";

ESP8266WebServer server(80);

//Porta ligada ao pino IN1 do modulo
int porta_rele1 = D2;
//Porta ligada ao pino IN2 do modulo
int porta_rele2 = D3;

void setup() {

  Serial.begin(115200);

  pinMode(porta_rele1, OUTPUT); 
  pinMode(porta_rele2, OUTPUT);
  
  WiFi.begin(ssid, password);

  while(WiFi.status()!= WL_CONNECTED){
    delay(500);
    Serial.print(".");
    }
    Serial.println("");
    Serial.print("NodeMCU conectado no IP: ");
    Serial.println (WiFi.localIP());
    Serial.print("Conexão efetuada com sucesso!!!");

    server.begin();
    Serial.println("Webserver inicializado");
    delay(500);
    Serial.println("Acesse o endereço pelo: ");
    Serial.println (WiFi.localIP());

    server.on("/", [](){
      server.send(200, "cabeçalho da requisição", "BEM VINDO AO SERVIDOR DO NODEmcu" );
    });

    server.on("/onrele1", [] (){
      server.send(200, "cabeçalho", "Rele 1 ON");
      digitalWrite(porta_rele1, LOW); //Desliga rele 1
      delay(1000);      
      });

    server.on("/offrele1", [] (){
      server.send(200, "cabeçalho", "Rele 1 OFF");
      digitalWrite(porta_rele1, HIGH);  //Liga rele 1
      delay(1000);      
      });

    server.on("/onrele2", [] (){
      server.send(200, "cabeçalho", "Rele 2 ON");
      digitalWrite(porta_rele2, LOW); //Desliga rele 2
      delay(1000);      
      });

    server.on("/offrele2", [] (){
      server.send(200, "cabeçalho", "Rele 2 OFF");
      digitalWrite(porta_rele2, HIGH);  //Liga rele 2
      delay(1000);      
      });
    }

    void loop() {
      server.handleClient(); 
    }
