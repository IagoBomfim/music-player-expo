import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useStatusPlayng = () => {
    const getCurrentAudio = async () => {
        try {
            return await AsyncStorage.getItem('@HarmonyPlayer-CurrentAudio')
        } catch (error) {
            console.log(error);
        }
    };
    const getIsPlayngStatus = (IsPlayng: boolean) => {
        const [PlayngStatus, setPlayngStatus] = useState(IsPlayng);
        setPlayngStatus(IsPlayng);
        
        return PlayngStatus;
    };

    return { getCurrentAudio, getIsPlayngStatus }
}