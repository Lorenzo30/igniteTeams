import { Container,PropsBotaoContainer,BtnConfiguracao,BtnIniciar,TextIniciar, BtnMusic,ContainerBottom,ContainerBottom2} from "./styles";
import {TouchableOpacityProps} from "react-native"
import {MaterialIcons} from "@expo/vector-icons"
import { ButtonIcon } from "@components/ButtonIcon";

type Props = PropsBotaoContainer & TouchableOpacityProps &  {
  musicaAtiva:boolean
}

export function NikeRunClub ({musicaAtiva}:Props) {
   return (
     <Container>
      <ContainerBottom2>
         
       </ContainerBottom2>
       <ContainerBottom>
        <BtnConfiguracao>
              <ButtonIcon icon="celebration"/>
          </BtnConfiguracao>
          <BtnIniciar>
            <TextIniciar>INICIAR</TextIniciar>
          </BtnIniciar>
          <BtnMusic>
            <ButtonIcon icon="music-off"/>
          </BtnMusic>
       </ContainerBottom>
     </Container>
   );    
}