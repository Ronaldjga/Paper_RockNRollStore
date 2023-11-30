import Image from "next/image"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const productAction = tv({
  base: 'relative w-8 h-8',
  variants: {
      type: {
          text: 'flex gap-2 justify-around items-center rounded-md p-2',
          icon: 'w-8 h-8 min-w-[32px] min-h-[32px]'
      }
  },
  defaultVariants: {
    type: "text"
  }
})

interface ICommonProps {
  action: () => void,
  className?: string,
  buttonProps?: ComponentProps<'button'>
}

interface IProductIcon extends ICommonProps {
  kind: 'icon',
  icon: string
}

interface IProductText extends ICommonProps {
  kind: 'text',
  text: string,
  icon?: string
}

type TProductAction = | IProductIcon | IProductText

export function ProductAction({className, ...props}: TProductAction) {
  if (props.kind === "icon") {
    return (
      <button 
        className={productAction({type: props.kind, className: className})} 
        onClick={props.action}
        {...props.buttonProps}
      >
        <Image className="object-contain" src={props.icon} fill alt="icon"/>
      </button>
    );
  }
  if (props.kind === "text") {
    return (
      <button 
      className={productAction({type: props.kind, className: className})} 
      onClick={props.action}
      {...props.buttonProps}
    >
      <span>{props.text}</span> 
      {props.icon && (<Image className="w-7" src={props.icon} alt="icon"/>)}
    </button>
    );
  }

  return(
    <></>
  )
}
