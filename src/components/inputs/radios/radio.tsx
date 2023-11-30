import { ICart } from '@/providers/data'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const radio = tv({
    base: 'bg-project-tertiary-500 text-project-secondary-500 p-2 min-w-[45px] w-[45px] min-h-[45px] h-[45px] text-center rounded-md border-2 border-black',
    variants: {
        color: {
            default: 'bg-transparent',
            red: 'bg-[#F20C00]',
            gray: 'bg-gray-500',
            beige: 'bg-[#DECBB6]',
            white: 'bg-white',
            black: 'bg-black'
        },
        select: {
            true: 'scale-[1.05] outline outline-white',
            false: ''
        }
    },
    defaultVariants: {
      color: 'default',
      select: false
    }
})

interface IInputRadio extends VariantProps<typeof radio> {
    hookState: ICart,
    hookSetState: (newState: any) => void,
    name: string,
    items: any[],
    className?: string,
    type: string
}

type IRadioContainer = ComponentProps<'label'> & VariantProps<typeof radio> & {
    select: boolean
}


export default function InputRadio({ hookState ,hookSetState, name, items, className, type }: IInputRadio) {

    return (
        <div className={`flex gap-2 justify-center flex-wrap`}>
            {items.map((item, i) => {
                return(
                    <RadioContainer 
                        key={i} 
                        color={type === 'color' ? item : null}
                        select={Object.values(hookState).find(value => value === item) ? true : false}
                        className={className}
                    >
                        {type === 'color' ? null : item.toUpperCase()}
                        <input 
                            className="hidden"
                            type="radio"
                            name={name}
                            onClick={(e) =>  {
                                if(Object.values(hookState).find(value => value === item)){
                                    const newValue = {...hookState, [type]: ''}
                                    hookSetState(newValue)
                                } else {
                                    const newValue = {...hookState, [type]: item}
                                    hookSetState(newValue)
                                }
                            }}
                            value={item}
                        />
                    </RadioContainer>
                )
            })}
        </div>
    )
}


function RadioContainer({color, className, children, select ,...props}: IRadioContainer) {
    return(
        <label data-color={color} data-select={select} className={radio({color, select, className})} {...props}>
            {children}
        </label>
    )
}