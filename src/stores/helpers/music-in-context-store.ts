import { AVPlaybackStatus, Audio } from "expo-av";

export function add(IsPlaying: boolean, NewIsPlaying: boolean) {

   return NewIsPlaying;
}

export function UpdatePlayBackObjFunction(PlayBackObj:Audio.Sound, newPlayBackObj:Audio.Sound) {
   return newPlayBackObj;
}

export function UpdateSoundObjFunction(SoundObj: AVPlaybackStatus | null, newSoundObj: AVPlaybackStatus | null) {
   return newSoundObj;
}