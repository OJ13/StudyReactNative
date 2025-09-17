import { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

export default function SobreScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  //USE EFECT é Assincrono, o USE LAYOUT EFECT é Sincrono
  useLayoutEffect(() => {
    navigation.setOptions({
        title: route.params?.nome === '' ? 'Página Sobre': route.params?.nome
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Sobre Screen</Text>
      <Text>Nome : {route.params?.nome}</Text>
      <Text>SobreNome: {route.params?.sobrenome}</Text>

      <Button title='Voltar' onPress={() => navigation.goBack()} />
      
      <Button title='Tela Contatos' onPress={() => navigation.navigate('Contato')} />
    </View>
  );
}


// export default function SobreScreen({ route }) {
//   return (
//     <View style={styles.container}>
//       <Text>Sobre Screen</Text>
//       <Text>Nome : {route.params?.nome}</Text>
//       <Text>SobreNome: {route.params?.sobrenome}</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
