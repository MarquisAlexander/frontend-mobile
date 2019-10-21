import React, { useState } from "react";
import { Text, SafeAreaView, Alert, StyleSheet, TouchableOpacity, AsyncStorage, TextInput } from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
    const [date, setDate] = useState("");
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem("user");

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert("Evento Concluído.");

        navigation.navigate("List");
    }

    function hamdleCancel() {
        navigation.navigate("List");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Data de interrese*</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data voçê quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
               <Text style={styles.buttonText}>Concluír Evento</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={hamdleCancel} style={[styles.button, styles.cancelButton]}>
               <Text style={styles.buttonText}>Cancelar </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
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

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
//texto do botão
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});