import Image from "next/image"

interface IProductAction {
    action: () => void,
    icon: string,
    className?: string
}

export function ProductAtion({ action, icon, className }: IProductAction) {
  return (
    <div className={`${className} relative default:w-8 default:h-8`} onClick={action}>
        <Image src={icon} fill alt="icon"/>
    </div>
  )
}
