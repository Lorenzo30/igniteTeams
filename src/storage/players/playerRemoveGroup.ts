import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./playerStorageDTO";

export async function removePlayerGroup(player:PlayerStorageDTO,group:string){
  try {
    const groupsPlayers :PlayerStorageDTO[] = await playersGetByGroup(group);
    const playerRemove = groupsPlayers.filter(playerFilter => !(playerFilter.name === player.name && playerFilter.team === player.team));
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,JSON.stringify(playerRemove));
  } catch (error){
     throw error;
  }
}