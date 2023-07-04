import { Audio } from "expo-av";

interface Audio {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

interface PlayProps {
    playBackObj: any;
    item: Audio;
}

const playBackObj = new Audio.Sound();

//play audio
export const play = async (item: Audio) => {
  try {
    return await playBackObj.loadAsync(
      { uri: item.uri },
      { shouldPlay: true }
    );

  } catch (error) {
    console.log('play function error: ' + error);
  }
};

//pause audio
export const pause = async () => {
  try {
    return await playBackObj.setStatusAsync({ shouldPlay: false });
  } catch (error) {   
    console.log('pause function error: ' + error);
  }
};

//resume audio
export const resume = async () => {
  try {
    return await playBackObj.playAsync();

  } catch (error) {
    console.log('resume function error: ' +error);
  }
};

//select another audio
export const playNext = async (item: Audio) => {
    try {
        await playBackObj.stopAsync()
        await playBackObj.unloadAsync()
       return await play(item)
    } catch (error) {
        console.log('Play next function error: ' +error);
    }
};
