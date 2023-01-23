import { TouchableOpacity } from "react-native";
import styled from "styled-components/native"


export type PropsBotaoContainer = {
  corFundoBotao:string
}

export const Container = styled.View`
width:100%;
padding:10px;
flex:1;
aling-items:center;
flex-direction:column;
`;

export const BtnConfiguracao = styled(TouchableOpacity)`
width:50px;
height:50px;
border-radius:25px;
background-color:yellow;
align-items:center;
justify-content:center;
`;

export const BtnIniciar = styled(TouchableOpacity)`
width:100px;
height:100px;
background-color:yellow;
justify-content:center;
align-items:center;
border-radius:50px;
margin-left:20px;
margin-right:20px;
`;

export const TextIniciar = styled.Text` 
text
`;

export const BtnMusic = styled(TouchableOpacity)`
width:50px;
height:50px;
border-radius:25px;
background-color:yellow;
justify-content:center;
align-items:center;
`;

export const ContainerBottom = styled.View`
flex-direction:row;
justify-content:center;
align-items:center;
align-self:flex-end;
`;

export const ContainerBottom2 = styled.View`
flex-direction:row;
justify-content:center;
align-self:flex-start;
align-items:center;
width:200px;
background-color:red;
height:100px;
flex:none;
`;
