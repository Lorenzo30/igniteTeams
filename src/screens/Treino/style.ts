import style from "styled-components/native";
import {Calculator} from "phosphor-react-native"
import { TouchableOpacity } from "react-native";

export const ContainerTeste = style.View`
flex:1;
background-color:${({theme}) => theme.COLORS.RED}
`;

export const IconCalculator = style(Calculator).attrs(({theme}) => ({
    size:32,
    color:theme.COLORS.WHITE
 }))``;

 export const BotaoTeste = style(TouchableOpacity)`
 background-color:#fff;
 width:100%;
 `;

 export const TitleBotaoTeste = style.Text`
  color:red
 `;