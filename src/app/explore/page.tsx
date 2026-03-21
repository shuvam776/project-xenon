import dbConnect from "@/lib/dbConnect";
import Hoarding from "@/models/Hoarding";
import ExploreClient from "./ExploreClient";

export const dynamic = "force-dynamic";

async function getHoardings() {
  await dbConnect();
  // Fetch approved hoardings, sorted newest first
  const hoardings = await Hoarding.find({ status: "approved" }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(hoardings));
}
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function ExplorePage(props: Props) {
  const searchParams = await props.searchParams;
  const hoardings = await getHoardings();
  const city = typeof searchParams.city === 'string' ? searchParams.city : '';
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-24">
      <ExploreClient initialHoardings={hoardings} initialCity={city} />
    </div>
  );
}
