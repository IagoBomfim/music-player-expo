import { AVPlaybackStatus, Audio } from "expo-av";

export function add(IsPlaying: boolean, NewIsPlaying: boolean) {
   if (IsPlaying === NewIsPlaying) {
      return IsPlaying;
   } else {
      return NewIsPlaying;
   }
}

export function UpdatePlayBackObjFunction(PlayBackObj:Audio.Sound, newPlayBackObj:Audio.Sound) {
   return newPlayBackObj;
}

export function UpdateSoundObjFunction(SoundObj: AVPlaybackStatus | null, newSoundObj: AVPlaybackStatus | null) {
   if (SoundObj === null) {
      return newSoundObj;

   } else if (SoundObj === newSoundObj) {
      return SoundObj;
      
   } else {
      return newSoundObj;
   }
}