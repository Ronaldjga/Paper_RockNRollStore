import Image from "next/image"

interface IProductImage {
    image: string,
    imageClassName?: string,
    rootClassName?: string,
    imageSize?: string,
    alt: string,
    action?: () => void
}

export function ProductImage({ image, rootClassName, imageClassName, imageSize, alt, action } : IProductImage) {
  return (
    <div onClick={action} className={`${rootClassName} relative`}>
      <Image className={imageClassName} placeholder="empty" src={image}  sizes={imageSize} fill alt={alt}/>
    </div>
  )
}
