// Código de Verificação para Nível de Água - SENSOR HORIZONTAL
// Exemplo de visualização no Monitor Serial

#define Sensor1 D0 //esp8266

int sensor1;

void setup() {

  Serial.begin(115200);

  pinMode(Sensor1, INPUT);

  Serial.println("Nivel do Reservatorio");
  Serial.println();
}

void loop() {
  
  sensor1 = digitalRead(Sensor1);

  if ((sensor1 == 1)) {
    Serial.println("Reservatorio Cheio");
  }

  else {
    Serial.println("Reservatorio Vazio");
  }
  
  //delay(1000);

  Serial.println(sensor1);
}
