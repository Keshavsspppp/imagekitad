"use client";
import { useEffect, useState } from "react";
import VideoFeed from "./VideoFeed";
import { IVideo } from "@/models/Video";

export default function HomeFeed() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/video", { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setVideos(data);
      } catch (err: any) {
        setError("Failed to load videos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="py-12 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading videos...</p>
    </div>
  );
  if (error) return (
    <div className="py-12 text-center">
      <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
    </div>
  );

  return (
    <section className="w-full">
      <VideoFeed videos={videos} />
    </section>
  );
}
