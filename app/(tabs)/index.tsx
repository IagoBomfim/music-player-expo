import { useContext, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { AVPlaybackStatus, Audio } from 'expo-av';
 
import { AudioContext } from '@/context/AudioProvaider';
import AudioListItem from '@/components/AudioListItem';
import { play, pause, resume, playNext } from '@/functions/AudioController';
import { GetMetaDados } from '@/functions/functions';
import Colors from '@/constants/defaultTheme';

import { useMusicStorage } from '@/stores/MusicStorage';
import { useContextMusicStore } from '@/stores/MusicContextStore';

interface AudioProps {
  id: string;
  uri: string;
  filename: string;
  duration: number;
  modificationTime: number;
}

export default function SoundScreen() {
  const { audioFiles } = useContext(AudioContext);

  const { add: CurrentMusicStorageAdd, CurrentMusic } = useMusicStorage();
  const ContextMusicStore = useContextMusicStore();

  const [visible, setVisible] = useState(false);

  const handleAudioPress = async (item: AudioProps) => {
    console.log(ContextMusicStore.SoundObj);
    
    try {
      //Play Music for the fist time.
      if(ContextMusicStore.SoundObj === null) {
        const PlayBackObj = new Audio.Sound();
        const status = await play(PlayBackObj, item);
        
          return (
            ContextMusicStore.UpdatePlayBackObj(PlayBackObj),
            ContextMusicStore.UpdateIsPlaying(true),
            CurrentMusicStorageAdd(item),
            ContextMusicStore.UpdateSoundObj(status)
          )
      }

      //resume audio
      if (ContextMusicStore.SoundObj.isLoaded && CurrentMusic.id !== item.id) {
        const status = await playNext(ContextMusicStore.PlayBackObj, item);

        return (
          CurrentMusicStorageAdd(item),
          ContextMusicStore.UpdateIsPlaying(true),
          ContextMusicStore.UpdateSoundObj(status)
        ) 
      }

      //pause music
      if (ContextMusicStore.SoundObj.isLoaded && ContextMusicStore.SoundObj.isPlaying) {
        const status = await pause(ContextMusicStore.PlayBackObj);

        //@ts-ignore
        return (ContextMusicStore.UpdateIsPlaying(false), 
        ContextMusicStore.UpdateSoundObj(status))
      }

      //resume audio
      if (ContextMusicStore.SoundObj.isLoaded && !ContextMusicStore.SoundObj.isPlaying && CurrentMusic.id === item.id){
        const status = await resume(ContextMusicStore.PlayBackObj)

        //@ts-ignore
        return ( ContextMusicStore.UpdateIsPlaying(true), 
        ContextMusicStore.UpdateSoundObj(status))
      }


    } catch (error) {
      console.log(error);
    }
}

  return (
    <View className='flex-1  pl-2' style={{ backgroundColor: Colors.background }}>
      <FlashList
        renderItem={({ item }) => {
          return <AudioListItem 
          data={item} 
          onOptionsPress={() => {setVisible(true)}} onAudioPress={() => handleAudioPress(item)}
           />
        }}
        estimatedItemSize={72}
        data={audioFiles}
      />
      {/* <FloatingButton /> */}
    </View>
  );
}