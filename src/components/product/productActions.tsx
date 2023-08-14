import { HTMLProps, ReactNode } from "react"

interface IProductActions extends HTMLProps<HTMLDivElement> {
    children: ReactNode,
}

export function ProductActions({ children, className }: IProductActions) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
