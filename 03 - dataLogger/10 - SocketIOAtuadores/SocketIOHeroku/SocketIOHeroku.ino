#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <WiFi.h>


SocketIOclient socketIO;

const char* ssid = "FIBRA-A066";
const char* password =  "0Z48058288";

const char* host = "apiagro-backend.herokuapp.com";
const int port = 80; // Porta de conexão do servidor

//const char* server_host = "https://apiagro-backend.herokuapp.com/"; // IP do servidor websocket
//const char* server_host = "https://apiagro-backend.herokuapp.com/"; // IP do servidor websocket
//const int server_port = 80; // Porta de conexão do servidor

// Led
const int led = 23;

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
       
        case sIOtype_EVENT:
        {
            char * sptr = NULL;
            int id = strtol((char *)payload, &sptr, 10);
            Serial.printf("[IOc] get event: %s id: %d\n", payload, id);
            if(id) {
                payload = (uint8_t *)sptr;
            }
               
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            if(error) {
                Serial.print(F("deserializeJson() failed: "));
                Serial.println(error.c_str());
                return;
            }

            String eventName = doc[0];
            Serial.printf("[IOc] event name: %s\n", eventName.c_str());
            String retorno = eventName.c_str();
            Serial.printf("\n");
            Serial.printf("Retorno da função event: %s", retorno);
            Serial.printf("\n");

            Serial.printf(retorno == "on" ? "Funcionou" : "Não Funcionou");

                if (retorno == "on" || retorno == "ON" || retorno ==  "On")digitalWrite(23,HIGH);

                if (retorno == "off" || retorno == "OFF" || retorno == "Off")digitalWrite(23,LOW);

          
            // Message Includes a ID for a ACK (callback)
            if(id) {
                // creat JSON message for Socket.IO (ack)
                DynamicJsonDocument docOut(1024);
                JsonArray array = docOut.to<JsonArray>();

                // add payload (parameters) for the ack (callback function)
                JsonObject param1 = array.createNestedObject();
                param1["now"] = millis();

                // JSON to String (serializion)
                String output;
                output += id;
                serializeJson(docOut, output);

                // Send event
                socketIO.send(sIOtype_ACK, output);
            }
        }
            break;
        case sIOtype_ACK:
            Serial.printf("[IOc] get ack: %u\n", length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[IOc] get error: %u\n", length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[IOc] get binary: %u\n", length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[IOc] get binary ack: %u\n", length);
            break;
    }
}
void setup() {
    
    //Serial.begin(921600);
    Serial.begin(115200);

    pinMode(led, OUTPUT);
    
    WiFi.begin(ssid, password);

    Serial.println("Conectando ao WiFi, aguarde");
    while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("...");
    
  }
    Serial.println(".");
    Serial.println("Conexão efetuada com sucesso");
    
    // conectando ao servidor WebSockets com socketIO
    socketIO.begin(host, port, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);

}

unsigned long messageTimestamp = 0;
void loop() {
    socketIO.loop();

    uint64_t now = millis();

    if(now - messageTimestamp > 100000) {
        messageTimestamp = now;

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();

        // add event name
        // Hint: socket.on('event_name', ....
        array.add("event_name");

        // add payload (parameters) for the event
        JsonObject param1 = array.createNestedObject();
        param1["now"] = (uint32_t) now;

        // JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event
        socketIO.sendEVENT(output);

        // Print JSON for debugging
        Serial.println(output);
    }
}
