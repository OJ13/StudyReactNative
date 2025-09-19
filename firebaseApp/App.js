import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { auth } from './src/firebaseConnection';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import FormUsers from './src/usuario';

export default function App() {
  const [showFormAuth, setShowFormAuth] = useState(true);
  
  return (
    <View style={styles.container}>
      {showFormAuth && (
        <UsuarioFirebaseAuth />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

function UsuarioFirebaseAuth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
         setAuthUser({ email: user.email, uid: user.uid })

         setLoading(false);
        return;
      }

      setAuthUser(null);
      setLoading(false);
    })
  }, []);

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, senha);
    alert("Usuário criado com Sucesso")
    clean();
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, senha)
      .then((user) => {
        setAuthUser(
          {
            email: user.email,
            uid: user.uid
          }
        )
      })
      .catch((err) => {
        console.log(err);
        console.log(err?.code)
      })
  }

  function logout() {
    signOut(auth)
      .then((x) => {
        setAuthUser(null);        
      })
  }

  function clean() {
    Keyboard.dismiss();
    setEmail("");
    setSenha("");
  } 

  if (authUser) {
    return (
      <View style={styles.container}>
        <FormUsers />
      </View>
    )
  } 
  else 
  {
  return (
    <View style={{ marginTop: 10}}>

      { loading && <Text style={{ fontSize: 20, marginLeft: 8, color: '#000'}}> Carregando as informações...</Text>}

      {/* <Text style={{ margin: 8, fontSize: 16, fontWeight: 'bold'}}>Usuário logado: {authUser && authUser.email}</Text> */}
      <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.input}
          value={email}
          placeholder='Digite seu email'
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Senha: </Text>
        <TextInput
          style={styles.input}
          value={senha}
          placeholder='Digite sua senha'
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />

        <View style={{ display: 'flex', flexDirection: 'row', margin: 10}}>
          <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#834829'}]} onPress={handleLogin}>
            <Text style={styles.buttonText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>

        {
          authUser && 
          (
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FFF', borderWidth: 1, width: '95%'}]} onPress={logout}>
              <Text style={[styles.buttonText , { color: '#000' }]}>Sair da Conta</Text>
            </TouchableOpacity>
          )
        }

      </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 10,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    marginLeft: 10,
    marginRight: 8,
  },
  button: {
    marginTop: 20,
    width: 180,
    backgroundColor: "#000",
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonClean: {
    marginTop: 20,
    width: 180,
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1
  },
  buttonTextClean: {
    padding: 8,
    color: "#000",
    fontWeight: 'bold'
  },
  buttonEdit: {
    marginTop: 20,
    width: 180,
    backgroundColor: "#00Fa",
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    padding: 8,
    color: "#FFF",
    fontWeight: 'bold'
  },
  btnShow: {
    borderWidth: 1,
    backgroundColor: '#19a59298',
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 25
  },
  list: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    marginBottom: 60
  },
  grid: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
    column: {
      width: '25%',
      height: 30,
      margin: 2,
      fontSize: 16,
      alignItems: 'center'
    }
  }
});
