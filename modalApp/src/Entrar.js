import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Entrar extends Component {
  
  constructor(props) {
    super(props);
  } 

  render() {
      return (
          <View style={{
                backgroundColor: '#292929', 
                width: '100%', 
                height: 400 , 
                justifyContent: 'center', 
                alignItems: 'center', borderRadius: 15}}
            >
            <Text style={{ color:'#FFF', fontSize: 25 }}>Seja bem Vindo N2!</Text>
            <Button title='Fechar' onPress={this.props.fechar} />
          </View>
        );
    }
}