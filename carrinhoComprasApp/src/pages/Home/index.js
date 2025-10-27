import { useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { mockProdutos } from '../../mock';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BuyContext } from '../../context/buyContext';


export default function Home() {
    const { compra, addProduto } = useContext(BuyContext);
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState(mockProdutos);
        
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Produtos</Text>
        <TouchableOpacity style={styles.btnCarrinho} onPress={() => navigation.navigate('Cart')}>
            {
                compra?.length !== 0 &&
                <View style={styles.bag}>
                    <Text style={styles.textBag}>{compra?.length}</Text>
                </View>
            }
            <Feather name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      
      <FlatList 
        contentContainerStyle={styles.containterCard}
        data={produtos}      
        renderItem={({ item }) => <InfoProduto data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />

    </View>
  );
}

export function InfoProduto({ data }) {
    const { addProduto } = useContext(BuyContext);
    
    return (
        <TouchableOpacity style={styles.card} onPress={() => addProduto(data) }>
            <Image source={data.imageSrc} style={styles.imageCard} />
            <Text>Nome: {data.name}</Text>
            <Text>R$ {data.price}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: "#ddd"
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  btnCarrinho: {

  },
  bag: {
    backgroundColor: 'red',
    borderRadius: 20/2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 99,
    bottom: -2,
    left: -4
  },
  textBag: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: 'bold'
  },
  containterCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  card: {
    width: 150,
    height: 200,
    margin: 5,
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCard: {
    width: 100,
    height: 150
  }
});
