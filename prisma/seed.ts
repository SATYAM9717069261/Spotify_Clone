import { PrismaClient } from "../app/generated/prisma";
import { artistsData } from "./songs.data";
import bcrypt from "bcrypt";

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

  const salt = await bcrypt.genSalt();
  const user = await prisma.user.upsert({
    where: { email: "satyam@dev.com" },
    update: {},
    create: {
      email: "satyam@dev.com",
      firstName: "Satyam",
      lastName: "Dev",
      password: await bcrypt.hash("password", salt),
    },
  });
  const songs = await prisma.song.findMany({}); // all songs
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        // we can't usert Because  in Upsert we need unique field and right now we don't have data , so we can't get any ids
        data: {
          name: `Playlist ${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: { connect: songs.map((song) => ({ id: song.id })) },
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
