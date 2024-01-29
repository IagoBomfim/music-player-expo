import React, { ReactNode } from "react"
import { View } from "react-native";

interface FloatingButtonRootProps {
    children: ReactNode;
}

export function FloatingButtonRoot({ children }: FloatingButtonRootProps) {
    return (
        <View className='ml-5 mr-5 flex-row content-between items-start absolute bottom-11 left-0 z-[1] bg-transparent'>
            {children}
        </View>
    )
}