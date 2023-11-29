'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface IMenuLinks {
  links: {link: string, title: string}[];
  className?: string;
}

export function MenuLinks({links, className}: IMenuLinks) {
  const pathname = usePathname()

  return (
    <ul className={twMerge('flex flex-col col-span-2 gap-5 order-3', className)}>
        {links.map((data, index) => {
            return(
                <li className={`border-l pl-2 border-l-project-primary-500 hover:font-bold sm:text-base sm:border-0 ${pathname === data.link ? 'text-project-primary-500' : ''}`} key={index}><Link href={data.link}>{data.title}</Link></li>
            )
        })}
    </ul>
  )
}
