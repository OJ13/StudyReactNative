import { useState } from 'react';
import {
    RegisterContainer,
    RegisterTypeButton,
    RegisterLabel
} from './style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export default function RegisterType({ type, sendTypeChanged }) {
    const [typeChecked, setTypeChecked] = useState(type);

    function changeType(name) {
     setTypeChecked(name);
     sendTypeChanged(name);
    }

    return (
        <RegisterContainer>
            <RegisterTypeButton 
                checked={ typeChecked === 'receita' ? true : false } 
                onPress={() => changeType('receita') }
                >
                <FontAwesome6 name="arrow-up-long" iconStyle="solid" size={25} color="#121212" />
                <RegisterLabel>Receita</RegisterLabel>
            </RegisterTypeButton>

            <RegisterTypeButton 
                checked={ typeChecked === 'despesa' ? true : false }
                onPress={() => changeType('despesa') }
                >
                <FontAwesome6 name="arrow-down-long" iconStyle="solid" size={25} color="#121212" />
                <RegisterLabel>Despesa</RegisterLabel>
            </RegisterTypeButton>

        </RegisterContainer>
    )
}