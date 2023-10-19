import { ReactNode } from "react"

interface IFilterRoot {
  children: ReactNode
}

export default function FilterRoot({ children }: IFilterRoot) {
  return (
    <div>
      {children}
    </div>
  )
}
