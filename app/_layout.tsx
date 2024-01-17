import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { View, Text, useColorScheme } from "react-native";
import { AudioProvaider } from "../src/context/AudioProvaider";
import { StatusBar } from 'expo-status-bar';
import Colors from "../src/constants/defaultTheme";
import { Ionicons } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      <AudioProvaider>
        <StatusBar style="light" /> 
        {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
        {!loaded && <SplashScreen />}
        {loaded && <RootLayoutNav />}
      </AudioProvaider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const routeSelected = usePathname();
  const routes = ['']

  const render = () => {
    if ( 1+1 === 2  ) {
      return <Ionicons name="ios-search" size={24} color={Colors.white} />
    } else {
      return <Ionicons name="ios-settings-outline" size={24} color={Colors.white} />
    }
  }

  const routeSelectedName = (routeName: string) => {
    switch (routeName) {
      case '/':
        return 'Songs';
      case '/Album':
        return 'Album';
      case '/Artist':
        return 'Artist';
      case '/PlayList':
        return 'Playlist';
    }
  }
  
  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ 
            headerTitle: ' ',
            headerStyle: {
              backgroundColor: Colors.background
            },
            headerLeft: () => <Text className="text-slate-200 ">{routeSelectedName(routeSelected)}</Text>,
            headerRight: () => (
              <View className="p-1">
                {render()}
              </View>
            )
            }} />
          <Stack.Screen name="(stack)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
