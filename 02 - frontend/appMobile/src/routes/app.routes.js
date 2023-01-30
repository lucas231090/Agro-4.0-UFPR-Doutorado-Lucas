import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Index from '../pages/BoasVindas/Index/Index'
import Main from '../pages/BoasVindas/Main/Main'
import Profile from '../pages/BoasVindas/Profile/Profile'
import Indicadores from '../pages/BoasVindas/Indicadores/Indicadores'
import Sobre from '../pages/BoasVindas/Sobre/Sobre'
import Jhonny from '../pages/BoasVindas/IndicadoresNacionais/Jhonny'
import Cultivos from '../pages/BoasVindas/MinhaFazenda/Cultivos/Cultivos'
import DadosCadastrais from '../pages/BoasVindas/MinhaFazenda/DadosCadastrais/DadosCadastrais'
import Sensores from '../pages/BoasVindas/MinhaFazenda/Sensores/Sensores'
import Suporte from '../pages/BoasVindas/Suporte/Suporte/Suporte'
import Cameras from '../pages/BoasVindas/IA/Camera/Cameras'
import Pragas from '../pages/BoasVindas/IA/Pragas/Pragas'
import Detalhes from '../pages/BoasVindas/Suporte/Detalhes/Detalhes'
import IoT from '../pages/BoasVindas/IoT/IoT'
import Atuadores from '../pages/BoasVindas/MinhaFazenda/Atuadores/Atuadores'



const AppRoutes = createAppContainer(
    
    createStackNavigator({   
        
        Index: {
            screen: Index,
            navigationOptions: {
                title: 'FARM UFPR 4.0',
            },
        },

        Sobre: {
            screen: Sobre,
            navigationOptions: {
                title: 'SOBRE O PROJETO',
                headerTintColor: '#FFF',
               
            }
        },

        Main: {
            screen: Main,
            navigationOptions: {
                title: 'GEOLOCALIZAÇÃO DAS FAZENDAS',
            }
        },

        IoT:{
            screen: IoT,
            navigationOptions:{
                title: 'INDICADORES & IoT'
            }
        },

        Jhonny: {
            screen: Jhonny,
            navigationOptions: {
                title: 'INDICADORES NACIONAIS'
            }
        },

        Cameras: {
            screen: Cameras,
            navigationOptions: {
                title: 'MONITORAMENTO DAS CÂMERAS'
            }
        },

        Pragas: {
            screen: Pragas,
            navigationOptions: {
                title: 'RECONHECIMENTO DE IMAGEM'
            }
        },

        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'MINHA FAZENDA',
            }
        },

        Indicadores: {
            screen: Indicadores,
            navigationOptions: {
                title: 'INDICADORES IoT'
            }
        },

        Cultivos: {
            screen: Cultivos,
            navigationOptions: {
                title: 'CULTIVOS DAS FAZENDAS'
            }
        },

        DadosCadastrais: {
            screen: DadosCadastrais,
            navigationOptions: {
                title: 'DADOS DE CADASTRO'
            }
        },

        Suporte: {
            screen: Suporte,
            navigationOptions: {
                title: 'FALE CONOSCO'
            }
        },

        Detalhes:{
            screen: Detalhes,
            navigationOptions:{
                title: 'DETALHES'
            }
        },

        Sensores: {
            screen: Sensores,
            navigationOptions: {
                title: 'NOSSOS SENSORES'
            }
        },

        Atuadores:{
            screen: Atuadores,
            navigationOptions:{
                title: 'NOSSOS ATUADORES'
            }
        }
    },
    
        {
            defaultNavigationOptions: {
                headerBackTitleVisible: false,
                headerTintColor: '#FFF',
                headerStyle: {
                    backgroundColor: '#00ac4a'
                },
                
            },
        })

);

export default AppRoutes;

//#7D40E7
//#4169E1
//#20720d
//#3b8927
//#5f8f1c
//#b4e639
//#367c2b
//#009f00
//#63a91f
//#df0000
//#414d
//#00fc6c
//#00ac4a