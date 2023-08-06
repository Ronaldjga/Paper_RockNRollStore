import { NotificationActionCancel, NotificationActionSubmit, NotificationActions } from "./notificationActions";
import { NotificationContent } from "./notificationContent";
import { NotificationIcon } from "./notificationIcon";
import NotificationRoot from "./notificationRoot";

export const Notification = {
    Root: NotificationRoot,
    Actions: NotificationActions,
    ActionsCancel: NotificationActionCancel,
    ActionsSubmit: NotificationActionSubmit,
    Icon: NotificationIcon,
    Content: NotificationContent
}