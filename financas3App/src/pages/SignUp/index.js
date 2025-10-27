import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import { Platform, ActivityIndicator } from 'react-native';
import { 
    Background, 
    Container, 
    Logo, 
    AreaInput, 
    Input, 
    SubmitButton, 
    SubmitText,
} from '../../assets/styles/styles';
import logo from '../../assets/Logo.png';

export default function SignUp() {
    const { signUp, loadingAuth } = useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSignUp() {
        if (nome === '' || email === '' || senha === '') 
            return;

        signUp(email, senha, nome);
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <Logo source={logo} />

                <AreaInput>
                    <Input placeholder='Nome' value={nome} onChangeText={(text) => setNome(text)} />
                </AreaInput>

                <AreaInput>
                    <Input placeholder='Seu email' value={email} onChangeText={(text) => setEmail(text)} />
                </AreaInput>

                <AreaInput>
                    <Input placeholder='Sua Senha' value={senha} onChangeText={(text) => setSenha(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton onPress={handleSignUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }
                </SubmitButton>

            </Container>
        </Background>
    )
}