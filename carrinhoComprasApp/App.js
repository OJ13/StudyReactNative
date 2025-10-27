import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import BuyProvider from './src/context/buyContext';

export default function App() {
  return (
    <NavigationContainer>
      <BuyProvider>
        <Routes/>        
      </BuyProvider>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
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
