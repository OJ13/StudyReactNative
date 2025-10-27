import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #e9ebf1ff;
    border-radius: 4px;
    margin-left: 10px;
    margin-rigth: 12px;
    margin-bottom: 14px;
    padding: 12px;
`;

export const Tipo = styled.View`
    flex-direction: row;
`;

export const IconView = styled.View`
    flex-direction: row;
    background-color: ${props => props.bg};
    border: 1px solid;
    border-radius: 10px;
    padding: 5px;
`;

export const TipoText = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-style: italic;
    font-weight: bold;
    margin-left: 10px;
`;

export const ValorText = styled.Text`
    color: #121212;
    font-size: 22px;
    margin-top: 5px;
`;
