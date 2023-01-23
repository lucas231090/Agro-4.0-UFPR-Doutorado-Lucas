#include <Keypad.h>
#include <LiquidCrystal_I2C.h>

#define ROW_NUM     4 // four rows
#define COLUMN_NUM  4 // four columns

//potenciometro
const byte potPin = 36;
int potValue;

//------------------------------

int lcdColumns = 16;
int lcdRows = 2;
int h = 26;

byte grau[8]={
B01110,
B01010,
B01110,
B00000,
B00000,
B00000,
B00000,
B00000
};

LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

//(0,0) (coluna, linha) do display lcd


char keys[ROW_NUM][COLUMN_NUM] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

//PARA ESP32
byte pin_rows[ROW_NUM]      = {23, 22, 3, 21}; // D23, D22, RX0, D21,         //OBS: PULA O TX0
byte pin_column[COLUMN_NUM] = {19, 18, 5, 17};   // D19, D18, D5, TX2

Keypad keypad = Keypad( makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM );

void setup() {
  
    lcd.init();                     
    lcd.backlight();
    lcd.createChar(1, grau);

    lcd.setCursor(0, 0);
    lcd.print("GRANJA UFPR");
    lcd.setCursor(0, 1);
    lcd.print("Bem vindo!");
}

void loop() {  

  char key = keypad.getKey();

  if(key == 'A'){
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("FARM UFPR 4.0!!!");
    lcd.setCursor(0, 1);
    lcd.print("SISTEMA ON-LINE!");
    }
  
  if(key == '1'){
    lcd.clear();
    lcd.setCursor(3, 0);
    lcd.print("Umidade (%)");
    lcd.setCursor(8, 1);
    lcd.print(91);
    
    }

    if(key == '2'){
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temperatura(");
    lcd.write(1); //colocar simbolo grau
    lcd.print("C):"); 
    
    lcd.setCursor(1, 1);
    lcd.print(h);

      if( h > 25 && h<33 ){
      lcd.setCursor(10, 1);
      lcd.print("MANTER");
      }

      if( h < 25 ){
      lcd.setCursor(9, 1);
      lcd.print("AQUECER");
      }

      if( h > 33 ){
      lcd.setCursor(8, 1);
      lcd.print("VENTILAR");
      }      
    }
  //lcd.clear(); 
}
