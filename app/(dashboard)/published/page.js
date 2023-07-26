import dbConnect from '@/lib/dbConnect';
import PageClient from './PageClient';
import Posts from '@/models/posts';

export const revalidate = 0;

async function fetchAllPosts() {
  await dbConnect();
  const draftsList = await Posts.find()
    .select('title stats updatedAt').sort({ updatedAt: 1 });
  return JSON.parse(JSON.stringify(draftsList));
}

export default async function Component() {
  const postList = await fetchAllPosts();

  return (
    <PageClient postList={postList} />
  )
}