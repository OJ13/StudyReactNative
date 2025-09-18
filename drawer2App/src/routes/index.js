import { StyleSheet } from 'react-native';
import SobreScreen from '../pages/Sobre';
import ContatoScreen from '../pages/Contato';
import Ionicons from '@expo/vector-icons/Ionicons';

import StackRoutes from './stackRoutes';
import CustomDrawer from '../components/CustomDrawer';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


export default function Routes() {
  return (
   <Drawer.Navigator
   drawerContent={CustomDrawer}
    screenOptions={{
      drawerActiveBackgroundColor: '#00dae4',
      drawerActiveTintColor: '#FFF',
      drawerInactiveBackgroundColor: '#f1f1f1',
      drawerInactiveTintColor: '#000',
    }}
   >
      <Drawer.Screen 
        name="Home" component={StackRoutes}
        options={{
          title: '',
          drawerIcon: ({color, size}) => {
             return <Ionicons name="home" color={'#FFF'} size={size} />
          }
        }}
        ></Drawer.Screen>
      <Drawer.Screen name="Sobre" component={SobreScreen}></Drawer.Screen>
      <Drawer.Screen name="Contato" component={ContatoScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
