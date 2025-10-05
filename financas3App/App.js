import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#F0F4FF' barStyle="dark-content" style="auto" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <Container>
//       <Routes />
//       <Titulo cor="#FF0000">Hello World!</Titulo>
//       <Nome>Olá Osmar Junior</Nome>

//       <Botao onPress={() => alert('CLICK')}>
//         <BotaoText>OK</BotaoText>
//       </Botao>

//       <StatusBar style="auto" />
//     </Container>
//   );
// }
