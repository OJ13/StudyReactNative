import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useRef, useEffect, useState } from 'react';

export default function App() {
  const [finalizou, setFinalizou] = useState(false);
  const larAnimada = useRef(new Animated.Value(20)).current;
  const altAnimada = useRef(new Animated.Value(50)).current;
  const opacidadeAnimada = useRef(new Animated.Value(1)).current;

  useEffect(() => { 
    //  Animated.timing(
    //  larAnimada, {
    //     toValue: 300,
    //     duration: 3000,
    //     useNativeDriver: false
    //   }).start();

    //   Animated.timing(
    //   altAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }).start();

    // Animated.sequence([
    //    Animated.timing(larAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }),
    //     Animated.timing(altAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }),
    //     Animated.timing(opacidadeAnimada, {
    //       toValue: 0,
    //       duration: 1000,
    //       useNativeDriver: false
    //     }),
    // ]).start();

    // Animated.parallel([
    //    Animated.timing(larAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }),
    //     Animated.timing(altAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }),
    //     Animated.timing(opacidadeAnimada, {
    //       toValue: 0,
    //       duration: 5000,
    //       useNativeDriver: false
    //     }),
    // ]).start();

    // Animated.sequence([
    //   Animated.timing(opacidadeAnimada, {
    //       toValue: 1,
    //       duration: 1000,
    //       useNativeDriver: false
    //     }),

    //   Animated.parallel([
    //     Animated.timing(larAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }),
    //     Animated.timing(altAnimada, {
    //       toValue: 300,
    //       duration: 3000,
    //       useNativeDriver: false
    //     }),
    //   ])
    // ]).start();

    // Animated.loop(
    //    Animated.sequence([
    //       Animated.timing( larAnimada, {
    //           toValue: 300,
    //           duration: 3000,
    //           useNativeDriver: false
    //       }),
    //       Animated.timing( larAnimada, {
    //           toValue: 150,
    //           duration: 3000,
    //           useNativeDriver: false
    //       })
    //    ])
    // ).start()

    // Animated.timing(larAnimada, {
    //     toValue: 100,
    //     duration: 4000,
    //     useNativeDriver: false
    //   }).start(({ finished }) => {
    //     alert('Animacao finalizada');
    //     console.log(finished)
    //   });

    Animated.sequence([
       Animated.timing(larAnimada, {
        toValue: 100,
        duration: 4000,
        useNativeDriver: false
      }),
      Animated.timing(altAnimada, {
        toValue: 100,
        duration: 4000,
        useNativeDriver: false
      })
    ]).start(() => {
      setFinalizou(true)
    })


  }, []);

  let porcentagemLargura = larAnimada.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })
  let porcentagemAltura = altAnimada.interpolate({
      inputRange: [50, 100],
      outputRange: ['5%', '100%']
   })

  return (
    <View style={styles.container}>
      
      {/* <Animated.View
        style={{
          width: larAnimada,
          height: altAnimada,
          backgroundColor: '#4169e1',
          justifyContent: 'center',
          opacity: opacidadeAnimada,
          borderRadius: 25
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 20, color: '#FFF'}}>Carregando...</Text>
      </Animated.View> */}

       <Animated.View
        style={{
          width: porcentagemLargura,
          height: porcentagemAltura,
          backgroundColor: '#4169e1',
          justifyContent: 'center',
          opacity: opacidadeAnimada,
          borderRadius: 25
        }}
      >
        {
          finalizou &&
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#FFF'}}>Finalizou</Text>
        }
      </Animated.View>

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
