import { AVPlaybackStatus, Audio } from 'expo-av';

import { MusicPlay, pause, resume, playNext } from '@/functions/AudioController';

type AudioProps = {
    id: string;
    uri: string;
    filename: string;
    duration: number;
}

type ContextMusicStoreProps = {
    IsPlaying: boolean;
    PlayBackObj: Audio.Sound;
    SoundObj: AVPlaybackStatus | null;
    UpdateIsPlaying: (IsPlaying: boolean) => void;
    UpdatePlayBackObj: (PlayBackObj: Audio.Sound ) => void;
    UpdateSoundObj: (SoundObj:AVPlaybackStatus ) => void;
}

type MusicStorageProps = {
    CurrentMusic: AudioProps;
    add: (CurrentAudio: AudioProps) => void;
    UpdateCurrentMusic: () => void;
}

interface handleAudioPressProps {
    item: AudioProps;
    MusicStorage: MusicStorageProps;
    ContextMusicStore: ContextMusicStoreProps;
}

 const handleAudioPress = async ({ item: MusicItem, MusicStorage, ContextMusicStore }: handleAudioPressProps) => {  
    try {
        //Play Music for the fist time.
        if (ContextMusicStore.SoundObj === null) {
            console.log('funcao play');

            const PlayBackObj = new Audio.Sound();
            const Status = await MusicPlay(PlayBackObj, MusicItem)

            return (
                ContextMusicStore.UpdatePlayBackObj(PlayBackObj),
                ContextMusicStore.UpdateIsPlaying(true),
                MusicStorage.add(MusicItem),
                //@ts-ignore
                ContextMusicStore.UpdateSoundObj(Status)
            )
        }

        //next play audio
        if (ContextMusicStore.SoundObj.isLoaded && MusicStorage.CurrentMusic.id !== MusicItem.id) {
            const status = await playNext(ContextMusicStore.PlayBackObj, MusicItem);

            return (
                MusicStorage.add(MusicItem),
                ContextMusicStore.UpdateIsPlaying(true),
                //@ts-ignore
                ContextMusicStore.UpdateSoundObj(status)
            )
        }

        //pause music
        if (ContextMusicStore.SoundObj.isLoaded && ContextMusicStore.SoundObj.isPlaying) {
            const status = await pause(ContextMusicStore.PlayBackObj);

            //@ts-ignore
            return (ContextMusicStore.UpdateIsPlaying(false),
                //@ts-ignore
                ContextMusicStore.UpdateSoundObj(status))
        }

        //resume audio
        if (ContextMusicStore.SoundObj.isLoaded && !ContextMusicStore.SoundObj.isPlaying && MusicStorage.CurrentMusic.id === MusicItem.id) {
            const status = await resume(ContextMusicStore.PlayBackObj)

            //@ts-ignore
            return (ContextMusicStore.UpdateIsPlaying(true),
                //@ts-ignore
                ContextMusicStore.UpdateSoundObj(status))
        }


    } catch (error) {
        console.log(error);
    }
}

export { handleAudioPress }