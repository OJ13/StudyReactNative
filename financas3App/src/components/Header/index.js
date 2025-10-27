import { Container, Title, ButtonMenu } from "./style";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title }) {
    const navigation = useNavigation();
    return (
        <Container>
            <ButtonMenu onPress={() => navigation.openDrawer() }>
                <FontAwesome6 name="bars" iconStyle="solid" size={25} color="#121212"/>
            </ButtonMenu>
            {
                title && (
                    <Title>{title}</Title>
                )
            }
        </Container>
    )
}
