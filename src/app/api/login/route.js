import { getUserByEmail } from "@/server/functions/users";

export const runtime = "edge";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch user from the database
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
