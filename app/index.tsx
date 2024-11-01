import { Button } from 'native-base'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Link, router } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
const LoginRegisterScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={style.view}>
      <Image style={style.image} source={require('../assets/images/illustration.png')} />
      <Text style={style.header}>Schedule to have hair cut</Text>
      <Text style={style.description}>Interesting hair are waiting for you, feel free to schedule</Text>
      <View style={style.buttonWrapper}>
        <Button
          style={style.signupButton}
          variant={'solid'}
          onPress={() => router.push('/(authentication)/RegisterScreen')}
          _text={{
            fontWeight: '500',
            fontSize: 20
          }}
        >
          Sign up
        </Button>
        <Button
          style={style.loginButton}
          variant={'outline'}
          onPress={() => router.push('/(authentication)/LoginScreen')}
          _text={{
            color: '#3D5CFF',
            fontWeight: '500',
            fontSize: 20
          }}
        >
          Sign in
        </Button>
      </View>
      <Link href={'/(tabs)'} style={style.other}>
        Continue without user account
      </Link>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  signupButton: {
    width: 140,
    height: 60,
    backgroundColor: '#3D5CFF',
    borderRadius: 10
  },
  loginButton: {
    width: 140,
    height: 60,
    borderColor: '#3D5CFF',
    borderRadius: 10
  },
  image: {
    flex: 2,
    height: 260,
    width: 260,
    resizeMode: 'contain'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  other: {
    fontSize: 16,
    color: 'gray',
    padding: 16
  }
})

export default LoginRegisterScreen
