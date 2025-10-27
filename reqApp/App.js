import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import api from './src/services/api';
import { useEffect, useState } from 'react';
import { Filme } from './src/components/filmes';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilmes();
  }, []);

  async function loadFilmes() { 
    const response = await api.get('/r-api/?api=filmes');
    
    setFilmes(response.data);
    setLoading(false);
  }  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e2a7a7ff' }}>
        <ActivityIndicator color="#121212" size={50} />
      </View>
    )
  } else {    
    return (
      <View style={styles.container}>

        <FlatList style={{ marginTop:50, padding: 10 }}
          data={filmes}      
          renderItem={({ item }) => <Filme data={item} />}
          keyExtractor={(item) => item.id}
        />
        
        <StatusBar style="auto" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2a7a7ff',
  },
});
