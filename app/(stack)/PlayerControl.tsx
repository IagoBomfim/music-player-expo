import { useContext } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, Touchable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useSearchParams } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import PlayerButton from "@/components/PlayerButton";
import { PlayerButtonElipse } from '@/components/PlayerButtonElipse';

import { AudioContext } from "@/context/AudioProvaider";
import { useMusicStorage } from '@/stores/MusicStorage';

import Colors from "@/constants/defaultTheme";
import { pause, playNext } from "@/functions/AudioController";

const comverttime = (minutes: number) => {
    if (minutes) {
        const IsPont = minutes.toString().includes('.');

        const hrs = IsPont? minutes / 60 : parseFloat( minutes.toString().concat('.00')) / 60;
         const minute = hrs.toString().concat('.00').split('.')[0];
         const percent = parseInt(hrs.toString().concat('.00').split('.')[1].slice(0, 2));
         const sec = Math.ceil((60 * percent) / 100);

         if (parseInt(minute) < 10 && sec < 10) {
             return `0${minute}:0${sec}`
         }

         if (parseInt(minute) < 10) {
             return `0${minute}:${sec}`
         }

         if (sec < 10) {
             return `${minute}:0${sec}`
         }

         return `${minute}:${sec}`
    }
}

export default function PlayerControl() {
    const { IsPlaying } = useContext(AudioContext);
    const { CurrentMusic } = useMusicStorage();

    const { width } = Dimensions.get('window');

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

                <View className=" justify-center items-center w-full">
                    <Image source={require('assets/Images-default/vinyl.jpg')} style={{
                        marginHorizontal: 81,
                        marginVertical: 60,
                        width: 300,
                        height: 300
                    }} />
                </View>

                <View className="w-full justify-center items-center text-center">
                    <Text className="text-xl font-semibold" numberOfLines={1} style={{ color: Colors.grey5 }}>{CurrentMusic.filename}</Text>
                    <Text className="text-sm font-medium " numberOfLines={1} style={{ color: Colors.grey3 }} >file Name</Text>
                </View>

                <View className="my-0 mx-[24px] w-full mt-6">
                    <Slider
                        minimumValue={0}
                        maximumValue={CurrentMusic.duration}
                        value={0.3}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor={Colors.grey3}
                    ></Slider>
                    <View className="flex-row w-full justify-between px-4 mb-5">
                        <Text className={`text-sm text-green-100 `}>0:17</Text>
                        <Text className={`text-sm text-green-100 `}>{comverttime(CurrentMusic.duration)}</Text>
                    </View>
                </View>

                <View className={`w-full flex-row items-center justify-center my-[0px] mx-[24px] px-4`}>
                    <View className={`w-64 h-[55px] rounded-[54px] flex-row items-center justify-between px-5`} style={{ backgroundColor: Colors.secondary }}>
                        <PlayerButton iconType="PREV" iconColor={Colors.white} size={28} />

                        <View className={`w-[88px] h-[88px] rounded-[88px] items-center justify-center`} style={{ backgroundColor: Colors.background }} >
                            <PlayerButtonElipse circle={62.82} size={70}>
                                <PlayerButton iconType={IsPlaying ? 'PAUSE' : 'PLAY'} iconColor={Colors.white} size={30} />
                            </PlayerButtonElipse>
                        </View>

                        <PlayerButton iconType="NEXT" iconColor={Colors.white} size={28} />
                    </View>
                </View>

                <View className="my-9 mx-0 items-center justify-center">
                    <TouchableOpacity className="items-center justify-center ">
                        <Ionicons name="arrow-up" color={Colors.accent} size={20} />
                        <Text className="text-sm font-bold " style={{ color: Colors.accent }}>Lirics</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
