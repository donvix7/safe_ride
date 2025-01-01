
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

callbacks : {
    async jwt({token, user, session}) {
        console.log("jwt callback",{token, user, session});

        if(user) {
            return {
                ...token,
                id: user.id,

            };
        }
        return token;
    },
    async session({ session, token }) {
        console.log("session callback", { token, session });
        
        return {
            ...session,
            user: {
                ...session.user,
                id: token.id, // Ensure that token.id exists
                name: token.name // Ensure that token.name exists
            },
        };
    },
    async signIn({ credentials }) {
        try {
            await connectToDb(); // Ensure it connects only once if used elsewhere
    
            // Check for existing user by either email or username
            let user = await User.findOne({
                $or: [
                    { email: credentials?.email },
                    { username: credentials?.username?.toLowerCase() }
                ]
            });
    
            // If the user does not exist, create a new one
            if (!user) {
                user = await User.create({
                    email: profile?.email,
                    username: profile?.username?.toLowerCase(), // Ensure username is stored in lowercase
                    image: profile?.picture
                });
            }
    
            // You might want to add any necessary user properties to the session here
            return user; // Returning the user object for integration with NextAuth session
        } catch (error) {
            console.error("Error during sign-in:", error);
            return null; // Indicate an error occurred
        }
    

    }
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