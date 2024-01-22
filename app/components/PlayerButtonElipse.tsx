import React, { JSXElementConstructor } from 'react'
import { View, Text, Image, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import Colors from '@/constants/defaultTheme';

const start = { x: 0, y: 0 };
const end = { x: 1, y: 0 };

type PlayButtonProps = {
    size: number;
    circle: number;
    icon?: React.ReactNode;
    onPress?: Function;
    children: React.ReactNode
};

interface ILinearGradientProps extends LinearGradientProps {
  size: number;
  circle: number;
}

interface ITouchableOpacityProps extends TouchableOpacityProps {
  size: number
}

export const PlayerButtonElipse = ({size, circle, icon, onPress, children}: PlayButtonProps) => {
  return (
    <Container size={size}>
      <View style={{ zIndex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        
        {children}
      </View>
      

      <Circle colors={Colors.linearGradient} 
        size={size}
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
      <Circle colors={Colors.linearGradient} 
        size={size}
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
      <Circle colors={Colors.linearGradient} 
        size={size}
        circle={circle}
        start={start}
        end={end}
        style={{
          opacity: 0.5,
          position: 'absolute',
          top: 0,
        }}
      />
    </Container>
  );
}

const Container = styled.TouchableOpacity<ITouchableOpacityProps>`
  width: ${props => props.size || 78}px;
  height: ${props  => props.size || 78}px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(LinearGradient)<ILinearGradientProps>`
  width: ${props => props.circle || 70}px;
  height: ${props => props.circle || 70}px;
  border-radius: ${props => props.circle / 2 || 70/2}px;
`;
