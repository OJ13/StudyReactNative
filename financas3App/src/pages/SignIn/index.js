import { 
    Background, 
    Container, 
    Logo, 
    AreaInput, 
    Input, 
    SubmitButton, 
    SubmitText, 
    Link, 
    LinkText  
} from '../../assets/styles/styles';
import { Platform, ActivityIndicator } from 'react-native';
import logo from '../../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const navigation = useNavigation();
    const { singIn, loadingAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleLogin() {
        singIn(email, senha);
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <Logo source={logo} />

                <AreaInput>
                    <Input 
                        placeholder="Seu email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        />
                </AreaInput>

                <AreaInput>
                    <Input 
                        placeholder="Sua Senha"
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                        secureTextEntry={true}
                        />
                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                            <SubmitText>Acessar</SubmitText>
                        )
                    }
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Criar uma Conta!</LinkText>
                </Link>

            </Container>
        </Background>
    )
}