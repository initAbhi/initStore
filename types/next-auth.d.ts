import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      isAdmin? : boolean
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin? : boolean
    role?: string; // ✅ Add role to user type
  }

  interface JWT {
    isAdmin? : boolean
    role?: string; // ✅ Add role to JWT type
  }
  interface User extends DefaultUser {
    isAdmin? : boolean
    role?: string; // ✅ Add role to user type
  }

 
}
