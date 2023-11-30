import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const div = tv({
  base: 'bg-project-tertiary-400 border-b-8 border-project-primary-500 rounded-t-md p-2 flex items-center',
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col'
    }
  },
  defaultVariants: {
    direction: 'column'
  }
})

type IProductRoot = ComponentProps<'div'> & VariantProps<typeof div>

export default function ProductRoot({ children, className, direction, ...props }: IProductRoot) {
  return (
    <div {...props} className={div({direction, className})}>
        {children}
    </div>
  )
}
