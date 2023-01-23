// TESTANDO A FUNÇÃO MAP

#define potPin 0 
#include <Wire.h> // responsável pela comunicação com a interface i2c
#include <LiquidCrystal_I2C.h> // responsável pela comunicação com o display LCD
#include <LCD.h>

// variavel que vai receber o valor lido do potenciometro
int valPot = 0;

LiquidCrystal_I2C lcd(0x3F,2,1,0,4,5,6,7,3,NEGATIVE);

void setup() {
   Serial.begin(9600); // abre a porta serial a 9600 bps:
   Wire.begin();

   lcd.clear();

   //inicializa o display (16 colunas x 2 linhas)
   lcd.begin (16,2); // ou 20,4 se for o display 20x4
   Serial.println("\nI2C Scanner");
   lcd.setBacklightPin(3,NEGATIVE); // NEGATIVE É LETRA PRETA E FUNDO BRANCO
                                     // POSITIVE É LETRA PRETA E FUNDO ESCURO
    // define o backlight com desligado
    lcd.setBacklight(LOW);

    lcd.home();
    lcd.setCursor(2,0);
    lcd.print("ARDUINO MAKER");
    delay(1000); //intervalo de 1s
    lcd.setCursor(3,1);
    //lcd.setBacklight(LOW);
    lcd.print("FUNCAO MAP");
    delay(4000); //intervalo de 5s
  }

void loop() {
    
valPot = analogRead(potPin); 

Serial.print("Valor lido no potenciometro: ");
Serial.print(valPot);
Serial.println("\t");

    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("POTENCIOMET.");
    lcd.setCursor(12,0);
    lcd.print(valPot);
    lcd.setCursor(0,1);
    //lcd.setBacklight(LOW);
    lcd.print("FUNCAO MAP");


    int valorMapeado =map(valPot,0,1023,0,100); 
    Serial.print("Valor Mapeado: ");
    Serial.print(valorMapeado);
    Serial.println("\t");
    lcd.setCursor(0,1);
    lcd.setBacklight(LOW);
    lcd.print("FUNCAO MAP");
    lcd.setCursor(12,1);
    lcd.print(valorMapeado);
    delay(500); //intervalo de 0.5s
    
}
 
