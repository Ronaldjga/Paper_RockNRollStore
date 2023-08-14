import { ReactNode } from "react"

interface IProductRoot {
    children: ReactNode,
    className?: string
}

export default function ProductRoot({ children, className }: IProductRoot) {
  return (
    <div className={`${className} bg-Project-white border-b-8 border-Project-red-fist rounded-t-md p-2 gap-5 flex flex-col items-center`}>
        {children}
    </div>
  )
}
