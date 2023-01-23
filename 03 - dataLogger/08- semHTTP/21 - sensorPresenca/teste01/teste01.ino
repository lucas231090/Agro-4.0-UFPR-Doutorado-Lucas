//definição do pino de saída do sensor PIR 
#define PIN_SENSOR D4

void setup() {
  //abaixo vamos confirar cada um dos pinos como entrada ou saída de dados
  Serial.begin(9600);
  pinMode(PIN_SENSOR, INPUT);
}

void loop() { 

  //faz a leitura do sensor de presença (retorna HIGH ou LOW)
  int sinal = digitalRead(PIN_SENSOR); 

  //HIGH : movimento detectado
  if(sinal == HIGH){
    Serial.println("tem gente aqui");
    Serial.println(sinal);
  }
  else{  
    Serial.println("ninguém");
    Serial.println(sinal);
  }

  delay(1000);

}
