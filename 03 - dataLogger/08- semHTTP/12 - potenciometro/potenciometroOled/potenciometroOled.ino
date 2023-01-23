#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
//#include <Adafruit_Sensor.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)

#define OLED_RESET     -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// definição pino conexão led e push button
const byte ledPin = 0; //D3
const byte butPin = 12; //D6
// definição do potenciômetro
const byte potPin = A0;

// variável para alterar tipo de botão
boolean typeButton = 1; // 1 = analógico e 0 = digital

// leitura do potenciômentro
int potValue;

// ================ variáveis para o analog clock ================================
// variáveis para o relógio tipo analógico
const float pi = 3.14159267;
const int clock_center_x=64;
const int clock_center_y=32;
int o=1;

// variáveis para o cálculo das coordenadas dos pontos no círculo
int x;
int y;
int x1;
int yA1;

// variáveis para armazenar valores lidos potenciômetro
int minutes;

// variáveis para pegar valor posição ponteiro
int minuto;

 void setup() 
{ 
  Serial.begin(115200);
     // define pino led como saída do Arduino
  pinMode(ledPin, OUTPUT);
  // define pino push button como entrada do Arduino
  pinMode(butPin, INPUT_PULLUP); // pull up interno  

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C); // inicializa a comunicação I2C do OLED end 0X3C

  // Clear the buffer e inicializa o relógio analógico
  display.clearDisplay();
  draw_clock_face();   
  display.display();
}

void loop() {
  potValue = analogRead(potPin); // lê potenciômetro
  dimmerLed(); // gera brilho no led
  Serial.println(minuto);
  Serial.println(potValue);
  setTypeButton(); // define o tipo do botão
  if(typeButton == true) {
    draw_clock_face();   
    analogButton();
 } else digitalButton();
}

// ======================= funcionalidades =================================

// altera tipo do relógio
void setTypeButton() {
  if (!digitalRead(butPin)) {
    typeButton = !typeButton;
    while(!digitalRead(butPin)) {}    
    delay(50);
  }
  
}

// define brilho do led (PWM)
void dimmerLed() {
  analogWrite(ledPin, map(potValue,0,1023,0,255)); //converte valores proporcionalmente
}

// ============================== analogicButton ==============================

// analogClock
void analogButton() {
    // get posição do botão  
    minuto = map(potValue,0,1023,0,55); // converte os valores de 0 a 55
    // exibe no oled chamando as funções
    draw_minute(minutes,0);
    draw_minute(minuto,1);
    display.display();

    // atribui valores às variáveis 
    minutes = minuto;
    redraw_clock_face_elements();
}  

// exibe ponteiro do botão
void draw_minute(int minute, int mode) {
   y= (24*cos(pi-(2*pi)/60*minute))+clock_center_y;
   x =(24*sin(pi-(2*pi)/60*minute))+clock_center_x;
   if (mode==1)display.drawLine(clock_center_x,clock_center_y,x,y,WHITE); 
   else display.drawLine(clock_center_x,clock_center_y,x,y,BLACK);
}

// desenha a face do botão 
void draw_clock_face(void) {
  // desenha o centro do relógio
  display.drawCircle(clock_center_x, clock_center_y,3, WHITE);
  display.fillCircle(clock_center_x, clock_center_y,3, WHITE);

  // desenha as marcações do botão
  for (int i=0;i<12;i++){
     y= (32*cos(pi-(2*pi)/12*i))+clock_center_y;
     x =(32*sin(pi-(2*pi)/12*i))+clock_center_x;
     yA1= (28*cos(pi-(2*pi)/12*i))+clock_center_y;
     x1 =(28*sin(pi-(2*pi)/12*i))+clock_center_x;
     display.drawLine(x1,yA1,x,y,WHITE);
  }
  // imprime 0 no topo da face do botão
  display.drawCircle(26*sin(pi)+clock_center_x, (26*cos(pi))+clock_center_y, 6, BLACK);
  display.fillCircle(26*sin(pi)+clock_center_x, (26*cos(pi))+clock_center_y, 5, BLACK);
  display.setTextSize(1);             // Normal 1:1 pixel scale
  display.setTextColor(WHITE);        // Draw white text
  display.setCursor(clock_center_x-3,0);             // Start at top-left corner
  display.print("0");
}

// redesenha os elementos
void redraw_clock_face_elements(void) {
    display.drawCircle(clock_center_x, clock_center_y,3, WHITE);
    display.fillCircle(clock_center_x, clock_center_y,3, WHITE);
    display.setCursor(clock_center_x-3,0);             
    display.print("0");
}

// =============================== digalButton ================================
 void digitalButton() {

  // calcula a largura do botão
  byte widthButton = map(potValue,0,1023,0,128);
  
  // Desenha botão digital
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.fillRect(0, 0, widthButton, 13, WHITE);

  // Desenha borda do relógio (com cantos arredondados)
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.drawRoundRect(0, 16, 128, 45, 8, WHITE);

  // Imprime o nome do relógio
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(33, 25);
  display.print("Brilho do Led");

  // Imprime valor lido no potenciômetro
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(50, 40);
  //display.print(map(potValue,0,1023,0,255));
  display.print(potValue);

  // exibe no display
  display.display();
  
  // limpa o display
  display.clearDisplay();
 }
