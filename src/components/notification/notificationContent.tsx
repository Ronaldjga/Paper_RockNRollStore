
interface INotificationContent {
    text: string
}

export function NotificationContent({text}:INotificationContent) {
  return (
    <p className="text-[0.8rem]">
        {text}
    </p>
  )
}
