import dbConnect from '@/lib/dbConnect';
import PageClient from './PageClient';
import Drafts from '@/models/drafts';

// Kept 0 as drafts need to be checked instantly for editing
export const revalidate = 0;

async function fetchAllDrafts() {
  await dbConnect();
  const draftsList = await Drafts.find()
    .select('-content -description -tags')
    .sort({ updatedAt: -1 });
  return JSON.parse(JSON.stringify(draftsList));
}

export default async function Component() {
  const draftList = await fetchAllDrafts();

  return <PageClient draftList={draftList} />
}

export const metadata = {
  title: 'Drafts',
  description: 'List of all drafts'
}
