import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, Ionicons, Entypo, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'


import Indicadores from "../Indicadores/Indicadores";
import Sensores from "../MinhaFazenda/Sensores/Sensores";
import Cultivos from "../MinhaFazenda/Cultivos/Cultivos";
import Atuadores from "../MinhaFazenda/Atuadores/Atuadores"
import DadosCadastrais from '../MinhaFazenda/DadosCadastrais/DadosCadastrais'
import { View } from "native-base";


const Tab = createBottomTabNavigator();

const icons = {
    Indicadores: {
        lib: SimpleLineIcons,
        name: 'speedometer'
    },
    Cultivos: {
        lib: MaterialCommunityIcons,
        name: 'corn'
    },
    Sensores: {
        lib: Ionicons,
        name: 'ios-wifi'
    },
    Ajustes: {
        lib: AntDesign,
        name: 'setting'
    },
    Atuadores: {
        lib: MaterialCommunityIcons,
        name: 'tractor'
    },
}

function IoT() {
  return (
    <>

        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) =>{
                const { lib: Icon, name } = icons[route.name]
                return <Icon name={name} size={size} color={color} />
            },
        })}
        tabBarOptions={{
            style:{
                backgroundColor: "#fff",
                borderTopColor: '#fff',
                borderTopColor:'#000',
            },
            activeTintColor: '#2ecc71',
            inactiveTintColor: '#808080'
        }}
        >
          <Tab.Screen
           name="Indicadores"
           component={Indicadores}
           />
          <Tab.Screen
          name="Cultivos"
          component={Cultivos}
          options={{
              title: 'Cultivares'
          }}
          />
          <Tab.Screen
          name="Sensores"
          component={Sensores}
          />
          <Tab.Screen
          name="Atuadores"
          component={Atuadores}
          options={{
              title: 'Atuadores'
          }}
          />
          <Tab.Screen
          name="Ajustes"
          component={DadosCadastrais}
          options={{
              title: 'Ajustes'
          }}
          />
          
        </Tab.Navigator>
     
    </>
  );
}

export default IoT;
