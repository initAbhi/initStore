import { signIn } from "@/auth"
import { getSession } from "next-auth/react"
import { ReactNode } from "react"

 
const SignIn = ({provider}:{provider:string}) =>  {


  return (
    <>
    <form
      action={async () => {
        "use server"
        await signIn(provider,{redirect: true, redirectTo: '/'})
      }}
      >
      <button type="submit">Signin with {provider}</button>
    </form> 
      </>
  )
}

export default SignIn