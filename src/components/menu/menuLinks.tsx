import Link from "next/link"

interface IMenuLinks {
  links: {link: string, title: string}[];
  className?: string;
}

export function MenuLinks({links, className}: IMenuLinks) {
  return (
    <ul className='flex flex-col col-span-2 gap-5 order-3'>
        {links.map((data, index) => {
            return(
                <li className={`${className} border-l pl-2 border-l-project-primary-500 hover:font-bold`} key={index}><Link href={data.link}>{data.title}</Link></li>
            )
        })}
    </ul>
  )
}
