import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    ImageBackground,
    Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import * as Yup from 'yup'

import {Form} from '@unform/mobile'
import Input from '../components/forms/Input'
import getValidationErrors from '../utils/getValidationErrors';
import {useAuth} from '../hooks/auth'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

function Login({ navigation }) {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({x: 130, y: 155 }))

    const { signIn, user } = useAuth()   

    console.log(user)

    const handleSignIn = useCallback(
        async (data) =>{
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
                    password: Yup.string().required('Senha obrigatória'),
                })
                await schema.validate(data, {
                    abortEarly: false,
                })

                await signIn({
                    email: data.email,
                    password: data.password
                })

        //  history.push('/dashboard')
            }catch(err){
                if (err instanceof Yup.ValidationError){
                    const errors = getValidationErrors(err)

                    console.log(errors)

                    formRef.current?.setErrors(errors)

                    return
                }

                Alert.alert('Erro na autenticação',
                'Ocorreu um erro no login, verifique suas credenciais ou entre em contato com o administrador', )
               
            }
        },[signIn])
//prestar atenção no array pq pode ser Login ao invés de signIn


    const formRef = useRef(null)
    const passwordInputRef = useRef(null)


    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
            })
        ]).start()

    }, [])

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 150,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 125,
                duration: 125,
            }),
        ]).start()

    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 200,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 175,
                duration: 100,
            }),
        ]).start()
    }

    //https://c4.wallpaperflare.com/wallpaper/592/531/798/hills-trees-nature-landscape-wallpaper-preview.jpg

    return (
        <ImageBackground
            source={require('../img/vaquinhas.png')}
            style={{ width: '100%', height: '100%' }}
        >

            <DismissKeyboard>
                <KeyboardAvoidingView
                    style={styles.background}
                    behavior="padding">
                    <View style={styles.containerLogo}>
                        <Animated.Image
                            style={{
                                width: logo.x,
                                height: logo.y,
                            }}

                            // source={{ uri: 'https://lh3.googleusercontent.com/proxy/7WXiuuQ5Qf1WASqA7Htxy17vccKrA08FEjcCTRIbNV9t8D2wkEvLMuWQoWl4x6SnJfsP70oOqa5fd6W6UvfkIZRrqZypK2CrG5UGNxaFriXo-A3CVfmjicOV1LP4scfUyaJ9_IMYI34C3nM1gHVuhOJ3NkrSwP-T5ggqzBnVdKNG0kNP22rw4oej' }}

                            //source={{ uri: 'https://cdn0.iconfinder.com/data/icons/smart-farm-flat-agriculture-technology/512/Farmer-512.png' }}

                            source={require('../img/ufpr.png')}
                        />
                    </View>

                    <Animated.View
                        style={[
                            styles.container,
                            {
                                opacity: opacity,
                                transform: [
                                    {
                                        translateY: offset.y
                                    }
                                ]
                            }
                        ]}
                    >
                        <Form ref={formRef} onSubmit={handleSignIn}>
                        
                        <Input
                            name="email"
                            placeholder="E-mail"
                            autoCorrect={false}                            
                            keyboardType="email-address"
                            autoCapitalize="none"
                            returnKeyType="next"
                            onSubmitEditing={() =>{
                                passwordInputRef.current?.focus()
                            }}
                        />

                        <Input
                            ref={passwordInputRef}
                            name="password"
                            placeholder="Senha"
                            secureTextEntry
                            returnKeyType="send"
                            onSubmitEditing={()=>{
                                formRef.current?.submitForm()
                            }}
                        />

                        <TouchableOpacity onPress={() => {
                            formRef.current?.submitForm()
                        }}
                            style={styles.btnSubmit}>
                            <Text style={styles.submitText}>
                                Acessar
                    </Text>
                        </TouchableOpacity>

                        </Form>


                    </Animated.View>

                    <View>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, textAlign: 'center', alignSelf: 'center', width: '75%', marginBottom:10 }}>
                            Não tem uma conta?
                            </Text>


                        <TouchableOpacity onPress={() => {
                                navigation.navigate('Cadastro')
                            }}
                            style={styles.btnCadastro}>
                                
                    <AntDesign style={{alignSelf:'flex-end'}} name="adduser" size={30} color="#fff" />
                            <Text 
                                style={styles.registerText}>
                                Faça seu cadastro
                    </Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </DismissKeyboard>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 90,
    },
   
    btnSubmit: {
        backgroundColor: '#000',
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        
        alignSelf:'center'
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnCadastro: {
        height: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 25,
        flexDirection:'row',
    

    },

    registerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop:10
    }

})


export default Login;

//#35AAFF