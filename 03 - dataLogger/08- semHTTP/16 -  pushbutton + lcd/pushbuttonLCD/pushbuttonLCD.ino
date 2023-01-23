#include <LiquidCrystal_I2C.h>

//display lcd
int lcdColumns = 16;
int lcdRows = 2;

//(0,0) (coluna, linha) do display lcd
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

//para esp8266 D1 - SCL e D2 - SDA
//para esp32 D21 - SDA e D22 - SCL
//const int  pushbutton   = D3; //- ESP8266

const int  pushbutton   = 3; //RX0

// variaveis de estado do botão push
boolean oldSwitchState = LOW;
boolean newSwitchState = LOW;
byte state = 0;

//regra de negócio teste
int h = 26;
int u = 80;

//Fazer o caractere especial(º)
byte grau[8]={B01110,B01010,B01110,B00000,B00000,B00000,B00000,B00000};

void setup() {

   // Serial.begin(115200);
    lcd.init();                     
    lcd.backlight();
    lcd.createChar(1, grau);   

    pinMode(pushbutton, INPUT);   
}

void loop() { 

  newSwitchState = digitalRead(pushbutton);
  if ( newSwitchState != oldSwitchState )
  {
    // has the button switch been closed?
    if ( newSwitchState == HIGH ){
      // increase the value of state
      state++;
     //numero de telas para aparecer no display lcd (3 telas?)
        if (state > 4) {
        state = 0;
      }

      if (state == 0) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("SISTEMA");
      lcd.setCursor(0, 1);
      lcd.print("EM FUNCIONAMENTO"); 
      }

      if (state == 1) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("GRANJA UFPR");
      lcd.setCursor(0, 1);
      lcd.print("Bem vindo!"); 
      }
      
      if (state == 2) {
      lcd.clear();
      lcd.setCursor(3, 0);
      lcd.print("Umidade (%)");
      lcd.setCursor(8, 1);
      lcd.print(91);
      }
      
      if (state == 3) {
      lcd.clear();
      lcd.setCursor(3, 0);
      lcd.print("Temperatura");
      lcd.setCursor(8, 1);
      lcd.print(17);
      }
      
      if (state == 4) {
      lcd.clear();
      lcd.setCursor(3, 0);
      lcd.print("Neymar");
      lcd.setCursor(8, 1);
      lcd.print(13);
      }
    }
    oldSwitchState = newSwitchState;
  }
}
