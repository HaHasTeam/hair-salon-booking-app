import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'


export const useResgistRefetch = () => {
  const data=useQuery({
    queryKey:["refetch"],
    queryFn:()=>{
        return Math.random()
    },
  })
  return data.data
}