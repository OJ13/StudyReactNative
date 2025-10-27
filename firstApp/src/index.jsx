import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import logo from '../assets/images/logo.png';
import send from '../assets/images/send.png';
import Lista from './components/Lista';

export default function Feed(props) {
  const [feed, setFeed] = useState(props.data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
          source={logo}
          style={styles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
          source={send}
          style={styles.send}
          />
        </TouchableOpacity>
      </View>

      <FlatList style={styles.feed}
        showsHorizontalScrollIndicator={false}
        data={feed}
        renderItem={ ({item}) => <Lista data={item} /> }
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,  
  },
  header:{
    height: 55,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 0.2,
    shadowColor: '#000'
  },
  logo: {

  },
  send:{
    width: 23,
    height: 23
  },
  feed:{
    flex: 1,
    padding: 5,
  }
});
