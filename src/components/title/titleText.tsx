import { ElementType } from "react"
import { tv } from "tailwind-variants"
import BackToPreviousPage from "../actions/backToPreviousPage/backToPreviousPage"

const title = tv({
    base: 'relative left-2/4 -translate-x-2/4 text-[1.2rem] font-bold'
})

interface ITextTitle {
    className?: string
    Tag: ElementType,
    text: string
}

export default function Title({ Tag ,className, text }: ITextTitle) {

    return (
        <nav className="relative flex items-center px-5 py-2 text-project-quaternary-500 bg-project-secondary-600">
            <BackToPreviousPage className="absolute left-5"/>
            <Tag className={title({className})}>
                {text}
            </Tag>
        </nav>
    )
}
