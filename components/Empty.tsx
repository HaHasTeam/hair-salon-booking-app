import { Image, Text, View } from 'native-base'

const emptyImage = require('@/assets/images/Empty.png')

interface EmptyComponentProps {
  title: string
  description?: string
  action?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function EmptyComponent({
  title,
  description,
  icon = emptyImage,
  action,
  className,
  ...props
}: EmptyComponentProps) {
  return (
    <View
      className={`flex w-full flex-col items-center justify-center space-y-6 bg-transparent p-16 border-0` + className}
      {...props}
    >
      <View className='mr-4 shrink-0 rounded-full border border-dashed p-4'>
        <Image src={emptyImage} width={25} height={25} alt='Empty' />
      </View>
      <View className='flex flex-col items-center gap-1.5 text-center'>
        <Text>{title}</Text>
        {description ? <Text>{description}</Text> : null}
      </View>
      {action || null}
    </View>
  )
}
