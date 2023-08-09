import dbConnect from "@/lib/dbConnect";
import drafts from "@/models/drafts";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json()
  await dbConnect();
  const { draftId, title, description, tags, content } = body;

  await drafts.findByIdAndUpdate(draftId, {
    title,
    description,
    tags,
    content
  }, { new: true })

  return NextResponse.json('ok', { status: 200 })
}

export async function PUT(req) {
  const body = await req.json()
  await dbConnect();
  const { title, description, tags, content } = body;

  const newDraft = new drafts({
    title,
    description,
    tags,
    content
  })
  await newDraft.save()

  return NextResponse.json({ draftId: newDraft._id }, { status: 200 })
}

export async function DELETE(req) {
  await dbConnect();

  const url = new URL(req.url)
  const draftId = url.searchParams.get('draftId')
  await drafts.findByIdAndDelete(draftId);

  return NextResponse.json('ok', { status: 200 })
}
