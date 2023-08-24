'use client'

import { ReactNode, createContext, useContext, useState } from "react";


interface INotificationsProvider {
    children: ReactNode
}

interface INotification {
    type: "Error" | "Success"
    content: string
}

interface INotificationsTypes {
    notificationsList: INotification[],
    setNotificationsList: ((newState:INotification[]) => void),
    newNotification: (notification:INotification) => void
}

const initialValue = {
    notificationsList: [],
    setNotificationsList: () => {},
    newNotification: () => {}
}

export const Notifications = createContext<INotificationsTypes>(initialValue);

export const NotificationsProvider = ({ children }: INotificationsProvider) => {
    const [ notificationsList, setNotificationsList ] = useState<INotification[]>(initialValue.notificationsList)
    
    const errorsList: any = {
      Signin: "Try signing with a different account.",
      OAuthSignin: "Try signing with a different account.",
      OAuthCallback: "Try signing with a different account.",
      OAuthCreateAccount: "Try signing with a different account.",
      EmailCreateAccount: "Try signing with a different account.",
      Callback: "Try signing with a different account.",
      OAuthAccountNotLinked:"Erro ao fazer login, email linkado a outra conta.",
      EmailSignin: "Check your email address.",
      CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
      default: "Unable to sign in.",
    };
    async function newNotification(notification: INotification) {
        const errorMessage = notification.type === "Error" ? (errorsList[notification.content] ?? notification.content) : null;
        const content = errorMessage ?? notification.content
            setNotificationsList(prevList => [...prevList, {type: notification.type , content: content}])
            setTimeout(() => {
                setNotificationsList((prevList) => prevList.filter((prevNotification) => prevNotification.content !== content));
            }, 3000);
    }


    return(
        <Notifications.Provider value={{notificationsList, setNotificationsList, newNotification}}>
            { children }
        </Notifications.Provider>
    );
}

export const useNotifications = () => useContext(Notifications);