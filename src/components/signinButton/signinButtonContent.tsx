
interface ISigninButtonContent {
    text: string
}

export function SigninButtonContent({text} : ISigninButtonContent) {
  return (
    <>
        {text}
    </>
  )
}
