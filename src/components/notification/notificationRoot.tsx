import { ReactNode } from 'react'

interface INotificationRoot {
  children: ReactNode,
  className?: string
  type: string
}

export default function NotificationRoot({ children, className, type } : INotificationRoot) {
  const bgColorType = type === 'Error' ? 'bg-red-300 border-2 border-red-500' : 'bg-emerald-200 border-2 border-green-500'

  return (
    <div className={`${bgColorType} px-4 py-2 flex items-start gap-2 rounded ${className}`}>
        {children}
    </div>
  )
}
