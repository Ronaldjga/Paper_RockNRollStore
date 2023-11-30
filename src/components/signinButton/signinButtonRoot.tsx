import { ReactNode } from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"

interface ISigninButtonRoot {
  className?: string;
  children: ReactNode
}

export default function SigninButtonRoot({ className, children } : ISigninButtonRoot) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
