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
    <View className='flex-1 pt-[48px] items-center' style={{ backgroundColor: Colors.background }}>
        <View className=" flex-row justify-between p-2 items-center w-full">
            <TouchableOpacity onPress={useNavigation().goBack}>
                <Ionicons name="ios-arrow-back" size={30} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Ionicons name="ios-menu" size={30} color={Colors.white} />
            </TouchableOpacity>
        </View>

        <View className=" justify-center items-center w-full mx-[81px] my-[60]">
            <MaterialCommunityIcons name="music-circle" size={260} color='#fff' />
        </View>

        <View className="w-full justify-center items-center text-center">
            <Text className="text-xl font-semibold" numberOfLines={1} style={{ color: Colors.grey5 }}>Thunder</Text>
            <Text className="text-sm font-medium " numberOfLines={1} style={{ color: Colors.grey3 }} >file name</Text>
        </View>

        <View className="my-0 mx-[24px] w-full mt-6">
            <Slider
                minimumValue={0}
                maximumValue={1}
                value={0.3}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.grey3}
            ></Slider>
            <View className="flex-row w-full justify-between px-4 mb-5">
                <Text className={`text-sm text-green-100 `}>0:17</Text>
                <Text className={`text-sm text-green-100 `}>2:37</Text>
            </View>
        </View>

        <View className={`w-full flex-row items-center justify-center my-[0px] mx-[24px] px-4`}>
                <View className={`w-64 h-[55px] rounded-[54px] flex-row items-center justify-between px-5`} style={{ backgroundColor: Colors.secondary }}>
                    <PlayerButton iconType="PREV" iconColor={Colors.white} size={28} />
                    <View className={`w-[88px] h-[88px] rounded-[88px]`} style={{ backgroundColor: Colors.background}} ></View>
                    <PlayerButton iconType="NEXT" iconColor={Colors.white} size={28} />
                </View>
            </View>
    </View>
    </>
    )
}

// <PlayerButton iconType={IsPlaying? 'PAUSE' : 'PLAY'} iconColor={Colors.white} size={30} />