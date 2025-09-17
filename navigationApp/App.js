import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/Home';
import SobreScreen from './src/pages/Sobre';
import ContatoScreen from './src/pages/Contato';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function SobreScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Sobre Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Tela Inicio',
          headerStyle: {
            backgroundColor: '#121212'
          },
          headerTintColor: '#FFF',
          headerShown: false
        }}
        />
      <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Tela Sobre' }} />
      <Stack.Screen name="Contato" component={ContatoScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
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
