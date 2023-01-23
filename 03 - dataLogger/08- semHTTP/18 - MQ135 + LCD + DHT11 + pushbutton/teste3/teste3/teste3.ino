#define MQ_analog 36
#define MQ_dig 26

int valor_analog;
int valor_dig;

void setup() {
   Serial.begin(115200);
   pinMode(MQ_analog, INPUT);
   pinMode(MQ_dig, INPUT);
}
void loop() {
   valor_analog = analogRead(MQ_analog); 
   valor_dig = digitalRead(MQ_dig);
   Serial.print(valor_analog);
   Serial.print(" || ");
   if(valor_dig == 0)
     Serial.println("GAS DETECTADO !!!");
   else 
     Serial.println("GAS AUSENTE !!!");
   delay(500);
}
