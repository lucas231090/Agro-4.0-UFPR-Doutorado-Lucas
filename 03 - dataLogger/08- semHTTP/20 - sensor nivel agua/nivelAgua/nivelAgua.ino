//o sensor varia de 0 a 100 
//sendo 0 fora da agua e 100 até o limite
//em 90 o sensor vai estar pela metade, sendo uma curva logaritmica não sendo proporcional

int analogPin = A0; // Define o pino do sensor

int val = 0; // Cria uma variável para armazenar o valor
int perc;

void setup() {
Serial.begin(9600); // Inicia o Serial
}

void loop() {
val = analogRead(analogPin); // define a variável como o sensor

perc = map(val, 1, 540, 0, 100);

if(perc <= 4){
  Serial.println("VAZIO");
  }

if(perc >= 4 && perc <= 80 ){
  Serial.println("BAIXO");
  }

if(perc >= 50 && perc <= 100 ){
  Serial.println("MEDIO");
  }

if(perc > 100 ){
  Serial.println("CHEIO");
  }
   
  Serial.println(perc); //Imprime o valor armazenado

  delay (1000);
}
