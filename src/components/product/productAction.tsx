import Image from "next/image"

interface IProductAction {
    action: () => void,
    icon?: string,
    text?: string
    className?: string
}

export function ProductAction({ action, icon, text, className }: IProductAction) {
  return (
    <button className={`${className} ${text ? 'flex gap-2 p-2 justify-around items-center rounded-md' : ''} relative default:w-8 default:h-8`} onClick={action}>
      {
        text ? (<><span>{text}</span> {icon && (<Image className="w-7" src={icon} alt="icon"/>)}</>) 
        : (icon && <Image src={icon} fill alt="icon"/>)
      }
    </button>
  )
}
