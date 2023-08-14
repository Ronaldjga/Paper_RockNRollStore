import Image from "next/image"

interface IProductImage {
    image: string,
    imageClassName?: string,
    rootClassName?: string,
    imageSize?: string,
    alt: string
}

export function ProductImage({ image, rootClassName, imageClassName, imageSize, alt } : IProductImage) {
  return (
    <div className={`${rootClassName} relative`}>
      <Image className={imageClassName} placeholder="empty" src={image}  sizes={imageSize} fill alt={alt}/>
    </div>
  )
}
