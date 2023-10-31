'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"

const priceRegex = /^\d+(?:,\d+)*\.?\d*$/;

export default function FilterMinMax() {
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
            className="w-full flex gap-5 justify-center items-center"
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    updateUrlParams();
                }
            }}
        >
            <InputPrice
                name="min"
                change={(e) => {
                    const newValue = e.target.value.replace(/[^0-9,.]/g, "")
                    console.log(newValue)
                    setMinValue(e.target.value.replace(/[^0-9,.]/g, ""));
                }}
                value={minValue}
            />
            <InputPrice
                name="max"
                change={(e) => {
                    const newValue = e.target.value.replace(/[^0-9,.]/g, "")
                    console.log(newValue)
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
            className="w-auto min-w-0 px-4 py-2 rounded-md bg-project-tertiary-500"
            placeholder={name}
            onChange={change}
            value={value}
        />
    );
}
