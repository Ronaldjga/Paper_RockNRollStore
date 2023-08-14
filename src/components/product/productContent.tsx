import { HTMLProps, ReactNode } from "react"

interface IProductContent extends HTMLProps<HTMLDivElement> {
  children: ReactNode
}

export function ProductContent({ children, className }: IProductContent) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
