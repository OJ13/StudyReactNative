import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ButtonAnimated = Animatable.createAnimatableComponent(TouchableOpacity)
export default function App() {
  const buttonRef = useRef(null);

  function handleClick() {
    buttonRef.current.bounce();
  }

  return (
    <View style={styles.container}>

      <ButtonAnimated style={styles.btn}
        animation="slideInDown"
      >
        <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>
          Teste!
        </Text>
      </ButtonAnimated>

      <Animatable.Text style={styles.titulo}
        animation="bounce"
        iterationCount={3}> 
        Hello World
      </Animatable.Text>

      <ButtonAnimated style={styles.btn}
        animation="fadeInUp" 
        ref={buttonRef} onPress={handleClick}
      >
        <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>
          Animar!
        </Text>
      </ButtonAnimated>

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
  titulo: {
    fontSize: 25,
    fontWeight: '800'
  },
  btn: {
    width: '70%',
    height: 50,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 25
  }
});
