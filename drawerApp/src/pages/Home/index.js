import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  function navegaSobre() {
    navigation.navigate('Sobre');
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      
      <Button style={styles.navegacao} title='Ir para Sobre' onPress={() => navegaSobre()} />

      <Text>Novo Modo</Text>

      <Button style={styles.navegacao} title='Tela Detalhe' onPress={() => navigation.navigate('Detalhe')} />
      
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
  navegacao: {
    width: 200,
    height: 100
  }
});
