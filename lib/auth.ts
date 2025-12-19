import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { connectToDatabase } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label:"Email" , type: "text"},
                password: {label: "Password" , type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error(" Missing email or password")
                }

                try {
                    await connectToDatabase()
                    const user = await User.findOne({email:
                        credentails.email
                    });

                    if(!user){
                        throw new Error("No user found with this");
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if(!isValid){
                        throw new Error("Invalid password");
                    }

                    return{
                        id: user._id.toString(),
                        email: user.email
                    }


                } catch (error) {
                    console.error("Auth error"  , error)
                    throw error
                }
            },
        }),
  ],
};
