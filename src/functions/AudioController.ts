import { AVPlaybackStatus, Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

interface Audio {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

//play audio
export const MusicPlay = async (playBackObj: Audio.Sound, item: Audio) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      playsInSilentModeIOS: true
    })

    const Status: AVPlaybackStatus = await playBackObj.loadAsync({ uri: item.uri }, { shouldPlay: true });
    

    return Status;
  } catch (error) {
    console.log('play function error: ' + error);
  }
};

//pause audio
export const pause = async (playBackObj: Audio.Sound) => {
  console.log('funcao pause');
  try {
    const status = await playBackObj.pauseAsync()

    return status
  } catch (error) {   
    console.log('pause function error: ' + error);
  }
};

//resume audio
export const resume = async (playBackObj: Audio.Sound) => {

  console.log('funcao resume');
  
  try {
    const status =  await playBackObj.playAsync();

    return status;
  } catch (error) {
    console.log('resume function error: ' +error);
  }
};

//select another audio
export const playNext = async (playBackObj: Audio.Sound, item: Audio) => {
    try {
      await playBackObj.stopAsync();
      await playBackObj.unloadAsync();
      
      const status = await MusicPlay(playBackObj, item);

      return status;
    } catch (error) {
        console.log('Play next function error: ' +error);
    }
};
