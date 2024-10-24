import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Alert } from 'react-native'
import { Colors } from '@/constants/Colors'

const Contact = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const onChangeFullName = (text: string) => setFullName(text)
  const onChangeEmail = (text: string) => setEmail(text)
  const onChangePhone = (text: string) => setPhone(text)
  const onChangeMessage = (text: string) => setMessage(text)
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/
    return phoneRegex.test(phone)
  }
  const handleSubmit = () => {
    if (!fullName || !email || !phone || !message) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }
    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number')
      return
    }
    console.log(phone, fullName, email, message)
    Alert.alert('Success', 'Your message has been sent!')
    setFullName('')
    setPhone('')
    setEmail('')
    setMessage('')
  }
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '', dark: '' }}>
      <ThemedView>
        <ThemedView className='mb-3'>
          <ThemedText type='subtitle' className='text-center'>
            Send us a message
          </ThemedText>
        </ThemedView>
        <ThemedView>
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            style={styles.input}
            placeholder='Email'
            className={`flex-1 rounded-full py-1 px-3`}
            keyboardType='email-address'
          />
          <TextInput
            value={phone}
            onChangeText={onChangePhone}
            style={styles.input}
            placeholder='Phone number'
            className={`flex-1 mt-3 rounded-full py-1 px-3`}
            keyboardType='phone-pad'
          />
          <TextInput
            value={fullName}
            onChangeText={onChangeFullName}
            style={styles.input}
            placeholder='Full name'
            className={`my-3 flex-1 rounded-full py-1 px-3`}
          />

          <TextInput
            value={message}
            style={[styles.input, styles.textArea]}
            onChangeText={onChangeMessage}
            placeholder='Message'
            numberOfLines={10}
            multiline={true}
            className={`flex-1 text-start items-start justify-start rounded-md py-2 px-3`}
          />
        </ThemedView>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>Or reach us at:</Text>
          <Text style={styles.contactDetail}>Phone: 0978132765</Text>
          <Text style={styles.contactDetail}>Email: support@hairharmony.com</Text>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10
  },
  textArea: {
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: Colors.light.button,
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  contactInfo: {
    marginTop: 30,
    alignItems: 'center'
  },
  contactText: {
    fontSize: 18,
    marginBottom: 10
  },
  contactDetail: {
    fontSize: 16,
    color: '#555'
  }
})

export default Contact
