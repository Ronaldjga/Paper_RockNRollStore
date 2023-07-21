import { NotificationActionCancel, NotificationActionSubmit, NotificationActions } from "./notificationActions";
import { NotificationIcon } from "./notificationIcon";
import NotificationRoot from "./notificationRoot";

export const Notification = {
    Root: NotificationRoot,
    Actions: NotificationActions,
    ActionsCancel: NotificationActionCancel,
    ActionsSubmit: NotificationActionSubmit,
    Icon: NotificationIcon
}