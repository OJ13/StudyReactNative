import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, Keyboard } from 'react-native';
import { auth, db } from '../firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from 'firebase/auth';

export default function FormUsers() {
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState(0);
  const [cargo, setCargo] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [showFormAuth, setShowFormAuth] = useState(true);

  useEffect(() => {
    //loadDados();
    //openLoadDados();
    loadAllOpen();
  }, []);

  //Abre e fecha a conexão
  async function loadDados() {
    const docRef = doc(db, "users", "1");

    getDoc(docRef)
      .then((snapshot) => {
        setNome(snapshot.data()?.nome)
        setIdade(snapshot.data()?.idade)
        setCargo(snapshot.data()?.cargo)
      })
      .catch((err) => {
        console.log("ERRO >> ", err);
      })
  }

  //Abre e fica aberta e toda altera;áo reflete
  async function openLoadDados() {
    const docRef = doc(db, "users", "1");

    onSnapshot(docRef, (doc) => {
        setNome(doc.data()?.nome)
        setIdade(doc.data()?.idade)
        setCargo(doc.data()?.cargo)
    })
  }

  async function loadAll() {
    const usersRef = collection(db, "users")

    getDocs(usersRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data()?.nome,
            idade: doc.data()?.idade,
            cargo: doc.data()?.cargo,
          })
        });

        setUsuarios(lista);

      }).catch((err) => {
        console.log('ERRO: ', err)
      });
  }

  async function loadAllOpen() {
    const usersRef = collection(db, "users")

    onSnapshot(usersRef ,
      (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data()?.nome,
            idade: doc.data()?.idade,
            cargo: doc.data()?.cargo,
          })
        });

        setUsuarios(lista);

      });
  }

  async function handleRegister() {
    const docRef = doc(db, "users", "4");
    await setDoc(docRef, {
      nome: 'Jose teste',
      idade: 45,
      cargo: 'Teach Lead'
    }).then(() => {
      alert('Cadastrado com Sucesso!')
    }).catch((err) => {
      console.log('ERRO: ', err)
    })
  }

  async function handleSave() {
   await addDoc(collection(db, "users"), {
     nome: 'Enzo',
      idade: 17,
      cargo: 'Estagiario'
    })
    .then(() => {
      alert('Cadastrado com Sucesso!')
    }).catch((err) => {
      console.log('ERRO: ', err)
    })
  }

  async function salvar() {
   const objetoSalvo = {
    nome: nome,
    idade: idade,
    cargo: cargo
   }

   await addDoc(collection(db, "users"), objetoSalvo)
    .then(() => {
      alert('Cadastrado com Sucesso!')
      clean();
    }).catch((err) => {
      console.log('ERRO: ', err)
    })
  }

  function editarUsuario(data) {
    setNome(data.nome);
    setIdade(data.idade.toString());
    setCargo(data.cargo);
    setIsEditing(data.id);
  }

  async function handleEditarUsuario() {
     const docRef = doc(db, "users", isEditing);

    await updateDoc(docRef, {
      nome: nome,
      idade: idade,
      cargo: cargo,
      ativo: true
    }).then(() => {
      alert('Usuário alterado com Sucesso');
      clean();
    })
      
  }

  function clean() {
    setNome("")
    setIdade(0)
    setCargo("")
    setIsEditing("");
    Keyboard.dismiss();
  }

  function handleToggle() {
    setShowForm(!showForm)
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>
            Sair da conta
          </Text>
      </TouchableOpacity>

      {showForm && (
        <View>
        <Text style={styles.label}>Nome:</Text>
          <TextInput 
            style={styles.input}
            value={nome}
            placeholder='Digite um nome ...'
            onChangeText={(text) => setNome(text)}
          />
          <Text style={styles.label}>Idade:</Text>
          <TextInput 
            style={styles.input}
            value={idade}
            placeholder='Digite sua Idade'
            onChangeText={(text) => setIdade(text)}
            keyboardType='numeric'
          />
          <Text style={styles.label}>Cargo: </Text>
          <TextInput 
            style={styles.input}
            value={cargo}
            placeholder='Digite o seu cargo'
            onChangeText={(text) => setCargo(text)}
          />

          
          {/* <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity> */}

          <View style={{ display: 'flex', flexDirection: 'row', margin: 10}}>
            <TouchableOpacity style={styles.buttonClean} onPress={clean}>
                <Text style={styles.buttonTextClean}>Limpar</Text>
            </TouchableOpacity>

          {isEditing !== "" ? (
              <TouchableOpacity style={styles.buttonEdit} onPress={handleEditarUsuario}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={salvar}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      )}

      <View style={{ display: 'flex', flexDirection: 'row', margin: 10}}>
        <TouchableOpacity style={styles.btnShow} onPress={handleToggle}>
          <Text style={styles.buttonText}>
            {showForm ? 'Esconder ' : 'Mostrar '} Formulário
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Usuários</Text>

      <FlatList style={styles.list}
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <Usuarios data={item} handleEditUser={(item) => editarUsuario(item)} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

function Usuarios({data, handleEditUser}) {
  
  async function deletar() {  
    const docRef = doc(db, "users", data.id);

    await deleteDoc(docRef)
      .then(() => {
        alert('Item deletado com Sucesso!')
      })
  }

  async function editar() {  
    handleEditUser(data);
  }

  return (
    <ScrollView>
      <View style={styles.grid}>
        <Text style={styles.grid.column}>{data.nome}</Text>
        <Text style={styles.grid.column}>{data.idade}</Text>
        <Text style={styles.grid.column}>{data.cargo}</Text>
        <TouchableOpacity onPress={editar}>
          <Ionicons name="pencil" color={'#0000FFaa'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deletar}>
          <Ionicons name="close" color={'#FF0000'} size={30} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    marginBottom: 60
  },
  grid: {
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
  },
  btnLogout: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    margin: 14,
    padding: 2,
    borderRadius: 10
  }
});
