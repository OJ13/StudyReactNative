import { createContext, useState, useEffect } from 'react';
import api  from '../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        loadStorage();
    }, []);

    async function loadStorage() {
        const storageToken = await AsyncStorage.getItem('@finToken');

        if (storageToken) {
            const response = await api.get('/me', {
                headers: {
                    'Authorization': `Bearer ${storageToken}`
                }
            }).catch(() => {
                setUser(null);
            })

            api.defaults.headers['Authorization'] = `Bearer ${storageToken}`
            setUser(response.data);
            setLoading(false);
        }

        setLoading(false);
    }

    async function signUp(email, senha, nome) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/users', {
                name: nome,
                password: senha,
                email: email
            });

            setLoadingAuth(false);
            navigation.goBack();

        } catch(err) {
            console.error("Erro no cadastro", err);
            setLoadingAuth(false);
        }
    }

    async function singIn(email, senha) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/login', {
                email: email,
                password: senha
            });

            const { id, name, token } = response.data;
            const data = { id, name, token, email };

            await AsyncStorage.setItem('@finToken', token);

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            setUser({id, name, email});
            setLoadingAuth(false);

        } catch(err) {
            console.error("Erro no Login", err);
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            }).catch((err) => {
                console.error('Erro no logout => ', err);
            })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, singIn, signOut, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}