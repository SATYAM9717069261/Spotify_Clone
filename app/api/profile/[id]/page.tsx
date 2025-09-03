async function Playlist({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(" details GET PARAMS  => ", params);
  const details = getData(id);
  return (
    <div className="grid grid-template-rows-[auto_1fr] h-[var(--user-details-height)] overflow-y-auto overflow-x-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-bold">Playlist</h2>
        <button className="text-sm font-medium text-gray-500">
          Create Playlist
        </button>
      </div>
      <div className="overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-2">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Playlist"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h3 className="text-sm font-medium">Playlist Name {id}</h3>
                <p className="text-xs text-gray-500">Creator Name</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

async function getData(id: string) {
  let user;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
  console.log(id);
}
export default Playlist;
