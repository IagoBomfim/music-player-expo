import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "../../src/constants/defaultTheme";

interface Audio {
  id: string;
  uri: string;
  filename: string;
  duration: number;
}

interface AudioProps {
  data: Audio;
  onOptionsPress: any;
  onAudioPress: () => void;
}


const comverttime = (minutes: number) => {
  if (minutes) {
      const hrs = minutes/60;
      const minute = hrs.toString().split('.')[0];
      const percent = parseInt(hrs.toString().split('.')[1].slice(0,2));
      const sec = Math.ceil((60 * percent) / 100);

      if (parseInt(minute) < 10 && sec < 10) {
          return `0${minute}:0${sec}`            
      }

      if (parseInt(minute) < 10) {
          return `0${minute}:${sec}`
      }

      if (sec < 10) {
          return `${minute}:0${sec}`   
      }

      return `${minute}:${sec}`
  }
}

export default function AudioListItem({ data, onOptionsPress, onAudioPress }: AudioProps) {
  return (
    <>
      <View className="w-full flex-row justify-between p-2 self-center ">
        <Link href='/' asChild >
        <TouchableOpacity 
        onPress={() => {
          onAudioPress()
        }}>
          <View className="flex-row items-center flex-1">
            <View className="h-11 w-11 basis-11 justify-center items-center rounded-full">
              <Image source={require('../../assets/Images-default/music-icon.png')} className="w-full h-full" />
            </View>
            <View className="w-[-180px] pl-1 ">
              <Text numberOfLines={1} className="text-sm " style={{ color: Colors.white }}>
                {data.filename.slice(0, 29)}
              </Text>
              <Text numberOfLines={1} className="text-xs ml-1" style={{ color: Colors.white }}>
                {/* {comverttime(data.duration)} */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        </Link>

        <View className="basis-11">
          <Entypo
            name="dots-three-vertical"
            size={20}
            color="#fff"
            onPress={onOptionsPress()}
          />
        </View>
      </View>
      
      <View className="bg-[#333] w-1 opacity-30 h-[0.5px] self-center mt-2"></View>
    </>
  );
}
