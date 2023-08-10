import dbConnect from "@/lib/dbConnect";
import metadata from "@/models/metadata";
import PageClient from "./PageClient";

export const revalidate = 60 * 60;

async function getSubscriptions() {
  await dbConnect();
  const metadataObject = (await metadata.find({}).select('kuber nexvest -_id'))[0];

  return JSON.parse(JSON.stringify(metadataObject));
}

export default async function Page() {
  const subscriptions = await getSubscriptions();

  return <PageClient subscriptions={subscriptions} />;
}