import dbConnect from "@/lib/dbConnect";
import posts from "@/models/posts";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { title, description, tags, content } = await req.json();
  await dbConnect();
  try {
    const post = await posts.create({
      title,
      description,
      tags,
      content,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.log(err.errors);
  }

}