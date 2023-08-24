
interface IInputRadio {
    hookState: string | number | null,
    hookSetState: (newState: any) => void,
    name: string,
    items: any[]
}

export default function InputRadio({ hookState ,hookSetState, name, items }: IInputRadio) {
    return (
        <div className={`flex gap-2 justify-center flex-wrap`}>
            {items.map((item, i) => {
                return(
                    <div key={i} className={`${hookState === item ? 'border-Project-red-fist text-white bg-Project-red-second' : ''} p-2 min-w-[45px] text-center rounded-md border-2`}>
                        <label>
                            {item.toUpperCase()}
                            <input 
                            className="hidden"
                            type="radio"
                            name={name}
                            onClick={(e) =>  {
                                if(hookState === item){
                                    hookSetState(null)
                                    console.log(hookState, item)
                                } else {
                                    console.log(hookState, item)
                                    hookSetState(item)
                                }
                            }}
                            value={item}
                            />
                        </label>
                    </div>
                )
            })}
        </div>
    )
}