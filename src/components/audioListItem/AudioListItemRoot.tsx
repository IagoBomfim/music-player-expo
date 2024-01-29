import { ReactNode } from "react";
import { View } from "react-native";

interface AudioListItemRootProps {
    children: ReactNode;
}

export function AudioListemItemRoot({ children }: AudioListItemRootProps) {
    return (
        <View className="w-full flex-row justify-between p-2 self-center">
            {children}
        </View>
    )
}