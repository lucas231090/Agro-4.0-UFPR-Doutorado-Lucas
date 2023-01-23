//npm start

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { MaterialIcons } from '@expo/vector-icons'

import axios from "axios"


export default function App() {

  const [isEnable, setIsEnable] = useState(false)
    
  const alternarSwitch = () => {
    setIsEnable(previousState => !previousState)    
  }
  

  const [isEnable2, setIsEnable2] = useState(false)
    
  const alternarSwitch2 = () => {
    setIsEnable2(previousState => !previousState)    
  }


  //lembrar de colocar no axios.get o endereço de IP do SEU microcontrolado(ESP8266/32 etc)


const alternaLed = () => {

    if (isEnable == false) { 
    axios.get('http://192.168.25.16/on').then(response => {
      console.log('led ligada com sucesso!!!')
    })
  }
    
  else{
    axios.get('http://192.168.25.16/off').then(response => {
      console.log('led apagada')
  })
}}

const alternaLed2 = () => {

  if (isEnable2 == false) { 
  axios.get('http://192.168.25.16/onVerde').then(response => {
    console.log('led ligada com sucesso!!!')
  })

}
  
else{
  axios.get('http://192.168.25.16/offVerde').then(response => {
    console.log('led apagada')
})

}}

const [dhtTemperatura, setDhtTemperatura] = useState("--")

const temperatura = () => {
  axios.get('http://192.168.25.16/dht11/temperatura').then( response => {
    setDhtTemperatura( dhtTemperatura => response.data)
    console.log(dhtTemperatura)
  })
}

const [dhtUmidade, setDhtUmidade] = useState('--')

const umidade = () => {
    axios.get('http://192.168.25.16/dht11/umidade').then( response => {
      setDhtUmidade( dhtUmidade => response.data)
    console.log(dhtUmidade)
  })
}


  return (
    
    <>
        <StatusBar />

        <ScrollView> 
        
         <View style={styles.container}>
   
          <Text style={styles.titulo}>Led Vermelho</Text>          
          
          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>          
                <Text style={ isEnable ? styles.ON : styles.OFF}> {isEnable ? 'LIGADO'  : 'DESLIGADO'}</Text>        
          <Switch
          onValueChange={alternarSwitch}
          value={isEnable}
          onChange={alternaLed}
          />
                
          </View>

          <Text style={styles.titulo}>Led Verde</Text>          
          
          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>          
                <Text style={ isEnable2 ? styles.ON : styles.OFF}> {isEnable2 ? 'LIGADO'  : 'DESLIGADO'}</Text>        
          <Switch
          onValueChange={alternarSwitch2}
          value={isEnable2}
          onChange={alternaLed2}
          />        
          </View>
                        
          <Text style={styles.titulo}>Umidade</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>          
          <Text style={styles.detalhes}>Medida: <Text style={{fontSize:50, fontWeight:'bold', color: '#4b8b3b'}}> {dhtUmidade}</Text><Text style={{fontSize:35}}>%</Text></Text>
          <View style={{alignSelf:'center', backgroundColor:'#2ecc71', marginTop:25, borderRadius:4}}>
          <TouchableOpacity onPress={() => setDhtUmidade(umidade)}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <MaterialIcons name="sync" size={45} color="#fff" />
          
          </View>
          </TouchableOpacity>
          </View>
          </View>
          
    

                            
          <Text style={styles.titulo}>Temperatura</Text>
   
          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>          
          <Text style={styles.detalhes}>Medida: <Text style={{fontSize:50, fontWeight:'bold', color: '#ff4e50'}}> {dhtTemperatura}</Text><Text style={{fontSize:35}}>ºC</Text></Text>
          <View style={{alignSelf:'center', backgroundColor:'#2ecc71', marginTop:25, borderRadius:4}}>
          <TouchableOpacity onPress={() => setDhtTemperatura(temperatura)}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <MaterialIcons name="sync" size={45} color="#fff" />
         
          </View>
          </TouchableOpacity>
          </View>
          </View>
          </View>

          </ScrollView>

          <Text>
            Aplicação versão alfa 0.1 - Desenvolvida por Lucas J. Souza. Entre no nosso grupo do Telegram: https://t.me/joinchat/Ul158A0mhTY6xssU
          </Text>


        

    </>

  );
}

const styles = StyleSheet.create({

  container:{
      marginTop:50
  },


titulo: {
  fontWeight: "bold",
  fontSize: 25,
  marginTop:15,
  marginLeft:25,
},

ON: {
  fontSize:20,
  textAlign:"justify",
  marginTop:15,
  color: '#2ecc71',
  fontWeight:'bold'

},

OFF: {
  fontSize:20,
  textAlign:"justify",
  marginTop:15,
  color: '#ff4040',
  fontWeight:'bold'
},

controle:{
  marginLeft: 25,
},

detalhes: {
  fontSize:15,
  textAlign:"justify",
  marginTop:25,
  color: '#696969'
},


});