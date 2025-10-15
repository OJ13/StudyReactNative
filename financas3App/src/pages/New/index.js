import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { 
    Background, Input, SubmitButton, SubmitText
} from './style';
import Header from '../../components/Header';
import RegisterType from '../../components/RegisterTypes';
import { useState } from 'react';
import api from '../../services/api';
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/native';

export default function New() {
    const navigation = useNavigation();
    const [labelInput, setLabelInput] = useState("");
    const [valueInput, setValueInput] = useState("");
    const [type, setType] = useState("receita");

    function handleSubmit() {
        Keyboard.dismiss();

        if (validation()) {
            alert('Preencha todos os campos')
            return;
        }

        Alert.alert(
            'Confirmando Dados', 
            `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`,
            [
                { 
                    text: 'Cancelar',
                    style: 'cancel'
                }, 
                { 
                    text: 'Confirmar',
                    onPress: () => confirm()
                }
            ]
        )
    }

    async function confirm() {
        Keyboard.dismiss();

        await api.post('/receive', 
            {
              	description: labelInput,
                value: Number(valueInput),
                type: type,
                date: format(new Date(), "dd/MM/yyyy")
            }
        )
        .then((resp) => {
            setLabelInput('');
            setValueInput('');
            alert("Cadastro feito com Sucesso!");
            navigation.navigate('Home');
        }).catch((err) => {
            console.error(err, err.message);
            alert("Erro ao cadastrar registro");
        });
    }

    function validation() {
        return labelInput === '' 
            || isNaN(parseFloat(valueInput)) 
            || type === null;
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
            <Background>
                <Header title="Novo Registro" />

                <SafeAreaView style={{ marginTop: 14, alignItems: 'center' }}>
                    <Input placeholder="Descricao desse registro" 
                        value={labelInput} onChangeText={(text) => setLabelInput(text)}
                    />

                    <Input placeholder="Valor" keyboardType="numeric" 
                        value={valueInput} onChangeText={(text) => setValueInput(text)}
                    />

                    <RegisterType type={type} sendTypeChanged={ (item) => setType(item) } />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    )
}