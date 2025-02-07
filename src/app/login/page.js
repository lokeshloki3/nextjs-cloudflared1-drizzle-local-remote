"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const runtime = "edge";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form action={handleSubmit} className="w-80 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg"
          required
          value={formData.email}
          onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg"
          required
          value={formData.password}
          onChange={handleChange} />
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Log In</button>
      </form>

      <p className="mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
