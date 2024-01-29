import { TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

interface PropsInterface {
    iconType: 'PLAY' | 'PAUSE' | 'NEXT' | 'PREV' | 'REFRESE';
    iconColor?: string;
    size: number;
    onPress?: () => Function;
}


export default function PlayerButton(props: PropsInterface){

    const { iconColor = '#000', iconType, onPress, size } = props;
    
    //@ts-ignore
    const getIconName = (name) => {
        switch(name) {
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircleo';
            case 'NEXT':
                return 'forward';
            case 'PREV':
                return 'banckward';
            case 'REFRESH':
                return 'retweet';
        }
    }

    return (
        <TouchableOpacity onPress={() => onPress}>
            <AntDesign 
            {...props} 
            onPress={onPress}
            name={getIconName(iconType)}
            size={size}
            color={iconColor}
        />
        </TouchableOpacity>
    )
}

//getIconName(iconType)