import { useMutation } from '@tanstack/react-query';
import { ENDPOINT } from '..';
import { POST } from '../apiCaller';
import { useAuth } from '@/provider/AuthProvider';

export const useUploadImgs = () => {
    const { accessToken } = useAuth()
    
    return useMutation({
      mutationFn: async (files:FormData) => {
        const response = await POST(ENDPOINT.uploadImages, files, {}, { authorization: 'Bearer ' + accessToken,  'content-type': 'multipart/form-data' })
  
        if (response.status !== 200) {
          throw new Error(`Failed to upload images: ${response}`)
        }
  
        return response.data.data
      }
    })
  }
  