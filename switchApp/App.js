import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState(false);
  return (
    <View style={styles.container}>
      <Switch 
      value={status} 
      onValueChange={(valor) => setStatus(valor)}
      thumbColor={status ? '#00ff00' : '#ff0000'}
      />
      <Text style={styles.textoStatus}>{status ? 'Ativo' : 'Inativo'}</Text>
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
  textoStatus: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  }
});
