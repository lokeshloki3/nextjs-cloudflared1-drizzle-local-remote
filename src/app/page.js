"use client";

import { useRouter } from "next/navigation";

export const runtime = 'edge';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-gray-600 mb-8">Sign up or log in to continue.</p>

      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-150"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition duration-150"
          onClick={() => router.push("/login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
