import Link from "next/link"

interface IMenuLinks {
    links: {link: string, title: string}[]
}

export function MenuLinks({links}: IMenuLinks) {
  return (
    <ul className='flex flex-col col-span-2 gap-5 order-3'>
        {links.map((data, index) => {
            return(
                <li key={index}><Link href={data.link}>{data.title}</Link></li>
            )
        })}
    </ul>
  )
}
