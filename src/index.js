import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import api from './services/api';

export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    },[]);

    const handleAddProject = async () => {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Rodrigo"
        });

        setProjects([...projects, response.data]);
    }

    return (
    <>
        <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={(e) => e.id}
                renderItem={({item}) => <Text style={styles.project}>{item.title}</Text>}
            />
            <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => handleAddProject()}>
                <Text style={styles.buttonText}>ADICIONAR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,
    },
    project:{
        color: '#fff',
        fontSize: 20
    },
    button:{
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 16,
    }
});