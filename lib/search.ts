import prisma from "./prisma";

type searchType = "song" | "artist";

type SearchOptions = Partial<Record<searchType, string>>;
// e.g. { song?: string; artist?: string }

const mapping: Record<searchType, (q: string) => Promise<any>> = {
  song,
  artist,
};

export default async function search(options: SearchOptions) {
  const results: Record<string, any> = {};

  for (const [type, query] of Object.entries(options)) {
    if (!query) continue; // skip empty
    const fn = mapping[type as searchType];
    if (fn) {
      results[type] = await fn(query);
    }
  }

  return results;
}

async function song(query: string) {
  return prisma.song.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
  });
}

async function artist(query: string) {
  return prisma.artist.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
  });
}
