#include <Keypad.h>
//#include <Wire.h>  //INCLUSÃO DE BIBLIOTECA
//#include <LiquidCrystal_I2C.h> //INCLUSÃO DE BIBLIOTECA

//LiquidCrystal_I2C lcd(0x27, 16, 2); //FUNÇÃO DO TIPO "LiquidCrystal_I2C" 0x3F
//SDA -> D2
//SCL -> D1

const byte ROWS = 4;
const byte COLS = 4;

char hexaKeys [ROWS][COLS] = 
{
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
  };

   byte rowPins[ROWS] = {23,22,3,21}; 
   byte colPins[COLS] = {19,18,5,17};

    Keypad customKeypad = Keypad(makeKeymap(hexaKeys),rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(9600);

 //lcd.init();   // INICIALIZA O DISPLAY LCD
 // lcd.backlight(); // HABILITA O BACKLIGHT (LUZ DE FUNDO) 
 // lcd.setCursor(0, 0); //SETA A POSIÇÃO EM QUE O CURSOR INCIALIZA(LINHA 1)
 // lcd.print("Testando"); //ESCREVE O TEXTO NA PRIMEIRA LINHA DO DISPLAY LCD
 // lcd.setCursor(0, 1); //SETA A POSIÇÃO EM QUE O CURSOR RECEBE O TEXTO A SER MOSTRADO(LINHA 2)      
 // lcd.print("Neymar aqui"); //ESCREVE O TEXTO NA SEGUNDA LINHA DO DISPLAY LCD

}

void loop() {
   char customKey = customKey.getKey();

   if(customKey)
   {
    Serial.println(customKey);
    }

    if(teclaClicada == '7')
    {
      Serial.println("oie");
      }
}
