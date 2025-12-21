"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { apiClient, VideoFormData } from "@/lib/api-client";
import { useNotification } from "./Notification";

function VideoUploadForm() {
  const { showNotification } = useNotification();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !videoUrl) {
      showNotification("Please fill all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload: VideoFormData = {
        title,
        description,
        videoUrl,
        thumbnailUrl: thumbnailUrl ?? videoUrl,
        controls: true,
        transformation: { width: 1080, height: 1920, quality: 100 },
      } as any;

      await apiClient.createVideo(payload);
      showNotification("Video created successfully", "success");
      setTitle("");
      setDescription("");
      setVideoUrl(null);
      setThumbnailUrl(null);
      setProgress(0);
    } catch (err) {
      showNotification("Failed to create video", "error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your video"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Video *
        </label>
        <FileUpload
          fileType="video"
          onSuccess={(res) => {
            // `res` from ImageKit upload contains `url`
            setVideoUrl(res.url);
            showNotification("Video uploaded", "success");
          }}
          onProgress={(p) => setProgress(p)}
        />
        {progress > 0 && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{progress}%</p>
          </div>
        )}
        {videoUrl && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ Video uploaded successfully</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Thumbnail (optional)
        </label>
        <FileUpload
          fileType="image"
          onSuccess={(res) => {
            setThumbnailUrl(res.url);
            showNotification("Thumbnail uploaded", "success");
          }}
        />
        {thumbnailUrl && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ Thumbnail uploaded successfully</p>
        )}
      </div>

      <div>
        <button 
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          type="submit" 
          disabled={submitting || !videoUrl}
        >
          {submitting ? "Creating Video..." : "Create Video"}
        </button>
      </div>
    </form>
  );
}

export default VideoUploadForm;