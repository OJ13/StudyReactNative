import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: #F0F4FF;
   align-items: center;
   margin-top: 14px;
`;

export const Message = styled.Text`
   font-size: 18px;
   font-weight: bold;
   margin-top: 14px;
`;

export const Name = styled.Text`
   font-size: 24px;
   font-weight: bold;
   margin-bottom: 24px;
   margin-top: 10px;
   padding: 0 14px;
   color: #121212;
`;

export const NewLink = styled.TouchableOpacity`
   background-color: #3b3dbf;
   width: 90%;
   height: 45px;
   border-radius: 8px;
   align-items: center;
   justify-content: center;
   margin-bottom: 14px;
`;

export const NewText = styled.Text`
   font-size: 18px;
   font-weight: bold;
   color: #FFF;
`;

export const LogoutButton = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
   width: 90%;
   height: 45px;
   border-width: 1px;
   border-radius: 8px;
`;

export const LogoutText = styled.Text`
   font-size: 18px;
   font-weight: bold;
   color: #ff0000ff;
`;
