'use client'

import { Notification } from "@/components/notification";
import { useNotifications } from "@/providers/notifications"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react"
import successIcon from '~/img/success.svg'
import errorIcon from '~/img/warning.svg'


export default function Notifications() {
    const { notificationsList, newNotification } = useNotifications()
    const error = useSearchParams().get('error');
    useEffect(() => {
        if (error){
            newNotification({type: "Error", content: error})
        }
    }, [])
    
    return (
        <>
            { notificationsList.length != 0 ? 
                (
                    <div className="fixed min-h-[200px] z-20 w-11/12 top-14 left-2/4 -translate-x-2/4">
                    {notificationsList.map((data, index) => {
                        return (
                            <Notification.Root className="notification my-1" type={data.type} key={index}>
                                <Notification.Icon icon={data.type === "Error" ? errorIcon : successIcon}/>
                                <Notification.Content text={data.content}/>
                            </Notification.Root>
                        )
                    })}
                </div>
                ) : null
            }
        </>
    )
}
