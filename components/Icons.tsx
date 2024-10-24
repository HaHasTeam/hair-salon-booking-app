import { AntDesign, Feather } from '@expo/vector-icons'
import { TabBarIcon } from './navigation/TabBarIcon'

export const Icons = {
  index: ({ ...props }) => <AntDesign name='home' size={26} {...props} />,
  LoginRegisterScreen: ({ ...props }) => <Feather name='compass' size={26} {...props} />,
  branchs: ({ ...props }) => <TabBarIcon name={'tennisball-outline'} size={26} {...props} />,
  ProfileScreen: ({ ...props }) => <AntDesign name='user' size={26} {...props} />,
  receipt: ({ ...props }) => <AntDesign name='barcode' size={26} {...props} />
}
