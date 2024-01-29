import { View, TouchableOpacity, Text } from 'react-native';

export default function FloatingButton(){
    return (
        <View className='ml-5 mr-5 flex-row content-between items-start absolute bottom-11 left-0 z-[1] bg-transparent'>
            <View className='w-full h-16 rounded-[84px] flex-row content-between items-start'></View>
        </View>
    )
}