import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SobreScreen from '../pages/Sobre';
import ContatoScreen from '../pages/Contato';
import Ionicons from '@expo/vector-icons/Ionicons';

import StackRoutes from './stackRoutes';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name="HomeStack"
            component={StackRoutes}
            options={{
                headerShown: false
            }}
        />
        <Tab.Screen name="Sobre" component={SobreScreen} 
            options={{ title: 'Tela Sobre', tabBarIcon: ({ color, size }) => {
                return <Ionicons name="document" color={color} size={size} />
            } }} 
        />
        <Tab.Screen name="Contato" component={ContatoScreen}
            options={{
                tabBarIcon: ({ color, size }) => {
                return <Ionicons name="call" color={color} size={size} />
                }
            }}
        />
    </Tab.Navigator>
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
