import Image from 'next/image'

interface ISigninButtonIcon {
    icon: string
}

export function SigninButtonIcon({ icon }: ISigninButtonIcon) {
  return (
    <div className='w-5 h-5 min-w-[20px] min-h-[20px] relative'>
        <Image src={icon} className='object-contain' alt='notifications type' fill/>
    </div>
  )
}
