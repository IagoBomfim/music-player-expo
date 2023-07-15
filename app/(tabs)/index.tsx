import { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { AVPlaybackStatus, Audio } from 'expo-av';
 
import { AudioContext } from '../../src/context/AudioProvaider';
import AudioListItem from '../components/AudioListItem';
import OptionsModal from '../components/optionsModal';
import { play, pause, resume, playNext } from '../../src/functions/AudioController';
import { GetMetaDados } from '../../src/functions/functions';
import FloatingButton from '../components/FloatingButton';

interface AudioProps {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

export default function TabOneScreen() {
  const { audioFiles, IsPlaying, UpdatePropsPlaying, CurrentAudio } = useContext(AudioContext);

  const [visible, setVisible] = useState(false);

  let  SoundObj: AVPlaybackStatus | undefined = undefined;
  let StatusPlaying: 'off' | 'playing' | 'pause' = 'off';

  IsPlaying ? StatusPlaying = 'playing' : StatusPlaying = 'off';

  const handleAudioPress = async (item: AudioProps) => {
    console.log(item.filename);
    
    const PlayBackObj = new Audio.Sound();
    try {
      //play
      if (IsPlaying === false && StatusPlaying === 'off') {
        const Status = await play(item)
        SoundObj = Status;
        StatusPlaying = 'playing';
        GetMetaDados(item.uri, item.id);
  
        return UpdatePropsPlaying(true, item);
      }

      //next play
      if (SoundObj?.isLoaded && CurrentAudio.id !== item.id && StatusPlaying === 'playing'){
        const status = await playNext(item);

        SoundObj = status;
        StatusPlaying = 'playing';

        return UpdatePropsPlaying(true, item);
      }
      
      //pause
      if (SoundObj?.isLoaded && IsPlaying && CurrentAudio.id === item.id && StatusPlaying === 'playing') {
        const status = await pause();
        SoundObj = status;
        StatusPlaying = 'pause';

        return UpdatePropsPlaying(false, item);
      }

      //resume
      if (SoundObj?.isLoaded && !IsPlaying && CurrentAudio.id === item.id && StatusPlaying === 'pause') {
        const status = await resume()
        SoundObj = status;
        StatusPlaying = 'playing';

        return UpdatePropsPlaying(true, item);
      }

    } catch (error) {
      
    }
    
}

  return (
    <View className='flex-1 pt-[48px] pl-2 bg-slate-400'>
      <FlashList
        data={audioFiles}
        renderItem={({ item }) => {
          return <AudioListItem 
          data={item} 
          onOptionsPress={() => {setVisible(true)}} onAudioPress={() => handleAudioPress(item)}
           />
        }}
        estimatedItemSize={800}
      />
      {/* <FloatingButton /> */}
    </View>
  );
}