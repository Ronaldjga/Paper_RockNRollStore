'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { twMerge } from "tailwind-merge";

const priceRegex = /^\d+(?:,\d+)*\.?\d*$/;

export default function FilterMinMax({className} : {className?: string}) {
    const [minValue, setMinValue] = useState<string>('')
    const [maxValue, setMaxValue] = useState<string>('')

    const router = useRouter()
    const myParams = useSearchParams()

     function updateUrlParams() {
        const currentParams = new URLSearchParams(myParams.toString());

        if (minValue !== '') {
            const minPrice = parseFloat(minValue.replace(',', '.'));
            currentParams.set('min_price', minPrice.toFixed(2));
        } else {
            currentParams.delete('min_price');
        }

        if (maxValue !== '') {
            const maxPrice = parseFloat(maxValue.replace(',', '.'));
            currentParams.set('max_price', maxPrice.toFixed(2));
        } else {
            currentParams.delete('max_price');
        }

        router.replace(`?${currentParams.toString()}`, { scroll: false });
    }

    return (
        <form
            className={twMerge('w-full flex gap-5 justify-center items-center', className)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    updateUrlParams();
                }
            }}
        >
            <InputPrice
                name="min"
                change={(e) => {
                    setMinValue(e.target.value.replace(/[^0-9,.]/g, ""));
                }}
                value={minValue}
            />
            <InputPrice
                name="max"
                change={(e) => {
                    setMaxValue(e.target.value.replace(/[^0-9,.]/g, ""));
                }}
                value={maxValue}
            />
        </form>
    )
}

function InputPrice({ change, name, value }: { change: (e: React.ChangeEvent<HTMLInputElement>) => void , name: string , value: string}) {
    return (
        <input
            type="text"
            name={name}
            className="w-full min-w-0 px-4 py-2 rounded-md bg-project-tertiary-500"
            placeholder={name}
            onChange={change}
            value={value}
        />
    );
}
