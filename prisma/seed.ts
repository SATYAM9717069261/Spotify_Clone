import { PrismaClient } from "../app/generated/prisma";
import { artistsData } from "./songs.data";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      await prisma.artist.upsert({
        //upset: create or Update
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          song: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    }),
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
