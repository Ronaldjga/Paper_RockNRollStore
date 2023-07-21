'use client'

import { signIn } from "next-auth/react";
import { json } from "stream/consumers";

export function GithubSignIn () {
  return (
    <>
        <button
            className="py-2 px-5 bg-Project-red-fist"
            onClick={() => signIn('github')}
        >
            Github
        </button>
        <button
            className="py-2 px-5 bg-Project-red-fist"
            onClick={() => signIn('google')}
        >
            Google
        </button>
        <button
            className="py-2 px-5 bg-Project-red-fist"
            onClick={async () => {
                const data = {name: 'Nome que eu mando aqui', email: 'Email que eu mando aqui'}
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const res = await response.json()
                console.log(res)
            }}
        >
            TESTE
        </button>
    </>
  )
}
