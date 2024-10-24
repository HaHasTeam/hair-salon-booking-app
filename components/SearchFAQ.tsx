import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'
import AntDesign from '@expo/vector-icons/AntDesign'
type SearchBarProps = {
  value: string
  onChangeText: (text: string) => void
  handleSearch: () => void
  clearSearchValue: () => void
  isSearch: boolean
}
const SearchFAQ = ({ value, onChangeText, handleSearch, clearSearchValue, isSearch }: SearchBarProps) => {
  const theme = useColorScheme() ?? 'light'
  const textColor = useThemeColor({}, 'subText')
  const placeholderColor = useThemeColor({}, 'subText')
  const searchButtonColor = useThemeColor({}, 'subText')
  console.log(value)
  return (
    <View>
      <View
        className={`flex flex-row rounded-full border items-center justify-between px-4 ${
          theme === 'light' ? ' border-primary' : ' border-primary-light'
        } `}
      >
        <AntDesign name='search1' size={16} color={Colors.light.subText}></AntDesign>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder='Search...'
          style={{
            color: placeholderColor
          }}
          placeholderTextColor={placeholderColor}
          className={`flex-1 rounded-l-full py-1 px-2`}
        />
        {value.length > 0 && (
          <Pressable onPress={clearSearchValue} className='w-8 justify-center align-middle'>
            <AntDesign name='close' size={16} color={Colors.light.subText} />
          </Pressable>
        )}
      </View>
      {isSearch ? (
        <View style={styles.card}>
          <Pressable
            onPress={handleSearch}
            className={`rounded-full w-full py-2 px-4 text-primary ${
              theme === 'light' ? 'text-primary-dark' : 'text-primary'
            }`}
          >
            <View className='w-full flex-row gap-2 items-center px-2'>
              <AntDesign name='search1' size={16} color={Colors.light.subText}></AntDesign>
              <ThemedText numberOfLines={1} className='px-2'>
                {value}
              </ThemedText>
            </View>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    width: '20%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  card: {
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingBottom: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: 40,
    zIndex: 100
  }
})
export default SearchFAQ
