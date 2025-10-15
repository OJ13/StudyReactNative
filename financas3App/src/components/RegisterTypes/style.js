import styled from 'styled-components/native';

export const RegisterContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-left: 5%;
    padding-right: 5%;
`;

export const RegisterTypeButton = styled.TouchableOpacity`
    background-color: ${ props => props.checked ? '#FFF' : '#E7E7E7' };
    width: 47%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 45px;
    border-radius: 4px;
    border-width: 1.5px;
    border-color: ${ props => props.checked ? '#3B3DBF' : 'transparent' };
    margin-bottom: 14px;
`;

export const RegisterLabel = styled.Text`
    margin-left: 8px;
    font-size: 17px;
`;