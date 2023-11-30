import Image from "next/image"
import { twMerge } from "tailwind-merge"

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
    <div 
      onClick={action}
      className={twMerge('relative', rootClassName)}
    >
      <Image
        className={twMerge('drop-shadow-2xl', imageClassName)}
        placeholder="empty" src={image} 
        sizes={imageSize ? imageSize : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        fill
        alt={alt}
      />
    </div>
  )
}
