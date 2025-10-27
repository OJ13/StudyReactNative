import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useState, useEffect, useMemo, useRef } from 'react';

export default function App() {
  const [nome, setNome] = useState('');
  const [input, setInput] = useState('');
  const nomeInputRef = useRef(null);

   //ComponentDidMount
   useEffect(() => {

    getStorage();

    // return () => {} //ComponentWillUnmount
  }, []);

  //ComponentDidUpdate
  useEffect(() => {
    
    saveStorage();
  }, [nome]);

  async function getStorage() {
    const nomeStorage = await AsyncStorage.getItem('nome');
    if (nomeStorage !== null) {
      setNome(nomeStorage);
    }
  }

  async function saveStorage() {
      await AsyncStorage.setItem('nome', nome);
  }

  function alteraNome() {
    console.log('CHAMOU', input, nome);
    setNome(input);
    setInput('');
    Keyboard.dismiss();
  }

  function novoNome() {
    nomeInputRef.current.focus();
  }

  const letrasNome = useMemo(() => {
    return nome.length;
  }, [nome]);
  
  return (
    <View style={styles.container}>
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingHorizontal: 10 }}
        placeholder="Digite algo"
        onChangeText={(text) => setInput(text)}
        value={input}
        ref={nomeInputRef}
      />
      
      <TouchableOpacity
          style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
          onPress={alteraNome}
        >
          <Text style={{ color: 'white' }}>Atualizar Nome</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24 }}>{nome}</Text>

      <Text style={{ fontSize: 24 }}>Tem {letrasNome} letras.</Text>

       <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginTop: 20 }}
          onPress={novoNome}
        >
          <Text style={{ color: 'white' }}>Novo Nome</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
