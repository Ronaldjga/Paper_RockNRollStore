'use client'

import { useRouter } from "next/navigation"
import { ReactNode, useCallback, useEffect, useRef } from "react"

interface ModalPage {
    children: ReactNode
}

export default function ModalPage({ children }: ModalPage) {
    const overlay = useRef<HTMLDivElement | null>(null)
    const wrapper = useRef<HTMLDivElement | null>(null)

    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick = useCallback((e: any) => {
        if(e.target === overlay.current || e.target === wrapper.current) {
            if(onDismiss) onDismiss()
        }
    console.log(e)
    }, [onDismiss, overlay, wrapper])

    const onkeydown = useCallback((e:any) => {
        if(e.key === "Escape") onDismiss()
    }, [onDismiss])

    useEffect(()=> {
        document.addEventListener("keydown", onkeydown)
        return document.removeEventListener("keydown", onkeydown)
    }, [onkeydown])

    return (
        <div 
            ref={overlay}
            className="fixed z-10 left-0 right-0 bottom-0 mx-auto bg-black/40 w-full h-full"
            onClick={onClick}
        >
            <div 
                ref={wrapper}
                className="absolute max-h-[90vh] min-h-[90vh] h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 rounded-md"
            >
                {children}
            </div>
        </div>
    )
}
