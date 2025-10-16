import { TouchableOpacity, Modal } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { 
    Background, 
    ListBalance,
    Area,
    Title,
    List
} from './style';
import Header from '../../components/Header';
import BalanceItem from '../../components/BalanceItem';
import api from '../../services/api';
import { format } from "date-fns";
import { useIsFocused } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import HistoricoList from '../../components/HistoricoList';
import CaldendarModal from '../../components/CalendarModal';

export default function Home() {
    const isFocused = useIsFocused();
    const { signOut, user } = useContext(AuthContext);
    const [ listBalance, setListBalance] = useState([]);
    const [ dateMovements, setDateMovements] = useState(new Date());
    const [ movements, setMovements] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            //let dateFormated = format(dateMovements, 'dd/MM/yyyy');
            let date = new Date(dateMovements);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy');

            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            });

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            });

            if (isActive) {
                setMovements(receives.data);
                setListBalance(balance.data);
            }
        }
        getMovements();

        return () => isActive = false; //ComponentUnmounted
    }, [isFocused, dateMovements]);

    async function handleDelete(id) {
        try {
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            });
            setDateMovements(new Date());
            alert('Item deletado com Sucesso!');

        } catch(err) {
            console.error(err.message);
            alert('Erro ao excluir o Item');
        }
    }

    async function filterDate(dateSelected) {
        setDateMovements(dateSelected);
    }

    return (
        <Background>
            <Header title="Novo Teste" />

            <ListBalance 
                data={listBalance} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={ ({item}) => ( 
                    <BalanceItem data={item} />
                ) }
                />

            <Area>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesome6 name="calendar" iconStyle="regular" color="#121212" size={30} />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>

            <List 
                data={movements}
                keyExtractor={ item => item.id }
                renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete} /> }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

          
            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <CaldendarModal setVisible={ () => setModalVisible(false) } handleFilter={filterDate} />
            </Modal>
          

        </Background>
    )
}