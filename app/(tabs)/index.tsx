import { useContext, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { AVPlaybackStatus } from 'expo-av';
 
import { AudioContext } from '../../src/context/AudioProvaider';
import AudioListItem from '../components/AudioListItem';
import OptionsModal from '../components/optionsModal';
import { play, pause, resume, playNext } from '../../src/functions/AudioController';

interface Audio {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

export default function TabOneScreen() {
  const { audioFiles, UpdateStates, currentAudio, soundObj, isPlayingAudio } = useContext(AudioContext);

  const [visible, setVisible] = useState(false);

  const handleAudioPress = async (item: Audio) => {
    //playing audio for the fist time
    if (soundObj === undefined && isPlayingAudio === false) {
      const status = await play(item);
      UpdateStates({ 
        UpdateCurrentAudio: item,
        UpdateSoundObj: status,
        UpdateIsPlayingAudio: true
      })   
  }

  //pause audio
  if (soundObj?.isLoaded && soundObj.isPlaying) {
    const status = await pause();
    UpdateStates({ UpdateSoundObj: status, UpdateCurrentAudio: item, UpdateIsPlayingAudio: false }); 
    console.log('passou aqui: pause function');
     
  }

  //resume audio
  if (soundObj?.isLoaded && !soundObj.isPlaying && currentAudio.id === item.id) {
      const status = await resume();
      UpdateStates({ UpdateSoundObj: status, UpdateCurrentAudio: item, UpdateIsPlayingAudio: true }); 
      console.log('passou aqui: resume function'); 
    }

    //select another audio

    if (soundObj?.isLoaded && currentAudio.id !== item.id) {
      const status = await playNext(item);
      UpdateStates(
        {
          UpdateSoundObj: status,
          UpdateCurrentAudio: item,
          UpdateIsPlayingAudio: true
        }
      )
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