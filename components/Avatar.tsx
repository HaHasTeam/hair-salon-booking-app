import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

const UserAvatar = ({ src, alt, name, size = 'md' }) => {
  // Define size classes based on the size prop
  const sizeClasses = {
    sm: 40, // Size 40x40
    md: 60, // Size 60x60
    lg: 80, // Size 80x80
    xl: 100, // Size 100x100
    xxl: 160 // Size 100x100
  }

  const avatarSize = sizeClasses[size] || sizeClasses.md

  // Get the first letter of the name as initials if src is not provided
  const initials = name
    ? name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
    : 'P'

  return (
    <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
      {src ? (
        <Image
          source={src}
          style={[styles.image, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
          alt={alt || 'User Avatar'}
        />
      ) : (
        <View
          style={[styles.initialsContainer, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
        >
          <Text style={[styles.initialsText, { fontSize: avatarSize / 2.5 }]}>{initials === '' ? 'P' : initials}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0' // Background color for initials
  },
  image: {
    resizeMode: 'cover'
  },
  initialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50' // You can change this to your preferred background color for initials
  },
  initialsText: {
    color: '#ffffff', // Text color for initials
    fontWeight: 'bold'
  }
})

export default UserAvatar
