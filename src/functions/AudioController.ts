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
    await playBackObj.loadAsync({ uri: item.uri });
    await playBackObj.playAsync();

  } catch (error) {
    console.log('play function error: ' + error);
  }
};

//pause audio
export const pause = async () => {
  try {

  } catch (error) {   
    console.log('pause function error: ' + error);
  }
};

//resume audio
export const resume = async () => {
  try {

  } catch (error) {
    console.log('resume function error: ' +error);
  }
};

//select another audio
export const playNext = async (item: Audio) => {
    try {
    } catch (error) {
        console.log('Play next function error: ' +error);
    }
};
