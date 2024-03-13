import { AVPlaybackStatus, Audio } from 'expo-av';

import { MusicProps, useMusicStorage } from "@/stores/MusicStorage";
import { useContextMusicStore } from '@/stores/MusicContextStore';

import { MusicPlay, pause, resume, playNext } from '@/functions/AudioController';
import { useEffect, useState } from 'react';

type ContextMusicStoreSoundObjProps = {
  SoundObj: AVPlaybackStatus | null;
}

export function useHandleAudioPress() {
  const ContextMusicStore = useContextMusicStore()
  const { CurrentMusic, add: MusicStorageAdd } = useMusicStorage();

  //@ts-ignore
  const [ContextMusicStoreSoundObj, setContextMusicStoreSoundObj] = useState<ContextMusicStoreSoundObjProps>(ContextMusicStore.SoundObj);
  
  const OnPressHandleAudioPress = async (MusicItem: MusicProps) => {
    try {
      //Play Music for the fist time.
      if (ContextMusicStoreSoundObj.SoundObj === null) {
        console.log('funcao play');
        console.log(ContextMusicStore.SoundObj);

        const PlayBackObj = new Audio.Sound();
        const Status = await MusicPlay(PlayBackObj, MusicItem)

        return (
          ContextMusicStore.UpdatePlayBackObj(PlayBackObj),
          ContextMusicStore.UpdateIsPlaying(true),
          MusicStorageAdd(MusicItem),
          //@ts-ignore
          ContextMusicStore.UpdateSoundObj(Status)
        )
      }

      //next play audio
      if (ContextMusicStore.SoundObj?.isLoaded && CurrentMusic.id !== MusicItem.id) {
        const status = await playNext(ContextMusicStore.PlayBackObj, MusicItem);

        return (
          MusicStorageAdd(MusicItem),
          ContextMusicStore.UpdateIsPlaying(true),
          //@ts-ignore
          ContextMusicStore.UpdateSoundObj(status)
        )
      }

      //pause music
      if (ContextMusicStore.SoundObj?.isLoaded && ContextMusicStore.SoundObj.isPlaying) {
        const status = await pause(ContextMusicStore.PlayBackObj);

        //@ts-ignore
        return (ContextMusicStore.UpdateIsPlaying(false),
          //@ts-ignore
          ContextMusicStore.UpdateSoundObj(status))
      }

      //resume audio
      if (ContextMusicStore.SoundObj?.isLoaded && !ContextMusicStore.SoundObj.isPlaying && CurrentMusic.id === MusicItem.id) {
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

  return { OnPressHandleAudioPress }
}