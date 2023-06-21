import { useContext, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
 
import { AudioContext } from '../../src/context/AudioProvaider';
import AudioListItem from '../components/AudioListItem';
import OptionsModal from '../components/optionsModal';

export default function TabOneScreen() {

  const { audioFiles } = useContext(AudioContext);
  const [visible, setVisible] = useState(false);

  return (
    <View className='flex-1 pt-[48px] pl-2 bg-slate-400'>
      <FlashList
        data={audioFiles}
        renderItem={({ item }) => {
          return <AudioListItem data={item} onOptionsPress={() => {
            setVisible(true)

          }}/>
        }}
        estimatedItemSize={800}
      />
    </View>
  );
}