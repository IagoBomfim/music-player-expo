import { useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import { useSearchParams } from "expo-router";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import { AudioContext } from "../../src/context/AudioProvaider";
import PlayerButton from "../components/PlayerButton";

export default function PlayerControl() {
    const { CurrentAudio, IsPlaying } = useContext(AudioContext);
    console.log(IsPlaying);
    
    const { width } = Dimensions.get('window');
    
    return (
    <View className='flex-1 pt-[48px] pl-2 bg-slate-400 justify-center'>
        <Text className="text-right p-3 text-xs"> 1 / 99</Text>
        <View className="flex-1 justify-center items-center w-full">
            <MaterialCommunityIcons name="music-circle" size={300} color='#000' />
        </View>
        <View className="pb-[50px]">
            <Text className="text-sm p-3 " numberOfLines={1}>file name</Text>
            <Slider 
                className={`w-[${width}] h-9 `}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#ffffff"
                maximumTrackTintColor="#000000"
            />
            <View className={`w-full flex-row content-center items-center justify-center`}>
                <PlayerButton iconType="PREV" />
                <PlayerButton  iconType="PLAY" />
                <PlayerButton iconType="NEXT" />
            </View>
        </View>

    </View>
    )
}

