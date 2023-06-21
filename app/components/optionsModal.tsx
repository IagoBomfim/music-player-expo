import { useState } from "react";
import { Modal, StatusBar, View, Text } from "react-native";

interface ModalProps {
  visible: boolean;
  title?: string;
}

export default function OptionsModal({ visible }: ModalProps) {
  return (
    <>
      <StatusBar hidden={true} />
      <Modal visible={visible} transparent className="absolute bottom-0 right-0 left-0 rounded-t-2xl">
        <View className="">
            <Text numberOfLines={2} className="text-base font-bold p-5 pb-0">title</Text>
            <View className="p-5">
                <Text className="text-sm font-bold ">Play</Text>
                <Text>Add to playlist</Text>
            </View>
        </View>
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-5" />
      </Modal>
    </>
  );
}
