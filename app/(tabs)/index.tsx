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
  const { audioFiles } = useContext(AudioContext);

  const [visible, setVisible] = useState(false);

  let isPlaying = false;

  const handleAudioPress = async (item: AudioProps) => {
    try {
      if (isPlaying === false) {
        play(item)
        isPlaying = true
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