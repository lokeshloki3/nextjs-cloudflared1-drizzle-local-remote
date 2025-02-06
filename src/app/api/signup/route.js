import { createUser, getUserByEmail } from '@/server/functions/users'; 

export const runtime = 'edge';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get('email');

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already in use' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await createUser(formData);

    return new Response(JSON.stringify({ success: true, message: 'User registered successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Server error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
