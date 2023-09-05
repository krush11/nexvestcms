import dbConnect from '@/lib/dbConnect';
import PageClient from './PageClient';
import Posts from '@/models/posts';

// Kept 0 so that before the post gets updated at Nexvest, it can be tested from here
export const revalidate = 5 * 60;

async function fetchAllPosts() {
  await dbConnect();
  const draftsList = await Posts.find()
    .select('title stats createdAt')
    .sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(draftsList));
}

export default async function Component() {
  const postList = await fetchAllPosts();

  return <PageClient postList={postList} />;
}

export const metadata = {
  title: 'Published Posts',
  description: 'List of all published posts'
}
