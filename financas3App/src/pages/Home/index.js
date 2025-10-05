import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import { Background } from './style';
import Header from '../../components/Header';

export default function Home() {
    const { signOut, user } = useContext(AuthContext);
    return (
        <Background>
            <Header title="Novo Teste" />
        </Background>
    )
}