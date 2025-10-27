import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #121212;
`;

export const Titulo = styled.Text`
  color: ${props => props.cor};
  font-size: 25px;
`;

export const Nome = styled.Text`
  color: #FFF;
  font-size: 20px;
  font-weight: bold
`;

export const Botao = styled.TouchableOpacity`
  width: 90%;  
  background-color: #DDD;
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const BotaoText = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: bold;
`;
