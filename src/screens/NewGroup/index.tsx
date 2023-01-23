import { Button } from "@components/Button";
import { Header } from "@components/header";
import { HightLight } from "@components/HightLight";
import { Container,Content,Icon } from "./styles";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { generateTeam } from "@utils/gerarTime";
import { AppError } from "@utils/AppError";


export function NewGroup(){

const [group,setGroup] = useState('')

 const navigation = useNavigation();
 
 async function handleNew(){
   try {
      
      if (group.trim().length === 0) {
         alert("Informe o nome da turma");
      }

      await groupCreate(group);
      navigation.navigate("players",{group});
   } catch (error){
      if (error instanceof AppError) {
        alert("Novo grupo"+error.message);
      } else {
         console.log(error)
      }
   }
 }


  return (
     <Container>
        <Header showBackButton/>
        <Content>
           <Icon />
           <HightLight 
             title="Nova turma"
             subTitle="Crie a turma para adicionar as pessoas"
           />
           <Input placeholder="Nome da turma" onChangeText={setGroup} />

           <Button
              title="Criar"
              style={{marginTop:20}}
              onPress={handleNew}
           />
        </Content>
     </Container>
  );
}