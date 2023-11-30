import { ReactNode, Suspense } from 'react'
import MainFiltersGroup from '@/patterns/filters/main-filters-group'
import MainSection from '@/patterns/mainSection/mainSection'


export default function HomeLayout({children}: {children: ReactNode}) {
    
  return (
        <section className="bg-blue-900">
            <article className="relative">
                <MainSection/>
            </article>
            {children}
        </section>
    )
}
