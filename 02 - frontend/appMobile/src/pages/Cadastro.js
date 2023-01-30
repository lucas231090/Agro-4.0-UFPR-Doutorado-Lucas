import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    ImageBackground
} from 'react-native';

import * as Yup from 'yup'

import getValidationErrors from '../utils/getValidationErrors' 
import api from '../services/api'

import {Form} from '@unform/mobile'

import Input from '../components/forms/Input'

import { SimpleLineIcons } from '@expo/vector-icons';


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

function Cadastro({ navigation }) {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }))

    const formRef = useRef(null)

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const handleSignUp = useCallback(
        async (data) => {
          try {
            formRef.current?.setErrors({});
    
            const schema = Yup.object().shape({
              name: Yup.string().required('Nome obrigatório'),
              email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
              password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
    
            await schema.validate(data, {
              abortEarly: false,
            });
    
          await api.post('/users', data);
    
            Alert.alert(
              'Cadastro realizado com sucesso!',
              'Você já pode fazer login na aplicação.',
            );
    
            navigation.navigate('Login');
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
    
              formRef.current?.setErrors(errors);
    
              return;
            }
    
            Alert.alert(
              'Erro no cadastro',
              'Ocorreu um erro ao fazer cadastro, tente novamente.', );
          }
        },
        [navigation],
      );

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
                toValue: 120,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 145,
                duration: 100,
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



    return (
        <>
         <ImageBackground
            source={require('../img/vaquinhas.png')}
            style={{ width: '100%', height: '100%' }}
        >
        <DismissKeyboard>
            
            <KeyboardAvoidingView
                style={styles.background}
                behavior="padding">
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

                <View style={{alignItems:'center'}}>
                <Text style={{fontSize:30, color: '#000', fontWeight:'bold'}}>Crie sua conta</Text>
                <Text style={{fontSize:12, color: '#000', marginBottom:5}}> * Todos os campos são obrigatórios</Text>
                </View>

                <Form ref={formRef} onSubmit={handleSignUp}>

                    <Input
                        placeholder="Nome de Usuário"
                        autoCorrect={false}
                        name="name"
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailInputRef.current?.focus()
                        }}
                    />

                    <Input
                        ref={emailInputRef}
                        placeholder="E-mail"
                        autoCorrect={false}
                        keyboardType="email-address"
                        name="email"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordInputRef.current?.focus()
                        }}
                    />

                    <Input
                        ref={passwordInputRef}
                        placeholder="Senha"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="newPassword"
                        name="password"
                        returnKeyType="send"
                        onSubmitEditing={()=> formRef.current?.submitForm()}
                    />

                    <TouchableOpacity onPress={() => formRef.current?.submitForm()} style={styles.btnSubmit}>
                        <Text style={styles.submitText}>
                            Cadastrar
                    </Text>
                    </TouchableOpacity>

                    </Form>

                  <TouchableOpacity onPress={() => {
                        navigation.navigate('Login')
                    }}
                    >                    
                    <View style={{marginTop:10, alignItems:'center'}}>
                    
                         
                 <Text style={{color:'#000', fontWeight:'bold'}}>
                            Já tem uma conta? Faça login
                </Text>
                            <SimpleLineIcons name="logout" size={24} color="#000" />
                            
                    </View>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
            
        </DismissKeyboard>
        </ImageBackground>
        </>
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
        paddingBottom: 30
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
    registerText: {
        color: '#FFF'
    },
    aviso: {
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        marginTop:15

    },
})



export default Cadastro;