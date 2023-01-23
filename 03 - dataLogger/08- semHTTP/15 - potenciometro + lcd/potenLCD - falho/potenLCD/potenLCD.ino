#include <LiquidCrystal_I2C.h>

//potenciometro
float leitura;

//display lcd
int lcdColumns = 16;
int lcdRows = 2;

//regra de negócio teste
int h = 26;
int u = 80;

//Fazer o º (caractere especial)
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

//(0,0) (coluna, linha) do display lcd
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

void setup() {

    Serial.begin(115200);
    lcd.init();                     
    lcd.backlight();
    lcd.createChar(1, grau);

    lcd.setCursor(0, 0);
    lcd.print("GRANJA UFPR");
    lcd.setCursor(0, 1);
    lcd.print("Bem vindo!"); 
    
}

void loop() { 

  //Serial.print(analogRead(A0));
  leitura = (analogRead(A0)*3.3/1023);
  Serial.println(leitura);

   if(leitura <= 0.60){
    screen1();
    }else if(leitura > 1.50){
    screen2();      
    }else if(leitura > 2.50){
    screen2();      
    }
 // lcd.clear(); 

}

void screen1 (){
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("FARM UFPR 4.0!!!");
    lcd.setCursor(0, 1);
    lcd.print("SISTEMA ON-LINE!");
  }

  void screen2 (){
    lcd.clear();
    lcd.setCursor(3, 0);
    lcd.print("Umidade (%)");
    lcd.setCursor(8, 1);
    lcd.print(u); 
  }

  void screen3 (){
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

 
