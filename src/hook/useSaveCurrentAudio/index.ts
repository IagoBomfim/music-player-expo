import AsyncStorage from '@react-native-async-storage/async-storage';

interface Audio {
    id: string;
    uri: string;
    filename: string;
    duration: number;
}

type useSaveCurrentAudioProps = {
    Data: Audio;
}

export const useSaveCurrentAudio = ({ Data }: useSaveCurrentAudioProps) => {
    const storageData = AsyncStorage.setItem('@HarmonyPlayer-CurrentAudio', JSON.stringify(Data))
        .then(() => console.log('arquivo salvo com sucesso'))
        .catch((error) => console.log('Inpossivel salvar o arquivo em local storare: ', error));
        
    return storageData;
}