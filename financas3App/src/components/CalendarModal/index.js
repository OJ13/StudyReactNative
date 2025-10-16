import { useState } from "react";
import { ButtonFilterText, ButtonFilter, Container, ModalContent } from "./style";
import { TouchableWithoutFeedback, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./localCalendar";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function CaldendarModal({setVisible, handleFilter}) {
    const [ dateNow, setDateNow ] = useState(new Date());
    const [ markedDate, setMarkedDate ] = useState({});

    function handleOnDayPress(date) { 
        setDateNow(new Date(date.dateString));
        let markedDay = { };

        markedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#FFF'
        }

        setMarkedDate(markedDay);
    }

    function handleFilterDate() {
        handleFilter(dateNow);
        setVisible();
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar 
                    onDayPress={handleOnDayPress}
                    markedDates={markedDate}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: '#FF0000',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#FFF'
                    }}
                />

                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>
            </ModalContent>
        </Container>
    )
}