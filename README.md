# Guia Prático React Native

## 1) Como instalar o React Native

### Pré-requisitos
- Node.js instalado ([download](https://nodejs.org/))
- npm ou yarn
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação das dependências globais
```sh
npm install -g expo-cli
```

### Instalação do React Native CLI (opcional, para projetos sem Expo)
```sh
npm install -g react-native-cli
```

---

## 2) Usando Expo: Como criar novas aplicações e templates disponíveis

### Criando um novo projeto Expo
```sh
expo init nome-do-projeto

npx create-expo-app {nome-do-projeto} --template {exemplo: blank}
```
Você poderá escolher entre templates como:
- blank (JavaScript)
- blank (TypeScript)
- tabs (com navegação por abas)
- minimal

Siga as instruções do terminal para selecionar o template desejado.

---

## 3) Uso dos States na aplicação

O state é usado para armazenar e atualizar dados dinâmicos em componentes.
O state em React Native é fundamental para criar interfaces dinâmicas e interativas. Ele permite que componentes armazenem informações que podem mudar ao longo do tempo, como dados de formulários, status de carregamento, ou valores de entrada do usuário.

- **Como funciona:**  
    Quando o state de um componente muda, o React Native re-renderiza automaticamente esse componente para refletir as novas informações na tela.

- **Onde usar:**  
    Use o state para qualquer dado que precise ser atualizado e exibido ao usuário, como contadores, campos de texto, listas dinâmicas, etc.

- **Como definir:**  
    O state é geralmente definido usando o hook `useState` em componentes funcionais.  
    Exemplo:
    ```jsx
    const [valor, setValor] = useState(valorInicial);
    ```

- **Atualizando o state:**  
    Sempre use a função de atualização (`setValor`) para modificar o state. Não altere o valor diretamente.

- **Boas práticas:**  
    - Mantenha o state o menor possível e apenas com o necessário.
    - Evite armazenar dados derivados ou que podem ser calculados a partir de props ou outros states.
    - Prefira dividir o state em múltiplos hooks se os dados não estiverem relacionados.

- **Diferença entre state e props:**  
    - *State* é interno e controlado pelo próprio componente.
    - *Props* são valores passados de um componente pai para um filho e não devem ser modificados pelo componente filho.

- **Exemplo de uso comum:**  
    - Controlar o texto digitado em um campo de entrada.
    - Alternar entre temas claro e escuro.
    - Exibir ou ocultar elementos na tela.

### Exemplo com useState
```jsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const MeuComponente = () => {
  const [contador, setContador] = useState(0);

  return (
    <View>
      <Text>{contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
    </View>
  );
};
```

### Exemplo com useRef (para valores que não causam re-render)
```jsx
import React, { useRef } from 'react';

const MeuComponente = () => {
  const contador = useRef(0);
  // contador.current pode ser alterado sem re-renderizar
};
```

### Exemplo com useEffect (efeitos colaterais)
```jsx
import React, { useState, useEffect } from 'react';

const MeuComponente = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Executa quando contador muda
  }, [contador]);
};
```

### useMemo

O `useMemo` é um hook que memoriza valores calculados, evitando recomputações desnecessárias quando as dependências não mudam.

- **Para que serve:**  
    Otimizar o desempenho de componentes, evitando cálculos pesados em cada renderização.

- **Como usar:**  
    ```jsx
    const valorMemorizado = useMemo(() => funcaoPesada(param), [param]);
    ```

- **Benefícios:**  
    - Reduz cálculos desnecessários.
    - Melhora a performance em listas ou componentes complexos.

- **Exemplo de código:**
    ```jsx
    import React, { useState, useMemo } from 'react';
    import { View, Text, Button } from 'react-native';

    const MeuComponente = () => {
      const [contador, setContador] = useState(0);

      const valorDobrado = useMemo(() => {
        return contador * 2;
      }, [contador]);

      return (
        <View>
          <Text>Contador: {contador}</Text>
          <Text>Dobro: {valorDobrado}</Text>
          <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
        </View>
      );
    };
    ```

---

### useRef

O `useRef` é um hook que permite criar uma referência mutável que persiste durante todo o ciclo de vida do componente.

- **Para que serve:**  
    Armazenar valores que não causam re-renderização ao serem alterados, como acessar elementos da interface ou guardar valores entre renders.

- **Como usar:**  
    ```jsx
    const minhaRef = useRef(valorInicial);
    ```

- **Benefícios:**  
    - Não dispara re-render ao alterar o valor.
    - Útil para acessar elementos DOM ou guardar valores temporários.

- **Exemplo de código:**
    ```jsx
    import React, { useRef } from 'react';
    import { View, Button, Text } from 'react-native';

    const MeuComponente = () => {
      const contador = useRef(0);

      const incrementar = () => {
        contador.current += 1;
        alert(`Valor atual: ${contador.current}`);
      };

      return (
        <View>
          <Button title="Incrementar (useRef)" onPress={incrementar} />
          <Text>Veja o valor no alerta</Text>
        </View>
      );
    };
    ```

---

## 4) Como usar o componente ScrollView

O `ScrollView` permite rolar o conteúdo na tela.

```jsx
import { ScrollView, Text } from 'react-native';

<ScrollView>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  {/* ... */}
</ScrollView>
```

---

## 5) Como usar o componente FlatList

O `FlatList` é ideal para listas grandes e performáticas.

```jsx
import { FlatList, Text } from 'react-native';

const dados = [ { id: '1', nome: 'Item 1' }, { id: '2', nome: 'Item 2' } ];

<FlatList
  data={dados}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Text>{item.nome}</Text>}
/>
```

---

## 6) Como usar o componente Picker

O `Picker` permite selecionar um valor de uma lista.
### Instalando o pacote do Picker

Para utilizar o `Picker`, instale o pacote:

```sh
npm install @react-native-picker/picker
```

Se estiver usando Expo, também é compatível.

```jsx
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

const MeuComponente = () => {
  const [selecionado, setSelecionado] = useState('java');

  return (
    <Picker
      selectedValue={selecionado}
      onValueChange={(itemValue) => setSelecionado(itemValue)}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};
```

---

## 7) Como usar o componente Slider

O `Slider` permite selecionar um valor numérico em uma faixa.
### Instalando o pacote do Slider

Para utilizar o `Slider`, instale o pacote:

```sh
npm install @react-native-community/slider
```

Se estiver usando Expo, também é compatível.

```jsx
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

const MeuComponente = () => {
  const [valor, setValor] = useState(0);

  return (
    <View>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={valor}
        onValueChange={setValor}
      />
      <Text>Valor: {valor}</Text>
    </View>
  );
};
```

---
## 8) Como usar o AsyncStorage

O `AsyncStorage` é uma solução de armazenamento local simples e não criptografada para React Native. Ele permite salvar dados de forma persistente no dispositivo, funcionando como um "localStorage" para apps mobile.

### Para que serve?
- Armazenar preferências do usuário, tokens de autenticação, configurações, ou qualquer dado simples que precise ser mantido entre sessões do app.

### Benefícios
- Persistência de dados mesmo após fechar o app.
- API simples e fácil de usar.
- Útil para dados pequenos e não sensíveis.

### Instalando o pacote

```sh
npm install @react-native-async-storage/async-storage
```

### Exemplo de uso

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvando um valor
const salvarDado = async () => {
    try {
        await AsyncStorage.setItem('chave', 'valor');
    } catch (e) {
        // erro ao salvar
    }
};

// Lendo um valor
const lerDado = async () => {
    try {
        const valor = await AsyncStorage.getItem('chave');
        if (valor !== null) {
            // valor recuperado com sucesso
        }
    } catch (e) {
        // erro ao ler
    }
};
```
---

## 9) Como usar o componente ActivityIndicator

O `ActivityIndicator` exibe um indicador de carregamento (spinner), útil para mostrar ao usuário que uma operação está em andamento.

### Exemplo de uso

```jsx
import React, { useState } from 'react';
import { View, Button, ActivityIndicator, Text } from 'react-native';

const MeuComponente = () => {
  const [carregando, setCarregando] = useState(false);

  const iniciarCarregamento = () => {
    setCarregando(true);
    setTimeout(() => setCarregando(false), 2000); // Simula carregamento
  };

  return (
    <View>
      <Button title="Carregar" onPress={iniciarCarregamento} />
      {carregando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>Pronto!</Text>
      )}
    </View>
  );
};
```
## 10) Como usar o Animated (timing, parallel, sequence)

O `Animated` é uma API poderosa do React Native para criar animações fluidas e interativas. Ele permite animar valores, estilos e componentes de forma declarativa.

### Principais métodos de animação

- **Animated.timing:**  
  Anima um valor de forma gradual, usando tempo e easing. Ideal para transições suaves, como mover, alterar opacidade ou escala.

- **Animated.parallel:**  
  Executa múltiplas animações ao mesmo tempo. Útil para animar vários valores simultaneamente, como mover e mudar opacidade juntos.

- **Animated.sequence:**  
  Executa animações em sequência, uma após a outra. Perfeito para criar efeitos encadeados, como aparecer, mover e desaparecer.

### Quando usar cada um?

- Use `timing` para animar um valor específico com duração definida.
- Use `parallel` quando quiser que várias animações ocorram juntas.
- Use `sequence` para criar passos animados, onde uma animação começa após a anterior terminar.

### Exemplo de código

```jsx
import React, { useRef } from 'react';
import { View, Button, Animated } from 'react-native';

const MeuComponente = () => {
  const animacao = useRef(new Animated.Value(0)).current;

  const animarTiming = () => {
    Animated.timing(animacao, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => animacao.setValue(0));
  };

  const animarParallel = () => {
    const opacidade = new Animated.Value(0);
    const escala = new Animated.Value(0.5);
    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(escala, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animarSequence = () => {
    Animated.sequence([
      Animated.timing(animacao, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animacao, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View>
      <Button title="Timing" onPress={animarTiming} />
      <Button title="Parallel" onPress={animarParallel} />
      <Button title="Sequence" onPress={animarSequence} />
      <Animated.View
        style={{
          opacity: animacao,
          transform: [{ translateY: animacao.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100],
          }) }],
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          marginTop: 20,
        }}
      />
    </View>
  );
};
```

### Documentação oficial

- [Animated API - React Native](https://reactnative.dev/docs/animated)

---
## 11) Como usar animações com react-native-animatable

A biblioteca `react-native-animatable` facilita a criação de animações em componentes React Native de forma simples e declarativa.

### Instalação

```sh
npm install react-native-animatable
```

### Exemplo de uso

```jsx
import React from 'react';
import { View, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

const MeuComponente = () => (
  <View>
    <Animatable.Text animation="bounceIn" style={{ fontSize: 24 }}>
      Texto animado!
    </Animatable.Text>
    <Animatable.TextInput
      animation="fadeIn"
      placeholder="Digite algo"
      style={{ borderWidth: 1, marginTop: 20, padding: 8 }}
    />
  </View>
);
```

- [Documentação oficial](https://github.com/oblador/react-native-animatable)
- [GitHub](https://github.com/oblador/react-native-animatable)

---

## 12) Como usar ícones com react-native-vector-icons

A biblioteca `react-native-vector-icons` oferece centenas de ícones personalizáveis para React Native.
Lembrando que com Expo não é necessário instalação, já vem por default

### Instalação

```sh
npm install react-native-vector-icons
```

### Exemplo de uso

```jsx
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MeuComponente = () => (
  <View>
    <Icon name="rocket" size={30} color="#900" />
  </View>
);
```

- [Documentação oficial](https://github.com/oblador/react-native-vector-icons)
- [GitHub](https://github.com/oblador/react-native-vector-icons)

---
## 13) Tipos de Navegação no React Native (Stack, Tabs, Drawer)

A navegação é fundamental para apps com múltiplas telas. O React Navigation é a biblioteca mais usada.

### Instalação das bibliotecas de navegação

```sh
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context
```

Se estiver usando Expo, basta instalar normalmente.

---

### Navegação Stack

Empilha telas, como páginas de um navegador.

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

### Navegação Tabs

Alterna entre telas usando uma barra de abas.

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

### Navegação Drawer

Exibe um menu lateral para acessar telas.

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

---

### Navegação combinando Stack e Tabs

Misture tipos de navegação, por exemplo, Stack principal com abas internas.

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- [Documentação oficial do React Navigation](https://reactnavigation.org/)

---

## 14) Como usar Firebase no React Native (CRUD com Firestore)

O Firebase oferece backend completo para autenticação, banco de dados, storage e mais. O Firestore é o banco de dados NoSQL em tempo real do Firebase.

### Instalação do Firebase

```sh
npm install firebase
```

---

### Configurando o Firebase

Crie um projeto no [console do Firebase](https://console.firebase.google.com/), adicione um app e copie as credenciais.

```js
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### Exemplo CRUD com Firestore usando onSnapshot

```jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export default function CrudFirestore() {
  const [nome, setNome] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  // Ler dados em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'usuarios'), (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setUsuarios(lista);
    });
    return () => unsubscribe();
  }, []);

  // Criar usuário
  const adicionarUsuario = async () => {
    if (nome.trim() === '') return;
    await addDoc(collection(db, 'usuarios'), { nome });
    setNome('');
  };

  // Atualizar usuário
  const atualizarUsuario = async (id) => {
    await updateDoc(doc(db, 'usuarios', id), { nome: nome + ' (editado)' });
  };

  // Deletar usuário
  const deletarUsuario = async (id) => {
    await deleteDoc(doc(db, 'usuarios', id));
  };

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, margin: 8, padding: 8 }}
      />
      <Button title="Adicionar" onPress={adicionarUsuario} />
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8 }}>
            <Text style={{ flex: 1 }}>{item.nome}</Text>
            <Button title="Editar" onPress={() => atualizarUsuario(item.id)} />
            <Button title="Excluir" onPress={() => deletarUsuario(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
```

- [Documentação oficial do Firebase](https://firebase.google.com/docs)
- [Documentação Firestore](https://firebase.google.com/docs/firestore)

