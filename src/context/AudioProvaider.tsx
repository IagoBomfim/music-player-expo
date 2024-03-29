import { createContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { AVPlaybackStatus } from 'expo-av';

interface Audio {
    id: string;
    uri: string;
    filename: string;
    duration: number;
    modificationTime: number;

}

interface PlayList {}

interface AudioProvaiderTypes {
    audioFiles: Audio[];
    IsPlaying: boolean;
    UpdatePropsPlaying: (UpdateIsPlaying: boolean, UpateCurrentAudioData: Audio) => any;
    CurrentAudio: Audio;
}

export const AudioContext = createContext<AudioProvaiderTypes>({} as AudioProvaiderTypes)

export function AudioProvaider({ children }: {children: ReactNode }) {

    const [audioFiles, setAudioFiles] = useState<Audio[]>([]);
    const [PermissionError, setPermissionError] = useState(false);

    let IsPlaying: boolean = false;
    let CurrentAudio: Audio = {} as Audio;

    useEffect(() => {
        getPermission();
    }, []);

    const permissionAlert = () => {
        Alert.alert('Permission required', 'this app needs to read audio files from device', [{
            text: 'I am ready',
            onPress: () => getPermission()
        }, {
            text: 'cancelar',
            onPress: () => permissionAlert()
        }]);
    };

    const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });

        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
            sortBy: 'modificationTime',
        });

        setAudioFiles([...audioFiles, ...media.assets]);
    };

    const getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            // get all files audio
            getAudioFiles();
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

            //@ts-ignore
            if (status === 'danied' && canAskAgain) {
                permissionAlert();
            }

            if (status === 'granted') {
                //get all audio files
                getAudioFiles();
            }

            //@ts-ignore
            if (status === 'danied' && !canAskAgain) {
                permissionAlert();
            }
        }
    };

    const UpdatePropsPlaying = (UpdateIsPlaying: boolean, UpateCurrentAudioData: Audio) => {
        //@ts-ignore

        return (
            IsPlaying = UpdateIsPlaying,
            CurrentAudio = UpateCurrentAudioData
        )
        
    }

    return (
        <AudioContext.Provider value={{audioFiles: audioFiles, IsPlaying, UpdatePropsPlaying, CurrentAudio}}>
            {children}
        </AudioContext.Provider>
    );
}
