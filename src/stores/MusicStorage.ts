import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AudioInMemory from './helpers/audio-in-memory';

export type MusicProps = {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

type StateProps = {
  CurrentMusic: MusicProps;
  add: (CurrentAudio: MusicProps) => void;
  UpdateCurrentMusic: () => void;
}

export const useMusicStorage = create(persist<StateProps>((set) => ({
  CurrentMusic: {} as MusicProps,
  add: (CurrentMusic: MusicProps) => set((state) => ({
    CurrentMusic: AudioInMemory.add(state.CurrentMusic, CurrentMusic)
  })),
  UpdateCurrentMusic: () => {}
}), { 
  name: "harmony-player:music",
  storage: createJSONStorage(() => AsyncStorage)
 }));