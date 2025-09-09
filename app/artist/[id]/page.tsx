import prisma from "@libs/prisma";
import SongTable from "@components/UserContainer/songtable";
import GradientLayout from "@components/Layout/gradientLayout";

const Artist = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const artistDetails = await prisma.artist.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      song: {
        include: {
          artist: true,
        },
      },
    },
  });
  const color = "#16a34a";
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={artistDetails?.name}
      subtitle="playlist"
      description={`${artistDetails?.songs?.length ?? 0} songs`}
      image={`https://picsum.photos/400?random=${id}`}
    >
      <SongTable songs={artistDetails?.song ?? []} />
    </GradientLayout>
  );
};

export default Artist;
