import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const SessionContext = createContext({

});

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<typeof session | null>(null);
  useEffect(() => {
    if (status == "authenticated") {
      setUser(session);
    } else {
      setUser(null);
    }
  }, [session, status]);

  return (
    <SessionContext.Provider value={{ user, loading: status == "loading" }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider };
