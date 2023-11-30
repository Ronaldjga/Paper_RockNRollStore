'use client'

import { signIn } from "next-auth/react";
import Image from "next/image"

interface ISigninButtonContent {
  provider: string;
  className?: string;
  text: string;
  icon: string;
}

export function SigninButtonContent({text, icon, className, provider} : ISigninButtonContent) {
  return (
    <>
      <button
        className={`${className} py-2 px-5 bg-project-primary-500 flex items-center gap-3 rounded-md hover:outline outline-project-tertiary-500 font-semibold text-project-tertiary-300`}
        onClick={() => signIn(provider)}
      >
        <Image className="w-10 h-10 rounded-md bg-project-tertiary-900 p-1" src={icon} alt={`${text} icon`}/>
        <span>{text}</span>
      </button>
    </>
  )
}
