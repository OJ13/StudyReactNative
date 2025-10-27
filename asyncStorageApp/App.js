import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [input, setInput] = useState('');
  const [nome, setNome] = useState('');
  const prevNome = useRef('');

  useEffect(() => {
    buscarNome();
  
    if (prevNome.current !== '' && prevNome.current !== nome) {
      AsyncStorage.setItem('nome', nome);
    }
    prevNome.current = nome;

  }, [nome]);

  const gravaNome = async (valor) => {
    try {
      await AsyncStorage.setItem('nome', valor);
      setInput('');
      setNome(valor);
      alert('Nome salvo com sucesso!');
      Keyboard.dismiss();
    } catch (error) {
      alert('Erro ao salvar o nome!');
      Keyboard.dismiss();
    }
  }

  const buscarNome = async () => {
    try {
      const value = await AsyncStorage.getItem('nome');
      if (value !== null) {
        setNome(value);
      }
    } catch (error) {
      alert('Erro ao buscar o nome!');
    }
  }

  return (
    <View style={styles.container}>
        
        <View style={styles.viewInput}>
          <TextInput 
            style={styles.input} 
            placeholder='Digite seu nome...' 
            underlineColorAndroid="transparent"
            onChangeText={(texto) => setInput(texto)}
          />

          <TouchableOpacity onPress={() => gravaNome(input)}>
            <Text style={styles.botao}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.nome}>{nome}</Text>

        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 40,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#222',
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    height: 40,
    padding: 10,
    marginLeft: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  nome: {
    fontSize: 30,
    marginTop: 20,
  },
});
