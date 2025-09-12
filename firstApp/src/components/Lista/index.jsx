import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import unlike from '../../../assets/images/like.png';
import curtida from '../../../assets/images/likeada.png';
import enviar from '../../../assets/images/send.png';
import { useState } from 'react';

export default function Lista(props){
  return(
    <View style={styles.card}>
      <View style={styles.viewPerfil}>
        <Image source={{uri: props.data.imgperfil}} style={styles.fotoUsuario} />
        <Text style={styles.nomeUsuario}>{props.data.nome}</Text>
      </View>
      
      <Image resizeMode='cover' source={{uri: props.data.imgPublicacao}} style={{height: 350, width: '100%'}}/>

      <InfoPostagem data={props.data} />
    </View>
  );
}

export function InfoPostagem(props) {
    const [like, setLike] = useState(props.data.likeada);
    const [likers, setLikers] = useState(props.data.likers);

    // const curtir = () => {
    //     if(like === true){
    //         setLike(false); 
    //         setLikers(likers - 1);
    //     } else {
    //         setLike(true); 
    //         setLikers(likers + 1);
    //     }   
    // }

    // const curtir = () => {
    //     like ? (setLike(false), setLikers(likers - 1)) : (setLike(true), setLikers(likers + 1));
    // }

    const curtir = () => {
        like ? descurtir() : darLike();
    }

    const darLike = () => {
        setLike(true);
        setLikers(likers + 1);
    }

    const descurtir = () => {
        setLike(false);
        setLikers(likers - 1);
    }

    const mostrarLikes = (likers) => {
        return likers > 0;
    }

    return (
        <View style={styles.areaInfo}>
            <View style={styles.areaFeed}>
                <TouchableOpacity onPress={() => curtir(!like)}>
                    <Image source={ like ? curtida : unlike } style={styles.iconebtn} />
                    {/* <Curtiu like={like} /> */}
                </TouchableOpacity>
                <TouchableOpacity  style={styles.btnSend}>
                    <Image 
                        source={enviar} style={styles.iconebtn} />
                </TouchableOpacity>
            </View>
            { mostrarLikes(likers) ? 
                <Text style={{ marginTop: 5, fontWeight: '800' }}>{likers} { likers === 1 ? 'curtida' : 'curtidas' }</Text>
                : <></>
            }
            <View style={styles.viewRodape}>
                <Text style={styles.nomeRodape}>{props.data.nome}:</Text>
                <Text style={styles.descricaoRodape}> {props.data.descricao}</Text>
            </View>
        </View>
    )
}

export function Curtiu({like}) {
    if(like === true){
        return(
            <Image 
                source={curtida} style={styles.iconebtn} />
        )
    } else {
        return(
            <Image source={unlike} style={styles.iconebtn} />
        )
    }
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD'
    },
    areaInfo: {
      flex: 1,
      marginTop: 5,
      marginBottom: 20,
    },
    areaFeed: {
      flex: 1,
      flexDirection: 'row',
    },
    nomeUsuario: {
      fontSize: 22,
      textAlign: 'left',
      color: '#000',
      paddingLeft: 10,
      fontWeight: 'bold'
    },
    fotoUsuario: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      marginLeft: 10
    },
    viewPerfil: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,  
    },
    iconebtn: {
      width: 33,
      height: 33,
    },
    btnSend: {
      width: 30,
      height: 30,
      paddingLeft: 10,
    },
    viewRodape: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    descricaoRodape: {
        fontSize: 15,
        paddingLeft: 3,
        color: '#000'
    },
    nomeRodape: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    }
});