import { handleErrorResponse } from "@/lib/utils";
import { getUserByEmail } from "@/server/functions/users";

export const runtime = "edge";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return handleErrorResponse("Missing email or password", 400);
    }

    // Fetch user from the database
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      return handleErrorResponse("Invalid email or password", 401);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Login successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in login route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
