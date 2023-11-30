'use client'

import Title from "@/components/title/titleText";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function CartLayout({ children }: { children: ReactNode }){
    const pathname = usePathname();

    return(
        <>
            {
                pathname === "/products" ? <section className="min-h-screen h-[100vh] pt-12 pb-16">
                    <Title Tag={"h2"} text="Products" />
                    {children}
                </section> : <>{children}</>
            }
        </>
    )
}