import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { PickerItem } from './src/components/picker';
import api from './src/services/api';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [moedas, setMoedas] = useState([]);
  const [moedasCompleto, setMoedasCompleto] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(null);
  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);
  const [objetoMoeda, setObjetoMoeda] = useState(null);
  
  useEffect(() => {
    loadMoedas();
  }, 
  []);

  async function loadMoedas() {
    const response = await api.get('all');
    let arrayMoedas = [];
  
    Object.keys(response.data).map((key) => {
      arrayMoedas.push({
        key: key,
        label: key,
        value: key
      })
    })
    setMoedasCompleto(Object.entries(response.data));
    setMoedas(arrayMoedas);
    selecioneMoeda(arrayMoedas[0].key);
    setLoading(false);
  }

  function selecioneMoeda(novaMoeda) {
    setMoedaSelecionada(novaMoeda)
    const selecionou = moedasCompleto.find((key) => key[0] === novaMoeda);
    setObjetoMoeda(selecionou);
  }

  function converterMoeda() {
    console.log('objeto > ', objetoMoeda);
    console.log('moedaValor > ', moedaBValor);

    if (moedaBValor === null)  {
      alert('Digite algum valor')
      return
    }

    if (!objetoMoeda) {
      alert('Selecione uma moeda')
      return
    }
      
    const resultado = (objetoMoeda[1].ask * parseFloat(moedaBValor))
    setValorConvertido(resultado);
    Keyboard.dismiss()
  }

  if (loading) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size={50} color="#0000ffda" />
      <Text>Carregando...</Text>
    </View>
    )
  } else {
  return (
      <View style={styles.container}>
        <Text>Conversor de Moeda</Text>

        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione sua moeda</Text>
          <PickerItem 
            moedas={moedas}  
            moedaSelecionada={moedaSelecionada}
            onChange={(novaMoeda) => selecioneMoeda(novaMoeda)}
            />
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
          <TextInput 
            placeholder='ex: 1.50'
            style={styles.input}
            keyboardType='numeric'
            value={moedaBValor}
            onChangeText={(valor) => setMoedaBValor(valor)}
          />
        </View>

        <TouchableOpacity style={styles.botaoArea} onPress={converterMoeda}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {
          valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {moedaBValor}
            </Text>
            <Text>
              corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              R$ {valorConvertido.toFixed(2)}
            </Text>
          </View>
          )
        }

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    alignItems: 'center',
    paddingTop: 50
  },
  areaMoeda: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 20,
    padding: 15
  },
   titulo: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#101215'
   },
   areaValor: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingBottom: 8,
    paddingTop: 8,
   },
   input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000'
   },
   botaoArea: {
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
   },
   botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
   },
   areaResultado: {
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
   },
   valorConvertido: {
    fontSize: 28,
    color: '#000'
   }
});
