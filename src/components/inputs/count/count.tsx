
interface ICount {
    hookSetState: (newState:any) => void
    hookState: number
}

export default function Count({hookSetState, hookState}: ICount) {
  return (
    <div className={`flex gap-2 justify-center flex-wrap`}>
        <CountButton hookSetState={hookSetState} hookState={hookState} value="-"/>
        <input 
            type="text" 
            className="w-10 h-10 text-center border-2" value={hookState}
            onChange={(e) => {
                const inputValue = e.target.value
                const numericValue = inputValue.replace(/[^0-9.-]/g, '');

                if(numericValue !== '' && numericValue !== '-') {
                    const parsedValue = parseFloat(numericValue)
                    if(!isNaN(parsedValue)){
                        hookSetState(parsedValue)
                    }
                } else {
                    hookSetState(1)
                }
            }}
        />
        <CountButton hookSetState={hookSetState} hookState={hookState} value="+"/>
    </div>
  )
}

function CountButton({value, hookSetState, hookState} : { value: string, hookSetState: (newState: any) => void, hookState: number }) {
    const disabled = hookState === 1 && value === '-' ? true : false
    return (
        <button
            disabled={disabled}
            className={`w-10 h-10 border-2 flex justify-center items-center font-bold text-[1.2rem] active:bg-Project-red-fist rounded-md`}
            onClick={(e) => { hookSetState((newState : number) => value === '+' ? newState + 1 : newState - 1) }}
        >
            {value}
        </button>
    )
}


{/* <div className="flex gap-2 justify-center flex-wrap">
    <button onClick={(e) => setQuantity(value => value - 1)} className="w-8 h-8 border flex justify-center items-center font-bold text-[1.2rem]">-</button>
    <input type="text" onChange={(e) => setQuantity(parseFloat(e.target.value))} className="w-8 h-8 text-center" value={quantity}/>
    <button onClick={(e) => setQuantity(value => value + 1)} className="w-8 h-8 border flex justify-center items-center font-bold text-[1.2rem]">+</button>
</div> */}