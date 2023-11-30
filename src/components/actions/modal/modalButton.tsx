'use client'

import Image from "next/image";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

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
    className?: string;
    action: () => void
}

interface IBtnIcon extends ICommonProps {
    kind: 'icon';
    icon: string;
  }
  
  interface IBtnText extends ICommonProps {
    kind: 'text';
    text: string;
    icon?: string;
  }
  
  type TModal = IBtnIcon | IBtnText;

export function ModalButton({ className, action, ...props }: TModal) {
  const modalButtonStyle = modalButton({ type: props.kind, className });

  return (
    <button
      className={modalButtonStyle}
      onClick={action}
    >
      {props.kind === 'icon' && <Image className="object-contain" src={props.icon} alt="icon" />}
      {props.kind === 'text' && <span>{props.text}</span>}
      {props.icon && props.kind === 'text' && <Image className="w-7" src={props.icon} alt="icon" />}
    </button>
  );
}

interface IModalButtonActions {
  rootClassName?: string;
  modalHandler: (value: SetStateAction<boolean>) => void,
  text: string,
  action: () => void,
  isDisable: boolean
}

export function ModalButtonActions({modalHandler, rootClassName, text, action, isDisable}: IModalButtonActions){
  
  return(
    <div className={twMerge(rootClassName, 'flex justify-center items-center flex-wrap-reverse gap-5 px-2')}>
      <button
        type="button"
        className={`bg-project-tertiary-500 py-1 px-5 rounded-md`}
        onClick={(e) => {
          modalHandler(newState => !newState)
        }}>
          Cancelar
      </button>
      <button
        disabled={isDisable}
        type="button"
        className={`bg-project-primary-700 text-project-tertiary-100 py-1 px-5 rounded-md hover:bg-project-primary-500`}
        onClick={async (e) => {
          await action()
          modalHandler(newState => !newState)
        }}>
          {text}
      </button>
    </div>
  )
}