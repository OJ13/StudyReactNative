import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export function Filme({ data }) {
  return (
     <View style={styles.filme}>
      <Text style={styles.titulo}>Nome: {data.nome}</Text>
      <Image source={{ uri: data.foto }} style={styles.imgFilme} />
       
       <View style={styles.areaBotao}>
            <TouchableOpacity style={styles.botao}>
                <Text style={styles.botaoTexto}>Leia Mais</Text>
            </TouchableOpacity>
       </View>
       <Text style={styles.sinopse}>Sinopse: {data.sinopse}</Text>
     </View>
     );
}


const styles = StyleSheet.create({
    filme: {
        marginBottom: 20, 
        backgroundColor: '#f74949ff',
        padding: 10,
        elevation: 20,
        borderRadius: 20
    },
    imgFilme: { 
        height: 250, 
        marginTop: 15,
        marginBottom: 15,
        resizeMode: 'cover',
        borderRadius: 15
    },
    titulo: { 
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    areaBotao: {
        alignItems: 'flex-end',
        marginTop: -70,
        zIndex: 2,
    },
    botao: {
        width: 100,
        backgroundColor: '#09A6FF',
        opacity: 1,
        padding: 8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    botaoTexto: { 
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,   
    },
    sinopse: {
        color: '#fff',
        textAlign: 'justify',
        marginTop: 20,
    }
});
 