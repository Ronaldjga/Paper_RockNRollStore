import { ReactNode } from 'react'

interface INotificationRoot {
    children: ReactNode
}

export default function NotificationRoot({ children } : INotificationRoot) {
  return (
    <div className='bg-zinc-200 px-8 py-4 flex items-start gap-6'>
        {children}
    </div>
  )
}
