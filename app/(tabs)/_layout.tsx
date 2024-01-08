import { 
  createMaterialTopTabNavigator, 
  MaterialTopTabNavigationOptions, 
  MaterialTopTabNavigationEventMap, 
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import Colors from '../../src/constants/defaultTheme';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs 
    screenOptions={{ 
      tabBarActiveTintColor: Colors.accent,
      tabBarLabelStyle: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        textTransform: 'capitalize', },
      tabBarIndicatorStyle: {
        backgroundColor: '#1C87ED',
        height: 3
      },
      tabBarStyle: {
        backgroundColor: Colors.background
      }
     }} >
      <MaterialTopTabs.Screen name='index' options={{ title: 'Music' }} />
    </MaterialTopTabs>
  )
}
 
export default Layout;