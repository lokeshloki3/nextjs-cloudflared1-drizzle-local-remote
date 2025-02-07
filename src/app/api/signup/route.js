import { handleErrorResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/server/functions/users';

export const runtime = 'edge';

export async function POST(request) {
  try {
    // const formData = await request.formData();
    // const email = formData.get('email');

    const { email } = await request.json(); // Destructure email and password

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return handleErrorResponse({ error: "Email already in use" }, 400);
    }

    await createUser(formData);

    return handleErrorResponse({ success: true, message: "User registered successfully" }, 201);

  } catch (error) {
    return handleErrorResponse({ error: error.message || "Server error" }, 400);
  }
}
