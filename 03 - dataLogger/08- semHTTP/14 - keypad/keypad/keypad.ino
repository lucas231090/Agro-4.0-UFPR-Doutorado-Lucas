#include "Keypad.h"

const byte linhas = 4;
const byte colunas = 4;

char Teclas [linhas][colunas] = 
{
   {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
  };

   byte pinosLinhas[linhas] = {D0,D1,D2,D3}; 
   byte pinosColunas[colunas] = {D4,D5,D6,D7};;

    Keypad teclado = Keypad(makeKeymap(Teclas),pinosLinhas, pinosColunas, linhas,colunas);

void setup() {
  Serial.begin(9600);
}

void loop() {
   char teclaClicada = teclado.getKey();

   if(teclaClicada)
   {
    Serial.println(teclaClicada);
    }

    if(teclaClicada == '7')
    {
    Serial.println("oi oi oi");
      }
}
