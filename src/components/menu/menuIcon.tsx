import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface IMenuIcon {
    className?: string
    icon: string
    alt: string
    link?: string
}

export default function MenuIcon({className, icon, alt, link}: IMenuIcon) {
  return (
    <Link href={link || '/'} className={twMerge('w-8 h-8 relative', className)}>
        <Image src={icon} alt={alt} fill/>
    </Link>
  )
}
