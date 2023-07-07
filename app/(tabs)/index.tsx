import { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { AVPlaybackStatus, Audio } from 'expo-av';
 
import { AudioContext } from '../../src/context/AudioProvaider';
import AudioListItem from '../components/AudioListItem';
import OptionsModal from '../components/optionsModal';
import { play, pause, resume, playNext } from '../../src/functions/AudioController';

interface AudioProps {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

export default function TabOneScreen() {
  const { audioFiles, IsPlaying, UpdatePropsPlaying } = useContext(AudioContext);

  const [visible, setVisible] = useState(false);

  let  SoundObj: AVPlaybackStatus | undefined = undefined;
  let CurrentAudio: AudioProps;
  let StatusPlaying: 'off' | 'playing' | 'pause' = 'off';

  const handleAudioPress = async (item: AudioProps) => {

    const PlayBackObj = new Audio.Sound();
    try {
      if (IsPlaying === false && StatusPlaying === 'off') {
        const Status = await play(item)
        SoundObj = Status;
        CurrentAudio = item;
        StatusPlaying = 'playing';
  
        return UpdatePropsPlaying(true);
      }


      if (SoundObj?.isLoaded && IsPlaying && CurrentAudio.id === item.id && StatusPlaying === 'playing') {
        const status = await pause();
        SoundObj = status;
        StatusPlaying = 'pause';

        return UpdatePropsPlaying(false);
      }

      if (SoundObj?.isLoaded && !IsPlaying && CurrentAudio.id === item.id && StatusPlaying === 'pause') {
        const status = await resume()
        SoundObj = status;
        StatusPlaying = 'playing';

        return UpdatePropsPlaying(true);
      }

      if (SoundObj?.isLoaded && CurrentAudio.id !== item.id){
        const status = await playNext(item);

        SoundObj = status;
        StatusPlaying = 'playing';
        CurrentAudio = item;

        return UpdatePropsPlaying(true);
      }

    } catch (error) {
      
    }
    
}

  return (
    <View className='flex-1 pt-[48px] pl-2 bg-slate-400'>
      <FlashList
        data={audioFiles}
        renderItem={({ item }) => {
          return <AudioListItem data={item} onOptionsPress={() => {setVisible(true)}} onAudioPress={() => handleAudioPress(item)} />
        }}
        estimatedItemSize={800}
      />
    </View>
  );
}