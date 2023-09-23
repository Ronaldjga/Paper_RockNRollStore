'use client'

import Image from "next/image"
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react"
import { tv } from "tailwind-variants"

interface IModal {
    isOpen: boolean,
    title: string,
    children: ReactNode
    
}

const modalButton = tv({
    base: 'relative w-8 h-8',
    variants: {
        type: {
            text: 'flex gap-2 justify-around items-center rounded-md p-2',
            icon: 'w-8 h-8 min-w-[32px] min-h-[32px]'
        }
    },
    defaultVariants: {
      type: "text"
    }
  })
  
  interface ICommonProps {
    className?: string,
    buttonProps?: ComponentProps<'button'>
    title: string,
    children: ReactNode,
    btnClassName?: string
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
  

export default function Modal({ title, children, className, btnClassName, ...props }: TModal) {
    const dialogRef = useRef<null | HTMLDialogElement>(null)

    if(props.kind === 'icon') {
        return (
            <>
                <button 
                className={modalButton({type: props.kind, className: btnClassName})} 
                onClick={(e) => dialogRef.current?.showModal()}
                {...props.buttonProps}
                >
                    <Image className="object-contain" src={props.icon} fill alt="icon"/>
                </button>
                <dialog ref={dialogRef} className={className}>
                    <h3>{title}</h3>
                    <div>
                        {children}
                    </div>
                </dialog>
            </>
          );
    }

    if (props.kind === "text") {
        return (
          <>
                <button
                className={modalButton({type: props.kind, className: btnClassName})}
                onClick={(e) => dialogRef.current?.showModal()}
                {...props.buttonProps}
                >
                    <span>{props.text}</span>
                    {props.icon && (<Image className="w-7" src={props.icon} alt="icon"/>)}
                </button>
                <dialog ref={dialogRef} className={className}>
                    <h3 className="">{title}</h3>
                    <div>
                        {children}
                    </div>
                </dialog>
             </>
        );
      }

    return (
        <>
        </>
    )
}
