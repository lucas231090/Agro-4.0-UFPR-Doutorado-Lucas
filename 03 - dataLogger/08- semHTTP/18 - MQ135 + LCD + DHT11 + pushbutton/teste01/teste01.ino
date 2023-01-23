#include <LiquidCrystal_I2C.h>
#include <MQUnifiedsensor.h>
//#include <DHT.h>

//ESP8266*********
//D1 - SCK
//D2 - SDA
//MQ135 - A0

//#define dht_dpin 27 //D27
//#define DHTTYPE DHT22   // DHT 11

//DHT dht (dht_dpin, DHTTYPE); 

#define placa ("ESP-32") //"ESP8266"
#define Voltage_Resolution 5
#define pin 36 // VP   Analog input A0 for esp8266
#define type "MQ-135" //MQ135
#define ADC_Bit_Resolution 10 // For arduino UNO/MEGA/NANO
#define RatioMQ135CleanAir 3.6//RS / R0 = 3.6 ppm  
//#define calibration_button 13 //Pin to calibrate your sensor

//Declare Sensor
MQUnifiedsensor MQ135(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);

//display lcd
int lcdColumns = 16;
int lcdRows = 2;

//(0,0) (coluna, linha) do display lcd
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

//para esp8266 D1 - SCL e D2 - SDA
//para esp32 D21 - SDA e D22 - SCL
//const int  pushbutton   = D3; //- ESP8266

const int  pushbutton   = 3; //ESP32 - RX0

// variaveis de estado do botão push
boolean oldSwitchState = LOW;
boolean newSwitchState = LOW;
byte state = 0;


//Fazer o caractere especial(º)
byte grau[8]={B01110,B01010,B01110,B00000,B00000,B00000,B00000,B00000};

void setup() {

    //Serial.begin(115200);
    Serial.begin(115200);
    lcd.init();                     
    lcd.backlight();
    lcd.createChar(1, grau);   

    pinMode(pushbutton, INPUT);

   // dht.begin();

    MQ135.setRegressionMethod(1); //_PPM =  a*ratio^b

    MQ135.init(); 
    Serial.print("Calibrating please wait.");
    float calcR0 = 0;
    for(int i = 1; i<=10; i ++)
  {
    MQ135.update();
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
    Serial.print(".");
  }
  MQ135.setR0(calcR0/10);
  Serial.println("  done!.");

  if(isinf(calcR0)) {Serial.println("Warning: Conection issue founded, R0 is infite (Open circuit detected) please check your wiring and supply"); while(1);}
  if(calcR0 == 0){Serial.println("Warning: Conection issue founded, R0 is zero (Analog pin with short circuit to ground) please check your wiring and supply"); while(1);}
  
  Serial.println("** Lectures from MQ-135 ****");
  Serial.println("CO, Alcohol, CO2, Tolueno, NH4, Acteona"); 
     
}

void loop() { 

  //float Umid = dht.readHumidity();
  //float Temp = dht.readTemperature();

  MQ135.update(); // Update data, the arduino will be read the voltage on the analog pin

  MQ135.setA(605.18); MQ135.setB(-3.937); // Configurate the ecuation values to get CO concentration
  float CO = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup

  MQ135.setA(77.255); MQ135.setB(-3.18); // Configurate the ecuation values to get Alcohol concentration
  float Alcohol = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup

  MQ135.setA(110.47); MQ135.setB(-2.862); // Configurate the ecuation values to get CO2 concentration
  float CO2 = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup

  MQ135.setA(44.947); MQ135.setB(-3.445); // Configurate the ecuation values to get Tolueno concentration
  float Tolueno = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup

  MQ135.setA(102.2 ); MQ135.setB(-2.473); // Configurate the ecuation values to get NH4 concentration
  float NH4 = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup

  MQ135.setA(34.668); MQ135.setB(-3.369); // Configurate the ecuation values to get Acetona concentration
  float Acetona = MQ135.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup

// Note: 200 Offset for CO2 source: https://github.com/miguel5612/MQSensorsLib/issues/29
  Serial.print("CO;"); Serial.print(CO); Serial.println(";");
  Serial.print("Alcool;"); Serial.print(Alcohol); Serial.println(";");
  Serial.print("CO2;"); Serial.print(CO2 +400); Serial.println(";"); 
  Serial.print("Tolueno;"); Serial.print(Tolueno); Serial.println(";");
  Serial.print("NH4;"); Serial.print(NH4); Serial.println(";");
  Serial.print("Acetona;"); Serial.print(Acetona);Serial.println(";");
 // Serial.print("Temperatura;"); Serial.print(Temp);Serial.println(";");
  //Serial.print("Umidade;"); Serial.print(Umid);Serial.println(";");

  
  //Serial.println(";");
  delay(300);
    
  newSwitchState = digitalRead(pushbutton);
  if ( newSwitchState != oldSwitchState )
  {
    // has the button switch been closed?
    if ( newSwitchState == HIGH ){
      // increase the value of state
      state++;
     //numero de telas para aparecer no display lcd
        if (state > 5) {
        state = 0;
      }

      if (state == 0) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Monitoramento da");
      lcd.setCursor(0, 1);
      lcd.print("Qualidade do ar!"); 
      }

      if (state == 1) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("STATUS:");
      lcd.setCursor(0, 1);
      lcd.print("EM FUNCIONAMENTO"); 
      }
           
      if (state == 2) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("CO (ppm): ");
      lcd.setCursor(12, 0);
      lcd.print(CO);

      lcd.setCursor(0, 1);
      lcd.print("CO2 (ppm): ");
      lcd.setCursor(12, 1);
      lcd.print(CO2);     
      }
      
      if (state == 3) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Etanol(ppm):");
      lcd.setCursor(12, 0);
      lcd.print(Alcohol);

      lcd.setCursor(0, 1);
      lcd.print("Tolu(ppm): ");
      lcd.setCursor(12, 1);
      lcd.print(Tolueno); 
      }
      
      if (state == 4) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("NH4 (ppm): ");
      lcd.setCursor(12, 0);
      lcd.print(NH4);

      lcd.setCursor(0, 1);
      lcd.print("C3H6O(ppm):");
      lcd.setCursor(12, 1);
      lcd.print(Acetona);
      }

      if (state == 5) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Temp(");
      lcd.write(1); //colocar simbolo grau
      lcd.print("C): "); 
      lcd.setCursor(11, 0);
   //   lcd.print(Temp);

      lcd.setCursor(0, 1);
      lcd.print("Umid(%): ");
      lcd.setCursor(11, 1);
    //  lcd.print(Umid);
      }
      
    }
    oldSwitchState = newSwitchState;
  }
}
