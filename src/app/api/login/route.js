import { handleErrorResponse } from "@/lib/utils";
import { getUserByEmail } from "@/server/functions/users";

export const runtime = "edge";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return handleErrorResponse({ error: "Missing email or password" }, 400);
    }

    // Fetch user from the database
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      return handleErrorResponse({ error: "Invalid email or password" }, 401);
    }

    return handleErrorResponse({ success: true, message: "Login successful" });

  } catch (error) {
    return handleErrorResponse({ error: error.message || "Server error" }, 500);
  }
}
