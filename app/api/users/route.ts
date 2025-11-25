// app/api/users/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/entities/User";

export async function GET() {
  const db = await dbConnect();
  const userRepo = db.getRepository(User);

  const users = await userRepo.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { name, email } = await req.json();

  const db = await dbConnect();
  const userRepo = db.getRepository(User);

  const user = userRepo.create({ name, email });
  await userRepo.save(user);

  return NextResponse.json({ message: "User created", user });
}
