import mongoose, { connection } from "mongoose";
import { NextResponse } from "next/server";

let isConnected = false;

export async function connectToDB() {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'balkan_breakdowns',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    isConnected = true;
    console.log('MongoDB is connected')
  } catch (error) {
    console.log(error);
  }
}

export async function executeDbCall(promiseCallback) {
  try {
    await connectToDB();
    return NextResponse.json(await promiseCallback());
  } catch(error) {
    console.log(error);
  }
}
