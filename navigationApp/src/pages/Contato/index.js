import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function ContatoScreen() {
  const navigation = useNavigation();

  function handleHome() {
    navigation.dispatch(StackActions.popToTop());
  }

  return (
    <View style={styles.container}>
      <Text>Contato</Text>
      
      <Button style={styles.navegacao} title='Voltar Home' onPress={handleHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
