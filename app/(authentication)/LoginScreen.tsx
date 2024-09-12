// trang form login
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Login</Text>
        <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
