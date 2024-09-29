import { CourtStatusEnum } from '@/types'
import { Badge } from 'native-base'
import { ReactNode } from 'react'

const BadgeCustom = ({ status }: { status: CourtStatusEnum }) => {
  switch (status) {
    case CourtStatusEnum.PENDING:
      return (
        <Badge colorScheme='info' alignSelf='center' variant={'solid'}>
          {status}
        </Badge>
      )
    case CourtStatusEnum.TERMINATION:
      return (
        <Badge colorScheme='error' alignSelf='center' variant={'solid'}>
          {status}
        </Badge>
      )

    case CourtStatusEnum.INUSE:
      return (
        <Badge colorScheme='warning' alignSelf='center' variant={'solid'} rounded={'2xl'}>
          {status}
        </Badge>
      )
  }
}

export default BadgeCustom
