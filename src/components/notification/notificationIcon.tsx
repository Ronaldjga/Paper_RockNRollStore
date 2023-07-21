import Image from 'next/image'
import React from 'react'

interface INotificationIcon {
    icon: string
}

export function NotificationIcon({ icon }: INotificationIcon) {
  return (
    <div className='w-8 h-8 rounded relative'>
        <Image className='rounded' src={icon} alt='Icon' fill/>
    </div>
  )
}
