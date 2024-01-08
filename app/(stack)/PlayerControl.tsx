import { useContext } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation, useSearchParams } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import { AudioContext } from "../../src/context/AudioProvaider";
import PlayerButton from "../components/PlayerButton";
import Colors from "../../src/constants/defaultTheme";
import { StatusBar } from "expo-status-bar";
import { pause } from "../../src/functions/AudioController";

export default function PlayerControl() {
    const { CurrentAudio, IsPlaying } = useContext(AudioContext);
    console.log(IsPlaying);
    
    const { width } = Dimensions.get('window');

    pause()
    
    return (
        <>
        <StatusBar style="light" />
    <View className='flex-1 pt-[48px] pl-2 justify-center' style={{ backgroundColor: Colors.background }}>
        <View className=" flex-row justify-between items-center ">
            <TouchableOpacity onPress={useNavigation().goBack}>
                <Ionicons name="ios-arrow-back" size={23} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Ionicons name="ios-menu" size={23} color={Colors.white} />
            </TouchableOpacity>
        </View>

        <View className="flex-1 justify-center items-center w-full">
            <MaterialCommunityIcons name="music-circle" size={300} color='#000' />
        </View>

        <View className="pb-[50px]">
            <Text className="text-xl p-3 font-semibold " numberOfLines={1} style={{ color: Colors.grey5 }}>Thunder</Text>
            <Text className="text-sm p-3 font-medium " numberOfLines={1} style={{ color: Colors.grey3 }} >file name</Text>
            <Slider 
                className={`w-[${width}] h-9 `}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#ffffff"
                maximumTrackTintColor="#000000"
            />
            <View className={`w-full flex-row content-center items-center justify-center`}>
                <PlayerButton iconType="PREV" iconColor={Colors.white} />
                <PlayerButton  iconType={IsPlaying? 'PLAY' : 'PAUSE' } iconColor={Colors.white} />
                <PlayerButton iconType="NEXT" iconColor={Colors.white} />
            </View>
        </View>
    </View>
    </>
    )
}

