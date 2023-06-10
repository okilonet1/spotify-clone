import Header from "@/components/Header";
import PageContent from "@/components/Home/PageContent";
import ListItem from "@/components/ListItem";
import getSongs from "@/helpers/getSongs";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header>
        <div className="mb-2">
          <h1
            className="
            text-3xl 
              font-semibold 
              text-white
            "
          >
            Welcome back
          </h1>
          <div
            className="
              mt-4 
              grid 
              grid-cols-1 
              gap-3 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4
            "
          >
            <ListItem
              name="Liked Tracks"
              image="/images/liked.png"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Newest Tracks</h1>
        </div>
        <div className="pb-20">
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
