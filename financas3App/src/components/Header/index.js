import { Container, Title, ButtonMenu } from "./style";
import { FontAwesome6  } from "@react-native-vector-icons/fontawesome6";

export default function Header({ title }) {
    return (
        <Container>
            <ButtonMenu>
                <FontAwesome6 name="bars" size={35} color="#121212"/>
            </ButtonMenu>
            {
                title && (
                    <Title>{title}</Title>
                )
            }
        </Container>
    )
}
