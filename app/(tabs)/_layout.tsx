import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Musica',
          tabBarIcon: ({ color, size }) => (<FontAwesome name='music' size={size} color={color} />)
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Perfil'
        }}
      />
    </Tabs>
  );
}
