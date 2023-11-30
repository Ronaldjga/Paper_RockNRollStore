'use client'

import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react"
import { ModalButton, ModalButtonActions } from "./modalButton"
import { twMerge } from "tailwind-merge"

interface IModal {
  isOpen: boolean,
  title: string,
  children: ReactNode   
}
  
interface ICommonProps {
  className?: string,
  buttonProps?: ComponentProps<'button'>
  title: string,
  children: ReactNode,
  btnClassName?: string,
  buttonAction?: {
    text: string;
    action: () => void
  },
  btnDisable?: boolean
}

interface IBtnIcon extends ICommonProps {
  kind: 'icon',
  icon: string
}

interface IBtnText extends ICommonProps {
  kind: 'text',
  text: string,
  icon?: string
}
  
type TModal = | IBtnIcon | IBtnText
  


export default function Modal({ title, children, className, btnClassName, buttonAction, btnDisable = false, ...props }: TModal) {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const modalButton = props.kind === 'icon' ?
   <ModalButton kind="icon" className={btnClassName} action={() => handleModal()} icon={props.icon} /> 
   : <ModalButton kind="text" className={btnClassName} action={() => handleModal()} text={props.text} icon={props.icon}/>
  
  function handleModal (){
    setIsOpen(newState =>  !newState)
  }

  return (
      <>
        {modalButton}
        {isOpen && 
          (
            <>
              <div className="fixed top-0 left-0 w-full h-full bg-black/25 flex justify-center items-center z-40"
                onClick={(e) => handleModal()}
              ></div>
              <div className={twMerge(className, 'modal fixed z-50 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-3/4 bg-white rounded-md shadow-md shadow-black/30')}>
                <h3 className="px-2 py-4 bg-project-secondary-800 text-project-quaternary-500 font-bold rounded-t-md border-b-2 border-project-primary-500">{title}</h3>
                <div className="text-left p-3 flex flex-col justify-between gap-5">
                    <div className="w-full max-h-[300px] overflow-y-auto">
                      {children}
                    </div>
                    { buttonAction &&
                      <ModalButtonActions
                        action={buttonAction?.action}
                        text={buttonAction?.text}
                        modalHandler={setIsOpen}
                        isDisable={btnDisable}
                      />
                    }
                </div>
              </div>
            </>
          )
        }
      </>
  )
}
