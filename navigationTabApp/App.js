import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/pages/Home';
import SobreScreen from './src/pages/Sobre';
import ContatoScreen from './src/pages/Contato';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function RootTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFF',
        tabBarStyle: {
          backgroundColor: '#00dddd',
          borderBottomWidth: 50
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Tela Inicio',
          headerStyle: {
            backgroundColor: '#121212'
          },
          headerTintColor: '#FFF',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" color={color} size={size} />
          }
        }}
        />
      <Tab.Screen name="Sobre" component={SobreScreen} 
        options={{ title: 'Tela Sobre', tabBarIcon: ({ color, size }) => {
            return <Ionicons name="document" color={'#00FF00'} size={size} />
          } }} />
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

export default function App() {
  return (
    <NavigationContainer>
      <RootTab />
    </NavigationContainer>
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
