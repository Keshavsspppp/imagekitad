"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";


export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to Video Reels Pro", "info")
            }
          >
            <Home className="w-6 h-6 text-purple-600" />
            Video Reels Pro
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                {session ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </div>

                    <Link
                      href="/upload"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition"
                      onClick={() =>
                        showNotification("Welcome to Upload", "info")
                      }
                    >
                      Video Upload
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition"
                    onClick={() =>
                      showNotification("Please sign in to continue", "info")
                    }
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}