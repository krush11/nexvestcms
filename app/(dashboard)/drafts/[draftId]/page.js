import dbConnect from "@/lib/dbConnect";
import PageClient from "./PageClient";
import Drafts from "@/models/drafts";

export async function fetchDraft(draftId) {
  await dbConnect();
  const draftData = await Drafts.findById(draftId);

  return JSON.parse(JSON.stringify(draftData));
}

export default async function Page({ params: { draftId } }) {
  const draft = await fetchDraft(draftId);
  return <PageClient draft={draft} />;
}