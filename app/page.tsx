export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Spotify CloneName
      </h1>
      <p className="text-lg text-gray-600">
        Explore your music collection and discover new tracks.
      </p>
      <div className="flex space-x-4">
        <button className="btn-primary">Get Started</button>
        <button className="btn-secondary">Learn More</button>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Featured Playlist</h2>
        <p className="text-secondary">
          Check out our latest curated music collection.
        </p>
      </div>
    </div>
  );
}
