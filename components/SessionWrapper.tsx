import { SessionProvider, useSession } from 'next-auth/react'
import React,{ReactNode} from 'react'

interface SessionWrapperProps {
    children: ReactNode;
  }

const SessionWrapper: React.FC<SessionWrapperProps> = ({children}) => {

  return (
      <SessionProvider>
        {children}
      </SessionProvider>
  )
}

export default SessionWrapper
