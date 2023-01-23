import { Header } from "@components/header";
import { HightLight } from "@components/HightLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Container,Form, HeaderList, NumberOfPlayers } from "./styles";
import { Input } from "@components/Input";
import { IconGoogleAcessHistory, TesteBotao } from "@components/TesteButton";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useState,useEffect,useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroup } from "@storage/players/playersGetByGroup";
import { playersGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";

import { PlayerStorageDTO } from "@storage/players/playerStorageDTO";
import { removePlayerGroup } from "@storage/players/playerRemoveGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/loading";

type RouteParams = {
  group:string
}

export function Players () {
   
   const  [isLoading,setIsLoading] = useState(true);
   const [team,setTeam] = useState("TIME A");
   const [newPlayerName,setNewPlayerName] = useState("");
   const [players,setPlayers] = useState<PlayerStorageDTO[]>([])

   const route = useRoute();//acessa parametros passados para essa tela
   const {group} = route.params as RouteParams

   const newPlayerNameInputRef = useRef<TextInput>(null);

   const navigation = useNavigation();


   useEffect(() => {
      fetchPlayersByTeam();
   },[team]);
    

   async function fetchPlayersByTeam(){
     try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group,team);
      setPlayers(playersByTeam);
     } catch (error) {
        console.log(error);
        Alert.alert("Pessoas","Não foi possivel carregar as pessoas");
     } finally {
       setIsLoading(false);
     }
   }


   async function handleRemovePlayer(player:PlayerStorageDTO){
       try {
          await removePlayerGroup(player,group);
          fetchPlayersByTeam();
       } catch (error) {
          Alert.alert("Não foi possivel remover");
          console.log(error);
       }
   }

   async function groupRemove(){
      try {
         await groupRemoveByName(group);
         navigation.navigate("Groups");
      } catch (error) {
        console.log(error);
        Alert.alert("Remover groupo","Não foi possivel remover o grupo!")
      }
   }

   async function handleGroupRemove(){
     Alert.alert('Remover','Deseja remover o grupo',[
       {
         "text":"Não",style:"cancel"
       },
       {
        "text":"Sim",
        onPress:() => groupRemove()
       }
     ])
   }

   async function handleAddPlayer(){
    if (newPlayerName.trim().length == 0) {
       return Alert.alert("Nova pessoa","Informe o nome da pessoa para adicionar");
    }

    const newPlayer = {
      name:newPlayerName,
      team
    }
   
    try {

      await playerAddByGroup(newPlayer,group);
      setNewPlayerName("");
      newPlayerNameInputRef.current?.blur();
      fetchPlayersByTeam();

    } catch (error) {
       if (error instanceof AppError) {
          Alert.alert("Nova pessoa",error.message)
       } else {
         console.log(error);
         Alert.alert("Nova pessoa","Não foi possivel adicionar")
       }
    }

  }

    return (
      <Container>
        <Header showBackButton />
        <HightLight title={group}  subTitle="Adicione a galera e separe os times"/>
         
        <Form>
          <Input 
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome de pessoa"
          autoCorrect={false}
          onSubmitEdit={handleAddPlayer}
          returnKeyType="done"
          />

          <ButtonIcon icon="add" onPress={handleAddPlayer} />

        </Form>
        
        <HeaderList>
          <FlatList 
          data={["TIME A","TIME B"]}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter title={item} isActive={item === team} onPress={() => setTeam(item)}/>
          )}
          horizontal
          />
          <NumberOfPlayers>
            {players.length}
          </NumberOfPlayers>
        </HeaderList>
        {
          isLoading ? <Loading /> : 
          <FlatList 
            data={players} 
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item)} />
            )}
            ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time"/>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{paddingBottom:100},players.length === 0 && {flex:1}
            ]}
            />
        }

          <Button title="Remover turma" type="SECONDARY" onPress={handleGroupRemove}/>
  
      </Container>
    );
}