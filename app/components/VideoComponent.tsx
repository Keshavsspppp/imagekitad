import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative">
        <Link href={`/videos/${video._id}`} className="block relative group">
          <div
            className="relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700"
            style={{ aspectRatio: "9/16" }}
          >
            <video
              src={video.videoUrl}
              controls={video.controls}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:text-purple-600 transition-colors"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{video.title}</h2>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}