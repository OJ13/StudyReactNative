import { StyleSheet, View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function SobreScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Button title='Voltar' onPress={() => navigation.goBack()} />
      
      <Button title='Tela Contatos' onPress={() => navigation.navigate('Contato')} />
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
