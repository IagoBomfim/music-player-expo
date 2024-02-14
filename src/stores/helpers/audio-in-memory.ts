import { MusicProps } from "../MusicStorage";

export function add(Music:MusicProps, NewMusic: MusicProps) {
  const existingAudio = Music.id === NewMusic.id;

  if (existingAudio) {
    return Music
  } else {
   return NewMusic
  }
}