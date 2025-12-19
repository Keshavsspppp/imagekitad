import mongoose from "mongoose";
import { cache } from "react";


const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error(" Please define mongodb Uri in environmental variable");
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = { conn:  null , promise: null}
}


export async function connectToDatabase(){
    if(cache.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }


        mongoose
        .connect(MONGODB_URI,opts )
        .then(() => mongoose.connection)

    }

    try {
        cached.conn = await cached.promise 
    } catch (error) {
        cached.promise = null
        throw error
    }
    return cached.conn
}