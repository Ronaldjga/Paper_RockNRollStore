import { ReactNode } from "react"


interface INotificationActionCancel {
    onCancel?: () => void
}

interface INotificationActionSubmit {
    onSubmit?: () => void
}

export function NotificationActions({ children } : {children:ReactNode}) {

    return(
        <div className="flex gap-2 self-center">
            {children}
        </div>
    )
}

export function NotificationActionCancel({ onCancel }: INotificationActionCancel) {
  return (
    <button 
        onClick={() => oncancel} 
        className="w-8 h-8 rounded flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 text-zinc-50"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
    </button>
  )
}

export function NotificationActionSubmit({ onSubmit }: INotificationActionSubmit) {
    return (
      <button 
          onClick={() => onSubmit} 
          className="w-8 h-8 rounded flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-zinc-50"
      >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
      </button>
    )
  }
