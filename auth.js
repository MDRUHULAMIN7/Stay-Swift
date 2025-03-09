import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "./database/mongoClientPromise";
import { dbConnect } from "./service/mongo";
import { UserModel } from "./models/user-model";

export const {
    handlers:{GET,POST},
    auth,
    signIn,
    signOut,
   }=NextAuth({
  adapter:MongoDBAdapter(mongoClientPromise,{
    databaseName: process.env.ENVIRONMENT}),
    session:{
        strategy: "jwt",
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            credentials:{
                email: {},
                password: {},
            },
            async authorize(credentials){
                if(credentials === null){
                    return null;
                }
                try{
               const user = await UserModel.findOne({email:credentials.email});
               if(user){
                   const isMatch = user.email === credentials.email;
                   if(isMatch){
                       return user;
                   }else{
                       throw new Error("Email or Password is incorrect");}
               }
               else{
                   throw new Error("User not found");
               }
                }catch(e){
                    throw new Error(e);
                }
            }
                
        })
    ]
})