import { handleErrorResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/server/functions/users';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const { email, password } = await request.json(); // Destructure email and password

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return handleErrorResponse("Email already in use", 400);
    }

    await createUser(email, password);

    return new Response(
      JSON.stringify({ success: true, message: "User registered successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in registration route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
