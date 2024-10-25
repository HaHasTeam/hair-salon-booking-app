import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { AirbnbRating } from 'react-native-ratings'
import { useUploadImgs } from '@/api/images'
import ImgDisplay from '@/components/ImgDisplay'
import Loading from '@/components/Loading'
import { usePostFeedback } from '@/api/feedback'
import { useLocalSearchParams, useRouter } from 'expo-router'

const FeedbackCreate = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<string[]>([])
  const { mutateAsync, isPending: isUploadingImages, error } = useUploadImgs()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      aspect: [4, 3]
    })

    if (result.canceled || !result.assets) {
      return
    }

    const formData = new FormData()
    for (const file of result.assets) {
      // @ts-ignore
      formData.append('files', {
        uri: file.uri,
        name: file.fileName,
        type: file.mimeType
      })
    }

    console.log(formData, 'formdata')
    try {
      const uploadedImages = await mutateAsync(formData)
      setImages(uploadedImages)
    } catch (err) {
      console.log(err, 'err')
    }
  }
  const params = useLocalSearchParams()
  console.log(params, 'params')
  const router = useRouter()
  const { mutateAsync: postFeedback, isPending: isPostingFeedback } = usePostFeedback()
  const handleSubmit = async () => {
    // Xử lý gửi form

    if (!rating) {
      alert('Vui lòng chọn số sao')
      return
    }
    if (!comment) {
      alert('Vui lòng nhập bình luận')
      return
    }
    if (images.length === 0) {
      alert('Vui lòng chọn hình ảnh')
      return
    }

    try {
      if (params.booking && params.branch) {
        const data = await postFeedback({
          star: rating,
          feedback: comment,
          images,
          booking: params.booking as string,
          branch: params.branch as string
        })
        return await router.back()
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3]
    })
    if (result.canceled || !result.assets) {
      return
    }
    const formData = new FormData()
    for (const file of result.assets) {
      // @ts-ignore
      formData.append('files', {
        uri: file.uri,
        name: file.fileName as string,
        type: file.mimeType as string
      })

      try {
        const uploadedImages = await mutateAsync(formData)
        setImages(uploadedImages)
      } catch (err) {
        console.log(err, 'err')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Đánh giá chúng tôi:</Text>
      <AirbnbRating
        count={5}
        reviews={['Tệ', 'Xấu', 'Bình thường', 'Tốt', 'Tuyệt vời']}
        defaultRating={0}
        size={20}
        onFinishRating={setRating}
      />
      <Text style={styles.label}>Bình luận:</Text>
      <TextInput
        style={styles.input}
        placeholder='Viết bình luận của bạn ở đây...'
        value={comment}
        onChangeText={setComment}
      />
      <Text style={styles.label}>Tải lên hình ảnh:</Text>
      {isUploadingImages && <Loading title='Đang tải hình ảnh ...' />}
      {!isUploadingImages && !!images?.length && (
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start'
          }}
        >
          <ImgDisplay
            images={images}
            imgStyle={{
              width: 100,
              height: 100,
              borderRadius: 5
            }}
            maxPreview={3}
          />
        </View>
      )}
      {!isUploadingImages && (
        <>
          {!isPostingFeedback && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 8
              }}
            >
              <TouchableOpacity onPress={pickImage} style={{ ...styles.imagePicker, flex: 1 }}>
                <Text style={styles.imagePickerText}>{images.length ? 'Chọn lại' : 'Chọn hình ảnh'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTakePhoto}
                style={{
                  ...styles.imagePicker,
                  backgroundColor: '#c7487c',
                  flex: 1
                }}
              >
                <Text style={styles.imagePickerText}>{images.length ? 'Chụp ảnh mới' : 'Chụp ảnh'}</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              ...styles.imagePicker,
              backgroundColor: 'green'
            }}
            disabled={isPostingFeedback}
          >
            {isPostingFeedback ? <Loading color='white' /> : <Text style={styles.imagePickerText}>Gửi đánh giá</Text>}
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  label: {
    fontSize: 18,
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    borderRadius: 5,
    marginBottom: 20
  },
  imagePicker: {
    backgroundColor: 'gray',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  imagePickerText: {
    color: 'white'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 20
  }
})

export default FeedbackCreate
