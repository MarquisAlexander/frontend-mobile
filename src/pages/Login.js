import React, {useState, useEffect} from "react";
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

import api from '../services/api';
//logo no topo da página
import logo from "../assets/logo.png";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

// se o usuário já estiver logado, ele pula direto para a página "List"
    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if(user) {
                navigation.navigate("List");
            }
        })
    }, []);

//função executada quando o botão é clicado
    async function handleSubmit () {
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;
//armazenando o que  o usuário inserio nos campos input
        await AsyncStorage.setItem("user", _id);
        await AsyncStorage.setItem("techs", techs);

        navigation.navigate('List');
    }

//Formulario para realizar o login na aplicação
    return <KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding" style={styles.container}>
        <Image source={logo} />
        <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL*</Text>
            <TextInput 
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                />

            <Text style={styles.label}>Tecnologias*</Text>
            <TextInput 
                style={styles.input}
                placeholder="Tecnologias de interrese"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />

           <TouchableOpacity onPress={handleSubmit} style={styles.button}>
               <Text style={styles.buttonText}>Encontrar Eventos</Text>
            </TouchableOpacity> 
        </View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: "#444",
        marginBottom: 8,
    },
//caixa de texto - entrada
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
//botão
    button: {
        height: 42,
        backgroundColor: '#7159c1',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },
//texto do botão
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});