
import GitHubProvider from 'next-auth/providers/github'

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { redirect } from 'next/navigation'
import User from '@/models/user';
import connectToDb from '@/utils/connection';

export const NextAuthOptions = {

  providers: [
          
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {
                label : "Username/Email:",
                type:"text",
                placeholder: "Your username or email"
            },
           
            password: {
                label : "password:",
                type: "password",
                placeholder: "Your password"
            },

        },
        async authorize(credentials) {
        
            try {
                
                await connectToDb();
                const user = await User.findOne({ email: credentials?.email });
                //const user = await User.findOne({ email: credentials.email });
                console.log(user);
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            } catch (error) {
                console.log(error);
            }
        },
    }),
    
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    
],

callbacks: {
    
}
};

/*

    

    async authorize(credentials,profile) {
        //this is were you retrieve user data
        
        try {
            
        await connectToDb();
        //const user = {id : "45", name : "Dave", email:"Dave123@gmail.com", password: "password"}
        const user = await User.findOne({ email: credentials?.email });
            console.log(user);
        if ((credentials.email === user.email) && credentials.password === user.password) {
            return user;
        } else {
            return null;
        }
        

        }catch(error) {
            console.log(error);
        }
    },
    async signIn(user, account, profile) {
        console.log(user,account,profile);

        try {
            await connectToDb();
            console.log(user,account,profile);
            const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    console.log("user not found");
                
                const newUser = new User({
                    email: user.email ,
                    password: user.password ,
                });
                await newUser.save();
                console.log("new user created")
                return user;
                } else {
                    redirect("/")
                

                }
        } catch (error) {
            console.log(error);
        }
    },
    async session(session, user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.password = user.password;
        return session;
        },
    async jwt(token, user, account, profile, isNewUser) {
        if (user) {
            token.id = user.id || profile.id;
            token.email = user.email || profile.email;
            token.password = user.password || profile.password;
        }
        return token;
    },

*/