import { Stack } from 'expo-router';

export default function StackLayout() {

  return (
    <Stack>
        <Stack.Screen 
            name='PlayerControl' 
            options={{
                headerShown: false
            }} 
        />
    </Stack>
  );
}