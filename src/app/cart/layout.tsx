import Title from "@/components/title/titleText";
import { ReactNode } from "react";

export default function CartLayout({ children }: { children: ReactNode }){
    return(
        <section className="min-h-screen h-[100vh] pt-12 pb-16">
            <Title Tag={"h2"} text="Cart" />
            {children}
        </section>
    )
}