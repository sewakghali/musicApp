import getSongs from "../../actions/getSongs"
import Header from "../../components/Header"
import ListItem from "../../components/ListItem"
import PageContent from "./components/PageContent";

export default async function Home() {

  const songs = await getSongs();

  return (
    <main className="text-green-500 bg-neutral-900 ye rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className={`mb-2`}>
        <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
        <div className="grid grid-cols-1 sm:grid-col-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem image="/images/liked.png" name="Liked Songs" href="liked"/>

        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div className="hidden lg:block">
          <PageContent songs={songs.slice(0,4)}/>
        </div>
        <div className="lg:hidden block">
          <PageContent songs={songs.slice(0,3)}/>
        </div>
        {songs.length > 4 &&
          <>
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-white text-2xl font-semibold">All Songs</h1>
            </div>
            <div className="hidden lg:block">
              <PageContent songs={songs.slice(4)}/>
            </div>
            <div className="lg:hidden block">
              <PageContent songs={songs.slice(3)}/>
            </div>
          </>
        }
      </div>
    </main>
  )
}
