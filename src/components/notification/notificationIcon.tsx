import Image from 'next/image'

interface INotificationIcon {
    icon: string
}

export function NotificationIcon({ icon }: INotificationIcon) {
  return (
    <div className='w-5 h-5 min-w-[20px] min-h-[20px] relative'>
        <Image src={icon} className='object-contain' alt='notifications type' fill/>
    </div>
  )
}
