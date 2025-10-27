import { StyleSheet, View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View
                style={{ width: '100%', height: 85, alignItems: 'center', justifyContent: 'center'}}
            >
                <Image source={require('../assets/perfil.png')} style={{ width: 65, height: 65 }} />
                <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold'}}>Bem Vindo!</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    
  },
});
