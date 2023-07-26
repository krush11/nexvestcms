import dbConnect from "@/lib/dbConnect";
import Posts from "@/models/posts";
import PageClient from "./PageClient";

async function fetchPost(postId) {
  await dbConnect();
  const post = await Posts.findById(postId);
  return JSON.parse(JSON.stringify(post));
}

export default async function ({ params: { postId } }) {
  const post = await fetchPost(postId)

  return <PageClient post={post} />
}

export async function generateMetadata({ params: { postId } }) {
  await dbConnect();
  const post = await Posts.findById(postId).select("title description");

  return {
    title: post.title,
    description: post.description,
  };
}