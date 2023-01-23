import {ContainerTeste,IconCalculator,BotaoTeste,TitleBotaoTeste} from "./style"
import {TouchableOpacityProps} from "react-native"

type Props = TouchableOpacityProps &  {
  showIcon?:boolean
}

export function Teste ({showIcon = true,...rest} : Props) {
  return (
    <ContainerTeste>
      {     
           showIcon &&
          <IconCalculator />
      }
     <BotaoTeste {...rest} >
       <TitleBotaoTeste>
          teste
       </TitleBotaoTeste>
     </BotaoTeste>
    </ContainerTeste>
  )
}