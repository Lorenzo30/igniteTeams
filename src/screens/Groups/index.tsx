import { Header } from '@components/header';

import { FlatList } from 'react-native';

import { useNavigation,useFocusEffect } from '@react-navigation/native';

import { HightLight } from '@components/HightLight';
import { Container } from './styles';
import { GroupsCard } from '@components/GroupCard';

import {useEffect, useState,useCallback} from "react";
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupGetAll';
import { Loading } from '@components/loading';



export function Groups() {
  
  const [groups,setGroups] = useState<string[]>([]);
  const  [isLoading,setIsLoading] = useState(true);
  const navigation = useNavigation();
  
  function handleNewGroup(){
    navigation.navigate("new");  
  }

  function handleOpenGroup(group:string){
    navigation.navigate('players',{group})
  }

  async function fetchGroups(){
    try {
       setIsLoading(true);
       const data = await groupsGetAll();
       setGroups(data);
    } catch (error){
       console.log(error);
    } finally {
      setIsLoading(false);
    }
 }


 useFocusEffect(useCallback(() => {
    fetchGroups();
 },[]))


  return (
    <Container>
      <Header />
      <HightLight 
         title='turmas'
         subTitle='Jogue com a sua turma'
      />
      
      {
        isLoading ? <Loading /> : 

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupsCard 
            title={item}
            onPress={() => handleOpenGroup(item)}
            />
        )}
        contentContainerStyle={groups.length === 0 && {flex:1}}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira pergunta?"/>}
        showsVerticalScrollIndicator={false}
      />
        }
      <Button title='Criar nova turma' 
      onPress={handleNewGroup}
      /> 
    </Container>
  );
}
