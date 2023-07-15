import {} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

interface PropsInterface {
    iconType: 'PLAY' | 'PAUSE' | 'NEXT' | 'PREV';
    iconColor?: string;
    size?: number;
    onPress?: () => void;
}


export default function PlayerButton(props: PropsInterface){

    const { iconColor = '#000', iconType, onPress, size = 50 } = props;
    
    const getIconName = (name) => {
        switch(name) {
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircle';
            case 'NEXT':
                return 'forward';
            case 'PREV':
                return 'banckward';
        }
    }

    return (
        <AntDesign 
            {...props} 
            onPress={onPress}
            name={getIconName(iconType)}
            size={size}
            color={iconColor}
        />
    )
}