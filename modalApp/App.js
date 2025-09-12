import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import Entrar from './src/Entrar';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.entrar = this.entrar.bind(this);
    this.fechar = this.fechar.bind(this);
  }

  entrar() {
    this.setState({ modalVisible: true });
  }

  fechar() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Entrar' onPress={this.entrar} />

        <Modal animationType='slide' visible={this.state.modalVisible} transparent={false}>
          <View style={{ flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Entrar fechar={this.fechar} />
          </View>
        </Modal> 

         {/* <Modal animationType='slide' visible={this.state.modalVisible} transparent={false}>
          <View style={{backgroundColor: '#292929', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ color:'#FFF', fontSize: 25 }}>Seja bem Vindo!</Text>
            <Button title='Fechar' onPress={this.fechar} />
          </View>
        </Modal>  */}

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
