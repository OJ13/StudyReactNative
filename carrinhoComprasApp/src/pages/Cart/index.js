import { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { BuyContext } from '../../context/buyContext';

export default function Cart() {
  const { compra, addProduto } = useContext(BuyContext);

  return (
      <View style={styles.container}>
       
        <FlatList 
          data={compra}      
          renderItem={({ item }) => <ItemProduto data={item} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
        />
  
      </View>
    );
}

export function ItemProduto({data}) {
  const { addProduto, removeProduto } = useContext(BuyContext);
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.infoName}>{data.name}</Text>
        <Text style={styles.infoPreco}>R$ {(data.price).toFixed(2)}</Text>
      </View>


      <View style={styles.value}>
        <View>
          <TouchableOpacity>
          <Text>+</Text>
          </TouchableOpacity>
        
            <Text>{data.qtd}</Text>
        
          <TouchableOpacity>
            <Text>-</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.infoPreco}>{(data.total).toFixed(2)} R$</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    padding: 10
  },
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#DFDFDF",
    borderRadius: 2,
    marginBottom: 14,
    padding: 5
  },
  info: {
    flex: 1
  },
  infoName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  infoPreco: {
    fontSize: 14,
    fontWeight: '600'
  }
});
