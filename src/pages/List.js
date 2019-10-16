import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, AsyncStorage, Image } from 'react-native';

import SpotList from "../components/SpotList";

import logo from "../assets/logo.png"

export default function List() {
//buscando as tecnologias salvas no momento do login
    const [techs, setTechs] = useState([]);

    useEffect(() => {
//buscando as tecnologias salvas no momento do login
        AsyncStorage.getItem('techs').then(storagedTechs  => {
                                    //tech.trim tira os espaços do inicio e do final das palavras
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            
            setTechs(techsArray);
        })
    }, []);

    return (
// logo no topo da tela
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    }
});