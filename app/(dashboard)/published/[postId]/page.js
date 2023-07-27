import dbConnect from "@/lib/dbConnect";
import Posts from "@/models/posts";
import PageClient from "./PageClient";

export const revalidate = 60 * 60 * 24;

async function fetchPost(postId) {
  await dbConnect();
  const post = await Posts.findById(postId);
  return JSON.parse(JSON.stringify(post));
}

export default async function Page({ params: { postId } }) {
  const post = await fetchPost(postId)

  return <PageClient post={post} />
}

export async function generateStaticParams() {
  await dbConnect();
  const postList = await Posts.find().select(['_id']);
  const paths = postList.map((post) => ({
    postId: post._id.toString()
  }));

  return paths;
}

export async function generateMetadata({ params: { postId } }) {
  await dbConnect();
  const post = await Posts.findById(postId).select("title description");

  return {
    title: post.title,
    description: post.description,
  };
}