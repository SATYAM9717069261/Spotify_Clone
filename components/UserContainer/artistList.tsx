import prisma from "@libs/prisma";

export async function ArtistList() {
  const artists = await prisma.artist.findMany({});
  console.log(" LIST  => ", artists);

  return (
    <div className="text-white px-10 flex flex-col">
      {/* Header */}
      <div className="mb-10">
        <p className="text-2xl font-bold">Top artist this month</p>
        <p className="text-md">Only visible to you</p>
      </div>

      {/* Horizontal scroll */}
      <div className="flex flex-row overflow-auto w-body-width">
        {artists.map((artist, i) => (
          <div key={i} className="px-2 shrink-0">
            <div className="rounded-md p-4 m-4 text-center">
              <img
                src="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=1"
                alt={artist.name}
                className="rounded-full"
                style={{ width: "130px", height: "130px" }}
              />
              <div className="mt-5">
                <p className="text-lg">{artist.name}</p>
                <p className="text-xs text-gray-400">Artist</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
