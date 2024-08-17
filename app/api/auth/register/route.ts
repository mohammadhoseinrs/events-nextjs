import UserModel from "@/models/user";
import { hashPassword } from "@/utils";
import connectToDB from "@/utils/db";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
   await connectToDB()
    const { username, email, password } = await req.json();
    console.log(password);

    const isUserAvaialable = await UserModel.findOne({
      email,
    });
    if (isUserAvaialable) {
      return Response.json(
        { message: "you have an account please, sign in" },
        { status: 202 }
      );
    }

    const hashingPassword = await hashPassword(password);
    console.log(hashingPassword);
    
    const newUser = await UserModel.create({
      username,
      email,
      password: hashingPassword,
    });
    console.log(newUser);

    return Response.json({ newUser }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ err }, { status: 400 });
  }
}
