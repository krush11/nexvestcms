import dbConnect from "@/lib/dbConnect";
import posts from "@/models/posts";
import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import metadata from "@/models/metadata";

const client = new SESv2Client({
  region: "ap-south-1",
});

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

    const emailList = (await metadata.find({}))[0].nexvest.emails

    emailList.map(async email => {
      const params = {
        Content: {
          Template: {
            TemplateName: "post_notification",
            TemplateData: JSON.stringify({
              title: post.title,
              description: post.description,
              postUrl: `https://nexvest.vercel.app/blog/${post._id}`,
            }),
          }
        },
        Destination: {
          ToAddresses: [email],
        },
        FromEmailAddress: process.env.SOURCE_EMAIL,
      }

      const command = new SendEmailCommand(params);
      const response = await client.send(command);
    })
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.log(err.errors);
  }
}