
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { Teste } from "@screens/Treino";
import {ThemeProvider} from 'styled-components/native';
import { Loading } from "@components/loading";
import theme from "./src/theme/index"
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';
import {useFonts,Roboto_400Regular,Roboto_700Bold} from "@expo-google-fonts/roboto"
import { NikeRunClub } from '@components/TesteButton';

export default function App() {
  
  const [fontsLoaded] = useFonts({Roboto_400Regular,Roboto_700Bold});

  return (
    <ThemeProvider theme={theme}>
         <StatusBar 
           barStyle="light-content"
           backgroundColor="transparent"
           translucent
         />
         { fontsLoaded ? <NikeRunClub musicaAtiva={false} /> : <Loading />  }
    </ThemeProvider>
  );
}
