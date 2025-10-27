import { useMemo } from "react";
import { Container, TipoText, Tipo, ValorText, IconView } from "./style";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { TouchableWithoutFeedback, Alert } from "react-native";

export default function HistoricoList({ data, deleteItem }) {
    const info = useMemo(()=> {
        if (data.type === 'receita') {
            return {
                label: 'Receita',
                color: '#00b94a',
                icon: 'arrow-up'
            }
        } 
        else {
            return {
                label: 'Despesa',
                color: '#EF463a',
                icon: 'arrow-down'
            }
        }
    }, [data]);

    function handleDeleteItem() {
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja deletar esse registro?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => deleteItem(data.id)
                }
            ]
        )
    }

    return (
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <Container>
                <Tipo>
                    <IconView bg={info.color}>
                        <FontAwesome6 name={info.icon} iconStyle="solid" size={20} color="#FFF" />
                        <TipoText> {info.label} </TipoText>
                    </IconView>
                </Tipo>

                <ValorText>
                    R$ {data.value}
                </ValorText>

            </Container>
        </TouchableWithoutFeedback>
    )
}