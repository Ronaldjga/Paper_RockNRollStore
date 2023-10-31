import { ReactNode } from "react"

interface IFilterRoot {
  children: ReactNode,
  className?: string
}

export default function FilterRoot({ children, className }: IFilterRoot) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
