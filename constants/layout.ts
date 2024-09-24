import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Colors } from './Colors'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: Colors.light.background
  },
  headerLargeTitleStyle: {
    color: Colors.light.text
  },
  headerTintColor: Colors.light.text,
  headerTransparent: true,
  headerBlurEffect: 'prominent',
  headerShadowVisible: false
}
