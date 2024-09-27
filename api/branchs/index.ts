import { useQuery } from '@tanstack/react-query'
import { GET } from '../apiCaller'
import { ENDPOINT } from '..'

export const useBranchList = () => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const response = await GET(ENDPOINT.getAllBranch, {})
      console.log('response: ', response)
      if (response.status !== 200) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }

      return response.data.data
    }
  })
}
