'use client'

import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType } from "embla-carousel-react"
import Image from "next/image"
import Autoplay from 'embla-carousel-autoplay'

import bannerOneSm from '~/img/sleeptokenBannerSm.png'
import bannerOneMd from '~/img/sleeptokenBannerMd.png'
import bannerTwoSm from '~/img/pearljamBannerSm.png'
import bannerTwoMd from '~/img/pearljamBannerMd.png'
import bannerThreeSm from '~/img/ledzeppelinBannerSm.png'
import bannerThreeMd from '~/img/ledzeppelinBannerMd.png'
import { useCallback, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function Carousel() {
    const [ emblaRef, emblaApi ] = useEmblaCarousel({loop: true})
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
      )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
    
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
      }, [emblaApi, onInit, onSelect])

      console.log(selectedIndex)
    return(
        <>
            <div className="embla overflow-hidden container md:max-w-0 md:min-w-full w-full h-[500px] rounded-md" ref={emblaRef}>
                <div className="embla__container flex w-full h-full">
                    <div className="embla__slide relative w-full h-full min-w-full overflow-hidden">
                        <div className="w-full h-full md:hidden">
                            <Image className="object-cover" src={bannerOneSm} alt="banner carousel" fill/>
                        </div>
                        <div className="w-full h-full hidden md:block">
                            <Image className="bg-cover" src={bannerOneMd} alt="banner carousel" fill/>
                        </div>
                    </div>
                    <div className="embla__slide relative w-full h-full min-w-full overflow-hidden">
                        <div className="w-full h-full md:hidden">
                            <Image className="object-cover" src={bannerTwoSm} alt="banner carousel" fill/>
                        </div>
                        <div className="w-full h-full hidden md:block">
                            <Image className="bg-cover" src={bannerTwoMd} alt="banner carousel" fill/>
                        </div>
                    </div>
                    <div className="embla__slide relative w-full h-full min-w-full overflow-hidden">
                        <div className="w-full h-full md:hidden">
                            <Image className="object-cover" src={bannerThreeSm} alt="banner carousel" fill/>
                        </div>
                        <div className="w-full h-full hidden md:block">
                            <Image className="bg-cover" src={bannerThreeMd} alt="banner carousel" fill/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="embla__dots w-full flex justify-center gap-2">
                {scrollSnaps.map((_, index) => {
                    console.log(index, selectedIndex)
                    return (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={twMerge('embla__dot w-8 h-2 rounded-md bg-project-secondary-400', `${index === selectedIndex ? 'embla__dot--selected bg-project-primary-500' : ''}`)}
                        />
                    )
                })}
            </div>
        </>
    )
}