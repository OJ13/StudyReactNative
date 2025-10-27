import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome6  } from "@react-native-vector-icons/fontawesome6";
import { Feather  } from "@react-native-vector-icons/feather";

export default function App() {
  return (
    <View style={styles.container}>
      
      <FontAwesome6  name="comments" size={50} color="#900" />

      <Feather iconStyle="solid" name="airplay" size={50} />
      
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
