import { useContext, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { AudioContext } from '@/context/AudioProvaider';
import { useContextMusicStore } from "@/stores/MusicContextStore";
import { useMusicStorage } from '@/stores/MusicStorage';

import AudioListItem from '@/components/AudioListItem';

import Colors from '@/constants/defaultTheme';
import { useHandleAudioPress } from '@/functions/usehandleAudioPress';

export default function SoundScreen() {
  const { audioFiles } = useContext(AudioContext);
  const { OnPressHandleAudioPress } = useHandleAudioPress()

  const [visible, setVisible] = useState(false);

  return (
    <View className='flex-1  pl-2' style={{ backgroundColor: Colors.background }}>
      <FlashList
        renderItem={({ item }) => {
          return <AudioListItem 
          data={item} 
          onOptionsPress={() => {setVisible(true)}} onAudioPress={() => OnPressHandleAudioPress(item)}
           />
        }}
        estimatedItemSize={72}
        data={audioFiles}
      />
      {/* <FloatingButton /> */}
    </View>
  );
}