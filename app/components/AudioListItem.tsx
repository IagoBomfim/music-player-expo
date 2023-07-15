import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { comverttime } from "../../src/functions/functions";
import { Link } from "expo-router";

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

const getThanbText = (filenameText: string) => filenameText[0];

export default function AudioListItem({ data, onOptionsPress, onAudioPress }: AudioProps) {
  return (
    <>
      <View className="w-full flex-row justify-between p-2 self-center ">
        <Link href='/PlayerControl' asChild >
        <TouchableOpacity 
        onPress={() => {
          onAudioPress()
        }}>
          <View className="flex-row items-center flex-1">
            <View className="h-11 w-11 basis-11 justify-center items-center rounded-full bg-zinc-300">
              <Text className="text-xl font-bold text-center">
                {getThanbText(data.filename)}
              </Text>
            </View>
            <View className="w-[-180px] pl-1 ">
              <Text numberOfLines={1} className="text-sm ">
                {data.filename.slice(0, 29)}
              </Text>
              <Text numberOfLines={1} className="text-xs from-neutral-400 ml-1">
                {comverttime(data.duration)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        </Link>

        <View className="basis-11">
          <Entypo
            name="dots-three-vertical"
            size={20}
            color="#000"
            onPress={onOptionsPress()}
          />
        </View>
      </View>
      <View className="bg-[#333] w-1 opacity-30 h-[0.5px] self-center mt-2"></View>
    </>
  );
}
