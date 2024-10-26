import { useMutation, useQuery } from '@tanstack/react-query';
import { ENDPOINT } from '..';
import { GET, POST } from '../apiCaller';
import { useAuth } from '@/provider/AuthProvider';

export const usePostFeedback = () => {
    const { accessToken } = useAuth()
    
    return useMutation({
      mutationFn: async (data:{
        star: number,
        feedback: string,
        images:string[],
        booking:string,
        branch:string
      }) => {
        const response = await POST(ENDPOINT.postFeedback, data, {}, { authorization: 'Bearer ' + accessToken })
        if (response.status !== 201) {
          throw new Error(`Failed to post feedback: ${response}`)
        }
  
        return response.data.data
      }
    })
  }
  
  export const useGetFeedbackByBranchId = (branchId:string) => {
    const { accessToken } = useAuth()
    
    return useQuery({
        queryKey: ['feedback', 'branch', branchId],
      queryFn: async () => {
        const response = await GET(ENDPOINT.getFeedbackByBranchId(branchId), {}, { authorization: 'Bearer ' + accessToken })
        // if (response.status !== 304) {
        //   console.log(response);
          
        //   throw new Error(`Failed to get feedback by branch ${branchId}: ${response}`)
        // }
        return response.data.data
      }
    })
  }