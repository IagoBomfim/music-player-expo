import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as AsyncStorage from '@react-native-async-storage/async-storage'

import { AVPlaybackStatus, Audio } from 'expo-av';

import * as MusicInContextStore from './helpers/music-in-context-store';

type contextProps = {
  IsPlaying: boolean;
  PlayBackObj: Audio.Sound;
  SoundObj: AVPlaybackStatus | null ;
  UpdateIsPlaying: (IsPlaying: boolean) => void;
  UpdatePlayBackObj: (PlayBackObj: Audio.Sound ) => void;
  UpdateSoundObj: (SoundObj:AVPlaybackStatus ) => void;
}

export const useContextMusicStore = create<contextProps>((set) => ({
  IsPlaying: false,
  PlayBackObj: {} as Audio.Sound,
  SoundObj: null,
  UpdateIsPlaying: (IsPlaying: boolean) => set((state) => ({
    IsPlaying: MusicInContextStore.add(state.IsPlaying, IsPlaying)
  })),
  UpdatePlayBackObj: ( PlayBackObj: Audio.Sound ) => set((state) => ({
    PlayBackObj: MusicInContextStore.UpdatePlayBackObjFunction(state.PlayBackObj, PlayBackObj)
  })),
  UpdateSoundObj: ( SoundObj: AVPlaybackStatus ) => set((state) => ({
    SoundObj: MusicInContextStore.UpdateSoundObjFunction(state.SoundObj, SoundObj)
  })),
}))