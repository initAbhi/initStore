import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectDB } from "./lib/db/db";
import User from "./lib/db/models/UserSchema";
import Google from "next-auth/providers/google";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Google,GitHub],
    callbacks: {
        async signIn({user, account, profile, email, credentials}){
            // console.log("user - " ,user)
            // console.log("account - " ,account)
            await connectDB();
            
            let userExists = await User.findOne({email: user.email});
            if(!userExists) {
                userExists = User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: account?.provider ,
                })
            }
            user.isAdmin = userExists.isAdmin;
            
            return true;
        },
        async jwt({token, user}){
            if(user){
                token.isAdmin = user.isAdmin
            }
            return token;
        },
        async session({session, token}){
            if(session.user){
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin",  
        
    }
})