//  Sketch: Multiple states of the button
//
//  An  example of using a single button switch to set multiple states or conditions
//
//  state holds the current status.
//  0 = all off.
//  1 = green LED
//  2 = yellow LED
//  3 = red LED
// Define the pins being used
int pin_LEDgreen = D2;
int pin_LEDyellow = D1;
int pin_LEDred = D3;
int pin_switch = D4;
// variables to hold the new and old switch states
boolean oldSwitchState = LOW;
boolean newSwitchState = LOW;
byte state = 0;
void setup()
{
 // Serial.begin(115200);
  pinMode(pin_LEDgreen, OUTPUT);    
  digitalWrite(pin_LEDgreen, LOW);
  
  pinMode(pin_LEDyellow, OUTPUT);
  digitalWrite(pin_LEDyellow, LOW);
 
  pinMode(pin_LEDred, OUTPUT);
  digitalWrite(pin_LEDred, LOW);
  
  pinMode(pin_switch, INPUT);
}
void loop()
{
  newSwitchState = digitalRead(pin_switch);
  if ( newSwitchState != oldSwitchState )
  {
    // has the button switch been closed?
    if ( newSwitchState == HIGH ){
      // increase the value of state
      state++;
      if (state > 3) {
        state = 0;
      }
      // turn all LEDs off. Doing it this way means we do not need to care about the individual LEDs
      // simply turn them all off and then turn on the correct one.
      digitalWrite(pin_LEDgreen, LOW);
      digitalWrite(pin_LEDyellow, LOW);
      digitalWrite(pin_LEDred, LOW);
      // Turn on the next LED
      // Because the value of state does not change while we are testing it we don't need to use else if
      if (state == 1) {
        digitalWrite(pin_LEDgreen, HIGH);
      }
      if (state == 2) {
        digitalWrite(pin_LEDyellow, HIGH);
      }
      if (state == 3) {
        digitalWrite(pin_LEDred, HIGH);
      }
    }
    oldSwitchState = newSwitchState;
  }
}
