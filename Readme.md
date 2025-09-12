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


Consulte sempre a documentação oficial para mais detalhes e atualizações.
