import { useQuery } from '@tanstack/react-query'
import { GET } from '../apiCaller'
import { ENDPOINT } from '..'
import { IBranch } from '@/types/Branch'

export const useBranchList = () => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const response = await GET(ENDPOINT.getAllBranch, {})

      if (response.status !== 200) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }

      return response.data.data
    }
  })
}

export const useBranchDetail = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['branches', id],
    enabled: !!id,
    queryFn: async () => {
      const response = await GET(ENDPOINT.getBranchDetail(id), {})

      if (response.status !== 200) {
        throw new Error(`Failed to fetch Branch Detail: ${response.statusText}`)
      }

      return response.data.data
    }
  })
}
