import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { BuyContext } from '../../context/buyContext';
import { FontAwesome6 } from "@expo/vector-icons";

export default function Cart() {
  const { compra, total } = useContext(BuyContext);
  
  return (
      <View style={styles.container}>
       
        <FlatList 
          data={compra}      
          renderItem={({ item }) => <ItemProduto data={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => <Text>Nenhum item no carrinho</Text> }
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          ListFooterComponent={() => <Text style={styles.total}>Valor total: {total.toFixed(2)} R$</Text> }
        />
  
      </View>
    );
}

export function ItemProduto({ data }) {
  const [ quantidade, setQuantidade ] = useState(data?.qtd);
  const { addProduto, removeProduto } = useContext(BuyContext);
  
  function aumentar() {
    setQuantidade(item => item + 1);
    addProduto(data);
  }

  function diminuir() {
    setQuantidade(item => item - 1);
    removeProduto(data);
  }

  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.infoName}>{data.name}</Text>
        <Text style={styles.infoPreco}>R$ {(data.price).toFixed(2)}</Text>
      </View>


      <View style={styles.value}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnContador} onPress={diminuir}>
            <Text style={{marginBottom: 10}}>
              <FontAwesome6 name="sort-down" size={30} color="#000" />
            </Text>
          </TouchableOpacity>
        
            <Text style={styles.infoPreco}> {quantidade} </Text>
        
          <TouchableOpacity style={styles.btnConktador} onPress={aumentar}>
            <Text style={{marginTop: 10}}>
              <FontAwesome6 name="sort-up" size={30} color="#000" />
            </Text>
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
  },
  value: {
    alignItems: 'center'
  },  
  btnContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btnContador: {
    width: 20,
    justifyContent: 'center'
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24
  }
});
