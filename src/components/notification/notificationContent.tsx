
interface INotificationContent {
    text: string
}

export function NotificationContent({text}:INotificationContent) {
  return (
    <p>
        {text}
    </p>
  )
}
