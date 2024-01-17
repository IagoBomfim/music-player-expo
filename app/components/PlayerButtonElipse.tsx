import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '@/constants/defaultTheme'

const start = { x: 0, y: 0 }
const end = { x: 1, y: 0 }

type PlayButtonProps = {
    size: number;
    circle: any;
    icon: string;
    onPress: Function;
}

const PlayButton = ({size, circle, icon, onPress}: PlayButtonProps) => {
  return (
    <TouchableOpacity className='items-center justify-items-center '>

      <Image source={{ uri: icon }} style={{position: 'relative', zIndex: 1}}/>

      <Circle colors={Colors.linearGradient} size={size}
        start={start}
        circle={circle}
        end={end}
        style={{
          opacity: 0.5,
          position: 'absolute',
          left: 0,
          bottom: 0
        }}
      />
      <Circle colors={Colors.linearGradient2} size={size}
        start={start}
        circle={circle}
        end={end}
        style={{
          opacity: 0.5,
          position: 'absolute',
          right: 0,
          bottom: 0
        }}
      />
      <Circle colors={Colors.linearGradient} size={size}
        start={start}
        circle={circle}
        end={end}
        style={{
          opacity: 0.5,
          position: 'absolute',
          top: 0,
        }}
      />

    </TouchableOpacity>
  );
}

//@ts-ignore
const Container = styled.TouchableOpacity`
  width: ${props => props.size || 78}px;
  height: ${props  => props.size || 78}px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(LinearGradient)`
  width: ${props => props.circle || 70}px;
  height: ${props => props.circle || 70}px;
  border-radius: ${props => props.circle / 2 || 70/2}px;
`;

export default PlayButton;