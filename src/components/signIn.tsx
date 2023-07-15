'use client'

import { signIn } from "next-auth/react";

export function GithubSignIn () {
  return (
    <>
        <button
            className="py-2 px-5 bg-Project-red-fist"
            onClick={() => signIn('github')}
        >
            Github
        </button>
    </>
  )
}
