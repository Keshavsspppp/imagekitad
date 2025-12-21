import HomeFeed from "./components/HomeFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Video Reels Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover and share amazing video content
          </p>
        </div>
        <HomeFeed />
      </main>
    </div>
  );
}